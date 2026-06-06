# Kingdom Builder — Source Code Export
Generated: 2026-06-06T14:08:13.183Z

## Structure
```
src/
  App.jsx                    — Router
  index.css                  — Global styles & design tokens
  pages/Game.jsx             — Main game page
  components/game/           — All game UI components
  lib/                       — Game logic, constants, sprite storage
  assets/                    — Exported localStorage data (sprites, hero defs, overrides)
```

## Assets
All pixel-art sprites and editor customizations are exported to `src/assets/` as JSON files.
To reload them in a new environment, import each JSON and write it back to the corresponding
localStorage key (e.g. `building_sprites_v1`).

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Base44 SDK (cloud database & auth)
- Canvas-based isometric renderer (no game engine — pure vanilla canvas)

## Dev Mode
Passcode: `007342` — enables pixel editors, stat editors, hero creators, and this export tool.
