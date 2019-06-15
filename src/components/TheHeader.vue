<template>

<header
  :class="{ active: isHeaderActive }"
>
  <div class="header-inn">
    <div class="cont">
      <div class="toggle-menu-btn-wrapper">
        <button
          class="toggle-menu-btn"
          :disabled="isToggleMenuBtnDisabledWhenMenuToggling"
          @click="toggleMenu"
        >
          <!---->
          <VIcon
            :viewBox="null"
            :href="!isMenuContActive ? 'menu' : 'cross'"
            :class="[
              `${!isMenuContActive ? 'menu' : 'cross'}-icon`
            ]"
          />
          <!---->
          <!--
            Была разработана анимация иконки и было точно просчитано
            как она должна двигаться в процессе, но после анимации она
            выглядела неопрятно. Можете раскомментировать код в комментариях и
            закомментирровать выделенный пустыми комментариями, чтобы проверить
            анимацию
          -->
          <!-- <div
            :class="['menu-icon-animated', { active: isMenuContActive }]"
          >
            <span></span>
            <span></span>
            <span></span>
          </div> -->
        </button>
      </div>
      <router-link
        to="/"
        class="logo"
      >
        <VIcon :href="'lime'" />
        <span>limeone</span>
        <VIcon :href="'arrow-down'" />
      </router-link>
      <div class="btns">
        <TheSearch />
        <a
          href="##"
          class="compare-link"
        >
          <VIcon :href="'compare'" />
          <span>Сравнение</span>
        </a>
        <a
          href="##"
          class="favourite-link"
        >
          <VIcon :href="'heart'" />
          <span>Избранное</span>
        </a>
        <router-link
          to="/cart"
          class="cart-link"
        >
          <VIcon :href="'cart'" />
          <span>Корзина</span>
        </router-link>
      </div>
    </div>
    <!-- 1
      Темный фон оверлея поиска для его закрытия не может находиться под полем
      поиска и сверху сайдбара одновременно, если они все не вложены в один
      элемент, так как по природе z-index элемент не может быть  под дочерним
      элементом другого элемента. По этой причине элемент темного фона был
      перемещен сюда
    -->
    <div
      :class="[
        'close-search-overlay-dark-backgr',
        { active: isCloseSearchOverlayDarkBackgrActive }
      ]"
      @click="closeSearchOverlay"
    ></div>
    <div class="sidebars">
      <TheMenu :class="{ active: isMenuContActive }" />
      <router-view
        :class="{ active: isCatalogContActive }"
        name="catalog"
      />
    </div>
  </div>
</header>

</template>
<script>

import TheSearch from './TheSearch';
import TheMenu from './TheMenu';

