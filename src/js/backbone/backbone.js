import setShowMenu from './menu';
import setShowCatalog from './catalog';
import setShowSearchPopup from './search';
import vhFix from './vh-fix';

export default async function backbone(
  {
    async: addAsyncFunWithArgArraysArr,
    sync: addStartupFunWithArgArraysArr
  } = {}
) {
  const startupFunWithArgArraysArr = [
    [
      vhFix
    ]
  ];
  if (addStartupFunWithArgArraysArr) {
    addStartupFunWithArgArraysArr.forEach((arr) => {
      startupFunWithArgArraysArr.push(arr);
    });
  }
  startupFunWithArgArraysArr.forEach((arr) => {
    if (arr[1]) {
      arr[0](...arr[1])
    } else {
      arr[0]()
    }
  });
  const bodyEl = document.querySelector('body');
  const headerEl = document.querySelector('header');
  const toggleMenuBtn = document.querySelector('.toggle-menu-btn');
  const menuIcon = toggleMenuBtn.querySelector('svg');
  const menuIconUseEl = toggleMenuBtn.querySelector('use');
  const searchEl = document.querySelector('.search');
  const showSearchPopupBtnMaskEl = document.querySelector(
    '.show-search-popup-btn-mask'
  );
  const searchPopupMaskEl = document.querySelector('.search-popup-mask');
  const sidebarsCont = document.querySelector('.sidebars-cont');
  const menuCont = document.querySelector('.menu-cont');
  const showCatalogBtn = document.querySelector('.show-catalog-btn');
  const menuItemShowCatalogBtn = document.querySelector(
    '.menu-item-show-catalog'
  );
  const catalogCont = document.querySelector('.catalog-cont');
  const closeCatalogBtn = document.querySelector('.catalog-item-close-btn');
  const asyncFunCallPromArr = [
    setShowSearchPopup(
      searchEl, showSearchPopupBtnMaskEl, searchPopupMaskEl, sidebarsCont,
      headerEl, bodyEl
    ),
    setShowMenu(
      toggleMenuBtn, headerEl, searchEl, searchPopupMaskEl,
      sidebarsCont, menuCont, menuIcon, menuIconUseEl, catalogCont, bodyEl
    ),
    setShowCatalog(
      showCatalogBtn, menuItemShowCatalogBtn, closeCatalogBtn,
      toggleMenuBtn, headerEl, sidebarsCont, menuCont, menuIcon,
      menuIconUseEl, catalogCont, bodyEl
    )
  ];
  if (addAsyncFunWithArgArraysArr) {
    addAsyncFunWithArgArraysArr.forEach((arr) => {
      if (arr[1]) {
        asyncFunCallPromArr.push(arr[0](...arr[1]));
      } else {
        asyncFunCallPromArr.push(arr[0]());
      }
    });
  }
  try {
    await Promise.all(asyncFunCallPromArr);
  } catch (err) {
    throw err;
  }
}
