const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = first.split(" ").map(Number);
let graph = new Map();
const visited = new Array(n + 1).fill(0);
let count = 2;

const q = []; // 덱
q.push(r);
visited[r] = 1;

for (let i = 0; i < n; i++) {
  graph.set(i + 1, []);
}

// console.log(graph);

second.forEach((e) => {
  const [start, end] = e.split(" ").map(Number);
  graph.get(start).push(end);
  graph.get(end).push(start);
});

graph.forEach((n) => {
  n.sort((a, b) => b - a);
});

// console.log(graph)

while (q.length !== 0) {
  //   console.log(q);
  let u = q.shift();

  graph.get(u).forEach((i) => {
    if (!visited[i]) {
      q.push(i);
      visited[i] = count;
      count++;
    }
  });
}

visited.shift();
console.log(visited.join("\n"));
