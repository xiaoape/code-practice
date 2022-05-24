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
// 方式二
const getData2 = (obj, str) => {
    str.split('.').forEach(element => {
        obj = obj[element]
    })
    return obj;
}
console.log(getData(obj, str)); // 666
console.log(getData2(obj, str)); // 666

// 自测
const test = (obj, str) => {
    const arr = str.split('.')
    let realObj = obj
    for(let i = 0;i< arr.length;i++) {
        if (typeof realObj[arr[i]] === 'object') {
            realObj = realObj[arr[i]]
        } else {
            return realObj[arr[i]]
        }
    }
}
console.log(test(obj, str)) // 666