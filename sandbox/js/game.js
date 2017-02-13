
//============================================================================

// Copyright (c) Matussi. All rights reserved.

//============================================================================

// Author    : Mario Dentone [MDE]
// Date      : Jan 2017
// Revisions :

//============================================================================

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

window.onerror = function (msg, url, li, co, err) {
    var to = "<pre>", tc = "</pre>";
    var es = "<div>";
    es += to + ":( error" + tc;
    if (msg)
        es += to + msg + tc;
    if (url && li > 0 && co > 0)
        es += to + url + ":" + li + ":" + co + tc;
    if (err && err.stack)
        es += to + err.stack + tc;
    es += "</div>";
    if (document && document.body)
        document.body.innerHTML = es;
    else if (document) {
        document.open();
        document.write(es);
        document.close();
    }
    else
        alert(es);
}

// Polyfills
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

if (typeof window.requestAnimationFrame !== "function") {    
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

    instance.version = "1.0.1701.2900";

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
        app = new PIXI.Application(0, 0, {
            transparent: true
        });
        app.view.style.width = "100%";
        app.view.style.height = "100%";
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function setupEventHandlers() {
        // game state handlers
        window.onblur = /*appContainer.onblur =*/ instance.suspend;
        window.onfocus = /*appContainer.onfocus =*/ instance.resume;
        appContainer.onresize = resize;
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function load() {
        PIXI.loader
            .add("background", "assets/background.jpg")
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
                background = new PIXI.Sprite(resources.background.texture);

                Game.GameData.Helpers.createSquares(background);

                app.stage.addChild(background);

                sidebar = new PIXI.Sprite(resources.sidebar.texture);

                Game.GameData.Helpers.createPlayer(background);
                Player.init();

                Game.GameData.Helpers.createDiceFaces();

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
        if (minigameContainer) {
            console.warn("A minigame is already running");
            return;
        }
        instance.suspend();
        var games = ["Bubble", "Frogger", "Ninja", "Sheep", "Sorcerer"],
            game = games[game];
        minigameContainer = document.createElement("IFRAME");
        minigameContainer.style.cssText =
            "position:absolute;position:fixed;" +
            "left:0;top:0;width:100%;height:100%;z-index:1000;" +
            "background-color:black;";
        minigameContainer.src = "Minigames/" + game + "/index.html?level=" + level;
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
            iW = appContainer.clientWidth || constants.minW;
            iH = appContainer.clientHeight || constants.minH;
        }
        var w, h;
        if (iW / iH > 0.50) {
            // make ratio: iW : iH = w : minH => w = (iW * minH) / iH
            h = constants.minH;
            w = (iW * h) / iH;
        }
        else {
            // make ratio: iW : iH = minW : h => h = (iH * minW) / iW
            w = constants.minW;
            h = (iH * w) / iW;
        }
        app.renderer.resize(w, h);
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
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'normal',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
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

            instance.minW = 800;
            instance.minH = 700;

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
                moves++;
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
                instance.center();
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
                instance.center();
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.center = function () {
            var vx = app.renderer.width - sidebar.width,
                cx = vx / 2 - background.x;
            var step = Math.abs(stepx);
            if (player.x > cx && background.x + background.width - step >= vx) {
                background.x -= step;
            }
            else if (player.x < cx && background.x + step <= 0) {
                background.x += step;
            }
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var prevSquare = 0, currSquare = 0, backward = false;

        var player, squares;

        var stepx, stepy, moves, walks;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game object

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

            if (lastFace) app.stage.removeChild(lastFace);
            if (df) {
                lastFace = df[value - 1];
                lastFace.pivot.set(50, 50);
                lastFace.rotation = Math.random() * Math.PI;
                lastFace.scale.set(0.95 + Math.random() * 0.1);
                lastFace.position.set(app.renderer.width - 120, 360);
                app.stage.addChild(lastFace);
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
            background.x = 0;
            playtext = generator.makeButton(
                generator.addText(constants.strings.start),
                function () {
                    screens.enter(constants.gameStates.start);
                }
            );
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            playtext.destroy(true);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            if (scrollToRight === true) {
                if (background.x + background.width - scrollStep < app.renderer.width) {
                    scrollToRight = false;
                }
                else {
                    background.x -= scrollStep;
                }
            }
            else {
                if (background.x + scrollStep > 0) {
                    scrollToRight = true;
                }
                else {
                    background.x += scrollStep;
                }
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () {
            if (background.x + background.width < app.renderer.width) {
                background.x = app.renderer.width - background.width;
            }
            if (background.x > 0) {
                background.x = 0;
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var scrollStep = 2, scrollToRight = true;
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
            if (background.x + scrollStep > 0) {
                screens.enter(constants.gameStates.play);
            }
            else {
                background.x += scrollStep;
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
            sidebar.x = app.renderer.width - sidebar.width;
            background.x = 0;
            app.stage.addChild(sidebar);

            background.addChild(Game.GameData.Player);
            Player.reset();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            Dice.clear();
            background.removeChild(Game.GameData.Player);
            app.stage.removeChild(sidebar);
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
                    launch(square.data.game, square.data.levels[square.data.level],
                    function (passed) {
                        if (passed) {
                            square.data.level++;
                            if (square.data.level >= square.data.levels.length) {
                                square.data.level = 0;
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
            sidebar.x = app.renderer.width - sidebar.width;
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
            background.x = 0;

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
    var background, sidebar, fader,
        loadingtext, exittext, yestext, notext,
        dicebutton, pausebutton, exitbutton;

    // game status
    var suspended = false, paused = false;

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return instance;
})();
