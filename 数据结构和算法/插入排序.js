// 一般实现

// > 已排序元素将放在数组前部

// 大致流程：

// 1. 取未排序部分的第一个元素。第一次遍历时，将第一个元素作为已排序元素，从第二个元素开始取
// 2. 遍历前面的已排序元素，并与这个未排序元素比较大小，找到合适的位置插入
// 3. 继续执行1

// 第二种理解方式：

// 在前面的第2步中，相当于把已排序部分末尾添加一个元素，并且**执行一次冒泡排序**。 因为前面的数组是已排序的，所以冒泡只需要遍历一次就可以给新的元素找到正确的位置。

// 但是以这种方式实现的代码无法使用二分法进行优化。
// 按照第一种理解方式的实现，即一般的实现
function insertionSort(arr) {
  for (let index = 1; index < arr.length; index++) {
    // 取出一个未排序元素
    let current_ele = arr[index]
    // 已排序元素的最后一个的位置
    let ordered_index = index - 1
    // 前面的元素更大，并且还没遍历完
    while (arr[ordered_index] >= current_ele && ordered_index >= 0) {
      // 使用前面的值覆盖当前的值
      arr[ordered_index + 1] = arr[ordered_index]
      // 向前移动一个位置
      ordered_index--
    }
    // 遍历完成，前面的元素都比当前元素小，把未排序元素赋值进去
    arr[ordered_index + 1] = current_ele
  }
  return arr
}
// 按照第二种理解方式的实现
function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 对前面的已排序数组和新选出来的元素执行一趟冒泡排序
    for (let j = i + 1; j >= 0; j--)
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
  }
  return arr
}