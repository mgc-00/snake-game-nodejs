"use strict";

// This file contains configuration settings for the game world //

module.exports.WS = ' '; // Show an empty cell in the game world
module.exports.SH = 'O'; // Show the snake's head (the front of the snake)
module.exports.SB = 'o'; // Show the snake's body segments (parts of the snake excluding the head)
module.exports.WV = '|'; // Show the vertical wall (left and right boundaries of the world)
module.exports.WH = '-'; // Show the horizontal wall (top and bottom boundaries of the world)
module.exports.SF = '$'; // Show food items placed in the game world for the snake to consume
module.exports.SC = '*'; // Indicates a collision point, e.g., when the snake hits itself or a wall

