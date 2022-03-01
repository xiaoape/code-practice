// 实现对象的flatten方法
const input = {
    a: 1,
    b: [1, 2, {
            c: true
        },
        [3]
    ],
    d: {
        e: 2,
        f: 3
    },
    g: null,
};

// 返回
/* {
    "a": 1,
    'b[0]': 1,
    'b[1]': 2,
    'b[2].c': true,
    'b[3][0]': 3,
    'd.e': 2,
    'd.f': 3,
}; */

function isObject(val) {
    return typeof val === "object" && val !== null;
}

function flatten(obj) {
    if (!isObject(obj)) {
        return;
    }
    let res = {};
    const dfs = (cur, prefix) => {
        if (isObject(cur)) {
            if (Array.isArray(cur)) {
                cur.forEach((item, index) => {
                    dfs(item, `${prefix}[${index}]`);
                });
            } else {
                for (let k in cur) {
                    dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
                }
            }
        } else {
            res[prefix] = cur;
        }
    };
    dfs(obj, "");

    return res;
}
console.log(flatten(input));