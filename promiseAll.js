// Promise.all
// all的原理，只能使用Promise，不能使用promise.resolve
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let results = []; // 结果数组
        let i = 0;
        let processData = (value, index) => {
            results[index] = value;
            // 当成功的个数 和 当前的参数个数相等就把结果抛出去
            if (++i === values.length) {
                resolve(results);
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i]; // 拿到数组中每一项
            // 判断是不是一个promise
            if ((typeof current === 'object' && current !== null) || typeof current == 'function') {
                // 如果是promise
                if (typeof current.then == 'function') {
                    // 就调用这个promise的then方法，把结果和索引对应上
                    // 如果任何一个失败了返回的proimise就是一个失败的promise
                    current.then(y => {
                        processData(y, i);
                    }, reject)
                } else {
                    processData(current, i);
                }
            } else {
                processData(current, i);
            }
        }
    });
}



// 可使用Promise和Promise.resolve和Promise.then方法来写
function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (let i = 0; i < promiseNum; i++) {
            // 使用Promise.resolve判断当前promise的状态是resolve还是reject
            Promise.resolve(promises[i]).then(function (value) {
                resolvedCounter++
                resolvedValues[i] = value
                if (resolvedCounter == promiseNum) {
                    return resolve(resolvedValues)
                }
            }, function (reason) {
                return reject(reason)
            })
        }
    })
}