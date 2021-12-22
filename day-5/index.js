var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .replace(/\n*$/, '')
    .split('\n');
var countOverlaps = function (data) {
    var map = {};
    data.forEach(function (row) {
        var _a = row.split(' -> '), p1 = _a[0], p2 = _a[1];
        var _b = p1.split(',').map(Number), x1 = _b[0], y1 = _b[1];
        var _c = p2.split(',').map(Number), x2 = _c[0], y2 = _c[1];
        var markPoint = function (x, y) {
            var point = "".concat(x, ",").concat(y);
            map[point] = map[point] ? map[point] + 1 : 1;
        };
        var smallerX = x1 < x2 ? x1 : x2;
        var largerX = x1 > x2 ? x1 : x2;
        var smallerY = y1 < y2 ? y1 : y2;
        var largerY = y1 > y2 ? y1 : y2;
        if (x1 === x2 || y1 === y2) {
            if (x1 === x2) {
                for (var i = smallerY; i <= largerY; i++) {
                    markPoint(x1, i);
                }
            }
            if (y1 === y2) {
                for (var i = smallerX; i <= largerX; i++) {
                    markPoint(i, y1);
                }
            }
        }
    });
    return Object.values(map).reduce(function (acc, cur) { return acc + (cur >= 2 ? 1 : 0); }, 0);
};
console.log("Part 1, ".concat(countOverlaps(data)));
var countOverlapsWithDiagonals = function (data) {
    var map = {};
    data.forEach(function (row) {
        var _a = row.split(' -> '), p1 = _a[0], p2 = _a[1];
        var _b = p1.split(',').map(Number), x1 = _b[0], y1 = _b[1];
        var _c = p2.split(',').map(Number), x2 = _c[0], y2 = _c[1];
        var markPoint = function (x, y) {
            var point = "".concat(x, ",").concat(y);
            map[point] = map[point] ? map[point] + 1 : 1;
        };
        var smallerX = x1 < x2 ? x1 : x2;
        var largerX = x1 > x2 ? x1 : x2;
        var smallerY = y1 < y2 ? y1 : y2;
        var largerY = y1 > y2 ? y1 : y2;
        if (x1 === x2 || y1 === y2) {
            if (x1 === x2) {
                for (var i = smallerY; i <= largerY; i++) {
                    markPoint(x1, i);
                }
            }
            if (y1 === y2) {
                for (var i = smallerX; i <= largerX; i++) {
                    markPoint(i, y1);
                }
            }
        }
        else {
            if ((smallerX === x1 && y1 < y2) || (largerX === x1 && y1 > y2)) {
                for (var i = smallerX, j = smallerY; i <= largerX && j <= largerY; i++, j++) {
                    markPoint(i, j);
                }
            }
            else {
                for (var i = smallerX, j = largerY; i <= largerX && j >= smallerY; i++, j--) {
                    markPoint(i, j);
                }
            }
        }
    });
    return Object.values(map).reduce(function (acc, cur) { return acc + (cur >= 2 ? 1 : 0); }, 0);
};
console.log("Part 2, ".concat(countOverlapsWithDiagonals(data)));
