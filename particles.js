"use strict";

/* 
* Define our core object that will hold all our global variables
* Can be extended for more globals properties like game physics or rigid bodies
*/
let Core = {};

/*
* We use globals properties to add all globals
* Later we can add more properties for different reasons
* props: canvas, context, width & height
*/
Core.globals = (function() {
	// Defines your canvas
	const canvas = document.getElementById('canvas');
	// Defines the 2d context
	const context = canvas.getContext('2d');
	// Width & height of canvas according to screen size.
	let width = canvas.width = window.innerWidth;
	let height = canvas.height = window.innerHeight;
	// our global object
	let props = {
		canvas: canvas,
		context: context,
		width: width,
		height: height
	}

	return props;
}());

// updates our global width & height when screen is resized.
window.onresize = function() {
	Core.globals.width = window.innerWidth;
	Core.globals.height = window.innerHeight;
}

let particles = [];

function Particle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		ctx.fill();
		ctx.fillStyle = "#00008B";
	}

	this.update = function() {

		if(this.x + this.radius > Core.globals.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if(this.y + this.radius > Core.globals.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw(Core.globals.context);

	}
}

function generate_particles() {
	for(let i = 0; i < 100; i++) {
		let radius = Math.random() * 5;
		let x = Math.random() * (Core.globals.width - radius * 2) + radius;
		let y = Math.random() * (Core.globals.height - radius * 2) + radius;
		let dx = (Math.random() - 0.5);
		let dy = (Math.random() - 0.5);
		particles.push(new Particle(x, y, dx, dy, radius));
	}
}

generate_particles();

function render() {
	requestAnimationFrame(render);
	Core.globals.context.clearRect(0, 0, Core.globals.width, Core.globals.height);
	for(let i = 0; i < particles.length; i++) {
		particles[i].update();
	}
}

render();
