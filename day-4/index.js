var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .replace(/\n*$/, '')
    .split('\n\n');
var bingo = data[0], boards = data.slice(1);
var bingoArr = bingo.split(',');
var boardsArr = boards.map(function (board) {
    return board
        .replace(/^ /, '')
        .split(/\n\s?/g)
        .map(function (row) { return row.split(/\s+/g); });
});
var checkWin = function (board, rowIndex, columnIndex) {
    var row = board[rowIndex];
    var column = board.map(function (row) { return row[columnIndex]; });
    return (row.every(function (element) { return element === 'X'; }) ||
        column.every(function (element) { return element === 'X'; }));
};
var computeBingoScore = function (board, num) {
    return board.reduce(function (sum, row) {
        return sum +
            row.reduce(function (rowSum, element) {
                return rowSum + (isNaN(+element) ? 0 : +element);
            }, 0);
    }, 0) * num;
};
var winBingoGame = function (bingo, boards) {
    var boardsMap = {};
    boards.forEach(function (board, boardIndex) {
        board.forEach(function (row, rowIndex) {
            row.forEach(function (number, columnIndex) {
                if (boardsMap[number]) {
                    boardsMap[number].push([boardIndex, rowIndex, columnIndex]);
                }
                else {
                    boardsMap[number] = [[boardIndex, rowIndex, columnIndex]];
                }
            });
        });
    });
    for (var i = 0; i < bingo.length; i++) {
        var num = bingo[i];
        if (boardsMap[num]) {
            for (var j = 0; j < boardsMap[num].length; j++) {
                var match = boardsMap[num][j];
                var boardIndex = match[0], rowIndex = match[1], columnIndex = match[2];
                boards[boardIndex][rowIndex][columnIndex] = 'X';
                if (checkWin(boards[boardIndex], rowIndex, columnIndex)) {
                    return computeBingoScore(boards[boardIndex], +num);
                }
            }
        }
    }
};
console.log("Part 1, ".concat(winBingoGame(bingoArr, boardsArr)));
var loseBingoGame = function (bingo, boards) {
    var boardsMap = {};
    boards.forEach(function (board, boardIndex) {
        board.forEach(function (row, rowIndex) {
            row.forEach(function (number, columnIndex) {
                if (boardsMap[number]) {
                    boardsMap[number].push([boardIndex, rowIndex, columnIndex]);
                }
                else {
                    boardsMap[number] = [[boardIndex, rowIndex, columnIndex]];
                }
            });
        });
    });
    var winSets = new Set();
    for (var i = 0; i < bingo.length; i++) {
        var num = bingo[i];
        if (boardsMap[num]) {
            for (var j = 0; j < boardsMap[num].length; j++) {
                var match = boardsMap[num][j];
                var boardIndex = match[0], rowIndex = match[1], columnIndex = match[2];
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
console.log("Part 2, ".concat(loseBingoGame(bingoArr, boardsArr)));
