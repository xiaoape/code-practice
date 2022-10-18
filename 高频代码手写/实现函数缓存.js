// 实现函数的缓存
const memorize = function (fn) {
    const cache = {} // 存储缓存数据的对象
    return function (...args) { // 这里用到数组的扩展运算符
        const _args = JSON.stringify(args) // 将参数作为cache的key
        return cache[_args] || (cache[_args] = fn.apply(fn, args)) // 如果已经缓存过，直接取值。否则重新计算并且缓存
    }
}
const add = function (a, b) {
    console.log('开始缓存')
    return a + b
}

const adder = memorize(add)

console.log(adder(2, 6)) // 输出结果: 开始缓存 8        // cache: { '[2, 6]': 8 }
console.log(adder(2, 6)) // 输出结果: 8                //cache: { '[2, 6]': 8 }
console.log(adder(10, 10)) // 输出结果: 开始缓存 20    // cache: { '[2, 6]': 8, '[10, 10]': 20 }

// 应用场景
// 虽然使用缓存效率是非常高的，但并不是所有场景都适用，因此千万不要极端的将所有函数都添加缓存

// 以下几种情况下，适合使用缓存：

// 对于昂贵的函数调用，执行复杂计算的函数
// 对于具有有限且高度重复输入范围的函数
// 对于具有重复输入值的递归函数
// 对于纯函数，即每次使用特定输入调用时返回相同输出的函数