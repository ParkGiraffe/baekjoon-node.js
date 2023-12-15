const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const weights = second.split(" ").map(Number);

const edges = new Map();
for (let i = 0; i < n; i++) {
  edges.set(i + 1, []);
}

third.forEach((e) => {
  const [start, end] = e.split(" ").map(Number);
  edges.get(start).push(end);
  edges.get(end).push(start);
});

const dp = new Array(n + 1).fill([0, 0]);
const visited = new Array(n + 1).fill(0);

const dfs = (node) => {
  if (visited[node] === 1) {
    return Math.max(dp[node][0], dp[node][1]);
  }

  visited[node] = 1;
  dp[node][1] = weights[node - 1];

  edges.get(node).forEach((child) => {
    if (visited[child] === 0) {
      dfs(child);
      dp[node][0] += Math.max(dp[child][1], dp[child][0]);
      dp[node][1] += dp[child][0];
    }
  });

  return Math.max(dp[node][0], dp[node][1]);
};

const result = dfs(1);

const check = new Array(n + 1).fill(0);
const visited2 = new Array(n + 1).fill(0);

const findPath = (node, ps) => {
  if (visited2[node] === 1) return;

  visited2[node] = 1;

  if (ps === 1) {
    check[node] = 0;

    edges.get(node).forEach((child) => {
      if (visited2[child] === 0) findPath(child, 0);
    });
  } else {
    if (dp[node][0] > dp[node][1]) {
      check[node] = 0;

      edges.get(node).forEach((child) => {
        if (visited2[child] === 0) findPath(child, 0);
      });
    } else {
      check[node] = 1;
      edges.get(node).forEach((child) => {
        if (visited2[child] === 0) findPath(child, 1);
      });
    }
  }
};

findPath(1, 0);

console.log(result);
console.log(check);
