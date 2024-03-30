const fs = require("fs");
const [n, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let output = "";

const queue = [];
let size = 0;
let front = 0;
let back = -1;

const push = (n) => {
  queue.push(+n);
  size++;
  back++;
};

const pop = () => {
  output += queue[front] + "\n";
  size--;
  front++;
};

input.forEach((e) => {
  const [exe, num] = e.split(" ");
  // console.log(exe, num)
  // console.log(queue)

  if (exe === "push") {
    push(num);
  }

  if (exe === "pop") {
    size === 0 ? (output += "-1\n") : pop();
  }

  if (exe === "size") {
    output += size + "\n";
  }

  if (exe === "front") {
    size === 0 ? (output += "-1\n") : (output += queue[front] + "\n");
  }

  if (exe === "back") {
    size === 0 ? (output += "-1\n") : (output += queue[back] + "\n");
  }

  if (exe === "empty") {
    size === 0 ? (output += "1\n") : (output += "0\n");
  }
});

console.log(output);
