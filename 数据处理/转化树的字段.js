// 转化树的字段,把name替换成value，保留值
const obj = {
  level: 0,
  name: "hello",
  type: "C0",
  children: [
    {
      level: 1,
      name: "hello",
      type: "A",
    },
    {
      level: 1,
      name: "world",
      type: "B",
    },
  ],
};

function gainCleanTree(node = {}) {
  let newNode = {
    level: node.level,
    value: node.name,
    type: node.type,
  };
  if (node.children) {
    newNode.children = node.children.map((item) => {
      return gainCleanTree(item);
    });
  }
  return newNode;
}

console.log(gainCleanTree(obj));
