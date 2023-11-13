// this指向 输出题
var a = "window";
var obj = {
  a: "obj",
  foo: function () {
    console.log(this.a);
  },
  bar: () => {
    console.log(this.a);
  },
  baz: function () {
    function f() {
      console.log(this.a);
    }
    f();
  },
  bac: function () {
    const f = () => {
      console.log(this.a);
    };
    f();
  },
  pro: {
     a : 'pro',
    getPro: function() {
        console.log(this.a)
    }
  },
  pro1: {
    a : 'pro1',
    getPro1: () => {
        console.log(this.a)
    }
  }
};

obj.foo(); // obj  这里的this指向的是obj，因为obj.foo是对象属性，执行环境在obj对象中
obj.bar(); // window 这里的this指向的是window，箭头函数没有自己的this，取决于定义时所在的词法作用域，这里上一级的function是window
obj.baz(); // window 这里的f不能理解为运行在obj对象中，必须要obj[函数名]的形式才能说是运行在obj对象中，而这里的foo相当于没有任何的显示绑定，所以这里指向的是window
obj.bac(); // obj  这里的f函数没有自己的this，所以继承自词法作用域，这里的词法作用域是上一级的function,上一级function指向的是obj
obj.pro.getPro(); // pro 这里函数的调用方式是对象[函数名]，所以指向的是最近的对象，也就是pro，但是pro
obj.pro1.getPro1();  // window  箭头函数所在上一级词法作用域是window
var fn = obj.foo
fn(); // window 这里执行时所在的环境是window 所以当前this指向的是window
