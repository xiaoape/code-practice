// bind实现
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    // 返回一个函数
    return function F() {
        // 因为返回了一个函数，我们可以 new F()，所以需要判断
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
// 这个地方不能使用module作为变量，不然在nodejs环境下会报错
const moduleOne = {
    x: 42,
    getX: function () {
        return this.x;
    }
};
const unboundGetX = moduleOne.getX;
console.log(unboundGetX());  // undefined

const boundGetX = unboundGetX.myBind(moduleOne);
console.log(boundGetX()); // 42
let obj1 = new unboundGetX(moduleOne)
console.log(obj1 instanceof unboundGetX) // true
console.log(unboundGetX.myBind()()) // undefined
console.log(obj1()) // obj1 is not a function

Function.prototype.bindTwo = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    var aArgs = [...arguments].slice(1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            // 因为返回了一个函数，我们可以 new F()，所以需要检测new
            // 如果当前函数的this指向的是构造函数中的this 则判定为new方式调用
            // 此时我们需要忽略传入的this也就是context
            // 因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来
            return fToBind.apply(this instanceof fBound ?
                this :
                context,
                // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};