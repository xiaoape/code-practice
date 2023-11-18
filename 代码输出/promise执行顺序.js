// promise的执行顺序 输出
// 记住一条：await同一行的代码是同步执行的，await下一行是相当于一个微任务被抱进.then函数里的。执行的顺序是按照event loop进行的

// 第一题
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log("start");
// 结果：
// 'async1 start'
// 'async2'
// 'start'
// 'async1 end'

// 第二题
setTimeout(() => {
  // Promise.resolve是微任务，但是不会立即执行
  Promise.resolve(2).then(console.log);
  console.log(4);
}, 0);

setTimeout(() => {
  console.log(3);
}, 0);

// 4 2 3

