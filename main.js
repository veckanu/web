var canvas = document.getElementById("bgCanvas"),
    ctx = canvas.getContext("2d");

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};window.onresize();

var Particle = function(){
	this.x = Math.random()*canvas.width;
	this.y = -Math.random()*canvas.height-50;
	this.r = 30+Math.random()*20;
	this.a = Math.random()*2*Math.PI;
	this.va = Math.random()*0.01+0.01;
	this.maxVx = Math.random()*5+3;
	this.vy = Math.random()*3+0.1;
	this.color = "rgba(30, 120, 180,"+(Math.random()*0.5+0.1)+")";
	this.update = function(){
		this.y += this.vy;
		this.x += Math.sin(this.a)*this.maxVx;
		this.a += this.va;
		this.bound();
	}
	this.draw = function(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	this.bound = function(){
		if(this.x < -this.r)this.x = canvas.width + this.r;
		if(this.x > canvas.width + this.r)this.x = -this.r;
		if(this.y > canvas.height + this.r)this.y = -Math.random()*250-50;
	}
}

var ptcls = [];
var numPtcls = 20;

function init(){
	Array.apply(null, Array(numPtcls)).forEach(function(){
		ptcls.push(new Particle());
	});
	window.requestAnimationFrame(loop);
}
function update(){
	ptcls.forEach(function(ptcl){
		ptcl.update();
	});
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ptcls.forEach(function(ptcl){
		ptcl.draw();
	});
	ctx.restore();
}
//LOOPING FUNCTION
function loop(){
	window.requestAnimationFrame(loop);
	update();
	draw();
}

//===========
//=== RUN ===
//===========
init();
