<template>

<svg :viewBox="viewBox">
  <!--
    на MDN написано, что испоьзование xlink:href не рекомендуется, поэтому
    используется href
  -->
  <use
    :href="'#' + href"
    :x="x"
  ></use>
</svg>

</template>
<script>

export default {
  props: {
    viewBox: {
      default: '0 0 1 1',
      validator(viewBox) {
        /*
          Чтобы атрибут viewBox не появился в финальном html можно передать
          null в этот входной параметр
        */
        return typeof viewBox === 'string' || viewBox === null;
      },
    },
    href: {
      type: String,
      default: 'arrow-right',
    },
    x: {
      type: String,
      default: null,
    },
  },
};

</script>