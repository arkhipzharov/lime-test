<template>

<div class="container">
  <slot></slot>
</div>

</template>
<script>

export default {

};

</script>
<style scoped lang="scss">

.container {
  @include vhMedia(2.5vh, margin-bottom);
  @include layout-media-pc;
  flex: 1 0 auto;

  @media (min-width: $media-pc) {
    margin: 20px auto;
  }
}

</style>