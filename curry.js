function curry(fn, args) {
    // 获取传进来的函数的参数个数
    var length = fn.length;
    // 获取初始柯里化的参数数组
    var args = args || [];
    return function(){
    // 柯里化的参数参数合并
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(5)(4);
multi(2,5,4);
multi(2)(5,4);
multi(2,5)(4);

// 使用ES6方式
const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])

let curryTest=curry((a,b,c,d)=>a+b+c+d)
curryTest(1,2,3)(4)
curryTest(1,2)(4)(3)
curryTest(1,2)(3,4)
