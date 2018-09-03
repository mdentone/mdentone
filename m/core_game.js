
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.game/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.frame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.extendClass(x.App, x, 'Game', function ctor() {

        x.addEventHandler([document, window], 'contextmenu', x.cancelEvent);
        this.trapKeys(true);

    }, function designer(proto, base) {

    });

})(x);
