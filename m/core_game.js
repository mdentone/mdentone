
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.game/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Must be put into global object, or Illegal invocation is thrown:
    window.frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        window.setTimeout(callback, 16); // about 60 FPS;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.extendClass(x.App, x, 'Game', function ctor() {

        x.addEventHandler([document, window], 'contextmenu', x.cancelEvent);
        this.lockHistory();
        this.trapKeys(true);

    }, function designer(proto, base) {

    });

})(x);
