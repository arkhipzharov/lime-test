<template>

<TheContainer>
  <component :is="containerElContent" />
</TheContainer>

</template>
<script>

import TheContainer from '@/components/TheContainer.vue';

export default {
  components: {
    TheContainer,
  },
  data() {
    return {
      // Корзина всегда становилась пустой после перезагрузки страницы
      // при значении true
      isCartEmpty: null,
    };
  },
  computed: {
    containerElContent() {
      const isCartEmpty = this.isCartEmpty;
      let asyncSFCNameToImport = 'TheCartNotEmpty';
      if (!localStorage.cartItemsData) {
        asyncSFCNameToImport = 'TheCartEmpty';
      } else if (isCartEmpty === true) {
        asyncSFCNameToImport = 'TheCartEmpty';
      }
      return () => import(`./${asyncSFCNameToImport}.vue`);
    },
  },
  mounted() {
    this.$evBus.$on('should-cart-be-empty', (shouldCartBeEmpty) => {
      this.isCartEmpty = shouldCartBeEmpty;
    });
  },
};

</script>
<style scoped lang="scss">

.container {
  flex-direction: column;
  display: flex;
  margin-bottom: 0;

  @media (min-width: $media-pc) {
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>