const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const seq = second
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let start = 0;
let end = n - 1;
let dif = Infinity;
let result = [0, 0];

// console.log(seq);

while (start !== end) {
  let temp = seq[start] + seq[end];
  let absTemp = Math.abs(temp);
  //   console.log(start, end, temp)

  if (absTemp < dif) {
    dif = absTemp;
    result[0] = seq[start];
    result[1] = seq[end];

    if (temp === 0) break;
  }

  if (temp < 0) start++;
  else end--;
}

console.log(result.join(" "));
