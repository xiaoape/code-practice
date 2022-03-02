String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
}
//或者 
function trim(string) {
    return string.replace(/^\s+|\s+$/g, '')
}

console.log(trim('323 ')) // '323'
console.log(trim('  324')) // '324'
console.log(trim('  325  ')) // '325'
console.log(trim('  32 6  ')) // '32 6'

// 不使用正则表达式
function trim2(str) {
    let newStr = str.split('')
    const len = str.length;
    let left = 0
    let right = len - 1;
    for(let i = 0;i<len;i++) {
        if(newStr[i]!== ' ') {
            left = i;
            break;
        }
    }
    for(let j = len - 1;j>0;j--) {
        if(newStr[j]!== ' ') {
            right = j + 1
            break;
        }
    }
    console.log(left, right)
    return newStr.slice(left, right).join('')
}
console.log(trim2(' 23 7 ')) // '23 7'