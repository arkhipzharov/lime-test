<template>

<div class="items">
  <h1>Лучшие предложения</h1>
  <div class="items-cont">
    <component
      :is="RptItem"
      v-for="data in itemsData"
      :key="data.id"
      :data="data"
    />
  </div>
  <button
    v-if="isShowMoreItemsBtnExist"
    class="show-more-items-btn"
    @click="showMoreItems"
  >
    Показать еще
  </button>
</div>

</template>
<script>

import fetchData from '@/js/modules/fetch';
import manyAsyncFunCallProms from '@/js/modules/promises';

export default {
  data() {
    return {
      isShowMoreItemsBtnExist: true,
      showMoreItemsCount: 0,
      itemsData: null,
      itemIdsStartup: [
        128, 150, 172, 186, 200, 326, 432, 513, 622, 714, 833, 901,
      ],
      itemIdsShowMore: [
        [
          1024, 1087, 1123, 1201, 1314, 1405, 1478, 1522, 1603, 1711, 1822,
          1945,
        ],
        [
          2111, 2233, 2344, 2456, 2512, 2602, 2729, 2844, 2902, 3045, 3120,
          3230,
        ],
      ],
    };
  },
  computed: {
    RptItem() {
      if (this.itemsData) return () => import('./RptItem');
    },
  },
  async created() {
    this.itemsData = await this.fetchSortItemsData(this.itemIdsStartup);
  },
  methods: {
    async showMoreItems() {
      const showMoreItemsCount = this.showMoreItemsCount;
      const itemIdsShowMore = this.itemIdsShowMore;
      const itemsDataShowMore = await this.fetchSortItemsData(
        itemIdsShowMore[showMoreItemsCount],
      );
      this.itemsData.push(...itemsDataShowMore);
      if (showMoreItemsCount < itemIdsShowMore.length - 1) {
        this.showMoreItemsCount++;
      } else {
        this.isShowMoreItemsBtnExist = false;
      }
    },
    async fetchSortItemsData(itemIds) {
      const itemDataUrls = itemIds.reduce((urls, id) => {
        let dataUrlPre = '/src/data/items/';
        if (process.env.NODE_ENV === 'production') {
            // Раскомментируйте в код в комментарии, и закомментируйте
            // помеченный пустыми комментариями для работы в localhost
            // dataUrlPre = '/Project/dist/data/items/';
            //
          dataUrlPre = 'http://lime-test.h1n.ru/data/items/';
            //
        }
        urls.push(`${dataUrlPre}${id}.json`);
        return urls;
      }, []);
      const itemsData = await Promise.all(
        manyAsyncFunCallProms(fetchData, itemDataUrls),
      );
      return itemsData.sort(
        (el1, el2) => el1.mainPageInd - el2.mainPageInd,
      );
    },
  },
};

</script>
<style lang="scss">

.items {
  @include vhMedia(2.5vh, margin-bottom);

  @media (min-width: $media-pc) {
    margin: 0;
    grid-area: items;
  }
}

.items > h1 {
  @include font(3vh, $weight: 600, $textAlign: center);
  @include vhMedia(2.7vh 0 2.9vh, padding);

  @media (min-width: $media-pc) {
    @include font(22px, $textAlign: left);
    padding: 23.616px 0 24.6px;
  }
}

.items-cont {
  @media (min-width: $media-pc) {
    display: grid;
    grid-gap: 12px;
    grid: 378px / repeat(3, 1fr);
    grid-auto-rows: 378px;
    grid-area: items;
  }

  @media (min-width: 1195px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.show-more-items-btn {
  @include vhMedia(2.5vh, margin-top);
  @include vhMedia(1.8vh 0 2vh, padding);
  cursor: pointer;
  display: block;
  width: 100%;
  background-color: $block-back-col;
  border: $bord;
  border-width: 1px 0;

  @media (min-width: $media-pc) {
    padding: 10px 0 12px;
    margin: 12px auto 0;
    border-width: 1px;
    border-radius: 5px;
  }
}

</style>