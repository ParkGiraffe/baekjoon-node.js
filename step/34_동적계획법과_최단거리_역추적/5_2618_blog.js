const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const eventCount = +second;
const MAX = 1000; // MAX로 dp랑 ans를 선언해주지 않으면 런타임 에러 발생
// const events = [];

const dp = Array.from(Array(MAX + 1), () => Array(MAX + 1).fill(-1));
const ans = Array.from(Array(MAX + 1), () => Array(MAX + 1).fill(-1)); //n 또는 eventCount로 배열의 갯수를 정해버리면, n보다 eventCount가 클 경우 or 그 반대의 경우에 런타임 에러 발생
const tasks = []; // 사건처리 순서

//-----------------------

const getDist = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const getMinPath = (a, b) => {
  const next = Math.max(a, b) + 1; // next : 이번에 처리할 사건
  if (next === eventCount + 2) return 0;
  if (dp[a][b] !== -1) return dp[a][b];

  const x = getMinPath(next, b) + getDist(tasks[a], tasks[next]);
  const y = getMinPath(a, next) + getDist(tasks[b], tasks[next]);
  // x: 경찰차 1이 이번 사건을 처리할 경우의 이동 거리
  // y: 경찰차 2가 이번 사건을 처리할 경우의 이동 거리

  x < y ? (ans[a][b] = 1) : (ans[a][b] = 2);
  // 이번 사건을 처리한 경찰차 번호

  return (dp[a][b] = Math.min(x, y)); // 이번 사건을 처리하고 난 후의 이동거리
};

tasks[0] = [1, 1];
tasks[1] = [n, n];
third.forEach((e) => {
  tasks.push(e.split(" ").map(Number));
});

const output = getMinPath(0, 1);

const path = [];
let x = 0;
let y = 1;

while (Math.max(x, y) <= eventCount) {
  path.push(ans[x][y]);
  if (ans[x][y] === 1) x = Math.max(x, y) + 1;
  else y = Math.max(x, y) + 1;
}

console.log(output + "\n" + path.join("\n"));
