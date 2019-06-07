<template>

<div class="action">
  <a
    href="##"
    class="img"
  >
    <img
      src="~@/img/actions/samsung.jpg"
      alt=""
    >
  </a>
  <a
    href="##"
    class="descr"
  >
    Рассрочка или бонусы! Бытовая техника Samsung Lorem ipsum
  </a>
  <span class="period">
    Срок проведения акции: с 22 февраля по 24 марта 2019 года
  </span>
  <a
    href="##"
    class="link-mask"
  ></a>
</div>

</template>
<script>

export default {

};

</script>
<style scoped lang="scss">

.action {
  @include vhMedia(2vh, margin-right, (tablet: 15%));
  @include vhMedia(1.5vh, border-radius, (tablet: 15%));
  position: relative;
  flex: 1 1 0;
  height: 100%;
  overflow: hidden;
  border: $bord;

  @media (min-width: $media-pc) {
    height: auto;
    padding: 15px 15px 17px;
    margin-right: 0;
    border-radius: 5px;
  }

  &:last-child {
    margin: 0;

    @media (min-width: $media-pc) {
      display: none;
    }

    @media (min-width: 1195px) {
      display: block;
    }
  }
}

.img {
  border-bottom: $bord;
  display: block;

  > img {
    display: block;
    width: 100%;
  }
}

.descr {
  @include font(
    $size: 2.8vh,
    $lineHeight: 3.8vh,
    $weight: 600,
    $textAlign: center,
    $changePercOn: (tablet: 15%)
  );
  align-items: center;
  display: flex;
  height: 19%;
  padding: 0 8%;
  margin: 10% 0;

  @media (min-width: $media-pc) {
    @include font(16px, $lineHeight: 21.648px);
    padding: 0 3%;
  }
}

.period {
  @include font(
    $size: 2.4vh,
    $color: $text-col-dark,
    $lineHeight: 3.8vh,
    $textAlign: center,
    $changePercOn: (tablet: 15%)
  );
  display: block;
  padding: 0 8%;

  @media (min-width: $media-pc) {
    @include font(13.3px, $lineHeight: 19.68px, $weight: 400);
    padding: 0;
  }
}

.link-mask {
  @include hide-on-pc;
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}

</style>