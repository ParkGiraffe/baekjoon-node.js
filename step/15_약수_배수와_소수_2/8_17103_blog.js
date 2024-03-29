/*
골드바흐 파티션
https://www.acmicpc.net/problem/17103

문제
골드바흐의 추측: 2보다 큰 짝수는 두 소수의 합으로 나타낼 수 있다.
짝수 N을 두 소수의 합으로 나타내는 표현을 골드바흐 파티션이라고 한다. 짝수 N이 주어졌을 때, 골드바흐 파티션의 개수를 구해보자. 두 소수의 순서만 다른 것은 같은 파티션이다.

입력
첫째 줄에 테스트 케이스의 개수 T (1 ≤ T ≤ 100)가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, 정수 N은 짝수이고, 2 < N ≤ 1,000,000을 만족한다.

출력
각각의 테스트 케이스마다 골드바흐 파티션의 수를 출력한다.

예제 입력 1 
5
6
8
10
12
100
예제 출력 1 
1
1
2
1
6
*/

const fs = require("fs");
const [count, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let result = "";

// 입력값 중 최대값까지 에라스토텔레스 체 만들기
const max = Math.max(...input);
const primes = Array(max + 1).fill(true); // 0부터 m까지 true로 채워진 1차원 배열 생성
primes[0] = primes[1] = false; // 0과 1은 소수가 아니기에 false

for (let i = 2; i <= Math.ceil(Math.sqrt(max)); i++) {
  if (primes[i]) {
    let j = 2; // 2의배수 부터 시작.
    while (i * j <= max) {
      primes[i * j] = false;
      j++;
    }
  }
}

input.forEach((str) => {
  let e = +str;
  let half = Math.ceil(e / 2);
  let count = 0;

  for (let i = 2; i <= half; i++) {
    if (primes[i] && primes[e - i]) count++;
  }

  result += count + "\n";
});

console.log(result);
