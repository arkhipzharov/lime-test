import evProm, { manyEvPromArr, manyPromFunArr } from '../../modules/promises';
import setInputFilter from '../../modules/validation';
import fetchLoadCheckErrParseJSON from '../../modules/fetch';
import requireItemImg from '../../modules/require-item-img';

function createEmptyCartBlockAndInsertInDOM(cont) {
  const emptyCartEl = document.createElement('div');
  const emptyCartIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const emptyCartIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const header = document.createElement('h1');
  const goToCatalogTextCont = document.createElement('div');
  const goToCatalogTextEl = document.createElement('span');
  const goToCatalogLink = document.createElement('a');
  emptyCartEl.classList.add('empty-cart');
  goToCatalogTextCont.classList.add('empty-cart-go-to-catalog-text');
  emptyCartIconUseEl.setAttribute('href', '#cart');
  goToCatalogLink.setAttribute('href', '##');
  header.textContent = 'Ваша корзина пуста';
  goToCatalogTextEl.textContent = 'Для добавления товаров в корзину ';
  goToCatalogLink.textContent = 'перейдите в каталог';
  emptyCartIcon.appendChild(emptyCartIconUseEl);
  goToCatalogTextCont.appendChild(goToCatalogTextEl);
  goToCatalogTextCont.appendChild(goToCatalogLink);
  emptyCartEl.appendChild(emptyCartIcon);
  emptyCartEl.appendChild(header);
  emptyCartEl.appendChild(goToCatalogTextCont);
  Array.from(cont.children).forEach((el) => el.remove());
  cont.appendChild(emptyCartEl);
}

async function validateCartItemSumInputs(cartItemsOuter, dataUrlPre) {
  try {
    const ev = await Promise.race(
      manyEvPromArr(
        cartItemsOuter, [
          'input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select',
          'contextmenu', 'drop'
        ]
      )
    );
    const target = ev.target;
    const sumInput = target.closest('.cart-item-sum > input');
    if (sumInput) {
      const cartItem = target.closest('.cart-item');
      const cartItemId = parseInt(
        cartItem.getAttribute('id').replace(/\D+/g, ''), 10
      );
      const cartItemDataObj = await fetchLoadCheckErrParseJSON(
        dataUrlPre + cartItemId + '.json'
      );
      setInputFilter(
        sumInput,
        val => /^\d*$/.test(val)
          && (
            val === '' || parseInt(val, 10) <= cartItemDataObj.maxSum
          )
      );
    }
  } catch (err) {
    throw err;
  }
  validateCartItemSumInputs(cartItemsOuter, dataUrlPre);
}

async function clearCartOrMakeOrder(
  total, cont, clearCartStorItemsToRemoveArr
) {
  try {
    const ev = await evProm(total, 'click');
    const target = ev.target;
    const targetClass = target.classList.item(0);
    if (targetClass === 'make-order-btn') {
      console.log('sho');
    } else if (targetClass === 'clear-cart-btn') {
      createEmptyCartBlockAndInsertInDOM(cont);
      clearCartStorItemsToRemoveArr.forEach((name) => {
        localStorage.removeItem(name);
      });
    }
  } catch (err) {
    throw err;
  }
  // 
  if (cont.firstElementChild) {
    clearCartOrMakeOrder(total, cont, clearCartStorItemsToRemoveArr);
  }
}

