document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const snakeElement = document.getElementById('snake');
    const foodElement = document.getElementById('food');
    let snake = [{ x: 150, y: 150 }];
    let food = getRandomPosition();
    let dx = 10;
    let dy = 0;

    function drawSnake() {
        snake.forEach(segment => {
            const snakePart = document.createElement('div');
            snakePart.style.width = '10px';
            snakePart.style.height = '10px';
            snakePart.style.backgroundColor = 'black';
            snakePart.style.position = 'absolute';
            snakePart.style.left = `${segment.x}px`;
            snakePart.style.top = `${segment.y}px`;
            snakeElement.appendChild(snakePart);
        });
    }

    function drawFood() {
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
    }

    function getRandomPosition() {
        const x = Math.floor(Math.random() * 30) * 10;
        const y = Math.floor(Math.random() * 30) * 10;
        return { x, y };
    }

    function update() {
        const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(newHead);
        if (newHead.x === food.x && newHead.y === food.y) {
            food = getRandomPosition();
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= 300 ||
            snake[0].y < 0 ||
            snake[0].y >= 300 ||
            snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
        ) {
            clearInterval(interval);
            alert('Game Over!');
        }
    }

    function clearCanvas() {
        snakeElement.innerHTML = '';
    }

    function gameLoop() {
        clearCanvas();
        update();
        checkCollision();
        drawSnake();
        drawFood();
    }

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (dy !== 10) {
                    dx = 0;
                    dy = -10;
                }
                break;
            case 'ArrowDown':
                if (dy !== -10) {
                    dx = 0;
                    dy = 10;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 10) {
                    dx = -10;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -10) {
                    dx = 10;
                    dy = 0;
                }
                break;
        }
    });

    let interval = setInterval(gameLoop, 100);
});