import axios from 'axios';

class RequestManager {
  constructor() {
    this.pendingRequests = new Map();
  }

  addRequest(config) {
    const { url, method, params, data } = config;

    // 生成请求的唯一ID
    const requestId = JSON.stringify({ url, method, params, data });

    // 如果当前请求已经在请求队列中，直接返回一个已经存在的Promise对象
    if (this.pendingRequests.has(requestId)) {
      const pendingRequest = this.pendingRequests.get(requestId);
      return pendingRequest.promise;
    }

    // 将当前请求添加到请求队列中
    const source = axios.CancelToken.source();
    const request = axios({ ...config, cancelToken: source.token });
    const promise = request.then(response => {
      this.pendingRequests.delete(requestId);
      return response;
    }).catch(error => {
      this.pendingRequests.delete(requestId);
      throw error;
    });

    this.pendingRequests.set(requestId, { promise, cancel: source.cancel });
    return promise;
  }

  clearRequests() {
    this.pendingRequests.forEach(request => request.cancel());
    this.pendingRequests.clear();
  }
}

// 创建一个请求管理器实例
const requestManager = new RequestManager();

// 发起一个带有参数的请求
requestManager.addRequest({ url: '/api/users', method: 'get', params: { page: 1 } }).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});

// 发起一个相同的请求
requestManager.addRequest({ url: '/api/users', method: 'get', params: { page: 1 } }).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});

// 取消所有请求
requestManager.clearRequests();


// 在这个示例中，我们首先创建了一个RequestManager类，它包含一个pendingRequests对象来存储当前的请求队列。
// 每当我们需要发起一个请求时，我们首先检查pendingRequests对象中是否已经存在相同的请求，
// 如果是，则直接返回一个已经存在的Promise对象。如果不是，则将当前请求添加到pendingRequests对象中，并使用axios库发起请求。

// 我们还添加了一个clearRequests方法，用于取消所有当前的请求。这个方法可以在需要在组件卸载时调用，以确保所有未完成的请求都被取消。

// 总的来说，请求管理器是一种有效的方式来取消重复请求。
// 通过检查请求队列中是否已经存在相同的请求，我们可以有效地减少不必要的网络流量，并提高应用程序的响应速度。