var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var interval = 0;
var intervalbombcreate = 0;
var intervalbombfall = 0;
var intervalbombexplosion = 0;
var blnbombcreated = false;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	
	var firstElementWithClass = document.querySelector('.start');
    firstElementWithClass.addEventListener('click', hideStartButton);
}

function hideStartButton () {
	playerspawn();
	var starthide = document.getElementsByTagName('div')[1];
	starthide.parentNode.removeChild(starthide);
	
	intervalbombcreate = setInterval(bombcreate, 1000);
	}


function playerspawn(){
	var randomspawn = Math.random() * (window.innerWidth-32);
	var element = document.getElementById('player');
	element.style.left = randomspawn + "px";
}


function bombcreate(){
	//BOMB CREATE POSITION - RANDOM HORIZONTAL
	var bombnew = document.createElement('div');
	bombnew.classList.add("bomb");
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(bombnew);
	var randombombs = Math.random() * (window.innerWidth-31);
	//var positionleft = bombnew.offsetLeft;
	bombnew.style.left = randombombs + "px";
	bombnew.style.top = 0 + 'px';

	//BOMB DISAPPEAR POSITION - RANDOM VERTICAL
	var grasstop = window.innerHeight * 0.8;
	var grassbottom = window.innerHeight;
	var rndmno = Math.random();
	var bombdisappear = grasstop + (rndmno * (grassbottom - grasstop));

	//EXPLOSION
	var explosion = document.createElement('div');
	explosion.classList.add("explosion");

	//CALL BOMBFALL FUNCTION
	intervalbombfall = setInterval(bombfall,  5, bombnew, bombdisappear, explosion);
}

function bombfall(element, bombdisappear, explosion){
	var positiontop = element.offsetTop;
	element.style.top = positiontop + 1 + 'px';
	if (positiontop >= window.innerHeight *0.8 ) 
		{
			bombexplode(element, bombdisappear, explosion);
		}
}


function bombexplode(element, bombdisappear, explosion){
	if (element.offsetTop >= bombdisappear) {	
		var explosion = document.createElement('div');
		explosion.classList.add("explosion");
		var test = document.getElementsByTagName('body')[0];
		test.appendChild(explosion);
		explosion.style.left = element.offsetLeft + 'px';
		explosion.style.top = bombdisappear + 'px';
		element.parentNode.removeChild(element);

		intervalbombexplosion= setInterval(explosiondisappear , 500, explosion);
	}
}


function explosiondisappear(explosion){
	
	//var player = document.getElementById('player');
	//alert(explosion.offsetLeft + " , " + explosion.offsetTop + " , " + player.offsetLeft + " , " + player.offsetTop);
	explosion.parentNode.removeChild(explosion);
	
	playerhit();
}


function playerhit(){
	
	var player = document.getElementById('player');
	var playerpositionleft = player.offsetLeft;
	var playerpositiontop = player.offsetTop;
	var test1 = document.elementFromPoint(playerpositionleft, playerpositiontop)
	if(test1.classList.contains('explosion') == true) {
	//if((test1.classList.contains('explosioncontacthorizontal') == true) || (test1.classList.contains('explosioncontactvertical')) == true) {
	alert("player died");
	}
}


if (document.getElementsByClassName('start')) {
    
}
document.addEventListener('DOMContentLoaded', myLoadFunction);