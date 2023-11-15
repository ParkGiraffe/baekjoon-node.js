/*
우주신과의 교감
https://www.acmicpc.net/problem/1774

문제
황선자씨는 우주신과 교감을 할수 있는 채널러 이다. 하지만 우주신은 하나만 있는 것이 아니기때문에 황선자 씨는 매번 여럿의 우주신과 교감하느라 힘이 든다. 이러던 와중에 새로운 우주신들이 황선자씨를 이용하게 되었다.

하지만 위대한 우주신들은 바로 황선자씨와 연결될 필요가 없다. 이미 황선자씨와 혹은 이미 우주신끼리 교감할 수 있는 우주신들이 있기 때문에 새로운 우주신들은 그 우주신들을 거쳐서 황선자 씨와 교감을 할 수 있다.

우주신들과의 교감은 우주신들과 황선자씨 혹은 우주신들 끼리 이어진 정신적인 통로를 통해 이루어 진다. 하지만 우주신들과 교감하는 것은 힘든 일이기 때문에 황선자씨는 이런 통로들이 긴 것을 좋아하지 않는다. 왜냐하면 통로들이 길 수록 더 힘이 들기 때문이다.

또한 우리들은 3차원 좌표계로 나타낼 수 있는 세상에 살고 있지만 우주신들과 황선자씨는 2차원 좌표계로 나타낼 수 있는 세상에 살고 있다. 통로들의 길이는 2차원 좌표계상의 거리와 같다.

이미 황선자씨와 연결된, 혹은 우주신들과 연결된 통로들이 존재한다. 우리는 황선자 씨를 도와 아직 연결이 되지 않은 우주신들을 연결해 드려야 한다. 새로 만들어야 할 정신적인 통로의 길이들이 합이 최소가 되게 통로를 만들어 “빵상”을 외칠수 있게 도와주자.

입력
첫째 줄에 우주신들의 개수 
$N$ (
$1 \le 1\,000$) 이미 연결된 신들과의 통로의 개수
$M$ (
$1 \le M \le 1\,000$)가 주어진다.

두 번째 줄부터 
$N$개의 줄에는 황선자를 포함하여 우주신들의 좌표가 
$X$, 
$Y$ (
$0 \le X, Y \le 1\,000\,000$)가 주어진다. 그 밑으로 
$M$개의 줄에는 이미 연결된 통로가 주어진다. 번호는 위의 입력받은 좌표들의 순서라고 생각하면 된다. 좌표는 정수이다.

출력
첫째 줄에 만들어야 할 최소의 통로 길이를 소수점 둘째 자리까지 반올림하여 출력하라.

예제 입력 1 
4 1
1 1
3 1
2 3
4 3
1 4
예제 출력 1 
4.00
힌트
(1,1) (3,1) (2,3) (4,3) 이렇게 우주신들과 황선자씨의 좌표가 주어졌고 1번하고 4번이 연결되어 있다. 그렇다면 1번하고 2번을 잇는 통로를 만들고 3번하고 4번을 잇는 통로를 만들면 신들과 선자씨끼리 다 도달이 가능하면서 더 만들어야 할 통로의 길이는 최소가 된다.



*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = first.split(" ").map(Number);
const parents = new Array(n + 1).fill(0).map((v, i) => i);
let output = 0;
const gods = [[0, 0]];

const find = (x) => {
  if (parents[x] === x) return x;
  else return (parents[x] = find(parents[x]));
};

const union = (a, b) => {
  let parentA = find(a);
  let parentB = find(b);

  if (parentA === parentB) {
    return true;
  }
  parents[parentB] = parentA;
  return false;
};

for (let i = 0; i < n; i++) {
  gods.push(second.shift().split(" ").map(Number));
}

// console.log(second)

for (let i = 0; i < m; i++) {
  const [a, b] = second.shift().split(" ").map(Number);
  union(a, b);

  // const weight = Math.sqrt(
  //   (gods[a][0] - gods[b][0]) ** 2 + (gods[a][1] - gods[b][1]) ** 2
  // );

  //   output += weight;
}

const edges = [];
for (let i = 1; i < n; i++) {
  for (let j = i + 1; j <= n; j++) {
    const weight = Math.sqrt(
      (gods[i][0] - gods[j][0]) ** 2 + (gods[i][1] - gods[j][1]) ** 2
    );

    edges.push([i, j, weight]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

edges.forEach((el) => {
  const [a, b, c] = el;
  if (!union(a, b)) {
    output += c;
  }
});

// console.log(edges)

console.log(output.toFixed(2));
