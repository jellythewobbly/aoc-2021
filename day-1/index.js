var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(Number);
var countIncrement = function (data) {
    var result = 0;
    for (var i = 1; i < data.length; i++) {
        if (data[i] > data[i - 1]) {
            result += 1;
        }
    }
    return result;
};
console.log("Part 1, ".concat(countIncrement(data)));
var countWindowIncrement = function (data) {
    var result = 0;
    for (var i = 3; i < data.length; i++) {
        if (data[i] > data[i - 3]) {
            result += 1;
        }
    }
    return result;
};
console.log("Part 2, ".concat(countWindowIncrement(data)));
