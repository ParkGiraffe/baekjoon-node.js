/*
DFS와 BFS
https://www.acmicpc.net/problem/1260

문제
그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

입력
첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

출력
첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

예제 입력 1 
4 5 1
1 2
1 3
1 4
2 4
3 4
예제 출력 1 
1 2 4 3
1 2 3 4
예제 입력 2 
5 5 3
5 4
5 2
1 2
3 4
3 1
예제 출력 2 
3 1 2 5 4
3 1 4 2 5
예제 입력 3 
1000 1 1000
999 1000
예제 출력 3 
1000 999
1000 999

*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = first.split(" ").map(Number);
let graph = new Map();

for (let i = 0; i < n; i++) {
  graph.set(i + 1, []);
}

second.forEach((e) => {
  const [start, end] = e.split(" ").map(Number);
  graph.get(start).push(end);
  graph.get(end).push(start);
});

graph.forEach((n) => {
  n.sort((a, b) => a - b);
});

const dfsResult = [];
const dfsVisited = new Array(n + 1).fill(0);
let dfsCount = 1;
const dfs = (n) => {
  if (dfsVisited[n] === 0) {
    dfsVisited[n] = dfsCount;
    dfsCount++;
    dfsResult.push(n);
    graph.get(n).forEach((e) => {
      // 오름차순으로 실행됨
      dfs(e);
    });
  }
};

const bfsResult = [];
const bfsVisited = new Array(n + 1).fill(0);
let bfsCount = 2;

const bfs = (n) => {
  const bfsDeq = []; // 덱
  bfsDeq.push(n);
  bfsVisited[n] = 1;
  bfsResult.push(n);

  while (bfsDeq.length !== 0) {
    //   console.log(bfsDeq);
    let u = bfsDeq.shift();

    graph.get(u).forEach((i) => {
      if (!bfsVisited[i]) {
        bfsDeq.push(i);
        bfsVisited[i] = bfsCount;
        bfsCount++;
        bfsResult.push(i);
      }
    });
  }
};

dfs(r);
bfs(r);

// dfsVisited.shift();
// bfsVisited.shift()

console.log(dfsResult.join(" ") + "\n" + bfsResult.join(" "));
