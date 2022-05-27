// 二维数组

// 一维数组转化成二维数组
function arrTrans(num, arr) { // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
}
console.log(arrTrans(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// 二维数组转化为一维数组
const arr=[[1,2,3],[3,4],[5]];
console.log([].concat.apply([],arr)); // [1,2,3,3,4,5,]

console.log(arr.flat(Infinity)) // [1,2,3,3,4,5,]


// 3. 判断当前数组时一维数组还是多维数组
let arr2 = [[0, 1], [2, 3], [4, 5]];
function isDeep(arr){
  return arr.some(item=> item instanceof Array);
}
console.log(isDeep(arr2))
// 多维返回true，一维返回false