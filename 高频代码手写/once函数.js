// 实现一个 once 函数，记忆返回结果只执行一次

function onceCache(fn) {
  let toggle = false,
    ret = null;
  return function () {
    if (toggle) return ret;
    toggle = true;
    return (ret = fn.apply(this, arguments));
  };
}

const once_fn = onceCache(f)
// 第一次调用
let firstFn = once_fn() // call
console.log(firstFn, 'first return') // 3

// 第二次调用，没有打印 call
let secondFn = once_fn()
console.log(secondFn, 'second return') // 3
