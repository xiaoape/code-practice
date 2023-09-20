// 职责链模式 
// 连接成一条链，沿着链路走，谁能解决我的问题就停下来找谁解决，解决不了就交与下一个人。
const judgeQt = starNum => {
    if (starNum === 10) {
        console.log('青铜');
    } else {
        return 'nextSuccess'
    }
}
const judgeBy = starNum => {
    if (starNum === 20) {
        console.log('白银');
    } else {
        return 'nextSuccess'
    }
}
const judgeOtherLevel = starNum => {
    if (starNum >= 30) {
        console.log('黄金以上');
    } else {
        return 'nextSuccess'
    }
}
// 链路代码
Function.prototype.after = function (fn) {
    const self = this
    return function () {
        const result = self.apply(self, arguments)
        if (result === 'nextSuccess') {
            return fn.apply(self, arguments)
        }
    }
}
//用法
const getLevel = judgeQt.after(judgeBy).after(judgeOtherLevel);
getLevel(20);// '白银'

// ps： 感觉是在试错一样，问题解决不了换下一个人？这样的模式应用场景有哪些呢？
