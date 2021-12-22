const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .replace(/\n*$/, '')
  .split('\n\n');

const [bingo, ...boards] = data;

const bingoArr = bingo.split(',');
const boardsArr = boards.map((board) =>
  board
    .replace(/^ /, '')
    .split(/\n\s?/g)
    .map((row) => row.split(/\s+/g))
);

const checkWin = (board: string[][], rowIndex: number, columnIndex: number) => {
  const row = board[rowIndex];
  const column = board.map((row) => row[columnIndex]);
  return (
    row.every((element) => element === 'X') ||
    column.every((element) => element === 'X')
  );
};

const computeBingoScore = (board: string[][], num: number) =>
  board.reduce(
    (sum: number, row: string[]) =>
      sum +
      row.reduce(
        (rowSum: number, element: string) =>
          rowSum + (isNaN(+element) ? 0 : +element),
        0
      ),
    0
  ) * num;

const winBingoGame = (bingo: string[], boards: string[][][]) => {
  const boardsMap: Record<string, number[][]> = {};
  boards.forEach((board, boardIndex) => {
    board.forEach((row, rowIndex) => {
      row.forEach((number, columnIndex) => {
        if (boardsMap[number]) {
          boardsMap[number].push([boardIndex, rowIndex, columnIndex]);
        } else {
          boardsMap[number] = [[boardIndex, rowIndex, columnIndex]];
        }
      });
    });
  });

  for (let i = 0; i < bingo.length; i++) {
    const num = bingo[i];
    if (boardsMap[num]) {
      for (let j = 0; j < boardsMap[num].length; j++) {
        const match = boardsMap[num][j];
        const [boardIndex, rowIndex, columnIndex] = match;
        boards[boardIndex][rowIndex][columnIndex] = 'X';
        if (checkWin(boards[boardIndex], rowIndex, columnIndex)) {
          return computeBingoScore(boards[boardIndex], +num);
        }
      }
    }
  }
};

console.log(`Part 1, ${winBingoGame(bingoArr, boardsArr)}`);

const loseBingoGame = (bingo: string[], boards: string[][][]) => {
  const boardsMap: Record<string, number[][]> = {};
  boards.forEach((board, boardIndex) => {
    board.forEach((row, rowIndex) => {
      row.forEach((number, columnIndex) => {
        if (boardsMap[number]) {
          boardsMap[number].push([boardIndex, rowIndex, columnIndex]);
        } else {
          boardsMap[number] = [[boardIndex, rowIndex, columnIndex]];
        }
      });
    });
  });

  const winSets = new Set();

  for (let i = 0; i < bingo.length; i++) {
    const num = bingo[i];
    if (boardsMap[num]) {
      for (let j = 0; j < boardsMap[num].length; j++) {
        const match = boardsMap[num][j];
        const [boardIndex, rowIndex, columnIndex] = match;
        boards[boardIndex][rowIndex][columnIndex] = 'X';
        if (checkWin(boards[boardIndex], rowIndex, columnIndex)) {
          winSets.add(boardIndex);
          if (winSets.size === 100) {
            return computeBingoScore(boards[boardIndex], +num);
          }
        }
      }
    }
  }
};

console.log(`Part 2, ${loseBingoGame(bingoArr, boardsArr)}`);
