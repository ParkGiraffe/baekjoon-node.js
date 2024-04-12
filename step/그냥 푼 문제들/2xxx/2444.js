/*
별 찍기 - 7
https://www.acmicpc.net/problem/2444

문제
예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

출력
첫째 줄부터 2×N-1번째 줄까지 차례대로 별을 출력한다.

예제 입력 1 
5
예제 출력 1 
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
*/

const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim();

const output = [];

for (let i = 1; i < N; i++) {
  const temp = [];

  for (let j = 0; j < N - i; j++) {
    temp.push(" ");
  }

  for (let j = 0; j < 2 * i - 1; j++) {
    temp.push("*");
  }

  output.push(temp.join(""));
}

for (let i = 0; i < N; i++) {
  const temp = [];

  for (let j = 0; j < i; j++) {
    temp.push(" ");
  }

  for (let j = 0; j < 2 * N - 2 * i - 1; j++) {
    temp.push("*");
  }

  // for (let j = 0; j < i; j++) {
  //   temp.push(" ");
  // }

  output.push(temp.join(""));
}

console.log(output.join("\n"));
