// promise的执行顺序 输出
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
