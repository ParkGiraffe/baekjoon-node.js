/*
제곱ㄴㄴ수
https://www.acmicpc.net/problem/1016

문제
어떤 정수 X가 1보다 큰 제곱수로 나누어 떨어지지 않을 때, 그 수를 제곱ㄴㄴ수라고 한다. 제곱수는 정수의 제곱이다. min과 max가 주어지면, min보다 크거나 같고, max보다 작거나 같은 제곱ㄴㄴ수가 몇 개 있는지 출력한다.

입력
첫째 줄에 두 정수 min과 max가 주어진다.

출력
첫째 줄에 min보다 크거나 같고, max보다 작거나 같은 제곱ㄴㄴ수의 개수를 출력한다.

제한
1 ≤ min ≤ 1,000,000,000,000
min ≤ max ≤ min + 1,000,000
예제 입력 1 
1 10
예제 출력 1 
7
예제 입력 2 
15 15
예제 출력 2 
1
예제 입력 3 
1 1000
예제 출력 3 
608

*/

const fs = require("fs");
const [min, max] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const isDivided = Array(1000001).fill(false); // max와 min 사이에 들어가는 최대 수, ㄴㄴ제곱이 아닌 수가 true.
let count = 0;

// 에라스토텔레스 체를 이용한 제곱 ㄴㄴ 체 만들기
for (let i = 2; i ** 2 <= max; i++) {
  let n = Math.ceil(min / i ** 2); // 걸러내기의 시작지점을 찾는 과정
  // 만약 제곱수에 의해 나눠진다면, 이후 아래의 코드에서 해당 숫자도 true로 지정된다.
  // 만약 안 나눠진다면, 반올림에 의해, 제곱수가되는 그 다음 숫자부터 시작해서 true로 걸러지게 한다.

  while (n * i ** 2 <= max) {
    isDivided[n * i ** 2 - min] = true; // 저장공간 최적화를 위해 -min
    n++;
  }
}

for (let i = 0; i <= max - min; i++) {
  if (!isDivided[i]) count++;
}

console.log(count);
