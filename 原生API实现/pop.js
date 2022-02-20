// pop实现
Array.prototype.pop = function () {
    let O = Object(this)
    let len = this.length >>> 0
    if (len === 0) return O.length = 0, undefined
    len--
    let value = O[len]
    delete O[len]
    O.length = len
    return value
}