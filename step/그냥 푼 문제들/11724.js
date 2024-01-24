/*
연결 요소의 개수
https://www.acmicpc.net/problem/11724


문제
방향 없는 그래프가 주어졌을 때, 연결 요소 (Connected Component)의 개수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 정점의 개수 N과 간선의 개수 M이 주어진다. (1 ≤ N ≤ 1,000, 0 ≤ M ≤ N×(N-1)/2) 둘째 줄부터 M개의 줄에 간선의 양 끝점 u와 v가 주어진다. (1 ≤ u, v ≤ N, u ≠ v) 같은 간선은 한 번만 주어진다.

출력
첫째 줄에 연결 요소의 개수를 출력한다.

예제 입력 1 
6 5
1 2
2 5
5 1
3 4
4 6
예제 출력 1 
2
예제 입력 2 
6 8
1 2
2 5
5 1
3 4
4 6
5 4
2 4
2 3
예제 출력 2 
1

*/
const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = first.split(" ").map(Number);
const visited = new Array(n + 1).fill(false);
let count = 0;

const edges = new Map();

for (let i = 0; i < n; i++) {
  edges.set(i + 1, []);
}

for (let i = 0; i < m; i++) {
  const [start, end] = second[i].split(" ").map(Number);
  edges.get(start).push(end);
  edges.get(end).push(start);
}

const dfs = (num) => {
  if (!visited[num]) {
    visited[num] = true;
    edges.get(num).forEach((e) => dfs(e));
  }
};

for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    dfs(i);
    count++;
  }
}

console.log(count);
