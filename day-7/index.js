var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .replace(/\n*$/, '')
    .split(',')
    .map(Number);
var computeLeastFuel = function (input) {
    var data = __spreadArray([], input, true).sort(function (a, b) { return a - b; });
    var medianIndex = (data.length / 2) | 0;
    var median = data[medianIndex];
    return data.reduce(function (acc, cur) { return acc + Math.abs(cur - median); }, 0);
};
console.log("Part 1, ".concat(computeLeastFuel(data)));
var calculateFuel = function (start, end) {
    return (Math.abs(start - end) + 1) * Math.abs((start - end) / 2);
};
var computeLeastFuel2 = function (input) {
    var map = {};
    var min = Math.min.apply(Math, input);
    var max = Math.max.apply(Math, input);
    for (var i = min; i <= max; i++) {
        map[i] = undefined;
    }
    var _loop_1 = function (i) {
        if (map[i] === undefined) {
            map[i] = input.reduce(function (acc, cur) { return acc + calculateFuel(i, cur); }, i) - i;
        }
    };
    for (var i = min; i <= max; i++) {
        _loop_1(i);
    }
    return Math.min.apply(Math, Object.values(map));
};
console.log("Part 2, ".concat(computeLeastFuel2(data)));
