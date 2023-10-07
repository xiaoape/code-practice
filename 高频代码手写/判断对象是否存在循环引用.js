// 判断对象是否存在循环引用
// 方式一：
// 使用 JSON.stringify 方法将对象转换为 JSON 字符串，然后尝试解析该字符串。如果解析成功且没有抛出异常，则对象不存在循环引用。
// 方式二：
// 使用第三方库，如 circular-json 或 flatted，它们专门用于处理包含循环引用的对象，并提供了更复杂的检测和解决方法。
// 方式三： 
// 可以在对象上手动添加标记，以指示对象是否已经被访问过。这需要额外的代码来处理标记和检测。（或者使用set或者map结构进行标记）
const isCycleObject = (obj, parent) => {
    const parentArr = parent || [obj];
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            let flag = false;
            parentArr.forEach((pObj) => {
                if (pObj === obj[i]) {
                    flag = true;
                }
            })
            if (flag) return true;
            flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
            if (flag) return true;
        }
    }
    return false;
}


const a = 1;
const b = {
    a
};
const c = {
    b
};
const o = {
    d: {
        a: 3
    },
    c
}
o.c.b.aa = a;

console.log(isCycleObject(o));