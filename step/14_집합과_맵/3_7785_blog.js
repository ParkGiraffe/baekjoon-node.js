/*
회사에 있는 사람
https://www.acmicpc.net/problem/7785

문제
상근이는 세계적인 소프트웨어 회사 기글에서 일한다. 이 회사의 가장 큰 특징은 자유로운 출퇴근 시간이다. 따라서, 직원들은 반드시 9시부터 6시까지 회사에 있지 않아도 된다.

각 직원은 자기가 원할 때 출근할 수 있고, 아무때나 퇴근할 수 있다.

상근이는 모든 사람의 출입카드 시스템의 로그를 가지고 있다. 이 로그는 어떤 사람이 회사에 들어왔는지, 나갔는지가 기록되어져 있다. 로그가 주어졌을 때, 현재 회사에 있는 모든 사람을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 로그에 기록된 출입 기록의 수 n이 주어진다. (2 ≤ n ≤ 106) 다음 n개의 줄에는 출입 기록이 순서대로 주어지며, 각 사람의 이름이 주어지고 "enter"나 "leave"가 주어진다. "enter"인 경우는 출근, "leave"인 경우는 퇴근이다.

회사에는 동명이인이 없으며, 대소문자가 다른 경우에는 다른 이름이다. 사람들의 이름은 알파벳 대소문자로 구성된 5글자 이하의 문자열이다.

출력
현재 회사에 있는 사람의 이름을 사전 순의 역순으로 한 줄에 한 명씩 출력한다.

예제 입력 1 
4
Baha enter
Askar enter
Baha leave
Artem enter
예제 출력 1 
Askar
Artem


// 반례
4
Bahads enter
Artem enter
Bahads leave
Artemdsaf enter

Artem까지 동일하고, 그 이후에 글자가 없는 경우를 걸러내야 한다. charCodeAt()은 String 메소드라서 undefined에는 작동을 안 해 error가 발생하기 때문이다.
*/

const fs = require("fs");
const [n, ...input]= fs.readFileSync("/dev/stdin").toString().trim().split('\n');
let work = new Set();
// let output = '';

input.forEach(e => {
    const [name, action] = e.split(' ');
    
    if (action === 'enter') {
        work.add(name);
    } else {
        work.delete(name);
    }
});

console.log([...work].sort((a, b) => {
  let length = a.length >= b.length ? a.length : b.length;
  
  for (let i = 0; i < length; i++) {
      
    // 반례에 필요한 부분
    if (!b[i]) return -1
    if (!a[i]) return 1
    
    if (a[i].charCodeAt() - b[i].charCodeAt() > 0) {
      return -1;
        
    } else if (a[i].charCodeAt() - b[i].charCodeAt() < 0) {
      return 1;
    }
    
  }
}).join('\n'));