function Parent(value) {
    this.val = value
  }
  Parent.prototype.getValue = function() {
    console.log(this.val)
  }
  
  function Child(value) {
    Parent.call(this, value)
  }
  // 不必为了指定子类型的原型而调用父类型的构造函数，我们所需要的无非就是父类型原型的一个副本而已。
  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  
  const child = new Child(1)
  
  child.getValue() // 1
  child instanceof Parent // true
  