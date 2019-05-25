// Обеспечивает работоспособность решения, описанного в комментарии 1
// внутри файла для миксина vh
export default function vhFix() {
  const documentEl = document.documentElement;
  const screen = window.screen;
  const vh = screen.height * 0.01;
  documentEl.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    const vhResize = screen.height * 0.01;
    documentEl.style.setProperty('--vh', `${vhResize}px`);
  });
}
