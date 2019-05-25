<template>

<div class="empty-cart">
  <VIcon :href="'cart'" />
  <h1>Ваша корзина пуста</h1>
  <div class="go-to-catalog-text">
    <span>Для добавления товаров в корзину</span>
    <router-link to="/"> перейдите в каталог</router-link>
  </div>
</div>

</template>
<script>

export default {

};

</script>
<style scoped lang="scss">

.empty-cart {
  @include vhMedia(6vh 2.5vh, padding);
  flex-direction: column;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $block-back-col;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    border: $bord;
    border-width: 1px;
    border-radius: 5px;
  }
}

.empty-cart > svg {
  @include vhMedia(11vh);
  @include vhMedia(1.5vh, margin-bottom);
  width: 100%;
  fill: currentColor;
}

.empty-cart > h1 {
  @include font(3vh, $weight: 600, $textAlign: center);
  @include vhMedia(4vh,  margin-bottom);
}

.go-to-catalog-text {
  @include font($lineHeight: 3.5vh, $textAlign: center);
  align-items: center;
  flex-direction: column;
  display: flex;

  @media (min-width: $media-pc) {
    display: block;
  }

  > a {
    color: $text-col-blue;
  }
}

</style>