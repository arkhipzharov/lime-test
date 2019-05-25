export default function manyAsyncFunCallProms(fun, singleArgs) {
  return singleArgs.reduce((proms, singleArg) => {
    proms.push(fun(singleArg));
    return proms;
  }, []);
}
