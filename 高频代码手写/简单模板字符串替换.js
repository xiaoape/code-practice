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