const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Monster truck
const truck = {
    x: 50,
    y: 350,
    width: 50,
    height: 30,
    speed: 5,
    dy: 0,
    gravity: 0.5,
    jumpStrength: -10,
    grounded: false
};

// Obstacles
const obstacles = [
    { x: 300, y: 350, width: 50, height: 50 },
    { x: 500, y: 300, width: 50, height: 100 },
    { x: 700, y: 350, width: 50, height: 50 }
];

// Controls
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function update() {
    // Movement
    if (keys['ArrowRight']) {
        truck.x += truck.speed;
    }
    if (keys['ArrowLeft']) {
        truck.x -= truck.speed;
    }
    if (keys['ArrowUp'] && truck.grounded) {
        truck.dy = truck.jumpStrength;
        truck.grounded = false;
    }

    // Apply gravity
    truck.dy += truck.gravity;
    truck.y += truck.dy;

    // Collision detection with ground
    if (truck.y + truck.height > canvas.height) {
        truck.y = canvas.height - truck.height;
        truck.dy = 0;
        truck.grounded = true;
    }

    // Collision detection with obstacles
    obstacles.forEach(obstacle => {
        if (
            truck.x < obstacle.x + obstacle.width &&
            truck.x + truck.width > obstacle.x &&
            truck.y < obstacle.y + obstacle.height &&
            truck.y + truck.height > obstacle.y
        ) {
            // Simple collision response
            truck.x = 50; // Reset truck position
            truck.y = 350;
            truck.dy = 0;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw truck
    ctx.fillStyle = 'red';
    ctx.fillRect(truck.x, truck.y, truck.width, truck.height);

    // Draw obstacles
    ctx.fillStyle = 'gray';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
	