const fs = require("fs");
const [N, word, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const wordList = word.split("");
const wordLength = word.length;

inputs.forEach((curWord) => {
  for (let i = 0; i < wordLength; i++) {
    if (wordList[i] !== curWord[i] && wordList[i] !== "?") {
      wordList[i] = "?";
    }
  }
});

console.log(wordList.join(""));
