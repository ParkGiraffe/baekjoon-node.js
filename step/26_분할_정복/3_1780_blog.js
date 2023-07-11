/*
종이의 개수
https://www.acmicpc.net/problem/1780

문제
N×N크기의 행렬로 표현되는 종이가 있다. 종이의 각 칸에는 -1, 0, 1 중 하나가 저장되어 있다. 우리는 이 행렬을 다음과 같은 규칙에 따라 적절한 크기로 자르려고 한다.

만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
(1)이 아닌 경우에는 종이를 같은 크기의 종이 9개로 자르고, 각각의 잘린 종이에 대해서 (1)의 과정을 반복한다.
이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구해내는 프로그램을 작성하시오.

입력
첫째 줄에 N(1 ≤ N ≤ 37, N은 3k 꼴)이 주어진다. 다음 N개의 줄에는 N개의 정수로 행렬이 주어진다.

출력
첫째 줄에 -1로만 채워진 종이의 개수를, 둘째 줄에 0으로만 채워진 종이의 개수를, 셋째 줄에 1로만 채워진 종이의 개수를 출력한다.

예제 입력 1 
9
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
0 1 -1 0 1 -1 0 1 -1
0 -1 1 0 1 -1 0 1 -1
0 1 -1 1 0 -1 0 1 -1
예제 출력 1 
10
12
11

*/

const fs = require("fs");
const [N, ...PAPER] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let n = +N;
const paper = [];
PAPER.forEach((e) => {
  paper.push(e.split(" ").map(Number));
});

// console.log(paper);

let zero = 0;
let one = 0;
let minus = 0;

// let result = '';

const recursion = (n, x, y) => {
  let zeroCount = 0;
  let oneCount = 0;
  let minusCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (paper[x + i][y + j] === 0) zeroCount++;
      else if (paper[x + i][y + j] === 1) oneCount++;
      else if (paper[x + i][y + j] === -1) minusCount++;
    }
  }
  // console.log(temp , n)

  // if (temp === 0) white++;
  // else if (temp === n*n) blue++;

  if (zeroCount === n ** 2) zero++;
  else if (oneCount === n ** 2) one++;
  else if (minusCount === n ** 2) minus++;
  else {
    n /= 3;
    recursion(n, x, y);

    recursion(n, x + n, y);
    recursion(n, x + 2 * n, y);

    recursion(n, x, y + n);
    recursion(n, x, y + 2 * n);

    recursion(n, x + n, y + n);
    recursion(n, x + 2 * n, y + n);
    recursion(n, x + n, y + 2 * n);

    recursion(n, x + 2 * n, y + 2 * n);
  }
};

recursion(n, 0, 0);

console.log(minus + "\n" + zero + "\n" + one);
