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