async function removeCartItem(
  cartItemsStorageDataArr, cartItemIndCount, cartItemsOuter, cont,
  totalPriceNumEl, clearCartStorItemsToRemoveArr
) {
  try {
    const ev = await evProm(cartItemsOuter, 'click');
    const target = ev.target;
    if (target.closest('.cart-item-remove-btn')) {
      const cartItem = target.closest('.cart-item');
      cartItem.remove();
      const cartItemId = parseInt(
        cartItem.getAttribute('id').replace(/\D+/g, ''), 10
      );
      const cartItemStorageDataObjInd = cartItemsStorageDataArr.findIndex(
        el => el.id === cartItemId
      );
      const cartItemAndNextStorageDataObjArr = cartItemsStorageDataArr.splice(
        cartItemStorageDataObjInd + 1
      );
      cartItemAndNextStorageDataObjArr.forEach((el) => {
        if (el.cartItemIndCount > 0) el.cartItemIndCount--;
      });
      if (cartItemIndCount > 0) {
        const cartItemPriceNum = parseInt(
          cartItem.querySelector('.cart-item-price > span').textContent, 10
        );
        const cartItemSumNum = parseInt(
          cartItem
            .querySelector('.cart-item-sum > input')
            .getAttribute('value'), 10
        );
        let totalPriceNum = parseInt(totalPriceNumEl.textContent, 10);
        totalPriceNum -= cartItemPriceNum * cartItemSumNum;
        totalPriceNumEl.textContent = '' + totalPriceNum;
        localStorage.cartItemIndCount = JSON.stringify(--cartItemIndCount);
        localStorage.cartItemsTotalPrice = totalPriceNum;
        cartItemsStorageDataArr.splice(
          cartItemStorageDataObjInd, 1, ...cartItemAndNextStorageDataObjArr
        );
        localStorage.cartItemsDataArr = JSON.stringify(
          cartItemsStorageDataArr
        );
      } else {
        clearCartStorItemsToRemoveArr.forEach((name) => {
          localStorage.removeItem(name);
        });
        createEmptyCartBlockAndInsertInDOM(cont);
      }
    }
  } catch (err) {
    throw err;
  }
  removeCartItem(
    cartItemsStorageDataArr, cartItemIndCount, cartItemsOuter, cont,
    totalPriceNumEl, clearCartStorItemsToRemoveArr
  );
}

async function changeCartItemSum(
  cartItemsOuter, totalPriceNumEl, cartItemsStorageDataArr
) {
  try {
    const ev = await evProm(cartItemsOuter, 'click');
    const target = ev.target;
    const cartItem = target.closest('.cart-item');
    const cartItemSumInput = cartItem.querySelector('.cart-item-sum > input');
    let cartItemSumNum = parseInt(cartItemSumInput.getAttribute('value'), 10);
    if (
      (target.closest('.cart-item-incr-sum-btn') && cartItemSumNum > 0)
      || (target.closest('.cart-item-decr-sum-btn') && cartItemSumNum > 1)
    ) {
      // 
      const cartItemPriceNum = parseInt(
        target
          .closest('.cart-item')
          .querySelector('.cart-item-price > span')
          .textContent, 10
      );
      const cartItemId = parseInt(
        cartItem.getAttribute('id').replace(/\D+/g, ''), 10
      );
      const cartItemStorageDataObjInd = cartItemsStorageDataArr.findIndex(
        el => el.id === cartItemId
      );
      const [cartItemStorageDataObj] = cartItemsStorageDataArr.splice(
        cartItemStorageDataObjInd, 1
      );
      let totalPriceNum = parseInt(totalPriceNumEl.textContent, 10);
      if (target.closest('.cart-item-incr-sum-btn')) {
        cartItemSumInput.setAttribute('value', ++cartItemSumNum + '');
        totalPriceNum += cartItemPriceNum;
        cartItemStorageDataObj.itemSumNum = cartItemSumNum;
      } else if (target.closest('.cart-item-decr-sum-btn')) {
        if (cartItemSumNum === 2) {
          cartItemSumInput.setAttribute('value', --cartItemSumNum + '');
          totalPriceNum -= cartItemPriceNum;
          delete cartItemStorageDataObj.itemSumNum;
        } else {
          cartItemSumInput.setAttribute('value', --cartItemSumNum + '');
          totalPriceNum -= cartItemPriceNum;
          cartItemStorageDataObj.itemSumNum = cartItemSumNum;
        }
      }
      totalPriceNumEl.textContent = '' + totalPriceNum;
      localStorage.cartItemsTotalPrice = totalPriceNum;
      // 
      cartItemsStorageDataArr.splice(
        cartItemStorageDataObjInd, 0, cartItemStorageDataObj
      );
      localStorage.cartItemsDataArr = JSON.stringify(cartItemsStorageDataArr);
    }
  } catch (err) {
    throw err;
  }
  changeCartItemSum(cartItemsOuter, totalPriceNumEl, cartItemsStorageDataArr);
}

