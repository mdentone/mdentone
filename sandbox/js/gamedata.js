
//============================================================================

// Copyright (c) Matussi. All rights reserved.

//============================================================================

// Author    : Mario Dentone [MDE]
// Date      : Jan 2017
// Revisions :

//============================================================================

"use strict";

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData object

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData = { }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData.Sprite objects

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData.DiceFaces;

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData.SquareTypes constants

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData.SquareTypes = {
    Start   : "start",
    Normal  : "normal",
    Game    : "game",
    Finish  : "finish"
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData.Squares object

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData.Squares = [
    {
        type: Game.GameData.SquareTypes.Start,
        x: 1625, y: 100, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 1450, y: 240, data: null
    }, {
        type: Game.GameData.SquareTypes.Game,
        x: 1300, y: 390, data: 2
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 1090, y: 275, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 870, y: 320, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 650, y: 115, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 300, y: 160, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 540, y: 300, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 675, y: 475, data: null
    }, {
        type: Game.GameData.SquareTypes.Game,
        x: 440, y: 440, data: 4
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 200, y: 425, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 45, y: 560, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 330, y: 560, data: null
    }, {
        type: Game.GameData.SquareTypes.Game,
        x: 480, y: 635, data: 3
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 760, y: 625, data: null
    }, {
        type: Game.GameData.SquareTypes.Game,
        x: 1065, y: 640, data: 0
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 1170, y: 470, data: null
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 1330, y: 630, data: null
    }, {
        type: Game.GameData.SquareTypes.Game,
        x: 1460, y: 500, data: 1
    }, {
        type: Game.GameData.SquareTypes.Normal,
        x: 1605, y: 410, data: null
    }, {
        type: Game.GameData.SquareTypes.Finish,
        x: 1590, y: 610, data: null
    }
];

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData.Squares.Data object

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData.Squares.Data = [{
        game    : 0, // Bubble
        level   : 0,
        levels  : [1, 2, 3, 4, 5]
    }, {
        game    : 1, // Frogger
        level   : 0,
        levels  : [1, 2, 3, 4, 5]
    }, {
        game    : 2, // Ninja
        level   : 0,
        levels  : [1, 5, 10, 20, 50]
    }, {
        game    : 3, // Sheep
        level   : 0,
        levels  : [1, 3, 5, 10, 20]
    }, {
        game    : 4, // Sorcerer
        level   : 0,
        levels  : [1, 2, 3]
    }
];

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Game.GameData.Helpers functions

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Game.GameData.Helpers = {

    // Methods
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    createDiceFaces: function (container) {
        Game.GameData.DiceFaces = [];

        for (var i = 0; i < 6; i++) {

            // TODO // TBR
            var square = new PIXI.Graphics();
            square.lineStyle(1);
            square.beginFill(0xFFFFFF, 1);
            square.drawRoundedRect(0, 0, 100, 100, 10);
            square.endFill();

            // TODO // TBR
            var text = new PIXI.Text(i + 1, { fontSize: 40 });
            text.position.set(35, 25); //(-text.width) / 2, (-text.height) / 2);

            square.addChild(text);

            Game.GameData.DiceFaces.push(square);
        }
    },

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    createSquares: function (container) {
        if (Game.debug !== true) {
            return;
        }
        var gd = Game.GameData,
            sl = gd.Squares,
            st = gd.SquareTypes;
        for (var i = 0; i < sl.length; i++) {
            var sq = sl[i];

            var square = new PIXI.Graphics();
            square.lineStyle(1);
            if (sq.type === st.Start)
                square.beginFill(0xFFFFFF, 0.5);
            else if (sq.type === st.Normal)
                square.beginFill(0x00FF00, 0.5);
            else if (sq.type === st.Finish)
                square.beginFill(0x0000FF, 0.5);
            else
                square.beginFill(0xFF0000, 0.5);
            square.drawCircle(0, 0, 80);
            square.endFill();
            square.position.set(sq.x, sq.y);

            var text = new PIXI.Text(i+1, { fontSize: 40 });
            text.position.set(-text.width / 2, -text.height / 2);

            square.addChild(text);
            container.addChild(square);
        }
    }

};
