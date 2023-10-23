/*
트리의 부모 찾기
https://www.acmicpc.net/problem/11725

문제
루트 없는 트리가 주어진다. 이때, 트리의 루트를 1이라고 정했을 때, 각 노드의 부모를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 노드의 개수 N (2 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N-1개의 줄에 트리 상에서 연결된 두 정점이 주어진다.

출력
첫째 줄부터 N-1개의 줄에 각 노드의 부모 노드 번호를 2번 노드부터 순서대로 출력한다.

예제 입력 1 
7
1 6
6 3
3 5
4 1
2 4
4 7
예제 출력 1 
4
6
1
3
1
4
예제 입력 2 
12
1 2
1 3
2 4
3 5
3 6
4 7
4 8
5 9
5 10
6 11
6 12
예제 출력 2 
1
1
2
3
3
4
4
5
5
6
6
*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const parents = new Array(n + 1).fill(0);

const graph = new Map();
for (let i = 0; i < n; i++) {
  graph.set(i + 1, []);
}

second.forEach((e) => {
  const [a, b] = e.split(" ").map(Number);
  graph.get(a).push(b);
  graph.get(b).push(a);
});

const bfs = () => {
  const queue = [];
  parents[1] = 1;

  for (let child of graph.get(1)) {
    parents[child] = 1;
    queue.push(child);
  }

  while (queue.length) {
    const node = queue.shift();
    for (let child of graph.get(node)) {
      if (parents[child]) continue;
      parents[child] = node;
      queue.push(child);
    }
  }
};
bfs();

console.log(parents.slice(2).join("\n"));
