
//============================================================================

// Copyright (c) Matussi. All rights reserved.

//============================================================================

// Author    : Mario Dentone [MDE]
// Date      : Jan 2017
// Revisions : Mar 2017

//============================================================================

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// MinigameController

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var MinigameController = (function () {
    var instance = {};

    window.onerror = function (msg, url, li, co, err) {
        alert(msg + "\n" + url + ":" + li + ":" + co + "\n" +
              "-- stack --\n" +
              (err && err.stack ? err.stack : (err || "no stack info")));
    };

    // Members
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    instance.level = Number(qs().level);

    // Private Members
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function qs(url) {
        var query = url || window.location.search + window.location.hash,
            pairs = {};
        query.replace(/[?&]([^=]+)=([^&]*)?/g, function (match, key, val) {
            if (key) pairs[key] = val || '';
            return '';
        });
        return pairs;
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return instance;
})();