// 随机生成制定长度的字符串
function randomString(n) {
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let tmp = '',
        i = 0,
        l = str.length;
    for (i = 0; i < n; i++) {
        tmp += str.charAt(Math.floor(Math.random() * l));
    }
    return tmp;
}

console.log(randomString(8))