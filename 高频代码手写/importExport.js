// 实现一个动态导入

const importModule = url => {
    // 返回一个新的 Promise 实例
    return new Promise((resolve, reject) => {
        // 创建 script 标签
        const script = document.createElement("script");

        const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);

        script.type = "module";
        script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;
        // load 回调
        script.onload = () => {
            resolve(window[tempGlobal]);
            delete window[tempGlobal];
            script.remove();
        };
        // error 回调
        script.onerror = () => {
            reject(new Error("Failed to load module script with URL " + url));
            delete window[tempGlobal];
            script.remove();
        };
        document.documentElement.appendChild(script);
    });
}