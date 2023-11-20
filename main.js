// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 720;
cnv.height = 480;

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = true;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = true;
    }
    if (event.code === "ArrowRight") {
        player[0].right = true;
    }
}

function keyupHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = false;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = false;
    }
    if (event.code === "ArrowRight") {
        player[0].right = false;
    }
}

// Global Variables

// Reset Variables
let walls;
let triggers;
let player;

reset();


// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.clearRect(0, 0, cnv.width, cnv. height);

    // Food Helper Functions
    for (let i = 0; i < walls.length; i++) {
        draw(walls, i);
        checkCollision(i);
    }

    // Player Helper Functions
    draw(player, 0);
    playerMovement();

    // Camera Movement Triggers
    checkTriggers();
    
    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    ctx.fillStyle = `${shape[n].color}`;
    ctx.fillRect(shape[n].x, shape[n].y, shape[n].w, shape[n].h);
}

function playerMovement() {
   playercontrols();
   player[0].yV += player[0].yAccel;
   player[0].y += player[0].yV;

    if (player[0].yV > 10) {
        player[0].yV = 10;
    } else if (player[0].yV < -10) {
        player[0].yV = -10;
    }
}

function playercontrols() {
    if (player[0].up === true) {
        player[0].yV = -10;
    }
    if (player[0].left === true) {
        player[0].x -= player[0].xV;
    }
    if (player[0].right === true) {
        player[0].x += player[0].xV;
    }
}

function checkCollision(n) {
    // Wall Detection
    if (player[0].y + player[0].h > walls[n].y && player[0].y + player[0].h < walls[n].y + walls[n].h && player[0].x + player[0].xV + 1 < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].xV - 1 > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
        player[0].yV = 0;
    } else if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x + player[0].xV + 1 < walls[n].x + walls[n].w&& player[0].x + player[0].w - player[0].xV - 1 > walls[n].x) {
        player[0].y = walls[n].y + walls[n].h;
        player[0].yV = 0;
    } else if (player[0].x < walls[n].x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x + walls[n].w;
    } else if (player[0].x + player[0].w > walls[n].x && player[0].x + player[0].w < walls[n].x + walls[n].w &&player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x - player[0].w;
    }

    // Canvas Borders
    if (player[0].x < 0) {
        player[0].x = 0;
    }
    if (player[0].x + player[0].w > cnv.width) {
        player[0].x = cnv.width - player[0].w;
    }
}

function checkTriggers() {
    for (let i = 0; i < triggers.length; i++) {
        // Trigger Detection
        // Horizontal Triggers
        if (triggers[i].id === "horizontal" && player[0].x + player[0].w / 2 > triggers[i].x) {
            triggers[i].state = true;
        } else {
            triggers[i].state = false;
        }

        // Vertical Triggers
        if (triggers[i].id === "vertical" && player[0].y + player[0].h / 2 > triggers[i].y) {
            triggers[i].state = true;
        } else {
            triggers[i].state = false;
        }
    }

    // Horizontal Camera Movement
    if (triggers[1].state === true) {
        // Stops the "camera" from moving past the end of the platform
    } else if (triggers[0].state === true) {
        if (player[0].x + player[0].w / 2 > cnv.width / 2) {
            for (let i = 0; i < walls.length; i++) {
                walls[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
            }
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
            }
            player[0].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
        }
        if (player[0].x + player[0].w / 2 < cnv.width / 2) {
            for (let i = 0; i < walls.length; i++) {
                walls[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
            }
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
            }
            player[0].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
        }
    }

    // Vertical Camera Movement
    if (triggers[2] === true) {
        if (player[0].y + player[0].h / 2 > cnv.height / 2) {
            for (let i = 0; i < walls.length; i++) {
                walls[i].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
            }
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
            }
            player[0].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
        }
        if (player[0].y + player[0].w / 2 < cnv.height / 2) {
            for (let i = 0; i < walls.length; i++) {
                walls[i].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
            }
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
            }
            player[0].y += (cnv.height / 2) - (player[0].y + player[0].h / 2);
        }
    }
}

function newPlayer(x1, y1, w1, h1, color1, up1, left1, right1, xV1, yV1, yAccel1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
            up: up1,
            left: left1,
            right: right1,
            xV: xV1,
            yV: yV1,
            yAccel: yAccel1
    } 
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1
    }
}

function newTrigger(x1, y1, id1, state1) {
    return {
        x: x1,
        y: y1,
        id: id1,
        state: state1
    }
}

function reset() {
    walls = [];
    walls.push(newWall(0, 0, 200, cnv.height, "grey"));
    walls.push(newWall(1850, 0, 300, cnv.height, "grey"));
    walls.push(newWall(0, cnv.height - 50, 2100, 50, "grey"));
    walls.push(newWall(1000, cnv.height - 75, 50, 50, "grey"));

    let n = 520;
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            walls.push(newWall(n, cnv.height / 2, 150, 20, "grey"));
            walls.push(newWall(n, cnv.height / 2 - 200, 150, 20, "grey"));
            walls.push(newWall(n, cnv.height / 2 - 400, 150, 20, "grey"));
            walls.push(newWall(n, cnv.height / 2 - 600, 150, 20, "grey"));
        } else {
            walls.push(newWall(n, (cnv.height / 2) + 100, 150, 20, "grey"));
            walls.push(newWall(n, (cnv.height / 2) - 200 + 100, 150, 20, "grey"));
            walls.push(newWall(n, (cnv.height / 2) - 400 + 100, 150, 20, "grey"));
            walls.push(newWall(n, (cnv.height / 2) - 600 + 100, 150, 20, "grey"));
        }
        n += 205;
    }

    triggers = [];
    triggers.push(newTrigger(cnv.width / 2, 0, "horizontal", false));
    triggers.push(newTrigger(2060 - cnv.width / 2, 0, "horizontal", false));
    triggers.push(newTrigger(0, cnv.height / 2, "vertical", false));

    player = [];
    player.push(newPlayer(cnv.width / 2, cnv.height / 2, 20, 20, "blue", false, false, false, 5, 0, 1));
}