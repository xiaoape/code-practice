// 首字母大写

// 正则实现
function capitalizeWords(sentence) {
    // 利用正则表达式匹配单词，然后对每个单词进行首字母大写处理
    return sentence.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    });
}

// 示例用法
const inputSentence = "hello world, how are you?";
const capitalizedSentence = capitalizeWords(inputSentence);
console.log(capitalizedSentence);


// 字符串拆分

function capitalizeWordsWithoutRegex(sentence) {
    // 拆分字符串为单词数组
    const words = sentence.split(' ');

    // 处理每个单词的首字母大写
    const capitalizedWords = words.map(word => {
        // 确保单词非空
        if (word.length > 0) {
            return word[0].toUpperCase() + word.slice(1);
        }
        return word;
    });

    // 重新组合单词数组为字符串
    const capitalizedSentence = capitalizedWords.join(' ');

    return capitalizedSentence;
}

// 示例用法
const newWord = capitalizeWordsWithoutRegex(inputSentence);
console.log(newWord);
