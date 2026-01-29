import { BoundingBox, GameConfig } from './types.js';
/**
 * Represents the bird/player character in the game
 */
export declare class Bird {
    private position;
    private velocity;
    private readonly size;
    private readonly config;
    private readonly color;
    private readonly eyeColor;
    private readonly pupilColor;
    private readonly beakColor;
    private rotation;
    constructor(config: GameConfig, startX?: number, startY?: number);
    /**
     * Makes the bird jump (negative velocity = upward movement)
     */
    jump(): void;
    /**
     * Updates the bird's position based on velocity and gravity
     */
    update(): void;
    /**
     * Renders the bird on the canvas
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns the bird's bounding box for collision detection
     */
    getBoundingBox(): BoundingBox;
    /**
     * Gets the current Y position
     */
    getY(): number;
    /**
     * Resets the bird to initial state
     */
    reset(startY?: number): void;
}
