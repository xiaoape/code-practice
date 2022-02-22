// 函数柯里化 curry
function curry(fn, args) {
    // 获取传进来的函数的参数个数
    var length = fn.length;
    // 获取初始柯里化的参数数组
    var args = args || [];
    return function () {
        // 柯里化的参数参数合并
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

console.log(multi(2)(5)(4)); // 40
console.log(multi(2, 5, 4)); // 40
console.log(multi(2)(5, 4)); // 40
console.log(multi(2, 5)(4)); // 40

// 使用ES6方式
const curryTwo = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length ?
    fn(...arg) :
    curryTwo(fn, arg)
)([...arr, ...args])

let curryTest = curryTwo((a, b, c, d) => a + b + c + d)
console.log(curryTest(1, 2, 3)(4)) // 10
console.log(curryTest(1, 2)(4)(3)) // 10
console.log(curryTest(1, 2)(3, 4)) // 10