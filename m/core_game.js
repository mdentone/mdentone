
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions.push('+ m.core.game/0001');

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

        this.trapKeys(true);

    }, function designer(proto, base) {

    });

})(x);
