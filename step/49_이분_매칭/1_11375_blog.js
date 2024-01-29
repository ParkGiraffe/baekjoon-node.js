/*
열혈강호
https://www.acmicpc.net/problem/11375

참고문헌 :
이분매칭 설명 - https://blog.naver.com/kks227/220807541506
파이썬 문제풀이 - https://kyr-db.tistory.com/360

문제
강호네 회사에는 직원이 N명이 있고, 해야할 일이 M개가 있다. 직원은 1번부터 N번까지 번호가 매겨져 있고, 일은 1번부터 M번까지 번호가 매겨져 있다.

각 직원은 한 개의 일만 할 수 있고, 각각의 일을 담당하는 사람은 1명이어야 한다.

각각의 직원이 할 수 있는 일의 목록이 주어졌을 때, M개의 일 중에서 최대 몇 개를 할 수 있는지 구하는 프로그램을 작성하시오.

입력
첫째 줄에 직원의 수 N과 일의 개수 M이 주어진다. (1 ≤ N, M ≤ 1,000)

둘째 줄부터 N개의 줄의 i번째 줄에는 i번 직원이 할 수 있는 일의 개수와 할 수 있는 일의 번호가 주어진다.

출력
첫째 줄에 강호네 회사에서 할 수 있는 일의 개수를 출력한다.

예제 입력 1 
5 5
2 1 2
1 1
2 2 3
3 3 4 5
1 1
예제 출력 1 
4
*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = first.split(" ").map(Number);

const SIZE = 1001;
const visited = new Array(SIZE); // v1의 탐색 여부 저장
const match = new Array(SIZE).fill(-1); // v2와 연결된 v1의 주소 저장

let count = 0; // 매칭수

const graph = new Map();

for (let i = 0; i < N; i++) {
  const [_, ...works] = second[i].split(" ").map(Number);
  graph.set(i + 1, works);
}

const dfs = (v1) => {
  if (visited[v1]) return false;
  visited[v1] = true;
  for (v2 of graph.get(v1)) {
    if (match[v2] === -1 || dfs(match[v2])) {
      // v2에 연결된 v1이 없는 경우 || 기존에 연결되어 있던 v1이 또 다른 v2와 연결이 가능한 경우 <- 이분탐색
      match[v2] = v1;
      return true;
    }
  }
  return false;
};

for (let i = 1; i <= N; i++) {
  visited.fill(false); // 매번 방문여부를 초기화해야 함.
  if (dfs(i)) count++;
  if (count === N) break; // 이미 n명 모두 일을 할당받으면, 더 이상 탐색할 필요가 없다
}

// console.log(match);
console.log(count);
