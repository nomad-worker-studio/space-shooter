# Space Shooter

A browser-based Space Invaders-style shooting game built with vanilla JavaScript and HTML5 Canvas.

## Play Now

🎮 **[Play the game](https://nomad-worker-studio.github.io/space-shooter/)**

## Features

- **3 Stages** — Progressive difficulty with unique enemy formations
- **Boss Battles** — Face challenging boss enemies at the end of each stage
- **Dynamic Gameplay** — Enemy dive attacks and varied firing patterns
- **Konami Code** — Unlock invincibility with the classic cheat code (↑↑↓↓←→←→BA)
- **Gamepad Support** — Play with keyboard or gamepad
- **No Dependencies** — Pure JavaScript, runs directly in any modern browser

## How to Play

### Controls

**Keyboard:**
- `←` / `→` or `A` / `D` — Move left / right
- `Space` — Fire
- `Enter` — Start game

**Gamepad:**
- Left stick / D-pad — Move
- A button — Fire
- START button — Pause

### Objective

- Destroy all enemy formations to advance to the next stage
- Defeat the boss to complete the stage
- Survive 3 stages to win the game
- Avoid enemy fire and dive attacks

### Scoring

- Type A Enemy: 30 points
- Type B Enemy: 20 points
- Type C Enemy: 10 points
- Boss: 500–1200 points (depending on stage)

## Technical Details

- **Framework:** None (Vanilla JavaScript)
- **Rendering:** HTML5 Canvas API
- **Input:** Keyboard Events + Gamepad API
- **Audio:** Web Audio API
- **Size:** Single HTML file (~23 KB)

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nomad-worker-studio/space-shooter.git
   cd space-shooter
   ```

2. Open in browser:
   ```bash
   # Option 1: Direct file
   open docs/index.html
   
   # Option 2: Local server (if you have Python)
   python3 -m http.server 8000
   # Then visit http://localhost:8000/docs/
   ```

## Project Structure

```
space-shooter/
├── docs/
│   ├── index.html           ← GitHub Pages entry point
│   ├── concept/CONCEPT.md   ← Game concept
│   └── spec/SPEC.md         ← Game specification
└── src/
    ├── index.html           ← Game source (same as docs/index.html)
    └── style.css            ← Minimal styling
```

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- Gamepad API (optional, keyboard always works)

## License

Public domain. Feel free to fork, modify, and share!

## Credits

Built with ❤️ using Claude AI
