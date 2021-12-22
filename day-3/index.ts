const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split('\n');

const binaryToDecimal = (binary: number) => {
  let decimal = 0;
  const digits = binary.toString().split('');
  let digitValue = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    decimal += digitValue * +digits[i];
    digitValue *= 2;
  }
  return decimal;
};

const computePowerConsumption = (data: string[]) => {
  const gamma = [];
  const epsilon = [];

  for (let i = 0; i < data[0].length; i++) {
    let count1 = 0;
    for (let j = 0; j < data.length; j++) {
      count1 += data[j][i] === '1' ? 1 : 0;
    }
    if (count1 > data.length / 2) {
      gamma.push(1);
      epsilon.push(0);
    } else {
      gamma.push(0);
      epsilon.push(1);
    }
  }

  return binaryToDecimal(+gamma.join('')) * binaryToDecimal(+epsilon.join(''));
};

console.log(`Part 1, ${computePowerConsumption(data)}`);

const filter1 = (input: string[], index: number) =>
  input.filter((i) => i[index] === '1');
const filter0 = (input: string[], index: number) =>
  input.filter((i) => i[index] === '0');

const computeLifeSupportRating = (data: string[]) => {
  let oxygen = [...data];
  let co2 = [...data];

  for (let i = 0; i < data.length; i++) {
    let count1 = 0;
    count1 += data[i][0] === '1' ? 1 : 0;

    if (count1 > data.length / 2) {
      oxygen = filter1(oxygen, 0);
      co2 = filter0(co2, 0);
    } else {
      oxygen = filter0(oxygen, 0);
      co2 = filter1(co2, 0);
    }
  }

  let oxygenIndex = 1;
  while (oxygen.length > 1) {
    let count1 = 0;
    for (let i = 0; i < oxygen.length; i++) {
      count1 += oxygen[i][oxygenIndex] === '1' ? 1 : 0;
    }
    if (count1 >= oxygen.length / 2) {
      oxygen = filter1(oxygen, oxygenIndex);
    } else {
      oxygen = filter0(oxygen, oxygenIndex);
    }
    oxygenIndex += 1;
  }

  let co2Index = 1;
  while (co2.length > 1) {
    let count1 = 0;
    for (let i = 0; i < co2.length; i++) {
      count1 += co2[i][co2Index] === '1' ? 1 : 0;
    }
    if (count1 >= co2.length / 2) {
      co2 = filter0(co2, co2Index);
    } else {
      co2 = filter1(co2, co2Index);
    }
    co2Index += 1;
  }

  return binaryToDecimal(+oxygen[0]) * binaryToDecimal(+co2[0]);
};

console.log(`Part 2, ${computeLifeSupportRating(data)}`);
