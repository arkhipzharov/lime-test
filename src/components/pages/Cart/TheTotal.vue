<template>

<div class="total">
  <div class="price">
    <span>Итого: </span>
    <div class="price-cont">
      <span>{{ cartItemsTotalPrice }}</span>
      <VIcon :href="'euro'" />
    </div>
  </div>
  <button class="make-order-btn">Оформить заказ</button>
  <button
    class="clear-cart-btn"
    @click="clearCart"
  >
    Очистить корзину
  </button>
</div>

</template>
<script>

export default {
  data() {
    return {
      cartItemsTotalPrice: 0,
    };
  },
  mounted() {
    this.$evBus.$on(
      'update-cart-items-total-price-text', (cartItemsTotalPrice) => {
        this.cartItemsTotalPrice = cartItemsTotalPrice;
      },
    );
  },
  methods: {
    clearCart() {
      this.$evBus.$emit('should-cart-be-empty', true);
      this.$evBus.$emit('clearing-cart-clear-storage');
    },
  },
};

</script>
<style scoped lang="scss">

.total {
  @include vhMedia(3vh, padding, (tablet: 40%));
  flex: 1 1 0;
  background-color: $block-back-col;

  @media (min-width: $media-tablet) {
    align-items: center;
    display: flex;
  }

  @media (min-width: $media-pc) {
    flex: 1 1 0;
    display: block;
    border: $bord;
    border-radius: 5px;
  }
}

.price {
  @include vhMedia(3vh, margin-bottom);

  @media (min-width: $media-tablet) {
    @include vh(16vh, width);
    margin-bottom: 0;
  }

  @media (min-width: $media-pc) {
    margin-bottom: 20px;
  }

  > span {
    @include vhMedia(1.5vh, margin-bottom);
    @include font(2.5vh);
    display: block;
  }
}

.price-cont {
  display: flex;
  align-items: center;

  > span {
    @include vhMedia(0.7vh, margin-right);
    @include font(4.4vh, $weight: 600);
    display: block;
  }

  > svg {
    @include vhMedia(3.1vh);
  }
}

%btns {
  @include vhMedia(2.3vh 7vh 2.5vh 7vh, padding);
  @include vhMedia(0.7vh, border-radius);
  display: block;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  border: $bord;
  cursor: pointer;
}

.make-order-btn {
  @extend %btns;
  color: $text-col-x-light;
  background-color: $block-back-col-orange;
  border-color: $orange;

  @media (min-width: $media-tablet) {
    flex: 1 0 0;
  }

  @media (min-width: $media-pc) {
    margin: 0 0 10px;
  }
}

.clear-cart-btn {
  @extend %btns;
  @include vhMedia(1.5vh, margin-top);
  background-color: $block-back-col;

  @media (min-width: $media-tablet) {
    @include vh(0 0 0 2vh, margin);
    width: auto;
  }

  @media (min-width: $media-pc) {
    width: 100%;
    margin: 0;
  }
}

</style>