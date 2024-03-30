const fs = require("fs");
const n = +fs.readFileSync("/dev/stdin").toString().trim();

let output = [];

for (let i = 1; i <= n; i++) {
  output.push(i);
}

console.log(output.join("\n"));
