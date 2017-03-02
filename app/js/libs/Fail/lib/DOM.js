'use strict';

import helpers from './helpers';
import $ from 'jquery';

var DOM = {};

DOM.scrollBody = function (target, correction, options) {
    $('html, body').animate({
        scrollTop: target.offset().top - (correction || 0)
    }, options || {});
};

DOM.hideAllNotices = function () {
    $('.js-notice').remove();
};

DOM.hideNotice = function (notice) {
    notice.remove();
};

DOM.showNotice = function (id, className, target, text) {
    var notice = $('<div/>');

    if (target.length && !$('#' + id).length) {
        notice.attr('id', id);
        notice.text(text).addClass('js-notice ' + className).appendTo(target.parent());
        setTimeout(function () {
            notice.addClass('js-notice--active');
        }, 4);
    }
};

DOM.hasClass = function (el, className) {
    return helpers.inArray(el.className ? el.className.split(' ') : [], className);
};

DOM.getMaxHeight = function (blocks) {
    var maxHeight = $(blocks[0]).outerHeight();

    blocks.each(function () {
        if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
        }
    });

    return maxHeight;
}

DOM.getScrollbarWidth = (function () {
    var scrollbarWidth;

    return function () {
        var div;

        if (scrollbarWidth) {
            return scrollbarWidth;
        }

        div = document.createElement('div');

        div.style.width = '100px';
        div.style.height = '100px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        scrollWidth = div.offsetWidth - div.clientWidth;

        document.body.removeChild(div);

        return scrollWidth;
    };
}());

export default DOM;