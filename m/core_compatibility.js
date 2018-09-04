
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.compatibility/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.addEventHandler = window.addEventListener
    ? function(element, eventName, handler, capture) {
        if (x.isCollection(element)) {
            for (var i = 0; i < element.length; i++) {
                element[i].addEventListener(eventName, handler, !!capture);
            }
        }
        else {
            if (x.isString(element)) {
                element = document.getElementById(element);
            }
            element.addEventListener(eventName, handler, !!capture);
        }
    } : function(element, eventName, handler) {
        if (x.isCollection(element)) {
            for (var i = 0; i < element.length; i++) {
                element[i].attachEvent('on' + eventName, handler);
            }
        }
        else {
            if (x.isString(element)) {
                element = document.getElementById(element);
            }
            element.attachEvent('on' + eventName, handler);
        }
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var initDelegate = new x.Delegate();
    var loadDelegate = new x.Delegate();

    function oninit() {
        if (initDelegate) {
            initDelegate.all();
            initDelegate = null;
        }
    }

    function onload() {
        oninit();
        if (loadDelegate) {
            loadDelegate.all();
            loadDelegate = null;
        }
    }

    if (document.readyState === 'interactive') {
        oninit();
    }
    else if (document.readyState === 'complete') {
        onload();
    }

    x.addEventHandler(document, 'DOMContentLoaded', oninit);
    x.addEventHandler(window, 'load', onload);

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.addContentLoadHandler = function(handler) {
        if (initDelegate) initDelegate.add(handler);
        else handler();
    }

    x.addPageLoadHandler = function(handler) {
        if (loadDelegate) loadDelegate.add(handler);
        else handler();
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var click, press, release;
    if ('onpointerdown' in window) {
        press = 'pointerdown';
        click = release = 'pointerup';
    }
    else if ('ontouchstart' in window) {
        press = 'touchmove';
        click = release = 'touchend';
    }
    else {
        click = 'click';
        press = 'mousedown';
        release = 'mouseup';
    }

    x.addClickHandler = function(element, clickHandler, capture) {
        x.addEventHandler(element, click, clickHandler, capture);
    };

    x.addPressHandler = function(element, pressHandler, capture) {
        x.addEventHandler(element, press, pressHandler, capture);
    };

    x.addReleaseHandler = function(element, releaseHandler, capture) {
        x.addEventHandler(element, release, releaseHandler, capture);
    };

    x.addPressReleaseHandlers = function(element, 
            pressHandler, releaseHandler, capture) {
        x.addPressHandler(element, pressHandler, capture);
        x.addReleaseHandler(element, releaseHandler, capture);
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.cancelEvent = function(e) {
        e = e || window.event;
        x.isFunction(e.stopPropagation) && e.stopPropagation();
        x.isFunction(e.preventDefault) && e.preventDefault();  
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
    };

})(x);
