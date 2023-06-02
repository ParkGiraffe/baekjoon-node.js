/*
01타일
https://www.acmicpc.net/problem/1904

문제
지원이에게 2진 수열을 가르쳐 주기 위해, 지원이 아버지는 그에게 타일들을 선물해주셨다. 그리고 이 각각의 타일들은 0 또는 1이 쓰여 있는 낱장의 타일들이다.

어느 날 짓궂은 동주가 지원이의 공부를 방해하기 위해 0이 쓰여진 낱장의 타일들을 붙여서 한 쌍으로 이루어진 00 타일들을 만들었다. 결국 현재 1 하나만으로 이루어진 타일 또는 0타일을 두 개 붙인 한 쌍의 00타일들만이 남게 되었다.

그러므로 지원이는 타일로 더 이상 크기가 N인 모든 2진 수열을 만들 수 없게 되었다. 예를 들어, N=1일 때 1만 만들 수 있고, N=2일 때는 00, 11을 만들 수 있다. (01, 10은 만들 수 없게 되었다.) 또한 N=4일 때는 0011, 0000, 1001, 1100, 1111 등 총 5개의 2진 수열을 만들 수 있다.

우리의 목표는 N이 주어졌을 때 지원이가 만들 수 있는 모든 가짓수를 세는 것이다. 단 타일들은 무한히 많은 것으로 가정하자.

입력
첫 번째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 1,000,000)

출력
첫 번째 줄에 지원이가 만들 수 있는 길이가 N인 모든 2진 수열의 개수를 15746으로 나눈 나머지를 출력한다.

예제 입력 1 
4
예제 출력 1 
5

*/
const fs = require("fs");
const n = +fs.readFileSync("/dev/stdin").toString().trim();
const arr = [];
arr[1] = 1;
arr[2] = 2;

for (let i = 3; i <= n; i++) {
  /*
    길이가 k인 경우는 길이가 k-2에서 00를 더한 경우 +

길이가 k-1에서 1을 더한 경우의 합으로 볼 수 있기 때문에

dp[1]=1,dp[2]=2로 두고 dp[k]=dp[k-1]+dp[k-2] 으로 점화식을 세워서 나타내면 피보나치 수열과 같게 됩니다
    */

  arr[i] = arr[i - 1] + arr[i - 2];

  //(A + B) % N = ((A % N) + (B % N)) % N 이러한 분배법칙이 성립한다. https://velog.io/@sw801733/%EB%82%98%EB%A8%B8%EC%A7%80-%EC%97%B0%EC%82%B0-%EB%B6%84%EB%B0%B0%EB%B2%95%EC%B9%99-%EB%AA%A8%EB%93%88%EB%9F%AC-%EC%97%B0%EC%82%B0

  if (arr[i] >= 15746) arr[i] = arr[i] % 15746;
}
// console.log(arr)

console.log(arr[n]);
