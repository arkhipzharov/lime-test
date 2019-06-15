<template>

<div class="app">
  <TheComeBackToTopBtn />
  <TheHeader />
  <router-view />
  <TheFooter />
</div>

</template>
<script>
import TheComeBackToTopBtn from './TheComeBackToTopBtn';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  components: {
    TheComeBackToTopBtn,
    TheHeader,
    TheFooter,
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