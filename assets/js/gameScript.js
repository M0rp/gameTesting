var backgroundImg;

var playerCharacter1, playerCharacter2;
var player1Bullets = [], player2Bullets = [];
var player1Score = 0, player2Score = 0;

var topHit1, rightHit1, bottomHit1, leftHit1;
var topHit2, rightHit2, bottomHit2, leftHit2;

var items = [];

var vertWall1, vertWall2, horWall1, horWall2;

var outsideWallTop, outsideWallRight, outsideWallBottom, outsideWallLeft;

var walls = [];

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

function startGame() {
    gameArea.start();

    backgroundImg = new component(1080, 720, "assets/img/backgroundImg.png", 0, 0, 0, "player");

    playerCharacter1 = new component(50, 50, "assets/img/playerCharacter1Sprite.png", 100, 350, 1.570796, "player");
    playerCharacter2 = new component(50, 50, "assets/img/playerCharacter2Sprite.png", 1000, 350, -1.570796, "player");

    topHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    rightHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    bottomHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    leftHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");

    topHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    rightHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    bottomHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    leftHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");

    outsideWallTop = new component(1080, 10, "brown", 0, 0, 0, "obsticle");
    outsideWallLeft = new component(10, 720, "brown", 0, 0, 0, "obsticle");
    outsideWallBottom = new component(1080, 10, "brown", 0, 710, 0, "obsticle");
    outsideWallRight = new component(10, 720, "brown", 1070, 0, 0, "obsticle");

    walls.push(new component(1080, 10, "brown", 0, 0, 0, "obsticle"));//Top Wall
    walls.push(new component(10, 720, "brown", 1070, 0, 0, "obsticle"));//Right Wall
    walls.push(new component(1080, 10, "brown", 0, 710, 0, "obsticle"))//Bottom Wall
    walls.push(new component(10, 720, "brown", 0, 0, 0, "obsticle"));//Left Wall

    walls.push(new component(50, 144, "green", 200, 144, 0, "obsticle"));//Top Left Portion
    walls.push(new component(50, 144, "green", 200, 432, 0, "obsticle"));//Right Verticle Wall
    walls.push(new component(50, 144, "green", 830, 144, 0, "obsticle"));//Left Horizontal Wall
    walls.push(new component(50, 144, "green", 830, 432, 0, "obsticle"));//Right Horizontal Wall
    
    walls.push(new component(215, 50, "green", 250, 238, 0, "obsticle"));
    walls.push(new component(215, 50, "green", 250, 432, 0, "obsticle"));
    walls.push(new component(215, 50, "green", 615, 238, 0, "obsticle"));
    walls.push(new component(215, 50, "green", 615, 432, 0, "obsticle"));

    walls.push(new component(50, 150, "green", 515, 285, 0, "obsticle"));
}

