<template>
<!--
  Элемент темного фона оверлея поиска для его закрытия перемещен в SFC хедера.
  Причина описана там в комментарии 1
-->
<div :class="['search', { active: isSearchElActive }]">
  <input
    type="text"
    placeholder="Поиск среди более 100 000 товаров"
  >
  <button class="search-btn">
    <!--
      Иконка поиска видима также и при активном оверлее поиска, поэтому его
      анимация невозможна
    -->
    <VIcon
      :viewBox="null"
      :href="'search'"
    />
  </button>
  <!--
    При неактивном оверлее поиска внешний элемент умещается в области кнопки
    поиска на телефонах и планшетах, поэтому для него создается маска, при
    нажатии на которую показывается оверлей поиска, чтобы после этого при
    нажатии на кнопку поиска выполнялось другое действие. Имя класса упоминает
    кнопку поиска для лучшего понимания
  -->
  <div
    class="show-search-overlay-search-btn-mask"
    @click="showSearchOverlay"
  ></div>
</div>

</template>
<script>

export default {
  data() {
    return {
      isSearchElActive: false,
      body: null,
    };
  },
  mounted() {
    this.body = document.querySelector('body');
    this.$evBus.$on('close-search-overlay', () => {
      this.isSearchElActive = false;
    });
  },
  methods: {
    showSearchOverlay() {
      this.body.classList.add('noscroll');
      this.isSearchElActive = true;
      this.$evBus.$emit('search-overlay-active-notify-dark-backgr-in-header');
    },
  },
};

</script>
<style scoped lang="scss">

.search {
  @include vhMedia(8vh, width);
  position: relative;
  align-items: center;
  z-index: 1000;
  display: flex;
  height: 100%;

  @media (min-width: $media-pc) {
    flex: 1 1 0;
    margin: 0 22.792px 0 22.632px;
    background-color: $block-back-col-orange;
  }

  &.active {
    @include font(1.5vh);
    @include vhMedia(1.5vh, padding);
    position: absolute;
    width: 100%;
    background-color: $block-back-col;
  }
}

.search > input {
  @include font(2.1vh, $text-col-dark);
  @include vhMedia(0 2vh, padding);
  @include vhMedia(0.7vh 0 0 0.7vh, border-radius);
  flex: 1 1 0;
  display: none;
  height: 100%;
  background-color: $block-back-col;
  border: $bord;
  border-right: 0;
  outline: none;

  @media (min-width: $media-pc) {
    display: block;
    height: 68%;
  }
}

.search.active > input {
  display: block;
}

.search-btn {
  @include vhMedia(8vh, width);
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;

  @media (min-width: $media-pc) {
    position: relative;
    width: 41.574px;
    height: 68%;
    background-color: $block-back-col;
    border: $bord;
    border-left: 0;
    border-radius: 0 4.3788px 4.3788px 0;
    outline: none;
    cursor: pointer;

    &::after {
      position: absolute;
      left: -1px;
      width: 1px;
      height: 55%;
      content: '';
      background-color: $grey-x-light;
    }
  }

  > svg {
    height: 35%;
    fill: $icon-col;

    @media (min-width: $media-pc) {
      height: 45%;
    }
  }
}

.search.active > .search-btn {
  @include vhMedia(6.5vh, width);
  @include vhMedia(0 0.7vh 0.7vh 0, border-radius);
  position: relative;
  background-color: $block-back-col;
  border: $bord;
  border-left: 0;
  outline: none;

  &::after {
    position: absolute;
    left: -1px;
    width: 1px;
    height: 55%;
    content: '';
    background-color: $grey-x-light;
  }

  > svg {
    height: 45%;
  }
}

.show-search-overlay-search-btn-mask {
  @include hide-on-pc;
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.search.active > .show-search-overlay-search-btn-mask {
  display: none;
}

</style>