/*
문제
두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A-B를 출력한다.

예제 입력 1 
3 2

예제 출력 1 
1
*/


const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = []
rl.on("line", function(line){
    input = line.split(' ').map((el) => parseInt(el));
    rl.close();
})
 
rl.on("close", function(){
    let A = input[0];
    let B = input[1];
    console.log(A-B);
})