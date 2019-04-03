import evProm, { manyPromFunArr } from '../../modules/promises';
import fetchLoadCheckErrParseJSON from '../../modules/fetch';
import requireItemImg from '../../modules/require-item-img';

async function loadAndSortItems(itemsIdArr) {
  try {
    const itemsDataUrlArr = itemsIdArr.reduce((arr, id) => {
      arr.push('data/items/item_' + id + '.json');
      return arr;
    }, []);
    const itemsDataArr = await Promise.all(
      manyPromFunArr(fetchLoadCheckErrParseJSON, itemsDataUrlArr)
    );
    const sortedItemsDataArr = itemsDataArr.sort(
      (el1, el2) => el1.mainPageInd - el2.mainPageInd
    );
    return sortedItemsDataArr;
  } catch (err) {
    throw err;
  }
}

async function addItemToCart(evElParent) {
  try {
    const ev = await evProm(evElParent, 'click');
    const target = ev.target;
    const btn = target.closest('.item-buy-btn');
    if (btn) {
      if (!btn.classList.contains('go-to-cart')) {
        const item = target.closest('.item');
        const btnTextEl = btn.querySelector('span');
        const itemId = item.getAttribute('id');
        const itemIdNum = parseInt(itemId.replace(/\D+/g, ''), 10);
        const cartItemDataObj = { id: itemIdNum };
        btnTextEl.textContent = 'В корзине';
        btn.classList.add('go-to-cart');
        if (!localStorage.cartItemIndCount) {
          cartItemDataObj.ind = 0;
          localStorage.cartItemIndCount = JSON.stringify(0);
        } else {
          let cartItemIndCount = JSON.parse(localStorage.cartItemIndCount);
          cartItemDataObj.ind = ++cartItemIndCount;
          localStorage.cartItemIndCount = JSON.stringify(cartItemIndCount);
        }
        if (localStorage.cartItemsTotalPrice) {
          const itemPrice = parseInt(
            item.querySelector('.item-price > span').textContent, 10
          );
          let totalPrice = JSON.parse(localStorage.cartItemsTotalPrice);
          totalPrice += itemPrice;
          localStorage.cartItemsTotalPrice = JSON.stringify(totalPrice);
        }
        if (!localStorage.cartItemsDataArr) {
          localStorage.cartItemsDataArr = JSON.stringify([cartItemDataObj]);
        } else {
          const cartItemsStorageDataArr = JSON.parse(
            localStorage.cartItemsDataArr
          );
          cartItemsStorageDataArr.push(cartItemDataObj);
          localStorage.cartItemsDataArr = JSON.stringify(
            cartItemsStorageDataArr
          );
        }
      } else {
        window.location.assign('cart.html');
      }
    }
  } catch (err) {
    throw err;
  }
  addItemToCart(evElParent);
}

function createRatingIcons(ratingEl, starsNum) {
  const ratingIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const ratingIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  if (starsNum > 1) {
    ratingIcon.classList.add('item-rating-star-fullness-100');
    ratingIconUseEl.setAttribute('href', '#star');
  } else {
    ratingIcon.classList.add('item-rating-star-fullness-50');
    ratingIconUseEl.setAttribute('href', '#star-half');
  }
  ratingIcon.setAttribute('viewBox', '0 0 1 1');
  ratingIcon.appendChild(ratingIconUseEl);
  const iconsArr = [ratingIcon];
  for (let i = 2; i <= 5; i++) {
    const iconClone = ratingIcon.cloneNode(true);
    const useEl = iconClone.querySelector('use');
    if (i === starsNum) {
      iconClone.classList.remove(iconClone.classList.item(0));
      iconClone.classList.add('item-rating-star-fullness-50');
      useEl.setAttribute('href', '#star-half');
    } else if (i > starsNum) {
      iconClone.classList.remove(iconClone.classList.item(0));
      iconClone.classList.add('item-rating-star-fullness-0');
      useEl.setAttribute('href', '#star-empty');
    }
    iconsArr.push(iconClone);
  }
  return iconsArr;
}

