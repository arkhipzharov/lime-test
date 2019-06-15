<template>

<div class="cart-items">
  <component
    :is="RptCartItem"
    v-for="data in cartItemsData"
    :key="data.id"
    :data="data"
    :cartItemsData="cartItemsData"
    :cartItemsStorData="cartItemsStorData"
    :cartItemsTotalPrice="cartItemsTotalPrice"
  />
</div>

</template>
<script>

import fetchData from '@/js/modules/fetch';
import manyAsyncFunCallProms from '@/js/modules/promises';

export default {
  data() {
    return {
      cartItemsData: null,
      cartItemsTotalPrice: 0,
      clearingCartStorItemsToRemove: [
        'cartItemsTotalPrice', 'cartItemsData',
      ],
    };
  },
  computed: {
    RptCartItem() {
      if (this.cartItemsData) return () => import('./RptCartItem');
    },
  },
  async mounted() {
    const cartItemsStorData = JSON.parse(localStorage.cartItemsData);
    this.cartItemsStorData = cartItemsStorData;
    let dataUrlPre = '/src/data/items/';
    if (process.env.NODE_ENV === 'production') {
      // Раскомментируйте в код в комментарии, и закомментируйте
      // помеченный пустыми комментариями для работы в localhost
      // dataUrlPre = '/Project/dist/data/items/';
      //
      dataUrlPre = 'http://lime-test.h1n.ru/data/items/';
      //
    }
    const cartItemDataUrls = cartItemsStorData.reduce((urls, storData) => {
      urls.push(`${dataUrlPre}${storData.id}.json`);
      return urls;
    }, []);
    const cartItemsData = await Promise.all(
      manyAsyncFunCallProms(fetchData, cartItemDataUrls),
    );
    this.cartItemsData = cartItemsData.sort((data1, data2) => {
      const storData1ind = cartItemsStorData.findIndex(
        (storData) => storData.id === data1.id,
      );
      const storData2ind = cartItemsStorData.findIndex(
        (storData) => storData.id === data2.id,
      );
      return storData1ind - storData2ind;
    });
    let cartItemsTotalPrice;
    if (!localStorage.cartItemsTotalPrice) {
      cartItemsTotalPrice = this.cartItemsData.reduce(
        (totalPrice, data) => totalPrice + data.price, 0,
      );
      localStorage.cartItemsTotalPrice = JSON.stringify(cartItemsTotalPrice);
    } else {
      cartItemsTotalPrice = JSON.parse(localStorage.cartItemsTotalPrice);
    }
    this.cartItemsTotalPrice = cartItemsTotalPrice;
    this.$evBus.$emit(
      'update-cart-items-total-price-text', cartItemsTotalPrice,
    );
    this.$evBus.$on(
      'update-cart-items-stor-data', (cartItemsStorData) => {
        this.cartItemsStorData = cartItemsStorData;
      },
    );
    this.$evBus.$on('update-cart-items-total-price', (totalPriceLocal) => {
      this.cartItemsTotalPrice = totalPriceLocal;
    });
    this.$evBus.$on('clearing-cart-clear-storage', () => {
      this.clearingCartStorItemsToRemove.forEach((name) => {
        localStorage.removeItem(name);
      });
    });
  },
};

</script>
<style scoped lang="scss">

.cart-items {
  @media (min-width: $media-pc) {
    flex: 2.5 1 0;
    margin-right: 20px;
    overflow: hidden;
    border: $bord;
    border-radius: 5px;
  }
}

</style>