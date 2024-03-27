/*
prlong longf
https://www.acmicpc.net/problem/28117

prlong longf 성공
시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
2 초 (추가 시간 없음)	1024 MB (추가 메모리 없음)	366	165	149	49.338%
문제
성서는 Bronze 5 난이도의 문제를 풀다가 틀렸습니다를 받았다.

계산 도중 수가 너무 커져서 오버플로우가 발생했다고 생각한 성서는 코드 에디터의 “찾기 및 바꾸기” 기능을 사용해서 코드의 int를 모두 동시에 long long으로 바꾸었는데, printf도 모두 prlong longf로 바뀌는 사고가 일어났다!

#include <stdio.h>

long long main(){
    long long n, res = 1;
    scanf("%d", &n);
    for(long long i = 1; i <= n; i++){
        res *= i;
    }
    prlong longf("%d\n", res);
    return 0;
}
스스로 코드를 고치기 귀찮았던 성서는 대회 참가자들에게 바뀐 코드를 주고 초기 상태로 복원해 달라고 부탁하려고 했지만, 주어진 코드에 따라 복원 방법이 유일하지 않을 수 있다는 사실을 깨달았다. 좋은 문제 아이디어를 발견한 성서는 2023 SCON에 다음과 같은 문제를 출제했다.

모든 int가 longlong으로 바뀐 문자열이 주어진다. 가능한 원래 문자열은 모두 몇 가지인가?

입력
첫째 줄에 바뀐 문자열의 길이 
$N$이 주어진다.

둘째 줄에 int가 모두 longlong으로 바뀐 길이 
$N$의 문자열이 주어진다.

출력
문자열의 초기 상태로 가능한 경우의 수를 출력한다.

제한
 
$1\leq N\leq 80$ 
주어진 문자열의 모든 문자는 알파벳 소문자이고, 공백을 포함하지 않는다.
주어진 문자열은 int를 부분 문자열로 갖지 않는다.
예제 입력 1 
15
prlonglonglongf
예제 출력 1 
3
가능한 초기 상태는 printlongf, prlongintf, prlonglonglongf로 총 3가지이다.

예제 입력 2 
15
longestpathtowf
예제 출력 2 
1
예제 입력 3 
22
longlongdoublelonglong
예제 출력 3 
4
*/

const fs = require("fs");
const [first, string] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +first;
const D = new Array(22).fill(-1);
D[0] = D[1] = 1;

const findLong = (i) => {
  if (
    string[i] === "l" &&
    string[i + 1] === "o" &&
    string[i + 2] === "n" &&
    string[i + 3] === "g"
  ) {
    return true;
  } else return false;
};

const initialD = (n) => {
  // dfs 방식.
  if (D[n] !== -1) return D[n];

  // if (n === 0 || n === 1) return (D[n] = 1); <- 오류 발생의 원인
  return (D[n] = initialD(n - 1) + initialD(n - 2));
};

// for (let i = 2; i < 22; i++) {
//   D[i] = D[i - 1] + D[i - 2];
// }

const searchString = () => {
  const arr = [];
  let temp = 0;

  // long이 연결된 정도 구하기.
  for (let i = 0; i < string.length - 2; i++) {
    if (string[i] === "l") {
      while (true) {
        if (findLong(i)) {
          temp++;
          i += 4;
        } else {
          break;
        }
      }
    }
    if (temp !== 0) {
      // res *= D[temp];
      arr.push(temp);
      temp = 0;
    }
  }

  // D 구하기
  const max = Math.max(...arr);
  initialD(max);

  // 문장의 수 구하기
  let res = 1;
  arr.forEach((e) => {
    res *= D[e];
  });
  return res;
};

console.log(searchString());
