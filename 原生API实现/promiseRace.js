// promise.race
// Promise.race() 接收一个promise对象组成的数组作为参数，并返回一个新的promise对象。

// Promise.race()是在数组中有一个对象（最早改变状态）resolve或reject时，就改变自身的状态，并执行响应的回调。
// 方式一
function promiseRace(promises) {
    if (!Array.isArray(promises)) {
        throw new Error("promises must be an array")
    }
    return new Promise(function (resolve, reject) {
        promises.forEach(p =>
            Promise.resolve(p).then(data => {
                resolve(data)
            }, err => {
                reject(err)
            })
        )
    })
}

// 方式二  
Promise.race = function (promises) {
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass array')
    }

    return Promise(function (resolve, reject) {
        function resolver(value) {
            resolve(value)
        }

        function rejecter(reason) {
            reject(reason)
        }

        for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolver, rejecter)
        }
    })
}