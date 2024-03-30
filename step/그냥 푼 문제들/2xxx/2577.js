const fs = require("fs");
const [a, b, c] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const abc = (a * b * c).toString().split("");
const memo = new Array(10).fill(0);

abc.forEach((e) => {
  const temp = +e;
  memo[temp]++;
});

console.log(memo.join("\n"));
