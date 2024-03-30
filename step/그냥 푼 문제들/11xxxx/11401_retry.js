/*
이항 계수3
https://www.acmicpc.net/problem/11401

문제
자연수 
\(N\)과 정수 
\(K\)가 주어졌을 때 이항 계수 
\(\binom{N}{K}\)를 1,000,000,007로 나눈 나머지를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 
\(N\)과 
\(K\)가 주어진다. (1 ≤ 
\(N\) ≤ 4,000,000, 0 ≤ 
\(K\) ≤ 
\(N\))

출력
 
\(\binom{N}{K}\)를 1,000,000,007로 나눈 나머지를 출력한다.

예제 입력 1 
5 2
예제 출력 1 
10
*/

const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);

// 팩토리얼에서 계산값이 겉잡을 수 없이 커지기 때문에 bigInt 사용
// 안 쓰면 결과가 이상하게 나옴
const p = 1000000007n;
const numP = 1000000007;

// 팩토리얼 값 계산
// n : bigInt
const getFactorial = (n) => {
  let cur = 1n;
  for (let i = 2n; i < n + 1n; i++) {
    cur = (cur * i) % p;
  }

  return cur;
};

// 거듭제곱 계산
// n : bigInt, k : number
const getSquare = (n, k) => {
  if (k === 0) return 1n;
  else if (k === 1) return n;

  let cur = getSquare(n, Math.floor(k / 2));

  if (k % 2) return (cur * cur * n) % p;
  else return (cur * cur) % p;
};

const top = getFactorial(n);
const bottom = getSquare((getFactorial(n - k) * getFactorial(k)) % p, numP - 2);

// 페르마의 소정리를 이용해서 조합 공식 곱셈 형태로 변형
const result = (top * bottom) % p;
console.log(`${result}`);
