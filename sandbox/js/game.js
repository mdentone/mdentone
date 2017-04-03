
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
    if (Game.debug === true) console.debug("Emulating requestAnimationFrame function");
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

    instance.version = "1.0.1703.3000";

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    instance.debug = false;

    // Methods
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /// <summary>
    /// Creates and sets up the game.
    /// </summary>
    instance.run = function (container) {
        instance.run = function () { console.warn("Run already called."); };

        if (typeof PIXI !== "object") {
            document.write(":( error loading");
            return;
        }

        console.info("Run!");

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
            .add("sky", "assets/sky.png")
            .add("sidebar", "assets/sidebar.png")
            .add("characters", "assets/characters.json")
            .add("explosions", "assets/explosions.json")
            .on("progress", function (loader, resource) {
                var str = constants.strings.loading + " " + Math.round(loader.progress) + "%";
                if (!loadingtext) {
                    loadingtext = generator.addText(str);
                }
                else {
                    loadingtext.text = str;
                }
            })
            .load(function (loader, resources) {
                var sky = new PIXI.Sprite(resources.sky.texture);
                app.stage.addChild(sky);

                var background = new PIXI.Sprite(resources.background.texture);
                background.x = (sky.width - background.width) / 2;
                background.y = 136;
                app.stage.addChild(background);

                var field = new PIXI.Sprite(resources.field.texture);
                field.x = (sky.width - field.width) / 2;
                app.stage.addChild(field);

                scene.initialize(sky, background, field);

                Game.GameData.Helpers.createSquares(field);

                sidebar = new PIXI.Sprite(resources.sidebar.texture);
                sidebar.x = constants.MAXW - sidebar.width;
                app.stage.addChild(sidebar);

                countmovestext = generator.addText("0", sidebar, constants.smallerTextStyle);
                countmovestext.position.set(sidebar.width - 40, 140);
                sidebar.addChild(countmovestext);

                scene.resize();

                characterTextures = [];
                for (var i = 0; i < 3; i++) {
                    var texture = PIXI.Texture.fromFrame("character" + i + ".png");
                    characterTextures.push(texture);
                }

                sounds.initialize();

                Player.init();

                Game.GameData.Helpers.createDiceFaces();

                loadingtext = generator.release(loadingtext);

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

    function launch(game, level, callback) {
        if (Game.debug === true) {
            callback(false);
            return;
        }
        if (minigameContainer) {
            console.warn("A minigame is already running");
            return;
        }
        sounds.playTrack.stop();
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
                sounds.playTrack.play();
                callback(passed);
            }, 200);
        };
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    window.endLevel = function(passed) { };

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    function resize() {
        if (Game.debug === true) console.debug("Resize");

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
        // (note the iH is always diminished: setting the value a little
        // bit less than exact height prevents scrollbars to appear...)
        while (iW / (iH -= 4) < 0.67) { }
        if (iH / iW < constants.MAXR) iW = Math.floor(iH / constants.MAXR);

        app.view.style.width = iW + "px";
        app.view.style.height = iH + "px";

        var rW = Math.floor((iW * constants.MAXH) / iH);
        app.renderer.resize(rW, constants.MAXH);

        if (Game.debug === true) console.debug("Final size: ", iW, iH, rW);

        // keep stage right-aligned:
        app.stage.x = rW - constants.MAXW;

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
                fontSize: 72,
                fontStyle: "normal",
                fontWeight: "normal",
                align:"center",
                fill: ["#ffffff", "#00ff99"], // gradient
                stroke: "#4a1850",
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: false,
                wordWrapWidth: 560
            });

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.smallerTextStyle = instance.defaultTextStyle.clone();
            instance.smallerTextStyle.fontSize = 36;

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.gameStates = {
                load   : 0,
                menu   : 1,
                start  : 2,
                play   : 3,
                finish : 4
            };

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.MAXW = 1702 + 234;
            instance.MAXH = 700;
            instance.MAXR = instance.MAXH / instance.MAXW;

            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

            instance.strings = {
                loading  : "LOADING",
                paused   : "PAUSED",
                start    : "PLAY",
                choose   : "CHOOSE YOUR\nCHARACTER",
                instrcts : "ROLL THE DICE TO REACH\n" +
                           "THE GOAL. EARN BONUS IF\n" +
                           "YOU PASS SPECIAL GAMES",
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

        instance.addText = function (str, container, style) {
            var text = instance.createText(str, style);
            (container || app.stage).addChild(text);
            return scene.center(text);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.createText = function (str, style) {
            var text = new PIXI.Text(str, style || constants.defaultTextStyle);
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
            if (once) {
                obj.once("pointerdown", f);
            }
            else {
                obj.on("pointerdown", f);
            }
            return obj;
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.release = function (objects) {
            for (var i = 0; i < arguments.length; i++) {
                if (!arguments[i]) debugger;
                arguments[i].destroy();
            }
            return null;
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.Player object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var Player = (function () {
        var instance = { };

        // Properties
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.character = null;

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.init = function () {
            var gd = Game.GameData;
            squares = gd.Squares;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.createCharacter = function (i) {
            instance.character = new PIXI.Sprite(characterTextures[i]);
            instance.character.anchor.set(0.5);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.currentSquare = function () {
            return currSquare;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.reset = function () {
            prevSquare = currSquare = moves = countMoves = 0;
            backward = false;
            walks = 0;
            countmovestext.text = "0";
            var player = instance.character;
            player.position.set(squares[0].x, squares[0].y);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.move = function (steps) {
            if (steps) {
                countmovestext.text = ++countMoves;
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
            var player = instance.character;
            if (--moves <= 0) {
                player.position.set(squares[currSquare].x, squares[currSquare].y);
                instance.center(stepx);
                sounds.stepSound.play();
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
            var player = instance.character;
            //console.log(player.x, player.y);
            scene.centerView(player.x, stepx);
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var prevSquare = 0, currSquare = 0, backward = false;

        var squares;

        var stepx, stepy, moves, walks;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.scene object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var scene = (function () {
        var instance = { };

        // Properties
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.front = null;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.scrollability = 0;

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.initialize = function (sky, background, foreground) {
            sprites.push(sky);
            sprites.push(background);
            sprites.push(foreground);

            instance.front = foreground;

            faderGraphics = new PIXI.Graphics();
            faderGraphics.beginFill(0x000000, 0.67);
            faderGraphics.drawRect(0, 0, 1, 1);
            faderGraphics.endFill();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.fadeIn = function () {
            if (fader) {
                fader.count++;
                return;
            }
            fader = new PIXI.Sprite(faderGraphics.generateTexture());
            fader.position.set(0, 0);
            fader.width = constants.MAXW;
            fader.height = constants.MAXH;
            fader.count = 1;
            app.stage.addChild(fader);
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.fadeOut = function () {
            if (--fader.count === 0) {
                fader = generator.release(fader);
            }
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.centerView = function (destx, stepx) {
            var front = instance.front,
                maxdx = constants.MAXW - app.renderer.width - front.x,
                mindx = sidebar.x - front.width - front.x,
                meddx = (maxdx + mindx) / 2,
                cx = (constants.MAXW - sidebar.width) / 2,
                dx = -destx + cx + meddx;

            if (stepx > 0 && Math.abs(dx) > stepx) {
                dx = PIXI.utils.sign(dx) * stepx;
            }

            return instance.moveBy(dx);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.center = function (obj) {
            if (obj) {
                obj.anchor.set(0.5);
                obj.position.set(
                    obj.x = constants.MAXW - app.renderer.width / 2,
                    obj.y = app.renderer.height / 2
                );
            }
            return obj;
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.centerx = function (objects) {
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                if (obj) obj.x = constants.MAXW - app.renderer.width / 2;
            }
        }

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.moveBy = function (dx) {
            // front is the foreground game field; it can scroll within
            // viewport boundaries; other sprites (background parallax)
            // scroll consequently.

            var front = instance.front,
                maxdx = constants.MAXW - app.renderer.width - front.x,
                mindx = sidebar.x - front.width - front.x;

            if (dx < mindx) {
                if (Game.debug === true) console.debug("correct left");
                dx = mindx;
            }
            else if (dx > maxdx) {
                if (Game.debug === true) console.debug("correct right");
                dx = maxdx;
            }

            sprites[2].x += dx;
            sprites[1].x += ((sprites[1].width - 300) * dx) / front.width;
            sprites[0].x += ((sprites[0].width - 600) * dx) / front.width;

            return dx;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.resize = function () {
            if (!instance.front) return;

            var front = instance.front;

            instance.scrollability = Math.max(0,
                front.width - app.renderer.width + sidebar.width);

            // force left/right corrections:
            instance.moveBy(0);
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var sprites = [], scrollability;
        var faderGraphics, fader;

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

            if (rolling === 0) {
                rolling = 20;
                sounds.rollSound.play();
            }
            else {
                rolling--;
            }

            var gd = Game.GameData,
                df = gd.DiceFaces;

            if (lastFace) sidebar.removeChild(lastFace);
            if (df) {
                lastFace = df[value - 1];
                lastFace.pivot.set(50, 50);
                lastFace.rotation = Math.random() * Math.PI;
                lastFace.scale.set(0.95 + Math.random() * 0.1);
                lastFace.position.set(120, 340);
                sidebar.addChild(lastFace);
            }

            return rolling === 0;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.clear = function () {
            if (lastFace) sidebar.removeChild(lastFace);
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

    // Game.sounds object

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var sounds = (function () {
        var instance = { };

        // Properties
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.mainTrack = null;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.playTrack = null;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.rollSound = null;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.stepSound = null;

        // Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        instance.initialize = function () {
            var p = "assets/";

            instance.mainTrack = new Howl({ src: [p + "maintrack.mp3"],
                loop: true,
                volume: 0.5
            });

            instance.playTrack = new Howl({ src: [p + "playtrack.mp3"],
                loop: true,
                volume: 0.5
            });

            instance.rollSound = new Howl({ src: [p + "roll.mp3"] });

            instance.stepSound = new Howl({ src: [p + "step.mp3"] });

            // set global reference
            Game.sounds = instance;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return instance;
    })();

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // Game.screens object

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
                if (Game.debug === true) console.debug("Exiting state %d", currentState);
                instance.current.exit();
            }
            instance.current = screens[currentState = state];
            if (Game.debug === true) console.debug("Entering state %d", currentState);
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

    // MenuScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var MenuScreen = (function () {
        var screen = { };

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            sounds.mainTrack.play();

            playtext = generator.makeButton(
                generator.addText(constants.strings.start),
                function () {
                    playtext = generator.release(playtext);

                    scene.fadeIn();

                    // PIXI.loader.resources...

                    var gmenu = new PIXI.Graphics();
                    gmenu.beginFill(0x000000, 0.85);
                    gmenu.drawRect(0, 0, 640, 640);
                    gmenu.endFill();

                    menu = new PIXI.Sprite(gmenu.generateTexture());

                    var t0 = generator.addText(constants.strings.choose, menu);
                    t0.position.set(0, menu.y - 150);

                    var t1 = generator.addText(constants.strings.instrcts, menu, constants.smallerTextStyle);
                    t1.position.set(0, menu.y + 200);

                    var characters = [];
                    for (var i = 0; i < 3; i++) {
                        var character = new PIXI.Sprite(characterTextures[i]);
                        character.anchor.set(0.5);
                        character.position.set(i * 150 - 150, 30);
                        characters.push(character);
                        menu.addChild(character);
                    }

                    generator.makeButton(characters[0], function () {
                        Player.createCharacter(0);
                        screens.enter(constants.gameStates.start);
                    }, true);

                    generator.makeButton(characters[1], function () {
                        Player.createCharacter(1);
                        screens.enter(constants.gameStates.start);
                    }, true);

                    generator.makeButton(characters[2], function () {
                        Player.createCharacter(2);
                        screens.enter(constants.gameStates.start);
                    }, true);

                    app.stage.addChild(scene.center(menu));
                }
            );
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            menu = generator.release(menu);
            scene.fadeOut();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            var scrollStep = scene.scrollability / 60;

            if (scrollStep === 0) return;
            if (scrollStep > 2) scrollStep = 2;

            if (scrollToRight === true) {
                if (scene.moveBy(-scrollStep) === 0) {
                    scrollToRight = false;
                }
            }
            else {
                if (scene.moveBy(scrollStep) === 0) {
                    scrollToRight = true;
                }
            }
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () {
            scene.centerx(playtext, menu);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var scrollToRight = true;
        var playtext, menu;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // StartScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var StartScreen = (function () {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            sounds.mainTrack.stop();
            sounds.playTrack.play();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            var sq1 = Game.GameData.Squares[0];
            if (scene.centerView(sq1.x, 10) === 0) {
                screens.enter(constants.gameStates.play);
            }
        };

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

    // PlayScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var PlayScreen = (function () {
        var screen = { };

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            dicebutton = new PIXI.Graphics();
            dicebutton.lineStyle(0);
            dicebutton.beginFill(0xE5332C);
            dicebutton.drawRect(0, 0, sidebar.width - 40, 180);
            dicebutton.endFill();
            dicebutton.position.set(20, 230);
            var t0 = generator.addText("ROLL", dicebutton);
            t0.position.set(100, 100);
            generator.makeButton(dicebutton, function () {
                state = ROLL;
            });
            sidebar.addChild(dicebutton);

            pausebutton = new PIXI.Graphics();
            pausebutton.lineStyle(0);
            if (Game.debug === true)
                pausebutton.beginFill(0xFFFF00, 0.5);
            else
                pausebutton.beginFill(0, 0);
            pausebutton.drawRect(0, 0, sidebar.width, 110);
            pausebutton.endFill();
            pausebutton.position.set(0, 460);
            generator.makeButton(pausebutton, instance.suspend);
            sidebar.addChild(pausebutton);

            exitbutton = new PIXI.Graphics();
            exitbutton.lineStyle(0);
            if (Game.debug === true)
                exitbutton.beginFill(0x00FF00, 0.5);
            else
                exitbutton.beginFill(0, 0);
            exitbutton.drawRect(0, 0, sidebar.width, 110);
            exitbutton.endFill();
            exitbutton.position.set(0, 580);
            generator.makeButton(exitbutton, function () {
                paused = true;
                Game.suspend();
                scene.fadeIn();

                exittext = generator.addText(constants.strings.exit);
                exittext.y -= 48;

                yestext = generator.addText(constants.strings.yes);
                yestext.y += 48;
                yestext.x -= 96;
                generator.makeButton(yestext, function () {
                    generator.release(exittext, yestext, notext);
                    scene.fadeOut();
                    paused = false;
                    Game.resume();
                    screens.enter(constants.gameStates.menu);
                });

                notext = generator.addText(constants.strings.no);
                notext.y += 48;
                notext.x += 96;
                generator.makeButton(notext, function () {
                    generator.release(exittext, yestext, notext);
                    scene.fadeOut();
                    paused = false;
                    Game.resume();
                });

                app.render();
            });
            sidebar.addChild(exitbutton);

            scene.front.addChild(Player.character);
            Player.reset();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            sidebar.removeChild(dicebutton);
            sidebar.removeChild(pausebutton);
            sidebar.removeChild(exitbutton);
            Dice.clear();
            scene.front.removeChild(Player.character);

            sounds.playTrack.stop();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            switch (state) {
                case DICE:
                    Dice.clear();
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
            scene.centerx(pausetext, exittext, yestext, notext);
            if (yestext) yestext.x -= 96;
            if (notext) notext.x += 96;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () {
            if (state === GAME || paused === true) {
                return;
            }
            paused = true;

            scene.fadeIn();

            pausetext = generator.addText(constants.strings.paused);
            generator.makeButton(pausetext, function () {
                generator.release(pausetext);
                scene.fadeOut();
                paused = false;
                Game.resume();
            }, true);

            app.render();
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () {
            return state === GAME || paused === false;
        };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var dicebutton, pausebutton, exitbutton;

        var DICE = 0, ROLL = 1, WALK = 2, PLAY = 3, GAME = 4;
        var state = DICE;

        var paused = false;

        var pausetext, exittext, yestext, notext;

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        return screen;
    });

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // FinishScreen class

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    var FinishScreen = (function () {
        var screen = {};

        // Screen Methods
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.enter = function () {
            explosionTextures = [];
            explosions = [];

            for (var i = 0; i < 26; i++) {
                var texture = PIXI.Texture.fromFrame("explosion" + (i + 1) + ".png");
                explosionTextures.push(texture);
            }

            for (var i = 0; i < 5; i++) {
                // create an explosion AnimatedSprite
                var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
                explosions.push(explosion);

                explosion.animationSpeed = 0.667;
                explosion.position.set(
                    constants.MAXW - Math.random() * app.renderer.width,
                    Math.random() * app.renderer.height / 2
                );
                explosion.anchor.set(0.5);
                explosion.rotation = Math.random() * Math.PI;
                explosion.scale.set(0.75 + Math.random() * 0.5);
                explosion.gotoAndPlay(Math.random() * 27);
                scene.front.addChild(explosion);
            }

            congratstext = generator.addText(constants.strings.congrats);
            generator.makeButton(congratstext, function () {
                screens.enter(constants.gameStates.menu);
            }, true);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.exit = function () {
            congratstext = generator.release(congratstext);
            
            for (var i = 0; i < explosions.length; i++) {
                explosions[i] = generator.release(explosions[i]);
            }
            explosions = [];
            explosionTextures = null;
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.gameloop = function () {
            if (++frameSkipper % 26 > 0) {
                return;
            }

            var explosion = explosions[++currentExplosion % explosions.length];
            explosion.position.set(
                constants.MAXW - Math.random() * app.renderer.width,
                Math.random() * app.renderer.height / 2
            );
            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.set(0.75 + Math.random() * 0.5);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resize = function () {
            scene.centerx(congratstext);
        };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.suspend = function () { };

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        screen.resume = function () { };

        // Private Members
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        var congratstext, explosionTextures, explosions;
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
    var sidebar, loadingtext, characterTextures, countmovestext;

    // game status
    var suspended = false, paused = false, countMoves = 0;

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return instance;
})();
