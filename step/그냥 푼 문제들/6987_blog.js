/*
월드컵
https://www.acmicpc.net/problem/6987

문제
월드컵 조별 최종 예선에서는 6개국으로 구성된 각 조별로 동일한 조에 소속된 국가들과 한 번씩, 각 국가별로 총 5번의 경기를 치른다. 조별리그가 끝난 후, 기자가 보내온 각 나라의 승, 무승부, 패의 수가 가능한 결과인지를 판별하려고 한다. 다음은 가능한 결과와 가능하지 않은 결과의 예이다.

나라	승	무	패
A	5	0	0
B	3	0	2
C	2	0	3
D	0	0	5
E	4	0	1
F	1	0	4	
나라	승	무	패
A	4	1	0
B	3	0	2
C	4	1	0
D	1	1	3
E	0	0	5
F	1	1	3	
나라	승	무	패
A	5	0	0
B	4	0	1
C	2	2	1
D	2	0	3
E	1	0	4
F	0	0	5	
나라	승	무	패
A	5	0	0
B	3	1	1
C	2	1	1
D	2	0	3
E	0	0	5
F	1	0	4
예제 1 가능한 결과	예제 2 가능한 결과	예제 3 불가능한 결과	예제 4 불가능한 결과
네 가지의 결과가 주어질 때 각각의 결과에 대하여 가능하면 1, 불가능하면 0을 출력하는 프로그램을 작성하시오.

입력
첫째 줄부터 넷째 줄까지 각 줄마다 6개국의 결과가 나라별로 승, 무승부, 패의 순서로 빈칸을 하나 사이에 두고 18개의 숫자로 주어진다. 승, 무, 패의 수는 6보다 작거나 같은 자연수 또는 0이다.

출력
입력에서 주어진 네 가지 결과에 대하여 가능한 결과는 1, 불가능한 결과는 0을 빈칸을 하나 사이에 두고 출력한다.

예제 입력 1 
5 0 0 3 0 2 2 0 3 0 0 5 4 0 1 1 0 4
4 1 0 3 0 2 4 1 0 1 1 3 0 0 5 1 1 3
5 0 0 4 0 1 2 2 1 2 0 3 1 0 4 0 0 5
5 0 0 3 1 1 2 1 2 2 0 3 0 0 5 1 0 4
예제 출력 1 
1 1 0 0

*/

const fs = require("fs");
const INPUTS = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const output = [];

const teams = [];
for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) {
    teams.push([i, j]);
  }
}

const makeLeagueTable = (str) => {
  const list = str.split(" ").map(Number);
  const table = [];

  let cursor = 0;

  for (let i = 0; i < 6; i++) {
    table.push([list[cursor], list[cursor + 1], list[cursor + 2]]);
    cursor += 3;
  }

  return table;
};

for (let i = 0; i < 4; i++) {
  const leagueTable = makeLeagueTable(INPUTS[i]);
  const possibleTable = Array.from(Array(6), () => Array(3).fill(0));
  let validable = 0;

  const dfs = (count) => {
    if (count === 15) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 3; k++) {
          if (leagueTable[j][k] !== possibleTable[j][k]) {
            return;
          }
        }
      }
      validable = 1;
      return;
    }

    let team1 = teams[count][0];
    let team2 = teams[count][1];

    // 1 win : 2 lose
    possibleTable[team1][0]++;
    possibleTable[team2][2]++;
    dfs(count + 1);
    possibleTable[team1][0]--;
    possibleTable[team2][2]--;

    // 1 draw : 2 draw
    possibleTable[team1][1]++;
    possibleTable[team2][1]++;
    dfs(count + 1);
    possibleTable[team1][1]--;
    possibleTable[team2][1]--;

    // 1 lose : 2 win
    possibleTable[team1][2]++;
    possibleTable[team2][0]++;
    dfs(count + 1);
    possibleTable[team1][2]--;
    possibleTable[team2][0]--;
  };

  dfs(0);

  output.push(validable);
}

console.log(output.join(" "));
