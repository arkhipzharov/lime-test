<template>

<div class="slider">
  <RptSliderBanner />
  <div class="switch-to-prev-banner-btn-wrapper">
    <button class="switch-to-prev-banner-btn">
      <VIcon
        :viewBox="null"
        :href="'arrow-left'"
        :x="'-12%'"
      />
    </button>
  </div>
  <div class="switch-to-next-banner-btn-wrapper">
    <button class="switch-to-next-banner-btn">
      <VIcon
        :viewBox="null"
        :x="'12%'"
      />
    </button>
  </div>
  <div class="dotnav">
    <button class="dot current"></button>
    <button
      v-for="n in 3"
      :key="n"
      class="dot"
    ></button>
  </div>
</div>

</template>
<script>

import RptSliderBanner from './RptSliderBanner';

export default {
  components: {
    RptSliderBanner,
  },
};

</script>
<style scoped lang="scss">

.slider {
  display: none;
  position: relative;

  @media (min-width: $media-pc) {
    display: block;
    grid-area: slider;
  }
}

%switch-to-other-banner-btn-containers {
  position: absolute;
  top: 0;
  align-items: center;
  display: flex;
  height: 100%;
}

.switch-to-prev-banner-btn-wrapper {
  @extend %switch-to-other-banner-btn-containers;
  left: 0;
}

.switch-to-next-banner-btn-wrapper {
  @extend %switch-to-other-banner-btn-containers;
  right: 0;
}

%switch-to-other-banner-btns {
  @include vhMedia(4.3vh, height, (pc: 10%));
  @include vhMedia(3.1vh, width, (pc: 10%));
  align-items: center;
  display: flex;
  background-color: rgba($block-back-col-light, 0.2);

  @media (min-width: $media-pc) {
    cursor: pointer;
  }

  > svg {
    height: 40%;
    fill: rgba($icon-col, 0.5);
  }
}

.switch-to-prev-banner-btn {
  @extend %switch-to-other-banner-btns;
  @include vhMedia(4vh, border-top-right-radius, (pc: 10%));
  @include vhMedia(4vh, border-bottom-right-radius, (pc: 10%));
}

.switch-to-next-banner-btn {
  @extend %switch-to-other-banner-btns;
  @include vhMedia(4vh, border-top-left-radius, (pc: 10%));
  @include vhMedia(4vh, border-bottom-left-radius, (pc: 10%));
}

.dotnav {
  @include vhMedia(0.7vh, margin-bottom, (pc: 10%));
  position: absolute;
  bottom: 0;
  justify-content: center;
  display: flex;
  width: 100%;
}

.dot {
  @include vhMedia(1.1vh, height, (pc: 10%));
  @include vhMedia(1.1vh, width, (pc: 10%));
  @include vhMedia(1.3vh, margin-right, (pc: 10%));
  display: block;
  background-color: $block-back-col-light;
  border-radius: 50%;
  opacity: 0.5;

  @media (min-width: $media-pc) {
    cursor: pointer;
  }

  &.current {
    background-color: $block-back-col-light;
    opacity: 1;
  }
}

</style>