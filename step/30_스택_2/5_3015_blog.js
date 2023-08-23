/*
오아시스 재결합
https://www.acmicpc.net/problem/3015

문제
오아시스의 재결합 공연에 N명이 한 줄로 서서 기다리고 있다.

이 역사적인 순간을 맞이하기 위해 줄에서서 기다리고 있던 백준이는 갑자기 자기가 볼 수 있는 사람의 수가 궁금해 졌다.

두 사람 A와 B가 서로 볼 수 있으려면, 두 사람 사이에 A 또는 B보다 키가 큰 사람이 없어야 한다.

줄에 서있는 사람의 키가 주어졌을 때, 서로 볼 수 있는 쌍의 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 줄에서 기다리고 있는 사람의 수 N이 주어진다. (1 ≤ N ≤ 500,000)

둘째 줄부터 N개의 줄에는 각 사람의 키가 나노미터 단위로 주어진다. 모든 사람의 키는 231 나노미터 보다 작다.

사람들이 서 있는 순서대로 입력이 주어진다.

출력
서로 볼 수 있는 쌍의 수를 출력한다.

예제 입력 1 
7
2
4
1
2
2
5
1
예제 출력 1 
10
*/
const fs = require("fs");
const [Nstr, ...HEIGHTS] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +Nstr;
const heights = HEIGHTS.map(Number);
const stack = [];
let result = 0;

for (let i = 0; i < n; i++) {
  let count = 1;

  while (stack.length && stack.at(-1)[0] <= heights[i]) {
    if (stack.at(-1)[0] === heights[i]) {
      count += stack.at(-1)[1];
      result += stack.at(-1)[1];
    } else {
      result += stack.at(-1)[1];
    }
    stack.pop();
  }

  if (stack.length) result++; // heights[i] 보다 큰 요소가 존재할 때, result + 1
  stack.push([heights[i], count]);

  // console.log(stack, result)
}

console.log(result);
