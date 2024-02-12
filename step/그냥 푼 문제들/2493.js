/*
시간초과 
const fs = require("fs");
const [N, TOPS] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +N;
const tops = TOPS.split(" ").map(Number);
const result = new Array(n - 1).fill(0);

for (let i = n - 1; i >= 0; i--) {
  const shootingTop = tops[i];

  for (let j = i - 1; j >= 0; j--) {
    const shotTop = tops[j];
    if (shootingTop <= shotTop) {
      result[i] = j + 1;
      break;
    }
  }
}

console.log(result.join(' '));
*/

const fs = require("fs");
const [N, TOPS] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const stack = [];
const n = +N;
const tops = TOPS.split(" ").map(Number);
const result = []; // [ [idx, length] ]

for (let i = 0; i < n; i++) {
  while (stack.length !== 0) {
    if (stack[stack.length - 1][1] > tops[i]) {
      result.push(stack[stack.length - 1][0]);
      break;
    }
    stack.pop();
  }

  if (stack.length === 0) result.push(0);
  stack.push([i + 1, tops[i]]);
}

console.log(result.join(" "));