function updateGameArea() {
    gameArea.clear();
    gameArea.frameCount += 1;

    gameArea.frameSincePlayer1Fire += 1;
    if(gameArea.keys && gameArea.keys[32] && gameArea.frameSincePlayer1Fire >= 15 && playerCharacter1 != null) {
        var angle = playerCharacter1.angle;
        var x = playerCharacter1.x;
        var y = playerCharacter1.y;

        if(playerCharacter1.currentPower == "blue") {
            console.log("blue shot");
            player1Bullets.push(new component(8, 8, "blue", x, y, angle, "bullet"));
        } else {
            player1Bullets.push(new component(8, 8, "assets/img/bulletSprite.png", x, y, angle, "player"));
        }

        gameArea.frameSincePlayer1Fire = 0;
    }

    gameArea.frameSincePlayer2Fire += 1;
    if(gameArea.keys && gameArea.keys[13] && gameArea.frameSincePlayer2Fire >= 15 && playerCharacter2 != null) {
        var angle = playerCharacter2.angle;
        var x = playerCharacter2.x;
        var y = playerCharacter2.y;

        if(playerCharacter2.currentPower == "blue") {
            console.log("blue shot");
            player2Bullets.push(new component(8, 8, "blue", x, y, angle, "bullet"));
        } else {
            player2Bullets.push(new component(8, 8, "assets/img/bulletSprite.png", x, y, angle, "player"));
        }

        gameArea.frameSincePlayer2Fire = 0;
    }

    
    var playerCharacter2Dead = false;
    for(i = 0; i < player1Bullets.length; i += 1) {
        if(player1Bullets[i] != null) {
            stop = false;
        
            for(n = 0; n < walls.length; n += 1) {
                if(player1Bullets[i].collideWith(walls[n])) {
                    stop = true;
                }
            }

            if(playerCharacter2 != null) {
                if(player1Bullets[i].collideWith(playerCharacter2)) {
                    stop = true;
                    playerCharacter2 = null;
                    playerCharacter2Dead= true;
                    player1Score += 1;
                }
            }

            if((player1Bullets[i].x > 0 || player1Bullets[i] < gameArea.canvas.width || player1Bullets[i].y > 0 || player1Bullets[i].y < gameArea.canvas.height) && stop == false) {
                player1Bullets[i].speed = 10;
                player1Bullets[i].newPos(); 
                player1Bullets[i].update();
            } else {
                player1Bullets[i] = null;
            }
        }
    }

    var playerCharacter1Dead = false;
    for(i = 0; i < player2Bullets.length; i += 1) {
        if(player2Bullets[i] != null) {
            stop = false;
        
            for(n = 0; n < walls.length; n += 1) {
                if(player2Bullets[i].collideWith(walls[n])) {
                    stop = true;
                }
            }

            if(playerCharacter1 != null) {
                if(player2Bullets[i].collideWith(playerCharacter1)) {
                    stop = true;
                    playerCharacter1 = null;
                    playerCharacter1Dead= true;
                    player2Score += 1;
                }
            }

            if((player2Bullets[i].x > 0 || player2Bullets[i] < gameArea.canvas.width || player2Bullets[i].y > 0 || player2Bullets[i].y < gameArea.canvas.height) && stop == false) {
                player2Bullets[i].speed = 10;
                player2Bullets[i].newPos();
                player2Bullets[i].update();
            } else {
                player2Bullets[i] = null;
            }
        }
    }

    if(playerCharacter1Dead == false && playerCharacter1 != null) {
        topHit1.x = playerCharacter1.x;
        topHit1.y = playerCharacter1.y - playerCharacter1.height/2;

        rightHit1.x = playerCharacter1.x + playerCharacter1.width/2;
        rightHit1.y = playerCharacter1.y;

        bottomHit1.x = playerCharacter1.x;
        bottomHit1.y = playerCharacter1.y + playerCharacter1.height/2;

        leftHit1.x = playerCharacter1.x - playerCharacter1.width/2;
        leftHit1.y = playerCharacter1.y;

        topHit1.update();
        rightHit1.update();
        bottomHit1.update();
        leftHit1.update();

        playerCharacter1.speed = 0;
        playerCharacter1.rotSpeed = 0;

        if(gameArea.keys && gameArea.keys[87]) {playerCharacter1.speed = 4;} //W
        if(gameArea.keys && gameArea.keys[83]) {playerCharacter1.speed = -4;} //S
        if(gameArea.keys && gameArea.keys[68]) {playerCharacter1.rotSpeed = 4;} //D
        if(gameArea.keys && gameArea.keys[65]) {playerCharacter1.rotSpeed = -4;} //A

        playerCharacter1.newPlayerPos(topHit1, rightHit1, bottomHit1, leftHit1);
        playerCharacter1.update();
    }

    if(playerCharacter2Dead == false && playerCharacter2 != null) {
        topHit2.x = playerCharacter2.x;
        topHit2.y = playerCharacter2.y - playerCharacter2.height/2;

        rightHit2.x = playerCharacter2.x + playerCharacter2.width/2;
        rightHit2.y = playerCharacter2.y;

        bottomHit2.x = playerCharacter2.x;
        bottomHit2.y = playerCharacter2.y + playerCharacter2.height/2;

        leftHit2.x = playerCharacter2.x - playerCharacter2.width/2;
        leftHit2.y = playerCharacter2.y;

        topHit2.update();
        rightHit2.update();
        bottomHit2.update();
        leftHit2.update();                

        playerCharacter2.speed = 0;
        playerCharacter2.rotSpeed = 0;

        if(gameArea.keys && gameArea.keys[38]) {playerCharacter2.speed = 4;} //up arrow
        if(gameArea.keys && gameArea.keys[40]) {playerCharacter2.speed = -4;} //down arrow
        if(gameArea.keys && gameArea.keys[39]) {playerCharacter2.rotSpeed = 4;} //right arrow
        if(gameArea.keys && gameArea.keys[37]) {playerCharacter2.rotSpeed = -4;} //left arrow

        playerCharacter2.newPlayerPos(topHit2, rightHit2, bottomHit2, leftHit2);
        playerCharacter2.update();
    }

    for(i = 0; i < walls.length; i += 1) {
        walls[i].update();
    }

    if(playerCharacter1 == null || playerCharacter2 == null) {
        resetGame();
    }

    if(everyInterval(300)) {
        var xPos = Math.floor(Math.random()*(gameArea.canvas.width+1));
        var yPos = Math.floor(Math.random()*(gameArea.canvas.height+1));;

        items.push(new component(20, 20, "blue", xPos, yPos, 0, "item"));
        console.log("ping");
    }

    for(i = 0; i < items.length; i += 1) {
        if(items[i] != null) {
            if(playerCharacter1.collideWith(items[i])){
                playerCharacter1.currentPower = "blue";
                items[i] = null;
            } else if(playerCharacter2.collideWith(items[i])) {
                playerCharacter2.currentPower = "blue";
                items[i] = null;
            } else {
                items[i].update();
            }
        }
    }

    score1.textContent = player1Score;
    score2.textContent = player2Score;
}

