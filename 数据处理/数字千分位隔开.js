// 数字千分位隔开
// 数字有小数版本：
let format = n => {
    let num = n.toString() // 转成字符串
    let decimals = ''
    // 判断是否有小数
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp
        }
    }
}
console.log(format(12323.33)) // '12,323.33'
// console.log(format(0.13)) // 报错 Cannot read properties of null (reading 'join')


// 数字无小数版本：
let format2 = n => {
    let num = n.toString()
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let remainder = len % 3
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',')
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',')
        }
    }
}
console.log(format2(1232323)) // '1,232,323'

// 方式二： 使用toLocalString()方法
let a = 12345600789
console.log(a.toLocaleString()) // '12,345,600,789'

let b = 123456.00789
console.log(b.toLocaleString()) // '123,456.008'  可以看到当前是默认三位小数有效

console.log(b.toLocaleString('zh', { minimumFractionDigits: 6 })); // 123,456.007890

// 使用toLocalString方法，如果是整数的话，
// 我们希望不需要那么多的精度，可以通过控制minimumFractionDigits属性做到

let c = 234567
console.log(c.toLocaleString('zh', { 
    minimumFractionDigits: c % 1 === 0 ? 0 : 4 
})); // 234,567

