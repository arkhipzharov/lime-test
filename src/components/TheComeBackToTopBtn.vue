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
      pageScrollOffset: 0,
      pageHeight: 0,
    };
  },
  mounted() {
    this.pageHeight = document.documentElement.clientHeight;
    window.addEventListener(
      'scroll',
      this.toggleComeBackToTopBtnVisibilityDependingOnPageScrollOffset,
    );
  },
  methods: {
    toggleComeBackToTopBtnVisibilityDependingOnPageScrollOffset() {
      this.pageScrollOffset = window.pageYOffset;
      const maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
        = this.pageHeight * 4;
      if (
        this.pageScrollOffset
        > maxPageScrollOffsetToComfortablyComeBackToTopByManualScrolling
      ) {
        this.isComeBackToTopBtnVisible = true;
      } else {
        this.isComeBackToTopBtnVisible = false;
      }
    },
    comeBackToTop() {
      if (this.pageScrollOffset > 0) {
        window.scrollBy(0, -(this.pageHeight / 2));
        setTimeout(this.comeBackToTop, 0);
      }
    },
  },
};

</script>
<style scoped lang="scss">

.come-back-to-top-btn {
  @include vhMedia(8vh, width);
  @include vhMedia(8vh, height);
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