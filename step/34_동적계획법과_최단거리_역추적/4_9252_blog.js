const fs = require("fs");
const [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const str1 = first.split("");
const str1Length = str1.length;
const str2 = second.split("");
const str2Length = str2.length;

const stack = [];
const dp = Array.from(Array(str1Length + 1), () =>
  Array(str2Length + 1).fill(0)
);

for (let y = 1; y < str1Length + 1; y++) {
  for (let x = 1; x < str2Length + 1; x++) {
    if (str1[y - 1] === str2[x - 1]) {
      dp[y][x] = dp[y - 1][x - 1] + 1;
    } else {
      dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]);
    }
  }
}

// console.log(dp);

const getLcs = (y, x) => {
  if (dp[y][x] === 0) return;
  if (str1[y - 1] === str2[x - 1]) {
    getLcs(y - 1, x - 1);
    stack.push(str1[y - 1]);
  } else {
    if (dp[y - 1][x] > dp[y][x - 1]) {
      getLcs(y - 1, x);
    } else {
      getLcs(y, x - 1);
    }
  }
};

getLcs(str1Length, str2Length);

console.log(dp[str1Length][str2Length] + "\n" + stack.join(""));
