////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/background.png', id:'background'},
			{ src: 'assets/cover.jpg', id: 'logo' }, // mat
            { src: 'assets/play.png', id: 'playButton' }, // mat
			{src:'assets/bgGrass.png', id:'bgGrass'},
			{src:'assets/bgGrass2.png', id:'bgGrass2'},
			{src:'assets/bgGreen.png', id:'bgGreen'},
			{src:'assets/bgRock.png', id:'bgRock'},
			{src:'assets/wood.png', id:'wood'},
			{src:'assets/instruction.png', id:'instruction'},
			{src:'assets/sheep_Spritesheet5x5.png', id:'sheep'},
			{ src: 'assets/sheepShadow.png', id: 'sheepShadow' },
            // mat:
			//{src:'assets/button_facebook.png', id:'buttonFacebook'},
			//{src:'assets/button_twitter.png', id:'buttonTwitter'},
			//{ src: 'assets/button_google.png', id: 'buttonGoogle' }
            // /mat
	];
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'assets/sounds/ambience.ogg', id:'soundAmbience'})
		manifest.push({src:'assets/sounds/score.ogg', id:'soundScore'})
		manifest.push({src:'assets/sounds/fall.ogg', id:'soundFall'})
		manifest.push({src:'assets/sounds/bounce.ogg', id:'soundBounce'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}