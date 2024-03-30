/*
이항계수
https://www.acmicpc.net/problem/11050


문제
자연수 
\(N\)과 정수 
\(K\)가 주어졌을 때 이항 계수 
\(\binom{N}{K}\)를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 
\(N\)과 
\(K\)가 주어진다. (1 ≤ 
\(N\) ≤ 10, 0 ≤ 
\(K\) ≤ 
\(N\))

출력
 
\(\binom{N}{K}\)를 출력한다.

예제 입력 1 
5 2
예제 출력 1 
10
*/
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
