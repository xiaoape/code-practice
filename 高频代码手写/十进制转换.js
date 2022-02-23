// 给定10进制数，转换成[2~16]进制区间数
function Conver(number, base = 2) {
    let rem, res = '',
        digits = '0123456789ABCDEF',
        stack = [];

    while (number) {
        rem = number % base;
        stack.push(rem);

        number = Math.floor(number / base);
    }

    while (stack.length) {
        res += digits[stack.pop()].toString();
    }

    return res;
}

console.log(Conver(10,2)) // 1010
console.log(Conver(10,3)) // 101
console.log(Conver(14,5)) // 24
console.log(Conver(10,10)) // 10