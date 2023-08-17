/*
문자열 폭발
https://www.acmicpc.net/problem/9935

문제
상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.

폭발은 다음과 같은 과정으로 진행된다.

문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.
상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.

폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.

입력
첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.

둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.

두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.

출력
첫째 줄에 모든 폭발이 끝난 후 남은 문자열을 출력한다.

예제 입력 1 
mirkovC4nizCC44
C4
예제 출력 1 
mirkovniz
예제 입력 2 
12ab112ab2ab
12ab
예제 출력 2 
FRULA
*/

const fs = require("fs");
const [str, bombStr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const stack = [];
let top = "0";
const bombLen = bombStr.length;

for (let i = 0; i < str.length; i++) {
  top = str[i];
  stack.push(top);
  if (top === bombStr.at(-1)) {
    if (stack.slice(-bombLen).join("") === bombStr) stack.splice(-bombLen);
  }
}

console.log(stack.length === 0 ? "FRULA" : stack.join(""));
