
//============================================================================

// Copyright (c) Matussi. All rights reserved.

//============================================================================

// Author    : Mario Dentone [MDE]
// Date      : Jan 2017
// Revisions : Mar 2017

//============================================================================

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

window.onerror = function (msg, url, li, co, err) {
    if (Game.debug === true) {
        alert(msg + "\n" + url + ":" + li + ":" + co + "\n" +
              "-- stack --\n" +
              (err && err.stack ? err.stack : (err || "no stack info")));
    }
}

// Polyfills
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

if (typeof window.requestAnimationFrame !== "function") {
    console.debug("Emulating requestAnimationFrame function");
    window.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 16.6667);
    }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game object

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var Game = (function () {
    var instance = { };

    // Properties
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    instance.version = "1.0.1703.2700";

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    instance.debug = false;

    // Methods
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /// <summary>
    /// Creates and sets up the game.
    /// </summary>
    instance.run = function (container) {
        instance.run = function () { console.warn("Run already called."); };
        console.info("Run!");

        if (typeof PIXI !== "object") {
            document.write(":( error loading");
            return;
        }

        appContainer = container || document.body;
        appContainer.style.textAlign = "center";

        constants.initialize();

        setupGameApp();

        resize();
        appContainer.appendChild(app.view);

        load();
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /// <summary>
    /// Stops the game rendering engine.
    /// Automatically invoked when browser window loses focus; if the game
    /// is in Play state, the game will be paused.
    /// </summary>
    instance.suspend = function () {
        var evt = arguments[0];
        if (evt && evt.stopPropagation) evt.stopPropagation();
        if (!suspended) {
            screens.current.suspend();
            app.ticker.stop();
            suspended = true;
        }
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /// <summary>
    /// Resume the game rendering engine.
    /// Automatically invoked when browser window gets focus; if the game
    /// is in Play state, the game *will not* be unpaused.
    /// </summary>
    instance.resume = function () {
        var evt = arguments[0];
        if (evt && evt.stopPropagation) evt.stopPropagation();
        if (suspended && screens.current.resume() !== false) {
            app.ticker.start();
            suspended = false;
            mainloop();
        }
    };

    // Private Methods
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function setupGameApp() {
        app = new PIXI.Application(0, 0, { transparent: true });
        if (Game.options.margin) {
            app.view.style.margin = Game.options.margin + "px";
        }
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function setupEventHandlers() {
        // game state handlers
        window.onblur = instance.suspend;
        window.onfocus = instance.resume;
        appContainer.onresize = resize;
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function load() {
        PIXI.loader
            .add("field", "assets/field.png")
            .add("background", "assets/background.png")
            .add("sky", "assets/sky.jpg")
            .add("sidebar", "assets/sidebar.jpg")
            .add('spritesheet', 'assets/explosions.json')
            .on("progress", function (loader, resource) {
                var str = constants.strings.loading + " " + Math.round(loader.progress) + "%";
                if (!loadingtext) {
                    loadingtext = generator.addText(str);
                }
                loadingtext.text = str;
            })
            .load(function (loader, resources) {
                var sky = new PIXI.Sprite(resources.sky.texture);
                app.stage.addChild(sky);

                var background = new PIXI.Sprite(resources.background.texture);
                background.y = 136;
                app.stage.addChild(background);

                var field = new PIXI.Sprite(resources.field.texture);
                app.stage.addChild(field);

                scene.initialize(sky, background, field);

                Game.GameData.Helpers.createSquares(field);

                sidebar = new PIXI.Sprite(resources.sidebar.texture);
                sidebar.x = app.renderer.width - sidebar.width;
                app.stage.addChild(sidebar);
                sidebar.sidebarvisible = true;

                Game.GameData.Helpers.createPlayer(field);
                Player.init();

                Game.GameData.Helpers.createDiceFaces();

/* /////
                dicebutton = new PIXI.Graphics();
                dicebutton.lineStyle(0);
                dicebutton.beginFill(0x0FFFF00, 0.5);
                dicebutton.drawRect(0, 0, sidebar.width, 240);
                dicebutton.endFill();
                dicebutton.position.set(0, 240);
                generator.makeButton(dicebutton, roll);
                sidebar.addChild(dicebutton);

                pausebutton = new PIXI.Graphics();
                pausebutton.lineStyle(0);
                pausebutton.beginFill(0x000FFFF, 0.5);
                pausebutton.drawRect(0, 0, sidebar.width, 110);
                pausebutton.endFill();
                pausebutton.position.set(0, 480);
                generator.makeButton(pausebutton, instance.suspend);
                sidebar.addChild(pausebutton);

                exitbutton = new PIXI.Graphics();
                exitbutton.lineStyle(0);
                exitbutton.beginFill(0xFF00FF, 0.5);
                exitbutton.drawRect(0, 0, sidebar.width, 110);
                exitbutton.endFill();
                exitbutton.position.set(0, 590);
                generator.makeButton(exitbutton, exit);
                sidebar.addChild(exitbutton);

                exittext = generator.createText(constants.strings.exit);
                exittext.y -= 24;

                yestext = generator.createText(constants.strings.yes);
                yestext.y += 24;
                yestext.x -= 48;
                generator.makeButton(yestext, function () {
                    app.ticker.start();
                    mainloop();
                    screens.enter(constants.gameStates.menu);
                    app.stage.removeChild(exittext);
                    app.stage.removeChild(yestext);
                    app.stage.removeChild(notext);
                });

                notext = generator.createText(constants.strings.no);
                notext.y += 24;
                notext.x += 48;
                generator.makeButton(notext, function () {
                    app.ticker.start();
                    mainloop();
                    app.stage.removeChild(exittext);
                    app.stage.removeChild(yestext);
                    app.stage.removeChild(notext);
                });
 //// */

                loadingtext.destroy(true);
                loadingtext = null;

                setupEventHandlers();

                screens.create();
                screens.enter(constants.gameStates.menu);

                mainloop();
            });
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function mainloop() {
        if (app.ticker.started) {
            screens.current.gameloop();
            requestAnimationFrame(mainloop);
        }
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function roll(evt) {
        if (evt && evt.stopPropagation) evt.stopPropagation();

        // delete
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function launch(game, level, callback) {
        if (Game.debug === true) {
            callback(false);
            return;
        }
        if (minigameContainer) {
            console.warn("A minigame is already running");
            return;
        }
        instance.suspend();
        minigameContainer = document.createElement("IFRAME");
        minigameContainer.style.cssText =
            "position:absolute;position:fixed;" +
            "left:0;top:0;width:100%;height:100%;z-index:1000;";
        minigameContainer.src = "mg/" + game + "/index.html?level=" + level;
        appContainer.appendChild(minigameContainer);
        window.endLevel = function (passed) {
            window.endLevel = function (passed) { };
            appContainer.removeChild(minigameContainer);
            minigameContainer = null;
            setTimeout(function () {
                instance.resume();
                callback(passed);
            }, 200);
        };
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    window.endLevel = function(passed) { };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function exit(evt) {
        if (evt && evt.stopPropagation) evt.stopPropagation();
        app.ticker.stop();
        app.stage.addChild(exittext);
        app.stage.addChild(yestext);
        app.stage.addChild(notext);
        app.render();
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function resize() {
        console.debug("Resize");

        var iW, iH;
        if (appContainer === document.body) {
            iW = window.innerWidth;
            iH = window.innerHeight;
        }
        else {
            iW = appContainer.clientWidth  || window.innerWidth;
            iH = appContainer.clientHeight || window.innerHeight;
        }

        // apply padding, if set
        if (Game.options.margin) {
            iW -= 2 * Game.options.margin;
            iH -= 2 * Game.options.margin;
        }

        // maximize vertical ratio, then round horizontal width:
        // (note the iH is always diminished: setting the value a little bit 
        // less than exact height prevents scrollbars to appear...)
        while (iW / (iH -= 4) < 0.67) { }
        if (iH / iW < constants.maxR) iW = iH / constants.maxR;

        app.renderer.view.style.width = iW + "px";
        app.renderer.view.style.height = iH + "px";

        var rW = (iW * constants.minH) / iH;
        app.renderer.resize(rW, constants.minH);

        scene.resize();
        if (screens && screens.current) {
            screens.current.resize();
        }
        app.render();
    };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Constants object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var constants = (function () {
        var instance = {};

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.initialize = function () {

            // Constants
            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.defaultTextStyle = new PIXI.TextStyle({
                fontFamily: ["helvneueblk", "Arial Black", "Helvetica", "Arial"],
                fontSize: 36,
                fontStyle: "normal",
                fontWeight: "normal",
                fill: ["#ffffff", "#00ff99"], // gradient
                stroke: "#4a1850",
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            });

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.gameStates = {
                load   : 0,
                menu   : 1,
                start  : 2,
                play   : 3,
                finish : 4
            };

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.minW = 1702;
            instance.minH = 700;
            instance.maxR = instance.minH / instance.minW;

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.strings = {
                loading  : "LOADING",
                paused   : "PAUSED",
                start    : "START",
                exit     : "EXIT?",
                yes      : "YES",
                no       : "NO",
                congrats : "CONGRATULATIONS!"
            };

        };

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Generator object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var generator = (function () {
        var instance = {};

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.addText = function (str, container) {
            var text = instance.createText(str);
            (container || app.stage).addChild(text);
            return text;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.createText = function (str) {
            var text = new PIXI.Text(str || "", constants.defaultTextStyle);
            text.x = (app.view.width - text.width) / 2;
            text.y = (app.view.height - text.height) / 2;

            return text;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.makeButton = function (obj, handler, once) {
            obj.interactive = true;
            obj.buttonMode = true;
            var f = function (evt) {
                if (evt && evt.stopPropagation) evt.stopPropagation();
                handler();
            }
            if (once)
                obj.once("pointerdown", f);
            else
                obj.on("pointerdown", f);
            return obj;
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.Player object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var Player = (function () {
        var instance = {};

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.init = function () {
            var gd = Game.GameData;
            player = gd.Player;
            squares = gd.Squares;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.currentSquare = function () {
            return currSquare;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.reset = function () {
            prevSquare = currSquare = moves = 0;
            backward = false;
            walks = 0;
            player.position.set(squares[currSquare].x, squares[currSquare].y);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.move = function (steps) {
            if (steps) {
                //countMoves++;
                walks = steps;
                backward = steps < 0;
            }
            prevSquare = currSquare;
            if (backward)
                currSquare--;
            else
                currSquare++;
            if (currSquare >= squares.length) {
                backward = true;
                currSquare = squares.length - 2;
            }
            moves = 20;
            stepx = (squares[currSquare].x - squares[prevSquare].x) / moves;
            stepy = (squares[currSquare].y - squares[prevSquare].y) / moves;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.walk = function () {
            if (--moves <= 0) {
                player.position.set(squares[currSquare].x, squares[currSquare].y);
                instance.center(stepx);
                if (--walks > 0) {
                    instance.move();
                }
                else {
                    return true;
                }
            }
            else {
                player.x += stepx;
                player.y += stepy;
                instance.center(stepx);
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.center = function (stepx) {
            scene.center(player.x, stepx || 0);
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var prevSquare = 0, currSquare = 0, backward = false;

        var player, squares;

        var stepx, stepy, moves, walks;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.scene object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var scene = (function () {
        var instance = { };

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.initialize = function (sky, background, foreground) {
            sprites.push(sky);
            sprites.push(background);
            sprites.push(foreground);
            front = foreground;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.front = function () { return front; };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.center = function (x, stepx) {
            var vx = vwwidth,
                cx = vx / 2 - front.x,
                step = Math.abs(stepx);
            var dx = 0;
            if (x > cx) {
                if (front.x + front.width - step >= vx) {
                    dx = step;
                }
                else {
                    dx = vx - (front.x + front.width - step);
                }
            }
            else if (x < cx) {
                if (front.x + step <= 0) {
                    dx = -step;
                }
                else {
                    dx = -step + front.x;
                }
            }
            return Math.abs(instance.render(dx));
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.moveTo = function (x) {
            if (x > 0) {
                x = 0;
            }
            else if (x + front.width < vwwidth) {
                x = vwwidth - front.width;
            }
            var dx = front.x - x;

            sprites[0].x = ((sprites[0].width-600) * x) / front.width;
            sprites[1].x = ((sprites[1].width-200) * x) / front.width;
            sprites[2].x = x;

            return dx;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.moveBy = function (dx) {
            return instance.moveTo(front.x - dx);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.render = function (dx) {
            var sl = sprites.length;
            for (var i = 0; i < sl; i++) {
                sprites[i].x -= dx * (i+1) / sl;
            }
            return dx;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.resize = function () {
            if (!front) return;

            sidebar.x = app.renderer.width - sidebar.width;
            vwwidth = app.renderer.width - (sidebarvisible ? sidebar.width : 0);

            var dx = vwwidth - front.x - front.width;
            if (dx > 0) {
                instance.render(-dx);
            }
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var sprites = [], front, vwwidth;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.Dice object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var Dice = (function () {
        var instance = {};

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.last = function () { return value; }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.roll = function () {
            value = next();

            if (rolling === 0)
                rolling = 20;
            else
                rolling--;

            var gd = Game.GameData,
                df = gd.DiceFaces;

            if (lastFace) sidebar.removeChild(lastFace);
            if (df) {
                lastFace = df[value - 1];
                lastFace.pivot.set(50, 50);
                lastFace.rotation = Math.random() * Math.PI;
                lastFace.scale.set(0.95 + Math.random() * 0.1);
                lastFace.position.set(120, 360);
                sidebar.addChild(lastFace);
            }

            return rolling === 0;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.clear = function () {
            if (lastFace) app.stage.removeChild(lastFace);
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        function next() { return Math.floor((Math.random() * 6) + 1); }

        var value = next();
        var rolling = 0;

        var lastFace;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var screens = (function () {
        var instance = { };

        // Properties
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.current = null;

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.create = function () {
            screens = [
                null,
                new MenuScreen(),
                new StartScreen(),
                new PlayScreen(),
                new FinishScreen(),
            ];
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.enter = function (state) {
            if (state === currentState) return;
            if (instance.current) {
                console.debug("Exiting state %d", currentState);
                instance.current.exit();
            }
            instance.current = screens[currentState = state];
            console.debug("Entering state %d", currentState);
            instance.current.enter();
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var screens;
        var currentState = 0;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // NullScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var NullScreen = (function ctor() {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // MenuScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var MenuScreen = (function ctor() {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            ////app.stage.removeChild(sidebar);
            ////sidebar.sidebarvisible = false;
            ////resize();
            /*
            playtext = generator.makeButton(
                generator.addText(constants.strings.start),
                function () {
                    screens.enter(constants.gameStates.start);
                }
            );
            */
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            if (playtext) playtext.destroy(true);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            var scrollStep = Math.min(2, (scene.front().width - app.renderer.width) / 60);
            if (scrollToRight === true) {
                if (scene.moveBy(scrollStep) === 0) {
                    scrollToRight = false;
                }
            }
            else {
                if (scene.moveBy(-scrollStep) === 0) {
                    scrollToRight = true;
                }
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () {
            if (playtext) {
                playtext.x = (app.view.width - playtext.width) / 2;
                playtext.y = (app.view.height - playtext.height) / 2;
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var scrollToRight = true;
        var playtext;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // StartScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var StartScreen = (function ctor() {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            //////sidebar.x = app.renderer.width - sidebar.width;
            //////app.stage.addChild(sidebar);
            //////sidebar.sidebarvisible = true;
            //////resize();

            var sq1 = Game.GameData.Squares[0].x;
            if (scene.center(sq1, scrollStep) < scrollStep) {
                screens.enter(constants.gameStates.play);
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var scrollStep = 10;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // PlayScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var PlayScreen = (function ctor() {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            scene.front().addChild(Game.GameData.Player);
            Player.reset();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            Dice.clear();
            scene.front().removeChild(Game.GameData.Player);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            switch (state) {
            case DICE:
                // todo
                state = ROLL;
                break;
            case ROLL:
                if (Dice.roll()) {
                    Player.move(Dice.last());
                    state = WALK;
                }
                break;
            case WALK:
                if (Player.walk()) state = PLAY;
                break;
            case PLAY:
                var square = Game.GameData.Squares[Player.currentSquare()];
                if (square.type === Game.GameData.SquareTypes.Finish) {
                    screens.enter(constants.gameStates.finish);
                }
                else if (square.type === Game.GameData.SquareTypes.Game) {
                    state = GAME;
                    var g = square.data, d = Game.GameData.Squares.Data[g];
                    launch(g, d.levels[d.level],
                    function (passed) {
                        if (passed) {
                            d.level++;
                            if (d.level >= d.levels.length) {
                                d.level = 0;
                            }
                            state = DICE;
                        }
                        else {
                            Player.move(-Dice.last());
                            state = WALK;
                        }
                    });
                }
                else {
                    state = DICE;
                }
                break;
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () {
            Player.center();
            if (pausetext) {
                pausetext.x = (app.view.width - pausetext.width) / 2;
                pausetext.y = (app.view.height - pausetext.height) / 2;
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () {
            if (state === GAME) {
                return;
            }
            paused = true;

            var graphics = new PIXI.Graphics();
            graphics.lineStyle(0);
            graphics.beginFill(0x33333CC, 0.75);
            graphics.drawRect(0, 0, app.stage.width, app.stage.height);
            graphics.endFill();

            graphics.interactive = true;
            graphics.buttonMode = true;
            graphics.once("pointerdown", function () {
                app.stage.removeChild(graphics);
                paused = false;
                Game.resume();
            });

            pausetext = generator.addText(constants.strings.paused, graphics);

            app.stage.addChild(graphics);

            app.render();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () {
            return state === GAME || paused === false;
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var DICE = 0, ROLL = 1, WALK = 2, PLAY = 3, GAME = 4;
        var state = DICE;

        var paused = false;

        var pausetext;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // FinishScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var FinishScreen = (function ctor() {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            explosionTextures = [];
            explosions = [];
            var i;

            for (i = 0; i < 26; i++) {
                var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
                explosionTextures.push(texture);
            }

            for (i = 0; i < 5; i++) {
                // create an explosion AnimatedSprite
                var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
                explosions.push(explosion);

                explosion.animationSpeed = 0.667;
                explosion.x = Math.random() * app.renderer.width;
                explosion.y = Math.random() * app.renderer.height /2;
                explosion.anchor.set(0.5);
                explosion.rotation = Math.random() * Math.PI;
                explosion.scale.set(0.75 + Math.random() * 0.5);
                explosion.gotoAndPlay(Math.random() * 27);
                app.stage.addChild(explosion);
            }

            congratstext = generator.addText(constants.strings.congrats);
            generator.makeButton(congratstext, function () {
                screens.enter(constants.gameStates.menu);
            }, true);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            congratstext.destroy(true);
            congratstext = null;
            
            var i;
            for (var i = 0; i < explosions.length; i++) {
                explosions[i].destroy(true);
            }
            explosionTextures = null;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            if (++frameSkipper % 26 > 0) {
                return;
            }

            var explosion = explosions[++currentExplosion % explosions.length];
            explosion.position.set(
                Math.random() * app.renderer.width,
                Math.random() * app.renderer.height / 2
            );
            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.set(0.75 + Math.random() * 0.5);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var congratstext = null,
            explosionTextures = null,
            explosions = null;

        var currentExplosion = 0, frameSkipper = 0;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    // Private Members
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // dom element to contain the app
    var appContainer;

    // dom element to contain the minigames
    var minigameContainer;

    // pixi application
    var app;

    // pixi elements
    var sidebar, sidebarvisible = false,
        loadingtext, exittext, yestext, notext,
        dicebutton, pausebutton, exitbutton;

    // game status
    var suspended = false, paused = false;

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return instance;
})();
