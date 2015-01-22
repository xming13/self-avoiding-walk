var numPaths = 0;
var gridSize = 5;
var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

self.onmessage = function(e) {
    importScripts('//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js');
    var timeStart = new Date();
    var data = e.data;
    if (data.gridSize) {
        gridSize = data.gridSize;
    }
    numPaths = 0;
    move(new Point(0, 0), []);
    var timeEnd = new Date();
    var diff = timeEnd - timeStart;
    console.log("time duration in milliseconds: " + diff);
    var duration = getReadableDuration(diff);

    self.postMessage({
        numPaths: numPaths,
        duration: duration
    });
};

function getReadableDuration(diff) {
    var duration = "";
    var diffHours = Math.floor(diff / 1000 / 60 / 60);
    diff -= diffHours * 1000 * 60 * 60;
    var diffMinutes = Math.floor(diff / 1000 / 60);
    diff -= diffMinutes * 1000 * 60;
    var diffSeconds = Math.floor(diff / 1000);
    var diffMilliseconds = diff % 1000;
    if (diffHours > 0) {
        duration += diffHours;
        duration += diffHours == 1 ? " hour " : " hours ";
    }
    if (diffMinutes > 0) {
        duration += diffMinutes;
        duration += diffMinutes == 1 ? " minute " : " minutes ";
    }
    if (diffSeconds > 0) {
        duration += diffSeconds;
        duration += diffSeconds == 1 ? " second " : " seconds ";
    }
    if (diffMilliseconds > 0) {
        duration += diffMilliseconds;
        duration += diffMilliseconds == 1 ? " millisecond " : " milliseconds ";
    }

    return duration;
}

function isValidPoint(point, path) {
    if (point.x < 0 || point.x >= gridSize || point.y < 0 || point.y >= gridSize) {
        return false;
    }
    return _.filter(path, _.matches({
        x: point.x,
        y: point.y
    })).length == 0;
}

function move(point, path) {
    if (isValidPoint(point, path)) {
        if (point.x == gridSize - 1 && point.y == gridSize - 1) {
            numPaths++;
        } else {
            path.push(point);
            move(new Point((point.x - 1), point.y), _.clone(path));
            move(new Point((point.x + 1), point.y), _.clone(path));
            move(new Point(point.x, point.y - 1), _.clone(path));
            move(new Point(point.x, point.y + 1), _.clone(path));
        }
    }
}