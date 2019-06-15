<template>

<Fragment>
  <TheCartItems />
  <TheTotal />
</Fragment>

</template>
<script>

import TheCartItems from './TheCartItems';
import TheTotal from './TheTotal';

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