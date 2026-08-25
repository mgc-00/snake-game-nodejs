/**
 * Snake Game (Node.js)
 * 
 * A simple command-line Snake game where the player navigates the snake to consume food 
 * while avoiding collisions with the walls and itself. The game supports movement 
 * using arrow keys and exit game function.
 * 
 * Features:
 * - Dynamic game board size
 * - Collision detection with walls and itself
 * - Food spawning at random locations
 * - Simple ASCII-based graphics
 * 
 * @author MGC-00
 * @version 1.3.0
 * @repository https://github.com/mgc-00
 * @date 14/02/2025
 */


"use strict";

// Game constants
const SH = 'O';  // Snake's head
const SB = 'o';  // Snake's body
const SC = '@';  // Collision
const SF = '&';  // Food
const WC = '+';  // World corner
const WV = '|';  // Vertical wall
const WH = '-';  // Horizontal wall
const WS = ' ';  // Empty space

let WWidth  = Math.floor((process.argv[2] || 30) * 1.7);  // Width increased by 70%
let WHeight = Math.floor((process.argv[3] || 10) * 1.7);  // Height increased by 70%

let Sd  = process.argv[7] || 'S'; // Snake movement direction [N,S,E,W]
let Sl  = process.argv[6] || 3;  // Snake length in segments
let SHy = process.argv[5] || 6;  // Snake head Y coordinate
let SHx = process.argv[4] || 4;  // Snake head X coordinate

let world = createWorld(WWidth, WHeight);
let snake = [[SHx, SHy]];
let hasExceded = false;

// Initialize the world with corners, walls, and snake position
initializeWorld(world, snake);

// Main game loop
spawnFood();
drawWorld(world, snake);

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Listening for keypress input to control snake movement
process.stdin.on('keypress', (s, key) => {
  switch (key.name) {
    case "up":    Sd = 'N'; break;
    case "down":  Sd = 'S'; break;
    case "left":  Sd = 'W'; break;
    case "right": Sd = 'E'; break;
    case "x":     if (key.ctrl) process.exit(); break; // Change to ctrl + x
  }
});

// Periodically update the game
setInterval(() => {
  snakeMovement(snake);
  drawWorld(world, snake);
}, 200);

/**
 * Creates the world matrix
 * @param {number} width - The width of the world
 * @param {number} height - The height of the world
 * @returns {string[][]} - The world matrix
 */
function createWorld(width, height) {
  let world = [];
  for (let row = 0; row < height; row++) {
    world[row] = [];
    for (let col = 0; col < width; col++) {
      world[row][col] = WS;
    }
  }
  return world;
}

/**
 * Initializes the world with corners, walls, and snake position
 * @param {string[][]} world - The world matrix
 * @param {number[][]} snake - The initial snake position
 */
function initializeWorld(world, snake) {
  // Set world corners
  world[0][0] = WC;
  world[WHeight - 1][0] = WC;
  world[0][WWidth - 1] = WC;
  world[WHeight - 1][WWidth - 1] = WC;

  // Set vertical and horizontal walls
  for (let row = 1; row < WHeight - 1; row++) {
    world[row][0] = world[row][WWidth - 1] = WV;
  }
  for (let col = 1; col < WWidth - 1; col++) {
    world[0][col] = world[WHeight - 1][col] = WH;
  }

  // Set initial snake position
  let Br = SHx, Bc = SHy;
  for (let body = 0; body < Sl; body++) {
    switch (Sd.toUpperCase()) {
      case 'W': Bc--; break;
      case 'E': Bc++; break;
      case 'N': Br++; break;
      case 'S': Br--; break;
    }
    if ((0 < Br) && (Br < WHeight - 1) && (0 < Bc) && (Bc < WWidth - 1)) {
      snake.push([Br, Bc]);
    } else {
      hasExceded = true;
      break;
    }
  }
}

/**
 * Serializes the world matrix into an ASCII string
 * @param {string[][]} worldMatrix - The world matrix
 * @param {number[][]} snakeArray - The snake position
 * @returns {string} - The world as a string
 */
function world2string(worldMatrix, snakeArray) {
  let result = "";
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      let snakeSegmentIndex = _inSnake(row, col, snakeArray);
      if (snakeSegmentIndex < 0 || worldMatrix[row][col] === SC) {
        result += worldMatrix[row][col];
      } else {
        result += (snakeSegmentIndex === 0) ? SH : SB;
      }
    }
    result += '\n';
  }
  return result;
}

/**
 * Checks if a position is part of the snake
 * @param {number} r - The row
 * @param {number} c - The column
 * @param {number[][]} snakeArray - The snake position
 * @returns {number} - The index of the snake segment or -1 if not part of the snake
 */
function _inSnake(r, c, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (snakeArray[i][0] === r && snakeArray[i][1] === c) {
      return i;
    }
  }
  return -1;
}

/**
 * Draws the world to the screen
 * @param {string[][]} worldMatrix - The world matrix
 * @param {number[][]} snakeArray - The snake position
 */
function drawWorld(worldMatrix, snakeArray) {
  if (hasExceded) {
    console.warn('Your snakes body has gotten too big!');
  }
  process.stdout.write('\x1Bc');  // Reset the caret position
  process.stdout.write(world2string(worldMatrix, snakeArray));
}

/**
 * Moves the snake based on the current direction
 * @param {number[][]} snake - The snake position
 */
function snakeMovement(snake) {
  let head = snake[0];
  let direction = Sd;

  switch (direction.toUpperCase()) {
    case 'N': SHx = head[0] - 1; SHy = head[1]; break;
    case 'S': SHx = head[0] + 1; SHy = head[1]; break;
    case 'W': SHx = head[0]; SHy = head[1] - 1; break;
    case 'E': SHx = head[0]; SHy = head[1] + 1; break;
  }

  // Check for valid move or game over
  if (isTheFieldEmpty(SHx, SHy)) {
    if (_inSnake(SHx, SHy, snake) < 0) {
      snake.unshift([SHx, SHy]);
      snake.pop();
    } else {
      world[SHx][SHy] = SC;
      drawWorld(world, snake);
      console.log('CRASH! Your snake hit itself. GAME OVER!');
      process.exit(0);
    }
  } else if (isFood(SHx, SHy)) {
    world[SHx][SHy] = WS;
    snake.unshift([SHx, SHy]);
    spawnFood();
  } else {
    world[SHx][SHy] = SC;
    drawWorld(world, snake);
    console.log('CRASH! Your snake has hit the wall. GAME OVER!');
    process.exit(0);
  }
}

/**
 * Checks if a position is empty
 * @param {number} r - The row
 * @param {number} c - The column
 * @returns {boolean} - True if the field is empty, false otherwise
 */
function isTheFieldEmpty(r, c) {
  return world[r][c] === WS;
}

/**
 * Checks if a position contains food
 * @param {number} r - The row
 * @param {number} c - The column
 * @returns {boolean} - True if the field contains food, false otherwise
 */
function isFood(r, c) {
  return world[r][c] === SF;
}

/**
 * Generates a random number between min and max
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - A random number between min and max
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Spawns food in the world at a random location
 * @param {number} r - The row (optional)
 * @param {number} c - The column (optional)
 */
function spawnFood(r, c) {
  if (!r || !c) {
    do {
      r = getRandomNumber(1, WHeight - 2);
      c = getRandomNumber(1, WWidth - 2);
    } while (isTheFieldEmpty(r, c) && _inSnake(r, c, snake));
  }
  world[r][c] = SF;
}
