const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ");

const MAX_LENGTH = 300;
// const record = new Array(endPoint).fill(endPoint + 1);


const tCase = +first;

for (let i = 0; i < tCase; i++) {
  const length = +second.shift();
  const startPoint = second.shift().split(' ').map(Number);
  const goalPoint = second.shift().split(' ').map(Number);

  const board = Array.from({ length: length }, () => Array(length).fill(-1));

  board

}







const bfs = () => {
  // let count = 0;
  const bfsDeq = [];
  bfsDeq.push([n, 0]);
  record[n] = 0;

  while (bfsDeq.length) {
    let u = bfsDeq.shift();
    // count++;

    let nextCount = u[1] + 1;
    const case1 = u[0] + 1;
    if (case1 <= endPoint && nextCount < record[case1]) {
      bfsDeq.push([case1, nextCount]);
      record[case1] = nextCount;
    }

    const case2 = u[0] - 1;
    if (0 <= case2 && nextCount < record[case2]) {
      bfsDeq.push([case2, nextCount]);
      record[case2] = nextCount;
    }

    const case3 = u[0] * 2;
    if (case3 <= endPoint && nextCount < record[case3]) {
      bfsDeq.push([case3, nextCount]);
      record[case3] = nextCount;
    }
  }
};

bfs();
console.log(record[k]);
