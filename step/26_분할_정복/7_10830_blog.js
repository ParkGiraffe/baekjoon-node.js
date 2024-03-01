/*
행렬 제곱
https://www.acmicpc.net/problem/10830

문제
크기가 N*N인 행렬 A가 주어진다. 이때, A의 B제곱을 구하는 프로그램을 작성하시오. 수가 매우 커질 수 있으니, A^B의 각 원소를 1,000으로 나눈 나머지를 출력한다.

입력
첫째 줄에 행렬의 크기 N과 B가 주어진다. (2 ≤ N ≤  5, 1 ≤ B ≤ 100,000,000,000)

둘째 줄부터 N개의 줄에 행렬의 각 원소가 주어진다. 행렬의 각 원소는 1,000보다 작거나 같은 자연수 또는 0이다.

출력
첫째 줄부터 N개의 줄에 걸쳐 행렬 A를 B제곱한 결과를 출력한다.

예제 입력 1 
2 5
1 2
3 4
예제 출력 1 
69 558
337 406
예제 입력 2 
3 3
1 2 3
4 5 6
7 8 9
예제 출력 2 
468 576 684
62 305 548
656 34 412
예제 입력 3 
5 10
1 0 0 0 1
1 0 0 0 1
1 0 0 0 1
1 0 0 0 1
1 0 0 0 1
예제 출력 3 
512 0 0 0 512
512 0 0 0 512
512 0 0 0 512
512 0 0 0 512
512 0 0 0 512
*/

const fs = require("fs");
const [NnB, ...INPUT] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, B] = NnB.split(" ").map(Number);

const inputMatrix = [];

for (let i = 0; i < N; i++) {
  inputMatrix.push(INPUT[i].split(" ").map(Number));
}

const multiMatrix = (firstMatrix, secondMatrix) => {
  const tempMatrix = Array.from(Array(N), () => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      tempMatrix[i][j] = 0;

      for (let k = 0; k < N; k++) {
        tempMatrix[i][j] += (firstMatrix[i][k] * secondMatrix[k][j]) % 1000;
      }
    }
  }

  return tempMatrix;
};

const squareMatrix = (matrix, n) => {
  if (n === 1) return matrix;

  const tempMatrix = squareMatrix(matrix, Math.trunc(n / 2));

  if (n % 2 === 0) return multiMatrix(tempMatrix, tempMatrix);
  else return multiMatrix(multiMatrix(tempMatrix, tempMatrix), matrix);
};

const resultMatrix = squareMatrix(inputMatrix, B);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    resultMatrix[i][j] %= 1000;
  }
}

console.log(resultMatrix.map((e) => e.join(" ")).join("\n"));
