/*
최대 힙
https://www.acmicpc.net/problem/11279

문제
널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

입력
첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 자연수는 231보다 작다.

출력
입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.

예제 입력 1 
13
0
1
2
0
0
3
2
1
0
0
0
0
0
예제 출력 1 
0
2
1
3
2
1
0
0


*/

const fs = require("fs");
const [n, ...xs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  empty() {
    return this.heap.length === 0 ? true : false;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2); // 부모 노드의 인덱스
      if (this.heap[parentIndex] >= this.heap[currentIndex]) break; // 부모노드가 자식노드보다 크거나 같으면 종료

      // 그렇지 않다면, 부모노드와 자식노드의 값을 서로 변경
      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];

      // 바뀐 노드의 인덱스에 맞춰서 currentIndex를 재설정한 후, while문 다시 돌림. currentIndex가 0(최상위 노드)이 되면 반복 종료
      currentIndex = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0]; // 최상위 노드 값 추출
    this.heap[0] = this.heap.pop(); // 가장 마지막 노드를 최상위 노드로 올림
    this.bubbleDown(0); // 최상위 노드로 올려진 후, 이제 비교를 하면서 위치 조정
    return max;
  }

  bubbleDown(index) {
    const leftNodeIndex = 2 * index + 1;
    const rightNodeIndex = 2 * index + 2;
    const length = this.heap.length;
    let maxIndex = index;

    // 왼쪽 노드가 존재하고, 왼쪽노드의 값이 maxIndex의 값보다 크면 maxIndex를 왼쪽 노드로 갱신
    if (
      leftNodeIndex < length &&
      this.heap[leftNodeIndex] > this.heap[maxIndex]
    ) {
      maxIndex = leftNodeIndex;
    }

    if (
      rightNodeIndex < length &&
      this.heap[rightNodeIndex] > this.heap[maxIndex]
    ) {
      maxIndex = rightNodeIndex;
    }

    // 현재 최상위 노드에 있는 값이 최대값이 아닐 경우
    if (maxIndex !== index) {
      // 실제로 찾은 maxIndex값에 위치한 노드를 최상위 노드로 올린다.
      [this.heap[index], this.heap[maxIndex]] = [
        this.heap[maxIndex],
        this.heap[index],
      ];

      // 그리고 바뀐 자리에서 다시 bubbleDown을 실행.
      this.bubbleDown(maxIndex);
    }
  }
}

let output = [];

const maxHeap = new MaxHeap();
xs.forEach((x) => {
  if (x === 0) {
    if (!maxHeap.empty()) {
      output.push(maxHeap.pop());
    } else {
      output.push(0);
    }
  } else {
    maxHeap.insert(x);
  }
});

console.log(output.join("\n"));