function createCartItem(cartItemsStorageDataArr, cartItemDataObj) {
  const cartItem = document.createElement('div');
  const cartItemInnBlock = document.createElement('div');
  const sumEl = document.createElement('div');
  const imgLink = document.createElement('a');
  const img = document.createElement('img');
  const priceEl = document.createElement('div');
  const priceNumEl = document.createElement('span');
  const priceIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const priceIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const headerLink = document.createElement('a');
  const incrSumBtn = document.createElement('button');
  const decrSumBtn = document.createElement('button');
  const incrSumIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const incrSumIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const sumInput = document.createElement('input');
  const decrSumIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const decrSumIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const removeBtn = document.createElement('button');
  const removeIcon = document.createElementNS(
    'http://www.w3.org/2000/svg', 'svg'
  );
  const removeIconUseEl = document.createElementNS(
    'http://www.w3.org/2000/svg', 'use'
  );
  const cartItemStorageDataObj = cartItemsStorageDataArr.find(
    el => el.id === cartItemDataObj.id
  ); 
  img.setAttribute('src', requireItemImg(cartItemDataObj.id));
  priceNumEl.textContent = cartItemDataObj.price + '';
  headerLink.textContent = cartItemDataObj.descr;
  cartItem.classList.add('cart-item');
  cartItemInnBlock.classList.add('cart-item-inn-block');
  sumEl.classList.add('cart-item-sum');
  incrSumBtn.classList.add('cart-item-incr-sum-btn');
  decrSumBtn.classList.add('cart-item-decr-sum-btn');
  imgLink.classList.add('cart-item-img');
  priceEl.classList.add('cart-item-price');
  headerLink.classList.add('cart-item-header');
  removeBtn.classList.add('cart-item-remove-btn');
  headerLink.setAttribute('href', '##');
  sumInput.setAttribute('type', 'text');
  imgLink.setAttribute('href', '##');
  headerLink.setAttribute('href', '##');
  if (cartItemStorageDataObj.itemSumNum) {
    sumInput.setAttribute('value', cartItemStorageDataObj.itemSumNum);
  } else {
    sumInput.setAttribute('value', 1);
  }
  priceIcon.setAttribute('viewBox', '0 0 1 1');
  priceIconUseEl.setAttribute('href', '#euro');
  incrSumIcon.setAttribute('viewBox', '0 0 1 1');
  incrSumIconUseEl.setAttribute('href', '#plus');
  decrSumIcon.setAttribute('viewBox', '0 0 1 1');
  decrSumIconUseEl.setAttribute('href', '#minus');
  removeIcon.setAttribute('viewBox', '0 0 1 1');
  removeIconUseEl.setAttribute('href', '#trash');
  cartItem.setAttribute('id', 'item-' + cartItemDataObj.id);
  imgLink.appendChild(img);
  priceIcon.appendChild(priceIconUseEl);
  decrSumIcon.appendChild(decrSumIconUseEl);
  removeIcon.appendChild(removeIconUseEl);
  incrSumIcon.appendChild(incrSumIconUseEl);
  priceEl.appendChild(priceNumEl);
  priceEl.appendChild(priceIcon);
  decrSumBtn.appendChild(decrSumIcon);
  incrSumBtn.appendChild(incrSumIcon);
  sumEl.appendChild(decrSumBtn);
  sumEl.appendChild(sumInput);
  sumEl.appendChild(incrSumBtn);
  cartItemInnBlock.appendChild(headerLink);
  cartItemInnBlock.appendChild(priceEl);
  cartItemInnBlock.appendChild(sumEl);
  removeBtn.appendChild(removeIcon);
  cartItem.appendChild(imgLink);
  cartItem.appendChild(cartItemInnBlock);
  cartItem.appendChild(removeBtn);
  return cartItem;
}

function createOrCloneCartItem(
  cartItemsStorageDataArr, cartItemDataObj, cartItemsArr
) {
  if (cartItemsArr.length === 0) {
    return createCartItem(cartItemsStorageDataArr, cartItemDataObj);
  } else {
    const cartItemClone = cartItemsArr[0].cloneNode(true);
    const img = cartItemClone.querySelector('.cart-item-img > img');
    const priceNumEl = cartItemClone.querySelector('.cart-item-price > span');
    const headerLink = cartItemClone.querySelector('.cart-item-header');
    const sumInput = cartItemClone.querySelector('.cart-item-sum > input');
    const cartItemStorageDataObj = cartItemsStorageDataArr.find(
      el => el.id === cartItemDataObj.id
    );
    img.setAttribute('src', requireItemImg(cartItemDataObj.id));
    headerLink.textContent = cartItemDataObj.descr;
    priceNumEl.textContent = cartItemDataObj.price;
    if (cartItemStorageDataObj.itemSumNum) {
      sumInput.setAttribute('value', cartItemStorageDataObj.itemSumNum);
    } else {
      sumInput.setAttribute('value', 1);
    }
    cartItemClone.setAttribute('id', 'item-' + cartItemDataObj.id);
    return cartItemClone;
  }
}

