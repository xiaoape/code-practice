// 手写一个迭代器(Iterator)

/* 
    这是一个手写的迭代器(Iterator)
    满足迭代器协议的对象。
    迭代器协议: 对象的next方法是一个无参函数，它返回一个对象，该对象拥有done和value两个属性： 
*/
var it = makeIterator(["a", "b"]);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ?
                {
                    value: array[nextIndex++],
                    done: false
                } :
                {
                    value: undefined,
                    done: true
                };
        },
    };
}


// 使自己迭代器可迭代（迭代器返回可迭代对象(Iterable)）,

// 一个良好的迭代即实现了迭代器协议，又实现了可迭代协议，方式就是可迭代协议返回的是自身


/* 
    使迭代器可迭代
    makeIterator函数生成的迭代器并没有实现可迭代协议
    所以不能在for...of等语法中使用。
    可以为该对象实现可迭代协议，在[Symbol.iterator]函数中返回该迭代器自身
    从新名了下函数名称createIterator
*/
function createIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ?
                {
                    value: array[nextIndex++],
                    done: false
                } :
                {
                    value: undefined,
                    done: true
                };
        },
        [Symbol.iterator]: function () {
            console.log("返回的迭代器:", this)
            return this // 注意这里是对象调用模式，this指向的就是上层的对象，迭代器
        }
    };
}

var iterator = createIterator([1, 2, 3]);
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(...iterator)   // 3
