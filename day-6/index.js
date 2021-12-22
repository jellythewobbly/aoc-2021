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
    .split(',');
var countLanternFish = function (input) {
    var data = __spreadArray([], input, true);
    for (var i = 0; i < 80; i++) {
        var count = 0;
        for (var j = 0; j < data.length; j++) {
            var timer = +data[j];
            if (timer === 0) {
                data[j] = '6';
                count += 1;
            }
            else {
                data[j] = (timer - 1).toString();
            }
        }
        for (var k = 0; k < count; k++) {
            data.push('8');
        }
    }
    return data.length;
};
console.log("Part 1, ".concat(countLanternFish(data)));
var memo = {};
var lanternFishCreated = function (days, startCount) {
    var remainingDays = days - startCount;
    if (remainingDays <= 0) {
        return 1;
    }
    if (memo["".concat(remainingDays, ",7")] === undefined) {
        memo["".concat(remainingDays, ",7")] = lanternFishCreated(remainingDays, 7);
    }
    if (memo["".concat(remainingDays, ",9")] === undefined) {
        memo["".concat(remainingDays, ",9")] = lanternFishCreated(remainingDays, 9);
    }
    return memo["".concat(remainingDays, ",7")] + memo["".concat(remainingDays, ",9")];
};
var countManyLanternFish = function (input) {
    var data = __spreadArray([], input, true);
    var count = 0;
    var days = 256;
    for (var i = 0; i < data.length; i++) {
        var fishes = lanternFishCreated(days, +data[i]);
        count += fishes;
    }
    return count;
};
console.log("Part 2, ".concat(countManyLanternFish(data)));
