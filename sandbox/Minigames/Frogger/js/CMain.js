function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(24);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

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
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();

                s_oSoundtrack = playSound("soundtrack",1,-1);

            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/fr_soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
                createjs.Sound.registerSound("./sounds/fr_game_over.ogg", "game_over");                
                createjs.Sound.registerSound("./sounds/fr_frog_arrived.ogg", "frog_arrived");
                createjs.Sound.registerSound("./sounds/fr_frog_death_road.ogg", "splat");
                createjs.Sound.registerSound("./sounds/fr_frog_death_water.ogg", "drown");
                createjs.Sound.registerSound("./sounds/fr_frog_jump.ogg", "jump", 5);
                createjs.Sound.registerSound("./sounds/fr_power_up.ogg", "eat_fly");
                createjs.Sound.registerSound("./sounds/fr_win_level.ogg", "win_level");
                createjs.Sound.registerSound("./sounds/fr_horn_1.ogg", "big_hornet");
                createjs.Sound.registerSound("./sounds/fr_horn_2.ogg", "small_hornet");
            
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
                
                createjs.Sound.registerSound("./sounds/fr_soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/press_button.mp3", "click");
                createjs.Sound.registerSound("./sounds/fr_game_over.mp3", "game_over");
                createjs.Sound.registerSound("./sounds/fr_frog_arrived.mp3", "frog_arrived");
                createjs.Sound.registerSound("./sounds/fr_frog_death_road.mp3", "splat");
                createjs.Sound.registerSound("./sounds/fr_frog_death_water.mp3", "drown");
                createjs.Sound.registerSound("./sounds/fr_frog_jump.mp3", "jump", 5);
                createjs.Sound.registerSound("./sounds/fr_power_up.mp3", "eat_fly");
                createjs.Sound.registerSound("./sounds/fr_win_level.mp3", "win_level");
                createjs.Sound.registerSound("./sounds/fr_horn_1.mp3", "big_hornet");
                createjs.Sound.registerSound("./sounds/fr_horn_2.mp3", "small_hornet");

        }
        
        RESOURCE_TO_LOAD += 11;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg"); 
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.png");        
        s_oSpriteLibrary.addSprite("gui_panel_bottom","./sprites/gui_panel_bottom.png");
        s_oSpriteLibrary.addSprite("gui_panel_top","./sprites/gui_panel_top.png");
        s_oSpriteLibrary.addSprite("life","./sprites/life.png");
        s_oSpriteLibrary.addSprite("time_bar_frame","./sprites/time_bar_frame.png");
        s_oSpriteLibrary.addSprite("time_bar_fill","./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("bg_help_desktop","./sprites/bg_help_desktop.png");
        
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_up","./sprites/but_up.png");
        s_oSpriteLibrary.addSprite("but_down","./sprites/but_down.png");
        s_oSpriteLibrary.addSprite("but_left","./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right","./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("skid_rows","./sprites/skid_rows.png");
        s_oSpriteLibrary.addSprite("bridge","./sprites/bridge.png");
        
                
        var szTag;
        for(var i=0; i<10; i++){
            szTag = "water_anim_"+i;
            s_oSpriteLibrary.addSprite(szTag,"./sprites/"+szTag+".jpg");
        }
        var szTag2;
        for(var i=1; i<11; i++){
            szTag = "car_"+i;
            szTag2 = "car_"+(i-1);
            s_oSpriteLibrary.addSprite(szTag2,"./sprites/"+szTag+".png");
        }
        
        s_oSpriteLibrary.addSprite("trunk","./sprites/trunk.png");
        s_oSpriteLibrary.addSprite("turtle","./sprites/turtle.png");
        s_oSpriteLibrary.addSprite("fly","./sprites/fly.png");
        
        s_oSpriteLibrary.addSprite("frog","./sprites/frog.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
                s_oSoundtrack = playSound("soundtrack",1,-1);

            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (/* mat bEasyMode,*/) {
        // mat:
        //s_bEasyMode = bEasyMode;
        _oGame = new CGame(_oData, _oData.level /* mat */);
        // /mat
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate=function(){
        _bUpdate = false;
        createjs.Ticker.paused= true;
        $("#block_game").css("display","block");
    };
        
    this.startUpdate = function(){
        s_iPrevTime = (new Date).getTime();
        _bUpdate= true;
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
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bEasyMode;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iCurLevel = 0;
var s_iScore=0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oCanvas;
var s_oSoundtrack;
