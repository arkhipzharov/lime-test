import { manyElEvPromArr } from '../modules/promises';

export default async function setShowCatalog(
  showCatalogBtn, menuItemShowCatalogBtn, closeCatalogBtn, toggleMenuBtn,
  headerEl, sidebarsCont, menuCont, menuIcon, menuIconUseEl,
  catalogCont, bodyEl
) {
  try {
    const catalogEvElArr = [menuItemShowCatalogBtn, closeCatalogBtn];
    if (showCatalogBtn) {
      catalogEvElArr.push(showCatalogBtn);
    }
    const ev = await Promise.race(manyElEvPromArr(catalogEvElArr, 'click'));
    if (ev.target.closest('.catalog-item-close-btn')) {
      catalogCont.classList.remove('active');
      setTimeout(() => { catalogCont.scrollTop = 0; }, 300);
      catalogCont.classList.add('active-reverse');
      if (menuIcon.classList.contains('opened')) {
        menuCont.classList.add('active');
        menuIcon.classList.remove('toggle-menu-btn-menu-icon');
        menuIcon.classList.add('toggle-menu-btn-cross-icon');
        menuIconUseEl.setAttribute('href', '#cross');
      } else {
        bodyEl.classList.remove('noscroll');
        setTimeout(
          () => { headerEl.classList.remove('active'); }, 300
        );
        sidebarsCont.classList.remove('active');
      }
    } else {
      if (menuIcon.classList.contains('toggle-menu-btn-cross-icon')) {
        menuCont.classList.remove('active');
        setTimeout(() => { menuCont.scrollTop = 0; }, 300);
        menuIcon.classList.remove('toggle-menu-btn-cross-icon');
        menuIcon.classList.add('toggle-menu-btn-menu-icon');
        menuIconUseEl.setAttribute('href', '#menu');
      } else {
        bodyEl.classList.add('noscroll');
        headerEl.classList.add('active');
        sidebarsCont.classList.add('active');
      }
      if (catalogCont.classList.contains('active-reverse')) {
        catalogCont.classList.remove('active-reverse');
      }
      catalogCont.classList.add('active');
    }
  } catch (err) {
    throw err;
  }
  setShowCatalog(
    showCatalogBtn, menuItemShowCatalogBtn, closeCatalogBtn, toggleMenuBtn,
    headerEl, sidebarsCont, menuCont, menuIcon, menuIconUseEl,
    catalogCont, bodyEl
  );
}
