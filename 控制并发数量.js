// 控制并发数量
// 原理：使用一个队列维护所有的请求，然后使用async/await或者promise对请求进行控制
// 当前面的请求完成就从队列中出队下一个请求
class LimitResquest {
    constructor(limit) {
        this.limit = limit
        this.currentSum = 0
        this.requests = []
    }

    request(reqFn) {
        if (!reqFn || !(reqFn instanceof Function)) {
            console.error('当前请求不是一个Function', reqFn)
            return
        }
        this.requests.push(reqFn)
        if (this.currentSum < this.limit) {
            this.run()
        }
    }

    async run() {
        try {
            ++this.currentSum
            const fn = this.requests.shift()
            await fn()
        } catch (err) {
            console.log('Error', err)
        } finally {
            --this.currentSum
            if (this.requests.length > 0) {
                this.run()
            }
        }
    }
}

let a = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
}).then((data) => console.log(data))


let b = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(2)
    }, 1000)
}).then((data) => console.log(data))


let c = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(3)
    }, 1000)
}).then((data) => console.log(data))


let d = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(4)
    }, 1000)
}).then((data) => console.log(data))
// 可以调整限制数查看控制效果
let limitResquest = new LimitResquest(2)
limitResquest.request(a)
limitResquest.request(b)
limitResquest.request(c)
limitResquest.request(d)
limitResquest.request(a)
limitResquest.request(b)
limitResquest.request(c)
limitResquest.request(d)