
// leetcode原题：https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
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