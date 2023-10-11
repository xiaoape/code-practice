// 设计并实现一个前端网络请求方法，可以对相同请求api和请求params获取到的接口数据做内存缓存。
// 要求：如果有相同的请求同时并行发起，要求其中一个能挂起并且等待另外一个请求返回并读取该缓存；

// 用于存储请求的缓存数据
const cache = {};

function fetchWithCache(api, params) {
  const cacheKey = JSON.stringify({ api, params });

  if (cache[cacheKey]) {
    // 如果已经有缓存数据，直接返回缓存数据的Promise
    return cache[cacheKey];
  }

  // 否则，发起新的网络请求
  const requestPromise = fetch(api, params)
    .then((response) => response.json())
    .then((data) => {
      // 将请求结果缓存起来
      cache[cacheKey] = Promise.resolve(data);
      return data;
    })
    .finally(() => {
      // 清除缓存，以便下次可以再次发起相同请求
      delete cache[cacheKey];
    });

  // 将请求Promise存入缓存
  cache[cacheKey] = requestPromise;

  return requestPromise;
}

// 示例用法
fetchWithCache('https://example.com/api', { param1: 'value1' })
  .then((data) => {
    console.log('Data:', data);
  });

// 同时发起相同请求，其中一个请求会等待另一个请求返回并读取缓存
fetchWithCache('https://example.com/api', { param1: 'value1' })
  .then((data) => {
    console.log('Data (Cached):', data);
  });

// 注意：以上示例中的 `fetch` 函数需要根据你的实际情况替换为具体的网络请求方法。
