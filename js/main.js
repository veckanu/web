//Getting the canvas and picks a renderer for best performance
var renderer = PIXI.autoDetectRenderer(
	window.innerWidth,
	window.innerHeight, 
	{
		view: document.getElementById('bgCanvas'),
		transparent: true
	}
);

// Contains all the sprites
var stage = new PIXI.Container();

// Dynamic canvas without weird warping when window is resized
window.onresize = function(){
	renderer.view.style.width = window.innerWidth + "px";
	renderer.view.style.height = window.innerHeight + "px";
	renderer.resize(window.innerWidth, window.innerHeight);
};

// Getting textures ready
var textures = [];
var flakeImgs = document.getElementsByClassName("flake");
_.each(flakeImgs, function(img){
	textures.push(new PIXI.Texture(new PIXI.BaseTexture(img)));
});

// defining particle object
var Particle = function(){
	// make life easier
	var self = this;

	// movement variables
	this.x = Math.random()*renderer.width;
	this.y = -Math.random()*renderer.height-50;
	this.a = Math.random()*2*Math.PI;
	this.va = Math.random()*0.01+0.01;
	this.maxVx = Math.random()*5+3;
	this.vy = Math.random()*3+0.1;

	// setting up sprites for the snowflakes
	this.sprite = new PIXI.Sprite(_.sample(textures));
	var scale = 0.3 + Math.random()*0.2;
	this.sprite.scale = {x: scale, y: scale};
	this.sprite.anchor = {x: 0.5, y: 0.5};
	this.sprite.position = {x: self.x, y: self.y};
	this.sprite.tint = 0xddeeff;
	// adding the sprite to the container
	stage.addChild(this.sprite);

	// update function
	this.update = function(){
		this.y += this.vy;
		this.x += Math.sin(this.a)*this.maxVx;
		this.a += this.va;
		this.bound();
		this.sprite.position = {x: self.x, y: self.y};
		this.sprite.rotation += 0.01;
	}
	// bounding function so they don't escape the screen!!! :D
	this.bound = function(){
		if(this.x < -this.sprite.width)this.x = renderer.width + this.sprite.width;
		if(this.x > renderer.width + this.sprite.width)this.x = -this.sprite.width;
		if(this.y > renderer.height + this.sprite.height)this.y = -Math.random()*250-50;
	}
}

// array containing particles
var ptcls = [];
var numPtcls = 20;

/* ======================
 * === initialisation ===
 * ======================
 * - creates particles out of the numPtcls variable
 * - starts loop
 */
function init(){
	_.times(numPtcls, function(){
		ptcls.push(new Particle());
	});
	window.requestAnimationFrame(loop);
}
// Updates the positions of the flakes
function update(){
	_.each(ptcls, function(ptcl){
		ptcl.update();
	});
}
/* === LOOPING FUNCTION ===
 * - updates
 * - redraws
 */ 
function loop(){
	window.requestAnimationFrame(loop);
	update();	
	renderer.render(stage);
}

//===========
//=== RUN ===
//===========
init();
