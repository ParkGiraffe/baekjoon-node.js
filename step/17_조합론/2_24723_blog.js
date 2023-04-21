/*
녹색거탑
입력
녹색거탑의 높이를 나타내는 정수 
$N$이 주어진다. (
$1 \leq N \leq 5$)

출력
녹색거탑의 정상에서 바닥으로 내려오는 경우의 수를 출력한다.



*/

const fs = require("fs");
const input = +fs.readFileSync("/dev/stdin").toString().trim();
console.log(2 ** input);
