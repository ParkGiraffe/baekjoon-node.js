/*
가장 긴 증가하는 부분 수열
https://www.acmicpc.net/problem/11053


문제
수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

입력
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

출력
첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

예제 입력 1 
6
10 20 10 30 20 50
예제 출력 1 
4
*/

const fs = require("fs");
const [n, strA] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const A = strA.split(" ").map(Number);

const dp = Array(n + 1).fill(0);
A.unshift(0);
dp[1] = 1;

for (let i = 2; i <= n; i++) {
  let under = 0;

  for (let j = i - 1; j >= 1; j--) {
    // console.log(A[i], A[j], dp[under], dp[j])
    if (A[i] > A[j] && dp[under] < dp[j]) {
      under = j;
      // console.log(under)
    }
  }

  if (under === 0) {
    dp[i] = 1;
  } else {
    dp[i] = dp[under] + 1;
  }
}

// console.log(dp);
console.log(Math.max(...dp));
