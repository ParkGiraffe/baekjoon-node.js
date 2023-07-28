const fs = require("fs");
const [n, k] = fs.readFileSync("/dev/stdin").toString().trim().split('\n').map(Number);

let left = 1;
let right = k;
let answer = 0;

while (left <= right) {
    let count = 0;
    let mid = parseInt((left + right) / 2);

    for (let i = 1; i <= n; i++) {
        count += Math.min(parseInt(mid / i), n)
    }

    if (count < k) {
        left = mid + 1;
    } else {
        answer = mid;
        right = mid - 1;
    }
}

console.log(answer);