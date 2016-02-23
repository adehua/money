(function (factory) {
    var global = typeof window != 'undefined' ? window : this;

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global) : function (win) {
            if (!win.document)throw new Error("document is a undefined");
            return factory(win);
        };
    } else {
        factory(global);
    }

}(function (window) {

    var yNow = 0,       // 当前相对年份
        mNow = 0,       // 当前相对月份
        mNowSum = 0;       // 当前相对月份的数量

    function Calendar() {
        var oDate = new Date();
        this.hours = false;

        // 开始初始化
        this.init();
    }

    Calendar.prototype.init = function () {
        var yNow, mNow, mNowSum, oDate = new Date();
        yNow = oDate.getFullYear();
        mNow = oDate.getMonth() + 1;
        mNowSum = new Date(yNow,mNow,0).getDate();
        this.nameHeader(yNow, mNow);
    }

    Calendar.prototype.nameHeader = function (yNow, mNow) {
        $("#calendar").children(".header").children(".select").text(yNow+"年"+mNow+"月");
    }

    Calendar.prototype.createTime = function (obj, date, today, past) {

    }

    window.addEventListener('load', function () {
        new Calendar();
    }, false);

    return Calendar;

}));
