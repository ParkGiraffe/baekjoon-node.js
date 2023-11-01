const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const m = +second;
const plan = third.pop().split(" ").map(Number);
const graph = third.map((e) => e.split(" ").map(Number));

const parents = new Array(n + 1).fill(-1);

const find = (x) => {
  if (parents[x] === -1) return x;
  parents[x] = find(parents[x]);
  return parents[x];
};

const union = (a, b) => {
  let aParent = find(a);
  let bParent = find(b);

  if (aParent !== bParent) {
    parents[aParent] = bParent;
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1) union(i + 1, j + 1);
  }
}

let result = "YES";
const rootPoint = find(plan[0]);
for (let i = 1; i < m; i++) {
  if (rootPoint !== find(plan[i])) result = "NO";
}

/*
rootPoint를 따로 두지 않는 방식
for (let i = 0; i < m - 1; i++) {
  if (find(plan[i]) !== find(plan[i + 1])) result = "NO";
}
*/

console.log(result);
