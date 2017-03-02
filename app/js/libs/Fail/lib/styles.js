'use strict';

var styles = {};

styles.support = {};

function getCoords (el) {
    var docEl = document.documentElement,
        body = document.body,
        coords = el.getBoundingClientRect(),
        top, left;

    top = coords.top + (window.pageYOffset || docEl.scrollTop || body.scrollTop || 0);
    left = coords.left + (window.pageXOffset || docEl.scrollLeft || body.scrollLeft || 0);

    top += docEl.clientTop || body.clientTop || 0;
    left += docEl.clientLeft || body.clientLeft || 0;

    return {
        top: top,
        left: left
    };
}

styles.support.animation = (function () {
    var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        el = document.createElement('div'),
        i;

    if (el.style.animationName !== undefined) {
        return true;
    }

    for (i = 0; i < domPrefixes.length; i += 1) {
        if (el.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            return true;
        }
    }

    return false;
}());

styles.rippleButton = (function () {
    var timerID;

    return function (e) {
        var btn,
            circle,
            coords,
            size,
            xPos, yPos,
            action, percent,
            btnColor, bg;

        if (!simpla.styles.support.animation) {
            return;
        }

        btn = this;
        circle = btn.querySelector('.circle');
        coords = getCoords(btn);
        size = Math.max(btn.clientWidth, btn.clientHeight);
        xPos = e.pageX - coords.left;
        yPos = e.pageY - coords.top;
        action = btn.dataset.colorAction;
        percent = btn.dataset.percent;
        btnColor = getComputedStyle(btn).backgroundColor;
        bg = simpla.colors[action](btnColor, percent);

        if (circle) {
            btn.removeChild(circle);
            circle = null;
        }

        circle = document.createElement('div');
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.top = (yPos - size / 2) + 'px';
        circle.style.left = (xPos - size / 2) + 'px';
        circle.style.backgroundColor = bg;
        circle.className = 'circle';
        btn.appendChild(circle);

        if (timerID) {
            clearTimeout(timerID);
        }

        timerID = setTimeout(function () {
            btn.removeChild(circle);
        }, 600);
    };
}());

export default styles;