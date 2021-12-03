const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, "")
  .split('\n');

enum Command {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}

const getHorizontalDepth = (data: string[]) => {
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < data.length; i++) {
    const [command, distance] = data[i].split(' ');
    switch (command) {
      case Command.FORWARD:
        horizontal += +distance;
        break;

      case Command.UP:
        depth -= +distance;
        break;

      case Command.DOWN:
        depth += +distance;
        break;
    }
  }

  return horizontal * depth;
}

console.log(`Part 1, ${getHorizontalDepth(data)}`);

const getHorizontalDepthAim = (data: string[]) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < data.length; i++) {
    const [command, distance] = data[i].split(' ');
    switch (command) {
      case Command.FORWARD:
        horizontal += +distance;
        depth += aim * +distance;
        break;

      case Command.UP:
        aim -= +distance;
        break;

      case Command.DOWN:
        aim += +distance;
        break;
    }
  }

  return horizontal * depth;
}

console.log(`Part 2, ${getHorizontalDepthAim(data)}`);
