/*
구간 합 구하기 5

https://www.acmicpc.net/problem/11660


문제
N×N개의 수가 N×N 크기의 표에 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오. (x, y)는 x행 y열을 의미한다.

예를 들어, N = 4이고, 표가 아래와 같이 채워져 있는 경우를 살펴보자.

1	2	3	4
2	3	4	5
3	4	5	6
4	5	6	7
여기서 (2, 2)부터 (3, 4)까지 합을 구하면 3+4+5+4+5+6 = 27이고, (4, 4)부터 (4, 4)까지 합을 구하면 7이다.

표에 채워져 있는 수와 합을 구하는 연산이 주어졌을 때, 이를 처리하는 프로그램을 작성하시오.

입력
첫째 줄에 표의 크기 N과 합을 구해야 하는 횟수 M이 주어진다. (1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000) 둘째 줄부터 N개의 줄에는 표에 채워져 있는 수가 1행부터 차례대로 주어진다. 다음 M개의 줄에는 네 개의 정수 x1, y1, x2, y2 가 주어지며, (x1, y1)부터 (x2, y2)의 합을 구해 출력해야 한다. 표에 채워져 있는 수는 1,000보다 작거나 같은 자연수이다. (x1 ≤ x2, y1 ≤ y2)

출력
총 M줄에 걸쳐 (x1, y1)부터 (x2, y2)까지 합을 구해 출력한다.

예제 입력 1 
4 3
1 2 3 4
2 3 4 5
3 4 5 6
4 5 6 7
2 2 3 4
3 4 3 4
1 1 4 4
예제 출력 1 
27
6
64
예제 입력 2 
2 4
1 2
3 4
1 1 1 1
1 2 1 2
2 1 2 1
2 2 2 2
예제 출력 2 
1
2
3
4
*/

const fs = require("fs");
const [NnM, ...Inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = NnM.split(" ").map(Number);
let output = [];

const matrix = [];
const question = [];

Inputs.forEach((v, i) => {
  if (i < n) {
    matrix.push(v.split(" ").map(Number));
  } else {
    question.push(v.split(" ").map(Number));
  }
});

//---

const dp = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));

matrix.forEach((row, x) => {
  row.forEach((cell, y) => {
    dp[x + 1][y + 1] = cell;
  });
});

for (let x = 1; x <= n; x++) {
  for (let y = 1; y <= n; y++) {
    dp[x][y] += dp[x - 1][y] + dp[x][y - 1] - dp[x - 1][y - 1];
  }
}
// console.log(dp)

// --
question.forEach(([x1, y1, x2, y2]) => {
  output.push(
    dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1]
  );
});

console.log(output.join("\n"));
