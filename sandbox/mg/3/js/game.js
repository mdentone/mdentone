////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var startButtonText = 'Tap to Play'; //text for start button
var instructionText = 'Move cursor'; //text for game instruction
var instructionMobileText = 'Press to move'; //text for game instruction (mobile)
var radiusNum = 2000;  //ground radiusNum
var groundColor = '#42A046'; //ground color
var groundHeight = 450; //ground height
var groundRotateEnd = 30; //ground rotate end

var level_arr = {speedStart:.08, //speed start number
				speedIncrease:.005, //speed increase number
				sheepRange:300, //distance for next sheep to appear
				sheepRangeDecrease:20}; //distance decrease number for next sheep to appear

var textResultTitle = 'Score'; //text for game result title
var replayButtonText = 'Tap to Replay'; //text for replay button

//Social share, [SCORE] will replace with game time
var shareText = 'Share score'; //share text
var shareTitle = 'Highscore on Count the Sheep is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Count the Sheep! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var playerData = {score:0 /* mat: */ , target:1 };
var gameData = {speed:0, sheepRange:0, paused:true, play:false};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	if($.browser.mobile || isTablet){
		txtInstruction.text = txtInstructionShadow.text = instructionMobileText;
	}else{
		txtInstruction.text = txtInstructionShadow.text = instructionText;
	}
	stage.on("stagemousemove", function(evt) {
		var stageX = evt.stageX / scalePercent;
		gameData.controlX = stageX;
		toggleInstruction(false);
	});	

    // mat:
	//buttonReplayTxt.cursor = "pointer";
	//buttonReplayTxt.addEventListener("click", function(evt) {
	//	playSound('soundButton');
	//	goPage('game');
	//});
	
	//buttonFacebook.cursor = "pointer";
	//buttonFacebook.addEventListener("click", function(evt) {
	//	share('facebook');
	//});
	//buttonTwitter.cursor = "pointer";
	//buttonTwitter.addEventListener("click", function(evt) {
	//	share('twitter');
	//});
	//buttonGoogle.cursor = "pointer";
	//buttonGoogle.addEventListener("click", function(evt) {
	//	share('google');
    //});
    // /mat
}

function setupGameButton(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 	playSound('soundButton');
		 	goPage('game');
		 	break;
	 }
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeGameButton();
    // mat: stopAnimateButton(buttonStartTxt);
	stopAnimateButton(buttonStart);
    // mat: stopAnimateButton(buttonReplayTxt);
	stopSoundLoop('soundAmbience');
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			setupGameButton();
		    // mat: startAnimateButton(buttonStartTxt);
			startAnimateButton(buttonStart);
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
			playSoundLoop('soundAmbience');
		break;
		
		case 'result':
			targetContainer = resultContainer;
			// mat: startAnimateButton(buttonReplayTxt);
			
			playSound('soundEnd');
			stopGame();
			saveGame(playerData.score);
		break;
	}
	
	targetContainer.visible=true;
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}

// mat:
function setGameTarget(target) {
    playerData.target = target;
}
// /mat

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
    playerData.score = 0;

	gameData.speed = level_arr.speedStart;
	gameData.sheepRange = level_arr.sheepRange;
	
	wood.x = canvasW/2;
	wood.y = wood.oriY = canvasH/100 * 46;
	wood.alpha = 1;
	gameData.controlX = wood.x;
	
	createSheep();
	updateScore(0);
	gameData.paused = false;
	gameData.play = true;
	
	toggleInstruction(true);
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	gameData.paused = true;
	gameData.play = false;
	
	TweenMax.killTweensOf(instruction);
	TweenMax.killTweensOf(txtInstruction);
	TweenMax.killTweensOf(txtInstructionShadow);
	TweenMax.killTweensOf(wood);
	TweenMax.killTweensOf(gameData);
}

 /*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * TOGGLE INSTRUCTION - This is the function that runs to toggle instruction
 * 
 */
