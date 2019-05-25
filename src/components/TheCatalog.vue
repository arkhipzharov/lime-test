<template>

<div class="catalog-wrapper">
  <div class="catalog">
    <RptCatalogItem />
  </div>
</div>

</template>
<script>

import RptCatalogItem from './RptCatalogItem.vue';

export default {
  components: {
    RptCatalogItem,
  },
};

</script>
<style scoped lang="scss">

.catalog-wrapper {
  @include layout-media-pc;
  height: 100%;
  position: absolute;
  width: 100%;
  overflow-y: auto;
  background-color: $block-back-col;
  transform: translateX(100%);
  transition: transform 0.3s 0.2s ease-in-out;
  will-change: transform;

  @media (min-width: $media-pc) {
    transform: translateX(0%);
    position: relative;
    height: 0;
    overflow: visible;
  }

  &.active {
    transform: translateX(0%);
    transition: transform 0.3s 0.2s ease-in-out;
    will-change: transform;
  }
}

.catalog {
  background-color: $block-back-col;

  @media (min-width: $media-pc) {
    position: absolute;
    top: 60.762px;
    z-index: 1000;
    width: 221.4px;
  }
}

</style>