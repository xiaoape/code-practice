class EventEmitter {
	constructor() {
		this.queue = {} //可触发多次的事件
		this.onceQueue = {} //只能触发一次的事件
	}
	on(event, fn) {  //监听事件，可以触发多次
		if (!this.queue[event]) this.queue[event] = []
		this.queue[event].push(fn)
	}
	once(event, fn) {   //监听事件，只能触发一次
		if (!this.onceQueue[event]) {
			this.onceQueue[event] = {
				fns: [],
				hasFired: false
			}
		}
		this.onceQueue[event].fns.push(fn)
	}
	fire() {  // 触发指定的事件
        // 取得事件名称
		const event = [].shift.call(arguments), 
                // 取得该事件里所有的回调函数（可以触发多次的事件）
                // 取得该事件里所有的回调函数（只能触发一次的事件）
			fns = this.queue[event],  
			onceFns = this.onceQueue[event]  

		if (fns && fns.length != 0) {
			let i = 0,fn
			while (fn = fns[i++]) {
				fn.apply(this, arguments)
			}
		}
		if (onceFns && !onceFns.hasFired) {
			let i = 0,fn
			while (fn = onceFns.fns[i++]) {
				fn.apply(this, arguments)
			}
			this.onceQueue[event].hasFired = true
		}
	}
	off(event, fn = null) { //可移除特定事件里的某个回调函数或者所有回调函数
		const fns = this.queue[event]
		if (!fns || fns.length == 0) return

		if (fn) { //移除该事件特定的回调
			this.queue[event] = fns.filter(item => {
				return item !== fn
			})
		} else { //移除该事件所有的回调
			this.queue[event] = []
		}
	}
}