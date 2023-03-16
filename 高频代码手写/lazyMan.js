// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(’Hank”)输出:
// Hi! This is Hank!

// LazyMan(’Hank”).sleep(10).eat(’dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(’Hank”).eat(’dinner”).eat(’supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan('Hank').eat('supper').sleepFirst(5)
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper


class _LazyMan {
    constructor(name) {
        this.tasks = [];
        const task = () => {
            console.log(`Hi! This is ${name}`);
            this.next();
        };
        this.tasks.push(task);
        setTimeout(() => {
            // 把 this.next() 放到调用栈清空之后执行
            this.next();
        }, 0);
    }
    next() {
        console.log(this.tasks, 'task')
        const task = this.tasks.shift(); // 取第一个任务执行
        task && task();
    }
    sleep(time) {
        this._sleepWrapper(time, false);
        return this; // 链式调用
    }
    sleepFirst(time) {
        this._sleepWrapper(time, true);
        return this;
    }
    _sleepWrapper(time, first) {
        const task = () => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                this.next();
            }, time * 1000);
        };
        if (first) {
            this.tasks.unshift(task); // 放到任务队列顶部
        } else {
            this.tasks.push(task); // 放到任务队列尾部
        }
    }
    eat(name) {
        const task = () => {
            console.log(`Eat ${name}`);
            this.next();
        };
        this.tasks.push(task);
        return this;
    }
}

function LazyMan(name) {
    return new _LazyMan(name);
}
LazyMan('Hank').sleep(1).eat('dinner')
// (3) [ƒ, ƒ, ƒ] task
// Hi! This is Hank
// (2) [ƒ, ƒ] task
// Wake up after 1
// (1) [ƒ] task
// Eat dinner
// (0) [] task