const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim();

const output = [];
for (let i = 1; i <= N; i++) {
  const temp = [];
  for (let j = 0; j < N - i; j++) {
    temp.push(" ");
  }

  for (let j = 0; j < 2 * i - 1; j++) {
    temp.push("*");
  }

  output.push(temp.join(""));
}

console.log(output.join('\n'));
