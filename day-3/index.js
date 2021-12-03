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
    .replace(/\n*$/, "")
    .split('\n');
var binaryToDecimal = function (binary) {
    var decimal = 0;
    var digits = binary.toString().split('');
    var digitValue = 1;
    for (var i = digits.length - 1; i >= 0; i--) {
        decimal += digitValue * +digits[i];
        digitValue *= 2;
    }
    return decimal;
};
var computePowerConsumption = function (data) {
    var gamma = [];
    var epsilon = [];
    for (var i = 0; i < data[0].length; i++) {
        var count1 = 0;
        for (var j = 0; j < data.length; j++) {
            count1 += data[j][i] === '1' ? 1 : 0;
        }
        if (count1 > data.length / 2) {
            gamma.push(1);
            epsilon.push(0);
        }
        else {
            gamma.push(0);
            epsilon.push(1);
        }
    }
    return binaryToDecimal(+gamma.join('')) * binaryToDecimal(+epsilon.join(''));
};
console.log("Part 1, ".concat(computePowerConsumption(data)));
var filter1 = function (input, index) { return input.filter(function (i) { return i[index] === '1'; }); };
var filter0 = function (input, index) { return input.filter(function (i) { return i[index] === '0'; }); };
var computeLifeSupportRating = function (data) {
    var oxygen = __spreadArray([], data, true);
    var co2 = __spreadArray([], data, true);
    for (var i = 0; i < data.length; i++) {
        var count1 = 0;
        count1 += data[i][0] === '1' ? 1 : 0;
        if (count1 > data.length / 2) {
            oxygen = filter1(oxygen, 0);
            co2 = filter0(co2, 0);
        }
        else {
            oxygen = filter0(oxygen, 0);
            co2 = filter1(co2, 0);
        }
    }
    var oxygenIndex = 1;
    while (oxygen.length > 1) {
        var count1 = 0;
        for (var i = 0; i < oxygen.length; i++) {
            count1 += oxygen[i][oxygenIndex] === '1' ? 1 : 0;
        }
        if (count1 >= oxygen.length / 2) {
            oxygen = filter1(oxygen, oxygenIndex);
        }
        else {
            oxygen = filter0(oxygen, oxygenIndex);
        }
        oxygenIndex += 1;
    }
    var co2Index = 1;
    while (co2.length > 1) {
        var count1 = 0;
        for (var i = 0; i < co2.length; i++) {
            count1 += co2[i][co2Index] === '1' ? 1 : 0;
        }
        if (count1 >= co2.length / 2) {
            co2 = filter0(co2, co2Index);
        }
        else {
            co2 = filter1(co2, co2Index);
        }
        co2Index += 1;
    }
    console.log('oxygen', oxygen);
    console.log('co2', co2);
    return binaryToDecimal(+oxygen[0]) * binaryToDecimal(+co2[0]);
};
console.log("Part 2, ".concat(computeLifeSupportRating(data)));
