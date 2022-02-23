// 字符串归纳

// 判断一个字符串中某个子串存在个数
function subStringCount(s,subS) {
    if(!subS || !s) return 0
    return s.split(subS).length - 1
}

console.log(subStringCount('PPALLP', 'A')) // 1
console.log(subStringCount('PPALLP', ''))  // 0
console.log(subStringCount('', 'A'))  // 0

// 判断一个字符串中是否存在连续的相同字符
// sub是单个字符
// num是次数
function sameSubStr(s, sub, num) {
    let str = sub.repeat(num)
    return s.indexOf(str) > -1
}

console.log(sameSubStr('PPALLP', 'L', 2)) // true

// 可练习题目：https://leetcode-cn.com/problems/student-attendance-record-i/