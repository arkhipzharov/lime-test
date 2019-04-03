import './startup';
import createAndInsertItemsInDOM from './pages/index/items';

document.addEventListener('DOMContentLoaded', () => {
  backbone({
    async: [
      [
        createAndInsertItemsInDOM
      ]
    ]
  });
});
