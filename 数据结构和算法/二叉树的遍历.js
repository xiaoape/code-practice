// 二叉树的遍历
// 先序遍历
var preListRec = []; //定义保存先序遍历结果的数组
var preOrderRec = function (node) {
    if (node) { //判断二叉树是否为空
        preListRec.push(node.value); //将结点的值存入数组中
        preOrderRec(node.left); //递归遍历左子树
        preOrderRec(node.right); //递归遍历右子树
    }
}
preOrderRec(tree);
console.log(preListRec);

// 将遍历结果当作数组作为参数版本
function preDfs(root, result = []) {
    if (root) {
        result.push(root.val);
        dfs(root.left, result);
        dfs(root.right, result);
        return result
    }
}
console.log(preDfs(tree, []))

// 中序遍历
var inListRec = []; //定义保存中序遍历结果的数组
var inOrderRec = function (node) {
    if (node) { //判断二叉树是否为空
        inOrderRec(node.left); //递归遍历左子树
        inListRec.push(node.value); //将结点的值存入数组中
        inOrderRec(node.right); //递归遍历右子树
    }
}
inOrderRec(tree);
console.log(inListRec);

// 后序遍历
var postListRec = []; //定义保存后序遍历结果的数组
var postOrderRec = function (node) {
    if (node) { //判断二叉树是否为空
        postOrderRec(node.left); //递归遍历左子树
        postOrderRec(node.right); //递归遍历右子树
        postListRec.push(node.value); //将结点的值存入数组中
    }
}
postOrderRec(tree);
console.log(postListRec);

// 非递归实现
// 前序遍历
// 利用栈实现前序遍历。将根结点放入栈中，然后再取出来，将值放入结果数组，然后如果存在右子树，将右子树压入栈，如果存在左子树，将左子树压入栈，然后循环判断栈是否为空，重复上述步骤。
var preListUnRec = []; //定义保存先序遍历结果的数组
var preOrderUnRecursion = function (node) {
    if (node) { //判断二叉树是否为空
        var stack = [node]; //将二叉树压入栈
        while (stack.length !== 0) { //如果栈为空，则循环遍历
            node = stack.pop(); //从栈中取出一个结点
            preListUnRec.push(node.value); //将取出结点的值存入数组中
            if (node.right) stack.push(node.right); //如果存在右子树，将右子树压入栈
            if (node.left) stack.push(node.left); //如果存在左子树，将左子树压入栈
        }
    }
}
preOrderUnRecursion(tree);
console.log(preListUnRec);

// 中序遍历
// 非递归遍历的思路是将当前结点压入栈，然后将左子树当做当前结点，如果当前结点为空，将双亲结点取出来，将值保存进数组，然后将右子树当做当前结点，进行循环。
var inListUnRec = []; //定义保存中序遍历结果的数组
var inOrderUnRec = function (node) {
    if (node) { //判断二叉树是否为空
        var stack = []; //建立一个栈
        while (stack.length !== 0 || node) { //如果栈不为空或结点不为空，则循环遍历
            if (node) { //如果结点不为空
                stack.push(node); //将结点压入栈
                node = node.left; //将左子树作为当前结点
            } else { //左子树为空，即没有左子树的情况
                node = stack.pop(); //将结点取出来
                inListUnRec.push(node.value); //将取出结点的值存入数组中
                node = node.right; //将右结点作为当前结点
            }
        }
    }
}
inOrderUnRec(tree);
console.log(inListUnRec);

// 后序遍历
// 这里使用了一个tmp变量来记录上一次出栈、入栈的结点。思路是先把根结点和左树推入栈，然后取出左树，再推入右树，取出，最后取根结点。
var postListUnRec = []; //定义保存后序遍历结果的数组
var postOrderUnRec = function (node) {
    if (node) { //判断二叉树是否为空
        var stack = [node]; //将二叉树压入栈
        var tmp = null; //定义缓存变量
        while (stack.length !== 0) { //如果栈不为空，则循环遍历
            tmp = stack[stack.length - 1]; //将栈顶的值保存在tmp中
            if (tmp.left && node !== tmp.left && node !== tmp.right) { //如果存在左子树
                stack.push(tmp.left); //将左子树结点压入栈
            } else if (tmp.right && node !== tmp.right) { //如果结点存在右子树
                stack.push(tmp.right); //将右子树压入栈中
            } else {
                postListUnRec.push(stack.pop().value);
                node = tmp;
            }
        }
    }
}
postOrderUnRec(tree);

// 这里使用了一个tmp变量来记录上一次出栈、入栈的结点。思路是先把根结点和左树推入栈，然后取出左树，再推入右树，取出，最后取根结点。
// 二叉树的广度遍历（层序遍历）
// 广度遍历是从二叉树的根结点开始，自上而下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问。 实现原理：使用数组模拟队列，首先将根结点归入队列。当队列不为空时，执行循环：取出队列的一个结点，如果该节点有左子树，则将该节点的左子树存入队列；如果该节点有右子树，则将该节点的右子树存入队列。
var breadthList = []; //定义保存广度遍历结果的数组
var breadthTraversal = function (node) {
    if (node) { //判断二叉树是否为空
        var que = [node]; //将二叉树放入队列
        while (que.length !== 0) { //判断队列是否为空
            node = que.shift(); //从队列中取出一个结点
            breadthList.push(node.value); //将取出结点的值保存到数组
            if (node.left) que.push(node.left); //如果存在左子树，将左子树放入队列
            if (node.right) que.push(node.right); //如果存在右子树，将右子树放入队列
        }
    }
}
breadthTraversal(tree);
console.log(breadthList);