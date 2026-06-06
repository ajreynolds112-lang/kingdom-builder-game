import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/DevDocumentation.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/DevDocumentation.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X, Download, Edit3, Save, BookOpen } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { getAllCustomHeroes } from "/src/lib/heroData.js";
import { getHeroSprite } from "/src/lib/heroSprites.js";
const STORAGE_KEY = "dev_documentation_v2";
const DEFAULT_SECTIONS = {
  overview: {
    title: "Game Overview",
    icon: "🏰",
    content: `Kingdom Builder is an isometric base-building strategy RPG. You construct and upgrade a kingdom on a large 94×94 isometric tile grid, train heroes, battle through dungeons, and manage resources.

GOAL: Expand your kingdom by unlocking new buildings, upgrading structures, fielding powerful custom heroes, and conquering dungeon territories to earn gems and soul shards.

HOW TO START:
1. A new kingdom is automatically created on first login with starter buildings.
2. Tap any building to open its info panel and begin upgrading.
3. Open the Shop (bottom-right) to buy new buildings.
4. Enter dungeons (bottom-left ⚔️) to earn resources and gems.
5. Use the Altar (🔮) to roll for heroes and deploy them on Hero Bases.

MAP CONTROLS:
- Drag to pan the map.
- Scroll wheel to zoom in/out (min = full-grid view, max = 5× zoom).
- Click a building to open its panel. Click empty space to deselect.
- Right-click during shop placement to place a building at that tile.
- Shift+Click during wall placement: fills a straight line of walls along the nearest axis from the clicked tile outward (confirmed via dialog showing count + cost).
- Right-click a placed wall: selects the contiguous wall group (line). Opens Wall Group Panel.

WALL GROUP PANEL:
- Appears at the bottom of the screen when a wall line is right-click selected.
- UPGRADE ALL: Starts upgrading every wall in the group below the level cap. Shows total gold cost.
- MOVE: Enters ghost move mode for the entire group. Click to commit the new position.
- ROTATE: Rotates a straight wall line 90° around its center point. Blocked if any target tile is occupied.`
  },
  resources: {
    title: "Resources & Economy",
    icon: "💰",
    content: `RESOURCES:
- Gold 💰 — Primary currency. Earned from mines/vaults and dungeon victories. Used for most building upgrades.
- Mana 🔷 — Magic resource. Earned from mana mines/vaults and dungeons. Used for mana-type upgrades.
- Soul Shards 💜 — Rare. Earned from dungeon victories. Used to upgrade Aspects.
- Gems 💎 — Premium currency. Earned by clearing full dungeon territories. Used to speed upgrades, buy resources, and purchase buildings with gems.

PRODUCTION:
- Gold Mines and Gold Vaults passively produce gold per hour.
- Mana Mines passively produce mana per hour.
- Resources tick every 30 seconds and are saved to the cloud database.
- When you return after being offline, the game calculates how many resources you earned while away (capped at vault capacity).
- At Town Hall level 15+, excess resources auto-convert to Resource Packs instead of being wasted.

CAPACITY:
- Gold Capacity is determined by your Gold Vault (Gold Mill) level.
- Mana Capacity is determined by your Mana Vault level.
- Upgrade these buildings to hold more resources.

GEMS:
- Tap the gem counter (top-right) to open the Gem Shop.
- In Dev Mode, you can directly edit your gem count by clicking it.
- Gems can speed up any upgrade: cost = ceil((minutes_remaining)^1.2).`
  },
  buildings: {
    title: "Buildings",
    icon: "🏗️",
    content: `All buildings have a type, level (1–30), HP, upgrade cost/time, and a footprint (grid tiles occupied).

BUILDING TYPES:
- Town Hall 🏰 (4×4) — Central hub. Leveling it unlocks new buildings and increases caps. Costs gold.
- Army Camp ⚔️ (8×8) — Houses troops for dungeon combat.
- Hero Base 🦸 (1×1) — Station a hero here. The hero sprite renders visually on the tile, layered above the base.
- Altar 🔮 (2×2) — Roll for new heroes using gems.
- Gold Mine ⛏️ (2×2) — Produces and stores gold. Collect manually (before TH15).
- Mana Mine 💎 (2×2) — Produces and stores mana.
- Gold Vault (Gold Mill) 🏦 (2×2) — Stores gold, increases gold capacity. Costs mana to upgrade.
- Defense Tower 🗼 (2×2) — Defensive structure.
- Wall 🧱 (1×1) — Barrier tiles. Adjacent walls show visual link-layer overlays when published.
- Armory ⚒️ (2×2) — Gear management.
- Barracks 🏕️ (2×2) — Troop training.
- Warehouse / Mana Vault (2×2) — Resource storage.

UPGRADING:
1. Tap a building to open its panel.
2. View current stats, HP bar, upgrade cost and time.
3. Click Upgrade to start (costs gold/mana).
4. Or click the 💎 button to spend gems and skip cost/timer.
5. Upgrades run in real time. Completed upgrades are detected every 5 seconds.
6. Upgrades that finish while offline are applied on your next login.

MOVING BUILDINGS:
- Open a building's panel → click Move.
- The building enters ghost mode; drag to a valid (green) position and release to place.

BUILDING SPRITES (Rendering):
- Each building renders as a 3D isometric block with a top face, left face, and right face.
- By default, buildings show an emoji icon on the top face.
- After you design a sprite in the Pixel Editor and PUBLISH it ("Send to Game"), the emoji is replaced by your pixel art image rendered onto the top face.
- Published sprites persist across all reloads. Draft sprites (drawn but not published) are only visible in the editor.

SHOP PLACEMENT WORKFLOW:
1. Open Shop (🛒 bottom-right).
2. Select a building category and click BUY (if you have resources) or PLACE (if you have gems).
3. Shop closes. The building now follows your mouse cursor as you move it around the map.
4. Click on a valid location (green zone, no collisions). The building will be placed.
5. If you have enough resources (gold/mana), they are deducted immediately and building is created.
6. If you don't have resources but have gems: a confirmation dialog appears asking "Use X Gems to buy?" — confirm or cancel.
7. If you have neither resources nor gems: the item is greyed out and unavailable.`
  },
  heroes: {
    title: "Heroes",
    icon: "🦸",
    content: `Heroes are your main combat units. They are stationed at Hero Bases and participate in dungeon battles.

HERO STATS: HP, Attack, Defense, Speed.

GETTING HEROES:
1. Open the Altar (🔮 bottom-right).
2. Spend gems to roll. A hero card is revealed.
3. Click "Activate" to permanently add the hero to your roster.
4. Heroes defined in the Hero Creator (dev tool) appear in the roll pool.

STATIONING HEROES:
- Open a Hero Base building panel.
- Assign a hero to station them there.
- Once stationed, the hero's sprite renders visually ON the Hero Base tile.
- The hero sprite always renders ABOVE the Hero Base — it is layered on top.
- This layering applies to both the emoji version and any published pixel art sprite.

HERO SPRITES IN GAME:
- When you publish a hero sprite in the Hero Creator ("Send to Game"), it replaces the default portrait.
- When the Hero Base building also has a published sprite, both render together — base on bottom, hero on top.
- The game uses the "S" (South-facing) direction by default for in-map display.

HERO RARITY: Common, Uncommon, Rare, Epic, Legendary. Higher rarity = better base stats.

ASPECTS:
- Aspects are passive stat bonuses that can be equipped to heroes.
- Upgraded using Soul Shards.
- Each aspect has a type (attack, defense, hp, speed, all) and a stat bonus value.

GEAR:
- Items (weapon, armor, helmet, boots, gloves, ring, amulet, shield) that provide stat bonuses.
- Gear has rarity tiers: Common → Legendary.`
  },
  dungeons: {
    title: "Dungeons & Combat",
    icon: "⚔️",
    content: `DUNGEONS:
- Tap ⚔️ Dungeons (bottom-left) to enter the dungeon screen.
- Dungeons are organized into 4 Territories, each with 10 dungeons.
  - Territory 1: Classic Dungeon 🏰
  - Territory 2: Fire Realm 🔥
  - Territory 3: Ice Realm 🧊
  - Territory 4: Arcane Realm 🌀
- Each territory ends with a Boss Dungeon (level 10 of each territory).
- Clearing ALL 10 dungeons in a territory earns a large gem reward (see territory gem reward in data).

ENTERING COMBAT:
1. Select a territory and dungeon from the Dungeons modal.
2. Your heroes and troops are automatically included.
3. Combat starts in the CombatScreen.

COMBAT SYSTEM (Turn-Based):
- Each round: your heroes and troops attack enemies, enemies counterattack.
- Floating damage numbers appear during attacks.
- Spells can be cast to alter the battle (damage boost, protection, healing).
- If all enemies are defeated → VICTORY. If all your units fall → DEFEAT.

COMBAT REWARDS:
- Victory grants Gold, Mana, and Soul Shards per the dungeon's reward values.
- Territory completion (all 10 dungeons) grants Gems (territory gemReward).

TROOPS:
- Trained in Barracks, housed in Army Camps.
- Types: Swordsman ⚔️, Archer 🏹, Mage 🔮, Tank 🛡️, Cavalry 🐴.
- Each troop type has its own HP, Attack, Defense, and Speed stats.

DUNGEON DATA (Territories & Dungeons):
- Territory and dungeon definitions live in lib/dungeonData.js.
- TERRITORY_DEFS: array of territory objects (name, icon, color, gemReward).
- TERRITORY_DUNGEONS: 2D array [territory][dungeonIndex] of dungeon objects.
  Each dungeon object: { level, name, goldRew, manaRew, shardRew, enemies, bossHp, ... }
- Custom enemy/building layouts per dungeon are saved in localStorage as dungeon_layout_t{T}_d{D}.
- If a custom layout exists for a dungeon, it is loaded in combat instead of the default layout.`
  },
  devTools: {
    title: "Dev Tools",
    icon: "🛠️",
    content: `Dev Mode is locked behind a passcode. Toggle it via Settings ⚙️ (bottom-right) → Dev Mode switch → enter passcode: 007342.

Once active, the bottom-left toolbar gains extra buttons:

━━━━━━━━━━━━━━━━━━━━━━
🏗️ BUILDINGS MENU
━━━━━━━━━━━━━━━━━━━━━━

🎨 Building Design Editor (Pixel Editor)
  What it does: Create custom pixel-art sprites for any building type at any level (1–30).
  How to use:
  1. Select a building type and level from the dropdowns.
  2. Draw on the canvas using the tools on the left.
  3. The sprite auto-saves every stroke — no manual save needed.
  4. To make it appear in the game, click "SEND TO GAME" and confirm.
  Publishing: Only published sprites render in the game. Draft sprites are private to the editor.
  Canvas size: 256×256 pixels.
  Tools: Pencil, Brush (3px), Eraser ⌫, Fill Bucket, Eyedropper, Rectangle Select, Line, Rectangle Outline.
  Brush sizes: 1, 2, 3, 5, 8px. Zoom: scroll wheel to zoom in/out (min 1×, scales to viewport).
  Undo/Redo: Cmd+Z / Cmd+Shift+Z.
  Shift+Click: straight line from last anchor point.
  Copy To: Copy a design to multiple levels at once.
  localStorage: building_sprites_v1 (drafts), published_building_sprites_v1 (published)

📊 Building Stats Editor
  What it does: Override HP, upgrade time (seconds), and resource cost per building type and level.
  How to use:
  1. Select a building type in the sidebar.
  2. Pick a tab: HP, Upgrade Time, or Cost.
  3. Edit any level's value — it auto-saves immediately.
  Blue = overridden value. Grey = using formula default.
  Base formula value shown below any override.
  Reset: Removes overrides for the current building on the active tab.
  localStorage: building_hp_overrides_v1, building_time_overrides_v1, building_cost_overrides_v1

🧱 Wall Layer Editor
  What it does: Draw overlay sprites that appear when two adjacent walls are connected.
  Canvas size: 256×256 pixels.
  How to use:
  1. Select a wall level (1–10) and a link direction (SW, SE, NW, NE).
  2. Draw the overlay sprite that should appear at that junction.
  3. Auto-saves every stroke.
  4. Click "SEND TO GAME" to publish — the overlay will appear in-game when adjacent walls are detected.
  Base wall shown as a faint backdrop for reference (toggle Eye button).
  Scroll wheel on canvas to zoom in/out.
  Undo/Redo: Cmd+Z / Cmd+Shift+Z.
  localStorage: wall_link_layers_v1 (drafts), published_wall_layers_v1 (published)

━━━━━━━━━━━━━━━━━━━━━━
🦸 HEROES MENU
━━━━━━━━━━━━━━━━━━━━━━

🎨 Hero Creator (Sprite Editor)
  What it does: Draw custom pixel-art sprites for hero characters, with 8 directional frames.
  Canvas size: 256×256 pixels.
  How to use:
  1. Select or create a hero from the left panel.
  2. Click a direction in the 3×3 grid (N, NE, E, SE, S, SW, W, NW).
  3. Draw the sprite on the canvas.
  4. Auto-saves every stroke.
  5. Click "SEND TO GAME" to publish — the sprite will appear in-game on Hero Base tiles (using S direction).
  Direction thumbnails update live. Switching directions auto-saves before loading new direction.
  Copy from another direction: copies that sprite onto the current canvas.
  Flip Horizontal: mirrors the canvas horizontally.
  Scroll wheel on canvas to zoom in/out.
  Undo/Redo: Cmd+Z / Cmd+Shift+Z.
  localStorage: hero_sprites_v1 (drafts), published_hero_sprites_v1 (published)

✏️ Hero Editor (Stats Editor)
  What it does: Edit hero stats, rarity, name, and description.
  How to use:
  1. Select a hero from the list.
  2. Edit any field — auto-saves on every change.
  3. Create new hero templates with the + button.
  4. Delete heroes with the trash icon.
  Editable stats: HP, Attack, Defense, Speed, Attack Speed, Range, Crit %, Dodge %, Roll Cost.
  localStorage: hero_definitions_v1

━━━━━━━━━━━━━━━━━━━━━━
OTHER DEV TOOLS
━━━━━━━━━━━━━━━━━━━━━━

⚔️ Dungeon Layout Editor
  What it does: Visually design the building/enemy layout for any dungeon in any territory.
  How to access: Dev Mode → bottom toolbar → Dungeon Editor button.
  Grid: 64×64 isometric tiles. A 4-tile forest ring borders the outer edge (no-build zone).

  NAVIGATION:
  - Drag to pan. Scroll wheel to zoom. Zoom resets to fit-grid on open.
  - Territory selector (left sidebar): click to switch territory. 4 territories total.
  - Dungeon selector (left sidebar): click to switch dungeon within the territory (10 per territory).
  - Right-click a dungeon name to open its Rewards editor (set gold/mana/shards/gems for that dungeon).

  EDITING MODES (left sidebar):
  - Place: click an empty tile to place the selected building type+level. Clicking an occupied tile removes it.
  - Erase: click or drag over a building to delete it. Hovered buildings are highlighted red.
  - Select: click a building to select it; then use the right panel to change its level, move it, or delete it.

  BUILDING PALETTE (right sidebar):
  - Choose building type from the list (all types from BUILDING_DEFS).
  - Choose level (1–30) from the number grid.
  - In Place mode, the hovered tile shows a yellow preview; occupied tiles show a red removal preview.

  WALL PLACEMENT (shift+click in Place mode with wall selected):
  - Shift+click near an existing wall to fill a straight line outward from it along the nearest axis.
  - No cost in editor mode — walls are placed instantly.

  MOVE mode (Select → Move button):
  - After selecting a building, click Move. The building follows your mouse as a ghost.
  - Click any valid tile to commit; invalid tiles are shown in red.

  KEYBOARD SHORTCUTS:
  - Cmd+Z (or Ctrl+Z): Undo last action.
  - Cmd+Option+Z (or Ctrl+Alt+Z): Redo.
  - History depth: 50 states.

  SAVING:
  - Click SAVE (top-right green button) to persist to localStorage.
  - Key format: dungeon_layout_t{territory}_d{dungeonIndex}
  - Saved layouts are loaded automatically in combat for the matching dungeon.

  ENVIRONMENT COLORS:
  - Click the 🎨 Palette button (top bar) to open the color picker.
  - Change background color or grid tile color independently using the spectrum picker.
  - Colors affect only the editor display, not in-game rendering.

  CLEAR:
  - Click CLEAR (top-right red button) and confirm to remove all buildings from the current dungeon.

🔄 Reset Game
  Resets all game PROGRESS only. Creates a fresh kingdom.
  What is DELETED: buildings (levels & positions), rolled heroes, troops, aspects, gear, spells, resource packs, dungeon runs, and all resources.
  What is PRESERVED: all pixel art sprites (draft & published), building stat overrides (HP/time/cost), hero definitions, wall layer sprites, dungeon layouts, and this documentation.
  Requires confirmation. Cannot be undone.

Gem Counter (top-right, dev mode only)
  Click the gem display to directly set your gem count to any value.

━━━━━━━━━━━━━━━━━━━━━━
KEYBOARD SHORTCUTS REFERENCE
━━━━━━━━━━━━━━━━━━━━━━

PIXEL EDITOR / HERO CREATOR / WALL LAYER EDITOR:
  Cmd+Z / Ctrl+Z         Undo last stroke
  Cmd+Shift+Z            Redo (also Cmd+Option+Z in some editors)
  Shift+Click on canvas  Draw a straight line from the last anchor point
  Scroll wheel           Zoom in/out on the canvas

DUNGEON LAYOUT EDITOR:
  Cmd+Z / Ctrl+Z         Undo (50-step history)
  Cmd+Option+Z           Redo
  Shift+Click (wall)     Fill a straight wall line from the clicked tile outward
  Scroll wheel           Zoom canvas in/out
  Drag                   Pan the dungeon grid

MAP (Main Game):
  Scroll wheel           Zoom in/out (clamped to full-grid view minimum)
  Drag                   Pan the isometric map
  Click building         Open building panel
  Click empty            Deselect / close panel
  Right-click (shop)     Place building at hovered tile during shop placement mode
  Shift+Click (shop wall) Fill a straight wall line during wall placement mode
  Right-click (wall)     Select the contiguous wall group (opens Wall Group Panel)`
  },
  publishing: {
    title: "Publishing Sprites",
    icon: "🚀",
    content: `WHAT IS PUBLISHING?

Publishing is the step that makes your pixel art appear in the actual game world. There are two separate storage layers:

1. DRAFT (private) — Saved automatically as you draw. Only visible inside the editor. Key = *_v1 stores.
2. PUBLISHED (live) — What actually renders on the isometric map. Survives all page reloads. Key = published_*_v1 stores.

Publishing copies your current draft to the published layer. The game's isometric renderer always checks for a published sprite first. If none exists, it falls back to the emoji icon.

━━━━━━━━━━━━━━━━━━━━━━
HOW TO PUBLISH
━━━━━━━━━━━━━━━━━━━━━━

Buildings:
1. Open Pixel Editor (Dev Mode → Buildings → Building Design Editor).
2. Select the building type and level you want to publish.
3. Draw your sprite (or load an existing one).
4. Click the yellow "SEND TO GAME" button in the title bar.
5. A confirmation popup appears: "Send to Game?" — click ✓ SEND TO GAME.
6. The button turns green and shows "LIVE" — the sprite is now in-game.
7. Switch to another level/building and repeat as needed.

Wall Link Layers:
1. Open Wall Layer Editor (Dev Mode → Buildings → Wall Layer Editor).
2. Select wall level and link direction.
3. Draw the overlay sprite.
4. Click "SEND TO GAME" → confirm.
5. Adjacent walls of that level will now show this overlay in-game.

Heroes:
1. Open Hero Creator (Dev Mode → Heroes → Create Hero).
2. Select a hero and draw the sprite for a direction (default: S for in-game display).
3. Click "SEND TO GAME" → confirm.
4. Any Hero Base with this hero stationed will render the published sprite above the base.

━━━━━━━━━━━━━━━━━━━━━━
RENDERING LAYERS (Visual Priority)
━━━━━━━━━━━━━━━━━━━━━━

For each building tile, the render order (bottom → top) is:
1. Ground tile (grass)
2. Building 3D faces (left, right, top)
3. Published building sprite (on the top face)
4. Hero sprite (rendered ABOVE the building, at a higher Y offset)
5. Level badge, upgrade indicator, selection outline

For walls specifically:
1. Wall building block (3D geometry)
2. Published wall sprite (on top face, if any)
3. Published wall link-layer overlays (one per adjacent neighbor direction)

Hero visual stacking on Hero Base:
- Hero Base published sprite renders first (on the top face).
- Hero sprite renders above it — always in front.
- This means even if your Hero Base has art, the hero will visually stand "on top of" the base.

━━━━━━━━━━━━━━━━━━━━━━
FALLBACK BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━

If a building type+level has NO published sprite → emoji icon rendered.
If a building has a DRAFT but not published → emoji icon in game (editor still shows draft).
If a hero has NO published sprite → default hero portrait used.
If a wall layer is not published → no overlay rendered (walls look plain/unconnected).`
  },
  persistence: {
    title: "Data & Persistence",
    icon: "💾",
    content: `DATA STORAGE OVERVIEW:

The game uses two storage systems:

1. CLOUD DATABASE (Base44 entities)
   - Stores all player progress: buildings, heroes, troops, resources, dungeon runs.
   - Tied to your user account. Persists across devices and browsers.
   - Automatically synced every 30 seconds for resources.
   - Entities: PlayerBase, Building, Hero, Troop, Aspect, Gear, Spell, Dungeon, DungeonRun, ResourcePack, ShopItem.

2. BROWSER localStorage
   - Stores developer/creative assets: sprites, stat overrides, dungeon layouts, documentation.
   - Persists on the same browser/device only.
   - Clearing browser data will wipe these (but not cloud data).

LOCALSTORAGE KEYS:
  building_sprites_v1            → Draft building pixel art (PNG base64)
  published_building_sprites_v1  → Published building sprites (what renders in-game)
  building_hp_overrides_v1       → HP override table
  building_time_overrides_v1     → Upgrade time override table
  building_cost_overrides_v1     → Upgrade cost override table
  hero_definitions_v1            → Custom hero stat templates
  hero_sprites_v1                → Draft hero pixel art (PNG base64 per heroId+direction)
  published_hero_sprites_v1      → Published hero sprites (renders on Hero Base tiles)
  wall_layer_sprites_v1          → Draft wall link layer sprites
  published_wall_layers_v1       → Published wall link layers (renders on adjacent walls)
  dungeon_layout_t{T}_d{D}       → Custom dungeon enemy layouts
  dev_documentation_v2           → This documentation file

ENTITY SCHEMAS:
  PlayerBase: gold, mana, soul_shards, gems, capacities, resource rates, TH level, overflow tracking
  Building: player_id, building_type, level, grid_x, grid_y, footprint_w/h, hp, max_hp, is_upgrading, upgrade_started_at, upgrade_duration_seconds, custom_data
  Hero: player_id, hero_type, name, rarity, level, experience, hp, max_hp, attack, defense, speed, stationed_at_building_id, portrait, aspect_ids, is_unlocked
  Troop: player_id, troop_type, count, level, army_camp_id, training state, stats
  Aspect: player_id, aspect_type, name, rarity, stat_bonus_type, stat_bonus_value, upgrade_cost_shards, equipped_hero_id
  Gear: player_id, gear_type, name, rarity, stat_bonus_type, stat_bonus_value, equipped_hero_id
  Spell: player_id, spell_type, name, level, effect_value, duration_seconds, cooldown_seconds, is_active
  Dungeon: dungeon_number, name, is_boss_dungeon, enemy data, rewards
  DungeonRun: player_id, dungeon_number, status, hero_ids, troop_snapshot, combat_log`
  },
  formulas: {
    title: "Formulas & Scaling",
    icon: "📐",
    content: `UPGRADE COST FORMULAS (n = target_level - 2):

Non-TH buildings: 500 × 1.4974^n
  Level 2 = 500 gold | Level 10 = ~26,000 | Level 20 = ~1.9M | Level 30 = ~40M

Town Hall: 1000 × 1.5036^n
  Level 2 = 1,000 gold | Level 10 = ~53,000 | Level 20 = ~4M | Level 30 = ~100M

Walls: 100 × 1.3594^n
  Level 2 = 100 | Level 10 = ~3,000 | Level 20 = ~170k | Level 30 = ~5M

UPGRADE TIME FORMULAS (seconds, n = target_level - 2):

Non-TH: 30 × 1.4546^n
  Level 2 = 30s | Level 5 = ~3min | Level 10 = ~2h | Level 20 = ~3 days | Level 30 = ~12 days

Town Hall: 120 × 1.4111^n
  Level 2 = 120s | Level 5 = ~10min | Level 10 = ~6h | Level 20 = ~5 days | Level 30 = ~24 days

Walls: 10 × 1.45^n

GEM SPEED-UP COST:
  cost = ceil((minutes_remaining)^1.2)
  Example: 60 min remaining = ceil(60^1.2) = ceil(105.7) = 106 gems

HP SCALING:
  Town Hall:      Lv1=2k → Lv15=90k → Lv23=225k → Lv30=750k
  Hero Base:      Lv1=700 → Lv30=200k
  Mine/Mill:      Lv1=600 → Lv30=180k
  Army Camp:      Lv1=1k → Lv30=250k
  Defense Tower:  Lv1=1.5k → Lv30=300k
  Altar:          Lv1=2k → Lv100=330k
  Wall:           Lv1=500 → Lv15=50k → Lv30=300k

RESOURCE PRODUCTION:
  Gold/Mana per hour scales with mine/vault level.
  Offline progress = elapsed hours × rate (capped at capacity).
  Resource tick runs every 30 seconds in-game.

OVERRIDES:
  Any formula value can be overridden via Building Stats Editor.
  Overrides are stored in localStorage and take priority over formula calculations.`
  }
};
const CATEGORY_ORDER = ["overview", "resources", "buildings", "heroes", "dungeons", "devTools", "publishing", "persistence", "formulas"];
export default function DevDocumentation({ onClose }) {
  _s();
  const [selectedCat, setSelectedCat] = useState("overview");
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
    } catch {
      return DEFAULT_SECTIONS;
    }
  });
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const currentSection = sections[selectedCat] || DEFAULT_SECTIONS[selectedCat];
  const handleEdit = () => {
    setEditContent(currentSection.content);
    setEditing(true);
  };
  const handleSave = () => {
    const updated = { ...sections, [selectedCat]: { ...currentSection, content: editContent } };
    setSections(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };
  const handleCancel = () => {
    setEditing(false);
    setEditContent("");
  };
  const handleReset = () => {
    if (confirm("Reset this section to default?")) {
      const updated = { ...sections, [selectedCat]: DEFAULT_SECTIONS[selectedCat] };
      setSections(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (editing) {
        setEditContent(DEFAULT_SECTIONS[selectedCat].content);
      }
    }
  };
  const handleDownload = () => {
    let md = "# KINGDOM BUILDER — DEVELOPER WIKI\n\n";
    for (const k of CATEGORY_ORDER) {
      const s = sections[k] || DEFAULT_SECTIONS[k];
      md += `## ${s.icon} ${s.title}

${s.content}

---

`;
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kingdom-builder-wiki.md";
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:571:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:572:6", "data-dynamic-content": "true", className: "rounded-xl overflow-hidden flex flex-col", style: { width: "min(1100px, 96vw)", height: "92vh", background: "#ffffff", border: "2px solid #334155", boxShadow: "0 0 40px rgba(0,0,0,0.8)" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:574:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-3 border-b flex-shrink-0", style: { borderColor: "#e2e8f0", background: "#f1f5f9" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:575:10", "data-dynamic-content": "false", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(BookOpen, { "data-source-location": "components/game/DevDocumentation:576:12", "data-dynamic-content": "false", size: 16, className: "text-amber-700" }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 595,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:577:12", "data-dynamic-content": "false", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:578:14", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-amber-700", children: "DEVELOPER WIKI" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 597,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:579:14", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-500", children: "Kingdom Builder · Click a category to read · Edit any section · Persists on reload" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 598,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 596,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 594,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:582:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
        savedFlash && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:583:27", "data-dynamic-content": "false", className: "font-ui text-xs text-green-400 animate-pulse", children: "✓ Saved!" }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 602,
          columnNumber: 28
        }, this),
        !editing && /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:586:16", "data-dynamic-content": "true", onClick: handleEdit, className: "flex items-center gap-1 font-ui text-xs px-3 py-1 rounded", style: { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }, children: [
            /* @__PURE__ */ jsxDEV(Edit3, { "data-source-location": "components/game/DevDocumentation:587:18", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/DevDocumentation.jsx",
              lineNumber: 606,
              columnNumber: 19
            }, this),
            " Edit Section"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 605,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:589:16", "data-dynamic-content": "true", onClick: handleReset, className: "font-ui text-xs px-2 py-1 rounded text-slate-500 hover:text-slate-300", style: { background: "#1e293b", border: "1px solid #1e293b" }, children: "Reset" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 608,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 604,
          columnNumber: 13
        }, this),
        editing && /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:594:16", "data-dynamic-content": "true", onClick: handleCancel, className: "font-ui text-xs px-3 py-1 rounded text-slate-400", style: { background: "#1e293b", border: "1px solid #334155" }, children: "Cancel" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 613,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:595:16", "data-dynamic-content": "true", onClick: handleSave, className: "flex items-center gap-1 font-ui text-xs px-3 py-1 rounded", style: { background: "#166534", color: "#4ade80", border: "1px solid #4ade80" }, children: [
            /* @__PURE__ */ jsxDEV(Save, { "data-source-location": "components/game/DevDocumentation:596:18", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/DevDocumentation.jsx",
              lineNumber: 615,
              columnNumber: 19
            }, this),
            " Save"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 614,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 612,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:600:12", "data-dynamic-content": "true", onClick: handleDownload, className: "flex items-center gap-1 font-ui text-xs px-3 py-1 rounded", style: { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }, children: [
          /* @__PURE__ */ jsxDEV(Download, { "data-source-location": "components/game/DevDocumentation:601:14", "data-dynamic-content": "false", size: 12 }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 620,
            columnNumber: 15
          }, this),
          " Export"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 619,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DevDocumentation:603:12", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white ml-1", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/DevDocumentation:603:87", "data-dynamic-content": "false", size: 20 }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 622,
          columnNumber: 179
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 622,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 601,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DevDocumentation.jsx",
      lineNumber: 593,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:607:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:609:10", "data-dynamic-content": "true", className: "flex-shrink-0 border-r overflow-y-auto", style: { width: 200, borderColor: "#e2e8f0", background: "#f8fafc" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:610:12", "data-dynamic-content": "false", className: "px-3 py-2 font-pixel text-[7px] text-slate-400 uppercase tracking-widest", children: "Categories" }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 629,
          columnNumber: 13
        }, this),
        CATEGORY_ORDER.map((key, __arrIdx__) => {
          const s = sections[key] || DEFAULT_SECTIONS[key];
          const isActive = selectedCat === key;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/DevDocumentation:615:16",
              "data-dynamic-content": "true",
              onClick: () => {
                setSelectedCat(key);
                setEditing(false);
              },
              className: "w-full text-left px-3 py-2.5 flex items-center gap-2 transition-colors",
              style: { background: isActive ? "#fef9ec" : "transparent", borderLeft: isActive ? "3px solid #d97706" : "3px solid transparent" },
              "data-arr-index": __arrIdx__,
              "data-arr-variable-name": "CATEGORY_ORDER",
              children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:618:18", "data-dynamic-content": "true", className: "text-base", "data-collection-item-field": "icon", "data-collection-item-id": s?.id || s?._id, "data-arr-index": __arrIdx__, "data-arr-variable-name": "CATEGORY_ORDER", children: s.icon }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 637,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:619:18", "data-dynamic-content": "true", className: "font-ui text-xs leading-tight", style: { color: isActive ? "#92400e" : "#475569" }, "data-collection-item-field": "title", "data-collection-item-id": s?.id || s?._id, "data-arr-index": __arrIdx__, "data-arr-variable-name": "CATEGORY_ORDER", children: s.title }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 638,
                  columnNumber: 19
                }, this)
              ]
            },
            key,
            true,
            {
              fileName: "/app/src/components/game/DevDocumentation.jsx",
              lineNumber: 634,
              columnNumber: 17
            },
            this
          );
        })
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 628,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:626:10", "data-dynamic-content": "true", className: "flex-1 overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:628:12", "data-dynamic-content": "true", className: "flex items-center gap-2 px-5 py-3 border-b flex-shrink-0", style: { borderColor: "#e2e8f0", background: "#fafafa" }, children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:629:14", "data-dynamic-content": "true", className: "text-xl", "data-collection-item-field": "icon", "data-collection-item-id": currentSection?.id || currentSection?._id, children: currentSection.icon }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 648,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:630:14", "data-dynamic-content": "true", className: "font-pixel text-[11px] text-slate-700", "data-collection-item-field": "title", "data-collection-item-id": currentSection?.id || currentSection?._id, children: currentSection.title }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 649,
            columnNumber: 15
          }, this),
          !editing && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:632:16", "data-dynamic-content": "false", className: "ml-auto font-ui text-[10px] text-slate-400", children: 'Click "Edit Section" to modify this page' }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 651,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 647,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:637:12", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto", children: editing ? /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            "data-source-location": "components/game/DevDocumentation:639:16",
            "data-dynamic-content": "true",
            autoFocus: true,
            value: editContent,
            onChange: (e) => setEditContent(e.target.value),
            className: "w-full h-full p-6 outline-none resize-none font-mono text-xs text-slate-800",
            style: { lineHeight: "1.75", minHeight: "100%", background: "#ffffff" }
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 658,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:647:16", "data-dynamic-content": "true", className: "p-6", children: [
          /* @__PURE__ */ jsxDEV(WikiContent, { "data-source-location": "components/game/DevDocumentation:648:18", "data-dynamic-content": "true", content: currentSection.content }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 667,
            columnNumber: 19
          }, this),
          selectedCat === "heroes" && /* @__PURE__ */ jsxDEV(HeroRoster, { "data-source-location": "components/game/DevDocumentation:649:47", "data-dynamic-content": "false" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 668,
            columnNumber: 48
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 666,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 656,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 645,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DevDocumentation.jsx",
      lineNumber: 626,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/DevDocumentation.jsx",
    lineNumber: 591,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/DevDocumentation.jsx",
    lineNumber: 590,
    columnNumber: 5
  }, this);
}
_s(DevDocumentation, "M1Y0PnU5b57uyeuPiyGilx/uyL8=");
_c = DevDocumentation;
const RARITY_COLORS_DOC = {
  common: "#9ca3af",
  uncommon: "#4ade80",
  rare: "#60a5fa",
  epic: "#c084fc",
  legendary: "#f59e0b"
};
const RARITY_BG_DOC = {
  common: "#f1f5f9",
  uncommon: "#f0fdf4",
  rare: "#eff6ff",
  epic: "#faf5ff",
  legendary: "#fffbeb"
};
function HeroRoster() {
  const heroes = getAllCustomHeroes();
  if (heroes.length === 0) return null;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:672:4", "data-dynamic-content": "true", className: "mt-8", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:673:6", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-amber-700 mt-4 mb-3 pt-2", style: { borderTop: "1px solid #e2e8f0" }, children: [
      "HERO ROSTER (",
      heroes.length,
      " defined)"
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DevDocumentation.jsx",
      lineNumber: 692,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:676:6", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-4", children: heroes.map((hero) => {
      const portrait = getHeroSprite(hero.id, "S");
      const rarityColor = RARITY_COLORS_DOC[hero.rarity] || "#9ca3af";
      const rarityBg = RARITY_BG_DOC[hero.rarity] || "#f1f5f9";
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          "data-source-location": "components/game/DevDocumentation:682:12",
          "data-dynamic-content": "true",
          className: "rounded-xl p-4 flex gap-3 border",
          style: { background: rarityBg, borderColor: rarityColor + "66", borderWidth: 2 },
          "data-collection-item-id": hero?.id,
          children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                "data-source-location": "components/game/DevDocumentation:685:14",
                "data-dynamic-content": "true",
                className: "w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 border-2",
                style: { background: "#0d0d1a", borderColor: rarityColor },
                children: portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/DevDocumentation:688:20", "data-dynamic-content": "true", src: portrait, style: { width: 56, height: 56, imageRendering: "pixelated" }, alt: hero.name }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 707,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:689:20", "data-dynamic-content": "true", style: { fontSize: 32 }, children: "🦸" }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 708,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/DevDocumentation.jsx",
                lineNumber: 704,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:692:14", "data-dynamic-content": "true", className: "flex-1 min-w-0", "data-collection-item-field": "description", "data-collection-item-id": hero?.id, children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:693:16", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:694:18", "data-dynamic-content": "true", className: "font-pixel text-[9px]", style: { color: rarityColor }, "data-collection-item-field": "name", "data-collection-item-id": hero?.id, children: hero.name }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 713,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    "data-source-location": "components/game/DevDocumentation:695:18",
                    "data-dynamic-content": "true",
                    className: "font-ui text-[9px] px-1.5 py-0.5 rounded capitalize",
                    style: { background: rarityColor + "22", color: rarityColor, fontWeight: 600 },
                    "data-collection-item-field": "rarity",
                    "data-collection-item-id": hero?.id,
                    children: hero.rarity
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/components/game/DevDocumentation.jsx",
                    lineNumber: 714,
                    columnNumber: 19
                  },
                  this
                ),
                hero.is_rollable === false && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:698:20", "data-dynamic-content": "true", className: "font-ui text-[9px] px-1.5 py-0.5 rounded", style: { background: "#fee2e2", color: "#dc2626" }, children: "hidden" }, void 0, false, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 717,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/DevDocumentation.jsx",
                lineNumber: 712,
                columnNumber: 17
              }, this),
              hero.description && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:701:37", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 mb-1 truncate", "data-collection-item-field": "description", "data-collection-item-id": hero?.id, children: hero.description }, void 0, false, {
                fileName: "/app/src/components/game/DevDocumentation.jsx",
                lineNumber: 720,
                columnNumber: 38
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:702:16", "data-dynamic-content": "true", className: "grid grid-cols-4 gap-1 mt-1", children: [
                { label: "HP", val: hero.hp },
                { label: "ATK", val: hero.attack },
                { label: "DEF", val: hero.defense },
                { label: "SPD", val: hero.speed },
                { label: "RNG", val: hero.range },
                { label: "CRIT", val: `${hero.crit_chance}%` },
                { label: "DODGE", val: `${hero.dodge_chance}%` },
                { label: "💎", val: hero.gem_cost }
              ].map(
                ({ label, val, id }) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:713:20", "data-dynamic-content": "true", className: "rounded p-1 text-center", style: { background: "rgba(0,0,0,0.06)" }, children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:714:22", "data-dynamic-content": "true", className: "font-ui text-[7px] text-slate-400", "data-collection-item-field": "label", "data-collection-item-id": id, children: label }, void 0, false, {
                    fileName: "/app/src/components/game/DevDocumentation.jsx",
                    lineNumber: 733,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:715:22", "data-dynamic-content": "true", className: "font-ui text-[9px] font-bold text-slate-700", "data-collection-item-field": "val", "data-collection-item-id": id, children: val }, void 0, false, {
                    fileName: "/app/src/components/game/DevDocumentation.jsx",
                    lineNumber: 734,
                    columnNumber: 23
                  }, this)
                ] }, label, true, {
                  fileName: "/app/src/components/game/DevDocumentation.jsx",
                  lineNumber: 732,
                  columnNumber: 19
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/components/game/DevDocumentation.jsx",
                lineNumber: 721,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DevDocumentation.jsx",
              lineNumber: 711,
              columnNumber: 15
            }, this)
          ]
        },
        hero.id,
        true,
        {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 701,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/src/components/game/DevDocumentation.jsx",
      lineNumber: 695,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/DevDocumentation.jsx",
    lineNumber: 691,
    columnNumber: 5
  }, this);
}
_c2 = HeroRoster;
function WikiContent({ content }) {
  const lines = content.split("\n");
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:732:4", "data-dynamic-content": "true", className: "space-y-1", children: lines.map((line, i) => {
    if (line.startsWith("━")) {
      return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:735:17", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-slate-400 mt-4 mb-1 pt-1", style: { borderTop: "1px solid #e2e8f0" }, "data-collection-item-field": "line", children: line }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 754,
        columnNumber: 18
      }, this);
    }
    if (line.startsWith("## ")) {
      return /* @__PURE__ */ jsxDEV("h2", { "data-source-location": "components/game/DevDocumentation:738:17", "data-dynamic-content": "true", className: "font-pixel text-[10px] text-yellow-700 mt-5 mb-2", children: line.slice(3) }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 757,
        columnNumber: 18
      }, this);
    }
    if (line.startsWith("# ")) {
      return /* @__PURE__ */ jsxDEV("h1", { "data-source-location": "components/game/DevDocumentation:741:17", "data-dynamic-content": "true", className: "font-pixel text-[12px] text-yellow-800 mb-3", children: line.slice(2) }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 760,
        columnNumber: 18
      }, this);
    }
    if (/^[A-Z][A-Z\s&():]+:$/.test(line.trim())) {
      return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:744:17", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-amber-700 mt-4 mb-1", "data-collection-item-field": "line", children: line }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 763,
        columnNumber: 18
      }, this);
    }
    if (line.startsWith("- ")) {
      const text = line.slice(2);
      const boldMatch = text.match(/^\*\*(.+?)\*\*(.*)$/);
      if (boldMatch) {
        return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:751:14", "data-dynamic-content": "true", className: "flex gap-2 ml-2", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:752:16", "data-dynamic-content": "false", className: "text-slate-400 mt-0.5", children: "•" }, void 0, false, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 771,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:753:16", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:754:18", "data-dynamic-content": "true", className: "font-semibold text-slate-900", children: boldMatch[1] }, void 0, false, {
              fileName: "/app/src/components/game/DevDocumentation.jsx",
              lineNumber: 773,
              columnNumber: 19
            }, this),
            boldMatch[2]
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DevDocumentation.jsx",
            lineNumber: 772,
            columnNumber: 17
          }, this)
        ] }, i, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 770,
          columnNumber: 15
        }, this);
      }
      return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:760:12", "data-dynamic-content": "true", className: "flex gap-2 ml-2", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:761:14", "data-dynamic-content": "false", className: "text-slate-400 mt-0.5", children: "•" }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 780,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:762:14", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", "data-collection-item-field": "text", children: text }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 781,
          columnNumber: 15
        }, this)
      ] }, i, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 779,
        columnNumber: 13
      }, this);
    }
    if (/^\d+\. /.test(line)) {
      return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:768:12", "data-dynamic-content": "true", className: "flex gap-2 ml-2", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:769:14", "data-dynamic-content": "true", className: "font-ui text-xs text-amber-700 w-4 flex-shrink-0", children: [
          line.match(/^(\d+)/)[1],
          "."
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 788,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:770:14", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", children: line.replace(/^\d+\. /, "") }, void 0, false, {
          fileName: "/app/src/components/game/DevDocumentation.jsx",
          lineNumber: 789,
          columnNumber: 15
        }, this)
      ] }, i, true, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 787,
        columnNumber: 13
      }, this);
    }
    if (line.trim() === "" || line.trim() === "---") {
      return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DevDocumentation:775:17", "data-dynamic-content": "true", className: "h-2" }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 794,
        columnNumber: 18
      }, this);
    }
    if (line.includes("**")) {
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/game/DevDocumentation:781:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", children: parts.map((p, j) => j % 2 === 1 ? /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DevDocumentation:782:49", "data-dynamic-content": "true", className: "font-semibold text-slate-900", "data-collection-item-field": "p", children: p }, j, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 801,
        columnNumber: 50
      }, this) : p) }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 800,
        columnNumber: 13
      }, this);
    }
    if (line.includes("`")) {
      const parts = line.split(/`(.+?)`/g);
      return /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/game/DevDocumentation:790:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", children: parts.map((p, j) => j % 2 === 1 ? /* @__PURE__ */ jsxDEV("code", { "data-source-location": "components/game/DevDocumentation:792:18", "data-dynamic-content": "true", className: "px-1 rounded text-[10px] text-amber-800", style: { background: "#fef3c7" }, "data-collection-item-field": "p", children: p }, j, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 811,
        columnNumber: 15
      }, this) : p) }, i, false, {
        fileName: "/app/src/components/game/DevDocumentation.jsx",
        lineNumber: 809,
        columnNumber: 13
      }, this);
    }
    return /* @__PURE__ */ jsxDEV("p", { "data-source-location": "components/game/DevDocumentation:797:15", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-700 leading-relaxed", "data-collection-item-field": "line", children: line }, i, false, {
      fileName: "/app/src/components/game/DevDocumentation.jsx",
      lineNumber: 816,
      columnNumber: 16
    }, this);
  }) }, void 0, false, {
    fileName: "/app/src/components/game/DevDocumentation.jsx",
    lineNumber: 751,
    columnNumber: 5
  }, this);
}
_c3 = WikiContent;
var _c, _c2, _c3;
$RefreshReg$(_c, "DevDocumentation");
$RefreshReg$(_c2, "HeroRoster");
$RefreshReg$(_c3, "WikiContent");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/DevDocumentation.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/DevDocumentation.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBK2pCWSxTQVNBLFVBVEE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBL2pCWixPQUFPQSxTQUFTQyxnQkFBZ0I7QUFDaEMsU0FBU0MsR0FBR0MsVUFBVUMsT0FBT0MsTUFBTUMsZ0JBQWdCO0FBQ25ELFNBQVNDLDBCQUEwQjtBQUNuQyxTQUFTQyxxQkFBcUI7QUFFOUIsTUFBTUMsY0FBYztBQUdwQixNQUFNQyxtQkFBbUI7QUFBQSxFQUN2QkMsVUFBVTtBQUFBLElBQ1JDLE9BQU87QUFBQSxJQUNQQyxNQUFNO0FBQUEsSUFDTkMsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXdCWDtBQUFBLEVBQ0FDLFdBQVc7QUFBQSxJQUNUSCxPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXNCWDtBQUFBLEVBQ0FFLFdBQVc7QUFBQSxJQUNUSixPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUEwQ1g7QUFBQSxFQUNBRyxRQUFRO0FBQUEsSUFDTkwsT0FBTztBQUFBLElBQ1BDLE1BQU07QUFBQSxJQUNOQyxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWdDWDtBQUFBLEVBQ0FJLFVBQVU7QUFBQSxJQUNSTixPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXFDWDtBQUFBLEVBQ0FLLFVBQVU7QUFBQSxJQUNSUCxPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW1LWDtBQUFBLEVBQ0FNLFlBQVk7QUFBQSxJQUNWUixPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWdFWDtBQUFBLEVBQ0FPLGFBQWE7QUFBQSxJQUNYVCxPQUFPO0FBQUEsSUFDUEMsTUFBTTtBQUFBLElBQ05DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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SUFBQW5CLEtBQUFrQjtBQUFBLGFBQUFDLElBQUE7QUFBQSxhQUFBbkIsS0FBQTtBQUFBLGFBQUFrQixLQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlgiLCJEb3dubG9hZCIsIkVkaXQzIiwiU2F2ZSIsIkJvb2tPcGVuIiwiZ2V0QWxsQ3VzdG9tSGVyb2VzIiwiZ2V0SGVyb1Nwcml0ZSIsIlNUT1JBR0VfS0VZIiwiREVGQVVMVF9TRUNUSU9OUyIsIm92ZXJ2aWV3IiwidGl0bGUiLCJpY29uIiwiY29udGVudCIsInJlc291cmNlcyIsImJ1aWxkaW5ncyIsImhlcm9lcyIsImR1bmdlb25zIiwiZGV2VG9vbHMiLCJwdWJsaXNoaW5nIiwicGVyc2lzdGVuY2UiLCJmb3JtdWxhcyIsIkNBVEVHT1JZX09SREVSIiwiRGV2RG9jdW1lbnRhdGlvbiIsIm9uQ2xvc2UiLCJfcyIsInNlbGVjdGVkQ2F0Iiwic2V0U2VsZWN0ZWRDYXQiLCJzZWN0aW9ucyIsInNldFNlY3Rpb25zIiwic2F2ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiZWRpdGluZyIsInNldEVkaXRpbmciLCJlZGl0Q29udGVudCIsInNldEVkaXRDb250ZW50Iiwic2F2ZWRGbGFzaCIsInNldFNhdmVkRmxhc2giLCJjdXJyZW50U2VjdGlvbiIsImhhbmRsZUVkaXQiLCJoYW5kbGVTYXZlIiwidXBkYXRlZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0IiwiaGFuZGxlQ2FuY2VsIiwiaGFuZGxlUmVzZXQiLCJjb25maXJtIiwiaGFuZGxlRG93bmxvYWQiLCJtZCIsImsiLCJzIiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwidXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJkb3dubG9hZCIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyIiwiYm94U2hhZG93IiwiYm9yZGVyQ29sb3IiLCJjb2xvciIsIm1hcCIsImtleSIsIl9fYXJySWR4X18iLCJpc0FjdGl2ZSIsImJvcmRlckxlZnQiLCJpZCIsIl9pZCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImxpbmVIZWlnaHQiLCJtaW5IZWlnaHQiLCJSQVJJVFlfQ09MT1JTX0RPQyIsImNvbW1vbiIsInVuY29tbW9uIiwicmFyZSIsImVwaWMiLCJsZWdlbmRhcnkiLCJSQVJJVFlfQkdfRE9DIiwiSGVyb1Jvc3RlciIsImxlbmd0aCIsImJvcmRlclRvcCIsImhlcm8iLCJwb3J0cmFpdCIsInJhcml0eUNvbG9yIiwicmFyaXR5IiwicmFyaXR5QmciLCJib3JkZXJXaWR0aCIsImltYWdlUmVuZGVyaW5nIiwibmFtZSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImlzX3JvbGxhYmxlIiwiZGVzY3JpcHRpb24iLCJsYWJlbCIsInZhbCIsImhwIiwiYXR0YWNrIiwiZGVmZW5zZSIsInNwZWVkIiwicmFuZ2UiLCJjcml0X2NoYW5jZSIsImRvZGdlX2NoYW5jZSIsImdlbV9jb3N0IiwiX2MyIiwiV2lraUNvbnRlbnQiLCJsaW5lcyIsInNwbGl0IiwibGluZSIsImkiLCJzdGFydHNXaXRoIiwic2xpY2UiLCJ0ZXN0IiwidHJpbSIsInRleHQiLCJib2xkTWF0Y2giLCJtYXRjaCIsInJlcGxhY2UiLCJpbmNsdWRlcyIsInBhcnRzIiwicCIsImoiLCJfYzMiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEZXZEb2N1bWVudGF0aW9uLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFgsIERvd25sb2FkLCBFZGl0MywgU2F2ZSwgQm9va09wZW4gfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBnZXRBbGxDdXN0b21IZXJvZXMgfSBmcm9tIFwiQC9saWIvaGVyb0RhdGFcIjtcbmltcG9ydCB7IGdldEhlcm9TcHJpdGUgfSBmcm9tIFwiQC9saWIvaGVyb1Nwcml0ZXNcIjtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSBcImRldl9kb2N1bWVudGF0aW9uX3YyXCI7XG5cbi8vIOKUgOKUgCBEZWZhdWx0IHdpa2kgc2VjdGlvbnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5jb25zdCBERUZBVUxUX1NFQ1RJT05TID0ge1xuICBvdmVydmlldzoge1xuICAgIHRpdGxlOiBcIkdhbWUgT3ZlcnZpZXdcIixcbiAgICBpY29uOiBcIvCfj7BcIixcbiAgICBjb250ZW50OiBgS2luZ2RvbSBCdWlsZGVyIGlzIGFuIGlzb21ldHJpYyBiYXNlLWJ1aWxkaW5nIHN0cmF0ZWd5IFJQRy4gWW91IGNvbnN0cnVjdCBhbmQgdXBncmFkZSBhIGtpbmdkb20gb24gYSBsYXJnZSA5NMOXOTQgaXNvbWV0cmljIHRpbGUgZ3JpZCwgdHJhaW4gaGVyb2VzLCBiYXR0bGUgdGhyb3VnaCBkdW5nZW9ucywgYW5kIG1hbmFnZSByZXNvdXJjZXMuXG5cbkdPQUw6IEV4cGFuZCB5b3VyIGtpbmdkb20gYnkgdW5sb2NraW5nIG5ldyBidWlsZGluZ3MsIHVwZ3JhZGluZyBzdHJ1Y3R1cmVzLCBmaWVsZGluZyBwb3dlcmZ1bCBjdXN0b20gaGVyb2VzLCBhbmQgY29ucXVlcmluZyBkdW5nZW9uIHRlcnJpdG9yaWVzIHRvIGVhcm4gZ2VtcyBhbmQgc291bCBzaGFyZHMuXG5cbkhPVyBUTyBTVEFSVDpcbjEuIEEgbmV3IGtpbmdkb20gaXMgYXV0b21hdGljYWxseSBjcmVhdGVkIG9uIGZpcnN0IGxvZ2luIHdpdGggc3RhcnRlciBidWlsZGluZ3MuXG4yLiBUYXAgYW55IGJ1aWxkaW5nIHRvIG9wZW4gaXRzIGluZm8gcGFuZWwgYW5kIGJlZ2luIHVwZ3JhZGluZy5cbjMuIE9wZW4gdGhlIFNob3AgKGJvdHRvbS1yaWdodCkgdG8gYnV5IG5ldyBidWlsZGluZ3MuXG40LiBFbnRlciBkdW5nZW9ucyAoYm90dG9tLWxlZnQg4pqU77iPKSB0byBlYXJuIHJlc291cmNlcyBhbmQgZ2Vtcy5cbjUuIFVzZSB0aGUgQWx0YXIgKPCflK4pIHRvIHJvbGwgZm9yIGhlcm9lcyBhbmQgZGVwbG95IHRoZW0gb24gSGVybyBCYXNlcy5cblxuTUFQIENPTlRST0xTOlxuLSBEcmFnIHRvIHBhbiB0aGUgbWFwLlxuLSBTY3JvbGwgd2hlZWwgdG8gem9vbSBpbi9vdXQgKG1pbiA9IGZ1bGwtZ3JpZCB2aWV3LCBtYXggPSA1w5cgem9vbSkuXG4tIENsaWNrIGEgYnVpbGRpbmcgdG8gb3BlbiBpdHMgcGFuZWwuIENsaWNrIGVtcHR5IHNwYWNlIHRvIGRlc2VsZWN0LlxuLSBSaWdodC1jbGljayBkdXJpbmcgc2hvcCBwbGFjZW1lbnQgdG8gcGxhY2UgYSBidWlsZGluZyBhdCB0aGF0IHRpbGUuXG4tIFNoaWZ0K0NsaWNrIGR1cmluZyB3YWxsIHBsYWNlbWVudDogZmlsbHMgYSBzdHJhaWdodCBsaW5lIG9mIHdhbGxzIGFsb25nIHRoZSBuZWFyZXN0IGF4aXMgZnJvbSB0aGUgY2xpY2tlZCB0aWxlIG91dHdhcmQgKGNvbmZpcm1lZCB2aWEgZGlhbG9nIHNob3dpbmcgY291bnQgKyBjb3N0KS5cbi0gUmlnaHQtY2xpY2sgYSBwbGFjZWQgd2FsbDogc2VsZWN0cyB0aGUgY29udGlndW91cyB3YWxsIGdyb3VwIChsaW5lKS4gT3BlbnMgV2FsbCBHcm91cCBQYW5lbC5cblxuV0FMTCBHUk9VUCBQQU5FTDpcbi0gQXBwZWFycyBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gd2hlbiBhIHdhbGwgbGluZSBpcyByaWdodC1jbGljayBzZWxlY3RlZC5cbi0gVVBHUkFERSBBTEw6IFN0YXJ0cyB1cGdyYWRpbmcgZXZlcnkgd2FsbCBpbiB0aGUgZ3JvdXAgYmVsb3cgdGhlIGxldmVsIGNhcC4gU2hvd3MgdG90YWwgZ29sZCBjb3N0LlxuLSBNT1ZFOiBFbnRlcnMgZ2hvc3QgbW92ZSBtb2RlIGZvciB0aGUgZW50aXJlIGdyb3VwLiBDbGljayB0byBjb21taXQgdGhlIG5ldyBwb3NpdGlvbi5cbi0gUk9UQVRFOiBSb3RhdGVzIGEgc3RyYWlnaHQgd2FsbCBsaW5lIDkwwrAgYXJvdW5kIGl0cyBjZW50ZXIgcG9pbnQuIEJsb2NrZWQgaWYgYW55IHRhcmdldCB0aWxlIGlzIG9jY3VwaWVkLmBcbiAgfSxcbiAgcmVzb3VyY2VzOiB7XG4gICAgdGl0bGU6IFwiUmVzb3VyY2VzICYgRWNvbm9teVwiLFxuICAgIGljb246IFwi8J+SsFwiLFxuICAgIGNvbnRlbnQ6IGBSRVNPVVJDRVM6XG4tIEdvbGQg8J+SsCDigJQgUHJpbWFyeSBjdXJyZW5jeS4gRWFybmVkIGZyb20gbWluZXMvdmF1bHRzIGFuZCBkdW5nZW9uIHZpY3Rvcmllcy4gVXNlZCBmb3IgbW9zdCBidWlsZGluZyB1cGdyYWRlcy5cbi0gTWFuYSDwn5S3IOKAlCBNYWdpYyByZXNvdXJjZS4gRWFybmVkIGZyb20gbWFuYSBtaW5lcy92YXVsdHMgYW5kIGR1bmdlb25zLiBVc2VkIGZvciBtYW5hLXR5cGUgdXBncmFkZXMuXG4tIFNvdWwgU2hhcmRzIPCfkpwg4oCUIFJhcmUuIEVhcm5lZCBmcm9tIGR1bmdlb24gdmljdG9yaWVzLiBVc2VkIHRvIHVwZ3JhZGUgQXNwZWN0cy5cbi0gR2VtcyDwn5KOIOKAlCBQcmVtaXVtIGN1cnJlbmN5LiBFYXJuZWQgYnkgY2xlYXJpbmcgZnVsbCBkdW5nZW9uIHRlcnJpdG9yaWVzLiBVc2VkIHRvIHNwZWVkIHVwZ3JhZGVzLCBidXkgcmVzb3VyY2VzLCBhbmQgcHVyY2hhc2UgYnVpbGRpbmdzIHdpdGggZ2Vtcy5cblxuUFJPRFVDVElPTjpcbi0gR29sZCBNaW5lcyBhbmQgR29sZCBWYXVsdHMgcGFzc2l2ZWx5IHByb2R1Y2UgZ29sZCBwZXIgaG91ci5cbi0gTWFuYSBNaW5lcyBwYXNzaXZlbHkgcHJvZHVjZSBtYW5hIHBlciBob3VyLlxuLSBSZXNvdXJjZXMgdGljayBldmVyeSAzMCBzZWNvbmRzIGFuZCBhcmUgc2F2ZWQgdG8gdGhlIGNsb3VkIGRhdGFiYXNlLlxuLSBXaGVuIHlvdSByZXR1cm4gYWZ0ZXIgYmVpbmcgb2ZmbGluZSwgdGhlIGdhbWUgY2FsY3VsYXRlcyBob3cgbWFueSByZXNvdXJjZXMgeW91IGVhcm5lZCB3aGlsZSBhd2F5IChjYXBwZWQgYXQgdmF1bHQgY2FwYWNpdHkpLlxuLSBBdCBUb3duIEhhbGwgbGV2ZWwgMTUrLCBleGNlc3MgcmVzb3VyY2VzIGF1dG8tY29udmVydCB0byBSZXNvdXJjZSBQYWNrcyBpbnN0ZWFkIG9mIGJlaW5nIHdhc3RlZC5cblxuQ0FQQUNJVFk6XG4tIEdvbGQgQ2FwYWNpdHkgaXMgZGV0ZXJtaW5lZCBieSB5b3VyIEdvbGQgVmF1bHQgKEdvbGQgTWlsbCkgbGV2ZWwuXG4tIE1hbmEgQ2FwYWNpdHkgaXMgZGV0ZXJtaW5lZCBieSB5b3VyIE1hbmEgVmF1bHQgbGV2ZWwuXG4tIFVwZ3JhZGUgdGhlc2UgYnVpbGRpbmdzIHRvIGhvbGQgbW9yZSByZXNvdXJjZXMuXG5cbkdFTVM6XG4tIFRhcCB0aGUgZ2VtIGNvdW50ZXIgKHRvcC1yaWdodCkgdG8gb3BlbiB0aGUgR2VtIFNob3AuXG4tIEluIERldiBNb2RlLCB5b3UgY2FuIGRpcmVjdGx5IGVkaXQgeW91ciBnZW0gY291bnQgYnkgY2xpY2tpbmcgaXQuXG4tIEdlbXMgY2FuIHNwZWVkIHVwIGFueSB1cGdyYWRlOiBjb3N0ID0gY2VpbCgobWludXRlc19yZW1haW5pbmcpXjEuMikuYFxuICB9LFxuICBidWlsZGluZ3M6IHtcbiAgICB0aXRsZTogXCJCdWlsZGluZ3NcIixcbiAgICBpY29uOiBcIvCfj5fvuI9cIixcbiAgICBjb250ZW50OiBgQWxsIGJ1aWxkaW5ncyBoYXZlIGEgdHlwZSwgbGV2ZWwgKDHigJMzMCksIEhQLCB1cGdyYWRlIGNvc3QvdGltZSwgYW5kIGEgZm9vdHByaW50IChncmlkIHRpbGVzIG9jY3VwaWVkKS5cblxuQlVJTERJTkcgVFlQRVM6XG4tIFRvd24gSGFsbCDwn4+wICg0w5c0KSDigJQgQ2VudHJhbCBodWIuIExldmVsaW5nIGl0IHVubG9ja3MgbmV3IGJ1aWxkaW5ncyBhbmQgaW5jcmVhc2VzIGNhcHMuIENvc3RzIGdvbGQuXG4tIEFybXkgQ2FtcCDimpTvuI8gKDjDlzgpIOKAlCBIb3VzZXMgdHJvb3BzIGZvciBkdW5nZW9uIGNvbWJhdC5cbi0gSGVybyBCYXNlIPCfprggKDHDlzEpIOKAlCBTdGF0aW9uIGEgaGVybyBoZXJlLiBUaGUgaGVybyBzcHJpdGUgcmVuZGVycyB2aXN1YWxseSBvbiB0aGUgdGlsZSwgbGF5ZXJlZCBhYm92ZSB0aGUgYmFzZS5cbi0gQWx0YXIg8J+UriAoMsOXMikg4oCUIFJvbGwgZm9yIG5ldyBoZXJvZXMgdXNpbmcgZ2Vtcy5cbi0gR29sZCBNaW5lIOKbj++4jyAoMsOXMikg4oCUIFByb2R1Y2VzIGFuZCBzdG9yZXMgZ29sZC4gQ29sbGVjdCBtYW51YWxseSAoYmVmb3JlIFRIMTUpLlxuLSBNYW5hIE1pbmUg8J+SjiAoMsOXMikg4oCUIFByb2R1Y2VzIGFuZCBzdG9yZXMgbWFuYS5cbi0gR29sZCBWYXVsdCAoR29sZCBNaWxsKSDwn4+mICgyw5cyKSDigJQgU3RvcmVzIGdvbGQsIGluY3JlYXNlcyBnb2xkIGNhcGFjaXR5LiBDb3N0cyBtYW5hIHRvIHVwZ3JhZGUuXG4tIERlZmVuc2UgVG93ZXIg8J+XvCAoMsOXMikg4oCUIERlZmVuc2l2ZSBzdHJ1Y3R1cmUuXG4tIFdhbGwg8J+nsSAoMcOXMSkg4oCUIEJhcnJpZXIgdGlsZXMuIEFkamFjZW50IHdhbGxzIHNob3cgdmlzdWFsIGxpbmstbGF5ZXIgb3ZlcmxheXMgd2hlbiBwdWJsaXNoZWQuXG4tIEFybW9yeSDimpLvuI8gKDLDlzIpIOKAlCBHZWFyIG1hbmFnZW1lbnQuXG4tIEJhcnJhY2tzIPCfj5XvuI8gKDLDlzIpIOKAlCBUcm9vcCB0cmFpbmluZy5cbi0gV2FyZWhvdXNlIC8gTWFuYSBWYXVsdCAoMsOXMikg4oCUIFJlc291cmNlIHN0b3JhZ2UuXG5cblVQR1JBRElORzpcbjEuIFRhcCBhIGJ1aWxkaW5nIHRvIG9wZW4gaXRzIHBhbmVsLlxuMi4gVmlldyBjdXJyZW50IHN0YXRzLCBIUCBiYXIsIHVwZ3JhZGUgY29zdCBhbmQgdGltZS5cbjMuIENsaWNrIFVwZ3JhZGUgdG8gc3RhcnQgKGNvc3RzIGdvbGQvbWFuYSkuXG40LiBPciBjbGljayB0aGUg8J+SjiBidXR0b24gdG8gc3BlbmQgZ2VtcyBhbmQgc2tpcCBjb3N0L3RpbWVyLlxuNS4gVXBncmFkZXMgcnVuIGluIHJlYWwgdGltZS4gQ29tcGxldGVkIHVwZ3JhZGVzIGFyZSBkZXRlY3RlZCBldmVyeSA1IHNlY29uZHMuXG42LiBVcGdyYWRlcyB0aGF0IGZpbmlzaCB3aGlsZSBvZmZsaW5lIGFyZSBhcHBsaWVkIG9uIHlvdXIgbmV4dCBsb2dpbi5cblxuTU9WSU5HIEJVSUxESU5HUzpcbi0gT3BlbiBhIGJ1aWxkaW5nJ3MgcGFuZWwg4oaSIGNsaWNrIE1vdmUuXG4tIFRoZSBidWlsZGluZyBlbnRlcnMgZ2hvc3QgbW9kZTsgZHJhZyB0byBhIHZhbGlkIChncmVlbikgcG9zaXRpb24gYW5kIHJlbGVhc2UgdG8gcGxhY2UuXG5cbkJVSUxESU5HIFNQUklURVMgKFJlbmRlcmluZyk6XG4tIEVhY2ggYnVpbGRpbmcgcmVuZGVycyBhcyBhIDNEIGlzb21ldHJpYyBibG9jayB3aXRoIGEgdG9wIGZhY2UsIGxlZnQgZmFjZSwgYW5kIHJpZ2h0IGZhY2UuXG4tIEJ5IGRlZmF1bHQsIGJ1aWxkaW5ncyBzaG93IGFuIGVtb2ppIGljb24gb24gdGhlIHRvcCBmYWNlLlxuLSBBZnRlciB5b3UgZGVzaWduIGEgc3ByaXRlIGluIHRoZSBQaXhlbCBFZGl0b3IgYW5kIFBVQkxJU0ggaXQgKFwiU2VuZCB0byBHYW1lXCIpLCB0aGUgZW1vamkgaXMgcmVwbGFjZWQgYnkgeW91ciBwaXhlbCBhcnQgaW1hZ2UgcmVuZGVyZWQgb250byB0aGUgdG9wIGZhY2UuXG4tIFB1Ymxpc2hlZCBzcHJpdGVzIHBlcnNpc3QgYWNyb3NzIGFsbCByZWxvYWRzLiBEcmFmdCBzcHJpdGVzIChkcmF3biBidXQgbm90IHB1Ymxpc2hlZCkgYXJlIG9ubHkgdmlzaWJsZSBpbiB0aGUgZWRpdG9yLlxuXG5TSE9QIFBMQUNFTUVOVCBXT1JLRkxPVzpcbjEuIE9wZW4gU2hvcCAo8J+bkiBib3R0b20tcmlnaHQpLlxuMi4gU2VsZWN0IGEgYnVpbGRpbmcgY2F0ZWdvcnkgYW5kIGNsaWNrIEJVWSAoaWYgeW91IGhhdmUgcmVzb3VyY2VzKSBvciBQTEFDRSAoaWYgeW91IGhhdmUgZ2VtcykuXG4zLiBTaG9wIGNsb3Nlcy4gVGhlIGJ1aWxkaW5nIG5vdyBmb2xsb3dzIHlvdXIgbW91c2UgY3Vyc29yIGFzIHlvdSBtb3ZlIGl0IGFyb3VuZCB0aGUgbWFwLlxuNC4gQ2xpY2sgb24gYSB2YWxpZCBsb2NhdGlvbiAoZ3JlZW4gem9uZSwgbm8gY29sbGlzaW9ucykuIFRoZSBidWlsZGluZyB3aWxsIGJlIHBsYWNlZC5cbjUuIElmIHlvdSBoYXZlIGVub3VnaCByZXNvdXJjZXMgKGdvbGQvbWFuYSksIHRoZXkgYXJlIGRlZHVjdGVkIGltbWVkaWF0ZWx5IGFuZCBidWlsZGluZyBpcyBjcmVhdGVkLlxuNi4gSWYgeW91IGRvbid0IGhhdmUgcmVzb3VyY2VzIGJ1dCBoYXZlIGdlbXM6IGEgY29uZmlybWF0aW9uIGRpYWxvZyBhcHBlYXJzIGFza2luZyBcIlVzZSBYIEdlbXMgdG8gYnV5P1wiIOKAlCBjb25maXJtIG9yIGNhbmNlbC5cbjcuIElmIHlvdSBoYXZlIG5laXRoZXIgcmVzb3VyY2VzIG5vciBnZW1zOiB0aGUgaXRlbSBpcyBncmV5ZWQgb3V0IGFuZCB1bmF2YWlsYWJsZS5gXG4gIH0sXG4gIGhlcm9lczoge1xuICAgIHRpdGxlOiBcIkhlcm9lc1wiLFxuICAgIGljb246IFwi8J+muFwiLFxuICAgIGNvbnRlbnQ6IGBIZXJvZXMgYXJlIHlvdXIgbWFpbiBjb21iYXQgdW5pdHMuIFRoZXkgYXJlIHN0YXRpb25lZCBhdCBIZXJvIEJhc2VzIGFuZCBwYXJ0aWNpcGF0ZSBpbiBkdW5nZW9uIGJhdHRsZXMuXG5cbkhFUk8gU1RBVFM6IEhQLCBBdHRhY2ssIERlZmVuc2UsIFNwZWVkLlxuXG5HRVRUSU5HIEhFUk9FUzpcbjEuIE9wZW4gdGhlIEFsdGFyICjwn5SuIGJvdHRvbS1yaWdodCkuXG4yLiBTcGVuZCBnZW1zIHRvIHJvbGwuIEEgaGVybyBjYXJkIGlzIHJldmVhbGVkLlxuMy4gQ2xpY2sgXCJBY3RpdmF0ZVwiIHRvIHBlcm1hbmVudGx5IGFkZCB0aGUgaGVybyB0byB5b3VyIHJvc3Rlci5cbjQuIEhlcm9lcyBkZWZpbmVkIGluIHRoZSBIZXJvIENyZWF0b3IgKGRldiB0b29sKSBhcHBlYXIgaW4gdGhlIHJvbGwgcG9vbC5cblxuU1RBVElPTklORyBIRVJPRVM6XG4tIE9wZW4gYSBIZXJvIEJhc2UgYnVpbGRpbmcgcGFuZWwuXG4tIEFzc2lnbiBhIGhlcm8gdG8gc3RhdGlvbiB0aGVtIHRoZXJlLlxuLSBPbmNlIHN0YXRpb25lZCwgdGhlIGhlcm8ncyBzcHJpdGUgcmVuZGVycyB2aXN1YWxseSBPTiB0aGUgSGVybyBCYXNlIHRpbGUuXG4tIFRoZSBoZXJvIHNwcml0ZSBhbHdheXMgcmVuZGVycyBBQk9WRSB0aGUgSGVybyBCYXNlIOKAlCBpdCBpcyBsYXllcmVkIG9uIHRvcC5cbi0gVGhpcyBsYXllcmluZyBhcHBsaWVzIHRvIGJvdGggdGhlIGVtb2ppIHZlcnNpb24gYW5kIGFueSBwdWJsaXNoZWQgcGl4ZWwgYXJ0IHNwcml0ZS5cblxuSEVSTyBTUFJJVEVTIElOIEdBTUU6XG4tIFdoZW4geW91IHB1Ymxpc2ggYSBoZXJvIHNwcml0ZSBpbiB0aGUgSGVybyBDcmVhdG9yIChcIlNlbmQgdG8gR2FtZVwiKSwgaXQgcmVwbGFjZXMgdGhlIGRlZmF1bHQgcG9ydHJhaXQuXG4tIFdoZW4gdGhlIEhlcm8gQmFzZSBidWlsZGluZyBhbHNvIGhhcyBhIHB1Ymxpc2hlZCBzcHJpdGUsIGJvdGggcmVuZGVyIHRvZ2V0aGVyIOKAlCBiYXNlIG9uIGJvdHRvbSwgaGVybyBvbiB0b3AuXG4tIFRoZSBnYW1lIHVzZXMgdGhlIFwiU1wiIChTb3V0aC1mYWNpbmcpIGRpcmVjdGlvbiBieSBkZWZhdWx0IGZvciBpbi1tYXAgZGlzcGxheS5cblxuSEVSTyBSQVJJVFk6IENvbW1vbiwgVW5jb21tb24sIFJhcmUsIEVwaWMsIExlZ2VuZGFyeS4gSGlnaGVyIHJhcml0eSA9IGJldHRlciBiYXNlIHN0YXRzLlxuXG5BU1BFQ1RTOlxuLSBBc3BlY3RzIGFyZSBwYXNzaXZlIHN0YXQgYm9udXNlcyB0aGF0IGNhbiBiZSBlcXVpcHBlZCB0byBoZXJvZXMuXG4tIFVwZ3JhZGVkIHVzaW5nIFNvdWwgU2hhcmRzLlxuLSBFYWNoIGFzcGVjdCBoYXMgYSB0eXBlIChhdHRhY2ssIGRlZmVuc2UsIGhwLCBzcGVlZCwgYWxsKSBhbmQgYSBzdGF0IGJvbnVzIHZhbHVlLlxuXG5HRUFSOlxuLSBJdGVtcyAod2VhcG9uLCBhcm1vciwgaGVsbWV0LCBib290cywgZ2xvdmVzLCByaW5nLCBhbXVsZXQsIHNoaWVsZCkgdGhhdCBwcm92aWRlIHN0YXQgYm9udXNlcy5cbi0gR2VhciBoYXMgcmFyaXR5IHRpZXJzOiBDb21tb24g4oaSIExlZ2VuZGFyeS5gXG4gIH0sXG4gIGR1bmdlb25zOiB7XG4gICAgdGl0bGU6IFwiRHVuZ2VvbnMgJiBDb21iYXRcIixcbiAgICBpY29uOiBcIuKalO+4j1wiLFxuICAgIGNvbnRlbnQ6IGBEVU5HRU9OUzpcbi0gVGFwIOKalO+4jyBEdW5nZW9ucyAoYm90dG9tLWxlZnQpIHRvIGVudGVyIHRoZSBkdW5nZW9uIHNjcmVlbi5cbi0gRHVuZ2VvbnMgYXJlIG9yZ2FuaXplZCBpbnRvIDQgVGVycml0b3JpZXMsIGVhY2ggd2l0aCAxMCBkdW5nZW9ucy5cbiAgLSBUZXJyaXRvcnkgMTogQ2xhc3NpYyBEdW5nZW9uIPCfj7BcbiAgLSBUZXJyaXRvcnkgMjogRmlyZSBSZWFsbSDwn5SlXG4gIC0gVGVycml0b3J5IDM6IEljZSBSZWFsbSDwn6eKXG4gIC0gVGVycml0b3J5IDQ6IEFyY2FuZSBSZWFsbSDwn4yAXG4tIEVhY2ggdGVycml0b3J5IGVuZHMgd2l0aCBhIEJvc3MgRHVuZ2VvbiAobGV2ZWwgMTAgb2YgZWFjaCB0ZXJyaXRvcnkpLlxuLSBDbGVhcmluZyBBTEwgMTAgZHVuZ2VvbnMgaW4gYSB0ZXJyaXRvcnkgZWFybnMgYSBsYXJnZSBnZW0gcmV3YXJkIChzZWUgdGVycml0b3J5IGdlbSByZXdhcmQgaW4gZGF0YSkuXG5cbkVOVEVSSU5HIENPTUJBVDpcbjEuIFNlbGVjdCBhIHRlcnJpdG9yeSBhbmQgZHVuZ2VvbiBmcm9tIHRoZSBEdW5nZW9ucyBtb2RhbC5cbjIuIFlvdXIgaGVyb2VzIGFuZCB0cm9vcHMgYXJlIGF1dG9tYXRpY2FsbHkgaW5jbHVkZWQuXG4zLiBDb21iYXQgc3RhcnRzIGluIHRoZSBDb21iYXRTY3JlZW4uXG5cbkNPTUJBVCBTWVNURU0gKFR1cm4tQmFzZWQpOlxuLSBFYWNoIHJvdW5kOiB5b3VyIGhlcm9lcyBhbmQgdHJvb3BzIGF0dGFjayBlbmVtaWVzLCBlbmVtaWVzIGNvdW50ZXJhdHRhY2suXG4tIEZsb2F0aW5nIGRhbWFnZSBudW1iZXJzIGFwcGVhciBkdXJpbmcgYXR0YWNrcy5cbi0gU3BlbGxzIGNhbiBiZSBjYXN0IHRvIGFsdGVyIHRoZSBiYXR0bGUgKGRhbWFnZSBib29zdCwgcHJvdGVjdGlvbiwgaGVhbGluZykuXG4tIElmIGFsbCBlbmVtaWVzIGFyZSBkZWZlYXRlZCDihpIgVklDVE9SWS4gSWYgYWxsIHlvdXIgdW5pdHMgZmFsbCDihpIgREVGRUFULlxuXG5DT01CQVQgUkVXQVJEUzpcbi0gVmljdG9yeSBncmFudHMgR29sZCwgTWFuYSwgYW5kIFNvdWwgU2hhcmRzIHBlciB0aGUgZHVuZ2VvbidzIHJld2FyZCB2YWx1ZXMuXG4tIFRlcnJpdG9yeSBjb21wbGV0aW9uIChhbGwgMTAgZHVuZ2VvbnMpIGdyYW50cyBHZW1zICh0ZXJyaXRvcnkgZ2VtUmV3YXJkKS5cblxuVFJPT1BTOlxuLSBUcmFpbmVkIGluIEJhcnJhY2tzLCBob3VzZWQgaW4gQXJteSBDYW1wcy5cbi0gVHlwZXM6IFN3b3Jkc21hbiDimpTvuI8sIEFyY2hlciDwn4+5LCBNYWdlIPCflK4sIFRhbmsg8J+boe+4jywgQ2F2YWxyeSDwn5C0LlxuLSBFYWNoIHRyb29wIHR5cGUgaGFzIGl0cyBvd24gSFAsIEF0dGFjaywgRGVmZW5zZSwgYW5kIFNwZWVkIHN0YXRzLlxuXG5EVU5HRU9OIERBVEEgKFRlcnJpdG9yaWVzICYgRHVuZ2VvbnMpOlxuLSBUZXJyaXRvcnkgYW5kIGR1bmdlb24gZGVmaW5pdGlvbnMgbGl2ZSBpbiBsaWIvZHVuZ2VvbkRhdGEuanMuXG4tIFRFUlJJVE9SWV9ERUZTOiBhcnJheSBvZiB0ZXJyaXRvcnkgb2JqZWN0cyAobmFtZSwgaWNvbiwgY29sb3IsIGdlbVJld2FyZCkuXG4tIFRFUlJJVE9SWV9EVU5HRU9OUzogMkQgYXJyYXkgW3RlcnJpdG9yeV1bZHVuZ2VvbkluZGV4XSBvZiBkdW5nZW9uIG9iamVjdHMuXG4gIEVhY2ggZHVuZ2VvbiBvYmplY3Q6IHsgbGV2ZWwsIG5hbWUsIGdvbGRSZXcsIG1hbmFSZXcsIHNoYXJkUmV3LCBlbmVtaWVzLCBib3NzSHAsIC4uLiB9XG4tIEN1c3RvbSBlbmVteS9idWlsZGluZyBsYXlvdXRzIHBlciBkdW5nZW9uIGFyZSBzYXZlZCBpbiBsb2NhbFN0b3JhZ2UgYXMgZHVuZ2Vvbl9sYXlvdXRfdHtUfV9ke0R9LlxuLSBJZiBhIGN1c3RvbSBsYXlvdXQgZXhpc3RzIGZvciBhIGR1bmdlb24sIGl0IGlzIGxvYWRlZCBpbiBjb21iYXQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBsYXlvdXQuYFxuICB9LFxuICBkZXZUb29sczoge1xuICAgIHRpdGxlOiBcIkRldiBUb29sc1wiLFxuICAgIGljb246IFwi8J+boO+4j1wiLFxuICAgIGNvbnRlbnQ6IGBEZXYgTW9kZSBpcyBsb2NrZWQgYmVoaW5kIGEgcGFzc2NvZGUuIFRvZ2dsZSBpdCB2aWEgU2V0dGluZ3Mg4pqZ77iPIChib3R0b20tcmlnaHQpIOKGkiBEZXYgTW9kZSBzd2l0Y2gg4oaSIGVudGVyIHBhc3Njb2RlOiAwMDczNDIuXG5cbk9uY2UgYWN0aXZlLCB0aGUgYm90dG9tLWxlZnQgdG9vbGJhciBnYWlucyBleHRyYSBidXR0b25zOlxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbvCfj5fvuI8gQlVJTERJTkdTIE1FTlVcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG7wn46oIEJ1aWxkaW5nIERlc2lnbiBFZGl0b3IgKFBpeGVsIEVkaXRvcilcbiAgV2hhdCBpdCBkb2VzOiBDcmVhdGUgY3VzdG9tIHBpeGVsLWFydCBzcHJpdGVzIGZvciBhbnkgYnVpbGRpbmcgdHlwZSBhdCBhbnkgbGV2ZWwgKDHigJMzMCkuXG4gIEhvdyB0byB1c2U6XG4gIDEuIFNlbGVjdCBhIGJ1aWxkaW5nIHR5cGUgYW5kIGxldmVsIGZyb20gdGhlIGRyb3Bkb3ducy5cbiAgMi4gRHJhdyBvbiB0aGUgY2FudmFzIHVzaW5nIHRoZSB0b29scyBvbiB0aGUgbGVmdC5cbiAgMy4gVGhlIHNwcml0ZSBhdXRvLXNhdmVzIGV2ZXJ5IHN0cm9rZSDigJQgbm8gbWFudWFsIHNhdmUgbmVlZGVkLlxuICA0LiBUbyBtYWtlIGl0IGFwcGVhciBpbiB0aGUgZ2FtZSwgY2xpY2sgXCJTRU5EIFRPIEdBTUVcIiBhbmQgY29uZmlybS5cbiAgUHVibGlzaGluZzogT25seSBwdWJsaXNoZWQgc3ByaXRlcyByZW5kZXIgaW4gdGhlIGdhbWUuIERyYWZ0IHNwcml0ZXMgYXJlIHByaXZhdGUgdG8gdGhlIGVkaXRvci5cbiAgQ2FudmFzIHNpemU6IDI1NsOXMjU2IHBpeGVscy5cbiAgVG9vbHM6IFBlbmNpbCwgQnJ1c2ggKDNweCksIEVyYXNlciDijKssIEZpbGwgQnVja2V0LCBFeWVkcm9wcGVyLCBSZWN0YW5nbGUgU2VsZWN0LCBMaW5lLCBSZWN0YW5nbGUgT3V0bGluZS5cbiAgQnJ1c2ggc2l6ZXM6IDEsIDIsIDMsIDUsIDhweC4gWm9vbTogc2Nyb2xsIHdoZWVsIHRvIHpvb20gaW4vb3V0IChtaW4gMcOXLCBzY2FsZXMgdG8gdmlld3BvcnQpLlxuICBVbmRvL1JlZG86IENtZCtaIC8gQ21kK1NoaWZ0K1ouXG4gIFNoaWZ0K0NsaWNrOiBzdHJhaWdodCBsaW5lIGZyb20gbGFzdCBhbmNob3IgcG9pbnQuXG4gIENvcHkgVG86IENvcHkgYSBkZXNpZ24gdG8gbXVsdGlwbGUgbGV2ZWxzIGF0IG9uY2UuXG4gIGxvY2FsU3RvcmFnZTogYnVpbGRpbmdfc3ByaXRlc192MSAoZHJhZnRzKSwgcHVibGlzaGVkX2J1aWxkaW5nX3Nwcml0ZXNfdjEgKHB1Ymxpc2hlZClcblxu8J+TiiBCdWlsZGluZyBTdGF0cyBFZGl0b3JcbiAgV2hhdCBpdCBkb2VzOiBPdmVycmlkZSBIUCwgdXBncmFkZSB0aW1lIChzZWNvbmRzKSwgYW5kIHJlc291cmNlIGNvc3QgcGVyIGJ1aWxkaW5nIHR5cGUgYW5kIGxldmVsLlxuICBIb3cgdG8gdXNlOlxuICAxLiBTZWxlY3QgYSBidWlsZGluZyB0eXBlIGluIHRoZSBzaWRlYmFyLlxuICAyLiBQaWNrIGEgdGFiOiBIUCwgVXBncmFkZSBUaW1lLCBvciBDb3N0LlxuICAzLiBFZGl0IGFueSBsZXZlbCdzIHZhbHVlIOKAlCBpdCBhdXRvLXNhdmVzIGltbWVkaWF0ZWx5LlxuICBCbHVlID0gb3ZlcnJpZGRlbiB2YWx1ZS4gR3JleSA9IHVzaW5nIGZvcm11bGEgZGVmYXVsdC5cbiAgQmFzZSBmb3JtdWxhIHZhbHVlIHNob3duIGJlbG93IGFueSBvdmVycmlkZS5cbiAgUmVzZXQ6IFJlbW92ZXMgb3ZlcnJpZGVzIGZvciB0aGUgY3VycmVudCBidWlsZGluZyBvbiB0aGUgYWN0aXZlIHRhYi5cbiAgbG9jYWxTdG9yYWdlOiBidWlsZGluZ19ocF9vdmVycmlkZXNfdjEsIGJ1aWxkaW5nX3RpbWVfb3ZlcnJpZGVzX3YxLCBidWlsZGluZ19jb3N0X292ZXJyaWRlc192MVxuXG7wn6exIFdhbGwgTGF5ZXIgRWRpdG9yXG4gIFdoYXQgaXQgZG9lczogRHJhdyBvdmVybGF5IHNwcml0ZXMgdGhhdCBhcHBlYXIgd2hlbiB0d28gYWRqYWNlbnQgd2FsbHMgYXJlIGNvbm5lY3RlZC5cbiAgQ2FudmFzIHNpemU6IDI1NsOXMjU2IHBpeGVscy5cbiAgSG93IHRvIHVzZTpcbiAgMS4gU2VsZWN0IGEgd2FsbCBsZXZlbCAoMeKAkzEwKSBhbmQgYSBsaW5rIGRpcmVjdGlvbiAoU1csIFNFLCBOVywgTkUpLlxuICAyLiBEcmF3IHRoZSBvdmVybGF5IHNwcml0ZSB0aGF0IHNob3VsZCBhcHBlYXIgYXQgdGhhdCBqdW5jdGlvbi5cbiAgMy4gQXV0by1zYXZlcyBldmVyeSBzdHJva2UuXG4gIDQuIENsaWNrIFwiU0VORCBUTyBHQU1FXCIgdG8gcHVibGlzaCDigJQgdGhlIG92ZXJsYXkgd2lsbCBhcHBlYXIgaW4tZ2FtZSB3aGVuIGFkamFjZW50IHdhbGxzIGFyZSBkZXRlY3RlZC5cbiAgQmFzZSB3YWxsIHNob3duIGFzIGEgZmFpbnQgYmFja2Ryb3AgZm9yIHJlZmVyZW5jZSAodG9nZ2xlIEV5ZSBidXR0b24pLlxuICBTY3JvbGwgd2hlZWwgb24gY2FudmFzIHRvIHpvb20gaW4vb3V0LlxuICBVbmRvL1JlZG86IENtZCtaIC8gQ21kK1NoaWZ0K1ouXG4gIGxvY2FsU3RvcmFnZTogd2FsbF9saW5rX2xheWVyc192MSAoZHJhZnRzKSwgcHVibGlzaGVkX3dhbGxfbGF5ZXJzX3YxIChwdWJsaXNoZWQpXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxu8J+muCBIRVJPRVMgTUVOVVxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5cbvCfjqggSGVybyBDcmVhdG9yIChTcHJpdGUgRWRpdG9yKVxuICBXaGF0IGl0IGRvZXM6IERyYXcgY3VzdG9tIHBpeGVsLWFydCBzcHJpdGVzIGZvciBoZXJvIGNoYXJhY3RlcnMsIHdpdGggOCBkaXJlY3Rpb25hbCBmcmFtZXMuXG4gIENhbnZhcyBzaXplOiAyNTbDlzI1NiBwaXhlbHMuXG4gIEhvdyB0byB1c2U6XG4gIDEuIFNlbGVjdCBvciBjcmVhdGUgYSBoZXJvIGZyb20gdGhlIGxlZnQgcGFuZWwuXG4gIDIuIENsaWNrIGEgZGlyZWN0aW9uIGluIHRoZSAzw5czIGdyaWQgKE4sIE5FLCBFLCBTRSwgUywgU1csIFcsIE5XKS5cbiAgMy4gRHJhdyB0aGUgc3ByaXRlIG9uIHRoZSBjYW52YXMuXG4gIDQuIEF1dG8tc2F2ZXMgZXZlcnkgc3Ryb2tlLlxuICA1LiBDbGljayBcIlNFTkQgVE8gR0FNRVwiIHRvIHB1Ymxpc2gg4oCUIHRoZSBzcHJpdGUgd2lsbCBhcHBlYXIgaW4tZ2FtZSBvbiBIZXJvIEJhc2UgdGlsZXMgKHVzaW5nIFMgZGlyZWN0aW9uKS5cbiAgRGlyZWN0aW9uIHRodW1ibmFpbHMgdXBkYXRlIGxpdmUuIFN3aXRjaGluZyBkaXJlY3Rpb25zIGF1dG8tc2F2ZXMgYmVmb3JlIGxvYWRpbmcgbmV3IGRpcmVjdGlvbi5cbiAgQ29weSBmcm9tIGFub3RoZXIgZGlyZWN0aW9uOiBjb3BpZXMgdGhhdCBzcHJpdGUgb250byB0aGUgY3VycmVudCBjYW52YXMuXG4gIEZsaXAgSG9yaXpvbnRhbDogbWlycm9ycyB0aGUgY2FudmFzIGhvcml6b250YWxseS5cbiAgU2Nyb2xsIHdoZWVsIG9uIGNhbnZhcyB0byB6b29tIGluL291dC5cbiAgVW5kby9SZWRvOiBDbWQrWiAvIENtZCtTaGlmdCtaLlxuICBsb2NhbFN0b3JhZ2U6IGhlcm9fc3ByaXRlc192MSAoZHJhZnRzKSwgcHVibGlzaGVkX2hlcm9fc3ByaXRlc192MSAocHVibGlzaGVkKVxuXG7inI/vuI8gSGVybyBFZGl0b3IgKFN0YXRzIEVkaXRvcilcbiAgV2hhdCBpdCBkb2VzOiBFZGl0IGhlcm8gc3RhdHMsIHJhcml0eSwgbmFtZSwgYW5kIGRlc2NyaXB0aW9uLlxuICBIb3cgdG8gdXNlOlxuICAxLiBTZWxlY3QgYSBoZXJvIGZyb20gdGhlIGxpc3QuXG4gIDIuIEVkaXQgYW55IGZpZWxkIOKAlCBhdXRvLXNhdmVzIG9uIGV2ZXJ5IGNoYW5nZS5cbiAgMy4gQ3JlYXRlIG5ldyBoZXJvIHRlbXBsYXRlcyB3aXRoIHRoZSArIGJ1dHRvbi5cbiAgNC4gRGVsZXRlIGhlcm9lcyB3aXRoIHRoZSB0cmFzaCBpY29uLlxuICBFZGl0YWJsZSBzdGF0czogSFAsIEF0dGFjaywgRGVmZW5zZSwgU3BlZWQsIEF0dGFjayBTcGVlZCwgUmFuZ2UsIENyaXQgJSwgRG9kZ2UgJSwgUm9sbCBDb3N0LlxuICBsb2NhbFN0b3JhZ2U6IGhlcm9fZGVmaW5pdGlvbnNfdjFcblxu4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBXG5PVEhFUiBERVYgVE9PTFNcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG7impTvuI8gRHVuZ2VvbiBMYXlvdXQgRWRpdG9yXG4gIFdoYXQgaXQgZG9lczogVmlzdWFsbHkgZGVzaWduIHRoZSBidWlsZGluZy9lbmVteSBsYXlvdXQgZm9yIGFueSBkdW5nZW9uIGluIGFueSB0ZXJyaXRvcnkuXG4gIEhvdyB0byBhY2Nlc3M6IERldiBNb2RlIOKGkiBib3R0b20gdG9vbGJhciDihpIgRHVuZ2VvbiBFZGl0b3IgYnV0dG9uLlxuICBHcmlkOiA2NMOXNjQgaXNvbWV0cmljIHRpbGVzLiBBIDQtdGlsZSBmb3Jlc3QgcmluZyBib3JkZXJzIHRoZSBvdXRlciBlZGdlIChuby1idWlsZCB6b25lKS5cblxuICBOQVZJR0FUSU9OOlxuICAtIERyYWcgdG8gcGFuLiBTY3JvbGwgd2hlZWwgdG8gem9vbS4gWm9vbSByZXNldHMgdG8gZml0LWdyaWQgb24gb3Blbi5cbiAgLSBUZXJyaXRvcnkgc2VsZWN0b3IgKGxlZnQgc2lkZWJhcik6IGNsaWNrIHRvIHN3aXRjaCB0ZXJyaXRvcnkuIDQgdGVycml0b3JpZXMgdG90YWwuXG4gIC0gRHVuZ2VvbiBzZWxlY3RvciAobGVmdCBzaWRlYmFyKTogY2xpY2sgdG8gc3dpdGNoIGR1bmdlb24gd2l0aGluIHRoZSB0ZXJyaXRvcnkgKDEwIHBlciB0ZXJyaXRvcnkpLlxuICAtIFJpZ2h0LWNsaWNrIGEgZHVuZ2VvbiBuYW1lIHRvIG9wZW4gaXRzIFJld2FyZHMgZWRpdG9yIChzZXQgZ29sZC9tYW5hL3NoYXJkcy9nZW1zIGZvciB0aGF0IGR1bmdlb24pLlxuXG4gIEVESVRJTkcgTU9ERVMgKGxlZnQgc2lkZWJhcik6XG4gIC0gUGxhY2U6IGNsaWNrIGFuIGVtcHR5IHRpbGUgdG8gcGxhY2UgdGhlIHNlbGVjdGVkIGJ1aWxkaW5nIHR5cGUrbGV2ZWwuIENsaWNraW5nIGFuIG9jY3VwaWVkIHRpbGUgcmVtb3ZlcyBpdC5cbiAgLSBFcmFzZTogY2xpY2sgb3IgZHJhZyBvdmVyIGEgYnVpbGRpbmcgdG8gZGVsZXRlIGl0LiBIb3ZlcmVkIGJ1aWxkaW5ncyBhcmUgaGlnaGxpZ2h0ZWQgcmVkLlxuICAtIFNlbGVjdDogY2xpY2sgYSBidWlsZGluZyB0byBzZWxlY3QgaXQ7IHRoZW4gdXNlIHRoZSByaWdodCBwYW5lbCB0byBjaGFuZ2UgaXRzIGxldmVsLCBtb3ZlIGl0LCBvciBkZWxldGUgaXQuXG5cbiAgQlVJTERJTkcgUEFMRVRURSAocmlnaHQgc2lkZWJhcik6XG4gIC0gQ2hvb3NlIGJ1aWxkaW5nIHR5cGUgZnJvbSB0aGUgbGlzdCAoYWxsIHR5cGVzIGZyb20gQlVJTERJTkdfREVGUykuXG4gIC0gQ2hvb3NlIGxldmVsICgx4oCTMzApIGZyb20gdGhlIG51bWJlciBncmlkLlxuICAtIEluIFBsYWNlIG1vZGUsIHRoZSBob3ZlcmVkIHRpbGUgc2hvd3MgYSB5ZWxsb3cgcHJldmlldzsgb2NjdXBpZWQgdGlsZXMgc2hvdyBhIHJlZCByZW1vdmFsIHByZXZpZXcuXG5cbiAgV0FMTCBQTEFDRU1FTlQgKHNoaWZ0K2NsaWNrIGluIFBsYWNlIG1vZGUgd2l0aCB3YWxsIHNlbGVjdGVkKTpcbiAgLSBTaGlmdCtjbGljayBuZWFyIGFuIGV4aXN0aW5nIHdhbGwgdG8gZmlsbCBhIHN0cmFpZ2h0IGxpbmUgb3V0d2FyZCBmcm9tIGl0IGFsb25nIHRoZSBuZWFyZXN0IGF4aXMuXG4gIC0gTm8gY29zdCBpbiBlZGl0b3IgbW9kZSDigJQgd2FsbHMgYXJlIHBsYWNlZCBpbnN0YW50bHkuXG5cbiAgTU9WRSBtb2RlIChTZWxlY3Qg4oaSIE1vdmUgYnV0dG9uKTpcbiAgLSBBZnRlciBzZWxlY3RpbmcgYSBidWlsZGluZywgY2xpY2sgTW92ZS4gVGhlIGJ1aWxkaW5nIGZvbGxvd3MgeW91ciBtb3VzZSBhcyBhIGdob3N0LlxuICAtIENsaWNrIGFueSB2YWxpZCB0aWxlIHRvIGNvbW1pdDsgaW52YWxpZCB0aWxlcyBhcmUgc2hvd24gaW4gcmVkLlxuXG4gIEtFWUJPQVJEIFNIT1JUQ1VUUzpcbiAgLSBDbWQrWiAob3IgQ3RybCtaKTogVW5kbyBsYXN0IGFjdGlvbi5cbiAgLSBDbWQrT3B0aW9uK1ogKG9yIEN0cmwrQWx0K1opOiBSZWRvLlxuICAtIEhpc3RvcnkgZGVwdGg6IDUwIHN0YXRlcy5cblxuICBTQVZJTkc6XG4gIC0gQ2xpY2sgU0FWRSAodG9wLXJpZ2h0IGdyZWVuIGJ1dHRvbikgdG8gcGVyc2lzdCB0byBsb2NhbFN0b3JhZ2UuXG4gIC0gS2V5IGZvcm1hdDogZHVuZ2Vvbl9sYXlvdXRfdHt0ZXJyaXRvcnl9X2R7ZHVuZ2VvbkluZGV4fVxuICAtIFNhdmVkIGxheW91dHMgYXJlIGxvYWRlZCBhdXRvbWF0aWNhbGx5IGluIGNvbWJhdCBmb3IgdGhlIG1hdGNoaW5nIGR1bmdlb24uXG5cbiAgRU5WSVJPTk1FTlQgQ09MT1JTOlxuICAtIENsaWNrIHRoZSDwn46oIFBhbGV0dGUgYnV0dG9uICh0b3AgYmFyKSB0byBvcGVuIHRoZSBjb2xvciBwaWNrZXIuXG4gIC0gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb3IgZ3JpZCB0aWxlIGNvbG9yIGluZGVwZW5kZW50bHkgdXNpbmcgdGhlIHNwZWN0cnVtIHBpY2tlci5cbiAgLSBDb2xvcnMgYWZmZWN0IG9ubHkgdGhlIGVkaXRvciBkaXNwbGF5LCBub3QgaW4tZ2FtZSByZW5kZXJpbmcuXG5cbiAgQ0xFQVI6XG4gIC0gQ2xpY2sgQ0xFQVIgKHRvcC1yaWdodCByZWQgYnV0dG9uKSBhbmQgY29uZmlybSB0byByZW1vdmUgYWxsIGJ1aWxkaW5ncyBmcm9tIHRoZSBjdXJyZW50IGR1bmdlb24uXG5cbvCflIQgUmVzZXQgR2FtZVxuICBSZXNldHMgYWxsIGdhbWUgUFJPR1JFU1Mgb25seS4gQ3JlYXRlcyBhIGZyZXNoIGtpbmdkb20uXG4gIFdoYXQgaXMgREVMRVRFRDogYnVpbGRpbmdzIChsZXZlbHMgJiBwb3NpdGlvbnMpLCByb2xsZWQgaGVyb2VzLCB0cm9vcHMsIGFzcGVjdHMsIGdlYXIsIHNwZWxscywgcmVzb3VyY2UgcGFja3MsIGR1bmdlb24gcnVucywgYW5kIGFsbCByZXNvdXJjZXMuXG4gIFdoYXQgaXMgUFJFU0VSVkVEOiBhbGwgcGl4ZWwgYXJ0IHNwcml0ZXMgKGRyYWZ0ICYgcHVibGlzaGVkKSwgYnVpbGRpbmcgc3RhdCBvdmVycmlkZXMgKEhQL3RpbWUvY29zdCksIGhlcm8gZGVmaW5pdGlvbnMsIHdhbGwgbGF5ZXIgc3ByaXRlcywgZHVuZ2VvbiBsYXlvdXRzLCBhbmQgdGhpcyBkb2N1bWVudGF0aW9uLlxuICBSZXF1aXJlcyBjb25maXJtYXRpb24uIENhbm5vdCBiZSB1bmRvbmUuXG5cbkdlbSBDb3VudGVyICh0b3AtcmlnaHQsIGRldiBtb2RlIG9ubHkpXG4gIENsaWNrIHRoZSBnZW0gZGlzcGxheSB0byBkaXJlY3RseSBzZXQgeW91ciBnZW0gY291bnQgdG8gYW55IHZhbHVlLlxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcbktFWUJPQVJEIFNIT1JUQ1VUUyBSRUZFUkVOQ0VcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG5QSVhFTCBFRElUT1IgLyBIRVJPIENSRUFUT1IgLyBXQUxMIExBWUVSIEVESVRPUjpcbiAgQ21kK1ogLyBDdHJsK1ogICAgICAgICBVbmRvIGxhc3Qgc3Ryb2tlXG4gIENtZCtTaGlmdCtaICAgICAgICAgICAgUmVkbyAoYWxzbyBDbWQrT3B0aW9uK1ogaW4gc29tZSBlZGl0b3JzKVxuICBTaGlmdCtDbGljayBvbiBjYW52YXMgIERyYXcgYSBzdHJhaWdodCBsaW5lIGZyb20gdGhlIGxhc3QgYW5jaG9yIHBvaW50XG4gIFNjcm9sbCB3aGVlbCAgICAgICAgICAgWm9vbSBpbi9vdXQgb24gdGhlIGNhbnZhc1xuXG5EVU5HRU9OIExBWU9VVCBFRElUT1I6XG4gIENtZCtaIC8gQ3RybCtaICAgICAgICAgVW5kbyAoNTAtc3RlcCBoaXN0b3J5KVxuICBDbWQrT3B0aW9uK1ogICAgICAgICAgIFJlZG9cbiAgU2hpZnQrQ2xpY2sgKHdhbGwpICAgICBGaWxsIGEgc3RyYWlnaHQgd2FsbCBsaW5lIGZyb20gdGhlIGNsaWNrZWQgdGlsZSBvdXR3YXJkXG4gIFNjcm9sbCB3aGVlbCAgICAgICAgICAgWm9vbSBjYW52YXMgaW4vb3V0XG4gIERyYWcgICAgICAgICAgICAgICAgICAgUGFuIHRoZSBkdW5nZW9uIGdyaWRcblxuTUFQIChNYWluIEdhbWUpOlxuICBTY3JvbGwgd2hlZWwgICAgICAgICAgIFpvb20gaW4vb3V0IChjbGFtcGVkIHRvIGZ1bGwtZ3JpZCB2aWV3IG1pbmltdW0pXG4gIERyYWcgICAgICAgICAgICAgICAgICAgUGFuIHRoZSBpc29tZXRyaWMgbWFwXG4gIENsaWNrIGJ1aWxkaW5nICAgICAgICAgT3BlbiBidWlsZGluZyBwYW5lbFxuICBDbGljayBlbXB0eSAgICAgICAgICAgIERlc2VsZWN0IC8gY2xvc2UgcGFuZWxcbiAgUmlnaHQtY2xpY2sgKHNob3ApICAgICBQbGFjZSBidWlsZGluZyBhdCBob3ZlcmVkIHRpbGUgZHVyaW5nIHNob3AgcGxhY2VtZW50IG1vZGVcbiAgU2hpZnQrQ2xpY2sgKHNob3Agd2FsbCkgRmlsbCBhIHN0cmFpZ2h0IHdhbGwgbGluZSBkdXJpbmcgd2FsbCBwbGFjZW1lbnQgbW9kZVxuICBSaWdodC1jbGljayAod2FsbCkgICAgIFNlbGVjdCB0aGUgY29udGlndW91cyB3YWxsIGdyb3VwIChvcGVucyBXYWxsIEdyb3VwIFBhbmVsKWBcbiAgfSxcbiAgcHVibGlzaGluZzoge1xuICAgIHRpdGxlOiBcIlB1Ymxpc2hpbmcgU3ByaXRlc1wiLFxuICAgIGljb246IFwi8J+agFwiLFxuICAgIGNvbnRlbnQ6IGBXSEFUIElTIFBVQkxJU0hJTkc/XG5cblB1Ymxpc2hpbmcgaXMgdGhlIHN0ZXAgdGhhdCBtYWtlcyB5b3VyIHBpeGVsIGFydCBhcHBlYXIgaW4gdGhlIGFjdHVhbCBnYW1lIHdvcmxkLiBUaGVyZSBhcmUgdHdvIHNlcGFyYXRlIHN0b3JhZ2UgbGF5ZXJzOlxuXG4xLiBEUkFGVCAocHJpdmF0ZSkg4oCUIFNhdmVkIGF1dG9tYXRpY2FsbHkgYXMgeW91IGRyYXcuIE9ubHkgdmlzaWJsZSBpbnNpZGUgdGhlIGVkaXRvci4gS2V5ID0gKl92MSBzdG9yZXMuXG4yLiBQVUJMSVNIRUQgKGxpdmUpIOKAlCBXaGF0IGFjdHVhbGx5IHJlbmRlcnMgb24gdGhlIGlzb21ldHJpYyBtYXAuIFN1cnZpdmVzIGFsbCBwYWdlIHJlbG9hZHMuIEtleSA9IHB1Ymxpc2hlZF8qX3YxIHN0b3Jlcy5cblxuUHVibGlzaGluZyBjb3BpZXMgeW91ciBjdXJyZW50IGRyYWZ0IHRvIHRoZSBwdWJsaXNoZWQgbGF5ZXIuIFRoZSBnYW1lJ3MgaXNvbWV0cmljIHJlbmRlcmVyIGFsd2F5cyBjaGVja3MgZm9yIGEgcHVibGlzaGVkIHNwcml0ZSBmaXJzdC4gSWYgbm9uZSBleGlzdHMsIGl0IGZhbGxzIGJhY2sgdG8gdGhlIGVtb2ppIGljb24uXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuSE9XIFRPIFBVQkxJU0hcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG5CdWlsZGluZ3M6XG4xLiBPcGVuIFBpeGVsIEVkaXRvciAoRGV2IE1vZGUg4oaSIEJ1aWxkaW5ncyDihpIgQnVpbGRpbmcgRGVzaWduIEVkaXRvcikuXG4yLiBTZWxlY3QgdGhlIGJ1aWxkaW5nIHR5cGUgYW5kIGxldmVsIHlvdSB3YW50IHRvIHB1Ymxpc2guXG4zLiBEcmF3IHlvdXIgc3ByaXRlIChvciBsb2FkIGFuIGV4aXN0aW5nIG9uZSkuXG40LiBDbGljayB0aGUgeWVsbG93IFwiU0VORCBUTyBHQU1FXCIgYnV0dG9uIGluIHRoZSB0aXRsZSBiYXIuXG41LiBBIGNvbmZpcm1hdGlvbiBwb3B1cCBhcHBlYXJzOiBcIlNlbmQgdG8gR2FtZT9cIiDigJQgY2xpY2sg4pyTIFNFTkQgVE8gR0FNRS5cbjYuIFRoZSBidXR0b24gdHVybnMgZ3JlZW4gYW5kIHNob3dzIFwiTElWRVwiIOKAlCB0aGUgc3ByaXRlIGlzIG5vdyBpbi1nYW1lLlxuNy4gU3dpdGNoIHRvIGFub3RoZXIgbGV2ZWwvYnVpbGRpbmcgYW5kIHJlcGVhdCBhcyBuZWVkZWQuXG5cbldhbGwgTGluayBMYXllcnM6XG4xLiBPcGVuIFdhbGwgTGF5ZXIgRWRpdG9yIChEZXYgTW9kZSDihpIgQnVpbGRpbmdzIOKGkiBXYWxsIExheWVyIEVkaXRvcikuXG4yLiBTZWxlY3Qgd2FsbCBsZXZlbCBhbmQgbGluayBkaXJlY3Rpb24uXG4zLiBEcmF3IHRoZSBvdmVybGF5IHNwcml0ZS5cbjQuIENsaWNrIFwiU0VORCBUTyBHQU1FXCIg4oaSIGNvbmZpcm0uXG41LiBBZGphY2VudCB3YWxscyBvZiB0aGF0IGxldmVsIHdpbGwgbm93IHNob3cgdGhpcyBvdmVybGF5IGluLWdhbWUuXG5cbkhlcm9lczpcbjEuIE9wZW4gSGVybyBDcmVhdG9yIChEZXYgTW9kZSDihpIgSGVyb2VzIOKGkiBDcmVhdGUgSGVybykuXG4yLiBTZWxlY3QgYSBoZXJvIGFuZCBkcmF3IHRoZSBzcHJpdGUgZm9yIGEgZGlyZWN0aW9uIChkZWZhdWx0OiBTIGZvciBpbi1nYW1lIGRpc3BsYXkpLlxuMy4gQ2xpY2sgXCJTRU5EIFRPIEdBTUVcIiDihpIgY29uZmlybS5cbjQuIEFueSBIZXJvIEJhc2Ugd2l0aCB0aGlzIGhlcm8gc3RhdGlvbmVkIHdpbGwgcmVuZGVyIHRoZSBwdWJsaXNoZWQgc3ByaXRlIGFib3ZlIHRoZSBiYXNlLlxuXG7ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIFcblJFTkRFUklORyBMQVlFUlMgKFZpc3VhbCBQcmlvcml0eSlcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG5Gb3IgZWFjaCBidWlsZGluZyB0aWxlLCB0aGUgcmVuZGVyIG9yZGVyIChib3R0b20g4oaSIHRvcCkgaXM6XG4xLiBHcm91bmQgdGlsZSAoZ3Jhc3MpXG4yLiBCdWlsZGluZyAzRCBmYWNlcyAobGVmdCwgcmlnaHQsIHRvcClcbjMuIFB1Ymxpc2hlZCBidWlsZGluZyBzcHJpdGUgKG9uIHRoZSB0b3AgZmFjZSlcbjQuIEhlcm8gc3ByaXRlIChyZW5kZXJlZCBBQk9WRSB0aGUgYnVpbGRpbmcsIGF0IGEgaGlnaGVyIFkgb2Zmc2V0KVxuNS4gTGV2ZWwgYmFkZ2UsIHVwZ3JhZGUgaW5kaWNhdG9yLCBzZWxlY3Rpb24gb3V0bGluZVxuXG5Gb3Igd2FsbHMgc3BlY2lmaWNhbGx5OlxuMS4gV2FsbCBidWlsZGluZyBibG9jayAoM0QgZ2VvbWV0cnkpXG4yLiBQdWJsaXNoZWQgd2FsbCBzcHJpdGUgKG9uIHRvcCBmYWNlLCBpZiBhbnkpXG4zLiBQdWJsaXNoZWQgd2FsbCBsaW5rLWxheWVyIG92ZXJsYXlzIChvbmUgcGVyIGFkamFjZW50IG5laWdoYm9yIGRpcmVjdGlvbilcblxuSGVybyB2aXN1YWwgc3RhY2tpbmcgb24gSGVybyBCYXNlOlxuLSBIZXJvIEJhc2UgcHVibGlzaGVkIHNwcml0ZSByZW5kZXJzIGZpcnN0IChvbiB0aGUgdG9wIGZhY2UpLlxuLSBIZXJvIHNwcml0ZSByZW5kZXJzIGFib3ZlIGl0IOKAlCBhbHdheXMgaW4gZnJvbnQuXG4tIFRoaXMgbWVhbnMgZXZlbiBpZiB5b3VyIEhlcm8gQmFzZSBoYXMgYXJ0LCB0aGUgaGVybyB3aWxsIHZpc3VhbGx5IHN0YW5kIFwib24gdG9wIG9mXCIgdGhlIGJhc2UuXG5cbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuRkFMTEJBQ0sgQkVIQVZJT1JcbuKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgVxuXG5JZiBhIGJ1aWxkaW5nIHR5cGUrbGV2ZWwgaGFzIE5PIHB1Ymxpc2hlZCBzcHJpdGUg4oaSIGVtb2ppIGljb24gcmVuZGVyZWQuXG5JZiBhIGJ1aWxkaW5nIGhhcyBhIERSQUZUIGJ1dCBub3QgcHVibGlzaGVkIOKGkiBlbW9qaSBpY29uIGluIGdhbWUgKGVkaXRvciBzdGlsbCBzaG93cyBkcmFmdCkuXG5JZiBhIGhlcm8gaGFzIE5PIHB1Ymxpc2hlZCBzcHJpdGUg4oaSIGRlZmF1bHQgaGVybyBwb3J0cmFpdCB1c2VkLlxuSWYgYSB3YWxsIGxheWVyIGlzIG5vdCBwdWJsaXNoZWQg4oaSIG5vIG92ZXJsYXkgcmVuZGVyZWQgKHdhbGxzIGxvb2sgcGxhaW4vdW5jb25uZWN0ZWQpLmBcbiAgfSxcbiAgcGVyc2lzdGVuY2U6IHtcbiAgICB0aXRsZTogXCJEYXRhICYgUGVyc2lzdGVuY2VcIixcbiAgICBpY29uOiBcIvCfkr5cIixcbiAgICBjb250ZW50OiBgREFUQSBTVE9SQUdFIE9WRVJWSUVXOlxuXG5UaGUgZ2FtZSB1c2VzIHR3byBzdG9yYWdlIHN5c3RlbXM6XG5cbjEuIENMT1VEIERBVEFCQVNFIChCYXNlNDQgZW50aXRpZXMpXG4gICAtIFN0b3JlcyBhbGwgcGxheWVyIHByb2dyZXNzOiBidWlsZGluZ3MsIGhlcm9lcywgdHJvb3BzLCByZXNvdXJjZXMsIGR1bmdlb24gcnVucy5cbiAgIC0gVGllZCB0byB5b3VyIHVzZXIgYWNjb3VudC4gUGVyc2lzdHMgYWNyb3NzIGRldmljZXMgYW5kIGJyb3dzZXJzLlxuICAgLSBBdXRvbWF0aWNhbGx5IHN5bmNlZCBldmVyeSAzMCBzZWNvbmRzIGZvciByZXNvdXJjZXMuXG4gICAtIEVudGl0aWVzOiBQbGF5ZXJCYXNlLCBCdWlsZGluZywgSGVybywgVHJvb3AsIEFzcGVjdCwgR2VhciwgU3BlbGwsIER1bmdlb24sIER1bmdlb25SdW4sIFJlc291cmNlUGFjaywgU2hvcEl0ZW0uXG5cbjIuIEJST1dTRVIgbG9jYWxTdG9yYWdlXG4gICAtIFN0b3JlcyBkZXZlbG9wZXIvY3JlYXRpdmUgYXNzZXRzOiBzcHJpdGVzLCBzdGF0IG92ZXJyaWRlcywgZHVuZ2VvbiBsYXlvdXRzLCBkb2N1bWVudGF0aW9uLlxuICAgLSBQZXJzaXN0cyBvbiB0aGUgc2FtZSBicm93c2VyL2RldmljZSBvbmx5LlxuICAgLSBDbGVhcmluZyBicm93c2VyIGRhdGEgd2lsbCB3aXBlIHRoZXNlIChidXQgbm90IGNsb3VkIGRhdGEpLlxuXG5MT0NBTFNUT1JBR0UgS0VZUzpcbiAgYnVpbGRpbmdfc3ByaXRlc192MSAgICAgICAgICAgIOKGkiBEcmFmdCBidWlsZGluZyBwaXhlbCBhcnQgKFBORyBiYXNlNjQpXG4gIHB1Ymxpc2hlZF9idWlsZGluZ19zcHJpdGVzX3YxICDihpIgUHVibGlzaGVkIGJ1aWxkaW5nIHNwcml0ZXMgKHdoYXQgcmVuZGVycyBpbi1nYW1lKVxuICBidWlsZGluZ19ocF9vdmVycmlkZXNfdjEgICAgICAg4oaSIEhQIG92ZXJyaWRlIHRhYmxlXG4gIGJ1aWxkaW5nX3RpbWVfb3ZlcnJpZGVzX3YxICAgICDihpIgVXBncmFkZSB0aW1lIG92ZXJyaWRlIHRhYmxlXG4gIGJ1aWxkaW5nX2Nvc3Rfb3ZlcnJpZGVzX3YxICAgICDihpIgVXBncmFkZSBjb3N0IG92ZXJyaWRlIHRhYmxlXG4gIGhlcm9fZGVmaW5pdGlvbnNfdjEgICAgICAgICAgICDihpIgQ3VzdG9tIGhlcm8gc3RhdCB0ZW1wbGF0ZXNcbiAgaGVyb19zcHJpdGVzX3YxICAgICAgICAgICAgICAgIOKGkiBEcmFmdCBoZXJvIHBpeGVsIGFydCAoUE5HIGJhc2U2NCBwZXIgaGVyb0lkK2RpcmVjdGlvbilcbiAgcHVibGlzaGVkX2hlcm9fc3ByaXRlc192MSAgICAgIOKGkiBQdWJsaXNoZWQgaGVybyBzcHJpdGVzIChyZW5kZXJzIG9uIEhlcm8gQmFzZSB0aWxlcylcbiAgd2FsbF9sYXllcl9zcHJpdGVzX3YxICAgICAgICAgIOKGkiBEcmFmdCB3YWxsIGxpbmsgbGF5ZXIgc3ByaXRlc1xuICBwdWJsaXNoZWRfd2FsbF9sYXllcnNfdjEgICAgICAg4oaSIFB1Ymxpc2hlZCB3YWxsIGxpbmsgbGF5ZXJzIChyZW5kZXJzIG9uIGFkamFjZW50IHdhbGxzKVxuICBkdW5nZW9uX2xheW91dF90e1R9X2R7RH0gICAgICAg4oaSIEN1c3RvbSBkdW5nZW9uIGVuZW15IGxheW91dHNcbiAgZGV2X2RvY3VtZW50YXRpb25fdjIgICAgICAgICAgIOKGkiBUaGlzIGRvY3VtZW50YXRpb24gZmlsZVxuXG5FTlRJVFkgU0NIRU1BUzpcbiAgUGxheWVyQmFzZTogZ29sZCwgbWFuYSwgc291bF9zaGFyZHMsIGdlbXMsIGNhcGFjaXRpZXMsIHJlc291cmNlIHJhdGVzLCBUSCBsZXZlbCwgb3ZlcmZsb3cgdHJhY2tpbmdcbiAgQnVpbGRpbmc6IHBsYXllcl9pZCwgYnVpbGRpbmdfdHlwZSwgbGV2ZWwsIGdyaWRfeCwgZ3JpZF95LCBmb290cHJpbnRfdy9oLCBocCwgbWF4X2hwLCBpc191cGdyYWRpbmcsIHVwZ3JhZGVfc3RhcnRlZF9hdCwgdXBncmFkZV9kdXJhdGlvbl9zZWNvbmRzLCBjdXN0b21fZGF0YVxuICBIZXJvOiBwbGF5ZXJfaWQsIGhlcm9fdHlwZSwgbmFtZSwgcmFyaXR5LCBsZXZlbCwgZXhwZXJpZW5jZSwgaHAsIG1heF9ocCwgYXR0YWNrLCBkZWZlbnNlLCBzcGVlZCwgc3RhdGlvbmVkX2F0X2J1aWxkaW5nX2lkLCBwb3J0cmFpdCwgYXNwZWN0X2lkcywgaXNfdW5sb2NrZWRcbiAgVHJvb3A6IHBsYXllcl9pZCwgdHJvb3BfdHlwZSwgY291bnQsIGxldmVsLCBhcm15X2NhbXBfaWQsIHRyYWluaW5nIHN0YXRlLCBzdGF0c1xuICBBc3BlY3Q6IHBsYXllcl9pZCwgYXNwZWN0X3R5cGUsIG5hbWUsIHJhcml0eSwgc3RhdF9ib251c190eXBlLCBzdGF0X2JvbnVzX3ZhbHVlLCB1cGdyYWRlX2Nvc3Rfc2hhcmRzLCBlcXVpcHBlZF9oZXJvX2lkXG4gIEdlYXI6IHBsYXllcl9pZCwgZ2Vhcl90eXBlLCBuYW1lLCByYXJpdHksIHN0YXRfYm9udXNfdHlwZSwgc3RhdF9ib251c192YWx1ZSwgZXF1aXBwZWRfaGVyb19pZFxuICBTcGVsbDogcGxheWVyX2lkLCBzcGVsbF90eXBlLCBuYW1lLCBsZXZlbCwgZWZmZWN0X3ZhbHVlLCBkdXJhdGlvbl9zZWNvbmRzLCBjb29sZG93bl9zZWNvbmRzLCBpc19hY3RpdmVcbiAgRHVuZ2VvbjogZHVuZ2Vvbl9udW1iZXIsIG5hbWUsIGlzX2Jvc3NfZHVuZ2VvbiwgZW5lbXkgZGF0YSwgcmV3YXJkc1xuICBEdW5nZW9uUnVuOiBwbGF5ZXJfaWQsIGR1bmdlb25fbnVtYmVyLCBzdGF0dXMsIGhlcm9faWRzLCB0cm9vcF9zbmFwc2hvdCwgY29tYmF0X2xvZ2BcbiAgfSxcbiAgZm9ybXVsYXM6IHtcbiAgICB0aXRsZTogXCJGb3JtdWxhcyAmIFNjYWxpbmdcIixcbiAgICBpY29uOiBcIvCfk5BcIixcbiAgICBjb250ZW50OiBgVVBHUkFERSBDT1NUIEZPUk1VTEFTIChuID0gdGFyZ2V0X2xldmVsIC0gMik6XG5cbk5vbi1USCBidWlsZGluZ3M6IDUwMCDDlyAxLjQ5NzReblxuICBMZXZlbCAyID0gNTAwIGdvbGQgfCBMZXZlbCAxMCA9IH4yNiwwMDAgfCBMZXZlbCAyMCA9IH4xLjlNIHwgTGV2ZWwgMzAgPSB+NDBNXG5cblRvd24gSGFsbDogMTAwMCDDlyAxLjUwMzZeblxuICBMZXZlbCAyID0gMSwwMDAgZ29sZCB8IExldmVsIDEwID0gfjUzLDAwMCB8IExldmVsIDIwID0gfjRNIHwgTGV2ZWwgMzAgPSB+MTAwTVxuXG5XYWxsczogMTAwIMOXIDEuMzU5NF5uXG4gIExldmVsIDIgPSAxMDAgfCBMZXZlbCAxMCA9IH4zLDAwMCB8IExldmVsIDIwID0gfjE3MGsgfCBMZXZlbCAzMCA9IH41TVxuXG5VUEdSQURFIFRJTUUgRk9STVVMQVMgKHNlY29uZHMsIG4gPSB0YXJnZXRfbGV2ZWwgLSAyKTpcblxuTm9uLVRIOiAzMCDDlyAxLjQ1NDZeblxuICBMZXZlbCAyID0gMzBzIHwgTGV2ZWwgNSA9IH4zbWluIHwgTGV2ZWwgMTAgPSB+MmggfCBMZXZlbCAyMCA9IH4zIGRheXMgfCBMZXZlbCAzMCA9IH4xMiBkYXlzXG5cblRvd24gSGFsbDogMTIwIMOXIDEuNDExMV5uXG4gIExldmVsIDIgPSAxMjBzIHwgTGV2ZWwgNSA9IH4xMG1pbiB8IExldmVsIDEwID0gfjZoIHwgTGV2ZWwgMjAgPSB+NSBkYXlzIHwgTGV2ZWwgMzAgPSB+MjQgZGF5c1xuXG5XYWxsczogMTAgw5cgMS40NV5uXG5cbkdFTSBTUEVFRC1VUCBDT1NUOlxuICBjb3N0ID0gY2VpbCgobWludXRlc19yZW1haW5pbmcpXjEuMilcbiAgRXhhbXBsZTogNjAgbWluIHJlbWFpbmluZyA9IGNlaWwoNjBeMS4yKSA9IGNlaWwoMTA1LjcpID0gMTA2IGdlbXNcblxuSFAgU0NBTElORzpcbiAgVG93biBIYWxsOiAgICAgIEx2MT0yayDihpIgTHYxNT05MGsg4oaSIEx2MjM9MjI1ayDihpIgTHYzMD03NTBrXG4gIEhlcm8gQmFzZTogICAgICBMdjE9NzAwIOKGkiBMdjMwPTIwMGtcbiAgTWluZS9NaWxsOiAgICAgIEx2MT02MDAg4oaSIEx2MzA9MTgwa1xuICBBcm15IENhbXA6ICAgICAgTHYxPTFrIOKGkiBMdjMwPTI1MGtcbiAgRGVmZW5zZSBUb3dlcjogIEx2MT0xLjVrIOKGkiBMdjMwPTMwMGtcbiAgQWx0YXI6ICAgICAgICAgIEx2MT0yayDihpIgTHYxMDA9MzMwa1xuICBXYWxsOiAgICAgICAgICAgTHYxPTUwMCDihpIgTHYxNT01MGsg4oaSIEx2MzA9MzAwa1xuXG5SRVNPVVJDRSBQUk9EVUNUSU9OOlxuICBHb2xkL01hbmEgcGVyIGhvdXIgc2NhbGVzIHdpdGggbWluZS92YXVsdCBsZXZlbC5cbiAgT2ZmbGluZSBwcm9ncmVzcyA9IGVsYXBzZWQgaG91cnMgw5cgcmF0ZSAoY2FwcGVkIGF0IGNhcGFjaXR5KS5cbiAgUmVzb3VyY2UgdGljayBydW5zIGV2ZXJ5IDMwIHNlY29uZHMgaW4tZ2FtZS5cblxuT1ZFUlJJREVTOlxuICBBbnkgZm9ybXVsYSB2YWx1ZSBjYW4gYmUgb3ZlcnJpZGRlbiB2aWEgQnVpbGRpbmcgU3RhdHMgRWRpdG9yLlxuICBPdmVycmlkZXMgYXJlIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2UgYW5kIHRha2UgcHJpb3JpdHkgb3ZlciBmb3JtdWxhIGNhbGN1bGF0aW9ucy5gXG4gIH1cbn07XG5cbmNvbnN0IENBVEVHT1JZX09SREVSID0gW1wib3ZlcnZpZXdcIiwgXCJyZXNvdXJjZXNcIiwgXCJidWlsZGluZ3NcIiwgXCJoZXJvZXNcIiwgXCJkdW5nZW9uc1wiLCBcImRldlRvb2xzXCIsIFwicHVibGlzaGluZ1wiLCBcInBlcnNpc3RlbmNlXCIsIFwiZm9ybXVsYXNcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERldkRvY3VtZW50YXRpb24oeyBvbkNsb3NlIH0pIHtcbiAgY29uc3QgW3NlbGVjdGVkQ2F0LCBzZXRTZWxlY3RlZENhdF0gPSB1c2VTdGF0ZShcIm92ZXJ2aWV3XCIpO1xuICBjb25zdCBbc2VjdGlvbnMsIHNldFNlY3Rpb25zXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG4gICAgICByZXR1cm4gc2F2ZWQgPyBKU09OLnBhcnNlKHNhdmVkKSA6IERFRkFVTFRfU0VDVElPTlM7XG4gICAgfSBjYXRjaCB7cmV0dXJuIERFRkFVTFRfU0VDVElPTlM7fVxuICB9KTtcbiAgY29uc3QgW2VkaXRpbmcsIHNldEVkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZWRpdENvbnRlbnQsIHNldEVkaXRDb250ZW50XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2F2ZWRGbGFzaCwgc2V0U2F2ZWRGbGFzaF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9uc1tzZWxlY3RlZENhdF0gfHwgREVGQVVMVF9TRUNUSU9OU1tzZWxlY3RlZENhdF07XG5cbiAgY29uc3QgaGFuZGxlRWRpdCA9ICgpID0+IHtcbiAgICBzZXRFZGl0Q29udGVudChjdXJyZW50U2VjdGlvbi5jb250ZW50KTtcbiAgICBzZXRFZGl0aW5nKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSAoKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZCA9IHsgLi4uc2VjdGlvbnMsIFtzZWxlY3RlZENhdF06IHsgLi4uY3VycmVudFNlY3Rpb24sIGNvbnRlbnQ6IGVkaXRDb250ZW50IH0gfTtcbiAgICBzZXRTZWN0aW9ucyh1cGRhdGVkKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIHNldEVkaXRpbmcoZmFsc2UpO1xuICAgIHNldFNhdmVkRmxhc2godHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTYXZlZEZsYXNoKGZhbHNlKSwgMTUwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xuICAgIHNldEVkaXRpbmcoZmFsc2UpO1xuICAgIHNldEVkaXRDb250ZW50KFwiXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIGlmIChjb25maXJtKFwiUmVzZXQgdGhpcyBzZWN0aW9uIHRvIGRlZmF1bHQ/XCIpKSB7XG4gICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5zZWN0aW9ucywgW3NlbGVjdGVkQ2F0XTogREVGQVVMVF9TRUNUSU9OU1tzZWxlY3RlZENhdF0gfTtcbiAgICAgIHNldFNlY3Rpb25zKHVwZGF0ZWQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQpKTtcbiAgICAgIGlmIChlZGl0aW5nKSB7c2V0RWRpdENvbnRlbnQoREVGQVVMVF9TRUNUSU9OU1tzZWxlY3RlZENhdF0uY29udGVudCk7fVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZCA9ICgpID0+IHtcbiAgICBsZXQgbWQgPSBcIiMgS0lOR0RPTSBCVUlMREVSIOKAlCBERVZFTE9QRVIgV0lLSVxcblxcblwiO1xuICAgIGZvciAoY29uc3QgayBvZiBDQVRFR09SWV9PUkRFUikge1xuICAgICAgY29uc3QgcyA9IHNlY3Rpb25zW2tdIHx8IERFRkFVTFRfU0VDVElPTlNba107XG4gICAgICBtZCArPSBgIyMgJHtzLmljb259ICR7cy50aXRsZX1cXG5cXG4ke3MuY29udGVudH1cXG5cXG4tLS1cXG5cXG5gO1xuICAgIH1cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW21kXSwgeyB0eXBlOiBcInRleHQvbWFya2Rvd25cIiB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBhLmhyZWYgPSB1cmw7YS5kb3dubG9hZCA9IFwia2luZ2RvbS1idWlsZGVyLXdpa2kubWRcIjthLmNsaWNrKCk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjU3MTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzg1XCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTcyOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sXCIgc3R5bGU9e3sgd2lkdGg6IFwibWluKDExMDBweCwgOTZ2dylcIiwgaGVpZ2h0OiBcIjkydmhcIiwgYmFja2dyb3VuZDogXCIjZmZmZmZmXCIsIGJvcmRlcjogXCIycHggc29saWQgIzMzNDE1NVwiLCBib3hTaGFkb3c6IFwiMCAwIDQwcHggcmdiYSgwLDAsMCwwLjgpXCIgfX0+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1NzQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHB5LTMgYm9yZGVyLWIgZmxleC1zaHJpbmstMFwiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiNlMmU4ZjBcIiwgYmFja2dyb3VuZDogXCIjZjFmNWY5XCIgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjU3NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPEJvb2tPcGVuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTc2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTcwMFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTc3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTc4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bMTBweF0gdGV4dC1hbWJlci03MDBcIj5ERVZFTE9QRVIgV0lLSTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTc5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPktpbmdkb20gQnVpbGRlciDCtyBDbGljayBhIGNhdGVnb3J5IHRvIHJlYWQgwrcgRWRpdCBhbnkgc2VjdGlvbiDCtyBQZXJzaXN0cyBvbiByZWxvYWQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1ODI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAge3NhdmVkRmxhc2ggJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1ODM6MjdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtZ3JlZW4tNDAwIGFuaW1hdGUtcHVsc2VcIj7inJMgU2F2ZWQhPC9zcGFuPn1cbiAgICAgICAgICAgIHshZWRpdGluZyAmJlxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTg2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlRWRpdH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC11aSB0ZXh0LXhzIHB4LTMgcHktMSByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWUyOTNiXCIsIGNvbG9yOiBcIiM5NGEzYjhcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMzM0MTU1XCIgfX0+XG4gICAgICAgICAgICAgICAgICA8RWRpdDMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1ODc6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTJ9IC8+IEVkaXQgU2VjdGlvblxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1ODk6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVSZXNldH0gY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHB4LTIgcHktMSByb3VuZGVkIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtMzAwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWUyOTNiXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzFlMjkzYlwiIH19PlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge2VkaXRpbmcgJiZcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjU5NDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZUNhbmNlbH0gY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHB4LTMgcHktMSByb3VuZGVkIHRleHQtc2xhdGUtNDAwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWUyOTNiXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzMzNDE1NVwiIH19PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo1OTU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVTYXZlfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LXVpIHRleHQteHMgcHgtMyBweS0xIHJvdW5kZWRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxNjY1MzRcIiwgY29sb3I6IFwiIzRhZGU4MFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YWRlODBcIiB9fT5cbiAgICAgICAgICAgICAgICAgIDxTYXZlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NTk2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSAvPiBTYXZlXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYwMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LXVpIHRleHQteHMgcHgtMyBweS0xIHJvdW5kZWRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxZTI5M2JcIiwgY29sb3I6IFwiIzk0YTNiOFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMzMzQxNTVcIiB9fT5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjAxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSAvPiBFeHBvcnRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYwMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgbWwtMVwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjAzOjg3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezIwfSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjA3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtMSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICB7LyogU2lkZWJhciDigJQgY2xpY2thYmxlIGNhdGVnb3JpZXMgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYwOToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgYm9yZGVyLXIgb3ZlcmZsb3cteS1hdXRvXCIgc3R5bGU9e3sgd2lkdGg6IDIwMCwgYm9yZGVyQ29sb3I6IFwiI2UyZThmMFwiLCBiYWNrZ3JvdW5kOiBcIiNmOGZhZmNcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2MTA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwicHgtMyBweS0yIGZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+Q2F0ZWdvcmllczwvZGl2PlxuICAgICAgICAgICAge0NBVEVHT1JZX09SREVSLm1hcCgoa2V5LCBfX2FycklkeF9fKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHMgPSBzZWN0aW9uc1trZXldIHx8IERFRkFVTFRfU0VDVElPTlNba2V5XTtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBzZWxlY3RlZENhdCA9PT0ga2V5O1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2MTU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2tleX0gb25DbGljaz17KCkgPT4ge3NldFNlbGVjdGVkQ2F0KGtleSk7c2V0RWRpdGluZyhmYWxzZSk7fX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHB4LTMgcHktMi41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBpc0FjdGl2ZSA/IFwiI2ZlZjllY1wiIDogXCJ0cmFuc3BhcmVudFwiLCBib3JkZXJMZWZ0OiBpc0FjdGl2ZSA/IFwiM3B4IHNvbGlkICNkOTc3MDZcIiA6IFwiM3B4IHNvbGlkIHRyYW5zcGFyZW50XCIgfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJDQVRFR09SWV9PUkRFUlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2MTg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2VcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImljb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cz8uaWQgfHwgcz8uX2lkfSBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIkNBVEVHT1JZX09SREVSXCI+e3MuaWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYxOToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyBsZWFkaW5nLXRpZ2h0XCIgc3R5bGU9e3sgY29sb3I6IGlzQWN0aXZlID8gXCIjOTI0MDBlXCIgOiBcIiM0NzU1NjlcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRpdGxlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3M/LmlkIHx8IHM/Ll9pZH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJDQVRFR09SWV9PUkRFUlwiPntzLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xuXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBNYWluIGNvbnRlbnQgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYyNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgey8qIFNlY3Rpb24gdGl0bGUgYmFyICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYyODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTUgcHktMyBib3JkZXItYiBmbGV4LXNocmluay0wXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiI2UyZThmMFwiLCBiYWNrZ3JvdW5kOiBcIiNmYWZhZmFcIiB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2Mjk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJpY29uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2N1cnJlbnRTZWN0aW9uPy5pZCB8fCBjdXJyZW50U2VjdGlvbj8uX2lkfT57Y3VycmVudFNlY3Rpb24uaWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjMwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTcwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGl0bGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y3VycmVudFNlY3Rpb24/LmlkIHx8IGN1cnJlbnRTZWN0aW9uPy5faWR9PntjdXJyZW50U2VjdGlvbi50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgIHshZWRpdGluZyAmJlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYzMjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJtbC1hdXRvIGZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5DbGljayBcIkVkaXQgU2VjdGlvblwiIHRvIG1vZGlmeSB0aGlzIHBhZ2U8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ29udGVudCBhcmVhICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjYzNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgICAge2VkaXRpbmcgP1xuICAgICAgICAgICAgICA8dGV4dGFyZWEgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2Mzk6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgdmFsdWU9e2VkaXRDb250ZW50fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRDb250ZW50KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBwLTYgb3V0bGluZS1ub25lIHJlc2l6ZS1ub25lIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbGluZUhlaWdodDogXCIxLjc1XCIsIG1pbkhlaWdodDogXCIxMDAlXCIsIGJhY2tncm91bmQ6IFwiI2ZmZmZmZlwiIH19IC8+IDpcblxuXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2NDc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwLTZcIj5cbiAgICAgICAgICAgICAgICAgIDxXaWtpQ29udGVudCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjY0ODoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbnRlbnQ9e2N1cnJlbnRTZWN0aW9uLmNvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRDYXQgPT09IFwiaGVyb2VzXCIgJiYgPEhlcm9Sb3N0ZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2NDk6NDdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn1cblxuY29uc3QgUkFSSVRZX0NPTE9SU19ET0MgPSB7XG4gIGNvbW1vbjogXCIjOWNhM2FmXCIsIHVuY29tbW9uOiBcIiM0YWRlODBcIiwgcmFyZTogXCIjNjBhNWZhXCIsIGVwaWM6IFwiI2MwODRmY1wiLCBsZWdlbmRhcnk6IFwiI2Y1OWUwYlwiXG59O1xuY29uc3QgUkFSSVRZX0JHX0RPQyA9IHtcbiAgY29tbW9uOiBcIiNmMWY1ZjlcIiwgdW5jb21tb246IFwiI2YwZmRmNFwiLCByYXJlOiBcIiNlZmY2ZmZcIiwgZXBpYzogXCIjZmFmNWZmXCIsIGxlZ2VuZGFyeTogXCIjZmZmYmViXCJcbn07XG5cbmZ1bmN0aW9uIEhlcm9Sb3N0ZXIoKSB7XG4gIGNvbnN0IGhlcm9lcyA9IGdldEFsbEN1c3RvbUhlcm9lcygpO1xuICBpZiAoaGVyb2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjcyOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJtdC04XCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjczOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1hbWJlci03MDAgbXQtNCBtYi0zIHB0LTJcIiBzdHlsZT17eyBib3JkZXJUb3A6IFwiMXB4IHNvbGlkICNlMmU4ZjBcIiB9fT5cbiAgICAgICAgSEVSTyBST1NURVIgKHtoZXJvZXMubGVuZ3RofSBkZWZpbmVkKVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246Njc2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIHtoZXJvZXMubWFwKChoZXJvKSA9PiB7XG4gICAgICAgICAgY29uc3QgcG9ydHJhaXQgPSBnZXRIZXJvU3ByaXRlKGhlcm8uaWQsIFwiU1wiKTtcbiAgICAgICAgICBjb25zdCByYXJpdHlDb2xvciA9IFJBUklUWV9DT0xPUlNfRE9DW2hlcm8ucmFyaXR5XSB8fCBcIiM5Y2EzYWZcIjtcbiAgICAgICAgICBjb25zdCByYXJpdHlCZyA9IFJBUklUWV9CR19ET0NbaGVyby5yYXJpdHldIHx8IFwiI2YxZjVmOVwiO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NjgyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtoZXJvLmlkfSBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHAtNCBmbGV4IGdhcC0zIGJvcmRlclwiXG4gICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiByYXJpdHlCZywgYm9yZGVyQ29sb3I6IHJhcml0eUNvbG9yICsgXCI2NlwiLCBib3JkZXJXaWR0aDogMiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aGVybz8uaWR9PlxuICAgICAgICAgICAgICB7LyogUG9ydHJhaXQgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2ODU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmbGV4LXNocmluay0wIGJvcmRlci0yXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGQwZDFhXCIsIGJvcmRlckNvbG9yOiByYXJpdHlDb2xvciB9fT5cbiAgICAgICAgICAgICAgICB7cG9ydHJhaXQgP1xuICAgICAgICAgICAgICAgIDxpbWcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2ODg6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e3BvcnRyYWl0fSBzdHlsZT17eyB3aWR0aDogNTYsIGhlaWdodDogNTYsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiIH19IGFsdD17aGVyby5uYW1lfSAvPiA6XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2ODk6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBmb250U2l6ZTogMzIgfX0+8J+muDwvc3Bhbj59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7LyogSW5mbyAqL31cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjY5MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkZXNjcmlwdGlvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoZXJvPy5pZH0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjY5MzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTAuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2OTQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF1cIiBzdHlsZT17eyBjb2xvcjogcmFyaXR5Q29sb3IgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2hlcm8/LmlkfT57aGVyby5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246Njk1OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs5cHhdIHB4LTEuNSBweS0wLjUgcm91bmRlZCBjYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHJhcml0eUNvbG9yICsgXCIyMlwiLCBjb2xvcjogcmFyaXR5Q29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInJhcml0eVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoZXJvPy5pZH0+e2hlcm8ucmFyaXR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtoZXJvLmlzX3JvbGxhYmxlID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo2OTg6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gcHgtMS41IHB5LTAuNSByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZmVlMmUyXCIsIGNvbG9yOiBcIiNkYzI2MjZcIiB9fT5oaWRkZW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2hlcm8uZGVzY3JpcHRpb24gJiYgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjcwMTozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgbWItMSB0cnVuY2F0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZGVzY3JpcHRpb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aGVybz8uaWR9PntoZXJvLmRlc2NyaXB0aW9ufTwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzAyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMSBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogXCJIUFwiLCB2YWw6IGhlcm8uaHAgfSxcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6IFwiQVRLXCIsIHZhbDogaGVyby5hdHRhY2sgfSxcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6IFwiREVGXCIsIHZhbDogaGVyby5kZWZlbnNlIH0sXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsOiBcIlNQRFwiLCB2YWw6IGhlcm8uc3BlZWQgfSxcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWw6IFwiUk5HXCIsIHZhbDogaGVyby5yYW5nZSB9LFxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogXCJDUklUXCIsIHZhbDogYCR7aGVyby5jcml0X2NoYW5jZX0lYCB9LFxuICAgICAgICAgICAgICAgICAgeyBsYWJlbDogXCJET0RHRVwiLCB2YWw6IGAke2hlcm8uZG9kZ2VfY2hhbmNlfSVgIH0sXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsOiBcIvCfko5cIiwgdmFsOiBoZXJvLmdlbV9jb3N0IH1dLlxuICAgICAgICAgICAgICAgICAgbWFwKCh7IGxhYmVsLCB2YWwsIGlkIH0pID0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzEzOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtsYWJlbH0gY2xhc3NOYW1lPVwicm91bmRlZCBwLTEgdGV4dC1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC4wNilcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzE0OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNDAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3MTU6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9Pnt2YWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufVxuXG4vLyBSZW5kZXJzIHdpa2kgY29udGVudCB3aXRoIHN0eWxlZCBmb3JtYXR0aW5nXG5mdW5jdGlvbiBXaWtpQ29udGVudCh7IGNvbnRlbnQgfSkge1xuICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjczMjo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICB7bGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCLilIFcIikpIHtcbiAgICAgICAgICByZXR1cm4gPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjczNToxN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNDAwIG10LTQgbWItMSBwdC0xXCIgc3R5bGU9e3sgYm9yZGVyVG9wOiBcIjFweCBzb2xpZCAjZTJlOGYwXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsaW5lXCI+e2xpbmV9PC9kaXY+O1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCIjIyBcIikpIHtcbiAgICAgICAgICByZXR1cm4gPGgyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzM4OjE3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzEwcHhdIHRleHQteWVsbG93LTcwMCBtdC01IG1iLTJcIj57bGluZS5zbGljZSgzKX08L2gyPjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiIyBcIikpIHtcbiAgICAgICAgICByZXR1cm4gPGgxIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzQxOjE3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzEycHhdIHRleHQteWVsbG93LTgwMCBtYi0zXCI+e2xpbmUuc2xpY2UoMil9PC9oMT47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9eW0EtWl1bQS1aXFxzJigpOl0rOiQvLnRlc3QobGluZS50cmltKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3NDQ6MTdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LWFtYmVyLTcwMCBtdC00IG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxpbmVcIj57bGluZX08L2Rpdj47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIi0gXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGxpbmUuc2xpY2UoMik7XG4gICAgICAgICAgY29uc3QgYm9sZE1hdGNoID0gdGV4dC5tYXRjaCgvXlxcKlxcKiguKz8pXFwqXFwqKC4qKSQvKTtcbiAgICAgICAgICBpZiAoYm9sZE1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzUxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1sLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjc1MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3NTM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjc1NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57Ym9sZE1hdGNoWzFdfTwvc3Bhbj57Ym9sZE1hdGNoWzJdfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjc2MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtbC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzYxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIG10LTAuNVwiPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3NjI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ0ZXh0XCI+e3RleHR9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICB9XG4gICAgICAgIGlmICgvXlxcZCtcXC4gLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3Njg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbWwtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjc2OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LWFtYmVyLTcwMCB3LTQgZmxleC1zaHJpbmstMFwiPntsaW5lLm1hdGNoKC9eKFxcZCspLylbMV19Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3NzA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCI+e2xpbmUucmVwbGFjZSgvXlxcZCtcXC4gLywgXCJcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lLnRyaW0oKSA9PT0gXCJcIiB8fCBsaW5lLnRyaW0oKSA9PT0gXCItLS1cIikge1xuICAgICAgICAgIHJldHVybiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246Nzc1OjE3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJoLTJcIiAvPjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbmxpbmUgYm9sZFxuICAgICAgICBpZiAobGluZS5pbmNsdWRlcyhcIioqXCIpKSB7XG4gICAgICAgICAgY29uc3QgcGFydHMgPSBsaW5lLnNwbGl0KC9cXCpcXCooLis/KVxcKlxcKi9nKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3ODE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2l9IGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTcwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAge3BhcnRzLm1hcCgocCwgaikgPT4gaiAlIDIgPT09IDEgPyA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uOjc4Mjo0OVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17an0gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicFwiPntwfTwvc3Bhbj4gOiBwKX1cbiAgICAgICAgICAgIDwvcD4pO1xuXG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29kZS1zdHlsZSBsaW5lcyB3aXRoIGJhY2t0aWNrc1xuICAgICAgICBpZiAobGluZS5pbmNsdWRlcyhcImBcIikpIHtcbiAgICAgICAgICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoL2AoLis/KWAvZyk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246NzkwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIHtwYXJ0cy5tYXAoKHAsIGopID0+IGogJSAyID09PSAxID9cbiAgICAgICAgICAgICAgPGNvZGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvbjo3OTI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e2p9IGNsYXNzTmFtZT1cInB4LTEgcm91bmRlZCB0ZXh0LVsxMHB4XSB0ZXh0LWFtYmVyLTgwMFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2ZlZjNjN1wiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicFwiPntwfTwvY29kZT4gOlxuICAgICAgICAgICAgICBwKX1cbiAgICAgICAgICAgIDwvcD4pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0RldkRvY3VtZW50YXRpb246Nzk3OjE1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsaW5lXCI+e2xpbmV9PC9wPjtcbiAgICAgIH0pfVxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9EZXZEb2N1bWVudGF0aW9uLmpzeCJ9