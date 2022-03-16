// 优雅的处理try catch
async function errorCaptured(asyncFunc) {
    try {
        let res = await asyncFunc();
        return [null, res]
    } catch (e) {
        return [e, null]
    }
}

let [err, res] = await errorCaptured(asyncFunc)