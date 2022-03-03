// 模板字符串
function render(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key]);
}
const template = "{{name}}很厉name害，才{{age}}岁";
const context = {
    name: "jawil",
    age: "15"
};
console.log(render(template, context));

// 参考链接：https://github.com/jawil/blog/issues/32

// 字符串模板
function render2(template, data) {
    const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}

let template2 = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12
}
render2(template, person); // 我是布兰，年龄12，性别undefined
