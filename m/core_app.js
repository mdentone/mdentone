
// Copyright (c) MDE. All rights reserved.

"use strict";

(function(x) {
    x.versions[0] += ' m.core.app/1';

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function showLayout() {
        // Render page elements if x-layout is used:
        var ls = document.getElementsByTagName('X-LAYOUT');
        for (var i = 0; i < ls.length; i++) {
            ls[i].style.display = '';
        }
    }

    ////x.addHandler(document, "DOMContentLoaded", showLayout);
    x.addHandler(window, "load", function() {
        var l = document.getElementById('power-on');
        x.addHandler(l, 'click', function() {
            l.style.display = 'none';
            showLayout();
            x.app && x.app.go();
        });
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Improves usability on mobile devices:
    document.ondragstart = x.cancelEvent;
    document.ondrop = x.cancelEvent;
    document.touchmove = x.cancelEvent;

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.createClass(x, 'App', function ctor() {

        if (x.app) throw new Error(x.E.SINGLEINST + ': ' + this.className);
        x.app = this;
        initialize();

    }, function designer(proto) {

        proto.critical = function(info) {
            x.cover('<pre>'
                + '<h1>:{ CRASH!</h1>'
                + '\n' + info
                + '\n' + x.versions.join('\n')
                + '</pre>');
        };

        proto.initialize = function() {
        };

        proto.layout = function(width, height) {
        };

        proto.resume = function() {
        };

        proto.suspend = function() {
        };

        proto.trapKeys = x.property(false);

    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var vw = -1, vh = -1;
    var pendingSize = 0;

    function initialize() {

        window.onerror = function(msg, url, line, column, error) {
            var info = error && error.stack
                ? error.stack
                : 'Error : ' + (msg || 'unknown')
                + (url && line && column
                    ? '\n   at ' + url + ':' + line + ':' + column
                    : '');
            x.app.critical(info);
        };

        x.addHandler(window, 'blur', suspend, true);
        x.addHandler(window, 'focus', resume, true);
        x.addHandler(window, 'keydown', filter, true);
        x.addHandler(window, 'keyup', filter, true);
        x.addHandler(window, 'resize', resizing, true);

        x.app.initialize();
        resize();

        if (!document.hasFocus()) suspend();
    };

    function filter(e) {
        e = e || window.event;
        if (!e) return;

        if (x.app.trapKeys()) {
            var keyCode = e.which || e.charCode || e.keyCode;
            // filter F5 and CTRL+R and Backspace if not editing:
            if (keyCode === 116 || keyCode === 82 && e.ctrlKey ||
                keyCode === 8 && !elementIsEditable(e.target)) {
                    return x.cancelEvent(e);
            }
        }
    }

    function elementIsEditable(l) {
        return l && !l.disabled && !l.readOnly
            && ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(l.tagName) > -1;
    }

    function resizing() {
        if (this.pendingSize) {
            clearTimeout(this.pendingSize);
        }
        pendingSize = setTimeout(resize, 66);
    }

    function resize() {
        var iW = window.innerWidth || document.body.clientWidth,
            iH = window.innerHeight || document.body.clientHeight;

        // Safari on IOS rises resize event during scroll operation, trap:
        if (vw === iW && vh === iH) {
            return;
        }

        x.app.layout(vw = iW, vh = iH);

        // This trick for Safari on iOS hides the navigation bar:
        setTimeout(function() { window.scrollTo(0, 1); }, 66);
    }

    function resume() {
        x.app.resume();
    }

    function suspend() {
        x.app.suspend();
    }

})(x);
