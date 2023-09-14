const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [v, e] = first.split(" ").map(Number);
const k = +second;
const graph = Array.from({ length: v + 1 }, () => []);

// u : 출발
// v : 도착
// w : 가중치
third.forEach((e) => {
  const [u, v, w] = e.split(" ").map(Number);
  graph[u].push([v, w]);
});

const distance = new Array(v + 1).fill(Infinity); // k로부터 최단거리
const visited = new Array(v + 1).fill(0); // 방문여부
visited[0] = 1;
distance[k] = 0; // k : 시작점
const queue = [[k, 0]];

let head = 0;
while (head < queue.length) {
  const [c, l] = queue[head++];
  // c 시작점
  // l 가중치 합계
  visited[c] = 1;

  for (const [v, w] of graph[c]) if (l + w < distance[v]) distance[v] = l + w;
  // accumulator, currentValue, currentIndex,
  const n = distance.reduce(
    (p, _, c) => (distance[c] < distance[p] && !visited[c] ? c : p),
    0
  );
  if (n) queue.push([n, distance[n]]);
}
distance.shift();
console.log(distance.map((e) => (e === Infinity ? "INF" : e)).join("\n"));
