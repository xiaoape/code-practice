// 事件委托
// 看错误版
ul.addEventListener('click', function (e) {
            console.log(e,e.target)
            if (e.target.tagName.toLowerCase() === 'li') {
                console.log('打印')  // 模拟fn
            }
})

// 「有个小bug，如果用户点击的是 li 里面的 span，就没法触发 fn，这显然不对」👇
{/* <ul id="xxx">下面的内容是子元素1
        <li>li内容>>> <span> 这是span内容123</span></li>
        下面的内容是子元素2
        <li>li内容>>> <span> 这是span内容123</span></li>
        下面的内容是子元素3
        <li>li内容>>> <span> 这是span内容123</span></li>
</ul> */}

// 正确解法
function delegate(element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
        let el = e.target
        while (!el.matches(selector)) {
            if (element === el) {
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el)
    }, true)
    return element
}