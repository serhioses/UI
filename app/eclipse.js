(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["eclipse"] = factory(require("jquery"));
	else
		root["eclipse"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _helpers = __webpack_require__(1);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _styles = __webpack_require__(2);

	var _styles2 = _interopRequireDefault(_styles);

	var _color = __webpack_require__(3);

	var _color2 = _interopRequireDefault(_color);

	var _decorators = __webpack_require__(4);

	var _decorators2 = _interopRequireDefault(_decorators);

	var _forms = __webpack_require__(5);

	var _forms2 = _interopRequireDefault(_forms);

	var _DOM = __webpack_require__(6);

	var _DOM2 = _interopRequireDefault(_DOM);

	var _namespace = __webpack_require__(8);

	var _namespace2 = _interopRequireDefault(_namespace);

	var _addMethod = __webpack_require__(9);

	var _addMethod2 = _interopRequireDefault(_addMethod);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eclipse = {
	    globals: {},
	    storage: {
	        dropdowns: [],
	        bundles: [],
	        spinners: [],
	        staticTabs: [],
	        adaptiveTabs: [],
	        searches: [],
	        cache: {}
	    },
	    helpers: _helpers2.default,
	    styles: _styles2.default,
	    color: _color2.default,
	    decorators: _decorators2.default,
	    forms: _forms2.default,
	    DOM: _DOM2.default,
	    modules: {}
	};

	eclipse.namespace = _namespace2.default.bind(eclipse);
	eclipse.addMethod = _addMethod2.default.bind(eclipse);

	module.exports = eclipse;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	    if (!helpers.inArray(arr, value)) {
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
	    return n < 10 ? '0' + n : n;
	};

	helpers.getAbsoluteUrl = function () {
	    var a;

	    return function (url) {
	        if (!a) {
	            a = document.createElement('a');
	        }

	        a.href = url || '';

	        return a.href;
	    };
	}();

	exports.default = helpers;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _color = __webpack_require__(3);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var styles = {};

	styles.support = {};

	function getCoords(el) {
	    var docEl = document.documentElement,
	        body = document.body,
	        coords = el.getBoundingClientRect(),
	        top,
	        left;

	    top = coords.top + (window.pageYOffset || docEl.scrollTop || body.scrollTop || 0);
	    left = coords.left + (window.pageXOffset || docEl.scrollLeft || body.scrollLeft || 0);

	    top += docEl.clientTop || body.clientTop || 0;
	    left += docEl.clientLeft || body.clientLeft || 0;

	    return {
	        top: top,
	        left: left
	    };
	}

	styles.support.animation = function () {
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
	}();

	styles.rippleButton = function () {
	    var timerID;

	    return function (e) {
	        var btn, circle, coords, size, xPos, yPos, action, percent, btnColor, bg;

	        if (!styles.support.animation) {
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
	        bg = _color2.default[action](btnColor, percent);

	        if (circle) {
	            btn.removeChild(circle);
	            circle = null;
	        }

	        circle = document.createElement('div');
	        circle.style.width = size + 'px';
	        circle.style.height = size + 'px';
	        circle.style.top = yPos - size / 2 + 'px';
	        circle.style.left = xPos - size / 2 + 'px';
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
	}();

	exports.default = styles;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var color = {};

	color.lighten = function (color, percent) {
	    var parts = color.replace(/rgba?\(/, '').replace(/\)/, '').split(','),
	        red = parseInt(parts[0], 10),
	        green = parseInt(parts[1], 10),
	        blue = parseInt(parts[2], 10),
	        newColor = 'rgb(';

	    percent = percent / 100;

	    newColor += Math.round((255 - red) * percent) + red + ',';
	    newColor += Math.round((255 - green) * percent) + green + ',';
	    newColor += Math.round((255 - blue) * percent) + blue + ')';

	    return newColor;
	};

	color.darken = function (color, percent) {
	    var parts = color.replace(/rgba?\(/, '').replace(/\)/, '').split(','),
	        red = parseInt(parts[0], 10),
	        green = parseInt(parts[1], 10),
	        blue = parseInt(parts[2], 10),
	        newColor = 'rgb(';

	    percent = percent / 100;

	    newColor += Math.round((0 - red) * percent) + red + ',';
	    newColor += Math.round((0 - green) * percent) + green + ',';
	    newColor += Math.round((0 - blue) * percent) + blue + ')';

	    return newColor;
	};

	exports.default = color;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	        lastArgs,
	        lastContext,
	        COOLDOWN = 1;

	    return function wrapper() {
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
	        var context = this,
	            args = arguments;

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

	exports.default = decorators;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _DOM = __webpack_require__(6);

	var _DOM2 = _interopRequireDefault(_DOM);

	var _helpers = __webpack_require__(1);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _jquery = __webpack_require__(7);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var forms = {};

	forms.isPattern = function (pattern, str) {
	    return str.length && pattern.length ? new RegExp(pattern, 'g').test(str) : null;
	};

	forms.isEmail = function (str) {
	    return form.isPattern('^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$', str.toLowerCase());
	};

	forms.setValid = function (el, showNotice, id) {
	    el.addClass('js-input--valid').removeClass('js-input--invalid');
	    if (showNotice) {
	        _DOM2.default.hideNotice((0, _jquery2.default)('#' + id));
	    }
	};

	forms.setInvalid = function (el, e, noticeID, options) {
	    el.addClass('js-input--invalid').removeClass('js-input--valid');
	    e.preventDefault();

	    if (options.scrollToInvalid && firstInvalidField) {
	        _DOM2.default.scrollBody(firstInvalidField, options.scrollCorrection, {});
	    }
	    if (options.showNotice) {
	        _DOM2.default.showNotice(noticeID, 'notice', el, el.data('notice'));
	    }
	};

	forms.validate = function (form, e, options) {
	    var defaults = {
	        scrollToInvalid: true,
	        scrollCorrection: 0,
	        showNotice: true,
	        stopOnInvalid: true,
	        callback: _jquery2.default.noop
	    },
	        countInvalid = 0,
	        firstInvalidField;

	    form[0].firstInvalidField = null;

	    if (_helpers2.default.getClass(options) === 'Object') {
	        $$.extend(defaults, options);
	    }

	    form.find(':input').each(function () {
	        var pattern, isChecked, val, type, noticeID, self;

	        type = this.type;
	        val = (0, _jquery2.default)(this).val();
	        self = (0, _jquery2.default)(this);
	        noticeID = 'notice-' + self.data('noticeid');

	        switch (type) {
	            case 'text':
	            case 'password':
	            case 'textarea':
	            case 'number':
	            case 'tel':
	            case 'email':
	                {
	                    pattern = (0, _jquery2.default)(this).data('pattern');
	                    if (pattern) {
	                        switch (pattern) {
	                            case 'string':
	                                {
	                                    if (val.length) {
	                                        forms.setValid(self, defaults.showNotice, noticeID);
	                                        form[0].firstInvalidField = null;
	                                        defaults.callback();
	                                    } else {
	                                        if (!form[0].firstInvalidField) {
	                                            form[0].firstInvalidField = self;
	                                        }

	                                        forms.setInvalid(self, e, noticeID, form[0].firstInvalidField, defaults);
	                                        countInvalid += 1;
	                                        defaults.callback();

	                                        if (defaults.stopOnInvalid) {
	                                            return false;
	                                        }
	                                    }
	                                    break;
	                                }
	                            case 'email':
	                                {
	                                    if (forms.isEmail(val)) {
	                                        forms.setValid(self, defaults.showNotice, noticeID);
	                                        form[0].firstInvalidField = null;
	                                        defaults.callback();
	                                    } else {
	                                        if (!form[0].firstInvalidField) {
	                                            form[0].firstInvalidField = self;
	                                        }

	                                        forms.setInvalid(self, e, noticeID, form[0].firstInvalidField, defaults);
	                                        countInvalid += 1;
	                                        defaults.callback();

	                                        if (defaults.stopOnInvalid) {
	                                            return false;
	                                        }
	                                    }
	                                    break;
	                                }
	                            default:
	                                {
	                                    if (forms.isPattern(pattern, val)) {
	                                        forms.setValid(self, defaults.showNotice, noticeID);
	                                        form[0].firstInvalidField = null;
	                                        defaults.callback();
	                                    } else {
	                                        if (!form[0].firstInvalidField) {
	                                            form[0].firstInvalidField = self;
	                                        }

	                                        forms.setInvalid(self, e, noticeID, form[0].firstInvalidField, defaults);
	                                        countInvalid += 1;
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
	            case 'checkbox':
	                {
	                    isChecked = (0, _jquery2.default)(this).data('f');
	                    if (typeof isChecked === 'boolean') {
	                        if (self.prop('checked') === isChecked) {
	                            forms.setValid(self);
	                            form[0].firstInvalidField = null;
	                            defaults.callback();
	                        } else {
	                            if (!form[0].firstInvalidField) {
	                                form[0].firstInvalidField = self;
	                            }

	                            forms.setInvalid(self, e, noticeID, form[0].firstInvalidField, defaults);
	                            countInvalid += 1;
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

	exports.default = forms;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _helpers = __webpack_require__(1);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _jquery = __webpack_require__(7);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DOM = {};

	DOM.scrollBody = function (target, correction, options) {
	    (0, _jquery2.default)('html, body').animate({
	        scrollTop: target.offset().top - (correction || 0)
	    }, options || {});
	};

	DOM.hideAllNotices = function () {
	    (0, _jquery2.default)('.js-notice').remove();
	};

	DOM.hideNotice = function (notice) {
	    notice.remove();
	};

	DOM.showNotice = function (id, className, target, text) {
	    var notice = (0, _jquery2.default)('<div/>');

	    if (target.length && !(0, _jquery2.default)('#' + id).length) {
	        notice.attr('id', id);
	        notice.text(text).addClass('js-notice ' + className).appendTo(target.parent());
	        setTimeout(function () {
	            notice.addClass('js-notice--active');
	        }, 4);
	    }
	};

	DOM.hasClass = function (el, className) {
	    return _helpers2.default.inArray(el.className ? el.className.split(' ') : [], className);
	};

	DOM.getMaxHeight = function (blocks) {
	    var maxHeight = (0, _jquery2.default)(blocks[0]).outerHeight();

	    blocks.each(function () {
	        if ((0, _jquery2.default)(this).outerHeight() > maxHeight) {
	            maxHeight = (0, _jquery2.default)(this).outerHeight();
	        }
	    });

	    return maxHeight;
	};

	DOM.getScrollbarWidth = function () {
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
	}();

	exports.default = DOM;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = namespace;
	function namespace(nsString) {
	    var parts = nsString.split('.'),
	        parent = this;

	    if (parts[0] === 'Fail') {
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = addMethod;
	function addMethod(namespace, func) {
	    var parts = namespace.split('.'),
	        parent = this;

	    if (parts[0] === 'Fail') {
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

/***/ }
/******/ ])
});
;