import { Bird } from './bird.js';
import { Pipe } from './pipe.js';
import { GameConfig, GameState, DEFAULT_CONFIG } from './types.js';
import { checkCollision, drawGround, drawBackground, drawText } from './utils.js';

/**
 * Main game class that manages the game loop, state, and rendering
 */
export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private config: GameConfig;
    private state: GameState = GameState.MENU;
    private bird: Bird;
    private pipes: Pipe[] = [];
    private score: number = 0;
    private highScore: number = 0;
    private frameCount: number = 0;
    private animationId: number | null = null;

    constructor(canvasId: string, config: Partial<GameConfig> = {}) {
        // Get canvas and context
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
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
        
        // Initial render
        this.render();
    }

    /**
     * Sets up keyboard and mouse event listeners
     */
    private setupEventListeners(): void {
        // Keyboard input
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });

        // Mouse/touch input
        this.canvas.addEventListener('mousedown', () => this.handleInput());
        this.canvas.addEventListener('touchstart', (e: TouchEvent) => {
            e.preventDefault();
            this.handleInput();
        });
    }

    /**
     * Handles user input (jump action)
     */
    private handleInput(): void {
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
    private startGame(): void {
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
    private resetGame(): void {
        this.state = GameState.MENU;
        this.pipes = [];
        this.bird.reset();
        this.render();
    }

    /**
     * Main game loop
     */
    private gameLoop(): void {
        if (this.state !== GameState.PLAYING) return;

        this.update();
        this.render();

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Updates game state (positions, collisions, score)
     */
    private update(): void {
        this.frameCount++;

        // Update bird
        this.bird.update();

        // Spawn new pipes
        if (this.frameCount % this.config.pipeSpawnInterval === 0) {
            this.pipes.push(new Pipe(
                this.config, 
                this.canvas.height, 
                this.config.groundHeight
            ));
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
            if (
                checkCollision(birdBox, pipe.getTopBoundingBox()) ||
                checkCollision(birdBox, pipe.getBottomBoundingBox())
            ) {
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
    private render(): void {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        drawBackground(this.ctx, this.canvas.width, this.canvas.height);

        // Draw pipes
        for (const pipe of this.pipes) {
            pipe.draw(this.ctx);
        }

        // Draw ground
        drawGround(
            this.ctx, 
            this.canvas.width, 
            this.canvas.height, 
            this.config.groundHeight
        );

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
     * Renders the menu screen
     */
    private renderMenu(): void {
        drawText(this.ctx, 'FLAPPY BIRD', this.canvas.width / 2, 180, 48, '#f4d03f');
        drawText(this.ctx, 'Press SPACE or CLICK to Start', this.canvas.width / 2, 300, 20, '#fff');
        
        if (this.highScore > 0) {
            drawText(this.ctx, `High Score: ${this.highScore}`, this.canvas.width / 2, 350, 20, '#fff');
        }
    }

    /**
     * Renders the score during gameplay
     */
    private renderPlaying(): void {
        drawText(this.ctx, `${this.score}`, this.canvas.width / 2, 80, 48, '#fff');
    }

    /**
     * Renders the game over screen
     */
    private renderGameOver(): void {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        drawText(this.ctx, 'GAME OVER', this.canvas.width / 2, 200, 48, '#e74c3c');
        drawText(this.ctx, `Score: ${this.score}`, this.canvas.width / 2, 280, 28, '#fff');
        drawText(this.ctx, `High Score: ${this.highScore}`, this.canvas.width / 2, 320, 24, '#f4d03f');
        drawText(this.ctx, 'Press SPACE or CLICK to Restart', this.canvas.width / 2, 400, 18, '#fff');
    }

    /**
     * Handles game over state
     */
    private gameOver(): void {
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
    public destroy(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
    }
}
