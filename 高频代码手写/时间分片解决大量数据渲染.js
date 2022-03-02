// 时间分片解决大量数据渲染
let ul = document.getElementById("container");
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal, curIndex) {
    if (curTotal <= 0) {
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal, once);
    window.requestAnimationFrame(function () {
        for (let i = 0; i < pageCount; i++) {
            let li = document.createElement("li");
            li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
            ul.appendChild(li);
        }
        loop(curTotal - pageCount, curIndex + pageCount);
    });
}
loop(total, index);


// 对于大数据量的简单 dom 结构渲染可以用分片思想解决 如果是复杂的 dom 结构需要使用虚拟列表