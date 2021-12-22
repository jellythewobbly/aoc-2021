const fs = require('fs');

const data: number[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split(',')
  .map(Number);

const computeLeastFuel = (input: number[]) => {
  const data = [...input].sort((a, b) => a - b);
  const medianIndex = (data.length / 2) | 0;
  const median = data[medianIndex];
  return data.reduce((acc, cur) => acc + Math.abs(cur - median), 0);
};

console.log(`Part 1, ${computeLeastFuel(data)}`);

const calculateFuel = (start: number, end: number) =>
  (Math.abs(start - end) + 1) * Math.abs((start - end) / 2);

const computeLeastFuel2 = (input: number[]) => {
  const map: Record<string, number | undefined> = {};
  const min = Math.min(...input);
  const max = Math.max(...input);
  for (let i = min; i <= max; i++) {
    map[i] = undefined;
  }

  for (let i = min; i <= max; i++) {
    if (map[i] === undefined) {
      map[i] = input.reduce((acc, cur) => acc + calculateFuel(i, cur), i) - i;
    }
  }

  return Math.min(...Object.values(map));
};

console.log(`Part 2, ${computeLeastFuel2(data)}`);
