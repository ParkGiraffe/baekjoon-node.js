/*
가로수
https://www.acmicpc.net/problem/2485

문제
직선으로 되어있는 도로의 한 편에 가로수가 임의의 간격으로 심어져있다. KOI 시에서는 가로수들이 모두 같은 간격이 되도록 가로수를 추가로 심는 사업을 추진하고 있다. KOI 시에서는 예산문제로 가능한 한 가장 적은 수의 나무를 심고 싶다.

편의상 가로수의 위치는 기준점으로 부터 떨어져 있는 거리로 표현되며, 가로수의 위치는 모두 양의 정수이다.

예를 들어, 가로수가 (1, 3, 7, 13)의 위치에 있다면 (5, 9, 11)의 위치에 가로수를 더 심으면 모든 가로수들의 간격이 같게 된다. 또한, 가로수가 (2, 6, 12, 18)에 있다면 (4, 8, 10, 14, 16)에 가로수를 더 심어야 한다.

심어져 있는 가로수의 위치가 주어질 때, 모든 가로수가 같은 간격이 되도록 새로 심어야 하는 가로수의 최소수를 구하는 프로그램을 작성하라. 단, 추가되는 나무는 기존의 나무들 사이에만 심을 수 있다.

입력
첫째 줄에는 이미 심어져 있는 가로수의 수를 나타내는 하나의 정수 N이 주어진다(3 ≤ N ≤ 100,000). 둘째 줄부터 N개의 줄에는 각 줄마다 심어져 있는 가로수의 위치가 양의 정수로 주어지며, 가로수의 위치를 나타내는 정수는 1,000,000,000 이하이다. 가로수의 위치를 나타내는 정수는 모두 다르다.

출력
모든 가로수가 같은 간격이 되도록 새로 심어야 하는 가로수의 최소수를 첫 번째 줄에 출력한다.

예제 입력 1 
4
1
3
7
13
예제 출력 1 
3
예제 입력 2 
4
2
6
12
18
예제 출력 2 
5

*/
/*
const fs = require("fs");
const [count, ...strInput] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const input = strInput.map(Number);

const getGcd = (x, y) => {
  // console.log(x, y)
  if (y == 0) return x;
  else return getGcd(y, x % y);
};

const dist = [];
for (let i = 0; i < count - 1; i++) {
  dist.push(input[i + 1] - input[i]);
}

let gcd = input[count - 1];
for (let i = 0; i < count - 2; i++) {
  let tempGcd = getGcd(dist[i + 1], dist[i]);
  if (tempGcd < gcd) gcd = tempGcd;
}

// console.log(gcd);

let output = 0;

for (let i = 0; i < count - 1; i++) {
  // const tempDis = input[i + 1] - input[i];
  const tempDis = dist[i];

  if (tempDis !== gcd) {
    output += tempDis / gcd - 1;
  }
}

console.log(output);

*/

// 2023-8-9 문제 업데이트 및 재채점으로 코드 수정
const fs = require("fs");
const [count, ...strInput] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const input = strInput.map(Number);

const getGcd = (x, y) => {
  // console.log(x, y)
  if (y == 0) return x;
  else return getGcd(y, x % y);
};

const dist = [];
for (let i = 0; i < count - 1; i++) {
  dist.push(input[i + 1] - input[i]);
}

let gcd = dist[0];
for (let i = 1; i < dist.length; i++) {
  if (gcd > dist[i]) gcd = getGcd(gcd, dist[i]);
  else if (gcd < dist[i]) gcd = getGcd(dist[i], gcd);
}

// console.log(gcd);

let output = 0;

for (let i = 0; i < count - 1; i++) {
  // const tempDis = input[i + 1] - input[i];
  const tempDis = dist[i];

  if (tempDis !== gcd) {
    output += tempDis / gcd - 1;
  }
}

console.log(output);
