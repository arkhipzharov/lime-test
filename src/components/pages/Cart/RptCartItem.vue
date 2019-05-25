<template>

<div class="cart-item">
  <a
    href="##"
    class="img"
  >
    <img
      :src="require(`@/img/items/${data.id}.jpg`)"
      alt=""
    >
  </a>
  <div class="cont">
    <a
      href="##"
      class="descr"
    >
      {{ data.descr }}
    </a>
    <div class="price">
      <span>{{ data.price }}</span>
      <VIcon :href="'euro'" />
    </div>
    <div class="sum">
      <button
        class="decr-sum-btn"
        @click="changeSumByBtns('decrease')"
      >
        <VIcon :href="'minus'" />
      </button>
      <input
        v-model.number="changeSumByTyping"
        type="number"
        @focus="$event.target.select()"
      >
      <button
        class="incr-sum-btn"
        @click="changeSumByBtns('increase')"
      >
        <VIcon :href="'plus'" />
      </button>
    </div>
  </div>
  <button
    class="remove-btn"
    @click="remove"
  >
    <VIcon :href="'trash'" />
  </button>
</div>

</template>
<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    cartItemsStorData: {
      type: Array,
      required: true,
    },
    cartItemsData: {
      type: Array,
      required: true,
    },
    cartItemsTotalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sum: 1,
    };
  },
  computed: {
    changeSumByTyping: {
      get() {
        return this.sum;
      },
      set(sum) {
        const maxSum = this.data.maxSum;
        if (sum > 0) {
          const cartItemsStorData = this.cartItemsStorData;
          const storDataInd = cartItemsStorData.findIndex(
            (storData) => storData.id === this.data.id,
          );
          const [ storData ] = cartItemsStorData.splice(storDataInd, 1);
          if (sum < maxSum) {
            if (sum > 1) {
              storData.sum = sum;
            } else if (storData.sum) {
              delete storData.sum;
            }
          } else {
            sum = maxSum;
            storData.sum = sum;
          }
          this.sum = sum;
          cartItemsStorData.splice(storDataInd, 0, storData);
          this.$evBus.$emit(
            'update-cart-items-stor-data', cartItemsStorData,
          );
          localStorage.cartItemsData = JSON.stringify(cartItemsStorData);
          this.updateCartItemsTotalPriceByTypingSum(sum);
        }
      },
    },
  },
  mounted() {
    const storData = this.cartItemsStorData.find(
      (storData) => storData.id === this.data.id,
    );
    if (storData.sum) {
      this.sum = storData.sum;
    }
  },
  methods: {
    updateCartItemsTotalPriceByTypingSum(sum) {
      const cartItemsTotalPrice = this.cartItemsStorData.reduce(
        (totalPrice, storData) => {
          if (storData.id === this.data.id) {
            totalPrice += this.data.price * sum;
          } else {
            const data = this.cartItemsData.find(
              (data) => data.id === storData.id,
            );
            const storSum = storData.sum;
            if (storSum) {
              totalPrice += data.price * storSum;
            } else {
              totalPrice += data.price;
            }
          }
          return totalPrice;
        }, 0,
      );
      this.$evBus.$emit('update-cart-items-total-price', cartItemsTotalPrice);
      this.$evBus.$emit(
        'update-cart-items-total-price-text', cartItemsTotalPrice,
      );
      localStorage.cartItemsTotalPrice = JSON.stringify(cartItemsTotalPrice);
    },
    remove() {
      this.$el.remove();
      const data = this.data;
      const cartItemsStorData = this.cartItemsStorData;
      const storDataInd = cartItemsStorData.findIndex(
        (storData) => storData.id === data.id,
      );
      if (cartItemsStorData.length > 1) {
        cartItemsStorData.splice(storDataInd, 1);
        localStorage.cartItemsData = JSON.stringify(cartItemsStorData);
        let cartItemsTotalPrice = this.cartItemsTotalPrice;
        cartItemsTotalPrice -= data.price * this.sum;
        this.$evBus.$emit(
          'update-cart-items-total-price', cartItemsTotalPrice,
        );
        this.$evBus.$emit(
          'update-cart-items-total-price-text', cartItemsTotalPrice,
        );
        localStorage.cartItemsTotalPrice = cartItemsTotalPrice;
      } else {
        this.$evBus.$emit('should-cart-be-empty', true);
        this.$evBus.$emit('clearing-cart-clear-storage');
      }
      this.$evBus.$emit('update-cart-items-stor-data', cartItemsStorData);
    },
    changeSumByBtns(changeSumAction) {
      let sum = this.sum;
      if (
        (changeSumAction === 'increase' && sum > 0 && sum < this.data.maxSum)
        || (changeSumAction === 'decrease' && sum > 1)
      ) {
        const data = this.data;
        const price = data.price;
        const cartItemsStorData = this.cartItemsStorData;
        const storDataInd = cartItemsStorData.findIndex(
          (storData) => storData.id === data.id,
        );
        const [ storData ] = cartItemsStorData.splice(storDataInd, 1);
        let cartItemsTotalPrice = this.cartItemsTotalPrice;
        if (changeSumAction === 'increase') {
          storData.sum = ++sum;
          cartItemsTotalPrice += price;
        } else if (changeSumAction === 'decrease') {
          if (sum === 2) {
            sum--;
            delete storData.sum;
            cartItemsTotalPrice -= price;
          } else {
            storData.sum = --sum;
            cartItemsTotalPrice -= price;
          }
        }
        this.sum = sum;
        cartItemsStorData.splice(storDataInd, 0, storData);
        localStorage.cartItemsData = JSON.stringify(cartItemsStorData);
        localStorage.cartItemsTotalPrice = cartItemsTotalPrice;
        this.$evBus.$emit(
          'update-cart-items-stor-data', cartItemsStorData,
        );
        this.$evBus.$emit(
          'update-cart-items-total-price', cartItemsTotalPrice,
        );
        this.$evBus.$emit(
          'update-cart-items-total-price-text', cartItemsTotalPrice,
        );
      }
    },
  },
};

