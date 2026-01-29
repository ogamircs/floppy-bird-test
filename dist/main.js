import { Game } from './game.js';
/**
 * Main entry point for the Flappy Bird game
 */
function init() {
    try {
        const game = new Game('gameCanvas');
        // Expose game instance for debugging (optional)
        window.flappyBirdGame = game;
    }
    catch (error) {
        console.error('Failed to initialize game:', error);
        document.body.innerHTML = `
            <div style="color: white; text-align: center; padding: 50px;">
                <h1>Error Loading Game</h1>
                <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
        `;
    }
}
// Start the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
//# sourceMappingURL=main.js.map