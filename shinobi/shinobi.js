/*
                                                                              
       _|_|_|  _|    _|  _|_|_|  _|      _|    _|_|    _|_|_|    _|_|_|       
     _|        _|    _|    _|    _|_|    _|  _|    _|  _|    _|    _|         
       _|_|    _|_|_|_|    _|    _|  _|  _|  _|    _|  _|_|_|      _|         
           _|  _|    _|    _|    _|    _|_|  _|    _|  _|    _|    _|         
     _|_|_|    _|    _|  _|_|_|  _|      _|    _|_|    _|_|_|    _|_|_|       
                                                                              
                    Copyright (c) MDE. All rights reserved.                   
*/

"use strict";

(function(m, x) {
    x.versions.push('Shinobi/v1.0.0000');

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.extendClass(x.Game, m, 'Shinobi', x.noop, function(proto, base) {

        var GW = 256, GH = 192, GR = GH / GW;

        proto.initialize = function() {
            ////var l = document.createElement('div');
            ////l.style.cssText = 'text-align:center;';

            //var view = document.createElement('canvas');
            var l, view = document.getElementById('game-view');
            ////view.id = 'game-view';
            view.width = GW;
            view.height = GH;

            if (!x.isFunction(view.getContext)) {
                throw new Error(x.E.BROWSER);
            }

            ////l.appendChild(view);
            ////document.body.appendChild(l);

            l = document.getElementById('dpad-up');
            l.onmousedown = function() { joystick &= ~1; };
            l.onmouseup   = function() { joystick |= 1; };

            l = document.getElementById('dpad-down');
            l.onmousedown = function() { joystick &= ~2; };
            l.onmouseup   = function() { joystick |= 2; };

            l = document.getElementById('dpad-left');
            l.onmousedown = function() { joystick &= ~4; };
            l.onmouseup   = function() { joystick |= 4; };

            l = document.getElementById('dpad-right');
            l.onmousedown = function() { joystick &= ~8; };
            l.onmouseup   = function() { joystick |= 8; };

            l = document.getElementById('trig-1');
            l.onmousedown = function() { joystick &= ~16; };
            l.onmouseup   = function() { joystick |= 16; };

            l = document.getElementById('trig-2');
            l.onmousedown = function() { joystick &= ~32; };
            l.onmouseup   = function() { joystick |= 32; };

            l = document.getElementById('trig-pause');
            l.onclick = function() { z80_nmi(); };

            this.view = view;

            // miracle: start:
            go();
        };

        proto.layout = function(width, height) {
            var vmin = Math.min(width, Math.floor(height * GR));
            var view = this.view;
            view.style.width = vmin + 'px';
            view.style.height = Math.floor(vmin * GR) + 'px';
        };

        proto.resume = function() {
            // miracle: resume emulation but not unpause:
            start();
        };

        proto.suspend = function() {
            // miracle: pause and stop emulation:
            z80_nmi();
            stop();
            var g = this.view.getContext('2d');
            g.fillStyle = 'rgba(127, 127, 127, 0.5)';
            g.fillRect(0, 0, GW, GH);
        };

    });

})(m, x);
