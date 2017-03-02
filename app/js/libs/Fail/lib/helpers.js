'use strict';

var helpers = {};

helpers.getClass = function (arg) {
    return Object.prototype.toString.call(arg).slice(8, -1);
};

helpers.inArray = function (arr, value) {
    return arr.some(function (item, i) {
        return item === value;
    });
};

helpers.removeFromArray = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1);
            i--;
        }
    }
};

helpers.pushIfMiss = function (arr, value) {
    if (!simpla.helpers.inArray(arr, value)) {
        arr.push(value);
    }

    return arr;
};

helpers.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

helpers.createMap = function () {
    return Object.create(null);
};

helpers.addLeadingZero = function (n) {
    return (n < 10) ? '0' + n : n;
};

helpers.getAbsoluteUrl = (function () {
    var a;

    return function (url) {
        if (!a) {
            a = document.createElement('a');
        }

        a.href = url || '';

        return a.href;
    };
}());

export default helpers;