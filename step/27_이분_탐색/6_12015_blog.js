const fs = require("fs");
const [N, A] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +N;
const a = A.split(" ").map(Number);
const lis = [];

const findIndex = (e) => {
  let left = 0;
  let right = lis.length - 1;
  // let result = 0;

  while (left < right) {
    // let count = 0;
    let mid = parseInt((left + right) / 2);
    // console.log(left, right, mid)
    // for (let i = 1; i <= n; i++) {
    //     count += Math.min(parseInt(mid / i), n)
    // }

    if (lis[mid] < e) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
};

a.forEach((e) => {
  if (lis.length === 0) lis.push(e);
  else if (e > lis.at(-1)) lis.push(e);
  else {
    let idx = findIndex(e);
    // console.log(idx);
    lis[idx] = e;
  }
});

console.log(lis.length);
