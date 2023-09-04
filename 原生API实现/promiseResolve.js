// promise.resovle
Promise.resolve = function (val) {
    return new Promise(resolve => {
        resolve(val)
    })
}