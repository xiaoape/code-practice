// 优雅的处理try catch
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

// 测试
const test = async (a, b) => {
    let result = await a + b
    // throw new TypeError('Error')
    return result
}

async function run() {
    let [err, res] = await errorCaptured(test, 2,3)
    if(err) console.log(err, 'error')
    console.log(res, 'resss')
}
run()
