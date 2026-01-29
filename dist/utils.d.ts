import { BoundingBox } from './types.js';
/**
 * Utility functions for the game
 */
/**
 * Checks if two bounding boxes intersect (AABB collision detection)
 */
export declare function checkCollision(a: BoundingBox, b: BoundingBox): boolean;
/**
 * Draws the ground
 */
export declare function drawGround(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, groundHeight: number): void;
/**
 * Draws the background (sky with clouds)
 */
export declare function drawBackground(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void;
/**
 * Draws text with a shadow/outline effect
 */
export declare function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize?: number, color?: string, align?: CanvasTextAlign): void;
