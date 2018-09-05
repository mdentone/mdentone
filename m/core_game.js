
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.game/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.extendClass(x.App, x, 'Game', function ctor() {

        x.addEventHandler([document, window], 'contextmenu', x.cancelEvent);
        this.lockHistory();
        this.trapKeys(true);
        ////this.showOnScreenText(true);

    }, function designer(proto, base) {

        //////proto.showOSTs = x.property();

        //////proto.printFPS = function(fps) {
        
        //////}

    });

})(x);
