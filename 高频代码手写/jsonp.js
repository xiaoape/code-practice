// jsonp实现
// 调用需要服务端的支持

// 实现方式一
function stringify(data) {
  const pairs = Object.entries(data)
  const qs = pairs.map(([k, v]) => {
    let noValue = false
    if (v === null || v === undefined || typeof v === 'object') {
      noValue = true
    }
    return `${encodeURIComponent(k)}=${noValue ? '' : encodeURIComponent(v)}`
  }).join('&')
  return qs
}

function jsonp({ url, onData, params }) {
  const script = document.createElement('script')

  // 一、为了避免全局污染，使用一个随机函数名
  const cbFnName = `JSONP_PADDING_${Math.random().toString().slice(2)}`
  // 二、默认 callback 函数为 cbFnName
  script.src = `${url}?${stringify({ callback: cbFnName, ...params })}`
  // 三、使用 onData 作为 cbFnName 回调函数，接收数据
  window[cbFnName] = onData;

  document.body.appendChild(script)
}

// 使用promise包裹
const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = ''
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement('script')
    scriptEle.src = generateUrl()
    document.body.appendChild(scriptEle)
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
    scriptEle.onerror = function () { // 异常处理，也是很多人漏掉的部分
      container.removeChild(script);
      delete window[callbackName];
      reject('something error hanppend!');
    }
  })
}