export default async function createAndInsertCartItemsInDOM(cont) {
  if (localStorage.cartItemsDataArr) {
    const cartItemsStorageDataArr = JSON.parse(localStorage.cartItemsDataArr);
    const sortedCartItemsStorageDataArr = cartItemsStorageDataArr.sort(
      (el1, el2) => el1.ind - el2.ind
    );
    const dataUrlPre = 'data/items/item_';
    const cartItemsDataFilesUrlArr = cartItemsStorageDataArr.reduce(
      (arr, el) => {
        arr.push(dataUrlPre + el.id + '.json');
        return arr;
      }, []
    );
    const cartItemsDataArr = await Promise.all(
      manyPromFunArr(fetchLoadCheckErrParseJSON, cartItemsDataFilesUrlArr)
    );
    const cartItemsOuter = document.createElement('div');
    const cartItemsArr = sortedCartItemsStorageDataArr.reduce(
      (cartItemsArr, storDataObj) => {
        const cartItemDataObj = cartItemsDataArr.find(
          dataObj => dataObj.id === storDataObj.id
        );
        cartItemsArr.push(
          createOrCloneCartItem(
            cartItemsStorageDataArr, cartItemDataObj, cartItemsArr
          )
        );
        return cartItemsArr;
      }, []
    );
    const cartItemIndCount = JSON.parse(localStorage.cartItemIndCount);
    let totalPriceNum;
    if (!localStorage.cartItemsTotalPrice) {
      totalPriceNum = cartItemsDataArr.reduce((num, el) => num + el.price, 0);
      localStorage.cartItemsTotalPrice = JSON.stringify(totalPriceNum);
    } else {
      totalPriceNum = JSON.parse(localStorage.cartItemsTotalPrice);
    }
    const clearCartStorItemsToRemoveArr = [
      'cartItemIndCount', 'cartItemsTotalPrice', 'cartItemsDataArr'
    ];
    const fragment = document.createDocumentFragment();
    const total = document.createElement('div');
    const totalPriceEl = document.createElement('div');
    const totalPriceCont = document.createElement('div');
    const totalPriceTextEl = document.createElement('span');
    const totalPriceNumEl = document.createElement('span');
    const totalPriceIcon = document.createElementNS(
      'http://www.w3.org/2000/svg', 'svg'
    );
    const totalPriceIconUseEl = document.createElementNS(
      'http://www.w3.org/2000/svg', 'use'
    );
    const makeOrderButton = document.createElement('button');
    const clearCartButton = document.createElement('button');
    cartItemsOuter.classList.add('cart-items');
    total.classList.add('total');
    totalPriceEl.classList.add('total-price');
    totalPriceCont.classList.add('total-price-cont');
    makeOrderButton.classList.add('make-order-btn');
    clearCartButton.classList.add('clear-cart-btn');
    totalPriceIcon.setAttribute('viewBox', '0 0 1 1');
    totalPriceIconUseEl.setAttribute('href', '#euro');
    totalPriceTextEl.textContent = 'Итого:';
    totalPriceNumEl.textContent = totalPriceNum + '';
    makeOrderButton.textContent = 'Оформить заказ';
    clearCartButton.textContent = 'Очистить корзину';
    cartItemsArr.forEach((cartItem) => {
      cartItemsOuter.appendChild(cartItem);
    });
    totalPriceIcon.appendChild(totalPriceIconUseEl);
    totalPriceCont.appendChild(totalPriceNumEl);
    totalPriceCont.appendChild(totalPriceIcon);
    totalPriceEl.appendChild(totalPriceTextEl);
    totalPriceEl.appendChild(totalPriceCont);
    total.appendChild(totalPriceEl);
    total.appendChild(makeOrderButton);
    total.appendChild(clearCartButton);
    fragment.appendChild(cartItemsOuter);
    fragment.appendChild(total);
    cont.appendChild(fragment);
    try {
      await Promise.all([
        changeCartItemSum(
          cartItemsOuter, totalPriceNumEl, cartItemsStorageDataArr
        ),
        removeCartItem(
          cartItemsStorageDataArr, cartItemIndCount, cartItemsOuter, cont,
          totalPriceNumEl, clearCartStorItemsToRemoveArr
        ),
        clearCartOrMakeOrder(total, cont, clearCartStorItemsToRemoveArr),
        validateCartItemSumInputs(cartItemsOuter, dataUrlPre)
      ]);
    } catch (err) {
      throw err;
    }
  } else {
    createEmptyCartBlockAndInsertInDOM(cont);
  }
}
