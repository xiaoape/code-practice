// 目标
// 优化 getUserInfo 请求

// 要求
// getUserInfo 是个通用接口，在各个模块里面都有可能使用 requestUserInfo 模拟的是请求服务端真正获取用户信息的方法

// 业务背景

// 在一个页面有 A, B, C 3个功能模块，A, B, C 模块渲染执行顺序不可控
// 每个模块都会调用 getUserInfo 这个方法， 这个方法是可以直接调用 requestUserInfo 获取用户信息
// 调用三次就会发起三次网络请求
// 现在需要优化 getUserInfo 这个方法， 保证 getUserInfo 方法3次调用后， 最终只会发出一次网络请求。

let userInfoPromise = null; // 用于存储获取用户信息的 Promise
let userInfo = null; // 用于存储用户信息
let requestCount = 0; // 请求计数器
let count = 0
function requestUserInfo() {
    console.log('run');
    // 模拟异步请求用户信息
    return new Promise((resolve) => {
        setTimeout(() => {
            const userData = {
                nick: 'nick',
                age: '18',
            };
      count++;
            resolve(userData);
        }, 1000);
    });
}

function getUserInfo() {
    // 如果已经获取到用户信息，直接返回缓存的结果
    if (userInfo !== null) {
        return Promise.resolve(userInfo);
    }

    // 如果已经有一个正在进行的获取用户信息的 Promise，则直接返回它
    if (userInfoPromise) {
        return userInfoPromise;
    }

    // 如果请求计数器为 0，才触发新的网络请求获取用户信息
    if (requestCount === 0) {
        userInfoPromise = requestUserInfo().then((userData) => {
            userInfo = userData; // 缓存用户信息
            userInfoPromise = null;
            return userData;
        });
        requestCount++; // 增加请求计数器
    }

    return userInfoPromise;
}

const test = async () => {
    try {
        // 模拟请求
        const result = await Promise.all([
            getUserInfo(),
            new Promise((resolve) => setTimeout(async () => { resolve(await getUserInfo()); }, 300)),
            new Promise((resolve) => setTimeout(async () => { resolve(await getUserInfo()); }, 2300)),
        ]);

        console.log(result, 'result');
        if (
            JSON.stringify(result) !== JSON.stringify([
                {
                    nick: 'nick',
                    age: '18',
                },
                {
                    nick: 'nick',
                    age: '18',
                },
                {
                    nick: 'nick',
                    age: '18',
                },
            ])
        ) {
            throw new Error('Wrong answer');
        }
        console.log(count, 'count')
        return count === 1;
        return true;
    } catch (err) {
        console.warn('测试运行失败');
        console.error(err);
        return false;
    }
};

test();
