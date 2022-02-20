// 遍历嵌套对象
const obj = {
    a: {
        b: {
            c: 666
        }
    }
}

var str = 'a.b.c';
const getData = () => {
    var newArr = str.split('.').reduce((o, s) => {
        return o[s]
    }, obj)
    return newArr
}
console.log(getData());

// 第二种实现方式
const obj = {
    a: {
        b: {
            c: 666
        }
    }
}

var str = 'a.b.c';
const getData = (obj, str) => {
    str.split('.').forEach(element => {
        obj = obj[element]
    })
    return obj;
}
console.log(getData(obj, str));