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

// 顺时针打印矩阵

var spiralOrder = function(matrix) {
  if (!matrix.length || !matrix[0].length) {
      return [];
  }
  const rows = matrix.length, columns = matrix[0].length;
  const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
  const total = rows * columns;
  const order = new Array(total).fill(0);

  let directionIndex = 0, row = 0, column = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (let i = 0; i < total; i++) { 
      order[i] = matrix[row][column];
      visited[row][column] = true;
      const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
      if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
          directionIndex = (directionIndex + 1) % 4;
      }
      row += directions[directionIndex][0];
      column += directions[directionIndex][1];
  }
  return order;
};
