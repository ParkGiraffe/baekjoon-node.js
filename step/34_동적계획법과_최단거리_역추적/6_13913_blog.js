// 메모리 초과 나는 방식
/*
const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ").map(Number)

const MAX = 100000 + 1;
const dp = new Array(MAX).fill(MAX);
// let time = MAX;

// dp[n] = 0;

let fastest = MAX
let list;


const move = (time, subin, arr) => {
  if (subin > 2 * k) {
      return;
  }
  
  if (subin === k && fastest > time) {
    fastest = time;
    list = [...arr, subin]
    // console.log(time, [...arr, subin]);
  }
  
      
  if (dp[subin] > time) {
    dp[subin] = time;

    move(time + 1, subin - 1, [...arr, subin]);
    move(time + 1, subin + 1, [...arr, subin]);
    move(time + 1, subin * 2, [...arr, subin]);
  }
}

move(0, n, []);

console.log(fastest + '\n' + list.join(' '));
*/


// 시간초과 (dfs)
/*
const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const MAX = 100000 + 1;
const dp = new Array(MAX).fill(MAX);
// let time = MAX;

// dp[n] = 0;

let fastest = MAX;
// let list;

const move = (time, subin) => {
  if (subin > 2 * k) return;

  if (subin === k && fastest > time) fastest = time;

  if (dp[subin] > time) {
    dp[subin] = time;

    move(time + 1, subin - 1);
    move(time + 1, subin + 1);
    move(time + 1, subin * 2);
  }
};
move(0, n);

const list = [k];

const backtracking = (k) => {
  let time = dp[k];

  if (dp[k - 1] === time - 1) {
    list.unshift(k - 1);
    backtracking(k - 1);
  } else if (dp[k + 1] === time - 1) {
    list.unshift(k + 1);
    backtracking(k + 1);
  } else if (dp[k / 2] === time - 1) {
    list.unshift(k / 2);
    backtracking(k / 2);
  }
};
backtracking(k);

console.log(fastest + "\n" + list.join(" "));
*/




// 정답 (bfs)

const fs = require("fs");
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const MAX = 100000 + 1;
const dp = new Array(MAX).fill(MAX);

const move = (subin) => {
  const queue = [];
  queue.push([0, subin]);
  dp[subin] = 0;

  while (queue.length) {
    const [curTime, curPos] = queue.shift();
    // console.log(curTime, curPos)
    if (curPos === k) return curTime;

    for (nextPos of [curPos - 1, curPos + 1, curPos * 2]) {
      const nextTime = curTime + 1;
      if (dp[nextPos] > nextTime && nextPos >= 0 && nextPos < MAX) {
        // console.log('yes')
        dp[nextPos] = nextTime;
        queue.push([nextTime, nextPos]);
      }
    }
  }
};
const fastest = move(n);

const list = [k];

const backtracking = (k) => {
  let time = dp[k];

  if (dp[k - 1] === time - 1) {
    list.push(k - 1);
    backtracking(k - 1);
  } else if (dp[k + 1] === time - 1) {
    list.push(k + 1);
    backtracking(k + 1);
  } else if (dp[k / 2] === time - 1) {
    list.push(k / 2);
    backtracking(k / 2);
  }
};
backtracking(k);

console.log(fastest + "\n" + list.reverse().join(" "));
