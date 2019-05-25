<template>

<div class="menu-wrapper">
  <div class="menu">
    <VRuntimeTemplate
      v-for="data in menuItemTemplatesData"
      :key="data.id"
      :template="data.temp"
    />
  </div>
</div>

</template>
<script>

export default {
  data() {
    return {
      menuItemsData: [
        { class: 'location', text: 'Ростов-на-дону' },
        { class: 'call', text: '8-000-00-00-000', tagName: 'div' },
        { class: 'enter', text: 'Войти' },
        {
          class: 'registraiton',
          text: 'Регистрация',
          tagName: 'button',
          isVisibleOnlyOnPc: true,
        },
        { class: 'show-catalog', text: 'Каталог', tagName: 'button' },
        { class: 'cart', text: 'Корзина' },
        { class: 'compare', text: 'Сравнение' },
        { class: 'favourite', text: 'Избранное' },
        { class: 'notifications', text: 'Уведомления' },
        { class: 'pc-configurator', text: 'Конфигуратор ПК' },
        { class: 'actions', text: 'Акции' },
        { class: 'markdown', text: 'Уцененные товары' },
        { class: 'compare', text: 'Сравнение' },
        { class: 'shops', text: 'Магазины' },
        { class: 'main-page', text: 'Главная страница' },
        {
          class: 'company',
          text: 'Компания',
          isInFooterOfMenuEl: true,
        },
        {
          class: 'projects',
          text: 'Наши проекты',
          isInFooterOfMenuEl: true,
        },
        {
          class: 'feedback',
          text: 'Обратная связь',
          isInFooterOfMenuEl: true,
        },
        {
          class: 'to-buyers',
          text: 'Покупателям',
          isInFooterOfMenuEl: true,
        },
        {
          class: 'price-list',
          text: 'Прайс-лист',
          isInFooterOfMenuEl: true,
        },
      ],
    };
  },
  computed: {
    menuItemTemplatesData() {
      return this.menuItemsData.reduce((templatesData, data, i) => {
        const tagName = data.tagName;
        templatesData.push({
          temp: `
            <${tagName || 'a'}
              :class="[
                'menu-item',
                menuItemsData[${i}].class
              ]"
              ${
                data.class === 'show-catalog' ? '@click="showCatalog"' : ''
              }
              href="##"
            >
              ${
                !data.isInFooterOfMenuEl && !data.isVisibleOnlyOnPc
                  ? `
                    <VIcon
                      :href="
                        menuItemsData[${i}].class !== 'notifications'
                          ? 'location'
                          : 'bell'
                      "
                    />
                    <span
                      class="main-text"
                    >
                      {{ menuItemsData[${i}].text }} 
                    </span>
                    ${
                      data.class !== 'call'
                        ? '<VIcon />'
                        : `
                          <span class="time-to-call-text">
                            (03:00-22:00) 
                          </span>
                          <a href="##"></a>
                        `
                    }
                  `
                  : data.text
              }
            </${tagName || 'a'}>
          `,
          id: i,
        });
        return templatesData;
      }, []);
    },
  },
  methods: {
    showCatalog() {
      this.$evBus.$emit('toggle-catalog');
    },
  },
};

</script>
<style scoped lang="scss">

.menu-wrapper {
  @include layout-media-pc;
  height: 100%;
  position: absolute;
  width: 100%;
  overflow-y: auto;
  transform: translateX(-100%);
  background-color: $block-back-col-blue;
  transition: transform 0.3s 0.2s ease-in-out;
  will-change: transform;

  @media (min-width: $media-pc) {
    transform: translateX(0%);
    position: static;
    display: flex;
    height: 100%;
    background-color: $block-back-col;
  }

  &.active {
    transform: translateX(0%);
    transition: transform 0.3s 0.2s ease-in-out;
    will-change: transform;
  }
}

.menu {
  @media (min-width: $media-pc) {
    display: grid;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $block-back-col;
    grid:
      '. location shops . to-buyers . projects . call . notifications . enter . registration .' 39.36px
      / 4.92px 239.15px auto 10px auto 10px auto 1fr auto 20px auto 20px auto 10px auto 3.5px;
  }
}

