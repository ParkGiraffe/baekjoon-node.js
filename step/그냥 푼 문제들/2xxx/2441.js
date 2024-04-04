const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim();

const output = [];
for (let i = 1; i <= N; i++) {
  const temp = [];
  for (let j = 0; j < i - 1; j++) {
    temp.push(" ");
  }

  for (let j = 0; j < N - i + 1; j++) {
    temp.push("*");
  }

  output.push(temp.join(""));
}

console.log(output.join("\n"));
