<template>

<Fragment>
  <VRuntimeTemplate
    v-for="data in footerNestedBlockTemplatesData"
    :key="data.id"
    :template="data.temp"
  />
</Fragment>

</template>
<script>

export default {
  data() {
    return {
      footerNestedBlocksData: [
        {
          headerText: 'Компания',
          linksData: [
            { text: 'Lorem ipsum', id: 0 },
            { text: 'Rem, reiciendis', id: 1 },
            { text: 'Labore, dolores', id: 2 },
            { text: 'Quia, repellat', id: 3 },
            { text: 'Similique, aspernatur', id: 4 },
            { text: 'Tenetur, excepturi', id: 5 },
          ],
          id: 0,
        },
        {
          headerText: 'Покупателям',
          linksData: [
            { text: 'Lorem ipsum', id: 0 },
            { text: 'Tempora, eligendi', id: 1 },
            { text: 'Nisi, fugiat', id: 2 },
            { text: 'Sed, dolor', id: 3 },
            { text: 'Temporibus, culpa', id: 4 },
            { text: 'Iusto, soluta', id: 5 },
            { text: 'Cumque, recusandae', id: 6 },
            { text: 'Nisi, qui', id: 7 },
            { text: 'Odio, distinctio', id: 8 },
          ],
          id: 1,
        },
        {
          headerText: 'Помощь',
          linksData: [
            { text: 'Lorem ipsum', id: 0 },
            { text: 'Vero, hic', id: 1 },
            { text: 'Consequatur, velit', id: 2 },
            { text: 'Ex, deserunt', id: 3 },
            { text: 'Dicta, nisi', id: 4 },
            { text: 'Iste, magnam', id: 5 },
            { text: 'Debitis, consectetur', id: 6 },
          ],
          id: 2,
        },
        {
          headerText: 'Прайс листы',
          paymentMethodsData: [
            { class: 'visa', viewBox: '0 0 25.16 8.22', id: 0 },
            { class: 'qiwi', viewBox: '0 0 18.42 18.42', id: 1 },
            { class: 'maestro', viewBox: '0 0 25.3 15.49', id: 2 },
            { class: 'visa', viewBox: '0 0 25.16 8.22', id: 3 },
            { class: 'qiwi', viewBox: '0 0 18.42 18.42', id: 4 },
            { class: 'maestro', viewBox: '0 0 25.3 15.49', id: 5 },
            { class: 'visa', viewBox: '0 0 25.16 8.22', id: 6 },
            { class: 'qiwi', viewBox: '0 0 18.42 18.42', id: 7 },
            { class: 'maestro', viewBox: '0 0 25.3 15.49', id: 8 },
            { class: 'visa', viewBox: '0 0 25.16 8.22', id: 9 },
            { class: 'qiwi', viewBox: '0 0 18.42 18.42', id: 10 },
            { class: 'maestro', viewBox: '0 0 25.3 15.49', id: 11 },
          ],
          id: 3,
        },
      ],
    };
  },
  computed: {
    footerNestedBlockTemplatesData() {
      return this.footerNestedBlocksData.reduce((templatesData, data, i) => {
        templatesData.push({
          temp: `
            <div
              :class="
                ${i} !== footerNestedBlocksData.length - 1
                  ? 'links'
                  : 'prices-and-payments'
              "
            >
              <h1 class="header-and-link">
                <span>{{ footerNestedBlocksData[${i}].headerText }}</span>
                <VIcon />
                <a
                  href="##"
                  class="link-mask"
                ></a>
              </h1>
              ${
                data.linksData
                  ? `
                    <a 
                      v-for="data in footerNestedBlocksData[${i}].linksData"
                      :key="data.id"
                      href="##"
                      class="link"
                    >
                      {{ data.text }}
                    </a>
                  `
                  : `
                    <div class="price-list">
                      <a href="##">Microsoft Excel (8.64 Мб)</a>
                      <span>Обновлен 20.03.2019 04:12</span>
                      <a href="##">Zip-архив (1.96 Мб)</a>
                      <span>Обновлен 20.03.2019 04:12</span>
                    </div>
                    <div class="payment-methods">
                      <span
                        v-for="
                          data
                          in footerNestedBlocksData[${i}].paymentMethodsData
                        "
                        :key="data.id"
                        :class="['payment-method', data.class]"
                      >
                        <VIcon
                          :viewBox="data.viewBox" 
                          :href="data.class"
                        />
                      </span>
                    </div>
                  `
              }
            </div>
          `,
          id: data.id,
        });
        return templatesData;
      }, []);
    },
  },
};

</script>
<style scoped lang="scss">

%footer-nested-block {
  position: relative;

  &:nth-child(4) {
    @include vhMedia(2.7vh, margin-bottom);
  }
}

.links {
  @extend %footer-nested-block;
}

/deep/ .header-and-link {
  @include vhMedia(0 1.6vh, padding);
  @include vhMedia(7.4vh);
  align-items: center;
  justify-content: space-between;
  display: flex;
  border-top: $bord-light;

  @media (min-width: $media-pc) {
    height: auto;
    padding: 0;
    margin-bottom: 20px;
    border: 0;
  }

  > span {
    @include font(2.4vh);
    color: $text-col-light;

    @media (min-width: $media-pc) {
      @include font(19px, $weight: 600);
      white-space: nowrap;
    }
  }

  > svg {
    @include vhMedia(1.6vh);
    @include hide-on-pc;
    fill: $text-col-light;
  }
}

/deep/ .link-mask {
  @include hide-on-pc;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

%link-and-price-list-link-and-text {
  @include font(14px, $text-col-light);
  display: none;
  margin-bottom: 15px;
  white-space: nowrap;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: $media-pc) {
    display: block;
  }
}

/deep/ .link {
  @extend %link-and-price-list-link-and-text;
}

.prices-and-payments {
  @extend %footer-nested-block;
}

.prices-and-payments /deep/ > .header-and-link {
  @include vhMedia(3.3vh, margin-bottom);
  position: relative;
  border-bottom: $bord-light;

  @media (min-width: $media-pc) {
    border: 0;
  }
}

/deep/ .price-list {
  align-items: flex-start;
  flex-flow: column;
  display: flex;

  @media (min-width: $media-pc) {
    margin-bottom: 15px;
  }

  > span {
    @extend %link-and-price-list-link-and-text;
  }

  > a {
    @extend %link-and-price-list-link-and-text;
    margin-bottom: 3px;
  }
}

/deep/ .payment-methods {
  flex-wrap: wrap;
  display: flex;

  @media (min-width: $media-pc) {
    width: 160px;
  }
}

/deep/ .payment-method {
  @include vhMedia(2vh, margin-right);
  @include vhMedia(4vh);
  align-items: center;
  display: flex;

  &.visa > svg {
    height: 35%;
  }

  &.qiwi > svg {
    height: 70%;
  }

  &.maestro > svg {
    height: 57%;
  }
}

</style>