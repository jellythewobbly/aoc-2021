var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .replace(/\n*$/, "")
    .split('\n');
console.log('data', data);
var Command;
(function (Command) {
    Command["FORWARD"] = "forward";
    Command["DOWN"] = "down";
    Command["UP"] = "up";
})(Command || (Command = {}));
var getHorizontalDepth = function (data) {
    var horizontal = 0;
    var depth = 0;
    for (var i = 0; i < data.length; i++) {
        var _a = data[i].split(' '), command = _a[0], distance = _a[1];
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
};
console.log("Part 1, ".concat(getHorizontalDepth(data)));
var getHorizontalDepthAim = function (data) {
    var horizontal = 0;
    var depth = 0;
    var aim = 0;
    for (var i = 0; i < data.length; i++) {
        var _a = data[i].split(' '), command = _a[0], distance = _a[1];
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
};
console.log("Part 2, ".concat(getHorizontalDepthAim(data)));
