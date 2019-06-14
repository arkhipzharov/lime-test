<template>

<div class="app">
  <TheBackToTopBtn />
  <TheHeader />
  <router-view />
  <TheFooter />
</div>

</template>
<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheBackToTopBtn from './components/TheBackToTopBtn.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheBackToTopBtn,
  },
};

</script>
<style lang="scss">

html {
  height: 100%;
}

body {
  @include font(
    $size: 2.5vh,
    $color: $text-col,
    $family: $font-fam-pt-sans
  );
  height: 100%;
  min-width: 320px;
  background-color: $block-back-col-light;

  &.noscroll {
    overflow-y: hidden;
  }

  @media (min-width: $media-pc) {
    font-size: 16px;
  }
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

</style>