// 选择排序
// 每次遍历选择最小。

// > 排序后的元素将放在数组前部

// 大致流程：

// 1. 取出未排序部分的第一个元素，遍历该元素之后的部分并比较大小。对于第一次遍历，就是取出第一个元素
// 2. 如果有更小的，与该元素交换位置
// 3. 每次遍历都能找出剩余元素中的最小值并放在已排序部分的最后

// > 并不是倒着的冒泡排序。冒泡排序是比较**相邻的两个元素**


function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

function selection(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    swap(array, i, minIndex);
  }
  return array;
}

// 上面是通过记录坐标实现的，下面的做法是什么不妥呢？这不就是冒泡排序么？
function choise(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let cur = arr[i]
        arr[i] = arr[j]
        arr[j] = cur
      }
    }
  }
  return arr
}
// 选择排序是每次遍历都找到当前位置最值的下标，通过下标进行交换

let arr = [2645, 32, 23, 5, 6, 4, 6344342, 2323]
console.log(selection(arr))

 //  https://juejin.im/post/5c9cf808f265da611846c015#heading-3