function resetGame() {
    playerCharacter1 = new component(50, 50, "assets/img/playerCharacter1Sprite.png", 100, 350, 1.570796, "player");
    playerCharacter2 = new component(50, 50, "assets/img/playerCharacter2Sprite.png", 1000, 350, -1.570796, "player");

    topHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    rightHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    bottomHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");
    leftHit1 = new component(2, 2, "white", 50, 50, 0, "tracker");

    topHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    rightHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    bottomHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");
    leftHit2 = new component(2, 2, "white", 50, 50, 0, "tracker");

    for(i = 0; i < player1Bullets.length; i += 1) {
        player1Bullets[i] = null;
    }
    
    for(i = 0; i < player2Bullets.length; i += 1) {
        player2Bullets[i] = null;
    }

    for(i = 0; i < items.length; i += 1) {
        items[i] = null;
    }
}

var gameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        this.frameSincePlayer1Fire = 50;
        this.frameSincePlayer2Fire = 50;
        this.frameCount = 0;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);
        
        window.addEventListener('keydown', function(e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            gameArea.keys[e.keyCode] = false;
        })
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, angle, type) {
    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;
    this.angle = angle;

    this.speed = 0;
    this.ySpeed = 1;
    this.xSpeed = 1;
    this.rotSpeed = 0;

    this.currentPower = "none";

    if(type == "player") {
        this.image = new Image();
        this.image.src = color;
    }

    this.update = function() {
        if(type == "obsticle") {
            ctx = gameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx = gameArea.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            if(type == "player") {
                ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
            } else {
                ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            }
            ctx.restore();
        }
    }

    this.newPos = function() {
        this.angle += this.rotSpeed * Math.PI / 180;
        
        this.x += this.speed * Math.sin(this.angle);
        this.y += -this.speed * Math.cos(this.angle);
    }

    this.newPlayerPos = function(top, right, bottom, left) {
        this.angle += this.rotSpeed * Math.PI / 180;

        var speedX = this.speed * Math.sin(this.angle);
        var speedY = -this.speed * Math.cos(this.angle);

        for(i = 0; i < walls.length; i += 1) {
            if(top.collideWith(walls[i]) && speedY < 0) {
                speedY = 0;
            }
        }

        for(i = 0; i < walls.length; i += 1) {
            if(right.collideWith(walls[i]) && speedX > 0) {
                speedX = 0;
            }
        }
        
        for(i = 0; i < walls.length; i += 1) {
            if(bottom.collideWith(walls[i]) && speedY > 0) {
                speedY = 0;
            }
        }

        for(i = 0; i < walls.length; i += 1) {
            if(left.collideWith(walls[i]) && speedX < 0) {
                speedX = 0;
            }
        }

        this.x += speedX;
        this.y += speedY;
    }

    this.collideWith = function(otherObj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this. y + (this.height);

        var otherLeft = otherObj.x;
        var otherRight = otherObj.x + (otherObj.width);
        var otherTop = otherObj.y;
        var otherBottom = otherObj.y + (otherObj.height);

        var collide = true;

        if((bottom < otherTop) || (top > otherBottom) || (right < otherLeft) || (left > otherRight)) {
            collide = false;
        }

        return collide;
    }

    this.topCollide = function(otherObj) {
        var top = this.y - (this.height/2);

        var otherLeft = otherObj.x;
        var otherRight = otherObj.x + (otherObj.width);
        var otherTop = otherObj.y;
        var otherBottom = otherObj.y + (otherObj.height);

        var collide = true;
        if((top < otherTop) || (top > otherBottom) || (top < otherLeft) || (top > otherRight)) {
            collide = false;
        }
        console.log(collide);
        return collide;
    }
}

function everyInterval(n) {
    if((gameArea.frameCount / n) % 1 == 0) {
        return true;
    }

    return false;
}