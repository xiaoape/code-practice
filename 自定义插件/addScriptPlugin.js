// 实现在构建完成后往模板文件中添加一个脚本文件

const fs = require('fs');

class AddScriptPlugin {
  constructor(options) {
    // 传入插件的选项
    this.options = options || {};
  }

  apply(compiler) {
    // 注册 webpack 插件的钩子
    compiler.hooks.afterEmit.tap('AddScriptPlugin', (compilation) => {
      // 构建完成后的操作
      const templateFilePath = this.options.templateFilePath || 'index.html';
      const scriptToAdd = this.options.scriptToAdd || 'script.js';

      // 读取模板文件内容
      const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

      // 在模板文件中添加脚本
      const modifiedContent = templateContent + `\n<script src="${scriptToAdd}"></script>\n`;

      // 将修改后的内容写回模板文件
      fs.writeFileSync(templateFilePath, modifiedContent, 'utf-8');

      console.log(`"${scriptToAdd}" added to "${templateFilePath}"`);
    });
  }
}

module.exports = AddScriptPlugin;

// 使用示例

const AddScriptPlugin = require('add-script-plugin');

module.exports = {
  // ...其他配置

  plugins: [
    new AddScriptPlugin({
      templateFilePath: 'index.html', // 模板文件路径
      scriptToAdd: 'script.js',       // 要添加的脚本文件路径
    }),
  ],
};

