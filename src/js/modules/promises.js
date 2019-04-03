export default function evProm(el, ev) {
  return new Promise((resolve) => {
    el.addEventListener(ev, resolve);
  });
}

export function manyEvPromArr(el, evArr, promFun = evProm) {
  const promArr = [];
  for (let i = 0; i < evArr.length; i++) {
    promArr.push(promFun(el, evArr[i]));
  }
  return promArr;
}

export function manyElEvPromArr(elArr, ev) {
  const promArr = [];
  for (let i = 0; i < elArr.length; i++) {
    promArr.push(evProm(elArr[i], ev));
  }
  return promArr;
}

export function manyPromFunArr(promFun, arr) {
  const promArr = [];
  for (let i = 0; i < arr.length; i++) {
    promArr.push(promFun(arr[i]));
  }
  return promArr;
}