function createItem(itemDataObj) {
  const item = document.createElement('div');
  const itemInfoEl = document.createElement('div');
  const imgLink = document.createElement('a');
  const img = document.createElement('img');
  const headerLink = document.createElement('a');
  const ratingEl = document.createElement('div');
  const priceEl = document.createElement('div');
  const priceIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const priceIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const priceNumEl = document.createElement('span');
  const btnsCont = document.createElement('div');
  const btn = document.createElement('button');
  const btnTextEl = document.createElement('span');
  const btnIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const btnIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const iconsArr = createRatingIcons(ratingEl, itemDataObj.rating);
  item.classList.add('item');
  itemInfoEl.classList.add('item-inn-block');
  imgLink.classList.add('item-img');
  headerLink.classList.add('item-header');
  ratingEl.classList.add('item-rating');
  priceEl.classList.add('item-price');
  btnsCont.classList.add('item-btns');
  btn.classList.add('item-buy-btn');
  img.setAttribute('src', requireItemImg(itemDataObj.id));
  item.setAttribute('id', 'item-' + itemDataObj.id);
  imgLink.setAttribute('href', '##');
  headerLink.setAttribute('href', '##');
  priceIcon.setAttribute('viewBox', '0 0 1 1');
  priceIconUseEl.setAttribute('href', '#euro');
  btnIcon.setAttribute('viewBox', '0 0 1 1');
  btnIconUseEl.setAttribute('href', '#cart');
  priceNumEl.textContent = itemDataObj.price + '';
  headerLink.textContent = itemDataObj.descr;
  if (!localStorage.cartItemsDataArr) {
    btnTextEl.textContent = 'Купить';
    if (btn.classList.contains('go-to-cart')) {
      btn.classList.remove('go-to-cart');
    }
  } else {
    const cartItemsStorageDataArr = JSON.parse(localStorage.cartItemsDataArr);
    if (cartItemsStorageDataArr.some(el => el.id === itemDataObj.id)) {
      btnTextEl.textContent = 'В корзине';
      btn.classList.toggle('go-to-cart');
    } else {
      btnTextEl.textContent = 'Купить';
      if (btn.classList.contains('go-to-cart')) {
        btn.classList.remove('go-to-cart');
      }
    }
  }
  imgLink.appendChild(img);
  priceIcon.appendChild(priceIconUseEl);
  priceEl.appendChild(priceNumEl);
  priceEl.appendChild(priceIcon);
  iconsArr.forEach((el) => {
    ratingEl.appendChild(el);
  });
  btnIcon.appendChild(btnIconUseEl);
  btn.appendChild(btnIcon);
  btn.appendChild(btnTextEl);
  btnsCont.appendChild(btn);
  itemInfoEl.appendChild(imgLink);
  itemInfoEl.appendChild(ratingEl);
  item.appendChild(itemInfoEl);
  item.appendChild(headerLink);
  item.appendChild(priceEl);
  item.appendChild(btnsCont);
  return item;
}

