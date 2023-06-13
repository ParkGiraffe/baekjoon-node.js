/*
쉬운 계단 수
https://www.acmicpc.net/problem/10844

문제
45656이란 수를 보자.

이 수는 인접한 모든 자리의 차이가 1이다. 이런 수를 계단 수라고 한다.

N이 주어질 때, 길이가 N인 계단 수가 총 몇 개 있는지 구해보자. 0으로 시작하는 수는 계단수가 아니다.

입력
첫째 줄에 N이 주어진다. N은 1보다 크거나 같고, 100보다 작거나 같은 자연수이다.

출력
첫째 줄에 정답을 1,000,000,000으로 나눈 나머지를 출력한다.

예제 입력 1 
1
예제 출력 1 
9
예제 입력 2 
2
예제 출력 2 
17

*/
const fs = require("fs");
const input = + fs.readFileSync("/dev/stdin").toString().trim();

/*
const dp = Array(input).fill([]);
dp[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(dp)

for (let i = 1; i < input; i++) {
    dp[i - 1].forEach(e => {
        // let length = + String(e).length;
        let last = + String(e).split('').at(-1);
        
        if (last === 9) {
            let pushElement = Number(e + '8');
            dp[i].push(pushElement)
        } else if (last === 0) {
            let pushElement = Number(e + '1');
            dp[i].push(pushElement)
        } else {
            let pushElement = Number(e + `${last + 1}`);
            dp[i].push(pushElement)
            pushElement = Number(e + `${last - 1}`);
            dp[i].push(pushElement)
        }
    })
}
// console.log(dp)

console.log(dp[input - 1].length % 1000000000)

*/

const dp =  Array.from(new Array(input + 1), () => new Array(10).fill(0));
const MOD = 1000000000;
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

for (let i = 2; i <= input; i++) {
    dp[i - 1].forEach((e, idx) => {
        // console.log(e, idx)
        if (idx === 0) {
            dp[i][idx + 1] += dp[i - 1][idx] % MOD
        } else if (idx === 9) {
            dp[i][idx - 1] += dp[i - 1][idx] % MOD
        } else {
            dp[i][idx + 1] += dp[i - 1][idx] % MOD
            dp[i][idx - 1] += dp[i - 1][idx] % MOD
        }
        
        
    })
}

console.log(dp[input].reduce((a, b) => a + b) % MOD);