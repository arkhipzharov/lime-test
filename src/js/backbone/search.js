import evProm from '../modules/promises';

export default async function setShowSearchPopup(
  searchEl, showSearchPopupBtnMaskEl, searchPopupMaskEl, sidebarsCont,
  headerEl, bodyEl
) {
  try {
    await evProm(showSearchPopupBtnMaskEl, 'click');
    bodyEl.classList.add('noscroll');
    searchEl.classList.add('active');
    headerEl.classList.add('active');
    searchPopupMaskEl.classList.add('active');
    await evProm(searchPopupMaskEl, 'click');
    searchEl.classList.remove('active');
    searchPopupMaskEl.classList.remove('active');
    if (!sidebarsCont.classList.contains('active')) {
      bodyEl.classList.remove('noscroll');
      headerEl.classList.remove('active');
    }
  } catch (err) {
    throw err;
  }
  setShowSearchPopup(
    searchEl, showSearchPopupBtnMaskEl, searchPopupMaskEl, sidebarsCont,
    headerEl, bodyEl
  );
}
