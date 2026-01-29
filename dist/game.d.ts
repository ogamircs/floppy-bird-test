import { GameConfig } from './types.js';
/**
 * Main game class that manages the game loop, state, and rendering
 */
export declare class Game {
    private canvas;
    private ctx;
    private config;
    private state;
    private bird;
    private pipes;
    private score;
    private highScore;
    private frameCount;
    private animationId;
    constructor(canvasId: string, config?: Partial<GameConfig>);
    /**
     * Sets up keyboard and mouse event listeners
     */
    private setupEventListeners;
    /**
     * Handles user input (jump action)
     */
    private handleInput;
    /**
     * Starts the game from the menu
     */
    private startGame;
    /**
     * Resets the game after game over
     */
    private resetGame;
    /**
     * Main game loop
     */
    private gameLoop;
    /**
     * Updates game state (positions, collisions, score)
     */
    private update;
    /**
     * Renders the current game state
     */
    private render;
    /**
     * Draws the background (sky with clouds)
     */
    private drawBackground;
    /**
     * Draws a cloud shape
     */
    private drawCloud;
    /**
     * Draws the ground
     */
    private drawGround;
    /**
     * Draws text with a shadow/outline effect
     */
    private drawText;
    /**
     * Renders the menu screen
     */
    private renderMenu;
    /**
     * Renders the score during gameplay
     */
    private renderPlaying;
    /**
     * Renders the game over screen
     */
    private renderGameOver;
    /**
     * Handles game over state
     */
    private gameOver;
    /**
     * Cleans up event listeners (call when destroying the game)
     */
    destroy(): void;
}
