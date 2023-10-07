// import 函数

// ES6 中的 import() 函数实现了动态模块加载，它允许你在需要的时候异步地加载模块。

// 原理：使用 import() 加载模块时，它返回一个 Promise 对象，该 Promise 在模块加载完成后被解析。

// 通过jsonp的方式，动态请求脚本，然后在回调中得到组件

// 代码解析如下：

function customImport(modulePath) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = modulePath;
      script.type = 'module';
      script.async = true;
  
      script.onload = () => {
        resolve();
      };
  
      script.onerror = () => {
        reject(new Error(`Failed to load module: ${modulePath}`));
      };
  
      document.head.appendChild(script);
    });
  }
  
  // 使用 customImport 加载模块
  customImport('./module.js')
    .then(() => {
      // 在模块加载完成后执行的代码
      const moduleExports = window.moduleExports; // 假设模块定义了一个全局变量 moduleExports
      console.log(moduleExports);
    })
    .catch(error => {
      console.error(error);
    });
  