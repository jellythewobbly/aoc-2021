const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split('\n');

const countOverlaps = (data: string[]) => {
  const map: Record<string, number> = {};
  data.forEach((row) => {
    const [p1, p2] = row.split(' -> ');
    const [x1, y1] = p1.split(',').map(Number);
    const [x2, y2] = p2.split(',').map(Number);

    const markPoint = (x: number, y: number) => {
      const point = `${x},${y}`;
      map[point] = map[point] ? map[point] + 1 : 1;
    };

    const smallerX = x1 < x2 ? x1 : x2;
    const largerX = x1 > x2 ? x1 : x2;
    const smallerY = y1 < y2 ? y1 : y2;
    const largerY = y1 > y2 ? y1 : y2;

    if (x1 === x2 || y1 === y2) {
      if (x1 === x2) {
        for (let i = smallerY; i <= largerY; i++) {
          markPoint(x1, i);
        }
      }

      if (y1 === y2) {
        for (let i = smallerX; i <= largerX; i++) {
          markPoint(i, y1);
        }
      }
    }
  });
  return Object.values(map).reduce((acc, cur) => acc + (cur >= 2 ? 1 : 0), 0);
};

console.log(`Part 1, ${countOverlaps(data)}`);

const countOverlapsWithDiagonals = (data: string[]) => {
  const map: Record<string, number> = {};
  data.forEach((row) => {
    const [p1, p2] = row.split(' -> ');
    const [x1, y1] = p1.split(',').map(Number);
    const [x2, y2] = p2.split(',').map(Number);

    const markPoint = (x: number, y: number) => {
      const point = `${x},${y}`;
      map[point] = map[point] ? map[point] + 1 : 1;
    };

    const smallerX = x1 < x2 ? x1 : x2;
    const largerX = x1 > x2 ? x1 : x2;
    const smallerY = y1 < y2 ? y1 : y2;
    const largerY = y1 > y2 ? y1 : y2;

    if (x1 === x2 || y1 === y2) {
      if (x1 === x2) {
        for (let i = smallerY; i <= largerY; i++) {
          markPoint(x1, i);
        }
      }

      if (y1 === y2) {
        for (let i = smallerX; i <= largerX; i++) {
          markPoint(i, y1);
        }
      }
    } else {
      if ((smallerX === x1 && y1 < y2) || (largerX === x1 && y1 > y2)) {
        for (
          let i = smallerX, j = smallerY;
          i <= largerX && j <= largerY;
          i++, j++
        ) {
          markPoint(i, j);
        }
      } else {
        for (
          let i = smallerX, j = largerY;
          i <= largerX && j >= smallerY;
          i++, j--
        ) {
          markPoint(i, j);
        }
      }
    }
  });
  return Object.values(map).reduce((acc, cur) => acc + (cur >= 2 ? 1 : 0), 0);
};

console.log(`Part 2, ${countOverlapsWithDiagonals(data)}`);
