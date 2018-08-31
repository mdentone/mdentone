
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions.push('+ m.core.dom/0001');

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var commonElements = [],
        commonId = 'x-common-element-',
        covers = 0;

    x.cover = function(content) {
        if (!commonElements.cover) {
            var l = document.createElement('div');
            l.id = commonId + 'cover';
            l.style.cssText = 'display:none;'
                + 'position:absolute;left:0;top:0;'
                + 'width:100%;height:100%;' // right/bottom fallback
                + 'right:0;bottom:0;z-Index:10000;'
                + 'background-color:#999;' // rgba() fallback
                + 'background-color:rgba(153,153,153,0.66);';
            document.body.appendChild(l);
            commonElements.cover = l;
        }
        covers++;
        commonElements.cover.innerHTML = content || '';
        commonElements.cover.style.display = 'block';
    };

    x.uncover = function() {
        if (covers > 0 && --covers === 0) {
            commonElements.cover.style.display = 'none';
        }
    };

})(x);
