/**
 * Type definitions for the Flappy Bird game
 */
/** Game states */
export var GameState;
(function (GameState) {
    GameState["MENU"] = "menu";
    GameState["PLAYING"] = "playing";
    GameState["GAME_OVER"] = "gameOver";
})(GameState || (GameState = {}));
/** Default game configuration */
export const DEFAULT_CONFIG = {
    canvasWidth: 400,
    canvasHeight: 600,
    gravity: 0.5,
    jumpStrength: -8,
    pipeSpeed: 3,
    pipeGap: 150,
    pipeWidth: 60,
    pipeSpawnInterval: 120,
    birdSize: 30,
    groundHeight: 50
};
//# sourceMappingURL=types.js.map