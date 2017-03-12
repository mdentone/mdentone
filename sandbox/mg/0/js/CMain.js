function CMain(oData){
    var _bUpdate = true;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oGameData;
	
    var _oPreloader;
    var _oMenu;
    var _oLevelMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
         createjs.Touch.enable(s_oStage); 
        

        s_bMobile = jQuery.browser.mobile;
        
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        s_iPrevTime = new Date().getTime();
        
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
	
        s_oSpriteLibrary  = new CSpriteLibrary();
        
        /* mat: s_oSavings = new CSavingManager("bubble_shooter");
        s_oSavings.addEventListener(ON_LEVEL_SELECTED,this.gotoGame); */
        
        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };

    this._initSounds = function(){
        if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
        }
         
        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
               createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.handleFileLoad, this));

                createjs.Sound.registerSound("./sounds/explosion.ogg", "explosion");     
                createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
                createjs.Sound.registerSound("./sounds/launch.ogg", "launch");
                createjs.Sound.registerSound("./sounds/win.ogg", "win");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.handleFileLoad, this));

                createjs.Sound.registerSound("./sounds/explosion.mp3", "explosion");     
                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
                createjs.Sound.registerSound("./sounds/launch.mp3", "launch");
                createjs.Sound.registerSound("./sounds/win.mp3", "win");
       }
         RESOURCE_TO_LOAD +=5;
    };
	
    this.handleFileLoad = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
         if(_iCurResource === RESOURCE_TO_LOAD){
            this._allResourcesLoaded();
         }
    };
    
    this._loadImages = function(){
		
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("balls","./sprites/balls.png");
        s_oSpriteLibrary.addSprite("ball_explosion","./sprites/ball_explosion.png");
        s_oSpriteLibrary.addSprite("wall_tile","./sprites/wall_tile.jpg");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hit_area","./sprites/hit_area.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("bg_credits","./sprites/bg_credits.png");
        s_oSpriteLibrary.addSprite("bg_menu_level","./sprites/bg_menu_level.jpg");
        s_oSpriteLibrary.addSprite("arrow_left","./sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right","./sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("but_level","./sprites/but_level.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this._allResourcesLoaded();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this._allResourcesLoaded = function(){
        _oPreloader.unload();
        jQuery.getJSON("levels.json", this.onLoadedJSON);    
    };
    
    this.onLoadedJSON = function (oData) {
        s_aLevelsData = new Array();
        for(var i=0;i< Object.keys(oData).length;i++){
            s_aLevelsData[i] = oData[i].infos;
            
        }
        NUM_LEVELS = s_aLevelsData.length;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oSoundTrackSnd = createjs.Sound.play("soundtrack", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1,volume:0.2});
        }
            
        s_oMain.gotoMenu();
    };

    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoLevelMenu = function(){
        _oLevelMenu = new CLevelMenu();
    };
    
    this.gotoGame = function(iLevel,iScore){
        _oGame = new CGame(_oGameData,iLevel-1,iScore);     
							
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);
    };
    
    s_oMain = this;

    _oGameData = oData;
	
    this.initContainer();
}

var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_bMobile;
var s_bAudioActive = true;
var s_oSoundTrackSnd;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;


var s_aLevelsData;
// mat: var s_oSavings;