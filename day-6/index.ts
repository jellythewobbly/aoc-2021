const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split(',');

const countLanternFish = (input: string[]) => {
  const data = [...input];
  for (let i = 0; i < 80; i++) {
    let count = 0;
    for (let j = 0; j < data.length; j++) {
      const timer = +data[j];
      if (timer === 0) {
        data[j] = '6';
        count += 1;
      } else {
        data[j] = (timer - 1).toString();
      }
    }

    for (let k = 0; k < count; k++) {
      data.push('8');
    }
  }
  return data.length;
};

console.log(`Part 1, ${countLanternFish(data)}`);

const memo: Record<string, number> = {};

const lanternFishCreated = (days: number, startCount: number) => {
  const remainingDays = days - startCount;
  if (remainingDays <= 0) {
    return 1;
  }
  if (memo[`${remainingDays},7`] === undefined) {
    memo[`${remainingDays},7`] = lanternFishCreated(remainingDays, 7);
  }

  if (memo[`${remainingDays},9`] === undefined) {
    memo[`${remainingDays},9`] = lanternFishCreated(remainingDays, 9);
  }
  return memo[`${remainingDays},7`] + memo[`${remainingDays},9`];
};

const countManyLanternFish = (input: string[]) => {
  const data = [...input];
  let count = 0;
  let days = 256;
  for (let i = 0; i < data.length; i++) {
    const fishes = lanternFishCreated(days, +data[i]);
    count += fishes;
  }

  return count;
};

console.log(`Part 2, ${countManyLanternFish(data)}`);
