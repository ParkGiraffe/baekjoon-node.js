/*
영화감독 숌

https://www.acmicpc.net/problem/1436

문제
666은 종말을 나타내는 수라고 한다. 따라서, 많은 블록버스터 영화에서는 666이 들어간 제목을 많이 사용한다. 영화감독 숌은 세상의 종말 이라는 시리즈 영화의 감독이다. 조지 루카스는 스타워즈를 만들 때, 스타워즈 1, 스타워즈 2, 스타워즈 3, 스타워즈 4, 스타워즈 5, 스타워즈 6과 같이 이름을 지었고, 피터 잭슨은 반지의 제왕을 만들 때, 반지의 제왕 1, 반지의 제왕 2, 반지의 제왕 3과 같이 영화 제목을 지었다. 하지만 숌은 자신이 조지 루카스와 피터 잭슨을 뛰어넘는다는 것을 보여주기 위해서 영화 제목을 좀 다르게 만들기로 했다.

종말의 수란 어떤 수에 6이 적어도 3개 이상 연속으로 들어가는 수를 말한다. 제일 작은 종말의 수는 666이고, 그 다음으로 큰 수는 1666, 2666, 3666, .... 이다. 따라서, 숌은 첫 번째 영화의 제목은 "세상의 종말 666", 두 번째 영화의 제목은 "세상의 종말 1666"와 같이 이름을 지을 것이다. 일반화해서 생각하면, N번째 영화의 제목은 세상의 종말 (N번째로 작은 종말의 수) 와 같다.

숌이 만든 N번째 영화의 제목에 들어간 수를 출력하는 프로그램을 작성하시오. 숌은 이 시리즈를 항상 차례대로 만들고, 다른 영화는 만들지 않는다.

입력
첫째 줄에 N이 주어진다. N은 10,000보다 작거나 같은 자연수이다.

출력
첫째 줄에 N번째 영화의 제목에 들어간 수를 출력한다.

예제 입력 1 
2
예제 출력 1 
1666
예제 입력 2 
3
예제 출력 2 
2666
예제 입력 3 
6
예제 출력 3 
5666
예제 입력 4 
187
예제 출력 4 
66666
예제 입력 5 
500
예제 출력 5 
166699
*/


/*
const fs = require("fs");
const input = +fs.readFileSync("/dev/stdin").toString().trim();
let result = [6, 6, 6];
let cursor = 'front'; // 'end'
let frontIdx = 0;
let endIdx = 2;

for (let i = 0; i < input - 1; i++) {
    
    // console.log(frontIdx, endIdx)
    // console.log(result[frontIdx - 1]);
    
    if (cursor === 'front') {
        if (!result[frontIdx - 1]) {
            result.unshift(1);
            frontIdx++;
            endIdx++;
        }
        else {
            result[frontIdx - 1] ++;
        }
        
        
        if (result[frontIdx - 1] === 6) {
            cursor = 'end';
            frontIdx--;
            endIdx--;
        }
    }
    
    else if (cursor === 'end') {
        // result[endIdx + 1] ++;
        
        // if (result[endIdx + 1] === 9) {
        //     cursor = 'front';
        // }
        
        // console.log(result)
        let temp = [];
        let popCount = 0;
        let originalLength = result.length
        for (let j = 0; j < originalLength - endIdx - 1 ; j++) {
            let popped = result.pop()
            temp.unshift(popped);
            popCount++;
            // console.log(popCount)
        }
        
        // console.log(result)   
        
        let num = +temp.join('');
        num++;
        
        temp = num.toString().split('').map(e => +e);
        result = [...result, ...temp];
        
        let cursorChange = true;
        
        // console.log(num)
        num.toString().split('').forEach(e => {
            if (e !== '9') cursorChange = false
            
        })
        
        // console.log(cursorChange)
        if(cursorChange) {
            cursor = 'front';
        }
        // console.log(cursor)
    }
    
}

console.log(result);

// 52 - 666 699
// 53 - 666 6100


*/

const fs = require('fs');
const input = + fs.readFileSync('/dev/stdin').toString().trim();

let temp = 1;
let point = 666;

while (temp !== input) {
  point++;
  if (point.toString().includes('666')) {
    temp++;
  }
}

console.log(point);