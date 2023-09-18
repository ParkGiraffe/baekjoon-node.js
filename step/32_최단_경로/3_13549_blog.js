/*
숨바꼭질 3
https://www.acmicpc.net/problem/13549

문제
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

입력
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

출력
수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

예제 입력 1 
5 17
예제 출력 1 
2
힌트
수빈이가 5-10-9-18-17 순으로 가면 2초만에 동생을 찾을 수 있다.
*/
const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

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
      if (this.heap[parentIndex].count <= this.heap[currentIndex].count) break;
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
      this.heap[leftIndex].count < this.heap[smallestIndex].count
    ) {
      smallestIndex = leftIndex;
    }
    if (
      rightIndex < length &&
      this.heap[rightIndex].count < this.heap[smallestIndex].count
    ) {
      smallestIndex = rightIndex;
    }
    if (smallestIndex !== index) {
      this.swap(this.heap, index, smallestIndex);
      this.sinkDown(smallestIndex);
    }
  }
}

const check = (number) => {
  if (number <= 100000 && 0 <= number) return true;
  else return false;
};

// S에서 시작했을 때 각 node로 가는 최단경로 비용 배열을 반환하는 함수
function route(s) {
  const visited = new Array(100001).fill(Infinity);
  visited[s] = 0;

  const heap = new MinHeap();
  heap.insert({ node: s, count: 0 });

  while (!heap.empty()) {
    let now = heap.extractMin();

    const newNode1 = { node: now.node - 1, count: now.count + 1 };
    if (check(newNode1.node) && newNode1.count < visited[newNode1.node]) {
      visited[newNode1.node] = newNode1.count;
      heap.insert(newNode1);
    }

    const newNode2 = { node: now.node + 1, count: now.count + 1 };
    if (check(newNode2.node) && newNode2.count < visited[newNode2.node]) {
      visited[newNode2.node] = newNode2.count;
      heap.insert(newNode2);
    }

    const newNode3 = { node: now.node * 2, count: now.count };
    if (check(newNode3.node) && newNode3.count < visited[newNode3.node]) {
      visited[newNode3.node] = newNode3.count;
      heap.insert(newNode3);
    }
  }

  return visited[k];
}

console.log(route(n));
