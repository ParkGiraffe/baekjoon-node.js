/*
삼각형과 세 변
https://www.acmicpc.net/problem/5073
문제
삼각형의 세 변의 길이가 주어질 때 변의 길이에 따라 다음과 같이 정의한다.

Equilateral :  세 변의 길이가 모두 같은 경우
Isosceles : 두 변의 길이만 같은 경우
Scalene : 세 변의 길이가 모두 다른 경우
단 주어진 세 변의 길이가 삼각형의 조건을 만족하지 못하는 경우에는 "Invalid" 를 출력한다. 예를 들어 6, 3, 2가 이 경우에 해당한다. 가장 긴 변의 길이보다 나머지 두 변의 길이의 합이 길지 않으면 삼각형의 조건을 만족하지 못한다.

세 변의 길이가 주어질 때 위 정의에 따른 결과를 출력하시오.

입력
각 줄에는 1,000을 넘지 않는 양의 정수 3개가 입력된다. 마지막 줄은 0 0 0이며 이 줄은 계산하지 않는다.

출력
각 입력에 맞는 결과 (Equilateral, Isosceles, Scalene, Invalid) 를 출력하시오.

예제 입력 1 
7 7 7
6 5 4
3 2 5
6 2 6
0 0 0
예제 출력 1 
Equilateral
Scalene
Invalid
Isosceles


*/

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inputs.pop();

const getMax = (arr) => {
  const max = arr.reduce((acc, cur) => {
    if (acc > cur) return acc;
    else return cur;
  });
  return max;
};

const equalLines = (arr) => {
  let count = 0;
  if (arr[0] === arr[1] && arr[1] === arr[2]) count = 3;
  else if (arr[0] === arr[1] || arr[1] === arr[2] || arr[0] === arr[2])
    count = 2;

  return count;
};

const getIsTri = (arr) => {
  const copiedArr = [...arr];
  const max = getMax(copiedArr);
  // console.log(copiedArr)
  // console.log(copiedArr.findIndex(e => e === max));
  copiedArr[copiedArr.findIndex((e) => e === max)] = 0;

  const sum = copiedArr.reduce((acc, cur) => acc + cur);

  if (max < sum) return true;
  else return false;
};

inputs.forEach((e) => {
  const input = e.split(" ").map((e) => +e);

  const isTri = getIsTri(input);
  const countLines = equalLines(input);

  if (!isTri) {
    console.log("Invalid");
  } else {
    if (countLines === 3) console.log("Equilateral");
    else if (countLines === 2) console.log("Isosceles");
    else console.log("Scalene");
  }
});
