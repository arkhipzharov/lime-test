import evProm from '../modules/promises';

export default async function setShowMenu(
  toggleMenuBtn, headerEl, searchEl, searchPopupMaskEl, sidebarsCont,
  menuCont, menuIcon, menuIconUseEl, catalogCont, bodyEl
) {
  try {
    await evProm(toggleMenuBtn, 'click');
    menuIcon.classList.add('opened');
    if (menuIcon.classList.contains('toggle-menu-btn-menu-icon')) {
      if (catalogCont.classList.contains('active')) {
        catalogCont.classList.remove('active');
        setTimeout(() => { catalogCont.scrollTop = 0; }, 300);
        catalogCont.classList.add('active-reverse');
      } else {
        bodyEl.classList.add('noscroll');
        headerEl.classList.add('active');
        sidebarsCont.classList.add('active');
      }
      menuCont.classList.add('active');
      menuIcon.classList.remove('toggle-menu-btn-menu-icon');
      menuIcon.classList.add('toggle-menu-btn-cross-icon');
      menuIconUseEl.setAttribute('href', '#cross');
    } else {
      setTimeout(() => { headerEl.classList.remove('active'); }, 300);
      sidebarsCont.classList.remove('active');
      menuCont.classList.remove('active');
      setTimeout(() => { menuCont.scrollTop = 0; }, 300);
      menuIcon.classList.remove('opened');
      menuIcon.classList.remove('toggle-menu-btn-cross-icon');
      menuIcon.classList.add('toggle-menu-btn-menu-icon');
      menuIconUseEl.setAttribute('href', '#menu');
      bodyEl.classList.remove('noscroll');
    }
  } catch (err) {
    throw err;
  }
  setShowMenu(
    toggleMenuBtn, headerEl, searchEl, searchPopupMaskEl, sidebarsCont,
    menuCont, menuIcon, menuIconUseEl, catalogCont, bodyEl
  );
}
