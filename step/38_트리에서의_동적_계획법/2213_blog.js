const fs = require("fs");
const [first, second, ...third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const weights = second.split(" ").map(Number);



