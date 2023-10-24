/*
(만약, node 1 -> 찾은 지점이 가장 먼 거리라면, 찾은 지점 -> node 1을 탐색할 때 같은 최댓값을 가짐)
자세한 설명 : https://blog.myungwoo.kr/112


트리의 지름
https://www.acmicpc.net/problem/1167


문제
트리의 지름이란, 트리에서 임의의 두 점 사이의 거리 중 가장 긴 것을 말한다. 트리의 지름을 구하는 프로그램을 작성하시오.

입력
트리가 입력으로 주어진다. 먼저 첫 번째 줄에서는 트리의 정점의 개수 V가 주어지고 (2 ≤ V ≤ 100,000)둘째 줄부터 V개의 줄에 걸쳐 간선의 정보가 다음과 같이 주어진다. 정점 번호는 1부터 V까지 매겨져 있다.

먼저 정점 번호가 주어지고, 이어서 연결된 간선의 정보를 의미하는 정수가 두 개씩 주어지는데, 하나는 정점번호, 다른 하나는 그 정점까지의 거리이다. 예를 들어 네 번째 줄의 경우 정점 3은 정점 1과 거리가 2인 간선으로 연결되어 있고, 정점 4와는 거리가 3인 간선으로 연결되어 있는 것을 보여준다. 각 줄의 마지막에는 -1이 입력으로 주어진다. 주어지는 거리는 모두 10,000 이하의 자연수이다.

출력
첫째 줄에 트리의 지름을 출력한다.

예제 입력 1 
5
1 3 2 -1
2 4 4 -1
3 1 2 4 3 -1
4 2 4 3 3 5 6 -1
5 4 6 -1
예제 출력 1 
11

*/
const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const v = +first;
// const radiuses = [];
let maxIdx = -1;
let answer = 0;

const graph = new Map();
for (let i = 0; i < v; i++) {
  graph.set(i + 1, []);
}

second.forEach((e) => {
  const inform = e.split(" ").map(Number);
  const curNode = inform[0];
  for (let i = 1; i < inform.length - 1; i = i + 2) {
    graph.get(curNode).push([inform[i], inform[i + 1]]); // 현재 정점 - [연결된 정점, 거리]
  }
});

// console.log(graph);

// let visited = [];

const sol = (v) => {
  const visited = new Array(v + 1).fill(false);
  visited[1] = true;
  dfs(1, 0, visited);
  visited[1] = false;
  // console.log(maxIdx);
  visited[maxIdx] = true;
  dfs(maxIdx, 0, visited);

  console.log(answer);
};

const dfs = (n, length, visited) => {
  // let isFinish = true;
  // console.log(n, graph.get(n))
  for (let [nextNode, weight] of graph.get(n)) {
    if (!visited[nextNode]) {
      // isFinish = false;
      visited[nextNode] = true;
      // const copiedVisited = [...visited]
      // copiedVisited[nextNode] = true;
      dfs(nextNode, length + weight, visited);
      visited[nextNode] = false;
    }
  }

  if (answer < length) {
    answer = length;
    maxIdx = n;
  }
};

sol(v);
