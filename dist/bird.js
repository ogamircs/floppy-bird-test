/**
 * Represents the bird/player character in the game
 */
export class Bird {
    constructor(config, startX = 100, startY = 250) {
        this.color = '#f4d03f';
        this.eyeColor = '#fff';
        this.pupilColor = '#000';
        this.beakColor = '#e67e22';
        this.rotation = 0;
        this.config = config;
        this.size = config.birdSize;
        this.position = { x: startX, y: startY };
        this.velocity = 0;
    }
    /**
     * Makes the bird jump (negative velocity = upward movement)
     */
    jump() {
        this.velocity = this.config.jumpStrength;
    }
    /**
     * Updates the bird's position based on velocity and gravity
     */
    update() {
        // Apply gravity
        this.velocity += this.config.gravity;
        this.position.y += this.velocity;
        // Update rotation based on velocity (for visual effect)
        this.rotation = Math.min(Math.max(this.velocity * 3, -30), 90);
        // Prevent bird from going above the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
        }
    }
    /**
     * Renders the bird on the canvas
     */
    draw(ctx) {
        ctx.save();
        // Move to bird position and rotate
        ctx.translate(this.position.x + this.size / 2, this.position.y + this.size / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        // Draw bird body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Draw eye
        ctx.fillStyle = this.eyeColor;
        ctx.beginPath();
        ctx.arc(this.size / 4, -this.size / 6, this.size / 6, 0, Math.PI * 2);
        ctx.fill();
        // Draw pupil
        ctx.fillStyle = this.pupilColor;
        ctx.beginPath();
        ctx.arc(this.size / 3, -this.size / 6, this.size / 12, 0, Math.PI * 2);
        ctx.fill();
        // Draw beak
        ctx.fillStyle = this.beakColor;
        ctx.beginPath();
        ctx.moveTo(this.size / 3, this.size / 8);
        ctx.lineTo(this.size / 1.5, this.size / 4);
        ctx.lineTo(this.size / 3, this.size / 3);
        ctx.closePath();
        ctx.fill();
        // Draw wing
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.ellipse(-this.size / 6, this.size / 6, this.size / 4, this.size / 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    /**
     * Returns the bird's bounding box for collision detection
     */
    getBoundingBox() {
        // Slightly smaller than visual size for forgiving collisions
        const hitboxPadding = 4;
        return {
            x: this.position.x + hitboxPadding,
            y: this.position.y + hitboxPadding,
            width: this.size - hitboxPadding * 2,
            height: this.size - hitboxPadding * 2
        };
    }
    /**
     * Gets the current Y position
     */
    getY() {
        return this.position.y;
    }
    /**
     * Resets the bird to initial state
     */
    reset(startY = 250) {
        this.position.y = startY;
        this.velocity = 0;
        this.rotation = 0;
    }
}
//# sourceMappingURL=bird.js.map