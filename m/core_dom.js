
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.dom/0001';

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
                + 'background-color:rgba(153,153,153,0.75);';
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

    x.write = function(text) {
        if (!commonElements.writeArea) {
            var l = document.createElement('div');
            l.id = commonId + 'write-area';
            l.style.cssText = 'pointer-events:none;'
                + 'position:absolute;left:0;top:0;'
                + 'width:100%;height:100%;' // right/bottom fallback
                + 'right:0;bottom:0;z-Index:11000;';
            document.body.appendChild(l);
            commonElements.writeArea = l;
        }
        var l1 = document.createElement('pre');
        var l2 = document.createElement('span');
        l2.style.cssText = 'background-color:#333333;' // rgba fallback
            + 'background-color:rgba(0,0,0,0.50);color:white';
        l2.innerHTML = text;
        l1.appendChild(l2);
        commonElements.writeArea.appendChild(l1);
        setTimeout(function() { 
            commonElements.writeArea.removeChild(l1);
        }, 3000);
    }

})(x);
