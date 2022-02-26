// 生成随机的不重复数组,取值范围为1-num
function getRandom(num) {
    let b = new Array(num)
    for (let i = 0; i < b.length; i++) {
        const c = parseInt(Math.random() * num) + 1
        b.indexOf(c) === -1 ? b[i] = c : i--
    }
    console.log(b)
}
getRandom(12)