
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

Game.GameData.Player;

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
        texture: "", type: Game.GameData.SquareTypes.Start,
        x: 90, y: 370, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 200, y: 220, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Game,
        x: 310, y: 390, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 400, y: 220, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 620, y: 240, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Game,
        x: 760, y: 420, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 840, y: 240, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1060, y: 270, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1180, y: 440, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Game,
        x: 1280, y: 280, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1500, y: 270, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1710, y: 290, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Game,
        x: 1600, y: 440, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1720, y: 590, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Game,
        x: 1500, y: 590, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1400, y: 440, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1280, y: 590, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 1050, y: 590, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 960, y: 420, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 820, y: 580, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 600, y: 580, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 540, y: 410, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Normal,
        x: 370, y: 590, data: {}
    }, {
        texture: "", type: Game.GameData.SquareTypes.Finish,
        x: 170, y: 580, data: {}
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

    createPlayer: function (container) {
        var gd = Game.GameData;

        // TODO // TBR
        var player = new PIXI.Graphics();
        player.lineStyle(1);
        player.beginFill(0x000000, 0.75);
        player.drawCircle(0, 0, 30);
        player.endFill();

        gd.Player = player;
    },

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    createSquares: function(container) {
        var gd = Game.GameData,
            sl = gd.Squares,
            st = gd.SquareTypes;
        for (var i = 0; i < sl.length; i++) {
            var sq = sl[i];

            // TODO // TBR
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

            // TODO // TBR
            var text = new PIXI.Text(i+1, { fontSize: 40 });
            text.position.set(-text.width / 2, -text.height / 2);

            square.addChild(text);
            container.addChild(square);
        }
    }

};
