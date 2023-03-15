// 解析URL Params 为对象
// 使用正则解决
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseParam(url))
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

// 使用URLSearchParams，这个需要在浏览器环境中运行
function parse() {
  let serach = window.location.search;
  let params = new URLSearchParams(serach),
    queryObj = {};
  for (let [k, v] of params.entries()) {
    if (queryObj[k] !== undefined) {
      queryObj[k] = [].concat(queryObj[k], v);
    } else {
      queryObj[k] = v;
    }
  }
  return queryObj;
}

console.log(parse())

// 不需要在浏览器中执行
function getParamsFromUrl(url) {
  const searchParams = new URLSearchParams(new URL(url).search);
  const params = {};
  for (const key of searchParams.keys()) {
    params[key] = searchParams.getAll(key);
  }
  return params;
}

// 示例用法
const params = getParamsFromUrl('https://www.example.com/?name=john&age=30&hobby=soccer&hobby=basketball');
console.log(params); // 输出 { name: ['john'], age: ['30'], hobby: ['soccer', 'basketball'] }

// 使用第三方库 query-string

const queryString = require('query-string');

function getParamsFromUrl(url) {
  const params = queryString.parseUrl(url).query;
  return params;
}

// 示例用法
const params2 = getParamsFromUrl('https://www.example.com/?name=john&age=30');
console.log(params2); // 输出 { name: 'john', age: '30' }
