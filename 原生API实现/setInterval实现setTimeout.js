// setInterval 模拟实现 setTimeout

function mySetTimeout(fn, time) {
    let timer = setInterval(() => {
        clearInterval(timer);
        fn();
    }, time);
}

// 使用
mySetTimeout(() => {
    console.log(1);
}, 2000);