function toggleInstruction(con){
	TweenMax.killTweensOf(instruction);
	TweenMax.killTweensOf(txtInstruction);
	TweenMax.killTweensOf(txtInstructionShadow);
	
	if(con){
		instruction.alpha = 1;
		txtInstruction.alpha = 1;
		txtInstructionShadow.alpha = .2;
		
		txtScore.alpha = 0;
		txtScoreShadow.alpha = 0;
	}else{
		var tweenSpeed = .5;
		TweenMax.to(instruction, tweenSpeed, {alpha:0, overwrite:true});
		TweenMax.to(txtInstruction, tweenSpeed, {alpha:0, overwrite:true});
		TweenMax.to(txtInstructionShadow, tweenSpeed, {alpha:0, overwrite:true});
		
		txtScore.alpha = 1;
		txtScoreShadow.alpha = .2;
	}
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(event){
	if(!gameData.paused)
		loopBackground();
		loopSheep();
		moveWood();
}

/*!
 * 
 * MOVE WOOD - This is the function that runs to move the wood
 * 
 */
function moveWood(){
	gameData.controlX = gameData.controlX < (canvasW/100 * 9) ? (canvasW/100 * 9) : gameData.controlX;
	gameData.controlX = gameData.controlX > (canvasW/100 * 92) ? (canvasW/100 * 92) : gameData.controlX;
	
	wood.x = gameData.controlX;	
	
	var distance = (canvasH - wood.oriY)/100 * 3.5;
	var distanceRange = distance * 8;
	var newRange = 0;
	
	if(wood.x < canvasW/2){
		distance = (canvasW/2) - wood.x;
	}else{
		distance = wood.x - (canvasW/2);
	}
	
	newRange = (distance/(canvasW/2)) * .5;
	distance = (distance/(canvasW/2)) * distanceRange * newRange;
	wood.y = wood.oriY + distance;
	
	var scaleRange = (distance/(canvasW/2)) * .15;
	wood.scaleX = wood.scaleY = 1 - scaleRange;
}

/*!
 * 
 * LOOP BACKGROUND - This is the function that runs to loop the background movement
 * 
 */
function loopBackground(){
	var distanceSpeed = 0;
	for(n=0;n<background_arr.length;n++){
		if(background_arr[n].type == 'grass'){
			background_arr[n].rotation -=gameData.speed;
			
			if(background_arr[n].rotation <= -(groundRotateEnd)){
				background_arr[n].rotation = groundRotateEnd;
			}
		}else if(background_arr[n].type == 'green'){
			background_arr[n].x -= gameData.speed * 10;
			moveCurve(background_arr[n]);
			
			if(background_arr[n].x <= 0-background_arr[n].image.naturalWidth){
				background_arr[n].x = canvasW + background_arr[n].image.naturalWidth;
			}
		}
	}
	
	for(r=0;r<rock_arr.length;r++){
		distanceSpeed = rock_arr[r].obj.y / (canvasH-100) * 40;
		rock_arr[r].obj.x -= gameData.speed * distanceSpeed;
		moveCurve(rock_arr[r].obj);
		rock_arr[r].posY = rock_arr[r].obj.oriY;
		
		if(rock_arr[r].obj.x <= 0-rock_arr[r].obj.image.naturalWidth){
			resetRock(rock_arr[r].obj);
			rock_arr[r].posY = rock_arr[r].obj.oriY;
			sortIndex();
		}
	}
}

/*!
 * 
 * LOOP SHEEP - This is the function that runs to loop the sheep movement
 * 
 */
function loopSheep(){
	for(n=0;n<sheep_arr.length;n++){
		if(!sheep_arr[n].nextSheep && sheep_arr[n].x > sheep_arr[n].nextRange){
			sheep_arr[n].nextSheep = true;
			createSheep();	
		}
		
		distanceSpeed = sheep_arr[n].y / (canvasH-100) * 40;
		
		sheep_arr[n].x += gameData.speed * distanceSpeed;
		moveCurve(sheep_arr[n], sheepShadow_arr[n]);
		
		if(sheep_arr[n].x > canvasW/100 * 110){
			removeSheep(n);
		}
		
		var jumpDistance = Math.abs(sheep_arr[n].x - sheep_arr[n].oldX);
		if(jumpDistance > sheep_arr[n].distanceTarget){
			sheep_arr[n].oldX = sheep_arr[n].x;
			jumpSheep(sheep_arr[n]);
		}
		
		if(gameData.play){
			if(!sheep_arr[n].count){
				if(sheep_arr[n].x > wood.x + 30 && sheep_arr[n].jumpHeight > 30){
					sheep_arr[n].count = true;
					updateSpeed();
					updateScore(1);
					playSound('soundScore');

				    // mat:
					if (playerData.score >= playerData.target) {
					    setTimeout(function () { window.top.endLevel(true) }, 1000);
					}
                    // /mat
				}
			}
		
			if(sheep_arr[n].x > wood.x - 50 && sheep_arr[n].x < wood.x + 30){
				if(sheep_arr[n].jumpHeight < 30){
					gameEnd();
				}	
			}
		}
	}
}

/*!
 * 
 * CREATE SHEEP - This is the function that runs to create a sheep
 * 
 */
function createSheep(){
	var sheep = sheepAnimate.clone();
	sheep.y = sheep.oriY = (canvasH - (Math.random()* (groundHeight-150)))-100;
	var distance = (sheep.oriY / (canvasH-100) * 10)
	sheep.distanceTarget = (gameData.speed * 3000) + distance;
	sheep.distanceTarget = sheep.distanceTarget > 600 ? 600 + distance : sheep.distanceTarget + distance;
	
	sheep.x = -((sheep.distanceTarget) + Math.random()*(sheep.distanceTarget/2));
	sheep.oldX = sheep.x;
	sheep.jumpHeight = 0;
	sheep.count = false;
	sheep.nextSheep = false;
	sheep.nextRange = gameData.sheepRange;
	sheep_arr.push(sheep);
	
	var shadow = sheepShadow.clone();
	sheepShadow_arr.push(shadow);
	
	sheepContainer.addChild(sheep);
	shadowContainer.addChild(shadow);
}

/*!
 * 
 * REMOVE SHEEP - This is the function that runs to remove sheep
 * 
 */
function removeSheep(n){
	sheepContainer.removeChild(sheep_arr[n]);
	sheep_arr.splice(n,1);
	
	shadowContainer.removeChild(sheepShadow_arr[n]);
	sheepShadow_arr.splice(n,1);
}

/*!
 * 
 * REMOVE ALL SHEEPS - This is the function that runs to remove all sheeps
 * 
 */
function removeAllSheeps(){
	for(s=0;s<sheep_arr.length;s++){
		sheepContainer.removeChild(sheep_arr[s]);
	}
	
	for(s=0;s<sheepShadow_arr.length;s++){
		shadowContainer.removeChild(sheepShadow_arr[s]);
	}
	
	sheep_arr = [];
	sheepShadow_arr = [];
}

/*!
 * 
 * SHEEP JUMP ANIMATION - This is the function that runs play jump animation
 * 
 */
function jumpSheep(sheep){
	var disJumpSpeed = gameData.speed/10 * 10;
	var jumpSpeed = .7 - disJumpSpeed;
	jumpSpeed = jumpSpeed < .25 ? .25 : jumpSpeed;
	
	var jumpHeight = sheep.oriY / (canvasH-100) * 90;
	
	sheep.gotoAndPlay('jump');
	TweenMax.to(sheep, jumpSpeed, {jumpHeight:jumpHeight, ease:Sine.easeOut, overwrite:true, onComplete:function(){
		sheep.gotoAndPlay('land');
		TweenMax.to(sheep, jumpSpeed, {jumpHeight:0, ease:Sine.easeIn, overwrite:true, onComplete:function(){
			sheep.gotoAndPlay('run');
		}});
	}});
	
	playSound('soundBounce');	
}

/*!
 * 
 * MOVE CURVE - This is the function that runs to move objects in curve
 * 
 */
function moveCurve(obj, shadow){
	var distance = (canvasH - obj.oriY)/100 * 3.5;
	var distanceRange = distance * 8;
	var rotateRange = distance * 1;
	var newRange = 0;
	var rotate = 0;
	var scaleNum = obj.oriY / (canvasH-100) * 1;
	
	if(obj.x < canvasW/2){
		distance = (canvasW/2) - obj.x;
		rotate = -(distance);
	}else{
		distance = obj.x - (canvasW/2);
		rotate = distance;
	}
	
	newRange = (distance/(canvasW/2)) * .5;
	rotate = (rotate/(canvasW/2)) * rotateRange;
	distance = (distance/(canvasW/2)) * distanceRange * newRange;
	obj.y = obj.oriY + distance - obj.jumpHeight;
	obj.rotation = rotate;
	obj.scaleX = obj.scaleY = scaleNum;
	if(obj.side){
		obj.scaleX = -(scaleNum);
	}
	
	if(shadow != undefined){
		shadow.x = obj.x;
		shadow.y = obj.y + obj.jumpHeight;
		shadow.rotation = obj.rotation;
		shadow.scaleX = shadow.scaleY = obj.scaleX;
	}
}

/*!
 * 
 * RESET ROCK - This is the function that runs to set rock in new random position
 * 
 */
function resetRock(obj){
	obj.jumpHeight = 0;
	obj.x = canvasW+obj.image.naturalWidth;
	obj.y = obj.oriY = (canvasH - (Math.random()* (groundHeight-100)))-100;
	obj.side = randomBoolean();
}

/*!
 * 
 * SORT OBJECTS INDEX - This is the function that runs to sort rocks index
 * 
 */
function sortIndex(){
	sortOnObject(rock_arr, 'posY');
	
	var indexNum = 0;
	for(s=0;s<rock_arr.length;s++){
		rockContainer.setChildIndex(rock_arr[s].obj, indexNum);
		indexNum++;
	}
}

/*!
 * 
 * UPDATE GAME SPEED - This is the function that runs to update game speed
 * 
 */
function updateSpeed(){
	gameData.speed += level_arr.speedIncrease;	
	gameData.speed = gameData.speed > .7 ? .7 : gameData.speed;
	
	gameData.sheepRange -= level_arr.sheepRangeDecrease;
	gameData.sheepRange = gameData.sheepRange < 50 ? 50 : gameData.sheepRange;
}

/*!
 * 
 * UPDATE GAME SCORE - This is the function that runs to update game score
 * 
 */
function updateScore(num){
	playerData.score += num;
	
	txtScore.text = playerData.score;
	txtScoreShadow.text = playerData.score;
	
	txtResultScore.text = playerData.score;
	txtResultScoreShadow.text = playerData.score;
}

/*!
 * 
 * GAME END - This is the function that runs for game end
 * 
 */
function gameEnd(){
	gameData.play = false;
	toggleAnimateWood(true);
	playSound('soundFall');
	
	TweenMax.to(gameData, 1, {speed:0, overwrite:true, onComplete:function(){
		toggleAnimateWood(false);
		removeAllSheeps();
		goPage('result');
	}});

    // mat:
	setTimeout(function() { window.top.endLevel(false) }, 3000);
    // /mat
}

/*!
 * 
 * TOGGLE WOOD ANIMATION - This is the function that runs to toggle wood animation
 * 
 */
function toggleAnimateWood(con){
	wood.alpha = 1;
	TweenMax.killTweensOf(wood);
	
	if(con)
	TweenMax.to(wood, .3, {alpha:.1, overwrite:true, onComplete:function(){
		TweenMax.to(wood, .3, {alpha:1, overwrite:true, onComplete:function(){
			toggleAnimateWood(con);
		}});
	}});
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}