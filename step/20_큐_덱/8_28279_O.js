/*
덱 2
https://www.acmicpc.net/problem/28279

문제
정수를 저장하는 덱을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

1 X: 정수 X를 덱의 앞에 넣는다. (1 ≤ X ≤ 100,000)
2 X: 정수 X를 덱의 뒤에 넣는다. (1 ≤ X ≤ 100,000)
3: 덱에 정수가 있다면 맨 앞의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
4: 덱에 정수가 있다면 맨 뒤의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
5: 덱에 들어있는 정수의 개수를 출력한다.
6: 덱이 비어있으면 1, 아니면 0을 출력한다.
7: 덱에 정수가 있다면 맨 앞의 정수를 출력한다. 없다면 -1을 대신 출력한다.
8: 덱에 정수가 있다면 맨 뒤의 정수를 출력한다. 없다면 -1을 대신 출력한다.
입력
첫째 줄에 명령의 수 N이 주어진다. (1 ≤ N ≤ 1,000,000)

둘째 줄부터 N개 줄에 명령이 하나씩 주어진다.

출력을 요구하는 명령은 하나 이상 주어진다.

출력
출력을 요구하는 명령이 주어질 때마다 명령의 결과를 한 줄에 하나씩 출력한다.

예제 입력 1 
11
6
1 3
1 8
7
8
3
2 5
1 2
5
4
4
예제 출력 1 
1
8
3
8
3
5
3


*/

// shift, unshift, push, pop 사용하면 시간초과

const fs = require("fs");
const [N, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = 1000000;
let output = "";

const deque = new Array(n);
let size = 0;
let front = -1;
let rear = -1;

const addFirst = (e) => {
  if (size === 0) {
    front = 0;
    rear = 0;
  } else {
    if (front === 0) {
      front = n - 1;
    } else {
      front--;
    }
  }

  deque[front] = e;
  size++;
};

const addLast = (e) => {
  if (size === 0) {
    front = 0;
    rear = 0;
  } else {
    if (rear === n - 1) {
      rear = 0;
    } else {
      rear++;
    }
  }

  deque[rear] = e;
  size++;
};

const removeFirst = () => {
  output += deque[front] + "\n";
  size--;
  if (front === n - 1) {
    front = 0;
  } else {
    front++;
  }
};

const removeLast = () => {
  output += deque[rear] + "\n";
  size--;

  if (rear === 0) {
    rear = n - 1;
  } else {
    rear--;
  }
};

input.forEach((e) => {
  const [exe, num] = e.split(" ").map(Number);

  if (exe === 1) {
    addFirst(num);
  }

  if (exe === 2) {
    addLast(num);
  }

  if (exe === 3) {
    size === 0 ? (output += "-1\n") : removeFirst();
  }

  if (exe === 4) {
    size === 0 ? (output += "-1\n") : removeLast();
  }

  if (exe === 5) {
    output += size + "\n";
  }

  if (exe === 6) {
    size === 0 ? (output += "1\n") : (output += "0\n");
  }

  if (exe === 7) {
    size === 0 ? (output += "-1\n") : (output += deque[front] + "\n");
  }

  if (exe === 8) {
    size === 0 ? (output += "-1\n") : (output += deque[rear] + "\n");
  }
});

console.log(output);
