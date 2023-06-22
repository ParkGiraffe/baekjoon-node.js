/*
구간 합 구하기 4
https://www.acmicpc.net/problem/11659

문제
수 N개가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 수의 개수 N과 합을 구해야 하는 횟수 M이 주어진다. 둘째 줄에는 N개의 수가 주어진다. 수는 1,000보다 작거나 같은 자연수이다. 셋째 줄부터 M개의 줄에는 합을 구해야 하는 구간 i와 j가 주어진다.

출력
총 M개의 줄에 입력으로 주어진 i번째 수부터 j번째 수까지 합을 출력한다.

제한
1 ≤ N ≤ 100,000
1 ≤ M ≤ 100,000
1 ≤ i ≤ j ≤ N
예제 입력 1 
5 3
5 4 3 2 1
1 3
2 4
5 5
예제 출력 1 
12
9
1

*/

/*
오답 - 시간초과 

const fs = require("fs");
const [NnM, ARR, ...INPUT] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = NnM.split(' ').map(Number);
const arr = ARR.split(' ').map(Number);

let result = '';

input = [];
INPUT.forEach(e => {
    input.push(e.split(' ').map(Number));
})

for (let i = 0; i < m; i++) {
    let sum = 0;
    
    // console.log(input[i][0], input[i][1])
    
    for (let j = input[i][0] - 1; j < input[i][1]; j++) {
        sum += arr[j];
    }
    
    result += sum + '\n'
}

console.log(result);

*/

/* 정답 */
const fs = require("fs");
const [NnM, ARR, ...INPUT] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = NnM.split(" ").map(Number);
const arr = ARR.split(" ").map(Number);

let result = "";

input = [];
INPUT.forEach((e) => {
  input.push(e.split(" ").map(Number));
});

const dp = [0];

arr.forEach((v, i) => {
  dp[i + 1] = dp[i] + v;
});

input.forEach((e) => {
  // console.log(e)
  result += `${dp[e[1]] - dp[e[0] - 1]}\n`;
});

console.log(result);
