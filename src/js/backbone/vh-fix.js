export default function vhFix() {
  const documentElement = document.documentElement;
  const windowScreen = window.screen;
  const vh = windowScreen.height * 0.01;
  documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    const vhResize = windowScreen.height * 0.01;
    documentElement.style.setProperty('--vh', `${vhResize}px`);
  });
}