.menu-item {
  @include vhMedia(0 2.5vh, padding);
  @include vhMedia(9.5vh);
  align-items: center;
  display: flex;
  width: 100%;
  background-color: $block-back-col;
  border-bottom: $bord;

  @media (min-width: $media-pc) {
    height: auto;
    padding: 0;
    white-space: nowrap;
    border-bottom: 0;
  }

  &:nth-last-child(-n + 5) {
    @include font(2.8vh, $text-col-light, 1.7vh);
    @include vhMedia(0 3.2vh, padding);
    background-color: $block-back-col-blue;
    border-bottom: $bord-light;

    @media (min-width: $media-pc) {
      @include font(12.792px, currentColor);
      padding: 0;
      background-color: $block-back-col;
      border-bottom: 0;
    }

    /deep/ > svg {
      fill: $text-col-x-light;

      @media (min-width: $media-pc) {
        fill: $text-col-light;
      }
    }
  }

  &:last-child {
    border-bottom: 0;
  }

  &.location {
    @media (min-width: $media-pc) {
      width: auto;
      justify-self: start;
      grid-area: location;

      /deep/ > svg:first-child {
        display: inline;
      }

      /deep/ > .main-text {
        margin-left: 4.92px;
      }
    }
  }

  &.call {
    position: relative;

    @media (min-width: $media-pc) {
      grid-area: call;

      /deep/ > svg:first-child {
        display: inline;
      }
    }

    /deep/ > .main-text {
      @include vhMedia(2.7vh, line-height);

      @media (min-width: $media-pc) {
        @include font(13.776px, $lineHeight: 13.776px, $weight: 600);
        margin-left: 4.92px;
      }
    }

    /deep/ > a {
      @include hide-on-pc;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &.enter {
    @media (min-width: $media-pc) {
      grid-area: enter;
    }
  }

  &.registraiton {
    display: none;

    @media (min-width: $media-pc) {
      @include font(12.792px, currentColor);
      display: block;
      cursor: pointer;
      grid-area: registration;
    }
  }

  &.show-catalog {
    @include hide-on-pc;
    color: $text-col-x-light;
    background-color: $block-back-col-orange;
    outline: none;

    /deep/ > svg {
      fill: $text-col-x-light;
    }
  }

  &.cart {
    @include hide-on-pc;
  }

  &.compare {
    @include hide-on-pc;
  }

  &.favourite {
    @include hide-on-pc;
  }

  &.notifications {
    @media (min-width: $media-pc) {
      align-items: center;
      justify-content: center;
      display: flex;
      width: 25px;
      height: 25px;
      border: $bord;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-left-radius: 25px;
      place-self: center;
      grid-area: notifications;

      /deep/ > svg:first-child {
        display: block;
        width: 13.109px;
        height: 13.109px;
      }

      /deep/ > .main-text {
        display: none;
      }
    }
  }

  &.pc-configurator {
    @include hide-on-pc;
  }

  &.actions {
    @include hide-on-pc;
  }

  &.markdown {
    @include hide-on-pc;
  }

  &.shops {
    @media (min-width: $media-pc) {
      grid-area: shops;
    }
  }

  &.main-page {
    @include hide-on-pc;
  }

  &.company {
    @include hide-on-pc;
  }

  &.projects {
    @media (min-width: $media-pc) {
      grid-area: projects;
    }
  }

  &.feedback {
    @include hide-on-pc;
  }

  &.to-buyers {
    @media (min-width: $media-pc) {
      grid-area: to-buyers;
    }
  }

  &.price-list {
    @include hide-on-pc;
  }

  /deep/ > svg {
    @include hide-on-pc;
  }

  /deep/ > svg:first-child {
    @include vhMedia(2.5vh);

    @media (min-width: $media-pc) {
      height: 11.808px;
    }
  }

  /deep/ > svg:last-child {
    @include vhMedia(1.7vh);
    margin-left: auto;
  }
}

/deep/ .main-text {
  @include font(2.8vh, $lineHeight: 1.7vh);
  @include vhMedia(1.2vh, margin-left);

  @media (min-width: $media-pc) {
    @include font(12.792px, $lineHeight: 12.792px);
    margin-left: 0;
  }
}

/deep/ .time-to-call-text {
  @include font(2vh, $lineHeight: 2.7vh);
  margin-left: auto;

  @media (min-width: $media-pc) {
    margin-left: 8.856px;
    color: $text-col-dark;
  }
}

</style>