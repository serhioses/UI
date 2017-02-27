;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.simpla = factory(jQuery);
    }
}(window, function ($) {
    'use strict';

    var simpla = {
        toString: function () {
            return '[object Simpla]';
        }
    };

    // Storage for globals
    simpla.globals = {};
    // Storage for globals (END)

    // Storages
    simpla.storage = {};

    simpla.storage.dropdowns = [];
    simpla.storage.bundles = [];
    simpla.storage.spinners = [];
    simpla.storage.staticTabs = [];
    simpla.storage.adaptiveTabs = [];
    simpla.storage.cache = {};
    // Storages (END)

    // Utility functions
    simpla.helpers = {};
    // Getting real class of a passed argument (works only for native objects, for custom classes use "instanceof" operator)
    /*
        @param arg {*} - a variable we want to get class of
    */
    simpla.helpers.getClass = function (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1);
    };
    
    // Checks if an array contains a certain value
    /*
        @param arr {array} - an array in which we look for a value
        @param value {*} - a value that will be compared to each item of an array
    */
    simpla.helpers.inArray = function (arr, value) {
        return arr.some(function (item, i) {
            return item === value;
        });
    };

    // Removing a certain value from an array if the value exists in the array
    /*
        @param arr {array} - an array in which we look for a value
        @param value {*} - a value that will be compared to each item of an array and if it fits it will be removed
    */
    simpla.helpers.removeFromArray = function (arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                arr.splice(i, 1);
                i--;
            }
        }
    };

    // A function that pushes a certain value to an array only if the array does not contain the value
    /*
        @param arr {array} - an array in which we look for a value
        @param value {*} - a value that will be pushed to a passed array if it does not exist in the array
    */
    simpla.helpers.pushIfMiss = function (arr, value) {
        if (!simpla.helpers.inArray(arr, value)) {
            arr.push(value);
        }

        return arr;
    };

    // A function that checks if an argument is a number. It tries to convert the argument to number
    /*
        @param n {any} - any value
    */
    simpla.helpers.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    // A function that extends "dest" object by copying "copy" keys. Not for deep copying
    /*
        @param copy {object} - an object we want to be copied to a "dest"
        @param dest {object} - an pbject we want to be extended by "copy" object
    */
    simpla.helpers.extend = function (copy, dest) {
        var key;
        dest = dest || {};

        for (key in copy) {
            dest[key] = copy[key];
        }

        return dest;
    };

    // Creates a new object without prototype inheritance
    simpla.helpers.createMap = function () {
        return Object.create(null);
    };

    simpla.helpers.addZero = function (n) {
        return (n < 10) ? '0' + n : n;
    };

    simpla.helpers.getAbsoluteUrl = (function () {
        var a;

        return function (url) {
            if (!a) {
                a = document.createElement('a');
            }

            a.href = url || '';

            return a.href;
        };
    }());
    // Utility functions (END)

    // Decorators
    simpla.decorators = {};

    // This function is to calling passed function no more then once per "delay" ms
    /*
        @param func {function} - a function we need to call no more then once per "delay" ms
        @param delay {number} - the time of pause in ms
    */
    simpla.decorators.debounce = function (func, delay) {
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

    // This function is to calling passed function no more then once per "delay" ms. But unlike Debounce the last call will be executed
    /*
        @param func {function} - a function we need to call no more then once per "delay" ms
        @param delay {number} - the time of pause in ms
    */
    simpla.decorators.throttle = function (func, delay) {
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

    simpla.decorators.smartDraw = function (func, delay, execAsap) {
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

    // A decorator to call a given function just once
    /*
        @param func {function} - a function we need to call once
        @param context {*} - a context of execution
    */
    simpla.decorators.once = function (func, context) {
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
    // Decorators (END)

    // Form
    simpla.form = {};
    simpla.form.firstInvalidField = null;

    // Checks if the given pattern exists in the given string
    /*
        @param pattern {regExp} - a regular expression we need to test
        @param str {string} - a string in which we will do checking
    */
    simpla.form.isPattern = function (pattern, str) {
        return (str.length && pattern.length) ? new RegExp(pattern, 'g').test(str) : null;
    };

    // Checks if the given string is email like
    /*
        @param str {string} - a string we need to test
    */
    simpla.form.isEmail = function (str) {
        return simpla.form.isPattern('^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$', str.toLowerCase());
    };

    simpla.form.setValid = function (el, showNotice, id) {
        el.addClass('js-input--valid').removeClass('js-input--invalid');
        if (showNotice) {
            simpla.DOM.hideNotice($('#' + id));
        }
    };

    simpla.form.setInvalid = function (el , e, noticeID, options) {
        el.addClass('js-input--invalid').removeClass('js-input--valid');
        e.preventDefault();

        if (options.scrollToInvalid && simpla.form.firstInvalidField) {
            simpla.DOM.scrollBody(simpla.form.firstInvalidField, {}, options.scrollCorrection);
        }
        if (options.showNotice) {
            simpla.DOM.showNotice(noticeID, 'notice', el, el.data('notice'));
        }
    };

    // This function validates the given form inputs
    /*
        @param form {dom element} - a form we need to validate
        @param e {object} - an event object
        @param options.scrollToInvalid {boolean} - if set true, then the body will be scrolled to invalid input
        @param options.scrollCorrection {number} - a correction of scrollig that will be substracted
        @param options.showNotice {boolean} - if set true, a notice will be shown below an invalid input
    */

    simpla.form.validate = function (form, e, options) {
        var defaults = {
                scrollToInvalid: true,
                scrollCorrection: 0,
                showNotice: true,
                stopOnInvalid: true,
                callback: $.noop
            }, result;

        if (simpla.helpers.getClass(options) === 'Object') {
            simpla.helpers.extend(options, defaults);
        }
            
        form.find(':input').each(function () {
            var pattern, isChecked, val, type, noticeID, self;

            type = this.type;
            val = $(this).val();
            self = $(this);
            noticeID = 'notice-' + self.data('noticeid');

            switch (type) {
                case 'text':
                case 'password':
                case 'textarea':
                case 'number':
                case 'tel':
                case 'email': {
                    pattern = $(this).data('pattern');
                    if (pattern) {
                        switch (pattern) {
                            case 'string': {
                                if (val.length) {
                                    simpla.form.setValid(self, defaults.showNotice, noticeID);
                                    result = true;
                                    simpla.form.firstInvalidField = null;
                                    defaults.callback();
                                } else {
                                    if (!simpla.form.firstInvalidField) {
                                        simpla.form.firstInvalidField = self;
                                    }
                                    simpla.form.setInvalid(self, e, noticeID, defaults);
                                    result = false;
                                    defaults.callback();
                                    if (defaults.stopOnInvalid) {
                                        return false;
                                    }
                                }
                                break;
                            }
                            case 'email': {
                                if (simpla.form.isEmail(val)) {
                                    simpla.form.setValid(self, defaults.showNotice, noticeID);
                                    result = true;
                                    simpla.form.firstInvalidField = null;
                                    defaults.callback();
                                } else {
                                    if (!simpla.form.firstInvalidField) {
                                        simpla.form.firstInvalidField = self;
                                    }
                                    simpla.form.setInvalid(self, e, noticeID, defaults);
                                    result = false;
                                    defaults.callback();
                                    if (defaults.stopOnInvalid) {
                                        return false;
                                    }
                                }
                                break;
                            }
                            default: {
                                if (simpla.form.isPattern(pattern, val)) {
                                    simpla.form.setValid(self, defaults.showNotice, noticeID);
                                    result = true;
                                    simpla.form.firstInvalidField = null;
                                    defaults.callback();
                                } else {
                                    if (!simpla.form.firstInvalidField) {
                                        simpla.form.firstInvalidField = self;
                                    }
                                    simpla.form.setInvalid(self, e, noticeID, defaults);
                                    result = false;
                                    defaults.callback();
                                    if (defaults.stopOnInvalid) {
                                        return false;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                break;
                case 'radio':
                case 'checkbox': {
                    isChecked = $(this).data('f');
                    if (typeof isChecked === 'boolean') {
                        if (self.prop('checked') === isChecked) {
                            simpla.form.setValid(self);
                            result = true;
                            simpla.form.firstInvalidField = null;
                            defaults.callback();
                        } else {
                            if (!simpla.form.firstInvalidField) {
                                simpla.form.firstInvalidField = self;
                            }
                            simpla.form.setInvalid(self, e, noticeID, defaults);
                            result = false;
                            defaults.callback();
                            if (defaults.stopOnInvalid) {
                                return false;
                            }
                        }
                    }
                    break;
                }
            }
        });
        
        return result;
    };
    // Form (END)

    // DOM manipulation
    simpla.DOM = {};

    // Scrolls body to a given element top offset and substracts correction
    /*
        @param target {object} - a DOM element
        @param options {object} - options to be passed into animate function
        @param correction {number} - an offset correction
    */
    simpla.DOM.scrollBody = function (target, options, correction) {
        $('html, body').animate({
            scrollTop: target.offset().top - (correction || 0)
        }, options || {});
    };

    // Hides all notices
    simpla.DOM.hideAllNotices = function () {
        $('.js-notice').remove();
    };

    // Hides the given notice
    /*
        @param notice {dom element} - a DOM element
    */
    simpla.DOM.hideNotice = function (notice) {
        notice.remove();
    };

    // Creates and shows notice below an invalid input
    /*
        @param id {string} - an ID of a notice
        @param className {string} - a class of a notice
        @param target {dom element} - a destination (field) where a notice will be placed
        @param text {string} - a text that will be placed into a notice
    */
    simpla.DOM.showNotice = function (id, className, target, text) {
        var notice = $('<div/>');

        if (target.length && !$('#' + id).length) {
            notice.attr('id', id);
            notice.text(text).addClass('js-notice ' + className).appendTo(target.parent());
            setTimeout(function () {
                notice.addClass('js-notice--active');
            }, 4);
        }
    };
    
    // Checks if the given element has the given class name
    /*
        @param el {dom element} - a DOM element
        @param className {string} - a class of a DOM element
    */
    simpla.DOM.hasClass = function (el, className) {
        return simpla.helpers.inArray(el.className ? el.className.split(' ') : [], className);
    };
    
    simpla.DOM.getMaxHeight = function (blocks) {
        var maxHeight = $(blocks[0]).outerHeight();

        blocks.each(function () {
            if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        });

        return maxHeight;
    }
    // DOM manipulation (END)

    // Modules
    simpla.modules = {};
    
    simpla.namespace = function (nsString) {
        var parts = nsString.split('.'),
            parent = simpla;

        if (parts[0] === 'simpla') {
            parts = parts.slice(1);
        }

        parts.forEach(function (item, i) {
            if (!(parts[i] in parent)) {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        });
        
        return parent;
    };
    
    simpla.addMethod = function (namespace, func) {
        var parts = namespace.split('.'),
            parent = simpla;

        if (parts[0] === 'simpla') {
            parts = parts.slice(1);
        }

        parts.forEach(function (item, i) {
            if (!(parts[i] in parent) && i !== parts.length - 1) {
                parent[parts[i]] = {};
            } else if (!(parts[i] in parent) && i === parts.length - 1) {
                parent[parts[i]] = func;
            }
            parent = parent[parts[i]];
        });
        
        return parent;
    };
    // Modules (END)

    return simpla;
}));