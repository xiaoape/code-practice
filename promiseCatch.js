// promise.catch
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}