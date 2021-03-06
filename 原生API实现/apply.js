// apply实现
Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    let fn = Symbol(context)
    context[fn] = this
    // apply和call的区别是apply的第二个参数是数组
    let arg = [...arguments].slice(1)
    const result = context.fn(arg)
    delete context.fn
    return result
}


const obj = {
    a: 2,
    b: 'c'
}

function test() {
    console.log(this.a)
}

test.apply(obj) // 2
test() // undefined
