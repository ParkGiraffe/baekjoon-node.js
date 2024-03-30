const fs = require("fs");
const [N, ...INPUT] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +N;
const stack = [];
const workList = [];

INPUT.forEach((e) => {
  if (e === "0") workList.push(0);
  else workList.push(e.split(" ").map(Number));
});

let cursor = 0;
let grade = 0;

while (cursor !== n) {
  if (workList[cursor] === 0) {
    if (stack.length) {
      stack[stack.length - 1][2]--;

      if (stack[stack.length - 1][2] === 0) {
        grade += stack[stack.length - 1][1];
        stack.pop();
      }
    }
  } else {
    stack.push(workList[cursor]);
    stack[stack.length - 1][2]--;

    if (stack[stack.length - 1][2] === 0) {
      grade += stack[stack.length - 1][1];
      stack.pop();
    }
  }

  cursor++;
}

console.log(grade);
