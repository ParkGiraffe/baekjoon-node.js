const fs = require("fs");
const [N, Bus, Subway] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

// 근데 이거 조건이, N <= B라서, N은 전혀 고려 안 해도 되는 거 아닌가? <- ㅇㅇ 맞은 생각이었음.

if (Bus === Subway) console.log("Anything");
if (Bus < Subway) console.log("Bus");
if (Bus > Subway) console.log("Subway");
