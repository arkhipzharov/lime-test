<template>

<TheCatalog />

</template>
<script>

import TheCatalog from '@/components/TheCatalog.vue';

export default {
  components: {
    TheCatalog,
  },
};

</script>
<style scoped lang="scss">

/deep/ .catalog {
  @media (min-width: $media-pc) {
    display: none;
  }
}

</style>