<template>

<div class="actions">
  <h1>Акции</h1>
  <div class="actions-cont-wrap-wrap">
    <div class="actions-cont-wrap">
      <div class="actions-cont">
        <RptAction
          v-for="n in 4"
          :key="n"
        />
      </div>
    </div>
  </div>
</div>

</template>
<script>

import RptAction from './RptAction';

export default {
  components: {
    RptAction,
  },
};

</script>
<style scoped lang="scss">

.actions {
  @include vhMedia(2.9vh 0 3vh, padding, (tablet: 15%));
  @include vhMedia(2.5vh, margin-bottom);
  background-color: $block-back-col;
  border: $bord;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    display: grid;
    padding: 0;
    margin-bottom: 0;
    background-color: transparent;
    border: 0;
    grid-area: actions;
  }
}

.actions > h1 {
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  @include vhMedia(3vh, margin-bottom, (tablet: 15%));
  @include font(3.3vh, $weight: 600, $changePercOn: (tablet: 15%));

  @media (min-width: $media-pc) {
    @include font(22px, $textAlign: left);
    padding: 23.616px 0 24.6px;
    margin: 0;
  }
}

.actions-cont-wrap-wrap {
  @include vhMedia(61.7vh, height, (tablet: 15%));
  position: relative;

  @media (min-width: $media-pc) {
    height: auto;
  }
}

.actions-cont-wrap {
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

.actions-cont {
  @include vhMedia(184vh, width, (tablet: 15%));
  @include vhMedia(0 3vh, padding, (tablet: 15%));
  display: flex;
  height: 100%;

  @media (min-width: $media-pc) {
    display: grid;
    width: 100%;
    height: auto;
    padding: 0;
    grid-gap: 12px;
    grid: auto / repeat(3, 1fr);
  }

  @media (min-width: 1195px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>