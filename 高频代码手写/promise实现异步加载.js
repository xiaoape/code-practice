// promise实现异步加载
let imageAsync = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            console.log(`图片请求成功，此处进行通用操作`);
            resolve(image);
        }
        img.onerror = (err) => {
            console.log(`失败，此处进行失败的通用操作`);
            reject(err);
        }
    })
}

imageAsync("url").then(() => {
    console.log("加载成功");
}).catch((error) => {
    console.log("加载失败");
})

// 封装一个异步加载图片的方法
function onloadImg(url) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        let img = new Image();
        img.src = url;
        img.onload = function () {
          reslove('加载完成');
        };
        img.onerror = function () {
          reject('加载失败');
        };
      }, 3000);
    });
  }
  
  function limit(list, num) {
    return new Promise((reslove, reject) => {
      let length = list.length;
      let total = 0;
      function fn() {
        let number = Math.min(list.length, num);
        for (let i = 0; i < number; i++) {
          let url = list.shift();
          let f = onloadImg(url);
          num--;
          f.then(() => {
            console.log('success');
            num++;
            total++;
            if (total == length) {
              reslove('图片全部加载完毕');
            }
            fn();
          }).catch((err) => {
            reject(err);
          });
        }
      }
      fn();
    });
  }
  
  limit(
    [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
    ],
    3
  ).then((res) => {
    console.log('res', res);
  });