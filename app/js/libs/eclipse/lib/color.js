'use strict';

var color = {};

color.lighten = function (color, percent) {
    var parts = color.replace(/rgba?\(/, '').replace(/\)/, '').split(','),
        red = parseInt(parts[0], 10),
        green = parseInt(parts[1], 10),
        blue = parseInt(parts[2], 10),
        newColor = 'rgb(';

    percent = percent / 100;

    newColor += (Math.round((255 - red) * percent) + red) + ',';
    newColor += (Math.round((255 - green) * percent) + green) + ',';
    newColor += (Math.round((255 - blue) * percent) + blue) + ')';

    return newColor;
};

color.darken = function (color, percent) {
    var parts = color.replace(/rgba?\(/, '').replace(/\)/, '').split(','),
        red = parseInt(parts[0], 10),
        green = parseInt(parts[1], 10),
        blue = parseInt(parts[2], 10),
        newColor = 'rgb(';

    percent = percent / 100;

    newColor += (Math.round((0 - red) * percent) + red) + ',';
    newColor += (Math.round((0 - green) * percent) + green) + ',';
    newColor += (Math.round((0 - blue) * percent) + blue) + ')';

    return newColor;
};

export default color;