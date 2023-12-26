/*
행렬 곱셈
https://www.acmicpc.net/problem/2740


문제
N*M크기의 행렬 A와 M*K크기의 행렬 B가 주어졌을 때, 두 행렬을 곱하는 프로그램을 작성하시오.

입력
첫째 줄에 행렬 A의 크기 N 과 M이 주어진다. 둘째 줄부터 N개의 줄에 행렬 A의 원소 M개가 순서대로 주어진다. 그 다음 줄에는 행렬 B의 크기 M과 K가 주어진다. 이어서 M개의 줄에 행렬 B의 원소 K개가 차례대로 주어진다. N과 M, 그리고 K는 100보다 작거나 같고, 행렬의 원소는 절댓값이 100보다 작거나 같은 정수이다.

출력
첫째 줄부터 N개의 줄에 행렬 A와 B를 곱한 행렬을 출력한다. 행렬의 각 원소는 공백으로 구분한다.

예제 입력 1 
3 2
1 2
3 4
5 6
2 3
-1 -2 0
0 0 3
예제 출력 1 
-1 -2 6
-3 -6 12
-5 -10 18

*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const firstMatrix = [];
const secondMatrix = [];

let cursor = 0;
const [aN, aM] = input[cursor++].split(" ").map(Number);

for (let i = 0; i < aN; i++) {
  firstMatrix.push(input[cursor++].split(" ").map(Number));
}

const [bM, bK] = input[cursor++].split(" ").map(Number);

for (let i = 0; i < bM; i++) {
  secondMatrix.push(input[cursor++].split(" ").map(Number));
}

const N = aN;
const M = aM; // (=== bM)
const K = bK;

const resultMatrix = Array.from(Array(N), () => new Array(K).fill(0));

for (let n = 0; n < N; n++) {
  for (let m = 0; m < M; m++) {
    for (let k = 0; k < K; k++) {
      resultMatrix[n][k] += firstMatrix[n][m] * secondMatrix[m][k];
    }
  }
}

console.log(resultMatrix.map((e) => e.join(" ")).join("\n"));
