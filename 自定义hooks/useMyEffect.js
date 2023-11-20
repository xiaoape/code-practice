const dependencyList = [];
const clearCallbacks = [];
let index = 0;

export function useMyEffect(
  callback,
  deps
) {
  const curIndex = index;
  index++;
  const lastDeps = dependencyList[curIndex];
  const changed =
    !lastDeps || !deps || deps.some((dep, i) => dep !== lastDeps[i]);
  if (changed) {
    dependencyList[curIndex] = deps;
    const clearCallback = clearCallbacks[curIndex];
    if (clearCallback) clearCallback();
    clearCallbacks[curIndex] = callback();
  }
}

export function clearEffectIndex() {
  index = 0;
}

// 参考链接：https://www.cnblogs.com/WindrunnerMax/p/16211267.html