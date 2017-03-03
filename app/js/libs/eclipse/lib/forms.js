'use strict';

import DOM from './DOM';
import helpers from './helpers';
import $ from 'jquery';

var forms = {};

forms.isPattern = function (pattern, str) {
    return (str.length && pattern.length) ? new RegExp(pattern, 'g').test(str) : null;
};

forms.isEmail = function (str) {
    return form.isPattern('^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&\'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$', str.toLowerCase());
};

forms.setValid = function (el, showNotice, id) {
    el.addClass('js-input--valid').removeClass('js-input--invalid');
    if (showNotice) {
        DOM.hideNotice($('#' + id));
    }
};

forms.setInvalid = function (el , e, noticeID, options) {
    el.addClass('js-input--invalid').removeClass('js-input--valid');
    e.preventDefault();

    if (options.scrollToInvalid && firstInvalidField) {
        DOM.scrollBody(firstInvalidField, options.scrollCorrection, {});
    }
    if (options.showNotice) {
        DOM.showNotice(noticeID, 'notice', el, el.data('notice'));
    }
};

forms.validate = function (form, e, options) {
    var defaults = {
            scrollToInvalid: true,
            scrollCorrection: 0,
            showNotice: true,
            stopOnInvalid: true,
            callback: $.noop
        }, countInvalid = 0, firstInvalidField;

    form[0].firstInvalidField = null;

    if (helpers.getClass(options) === 'Object') {
        $$.extend(defaults, options);
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
                        case 'email': {
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
                        default: {
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
            case 'checkbox': {
                isChecked = $(this).data('f');
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

export default forms;