/*
선택 정렬의 이동 거리 성공
https://www.acmicpc.net/problem/28116


문제
 
$1$부터 
$N$까지의 정수가 한 번씩 등장하는 수열 
$A$가 주어진다. 이 수열에서 선택 정렬 알고리즘을 수행할 때, 각 수의 이동 거리를 출력하라.

선택 정렬 알고리즘이 무엇인지 잘 모르는 친구들은 친절한 주원이가 준비한 아래 설명을 읽어보도록 하자.

길이가 
$N$인 수열 
$A=\left\{ A_1,A_2,\cdots ,A_N \right\}$을 오름차순으로 정렬하는 선택 정렬 알고리즘은 아래 동작을 
$N-1$번 반복해서 수행한다.
지금이 
$i$번째 동작이라면, 
$A_i,A_{i+1},\cdots ,A_N$ 중 최솟값 
$A_j$를 찾는다.
 
$A_i$와 
$A_j$의 위치를 교환한다. 이때 
$A_i$와 
$A_j$의 이동 거리가 각각 
$(j-i)$만큼 증가한다.
예를 들어 
$\left\{ 1,3,5,2,4 \right\}$와 같은 수열이 주어졌다고 하자. 처음에 모든 수의 이동 거리는 
$0$으로 같다. 선택 정렬 알고리즘은 다음과 같은 과정을 거쳐 수행된다.

 
$A_1=1$과 
$A_1=1$을 교환해서 
$\left\{ 1,3,5,2,4 \right\}$가 된다. 이때 
$1$의 이동 거리는 
$0$만큼 증가한다.
 
$A_2=3$과 
$A_4=2$를 교환해서 
$\left\{ 1,2,5,3,4 \right\}$가 된다. 이때 
$2$와 
$3$의 이동 거리는 
$2$만큼 증가한다.
 
$A_3=5$와 
$A_4=3$을 교환해서 
$\left\{ 1,2,3,5,4 \right\}$가 된다. 이때 
$3$과 
$5$의 이동 거리는 
$1$만큼 증가한다.
 
$A_4=5$와 
$A_5=4$를 교환해서 
$\left\{ 1,2,3,4,5 \right\}$가 된다. 이때 
$4$와 
$5$의 이동 거리는 
$1$만큼 증가한다.
따라서 
$1$은 
$0$만큼, 
$2$는 
$2$만큼, 
$3$은 
$3$만큼, 
$4$는 
$1$만큼, 
$5$는 
$2$만큼 이동한다.

입력
첫째 줄에 수열의 길이 
$N$이 주어진다.

둘째 줄에 수열의 원소 
$A_1,A_2,\cdots ,A_N$이 차례대로 공백으로 구분되어 주어진다.

출력
첫째 줄에 
$N$개의 정수를 공백으로 구분하여 출력한다. 
$i$번째 정수는 
$i$의 이동 거리를 의미한다.

제한
 
$1\leq N\leq 5\times 10^5$ 
 
$A$에는 
$1$부터 
$N$까지의 정수가 정확히 한 번씩 등장한다.
예제 입력 1 
5
1 2 3 4 5
예제 출력 1 
0 0 0 0 0
예제 입력 2 
5
1 3 5 2 4
예제 출력 2 
0 2 3 1 2
*/

const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +first;
const A = second.split(" ").map(Number);
const Acount = new Array(N).fill(0);
const numInfo = new Array(N);

// const change = (i, j) => {
//   const temp = A[i];
//   A[i] = A[j];
//   A[j] = temp;

//   const countTemp = Acount[i];
//   Acount[i] = Acount[j];
//   Acount[j] = countTemp;

//   const difference = Math.abs(j - i);

//   Acount[i] += difference;
//   Acount[j] += difference;
// };

// for (let i = 0; i < N - 1; i++) {
//   let minIdx = i;

//   for (let j = i + 1; j < N; j++) {
//     if (A[j] < A[minIdx]) minIdx = j;
//   }

//   change(i, minIdx);
//   // console.log(Acount);
// }

// let num = 1;
// for (let i = 0; i < N - 1; i++) {
//   if (A[i] !== num) {
//     const location = A.findIndex((e) => e === num);
//     change(i, location);
//   }
//   num++;
//   // console.log(A, Acount);
// }

for (let i = 0; i < N; i++) {
  numInfo[A[i] - 1] = i; // 특정 숫자가 몇 번 인덱스에 있는 지를 저장.
}

for (let i = 0; i < N; i++) {
  if (A[i] === i + 1) continue;

  const targetIndex = numInfo[i];

  Acount[A[i] - 1] += targetIndex - i;
  Acount[i] += targetIndex - i;

  numInfo[i] = i;
  numInfo[A[i] - 1] = targetIndex;

  A[targetIndex] = A[i];
  A[i] = i;
}

// console.log(A);
console.log(Acount.join(" "));
