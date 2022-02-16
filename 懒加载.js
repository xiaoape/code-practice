// 当前可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight
// 获取所有图片标签
const imgs = document.getElementsByTagName('img')
const viewHeight = window.innerHeight || document.documentElement.clientHeight; // 获取可视区域高度

let num = 0 // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出

function lazyLoad() {
    for (let i = num; i < imgs.length; i++) {
        // 用可视区域高度减去元素顶部距离可视区域顶部高度
        let distance = viewHeight - imgs[i].getBoundingRect().top
        // 如果可视区域高度大于等于元素顶部可视区域顶部的搞不，说明元素露出
        if (distance >= 0) {
            // 给元素写入真实的src, 展示图片
            imgs[i].src = imgs[i].getAttribute('data-src')
            // 前i张图片 已经加装完毕， 下次从第 i+1 开始检查是否露出
            num = i + 1
        }
    }
}
// 监听Scroll 事件
window.addEventListener('scroll', lazyload, false)