// 无向图的深度遍历
const adjacencyMatrix = [
  [0, 1, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 1, 0],
];

function depthFirstSearch(graph, start, visited) {
  if (!visited[start]) {
    console.log(`Visiting node ${start}`);
    visited[start] = true;

    for (let i = 0; i < graph[start].length; i++) {
      if (graph[start][i] === 1 && !visited[i]) {
        depthFirstSearch(graph, i, visited);
      }
    }
  }
}

// 初始化所有节点为未访问状态
const numNodes = adjacencyMatrix.length;
const visitedNodes = new Array(numNodes).fill(false);

// 从第一个节点开始深度优先遍历
depthFirstSearch(adjacencyMatrix, 0, visitedNodes);

// Visiting node 0
// Visiting node 1
// Visiting node 3
// Visiting node 2
// Visiting node 4
// Visiting node 5

// 无向图的广度遍历

function breadthFirstSearch(graph, start) {
  const queue = [start];
  const visited = new Array(graph.length).fill(false);
  visited[start] = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    console.log(`Visiting node ${currentNode}`);

    for (let i = 0; i < graph[currentNode].length; i++) {
      if (graph[currentNode][i] === 1 && !visited[i]) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }
}

// 从第一个节点开始广度优先遍历
breadthFirstSearch(adjacencyMatrix, 0);

// Visiting node 0
// Visiting node 1
// Visiting node 2
// Visiting node 3
// Visiting node 4
// Visiting node 5
