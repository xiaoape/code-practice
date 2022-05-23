// 奇偶闭包
function printNum() {
    let count = 2
    return function () {
        if (count) {
            if(count && count % 2 === 0) {
                console.log('0')
            } else {
                console.log('1')
            }
            count++
        }
    }
}
let add = printNum()
add() // 0
add() // 1
add() // 0
add() // 1