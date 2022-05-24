// 找出一个元素所有的Input子元素

// 一行代码版本
console.log(div1.getElementsByTagName("INPUT"))

// 递归遍历子节点版，假设如下：

{/* <body>
    <div id="div1">
        <ul>
            <input type="text">
            <li></li>
            <li> <input type="text"></li>
            <li></li>
        </ul>
    </div>
<body> */}


function findAllInputElement(element) {
    const rec = function (element, arr) {
        if (element.nodeName.toUpperCase() === "INPUT") {
            arr.push(element)
        }
        let children = element.childNodes
        children.forEach(element => {
            rec(element, arr)
        });
        return arr
    }
    return rec(element, [])
}
console.log(findAllInputElement(div1))
