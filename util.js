/**
 * Snake Game Util
 * 
 * A collection of helper functions for the Snake game, including random number generation, 
 * grid checks, and rendering functions. These utilities help manage game logic, ensuring 
 * smooth gameplay and proper world interactions.
 * 
 * Features:
 * - Generate random numbers within a range
 * - Check if a position is empty, contains food, or is occupied by the snake
 * - Validate if a position is within world boundaries
 * - Render the world grid in the console
 * 
 * @author MGC-00
 * @version 1.3.0
 * @repository https://github.com/mgc-00
 * @date 14/02/2025
 */

/**
 * Generates a random number between a specified minimum and maximum.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} - A random number between min and max.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Checks if a given position is empty in the world grid.
 * @param {string[][]} world - The world grid (2D array).
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @returns {boolean} - Returns true if the position is empty, false otherwise.
 */
function isFieldEmpty(world, row, col) {
  return world[row][col] === ' ';
}

/**
 * Checks if the given position contains food.
 * @param {string[][]} world - The world grid (2D array).
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @returns {boolean} - Returns true if the position contains food, false otherwise.
 */
function isFood(world, row, col) {
  return world[row][col] === '$';
}

/**
 * Checks if a position is part of the snake's body.
 * @param {number[][]} snake - The array representing the snake's body.
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @returns {boolean} - Returns true if the position is part of the snake, false otherwise.
 */
function isInSnake(snake, row, col) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i][0] === row && snake[i][1] === col) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a given position is within the bounds of the world grid.
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @param {number} worldWidth - The width of the world grid.
 * @param {number} worldHeight - The height of the world grid.
 * @returns {boolean} - Returns true if the position is inside the grid, false if it's out of bounds.
 */
function isInBounds(row, col, worldWidth, worldHeight) {
  return row >= 0 && col >= 0 && row < worldHeight && col < worldWidth;
}

/**
 * Draws the world grid to the console.
 * @param {string[][]} world - The world grid (2D array).
 */
function drawWorld(world) {
  console.clear();
  let output = '';
  for (let row = 0; row < world.length; row++) {
    output += world[row].join('') + '\n';
  }
  console.log(output);
}

module.exports = {
  getRandomNumber,
  isFieldEmpty,
  isFood,
  isInSnake,
  isInBounds,
  drawWorld,
};
