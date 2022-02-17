// cacheRequest
// 一般我们很简单的就可以得出以下思路：

// 利用闭包或者模块化的设计， 引用一个Map， 存储对应的缓存数据。
// 每次请求检查缓存， 有则返回缓存数据， 无则发起请求。
// 请求成功后， 再保存缓存数据并返回， 请求失败则不缓存。

// 然后我们一般会写出下面的代码：

// 构建Map，用作缓存数据
const dict = new Map()
// 这里简单的把url作为cacheKey
const cacheRquest = (url) => {
    if (dict.has(url)) {
        return Promise.resolve(dict.get(url))
    } else {
        // 无缓存，发起真实请求，成功后写入缓存
        return request(url).then(res => {
            dict.set(url, res)
            return res
        }).catch(err => Promise.reject(err))
    }
}

// 完整版本

/**
 * u need axios
 * 请注意此处使用axios作为请求库
 */
 (function (global, request) {

    // 用于存放缓存数据
    const dict = new Map()
  
    const setCache = (cacheKey, info) => {
      dict.set(cacheKey, {
        ...(dict.get(cacheKey) || {}),
        ...info
      })
    }
  
    const notify = (cacheKey, value) => {
      const info = dict.get(cacheKey)
  
      let queue = []
  
      if (info.status === 'SUCCESS') {
        queue = info.resolves
      } else if (info.status === 'FAIL') {
        queue = info.rejects
      }
  
      while(queue.length) {
        const cb = queue.shift()
        cb(value)
      }
  
      setCache(cacheKey, { resolves: [], rejects: [] })
    }
  
    const handleRequest = (url, cacheKey) => {
      setCache(cacheKey, { 
        status: 'PENDING',
        resolves: [],
        rejects: []
      })
  
      const ret = request(url)
  
      return ret.then(res => {
        // 返回成功，刷新缓存，广播并发队列
        setCache(cacheKey, {
          status: 'SUCCESS',
          response: res
        })
        notify(cacheKey, res)
        return Promise.resolve(res)
      }).catch(err => {
        // 返回失败，刷新缓存，广播错误信息
        setCache(cacheKey, { status: 'FAIL' })
        notify(cacheKey, err)
        return Promise.reject(err)
      })
    }
  
    /**
     * 缓存式请求
     * @param {String} target 请求地址
     * @param {Object} option 缓存的配置项
     * @returns {Promise}
     */
    const cacheRequest = function (target, option = {}) {
      const cacheKey = option.cacheKey || target
  
      const cacheInfo = dict.get(cacheKey)
  
      if (!cacheInfo) {
        return handleRequest(target, cacheKey)
      }
  
      const status = cacheInfo.status
      // 已缓存成功数据，则返回
      if (status === 'SUCCESS') {
        return Promise.resolve(cacheInfo.response)
      }
      // 缓存正在PENDING时，封装单独异步操作，加入队列
      if (status === 'PENDING') {
        return new Promise((resolve, reject) => {
          cacheInfo.resolves.push(resolve)
          cacheInfo.rejects.push(reject)
        })
      }
      // 缓存的请求失败时，重新发起真实请求
      return handleRequest(target, cacheKey)
    }
  
    global.cacheRequest = cacheRequest
  })(this, axios)


// 参考链接：https://juejin.cn/post/6844904097976418317