</script>
<style scoped lang="scss">

.cart-item {
  @include vhMedia(2vh, padding);
  align-items: center;
  display: flex;
  background-color: $block-back-col;
  border-bottom: $bord;

  @media (min-width: $media-tablet) {
    @include vh(1.7vh 2vh, padding, true);
    align-items: flex-start;
  }

  @media (min-width: $media-pc) {
    padding: 15px;

    &:last-child {
      border-bottom: 0;
    }
  }
}

.img {
  @include vhMedia(10vh);
  @include vhMedia(10vh, width);
  flex-shrink: 0;
  display: block;

  @media (min-width: $media-tablet) {
    @include vh(11vh, $tablet: true);
    @include vh(11vh, width, true);
  }

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.cont {
  @include vhMedia(0 2vh, margin);
  @include vhMedia(
    'descr . sum' auto
    '. . sum' 1.9vh
    'price . sum' 1fr,
    grid
  );
  @include vhMedia(1fr 2vh auto, grid-template-columns);
  align-self: stretch;
  flex: 1 1 0;
  display: grid;

  @media (min-width: $media-tablet) {
    @include vh(0 2.5vh 0 1.5vh, margin, true);
    align-items: flex-start;
    flex: 1 1 0;
    display: flex;
  }
}

.descr {
  grid-area: descr;

  @media (min-width: $media-tablet) {
    @include vh(4vh,  margin-right, true);
    display: block;
  }
}

.price {
  align-self: start;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  grid-area: price;

  @media (min-width: $media-tablet) {
    @include vh(0.2vh, margin-top, true);
    @include vh(11vh, width, true);
    order: 1;
  }

  > span {
    @include font($size: 3.4vh, $weight: 600);
    @include vhMedia(0.7vh, margin-right);
  }

  > svg {
    @include vhMedia(2.4vh);
  }
}

.sum {
  align-items: center;
  display: flex;
  grid-area: sum;

  @media (min-width: $media-tablet) {
    @include vh(0 2.5vh 0 auto, margin, true);
  }
}

%change-sum-btns {
  @include vh(3vh, $tablet: true);
  @include vh(3vh, width, true);
  align-items: center;
  justify-content: center;
  display: none;
  background-color: $block-back-col;
  border: $bord;
  cursor: pointer;

  @media (min-width: $media-tablet) {
    display: flex;
  }

  > svg {
    @include vh(1.5vh, $tablet: true);
  }
}

.incr-sum-btn {
  @extend %change-sum-btns;
  @include vh(0 0.42vh 0.42vh 0, border-radius, true);
  border-left: 0;
}

.sum > input {
  @include vhMedia(6vh, width);
  @include vhMedia(6vh, height);
  @include vhMedia(0.2vh, padding-bottom);
  @include vhMedia(0.7vh, border-radius);
  display: block;
  text-align: center;
  background-color: $block-back-col;
  border: $bord;

  @media (min-width: $media-tablet) {
    @include vh(3vh, $tablet: true);
    @include vh(3vh, width, true);
    @include vh(0.1vh, padding-bottom, true);
    border-width: 1px 0;
    border-radius: 0;
  }
}

.decr-sum-btn {
  @extend %change-sum-btns;
  @include vh(0.42vh 0 0 0.42vh, border-radius, true);
  border-right: 0;
}

.remove-btn {
  @media (min-width: $media-tablet) {
    @include vh(3vh, $tablet: true);
    @include vh(3vh, width, true);
    @include vh(0.42vh, border-radius, true);
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: $block-back-col;
    border: $bord;
    cursor: pointer;
  }

  > svg {
    @include vhMedia(3.5vh);
    display: block;

    @media (min-width: $media-tablet) {
      @include vh(1.5vh, $tablet: true);
    }
  }
}

</style>