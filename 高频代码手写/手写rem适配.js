// 手写rem适配
const rem = () => {
  if (typeof window !== 'undefined') {
    const doc = window.document
    const docEl = doc.documentElement
    const width = docEl.getBoundingClientRect().width
    if (width < 750) {
      const rem = width / 375
      docEl.style.fontSize = `${rem}px`
    }
  }
}


// 封装一个根据屏幕尺寸自动改变html的font-size大小的函数
function rem() {
  //  获取html的宽度
  let htmlW = document.documentElement.clientWidth;
  // 获取body的宽度
  let bodyW = document.body.clientWidth;
  // 兼容处理
  let W = htmlW || bodyW;
  // 设置html的font-size大小
  // 因为设计图尺寸是750，所以平分，这样*100之后，1rem就等于100px;
  document.documentElement.style.fontSize = (W / 750 * 100) + 'px';
}
// 定义屏幕宽度改变时触发
window.onresize = function () {
  rem()
}
// 设置初始触发一次
rem()
