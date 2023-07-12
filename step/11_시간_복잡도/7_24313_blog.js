const fs = require("fs");
const [first, second, third] = fs.readFileSync("/dev/stdin").toString().trim().split('\n');

const [a1, a2] = first.split(' ').map(Number);
const c = +second
const n0 = +third

