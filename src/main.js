// Замена import '@babel/polyfill';
// Подробнее по в комментарии 1 в общем конфиге webpack
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './js/libs/svg-sprite-cache';
import './scss/base/base';
import Vue from 'vue';
import router from './router';
import App from './components/App';
import './globals';
import vhFix from './js/startup/vh-fix';

// Импортировать все иконки, чтобы из них создался svg спрайт и потом
// учитывать их удаление, перемещение и изменение
const icons = require.context('./img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

// Для коммуникации между отдельными компонентами с помощью пользовательских
// событий. Привязывается к прототипу, чтобы не имортировать каждый раз
Vue.prototype.$evBus = new Vue();

// Линтер говорил, что вызов new не должен иметь побочных эффектов, поэтому
// используется переменная
const app = new Vue({
  render: (h) => h(App),
  router,
});

app.$mount('.app');

document.addEventListener('DOMContentLoaded', () => {
  vhFix();
});
