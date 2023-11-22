const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const arr = Array.from(Array(n), () => new Array(n));
const dp = Array.from(Array(n), () => new Array(1 << n).fill(-1));

const dfs = (curNode, visited) => {
  // 순환 완료
  if (visited === (1 << n) - 1) {
    if (arr[curNode][0] === 0) return Infinity;
    return arr[curNode][0];
  }

  // 이미 탐색한 거
  if (dp[curNode][visited] !== -1) return dp[curNode][visited];
  dp[curNode][visited] = Infinity;

  // 다음 노드로 탐색
  for (let i = 0; i < n; i++) {
    if (arr[curNode][i] === 0) continue; // 다음 노드로 연결된 길이 없는 경우
    if ((visited & (1 << i)) !== 0) continue; // 이미 방문

    dp[curNode][visited] = Math.min(
      dp[curNode][visited],
      dfs(i, visited | (1 << i)) + arr[curNode][i]
    );
  }
  return dp[curNode][visited];
};

second.forEach((e1, i) => {
  e1.split(" ").forEach((e2, j) => {
    arr[i][j] = +e2;
  });
});

console.log(dfs(0, 1));
