// 取消重复请求
// 什么样的请求可以算成是重复请求呢？这里是只要是请求就算作重复请求
// 为什么用防抖和节流无法处理这种问题呢？因为防抖和节流控制的时间和服务器响应的时间的大小是无法预测的
// 取消请求和取消重复请求是有区别的
// 常见的场景是：我们在使用`tab`栏时，我们都会使用一个盒子去存放内容，然后在切换`tab`栏时，会清除掉原来的内容，
// 然后替换上新的内容，这个时候，如果我们的数据是通过服务从后端获取的，就会存在一个问题，由于获取数据是需要一定的时间的，
// 就会存在当我们切换`tab`栏到新的`tab`页时，原来的`tab`页的服务还在响应中，这时新的`tab`页的数据服务已经响应完成了，
// 且页面已经显示了新的`tab`页的内容，但是，这个时候旧的`tab`页的数据也成功了并返回了数据，并将新的`tab`页的内容覆盖了。

// 可以参考https://juejin.cn/post/7128205011019890695#heading-6
class CancelablePromise {
  pendingPromise
  reject

  // 包装一个请求并取消重复请求
  request(requestFn) {
    if (this.pendingPromise) this.cancel('取消重复请求')

    const _promise = new Promise((resolve, reject) => (this.reject = reject))
    this.pendingPromise = Promise.race([requestFn(), _promise])
    return this.pendingPromise
  }

  // 取消当前请求
  cancel(reason) {
    this.reject?.(new Error(reason))
    this.pendingPromise = null
  }
}

// 测试用例

// 模拟一个异步请求函数
const createRequest = (delay) => {
  return () => new Promise(resolve => setTimeout(() => resolve('done'), delay))
}

const cancelPromise = new CancelablePromise()

// 前四个请求将被自动取消
for (let i = 0; i < 5; i++) {
  ;
  (async () => {
    try {
      const res = await cancelPromise.request(createRequest(1000))
      console.log(res) // 最后一个 done
    } catch (error) {
      console.error(error) // 前四个 error: 取消重复请求
    }
  })()
}

// 设置一个定时器等3s，让前面的请求都处理完再继续测试
setTimeout(() => {
  ;
  (async () => {
    try {
      // 手动取消最后一个请求
      const res = await cancelPromise.request(createRequest(1000))
      console.log(res)
    } catch (error) {
      console.error(error) // error:手动取消
    }
  })()

  cancelPromise.cancel('手动取消')
}, 3000)

// // 设置一个定时器等4s，让前面的请求都处理完再继续测试
setTimeout(async () => {
  try {
    const res = await cancelPromise.request(createRequest(1000))
    console.log(res) // done
  } catch (error) {
    console.error(error)
  }
}, 4000)


// 有一个分页列表，快速地切换第二页，第三页；先后请求 data2 与 data3，分页器显示当前在第三页，并且进入 loading；
// 但由于网络的不确定性，先发出的请求不一定先响应，所以有可能 data3 比 data2 先返回；
// 在 data2 最终返回后，分页器指示当前在第三页，但展示的是第二页的数据。

// 解决方法：在每次发送新请求前，cancel 掉上一次的请求，忽略它的回调。
function onlyResolvesLast(fn) {
  // 利用闭包保存最新的请求 id
  let id = 0;
  
  const wrappedFn = (...args) => {
    // 发起请求前，生成新的 id 并保存
    const fetchId = id + 1;
    id = fetchId;
    
    // 执行请求
    const result = fn.apply(this, args);
    
    return new Promise((resolve, reject) => {
      // result 可能不是 promise，需要包装成 promise
      Promise.resolve(result).then((value) => {
        // 只处理最新一次请求
        if (fetchId === id) { 
          resolve(value);
        }
      }, (error) => {
        // 只处理最新一次请求
        if (fetchId === id) {
          reject(error);
        }
      });
    })
  };
  
  return wrappedFn;
}

// 只需要将 onlyResolvesLast 包装一下请求方法，就能实现自动忽略，减少很多模板代码。
const fn = (duration) => 
  new Promise(r => {    
    setTimeout(r, duration);  
  });

const wrappedFn = onlyResolvesLast(fn);

wrappedFn(500).then(() => console.log(1));
wrappedFn(1000).then(() => console.log(2));
wrappedFn(100).then(() => console.log(3));

// 输出 3