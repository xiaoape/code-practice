// 最长公共前缀（注意是前缀，不是任意位置）
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

// 逐位比较（横向扫描），比较全部通过时re增加当前字符，不通过时直接返回re。
var longestCommonPrefix = function(strs) {
    var re = '';
    if (!strs.length) return re;
    for (var j=0;j<strs[0].length;j++){//第j位
        for (var i=1;i<strs.length;i++){//第i个
            if (strs[i][j]!=strs[0][j]) return re
        }
        re += strs[0][j];
    }
    return re;
};


// 参考链接： https://leetcode-cn.com/problems/longest-common-prefix/