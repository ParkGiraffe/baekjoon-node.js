/*
베르트랑 공준
https://www.acmicpc.net/problem/4948


문제
베르트랑 공준은 임의의 자연수 n에 대하여, n보다 크고, 2n보다 작거나 같은 소수는 적어도 하나 존재한다는 내용을 담고 있다.

이 명제는 조제프 베르트랑이 1845년에 추측했고, 파프누티 체비쇼프가 1850년에 증명했다.

예를 들어, 10보다 크고, 20보다 작거나 같은 소수는 4개가 있다. (11, 13, 17, 19) 또, 14보다 크고, 28보다 작거나 같은 소수는 3개가 있다. (17,19, 23)

자연수 n이 주어졌을 때, n보다 크고, 2n보다 작거나 같은 소수의 개수를 구하는 프로그램을 작성하시오. 

입력
입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 케이스는 n을 포함하는 한 줄로 이루어져 있다.

입력의 마지막에는 0이 주어진다.

출력
각 테스트 케이스에 대해서, n보다 크고, 2n보다 작거나 같은 소수의 개수를 출력한다.

제한
1 ≤ n ≤ 123,456

예제 입력 1 
1
10
13
100
1000
10000
100000
0

예제 출력 1 
1
4
3
21
135
1033
8392

*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let result = "";

for (let i = 0; i < input.length; i++) {
  const n = +input[i];
  if (n === 0) break;
  const primes = Array(2 * n + 1).fill(true); // 0부터 m까지 true로 채워진 1차원 배열 생성
  primes[0] = primes[1] = false; // 0과 1은 소수가 아니기에 false

  // M(m) 까지의 에라스토텔레스 체 만들기
  for (let i = 2; i <= Math.ceil(Math.sqrt(2 * n)); i++) {
    if (primes[i]) {
      let j = 2; // 2의배수 부터 시작.
      while (i * j <= 2 * n) {
        primes[i * j] = false;
        j++;
      }
    }
  }

  // n부터 m까지 체 안의 true값들 빼내기.
  let count = 0;
  for (let i = n + 1; i <= 2 * n; i++) {
    if (primes[i]) count++;
  }

  result += count + "\n";
}

console.log(result);