function createOrCloneItem(itemDataObj, itemsArr) {
  if (itemsArr.length === 0) {
    return createItem(itemDataObj);
  } else {
    const itemClone = itemsArr[0].cloneNode(true);
    const img = itemClone.querySelector('.item-img > img');
    const ratingEl = itemClone.querySelector('.item-rating');
    const priceNumEl = itemClone.querySelector('.item-price > span');
    const headerLink = itemClone.querySelector('.item-header');
    const btn = itemClone.querySelector('.item-buy-btn');
    const btnTextEl = btn.querySelector('span');
    const sortedIconsArr = Array.from(ratingEl.children).sort(
      (icon1, icon2) => {
        const starFullnesNum1 = parseInt(
          icon1.classList.item(0).replace(/\D+/g, ''), 10
        );
        const starFullnesNum2 = parseInt(
          icon2.classList.item(0).replace(/\D+/g, ''), 10
        );
        return starFullnesNum2 - starFullnesNum1;
      }
    );
    sortedIconsArr.reduce((acc, icon) => {
      const starFullnesNum = parseInt(
        icon.classList.item(0).replace(/\D+/g, ''), 10
      );
      const useEl = icon.querySelector('use');
      const starsNum = itemDataObj.rating;
      if (acc < starsNum) {
        if (icon.classList.item(0) !== 'item-rating-star-fullness-100') {
          icon.classList.remove(icon.classList.item(0));
        }
        icon.classList.add('item-rating-star-fullness-100');
        useEl.setAttribute('href', '#star');
      } else if (acc === starsNum) {
        if (icon.classList.item(0) !== 'item-rating-star-fullness-50') {
          icon.classList.remove(icon.classList.item(0));
        }
        icon.classList.remove(icon.classList.item(0));
        icon.classList.add('item-rating-star-fullness-50');
        useEl.setAttribute('href', '#star-half');
      } else if (acc > starsNum) {
        if (icon.classList.item(0) !== 'item-rating-star-fullness-0') {
          icon.classList.remove(icon.classList.item(0));
        }
        icon.classList.remove(icon.classList.item(0));
        icon.classList.add('item-rating-star-fullness-0');
        useEl.setAttribute('href', '#star-empty');
      }
      return ++acc;
    }, 1);
    headerLink.textContent = itemDataObj.descr;
    priceNumEl.textContent = itemDataObj.price + '';
    if (!localStorage.cartItemsDataArr) {
      btnTextEl.textContent = 'Купить';
      if (btn.classList.contains('go-to-cart')) {
        btn.classList.remove('go-to-cart');
      }
    } else {
      const cartItemsStorageDataArr = JSON.parse(
        localStorage.cartItemsDataArr
      );
      if (cartItemsStorageDataArr.some(el => el.id === itemDataObj.id)) {
        btnTextEl.textContent = 'В корзине';
        btn.classList.toggle('go-to-cart');
      } else {
        btnTextEl.textContent = 'Купить';
        if (btn.classList.contains('go-to-cart')) {
          btn.classList.remove('go-to-cart');
        }
      }
    }
    itemClone.setAttribute('id', 'item-' + itemDataObj.id);
    img.setAttribute('src', requireItemImg(itemDataObj.id));
    return itemClone;
  }
}

async function showMoreItems(
  itemsAndShowMoreIdArr, itemsCont, showMoreItemsBtn, showMoreItemsCount
) {
  try {
    await evProm(showMoreItemsBtn, 'click');
    const maxShowMoreItemsCount = 2;
    if (showMoreItemsCount !== maxShowMoreItemsCount + 1) {
      const sortedItemsDataArr = await loadAndSortItems(
        itemsAndShowMoreIdArr[++showMoreItemsCount]
      );
      const fragment = document.createDocumentFragment();
      const itemsArr = sortedItemsDataArr.reduce((itemsArr, itemDataObj) => {
        itemsArr.push(createOrCloneItem(itemDataObj, itemsArr));
        return itemsArr;
      }, []);
      if (showMoreItemsCount === maxShowMoreItemsCount) {
        showMoreItemsBtn.remove();
      }
      itemsArr.forEach((item) => {
        fragment.appendChild(item);
      });
      itemsCont.appendChild(fragment);
    }
  } catch (err) {
    throw err;
  }
  showMoreItems(
    itemsAndShowMoreIdArr, itemsCont, showMoreItemsBtn, showMoreItemsCount
  );
}

export default async function createAndInsertItemsInDOM() {
  try {
    const itemsAndShowMoreIdArr = [
      [
        128, 150, 172, 186, 200, 326, 432, 513, 622, 714, 833, 901
      ],
      [
        1024, 1087, 1123, 1201, 1314, 1405, 1478, 1522, 1603, 1711, 1822,
        1945
      ],
      [
        2111, 2233, 2344, 2456, 2512, 2602, 2729, 2844, 2902, 3045, 3120,
        3230
      ]
    ];
    const sortedItemsDataArr = await loadAndSortItems(
      itemsAndShowMoreIdArr[0]
    );
    const itemsEl = document.querySelector('.items');
    const itemsCont = document.querySelector('.items-cont');
    const fragment = document.createDocumentFragment();
    const itemsArr = sortedItemsDataArr.reduce((itemsArr, itemDataObj) => {
      itemsArr.push(createOrCloneItem(itemDataObj, itemsArr));
      return itemsArr;
    }, []);
    const showMoreItemsBtn = document.querySelector('.show-more-items-btn');
    itemsArr.forEach((item) => {
      fragment.appendChild(item);
    });
    itemsCont.appendChild(fragment);
    await Promise.all([
      addItemToCart(itemsEl),
      showMoreItems(
        itemsAndShowMoreIdArr, itemsCont, showMoreItemsBtn, 0
      )
    ]);
  } catch (err) {
    throw err;
  }
}
