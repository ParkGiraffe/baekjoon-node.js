/*
특정한 최단 경로
https://www.acmicpc.net/problem/1504


문제
방향성이 없는 그래프가 주어진다. 세준이는 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 한다. 또한 세준이는 두 가지 조건을 만족하면서 이동하는 특정한 최단 경로를 구하고 싶은데, 그것은 바로 임의로 주어진 두 정점은 반드시 통과해야 한다는 것이다.

세준이는 한번 이동했던 정점은 물론, 한번 이동했던 간선도 다시 이동할 수 있다. 하지만 반드시 최단 경로로 이동해야 한다는 사실에 주의하라. 1번 정점에서 N번 정점으로 이동할 때, 주어진 두 정점을 반드시 거치면서 최단 경로로 이동하는 프로그램을 작성하시오.

입력
첫째 줄에 정점의 개수 N과 간선의 개수 E가 주어진다. (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000) 둘째 줄부터 E개의 줄에 걸쳐서 세 개의 정수 a, b, c가 주어지는데, a번 정점에서 b번 정점까지 양방향 길이 존재하며, 그 거리가 c라는 뜻이다. (1 ≤ c ≤ 1,000) 다음 줄에는 반드시 거쳐야 하는 두 개의 서로 다른 정점 번호 v1과 v2가 주어진다. (v1 ≠ v2, v1 ≠ N, v2 ≠ 1) 임의의 두 정점 u와 v사이에는 간선이 최대 1개 존재한다.

출력
첫째 줄에 두 개의 정점을 지나는 최단 경로의 길이를 출력한다. 그러한 경로가 없을 때에는 -1을 출력한다.

예제 입력 1 
4 6
1 2 3
2 3 3
3 4 1
1 3 5
2 4 5
1 4 4
2 3
예제 출력 1 
7

*/
const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, e] = first.split(" ").map(Number);
const [v1, v2] = second.at(-1).split(" ").map(Number);

let graph = new Map();

for (let i = 0; i < n; i++) {
  graph.set(i + 1, []);
}

for (let i = 0; i < e; i++) {
  const [start, end, weight] = second[i].split(" ").map(Number);
  graph.get(start).push([end, weight]);
  graph.get(end).push([start, weight]);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  empty() {
    if (this.heap.length == 0) {
      return true;
    }
    return false;
  }

  swap(arr, x, y) {
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    return;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;
      this.swap(this.heap, parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const length = this.heap.length;
    let smallestIndex = index;

    if (
      leftIndex < length &&
      this.heap[leftIndex].cost < this.heap[smallestIndex].cost
    ) {
      smallestIndex = leftIndex;
    }
    if (
      rightIndex < length &&
      this.heap[rightIndex].cost < this.heap[smallestIndex].cost
    ) {
      smallestIndex = rightIndex;
    }
    if (smallestIndex !== index) {
      this.swap(this.heap, index, smallestIndex);
      this.sinkDown(smallestIndex);
    }
  }
}

// S에서 시작했을 때 각 node로 가는 최단경로 비용 배열을 반환하는 함수
function route(s) {
  const cost = new Array(n + 1).fill(Infinity);
  cost[s] = 0;

  const heap = new MinHeap();
  heap.insert({ node: s, cost: 0 });

  while (!heap.empty()) {
    let now = heap.extractMin();
    for (let i = 0; i < graph.get(now.node).length; i++) {
      const [n, c] = graph.get(now.node)[i];
      if (cost[n] > now.cost + c) {
        cost[n] = now.cost + c;
        heap.insert({ node: n, cost: cost[n] });
      }
    }
  }

  return cost;
}

const routeStart = route(1);
const routeV1 = route(v1);
const routeV2 = route(v2);

const planA = routeStart[v1] + routeV1[v2] + routeV2[n];
const planB = routeStart[v2] + routeV2[v1] + routeV1[n];

if (planA == Infinity && planB == Infinity) {
  console.log(-1);
} else {
  console.log(planA > planB ? planB : planA);
}
