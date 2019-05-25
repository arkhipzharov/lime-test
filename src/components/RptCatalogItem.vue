<template>

<Fragment>
  <VRuntimeTemplate
    v-for="data in catalogItemTemplatesData"
    :key="data.id"
    :template="data.temp"
  />
</Fragment>

</template>
<script>

export default {
  data() {
    return {
      catalogItemsData: [
        { text: 'Назад', isCloseBtn: true, id: 0 },
        { text: 'Quas, temporibus', id: 1 },
        { text: 'Atque, dolorem', id: 2 },
        { text: 'Laborum, eum', id: 3 },
        { text: 'Provident, laudantium', id: 4 },
        { text: 'Officiis, exercitationem', id: 5 },
        { text: 'Officiis, incidunt', id: 6 },
        { text: 'Illum, iusto', id: 7 },
        { text: 'Eveniet, maxime', id: 8 },
        { text: 'Tenetur, temporibus', id: 9 },
        { text: 'Recusandae, quidem', id: 10 },
        { text: 'Beatae, et', id: 11 },
        { text: 'Eveniet, reiciendis', id: 12 },
        { text: 'Numquam, ipsum', id: 13 },
        { text: 'Corrupti, enim', id: 14 },
        { text: 'Nulla, omnis', id: 15 },
        { text: 'Accusantium, quo', id: 16 },
        { text: 'Minima, maxime', id: 17 },
      ],
    };
  },
  computed: {
    catalogItemTemplatesData() {
      return this.catalogItemsData.reduce((templatesData, data, i) => {
        templatesData.push({
          temp: `
            <button
              ${i === 0 ? '@click="closeCatalog"' : ''}
              :class="['catalog-item', { 'close': ${i} === 0 }]"
            >
              <VIcon
                :href="
                  catalogItemsData[${i}].isCloseBtn
                    ? 'arrow-left'
                    : 'desktop'
                "
              />
              <span>{{ catalogItemsData[${i}].text }}</span>
              ${!data.isCloseBtn ? '<VIcon />' : ''}
            </button>
          `,
          id: data.id,
        });
        return templatesData;
      }, []);
    },
  },
  methods: {
    closeCatalog() {
      this.$evBus.$emit('toggle-catalog');
    },
  },
};

</script>
<style scoped lang="scss">

.catalog-item {
  @include vhMedia(9.5vh);
  @include vhMedia(0 2.5vh, padding);
  align-items: center;
  display: flex;
  width: 100%;
  border-bottom: $bord;
  outline: none;

  @media (min-width: $media-pc) {
    height: 43.296px;
    background-color: $block-back-col;
    border: $bord;
    border-top: 0;
    cursor: pointer;
  }

  &:last-child {
    border-bottom: 0;

    @media (min-width: $media-pc) {
      border-bottom: $bord;
      border-radius: 0 0 5.902px 5.902px;
    }
  }

  &.close {
    @include hide-on-pc;

    /deep/ > svg:first-child {
      @include vhMedia(2.3vh);
    }
  }

  /deep/ > svg:first-child {
    @include vhMedia(2.5vh);

    @media (min-width: $media-pc) {
      height: 15.744px;
    }
  }

  /deep/ > span {
    @include font(2.8vh, $lineHeight: 1.7vh);
    @include vhMedia(1.2vh, margin-left);

    @media (min-width: $media-pc) {
      font-size: 13.776px;
    }
  }

  /deep/ > svg:last-child {
    @include vhMedia(1.8vh);
    margin-left: auto;

    @media (min-width: $media-pc) {
      height: 8.856px;
    }
  }
}

</style>