/*
나머지 합
https://www.acmicpc.net/problem/10986


문제
수 N개 A1, A2, ..., AN이 주어진다. 이때, 연속된 부분 구간의 합이 M으로 나누어 떨어지는 구간의 개수를 구하는 프로그램을 작성하시오.

즉, Ai + ... + Aj (i ≤ j) 의 합이 M으로 나누어 떨어지는 (i, j) 쌍의 개수를 구해야 한다.

입력
첫째 줄에 N과 M이 주어진다. (1 ≤ N ≤ 106, 2 ≤ M ≤ 103)

둘째 줄에 N개의 수 A1, A2, ..., AN이 주어진다. (0 ≤ Ai ≤ 109)

출력
첫째 줄에 연속된 부분 구간의 합이 M으로 나누어 떨어지는 구간의 개수를 출력한다.

예제 입력 1 
5 3
1 2 3 1 2
예제 출력 1 
7
*/

const fs = require("fs");
const [NnM, As] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = NnM.split(" ").map(Number);
let result = 0;

const a = As.split(" ").map(Number);
const pSum = [];

a.forEach((v, i) => {
  if (i === 0) {
    pSum[i] = v;
  } else {
    pSum[i] = pSum[i - 1] + v;
  }
});

const dict = {};
// const psm = pSum.map(e => e % m);

pSum.forEach((e) => {
  const temp = e % m;

  if (!dict[temp]) {
    dict[temp] = 1;
  } else {
    dict[temp]++;
  }
});

// console.log(dict)

const combination = (n) => (n * (n - 1)) / 2;

for (data in dict) {
  // console.log(dict[data])
  result += combination(dict[data]);
}

if (dict[0]) {
  result += dict[0];
}

console.log(result);
