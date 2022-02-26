// 数组归纳
// 随机数组中查找众数
let arr = [1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3];
let arr2 = [1,2,2]
function findMode(arr) {
    // map存储数字和次数
    const map = {}
    // 存储数字的次数
    const count = []
    // 最终的result
    const result = []
    arr.forEach(item => {
        if(!map[item]) {
            map[item] = 1
        } else {
            map[item] = map[item] + 1
        }
    })
    for(const value of Object.values(map)) {
        count.push(value)
    }
    console.log('次数的数组',count)
    let max = Math.max.apply(null, count)
    console.log('最多次数的值', max)
    for(const [key, value] of Object.entries(map)) {
        if(value === max) {
            result.push(Number(key))
        }
    }
    console.log('数组中的众数', result)
}
findMode(arr)
findMode(arr2)