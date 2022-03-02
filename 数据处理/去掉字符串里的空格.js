// 去掉字符串里的空格
// 去除字符串内所有的空格：
let str1 = str.replace(/\s*/g,"");

// 去除字符串内两头的空格：
let str2 = str2.replace(/^\s* |\s *$/g,"");

// 去除字符串内左侧的空格：
let str3 = str3.replace(/^\s*/,"");

// 去除字符串内右侧的空格：
let str4 = str4.replace(/(\s*$)/g,"");


// var str = " 6 6 ";
// var str_1 = str.replace(/\s*/g,"");
// console.log(str_1); //66
// var str = " 6 6 ";
// var str_1 = str.replace(/^\s*|\s*$/g,"");
// console.log(str_1); //6 6//输出左右侧均无空格
// var str = " 6 6 ";
// var str_1 = str.replace(/^\s*/,"");
// console.log(str_1); //6 6 //输出右侧有空格左侧无空格
// var str = " 6 6 ";
// var str_1 = str.replace(/(\s*$)/g,"");
// console.log(str_1); // 6 6//输出左侧有空格右侧无空格