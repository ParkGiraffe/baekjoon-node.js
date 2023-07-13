/*
다음 소수
https://www.acmicpc.net/problem/4134

문제
정수 n(0 ≤ n ≤ 4*109)가 주어졌을 때, n보다 크거나 같은 소수 중 가장 작은 소수 찾는 프로그램을 작성하시오.

입력
첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, 정수 n이 주어진다.

출력
각각의 테스트 케이스에 대해서 n보다 크거나 같은 소수 중 가장 작은 소수를 한 줄에 하나씩 출력한다.

예제 입력 1 
3
6
20
100
예제 출력 1 
7
23
101

*/

const fs = require("fs");
const [count, ...cases] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
let result = "";

const isPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

cases.forEach((e) => {
  let isFound = false;
  let temp = e;

  if (e <= 2) result += "2\n";
  // else if (e === 3) result += '3\n'
  else {
    while (!isFound) {
      if (isPrime(temp)) {
        result += temp + "\n";
        isFound = true;
      }

      temp++;
    }
  }
});

console.log(result);
