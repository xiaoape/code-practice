// 循环实现map
const selfMap = function (fn, context) {
    // 这里传递一个this就是为了将数组传递过来
    let arr = Array.prototype.slice.call(this)
    // mappedArr是个啥呢？不就是个[]
    let mappedArr = Array()
    for (let i = 0; i < arr.length; i++) {
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue;
        // context是代表fn函数中this指向，这里的this就表示传递过来的数组arr
        mappedArr[i] = fn.call(context, arr[i], i, this)
    }
    return mappedArr
 }
 
 
 // reduce实现map
 // 由于 reduce 会跳过空单元数组，所以这个 polyfill 无法处理空单元数组
 const selfMap2 = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index) => [...pre, fn.call(context, cur, index, this)], [])
 }
 
 // 如果没有做下面的兼容，在浏览器上是执行不了的，因为数组没有selfMap方法，会报错
 // 可以直接定义在Object.prototype上就可以使用了
 Array.prototype.selfMap || (Object.defineProperty(Array.prototype, 'selfMap', {
    value: selfMap,
    enumerable: false,
    configurable: true,
    writable: true
 }))
 Array.prototype.selfMap2 || (Object.defineProperty(Array.prototype, 'selfMap2', {
    value: selfMap2,
    enumerable: false,
    configurable: true,
    writable: true
 }))
 
 let arr = ['z', 'h', ,'l']
 console.log(arr.selfMap(item => item + "1"))
 console.log(selfMap2.call({0:'a',1:'b',length:2}, item => item + "1")) // map 方法同样支持类数组
 
 // 我最初的代码，这样写有问题么？是因为我传递了一个数组，所以就不像map函数么？
 Object.prototype.copyMap = (fn, initArr) => {
    let arr = []
    for (let i = 0;i<initArr.length; i++) {
        arr.push(fn(initArr[i]))
    }
    return arr
 }
 let arr2 = [2,3,4]
 console.log(arr2.copyMap(item => item +1,arr2))  // [3，4，5]