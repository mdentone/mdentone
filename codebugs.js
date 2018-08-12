/*
==============================================================================
 Copyright (c)  ___                _  ___
               | _ ) __ ___ ____ _(_)/ __|_ _ _____ __ __
               | _ \/ _` \ \ / _` | | (__| '_/ -_) V  V /
               |___/\__,_/_\_\__,_|_|\___|_| \___|\_/\_/. All rights reserved.
==============================================================================
*/

"use strict";

(function() {
    var G = window;
    G.Bax = {};

    var version = "CODEBUGS v0.00.00.0001";

    console && console.log &&
    console.log(document.childNodes[1].textContent + version);

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.noob = {};
    Bax.noop = function() { };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.createClass = function(ctor) {
        if (typeof ctor !== 'function') ctor = Bax.noop;

        function BaseClassCtor() {
            if (!(this instanceof BaseClassCtor)) return new BaseClassCtor();
            ctor.apply(this, arguments);
        }

        return BaseClassCtor;
    };

    Bax.extendClass = function(BaseClassCtor, ctor) {
        if (typeof BaseClassCtor !== 'function') throw Bax.Error.ClassCtor;
        if (typeof ctor !== 'function') ctor = Bax.noop;

        function ExtnClassCtor() {
            if (!(this instanceof ExtnClassCtor)) return new ExtnClassCtor();
            BaseClassCtor.apply(this, arguments);
            ctor.apply(this, arguments);
        }

        ExtnClassCtor.prototype = Object.create
                                ? Object.create(BaseClassCtor.prototype)
                                : new BaseClassCtor();

        ExtnClassCtor.prototype.constructor = ExtnClassCtor;

        return ExtnClassCtor;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.Error = new (function() {

        this.Browser = new Error('no browser support');

        this.ClassCtor = new Error('class constructor expected');

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.Http = new (function() {

        this.get = function(url, callback) {
            var xhr = null;
            if (G.XMLHttpRequest)
                xhr = new XMLHttpRequest();
            else if (G.ActiveXObject)
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            else
                throw Bax.Error.Browser;

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            };

            xhr.open('GET', url, true);
            xhr.send();
        };
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.Random = new (function() {

        this.next = function() {
            return Math.random();
        };

        this.nextBit = function() {
            return Math.floor(Math.random() * 2);
        };

        this.nextInt = function(max, min) {
            if (arguments.length > 1) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            else {
                return Math.floor(Math.random() * max);
            }
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    G.onerror = function(msg, url, line, column, error) {
        var message = ':( ' + (msg || 'crash!');
        var source = (error && error.stack)
            ? error.stack
            : (url && line && column)
                ? url + ':' + line + ':' + column
                : '';

        var code = document.createElement('pre');
        document.body.appendChild(code);

        code.innerHTML = message
            + (source ? '\n\n-- Diagnostics --\n' + source : '');
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    if (!G.requestAnimationFrame) {
        G.requestAnimationFrame = (function() {
            var RAFFPS = 1000 / 60;
            return G.webkitRequestAnimationFrame
                || G.mozRequestAnimationFrame
                || G.oRequestAnimationFrame
                || G.msRequestAnimationFrame
                || function(callback, element) {
                    G.setTimeout(callback, RAFFPS);
                };
        })();
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.Game = new (function() {

        this.run = function() {
            this.run = Bax.noop;

            var page = document.getElementsByTagName('html')[0];
            page.style.cssText = 'background-color:#000022;color:#80DD00;';

            var body = document.body;
            body.style.cssText = 'width:100%;height:100%;'
                + 'margin:0;padding:0;overflow:hidden;';

            var viewport = document.createElement('div');

            while (body.firstChild) body.removeChild(body.firstChild);
            body.appendChild(viewport);
            this.Viewport = viewport;

            layers.deepSpace = Bax.DeepSpace();
            layers.starFieldFar = Bax.StarFieldFar();
            layers.starFieldNear = Bax.StarFieldNear();
            layers.bossField = Bax.BossField();
            layers.bugsField = Bax.BugsField();

            for (var id in layers) {
                layers[id].create();
            }

            var devLayer = Bax.DevLayer();
            devLayer.create();

            var self = this;

            fT0 = +new Date;
            (function gameloop() {
                for (var id in layers) {
                    layers[id].update();
                }

                if ((fC = ++fC % FC) === 0) {
                    fC = 0;
                    var fT1 = +new Date;
                    var dT = fT1 - fT0;
                    fT0 = fT1;
                    self.FPS = Math.ceil(FC * 1000 / dT);
                    devLayer.update();
                }

                requestAnimationFrame(gameloop);
            })();
        };

        this.FPS = 60;
        this.Width = 800;
        this.Height = 800;

        var fT0, fC = 0, FC = 100;

        var layers = [];
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    (function() {

        Bax.Layer = function(viewport, width, height, zIndex,
                             oncreate, onupdate) {
            this.viewport = viewport;

            var layer = document.createElement('canvas');
            layer.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0;'
                                + 'width:100%;height:100%;z-index:' + zIndex + ';'
                                + 'background:transparent;';
            layer.width = width;
            layer.height = height;
            viewport.appendChild(layer);

            this.Canvas = layer;
            this.Graphics = layer.getContext('2d');

            this.oncreate = oncreate;
            this.onupdate = onupdate;

            this.visible = false;
        };

        Bax.Layer.prototype.create = function() {
            this.visible = true;
            this.oncreate(this.Canvas, this.Graphics);
        };

        Bax.Layer.prototype.hide = function() {
            this.visible = false;
            this.Canvas.style.visibility = 'hidden';
        };

        Bax.Layer.prototype.show = function() {
            this.visible = true;
            this.Canvas.style.visibility = 'visible';
        };

        Bax.Layer.prototype.update = function() {
            this.onupdate(this.Canvas, this.Graphics);
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.DevLayer = function() {

        var game = Bax.Game;
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            10000, onCreate, onUpdate);

        function onCreate(c, g) {
            g.fillStyle = 'white';
            g.font = '16px monospace';
        }

        function onUpdate(c, g) {
            g.clearRect(760, 10, 40, 20);
            g.fillText(game.FPS, 760, 20);
        }

        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.DeepSpace = function() {

        var game = Bax.Game;
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            0, onCreate, onUpdate);

        function onCreate(c, g) {
            var colormap = ['#220022', '#110022', '#000022'];

            var gradient = g.createLinearGradient(0, 0, 0, c.height);
            for (var i = 0, l = colormap.length, s = 1 / l; i < l; i++) {
                gradient.addColorStop(i * s, colormap[i]);
            }

            g.fillStyle = gradient;
            g.fillRect(0, 0, c.width, c.height);
        }

        function onUpdate(c, g) {
        }

        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.StarFieldFar = function() {

        var game = Bax.Game;
        var lines = [];
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            1, onCreate, onUpdate);

        function onCreate(c, g) {
            lines = document.getElementsByTagName('html')[0]
                    .innerHTML
                    .replace(/\>\</g, '>\n<')
                    .replace(/\r/g, '\n')
                    .replace(/\n\n/g, '\n')
                    .split('\n');

            g.font = '10px monospace';

            var gradient = g.createLinearGradient(0, 0, c.width, c.height);
            gradient.addColorStop(0, '#660066');
            gradient.addColorStop(0.5, '#006600');
            gradient.addColorStop(1.0, '#660000');

            g.fillStyle = gradient;
        }

        function onUpdate(c, g) {
            r = (r < relax ? r + 1 : r = 0);
            if (r === 0) {
                g.clearRect(0, 0, c.width, c.height);
                var index = curPosition--;
                if (curPosition < 0) curPosition = index = lines.length;
                for (var i = 0; i < 64; i++, index++) {
                    if (index >= lines.length) index = 0;
                    g.fillText(lines[index], 800 - (lines[index].length * 8), i * 12);
                }
            }
        }

        var r = 0, relax = 10;
        var curPosition = 0;
        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.StarFieldNear = function() {

        var game = Bax.Game;
        var lines = [];
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            1, onCreate, onUpdate);

        function onCreate(c, g) {
            Bax.Http.get('codebugs.js', function(content) {
                lines = content
                        .replace(/\r/g, '\n')
                        .replace(/\n\n/g, '\n')
                        .split('\n');
            });

            g.font = '18px monospace';

            var gradient = g.createLinearGradient(0, 0, c.width, c.height);
            gradient.addColorStop(0, '#990099');
            gradient.addColorStop(0.5, '#009900');
            gradient.addColorStop(1.0, '#990000');

            g.fillStyle = gradient;
        }

        function onUpdate(c, g) {
            r = ++r % relax;
            if (r === 0) {
                g.clearRect(0, 0, c.width, c.height);
                var index = curPosition--;
                if (curPosition < 0) curPosition = index = lines.length;
                for (var i = 0; i < 34; i++ , index++) {
                    if (index >= lines.length) index = 0;
                    g.fillText(lines[index], 0, i * 24);
                }
            }
        }

        var r = 0, relax = 2;
        var curPosition = 0;
        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.BossField = function() {

        var game = Bax.Game;
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            20, onCreate, onUpdate);

        var boss = null;

        function onCreate(c, g) {
            g.fillStyle = '#80DD00';
            g.font = '14px monospace';

            boss = new Bax.Game.Boss(400, 60, 16);
        }

        function onUpdate(c, g) {
            r = ++r % relax;
            if (r === 0) {
                g.clearRect(0, 0, c.width, c.height);

                if (boss.isDoingSomething && Bax.Random.nextInt(20) === 0)
                    boss.doNothing();
                else
                    boss.walk(c.width);
                
                boss.draw(c, g);
            }
        }

        var r = 0, relax = 10;
        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.BugsField = function() {

        var game = Bax.Game;
        var layer = new Bax.Layer(game.Viewport, game.Width, game.Height,
            10, onCreate, onUpdate);

        var bugs = [];

        function onCreate(c, g) {
            g.fillStyle = '#80FF00';
            g.font = '14px monospace';

            var i = 0;
            for (i = 0; i < 5; i++) {
                bugs.push(new Bax.Game.Bug(20 + (i + 1) * 110, 400, 16));
            }
            for (i = 0; i < 6; i++) {
                bugs.push(new Bax.Game.Bug((i + 1) * 100, 500, 16));
            }
            for (i = 0; i < 5; i++) {
                bugs.push(new Bax.Game.Bug(20 + (i + 1) * 110, 600, 16));
            }
        }

        function onUpdate(c, g) {
            r = ++r % relax;
            if (r === 0) {
                g.clearRect(0, 0, c.width, c.height);

                var ix = Bax.Random.nextInt(2, -2),
                    iy = Bax.Random.nextInt(2, -2);

                for (var i = 0; i < bugs.length; i++) {
                    bugs[i].move(ix, iy);

                    if (Bax.Random.nextInt(20) === 0
                        && !bugs[i].isDoingSomething) {

                        switch (Bax.Random.nextInt(6)) {
                            case 1:
                                bugs[i].lookLeft();
                                break;
                            case 2:
                                bugs[i].lookRight();
                                break;
                            case 3:
                                bugs[i].blink();
                                break;
                            case 4:
                                bugs[i].sleep();
                                break;
                            case 5:
                                bugs[i].wink();
                                break;
                        }
                    }
                    bugs[i].draw(c, g);
                }
            }
        }

        var r = 0, relax = 10;
        return layer;
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    (function() {
        var This = (

            Bax.Game.Element = Bax.createClass(function(x, y, csize) {

                this.x = x;
                this.y = y;
                this.charSize = csize;
            })

        ).prototype;

        This.draw = function(canvas, graphics) { };

        This.toString = function() {
            return '[object Bax.Game.Element]';
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    (function() {
        var Base = Bax.Game.Element, base = Base.prototype;
        var This = (

            Bax.Game.Enemy = Bax.extendClass(Base, function(x, y, csize) {

                this.isDoingSomething = false;
            })

        ).prototype;

        This.draw = function(c, g) { };

        This.doNothing = function() {
            this.isDoingSomething = false;
        };

        This.doThisFor = function(t) {
            this.isDoingSomething = true;
            var self = this;
            setTimeout(function() { self.doNothing(); }, t);
        };

        This.toString = function() {
            var b = base.toString.apply(this, arguments);
            return '[object Bax.Game.Enemy > ' + b + ']';
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    (function() {
        var Base = Bax.Game.Enemy, base = Base.prototype;
        var This = (

            Bax.Game.Boss = Bax.extendClass(Base, function(x, y, csize) {

                this.currDir = 0;
            })

        ).prototype;

        var boss = [[
            '  ((((c,               ,7))))  ',
            ' (((((((              )))))))) ',
            '  (((((((            ))))))))  ',
            '   ((((((@@@@@@@@@@@))))))))   ',
            '    @@@@@@@@@@@@@@@@)))))))    ',
            ' @@@@@@@@@@@@@@@@@@))))))@@@@  ',
            '@@/.:::.\\/.:::.\\@@@@@@@@@@@@@@ ',
            '@@|:::::||:::::|@@@@@@@@@\\@@@@',
            '@@\\\':::\'/\\\':::\'/@@@@@@@@@@\\@@ ',
            ' @@@@@@//\\\\@@@@@@@@@@@@@@@@@ \\  ',
            '   @@@@@@@@@@@@@@@@@@@@@@\\    ) ',
            '      /    \\        ) /   )  /  ',
            '     (      )      /     /     ',
            '      \\    /                  '
        ], [
            '     ,,                ,,    ',
            '   (((((              )))))  ',
            '  ((((((              )))))) ',
            '  ((((((    .@@@@.    )))))) ',
            '   ((((((.@@@@@@@@@@.))))))  ',
            '    (((@@@@@@@@@@@@@@@@)))   ',
            '     \\@@/.:::.\\/.:::.\\@@/     ',
            '    /@@@|:::::||:::::|@@@\\   ',
            '   / @@@\\\':::\'/\\\':::\'/@@@ \\  ',
            '  /  /@@@@@@@//\\\\@@@@@@@\\  \\ ',
            ' (  /  \'@@@@@====@@@@@\'  \\  )',
            '  \\(     /          \\     )/ ',
            '    \\   (            )   /   ',
            '         \\          /        '
        ], [
            '  ((((c,               ,7))))  ',
            ' ((((((((              ))))))) ',
            '  ((((((((            )))))))  ',
            '   (((((((@@@@@@@@@@@)))))))   ',
            '    (((((((@@@@@@@@@@@@@@@@    ',
            '  @@@@((((((@@@@@@@@@@@@@@@@@@ ',
            ' @@@@@@@@@@@@@@/.:::.\\/.:::.\\@@ ',
            '@@@@/@@@@@@@@@@|:::::||:::::|@@',
            ' @@/@@@@@@@@@@@\\\':::\'/\\\':::\'/@@ ',
            '  / @@@@@@@@@@@@@@@@//\\\\@@@@@@ ',
            ' (    /@@@@@@@@@@@@@@@@@@@@@@   ',
            '  \\  (   \\ (     /     \\     ',
            '      \\     \\    (      )    ',
            '                  \\    /       '
        ]];

        This.draw = function(c, g) {
            var currBoss = boss[this.currDir + 1];
            for (var i = 0; i < currBoss.length; i++) {
                g.fillText(currBoss[i], this.x, this.y + this.charSize * i);
            }
        };

        This.doNothing = function() {
            base.doNothing.apply(this, arguments);
            this.currDir = 0;
        };

        This.walk = function(w) {
            if (this.currDir === 0) this.currDir = Bax.Random.nextBit() === 0 ? -1 : +1;
            if (this.currDir === -1 && this.x <= 0) this.currDir = 1;
            if (this.currDir === +1 && this.x >= w - 14 * this.charSize) this.currDir = -1;

            this.x += 11 * this.currDir;
            this.y += this.x % 2 === 0 ? -1 : +1;
            this.isDoingSomething = true;
        };

        This.toString = function() {
            var b = base.toString.apply(this, arguments);
            return '[object Bax.Game.Boss > ' + b + ']';
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    (function() {
        var Base = Bax.Game.Enemy, base = Base.prototype;
        var This = (

            Bax.Game.Bug = Bax.extendClass(Base, function(x, y, csize) {

                this.currEyes = 0;
            })

        ).prototype;

        var body = [
            ' \\__/ ',
            ' (oo) ',
            '//||\\\\'
        ];

        var eyes = [
            ' (oo) ',
            'oO  ) ',
            ' (  Oo',
            ' (o-) ',
            ' (--) ',
            ' (@@) ',
            ' (OO) ',
            ' (xx) '];

        This.draw = function(c, g) {
            g.fillText(body[0], this.x, this.y);
            g.fillText(eyes[this.currEyes], this.x, this.y + this.charSize);
            g.fillText(body[2], this.x, this.y + this.charSize + this.charSize);
        };

        This.doNothing = function() {
            base.doNothing.apply(this, arguments);
            this.lookAhead();
        };

        This.lookAhead = function() {
            this.currEyes = 0;
        };

        This.lookLeft = function() {
            this.currEyes = 1;
            this.doThisFor(1000 + Bax.Random.nextInt(1000));
        };

        This.lookRight = function() {
            this.currEyes = 2;
            this.doThisFor(1000 + Bax.Random.nextInt(1000));
        };

        This.move = function(ix, iy) {
            this.x += ix;
            this.y += iy;
        };

        This.blink = function() {
            this.currEyes = 4;
            this.doThisFor(60);
        };

        This.sleep = function() {
            this.currEyes = 4;
            this.doThisFor(5000);
        };

        This.wink = function() {
            this.currEyes = 3;
            this.doThisFor(500);
        };

        This.toString = function() {
            var b = base.toString.apply(this, arguments);
            return '[object Bax.Game.Bug > ' + b + ']';
        };

    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    Bax.Game.run();

})();
