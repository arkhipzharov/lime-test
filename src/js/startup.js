import '@babel/polyfill';
import './libs/svg-sprite-cache';

const images = require.context('../img/icons', false, /\.svg$/);
images.keys().forEach(images);
