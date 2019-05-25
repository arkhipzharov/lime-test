<template>

<footer>
  <div class="projects">
    <div
      v-for="n in 4"
      :key="n"
      class="link-wrapper"
    >
      <a
        href="##"
        class="link"
      >
        <VIcon
          :viewBox="'0 0 133 15'"
          :href="'dns-technopoint'"
        />
      </a>
    </div>
  </div>
  <div class="cont-wrapper">
    <div class="cont">
      <RptFooterNestedBlock />
      <div class="stay-with-us">
        <h1>Оставайтесь на связи</h1>
        <div class="socials">
          <a
            v-for="data in socialNetworksLinksData"
            :key="data.id"
            :class="['social-network-link', data.class]"
            href="##"
          >
            <VIcon
              :viewBox="data.viewBox"
              :href="data.class"
            />
          </a>
        </div>
        <div class="call">
          <span>8-000-00-00-000</span>
          <span> (c 03:00 до 22:00)</span>
        </div>
        <a
          class="addresses-of-shops-link"
          href="##"
        >
          Адреса магазинов в г.Ростов-на-Дону
        </a>
      </div>
    </div>
  </div>
  <div class="responsibility-text">
    <span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
      accusantium quaerat error hic nihil laudantium hic nihil laudantium
    </span>
  </div>
  <span class="copyright-text">@ 0000-0000 Nobody</span>
</footer>

</template>
<script>
import RptFooterNestedBlock from './RptFooterNestedBlock.vue';

export default {
  components: {
    RptFooterNestedBlock,
  },
  data() {
    return {
      socialNetworksLinksData: [
        { class: 'vk', viewBox: '0 0 17.98 10.5', id: 0 },
        { class: 'twitter', viewBox: '0 0 18.3 14.56', id: 1 },
        { class: 'vk', viewBox: '0 0 17.98 10.5', id: 2 },
        { class: 'twitter', viewBox: '0 0 18.3 14.56', id: 3 },
      ],
    };
  },
};

</script>
<style scoped lang="scss">

footer {
  @include vhMedia(3.4vh 2vh, padding);
  background-color: $block-back-col-blue;
  border-top: $bord;

  @media (min-width: $media-pc) {
    flex-direction: column;
    display: flex;
    padding: 22px 0;
  }
}

.projects {
  @include vhMedia(3.8vh, margin-bottom);
  @include layout-media-pc;
  flex-wrap: wrap;
  display: flex;
  width: 100%;

  @media (min-width: $media-tablet) {
    justify-content: space-around;
  }

  @media (min-width: $media-pc) {
    align-self: center;
    justify-content: space-between;
  }
}

.link-wrapper {
  flex-basis: 50%;
  justify-content: center;
  display: flex;

  @media (min-width: $media-tablet) {
    flex-basis: auto;
  }

  &:nth-child(-n+2) {
    @include vhMedia(3vh, margin-bottom);

    @media (min-width: $media-tablet) {
      margin-bottom: 0;
    }
  }
}

.link > svg {
  @include vhMedia(2.2vh);
  display: block;
}

.cont-wrapper {
  @media (min-width: $media-pc) {
    justify-content: center;
    display: flex;
    padding: 25px 0 31px;
    border-top: $bord-light;
  }
}

.cont {
  @include layout-media-pc;

  @media (min-width: $media-pc) {
    justify-content: space-between;
    display: flex;
    width: 100%;
  }
}

.stay-with-us {
  @include vhMedia(3.1vh, margin-bottom);

  @media (min-width: $media-pc) {
    margin: 0;
    grid-area: stay;
  }
}

.stay-with-us > h1 {
  @include font(3vh, $text-col-light, $weight: 600);

  @media (min-width: $media-pc) {
    font-size: 19px;
  }
}

.socials {
  @include vhMedia(3vh 0, margin);
  display: flex;

  @media (min-width: $media-pc) {
    margin: 20px 0 19px;
  }
}

.social-network-link {
  @include vhMedia(6.5vh);
  @include vhMedia(6.5vh, width);
  @include vhMedia(1.2vh, margin-right);
  align-items: center;
  justify-content: center;
  display: flex;
  border: $bord-x-light;
  border-radius: 50%;

  &:last-child {
    margin-right: 0;
  }

  &.vk > svg {
    height: 28.5%;
  }

  &.twitter > svg {
    height: 35%;
  }
}

.call {
  @include vhMedia(2.2vh, margin-bottom);
  display: block;

  @media (min-width: $media-pc) {
    white-space: nowrap;
  }

  > span {
    color: $text-col-light;
  }
}

.addresses-of-shops-link {
  @include font(2.2vh, $text-col-light, $textDecoration: underline);
  display: block;

  @media (min-width: $media-pc) {
    font-size: 14px;
    white-space: nowrap;
  }
}

.responsibility-text {
  @include vhMedia(2.7vh, margin-bottom);
  border: $bord-light;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    justify-content: center;
    display: flex;
    width: 100%;
  }

  > span {
    @include vhMedia(2.2vh 1vh 2.7vh 1vh, padding);
    @include font(2.3vh, $text-col-dark, 3.5vh);
    @include layout-media-pc;
    display: block;
    width: 100%;

    @media (min-width: $media-pc) {
      padding: 14.0712px 20px 15.0552px;
    }
  }
}

.copyright-text {
  @include font(2.3vh, $text-col-dark);
  @include layout-media-pc;

  @media (min-width: $media-pc) {
    align-self: center;
    display: block;
    width: 100%;
  }
}

</style>