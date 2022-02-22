// instanceOf实现
// instanceof`用于实例和构造函数的对应,可以正确的判断对象的类型
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


function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
      if (left === null || left === undefined)
        return false
      if (prototype === left)
        return true
      left = left.__proto__
    }
  }