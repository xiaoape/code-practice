// 图片并发请求限制

const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
    })
}

const loadByLimit = (urls, loadImage, limit) => {
    const urlsCopy = [...urls];
    // 小于范围 直接发全部请求
    if (urlsCopy.length < limit) {
        const promiseArr = urls.map(url => loadImage(url))
        return Promise.all(promiseArr)
    }
    const promiseArr = urlsCopy.splice(0, limit).map(url => loadImage(url))
    urlsCopy.reduce((prevPromise, url) => {
        prevPromise
            .then(() => Promise.rece(promiseArr))
            .catch(err => console.log(err))
            .then(resolveUrls => {
                // 删除请求成功的url

                // 继续添加一个新的url继续请求
                promiseArr.push(loadImage(urls))
            })
    })
    Promise.resolve()
}