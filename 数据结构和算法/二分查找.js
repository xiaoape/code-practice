// 二分查找算法是一种在有序数组中查找某一特定元素的搜索算法。
// 搜素过程从数组的中间元素开始，如果中间元素正好是要查找的元素，
// 则搜素过程结束；如果某一特定元素大于或者小于中间元素，则在数组
// 大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。
// 如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。
// 折半搜索每次把搜索区域减少一半，时间复杂度为Ο(logn)
function helfSearch(ary, num) {
    var len = ary.length,
        middle = Math.floor(len / 2),
        mNum = ary[middle];
    if (len === 0) {
        return null
    } else if (mNum === num) {
        return middle;
    } else if (mNum > num) {
        return helfSearch(ary.slice(0, middle), num);
    } else {
        return helfSearch(ary.slice(middle + 1), num);
    }
}
console.log(helfSearch([1, 2, 3, 4, 5, 6, 7, 8], 3));