var maxDepth = function (root) {
  // 递归终止条件
  if (root == null) return 0;
  return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1);
};

// 同上的写法
var maxDepth = function (root) {
  if (!root) return 0;
  let left = maxDepth(root.left) + 1;
  let right = maxDepth(root.right) + 1;
  return Math.max(left, right);
};
