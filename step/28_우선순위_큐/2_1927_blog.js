/*
최소 힙
https://www.acmicpc.net/problem/1927

문제
널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

입력
첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. x는 231보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.

출력
입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

예제 입력 1 
9
0
12345678
1
2
0
0
0
0
32
예제 출력 1 
0
1
2
12345678
0
*/

const fs = require("fs");
const [n, ...xs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class AbsHeap {
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
      if (Math.abs(this.heap[parentIndex]) < Math.abs(this.heap[currentIndex]))
        break; // 부모노드의 절대값이 자식노드의 절대값보다 작으면 종료
      if (
        Math.abs(this.heap[parentIndex]) ===
          Math.abs(this.heap[currentIndex]) &&
        this.heap[parentIndex] < this.heap[currentIndex]
      )
        break; // 절대값이 같을 경우, 부모노드의 실제값이 더 작을 때 종료

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
    // console.log(this.heap);
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0]; // 최상위 노드 값 추출
    this.heap[0] = this.heap.pop(); // 가장 마지막 노드를 최상위 노드로 올림
    this.bubbleDown(0); // 최상위 노드로 올려진 후, 이제 비교를 하면서 위치 조정
    return min;
  }

  bubbleDown(index) {
    const leftNodeIndex = 2 * index + 1;
    const rightNodeIndex = 2 * index + 2;
    const length = this.heap.length;
    let minIndex = index;

    // 왼쪽 노드가 존재하고, 왼쪽노드의 절대값이 minIndex의 절대값보다 작으면 minIndex를 왼쪽 노드로 갱신
    if (
      leftNodeIndex < length &&
      Math.abs(this.heap[leftNodeIndex]) < Math.abs(this.heap[minIndex])
    ) {
      minIndex = leftNodeIndex;
    }

    if (
      leftNodeIndex < length &&
      Math.abs(this.heap[leftNodeIndex]) === Math.abs(this.heap[minIndex]) &&
      this.heap[leftNodeIndex] < this.heap[minIndex]
    ) {
      minIndex = leftNodeIndex;
    }

    if (
      rightNodeIndex < length &&
      Math.abs(this.heap[rightNodeIndex]) < Math.abs(this.heap[minIndex])
    ) {
      minIndex = rightNodeIndex;
    }

    if (
      rightNodeIndex < length &&
      Math.abs(this.heap[rightNodeIndex]) === Math.abs(this.heap[minIndex]) &&
      this.heap[rightNodeIndex] < this.heap[minIndex]
    ) {
      minIndex = rightNodeIndex;
    }

    // 현재 최상위 노드에 있는 값이 최대값이 아닐 경우
    if (minIndex !== index) {
      // 실제로 찾은 minIndex값에 위치한 노드를 최상위 노드로 올린다.ㄹ
      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index],
      ];

      // 그리고 바뀐 자리에서 다시 bubbleDown을 실행.
      this.bubbleDown(minIndex);
    }
  }
}

let output = [];

const absHeap = new AbsHeap();
xs.forEach((x) => {
  if (x === 0) {
    if (!absHeap.empty()) {
      output.push(absHeap.pop());
    } else {
      output.push(0);
    }
  } else {
    absHeap.insert(x);
  }
});

console.log(output.join("\n"));
