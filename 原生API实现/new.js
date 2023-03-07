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

function create() {
    let obj = {}
    //由于arguments是类数组，没有直接的方法可以供其使用，我们可以有以下两种方法:
    // 1. Array.from(arguments).shift(); //转换成数组 使用数组的方法shift将第一项弹出
    // 2.[].shift().call(arguments); // 通过call() 让arguments能够借用shift方法
    // arguments的第一项就是构造函数对象
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }