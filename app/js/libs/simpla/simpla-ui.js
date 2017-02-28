;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['simpla'], factory);
    } else {
        // Browser globals
        factory(simpla);
    }
}(function (simpla) {
    'use strict';

    var body = $('body');

    // User interface classes
    simpla.namespace('UI');

    // Dropdown
    (function () {
        var resetCSS = {
            'display': '',
            'height': '',
            'overflow': '',
            'opacity': ''
        },
            effects = {
                toggle: ['show', 'hide'],
                slide: ['slideDown', 'slideUp'],
                fade: ['fadeIn', 'fadeOut']
            },
            customEffects = {},
            COOLDOWN = 1;

        function animate (effect, current, hide) {
            var self = this,
                hasClass = current.dropdown.hasClass('dd-dropdown--opened');

            if (hasClass || hide) {
                if (hasClass) {
                    self._defaults.beforeClose(self._container);
                }
                
                current.dropdown.removeClass('dd-dropdown--pressed');
                current.trigger.removeClass('dd-trigger--active');

                current.drop[effects[effect][1]]({
                    duration: parseInt(self._defaults.animationDuration, 10) || 0,
                    done: function () {
                        var hasClass = current.dropdown.hasClass('dd-dropdown--opened');

                        current.dropdown.removeClass('dd-dropdown--opened');
                        current.drop.css(resetCSS);

                        if (hasClass) {
                            self._defaults.afterClose(self._container);
                        }
                    }
                });
            } else {
                self._defaults.beforeOpen(self._container);
                current.dropdown.addClass('dd-dropdown--pressed');
                current.trigger.addClass('dd-trigger--active');

                current.drop[effects[effect][0]]({
                    duration: parseInt(self._defaults.animationDuration, 10) || 0,
                    done: function () {
                        current.dropdown.addClass('dd-dropdown--opened');
                        current.drop.css(resetCSS);
                        self._defaults.afterOpen(self._container);
                    }
                });
            }
        }

        function createDropdownsArray (arr, id) {
            var tmp = arr.slice(0),
                drop, trigger, innerID, parentID, next, self,
                that = this;
                
            tmp.each(function () {
                self = $(this);
                drop = self.children('.dd-drop');
                trigger = that._isEqual ? self : self.find('.' + that._defaults.trigger).first();
                innerID = Math.random();
                parentID = (+self.data('level') > 1) ? id : null;
                next = drop.first().find('.dd-dropdown:first');

                if (next.length) {
                    next = next.add(next.siblings('.dd-dropdown'));
                    createDropdownsArray.call(that, next, innerID);
                }

                that._dropdowns.push({
                    dropdown: self,
                    drop: drop.first(),
                    level: self.data('level'),
                    trigger: trigger,
                    id: innerID,
                    parentID: parentID
                });
            });
        }

        function getEffect () {
            var effect, isCustom;

            if (effects[this._defaults.effect] || customEffects[this._defaults.effect]) {
                effect = this._defaults.effect;
            } else {
                effect = 'toggle';
            }

            isCustom = Object.prototype.hasOwnProperty.call(customEffects, effect);

            return {
                effect: effect,
                isCustom: isCustom
            };
        }

        function hideNested (id) {
            var next = [], self = this, effectObj;

            self._dropdowns.forEach(function (item) {
                if (item.parentID === id) {
                    effectObj = getEffect.call(self);
                    effectObj.isCustom ? customEffects[effectObj.effect].call(self, item, true) : animate.call(self, effectObj.effect, item, true);
                    
                    next.push(item);
                }
            });

            if (next.length) {
                next.forEach(function (item) {
                    hideNested.call(self, item.id);
                });
            }
        }

        function hideSiblings (current, level) {
            var self = this, effectObj;

            self._dropdowns.forEach(function (item) {
                if (item !== current && item.level === level && item.dropdown.hasClass('dd-dropdown--opened')) {
                    effectObj = getEffect.call(self);
                    effectObj.isCustom ? customEffects[effectObj.effect].call(self, item, true) : animate.call(self, effectObj.effect, item, true);
                    
                    if (self._defaults.hideNested) {
                        hideNested.call(self, item.id);
                    }
                }
            });
        }

        function hideOnOtherDropdownsClick (container) {
            simpla.storage.dropdowns.forEach(function (item) {
                if (item._container.data('other-dropdowns') && item._container !== container && item._container.find('.dd-dropdown--opened').length) {
                    item._defaults.beforeClose(item._container);
                    
                    item._container.find('.dd-dropdown').removeClass('dd-dropdown--opened dd-dropdown--active dd-dropdown--pressed dd-trigger--active');
                    item._container.find('.dd-drop').css(resetCSS);
                    item._container.find('.dd-trigger').removeClass('dd-trigger--active');

                    item._defaults.afterClose(item._container);
                }
            });
        }

        function reinit (newOptions) {
            var pos = simpla.storage.dropdowns.indexOf(this);

            if (pos !== -1) {
                simpla.storage.dropdowns.splice(pos, 1);
            }
            this._dropdowns.length = 0;
            
            if (simpla.helpers.getClass(newOptions) === 'Object') {
                // simpla.helpers.extend(newOptions, this._defaults);
                $.extend(this._defaults, newOptions);
            }
            createDropdownsArray.call(this, this._rootDD);
            simpla.storage.dropdowns.push(this);
        }

        function init () {
            createDropdownsArray.call(this, this._rootDD);
            simpla.storage.dropdowns.push(this);
        }
        // Delegation
        body.on('click', function (e) {
            var target = $(e.target),
                dropdownContainer = target.closest('[data-dropdown]'),
                dropdown, i,
                current, effectObj, pos,
                request,
                launch;

            if (!dropdownContainer.length) {
                return;
            }

            for (i = 0; i < simpla.storage.dropdowns.length; i += 1) {
                if (simpla.storage.dropdowns[i]._container[0] === dropdownContainer[0]) {
                    dropdown = simpla.storage.dropdowns[i];
                    break;
                }
            }

            if (!dropdown) {
                return;
            }

            target = $(e.target).closest('.' + dropdown._defaults.trigger);

            if (!target.length) {
                return;
            }

            if (dropdown._defaults.shouldPreventDefault) {
                e.preventDefault();
            }
            
            if (dropdown._state) {
                return;
            }

            launch = function () {
                effectObj.isCustom ? customEffects[effectObj.effect].call(dropdown, current, false) : animate.call(dropdown, effectObj.effect, current, false);
            
                if (dropdown._defaults.hideSiblings) {
                    hideSiblings.call(dropdown, current, current.level);
                }
                if (dropdown._defaults.hideNested && !current.dropdown.hasClass('dd-dropdown--pressed')) {
                    hideNested.call(dropdown, current.id);
                }

                setTimeout(function () {
                    dropdown._state = null;
                }, parseInt(dropdown._defaults.animationDuration, 10) || 0);
            };

            hideOnOtherDropdownsClick.call(dropdown, dropdown._container);

            dropdown._state = COOLDOWN;
            current = target.closest('.dd-dropdown');

            for (i = 0; i < dropdown._dropdowns.length; i++) {
                if (dropdown._dropdowns[i].dropdown[0] === current[0]) {
                    current = dropdown._dropdowns[i];
                    break;
                }
            }

            effectObj = getEffect.call(dropdown);

            if (typeof dropdown._defaults.wait === 'function') {
                request = dropdown._defaults.wait(current);

                if (request.then) {
                    pos = simpla.storage.dropdowns.indexOf(dropdown);

                    if (pos !== -1) {
                        simpla.storage.dropdowns.splice(pos, 1);
                    }
                    dropdown._dropdowns.length = 0;

                    $.when(request).then(function (a, b) {
                        createDropdownsArray.call(dropdown, dropdown._rootDD);
                        simpla.storage.dropdowns.push(dropdown);
                        launch();
                    });
                } else {
                    launch();
                }
            } else {
                launch();
            }
        });
        // Delegation (END)

        simpla.UI.Dropdown = function (root, options) {
            var self = this,
                defaults, dropdowns,
                container, state,
                firstDD, siblings, rootDD;

            defaults = simpla.helpers.createMap();

            defaults.hideSiblings = true;
            defaults.hideNested = true;
            defaults.trigger = 'dd-dropdown';
            defaults.effect = 'toggle';
            defaults.shouldPreventDefault = true;
            defaults.animationDuration = 0;
            defaults.beforeOpen = $.noop;
            defaults.afterOpen = $.noop;
            defaults.beforeClose = $.noop;
            defaults.afterClose = $.noop;
            defaults.wait = null;
            
            dropdowns = [];

            Object.defineProperty(this, '_dropdowns', {
                get: function () {
                    return dropdowns;
                }
            });

            if (simpla.helpers.getClass(options) === 'Object') {
                $.extend(defaults, options);
            }

            defaults.animationDuration = parseInt(defaults.animationDuration, 10) || 0;

            Object.defineProperty(this, '_defaults', {
                get: function () {
                    return defaults;
                }
            });

            container = $('#' + root);
            if (!container.length) {
                throw new Error('The container is not found!');
            }

            Object.defineProperty(this, '_container', {
                get: function () {
                    return container;
                }
            });

            Object.defineProperty(this, '_isEqual', {
                get: function () {
                    return (this._defaults.trigger === 'dd-dropdown');
                }
            });

            state = null;
            Object.defineProperty(this, '_state', {
                get: function () {
                    return state;
                },
                set: function (value) {
                    if (value === COOLDOWN || value === null) {
                        state = value;
                    } else {
                        throw new Error('<state> cannot be anything except for <null> or <1>');
                    }
                }
            });

            // Find the first dropdown
            firstDD = this._container.find('.dd-dropdown:first');
            // Find ajacent dropdowns
            siblings = firstDD.siblings('.dd-dropdown');
            // Join the first dropdown with the ajacent dropdowns so we get the root (parent) dropdowns
            rootDD = firstDD.add(siblings);

            Object.defineProperty(this, '_rootDD', {
                get: function () {
                    return rootDD;
                }
            });

            return this;
        };

        simpla.UI.Dropdown.hideOutside = function () {
            var self = this,
                isTouch;

            function hide (e) {
                if (e.type === 'touchstart') {
                    isTouch = true;
                }
                if (isTouch && e.type === 'click') {
                    return;
                }
                if (!$(e.target).closest('[data-outside="true"]').length && !$(e.target).closest('.dd-dropdown').length) {
                    simpla.storage.dropdowns.forEach(function (item) {
                        var container = item._container;

                        if (container.data('outside') && container.find('.dd-dropdown--opened').length) {
                            item._defaults.beforeClose(container);

                            container.find('.dd-dropdown').removeClass('dd-dropdown--opened dd-dropdown--active dd-dropdown--pressed');
                            container.find('.dd-drop').css(resetCSS);
                            container.find('.dd-trigger').removeClass('dd-trigger--active');

                            item._defaults.afterClose(container);
                        }
                    });
                }
            }

            body.on('touchstart click', hide);
        };
        simpla.UI.Dropdown.hideOutside = simpla.decorators.once(simpla.UI.Dropdown.hideOutside, null);

        simpla.UI.Dropdown.addEffect = function (name, handler) {
            if (!Object.prototype.hasOwnProperty.call(customEffects, name)) {
                customEffects[name] = handler;
            }
        };

        Object.defineProperty(simpla.UI.Dropdown.prototype, 'init', {
            value: function () {
                init.call(this);
            },
            enumerable: false
        });
        Object.defineProperty(simpla.UI.Dropdown.prototype, 'reinit', {
            value: function (newOptions) {
                reinit.call(this, newOptions);
            },
            enumerable: false
        });
        Object.defineProperty(simpla.UI.Dropdown.prototype, 'close', {
            value: function (effect, current, hide) {
                animate.call(this, effect, current, hide);
            },
            enumerable: false
        });
        // Dropdown (END)
    }());

    // Spinner
    (function () {
        var currentSpinner;

        function update (action) {
            var self = this;

            this._timerID = setTimeout(function () {
                if (action === 'inc') {
                    inc.call(self);
                } else {
                    dec.call(self);
                }

                self._intervalID = setInterval(function () {
                    if (action === 'inc') {
                        inc.call(self);
                    } else {
                        dec.call(self);
                    }
                }, self._defaults.speed);
            }, self._defaults.delay);
        }

        function inc () {
            var amount = parseFloat(this._field.val()),
                max = parseFloat(this._defaults.max),
                step = parseFloat(this._defaults.step),
                precision = parseInt(this._defaults.precision, 10) || 0;

            if (!isNaN(max) && amount < max) {
                if ((max - amount) < step) {
                    amount += (max - amount);
                } else {
                    amount += step;
                }

                this._field.val(amount.toFixed(precision));
            } else if (isNaN(max)) {
                amount += step;

                this._field.val(amount.toFixed(precision));
            }
        }

        function dec () {
            var amount = parseFloat(this._field.val()),
                min = parseFloat(this._defaults.min),
                step = parseFloat(this._defaults.step),
                precision = parseInt(this._defaults.precision, 10) || 0;

            if (!isNaN(min) && amount > min) {
                if ((amount - step) < min) {
                    amount -=  (amount - min);
                } else {
                    amount -= step;
                }

                this._field.val(amount.toFixed(precision));
            } else if (isNaN(min)) {
                amount -= step;
                
                this._field.val(amount.toFixed(precision));
            }
        }

        function reinit (newOptions) {
            var pos = simpla.storage.spinners.indexOf(this);

            if (pos !== -1) {
                simpla.storage.spinners.splice(pos, 1);
            }

            if (simpla.helpers.getClass(newOptions) === 'Object') {
                $.extend(this._defaults, newOptions);
            }

            simpla.storage.spinners.push(this);
        }

        function init () {
            simpla.storage.spinners.push(this);
        }

        // Delegation
        function findSpinner (e) {
            var target = $(e.target),
                spinnerContainer = target.closest('[data-spinner]'),
                spinner, i;

            if (!spinnerContainer.length) {
                return false;
            }

            for (i = 0; i < simpla.storage.spinners.length; i += 1) {
                if (simpla.storage.spinners[i]._container[0] === spinnerContainer[0]) {
                    spinner = simpla.storage.spinners[i];
                    break;
                }
            }

            return spinner;
        }
        body.on('click', function (e) {
            var spinner, target, control;

            target = $(e.target);
            control = target.closest('.sp-control');

            if (!control.length) {
                return;
            }

            spinner = findSpinner(e);

            if (!spinner) {
                return;
            }

            if (spinner._defaults.shouldPreventDefault) {
                e.preventDefault();
            }

            if (control.hasClass('sp-control--plus')) {
                inc.call(spinner);
            } else if (control.hasClass('sp-control--minus')) {
                dec.call(spinner);
            }
        });
        body.on('change blur', function (e) {
            var spinner, target, field,
                val, min, max;

            target = $(e.target);
            field = target.closest('.sp-field');

            if (!field.length) {
                return;
            }

            spinner = findSpinner(e);

            if (!spinner) {
                return;
            }

            val = field.val();
            min = parseFloat(spinner._defaults.min);
            max = parseFloat(spinner._defaults.max);

            if (parseFloat(val) > max && !isNaN(max)) {
                field.val(max);
            } else if (parseFloat(val) < min && !isNaN(min)) {
                field.val(min);
            } else if (!simpla.helpers.isNumeric(val)) {
                field.val(spinner._defaults.initial);
            }
            field.val(parseFloat(field.val()).toFixed(parseInt(spinner._defaults.precision, 10) || 0));
        });
        body.on('keydown', function (e) {
            var spinner, target, field;

            target = $(e.target);
            field = target.closest('.sp-field');

            if (!field.length) {
                return;
            }

            spinner = findSpinner(e);

            if (!spinner) {
                return;
            }
            spinner.previousValue = field.val();
        });
        body.on('input', function (e) {
            var spinner, target, field,
                min, max;

            target = $(e.target);
            field = target.closest('.sp-field');

            if (!field.length) {
                return;
            }

            spinner = findSpinner(e);

            if (!spinner) {
                return;
            }

            min = parseFloat(spinner._defaults.min),
            max = parseFloat(spinner._defaults.max);

            if (!simpla.helpers.isNumeric(field.val()) && field.val() !== '') {
                if (field.val() === '-' && (min < 0 || max < 0)) {
                    return;
                }
                field.val(spinner.previousValue);
            }
        });
        body.on('touchstart mousedown', function (e) {
            var isTouch = false;

            return function (e) {
                var spinner, target, control;

                if (e.type === 'touchstart') {
                    isTouch = true;
                }
                if (e.type === 'mousedown' && isTouch) {
                    return;
                }

                target = $(e.target);
                control = target.closest('.sp-control');

                if (!control.length) {
                    return;
                }

                spinner = findSpinner(e);

                if (!spinner || !spinner._defaults.launchOnClamp) {
                    return;
                }

                currentSpinner = spinner;

                if (control.hasClass('sp-control--plus')) {
                    update.call(spinner, 'inc');
                } else if (control.hasClass('sp-control--minus')) {
                    update.call(spinner, 'dec');
                }
            };
        }());
        body.on('touchend mouseup', function () {
            var isTouch = false;

            return function (e) {
                var spinner;

                if (e.type === 'touchend') {
                    isTouch = true;
                }
                if (e.type === 'mouseup' && isTouch) {
                    return;
                }

                spinner = findSpinner(e);

                if (!spinner || !spinner._defaults.launchOnClamp) {
                    return;
                }

                currentSpinner = null;
                clearTimeout(spinner._timerID);
                clearInterval(spinner._intervalID);
            };
        }());
        body.on('touchmove mouseout', function () {
            var isTouch = false;

            return function (e) {
                var spinner, touch, target,
                    x, y, elUnderFinger;

                if (e.type === 'touchmove') {
                    isTouch = true;
                }
                if (e.type === 'mouseout' && isTouch) {
                    return;
                }

                if (!currentSpinner || !currentSpinner._defaults.launchOnClamp) {
                    return;
                }

                if (e.type === 'touchmove') {
                    touch = e.touches[0];
                    x = touch.clientX;
                    y = touch.clientY;
                    elUnderFinger = $(document.elementFromPoint(x, y));


                    if (elUnderFinger.closest('[data-spinner]')[0] === currentSpinner._container[0]) {
                        return;
                    }

                    clearTimeout(currentSpinner._timerID);
                    clearInterval(currentSpinner._intervalID);
                    currentSpinner = null;
                } else {
                    target = $(e.relatedTarget).closest('[data-spinner]');

                    if (target[0] === currentSpinner._container[0]) {
                        return;
                    }

                    clearTimeout(currentSpinner._timerID);
                    clearInterval(currentSpinner._intervalID);
                    currentSpinner = null;
                }
            };
        }());
        // Delegation (END)

        simpla.UI.Spinner = function (root, options) {
            var defaults,
                container,
                controls, plus, minus, field,
                timerID, intervalID;

            defaults = simpla.helpers.createMap();
            defaults.min = null;
            defaults.max = null;
            defaults.initial = 0;
            defaults.precision = 0;
            defaults.step = 1;
            defaults.delay = 200;
            defaults.speed = 100;
            defaults.shouldPreventDefault = true;
            defaults.launchOnClamp = true;

            timerID = null;
            intervalID = null;

            this.previousValue = null;

            container = $('#' + root);
            controls = container.find('.sp-control');
            plus = container.find('.sp-control--plus');
            minus = container.find('.sp-control--minus');
            field = container.find('.sp-field');

            Object.defineProperties(this, {
                _timerID: {
                    get: function () {
                        return timerID;
                    },
                    set: function (value) {
                        if (typeof value === 'number') {
                            timerID = value;
                        } else {
                            throw new Error('<timerID> can only be <number>');
                        }
                    }
                },
                _intervalID: {
                    get: function () {
                        return intervalID;
                    },
                    set: function (value) {
                        if (typeof value === 'number') {
                            intervalID = value;
                        } else {
                            throw new Error('<intervalID> can only be <number>');
                        }
                    }
                },
                _container: {
                    get: function () {
                        return container;
                    }
                },
                _controls: {
                    get: function () {
                        return  controls;
                    }
                },
                _plus: {
                    get: function () {
                        return plus;
                    }
                },
                _minus: {
                    get: function () {
                        return minus;
                    }
                },
                _field: {
                    get: function () {
                        return field;
                    }
                }
            });

            if (simpla.helpers.getClass(options) === 'Object') {
                // simpla.helpers.extend(options, defaults);
                $.extend(defaults, options);
            }

            Object.defineProperty(this, '_defaults', {
                get: function () {
                    return defaults;
                }
            });

            return this;
        };

        Object.defineProperty(simpla.UI.Spinner.prototype, 'reinit', {
            value: function (newOptions) {
                reinit.call(this, newOptions);
            },
            enumerable: false
        });
        Object.defineProperty(simpla.UI.Spinner.prototype, 'init', {
            value: function () {
                init.call(this);
            },
            enumerable: false
        });
    }());
    // Spinner (END)

    (function () {
        var effects = {
            toggle: 'toggle',
            slide: 'slideToggle',
            fade: 'fadeToggle'
        };

        function findTabs (e, tabsType) {
            var target = $(e.target),
                tabsContainer = target.closest('[data-tabs]'),
                tabs, i;

            if (!tabsContainer.length) {
                return false;
            }

            for (i = 0; i < simpla.storage[tabsType].length; i += 1) {
                if (simpla.storage[tabsType][i]._container[0] === tabsContainer[0]) {
                    tabs = simpla.storage[tabsType][i];
                    break;
                }
            }

            return tabs;
        }

        // Tabs (static)
        (function () {
            function switchTab (tabs) {
                var that = $(this),
                    id = that.data('tab'),
                    effect = effects[tabs._defaults.effect] ? effects[tabs._defaults.effect] : 'toggle',
                    classAction;

                if (!tabs._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !tabs._defaults.toggleTabs)) {
                    return;
                }

                classAction = tabs._defaults.toggleTabs ? 'toggleClass' : 'addClass';

                tabs._defaults.beforeAnimation();
                tabs._isAnimationFinished = false;

                if (tabs._defaults.hideAjacentTabs) {
                    tabs._desktopTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active');
                    tabs._tabContent.not('[data-tab="' + id + '"]').removeClass('t-tab-item--active');
                }
                
                that[classAction]('t-tab-nav-item--active');
                
                tabs._tabContent.filter('[data-tab="' + id + '"]')
                    .stop(true, true)[effect](parseInt(tabs._defaults.speed, 10) || 0, function () {
                        $(this)[classAction]('t-tab-item--active').removeAttr('style');

                        tabs._isAnimationFinished = true;

                        tabs._defaults.afterAnimation();

                        if (tabs._defaults.scrollToActive) {
                            simpla.DOM.scrollBody(that, {}, tabs._defaults.scrollCorrection);
                        }
                    });
            }

            function reinit (newOptions) {
                var pos = simpla.storage.staticTabs.indexOf(this);

                if (pos !== -1) {
                    simpla.storage.staticTabs.splice(pos, 1);
                }
                
                if (simpla.helpers.getClass(newOptions) === 'Object') {
                    $.extend(this._defaults, newOptions);
                }

                simpla.storage.staticTabs.push(this);
            }

            function init () {
                simpla.storage.staticTabs.push(this);
            }
            // Delegation
            body.on('click', function (e) {
                var tabs, target, tabNavItem;

                target = $(e.target);
                tabNavItem = target.closest('.t-tab-nav-item');

                if (!tabNavItem.length) {
                    return;
                }

                tabs = findTabs(e, 'staticTabs');

                if (!tabs) {
                    return;
                }

                if (tabs._defaults.shouldPreventDefault) {
                    e.preventDefault();
                }

                switchTab.call(tabNavItem, tabs);
            });
            // Delegation (END)

            simpla.UI.StaticTabs = function (container, options) {
                var defaults, isAnimationFinished = true,
                    container,
                    desktopTabNav,
                    tabContent;

                defaults = simpla.helpers.createMap();

                defaults.effect = 'toggle';
                defaults.speed = 0;
                defaults.shouldPreventDefault = true;
                defaults.toggleTabs = false;
                defaults.hideAjacentTabs = true;
                defaults.scrollToActive = false;
                defaults.scrollCorrection = 0;
                defaults.beforeAnimation = $.noop;
                defaults.afterAnimation = $.noop;

                Object.defineProperty(this, '_isAnimationFinished', {
                    get: function () {
                        return isAnimationFinished;
                    },
                    set: function (value) {
                        if (typeof value === 'boolean') {
                            isAnimationFinished = value;
                        } else {
                            throw new Error('<isAnimationFinished> can only be <boolean>');
                        }
                    }
                });

                container = $('#' + container);
                desktopTabNav = container.find('.t-tab-nav-item');
                tabContent = container.find('.t-tab-item');

                Object.defineProperties(this, {
                    _container: {
                        get: function () {
                            return container;
                        }
                    },
                    _desktopTabNav: {
                        get: function () {
                            return desktopTabNav;
                        }
                    },
                    _tabContent: {
                        get: function () {
                            return tabContent;
                        }
                    }
                });

                if (simpla.helpers.getClass(options) === 'Object') {
                    // simpla.helpers.extend(options, defaults);
                    $.extend(defaults, options);
                }

                Object.defineProperty(this, '_defaults', {
                    get: function () {
                        return defaults;
                    }
                });

                return this;    
            };

            Object.defineProperty(simpla.UI.StaticTabs.prototype, 'reinit', {
                value: function (newOptions) {
                    reinit.call(this, newOptions);
                }
            });
            Object.defineProperty(simpla.UI.StaticTabs.prototype, 'init', {
                value: function () {
                    init.call(this);
                }
            });
        }());
        // Tabs (static) (END)

        // Tabs (adaptive)
        (function () {
            function switchTabDesktop (tabs) {
                var that = $(this),
                    id = that.data('tab'),
                    effect = effects[tabs._defaults.desktopEffect] ? effects[tabs._defaults.desktopEffect] : 'toggle',
                    desktopClassAction, mobileClassAction;

                if (!tabs._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !tabs._defaults.toggleTabsDesktop)) {
                    return;
                }

                desktopClassAction = tabs._defaults.toggleTabsDesktop ? 'toggleClass' : 'addClass';
                mobileClassAction = tabs._defaults.toggleTabsMobile ? 'toggleClass' : 'addClass';

                tabs._defaults.beforeAnimation();
                tabs._isAnimationFinished = false;

                if (tabs._defaults.hideAjacentTabsDesktop) {
                    tabs._desktopTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active');
                    tabs._tabContent.not('[data-tab="' + id + '"]').removeClass('t-tab-item--active');
                }

                tabs._desktopTabNav.removeClass('t-tab-nav-item--active_desktop');

                tabs._mobileTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active t-tab-nav-item--active_mobile');

                if (!tabs._defaults.toggleTabsMobile) {
                    // tabs._mobileTabNav.filter('[data-tab="' + id + '"]').addClass('t-tab-nav-item--active t-tab-nav-item--active_mobile');
                    tabs._tabContent.filter('[data-tab="' + id + '"]').addClass('t-tab-item--active_mobile');
                }
                tabs._mobileTabNav.filter('[data-tab="' + id + '"]')[mobileClassAction]('t-tab-nav-item--active t-tab-nav-item--active_mobile');

                that[desktopClassAction]('t-tab-nav-item--active');

                tabs._tabContent
                    .not('[data-tab="' + id + '"]')
                    .removeClass('t-tab-item--active_mobile t-tab-item--active_desktop');

                tabs._tabContent.filter('[data-tab="' + id + '"]')
                    .stop(true, true)[effect](parseInt(tabs._defaults.desktopSpeed, 10) || 0, function () {
                        $(this)[desktopClassAction]('t-tab-item--active t-tab-item--active_desktop').removeAttr('style');

                        tabs._isAnimationFinished = true;

                        tabs._defaults.afterAnimation();

                        if (tabs._defaults.scrollToActiveDesktop) {
                            simpla.DOM.scrollBody(that, {}, tabs._defaults.scrollCorrectionDesktop);
                        }
                    });
            }

            function switchTabMobile (tabs) {
                var that = $(this),
                    id = $(this).data('tab'),
                    effect = effects[tabs._defaults.mobileEffect] ? effects[tabs._defaults.mobileEffect] : 'toggle',
                    mobileClassAction, desktopClassAction;

                if (!tabs._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !tabs._defaults.toggleTabsMobile)) {
                    return;
                }

                mobileClassAction = tabs._defaults.toggleTabsMobile ? 'toggleClass' : 'addClass';
                desktopClassAction = tabs._defaults.toggleTabsDesktop ? 'toggleClass' : 'addClass';

                tabs._defaults.beforeAnimation();
                tabs._isAnimationFinished = false;

                if (tabs._defaults.hideAjacentTabsMobile) {
                    tabs._mobileTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active');
                    tabs._tabContent.not('[data-tab="' + id + '"]').removeClass('t-tab-item--active');
                }

                tabs._desktopTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active t-tab-nav-item--active_desktop');
                tabs._mobileTabNav.removeClass('t-tab-nav-item--active_mobile');

                if (!tabs._defaults.toggleTabsDesktop) {
                    // tabs._desktopTabNav.filter('[data-tab="' + id + '"]').addClass('t-tab-nav-item--active t-tab-nav-item--active_desktop');
                    tabs._tabContent.filter('[data-tab="' + id + '"]').addClass('t-tab-item--active_desktop');
                }
                tabs._desktopTabNav.filter('[data-tab="' + id + '"]')[desktopClassAction]('t-tab-nav-item--active t-tab-nav-item--active_desktop');

                that[mobileClassAction]('t-tab-nav-item--active');

                tabs._tabContent
                    .not('[data-tab="' + id + '"]')
                    .removeClass('t-tab-item--active_desktop t-tab-item--active_mobile');

                tabs._tabContent.filter('[data-tab="' + id + '"]')
                    .stop(true, true)[effect](parseInt(tabs._defaults.mobileSpeed, 10) || 0, function () {
                        $(this)[mobileClassAction]('t-tab-item--active').removeAttr('style');

                        tabs._isAnimationFinished = true;

                        tabs._defaults.afterAnimation();

                        if (tabs._defaults.scrollToActiveMobile) {
                            simpla.DOM.scrollBody(that, {}, tabs._defaults.scrollCorrectionMobile);
                        }
                    });
            }

            function reinit (newOptions) {
                var pos = simpla.storage.adaptiveTabs.indexOf(this);

                if (pos !== -1) {
                    simpla.storage.adaptiveTabs.splice(pos, 1);
                }
                
                if (simpla.helpers.getClass(newOptions) === 'Object') {
                    $.extend(this._defaults, newOptions);
                }

                simpla.storage.adaptiveTabs.push(this);
            }

            function init () {
                simpla.storage.adaptiveTabs.push(this);
            }

            // Delegation
            body.on('click', function (e) {
                var tabs, target, tabNavItem;

                target = $(e.target);
                tabNavItem = target.closest('.t-tab-nav-item');

                if (!tabNavItem.length) {
                    return;
                }

                tabs = findTabs(e, 'adaptiveTabs');

                if (!tabs) {
                    return;
                }

                if (tabs._defaults.shouldPreventDefault) {
                    e.preventDefault();
                }

                if (tabNavItem.hasClass('t-tab-nav-item--desktop')) {
                    switchTabDesktop.call(tabNavItem, tabs);
                } else if (tabNavItem.hasClass('t-tab-nav-item--mobile')) {
                    switchTabMobile.call(tabNavItem, tabs);
                }
            });
            // Delegation (END)

            simpla.UI.AdaptiveTabs = function (container, options) {
                var defaults, isAnimationFinished = true,
                    container,
                    desktopTabNav, mobileTabNav,
                    tabContent;
                
                defaults = simpla.helpers.createMap();

                defaults.desktopEffect = 'toggle';
                defaults.desktopSpeed = 0;
                defaults.shouldPreventDefault = true;
                defaults.mobileEffect = 'slide';
                defaults.mobileSpeed = 300;
                defaults.hideAjacentTabsMobile = true;
                defaults.hideAjacentTabsDesktop = true;
                defaults.scrollToActiveMobile = true;
                defaults.scrollCorrectionMobile = 0;
                defaults.scrollToActiveDesktop = false;
                defaults.scrollCorrectionDesktop = 0;
                defaults.toggleTabsDesktop = false;
                defaults.toggleTabsMobile = true;
                defaults.beforeAnimation = $.noop;
                defaults.afterAnimation = $.noop;

                Object.defineProperty(this, '_isAnimationFinished', {
                    get: function () {
                        return isAnimationFinished;
                    },
                    set: function (value) {
                        if (typeof value === 'boolean') {
                            isAnimationFinished = value;
                        } else {
                            throw new Error('<isAnimationFinished> can only be <boolean>');
                        }
                    }
                });

                container = $('#' + container);
                desktopTabNav = container.find('.t-tab-nav-item--desktop');
                mobileTabNav = container.find('.t-tab-nav-item--mobile');
                tabContent = container.find('.t-tab-item');

                Object.defineProperties(this, {
                    _container: {
                        get: function () {
                            return container;
                        }
                    },
                    _desktopTabNav: {
                        get: function () {
                            return desktopTabNav;
                        }
                    },
                    _mobileTabNav: {
                        get: function () {
                            return mobileTabNav;
                        }
                    },
                    _tabContent: {
                        get: function () {
                            return tabContent;
                        }
                    }
                });

                if (simpla.helpers.getClass(options) === 'Object') {
                    $.extend(defaults, options);
                }
                Object.defineProperty(this, '_defaults', {
                    get: function () {
                        return defaults;
                    }
                });

                return this;
            };

            Object.defineProperty(simpla.UI.AdaptiveTabs.prototype, 'reinit', {
                value: function (newOptions) {
                    reinit.call(this, newOptions);
                }
            });
            Object.defineProperty(simpla.UI.AdaptiveTabs.prototype, 'init', {
                value: function () {
                    init.call(this);
                }
            });
        }());
        // Tabs (adaptive) (END)
    }());

    // Bundle
    (function () {
        var triggerCls = 'bundle-trigger--active',
            containerCls = 'bundle-container--active',
            overlayCls = 'bundle-overlay--visible',
            bodyCls = 'body--hidden';

        function findBundle (e) {
            var target = $(e.target),
                bundleEl = target.closest('[data-bundle]'),
                bundle, i;

            if (!bundleEl.length) {
                return false;
            }

            for (i = 0; i < simpla.storage.bundles.length; i += 1) {
                if (simpla.storage.bundles[i]._id === bundleEl.data('bundle-id')) {
                    bundle = simpla.storage.bundles[i];
                    break;
                }
            }

            return bundle;
        }

        function switchBundle (options, action) {
            this._trigger[action + 'Class'](triggerCls);
            this._container[action + 'Class'](containerCls);

            if (this._trigger.data('body')) {
                $('html')[action + 'Class']('html--hidden');
            }
            if (this._trigger.data('overlay')) {
                this._overlay[action + 'Class'](overlayCls);
            }

            options.callback(this._trigger, this._close, this._container);
        }

        function hideOnOtherBundleClick (trigger, close, container, overlay) {
            simpla.storage.bundles.forEach(function (item) {
                var options = item._defaults;
                if ((item._trigger !== trigger || item._close !== close || item._container !== container || item._overlay !== overlay) && item._trigger.hasClass(triggerCls)) {
                    switchBundle.call(item, options, 'remove');
                }
            });
        }

        function init () {
            simpla.storage.bundles.push(this);  
        }

        // Delegation
        body.on('click', function (e) {
            var bundle = findBundle(e),
                target, action;

            if (!bundle) {
                return;
            }

            target = $(e.target).closest('[data-bundle]');
            action = target.data('bundle-action');

            if (!action) {
                return;
            }

            if (bundle._defaults.shouldPreventDefault) {
                e.preventDefault();
            }

            switchBundle.call(bundle, bundle._defaults, action === 'toggle' ? 'toggle' : 'remove');
        });
        // Delegation (END)

        simpla.UI.Bundle = function (trigger, close, options) {
            var defaults = simpla.helpers.createMap(),
                trigger, container, overlay, close,
                id;

            defaults.shouldPreventDefault = true;
            defaults.callback = $.noop;

            if (simpla.helpers.getClass(options) === 'Object') {
                $.extend(this._defaults, options);
            }

            Object.defineProperty(this, '_defaults', {
                get: function () {
                    return defaults;
                }
            });

            trigger = $('.' + trigger);
            container = $('.' + trigger.data('container'));
            overlay = trigger.data('overlay') ? $('.' +  trigger.data('overlay')) : null;
            close = close ? $('.' + close) : null;

            id = trigger.first().data('bundle-id');

            Object.defineProperties(this, {
                _trigger: {
                    get: function () {
                        return trigger;
                    }
                },
                _container: {
                    get: function () {
                        return container;
                    }
                },
                _overlay: {
                    get: function () {
                        return overlay;
                    }
                },
                _close: {
                    get: function () {
                        return close;
                    }
                },
                _id: {
                    get: function () {
                        return id;
                    }
                }
            });

            return this;
        };

        Object.defineProperty(simpla.UI.Bundle.prototype, 'init', {
            value: function () {
                init.call(this);
            },
            enumerable: false
        });

        simpla.UI.Bundle.hideOutside = function () {
            var isTouch;

            function hide (e) {
                if (e.type === 'touchstart') {
                    isTouch = true;
                }
                if (isTouch && e.type === 'click') {
                    return;
                }
                if (!$(e.target).closest('[data-bundle-outside="true"]').length) {
                    simpla.storage.bundles.forEach(function (item) {
                        if (item._trigger.hasClass(triggerCls)) {
                            switchBundle.call(item, item._defaults, 'remove');
                        }
                    });
                }
            }
            
            body.on('touchstart click', hide);
        };
        simpla.UI.Bundle.hideOutside = simpla.decorators.once(simpla.UI.Bundle.hideOutside, null);
    }());
    // Bundle (END)

    // Search
    (function () {
        function findSearch (e) {
            var target = $(e.target),
                searchContainer = target.closest('[data-search]'),
                search, i;

            if (!searchContainer.length) {
                return false;
            }

            for (i = 0; i < simpla.storage.searches.length; i += 1) {
                if (simpla.storage.searches[i]._container[0] === searchContainer[0]) {
                    search = simpla.storage.searches[i];
                    break;
                }
            }

            return search;
        }
        function init () {
            simpla.storage.searches.push(this);
            // var self = this,
            //     boxes = self._parent.find('[data-q="true"]');

            // self._field.on('input', function () {
            //     var text = $(this).val(),
            //         reg = new RegExp('(' + text + ')', 'gi');
                    
            //     boxes.each(function () {
            //         var that = $(this);
                    
            //         that.html(that.html().replace(/<\/?\w[1-6]?\w*\s*.*?>/g, ''));

            //         if (that.text().search(reg) !== -1) {
            //             that.html(that.html().replace(reg, '<span class="s-match">$1</span>'));
            //             that.removeClass('s-match--visible').addClass('s-match--invisible');
            //         } else {
            //             that.addClass('s-match--invisible').removeClass('s-match--visible');
            //         }
            //     });

            //     if (self._defaults.invokeCallback) {
            //         self._defaults.callback();
            //     }
            // });
        }

        // Delegation
        body.on('input', function (e) {
            var search = findSearch(e),
                reg;

            if (!search) {
                return;
            }

            reg = new RegExp('(' + search._field.val() + ')', 'gi');

            search._boxes.each(function () {
                var that = $(this);
                
                that.html(that.html().replace(/<\/?\w[1-6]?\w*\s*.*?>/g, ''));

                if (that.text().search(reg) !== -1) {
                    that.html(that.html().replace(reg, '<span class="s-match">$1</span>'));
                    that.addClass('s-match--visible').removeClass('s-match--invisible');
                } else {
                    that.addClass('s-match--invisible').removeClass('s-match--visible');
                }
            });

            if (search._defaults.invokeCallback) {
                search._defaults.callback();
            }
        });
        // Delegation (END)

        simpla.UI.Search = function (container, options) {
            var defaults = simpla.helpers.createMap(),
                container, field, boxes;

            defaults.shouldPreventDefault = true;
            defaults.invokeCallback = false;
            defaults.callback = $.noop;

            container = $('#' + container);
            field = container.find('.s-field');
            boxes = container.find('[data-q="true"]');

            Object.defineProperties(this, {
                _container: {
                    get: function () {
                        return container;
                    }
                },
                _field: {
                    get: function () {
                        return field;
                    }
                },
                _boxes: {
                    get: function () {
                        return boxes;
                    }
                }
            });

            if (simpla.helpers.getClass(options) === 'Object') {
                $.extend(defaults, options);
            }
            Object.defineProperty(this, '_defaults', {
                get: function () {
                    return defaults;
                }
            });

            return this;
        };

        Object.defineProperty(simpla.UI.Search.prototype, 'init', {
            value: function () {
                init.call(this);
            },
            enumerable: false
        });
    }());
    // Search (END)
    // User interface classes (END)
}));