// 斐波那契
const speed = function (fn, num) {
    console.time('time')
    let value = fn(num)
    console.timeEnd('time')
    console.log(`返回值:${value}`)
}

/**
 * @description 斐波那契数列
 * @param {number} n -第几个位置
 * @return {number} 参数对应在数列中的数字
 **/
let fibonacci = function (n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

speed(fibonacci, 35)


//函数记忆
const memory = function (fn) {
    let obj = {}
    return function (n) {
        if (obj[n] === undefined) obj[n] = fn(n)
        return obj[n]
    }
}
fibonacci = memory(fibonacci)

speed(fibonacci, 35)

// 突然想知道这种写法有什么好处，我如果非要把这些逻辑都写在一个函数里呢
let obj={}
function fibo1 (num) {
    if(num < 1) {
        return 1
    }
 function memory (num) {
     if(obj[num] === undefined) {
         obj[num] = fibo1(num)
         return obj[num]
     } else {
         return obj[num]
     }
 }
    return memory(num-1) + memory(num-2)
}

// 尾递归调用（不就是递归的最后一个步骤是返回的一个函数的结果而不是一个表达式，这样可以解决爆栈的问题
// 使用尾递归还不如使用迭代
function fibo2(num,n1,n2) {
    if (num === 0) {
        // 注意这里返回的是n1
        return n1
    }
    return fibo2(num-1,n2,n1+n2)
}

// 再来最优解迭代的方式
function fibo3 (num) {
    let res  = 1
    if(num ===0 || num ===1) {
        return res
    }
    let cur = 1,pre = 1
    for(let i=num-2;i>=0;i--) {
        res = cur + pre
        pre = cur
        cur = res
    }
    return res
}

/**
 * @description 斐波那契动态规划版本（最优解）
 **/
function fibonacci_DP(n) {
    let res = 1
    if (n === 1 && n === 2) return res
    n = n - 2
    let cur = 1
    let pre = 1
    while (n) {
        res = cur + pre
        pre = cur
        cur = res
        n--
    }
    return res
}

speed(fibonacci_DP, 35)

// 利用数组的方式实现

var climbStairs = function(n) {
    let result = [1,2];
    for (let i = 2; i < n; i++) {
        result.push(result[i-1] + result[i-2]);
    }
    return result[n-1];
};

// 使用数组解构
var climbStairs = function(n) {
    let a = b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
};