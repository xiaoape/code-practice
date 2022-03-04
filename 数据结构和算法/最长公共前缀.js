// 最长公共前缀
const strs = ["flower","flow","flight"]
var longestCommonPrefix = function(strs) {
    let ans = ""
    for(const ch of strs[0]){
        if(!strs.every(str => str.startsWith(ans+ch))){
            break
        }
        ans += ch
    }
    return ans
};

console.log(longestCommonPrefix(strs)) // 'fl'

// 参考链接： https://leetcode-cn.com/problems/longest-common-prefix/