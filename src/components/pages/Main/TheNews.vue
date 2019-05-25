<template>

<div class="news">
  <h1>Новости</h1>
  <div class="news-cont-wrap-wrap">
    <div class="news-cont-wrap">
      <div class="news-cont">
        <RptNewsItem
          v-for="n in 4"
          :key="n"
        />
      </div>
    </div>
  </div>
</div>

</template>
<script>

import RptNewsItem from './RptNewsItem.vue';

export default {
  components: {
    RptNewsItem,
  },
};

</script>
<style scoped lang="scss">

.news {
  @include vhMedia(2.9vh 0 3vh, padding, (tablet: 15%));
  @include vhMedia(2.5vh, margin-bottom);
  background-color: $block-back-col;
  border: $bord;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    align-self: start;
    padding: 0;
    margin-top: 735.7368px;
    margin-bottom: 0;
    border-width: 1px;
    border-radius: 5px;
    grid-area: aside;
  }
}

.news > h1 {
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  @include font(3.3vh, $weight: 600, $changePercOn: (tablet: 15%));
  @include vhMedia(3vh, margin-bottom, (tablet: 15%));

  @media (min-width: $media-pc) {
    padding: 15.744px 17.22px 16.728px;
    margin: 0;
    font-size: 19px;
  }
}

.news-cont-wrap-wrap {
  @include vhMedia(36vh, height, (tablet: 15%));
  position: relative;

  @media (min-width: $media-pc) {
    height: auto;
  }
}

.news-cont-wrap {
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

.news-cont {
  @include vhMedia(184vh, width, (tablet: 15%));
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  display: flex;
  height: 100%;

  @media (min-width: $media-pc) {
    display: block;
    width: 100%;
    height: auto;
    padding: 0;
  }
}

</style>