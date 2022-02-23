// 图片预加载
var promiseAll = imgData.map(function (item, index) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            resolve(img);
        };
        img.error = function () {
            reject('图片加载失败');
        };
        img.src = item;
    });
});
Promise.all(promiseAll).then(
    function () {
        // 图片全部加载完成，进行下一步
        // todo
    },
    function (err) {
        console.log(err);
    }
);