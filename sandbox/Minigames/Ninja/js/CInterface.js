function CInterface(){
    var _oLifeText;
    var _oButExit;
    var _oScoreText;
    var _oLifeIcon;
    var _oAudioToggle;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosLife;
    var _pStartPosLifeIcon;
    
    this._init = function(){
        _pStartPosLifeIcon = {x:20,y:20};
        _oLifeIcon = new createBitmap(s_oSpriteLibrary.getSprite('life'));
        _oLifeIcon.x = 20;
        _oLifeIcon.y = 20;
        s_oStage.addChild(_oLifeIcon);
        
        _pStartPosLife = {x:120,y:40};
        _oLifeText = new createjs.Text("X"+NUM_LIVES,"40px "+FONT_GAME, "#FFCC00");
        _oLifeText.x = 120;
        _oLifeText.y = 40; 
        _oLifeText.textAlign = "center";
        _oLifeText.textBaseline = "middle";
        s_oStage.addChild(_oLifeText);
        
	_oScoreText = new createjs.Text(TEXT_SCORE + " 0","40px "+FONT_GAME, "#FFCC00");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = 45; 
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "middle";
        s_oStage.addChild(_oScoreText);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var oExitX = CANVAS_WIDTH - (oSprite.width/2)- 90;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        } 
        
        _oLifeIcon.x = _pStartPosLifeIcon.x + iNewX;
        _oLifeText.x = _pStartPosLife.x + iNewX;
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oInterface = null
    };
    
    this.loseLife = function(iLives){
        _oLifeText.text = "X"+iLives;
    };

    this.refreshScore = function(iScore){
        _oScoreText.text = TEXT_SCORE+" "+iScore;
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;