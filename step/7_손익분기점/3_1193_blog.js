/*
분수찾기

그림참고 필요 : https://www.acmicpc.net/problem/1193

이와 같이 나열된 분수들을 1/1 → 1/2 → 2/1 → 3/1 → 2/2 → … 과 같은 지그재그 순서로 차례대로 1번, 2번, 3번, 4번, 5번, … 분수라고 하자.

X가 주어졌을 때, X번째 분수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 X(1 ≤ X ≤ 10,000,000)가 주어진다.

출력
첫째 줄에 분수를 출력한다.

예제 입력 1 
1
예제 출력 1 
1/1
예제 입력 2 
2
예제 출력 2 
1/2
예제 입력 3 
3
예제 출력 3 
2/1
예제 입력 4 
4
예제 출력 4 
3/1
예제 입력 5 
5
예제 출력 5 
2/2
예제 입력 6 
6
예제 출력 6 
1/3
예제 입력 7 
7
예제 출력 7 
1/4
예제 입력 8 
8
예제 출력 8 
2/3
예제 입력 9 
9
예제 출력 9 
3/2
예제 입력 10 
14
예제 출력 10 
2/4

풀이 : 
표에서 짝수층은 아래로 홀수층은 위로 간다. 
floor_max_num과 입력값을 비교해서 몇 층인지를 계산
각 층에서 얼마만큼 이동해야 하는 지를 loop에 저장.
짝수와 홀수에 따라 분수와 분자값을 잘 설정한다.

*/
const fs = require("fs");
const input = +fs.readFileSync("/dev/stdin").toString().trim();

let floor = 1;
let floor_max_num = 1;

while (!(floor_max_num >= input)) {
  floor++;
  floor_max_num += floor;
}
// console.log(floor, floor_max_num);

const isEven = floor % 2 === 0;
const loop = floor - (floor_max_num - input) - 1;
// console.log(isEven, loop)

let denom = isEven ? floor : 1; // 분모
let numer = isEven ? 1 : floor; // 분자

for (let i = 0; i < loop; i++) {
  // console.log(numer, denom)
  if (isEven) {
    numer++;
    denom--;
  } else {
    numer--;
    denom++;
  }
}

console.log(`${numer}/${denom}`);
