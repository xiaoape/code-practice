// 阿拉伯数字转汉字数字
function num2cn(number) {
  // 定义中文数字字符
  const cn_nums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  // 定义中文数字单位
  const cn_units = ['', '十', '百', '千', '万', '亿'];
  // 将数字转换为字符串并逆序
  const str_num = number.toString().split('').reverse().join('');
  // 初始化中文数字字符串
  let cn_str = '';
  // 记录当前数字是否为零
  let is_zero = true;
  // 记录是否需要添加万或亿
  let need_add_unit = false;
  // 遍历数字字符串
  for (let i = 0; i < str_num.length; i++) {
    // 将字符转换为数字
    const num = parseInt(str_num.charAt(i));
    // 如果当前数字是零
    if (num === 0) {
      // 如果是万位或亿位
      if (i % 4 === 0 && i !== 0) {
        need_add_unit = true;
      }
      // 如果不是万位或亿位，且前一个数字不是零
      else if (!is_zero) {
        cn_str = cn_nums[0] + cn_str;
        is_zero = true;
      }
    }
    // 如果当前数字不是零
    else {
      // 添加中文数字字符和中文数字单位
      cn_str = cn_nums[num] + cn_units[i % 4] + cn_str;
      is_zero = false;
      // 如果是万位或亿位，需要添加中文数字单位
      if (i % 4 === 0 && i !== 0) {
        cn_str = cn_units[4 + Math.floor(i / 4)] + cn_str;
        need_add_unit = false;
      }
    }
  }
  // 如果中文数字字符串以零结尾，则去掉零
  if (cn_str.charAt(cn_str.length - 1) === cn_nums[0]) {
    cn_str = cn_str.slice(0, -1);
  }
  // 如果需要添加万或亿，则在最前面添加中文数字单位
  if (need_add_unit) {
    cn_str = cn_units[4 + Math.floor((str_num.length - 1) / 4)] + cn_str;
  }
  // 如果数字为100000000，则特殊处理
  if (number === 100000000) {
    cn_str = '一亿';
  }
  return cn_str;
}
// console.log(num2cn(1002)) // 一千零二
// console.log(num2cn(10002300))
// console.log(num2cn(10000023000)) // 超过十位数字会出错

// 修复版本
function num2cn2(num) {
    if (typeof num !== 'number') {
      throw new Error('Input must be a number');
    }
    if (num < 0 || num >= 1e12) {
      throw new Error('Input must be a non-negative integer less than 1e12');
    }
    if (num === 0) {
      return '零';
    }
    const units = ['', '十', '百', '千'];
    const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const bigUnits = ['', '万', '亿'];
    let result = '';
    let index = 0;
    while (num > 0) {
      let currentNum = num % 10000;
      let currentStr = '';
      if (currentNum === 0) {
        currentStr = '零';
      } else {
        let count = 0;
        while (currentNum > 0) {
          let digit = currentNum % 10;
          if (digit > 0) {
            currentStr = digits[digit] + units[count] + currentStr;
          } else {
            // 当前位是 0 时需要特判，避免多个零连续出现
            if (currentStr.charAt(0) !== '零') {
              currentStr = digits[digit] + currentStr;
            }
          }
          count++;
          currentNum = Math.floor(currentNum / 10);
        }
      }
      result = currentStr + bigUnits[index] + result;
      index++;
      num = Math.floor(num / 10000);
    }
    // 最后的 '一十' 转为 '十'
    result = result.replace(/^一十/, '十');
    return result;
  }
  
console.log(num2cn2(10000023000)) // 一百亿二万三千零 还是错的， chatGpt不行了
