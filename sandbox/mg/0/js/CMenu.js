function CMenu(){
    var _pStartPosAudio;
    var _pStartPosCredits;
    
    var _oBg;
    var _oButPlay;
    var _oButContinue;
    var _oButCredits;
    var _oAudioToggle;
    var _oFade;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        // mat:
        //if(s_iLastLevel === 1){
            _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 300,oSprite,TEXT_PLAY,FONT_GAME,"#ffffff",44,s_oStage);
            _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        //}else{
        //    _oButPlay = new CTextButton((CANVAS_WIDTH/2) + 300,CANVAS_HEIGHT - 300,oSprite,TEXT_PLAY,FONT_GAME,"#ffffff",44,s_oStage);
        //    _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
            
        //    _oButContinue = new CTextButton((CANVAS_WIDTH/2)-300,CANVAS_HEIGHT - 300,oSprite,TEXT_CONTINUE,FONT_GAME,"#ffffff",38,s_oStage);
        //    _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        //}
        
        //var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        //_pStartPosCredits = {x:(oSprite.height/2) + 10,y:(oSprite.height/2) + 10};
        //_oButCredits = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite,s_oStage);
        //_oButCredits.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
        // /mat

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};  
            _oAudioToggle = new CToggle(CANVAS_WIDTH - 60,60,oSprite);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 400).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        // mat: _oButCredits.setPosition(_pStartPosCredits.x + iNewX,_pStartPosCredits.y + iNewY);
    };
    
    this._exitFromMenu = function(){
        this.unload();
        s_oMain.gotoLevelMenu();
        $(s_oMain).trigger("start_session");
    };
    
    this._onButContinueRelease = function(){
        s_oMenu._exitFromMenu();
    };
    
    this._onButCreditsRelease = function(){
        _oCreditsPanel = new CCreditsPanel();
    };
    
    this._onButPlayRelease = function () {
        // mat:
        //if(s_iLastLevel > 1){
        //    var oMsgBox = new CMsgBox(TEXT_DELETE_SAVINGS,TEXT_NO,"",TEXT_YES);
        //    oMsgBox.addEventListener(ON_MSG_BOX_LEFT_BUT,function(){oMsgBox.hide();}, this);
        //    oMsgBox.addEventListener(ON_MSG_BOX_RIGHT_BUT,function(){oMsgBox.hide();s_oSavings.clearLocalStorage();s_oMenu._exitFromMenu();}, this);
        //}else{
            s_oMenu._exitFromMenu();
        //}
        // /mat
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;