/*
등차수열의 합
https://www.acmicpc.net/problem/28115

문제
수학과 전공과목인 조합론을 수강하는 정휘는 등차수열의 합 공식에 대해 배우고 있다. 2023 SCON 대회 개최가 일주일 남았지만, 아직 문제를 절반도 만들지 못해 발등에 불이 떨어진 정휘는 화장실에 가는 척을 하면서 정보과학관에 달려와 등차수열에 관한 문제를 만들었다.

길이가 
$N$인 수열 
$A$가 주어졌을 때, 
$1\le i\le N$에 대해 
$A_i=B_i+C_i$를 만족하고 길이가 
$N$인 두 등차수열 
$B,C$를 구하라.

등차수열의 정의는 다음과 같다.

어떤 수열 
$A=\left\{ A_1,A_2,\cdots ,A_N \right\}$이 등차수열이라는 것은, 
$2\leq i\leq N$인 모든 
$i$에 대해 
$A_i-A_{i-1}$이 모두 동일한 수열을 말한다. 정의에 따라 길이가 
$2$ 이하인 수열은 항상 등차수열이다.
입력
첫째 줄에 수열 
$A$의 길이 
$N$이 주어진다.

둘째 줄에 수열 
$A$의 원소 
$A_1,A_2,\cdots ,A_N$이 순서대로 공백으로 구분되어 주어진다.

출력
만약 모든 
$1\leq i\leq N$에 대해 
$A_i=B_i+C_i$인 길이가 
$N$인 두 등차수열 
$B,C$가 존재하지 않으면 첫째 줄에 NO를 출력한다.

그렇지 않으면 첫째 줄에 YES를 출력한다. 이후 둘째 줄에 
$B$의 원소를, 셋째 줄에 
$C$의 원소를 차례대로 공백으로 구분해서 출력한다. 가능한 수열 
$B,C$가 여럿인 경우, 아무거나 하나만 출력한다. 수열 
$B,C$가 존재할 경우, 문제의 제한을 만족하는 출력이 존재한다는 것을 증명할 수 있다.

제한
 
$1\leq N\leq 10^5$ 
 
$-10^9\leq A_i\leq 10^9$ 
$(1\le i\le N)$ 
 
$-10^{18}\leq B_i,C_i\leq 10^{18}$ 
$(1\le i\le N)$ 
 
$A_i$, 
$B_i$, 
$C_i$는 모두 정수 
$(1\le i\le N)$ 
예제 입력 1 
4
1 2 3 4
예제 출력 1 
YES
2 4 6 8
-1 -2 -3 -4
예제 입력 2 
3
1 2 1
예제 출력 2 
NO
예제 입력 3 
1
0
예제 출력 3 
YES
-3
3
*/

const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// A가 등차수열이 맞는가 탐색.
// A의 r값에 따라, B와 C의 값 만들기.

const n = +first;
const A = second.split(" ").map(Number);
const B = [];
const C = [];
const d = A[1] - A[0]; // 공차

const checkValidate = () => {
  for (let i = 0; i < n - 1; i++) {
    if (d !== A[i + 1] - A[i]) return false;
  }
  return true;
};

const makeBnC = () => {
  for (let i = 0; i < n; i++) {
    B.push(A[i]);
    C.push(0);
  }
};

// n이 1 또는 2일 때의 예외처리를 안 하면 80%쯤에서 런타임 에러 발생.
if (n === 1) {
  console.log("YES");
  console.log(`${A[0]}`);
  console.log("0");
} else if (n === 2) {
  console.log("YES");
  console.log(`${A[0]} ${A[1]}`);
  console.log("0 0");
} else if (n >= 3) {
  if (checkValidate()) {
    makeBnC();
    console.log("YES");
    console.log(B.join(" "));
    console.log(C.join(" "));
  } else {
    console.log("NO");
  }
}
