/*
피보나치 수 6
https://www.acmicpc.net/problem/11444

문제
피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 n이 주어진다. n은 1,000,000,000,000,000,000보다 작거나 같은 자연수이다.

출력
첫째 줄에 n번째 피보나치 수를 1,000,000,007으로 나눈 나머지를 출력한다.

예제 입력 1 
1000
예제 출력 1 
517691607

*/

const fs = require("fs");
const n = BigInt(fs.readFileSync("/dev/stdin").toString().trim().split(" "));

const F = [0, 1, 1];
const DIV = 1000000007n;

const fibo = (n) => {
  if (n === 0n) return 0n;
  if (n === 1n) return 1n;
  if (n === 2n) return 1n;
  if (F[n]) return F[n];

  /*
  F[2n] = F[n]x(2F[n-1] + F[n])
  F[2n+1] = F[n+1]^2 + F[n]^2
  
  -> 

  F[n] = F[n/2]x(2F[n/2-1] + F[n/2])
  F[n] = F[(n+1)/2]^2 + F[(n-1)/2]^2
*/

  // n이 짝수일 경우
  if (n % 2n === 0n) {
    const m = n / 2n;
    const temp1 = fibo(m - 1n); // F[m - 1]
    const temp2 = fibo(m); // F[m]
    F[n] = ((2n * temp1 + temp2) * temp2) % DIV;
    return F[n];
  } else {
    const m = (n + 1n) / 2n;
    const temp1 = fibo(m); // F[m]
    const temp2 = fibo(m - 1n); // F[m - 1]
    F[n] = (temp1 * temp1 + temp2 * temp2) % DIV;
    return F[n];
  }
};

console.log(Number(fibo(n)));
