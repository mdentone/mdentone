/*
                                                                              
       _|_|_|  _|    _|  _|_|_|  _|      _|    _|_|    _|_|_|    _|_|_|       
     _|        _|    _|    _|    _|_|    _|  _|    _|  _|    _|    _|         
       _|_|    _|_|_|_|    _|    _|  _|  _|  _|    _|  _|_|_|      _|         
           _|  _|    _|    _|    _|    _|_|  _|    _|  _|    _|    _|         
     _|_|_|    _|    _|  _|_|_|  _|      _|    _|_|    _|_|_|    _|_|_|       
                                                                              
                    Copyright (c) MDE. All rights reserved.                   
                                                                              
*/

"use strict";

(function(x) {
    x.versions.push('Shinobi/v1.0.0000');

    console.log(document.childNodes[1].textContent);

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    x.extendClass(x.Game, g, 'Shinobi', x.noop, function(proto, base) {

        var GW = 256, GH = 192, GR = GH / GW;

        proto.initialize = function() {
            ////var view = document.createElement('canvas');
            ////view.id = 'game-view';

            var l, view = document.getElementById('game-view');
            view.width = GW;
            view.height = GH;

            if (!x.isFunction(view.getContext)) {
                throw new Error(x.E.BROWSER);
            }

            ////document.body.appendChild(view);

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
            l[press]   = function(e) { joystick &= ~1; e.preventDefault(); };
            l[release] = function(e) { joystick |= 1; e.preventDefault(); };

            l = document.getElementById('dpad-down');
            l[press]   = function(e) { joystick &= ~2; e.preventDefault(); };
            l[release] = function(e) { joystick |= 2; e.preventDefault(); };

            l = document.getElementById('dpad-left');
            l[press]   = function(e) { joystick &= ~4; e.preventDefault(); };
            l[release] = function(e) { joystick |= 4; e.preventDefault(); };

            l = document.getElementById('dpad-right');
            l[press]   = function(e) { joystick &= ~8; e.preventDefault(); };
            l[release] = function(e) { joystick |= 8; e.preventDefault(); };

            l = document.getElementById('trig-1');
            l[press]   = function(e) { joystick &= ~16; e.preventDefault(); };
            l[release] = function(e) { joystick |= 16; e.preventDefault(); };

            l = document.getElementById('trig-2');
            l[press]   = function(e) { joystick &= ~32; e.preventDefault(); };
            l[release] = function(e) { joystick |= 32; e.preventDefault(); };

            l = document.getElementById('trig-change');
            l[click] = function(e) { loadNextRom(); e.preventDefault(); };

            l = document.getElementById('trig-pause');
            l[click] = function(e) { z80_nmi(); e.preventDefault(); };

            this.view = view;
        };

        proto.go = function() {
            // miracle: start:
            go();
        };

        proto.layout = function(width, height) {
            x.write(width + 'x' + height);
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

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    ////x.addHandler(document, "DOMContentLoaded", showLayout);
    x.addHandler(window, "load", function() {

        var l = document.getElementById('power-on');
        x.addHandler(l, 'click', function() {
            l.style.display = 'none';
            x.showLayout();

            // Startup:
            Shinobi().go();
        });

    });

})(x);
