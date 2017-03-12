
//============================================================================

// Copyright (c) Matussi. All rights reserved.

//============================================================================

// Author    : Mario Dentone [MDE]
// Date      : Jan 2017
// Revisions :

//============================================================================

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// MinigameController

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var MinigameController = (function () {
    var instance = {};

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