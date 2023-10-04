/*
가장 긴 증가하는 부분 수열 5
https://www.acmicpc.net/problem/14003

문제
수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

입력
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (-1,000,000,000 ≤ Ai ≤ 1,000,000,000)

출력
첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

둘째 줄에는 정답이 될 수 있는 가장 긴 증가하는 부분 수열을 출력한다.

예제 입력 1 
6
10 20 10 30 20 50
예제 출력 1 
4
10 20 30 50

*/
const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const seq = second.split(" ").map(Number);

const lis = []; // 가장 긴 증가하는 부분 수열
const dp = []; // 각 seq 요소들의 순서가 들어가는 array

const binarySearch = (left, right, temp) => {
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (lis[mid] < temp) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
};

dp[0] = 0;
lis[0] = seq[0];
let j = 0; // lis의 길이 - 1

for (let i = 1; i < n; i++) {
  if (lis[j] < seq[i]) {
    lis[++j] = seq[i];
    dp[i] = j;
  } else {
    let idx = binarySearch(0, j, seq[i]);
    lis[idx] = seq[i];
    dp[i] = idx;
  }
}

// 역추적검사
const answer = [];

// let max = Math.max(...dp); // dp중 가장 큰 값 == LIS의 길이
let max = j;
// console.log(j, max);

let maxIdx = dp.indexOf(max);
// console.log(maxIdx)

for (let i = maxIdx; i > -1; i--) {
  if (dp[i] === max) {
    answer.push(seq[i]);
    max--;
  }

  if (max < 0) break;
}

console.log(answer.length + "\n" + answer.reverse().join(" "));
