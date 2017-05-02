function CNextLevelPanel(iLevel,iScore){
    
    var _oContainer;
    
    this._init = function(iLevel,iScore){
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));

        /* mat:
        var oLevelTextBack = new createjs.Text(TEXT_LEVEL+" "+iLevel+" "+TEXT_COMPLETED,"bold 40px "+FONT_GAME, "#000000");
        oLevelTextBack.x = CANVAS_WIDTH/2 + 1;
        oLevelTextBack.y = 662;
        oLevelTextBack.textAlign = "center";
         /mat */
        
        var oLevelText = new createjs.Text(TEXT_LEVEL+" "+iLevel+" "+TEXT_COMPLETED,"bold 40px "+FONT_GAME, "#ffffff");
        oLevelText.x = CANVAS_WIDTH/2;
        oLevelText.y = 660;
        oLevelText.textAlign = "center";
        
        /* mat:
        var oScoreTextBack = new createjs.Text(TEXT_SCORE + ": " + iScore, "bold 44px " + FONT_GAME, "#000000");
        oScoreTextBack.x = CANVAS_WIDTH/2 + 1;
        oScoreTextBack.y = 762;
        oScoreTextBack.textAlign = "center";
         /mat */
        
        var oScoreText = new createjs.Text(TEXT_SCORE+": "+iScore,"bold 44px "+FONT_GAME, "#ffffff");
        oScoreText.x = CANVAS_WIDTH/2;
        oScoreText.y = 760;
        oScoreText.textAlign = "center";
        
        _oContainer = new createjs.Container();
        //mat:_oContainer.addChild(oBg,oLevelTextBack,oLevelText,oScoreTextBack,oScoreText);
        _oContainer.addChild(oBg, oLevelText, oScoreText);
        
        s_oStage.addChild(_oContainer);
        
        _oContainer.on("mousedown",this._onExit);
        
        $(s_oMain).trigger("show_interlevel_ad");
    };
    
    this._onExit = function(){
        _oContainer.off("mousedown");
        _oContainer.removeAllChildren();
        s_oGame.resetLevel();
    };
    
    this._init(iLevel,iScore);
}