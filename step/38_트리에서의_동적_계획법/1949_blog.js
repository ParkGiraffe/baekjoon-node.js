/*
우수 마을
https://www.acmicpc.net/problem/1949

문제
N개의 마을로 이루어진 나라가 있다. 편의상 마을에는 1부터 N까지 번호가 붙어 있다고 하자. 이 나라는 트리(Tree) 구조로 이루어져 있다. 즉 마을과 마을 사이를 직접 잇는 N-1개의 길이 있으며, 각 길은 방향성이 없어서 A번 마을에서 B번 마을로 갈 수 있다면 B번 마을에서 A번 마을로 갈 수 있다. 또, 모든 마을은 연결되어 있다. 두 마을 사이에 직접 잇는 길이 있을 때, 두 마을이 인접해 있다고 한다.

이 나라의 주민들에게 성취감을 높여 주기 위해, 다음 세 가지 조건을 만족하면서 N개의 마을 중 몇 개의 마을을 '우수 마을'로 선정하려고 한다.

'우수 마을'로 선정된 마을 주민 수의 총 합을 최대로 해야 한다.
마을 사이의 충돌을 방지하기 위해서, 만일 두 마을이 인접해 있으면 두 마을을 모두 '우수 마을'로 선정할 수는 없다. 즉 '우수 마을'끼리는 서로 인접해 있을 수 없다.
선정되지 못한 마을에 경각심을 불러일으키기 위해서, '우수 마을'로 선정되지 못한 마을은 적어도 하나의 '우수 마을'과는 인접해 있어야 한다.
각 마을 주민 수와 마을 사이의 길에 대한 정보가 주어졌을 때, 주어진 조건을 만족하도록 '우수 마을'을 선정하는 프로그램을 작성하시오.

입력
첫째 줄에 정수 N이 주어진다. (1 ≤ N ≤ 10,000) 둘째 줄에는 마을 주민 수를 나타내는 N개의 자연수가 빈칸을 사이에 두고 주어진다. 1번 마을부터 N번 마을까지 순서대로 주어지며, 주민 수는 10,000 이하이다. 셋째 줄부터 N-1개 줄에 걸쳐서 인접한 두 마을의 번호가 빈칸을 사이에 두고 주어진다.

출력
첫째 줄에 '우수 마을'의 주민 수의 총 합을 출력한다.

예제 입력 1 
7
1000 3000 4000 1000 2000 2000 7000
1 2
2 3
4 3
4 5
6 2
6 7
예제 출력 1 
14000
*/
const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const populations = second.split(" ").map(Number);

const edges = new Map();

for (let i = 0; i < n; i++) {
  edges.set(i + 1, []);
}

for (let i = 0; i < n - 1; i++) {
  const [start, end] = third[i].split(" ").map(Number);
  edges.get(start).push(end);
  edges.get(end).push(start);
}

/*
dp[a][0] = c : a 노드를 정점으로 하면서 a가 우수 마을이 아닐 때, 우수 마을의 주민수의 최댓값.
dp[a][1] = c : a 노드를 정점으로 하면서 a가 우수 마을일 때, 우수 마을의 주민수의 최댓값.
*/
const dp = Array.from(Array(n + 1), () => Array(2).fill(0));
const visited = new Array(n + 1).fill(false);

const dfs = (cur) => {
  visited[cur] = true;
  dp[cur][0] = 0; // 우수 마을이 아닐 경우
  dp[cur][1] = populations[cur - 1]; // 우수 마을인 경우

  edges.get(cur).forEach((next) => {
    if (visited[next] === false) {
      dfs(next);
      /*
      해당 마을이 우수 마을일 경우, 다음 마을은 반드시 우수 마을이면 안된다.
      해당 마을이 우수 마을이 아닐 경우, 다음 마을은 우수 마을이어도 되고 아니어도 된다.
      (이 경우엔 다음 마을이 우수 마을인 경우와 아닌 경우 둘 중에 최댓값을 업데이트해준다.)
       */
      dp[cur][1] += dp[next][0];
      dp[cur][0] += Math.max(dp[next][0], dp[next][1]);
    }
  });

  return visited[cur];
};

dfs(1);
console.log(Math.max(dp[1][0], dp[1][1]));
