 // 冒泡排序

 // 大致流程：

 // 1. 从第一个元素开始，比较每两个相邻元素，如果前者大，就交换位置
 // 2. 每次遍历结束，能够找到该次遍历过的元素中的最大值
 // 3. 如果还有没排序过的元素，继续1


 function bubble(array) {
   for (let i = array.length - 1; i > 0; i--) {
     // 从 0 到 `length - 1` 遍历
     for (let j = 0; j < i; j++) {
       if (array[j] > array[j + 1]) swap(array, j, j + 1)
     }
   }
   return array;
 }