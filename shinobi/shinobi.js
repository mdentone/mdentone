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

            var click, press, release;
            if ('onpointerdown' in window) {
                click = press = 'onpointerdown';
                release = 'onpointerup';
            }
            else if ('ontouchstart' in window) {
                click = press = 'ontouchstart';
                release = 'ontouchend';
            }
            else {
                click = 'click';
                press = 'onmousedown';
                release = 'onmouseup';
            }

            l = document.getElementById('dpad-up');
            l[press]   = function() { joystick &= ~1; };
            l[release] = function() { joystick |= 1; };

            l = document.getElementById('dpad-down');
            l[press]   = function() { joystick &= ~2; };
            l[release] = function() { joystick |= 2; };

            l = document.getElementById('dpad-left');
            l[press]   = function() { joystick &= ~4; };
            l[release] = function() { joystick |= 4; };

            l = document.getElementById('dpad-right');
            l[press]   = function() { joystick &= ~8; };
            l[release] = function() { joystick |= 8; };

            l = document.getElementById('trig-1');
            l[press]   = function() { joystick &= ~16; };
            l[release] = function() { joystick |= 16; };

            l = document.getElementById('trig-2');
            l[press]   = function() { joystick &= ~32; };
            l[release] = function() { joystick |= 32; };

            l = document.getElementById('trig-pause');
            l[click] = function() { z80_nmi(); };

            this.view = view;

            // miracle: start:
            go();
        };

        proto.layout = function(width, height) {
            var vmin = Math.min(width, height);
            var vgw, vgh;
            if (width > height) {
                vgw = Math.floor(vmin / GR);
                if (vgw <= width) {
                    vgh = vmin;
                }
                else {
                    vgw = vmin;
                    vgh = Math.floor(vmin * GR);
                }
            }
            else {
                vgh = Math.floor(vmin * GR);
                if (vgh <= height) {
                    vgw = vmin;
                }
                else {
                    vgw = Math.floor(vmin / GR);
                    vgh = vmin;
                }
            }
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
