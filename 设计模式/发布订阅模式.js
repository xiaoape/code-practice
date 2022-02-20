// 发布订阅(自定义事件)
// 通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，
// 并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件
class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        (this.subs[event] || (this.subs[event] = [])).push(cb)
    }

    // 也可以使用 call 指定 context
    trigger(event, ...args) {
        this.subs[event] && this.subs[event].forEach(cb => {
            cb(...args)
        })
    }

    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event, cb)
    }

    off(event, offCb) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex(cb => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }
}

let dep = new EventEmitter()

let cb = function () {
    console.log('handleClick')
}

let cb2 = function () {
    console.log('handleMouseover')
}

// console.group()在 Web控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进,表示该内容属于当前分组,直到调用console.groupEnd()之后,当前分组结束.
console.group()
dep.on('click', cb)
dep.on('click', cb2)
dep.trigger('click')
console.groupEnd()

console.group()
dep.off('click', cb)
dep.trigger('click')
console.groupEnd()

console.group()
dep.once('mouseover', cb2)
dep.trigger('mouseover')
dep.trigger('mouseover')
console.groupEnd()

// 类似的是
let event = {
    list: {},
    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
    },
    emit(...arg) {
        let index = [].shift.call([...arg])
        fns = this.list[index];
        if (!fns || fns.length === 0) {
            return false
        }
        fns.forEach(fn => {
            fn.apply(this, [...arg])
        })
    },
    remove(key, fn) {
        let fns = this.list[key]
        if (!fns) {
            return false
        }
        if (!fn) {
            fn && (fns.length = 0)
        } else {
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1)
                }
            })
        }
    }
}

function cat() {
    console.log('一起喵喵喵');
}

function dog() {
    console.log('一起旺旺旺');
}

event.on('pet', data => {
    console.log('接收数据');
    console.log(data);
});
event.on('pet', cat);
event.on('pet', dog);
// 取消dog方法的订阅
event.remove('pet', dog);
// 发布
event.emit('pet', ['二哈', '波斯猫']);