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


// 占位符curry
/**
 * @param  fn           待柯里化的函数
 * @param  length       需要的参数个数，默认为函数的形参个数
 * @param  holder       占位符，默认当前柯里化函数
 * @return {Function}   柯里化后的函数
 */
function curry(fn,length = fn.length,holder = curry){
    return _curry.call(this,fn,length,holder,[],[])
}
/**
 * 中转函数
 * @param fn            柯里化的原函数
 * @param length        原函数需要的参数个数
 * @param holder        接收的占位符
 * @param args          已接收的参数列表
 * @param holders       已接收的占位符位置列表
 * @return {Function}   继续柯里化的函数 或 最终结果
 */
function _curry(fn,length,holder,args,holders){
    return function(..._args){
        //将参数复制一份，避免多次操作同一函数导致参数混乱
        let params = args.slice();
        //将占位符位置列表复制一份，新增加的占位符增加至此
        let _holders = holders.slice();
        //循环入参，追加参数 或 替换占位符
        _args.forEach((arg,i)=>{
            //真实参数 之前存在占位符 将占位符替换为真实参数
            if (arg !== holder && holders.length) {
                let index = holders.shift();
                _holders.splice(_holders.indexOf(index),1);
                params[index] = arg;
            }
            //真实参数 之前不存在占位符 将参数追加到参数列表中
            else if(arg !== holder && !holders.length){
                params.push(arg);
            }
            //传入的是占位符,之前不存在占位符 记录占位符的位置
            else if(arg === holder && !holders.length){
                params.push(arg);
                _holders.push(params.length - 1);
            }
            //传入的是占位符,之前存在占位符 删除原占位符位置
            else if(arg === holder && holders.length){
                holders.shift();
            }
        });
        // params 中前 length 条记录中不包含占位符，执行函数
        if(params.length >= length && params.slice(0,length).every(i=>i!==holder)){
            return fn.apply(this,params);
        }else{
            return _curry.call(this,fn,length,holder,params,_holders)
        }
    }
}

let fn = function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
}

let _ = {}; // 定义占位符
let _fn = curry(fn,5,_);  // 将函数柯里化，指定所需的参数个数，指定所需的占位符

_fn(1, 2, 3, 4, 5);                 // print: 1,2,3,4,5
_fn(_, 2, 3, 4, 5)(1);              // print: 1,2,3,4,5
_fn(1, _, 3, 4, 5)(2);              // print: 1,2,3,4,5
_fn(1, _, 3)(_, 4,_)(2)(5);         // print: 1,2,3,4,5
_fn(1, _, _, 4)(_, 3)(2)(5);        // print: 1,2,3,4,5
_fn(_, 2)(_, _, 4)(1)(3)(5);        // print: 1,2,3,4,5

// 参考链接：https://juejin.cn/post/6844903882208837645