// 字符串最长的不重复子串
const lengthOfLongestSubstring = function (s) {
    if (s.length === 0) {
        return 0;
    }

    let left = 0;
    let right = 1;
    let max = 0;
    while (right <= s.length) {
        let lr = s.slice(left, right);
        const index = lr.indexOf(s[right]);

        if (index > -1) {
            left = index + left + 1;
        } else {
            lr = s.slice(left, right + 1);
            max = Math.max(max, lr.length);
        }
        right++;
    }
    return max;
};

// leetcode中ac的
// 滑动窗口思路，维护两个指针，这里left是左指针，i是右指针
// 如果没有遇到重复的字符就移动右指针，
// 如果遇到了重复的字符就将左指针移动到滑动窗口中重复字符的右边（相当于是删掉了前面没用的字符）
// 知道右指针遍历完，此时记录的max就是最长不重复子串
var lengthOfLongestSubstring2 = function(s) {
    // 滑动窗口
    let left = 0;
    let max = 0;
    let res = ''
    for(let i = 0;i<s.length;i++) {
        let index = res.indexOf(s[i])
        if(index === -1) {
            res = res + s[i]
        } else {
            res = res + s[i]
            left = index + 1
            res = res.slice(left, i+ 1)
        }
        max = Math.max(res.length, max)
    }
    return max
};