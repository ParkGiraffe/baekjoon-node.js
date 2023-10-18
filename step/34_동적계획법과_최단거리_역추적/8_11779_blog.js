/*
최소비용 구하기 2
https://www.acmicpc.net/problem/11779

문제
n(1≤n≤1,000)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1≤m≤100,000)개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. 그러면 A번째 도시에서 B번째 도시 까지 가는데 드는 최소비용과 경로를 출력하여라. 항상 시작점에서 도착점으로의 경로가 존재한다.

입력
첫째 줄에 도시의 개수 n(1≤n≤1,000)이 주어지고 둘째 줄에는 버스의 개수 m(1≤m≤100,000)이 주어진다. 그리고 셋째 줄부터 m+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.

그리고 m+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다.

출력
첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.

둘째 줄에는 그러한 최소 비용을 갖는 경로에 포함되어있는 도시의 개수를 출력한다. 출발 도시와 도착 도시도 포함한다.

셋째 줄에는 최소 비용을 갖는 경로를 방문하는 도시 순서대로 출력한다.

예제 입력 1 
5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5
예제 출력 1 
4
3
1 3 5

*/

const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const m = +second;
const [start, goal] = third.pop().split(" ").map(Number);

let graph = new Map();

for (let i = 0; i < n; i++) {
  graph.set(i + 1, []);
}

for (let i = 0; i < m; i++) {
  const [start, end, weight] = third[i].split(" ").map(Number);
  graph.get(start).push([end, weight]);
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

// s node에서 출발했을 때 finish node 까지 가는 최단 경로를 구한다.
function route(s, finish) {
  const cost = new Array(n + 1).fill(Infinity);
  cost[s] = 0;

  const heap = new MinHeap();
  heap.insert({ node: s, cost: 0, arr: [s] });
  // node : 현재 위치
  // cost : 현재까지의 비용
  // arr : 현재까지 거쳐온 도시의 번호가 담긴 배열

  while (!heap.empty()) {
    let now = heap.extractMin();

    if (now.node === finish) {
      return [now.cost, now.arr.length, now.arr.join(" ")];
    }

    for (let i = 0; i < graph.get(now.node).length; i++) {
      const [n, c] = graph.get(now.node)[i];
      if (cost[n] > now.cost + c) {
        cost[n] = now.cost + c;
        heap.insert({ node: n, cost: cost[n], arr: [...now.arr, n] });
      }
    }
  }
}

const output = route(start, goal);
console.log(output[0] + "\n" + output[1] + "\n" + output[2]);
