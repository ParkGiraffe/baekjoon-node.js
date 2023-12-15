/*
트리
https://www.acmicpc.net/problem/4803


문제
그래프는 정점과 간선으로 이루어져 있다. 두 정점 사이에 경로가 있다면, 두 정점은 연결되어 있다고 한다. 연결 요소는 모든 정점이 서로 연결되어 있는 정점의 부분집합이다. 그래프는 하나 또는 그 이상의 연결 요소로 이루어져 있다.

트리는 사이클이 없는 연결 요소이다. 트리에는 여러 성질이 있다. 예를 들어, 트리는 정점이 n개, 간선이 n-1개 있다. 또, 임의의 두 정점에 대해서 경로가 유일하다.

그래프가 주어졌을 때, 트리의 개수를 세는 프로그램을 작성하시오.

입력
입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 n ≤ 500과 m ≤ n(n-1)/2을 만족하는 정점의 개수 n과 간선의 개수 m이 주어진다. 다음 m개의 줄에는 간선을 나타내는 두 개의 정수가 주어진다. 같은 간선은 여러 번 주어지지 않는다. 정점은 1번부터 n번까지 번호가 매겨져 있다. 입력의 마지막 줄에는 0이 두 개 주어진다.

출력
입력으로 주어진 그래프에 트리가 없다면 "No trees."를, 한 개라면 "There is one tree."를, T개(T > 1)라면 "A forest of T trees."를 테스트 케이스 번호와 함께 출력한다.

예제 입력 1 
6 3
1 2
2 3
3 4
6 5
1 2
2 3
3 4
4 5
5 6
6 6
1 2
2 3
1 3
4 5
5 6
6 4
0 0
예제 출력 1 
Case 1: A forest of 3 trees.
Case 2: There is one tree.
Case 3: No trees.


*/
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let cursor = 0;
let curCase = 0;
const output = [];

while (cursor === input.length - 1) {
  // shift()로 하면 시간초과
  const [n, m] = input[cursor++].split(" ").map(Number);

  const edges = new Map();
  for (let i = 0; i < n; i++) {
    edges.set(i + 1, []);
  }

  for (let i = 0; i < m; i++) {
    const [start, end] = input[cursor++].split(" ").map(Number);
    edges.get(start).push(end);
    edges.get(end).push(start);
  }

  const visited = [];
  let edgeCnt = 0;

  const dfs = (node) => {
    // 노드 갯수
    let sum = 1;

    // 이미 방문한 노드라면 0 return
    if (visited[node]) return 0;

    // 방문 안 했다면 방문 처리
    visited[node] = true;
    edges.get(node).forEach((e) => {
      // 각 연결된 점마다 간선 카운트 수(edgeCnt) ++ 해줌
      // 양방향 그래프로 설정해놔서 간선개수가 2배이기 때문에 마지막에 /2 해줘야 함
      edgeCnt++;
      sum += dfs(e);
    });

    return sum;
  };

  const solution = (q) => {
    let trees = 0;

    // 노드 갯수만큼 dfs로 체크
    for (let i = 1; i <= n; i++) {
      // i 노드를 방문했다면 pass
      if (visited[i]) continue;

      // 노드 갯수, 간선 갯수를 0으로 설정
      let nodes = 0;
      edgeCnt = 0;

      nodes += dfs(i);

      // 그래프를 양방향으로 선언해서 간선이 두 개씩 체크됨 -> 나누기 2
      // 노드갯수-간선갯수 = 1 이어야 트리의 조건 성립
      if (nodes - edgeCnt / 2 === 1) trees++;
    }

    // console.log(trees);

    let caseTxt = `Case ${q}: `;

    let desc;
    if (trees === 0) desc = "No trees.";
    if (trees === 1) desc = "There is one tree.";
    if (trees > 1) desc = `A forest of ${trees} trees.`;

    output.push(caseTxt + desc);
  };

  solution(++curCase);
}

console.log(output.join("\n"));
