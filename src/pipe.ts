import { Position, BoundingBox, GameConfig } from './types.js';

/**
 * Represents a pair of pipes (top and bottom) that the bird must navigate through
 */
export class Pipe {
    private x: number;
    private readonly topHeight: number;
    private readonly gap: number;
    private readonly width: number;
    private readonly canvasHeight: number;
    private readonly groundHeight: number;
    private passed: boolean = false;
    
    private readonly pipeColor: string = '#2ecc71';
    private readonly pipeBorderColor: string = '#27ae60';
    private readonly pipeCapColor: string = '#229954';

    constructor(config: GameConfig, canvasHeight: number, groundHeight: number) {
        this.x = config.canvasWidth;
        this.width = config.pipeWidth;
        this.gap = config.pipeGap;
        this.canvasHeight = canvasHeight;
        this.groundHeight = groundHeight;
        
        // Random height for the top pipe (leave room for gap and bottom pipe)
        const minHeight = 50;
        const maxHeight = canvasHeight - groundHeight - this.gap - minHeight;
        this.topHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
    }

    /**
     * Moves the pipe to the left
     */
    public update(speed: number): void {
        this.x -= speed;
    }

    /**
     * Renders the pipe pair on the canvas
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        const bottomY = this.topHeight + this.gap;
        const bottomHeight = this.canvasHeight - this.groundHeight - bottomY;

        // Draw top pipe
        this.drawPipe(ctx, this.x, 0, this.width, this.topHeight, true);
        
        // Draw bottom pipe
        this.drawPipe(ctx, this.x, bottomY, this.width, bottomHeight, false);
    }

    /**
     * Draws a single pipe with cap
     */
    private drawPipe(
        ctx: CanvasRenderingContext2D, 
        x: number, 
        y: number, 
        width: number, 
        height: number, 
        isTop: boolean
    ): void {
        const capHeight = 20;
        const capExtraWidth = 6;

        // Draw pipe body
        ctx.fillStyle = this.pipeColor;
        ctx.fillRect(x, y, width, height);
        
        // Draw pipe border
        ctx.strokeStyle = this.pipeBorderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Draw pipe cap
        const capY = isTop ? y + height - capHeight : y;
        ctx.fillStyle = this.pipeCapColor;
        ctx.fillRect(x - capExtraWidth / 2, capY, width + capExtraWidth, capHeight);
        ctx.strokeRect(x - capExtraWidth / 2, capY, width + capExtraWidth, capHeight);

        // Draw highlight line for 3D effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 5, y);
        ctx.lineTo(x + 5, y + height);
        ctx.stroke();
    }

    /**
     * Returns true if the pipe has moved off screen
     */
    public isOffScreen(): boolean {
        return this.x + this.width < 0;
    }

    /**
     * Returns true if the bird has passed this pipe (for scoring)
     */
    public hasPassed(): boolean {
        return this.passed;
    }

    /**
     * Marks the pipe as passed
     */
    public markPassed(): void {
        this.passed = true;
    }

    /**
     * Returns the X position of the pipe
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Returns the width of the pipe
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * Gets the bounding box for the top pipe
     */
    public getTopBoundingBox(): BoundingBox {
        return {
            x: this.x,
            y: 0,
            width: this.width,
            height: this.topHeight
        };
    }

    /**
     * Gets the bounding box for the bottom pipe
     */
    public getBottomBoundingBox(): BoundingBox {
        const bottomY = this.topHeight + this.gap;
        return {
            x: this.x,
            y: bottomY,
            width: this.width,
            height: this.canvasHeight - this.groundHeight - bottomY
        };
    }
}
