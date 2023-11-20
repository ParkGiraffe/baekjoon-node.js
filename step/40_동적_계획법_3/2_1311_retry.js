const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const arr = Array.from(Array(n), () => new Array(n));
const dp = Array.from(Array(n), () => new Array(1 << n).fill(Infinity));

const dfs = (x, visited) => {
  // 이미 탐색한 거
  if (dp[x][visited] < Infinity) return dp[x][visited];

  for (let i = 0; i < n; i++) {
    // 이미 선택된 비트는 넘어감
    // console.log('a', visited, 1 << i)
    // console.log('b', (visited & (1 << i)) === 0)
    if ((visited & (1 << i)) == 0) {
      // console.log('c')
      if (x + 1 === n) dp[x][visited] = arr[x][i];
      else {
        dp[x][visited] = Math.min(
          dp[x][visited],
          dfs(x + 1, visited | (1 << i)) + arr[x][i]
        );
      }
    }

    // console.log(x, visited, dp[x][visited])
  }
  return dp[x][visited];
};

second.forEach((e1, i) => {
  e1.split(" ").forEach((e2, j) => {
    arr[i][j] = +e2;
  });
});

console.log(dfs(0, 0));

// console.log(arr)
// console.log(dp)
// console.log(1 << 3)
