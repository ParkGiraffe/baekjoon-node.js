/*
소수의 연속합
https://www.acmicpc.net/problem/1644

문제
하나 이상의 연속된 소수의 합으로 나타낼 수 있는 자연수들이 있다. 몇 가지 자연수의 예를 들어 보면 다음과 같다.

3 : 3 (한 가지)
41 : 2+3+5+7+11+13 = 11+13+17 = 41 (세 가지)
53 : 5+7+11+13+17 = 53 (두 가지)
하지만 연속된 소수의 합으로 나타낼 수 없는 자연수들도 있는데, 20이 그 예이다. 7+13을 계산하면 20이 되기는 하나 7과 13이 연속이 아니기에 적합한 표현이 아니다. 또한 한 소수는 반드시 한 번만 덧셈에 사용될 수 있기 때문에, 3+5+5+7과 같은 표현도 적합하지 않다.

자연수가 주어졌을 때, 이 자연수를 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 4,000,000)

출력
첫째 줄에 자연수 N을 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 출력한다.

예제 입력 1 
20
예제 출력 1 
0
예제 입력 2 
3
예제 출력 2 
1
예제 입력 3 
41
예제 출력 3 
3
예제 입력 4 
53
예제 출력 4 
2
*/
const fs = require("fs");
const n = +fs.readFileSync("/dev/stdin").toString().trim();

let start = 0;
let end = 1;

let result = 0;

const makePrimes = (n) => {
  const primes = [];
  const temp = [];

  for (let i = 2; i <= n; i++) temp[i] = i;

  for (let i = 2; i <= n; i++) {
    if (!temp[i]) continue;
    for (let j = 2 * i; j <= n; j += i) temp[j] = 0;
  }

  for (let i = 2; i <= n; i++) {
    if (temp[i]) primes.push(temp[i]);
  }

  return primes;
};

const primes = makePrimes(n);
let sum = primes[0];

// console.log(primes);

while (start < primes.length && end <= primes.length) {
  //   console.log(sum, n)
  if (sum <= n) {
    if (sum === n) result++;
    sum += primes[end++];
  } else {
    sum -= primes[start++];
  }
}

console.log(result);
