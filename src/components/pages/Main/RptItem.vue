<template>

<div class="item">
  <div class="cont">
    <a
      class="img"
      href="##"
    >
      <img :src="require(`@/img/items/${data.id}.jpg`)">
    </a>
    <div class="rating">
      <VIcon
        v-for="n in range(1, 5)"
        :key="n"
        :href="n <= data.rating ? 'star' : 'star-empty'"
      />
    </div>
  </div>
  <a
    class="descr"
    href="##"
  >
    {{ data.descr }}
  </a>
  <div class="price">
    <span>{{ data.price }}</span>
    <VIcon :href="'euro'" />
  </div>
  <button
    class="buy-btn"
    @click="!checkIfInCart() ? addToCart() : redirectToCartPage()"
  >
    <VIcon :href="'cart'" />
    <span>
      {{
        isAddedToCart
          ? 'В корзине'
          : !checkIfInCart()
            ? 'Купить'
            : 'В корзине'
      }}
    </span>
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
  },
  data() {
    return {
      // Позволяет поменять текст кнопки на тот, который уведомляет о том, что
      // товар в корзине сразу после его добавления в корзину
      isAddedToCart: false,
    };
  },
  methods: {
    addToCart() {
      const data = this.data;
      const storData = { id: data.id };
      this.isAddedToCart = true;
      if (localStorage.cartItemsTotalPrice) {
        let cartItemsTotalPrice = JSON.parse(localStorage.cartItemsTotalPrice);
        cartItemsTotalPrice += data.price;
        localStorage.cartItemsTotalPrice = JSON.stringify(cartItemsTotalPrice);
      }
      if (!localStorage.cartItemsData) {
        localStorage.cartItemsData = JSON.stringify([ storData ]);
      } else {
        const cartItemsStorData = JSON.parse(localStorage.cartItemsData);
        cartItemsStorData.push(storData);
        localStorage.cartItemsData = JSON.stringify(cartItemsStorData);
      }
    },
    redirectToCartPage() {
      this.$router.push('cart');
    },
    checkIfInCart() {
      let isInCart = false;
      if (localStorage.cartItemsData) {
        const cartItemsStorData = JSON.parse(localStorage.cartItemsData);
        if (cartItemsStorData.some((el) => el.id === this.data.id)) {
          isInCart = true;
        }
      }
      return isInCart;
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    },
  },
};

</script>
<style scoped lang="scss">

.item {
  @include vhMedia(1.5vh 2vh 2vh 2vh, padding);
  @include vhMedia(
    'header header header' auto
    '. . .' 2vh
    'block block block' 12vh
    'block block block' 1fr
    '. . .' 2vh
    'btn btn btn' auto,
    grid
  );
  @include vhMedia(20vh 6vh 1fr, grid-template-columns);
  display: grid;
  background-color: $block-back-col;
  border-top: $bord;

  @media (min-width: $media-tablet) {
    @include vh(1.6vh 1.8vh, padding);
    @include vh(
      $vals:
        'block . header . btn' auto
        'block . . . btn' 1vh
        'block . price . btn' 1fr,
      $prop: grid,
      $tablet: true
    );
    @include vh(
      $vals: auto 1.5vh 1fr 4vh auto,
      $prop: grid-template-columns,
      $tablet: true
    );
  }

  @media (min-width: $media-pc) {
    padding: 12px;
    margin-bottom: 0;
    border: $bord;
    border-radius: 5px;
    grid:
      'block' 52.4%
      'block' 1fr
      '.' 14.76px
      'price' auto
      '.' 18.696px
      'btn' auto
      / 1fr;
  }

  &:last-child {
    margin-bottom: 0;
    border-bottom: $bord;
  }
}

.cont {
  @include vhMedia(
    'img . rating' 7vh
    'img . .' 1fr,
    grid
  );
  @include vhMedia(auto 6vh 1fr, grid-template-columns);
  display: grid;
  grid-area: block;

  @media (min-width: $media-tablet) {
    flex-direction: column;
    justify-content: space-between;
    display: flex;
  }
}

.descr {
  @include font($lineHeight: 2.9vh);
  grid-area: header;

  @media (min-width: $media-pc) {
    align-self: start;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
}

.img {
  @include vhMedia(20vh);
  @include vhMedia(20vh, width);
  display: block;
  grid-area: img;

  @media (min-width: $media-tablet) {
    @include vh($vals: 11vh, $tablet: true);
    @include vh($vals: 11vh, $prop: width, $tablet: true);
  }

  @media (min-width: $media-pc) {
    width: 100%;
    height: 67%;
  }

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.rating {
  align-self: end;
  grid-area: rating;

  @media (min-width: $media-tablet) {
    @include vh($vals: 1.4vh, $prop: margin-top, $tablet: true);
    justify-content: center;
    display: flex;
    width: 100%;
  }

  @media (min-width: $media-pc) {
    justify-content: flex-start;
  }

  > svg {
    @include vhMedia(2.7vh);
    fill: #F3AE01;
  }
}

.price {
  align-self: start;
  align-items: center;
  display: flex;
  grid-row: 4 / 5;
  grid-column: 3 / 4;

  @media (min-width: $media-tablet) {
    grid-row: none;
    grid-column: none;
    grid-area: price;
  }

  > span {
    @include font(4.4vh, $weight: 600, $changePercOn: (tablet: -10%));
    @include vhMedia(0.7vh, margin-right, (tablet: -10%));
  }

  > svg {
    @include vhMedia(3.2vh, height, (tablet: -10%));
  }
}

.buy-btn {
  @include vhMedia(1.8vh 1vh, padding);
  @include vhMedia(20vh, width, (tablet: 20%, pc: 10%));
  @include vhMedia(0.7vh, border-radius);
  grid-area: btn;
  justify-content: center;
  display: flex;
  background-color: $block-back-col-orange;

  @media (min-width: $media-tablet) {
    @include vh($vals: 1vh 2vh, $prop: padding, $tablet: true);
    align-self: start;
  }

  @media (min-width: $media-pc) {
    padding: 12px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  > svg {
    @include vhMedia(2.2vh);
    fill: $text-col-x-light;
  }

  > span {
    @include font($color: $text-col-x-light, $lineHeight: 2.15vh);
    @include vhMedia(0.8vh, margin-left);
    align-self: flex-start;
  }
}

</style>