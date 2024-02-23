/*
별 찍기 - 7

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
const n = +fs.readFileSync("/dev/stdin").toString().trim();

for (let i = 0; i < 2 * n; i++) {
  if (i < n) {
    let output = new Array(2 * i + 1).fill("*").join("");
    let side = new Array(n - i - 1).fill(" ").join("");
    output = side + output;
    console.log(output);
  }

  if (i > n) {
    let output = new Array(2 * n - 1 - 2 * (i - n)).fill("*").join("");
    let side = new Array(i - n).fill(" ").join("");
    output = side + output;
    console.log(output);
  }
}
