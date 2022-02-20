// instance实现
// instanceof`可以正确的判断对象的类型，
// 因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false // 基础类型一律为 false
    let proto = Object.getPrototypeOf(left) // 获取对象的原型
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}