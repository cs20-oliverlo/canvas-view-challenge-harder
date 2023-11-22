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
let player;
let camera;

reset();


// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.clearRect(0, 0, cnv.width, cnv. height);

    // Player Helper Functions
    draw(player, 0);
    playerMovement();

    // Wall Helper Functions
    for (let i = 0; i < walls.length; i++) {
        draw(walls, i);
        checkCollision(i);
    }

    // Camera Movement
    moveCamera();
    
    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    ctx.fillStyle = `${shape[n].color}`;
    ctx.fillRect(shape[n].x - camera.x, shape[n].y - camera.y, shape[n].w, shape[n].h);
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
    if (player[0].y + player[0].h > walls[n].y && player[0].y + player[0].h < walls[n].y + walls[n].h && player[0].x + player[0].xV < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].xV > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
        player[0].yV = 0;
    } else if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x + player[0].xV < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].xV > walls[n].x) {
        player[0].y = walls[n].y + walls[n].h;
        player[0].yV = 0;
    } else if (player[0].x < walls[n].x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x + walls[n].w;
    } else if (player[0].x + player[0].w > walls[n].x && player[0].x + player[0].w < walls[n].x + walls[n].w && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x - player[0].w;
    }
}

function moveCamera() {
    camera.x = (player[0].x + player[0].w / 2) - cnv.width / 2
    camera.y = (player[0].y + player[0].h / 2) - cnv.height / 2

    if (camera.x < walls[0].x) {
        camera.x = walls[0].x;
    } else if (camera.x > walls[1].x + walls[1].w - cnv.width) {
        camera.x = walls[1].x + walls[1].w - cnv.width;
    }

    if (camera.y < walls[2].y + walls[2].h / 2) {
        camera.y = walls[2].y + walls[2].h / 2;
    } else if (camera.y > walls[3].y + walls[3].h / 2 - cnv.height) {
        camera.y = walls[3].y + walls[3].h / 2 - cnv.height;
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

function reset() {
    walls = [];
    walls.push(newWall(0, 0, 200, 1100, "grey"));
    walls.push(newWall(1850, 0, 200, 1100, "grey"));
    walls.push(newWall(0, 0, 2150, 200, "grey"));
    walls.push(newWall(0, 1100, 2150, 200, "grey"));

    let vert = (walls[3].y - (walls[2].y + walls[2].h));
    let hori = walls[0].w + 320;
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            walls.push(newWall(hori, vert, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 200, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 400, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 600, 150, 20, "grey"));
        } else {
            walls.push(newWall(hori, vert + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 200 + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 400 + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 600 + 100, 150, 20, "grey"));
        }
        hori += 205;
    }

    player = [];
    player.push(newPlayer(walls[0].x + walls[0].w * 1.5, vert, 20, 20, "blue", false, false, false, 5, 0, 1));

    camera = {
        x: 500,
        y: 500
    };
}