// custom-uppercase-loader.js

// 一个简单的 loader，将输入的字符串转为大写
module.exports = function (source) {
  // 使用 source 参数获取输入的源代码
  // 将源代码中的字符串都转为大写
  const uppercasedSource = source.toUpperCase();

  // 返回转换后的代码
  return uppercasedSource;
};

// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配所有 JavaScript 文件
        use: [
          // 使用自定义的 uppercase-loader
          // 注意：loader 的执行顺序是从后往前，这里先用 uppercase-loader 处理
          // 然后再用 babel-loader 处理
          "custom-uppercase-loader",
          "babel-loader",
        ],
      },
    ],
  },
};
