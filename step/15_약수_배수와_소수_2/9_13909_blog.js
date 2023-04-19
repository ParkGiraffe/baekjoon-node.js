/*
창문 닫기
https://www.acmicpc.net/problem/13909

문제
서강대학교 컴퓨터공학과 실습실 R912호에는 현재 N개의 창문이 있고 또 N명의 사람이 있다. 1번째 사람은 1의 배수 번째 창문을 열려 있으면 닫고 닫혀 있으면 연다.  2번째 사람은 2의 배수 번째 창문을 열려 있으면 닫고 닫혀 있으면 연다. 이러한 행동을 N번째 사람까지 진행한 후 열려 있는 창문의 개수를 구하라. 단, 처음에 모든 창문은 닫혀 있다.

예를 들어 현재 3개의 창문이 있고 3명의 사람이 있을 때,

1번째 사람은 1의 배수인 1,2,3번 창문을 연다. (1, 1, 1)
2번째 사람은 2의 배수인 2번 창문을 닫는다. (1, 0, 1)
3번째 사람은 3의 배수인 3번 창문을 닫는다. (1, 0, 0)
결과적으로 마지막에 열려 있는 창문의 개수는 1개 이다.

입력
첫 번째 줄에는 창문의 개수와 사람의 수 N(1 ≤ N ≤ 2,100,000,000)이 주어진다.

출력
마지막에 열려 있는 창문의 개수를 출력한다.

예제 입력 1 
3
예제 출력 1 
1
예제 입력 2 
24
예제 출력 2 
4

*/

/*
메모리 초과 코드

const fs = require("fs");
const input = +fs.readFileSync("/dev/stdin").toString().trim();
const windows = Array(input + 1).fill(false);


const execute = (n) => {
    for (let i = 1; n * i <= input; i++) {
        windows[n * i] ? windows[n * i] = false : windows[n * i] = true;
    }
}


for (let i = 1; i <= input; i++) {
    execute(i);
}

windows.shift();

console.log(windows.filter(e => e === true).length);

*/


/**
 * 규칙 찾기
 * 1 ~ 3 : 1
 * 4 ~ 8 : 2
 * 9 ~ 15 : 3
 * 16 ~24 : 4
 * 25 : 5
 * 
 * -> 제곱근의 정수 부분
 * 
 * n 번째 창문이 열려 있으려면, 그 창문을 열고 닫은 횟수가 홀수번이어야 한다. 
* 그럴려면 약수의 갯수가 3개여야 한다.
n = 4일 경우,
1번째 사람, 2번째 사람, 4번째 사람이 4번째 문을 열고 닫고 연다.

n = 9일 경우,
1번째 사람, 3번째 사람, 9번째 사람이 9번째 문을 열고 닫고 연다.

따라서 약수의 갯수가 3인 n번째 창문이 열려있다.
그리고 약수의 갯수가 3이려면 제곱수여야 한다.

따라서 1, 4, 9, 16 ,25 ....를 기점으로 열린 창문의 갯수가 하나씩 추가된다.
 */

const fs = require("fs");
const input = +fs.readFileSync("/dev/stdin").toString().trim();
console.log(Math.floor(Math.sqrt(input)));