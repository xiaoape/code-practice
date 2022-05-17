// 优雅的处理try catch
// 方式一
async function errorCaptured(asyncFunc) {
    if (typeof asyncFunc !== 'function') {
        throw new TypeError('Error')
    }
    try {
        let arg = [...arguments].slice(1)
        let res = await asyncFunc(...arg);
        return [null, res]
    } catch (e) {
        return [e, null]
    }
}

// 方式一的问题是如果传入的是对象里的一个方法，而这个方法里会依赖this，那么就会导致this指向错误的问题
// 所以最好是将函数进行bind处理后传入方式一

// 方式二能保证方式一的问题
async function errorCapturedTwo(obj, fucName) {
    if (obj) {
        if (typeof obj[fucName] !== 'function') {
            throw new TypeError('Error')
        }
        try {
            let arg = [...arguments].slice(2)
            let res = await obj[fucName](...arg);
            return [null, res]
        } catch (e) {
            return [e, null]
        }
    } else {
        if (typeof fucName !== 'function') {
            throw new TypeError('Error')
        }
        try {
            let arg = [...arguments].slice(1)
            let res = await fucName(...arg);
            return [null, res]
        } catch (e) {
            return [e, null]
        }
    }
}

// 测试
// const test = async (a, b) => {
//     let result = await a + b
//     // throw new TypeError('Error')
//     return result
// }

// async function run() {
//     let [err, res] = await errorCaptured(test, 2,3)
//     if(err) console.log(err, 'error')
//     console.log(res, 'resss')
// }
// run()

// 测试二

async function run2() {
    let str = '{"a":1}'
    const [err2, res] = await errorCaptured(JSON.parse, str)
    console.log(res, 'res--')
}
run2()
