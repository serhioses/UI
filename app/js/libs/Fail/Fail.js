'use strict';

import helpers from './lib/helpers';
import styles from './lib/styles';
import color from './lib/color';
import decorators from './lib/decorators';
import forms from './lib/forms';
import DOM from './lib/DOM';
import namespace from './lib/namespace';
import addMethod from './lib/addMethod';

var Fail = {
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
    helpers: helpers,
    styles: styles,
    color: color,
    decorators: decorators,
    forms: forms,
    DOM: DOM,
    modules: {},
    namespace: namespace.bind(this),
    addMethod: addMethod.bind(this)
};

export default Fail;