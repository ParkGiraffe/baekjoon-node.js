/*
단어 정렬
https://www.acmicpc.net/problem/1181

문제
알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.

길이가 짧은 것부터
길이가 같으면 사전 순으로
단, 중복된 단어는 하나만 남기고 제거해야 한다.

입력
첫째 줄에 단어의 개수 N이 주어진다. (1 ≤ N ≤ 20,000) 둘째 줄부터 N개의 줄에 걸쳐 알파벳 소문자로 이루어진 단어가 한 줄에 하나씩 주어진다. 주어지는 문자열의 길이는 50을 넘지 않는다.

출력
조건에 따라 정렬하여 단어들을 출력한다.

예제 입력 1 
13
but
i
wont
hesitate
no
more
no
more
it
cannot
wait
im
yours

예제 출력 1 
i
im
it
no
but
more
wait
wont
yours
cannot
hesitate

*/
const fs = require("fs");
const [n, ...strs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const setOrder = (a, b, n) => {
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      return a[i].charCodeAt() - b[i].charCodeAt();
    }
  }
};

strs.sort((a, b) => {
  if (a.length === b.length) return setOrder(a, b, a.length);
  return a.length - b.length;
});

for (let i = 0; i < strs.length - 1; i++) {
  if (strs[i] === strs[i + 1]) strs[i] = "";
}

let result = strs.filter((e) => e !== "");

console.log(result.join("\n"));
