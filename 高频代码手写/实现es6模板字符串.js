// 实现es6模板字符串
// replace 函数，第二个参数是函数的情况说明：每个匹配都调用该函数，它返回的字符串将替换文本使用
let name = '小明';
let age = 20;
let str1 = '我叫${name},我的年龄 ${ age}';
function tempalteStr(str) {
  return str.replace(/\$\{(.*?)\}/g, function (str, k) {
    // eval(name) 替换成 小明
    // // eval(age) 替换成 20
    return eval(k);
  });
}
console.log(tempalteStr(str1)); // 我叫小明,我的年龄20