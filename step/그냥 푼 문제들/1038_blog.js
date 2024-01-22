const fs = require("fs");
const n = +fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const arr = [];

const getDecrease = (x, last) => {
  for (let i = last - 1; i >= 0; i--) {
    const decreaseNum = x * 10 + i;
    arr.push(decreaseNum);
    getDecrease(decreaseNum, i);
  }
};

arr.push(0);

for (let i = 9; i > 0; i--) {
  arr.push(i);
  getDecrease(i, i);
}

arr.sort((a, b) => a - b);

if (arr.length <= n) { // 0~1022까지 총 1023개 -> arr[1023]은 -1을 출력해야 맞음.
  console.log(-1);
} else {
  console.log(arr[n]);
}

// console.log(arr.length)
