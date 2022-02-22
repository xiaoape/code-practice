// createObj实现
const myCreate = function (obj) {
    function F() {}
    F.prototype = obj
    return new F() // 创建一个继承 obj 原型属性的纯净对象
}

const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = myCreate(person);

me.name = 'Matthew';
me.isHuman = true;
console.log(me.__proto__ === person) // true
me.printIntroduction(); // "My name is Matthew. Am I human? true"