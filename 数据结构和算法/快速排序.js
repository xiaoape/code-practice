// 快速排序
/* 快速排序是对冒泡排序的一种改进。它的基本思想是：
通过一趟排序将要排序的数据分割成独立的两部分，
其中一部分的所有数据都比另外一不部分的所有数据都要小，
然后再按此方法对这两部分数据分别进行快速排序，
整个排序过程可以递归进行，
以此达到整个数据变成有序序列。 
整个排序过程只需要三步：

- 在数据集之中，选择一个元素作为"基准"（pivot）。
- 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
- 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。 */

// 方法一
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var left = [],
        right = [],
        baseDot = Math.round(arr.length / 2),
        base = arr.splice(baseDot, 1)[0];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < base) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([base], quickSort(right));
}
console.log(quickSort([543,234,12,757,85,32,76,443]))

// 方法二
function quickSortTwo(array, left, right) {
    var length = array.length;
    left = typeof left === 'number' ? left : 0,
        right = typeof right === 'number' ? right : length - 1;

    if (left < right) {
        var index = left - 1;
        for (var i = left; i <= right; i++) {
            if (array[i] <= array[right]) {
                index++;
                var temp = array[index];
                array[index] = array[i];
                array[i] = temp;
            }
        }
        quickSortTwo(array, left, index - 1);
        quickSortTwo(array, index + 1, right);
    }
    return array;
}
console.log(quickSortTwo([543,234,12,757,85,32,76,443]))

// 方法三
function checkArray(array) {
    if (!array) return
}

function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}

function sort(array) {
    checkArray(array);
    quickSortThree(array, 0, array.length - 1);
    return array;
}

function quickSortThree(array, left, right) {
    if (left < right) {
        swap(array, left, right)
        // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
        let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
        quickSortThree(array, left, indexs[0]);
        quickSortThree(array, indexs[1] + 1, right);
    }
}

function part(array, left, right) {
    let less = left - 1;
    let more = right;
    while (left < more) {
        if (array[left] < array[right]) {
            // 当前值比基准值小，`less` 和 `left` 都加一
            ++less;
            ++left;
        } else if (array[left] > array[right]) {
            // 当前值比基准值大，将当前值和右边的值交换
            // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
            swap(array, --more, left);
        } else {
            // 和基准值相同，只移动下标
            left++;
        }
    }
    // 将基准值和比基准值大的第一个值交换位置
    // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
    swap(array, right, more);
    return [less, more];
}
console.log(sort([543,234,12,757,85,32,76,443]))