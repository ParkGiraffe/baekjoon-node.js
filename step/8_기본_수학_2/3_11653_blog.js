/*
소인수분해

문제
정수 N이 주어졌을 때, 소인수분해하는 프로그램을 작성하시오.

입력
첫째 줄에 정수 N (1 ≤ N ≤ 10,000,000)이 주어진다.

출력
N의 소인수분해 결과를 한 줄에 하나씩 오름차순으로 출력한다. N이 1인 경우 아무것도 출력하지 않는다.

예제 입력 1 
72
예제 출력 1 
2
2
2
3
3

예제 입력 2 
3
예제 출력 2 
3

예제 입력 3 
6
예제 출력 3 
2
3

예제 입력 4 
2
예제 출력 4 
2

예제 입력 5 
9991
예제 출력 5 
97
103

*/

/*
-- 시간 초과 --
const fs = require("fs");
let input = +fs.readFileSync("/dev/stdin").toString().trim()

const primes  = [];
let result = '';

const getIsPrime = num => {
    if (num === 1) return false
    if (num < 4) return true; 
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    
    return true;
}



for (let i = 1; i <= input; i++) {
    if (getIsPrime(i)) primes.push(i);
}

if (primes.length === 0) {
    console.log('');
} else {
    while (input !== 1) {
        if (primes.length === 0) break;
        const prime = primes[0];
        // console.log(prime)
        
        if (input % prime === 0) {
            // result.push(prime);
            result += prime + '\n'
            input = input / prime
        } else {
            primes.shift();
        }
    }
}

console.log(result)
*/

// 오답노트: 따로 소수(Prime) 리스트를 만들지 않아도 된다. 이미 2를 소인수분해 하고 나면, 그 이후에 4나 8과 같은 애들이 분해할 값들은 남아있지 않기 때문이다.

const fs = require("fs");
let input = +fs.readFileSync("/dev/stdin").toString().trim();
let i = 2;
let result = "";

while (input !== 1) {
  if (input % i === 0) {
    result += i + "\n";
    input = input / i;
    continue;
  }
  i++;
}

console.log(result);
