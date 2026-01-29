/**
 * Represents a pair of pipes (top and bottom) that the bird must navigate through
 */
export class Pipe {
    constructor(config, canvasHeight, groundHeight) {
        this.passed = false;
        this.pipeColor = '#2ecc71';
        this.pipeBorderColor = '#27ae60';
        this.pipeCapColor = '#229954';
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
    update(speed) {
        this.x -= speed;
    }
    /**
     * Renders the pipe pair on the canvas
     */
    draw(ctx) {
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
    drawPipe(ctx, x, y, width, height, isTop) {
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
    isOffScreen() {
        return this.x + this.width < 0;
    }
    /**
     * Returns true if the bird has passed this pipe (for scoring)
     */
    hasPassed() {
        return this.passed;
    }
    /**
     * Marks the pipe as passed
     */
    markPassed() {
        this.passed = true;
    }
    /**
     * Returns the X position of the pipe
     */
    getX() {
        return this.x;
    }
    /**
     * Returns the width of the pipe
     */
    getWidth() {
        return this.width;
    }
    /**
     * Gets the bounding box for the top pipe
     */
    getTopBoundingBox() {
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
    getBottomBoundingBox() {
        const bottomY = this.topHeight + this.gap;
        return {
            x: this.x,
            y: bottomY,
            width: this.width,
            height: this.canvasHeight - this.groundHeight - bottomY
        };
    }
}
//# sourceMappingURL=pipe.js.map