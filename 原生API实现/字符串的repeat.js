// 字符串repeat实现
function repeatOne(s, n) {
    return (new Array(n + 1)).join(s);
}

console.log(repeatOne('abc',2)) // 'abcabc'

// 递归
function repeatTwo(s, n) {
    return (n > 0) ? s.concat(repeatTwo(s, --n)) : "";
}

console.log(repeatTwo('abcd',2)) // 'abcdabcd'

function repeatThree(s,n) {
    let result = ''
    for(let i=0;i<n;i++) {
        result = result + s
    }
    return result
}

console.log(repeatThree('abdce', 2))
