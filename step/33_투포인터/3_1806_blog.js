const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, s] = first.split(" ").map(Number);
const seq = second.split(" ").map(Number);

let start = 0;
let end = 0;
let sum = seq[0];
let result = n + 1;

while (start < n) {
  if (sum >= s) {
    let temp = end - start + 1;

    if (temp < result) result = temp;
    sum -= seq[start++];
  } else {
    end++;

    if (end === n) break;
    else sum += seq[end];
  }
}

console.log(result === n + 1 ? 0 : result);
