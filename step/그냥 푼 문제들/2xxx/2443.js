/*
별 찍기 - 6
https://www.acmicpc.net/problem/2443

문제
첫째 줄에는 별 2×N-1개, 둘째 줄에는 별 2×N-3개, ..., N번째 줄에는 별 1개를 찍는 문제

별은 가운데를 기준으로 대칭이어야 한다.

입력
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

출력
첫째 줄부터 N번째 줄까지 차례대로 별을 출력한다.

예제 입력 1 
5
예제 출력 1 
*********
 *******
  *****
   ***
    *
*/
const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim();

const output = [];
for (let i = 0; i < N; i++) {
  const temp = [];

  for (let j = 0; j < i; j++) {
    temp.push(" ");
  }

  for (let j = 0; j < N - i - 1; j++) {
    temp.push("*");
  }

  temp.push("*");

  for (let j = 0; j < N - i - 1; j++) {
    temp.push("*");
  }

  // for (let j = 0; j < i; j++) {
  //   temp.push(" ");
  // }

  output.push(temp.join(""));
}

console.log(output.join("\n"));
