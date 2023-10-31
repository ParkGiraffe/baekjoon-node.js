/*
유니온 파인드 공부하기 : https://ip99202.github.io/posts/%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C(Union-Find)/


집합의 표현
https://www.acmicpc.net/problem/1717


문제
초기에 
$n+1$개의 집합 
$\{0\}, \{1\}, \{2\}, \dots , \{n\}$이 있다. 여기에 합집합 연산과, 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하려고 한다.

집합을 표현하는 프로그램을 작성하시오.

입력
첫째 줄에 
$n$, 
$m$이 주어진다. 
$m$은 입력으로 주어지는 연산의 개수이다. 다음 
$m$개의 줄에는 각각의 연산이 주어진다. 합집합은 
$0$ 
$a$ 
$b$의 형태로 입력이 주어진다. 이는 
$a$가 포함되어 있는 집합과, 
$b$가 포함되어 있는 집합을 합친다는 의미이다. 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산은 
$1$ 
$a$ 
$b$의 형태로 입력이 주어진다. 이는 
$a$와 
$b$가 같은 집합에 포함되어 있는지를 확인하는 연산이다.

출력
1로 시작하는 입력에 대해서 
$a$와 
$b$가 같은 집합에 포함되어 있으면 "YES" 또는 "yes"를, 그렇지 않다면 "NO" 또는 "no"를 한 줄에 하나씩 출력한다.

제한
 
$1 ≤ n ≤ 1\,000\,000$ 
 
$1 ≤ m ≤ 100\,000$ 
 
$0 ≤ a, b ≤ n$ 
 
$a$, 
$b$는 정수
 
$a$와 
$b$는 같을 수도 있다.
예제 입력 1 
7 8
0 1 3
1 1 7
0 7 6
1 7 1
0 3 7
0 4 2
0 1 1
1 1 1
예제 출력 1 
NO
NO
YES

*/

/*
fs 모듈 사용하니 EACCES 런타임 에러 발생

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = first.split(" ").map(Number);
const parents = new Array(n + 1).fill(-1);
let output = [];

const find = (x) => {
  if (parents[x] === -1) return x;
  parents[x] = find(parents[x]);
  return parents[x];
};

const union = (a, b) => {
  let aParent = find(a);
  let bParent = find(b);

  if (aParent !== bParent) {
    parents[aParent] = bParent;
  }
};

second.forEach((e) => {
  const [type, a, b] = e.split(" ").map(Number);

  // 합집합
  if (type === 0) {
    union(a, b);
  }

  // 차집합 여부 확인
  if (type === 1) {
    if (find(a) === find(b)) output.push("YES");
    else output.push("No");
  }
});

console.log(output.join('\n'))
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

const solution = (input) => {
  const [n, m] = input.shift().split(" ").map(Number);
  const parents = new Array(n + 1).fill(-1);
  let output = [];

  const find = (x) => {
    if (parents[x] === -1) return x;
    parents[x] = find(parents[x]);
    return parents[x];
  };

  const union = (a, b) => {
    let aParent = find(a);
    let bParent = find(b);

    if (aParent !== bParent) {
      parents[aParent] = bParent;
    }
  };

  input.forEach((e) => {
    const [type, a, b] = e.split(" ").map(Number);

    // 합집합
    if (type === 0) {
      union(a, b);
    }

    // 차집합 여부 확인
    if (type === 1) {
      if (find(a) === find(b)) output.push("YES");
      else output.push("NO");
    }
  });

  console.log(output.join("\n"));
};
