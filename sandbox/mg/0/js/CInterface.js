function CInterface(iLevel /* mat */ , iScore, oBallSpriteSheet) {
    var _pStartPosExit;
    var _pStartPosAudio;
    
    var _oContainerGUI;
    var _oBgGUI;
    var _oButExit;
    var _oHitArea;
    var _oNextBall;
    var _oNext;
    var _oNextBack;
    //mat:var _oScoreTextBack;
    var _oScoreText;
    var _oLevelText;
    //mat:var _oLevelTextBack;
    var _oCongratsText;
    //mat:var _oCongratsTextBack;
    var _oNextLevelPanel;
    var _oAudioToggle;
    
    this._init = function(iLevel,iScore,oBallSpriteSheet){
        var oParent = this;
        
        _oContainerGUI = new createjs.Container();
        s_oStage.addChild(_oContainerGUI);
		
        _oBgGUI = new createjs.Shape();
        _oBgGUI.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,CANVAS_WIDTH,110);
        _oContainerGUI.addChild(_oBgGUI);
        
        /* mat:
        _oScoreTextBack = new createjs.Text(TEXT_SCORE + ": " + iScore, "bold 40px " + FONT_GAME, "#000000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +2;
        _oScoreTextBack.y = CANVAS_HEIGHT - 254;
        _oScoreTextBack.textAlign = "center";
        _oScoreTextBack.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreTextBack);
         /mat */
		
	    _oScoreText = new createjs.Text(TEXT_SCORE +": "+iScore,"bold 40px "+FONT_GAME, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = CANVAS_HEIGHT - 256;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText);
        
        /* mat:
        _oNextBack = new createjs.Text(TEXT_NEXT, "bold 34px " + FONT_GAME, "#000000");
        _oNextBack.x = CANVAS_WIDTH/2 - 31;
        _oNextBack.y = 92;
        _oNextBack.textAlign = "center";
        _oNextBack.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oNextBack);
         /mat */
		
	    _oNext = new createjs.Text(TEXT_NEXT ,"bold 34px "+FONT_GAME, "#ffffff");
        _oNext.x = (CANVAS_WIDTH/2) - 30;
        _oNext.y = 90;
        _oNext.textAlign = "center";
        _oNext.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oNext);
        
        _oNextBall = createSprite(oBallSpriteSheet,"ball_0",0,0,BALL_DIM,BALL_DIM);
        _oNextBall.stop();
        _oNextBall.x = (CANVAS_WIDTH/2) + 26;
        _oNextBall.y = 56;
        _oContainerGUI.addChild(_oNextBall);

        /* mat:
        _oLevelTextBack = new createjs.Text(TEXT_LEVEL + " " + iLevel, "bold 34px " + FONT_GAME, "#000000");
        _oLevelTextBack.x = CANVAS_WIDTH/2 + 1;
        _oLevelTextBack.y = 47;
        _oLevelTextBack.textAlign = "center";
        _oLevelTextBack.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oLevelTextBack);
         /mat */
        
        _oLevelText = new createjs.Text(TEXT_LEVEL + " " + iLevel /* mat */ , "bold 34px " + FONT_GAME, "#ffffff");
        _oLevelText.x = CANVAS_WIDTH/2;
        _oLevelText.y = 45;
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oLevelText);

        /* mat:
        _oCongratsTextBack = new createjs.Text(TEXT_VERYGOOD ,"bold 60px "+FONT_GAME, "#000000");
        _oCongratsTextBack.x = CANVAS_WIDTH/2 + 4;
        _oCongratsTextBack.y = -76;
        _oCongratsTextBack.textAlign = "center";
        _oCongratsTextBack.textBaseline = "alphabetic";
        s_oStage.addChild(_oCongratsTextBack);
         /mat */
        
        _oCongratsText = new createjs.Text(TEXT_VERYGOOD ,"bold 60px "+FONT_GAME, "#ffffff");
        _oCongratsText.x = CANVAS_WIDTH/2;
        _oCongratsText.y = -80;
        _oCongratsText.textAlign = "center";
        _oCongratsText.textBaseline = "alphabetic";
        s_oStage.addChild(_oCongratsText);

        var oParent = this;
        _oHitArea = createBitmap(s_oSpriteLibrary.getSprite('hit_area'));
        s_oStage.addChild(_oHitArea);
        _oHitArea.on("pressup",function(e){oParent._onTapScreen(e.stageX,e.stageY)});  
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) -20,y:60};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
		
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:(oSprite.width/2)+20,y:60};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon'));
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
		
        var oParent = this;
        _oHitArea.off("pressup",function(e){oParent._onTapScreen(e.stageX,e.stageY)});
        s_oStage.removeChild(_oHitArea);
		
		s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x + iNewX,iNewY + _pStartPosAudio.y);
        }

		_oContainerGUI.y = iNewY;
    };

    this.refreshScore = function(iScore){
        //mat:_oScoreTextBack.text = TEXT_SCORE +": "+iScore;
        _oScoreText.text = TEXT_SCORE +": "+iScore;
    };
    
    this.setNextBall = function(iCodeColor){
        _oNextBall.gotoAndStop("ball_"+iCodeColor);
    };
    
    this.showCongrats = function(szText){
        _oCongratsText.text = szText;
        //mat:_oCongratsTextBack.text = szText;
        
        createjs.Tween.get(_oCongratsText).to({y:CANVAS_HEIGHT/2} , CANVAS_HEIGHT/2,createjs.Ease.quintOut).call(function() {
                                                    createjs.Tween.get(_oCongratsText).to({y:-60} , 700,createjs.Ease.quintIn);
                                                });
                                                
        //createjs.Tween.get(_oCongratsTextBack).to({y:CANVAS_HEIGHT/2} , CANVAS_HEIGHT/2 + 2,createjs.Ease.quintOut).call(function() {
        //                                            createjs.Tween.get(_oCongratsTextBack).to({y:-56} , 700,createjs.Ease.quintIn);
        //                                        });
    };
    
    this.showNextLevel = function(iLevel,iScore){
        $(s_oMain).trigger("end_level",iLevel);
        _oNextLevelPanel = new CNextLevelPanel(iLevel,iScore);
    };
    
    this.refreshLevelText = function(iLevel){
        _oLevelText.text = TEXT_LEVEL +" "+iLevel;
        //mat:_oLevelTextBack.text = TEXT_LEVEL +" "+iLevel;
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    this._onTapScreen = function(iX,iY){
        s_oGame.tapScreen(iX,iY);
    };
	
    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    s_oInterface = this;
    
    this._init(iLevel /* mat */ , iScore,oBallSpriteSheet);
    
    
}

var s_oInterface = null;