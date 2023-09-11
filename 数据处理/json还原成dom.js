// json还原成dom
// 也是低代码的实现原理

const jsonData = {
    "tag": "div",
    "attributes": { "class": "container" },
    "children": [
        {
            "tag": "h1",
            "textContent": "Hello, World!"
        },
        {
            "tag": "p",
            "textContent": "This is a paragraph."
        }
    ]
};

// 创建一个函数，将 JSON 数据转换为 DOM 节点
function jsonToDOM(json) {
    const element = document.createElement(json.tag); // 创建元素

    // 设置元素属性
    for (const key in json.attributes) {
        if (json.attributes.hasOwnProperty(key)) {
            element.setAttribute(key, json.attributes[key]);
        }
    }

    // 设置元素文本内容
    if (json.textContent) {
        element.textContent = json.textContent;
    }

    // 递归处理子元素
    if (json.children && json.children.length > 0) {
        json.children.forEach(childJson => {
            const childElement = jsonToDOM(childJson); // 递归处理子元素
            element.appendChild(childElement); // 添加子元素到父元素
        });
    }

    return element;
}

// 将 JSON 数据还原成 DOM 节点
const domElement = jsonToDOM(jsonData);

// 将 DOM 节点添加到文档中
document.body.appendChild(domElement);
