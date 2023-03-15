// 判断一个字符串中出现次数最多的字符，返回这个字符和次数
// 方法一
function findMostFrequentChar(s) {
  // 使用一个对象记录每个字符出现的次数
  const freq = {};
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (freq[c]) {
      freq[c] += 1;
    } else {
      freq[c] = 1;
    }
  }

  // 找到出现次数最多的字
  let maxChar = null;
  let maxCount = 0;
  for (const c in freq) {
    if (freq[c] > maxCount) {
      maxChar = c;
      maxCount = freq[c];
    }
  }

  return {
    char: maxChar,
    count: maxCount
  };
}

// 示例用法
const result = findMostFrequentChar('hello world');
console.log(result); // 输出 { char: 'l', count: 3 }
// 方法二

function findMostFrequentChar2(s) {
  // 使用一个数组记录每个字符出现的次数
  const freq = Array(256).fill(0);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    freq[c] += 1;
  }

  // 找到出现次数最多的字
  let maxChar = null;
  let maxCount = 0;
  for (let i = 0; i < freq.length; i++) {
    if (freq[i] > maxCount) {
      maxChar = String.fromCharCode(i);
      maxCount = freq[i];
    }
  }

  return {
    char: maxChar,
    count: maxCount
  };
}

// 示例用法
const result2 = findMostFrequentChar2('hello world');
console.log(result2); // 输出 { char: 'l', count: 3 }
