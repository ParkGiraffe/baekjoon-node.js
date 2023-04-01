/*
그룹 단어 체커


문제
그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

출력
첫째 줄에 그룹 단어의 개수를 출력한다.

예제 입력 1 
3
happy
new
year
예제 출력 1 
3
예제 입력 2 
4
aba
abab
abcabc
a
예제 출력 2 
1
예제 입력 3 
5
ab
aa
aca
ba
bb
예제 출력 3 
4
예제 입력 4 
2
yzyzy
zyzyz
예제 출력 4 
0
예제 입력 5 
1
z
예제 출력 5 
1

내가 찾은 반례
입력
1
zaaz

출력
1
*/

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [amount, ...strings] = input;
let result = 0;

const isGroupWord = (arr) => {
  let words = [];
  let isRight = true;
  arr.forEach((e) => {
    const isExist = words.find((c) => c == e);
    if (isExist) {
      e !== words.pop() ? (isRight = false) : words.push(e); // <- 여기서 push를 안 하고 넘어겄더니 내가 찾은 반례에서 오답 발생.
    } else {
      words.push(e);
    }
  });

  return isRight;
};

strings.forEach((e) => {
  // console.log(isGroupWord(e.split('')))
  isGroupWord(e.split("")) && result++;
});

console.log(result);
