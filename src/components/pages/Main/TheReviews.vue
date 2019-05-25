<template>

<div class="reviews">
  <h1>Обзоры</h1>
  <div class="reviews-cont-wrap-wrap">
    <div class="reviews-cont-wrap">
      <div class="reviews-cont">
        <RptReview
          v-for="n in 8"
          :key="n"
        />
      </div>
    </div>
  </div>
</div>

</template>
<script>

import RptReview from './RptReview.vue';

export default {
  components: {
    RptReview,
  },
};

</script>
<style scoped lang="scss">

.reviews {
  @include vhMedia(2.9vh 0 3vh, padding, (tablet: 15%));
  background-color: $block-back-col;
  border: $bord;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: 0;
    grid-area: reviews;
  }
}

.reviews > h1 {
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  @include font(3.3vh, $weight: 600, $changePercOn: (tablet: 15%));
  @include vhMedia(3vh, margin-bottom, (tablet: 15%));

  @media (min-width: $media-pc) {
    @include font(22px, $textAlign: left);
    padding: 23.616px 0 24.6px;
    margin: 0;
  }
}

.reviews-cont-wrap-wrap {
  @include vhMedia(36vh, height, (tablet: 15%));
  position: relative;

  @media (min-width: $media-pc) {
    height: auto;
  }
}

.reviews-cont-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  @media (min-width: $media-pc) {
    position: static;
    height: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.reviews-cont {
  @include vhMedia(364vh, width, (tablet: 15%));
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  display: flex;
  height: 100%;

  @media (min-width: $media-pc) {
    display: grid;
    width: 100%;
    height: auto;
    padding: 0;
    border: $bord;
    border-radius: 5px;
    grid: 309px / repeat(4, 1fr);
    grid-auto-rows: 309px;
  }
}

</style>