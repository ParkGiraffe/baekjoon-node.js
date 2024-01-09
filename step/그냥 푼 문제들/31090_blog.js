/*
2023은 무엇이 특별할까?
https://www.acmicpc.net/problem/31090

문제
백준 온라인 저지의 송년대회 Good Bye, BOJ 2023!의 개최일은 2023년 12월 31일이다. 키파는 대회가 개최된다는 사실이 기뻐 2023과 2024를 뚫어져라 보다가 무언가 특별하다는 사실을 깨달았다.

그렇다. 내년의 연도인 2024가 올해 연도의 끝 두 자리인 23으로 나누어 떨어진다! 다음에도 이런 연도가 오려면 6년 뒤인 2029/2030년이 되어야 한다.

양의 정수 
$N$이 주어진다. 
$N$년과 
$N+1$년이 이러한 조건을 만족하는 관계인지 판별하는 프로그램을 작성하라.

입력
첫째 줄에 테스트 케이스의 개수 
$T$가 주어진다.

이후 
$T$개의 줄에 걸쳐 테스트 케이스가 한 줄에 하나씩 주어진다. 각 테스트 케이스는 한 줄로 구성되어 있으며, 각각 한 개의 양의 정수 
$N$이 주어진다.

출력
각 테스트 케이스에 대해, 
$N+1$이 
$N$의 끝 두 자리로 나누어 떨어진다면 Good을, 그렇지 않다면 Bye를 한 줄에 하나씩 차례로 출력하여라.

제한
 
$1\le T\le 8\, 910$ 
 
$1\, 000\le N\le 9\, 999$ 
 
$N$은 100의 배수가 아니다.
예제 입력 1 
3
2023
2024
2029
예제 출력 1 
Good
Bye
Good


*/
const fs = require("fs");
const [T, ...INPUTS] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let cursor = 0;
const t = +T;
const output = [];

const solve = (divided, dividing) => {
  if (divided % dividing === 0) output.push("Good");
  else output.push("Bye");
};

while (cursor < t) {
  const n = INPUTS[cursor++];
  const dividedN = +n + 1;
  const dividingN = Number(n.at(-2) + n.at(-1));

  solve(dividedN, dividingN);
}

console.log(output.join("\n"));
