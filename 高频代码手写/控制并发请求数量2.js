// 控制并发请求数量
class Schedule {

    constructor(maxNum) {
        this.list = [];
        this.maxNum = maxNum
        this.workingNum = 0
    }

    add(promiseCreator) {
        this.list.push(promiseCreator)
    }

    start() {
        for (let index = 0; index < this.maxNum; index++) {
            this.doNext()
        }
    }

    doNext() {
        if (this.list.length && this.workingNum < this.maxNum) {
            this.workingNum++;
            const promise = this.list.shift();
            promise().then(() => {
                this.workingNum--;
                this.doNext();
            })

        }
    }
}

const timeout = time => new Promise((resolve) => {
    setTimeout(resolve, time)
})

const schedule = new Schedule(2);

const addTask = (time, order) => {
    schedule.add(() => timeout(time).then(() => {
        console.log(order);
    }))
}

addTask(300, 1)
addTask(300, 2)
addTask(300, 3)
addTask(300, 4)

schedule.start()