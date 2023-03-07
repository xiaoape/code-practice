const urls = [
  'https://example.com/api/data/1',
  'https://example.com/api/data/2',
  'https://example.com/api/data/3',
  'https://example.com/api/data/4',
  'https://example.com/api/data/5',
];

const maxConcurrentRequests = 2; // 设置最大并发请求数量

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchData() {
  const results = [];

  const fetchPromises = urls.map(async (url) => {
    const result = await getData(url);
    results.push(result);
  });

  // 将promise数组分割成多个小数组，每个小数组包含最多maxConcurrentRequests个promise
  const chunks = [];

  for (let i = 0; i < fetchPromises.length; i += maxConcurrentRequests) {
    chunks.push(fetchPromises.slice(i, i + maxConcurrentRequests));
  }

  // 逐个执行每个小数组中的promise
  for (let i = 0; i < chunks.length; i++) {
    await Promise.all(chunks[i]);
  }

  return results;
}

fetchData().then((results) => {
  console.log(results);
});
