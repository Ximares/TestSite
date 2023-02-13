//Disable scrolling with arrowkeys
window.addEventListener("keydown", function (e) {
  //space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

//BACKGROUNDLIST
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground.png';

imgArray[1] = new Image();
imgArray[1].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground_green.png';

imgArray[2] = new Image();
imgArray[2].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground_yellow.png';

imgArray[3] = new Image();
imgArray[3].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground_orange.png';

imgArray[4] = new Image();
imgArray[4].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground_red.png';

imgArray[5] = new Image();
imgArray[5].src = 'https://github.com/Ximares/ximares.github.io/raw/master/visual/playground_secret.png';


//SONGLIST
var song1 = document.getElementById("song1");
function playSong1() {
  song1.play();
}
function pauseSong1() {
  song1.pause();
}

var song2 = document.getElementById("song2");
function playSong2() {
  song2.play();
}
function pauseSong2() {
  song2.pause();
}

var song3 = document.getElementById("song3");
function playSong3() {
  song3.play();
}
function pauseSong3() {
  song3.pause();
}

var song4 = document.getElementById("song4");
function playSong4() {
  song4.play();
}
function pauseSong4() {
  song4.pause();
}


var soundtest = document.getElementById("coinsound");
function coinSound() {
  soundtest.play();
}


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};


//EXPERIMENTAL ANTI-SCROLL
canvas.addEventListener('touchstart', this.touchstart);
canvas.addEventListener('touchmove', this.touchmove);

function touchstart(e) {
  e.preventDefault()
}

function touchstart(e) {
  e.preventDefault()
}


//INITIALIZING TOUCH
var obj = document.getElementById('touch');
canvas.addEventListener('touchmove', function (event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    canvas.style.left = touch.pageX + 'px';
    canvas.style.top = touch.pageY + 'px';
    document.getElementById("xtouchpos").innerHTML = "xtouch-pos = " + touch.pageX;
    document.getElementById("ytouchpos").innerHTML = "ytouch-pos = " + touch.pageY;
    character.x = Math.floor(touch.pageX - 140);
    character.y = Math.floor(touch.pageY - 420);
  }
}, false);


bgImage.src = "https://github.com/Ximares/ximares.github.io/raw/master/visual/playground.png";
// character image
var characterReady = false;
var characterImage = new Image();
characterImage.onload = function () {
  characterReady = true;
};

characterImage.src = "https://github.com/Ximares/ximares.github.io/raw/master/visual/lenny.png";

// coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
  coinReady = true;
};

coinImage.src = "https://github.com/Ximares/ximares.github.io/raw/master/visual/coin.png";

// Game objects
var coin = {};
var coinsCaught = 0;

var character = {
  speed: 250 // movement in pixels per second
};


// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a coin
var reset = function () {
  character.x = canvas.width / 2;
  character.y = canvas.height / 2;
  // Throw the coin somewhere on the screen randomly
  coin.x = 0 + Math.floor((Math.random() * (canvas.width - 150)));
  coin.y = 0 + Math.floor((Math.random() * (canvas.height - 150)));
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown || 87 in keysDown) { // Player holding up
    character.y -= Math.floor(character.speed * modifier + coinsCaught/50);
  }
  if (40 in keysDown || 83 in keysDown) { // Player holding down
    character.y += Math.floor(character.speed * modifier + coinsCaught/50);
  }
  if (37 in keysDown || 65 in keysDown) { // Player holding left
    character.x -= Math.floor(character.speed * modifier + coinsCaught/50);
  }
  if (39 in keysDown || 68 in keysDown) { // Player holding right
    character.x += Math.floor(character.speed * modifier + coinsCaught/50);
  }


  //TOUCH STUFF
  var update = function (modifier) {
    var xtouchpos = Math.floor(event.touches[0].pageX);
    var ytouchpos = Math.floor(event.touches[0].pageY);
  }
  // Are they touching?
  if (
    character.x <= (coin.x + 32)
    && coin.x <= (character.x + 32)
    && character.y <= (coin.y + 32)
    && coin.y <= (character.y + 32)
  ) {
    ++coinsCaught;
    //PLAY COIN SOUND
    coinSound();
    coin.x = 0 + (Math.random() * (canvas.width - 60));
    coin.y = 0 + (Math.random() * (canvas.height - 60));
  }
};
// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (characterReady) {
    ctx.drawImage(characterImage, character.x, character.y);
  }
  if (coinReady) {
    ctx.drawImage(coinImage, coin.x, coin.y);
  }
  // Score
  ctx.fillStyle = "rgb(0, 0, 256)";
  ctx.font = "22px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Coins: " + coinsCaught, 16, 16);
  if (coinsCaught == 1) {
    playSong1();
  }
  if (coinsCaught == 20) {
    ctx.fillText("20 coins good job!", 16, 42);
    pauseSong1();
    playSong2();
  }
  if (coinsCaught == 50) {
    ctx.fillText("50 coins good good! >:3/", 16, 42);
    pauseSong2();
    playSong3();
  }
  if (coinsCaught >= 100) {
    ctx.fillText("100 coins!! you finished :D", 16, 42);
    pauseSong3();
    playSong4();
  }

  //CHANGE BACKGROUND IMAGE UPON COIN MILESTONES
  if (coinsCaught >= 1) {
    bgImage = imgArray[1];
  }
  if (coinsCaught >= 20) {
    bgImage = imgArray[2];
  }
  if (coinsCaught >= 50) {
    bgImage = imgArray[3];
  }
  if (coinsCaught >= 100) {
    bgImage = imgArray[4];
  }
  if (coinsCaught >= 200) {
    bgImage = imgArray[5];
  }
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;
  update(delta / 1000);
  render();
  document.getElementById("xpos").innerHTML = "x-pos = " + character.x;
  document.getElementById("ypos").innerHTML = "y-pos = " + character.y;
  //document.getElementById("xtouchpos").innerHTML = "xtouch-pos = " + character.x;
  //document.getElementById("ytouchpos").innerHTML = "ytouch-pos = " + character.y;
  //obj.addEventListener();
  if (character.x < 1) {
    character.x = 473;
  }
  if (character.x > 473) {
    character.x = 1;
  }
  if (character.y < 1) {
    character.y = 449;
  }
  if (character.y > 449) {
    character.y = 1;
  }
  then = now;
};

// Game start!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
