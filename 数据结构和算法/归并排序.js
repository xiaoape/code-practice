// 归并排序
function sort(array) {
    checkArray(array);
    mergeSort(array, 0, array.length - 1);
    return array;
}

function mergeSort(array, left, right) {
    // 左右索引相同说明已经只有一个数
    if (left === right) return;
    // 等同于 `left + (right - left) / 2`
    // 相比 `(left + right) / 2` 来说更加安全，不会溢出
    // 使用位运算是因为位运算比四则运算快
    let mid = parseInt(left + ((right - left) >> 1));
    mergeSort(array, left, mid);
    mergeSort(array, mid + 1, right);

    let help = [];
    let i = 0;
    let p1 = left;
    let p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
        help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
    }
    while (p1 <= mid) {
        help[i++] = array[p1++];
    }
    while (p2 <= right) {
        help[i++] = array[p2++];
    }
    for (let i = 0; i < help.length; i++) {
        array[left + i] = help[i];
    }
    return array;
}