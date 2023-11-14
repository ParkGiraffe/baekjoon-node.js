/*
별자리 만들기
https://www.acmicpc.net/problem/4386

문제
도현이는 우주의 신이다. 이제 도현이는 아무렇게나 널브러져 있는 n개의 별들을 이어서 별자리를 하나 만들 것이다. 별자리의 조건은 다음과 같다.

별자리를 이루는 선은 서로 다른 두 별을 일직선으로 이은 형태이다.
모든 별들은 별자리 위의 선을 통해 서로 직/간접적으로 이어져 있어야 한다.
별들이 2차원 평면 위에 놓여 있다. 선을 하나 이을 때마다 두 별 사이의 거리만큼의 비용이 든다고 할 때, 별자리를 만드는 최소 비용을 구하시오.

입력
첫째 줄에 별의 개수 n이 주어진다. (1 ≤ n ≤ 100)

둘째 줄부터 n개의 줄에 걸쳐 각 별의 x, y좌표가 실수 형태로 주어지며, 최대 소수점 둘째자리까지 주어진다. 좌표는 1000을 넘지 않는 양의 실수이다.

출력
첫째 줄에 정답을 출력한다. 절대/상대 오차는 10-2까지 허용한다.

예제 입력 1 
3
1.0 1.0
2.0 2.0
2.0 4.0
예제 출력 1 
3.41

*/
const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const v = +first;
const parents = new Array(v + 1).fill(0).map((v, i) => i);
let output = 0;

const stars = [[0, 0, 0]];
second.forEach((e) => {
  stars.push(e.split(" ").map(Number));
});

const edges = [];
for (let i = 1; i < v; i++) {
  for (let j = i + 1; j <= v; j++) {
    const weight = Math.sqrt(
      (stars[i][0] - stars[j][0]) ** 2 + (stars[i][1] - stars[j][1]) ** 2
    );

    edges.push([i, j, weight]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

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

edges.forEach((el) => {
  const [a, b, c] = el;
  if (!union(a, b)) {
    output += c;
  }
});

console.log(output);
