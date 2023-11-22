// 第一题
// main.js（主线程）
const myWorker = new Worker('/worker.js'); // 创建 worker

myWorker.addEventListener('message', e => {
    console.log(e.data);
    myWorker.terminate(); // 关闭 worker
});

myWorker.postMessage('Greeting from Main.js');


// worker.js（worker线程）

self.addEventListener('message', e => {

    postMessage('Greeting from Worker');
    
    setTimeout(() => {
        console.log('setTimeout run');
        postMessage('Greeting from SetTimeout');
    });
    
    Promise.resolve().then(() => {
        console.log('Promise run');
        postMessage('Greeting from Promise');
    })
    
    for (let i = 0; i < 1001; i++) {
        if (i === 1000) {
            console.log('Loop run');
            postMessage('Greeting from Loop');
        }
    }
    
});

// 结果
// Loop run
// Promise run 
// Greeting from Worker

// 第二题

// main.js（主线程）
const myWorker1 = new Worker('/worker.js'); // 创建 worker

myWorker1.addEventListener('message', e => {
    console.log(e.data);
});

myWorker1.postMessage('Greeting from Main.js');


// worker.js（worker线程）

self.addEventListener('message', e => {

    postMessage('Greeting from Worker');
    
    self.close(); // 关闭 worker
    
    setTimeout(() => {
        console.log('setTimeout run');
        postMessage('Greeting from SetTimeout');
    });
    
    Promise.resolve().then(() => {
        console.log('Promise run');
        postMessage('Greeting from Promise');
    })
    
    for (let i = 0; i < 1001; i++) {
        if (i === 1000) {
            console.log('Loop run');
            postMessage('Greeting from Loop');
        }
    }
    
});

// 结果
// Loop run
// Promise run 
// Greeting from Worker
// Greeting from Loop
// Greeting from Promise


// 参考链接： https://juejin.cn/post/7139718200177983524?searchId=2023112220401887A3F08F8B3FD258A4F9