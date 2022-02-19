// new关键字实现
function New(func) {
    // 创建一个全新的对象
    var res = {};
    // 链接到原型
    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
    }
    // 执行函数，指定this指向创建的对象res
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    // 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)
    // 那么new表达式中的函数调用将返回该对象引用
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }
    return res;
}
var obj = New(A, 1, 2);
// equals to
var obj = new A(1, 2);