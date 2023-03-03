var snake;
var t = 0;
var colidiu = false;
var comida;

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;

var speedX = 0;
var speedY = 0;

var GAME_AREA = [480,280];

var TAM = 10;

function startGame() {
	restartPosicoes();
	myGameArea.start();
}

function restartPosicoes(){
	snake = [];
	t = 0;
	speedX = 0;
	speedY = 0;
	colidiu = false;
	snake.push(new quadrado(TAM, TAM, "white", 60, 20));
	criaComida();
}

var myGameArea = {
	canvas: document.getElementById("canvas"),
	start: function () {
		canvas.width = GAME_AREA[0];
		canvas.height = GAME_AREA[1];
		this.context = canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 100);
	},
	clear: function () {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function quadrado(width, height, color, x, y) {
	this.id = ++t;
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;

	this.move = function () {
		this.x += speedX;
		this.y += speedY;
	}

	this.paint = function () {
		myGameArea.context.fillStyle = this.color;
		myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function cresce() {
	x = snake[snake.length - 1].x;
	y = snake[snake.length - 1].y;
	snake.push(new quadrado(TAM, TAM, "white", x, y));
}

function saoVizinhos(a,b) {
	return a - b == 1 || b - a == 1;
}

function updateGameArea() {

	myGameArea.clear();

	// cauda herda posição anterior do quadrado da frente
	for (var i = snake.length; i > 0; i--) {
		if (snake[i] && snake[i - 1]) {
			snake[i].x = snake[i - 1].x;
			snake[i].y = snake[i - 1].y;
		}
	}

	snake.forEach(pinta);
	function pinta(item, index) {
		item.paint();
	}

	comida.paint();

	// checa colisoes entre os quadrados da snake (menos vizinhos)
	for (var i = 0; i < snake.length; i++) {
		for (var ii = 0; ii < snake.length; ii++) {
			if (ii !== i && !saoVizinhos(i,ii)) {
				colidiu = checkColision(snake[i], snake[ii]);
				console.log('colidiu :' + colidiu );
			}
		}
	}

	// checa colisoes entre a cabeça pra crescer
	if(checkColision(snake[0], comida)){
		console.log('comeu');
		cresce();
		criaComida();
	}

	if(colidiu){
		alert('Game over!');
		restartPosicoes();
	} else {
		snake[0].move();
		snake[0].paint();
	}
	
}

function checkColision(pedraA, pedraB) {
	if (pedraA.x == pedraB.x && pedraA.y == pedraB.y) {
		return true;
	}
	return false;
}

function criaComida() {
	var x = getRndInteger(0,GAME_AREA[0]-TAM);
	var y = getRndInteger(0,GAME_AREA[1]-TAM);
	comida = new quadrado(TAM,TAM,"red",x,y);
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * ((max - min) / TAM)) * TAM + min;
}

window.addEventListener('keydown', this.controla, false);

function controla(e) {

	if (e.keyCode == KEY_UP) {

		zeraVelocidade();
		speedY = -TAM;

	} else if (e.keyCode == KEY_DOWN) {

		zeraVelocidade();
		speedY = TAM;

	} else if (e.keyCode == KEY_LEFT) {

		zeraVelocidade();
		speedX = -TAM;

	} else if (e.keyCode == KEY_RIGHT) {

		zeraVelocidade();
		speedX = TAM;
		
	} else if (e.keyCode == KEY_SPACE){
		cresce();
	}

}

function zeraVelocidade(){
	speedX = 0;
	speedY = 0;
}

