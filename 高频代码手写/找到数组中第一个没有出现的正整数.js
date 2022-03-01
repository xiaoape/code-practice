// 找到数组中第一个没出现的最小正整数

// 第一版 O(n ^ 2) 的方法
let arr = [5,6,1,7,8,9]
const firstMissingPositive = (nums) => {
    let i = 0;
    let res = 1;
    while (i < nums.length) {
        if (nums[i] == res) {
            res++;
            i = 0;
        } else {
            i++;
        }
    }
    return res;
};

// 第二版 时间空间均为 O(n)

const firstMissingPositiveTwo = (nums) => {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        set.add(nums[i]);
    }
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!set.has(i)) {
            return i;
        }
    }
};

// 最终版 时间复杂度为 O(n) 并且只使用常数级别空间
// 这里换位置的方法有点没有弄懂？？？为啥要这样换位置呢？
const firstMissingPositiveThree = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        while (
            nums[i] >= 1 &&
            nums[i] <= nums.length && // 对1~nums.length范围内的元素进行安排
            nums[nums[i] - 1] !== nums[i] // 已经出现在理想位置的，就不用交换
        ) {
            const temp = nums[nums[i] - 1]; // 交换
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    console.log(nums, 'nums--')
    // 现在期待的是 [1,2,3,...]，如果遍历到不是放着该放的元素
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != i + 1) {
            return i + 1;
        }
    }
    return nums.length + 1; // 发现元素 1~nums.length 占满了数组，一个没缺
};
firstMissingPositiveThree(arr)

// 参考链接：https://juejin.cn/post/7004638318843412493#heading-32