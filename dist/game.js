import { Bird } from './bird.js';
import { Pipe } from './pipe.js';
import { GameState, DEFAULT_CONFIG } from './types.js';
import { checkCollision } from './utils.js';
/**
 * Main game class that manages the game loop, state, and rendering
 */
export class Game {
    constructor(canvasId, config = {}) {
        this.state = GameState.MENU;
        this.pipes = [];
        this.score = 0;
        this.highScore = 0;
        this.frameCount = 0;
        this.animationId = null;
        // Get canvas and context
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get 2D rendering context');
        }
        this.canvas = canvas;
        this.ctx = ctx;
        // Merge default config with any provided config
        this.config = { ...DEFAULT_CONFIG, ...config };
        // Initialize bird
        this.bird = new Bird(this.config);
        // Set up event listeners
        this.setupEventListeners();
        // Initial render - deferred to ensure canvas is ready
        requestAnimationFrame(() => this.render());
    }
    /**
     * Sets up keyboard and mouse event listeners
     */
    setupEventListeners() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });
        // Mouse/touch input
        this.canvas.addEventListener('mousedown', () => this.handleInput());
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput();
        });
    }
    /**
     * Handles user input (jump action)
     */
    handleInput() {
        switch (this.state) {
            case GameState.MENU:
                this.startGame();
                break;
            case GameState.PLAYING:
                this.bird.jump();
                break;
            case GameState.GAME_OVER:
                this.resetGame();
                break;
        }
    }
    /**
     * Starts the game from the menu
     */
    startGame() {
        this.state = GameState.PLAYING;
        this.score = 0;
        this.pipes = [];
        this.frameCount = 0;
        this.bird.reset();
        this.gameLoop();
    }
    /**
     * Resets the game after game over
     */
    resetGame() {
        this.state = GameState.MENU;
        this.pipes = [];
        this.bird.reset();
        this.render();
    }
    /**
     * Main game loop
     */
    gameLoop() {
        if (this.state !== GameState.PLAYING)
            return;
        this.update();
        this.render();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    /**
     * Updates game state (positions, collisions, score)
     */
    update() {
        this.frameCount++;
        // Update bird
        this.bird.update();
        // Spawn new pipes
        if (this.frameCount % this.config.pipeSpawnInterval === 0) {
            this.pipes.push(new Pipe(this.config, this.canvas.height, this.config.groundHeight));
        }
        // Update pipes and check for scoring
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.update(this.config.pipeSpeed);
            // Check if bird passed the pipe
            if (!pipe.hasPassed() && pipe.getX() + pipe.getWidth() < this.bird.getBoundingBox().x) {
                pipe.markPassed();
                this.score++;
            }
            // Remove off-screen pipes
            if (pipe.isOffScreen()) {
                this.pipes.splice(i, 1);
                continue;
            }
            // Check collision with pipes
            const birdBox = this.bird.getBoundingBox();
            if (checkCollision(birdBox, pipe.getTopBoundingBox()) ||
                checkCollision(birdBox, pipe.getBottomBoundingBox())) {
                this.gameOver();
                return;
            }
        }
        // Check collision with ground or ceiling
        const birdBox = this.bird.getBoundingBox();
        const groundY = this.canvas.height - this.config.groundHeight;
        if (birdBox.y + birdBox.height >= groundY || birdBox.y <= 0) {
            this.gameOver();
        }
    }
    /**
     * Renders the current game state
     */
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw background
        this.drawBackground();
        // Draw pipes
        for (const pipe of this.pipes) {
            pipe.draw(this.ctx);
        }
        // Draw ground
        this.drawGround();
        // Draw bird
        this.bird.draw(this.ctx);
        // Draw UI based on game state
        switch (this.state) {
            case GameState.MENU:
                this.renderMenu();
                break;
            case GameState.PLAYING:
                this.renderPlaying();
                break;
            case GameState.GAME_OVER:
                this.renderGameOver();
                break;
        }
    }
    /**
     * Draws the background (sky with clouds)
     */
    drawBackground() {
        // Draw gradient sky
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw some clouds
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.drawCloud(50, 80, 40);
        this.drawCloud(200, 120, 50);
        this.drawCloud(320, 60, 35);
        this.drawCloud(150, 200, 30);
    }
    /**
     * Draws a cloud shape
     */
    drawCloud(x, y, size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.4, y, size * 0.6, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
        this.ctx.arc(x + size * 0.4, y - size * 0.3, size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    /**
     * Draws the ground
     */
    drawGround() {
        const groundY = this.canvas.height - this.config.groundHeight;
        // Draw ground body
        this.ctx.fillStyle = '#d4a373';
        this.ctx.fillRect(0, groundY, this.canvas.width, this.config.groundHeight);
        // Draw grass on top
        this.ctx.fillStyle = '#2ecc71';
        this.ctx.fillRect(0, groundY, this.canvas.width, 10);
        // Draw ground texture lines
        this.ctx.strokeStyle = '#bc8a5f';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < this.canvas.width; i += 30) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, groundY + 15);
            this.ctx.lineTo(i + 15, groundY + 25);
            this.ctx.stroke();
        }
    }
    /**
     * Draws text with a shadow/outline effect
     */
    drawText(text, x, y, fontSize = 30, color = '#fff', align = 'center') {
        this.ctx.font = `bold ${fontSize}px 'Segoe UI', Arial, sans-serif`;
        this.ctx.textAlign = align;
        // Draw shadow/outline
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeText(text, x, y);
        // Draw text
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }
    /**
     * Renders the menu screen
     */
    renderMenu() {
        this.drawText('FLAPPY BIRD', this.canvas.width / 2, 180, 48, '#f4d03f');
        this.drawText('Press SPACE or CLICK to Start', this.canvas.width / 2, 300, 20, '#fff');
        if (this.highScore > 0) {
            this.drawText(`High Score: ${this.highScore}`, this.canvas.width / 2, 350, 20, '#fff');
        }
    }
    /**
     * Renders the score during gameplay
     */
    renderPlaying() {
        this.drawText(`${this.score}`, this.canvas.width / 2, 80, 48, '#fff');
    }
    /**
     * Renders the game over screen
     */
    renderGameOver() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawText('GAME OVER', this.canvas.width / 2, 200, 48, '#e74c3c');
        this.drawText(`Score: ${this.score}`, this.canvas.width / 2, 280, 28, '#fff');
        this.drawText(`High Score: ${this.highScore}`, this.canvas.width / 2, 320, 24, '#f4d03f');
        this.drawText('Press SPACE or CLICK to Restart', this.canvas.width / 2, 400, 18, '#fff');
    }
    /**
     * Handles game over state
     */
    gameOver() {
        this.state = GameState.GAME_OVER;
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        // Cancel animation frame
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.render();
    }
    /**
     * Cleans up event listeners (call when destroying the game)
     */
    destroy() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
    }
}
//# sourceMappingURL=game.js.map