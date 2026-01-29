/**
 * Type definitions for the Flappy Bird game
 */

/** Represents the position of an object in 2D space */
export interface Position {
    x: number;
    y: number;
}

/** Represents the dimensions of an object */
export interface Dimensions {
    width: number;
    height: number;
}

/** Represents a rectangle for collision detection */
export interface BoundingBox extends Position, Dimensions {}

/** Game states */
export enum GameState {
    MENU = 'menu',
    PLAYING = 'playing',
    GAME_OVER = 'gameOver'
}

/** Configuration constants for the game */
export interface GameConfig {
    canvasWidth: number;
    canvasHeight: number;
    gravity: number;
    jumpStrength: number;
    pipeSpeed: number;
    pipeGap: number;
    pipeWidth: number;
    pipeSpawnInterval: number;
    birdSize: number;
    groundHeight: number;
}

/** Default game configuration */
export const DEFAULT_CONFIG: GameConfig = {
    canvasWidth: 400,
    canvasHeight: 600,
    gravity: 0.5,
    jumpStrength: -8,
    pipeSpeed: 3,
    pipeGap: 150,
    pipeWidth: 60,
    pipeSpawnInterval: 120,
    birdSize: 30,
    groundHeight: 50
};
