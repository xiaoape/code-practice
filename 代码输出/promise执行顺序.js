// promise的执行顺序 输出

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

