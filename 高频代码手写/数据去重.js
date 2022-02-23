// 数组去重
// 这个是Array数组测试用例👇
var array = [1, 1, '1', '1', null, null,
    undefined, undefined,
    new String('1'), new String('1'),
    /a/, /a/,
    NaN, NaN
];
// 如何通过一个数组去重，给面试官留下深印象呢👇
// 使用Set
let unique_1 = arr => [...new Set(arr)];
// 使用filter
function unique_2(array) {
    var res = array.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
    return res;
}

// 使用reduce
let unique_3 = arr => arr.reduce((pre, cur) => pre.includes(cur) ? pre : [...pre, cur], []);
// 使用Object 键值对🐂🐂，这个也是去重最好的效果👇
function unique_3(array) {
    var obj = {};
    return array.filter(function (item, index, array) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
// 使用obj[typeof item + item] = true，原因就在于对象的键值只能是字符串，所以使用typeof item + item代替