/*
집합
https://www.acmicpc.net/problem/11723

문제
비어있는 공집합 S가 주어졌을 때, 아래 연산을 수행하는 프로그램을 작성하시오.

add x: S에 x를 추가한다. (1 ≤ x ≤ 20) S에 x가 이미 있는 경우에는 연산을 무시한다.
remove x: S에서 x를 제거한다. (1 ≤ x ≤ 20) S에 x가 없는 경우에는 연산을 무시한다.
check x: S에 x가 있으면 1을, 없으면 0을 출력한다. (1 ≤ x ≤ 20)
toggle x: S에 x가 있으면 x를 제거하고, 없으면 x를 추가한다. (1 ≤ x ≤ 20)
all: S를 {1, 2, ..., 20} 으로 바꾼다.
empty: S를 공집합으로 바꾼다.
입력
첫째 줄에 수행해야 하는 연산의 수 M (1 ≤ M ≤ 3,000,000)이 주어진다.

둘째 줄부터 M개의 줄에 수행해야 하는 연산이 한 줄에 하나씩 주어진다.

출력
check 연산이 주어질때마다, 결과를 출력한다.

예제 입력 1 
26
add 1
add 2
check 1
check 2
check 3
remove 2
check 1
check 2
toggle 3
check 1
check 2
check 3
check 4
all
check 10
check 20
toggle 10
remove 20
check 10
check 20
empty
check 1
toggle 1
check 1
toggle 1
check 1

예제 출력 1 
1
1
0
1
0
1
0
1
0
1
1
0
0
0
1
0
*/

// 언어제한이 걸려서 nodejs로는 제출이 불가능하다.

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// 비트 연산자 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8_%EC%97%B0%EC%82%B0%EC%9E%90

const solve = (cmd, item) => {
  switch (cmd) {
    case "add":
      bit = bit | item;
      break;

    case "remove":
      if ((item & bit) === item) bit -= item;
      break;

    case "check":
      if ((item & bit) === item) output.push(1);
      else output.push(0);
      break;

    case "toggle":
      if ((item & bit) === item) bit -= item;
      else bit += item;
      break;

    case "all":
      bit = 0b11111111111111111111;
      break;

    case "empty":
      bit = 0;
      break;
  }
};

const output = [];
let bit = 0;

second.forEach((e) => {
  let [cmd, item] = e.split(" ");
  if (item) {
    item = Math.pow(2, item - 1);
  }

  solve(cmd, item);
});

console.log(output.join("\n"));
