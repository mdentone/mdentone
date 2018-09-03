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

            function input(element, i) {
                x.addPressReleaseHandlers(element, 
                    function(e) { joystick &= ~i; x.cancelEvent(e); },
                    function(e) { joystick |= i; x.cancelEvent(e); });
            }

            input('dpad-upleft', 1 | 4);
            input('dpad-up', 1);
            input('dpad-upright', 1 | 8);
            input('dpad-downleft', 2 | 4);
            input('dpad-down', 2);
            input('dpad-downright', 2 | 8);
            input('dpad-left', 4);
            input('dpad-right', 8);
            input('trig-1', 16);
            input('trig-2', 32);

            x.addClickHandler('trig-change',
                function(e) { loadNextRom(); x.cancelEvent(e); });

            x.addClickHandler('trig-pause',
                function(e) { z80_nmi(); x.cancelEvent(e); });

            this.view = view;
            this.vgcx = view.getContext('2d');
        };

        proto.go = function() {

            var l = document.getElementById('power-on');
            x.addClickHandler(l, function() {
                l.style.display = 'none';
                x.showLayout();

                // miracle: start:
                go();
                ctx.fillStyle = 'rgba(127, 127, 127, 0.5)';
            });
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
            this.vgcx.fillRect(0, 0, GW, GH);
        };

    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Shinobi();

})(x);
