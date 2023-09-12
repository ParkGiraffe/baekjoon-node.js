/*
나이트의 이동
https://www.acmicpc.net/problem/7562

문제
체스판 위에 한 나이트가 놓여져 있다. 나이트가 한 번에 이동할 수 있는 칸은 아래 그림에 나와있다. 나이트가 이동하려고 하는 칸이 주어진다. 나이트는 몇 번 움직이면 이 칸으로 이동할 수 있을까?



입력
입력의 첫째 줄에는 테스트 케이스의 개수가 주어진다.

각 테스트 케이스는 세 줄로 이루어져 있다. 첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다. 체스판의 크기는 l × l이다. 체스판의 각 칸은 두 수의 쌍 {0, ..., l-1} × {0, ..., l-1}로 나타낼 수 있다. 둘째 줄과 셋째 줄에는 나이트가 현재 있는 칸, 나이트가 이동하려고 하는 칸이 주어진다.

출력
각 테스트 케이스마다 나이트가 최소 몇 번만에 이동할 수 있는지 출력한다.

예제 입력 1 
3
8
0 0
7 0
100
0 0
30 50
10
1 1
1 1
예제 출력 1 
5
28
0
*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const MAX_LENGTH = 300;
// const record = new Array(endPoint).fill(endPoint + 1);

const tCase = +first;
const dx = [1, -1, 2, -2, 1, -1, 2, -2];
const dy = [2, -2, 1, -1, -2, 2, -1, 1];
let output = "";

// console.log(tCase)
for (let i = 0; i < tCase; i++) {
  const length = +second.shift();
  const [startX, startY] = second.shift().split(" ").map(Number);
  const [goalX, goalY] = second.shift().split(" ").map(Number);

  const board = Array.from({ length: length }, () => Array(length).fill(-1));

  const check = (y, x) => {
    if (y >= 0 && y < length && x >= 0 && x < length) {
      return true;
    } else return false;
  };

  const bfs = () => {
    let count = 1;
    const bfsDeq = [];
    bfsDeq.push([startY, startX]);
    board[startY][startX] = 0;

    while (bfsDeq.length) {
      let u = bfsDeq.shift();

      for (let i = 0; i < 8; i++) {
        let newY = u[0] + dy[i];
        let newX = u[1] + dx[i];

        if (check(newY, newX) && board[newY][newX] === -1) {
          board[newY][newX] = board[u[0]][u[1]] + 1;
          bfsDeq.push([newY, newX]);
        }
      }
    }
  };

  bfs();

  output += board[goalY][goalX] + "\n";
}

console.log(output);
