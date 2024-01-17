const fs = require("fs");
const [T, ...cases] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")

let cursor = 0;
const output = [];

while (cursor < +T) {
  const [x1, y1, r1, x2, y2, r2] = cases[cursor++].split(" ").map(Number);

  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // 원점 사이의 거리
  const radiusDif = Math.abs(r2 - r1); // 반지름 차

  if (distance === 0 && radiusDif === 0) output.push(-1);
  else if (radiusDif < distance && distance < r1 + r2)
    output.push(2); // r2 - r1 < d < r2 + r1
  else if (distance === r1 + r2 || distance === radiusDif)
    output.push(1); // r2 - r1 or r2 + r1이 d와 같을 경우
  else output.push(0);
}

console.log(output.join("\n"));
