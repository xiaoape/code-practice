// reduce实现
Array.prototype.selfReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    let res
    let startIndex
    if (initialValue === undefined) {
        // 找到第一个非空单元（真实）的元素和下标
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue
            startIndex = i
            res = arr[i]
            break
        }
    } else {
        res = initialValue
    }
    // 遍历的起点为上一步中找到的真实元素后面一个真实元素
    // 每次遍历会跳过空单元的元素
    // 注意这里的i一定要先++，因为如果没有指定初始值的话，是默认从第2个数开始循环的
    for (let i = ++startIndex || 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        // 这里为什么要传null?传this也可以啊，难道reduce的回调函数不是指向的数组实例？好像真的不是
        res = fn.call(null, res, arr[i], i)
    }
    return res
}

Array.prototype.selfReduce || (Object.defineProperty(Array.prototype, 'selfReduce', {
    value: selfReduce,
    enumerable: false,
    configurable: true,
    writable: true
}))


let arr = [1, 2, 3, 4, 5]

console.log(arr.selfReduce((acc, cur) => acc + cur))
console.log(arr.reduce((acc, cur) => acc + cur))