export default {
  components: {
    TheSearch,
    TheMenu,
  },
  data() {
    return {
      isMenuContActive: false,
      isCatalogContActive: false,
      isHeaderActive: false,
      isCloseSearchOverlayDarkBackgrActive: false,
      // Если перед закрытием каталога было активно меню, оно открывется
      isComebackFromCatalogToMenuPossible: false,
      // При закрытии оверлея поиска, если он не находился поверх сайдбара,
      // должно было сбрасываться состояние хедера, но оно сбрасывалось всегда
      isCloseSearchOverlayWouldOverlaySidebar: false,
      // При быстром нажатии кнопки показа или закрытия меню он могло
      // показываться некорректно
      isToggleMenuBtnDisabledWhenMenuToggling: false,
      body: null,
      catalogCont: null,
      menuCont: null,
    };
  },
  watch: {
    // После перехода на другую страницу сайдбар оставался открытым
    $route() {
      if (this.isMenuContActive) {
        this.toggleMenu();
      }
      if (this.isCatalogContActive) {
        if (this.isComebackFromCatalogToMenuPossible) {
          this.isComebackFromCatalogToMenuPossible = false;
        }
        this.toggleCatalog();
      }
    },
  },
  mounted() {
    this.body = document.querySelector('body');
    this.catalogCont = document.querySelector('.catalog-wrapper');
    this.menuCont = document.querySelector('.menu-wrapper');
    this.$evBus.$on(
      'search-overlay-active-notify-dark-backgr-in-header',
      () => {
        this.isHeaderActive = true;
        this.isCloseSearchOverlayDarkBackgrActive = true;
      },
    );
    this.$evBus.$on('toggle-catalog', () => {
      this.toggleCatalog();
    });
  },
  methods: {
    async toggleMenu() {
      this.isToggleMenuBtnDisabledWhenMenuToggling = true;
      if (!this.isMenuContActive) {
        this.isMenuContActive = true;
        if (!this.isCatalogContActive) {
          this.isCloseSearchOverlayWouldOverlaySidebar = true;
          this.togglePageScrollingPossibility();
          this.isHeaderActive = true;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
        } else {
          this.isCatalogContActive = false;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
          this.resetSidebarScrollPosition(this.catalogCont);
        }
        this.isComebackFromCatalogToMenuPossible = true;
      } else {
        this.isComebackFromCatalogToMenuPossible = false;
        this.isCloseSearchOverlayWouldOverlaySidebar = false;
        this.isMenuContActive = false;
        await this.delayEqualToToggleSidebarAnimationTimeProm();
        this.isHeaderActive = false;
        this.resetSidebarScrollPosition(this.menuCont);
        this.togglePageScrollingPossibility();
      }
      this.isToggleMenuBtnDisabledWhenMenuToggling = false;
    },
    async toggleCatalog() {
      if (!this.isCatalogContActive) {
        this.isCatalogContActive = true;
        if (!this.isMenuContActive) {
          this.isCloseSearchOverlayWouldOverlaySidebar = true;
          this.togglePageScrollingPossibility();
          this.isHeaderActive = true;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
        } else {
          this.isMenuContActive = false;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
          this.resetSidebarScrollPosition(this.menuCont);
        }
      } else {
        this.isCatalogContActive = false;
        if (!this.isComebackFromCatalogToMenuPossible) {
          this.isCloseSearchOverlayWouldOverlaySidebar = false;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
          this.isHeaderActive = false;
          this.resetSidebarScrollPosition(this.catalogCont);
          this.togglePageScrollingPossibility();
        } else {
          this.isMenuContActive = true;
          await this.delayEqualToToggleSidebarAnimationTimeProm();
          this.resetSidebarScrollPosition(this.catalogCont);
        }
      }
    },
    closeSearchOverlay() {
      this.isCloseSearchOverlayDarkBackgrActive = false;
      this.$evBus.$emit('close-search-overlay');
      if (this.isCloseSearchOverlayWouldOverlaySidebar === false) {
        this.isHeaderActive = false;
        this.togglePageScrollingPossibility();
      }
    },
    resetSidebarScrollPosition(sidebarWrapper) {
      sidebarWrapper.scrollTop = 0;
    },
    togglePageScrollingPossibility() {
      this.body.classList.toggle('noscroll');
    },
    delayEqualToToggleSidebarAnimationTimeProm() {
      return new Promise((resolve) => setTimeout(resolve, 500));
    },
  },
};

</script>
<style scoped lang="scss">

header {
  @include vhMedia(9.5vh);
  position: relative;
  flex-shrink: 0;

  @media (min-width: $media-pc) {
    position: static;
    height: auto;
  }
}

header.active {
  position: static;
}

.header-inn {
  position: absolute;
  flex-direction: column;
  z-index: 900;
  display: flex;
  width: 100%;
  height: 100%;

  @media (min-width: $media-pc) {
    position: static;
    align-items: center;
    flex-direction: column-reverse;
    background-color: $block-back-col-orange;
  }
}

header.active > .header-inn {
  position: fixed;
}

.cont {
  @include layout-media-pc;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $block-back-col;
  border-bottom: $bord;

  @media (min-width: $media-pc) {
    height: 60.762px;
    background-color: $block-back-col-orange;
    border-bottom: 0;
  }
}

header.active .cont {
  @include vhMedia(9.5vh);
}

.toggle-menu-btn-wrapper {
  @include hide-on-pc;
  flex: 1 1 0;
}

.toggle-menu-btn {
  @include vhMedia(8vh, width);
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
  outline: none;

  > svg {
    fill: $icon-col;
  }
}

//
.menu-icon {
  height: 37%;
}

.cross-icon {
  height: 30%;
}
//

