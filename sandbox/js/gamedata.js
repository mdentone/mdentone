
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
    {       // 1
        type: Game.GameData.SquareTypes.Start,
        x: 1350, y: 200, data: null
    }, {    // 2
        type: Game.GameData.SquareTypes.Game,
        x: 1300, y: 380, data: 2
    }, {    // 3
        type: Game.GameData.SquareTypes.Normal,
        x: 1130, y: 245, data: null
    }, {    // 4
        type: Game.GameData.SquareTypes.Normal,
        x: 870, y: 300, data: null
    }, {    // 5
        type: Game.GameData.SquareTypes.Normal,
        x: 790, y: 130, data: null
    }, {    // 6
        type: Game.GameData.SquareTypes.Normal,
        x: 210, y: 100, data: null
    }, {    // 7
        type: Game.GameData.SquareTypes.Normal,
        x: 300, y: 220, data: null
    }, {    // 8
        type: Game.GameData.SquareTypes.Normal,
        x: 540, y: 300, data: null
    }, {    // 9
        type: Game.GameData.SquareTypes.Normal,
        x: 675, y: 475, data: null
    }, {    // 10
        type: Game.GameData.SquareTypes.Game,
        x: 440, y: 440, data: 4
    }, {    // 11
        type: Game.GameData.SquareTypes.Normal,
        x: 200, y: 425, data: null
    }, {    // 12
        type: Game.GameData.SquareTypes.Normal,
        x: 65, y: 565, data: null
    }, {    // 13
        type: Game.GameData.SquareTypes.Normal,
        x: 330, y: 560, data: null
    }, {    // 14
        type: Game.GameData.SquareTypes.Game,
        x: 480, y: 635, data: 3
    }, {    // 15
        type: Game.GameData.SquareTypes.Normal,
        x: 760, y: 625, data: null
    }, {    // 16
        type: Game.GameData.SquareTypes.Game,
        x: 1065, y: 640, data: 0
    }, {    // 17
        type: Game.GameData.SquareTypes.Normal,
        x: 1170, y: 470, data: null
    }, {    // 18
        type: Game.GameData.SquareTypes.Normal,
        x: 1330, y: 630, data: null
    }, {    // 19
        type: Game.GameData.SquareTypes.Game,
        x: 1460, y: 500, data: 1
    }, {    // 20
        type: Game.GameData.SquareTypes.Normal,
        x: 1605, y: 410, data: null
    }, {    // 21
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
