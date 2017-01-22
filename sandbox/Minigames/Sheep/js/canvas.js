////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, bgContainer, rockContainer, sheepContainer, shadowContainer, mainContainer, gameContainer, resultContainer;
var background, logo, buttonStartTxt, bgGround, bgGrass, bgRock, sheepData, sheepAnimate, sheepShadow, txtScore, txtScoreShadow, wood, instruction, txtInstruction, txtInstructionShadow, buttonFacebook, buttonTwitter, buttonGoogle, txtResultTitle, txtResultTitleShadow, txtResultScore, txtResultScoreShadow, buttonReplayTxt, txtShare;

var background_arr = [];
var rock_arr = [];
var sheep_arr = [];
var sheepShadow_arr = [];

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	bgContainer = new createjs.Container();
	rockContainer = new createjs.Container();
	sheepContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	sheepContainer = new createjs.Container();
	shadowContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStartTxt = new createjs.Text();
	buttonStartTxt.font = "40px merkinregular";
	buttonStartTxt.color = "#ffffff";
	buttonStartTxt.text = startButtonText;
	buttonStartTxt.textAlign = "center";
	buttonStartTxt.textBaseline='alphabetic';
	buttonStartTxt.x = canvasW/2;
	buttonStartTxt.y = canvasH/100 * 80;
	
	bgGround = new createjs.Shape();
	bgGround.graphics.beginFill(groundColor).drawCircle(0,0,radiusNum);
	bgGround.x = canvasW/2;
	bgGround.y = canvasH + (radiusNum - groundHeight);
	
	bgGrass = new createjs.Bitmap(loader.getResult('bgGrass2'));
	bgGrass.x = canvasW - bgGrass.image.naturalWidth;
	bgGrass.y = canvasH/100 * 36;
	
	bgRock = new createjs.Bitmap(loader.getResult('bgRock'));
	centerReg(bgRock);
	bgRock.x = -100;
	
	var grass1 = new createjs.Bitmap(loader.getResult('bgGrass'));
	centerReg(grass1);
	grass1.regY = grass1.image.naturalHeight + radiusNum;
	grass1.x = bgGround.x
	grass1.y = bgGround.y + (grass1.image.naturalHeight - 10);
	
	var grass2 = new createjs.Bitmap(loader.getResult('bgGrass'));
	centerReg(grass2);
	grass2.regY = grass2.image.naturalHeight + radiusNum;
	grass2.x = bgGround.x;
	grass2.y = bgGround.y + (grass2.image.naturalHeight - 10);
	grass2.rotation = groundRotateEnd;
	
	grass2.type = grass1.type = 'grass';
	background_arr.push(grass1);
	background_arr.push(grass2);
	
	var green1 = new createjs.Bitmap(loader.getResult('bgGreen'));
	centerReg(green1);
	green1.x = canvasW/100 * 30;
	
	var green2 = new createjs.Bitmap(loader.getResult('bgGreen'));
	centerReg(green2);
	green2.x = canvasW/100 * 70;
	
	green1.y = green2.y = canvasH/100 * 42;
	green1.oriY = green2.oriY = canvasH/100 * 42;
	green1.jumpHeight = green2.jumpHeight = 0;
	green1.type = green2.type = 'green';
	background_arr.push(green1);
	background_arr.push(green2);
	
	bgContainer.addChild(bgRock, green1, green2, bgGrass, bgGround, grass1, grass2);
	
	for(r=0;r<5;r++){
		var rock = bgRock.clone();
		resetRock(rock);
		rock.type = 'rock';
		rock.x = Math.random()*canvasW;
		
		rock_arr.push({obj:rock, posY:0});
		rockContainer.addChild(rock);
	}
	sortIndex();
	loopBackground();
	
	var _speed = 1;
	var _frameW=230;
	var _frameH=170;
	var _frame = {"regX": (_frameW/2), "regY": 160, "height": _frameH, "count": 25, "width": _frameW};
	var _animations = {run:{frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], speed: _speed, next:'run'},
						jump:{frames: [16, 17,18,19,20,21,22,23,24], speed: _speed, next:'jumpstatic'},
						jumpstatic:{frames: [24], speed: _speed},
						land:{frames: [24,23,22,21,20,19,18,17, 16], speed: _speed, next:'landstatic'},
						landstatic:{frames: [16], speed: _speed}};
						
	sheepData = new createjs.SpriteSheet({
		"images": [loader.getResult("sheep").src],
		"frames": _frame,
		"animations": _animations
	});
	
	sheepAnimate = new createjs.Sprite(sheepData, "run");
	sheepAnimate.framerate = 20;
	
	sheepShadow = new createjs.Bitmap(loader.getResult('sheepShadow'));
	sheepShadow.x = -200;
	centerReg(sheepShadow);
	
	wood = new createjs.Bitmap(loader.getResult('wood'));
	wood.regX = 80;
	wood.regY = 107;
	
	txtScore = new createjs.Text();
	txtScore.font = "120px merkinregular";
	txtScore.color = "#ffffff";
	txtScore.text = '0';
	txtScore.textAlign = "center";
	txtScore.textBaseline='alphabetic';
	txtScore.x = canvasW/2;
	txtScore.y = canvasH/100 * 25;
	
	txtScoreShadow = new createjs.Text();
	txtScoreShadow.font = "120px merkinregular";
	txtScoreShadow.color = "#000000";
	txtScoreShadow.text = '0';
	txtScoreShadow.textAlign = "center";
	txtScoreShadow.textBaseline='alphabetic';
	txtScoreShadow.alpha = .2;
	txtScoreShadow.x = txtScore.x;
	txtScoreShadow.y = txtScore.y+10;
	
	instruction = new createjs.Bitmap(loader.getResult('instruction'));
	centerReg(instruction);
	instruction.x = canvasW/2;
	instruction.y = canvasH/100 * 30;
	
	txtInstruction = new createjs.Text();
	txtInstruction.font = "50px merkinregular";
	txtInstruction.color = "#ffffff";
	txtInstruction.textAlign = "center";
	txtInstruction.textBaseline='alphabetic';
	txtInstruction.x = canvasW/2;
	txtInstruction.y = canvasH/100 * 22;
	
	txtInstructionShadow = new createjs.Text();
	txtInstructionShadow.font = "50px merkinregular";
	txtInstructionShadow.color = "#000000";
	txtInstructionShadow.textAlign = "center";
	txtInstructionShadow.textBaseline='alphabetic';
	txtInstructionShadow.alpha = .2;
	txtInstructionShadow.x = txtInstruction.x;
	txtInstructionShadow.y = txtInstruction.y+10;

    // mat:	
	//buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	//buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	//buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
	
	//centerReg(buttonFacebook);
	//centerReg(buttonTwitter);
	//centerReg(buttonGoogle);
	
	//buttonFacebook.x = canvasW/100 * 32;
	//buttonTwitter.x = canvasW/2;
	//buttonGoogle.x = canvasW/100 * 68;
	//buttonFacebook.y = canvasH/100 * 60;
	//buttonTwitter.y = canvasH/100 * 63;
	//buttonGoogle.y = canvasH/100 * 61;
    // /mat

	txtResultTitle = new createjs.Text();
	txtResultTitle.font = "90px merkinregular";
	txtResultTitle.color = "#ffffff";
	txtResultTitle.text = textResultTitle;
	txtResultTitle.textAlign = "center";
	txtResultTitle.textBaseline='alphabetic';
	txtResultTitle.x = canvasW/2;
	txtResultTitle.y = canvasH/100 * 20;
	
	txtResultTitleShadow = new createjs.Text();
	txtResultTitleShadow.font = "90px merkinregular";
	txtResultTitleShadow.color = "#000000";
	txtResultTitleShadow.text = textResultTitle;
	txtResultTitleShadow.textAlign = "center";
	txtResultTitleShadow.textBaseline='alphabetic';
	txtResultTitleShadow.alpha = .2;
	txtResultTitleShadow.x = txtResultTitle.x;
	txtResultTitleShadow.y = txtResultTitle.y+10;
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "120px merkinregular";
	txtResultScore.color = "#ffffff";
	txtResultScore.text = '54';
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';
	txtResultScore.x = canvasW/2;
	txtResultScore.y = canvasH/100 * 37;
	
	txtResultScoreShadow = new createjs.Text();
	txtResultScoreShadow.font = "120px merkinregular";
	txtResultScoreShadow.color = "#000000";
	txtResultScoreShadow.text = '54';
	txtResultScoreShadow.textAlign = "center";
	txtResultScoreShadow.textBaseline='alphabetic';
	txtResultScoreShadow.alpha = .2;
	txtResultScoreShadow.x = txtResultScore.x;
	txtResultScoreShadow.y = txtResultScore.y+10;
	
    // mat:	
	//txtShare = new createjs.Text();
	//txtShare.font = "40px merkinregular";
	//txtShare.color = "#ffffff";
	//txtShare.text = shareText;
	//txtShare.textAlign = "center";
	//txtShare.textBaseline='alphabetic';
	//txtShare.x = txtResultScore.x;
	//txtShare.y = canvasH/100 * 50;

	//buttonReplayTxt = new createjs.Text();
	//buttonReplayTxt.font = "50px merkinregular";
	//buttonReplayTxt.color = "#ffffff";
	//buttonReplayTxt.text = replayButtonText;
	//buttonReplayTxt.textAlign = "center";
	//buttonReplayTxt.textBaseline='alphabetic';
	//buttonReplayTxt.x = canvasW/2;
	//buttonReplayTxt.y = canvasH/100 * 80;
	//buttonReplayTxt.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
    // /mat

	mainContainer.addChild(logo, buttonStartTxt);
	gameContainer.addChild(sheepAnimate, sheepShadow, shadowContainer, wood, sheepContainer, txtScoreShadow, txtScore, instruction, txtInstructionShadow, txtInstruction);
    // mat: resultContainer.addChild(buttonFacebook, buttonTwitter, buttonGoogle, txtResultTitleShadow, txtResultTitle, txtResultScoreShadow, txtResultScore, buttonReplayTxt, txtShare);
	resultContainer.addChild(txtResultTitleShadow, txtResultTitle, txtResultScoreShadow, txtResultScore);
	canvasContainer.addChild(background, bgContainer, rockContainer, mainContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame(event);
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}