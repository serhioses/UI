'use strict';

export default function namespace (nsString) {
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