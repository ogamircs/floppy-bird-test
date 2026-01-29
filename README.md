# Flappy Bird - TypeScript

A fully-featured Flappy Bird game built with TypeScript and HTML5 Canvas.

![Game Screenshot](screenshot.png)

## Features

- 🎮 Smooth 60fps gameplay
- 🐦 Animated bird with rotation physics
- 🌿 Moving pipes with collision detection
- ☁️ Beautiful sky background with clouds
- 📊 Score tracking with high score persistence (session)
- 🎯 Space bar or click/tap to jump
- 📱 Works on desktop and mobile devices

## Project Structure

```
flappy-bird-ts/
├── src/
│   ├── types.ts      # Type definitions and interfaces
│   ├── bird.ts       # Bird class (player character)
│   ├── pipe.ts       # Pipe class (obstacles)
│   ├── utils.ts      # Utility functions (collision, drawing)
│   ├── game.ts       # Main game logic and loop
│   └── main.ts       # Entry point
├── dist/             # Compiled JavaScript output
├── index.html        # HTML page
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## How to Run

### Option 1: Quick Start (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the TypeScript:
   ```bash
   npm run build
   ```

3. Serve the game:
   ```bash
   npm run serve
   ```

   This will open your browser automatically at `http://localhost:8080`.

### Option 2: Manual Setup

If you don't want to use the built-in server:

1. Install TypeScript globally (if not already installed):
   ```bash
   npm install -g typescript
   ```

2. Compile the TypeScript files:
   ```bash
   tsc
   ```

3. Open `index.html` in your browser using a local server.

   **Note:** You must use a local server (not `file://`) due to ES modules. Options:
   - VS Code: Install "Live Server" extension and right-click → "Open with Live Server"
   - Python: `python -m http.server 8080`
   - Node.js: `npx http-server . -p 8080`

### Option 3: Watch Mode (Development)

For active development with auto-recompile:

```bash
# Terminal 1: Watch for TypeScript changes
npm run watch

# Terminal 2: Serve the files
npm run serve
```

## Controls

| Input | Action |
|-------|--------|
| `SPACE` | Jump / Start / Restart |
| `CLICK` | Jump / Start / Restart |
| `TOUCH` | Jump / Start / Restart (mobile) |

## Game Mechanics

- Press SPACE or CLICK to make the bird jump
- Avoid hitting the pipes or the ground
- Each pipe pair you pass = 1 point
- Try to beat your high score!

## Technical Details

### Built With
- **TypeScript** - Type-safe JavaScript
- **HTML5 Canvas** - Hardware-accelerated 2D rendering
- **ES Modules** - Modern JavaScript module system

### Collision Detection
Uses AABB (Axis-Aligned Bounding Box) collision detection with slightly forgiving hitboxes for better gameplay feel.

### Performance
- `requestAnimationFrame` for smooth rendering
- Efficient array management for pipes (remove off-screen pipes)
- Minimal DOM manipulation (canvas-based rendering)

## Customization

You can customize game parameters by passing a config object when creating the game:

```typescript
const game = new Game('gameCanvas', {
    gravity: 0.3,           // Slower fall
    jumpStrength: -6,       // Lower jump
    pipeSpeed: 2,           // Slower pipes
    pipeGap: 180,           // Wider gaps
    pipeSpawnInterval: 150  // Less frequent pipes
});
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - Feel free to use this code for learning or your own projects!

## Credits

Built with ❤️ using TypeScript and HTML5 Canvas.
