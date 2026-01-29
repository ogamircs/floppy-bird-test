import { BoundingBox, GameConfig } from './types.js';
/**
 * Represents a pair of pipes (top and bottom) that the bird must navigate through
 */
export declare class Pipe {
    private x;
    private readonly topHeight;
    private readonly gap;
    private readonly width;
    private readonly canvasHeight;
    private readonly groundHeight;
    private passed;
    private readonly pipeColor;
    private readonly pipeBorderColor;
    private readonly pipeCapColor;
    constructor(config: GameConfig, canvasHeight: number, groundHeight: number);
    /**
     * Moves the pipe to the left
     */
    update(speed: number): void;
    /**
     * Renders the pipe pair on the canvas
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * Draws a single pipe with cap
     */
    private drawPipe;
    /**
     * Returns true if the pipe has moved off screen
     */
    isOffScreen(): boolean;
    /**
     * Returns true if the bird has passed this pipe (for scoring)
     */
    hasPassed(): boolean;
    /**
     * Marks the pipe as passed
     */
    markPassed(): void;
    /**
     * Returns the X position of the pipe
     */
    getX(): number;
    /**
     * Returns the width of the pipe
     */
    getWidth(): number;
    /**
     * Gets the bounding box for the top pipe
     */
    getTopBoundingBox(): BoundingBox;
    /**
     * Gets the bounding box for the bottom pipe
     */
    getBottomBoundingBox(): BoundingBox;
}
