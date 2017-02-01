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

            // isCustom = (effect in customEffects);
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
                }
            });
        }

        function hideOnOtherDropsClick (container) {
            simpla.storage.dropdowns.forEach(function (item) {
                if (item._container.data('otherdrops') && item._container !== container && item._container.find('.dd-dropdown--opened').length) {
                    item._defaults.beforeClose(item._container);
                    
                    item._container.find('.dd-dropdown').removeClass('dd-dropdown--opened dd-dropdown--active dd-dropdown--pressed dd-trigger--active');
                    item._container.find('.dd-drop').css(resetCSS);
                    item._container.find('.dd-trigger').removeClass('dd-trigger--active');

                    item._defaults.afterClose(item._container);
                }
            });
        }

        function reinit (newOptions) {
            var pos = simpla.storage.dropdowns.indexOf(self);

            if (pos !== -1) {
                simpla.storage.dropdowns.splice(pos, 1);
            }
            this._dropdowns.length = 0;
            
            if (simpla.helpers.getClass(newOptions) === 'Object') {
                simpla.helpers.extend(newOptions, this._defaults);
            }

            this.init();
        }

        function init () {
            var self = this;

            createDropdownsArray.call(self, self._rootDD);
            simpla.storage.dropdowns.push(self);

            self._container.click(function (e) {
                var current, effectObj, target, pos, i;

                function launch () {
                    effectObj.isCustom ? customEffects[effectObj.effect].call(self, current, false) : animate.call(self, effectObj.effect, current, false);
                
                    if (self._defaults.hideSiblings) {
                        hideSiblings.call(self, current, current.level);
                    }
                    if (self._defaults.hideNested && !current.dropdown.hasClass('dd-dropdown--pressed')) {
                        hideNested.call(self, current.id);
                    }

                    setTimeout(function () {
                        self._state = null;
                    }, parseInt(self._defaults.animationDuration, 10) || 0);
                }

                target = $(e.target).closest('.' + self._defaults.trigger);
                if (!target.length) {
                    return;
                }

                e.preventDefault();

                if (self._state) {
                    return;
                }

                hideOnOtherDropsClick.call(self, self._container);

                self._state = COOLDOWN;
                current = target.closest('.dd-dropdown');

                for (i = 0; i < self._dropdowns.length; i++) {
                    if (self._dropdowns[i].dropdown[0] === current[0]) {
                        current = self._dropdowns[i];
                        break;
                    }
                }

                effectObj = getEffect.call(self);

                if (typeof self._defaults.wait === 'function') {
                    pos = simpla.storage.dropdowns.indexOf(self);

                    if (pos !== -1) {
                        simpla.storage.dropdowns.splice(pos, 1);
                    }
                    self._dropdowns.length = 0;

                    $.when(self._defaults.wait(current)).then(function (a, b) {
                        createDropdownsArray.call(self, self._rootDD);
                        simpla.storage.dropdowns.push(self);
                        launch();
                    });
                } else {
                    launch();
                }
                
            });
        }

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
                simpla.helpers.extend(options, defaults);
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

            $('body').on('touchstart click', hide);
        };
        simpla.UI.Dropdown.hideOutside = simpla.decorators.once(simpla.UI.Dropdown.hideOutside, null);

        simpla.UI.Dropdown.addEffect = function (name, handler) {
            if (!(name in customEffects)) {
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
        // Dropdown (END)
    }());

    // Spinner
    (function () {
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
                to = parseFloat(this._field.data('to')),
                step = parseFloat(this._field.data('step'));

            if (amount < to) {
                if ((to - amount) < step) {
                    amount += (to - amount);
                } else {
                    amount += step;
                }
                
                this._field.val(amount);
            }
        }

        function dec () {
            var amount = parseFloat(this._field.val()),
                from = parseFloat(this._field.data('from')),
                step = parseFloat(this._field.data('step'));

            if (amount > from) {
                if ((amount - step) < from) {
                    amount -=  (amount - from);
                } else {
                    amount -= step;
                }
                
                this._field.val(amount);
            }
        }

        function init () {
            var self = this,
                previousValue;

            this._plus.on('click', function (e) {
                inc.call(self);
                e.preventDefault();
            });
            this._minus.on('click', function (e) {
                dec.call(self);
                e.preventDefault();
            });
            this._field.on('change blur', function () {
                var val = $(this).val();

                if (parseFloat(val) > parseFloat(self._field.data('to'))) {
                    self._field.val(self._field.data('to'));
                } else if (parseFloat(val) < parseFloat(self._field.data('from'))) {
                    self._field.val(self._field.data('from'));
                } else if (val === '') {
                    self._field.val(parseFloat(self._field.data('from')));
                }
            });
            this._field.on('keydown', function (e) {
                previousValue = $(this).val();
            });
            this._field.on('input', function (e) {
                if (!simpla.helpers.isNumeric($(this).val()) && $(this).val() !== '' && $(this).val() !== '-') {
                    $(this).val(previousValue);
                }
            });

            if (this._defaults.launchOnClamp) {
                this._plus.on('mousedown', function () {
                    update.call(self, 'inc');
                });
                this._minus.on('mousedown', function () {
                    update.call(self);
                });
                this._controls.on('mouseup mouseleave', function () {
                    clearTimeout(self._timerID);
                    clearInterval(self._intervalID);
                });
            }
        }

        simpla.UI.Spinner = function (container, options) {
            var defaults,
                timerID, intervalID;

            defaults = simpla.helpers.createMap();
            defaults.delay = 200;
            defaults.speed = 100;
            defaults.launchOnClamp = true;

            timerID = null;
            intervalID = null;

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
                        return  container.find('.sp-control');
                    }
                },
                _plus: {
                    get: function () {
                        return container.find('.sp-control--plus');
                    }
                },
                _minus: {
                    get: function () {
                        return container.find('.sp-control--minus');
                    }
                },
                _field: {
                    get: function () {
                        return container.find('.sp-field');
                    }
                }
            });

            if (simpla.helpers.getClass(options) === 'Object') {
                simpla.helpers.extend(options, defaults);
            }

            Object.defineProperty(this, '_defaults', {
                get: function () {
                    return defaults;
                }
            });

            return this;
        };

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

        // Tabs (general class)
        (function () {
            function setTab (type) {
                var hasActiveTab = false,
                    nav;

                switch (type) {
                    case 'desctop': {
                        nav = 'desctopTabNav';
                    }
                    break;
                    case 'mobile': {
                        nav = 'mobileTabNav';
                    }
                    break;
                }

                this['_' + nav].each(function () {
                    if ($(this).hasClass('t-tab-nav-item--active')) {
                        hasActiveTab = true;
                        
                        return false;
                    }
                });

                if (!hasActiveTab) {
                    this['_' + nav].first().trigger('click');
                }
            }

            simpla.UI.Tabs = function () {
                return this;    
            };

            Object.defineProperty(simpla.UI.Tabs.prototype, 'setTab', {
                value: function (type) {
                    setTab.call(this, type);
                }
            });
        }());
        // Tabs (general class) (END)

        // Tabs (static)
        (function () {
            function init () {
                var self = this;

                this._desctopTabNav.on('click', function (e) {
                    var id = $(this).data('tab'),
                        effect = effects[self._defaults.effect] ? effects[self._defaults.effect] : 'toggle',
                        that = $(this), classAction;

                    if (!self._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !self._defaults.toggleTabs)) {
                        return;
                    }

                    classAction = self._defaults.toggleTabs ? 'toggleClass' : 'addClass';

                    self._defaults.beforeAnimation();
                    self._isAnimationFinished = false;
                    self._desctopTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active');
                    that[classAction]('t-tab-nav-item--active');

                    self._tabContent.not('[data-tab="' + id + '"]').removeClass('t-tab-item--active');
                    self._tabContent.filter('[data-tab="' + id + '"]')
                        .stop(true, true)[effect](self._defaults.speed, function () {
                            self._isAnimationFinished = true;
                            $(this)[classAction]('t-tab-item--active');
                            self._defaults.afterAnimation();

                            if (self._defaults.scrollToActive) {
                                simpla.DOM.scrollBody(that, self._defaults.scrollCorrection);
                            }
                        });

                    e.preventDefault();
                });

                if (this._defaults.setTab) {
                    this._setTab('desctopTabNav');
                }
            }

            simpla.UI.StaticTabs = function (container, options) {
                var defaults, isAnimationFinished = true;

                defaults = simpla.helpers.createMap();

                defaults.effect = 'toggle';
                defaults.speed = 0;
                defaults.setTab = false;
                defaults.toggleTabs = false;
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

                Object.defineProperties(this, {
                    _desctopTabNav: {
                        get: function () {
                            return container.find('.t-tab-nav-item');
                        }
                    },
                    _tabContent: {
                        get: function () {
                            return ontainer.find('.t-tab-item');
                        }
                    }
                });

                if (simpla.helpers.getClass(options) === 'Object') {
                    simpla.helpers.extend(options, defaults);
                }

                Object.defineProperty(this, '_defaults', {
                    get: function () {
                        return defaults;
                    }
                });

                return this;    
            };

            simpla.UI.StaticTabs.prototype = Object.create(simpla.UI.Tabs.prototype);
            simpla.UI.StaticTabs.prototype.constructor = simpla.UI.StaticTabs;

            Object.defineProperty(simpla.UI.StaticTabs.prototype, 'init', {
                value: function () {
                    init.call(this);
                }
            });
        }());
        // Tabs (static) (END)

        // Tabs (adaptive)
        (function () {
            function init () {
                var self = this;

                this._desctopTabNav.on('click', function (e) {
                    var id = $(this).data('tab'),
                        effect = effects[self._defaults.desctopEffect] ? effects[self._defaults.desctopEffect] : 'toggle',
                        that = $(this), classAction,
                        desctopClassAction, mobileClassAction;

                    if (!self._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !self._defaults.toggleTabsDesctop && !self._defaults.toggleTabsMobile)) {
                        return;
                    }

                    desctopClassAction = self._defaults.toggleTabsDesctop ? 'toggleClass' : 'addClass';
                    mobileClassAction = self._defaults.toggleTabsMobile ? 'toggleClass' : 'addClass';

                    self._defaults.beforeAnimation();
                    self._isAnimationFinished = false;

                    self._desctopTabNav
                        .removeClass('t-tab-nav-item--active_desctop')
                        .not('[data-tab="' + id + '"]')
                        .removeClass('t-tab-nav-item--active');

                    self._mobileTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active t-tab-nav-item--active_mobile');

                    if (!self._defaults.toggleTabsMobile) {
                        self._mobileTabNav.filter('[data-tab="' + id + '"]').addClass('t-tab-nav-item--active_mobile');
                        self._tabContent.filter('[data-tab="' + id + '"]').addClass('t-tab-item--active_mobile');
                    }

                    that[desctopClassAction]('t-tab-nav-item--active');

                    self._tabContent
                        .not('[data-tab="' + id + '"]')
                        .removeClass('t-tab-item--active t-tab-item--active_mobile t-tab-item--active_desctop');

                    self._tabContent.filter('[data-tab="' + id + '"]')
                        .stop(true, true)[effect](self._defaults.desctopSpeed, function () {
                            self._isAnimationFinished = true;
                            $(this)[desctopClassAction]('t-tab-item--active t-tab-item--active_desctop').removeAttr('style');
                            self._defaults.afterAnimation();
                        });

                    e.preventDefault();
                });

                this._mobileTabNav.on('click', function (e) {
                    var id = $(this).data('tab'),
                        effect = effects[self._defaults.mobileEffect] ? effects[self._defaults.mobileEffect] : 'toggle',
                        that = $(this), classAction,
                        mobileClassAction, desctopClassAction;

                    if (!self._isAnimationFinished || (that.hasClass('t-tab-nav-item--active') && !self._defaults.toggleTabsMobile && !self._defaults.toggleTabsDesctop)) {
                        return;
                    }

                    mobileClassAction = self._defaults.toggleTabsMobile ? 'toggleClass' : 'addClass';
                    desctopClassAction = self._defaults.toggleTabsDesctop ? 'toggleClass' : 'addClass';

                    self._defaults.beforeAnimation();
                    self._isAnimationFinished = false;

                    self._desctopTabNav.not('[data-tab="' + id + '"]').removeClass('t-tab-nav-item--active t-tab-nav-item--active_desctop');
                    self._mobileTabNav
                        .removeClass('t-tab-nav-item--active_mobile')
                        .not('[data-tab="' + id + '"]')
                        .removeClass('t-tab-nav-item--active');

                    if (!self._defaults.toggleTabsDesctop) {
                        self._desctopTabNav.filter('[data-tab="' + id + '"]').addClass('t-tab-nav-item--active_desctop');
                        self._tabContent.filter('[data-tab="' + id + '"]').addClass('t-tab-item--active_desctop');
                    }

                    that[mobileClassAction]('t-tab-nav-item--active');

                    self._tabContent
                        .not('[data-tab="' + id + '"]')
                        .removeClass('t-tab-item--active t-tab-item--active_desctop t-tab-item--active_mobile');

                    self._tabContent.filter('[data-tab="' + id + '"]')
                        .stop(true, true)[effect](self._defaults.mobileSpeed, function () {
                            self._isAnimationFinished = true;
                            $(this)[mobileClassAction]('t-tab-item--active t-tab-item--active_mobile').removeAttr('style');

                            if (self._defaults.scrollToActive) {
                                simpla.DOM.scrollBody(that, self._defaults.scrollCorrection);
                            }
                            self._defaults.afterAnimation();
                        });
                    
                    e.preventDefault();
                });

                if (this._defaults.setTab) {
                    this._setTab(this._defaults.navName);
                }
            }

            simpla.UI.AdaptiveTabs = function (container, options) {
                var defaults, isAnimationFinished = true;
                
                defaults = simpla.helpers.createMap();

                defaults.desctopEffect = 'toggle';
                defaults.desctopSpeed = 0;
                defaults.mobileEffect = 'slide';
                defaults.mobileSpeed = 300;
                defaults.scrollToActive = true;
                defaults.scrollCorrection = null;
                defaults.setTab = false;
                defaults.navName = null;
                defaults.toggleTabsDesctop = false;
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

                Object.defineProperties(this, {
                    _desctopTabNav: {
                        get: function () {
                            return container.find('.t-tab-nav-item');
                        }
                    },
                    _mobileTabNav: {
                        get: function () {
                            return container.find('.t-tab-content-nav-item');
                        }
                    },
                    _tabContent: {
                        get: function () {
                            return container.find('.t-tab-item');
                        }
                    }
                });

                if (simpla.helpers.getClass(options) === 'Object') {
                    simpla.helpers.extend(options, defaults);
                }
                Object.defineProperty(this, '_defaults', {
                    get: function () {
                        return defaults;
                    }
                });

                return this;
            };

            simpla.UI.AdaptiveTabs.prototype = Object.create(simpla.UI.Tabs.prototype);
            simpla.UI.AdaptiveTabs.prototype.constructor = simpla.UI.AdaptiveTabs;

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

        function switchBundle (options, action) {
            this._trigger[action + 'Class'](triggerCls);
            this._container[action + 'Class'](containerCls);

            if (this._trigger.data('body')) {
                $('body')[action + 'Class'](bodyCls);
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
            var self = this;

            self._trigger.on('click', function () {
                hideOnOtherBundleClick.call(self, self._trigger, self._close, self._container, self._overlay);

                switchBundle.call(self, self._defaults, 'toggle');
            });
            if (self._overlay) {
                self._overlay.on('click', function () {
                    switchBundle.call(self, self._defaults, 'remove');
                });
            }
            if (self._close) {
                self._close.on('click', function () {
                    switchBundle.call(self, self._defaults, 'remove');
                });
            }
        }

        simpla.UI.Bundle = function (trigger, close, options) {
            var defaults = simpla.helpers.createMap(),
                trigger, container, overlay, close;

            defaults.callback = $.noop;

            if (simpla.helpers.getClass(options) === 'Object') {
                simpla.helpers.extend(options, this._defaults);
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
                }
            });

            simpla.storage.bundles.push(this);   

            return this;
        };

        Object.defineProperty(simpla.UI.Bundle.prototype, 'init', {
            value: function () {
                init.call(this);
            }
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
            
            $('body').on('touchstart click', hide);
        };
        simpla.UI.Bundle.hideOutside = simpla.decorators.once(simpla.UI.Bundle.hideOutside, null);
    }());
    // Bundle (END)

    // Search
    (function () {
        function init () {
            var self = this,
                boxes = self._parent.find('[data-q="true"]');

            self._field.on('input', function () {
                var text = $(this).val(),
                    reg = new RegExp('(' + text + ')', 'gi');
                    
                boxes.each(function () {
                    $(this).html($(this).html().replace(/<\/?\w[1-6]?\w*\s*.*?>/g, ''));

                    if ($(this).text().search(reg) !== -1) {
                        $(this).html($(this).html().replace(reg, '<span class="s-match">$1</span>'));
                        $(this).removeClass('s-match--visible').addClass('s-match--invisible');
                    } else {
                        $(this).addClass('s-match--invisible').removeClass('s-match--visible');
                    }
                });

                if (self._defaults.invokeCallback) {
                    self._defaults.callback();
                }
            });
        }

        simpla.UI.Search = function (field, parent, options) {
            var defaults = simpla.helpers.createMap();

            defaults.invokeCallback = false;
            defaults.callback = $.noop;

            Object.defineProperties(this, {
                _field: {
                    get: function () {
                        return field;
                    }
                },
                _parent: {
                    get: function () {
                        return parent;
                    }
                }
            });

            if (simpla.helpers.getClass(options) === 'Object') {
                simpla.helpers.extend(options, defaults);
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
            }
        });
    }());
    // Search (END)
    // User interface classes (END)
}));