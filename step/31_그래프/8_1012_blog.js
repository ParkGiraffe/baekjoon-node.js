const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const t = +first;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
let result = "";

// 테스트 케이스 당 배추흰지렁이 마리 수 구하기
for (let tCase = 0; tCase < t; tCase++) {
  const check = (y, x) => {
    if (y >= 0 && y < n && x >= 0 && x < m) {
      return true;
    } else return false;
  };

  const dfs = (y, x) => {
    if (check(y, x) && farm[y][x]) {
      farm[y][x] = 0;

      for (let i = 0; i < 4; i++) {
        let newY = y + dy[i];
        let newX = x + dx[i];
        dfs(newY, newX);
      }
    }
  };

  // M : 가로
  // N : 세로
  // K : 배추 (위치) 개수
  const [m, n, k] = second.shift().split(" ").map(Number);
  //   const farm = new Array(n).fill(new Array(m).fill(0)); <- 오류가 발생하는 방식
  const farm = Array.from({ length: n }, () => Array(m).fill(0));
  let count = 0;

  // 배추 위치 표시
  for (let i = 0; i < k; i++) {
    const [x, y] = second.shift().split(" ").map(Number);
    farm[y][x] = 1;
  }
  // console.log(farm)

  // dfs로 접근
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (farm[y][x]) {
        dfs(y, x);
        count++;
      }
    }
  }
  result += count + "\n";
}

console.log(result);
