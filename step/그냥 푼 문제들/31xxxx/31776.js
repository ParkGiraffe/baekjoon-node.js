/*
예비 소집 결과 보고서
https://www.acmicpc.net/problem/31776

문제
PPC 본 대회 하루 전에는 참가 팀들의 환경 적응을 위한 예비 소집이 진행된다. 예비 소집에는 
$3$문제가 사용되었으며, 
$N$팀이 참여하였다. 각 문제와 팀에는 
$1$번부터 차례대로 번호가 붙어 있다. PPC 운영진들은 예비 소집이 얼마나 효과적이었는지 알아보기 위해 보고서를 작성해 보기로 했다.

예비 소집의 효과를 알아내기 위해서는 성실하게 참여한 팀의 수를 구해야 한다. 예비 소집에 성실하게 참여한 팀이란 다음과 같은 조건을 만족하는 팀이다.

세 문제 중 최소 하나를 해결하였다.
문제를 번호가 작은 것부터 해결하였다. 즉, 어떤 문제를 시간 
$T$에 해결했을 때 그보다 번호가 작은 문제들은 모두 해결하였으며 해결 시간이 
$T$ 이하이고, 그보다 번호가 큰 문제들은 해결하지 않았거나 해결 시간이 
$T$ 이상이어야 한다.
각 팀이 각 문제를 해결한 시간이 주어질 때, 예비 소집에 성실하게 참여한 팀의 수를 구하여라.

입력
첫 번째 줄에 예비 소집에 참여한 팀의 수 
$N$이 주어진다. (
$1\le N\le 100$)

두 번째 줄부터 
$N$개의 줄에 걸쳐 각각 
$i$번 팀이 
$1$번 문제, 
$2$번 문제, 
$3$번 문제를 해결한 시간을 의미하는 
$3$개의 정수 
$T_{i,1}, T_{i,2}, T_{i,3}$이 공백으로 구분되어 주어진다. 만약 
$i$번 팀이 
$j$번 문제를 해결하지 않았다면 
$T_{i,j} = -1$이다. (
$-1\le T_{i,j}\le 120$)

출력
예비 소집에 성실하게 참여한 팀의 수를 출력한다.

예제 입력 1 
6
1 2 3
1 -1 1
-1 -1 -1
0 4 -1
10 -1 -1
120 120 120
예제 출력 1 
4
1번, 4번, 5번, 6번 팀이 예비 소집에 성실하게 참여하였다.
*/
const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
let count = 0;

const checkOne = (a) => {
  if (a === -1) return false;
  else return true;
};

const checkTwo = (a, b, c) => {
  if (b === -1 && c === -1) return true;
  if (a <= b && c === -1) return true;
  if (a <= b && b <= c) return true;
  else return false;
};

second.forEach((e) => {
  const [one, two, three] = e.split(" ").map(Number);

  if (checkOne(one) && checkTwo(one, two, three)) count++;
});

console.log(count);
