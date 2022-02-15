//希尔排序
function shellSort(arr) {
    var N = arr.length;
    //进行分组，最开始时的增量gap为数组长度的一半
    for (var gap = Math.floor(N / 2); gap >=1; Math.floor(gap /= 2)) {
        //对各个分组进行插入排序并不是先对一个组进行排序完再对另一个组进行排序，而是轮流对每一个组进行插入排序。
        for (var i = gap; i < N; i++) {
            //将arr[i] 插入到所在分组的正确位置上
            insertI(arr, gap, i);
        }
    }
    console.log(arr)
}

function insertI(arr, gap, i) {
    var inserted = arr[i];
    var j;
    // 插入的时候按组进行插入（组内元素两两相隔gap)
    for (j = i - gap; j >= 0 && inserted < arr[j]; j -= gap) {
        arr[j + gap] = arr[j];
    }
    arr[j + gap] = inserted;
}
var arr = [54,3,42,66,2,33,62,23]
shellSort(arr);  //[ 2, 3, 23, 33, 42, 54, 62, 66 ]