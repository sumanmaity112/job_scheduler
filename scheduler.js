var PriorityQueue = require('js-priority-queue');
module.exports = Scheduler = function (startAfter) {
    var pQueue = new PriorityQueue({
        comparator: function (firstItem, secondItem) {
            return secondItem.priority - firstItem.priority;
        }
    });
    this.startAfter = startAfter || 3600000;
    this.addJob = function (value, callBack) {
        insert({value: value, callBack: callBack, priority: 10});
        return this.length++;
    };
    this.addUrgentJob = function (value, callBack) {
        insert({value: value, callBack: callBack, priority: 100});
        return this.length++;
    };
    var insert = function (item) {
        pQueue.queue(item);
    };
    var getTopElement = function () {
        return pQueue.dequeue();
    };
    this.start = function (time) {
        if (this.totalLimit === undefined){
            throw new Error("Total limit is not already set. For more information, see readme.md");
        }
        time = time || 500;
        var self = this;
        this.timer = setInterval(function () {
            if (pQueue.length) {
                var topElement = getTopElement();
                topElement.callBack(topElement.value);
                updateRemainingLimit(topElement.priority, self);
                self.length = pQueue.length;
                if (!self.totalLimit){
                    restartScheduler(self, time);
                }
                if (!pQueue.length){
                    self.stop();
                }
            }
        }, time);
    };
    this.length = 0;
    this.addLimit = function (totalLimit, normalJobLimit) {
        if (totalLimit === undefined){
            throw new Error("Total limit is not provided. For more information, see readme.md");
        }
        if (normalJobLimit >= totalLimit) {
            throw new Error("Check your entered value");
        }
        this.totalLimit = totalLimit;
        this.normalJobLimit = normalJobLimit || 0;
        this.limit = {totalLimit: totalLimit, normalJobLimit: normalJobLimit};
    };
    var updateRemainingLimit = function (priority, self) {
        if (priority == 10)
            self.normalJobLimit--;
        self.totalLimit--;
    };
};
var restartScheduler = function (self, time) {
    self.stop();
    setTimeout(function () {
        self.start(time);
        self.addLimit(self.limit.totalLimit, self.limit.normalJobLimit);
    }, self.startAfter);
};
Scheduler.prototype = {
    stop: function () {
        clearInterval(this.timer);
    }
};
