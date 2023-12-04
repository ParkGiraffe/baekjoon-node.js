const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const dp = Array.from(Array(n + 1), () => new Array(k + 1).fill(0));

const setFactorial = (n, k) => {
  if (dp[n][k] > 0) return dp[n][k];

  if (k === 0 || n === k) return (dp[n][k] = 1);

  return (dp[n][k] = setFactorial(n - 1, k - 1) + setFactorial(n - 1, k));
};

console.log(setFactorial(n, k)); // top-down
// console.log(dp)
