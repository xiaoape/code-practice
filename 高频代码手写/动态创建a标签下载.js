// 动态创建a标签下载

const downloadFile = (url, fileName = '') => {
    let eleLink = document.createElement('a');
    eleLink.download = fileName;
    eleLink.style.display = 'none';
    eleLink.href = url;
    // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
    document.body.appendChild(eleLink);
    // 触发点击  
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

export default downloadFile;

// 如何下载 html 片段或者文本
// import downloadFile from './downloadFile';

const debug = ['<a id="a"><b id="b">hey!</b></a>'];
const blob = new Blob(debug,{
    type: 'text/html'
})

const url = URL.createObjectURL(blob);

downloadFile(url, 'index.html');

// 图片是base64 如何实现下载
// import downloadFile from './downloadFile';

const debug2 = ['base:...'];
const blob2 = new Blob(debug2,{
    type: 'text/html'
})

const url2 = URL.createObjectURL(blob2);

downloadFile(url2, 'index.html');

// canvas 下载
// import downloadFile from './downloadFile';

const canvas = document.createElement('canvas');
// canvas的绘制

const src = canvas.toDataURL('image/png')

downloadFile(src, 'canavs.png')

// 其他的下载方式
// window.open (浏览器安全策略的限制)
// window.location（浏览器安全策略限制 && 浏览器兼容限制）

