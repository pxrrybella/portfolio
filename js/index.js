
//CLOCK
function showClock(){
    const date = new Date();
    const li = document.querySelector('.clock');

    var hours = date.getHours();
	if (hours >= 1 && hours <= 9) {
		hours = '0' + hours;
	}

    var minutes = date.getMinutes();
	if (minutes >= 1 && minutes <= 9) {
		minutes = '0' + minutes;
	}

	if ( hours >= 7 && hours < 12 ){
		li.innerText = `Good morning!  \n (❀❛ ֊ ❛„)♡ \n ${hours} : ${minutes}`;
	} else if ( hours >= 12 && hours < 20){
		li.innerText = `Hope u having a great day! (ꈍᴗꈍ)♡ \n ${hours} : ${minutes}`;
	} else if (hours >= 20){
		li.innerText= `Night time! …ᘛ⁐̤ᕐᐷ \n ${hours} : ${minutes}`;
	} else if (hours >= 2 && hours < 7){
		li.innerText = `Might go to sleep soon ૮ ◞ ﻌ ◟ ა \n ${hours} : ${minutes}`;
	}

setTimeout(showClock, 1000);
}

showClock();

//CELLPHONE NAVBAR
const button = document.querySelector('.navbar-button');
const menuSidebars = document.querySelector('.sidebars-section');

button.addEventListener('click', () => {
	menuSidebars.classList.toggle('sidebars-section-hide');
	menuSidebars.classList.toggle('sidebars-section-show');
}
)


//BACKGROUND
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let w, h, balls = [];
let mouse = {
	x: undefined,
	y: undefined
}
let rgb = [
	"rgba(147, 118, 224,  0.5)",
	"rgba(60, 72, 107, 0.2)",
	"rgba(243, 188, 200, 0.2)",
	"rgba(246, 255, 166, 0.6)",
	"rgba(246, 255, 166, 0.2)",
	"rgba(60, 72, 107, 0.7)",
	"rgba(246, 255, 166, 0.2)"
]

function init() {
	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.zIndex = '-1';
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation = 'lighter';
	drawBalls();

	let temp = [];
	for (let i = 0; i < balls.length; i++) {
		if (balls[i].time <= balls[i].ttl) {
			temp.push(balls[i]);
		}
	}
	balls = temp;

	requestAnimationFrame(animationLoop);
}

function drawBalls() {
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].draw();
	}
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;

	for (let i = 0; i < 3; i++) {
		balls.push(new Ball());
	}	
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
	return 1 - Math.pow(1 - x, 4);
}

class Ball {
	constructor() {
		this.start = {
			x: mouse.x + getRandomInt(-20, 20),
			y: mouse.y + getRandomInt(-20, 20),
			size: getRandomInt(10, 5)
		}
		this.end = {
			x: this.start.x + getRandomInt(-300, 300),
			y: this.start.y + getRandomInt(-300, 300)
		}

		this.x = this.start.x;
		this.y = this.start.y;
		this.size = this.start.size;

		this.style = rgb[getRandomInt(0, rgb.length - 1)];

		this.time = 0;
		this.ttl = 120;
	}
	draw() {
		ctx.fillStyle = this.style;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	update() {
		if (this.time <= this.ttl) {
			let progress = 1 - (this.ttl - this.time) / this.ttl;

			this.size = this.start.size * (1 - easeOutQuart(progress));
			this.x = this.x + (this.end.x - this.x) * 0.01;
			this.y = this.y + (this.end.y - this.y) * 0.01;
		}
		this.time++;
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);