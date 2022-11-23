// 精度丢失

const numFormate = (num, precision = 4) => {
  return +parseFloat(num.toPrecision(precision))
}

// 测试
console.log(numFormate(0.3 * 3)) // 0.9
console.log(0.3 * 3) // 0.8999999999999999

/**
 * 精确加法
 */
 function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}