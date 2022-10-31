// 精度丢失

const numFormate = (num, precision = 4) => {
  return +parseFloat(num.toPrecision(precision))
}

// 测试
console.log(numFormate(0.3 * 3)) // 0.9
console.log(0.3 * 3) // 0.8999999999999999