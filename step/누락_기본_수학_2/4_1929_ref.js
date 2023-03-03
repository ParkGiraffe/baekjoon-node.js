/*
소수 구하기

에라스토텔레스의 체 풀이를 참고.
https://velog.io/@gkswn45/JavaScript-%EB%B0%B1%EC%A4%80-1929%EB%B2%88-%EC%86%8C%EC%88%98%EA%B5%AC%ED%95%98%EA%B8%B0


문제
M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 자연수 M과 N이 빈 칸을 사이에 두고 주어진다. (1 ≤ M ≤ N ≤ 1,000,000) M이상 N이하의 소수가 하나 이상 있는 입력만 주어진다.

출력
한 줄에 하나씩, 증가하는 순서대로 소수를 출력한다.

예제 입력 1 
3 16

예제 출력 1 
3
5
7
11
13

*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const n = +input[0];
const m = +input[1];
const primes = Array(m + 1).fill(true); // 0부터 m까지 true로 채워진 1차원 배열 생성
primes[0] = primes[1] = false; // 0과 1은 소수가 아니기에 false
let result = "";

// M(m) 까지의 에라스토텔레스 체 만들기
for (let i = 2; i <= Math.ceil(Math.sqrt(m)); i++) {
  if (primes[i]) {
    let j = 2; // 2의배수 부터 시작.
    while (i * j <= m) {
      primes[i * j] = false;
      j++;
    }
  }
}

// n부터 m까지 체 안의 true값들 빼내기.
for (let i = n; i <= m; i++) {
  if (primes[i]) result += i + "\n";
}

console.log(result);
