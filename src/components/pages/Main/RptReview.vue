<template>

<div class="review">
  <div class="cont">
    <a
      href="##"
      class="img"
    >
      <img
        src="~@/img/items/128.jpg"
        alt=""
      >
    </a>
    <a
      href="##"
      class="descr-and-gradient-mask"
    >
      Обзор и тест видеокарты KFA2 GeForce GTX 1060 OC.
    </a>
    <div class="author">
      <VIcon :href="'person'" />
      <span>Lorem ipsum dolor</span>
    </div>
  </div>
  <span class="date">26 февраля 2019 г. 02:35</span>
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

.review {
  @include vhMedia(2vh, margin-right, (tablet: 15%));
  @include vhMedia(1.5vh, border-radius, (tablet: 15%));
  position: relative;
  flex: 1 1 0;
  flex-direction: column;
  display: flex;
  height: 100%;
  overflow: hidden;
  border: $bord;

  @media (min-width: $media-pc) {
    display: block;
    width: auto;
    height: auto;
    padding: 15px;
    margin-right: 0;
    border-width: 0 1px 1px 0;
    border-radius: 0;

    &:nth-child(4n) {
      border-right-width: 0;
    }

    &:nth-last-child(-n + 4) {
      border-bottom: 0;
    }
  }

  &:last-child {
    margin-right: 0;
  }
}

.cont {
  position: relative;
  height: 83.54%;
  border-bottom: $bord;

  @media (min-width: $media-pc) {
    height: 96%;
    border: 0;
  }
}

.img {
  display: block;
  width: 100%;
  height: 100%;

  @media (min-width: $media-pc) {
    height: 53%;
  }

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 0;

    @media (min-width: $media-pc) {
      object-fit: contain;
      object-position: center;
    }
  }
}

.descr-and-gradient-mask {
  @include font(
    $size: 2.8vh,
    $color: $text-col-light,
    $lineHeight: 3.8vh,
    $weight: 600,
    $textAlign: center,
    $changePercOn: (tablet: 15%)
  );
  position: absolute;
  top: 0;
  align-items: center;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 6%;
  background: radial-gradient(
    345.09px at 2.11% 15.96%,
    rgba(0, 20, 178, 0.8) 0%,
    rgba(69, 24, 87, 0.8) 64.73%,
    rgba(17, 140, 99, 0.8) 100%
  ) 105% 105%;

  @media (min-width: $media-pc) {
    @include font(16px, $text-col, $weight: 400, $textAlign: left);
    position: static;
    display: block;
    height: 28%;
    padding: 0;
    margin: 10.5px 0 11.3px;
    overflow: hidden;
    background: none;
  }
}

.author {
  @include vhMedia(0.4vh, border-radius, (tablet: 15%));
  position: absolute;
  top: 8%;
  right: 5.2%;
  align-items: center;
  z-index: 20;
  display: flex;
  padding: 2% 4% 2% 3.3%;
  background-color: $block-back-col-purple;

  @media (min-width: $media-pc) {
    position: static;
    padding: 0;
    background-color: transparent;
  }

  > svg {
    @include vhMedia(2.1vh, width, (tablet: 15%));
    fill: $text-col-light;

    @media (min-width: $media-pc) {
      fill: currentColor;
    }
  }

  > span {
    @include font(2vh,
      $color: $text-col-light,
      $whiteSpace: nowrap,
      $changePercOn: (tablet: 15%)
    );
    @include vhMedia(1.4vh, margin-left, (tablet: 15%));

    @media (min-width: $media-pc) {
      color: currentColor;
    }
  }
}

.date {
  @include font(2vh, $text-col-dark, $changePercOn: (tablet: 15%));
  display: block;
  padding: 0 5.5%;
  margin: 4.6% 0;

  @media (min-width: $media-pc) {
    padding: 0;
    margin: 0;
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