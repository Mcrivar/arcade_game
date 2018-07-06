let scores = 0;

// Enemies our player must avoid
let Enemy = function (x, y, speed) {

// Variables applied to each of our instances go here,
// we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 450) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle collisions
Enemy.prototype.checkCollisions = function () {
    if (parseInt(this.x) >= player.x - 100 && parseInt(this.x) <= player.x + 40 && this.y === player.y) {
        player.reset();
        allLife.pop();
        score.addScores();
        player.gameOver();
    }
};

//Player object
let Player = function (sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 340;
};

// moving player
Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 40;
    } else if (key === 'right' && this.x < 400) {
        this.x += 40;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 40;

        if (this.y < 40) {
            scores += 50;
            player.gameWin();
            this.reset();
        }
    } else if (key === 'down' && this.y < 400) {
        this.y += 40;
    }
};

Player.prototype.gameWin = function () {
    if (scores !== 300) return;

    swal({
        title: "Well done!",
        text: "You've earned 300 points!",
        type: "success",
        confirmButtonText: "Click to play again!"
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.location.reload(true);
        }
    })
};

Player.prototype.gameOver = function () {
    if (allLife.length !== 0) return;

    swal({
        title: "OOOPS, game over :(",
        text: "No lives remaining",
        type: "error",
        confirmButtonText: "Click to play again!"
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.location.reload(true);
        }
    })
};

//Score object
let Score = function (x, y) {
    this.x = x;
    this.y = y;
    this.score = `Points: ${scores}`;
}

Score.prototype.render = function () {
    ctx.font = "15px arial";
    ctx.fillText(this.score, this.x, this.y);
};

Score.prototype.update = function () {
    this.score = `Points: ${scores}`;
};

Score.prototype.addScores = function () {
    if (scores >= 50) {
        scores -= 50;
    }
};

//Life object
let Life = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Life.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 45);
};
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(320, 220, 260), new Enemy(120, 140, 60), new Enemy(40, 60, 400)];
// Place the player object in a variable called player
let player = new Player('images/char-cat-girl.png', 200, 340);
// Place the score object in a variable called score
let score = new Score(425, 570);
// Place all life objects in an array called allLife
let allLife = [new Life(20, 540), new Life(60, 540), new Life(100, 540)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});