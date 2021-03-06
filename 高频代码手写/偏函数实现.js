// 偏函数实现
const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];


/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @param {Function} func -部分求值的函数
 * @param {...*} [args] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

const partialFunc = (func, ...args) => {
    // placeholderNum用来记录最后一个占位符的位置，表示的是最后一个占位符位置的后面一个位置
    let placeholderNum = 0
    return (...args2) => {
        args2.forEach(arg => {
            let index = args.findIndex(item => item === "_")
            if (index < 0) return
            args[index] = arg
            placeholderNum++
        })
        if (placeholderNum < args2.length) {
            args2 = args2.slice(placeholderNum, args2.length)
        }
        // args是将占位符替换后的参数数组，后面需要拼接的参数
        return func.apply(this, [...args, ...args2])
    }
}


let partialDisplay = partialFunc(display, 1, 2)
console.log("partialFunc", partialDisplay(3, 4, 5, 6, 7, 8))


let partialDisplay2 = partialFunc(display, '_', 2, '_') // 使用占位符
console.log('partialFunc2', partialDisplay2(1, 3, 4, 5, 6, 7, 8))