/* .menu-icon-animated {
  @include vhMedia(3.325vh);
  @include vhMedia(3.325vh, width);
  position: relative;

  > span {
    transition: all 0.3s;
    position: absolute;
    display: block;
    width: 100%;
    height: 10%;
    background-color: $icon-col;
  }

  &.active > span {
    transition: all 0.3s;
  }

  > span:first-child {
    top: 15%;
    transform: translate(0%, 0%) rotate(0deg);
    transform-origin: bottom left;
  }

  &.active > span:first-child {
    transform: translate(11.1091271%, -68.1980511%) rotate(45deg);
  }

  > span:nth-child(2) {
    top: 45%;
    opacity: 1;
  }

  &.active > span:nth-child(2) {
    opacity: 0;
  }

  > span:last-child {
    bottom: 15%;
    transform: translate(0%, 0%) rotate(0deg);
    transform-origin: top left;
    margin-bottom: 0;
  }

  &.active > span:last-child {
    transform: translate(11.1091271%, 68.1980511%) rotate(-45deg);
  }
} */

.logo {
  align-items: center;
  display: flex;

  @media (min-width: $media-pc) {
    width: 221.4px;
    padding: 0 8.856px 0 2.952px;
  }

  > svg:first-child {
    @include vhMedia(6.2vh);
    fill: $logo-col-mobile-tablet;

    @media (min-width: $media-pc) {
      fill: $text-col-x-light;
    }
  }

  > span {
    @include font(
      $size: 36.408px,
      $color: $text-col-x-light,
      $weight: 100,
      $family: $font-fam-roboto
    );
    display: none;
    margin-left: 4.92px;

    @media (min-width: $media-pc) {
      display: block;
    }
  }

  > svg:last-child {
    display: none;
    height: 11.808px;
    margin-left: auto;
    opacity: 0.5;
    fill: $text-col-x-light;

    @media (min-width: $media-pc) {
      display: block;
    }
  }
}

.btns {
  align-items: center;
  flex: 1 1 0;
  justify-content: flex-end;
  display: flex;
}

%compare-and-favourite-links {
  display: none;
  height: 100%;

  @media (min-width: $media-pc) {
    align-items: center;
    display: flex;
  }

  > svg {
    fill: $text-col-x-light;
  }

  > span {
    @include font(14.76px, $text-col-x-light);
    margin-left: 7.872px;
  }
}

.compare-link {
  @extend %compare-and-favourite-links;

  @media (min-width: $media-pc) {
    margin-right: 20px;
  }

  > svg {
    height: 11.808px;
  }
}

.favourite-link {
  @extend %compare-and-favourite-links;

  > svg {
    height: 13.818px;
  }
}

.cart-link {
  @include vhMedia(8vh, width);
  align-items: center;
  display: flex;
  height: 100%;

  @media (min-width: $media-pc) {
    align-self: center;
    width: auto;
    height: 68%;
    padding: 0 17.712px 0 13.776px;
    margin-left: 22.792px;
    background-color: $block-back-col;
    border: $bord;
    border-radius: 4.92px;
  }

  > svg {
    height: 35%;
    fill: $icon-col;
    margin-left: 16%;

    @media (min-width: $media-pc) {
      width: 19.68px;
      margin-bottom: 2%;
      margin-left: 0;
      fill: currentColor;
    }
  }

  > span {
    @include font(14.76px, $lineHeight: 37.392px, $weight: 600);
    align-self: flex-start;
    display: none;
    margin-left: 5.904px;

    @media (min-width: $media-pc) {
      display: block;
    }
  }
}

.close-search-overlay-dark-backgr {
  position: absolute;
  z-index: 999;
  display: none;
  width: 100%;
  height: 100%;
  background-color: $popup-mask-back-col;
  opacity: 0.2;

  &.active {
    display: block;
  }
}

.sidebars {
  position: relative;
  transition: visibility 0s 0.3s;
  visibility: hidden;

  @media (min-width: $media-pc) {
    align-items: center;
    flex-direction: column;
    display: flex;
    width: 100%;
    height: 39.36px;
    background-color: $block-back-col;
    visibility: visible;
  }
}

header.active .sidebars {
  position: relative;
  flex: 1 1 0;
  overflow: hidden;
  transition: visibility 0s 0s;
  visibility: visible;
}

</style>