<template>

<button
  class="show-catalog-btn"
  @click="showCatalog"
>
  <VIcon :href="'bag'" />
  <div class="text">
    <span>Каталог</span>
    <span>более 100 000 товаров</span>
  </div>
  <VIcon :href="'arrow-right'" />
</button>

</template>
<script>

export default {
  methods: {
    showCatalog() {
      this.$evBus.$emit('toggle-catalog');
    },
  },
};

</script>
<style scoped lang="scss">

.show-catalog-btn {
  @include hide-on-pc;
  @include vhMedia(0 4vh, padding);
  @include vhMedia(17.5vh);
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  background-color: $block-back-col-orange;
  border-bottom: $bord;

  > svg {
    fill: $text-col-x-light;
  }

  > svg:first-child {
    @include vhMedia(4.5vh);
  }

  > svg:last-child {
    @include vhMedia(2.7vh);
    margin-left: auto;
  }
}

.text {
  @include vhMedia(2vh, margin-left);
  align-items: flex-start;
  flex-flow: column;
  display: flex;
}

.text > span {
  color: $text-col-x-light;
}

.text > span:first-child {
  @include font(3.7vh, $weight: 600);
  @include vhMedia(1vh, margin-bottom);
}

.text > span:last-child {
  @include font(2vh);
}

</style>