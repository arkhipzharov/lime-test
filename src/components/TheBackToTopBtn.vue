<template>

<button
  :class="['come-back-to-top-btn', { visible: isComeBackToTopBtnVisible }]"
  @click="comeBackToTop"
>
  <VIcon :href="'arrow-up'" />
</button>

</template>
<script>

export default {
  data() {
    return {
      isComeBackToTopBtnVisible: false,
    };
  },
  mounted() {
    window.addEventListener(
      'scroll',
      this.toggleComeBackToTopBtnVisibilityDependingOnPageScrollOffset,
    );
  },
  methods: {
    toggleComeBackToTopBtnVisibilityDependingOnPageScrollOffset() {
      const pageScrollOffset = window.pageYOffset;
      const pageHeight = document.documentElement.clientHeight;
      const maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
        = pageHeight * 4;
      if (
        pageScrollOffset
        > maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
      ) {
        this.isComeBackToTopBtnVisible = true;
      } else {
        this.isComeBackToTopBtnVisible = false;
      }
    },
    async comeBackToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -70);
        setTimeout(this.comeBackToTop, 0);
      }
    },
  },
};

</script>
<style scoped lang="scss">

.come-back-to-top-btn {
  @include vhMedia(7.5vh, width);
  @include vhMedia(7.5vh, height);
  @include vhMedia(3vh, right);
  @include vhMedia(3vh, bottom);
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $block-back-col-orange;
  border-radius: 50%;
  position: fixed;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;

  &.visible {
    transition: opacity 0.3s, visibility 0s;
    visibility: visible;
    opacity: 0.3;

    @media (min-width: $media-pc) {
      &:hover {
        transition: opacity 0.3s;
        opacity: 1;
      }
    }
  }

  > svg {
    fill: $icon-col-light;
    width: 40%;
    height: 40%;
  }
}

</style>