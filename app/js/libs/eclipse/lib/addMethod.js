'use strict';

export default function addMethod (namespace, func) {
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