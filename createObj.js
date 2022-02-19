// createObj实现
const myCreate = function (obj) {
    function F() {}
    F.prototype = obj
    return new F() // 创建一个继承 obj 原型属性的纯净对象
}