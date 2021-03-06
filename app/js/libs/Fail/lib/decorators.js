'use strict';

var decorators = {};

decorators.debounce = function (func, delay) {
    var state = null,
        COOLDOWN = 1;

    return function () {
        var result;

        if (state) {
            return;
        }

        result = func.apply(this, arguments);
        state = COOLDOWN;

        setTimeout(function () {
            state = null;
        }, delay || 100);

        return result;
    };
};

decorators.throttle = function (func, delay) {
    var state = null,
        lastArgs, lastContext,
        COOLDOWN = 1;

    return function wrapper () {
        var result;

        if (state) {
            lastArgs = arguments;
            lastContext = this;
            return;
        }

        result = func.apply(this, arguments);
        state = COOLDOWN;

        setTimeout(function () {
            state = null;
            if (lastArgs) {
                wrapper.apply(lastContext, lastArgs);
                lastContext = lastArgs = null;
            }
        }, delay || 100);

        return result;
    };
};

decorators.smartDraw = function (func, delay, execAsap) {
    var timerID;

    return function () {
        var context = this, args = arguments;

        if (timerID) {
            clearTimeout(timerID);
        } else if (execAsap) {
            func.apply(context, args);
        }

        timerID = setTimeout(function () {
            if (!execAsap) {
                func.apply(context, args);
            }

            timerID = null;
        }, delay || 100);
    };
};

decorators.once = function (func, context) {
    var isCalled = false;

    return function () {
        var result;

        if (!isCalled) {
            result = func.apply(context, arguments);
            isCalled = true;

            return result;
        }
        return null;
    };
};

export default decorators;