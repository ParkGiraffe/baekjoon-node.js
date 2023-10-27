const fs = require("fs");
const [first, second, third] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +first;
const inorderList = second.split(" ").map(Number);
const postorderList = third.split(" ").map(Number);

const indexes = [];

const result = [];

for (let i = 0; i < n; i++) {
  indexes[inorderList[i]] = i;
}


// dfs 방식
/*
Void DFS(중위순회 범위, 후위순회 범위){

	루트출력();
	DFS(중위순회의 L부분 범위, 후위순회의 L부분 범위);
  DFS(중위순회의 R부분 범위, 후위순회의 R부분 범위);

}
*/

const dfs = (inStart, inEnd, postStart, postEnd) => {
  if (inStart > inEnd || postStart > postEnd) return;
  const root = postorderList[postEnd]
  const rootIndex = indexes[root];
  result.push(root);

  const leftPostEnd = postStart + (rootIndex - inStart) - 1;

  dfs(inStart, rootIndex - 1, postStart, leftPostEnd);
  dfs(rootIndex + 1, inEnd, leftPostEnd + 1, postEnd - 1);
};

dfs(0, n - 1, 0, n - 1);



/*
// 반복문을 이용해서 dfs 구현
const stack = [[0, n - 1, 0, n - 1]];
while (stack.length) {
  const [inStart, inEnd, postStart, postEnd] = stack.pop();
  // console.log(inStart, inEnd, postStart, postEnd)

  if (inStart > inEnd || postStart > postEnd) continue;
  const root = postorderList[postEnd];
  const rootIndex = indexes[root];
  result.push(root);

  // let rootIndex;
  // for (let i = inStart; i <= inEnd; i++) {
  //   if (inorderList[i] === root) {
  //     rootIndex = i;
  //     break;
  //   }
  // }
  const leftPostEnd = postStart + (rootIndex - inStart) - 1;

  stack.push([rootIndex + 1, inEnd, leftPostEnd + 1, postEnd - 1]);
  stack.push([inStart, rootIndex - 1, postStart, leftPostEnd]);
}

// console.log('output : ',result);
*/
console.log(result.join(" "));