const fs = require('fs');
const path = require('path');

function generateMarkdown(filesList, depth = 0) {
  let markdown = '';
  const indentation = '  '.repeat(depth);

  filesList.forEach((item, index) => {
    if (typeof item === 'string') {
      // 是文件，直接添加到 Markdown
      markdown += `${indentation}- \`${item}\`\n`;
    } else if (typeof item === 'object') {
      // 是目录，递归生成子目录的 Markdown
      const directoryName = Object.keys(item)[0];
      markdown += `${indentation}- \`${directoryName}\`\n${generateMarkdown(item[directoryName], depth + 1)}`;
    }

    // 在第一项添加标题
    if (index === 0 && depth === 0) {
      markdown = `# 代码目录\n\n${markdown}`;
    }
  });

  return markdown;
}

function readFilesInDirectory(directory, ignoreList = []) {
  const files = fs.readdirSync(directory);

  const result = files.map(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      return file;
    } else if (stats.isDirectory() && !ignoreList.includes(file)) {
      // 递归读取子目录
      const subFiles = readFilesInDirectory(filePath, ignoreList);
      return { [file]: subFiles };
    }
  });

  return result.filter(Boolean); // 过滤掉 undefined
}

// 获取当前目录
const currentDirectory = process.cwd();

// 忽略的文件或目录列表
const ignoreList = ['node_modules', 'build', 'dist', '.git'];

// 调用函数读取文件
const filesList = readFilesInDirectory(currentDirectory, ignoreList);

// 生成 Markdown 目录
const markdownContent = generateMarkdown(filesList);

// 生成目录文件
const outputFilePath = path.join(currentDirectory, 'directory.md');
fs.writeFileSync(outputFilePath, markdownContent);

console.log(`Markdown Directory file generated at: ${outputFilePath}`);
