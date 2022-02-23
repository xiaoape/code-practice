// 实现maxRequest，成功后resolve结果，失败后重试，尝试超过一定次数才真正的reject
function maxRequest(fn, maxNum) {
    return new Promise((resolve, reject) => {
        function help(index) {
            Promise.resolve(fn()).then(value => {
                resolve(value)
            }).catch(error => {
                if (index - 1 > 0) {
                    help(index - 1)
                } else {
                    reject(error)
                }
            })
        }
        help(maxNum)
    })
}