var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .replace(/\n*$/, '')
    .split('\n');
var count1478 = function (input) {
    var count = 0;
    for (var i = 0; i < input.length; i++) {
        var _a = input[i].split(' | '), output = _a[1];
        var digits = output.split(' ');
        for (var j = 0; j < digits.length; j++) {
            console.log('digits', digits[j]);
            var charLength = digits[j].length;
            if (charLength === 2 ||
                charLength === 3 ||
                charLength === 4 ||
                charLength === 7) {
                count += 1;
            }
        }
    }
    return count;
};
console.log("Part 1, ".concat(count1478(data)));
