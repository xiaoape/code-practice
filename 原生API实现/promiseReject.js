// promise.reject
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    })
}