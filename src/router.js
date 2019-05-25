/* eslint-disable object-property-newline */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './components/pages/Main/index.vue';
import Cart from './components/pages/Cart/index.vue';
import TheCatalog from './components/TheCatalog.vue';
import TheCatalogCart from './components/pages/Cart/TheCatalog.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', components: {
      default: Main,
      catalog: TheCatalog,
    },
  },
  {
    path: '/cart', components: {
      default: Cart,
      /*
        Каталог было видно на странице корзины, но там для него нет места.
        Он глубоко вложен и указывать его через children не вариант,
        поэтому его стиль меняется с помощью именованного маршрута
      */
      catalog: TheCatalogCart,
    },
  },
];

const router = new VueRouter({
  routes,
    // сбрасывает позицию скролла страницы при перемещении на другую
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
