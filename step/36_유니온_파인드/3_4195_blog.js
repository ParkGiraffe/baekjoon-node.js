/*
친구 네트워크
https://www.acmicpc.net/problem/4195

문제
민혁이는 소셜 네트워크 사이트에서 친구를 만드는 것을 좋아하는 친구이다. 우표를 모으는 취미가 있듯이, 민혁이는 소셜 네트워크 사이트에서 친구를 모으는 것이 취미이다.

어떤 사이트의 친구 관계가 생긴 순서대로 주어졌을 때, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.

친구 네트워크란 친구 관계만으로 이동할 수 있는 사이를 말한다.

입력
첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스의 첫째 줄에는 친구 관계의 수 F가 주어지며, 이 값은 100,000을 넘지 않는다. 다음 F개의 줄에는 친구 관계가 생긴 순서대로 주어진다. 친구 관계는 두 사용자의 아이디로 이루어져 있으며, 알파벳 대문자 또는 소문자로만 이루어진 길이 20 이하의 문자열이다.

출력
친구 관계가 생길 때마다, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.

예제 입력 1 
2
3
Fred Barney
Barney Betty
Betty Wilma
3
Fred Barney
Betty Wilma
Barney Betty
예제 출력 1 
2
3
4
2
2
4

*/

const fs = require("fs");
const [first, ...second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let t = +first;
let cursor = 0;
const output = [];

while (t) {
  const f = second[cursor++];
  const Fs = [];

  const set = { length: 0 };
  // {length:1, 0:'Fred', 'Fred':{self:0, parent:0} }

  const setLength = [];

  for (let i = 0; i < f; i++) {
    Fs.push(second[cursor++]);
  }

  Fs.forEach((e) => {
    const [a, b] = e.split(" ");

    if (!set.hasOwnProperty(a)) {
      set[a] = {};
      set[a].self = set.length;
      set[a].parent = set.length;
      set[set.length] = a;
      set.length++;
      setLength.push(1);
    }

    if (!set.hasOwnProperty(b)) {
      set[b] = {};
      set[b].self = set.length;
      set[b].parent = set.length;
      set[set.length] = b;
      set.length++;
      setLength.push(1);
    }

    const find = (x) => {
      if (set[x].self === set[x].parent) return set[x].parent;
      else return (set[x].parent = find(set[set[x].parent]));
    };

    let finding; // 현재 확인중인 부모
    const union = (a, b) => {
      let parentA = find(a);
      let parentB = find(b); // find는 해쉬값을 return함

      if (parentA !== parentB) {
        set[set[parentA]].parent = set[set[parentB]].self;
        setLength[parentB] += setLength[parentA];
        finding = set[set[parentB]].parent; // parentB의 parent는 자기 자신이다.
      } else {
        finding = set[set[parentB]].parent;
        return;
      }
    };
    union(a, b);
    output.push(setLength[finding]);
  });

  t--;
}

console.log(output.join("\n"));
