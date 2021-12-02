const fs = require('fs');

const data: number[] = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(Number);

const countIncrement = (data: number[]) => {
  let result = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      result += 1;
    }
  }
  return result;
}

console.log(`Part 1, ${countIncrement(data)}`);

const countWindowIncrement = (data: number[]) => {
  let result = 0;
  for (let i = 3; i < data.length; i++) {
    if (data[i] > data[i - 3]) {
      result += 1;
    }
  }
  return result;
}

console.log(`Part 2, ${countWindowIncrement(data)}`);
