/*
수 찾기
https://www.acmicpc.net/problem/1920

문제
N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.

입력
첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -231 보다 크거나 같고 231보다 작다.

출력
M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.

예제 입력 1 
5
4 1 5 2 3
5
1 3 7 9 5
예제 출력 1 
1
1
0
0
1
*/
const fs = require("fs");
const [N, Ns, M, Ms] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +N;
const A = Ns.split(" ").map(Number);
const m = +M;
const quest = Ms.split(" ").map(Number);

let output = [];

A.sort((a, b) => a - b);

const binarySort = (e) => {
  let l = 0; // 시작(왼쪽)
  let r = n - 1; // 끝(오른쪽)

  let exist = false;

  while (l <= r) {
    let mid = Math.trunc((l + r) / 2);
    // console.log(mid , e, A[mid])
    if (e === A[mid]) {
      exist = true;
      output.push(1);
      break;
    } else if (e > A[mid]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  if (!exist) output.push(0);
};

quest.forEach((e) => {
  binarySort(e);
});

// console.log(quest)
console.log(output.join("\n"));
