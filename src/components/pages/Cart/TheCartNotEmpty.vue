<template>

<Fragment>
  <TheCartItems />
  <TheTotal />
</Fragment>

</template>
<script>

import TheCartItems from './TheCartItems.vue';
import TheTotal from './TheTotal.vue';

export default {
  components: {
    TheCartItems,
    TheTotal,
  },
  beforeDestroy() {
    // Это событие вызывало callback дважды
    this.$evBus.$off('should-cart-be-empty');
  },
};

</script>