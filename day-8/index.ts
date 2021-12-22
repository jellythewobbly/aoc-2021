const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split('\n');

const count1478 = (input: string[]) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const [, output] = input[i].split(' | ');
    const digits = output.split(' ');
    for (let j = 0; j < digits.length; j++) {
      const charLength = digits[j].length;
      if (
        charLength === 2 ||
        charLength === 3 ||
        charLength === 4 ||
        charLength === 7
      ) {
        count += 1;
      }
    }
  }
  return count;
};

console.log(`Part 1, ${count1478(data)}`);

const sumOutputValues = (input: string[]) => {
  let count = 0;
  const map = {
    0: 6,
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
  };
};
