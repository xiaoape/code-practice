// retry.js  接口失败重试
// retry的作用，当接口请求失败后，每间隔几秒，再重发几次

/*
 * @param {function} fn - 方法名
 * @param {number} delay - 延迟的时间
 * @param {number} times - 重发的次数
 */
function retry(fn, delay, times) {
    return new Promise((resolve, reject) => {
        function func() {
            Promise.resolve(fn())
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    // 接口失败后，判断剩余次数不为0时，继续重发
                    if (times !== 0) {
                        setTimeout(func, delay);
                        times--;
                    } else {
                        reject(err);
                    }
                });
        }
        func();
    });
}


function retryRequest(url, maxRetries, delay, callback) {
    let retries = 0;

    function makeRequest() {
        // 发送接口请求
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            })
            .then((data) => {
                // 请求成功
                callback(data);
            })
            .catch((error) => {
                // 请求失败
                if (retries < maxRetries) {
                    retries++;
                    setTimeout(makeRequest, delay);
                } else {
                    // 达到最大重试次数，处理失败情况
                    console.error('Max retries reached. Request failed.');
                    // 可以执行其他操作，如提示用户或记录日志
                }
            });
    }

    makeRequest();
}

// 使用示例
const apiUrl = 'https://example.com/api/data';
const maxRetries = 3; // 最大重试次数
const retryDelay = 2000; // 重试间隔时间（毫秒）

retryRequest(apiUrl, maxRetries, retryDelay, (data) => {
    // 处理请求成功后的数据
    console.log('Request succeeded:', data);
});
