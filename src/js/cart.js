import './startup';
import createAndInsertItemsInDOM from './pages/cart/cart-items';

document.addEventListener('DOMContentLoaded', () => {
  backbone({
    async: [
      [
        createAndInsertItemsInDOM, [
          document.querySelector('.container')
        ]
      ]
    ]
  });
});
