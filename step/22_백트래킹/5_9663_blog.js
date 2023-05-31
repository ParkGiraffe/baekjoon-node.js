/*
N-Queen
https://www.acmicpc.net/problem/9663

Ref : https://gamedoridori.tistory.com/176

문제
N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.

N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 N이 주어진다. (1 ≤ N < 15)

출력
첫째 줄에 퀸 N개를 서로 공격할 수 없게 놓는 경우의 수를 출력한다.

예제 입력 1 
8
예제 출력 1 
92
*/

const fs = require("fs");
const n = +fs.readFileSync("/dev/stdin").toString().trim();
let count = 0;

const queens = Array(n).fill(null); // 1차원 배열을 사용하고, idx 값으로 y좌표(col), element 값으로 x좌표(row)가 들어 있다.

const check = (col) => {
  for (let i = 0; i < col; i++) {
    // 이전 열에 있는 퀸들과 유효성 검사
    if (
      queens[i] === queens[col] ||
      col - i === Math.abs(queens[col] - queens[i])
    )
      return false;
    // 같은 행에 있거나 || 대각선에 있을 경우
  }

  return true;
};

const nqueen = (col) => {
  if (col === n) {
    count++;
    return;
  }

  for (let row = 0; row < n; row++) {
    queens[col] = row;

    if (check(col)) {
      nqueen(col + 1);
    }
  }
};

nqueen(0);
console.log(count);
