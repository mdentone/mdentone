function CNextLevel(){
    var _oBg;
    var _oMsgText;
    //mat:var _oMsgTextBack;
    var _oScoreText;
    //mat:var _oScoreTextBack;
    var _oGroup;
    
    this._init = function(){
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oBg.x = 0;
        _oBg.y = 0;

        /* mat:
        _oMsgTextBack = new createjs.Text("", "bold 58px " + FONT_GAME, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +32;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-138;
        _oMsgTextBack.textAlign = "center";
         /mat */

        _oMsgText = new createjs.Text("", "bold 58px " + FONT_GAME, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2 + 30;
        _oMsgText.y = (CANVAS_HEIGHT/2)-140;
        _oMsgText.textAlign = "center";
        
        /* mat:
        _oScoreTextBack = new createjs.Text("", "bold 44px " + FONT_GAME, "#000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +32;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2)+40;
        _oScoreTextBack.textAlign = "center";
         /mat */

        _oScoreText = new createjs.Text("", "bold 44px " + FONT_GAME, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2 +30;
        _oScoreText.y = (CANVAS_HEIGHT/2)+38;
        _oScoreText.textAlign = "center";
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        //mat:_oGroup.addChild(_oBg,_oMsgTextBack,_oMsgText,_oScoreTextBack,_oScoreText);
        _oGroup.addChild(_oBg, _oMsgText, _oScoreText);

        s_oStage.addChild(_oGroup);
    };
    
    this.show = function(iLevel,iScore){
        //mat:_oMsgTextBack.text = TEXT_LEVEL + " "+ iLevel;
        _oMsgText.text = TEXT_LEVEL + " "+ iLevel;
        
        //mat:_oScoreTextBack.text = TEXT_SCORE +" "+ iScore;
        _oScoreText.text = TEXT_SCORE +" "+ iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown");
        _oGroup.alpha = 0;
        _oGroup.visible = false;
        s_oGame.nextLevel();
    };
    
    this._init();
}