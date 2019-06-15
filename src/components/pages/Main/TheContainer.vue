<template>

<TheContainer>
  <TheShowCatalogBtn />
  <TheSlider />
  <TheItems />
  <TheActions />
  <TheNews />
  <TheReviews />
</TheContainer>

</template>
<script>

import TheContainer from '@/components/TheContainer';
import TheShowCatalogBtn from './TheShowCatalogBtn';
import TheSlider from './TheSlider';
import TheItems from './TheItems';
import TheActions from './TheActions';
import TheNews from './TheNews';
import TheReviews from './TheReviews';

export default {
  components: {
    TheContainer,
    TheShowCatalogBtn,
    TheSlider,
    TheItems,
    TheActions,
    TheNews,
    TheReviews,
  },
};

</script>
<style scoped lang="scss">

.container {
  @media (min-width: $media-pc) {
    align-content: start;
    display: grid;
    margin: 20px auto;
    grid:
      'aside . slider' auto
      'aside . items' auto
      'aside . actions' auto
      'aside . reviews' auto
      'aside . .' 1fr
      / 221.4px 22.632px 1fr;
  }
}

</style>