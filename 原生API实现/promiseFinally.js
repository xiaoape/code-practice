// promise.finally
// finally 需要注意

// 1.finally 的回调没有参数
// 2. promise 如果成功，则将成功的值正常传递下去，不会因 finally 而断掉，举例：
// 3. promise 如果失败，同上
Promise.prototype.finally = function (onFinished) {
    return this.then(val => {
        onFinished()
        return val
    }).catch((err) => {
        onFinished()
        return err
    })
}

Promise
    .resolve(1)
    .finally(val => console.log(val)) // undefind
    .then(val => console.log(val)) // 1
Promise
    .reject('error')
    .finally(val => console.log(val)) // undefind
    .catch(err => console.log(err)) // error