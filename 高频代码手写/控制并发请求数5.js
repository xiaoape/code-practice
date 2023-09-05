// 实现控制并发数量的库 p-limit

class PLimit {
  constructor(limit) {
    this.limit = limit; // 设置并发请求的数量限制
    this.queue = []; // 存储等待执行的请求
    this.activeCount = 0; // 当前活动请求的数量
  }

  async _next() {
    if (this.queue.length === 0) return; // 没有待处理请求

    if (this.activeCount < this.limit) {
      const task = this.queue.shift(); // 取出下一个任务
      if (task) {
        this.activeCount++;
        try {
          await task.fn();
        } finally {
          this.activeCount--;
          this._next(); // 执行下一个任务
        }
      }
    }
  }

  async add(fn) {
    return new Promise((resolve) => {
      this.queue.push({ fn, resolve });
      this._next();
    });
  }
}

// 示例用法
const limit = new PLimit(3); // 设置并发请求的数量限制为3

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

(async () => {
  const urls = ['/api/data1', '/api/data2', '/api/data3', /* ... */];
  const promises = urls.map((url) =>
    limit.add(async () => {
      const data = await fetchData(url);
      console.log(`Data from ${url}:`, data);
    })
  );

  await Promise.all(promises);
})();

// 在这个示例中，我们创建了一个 PLimit 类，它接受一个并发请求的数量限制作为参数。
// _next 方法用于执行队列中的下一个任务，确保不超过限制的并发请求数量。
// add 方法用于添加一个新的任务到队列中。
// 在示例用法中，我们创建了一个 PLimit 实例，并将多个请求包装在 limit.add 中，以确保同时运行的请求数量不超过限制。
// 你可以根据需要调整 limit 的值和请求的 URLs。
// 这个自制的限制器是一个简化版本，实际中的实现可以更复杂，以满足特定需求。