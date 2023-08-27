// flat实现
// 使用reduce实现flat函数
Object.prototype.copyFlat = function () {
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((res, value) => {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return res.concat(value.copyFlat())
    } else {
      return res.concat(value)
    }
  }, [])
}
let arr = [3, 2, [5, 6]]
console.log(arr.copyFlat()) // [3,2,5,6]

// 事实上flat函数是要有一个num的参数的
// reduce实现 Array.prototype.flat，数组扁平化
const selfFlat = function (depth = 1) {
  let arr = Array.prototype.slice.call(this)
  if (depth === 0) return arr
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      // 需要用 call 绑定 this 值，否则会指向 window
      return [...pre, ...selfFlat.call(cur, depth - 1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
const selfFlat2 = function (arr) {
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      // 需要用 call 绑定 this 值，否则会指向 window
      return [...pre, ...selfFlat2.call(cur, cur)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
console.log(selfFlat2(arr)) // [3,2,5,6]


Array.prototype.selfFlat || (Object.defineProperty(Array.prototype, 'selfFlat', {
  value: selfFlat,
  enumerable: false,
  configurable: true,
  writable: true
}))
let arr1 = [1, 2, [3, 4, [5, 6, 7, 8], 9], 10, 11, 12, [13, 14]]

// console.log(arr1.selfFlat(Infinity)) //  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


// 参考链接：https://segmentfault.com/a/1190000021366004