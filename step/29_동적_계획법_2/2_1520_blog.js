/*
내리막 길
https://www.acmicpc.net/problem/1520

문제
여행을 떠난 세준이는 지도를 하나 구하였다. 이 지도는 아래 그림과 같이 직사각형 모양이며 여러 칸으로 나뉘어져 있다. 한 칸은 한 지점을 나타내는데 각 칸에는 그 지점의 높이가 쓰여 있으며, 각 지점 사이의 이동은 지도에서 상하좌우 이웃한 곳끼리만 가능하다.



현재 제일 왼쪽 위 칸이 나타내는 지점에 있는 세준이는 제일 오른쪽 아래 칸이 나타내는 지점으로 가려고 한다. 그런데 가능한 힘을 적게 들이고 싶어 항상 높이가 더 낮은 지점으로만 이동하여 목표 지점까지 가고자 한다. 위와 같은 지도에서는 다음과 같은 세 가지 경로가 가능하다.

  

지도가 주어질 때 이와 같이 제일 왼쪽 위 지점에서 출발하여 제일 오른쪽 아래 지점까지 항상 내리막길로만 이동하는 경로의 개수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에는 지도의 세로의 크기 M과 가로의 크기 N이 빈칸을 사이에 두고 주어진다. 이어 다음 M개 줄에 걸쳐 한 줄에 N개씩 위에서부터 차례로 각 지점의 높이가 빈 칸을 사이에 두고 주어진다. M과 N은 각각 500이하의 자연수이고, 각 지점의 높이는 10000이하의 자연수이다.

출력
첫째 줄에 이동 가능한 경로의 수 H를 출력한다. 모든 입력에 대하여 H는 10억 이하의 음이 아닌 정수이다.

예제 입력 1 
4 5
50 45 37 32 30
35 50 40 20 25
30 30 25 17 28
27 24 22 15 10
예제 출력 1 
3

*/
const fs = require("fs");
const [MnN, ...strInput] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const INF = 10001;

let output = "";

const [m, n] = MnN.split(" ").map(Number);
const sRow = [1, 0, -1, 0];
const sCol = [0, 1, 0, -1];
const heights = [];

// heights.push(Array(n + 1).fill(INF))
strInput.forEach((e) => {
  heights.push(e.split(" ").map(Number));
});

const dp = Array.from(Array(m), () => new Array(n).fill(-1));

// console.log(heights, dp)

function dfs(row, col) {
  if ((row === m - 1) & (col === n - 1)) {
    dp[row][col] = 1;
    return 1;
  }

  if (dp[row][col] !== -1) return dp[row][col];

  let route = 0;
  for (let i = 0; i < 4; i++) {
    let tempRow = row + sRow[i];
    let tempCol = col + sCol[i];

    if (tempRow >= 0 && tempRow < m && tempCol >= 0 && tempCol < n) {
      if (heights[row][col] > heights[tempRow][tempCol]) {
        route += dfs(tempRow, tempCol);
      }
    }
  }
  dp[row][col] = route;
  return route;
}

console.log(dfs(0, 0));
// console.log(dp)
