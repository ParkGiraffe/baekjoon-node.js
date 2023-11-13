const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const tCount = +first;
let cursor = 0;
let output = [];

for (let t = 0; t < tCount; t++) {
  const [n, m] = second[cursor++].split(" ").map(Number);
  output.push(n - 1);
  cursor += m;
}

console.log(output.join("\n"));
