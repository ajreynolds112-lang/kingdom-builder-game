import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/DungeonEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/DungeonEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { X, Save, RotateCcw, Trash2, Plus, Minus, Undo, Redo, Eraser, Palette } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { BUILDING_DEFS, BUILDING_COLORS, TILE_W, TILE_H, gridToScreen } from "/src/lib/gameConstants.js";
import SpectrumColorPicker from "/src/components/game/SpectrumColorPicker.jsx";
import { TERRITORY_DEFS, TERRITORY_DUNGEONS } from "/src/lib/dungeonData.js";
const CANVAS_W = window.innerWidth;
const CANVAS_H = window.innerHeight;
const GRID_SIZE = 90;
const CANVAS_OFFSET_X = 900;
const CANVAS_OFFSET_Y = 300;
const FOREST_RING = 10;
const LS_KEY = (t, d) => `dungeon_layout_t${t}_d${d}`;
_c = LS_KEY;
function saveLayout(territory, dungeon, buildings) {
  localStorage.setItem(LS_KEY(territory, dungeon), JSON.stringify(buildings));
}
function loadLayout(territory, dungeon) {
  const raw = localStorage.getItem(LS_KEY(territory, dungeon));
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}
export function getDungeonLayout(territory, dungeon) {
  return loadLayout(territory, dungeon);
}
const PLACEABLE = [
  "town_hall",
  "defense_tower",
  "wall",
  "gold_mine",
  "mana_mine",
  "gold_mill",
  "army_camp",
  "hero_base",
  "barracks",
  "armory",
  "warehouse"
];
function gts(gx, gy) {
  return gridToScreen(gx, gy);
}
function worldToCanvas(wx, wy, sc, off) {
  return { cx: wx * sc + CANVAS_OFFSET_X + off.x, cy: wy * sc + CANVAS_OFFSET_Y + off.y };
}
function canvasToWorld(cx, cy, sc, off) {
  const wx = (cx - CANVAS_OFFSET_X - off.x) / sc;
  const wy = (cy - CANVAS_OFFSET_Y - off.y) / sc;
  return { wx, wy };
}
function screenToGrid(wx, wy) {
  const gx = Math.round((wx / (TILE_W / 2) + wy / (TILE_H / 2)) / 2);
  const gy = Math.round((wy / (TILE_H / 2) - wx / (TILE_W / 2)) / 2);
  return { gx, gy };
}
function shadeColor(hex, amount) {
  try {
    let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.max(0, Math.min(255, r + amount))},${Math.max(0, Math.min(255, g + amount))},${Math.max(0, Math.min(255, b + amount))})`;
  } catch {
    return hex;
  }
}
export default function DungeonEditor({ onClose }) {
  _s();
  const canvasRef = useRef(null);
  const [territory, setTerritory] = useState(0);
  const [dungeonIdx, setDungeonIdx] = useState(0);
  const [buildings, setBuildings] = useState([]);
  const [selectedType, setSelectedType] = useState("wall");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [hoverCell, setHoverCell] = useState(null);
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState("place");
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [moveBuilding, setMoveBuilding] = useState(null);
  const [ghostPos, setGhostPos] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [backgroundColor, setBackgroundColor] = useState("#1a2f1a");
  const [gridColor, setGridColor] = useState("#2d5a27");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerTarget, setColorPickerTarget] = useState(null);
  const [eraseHoverBuilding, setEraseHoverBuilding] = useState(null);
  const dungeonDef = TERRITORY_DUNGEONS[territory]?.[dungeonIdx];
  const buildingsRef = useRef(buildings);
  const historyRef = useRef(history);
  const historyIndexRef = useRef(historyIndex);
  useEffect(() => {
    buildingsRef.current = buildings;
  }, [buildings]);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);
  useEffect(() => {
    const saved2 = loadLayout(territory, dungeonIdx);
    if (saved2) {
      setBuildings(saved2);
    } else if (dungeonDef?.buildings) {
      setBuildings(dungeonDef.buildings.map((b, i) => ({ ...b, id: `default_${i}` })));
    } else {
      setBuildings([]);
    }
    setSelectedBuildingId(null);
    const centerGx = GRID_SIZE / 2;
    const centerGy = GRID_SIZE / 2;
    const centerP = gts(centerGx, centerGy);
    setOffset({
      x: CANVAS_W / 2 - (centerP.x * 1 + CANVAS_OFFSET_X),
      y: CANVAS_H / 2 - (centerP.y * 1 + CANVAS_OFFSET_Y)
    });
    setScale(1);
  }, [territory, dungeonIdx]);
  useEffect(() => {
    const gridW = GRID_SIZE * TILE_W;
    const gridH = GRID_SIZE * TILE_H;
    const baseScale = Math.min(CANVAS_W / (gridW * 1.08), CANVAS_H / (gridH * 1.08)) * 1.15;
    setScale(baseScale);
    const centerP = gts(GRID_SIZE / 2, GRID_SIZE / 2);
    setOffset({
      x: CANVAS_W / 2 - (centerP.x * baseScale + CANVAS_OFFSET_X),
      y: CANVAS_H / 2 - (centerP.y * baseScale + CANVAS_OFFSET_Y)
    });
  }, []);
  const getFootprint = (type) => {
    const def = BUILDING_DEFS[type];
    if (!def) return [1, 1];
    return def.footprint || [1, 1];
  };
  const handleSave = () => {
    saveLayout(territory, dungeonIdx, buildings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  const handleReset = () => {
    if (!dungeonDef?.buildings) return;
    const reset = dungeonDef.buildings.map((b, i) => ({ ...b, id: `default_${i}` }));
    setBuildings(reset);
    pushHistory();
    saveLayout(territory, dungeonIdx, reset);
  };
  const pushHistory = useCallback(() => {
    const snapshot = JSON.parse(JSON.stringify(buildings));
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndexRef.current + 1);
      return [...trimmed, snapshot].slice(-50);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [buildings]);
  const handleUndo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.max(0, prev - 1);
      const snapshot = historyRef.current[newIdx];
      if (snapshot) setBuildings(JSON.parse(JSON.stringify(snapshot)));
      return newIdx;
    });
  }, []);
  const handleRedo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.min(historyRef.current.length - 1, prev + 1);
      const snapshot = historyRef.current[newIdx];
      if (snapshot) setBuildings(JSON.parse(JSON.stringify(snapshot)));
      return newIdx;
    });
  }, []);
  const handleClearAll = () => {
    if (!confirm("Clear all buildings from this dungeon?")) return;
    setBuildings([]);
    pushHistory();
  };
  const getCanvasPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches?.[0] || e;
    return { cx: touch.clientX - rect.left, cy: touch.clientY - rect.top };
  };
  const getBuildingAt = (cxP, cyP, sc, off) => {
    const tw = TILE_W * sc;
    const th = TILE_H * sc;
    const { wx, wy } = canvasToWorld(cxP, cyP, sc, off);
    const { gx, gy } = screenToGrid(wx, wy);
    const hitBuilding = (b) => {
      const [fw, fh] = getFootprint(b.type);
      return gx >= b.gx && gx < b.gx + fw && gy >= b.gy && gy < b.gy + fh;
    };
    const sorted = [...buildings].sort((a, b) => {
      const dA = a.gx + a.footprint_w + (a.gy + a.footprint_h);
      const dB = b.gx + b.footprint_w + (b.gy + b.footprint_h);
      return dB - dA;
    });
    return sorted.find((b) => hitBuilding(b)) || null;
  };
  const isValidPlacement = (gx, gy, fw, fh, excludeId) => {
    if (gx < FOREST_RING || gy < FOREST_RING || gx + fw > GRID_SIZE - FOREST_RING || gy + fh > GRID_SIZE - FOREST_RING) return false;
    for (const b of buildings) {
      if (b.id === excludeId) continue;
      if (gx < b.gx + b.footprint_w && gx + fw > b.gx && gy < b.gy + b.footprint_h && gy + fh > b.gy) return false;
    }
    return true;
  };
  const handleCanvasClick = useCallback((e) => {
    if (moveBuilding) {
      const pos2 = getCanvasPos(e);
      const { wx: wx2, wy: wy2 } = canvasToWorld(pos2.cx, pos2.cy, scale, offset);
      const { gx: gx2, gy: gy2 } = screenToGrid(wx2, wy2);
      const [fw2, fh2] = getFootprint(moveBuilding.type);
      if (isValidPlacement(gx2, gy2, fw2, fh2, moveBuilding.id)) {
        setBuildings((prev) => prev.map((b) => b.id === moveBuilding.id ? { ...b, gx: gx2, gy: gy2 } : b));
        pushHistory();
      }
      setMoveBuilding(null);
      setGhostPos(null);
      return;
    }
    const pos = getCanvasPos(e);
    const { wx, wy } = canvasToWorld(pos.cx, pos.cy, scale, offset);
    const { gx, gy } = screenToGrid(wx, wy);
    if (mode === "erase") {
      const hit = getBuildingAt(pos.cx, pos.cy, scale, offset);
      if (hit) {
        setBuildings((prev) => prev.filter((b) => b.id !== hit.id));
        pushHistory();
      }
      return;
    }
    if (mode === "select") {
      const hit = getBuildingAt(pos.cx, pos.cy, scale, offset);
      setSelectedBuildingId(hit?.id || null);
      return;
    }
    if (gx < FOREST_RING || gy < FOREST_RING || gx >= GRID_SIZE - FOREST_RING || gy >= GRID_SIZE - FOREST_RING) return;
    const [fw, fh] = getFootprint(selectedType);
    if (!isValidPlacement(gx, gy, fw, fh, null)) return;
    const def = BUILDING_DEFS[selectedType];
    const newB = {
      type: selectedType,
      level: selectedLevel,
      gx,
      gy,
      id: `b_${Date.now()}_${Math.random()}`,
      footprint_w: def.footprint?.[0] || 2,
      footprint_h: def.footprint?.[1] || 2
    };
    setBuildings((prev) => [...prev, newB]);
    pushHistory();
  }, [mode, selectedType, selectedLevel, scale, offset, moveBuilding, buildings, pushHistory]);
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    const pos = getCanvasPos(e);
    setDragging(true);
    setDragStart({ ...pos, ox: offset.x, oy: offset.y });
    if (mode === "select") {
      const hit = getBuildingAt(pos.cx, pos.cy, scale, offset);
      if (hit) {
        setMoveBuilding(hit);
        setGhostPos({ gx: hit.gx, gy: hit.gy });
        setSelectedBuildingId(hit.id);
      }
    }
    if (mode === "erase") {
      const hit = getBuildingAt(pos.cx, pos.cy, scale, offset);
      if (hit) {
        setBuildings((prev) => prev.filter((b) => b.id !== hit.id));
        pushHistory();
      }
    }
  }, [mode, scale, offset, buildings, pushHistory]);
  const handleMouseMove = useCallback((e) => {
    const pos = getCanvasPos(e);
    if (moveBuilding) {
      const { wx: wx2, wy: wy2 } = canvasToWorld(pos.cx, pos.cy, scale, offset);
      const { gx: gx2, gy: gy2 } = screenToGrid(wx2, wy2);
      const [fw, fh] = getFootprint(moveBuilding.type);
      const snappedX = Math.max(FOREST_RING, Math.min(gx2, GRID_SIZE - FOREST_RING - fw));
      const snappedY = Math.max(FOREST_RING, Math.min(gy2, GRID_SIZE - FOREST_RING - fh));
      setGhostPos({ gx: snappedX, gy: snappedY });
      return;
    }
    if (dragging && dragStart) {
      const newX = dragStart.ox + pos.cx - dragStart.cx;
      const newY = dragStart.oy + pos.cy - dragStart.cy;
      setOffset({ x: newX, y: newY });
    }
    const { wx, wy } = canvasToWorld(pos.cx, pos.cy, scale, offset);
    const { gx, gy } = screenToGrid(wx, wy);
    setHoverCell({ gx, gy });
    if (mode === "erase") {
      const hit = getBuildingAt(pos.cx, pos.cy, scale, offset);
      setEraseHoverBuilding(hit);
    } else {
      setEraseHoverBuilding(null);
    }
  }, [scale, offset, dragging, dragStart, moveBuilding, mode]);
  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setDragStart(null);
    if (!moveBuilding) {
      setMoveBuilding(null);
      setGhostPos(null);
    }
  }, [moveBuilding]);
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.max(0.3, Math.min(scale * factor, 5));
    const rawOff = {
      x: mx - (mx - offset.x) * (newScale / scale),
      y: my - (my - offset.y) * (newScale / scale)
    };
    setScale(newScale);
    setOffset(rawOff);
  }, [scale, offset]);
  const handleColorPick = (color) => {
    if (colorPickerTarget === "background") setBackgroundColor(color);
    if (colorPickerTarget === "grid") setGridColor(color);
    setShowColorPicker(false);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    const tw = TILE_W * scale;
    const th = TILE_H * scale;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    for (let gy = 0; gy < GRID_SIZE; gy++) {
      for (let gx = 0; gx < GRID_SIZE; gx++) {
        const { x, y } = gts(gx, gy);
        const { cx, cy } = worldToCanvas(x, y, scale, offset);
        if (cx < -tw || cx > CANVAS_W + tw || cy < -th || cy > CANVAS_H + th) continue;
        const inForest = gx < FOREST_RING || gy < FOREST_RING || gx >= GRID_SIZE - FOREST_RING || gy >= GRID_SIZE - FOREST_RING;
        ctx.beginPath();
        ctx.moveTo(cx, cy - th / 2);
        ctx.lineTo(cx + tw / 2, cy);
        ctx.lineTo(cx, cy + th / 2);
        ctx.lineTo(cx - tw / 2, cy);
        ctx.closePath();
        ctx.fillStyle = inForest ? shadeColor(gridColor, -20) : (gx + gy) % 2 === 0 ? gridColor : shadeColor(gridColor, -10);
        ctx.fill();
        if (!inForest) {
          ctx.strokeStyle = "rgba(0,0,0,0.15)";
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }
    }
    const sorted = [...buildings].sort((a, b) => {
      const depthA = a.gx + a.footprint_w + (a.gy + a.footprint_h);
      const depthB = b.gx + b.footprint_w + (b.gy + b.footprint_h);
      return depthA - depthB;
    });
    for (const b of sorted) {
      const def = BUILDING_DEFS[b.type];
      const colors = BUILDING_COLORS[b.type] || { bg: "#1a1a2e", border: "#4a4a6e" };
      const fw = b.footprint_w || 2;
      const fh = b.footprint_h || 2;
      const isSelected = b.id === selectedBuildingId;
      const wallH = th * (b.type === "town_hall" ? 3.1 : 2.08);
      const tileCenter = (gx, gy) => {
        const p = gts(gx, gy);
        return worldToCanvas(p.x, p.y, scale, offset);
      };
      const c00 = tileCenter(b.gx, b.gy);
      const cFW0 = tileCenter(b.gx + fw - 1, b.gy);
      const cFWH = tileCenter(b.gx + fw - 1, b.gy + fh - 1);
      const c0FH = tileCenter(b.gx, b.gy + fh - 1);
      const gNW = { cx: c00.cx, cy: c00.cy - th / 2 };
      const gNE = { cx: cFW0.cx + tw / 2, cy: cFW0.cy };
      const gSE = { cx: cFWH.cx, cy: cFWH.cy + th / 2 };
      const gSW = { cx: c0FH.cx - tw / 2, cy: c0FH.cy };
      const topC = colors.bg;
      const leftC = shadeColor(topC, -55);
      const rightC = shadeColor(topC, -30);
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy);
      ctx.lineTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSW.cx, gSW.cy);
      ctx.closePath();
      ctx.fillStyle = shadeColor(topC, -80);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(gSW.cx, gSW.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gSW.cx, gSW.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = leftC;
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#fbbf24" : leftC;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gNE.cx, gNE.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = rightC;
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#fbbf24" : rightC;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy - wallH);
      ctx.lineTo(gNE.cx, gNE.cy - wallH);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gSW.cx, gSW.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = topC;
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#fbbf24" : topC;
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.stroke();
      const centerX = (gNW.cx + gSE.cx) / 2;
      const centerY = (gNW.cy + gSE.cy) / 2 - wallH;
      const iconSize = Math.max(6, Math.min(fw * tw * 0.22, 14 * scale));
      ctx.font = `${iconSize}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(def?.icon || "?", centerX, centerY);
      if (b.level > 1) {
        const r = 5 * scale;
        ctx.fillStyle = "#0d0d1a";
        ctx.beginPath();
        ctx.arc(gNE.cx, gNE.cy - wallH - r, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `bold ${Math.max(4, 5 * scale)}px sans-serif`;
        ctx.fillStyle = "#fbbf24";
        ctx.fillText(b.level, gNE.cx, gNE.cy - wallH - r);
      }
    }
    if (moveBuilding && ghostPos) {
      const { gx, gy } = ghostPos;
      const [fw, fh] = getFootprint(moveBuilding.type);
      const valid = isValidPlacement(gx, gy, fw, fh, moveBuilding.id);
      const { x, y } = gts(gx, gy);
      const { cx: hcx, cy: hcy } = worldToCanvas(x, y, scale, offset);
      const wallH = th * (moveBuilding.type === "town_hall" ? 3.1 : 2.08);
      const tileCenter = (ggx, ggy) => {
        const p = gts(ggx, ggy);
        return worldToCanvas(p.x, p.y, scale, offset);
      };
      const c00 = tileCenter(gx, gy);
      const cFW0 = tileCenter(gx + fw - 1, gy);
      const cFWH = tileCenter(gx + fw - 1, gy + fh - 1);
      const c0FH = tileCenter(gx, gy + fh - 1);
      const gNW = { cx: c00.cx, cy: c00.cy - th / 2 };
      const gNE = { cx: cFW0.cx + tw / 2, cy: cFW0.cy };
      const gSE = { cx: cFWH.cx, cy: cFWH.cy + th / 2 };
      const gSW = { cx: c0FH.cx - tw / 2, cy: c0FH.cy };
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy);
      ctx.lineTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSW.cx, gSW.cy);
      ctx.closePath();
      ctx.fillStyle = valid ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)";
      ctx.strokeStyle = valid ? "#4ade80" : "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
    if (hoverCell && mode === "place" && !moveBuilding) {
      const { gx, gy } = hoverCell;
      const [fw, fh] = getFootprint(selectedType);
      if (gx >= FOREST_RING && gy >= FOREST_RING && gx < GRID_SIZE - FOREST_RING && gy < GRID_SIZE - FOREST_RING) {
        const { x, y } = gts(gx, gy);
        const { cx: hcx, cy: hcy } = worldToCanvas(x, y, scale, offset);
        ctx.beginPath();
        ctx.moveTo(hcx, hcy - th / 2);
        ctx.lineTo(hcx + tw / 2, hcy);
        ctx.lineTo(hcx, hcy + th / 2);
        ctx.lineTo(hcx - tw / 2, hcy);
        ctx.closePath();
        ctx.fillStyle = "rgba(251,191,36,0.25)";
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }
    }
    if (eraseHoverBuilding && mode === "erase") {
      const b = eraseHoverBuilding;
      const fw = b.footprint_w || 2;
      const fh = b.footprint_h || 2;
      const wallH = th * (b.type === "town_hall" ? 3.1 : 2.08);
      const tileCenter = (ggx, ggy) => {
        const p = gts(ggx, ggy);
        return worldToCanvas(p.x, p.y, scale, offset);
      };
      const c00 = tileCenter(b.gx, b.gy);
      const cFW0 = tileCenter(b.gx + fw - 1, b.gy);
      const cFWH = tileCenter(b.gx + fw - 1, b.gy + fh - 1);
      const c0FH = tileCenter(b.gx, b.gy + fh - 1);
      const gNW = { cx: c00.cx, cy: c00.cy - th / 2 };
      const gNE = { cx: cFW0.cx + tw / 2, cy: cFW0.cy };
      const gSE = { cx: cFWH.cx, cy: cFWH.cy + th / 2 };
      const gSW = { cx: c0FH.cx - tw / 2, cy: c0FH.cy };
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy);
      ctx.lineTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSW.cx, gSW.cy);
      ctx.closePath();
      ctx.fillStyle = "rgba(239,68,68,0.4)";
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
  }, [buildings, hoverCell, scale, mode, selectedBuildingId, offset, moveBuilding, ghostPos, backgroundColor, gridColor, eraseHoverBuilding, pushHistory]);
  const selectedBldg = buildings.find((b) => b.id === selectedBuildingId);
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:570:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:571:6", "data-dynamic-content": "true", className: "flex flex-col rounded-xl overflow-hidden shadow-2xl", style: { background: "#1a1a2e", border: "2px solid #dc2626", maxHeight: "98vh", maxWidth: "98vw" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:573:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#2d2d4e", background: "#13132a" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:574:10", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:575:12", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-red-400", children: "⚔️ DUNGEON EDITOR — DEV MODE" }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 594,
          columnNumber: 13
        }, this),
        saved && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:576:22", "data-dynamic-content": "false", className: "font-ui text-xs text-green-400 animate-pulse", children: "✓ Saved!" }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 595,
          columnNumber: 23
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 593,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:578:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:579:12", "data-dynamic-content": "true", onClick: handleUndo, disabled: historyIndex <= 0, title: "Undo (Cmd+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 disabled:opacity-30", children: /* @__PURE__ */ jsxDEV(Undo, { "data-source-location": "components/game/DungeonEditor:580:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 599,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 598,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:582:12", "data-dynamic-content": "true", onClick: handleRedo, disabled: historyIndex >= history.length - 1, title: "Redo (Cmd+Shift+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 disabled:opacity-30", children: /* @__PURE__ */ jsxDEV(Redo, { "data-source-location": "components/game/DungeonEditor:583:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 602,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 601,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:585:12", "data-dynamic-content": "true", onClick: () => {
          setColorPickerTarget("background");
          setShowColorPicker(true);
        }, title: "Background Color", className: "p-1 rounded hover:bg-white/10 text-slate-400", children: /* @__PURE__ */ jsxDEV(Palette, { "data-source-location": "components/game/DungeonEditor:586:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 605,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 604,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:588:12", "data-dynamic-content": "true", onClick: handleClearAll, title: "Clear All Buildings", className: "px-2 py-1 rounded font-pixel text-[7px] text-red-300 hover:bg-red-900/30", style: { border: "1px solid #dc2626" }, children: [
          /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "components/game/DungeonEditor:589:14", "data-dynamic-content": "false", size: 11, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 608,
            columnNumber: 15
          }, this),
          "CLEAR"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 607,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:591:12", "data-dynamic-content": "true", onClick: handleReset, title: "Reset to default layout", className: "px-3 py-1 rounded font-pixel text-[8px] text-orange-300 hover:bg-orange-900/30", style: { border: "1px solid #c2410c" }, children: [
          /* @__PURE__ */ jsxDEV(RotateCcw, { "data-source-location": "components/game/DungeonEditor:592:14", "data-dynamic-content": "false", size: 11, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 611,
            columnNumber: 15
          }, this),
          "RESET"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 610,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:594:12", "data-dynamic-content": "true", onClick: handleSave, className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#16a34a", border: "1px solid #4ade80" }, children: [
          /* @__PURE__ */ jsxDEV(Save, { "data-source-location": "components/game/DungeonEditor:595:14", "data-dynamic-content": "false", size: 11, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 614,
            columnNumber: 15
          }, this),
          "SAVE"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 613,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:597:12", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/DungeonEditor:597:112", "data-dynamic-content": "false", size: 16 }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 616,
          columnNumber: 201
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 616,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 597,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DungeonEditor.jsx",
      lineNumber: 592,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:601:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:603:10", "data-dynamic-content": "true", className: "flex flex-col gap-3 p-3 border-r overflow-y-auto", style: { borderColor: "#2d2d4e", background: "#13132a", minWidth: "160px" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:605:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:606:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "TERRITORY" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 625,
            columnNumber: 15
          }, this),
          TERRITORY_DEFS.map(
            (t, i) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:608:16",
                "data-dynamic-content": "true",
                onClick: () => {
                  setTerritory(i);
                  setDungeonIdx(0);
                },
                className: "w-full text-left px-2 py-1 mb-0.5 rounded font-ui text-xs transition-all",
                style: { background: territory === i ? "#7f1d1d" : "#2d2d4e", border: `1px solid ${territory === i ? "#dc2626" : "#3d3d5e"}`, color: territory === i ? "#fca5a5" : "#aaa" },
                "data-collection-item-field": "icon",
                "data-collection-item-id": t?.id || t?._id,
                children: [
                  t.icon,
                  " ",
                  t.name
                ]
              },
              i,
              true,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 627,
                columnNumber: 15
              },
              this
            )
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 624,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:617:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:618:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "DUNGEON" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 637,
            columnNumber: 15
          }, this),
          TERRITORY_DUNGEONS[territory]?.map(
            (d, i) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:620:16",
                "data-dynamic-content": "true",
                onClick: () => setDungeonIdx(i),
                className: "w-full text-left px-2 py-1 mb-0.5 rounded font-ui text-[10px] transition-all",
                style: { background: dungeonIdx === i ? "#7f1d1d" : "#2d2d4e", border: `1px solid ${dungeonIdx === i ? "#dc2626" : "#3d3d5e"}`, color: dungeonIdx === i ? "#fca5a5" : "#aaa" },
                "data-collection-item-id": d?.["data-collection-item-id"],
                "data-collection-item-field": "level",
                children: [
                  d.level,
                  ". ",
                  d.name,
                  " ",
                  d.boss ? "💀" : "",
                  loadLayout(territory, i) ? " ✏️" : ""
                ]
              },
              i,
              true,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 639,
                columnNumber: 15
              },
              this
            )
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 636,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:630:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:631:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "MODE" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 650,
            columnNumber: 15
          }, this),
          [["place", "🏗️ Place"], ["erase", "🗑️ Erase"], ["select", "🔍 Select"]].map(
            ([m, label]) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:633:16",
                "data-dynamic-content": "true",
                onClick: () => setMode(m),
                className: "w-full text-left px-2 py-1 mb-0.5 rounded font-ui text-xs transition-all",
                style: { background: mode === m ? "#4c1d95" : "#2d2d4e", border: `1px solid ${mode === m ? "#a855f7" : "#3d3d5e"}`, color: mode === m ? "#e9d5ff" : "#aaa" },
                "data-collection-item-field": "label",
                children: label
              },
              m,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 652,
                columnNumber: 15
              },
              this
            )
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 649,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:642:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:643:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "ZOOM" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 662,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:644:14", "data-dynamic-content": "true", className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:645:16", "data-dynamic-content": "true", onClick: () => setScale((s) => Math.max(0.3, s - 0.2)), className: "p-1 rounded bg-slate-700 text-white hover:bg-slate-600", children: /* @__PURE__ */ jsxDEV(Minus, { "data-source-location": "components/game/DungeonEditor:646:18", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 665,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 664,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:648:16", "data-dynamic-content": "true", className: "flex-1 text-center font-ui text-xs text-slate-400", children: [
              (scale * 100).toFixed(0),
              "%"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 667,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonEditor:649:16", "data-dynamic-content": "true", onClick: () => setScale((s) => Math.min(5, s + 0.2)), className: "p-1 rounded bg-slate-700 text-white hover:bg-slate-600", children: /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/DungeonEditor:650:18", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 669,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 668,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 663,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 661,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:656:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:657:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "COLORS" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 676,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/DungeonEditor:658:14",
              "data-dynamic-content": "true",
              onClick: () => {
                setColorPickerTarget("background");
                setShowColorPicker(true);
              },
              className: "w-full mb-1 px-2 py-1 rounded font-ui text-xs text-left flex items-center gap-2",
              style: { background: backgroundColor, border: "1px solid #444", color: "#fff" },
              children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:661:16", "data-dynamic-content": "true", className: "w-4 h-4 rounded border", style: { background: backgroundColor } }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonEditor.jsx",
                  lineNumber: 680,
                  columnNumber: 17
                }, this),
                "Background"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 677,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/DungeonEditor:664:14",
              "data-dynamic-content": "true",
              onClick: () => {
                setColorPickerTarget("grid");
                setShowColorPicker(true);
              },
              className: "w-full px-2 py-1 rounded font-ui text-xs text-left flex items-center gap-2",
              style: { background: gridColor, border: "1px solid #444", color: "#fff" },
              children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:667:16", "data-dynamic-content": "true", className: "w-4 h-4 rounded border", style: { background: gridColor } }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonEditor.jsx",
                  lineNumber: 686,
                  columnNumber: 17
                }, this),
                "Grid"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 683,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 675,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 622,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:674:10", "data-dynamic-content": "true", className: "flex flex-col items-center justify-start p-3 gap-2", style: { background: "#0d0d1a" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:675:12", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 self-start", "data-collection-item-field": "name", "data-collection-item-id": dungeonDef?.id || dungeonDef?._id, children: [
          dungeonDef?.name,
          " — ",
          buildings.length,
          " buildings"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 694,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "canvas",
          {
            "data-source-location": "components/game/DungeonEditor:678:12",
            "data-dynamic-content": "true",
            ref: canvasRef,
            width: CANVAS_W,
            height: CANVAS_H,
            style: {
              cursor: moveBuilding ? "crosshair" : dragging ? "grabbing" : mode === "erase" ? "not-allowed" : mode === "select" ? "pointer" : "crosshair",
              border: "1px solid #2d2d4e",
              borderRadius: 4,
              touchAction: "none"
            },
            onClick: handleCanvasClick,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: () => {
              setDragging(false);
              setDragStart(null);
              setHoverCell(null);
            },
            onWheel: handleWheel
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 697,
            columnNumber: 13
          },
          this
        ),
        selectedBldg && mode === "select" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:696:14", "data-dynamic-content": "true", className: "flex flex-col gap-2 px-3 py-2 rounded self-start", style: { background: "#1a1a2e", border: "1px solid #4c1d95", minWidth: "280px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:697:16", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:698:18", "data-dynamic-content": "true", className: "font-ui text-xs text-white font-semibold", "data-collection-item-field": "name", children: [
              BUILDING_DEFS[selectedBldg.type]?.name,
              " Lv.",
              selectedBldg.level
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 717,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:699:18", "data-dynamic-content": "true", className: "font-ui text-[9px] text-slate-400", "data-collection-item-field": "gx", "data-collection-item-id": selectedBldg?.id || selectedBldg?._id, children: [
              "(",
              selectedBldg.gx,
              ",",
              selectedBldg.gy,
              ")"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 718,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 716,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:703:16", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:704:18", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-400", children: "Level:" }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 723,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:705:18",
                "data-dynamic-content": "true",
                onClick: () => setBuildings((prev) => prev.map((b) => b.id === selectedBldg.id ? { ...b, level: Math.max(1, b.level - 1) } : b)),
                className: "w-7 h-7 rounded font-ui text-sm font-bold",
                style: { background: "#2d2d4e", border: "1px solid #4c1d95", color: "#fff" },
                children: "-"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 724,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:709:18", "data-dynamic-content": "true", className: "font-ui text-xs text-white font-bold w-6 text-center", "data-collection-item-field": "level", "data-collection-item-id": selectedBldg?.id || selectedBldg?._id, children: selectedBldg.level }, void 0, false, {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 728,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:710:18",
                "data-dynamic-content": "true",
                onClick: () => setBuildings((prev) => prev.map((b) => b.id === selectedBldg.id ? { ...b, level: Math.min(20, b.level + 1) } : b)),
                className: "w-7 h-7 rounded font-ui text-sm font-bold",
                style: { background: "#2d2d4e", border: "1px solid #4c1d95", color: "#fff" },
                children: "+"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 729,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 722,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:717:16", "data-dynamic-content": "true", className: "flex gap-2 pt-1 border-t", style: { borderColor: "#2d2d4e" }, children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:718:18",
                "data-dynamic-content": "true",
                onClick: () => {
                  setMoveBuilding(selectedBldg);
                  setGhostPos({ gx: selectedBldg.gx, gy: selectedBldg.gy });
                },
                className: "flex-1 py-1.5 rounded font-ui text-xs font-semibold transition-all",
                style: { background: "#0ea5e9", border: "1px solid #38bdf8", color: "#fff" },
                children: "🔄 Move"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 737,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:723:18",
                "data-dynamic-content": "true",
                onClick: () => {
                  setBuildings((prev) => prev.filter((b) => b.id !== selectedBldg.id));
                  setSelectedBuildingId(null);
                },
                className: "flex-1 py-1.5 rounded font-ui text-xs font-semibold transition-all",
                style: { background: "#dc2626", border: "1px solid #ef4444", color: "#fff" },
                children: "🗑️ Delete"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 742,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 736,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 715,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:731:12", "data-dynamic-content": "true", className: "font-ui text-[9px] text-slate-600 self-start", children: [
          moveBuilding ? "🔀 Moving - click to place" : "Drag to pan · Scroll to zoom · Click to " + mode,
          " · Cmd+Z: Undo · ",
          buildings.length,
          " buildings"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 750,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 693,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:737:10", "data-dynamic-content": "true", className: "flex flex-col p-3 gap-3 border-l overflow-y-auto", style: { borderColor: "#2d2d4e", background: "#13132a", minWidth: "160px" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:738:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-red-400 mb-1", children: "🏗️ BUILDING" }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 757,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:739:12", "data-dynamic-content": "true", className: "flex flex-col gap-1", children: PLACEABLE.map((type, __arrIdx__) => {
          const def = BUILDING_DEFS[type];
          if (!def) return null;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/DungeonEditor:744:18",
              "data-dynamic-content": "true",
              onClick: () => {
                setSelectedType(type);
                setMode("place");
              },
              className: "flex items-center gap-1.5 px-2 py-1 rounded font-ui text-xs transition-all text-left",
              style: { background: selectedType === type && mode === "place" ? "#4c1d95" : "#2d2d4e", border: `1px solid ${selectedType === type && mode === "place" ? "#a855f7" : "#3d3d5e"}`, color: selectedType === type && mode === "place" ? "#e9d5ff" : "#aaa" },
              "data-arr-index": __arrIdx__,
              "data-arr-variable-name": "PLACEABLE",
              children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:747:20", "data-dynamic-content": "true", "data-collection-item-field": "icon", "data-collection-item-id": def?.id || def?._id, "data-arr-index": __arrIdx__, "data-arr-variable-name": "PLACEABLE", children: def.icon }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonEditor.jsx",
                  lineNumber: 766,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonEditor:748:20", "data-dynamic-content": "true", className: "truncate text-[10px]", "data-collection-item-field": "name", "data-collection-item-id": def?.id || def?._id, "data-arr-index": __arrIdx__, "data-arr-variable-name": "PLACEABLE", children: def.name }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonEditor.jsx",
                  lineNumber: 767,
                  columnNumber: 21
                }, this)
              ]
            },
            type,
            true,
            {
              fileName: "/app/src/components/game/DungeonEditor.jsx",
              lineNumber: 763,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 758,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:755:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:756:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "LEVEL" }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 775,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:757:14", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-1", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (l, __arrIdx__) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/DungeonEditor:759:18",
                "data-dynamic-content": "true",
                onClick: () => setSelectedLevel(l),
                className: "h-6 rounded text-[9px] font-ui transition-all",
                style: { background: selectedLevel === l ? "#4c1d95" : "#2d2d4e", border: `1px solid ${selectedLevel === l ? "#a855f7" : "#3d3d5e"}`, color: selectedLevel === l ? "#fff" : "#aaa" },
                "data-arr-index": __arrIdx__,
                children: l
              },
              l,
              false,
              {
                fileName: "/app/src/components/game/DungeonEditor.jsx",
                lineNumber: 778,
                columnNumber: 17
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/components/game/DungeonEditor.jsx",
            lineNumber: 776,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 774,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 756,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DungeonEditor.jsx",
      lineNumber: 620,
      columnNumber: 9
    }, this),
    showColorPicker && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:772:10", "data-dynamic-content": "true", className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:773:12", "data-dynamic-content": "true", className: "rounded-xl p-4", style: { background: "#1a1a2e", border: "2px solid #4c1d95" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonEditor:774:14", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-purple-400 mb-2", children: colorPickerTarget === "background" ? "BACKGROUND COLOR" : "GRID COLOR" }, void 0, false, {
        fileName: "/app/src/components/game/DungeonEditor.jsx",
        lineNumber: 793,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV(
        SpectrumColorPicker,
        {
          "data-source-location": "components/game/DungeonEditor:777:14",
          "data-dynamic-content": "true",
          color: colorPickerTarget === "background" ? backgroundColor : gridColor,
          onChange: handleColorPick
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 796,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/DungeonEditor:781:14",
          "data-dynamic-content": "true",
          onClick: () => setShowColorPicker(false),
          className: "mt-3 w-full py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
          style: { border: "1px solid #444" },
          children: "CLOSE"
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/DungeonEditor.jsx",
          lineNumber: 800,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/components/game/DungeonEditor.jsx",
      lineNumber: 792,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/DungeonEditor.jsx",
      lineNumber: 791,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/DungeonEditor.jsx",
    lineNumber: 590,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/DungeonEditor.jsx",
    lineNumber: 589,
    columnNumber: 5
  }, this);
}
_s(DungeonEditor, "gfmj5d7D3otqQQnYZeIZ60P1ktA=");
_c2 = DungeonEditor;
var _c, _c2;
$RefreshReg$(_c, "LS_KEY");
$RefreshReg$(_c2, "DungeonEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/DungeonEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/DungeonEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBOGpCWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE5akJaLE9BQU9BLFNBQVNDLFVBQVVDLFdBQVdDLFFBQVFDLG1CQUFtQjtBQUNoRSxTQUFTQyxHQUFHQyxNQUFNQyxXQUFXQyxRQUFRQyxNQUFNQyxPQUFPQyxNQUFNQyxNQUFNQyxRQUFRQyxlQUFlO0FBQ3JGLFNBQVNDLGVBQWVDLGlCQUFpQkMsUUFBUUMsUUFBUUMsb0JBQW9CO0FBQzdFLE9BQU9DLHlCQUF5QjtBQUNoQyxTQUFTQyxnQkFBZ0JDLDBCQUEwQjtBQUVuRCxNQUFNQyxXQUFXQyxPQUFPQztBQUN4QixNQUFNQyxXQUFXRixPQUFPRztBQUN4QixNQUFNQyxZQUFZO0FBQ2xCLE1BQU1DLGtCQUFrQjtBQUN4QixNQUFNQyxrQkFBa0I7QUFDeEIsTUFBTUMsY0FBYztBQUVwQixNQUFNQyxTQUFTQSxDQUFDQyxHQUFHQyxNQUFNLG1CQUFtQkQsQ0FBQyxLQUFLQyxDQUFDO0FBQUdDLEtBQWhESDtBQUVOLFNBQVNJLFdBQVdDLFdBQVdDLFNBQVNDLFdBQVc7QUFDakRDLGVBQWFDLFFBQVFULE9BQU9LLFdBQVdDLE9BQU8sR0FBR0ksS0FBS0MsVUFBVUosU0FBUyxDQUFDO0FBQzVFO0FBRUEsU0FBU0ssV0FBV1AsV0FBV0MsU0FBUztBQUN0QyxRQUFNTyxNQUFNTCxhQUFhTSxRQUFRZCxPQUFPSyxXQUFXQyxPQUFPLENBQUM7QUFDM0QsTUFBSU8sS0FBSztBQUFDLFFBQUk7QUFBQyxhQUFPSCxLQUFLSyxNQUFNRixHQUFHO0FBQUEsSUFBRSxRQUFRO0FBQUMsYUFBTztBQUFBLElBQUs7QUFBQSxFQUFDO0FBQzVELFNBQU87QUFDVDtBQUVPLGdCQUFTRyxpQkFBaUJYLFdBQVdDLFNBQVM7QUFDbkQsU0FBT00sV0FBV1AsV0FBV0MsT0FBTztBQUN0QztBQUVBLE1BQU1XLFlBQVk7QUFBQSxFQUNsQjtBQUFBLEVBQWE7QUFBQSxFQUFpQjtBQUFBLEVBQVE7QUFBQSxFQUFhO0FBQUEsRUFBYTtBQUFBLEVBQWE7QUFBQSxFQUFhO0FBQUEsRUFBYTtBQUFBLEVBQVk7QUFBQSxFQUFVO0FBQVc7QUFJeEksU0FBU0MsSUFBSUMsSUFBSUMsSUFBSTtBQUNuQixTQUFPakMsYUFBYWdDLElBQUlDLEVBQUU7QUFDNUI7QUFFQSxTQUFTQyxjQUFjQyxJQUFJQyxJQUFJQyxJQUFJQyxLQUFLO0FBQ3RDLFNBQU8sRUFBRUMsSUFBSUosS0FBS0UsS0FBSzNCLGtCQUFrQjRCLElBQUlFLEdBQUdDLElBQUlMLEtBQUtDLEtBQUsxQixrQkFBa0IyQixJQUFJSSxFQUFFO0FBQ3hGO0FBRUEsU0FBU0MsY0FBY0osSUFBSUUsSUFBSUosSUFBSUMsS0FBSztBQUN0QyxRQUFNSCxNQUFNSSxLQUFLN0Isa0JBQWtCNEIsSUFBSUUsS0FBS0g7QUFDNUMsUUFBTUQsTUFBTUssS0FBSzlCLGtCQUFrQjJCLElBQUlJLEtBQUtMO0FBQzVDLFNBQU8sRUFBRUYsSUFBSUMsR0FBRztBQUNsQjtBQUVBLFNBQVNRLGFBQWFULElBQUlDLElBQUk7QUFDNUIsUUFBTUosS0FBS2EsS0FBS0MsT0FBT1gsTUFBTXJDLFNBQVMsS0FBS3NDLE1BQU1yQyxTQUFTLE1BQU0sQ0FBQztBQUNqRSxRQUFNa0MsS0FBS1ksS0FBS0MsT0FBT1YsTUFBTXJDLFNBQVMsS0FBS29DLE1BQU1yQyxTQUFTLE1BQU0sQ0FBQztBQUNqRSxTQUFPLEVBQUVrQyxJQUFJQyxHQUFHO0FBQ2xCO0FBRUEsU0FBU2MsV0FBV0MsS0FBS0MsUUFBUTtBQUMvQixNQUFJO0FBQ0YsUUFBSUMsSUFBSUMsU0FBU0gsSUFBSUksTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUVDLElBQUlGLFNBQVNILElBQUlJLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFFRSxJQUFJSCxTQUFTSCxJQUFJSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUU7QUFDeEcsV0FBTyxPQUFPUCxLQUFLVSxJQUFJLEdBQUdWLEtBQUtXLElBQUksS0FBS04sSUFBSUQsTUFBTSxDQUFDLENBQUMsSUFBSUosS0FBS1UsSUFBSSxHQUFHVixLQUFLVyxJQUFJLEtBQUtILElBQUlKLE1BQU0sQ0FBQyxDQUFDLElBQUlKLEtBQUtVLElBQUksR0FBR1YsS0FBS1csSUFBSSxLQUFLRixJQUFJTCxNQUFNLENBQUMsQ0FBQztBQUFBLEVBQzFJLFFBQVE7QUFBQyxXQUFPRDtBQUFBQSxFQUFJO0FBQ3RCO0FBRUEsd0JBQXdCUyxjQUFjLEVBQUVDLFFBQVEsR0FBRztBQUFBQyxLQUFBO0FBQ2pELFFBQU1DLFlBQVk1RSxPQUFPLElBQUk7QUFDN0IsUUFBTSxDQUFDa0MsV0FBVzJDLFlBQVksSUFBSS9FLFNBQVMsQ0FBQztBQUM1QyxRQUFNLENBQUNnRixZQUFZQyxhQUFhLElBQUlqRixTQUFTLENBQUM7QUFDOUMsUUFBTSxDQUFDc0MsV0FBVzRDLFlBQVksSUFBSWxGLFNBQVMsRUFBRTtBQUM3QyxRQUFNLENBQUNtRixjQUFjQyxlQUFlLElBQUlwRixTQUFTLE1BQU07QUFDdkQsUUFBTSxDQUFDcUYsZUFBZUMsZ0JBQWdCLElBQUl0RixTQUFTLENBQUM7QUFDcEQsUUFBTSxDQUFDdUYsV0FBV0MsWUFBWSxJQUFJeEYsU0FBUyxJQUFJO0FBQy9DLFFBQU0sQ0FBQ3lGLG9CQUFvQkMscUJBQXFCLElBQUkxRixTQUFTLElBQUk7QUFDakUsUUFBTSxDQUFDMkYsT0FBT0MsUUFBUSxJQUFJNUYsU0FBUyxDQUFHO0FBQ3RDLFFBQU0sQ0FBQzZGLFFBQVFDLFNBQVMsSUFBSTlGLFNBQVMsRUFBRTBELEdBQUcsR0FBR0UsR0FBRyxFQUFFLENBQUM7QUFDbkQsUUFBTSxDQUFDbUMsT0FBT0MsUUFBUSxJQUFJaEcsU0FBUyxLQUFLO0FBQ3hDLFFBQU0sQ0FBQ2lHLE1BQU1DLE9BQU8sSUFBSWxHLFNBQVMsT0FBTztBQUN4QyxRQUFNLENBQUNtRyxVQUFVQyxXQUFXLElBQUlwRyxTQUFTLEtBQUs7QUFDOUMsUUFBTSxDQUFDcUcsV0FBV0MsWUFBWSxJQUFJdEcsU0FBUyxJQUFJO0FBQy9DLFFBQU0sQ0FBQ3VHLGNBQWNDLGVBQWUsSUFBSXhHLFNBQVMsSUFBSTtBQUNyRCxRQUFNLENBQUN5RyxVQUFVQyxXQUFXLElBQUkxRyxTQUFTLElBQUk7QUFDN0MsUUFBTSxDQUFDMkcsU0FBU0MsVUFBVSxJQUFJNUcsU0FBUyxFQUFFO0FBQ3pDLFFBQU0sQ0FBQzZHLGNBQWNDLGVBQWUsSUFBSTlHLFNBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMrRyxpQkFBaUJDLGtCQUFrQixJQUFJaEgsU0FBUyxTQUFTO0FBQ2hFLFFBQU0sQ0FBQ2lILFdBQVdDLFlBQVksSUFBSWxILFNBQVMsU0FBUztBQUNwRCxRQUFNLENBQUNtSCxpQkFBaUJDLGtCQUFrQixJQUFJcEgsU0FBUyxLQUFLO0FBQzVELFFBQU0sQ0FBQ3FILG1CQUFtQkMsb0JBQW9CLElBQUl0SCxTQUFTLElBQUk7QUFDL0QsUUFBTSxDQUFDdUgsb0JBQW9CQyxxQkFBcUIsSUFBSXhILFNBQVMsSUFBSTtBQUVqRSxRQUFNeUgsYUFBYXBHLG1CQUFtQmUsU0FBUyxJQUFJNEMsVUFBVTtBQUM3RCxRQUFNMEMsZUFBZXhILE9BQU9vQyxTQUFTO0FBQ3JDLFFBQU1xRixhQUFhekgsT0FBT3lHLE9BQU87QUFDakMsUUFBTWlCLGtCQUFrQjFILE9BQU8yRyxZQUFZO0FBQzNDNUcsWUFBVSxNQUFNO0FBQUN5SCxpQkFBYUcsVUFBVXZGO0FBQUFBLEVBQVUsR0FBRyxDQUFDQSxTQUFTLENBQUM7QUFDaEVyQyxZQUFVLE1BQU07QUFBQzBILGVBQVdFLFVBQVVsQjtBQUFBQSxFQUFRLEdBQUcsQ0FBQ0EsT0FBTyxDQUFDO0FBQzFEMUcsWUFBVSxNQUFNO0FBQUMySCxvQkFBZ0JDLFVBQVVoQjtBQUFBQSxFQUFhLEdBQUcsQ0FBQ0EsWUFBWSxDQUFDO0FBR3pFNUcsWUFBVSxNQUFNO0FBQ2QsVUFBTThGLFNBQVFwRCxXQUFXUCxXQUFXNEMsVUFBVTtBQUM5QyxRQUFJZSxRQUFPO0FBQ1RiLG1CQUFhYSxNQUFLO0FBQUEsSUFDcEIsV0FBVzBCLFlBQVluRixXQUFXO0FBQ2hDNEMsbUJBQWF1QyxXQUFXbkYsVUFBVXdGLElBQUksQ0FBQ3RELEdBQUd1RCxPQUFPLEVBQUUsR0FBR3ZELEdBQUd3RCxJQUFJLFdBQVdELENBQUMsR0FBRyxFQUFFLENBQUM7QUFBQSxJQUNqRixPQUFPO0FBQ0w3QyxtQkFBYSxFQUFFO0FBQUEsSUFDakI7QUFDQVEsMEJBQXNCLElBQUk7QUFFMUIsVUFBTXVDLFdBQVd0RyxZQUFZO0FBQzdCLFVBQU11RyxXQUFXdkcsWUFBWTtBQUM3QixVQUFNd0csVUFBVWxGLElBQUlnRixVQUFVQyxRQUFRO0FBQ3RDcEMsY0FBVTtBQUFBLE1BQ1JwQyxHQUFHcEMsV0FBVyxLQUFLNkcsUUFBUXpFLElBQUksSUFBTTlCO0FBQUFBLE1BQ3JDZ0MsR0FBR25DLFdBQVcsS0FBSzBHLFFBQVF2RSxJQUFJLElBQU0vQjtBQUFBQSxJQUN2QyxDQUFDO0FBQ0QrRCxhQUFTLENBQUc7QUFBQSxFQUNkLEdBQUcsQ0FBQ3hELFdBQVc0QyxVQUFVLENBQUM7QUFHMUIvRSxZQUFVLE1BQU07QUFDZCxVQUFNbUksUUFBUXpHLFlBQVlYO0FBQzFCLFVBQU1xSCxRQUFRMUcsWUFBWVY7QUFDMUIsVUFBTXFILFlBQVl2RSxLQUFLVyxJQUFJcEQsWUFBWThHLFFBQVEsT0FBTzNHLFlBQVk0RyxRQUFRLEtBQUssSUFBSTtBQUNuRnpDLGFBQVMwQyxTQUFTO0FBQ2xCLFVBQU1ILFVBQVVsRixJQUFJdEIsWUFBWSxHQUFHQSxZQUFZLENBQUM7QUFDaERtRSxjQUFVO0FBQUEsTUFDUnBDLEdBQUdwQyxXQUFXLEtBQUs2RyxRQUFRekUsSUFBSTRFLFlBQVkxRztBQUFBQSxNQUMzQ2dDLEdBQUduQyxXQUFXLEtBQUswRyxRQUFRdkUsSUFBSTBFLFlBQVl6RztBQUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDSCxHQUFHLEVBQUU7QUFFTCxRQUFNMEcsZUFBZUEsQ0FBQ0MsU0FBUztBQUM3QixVQUFNQyxNQUFNM0gsY0FBYzBILElBQUk7QUFDOUIsUUFBSSxDQUFDQyxJQUFLLFFBQU8sQ0FBQyxHQUFHLENBQUM7QUFDdEIsV0FBT0EsSUFBSUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQy9CO0FBRUEsUUFBTUMsYUFBYUEsTUFBTTtBQUN2QnhHLGVBQVdDLFdBQVc0QyxZQUFZMUMsU0FBUztBQUMzQzBELGFBQVMsSUFBSTtBQUNiNEMsZUFBVyxNQUFNNUMsU0FBUyxLQUFLLEdBQUcsR0FBSTtBQUFBLEVBQ3hDO0FBRUEsUUFBTTZDLGNBQWNBLE1BQU07QUFDeEIsUUFBSSxDQUFDcEIsWUFBWW5GLFVBQVc7QUFDNUIsVUFBTXdHLFFBQVFyQixXQUFXbkYsVUFBVXdGLElBQUksQ0FBQ3RELEdBQUd1RCxPQUFPLEVBQUUsR0FBR3ZELEdBQUd3RCxJQUFJLFdBQVdELENBQUMsR0FBRyxFQUFFO0FBQy9FN0MsaUJBQWE0RCxLQUFLO0FBQ2xCQyxnQkFBWTtBQUNaNUcsZUFBV0MsV0FBVzRDLFlBQVk4RCxLQUFLO0FBQUEsRUFDekM7QUFFQSxRQUFNQyxjQUFjNUksWUFBWSxNQUFNO0FBQ3BDLFVBQU02SSxXQUFXdkcsS0FBS0ssTUFBTUwsS0FBS0MsVUFBVUosU0FBUyxDQUFDO0FBQ3JEc0UsZUFBVyxDQUFDcUMsU0FBUztBQUNuQixZQUFNQyxVQUFVRCxLQUFLM0UsTUFBTSxHQUFHc0QsZ0JBQWdCQyxVQUFVLENBQUM7QUFDekQsYUFBTyxDQUFDLEdBQUdxQixTQUFTRixRQUFRLEVBQUUxRSxNQUFNLEdBQUc7QUFBQSxJQUN6QyxDQUFDO0FBQ0R3QyxvQkFBZ0IsQ0FBQ21DLFNBQVNsRixLQUFLVyxJQUFJdUUsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUFBLEVBQ2xELEdBQUcsQ0FBQzNHLFNBQVMsQ0FBQztBQUVkLFFBQU02RyxhQUFhaEosWUFBWSxNQUFNO0FBQ25DMkcsb0JBQWdCLENBQUNtQyxTQUFTO0FBQ3hCLFlBQU1HLFNBQVNyRixLQUFLVSxJQUFJLEdBQUd3RSxPQUFPLENBQUM7QUFDbkMsWUFBTUQsV0FBV3JCLFdBQVdFLFFBQVF1QixNQUFNO0FBQzFDLFVBQUlKLFNBQVU5RCxjQUFhekMsS0FBS0ssTUFBTUwsS0FBS0MsVUFBVXNHLFFBQVEsQ0FBQyxDQUFDO0FBQy9ELGFBQU9JO0FBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0gsR0FBRyxFQUFFO0FBRUwsUUFBTUMsYUFBYWxKLFlBQVksTUFBTTtBQUNuQzJHLG9CQUFnQixDQUFDbUMsU0FBUztBQUN4QixZQUFNRyxTQUFTckYsS0FBS1csSUFBSWlELFdBQVdFLFFBQVF5QixTQUFTLEdBQUdMLE9BQU8sQ0FBQztBQUMvRCxZQUFNRCxXQUFXckIsV0FBV0UsUUFBUXVCLE1BQU07QUFDMUMsVUFBSUosU0FBVTlELGNBQWF6QyxLQUFLSyxNQUFNTCxLQUFLQyxVQUFVc0csUUFBUSxDQUFDLENBQUM7QUFDL0QsYUFBT0k7QUFBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxHQUFHLEVBQUU7QUFFTCxRQUFNRyxpQkFBaUJBLE1BQU07QUFDM0IsUUFBSSxDQUFDQyxRQUFRLHdDQUF3QyxFQUFHO0FBQ3hEdEUsaUJBQWEsRUFBRTtBQUNmNkQsZ0JBQVk7QUFBQSxFQUNkO0FBRUEsUUFBTVUsZUFBZUEsQ0FBQ0MsTUFBTTtBQUMxQixVQUFNQyxPQUFPN0UsVUFBVStDLFFBQVErQixzQkFBc0I7QUFDckQsVUFBTUMsUUFBUUgsRUFBRUksVUFBVSxDQUFDLEtBQUtKO0FBQ2hDLFdBQU8sRUFBRWpHLElBQUlvRyxNQUFNRSxVQUFVSixLQUFLSyxNQUFNckcsSUFBSWtHLE1BQU1JLFVBQVVOLEtBQUtPLElBQUk7QUFBQSxFQUN2RTtBQUVBLFFBQU1DLGdCQUFnQkEsQ0FBQ0MsS0FBS0MsS0FBSzlHLElBQUlDLFFBQVE7QUFDM0MsVUFBTThHLEtBQUt0SixTQUFTdUM7QUFDcEIsVUFBTWdILEtBQUt0SixTQUFTc0M7QUFDcEIsVUFBTSxFQUFFRixJQUFJQyxHQUFHLElBQUlPLGNBQWN1RyxLQUFLQyxLQUFLOUcsSUFBSUMsR0FBRztBQUNsRCxVQUFNLEVBQUVOLElBQUlDLEdBQUcsSUFBSVcsYUFBYVQsSUFBSUMsRUFBRTtBQUV0QyxVQUFNa0gsY0FBY0EsQ0FBQ2hHLE1BQU07QUFDekIsWUFBTSxDQUFDaUcsSUFBSUMsRUFBRSxJQUFJbkMsYUFBYS9ELEVBQUVnRSxJQUFJO0FBQ3BDLGFBQU90RixNQUFNc0IsRUFBRXRCLE1BQU1BLEtBQUtzQixFQUFFdEIsS0FBS3VILE1BQU10SCxNQUFNcUIsRUFBRXJCLE1BQU1BLEtBQUtxQixFQUFFckIsS0FBS3VIO0FBQUFBLElBQ25FO0FBRUEsVUFBTUMsU0FBUyxDQUFDLEdBQUdySSxTQUFTLEVBQUVzSSxLQUFLLENBQUNDLEdBQUdyRyxNQUFNO0FBQzNDLFlBQU1zRyxLQUFLRCxFQUFFM0gsS0FBSzJILEVBQUVFLGVBQWVGLEVBQUUxSCxLQUFLMEgsRUFBRUc7QUFDNUMsWUFBTUMsS0FBS3pHLEVBQUV0QixLQUFLc0IsRUFBRXVHLGVBQWV2RyxFQUFFckIsS0FBS3FCLEVBQUV3RztBQUM1QyxhQUFPQyxLQUFLSDtBQUFBQSxJQUNkLENBQUM7QUFDRCxXQUFPSCxPQUFPTyxLQUFLLENBQUMxRyxNQUFNZ0csWUFBWWhHLENBQUMsQ0FBQyxLQUFLO0FBQUEsRUFDL0M7QUFFQSxRQUFNMkcsbUJBQW1CQSxDQUFDakksSUFBSUMsSUFBSXNILElBQUlDLElBQUlVLGNBQWM7QUFDdEQsUUFBSWxJLEtBQUtwQixlQUFlcUIsS0FBS3JCLGVBQWVvQixLQUFLdUgsS0FBSzlJLFlBQVlHLGVBQWVxQixLQUFLdUgsS0FBSy9JLFlBQVlHLFlBQWEsUUFBTztBQUMzSCxlQUFXMEMsS0FBS2xDLFdBQVc7QUFDekIsVUFBSWtDLEVBQUV3RCxPQUFPb0QsVUFBVztBQUN4QixVQUFJbEksS0FBS3NCLEVBQUV0QixLQUFLc0IsRUFBRXVHLGVBQWU3SCxLQUFLdUgsS0FBS2pHLEVBQUV0QixNQUM3Q0MsS0FBS3FCLEVBQUVyQixLQUFLcUIsRUFBRXdHLGVBQWU3SCxLQUFLdUgsS0FBS2xHLEVBQUVyQixHQUFJLFFBQU87QUFBQSxJQUN0RDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTWtJLG9CQUFvQmxMLFlBQVksQ0FBQ3VKLE1BQU07QUFDM0MsUUFBSW5ELGNBQWM7QUFDaEIsWUFBTStFLE9BQU03QixhQUFhQyxDQUFDO0FBQzFCLFlBQU0sRUFBRXJHLFNBQUlDLFFBQUcsSUFBSU8sY0FBY3lILEtBQUk3SCxJQUFJNkgsS0FBSTNILElBQUlnQyxPQUFPRSxNQUFNO0FBQzlELFlBQU0sRUFBRTNDLFNBQUlDLFFBQUcsSUFBSVcsYUFBYVQsS0FBSUMsR0FBRTtBQUN0QyxZQUFNLENBQUNtSCxLQUFJQyxHQUFFLElBQUluQyxhQUFhaEMsYUFBYWlDLElBQUk7QUFDL0MsVUFBSTJDLGlCQUFpQmpJLEtBQUlDLEtBQUlzSCxLQUFJQyxLQUFJbkUsYUFBYXlCLEVBQUUsR0FBRztBQUNyRDlDLHFCQUFhLENBQUMrRCxTQUFTQSxLQUFLbkIsSUFBSSxDQUFDdEQsTUFBTUEsRUFBRXdELE9BQU96QixhQUFheUIsS0FBSyxFQUFFLEdBQUd4RCxHQUFHdEIsU0FBSUMsUUFBRyxJQUFJcUIsQ0FBQyxDQUFDO0FBQ3ZGdUUsb0JBQVk7QUFBQSxNQUNkO0FBQ0F2QyxzQkFBZ0IsSUFBSTtBQUNwQkUsa0JBQVksSUFBSTtBQUNoQjtBQUFBLElBQ0Y7QUFFQSxVQUFNNEUsTUFBTTdCLGFBQWFDLENBQUM7QUFDMUIsVUFBTSxFQUFFckcsSUFBSUMsR0FBRyxJQUFJTyxjQUFjeUgsSUFBSTdILElBQUk2SCxJQUFJM0gsSUFBSWdDLE9BQU9FLE1BQU07QUFDOUQsVUFBTSxFQUFFM0MsSUFBSUMsR0FBRyxJQUFJVyxhQUFhVCxJQUFJQyxFQUFFO0FBRXRDLFFBQUkyQyxTQUFTLFNBQVM7QUFDcEIsWUFBTXNGLE1BQU1wQixjQUFjbUIsSUFBSTdILElBQUk2SCxJQUFJM0gsSUFBSWdDLE9BQU9FLE1BQU07QUFDdkQsVUFBSTBGLEtBQUs7QUFDUHJHLHFCQUFhLENBQUMrRCxTQUFTQSxLQUFLdUMsT0FBTyxDQUFDaEgsTUFBTUEsRUFBRXdELE9BQU91RCxJQUFJdkQsRUFBRSxDQUFDO0FBQzFEZSxvQkFBWTtBQUFBLE1BQ2Q7QUFDQTtBQUFBLElBQ0Y7QUFFQSxRQUFJOUMsU0FBUyxVQUFVO0FBQ3JCLFlBQU1zRixNQUFNcEIsY0FBY21CLElBQUk3SCxJQUFJNkgsSUFBSTNILElBQUlnQyxPQUFPRSxNQUFNO0FBQ3ZESCw0QkFBc0I2RixLQUFLdkQsTUFBTSxJQUFJO0FBQ3JDO0FBQUEsSUFDRjtBQUdBLFFBQUk5RSxLQUFLcEIsZUFBZXFCLEtBQUtyQixlQUFlb0IsTUFBTXZCLFlBQVlHLGVBQWVxQixNQUFNeEIsWUFBWUcsWUFBYTtBQUM1RyxVQUFNLENBQUMySSxJQUFJQyxFQUFFLElBQUluQyxhQUFhcEQsWUFBWTtBQUMxQyxRQUFJLENBQUNnRyxpQkFBaUJqSSxJQUFJQyxJQUFJc0gsSUFBSUMsSUFBSSxJQUFJLEVBQUc7QUFDN0MsVUFBTWpDLE1BQU0zSCxjQUFjcUUsWUFBWTtBQUN0QyxVQUFNc0csT0FBTztBQUFBLE1BQ1hqRCxNQUFNckQ7QUFBQUEsTUFDTnVHLE9BQU9yRztBQUFBQSxNQUNQbkM7QUFBQUEsTUFDQUM7QUFBQUEsTUFDQTZFLElBQUksS0FBSzJELEtBQUtDLElBQUksQ0FBQyxJQUFJN0gsS0FBSzhILE9BQU8sQ0FBQztBQUFBLE1BQ3BDZCxhQUFhdEMsSUFBSUMsWUFBWSxDQUFDLEtBQUs7QUFBQSxNQUNuQ3NDLGFBQWF2QyxJQUFJQyxZQUFZLENBQUMsS0FBSztBQUFBLElBQ3JDO0FBQ0F4RCxpQkFBYSxDQUFDK0QsU0FBUyxDQUFDLEdBQUdBLE1BQU13QyxJQUFJLENBQUM7QUFDdEMxQyxnQkFBWTtBQUFBLEVBQ2QsR0FBRyxDQUFDOUMsTUFBTWQsY0FBY0UsZUFBZU0sT0FBT0UsUUFBUVUsY0FBY2pFLFdBQVd5RyxXQUFXLENBQUM7QUFFM0YsUUFBTStDLGtCQUFrQjNMLFlBQVksQ0FBQ3VKLE1BQU07QUFDekMsUUFBSUEsRUFBRXFDLFdBQVcsRUFBRztBQUNwQixVQUFNVCxNQUFNN0IsYUFBYUMsQ0FBQztBQUMxQnRELGdCQUFZLElBQUk7QUFDaEJFLGlCQUFhLEVBQUUsR0FBR2dGLEtBQUtVLElBQUluRyxPQUFPbkMsR0FBR3VJLElBQUlwRyxPQUFPakMsRUFBRSxDQUFDO0FBR25ELFFBQUlxQyxTQUFTLFVBQVU7QUFDckIsWUFBTXNGLE1BQU1wQixjQUFjbUIsSUFBSTdILElBQUk2SCxJQUFJM0gsSUFBSWdDLE9BQU9FLE1BQU07QUFDdkQsVUFBSTBGLEtBQUs7QUFDUC9FLHdCQUFnQitFLEdBQUc7QUFDbkI3RSxvQkFBWSxFQUFFeEQsSUFBSXFJLElBQUlySSxJQUFJQyxJQUFJb0ksSUFBSXBJLEdBQUcsQ0FBQztBQUN0Q3VDLDhCQUFzQjZGLElBQUl2RCxFQUFFO0FBQUEsTUFDOUI7QUFBQSxJQUNGO0FBR0EsUUFBSS9CLFNBQVMsU0FBUztBQUNwQixZQUFNc0YsTUFBTXBCLGNBQWNtQixJQUFJN0gsSUFBSTZILElBQUkzSCxJQUFJZ0MsT0FBT0UsTUFBTTtBQUN2RCxVQUFJMEYsS0FBSztBQUNQckcscUJBQWEsQ0FBQytELFNBQVNBLEtBQUt1QyxPQUFPLENBQUNoSCxNQUFNQSxFQUFFd0QsT0FBT3VELElBQUl2RCxFQUFFLENBQUM7QUFDMURlLG9CQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQzlDLE1BQU1OLE9BQU9FLFFBQVF2RCxXQUFXeUcsV0FBVyxDQUFDO0FBRWhELFFBQU1tRCxrQkFBa0IvTCxZQUFZLENBQUN1SixNQUFNO0FBQ3pDLFVBQU00QixNQUFNN0IsYUFBYUMsQ0FBQztBQUUxQixRQUFJbkQsY0FBYztBQUNoQixZQUFNLEVBQUVsRCxTQUFJQyxRQUFHLElBQUlPLGNBQWN5SCxJQUFJN0gsSUFBSTZILElBQUkzSCxJQUFJZ0MsT0FBT0UsTUFBTTtBQUM5RCxZQUFNLEVBQUUzQyxTQUFJQyxRQUFHLElBQUlXLGFBQWFULEtBQUlDLEdBQUU7QUFDdEMsWUFBTSxDQUFDbUgsSUFBSUMsRUFBRSxJQUFJbkMsYUFBYWhDLGFBQWFpQyxJQUFJO0FBQy9DLFlBQU0yRCxXQUFXcEksS0FBS1UsSUFBSTNDLGFBQWFpQyxLQUFLVyxJQUFJeEIsS0FBSXZCLFlBQVlHLGNBQWMySSxFQUFFLENBQUM7QUFDakYsWUFBTTJCLFdBQVdySSxLQUFLVSxJQUFJM0MsYUFBYWlDLEtBQUtXLElBQUl2QixLQUFJeEIsWUFBWUcsY0FBYzRJLEVBQUUsQ0FBQztBQUNqRmhFLGtCQUFZLEVBQUV4RCxJQUFJaUosVUFBVWhKLElBQUlpSixTQUFTLENBQUM7QUFDMUM7QUFBQSxJQUNGO0FBRUEsUUFBSWpHLFlBQVlFLFdBQVc7QUFDekIsWUFBTWdHLE9BQU9oRyxVQUFVMkYsS0FBS1YsSUFBSTdILEtBQUs0QyxVQUFVNUM7QUFDL0MsWUFBTTZJLE9BQU9qRyxVQUFVNEYsS0FBS1gsSUFBSTNILEtBQUswQyxVQUFVMUM7QUFDL0NtQyxnQkFBVSxFQUFFcEMsR0FBRzJJLE1BQU16SSxHQUFHMEksS0FBSyxDQUFDO0FBQUEsSUFDaEM7QUFFQSxVQUFNLEVBQUVqSixJQUFJQyxHQUFHLElBQUlPLGNBQWN5SCxJQUFJN0gsSUFBSTZILElBQUkzSCxJQUFJZ0MsT0FBT0UsTUFBTTtBQUM5RCxVQUFNLEVBQUUzQyxJQUFJQyxHQUFHLElBQUlXLGFBQWFULElBQUlDLEVBQUU7QUFDdENrQyxpQkFBYSxFQUFFdEMsSUFBSUMsR0FBRyxDQUFDO0FBR3ZCLFFBQUk4QyxTQUFTLFNBQVM7QUFDcEIsWUFBTXNGLE1BQU1wQixjQUFjbUIsSUFBSTdILElBQUk2SCxJQUFJM0gsSUFBSWdDLE9BQU9FLE1BQU07QUFDdkQyQiw0QkFBc0IrRCxHQUFHO0FBQUEsSUFDM0IsT0FBTztBQUNML0QsNEJBQXNCLElBQUk7QUFBQSxJQUM1QjtBQUFBLEVBQ0YsR0FBRyxDQUFDN0IsT0FBT0UsUUFBUU0sVUFBVUUsV0FBV0UsY0FBY04sSUFBSSxDQUFDO0FBRTNELFFBQU1zRyxnQkFBZ0JwTSxZQUFZLE1BQU07QUFDdENpRyxnQkFBWSxLQUFLO0FBQ2pCRSxpQkFBYSxJQUFJO0FBQ2pCLFFBQUksQ0FBQ0MsY0FBYztBQUNqQkMsc0JBQWdCLElBQUk7QUFDcEJFLGtCQUFZLElBQUk7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsR0FBRyxDQUFDSCxZQUFZLENBQUM7QUFFakIsUUFBTWlHLGNBQWNyTSxZQUFZLENBQUN1SixNQUFNO0FBQ3JDQSxNQUFFK0MsZUFBZTtBQUNqQixVQUFNOUMsT0FBTzdFLFVBQVUrQyxRQUFRK0Isc0JBQXNCO0FBQ3JELFVBQU04QyxLQUFLaEQsRUFBRUssVUFBVUosS0FBS0s7QUFDNUIsVUFBTTJDLEtBQUtqRCxFQUFFTyxVQUFVTixLQUFLTztBQUU1QixVQUFNMEMsU0FBU2xELEVBQUVtRCxTQUFTLElBQUksTUFBTTtBQUNwQyxVQUFNQyxXQUFXL0ksS0FBS1UsSUFBSSxLQUFLVixLQUFLVyxJQUFJaUIsUUFBUWlILFFBQVEsQ0FBQyxDQUFDO0FBRTFELFVBQU1HLFNBQVM7QUFBQSxNQUNickosR0FBR2dKLE1BQU1BLEtBQUs3RyxPQUFPbkMsTUFBTW9KLFdBQVduSDtBQUFBQSxNQUN0Qy9CLEdBQUcrSSxNQUFNQSxLQUFLOUcsT0FBT2pDLE1BQU1rSixXQUFXbkg7QUFBQUEsSUFDeEM7QUFFQUMsYUFBU2tILFFBQVE7QUFDakJoSCxjQUFVaUgsTUFBTTtBQUFBLEVBQ2xCLEdBQUcsQ0FBQ3BILE9BQU9FLE1BQU0sQ0FBQztBQUVsQixRQUFNbUgsa0JBQWtCQSxDQUFDQyxVQUFVO0FBQ2pDLFFBQUk1RixzQkFBc0IsYUFBY0wsb0JBQW1CaUcsS0FBSztBQUNoRSxRQUFJNUYsc0JBQXNCLE9BQVFILGNBQWErRixLQUFLO0FBQ3BEN0YsdUJBQW1CLEtBQUs7QUFBQSxFQUMxQjtBQUdBbkgsWUFBVSxNQUFNO0FBQ2QsVUFBTWlOLFNBQVNwSSxVQUFVK0M7QUFDekIsUUFBSSxDQUFDcUYsT0FBUTtBQUNiLFVBQU1DLE1BQU1ELE9BQU9FLFdBQVcsSUFBSTtBQUNsQ0QsUUFBSUUsVUFBVSxHQUFHLEdBQUcvTCxVQUFVRyxRQUFRO0FBRXRDLFVBQU02SSxLQUFLdEosU0FBUzJFO0FBQ3BCLFVBQU00RSxLQUFLdEosU0FBUzBFO0FBR3BCd0gsUUFBSUcsWUFBWXZHO0FBQ2hCb0csUUFBSUksU0FBUyxHQUFHLEdBQUdqTSxVQUFVRyxRQUFRO0FBR3JDLGFBQVMwQixLQUFLLEdBQUdBLEtBQUt4QixXQUFXd0IsTUFBTTtBQUNyQyxlQUFTRCxLQUFLLEdBQUdBLEtBQUt2QixXQUFXdUIsTUFBTTtBQUNyQyxjQUFNLEVBQUVRLEdBQUdFLEVBQUUsSUFBSVgsSUFBSUMsSUFBSUMsRUFBRTtBQUMzQixjQUFNLEVBQUVNLElBQUlFLEdBQUcsSUFBSVAsY0FBY00sR0FBR0UsR0FBRytCLE9BQU9FLE1BQU07QUFDcEQsWUFBSXBDLEtBQUssQ0FBQzZHLE1BQU03RyxLQUFLbkMsV0FBV2dKLE1BQU0zRyxLQUFLLENBQUM0RyxNQUFNNUcsS0FBS2xDLFdBQVc4SSxHQUFJO0FBRXRFLGNBQU1pRCxXQUFXdEssS0FBS3BCLGVBQWVxQixLQUFLckIsZUFBZW9CLE1BQU12QixZQUFZRyxlQUFlcUIsTUFBTXhCLFlBQVlHO0FBQzVHcUwsWUFBSU0sVUFBVTtBQUNkTixZQUFJTyxPQUFPakssSUFBSUUsS0FBSzRHLEtBQUssQ0FBQztBQUMxQjRDLFlBQUlRLE9BQU9sSyxLQUFLNkcsS0FBSyxHQUFHM0csRUFBRTtBQUMxQndKLFlBQUlRLE9BQU9sSyxJQUFJRSxLQUFLNEcsS0FBSyxDQUFDO0FBQzFCNEMsWUFBSVEsT0FBT2xLLEtBQUs2RyxLQUFLLEdBQUczRyxFQUFFO0FBQzFCd0osWUFBSVMsVUFBVTtBQUNkVCxZQUFJRyxZQUFZRSxXQUFXdkosV0FBV2dELFdBQVcsR0FBRyxLQUFLL0QsS0FBS0MsTUFBTSxNQUFNLElBQUk4RCxZQUFZaEQsV0FBV2dELFdBQVcsR0FBRztBQUNuSGtHLFlBQUlVLEtBQUs7QUFDVCxZQUFJLENBQUNMLFVBQVU7QUFBQ0wsY0FBSVcsY0FBYztBQUFtQlgsY0FBSVksWUFBWTtBQUFJWixjQUFJYSxPQUFPO0FBQUEsUUFBRTtBQUFBLE1BQ3hGO0FBQUEsSUFDRjtBQUdBLFVBQU1yRCxTQUFTLENBQUMsR0FBR3JJLFNBQVMsRUFBRXNJLEtBQUssQ0FBQ0MsR0FBR3JHLE1BQU07QUFDM0MsWUFBTXlKLFNBQVNwRCxFQUFFM0gsS0FBSzJILEVBQUVFLGVBQWVGLEVBQUUxSCxLQUFLMEgsRUFBRUc7QUFDaEQsWUFBTWtELFNBQVMxSixFQUFFdEIsS0FBS3NCLEVBQUV1RyxlQUFldkcsRUFBRXJCLEtBQUtxQixFQUFFd0c7QUFDaEQsYUFBT2lELFNBQVNDO0FBQUFBLElBQ2xCLENBQUM7QUFFRCxlQUFXMUosS0FBS21HLFFBQVE7QUFDdEIsWUFBTWxDLE1BQU0zSCxjQUFjMEQsRUFBRWdFLElBQUk7QUFDaEMsWUFBTTJGLFNBQVNwTixnQkFBZ0J5RCxFQUFFZ0UsSUFBSSxLQUFLLEVBQUU0RixJQUFJLFdBQVdDLFFBQVEsVUFBVTtBQUM3RSxZQUFNNUQsS0FBS2pHLEVBQUV1RyxlQUFlO0FBQzVCLFlBQU1MLEtBQUtsRyxFQUFFd0csZUFBZTtBQUM1QixZQUFNc0QsYUFBYTlKLEVBQUV3RCxPQUFPdkM7QUFDNUIsWUFBTThJLFFBQVFoRSxNQUFNL0YsRUFBRWdFLFNBQVMsY0FBYyxNQUFNO0FBRW5ELFlBQU1nRyxhQUFhQSxDQUFDdEwsSUFBSUMsT0FBTztBQUM3QixjQUFNc0wsSUFBSXhMLElBQUlDLElBQUlDLEVBQUU7QUFDcEIsZUFBT0MsY0FBY3FMLEVBQUUvSyxHQUFHK0ssRUFBRTdLLEdBQUcrQixPQUFPRSxNQUFNO0FBQUEsTUFDOUM7QUFFQSxZQUFNNkksTUFBTUYsV0FBV2hLLEVBQUV0QixJQUFJc0IsRUFBRXJCLEVBQUU7QUFDakMsWUFBTXdMLE9BQU9ILFdBQVdoSyxFQUFFdEIsS0FBS3VILEtBQUssR0FBR2pHLEVBQUVyQixFQUFFO0FBQzNDLFlBQU15TCxPQUFPSixXQUFXaEssRUFBRXRCLEtBQUt1SCxLQUFLLEdBQUdqRyxFQUFFckIsS0FBS3VILEtBQUssQ0FBQztBQUNwRCxZQUFNbUUsT0FBT0wsV0FBV2hLLEVBQUV0QixJQUFJc0IsRUFBRXJCLEtBQUt1SCxLQUFLLENBQUM7QUFFM0MsWUFBTW9FLE1BQU0sRUFBRXJMLElBQUlpTCxJQUFJakwsSUFBSUUsSUFBSStLLElBQUkvSyxLQUFLNEcsS0FBSyxFQUFFO0FBQzlDLFlBQU13RSxNQUFNLEVBQUV0TCxJQUFJa0wsS0FBS2xMLEtBQUs2RyxLQUFLLEdBQUczRyxJQUFJZ0wsS0FBS2hMLEdBQUc7QUFDaEQsWUFBTXFMLE1BQU0sRUFBRXZMLElBQUltTCxLQUFLbkwsSUFBSUUsSUFBSWlMLEtBQUtqTCxLQUFLNEcsS0FBSyxFQUFFO0FBQ2hELFlBQU0wRSxNQUFNLEVBQUV4TCxJQUFJb0wsS0FBS3BMLEtBQUs2RyxLQUFLLEdBQUczRyxJQUFJa0wsS0FBS2xMLEdBQUc7QUFFaEQsWUFBTXVMLE9BQU9mLE9BQU9DO0FBQ3BCLFlBQU1lLFFBQVFsTCxXQUFXaUwsTUFBTSxHQUFHO0FBQ2xDLFlBQU1FLFNBQVNuTCxXQUFXaUwsTUFBTSxHQUFHO0FBR25DL0IsVUFBSU0sVUFBVTtBQUNkTixVQUFJTyxPQUFPb0IsSUFBSXJMLElBQUlxTCxJQUFJbkwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT29CLElBQUl0TCxJQUFJc0wsSUFBSXBMLEVBQUU7QUFDcER3SixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT3NCLElBQUl4TCxJQUFJd0wsSUFBSXRMLEVBQUU7QUFDcER3SixVQUFJUyxVQUFVO0FBQUVULFVBQUlHLFlBQVlySixXQUFXaUwsTUFBTSxHQUFHO0FBQUUvQixVQUFJVSxLQUFLO0FBRy9EVixVQUFJTSxVQUFVO0FBQ2ROLFVBQUlPLE9BQU91QixJQUFJeEwsSUFBSXdMLElBQUl0TCxFQUFFO0FBQUV3SixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsRUFBRTtBQUNwRHdKLFVBQUlRLE9BQU9xQixJQUFJdkwsSUFBSXVMLElBQUlyTCxLQUFLNEssS0FBSztBQUFFcEIsVUFBSVEsT0FBT3NCLElBQUl4TCxJQUFJd0wsSUFBSXRMLEtBQUs0SyxLQUFLO0FBQ3BFcEIsVUFBSVMsVUFBVTtBQUFFVCxVQUFJRyxZQUFZNkI7QUFBTWhDLFVBQUlVLEtBQUs7QUFDL0NWLFVBQUlXLGNBQWNRLGFBQWEsWUFBWWE7QUFBTWhDLFVBQUlZLFlBQVk7QUFBSVosVUFBSWEsT0FBTztBQUdoRmIsVUFBSU0sVUFBVTtBQUNkTixVQUFJTyxPQUFPcUIsSUFBSXRMLElBQUlzTCxJQUFJcEwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT3FCLElBQUl2TCxJQUFJdUwsSUFBSXJMLEVBQUU7QUFDcER3SixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsS0FBSzRLLEtBQUs7QUFBRXBCLFVBQUlRLE9BQU9vQixJQUFJdEwsSUFBSXNMLElBQUlwTCxLQUFLNEssS0FBSztBQUNwRXBCLFVBQUlTLFVBQVU7QUFBRVQsVUFBSUcsWUFBWThCO0FBQU9qQyxVQUFJVSxLQUFLO0FBQ2hEVixVQUFJVyxjQUFjUSxhQUFhLFlBQVljO0FBQU9qQyxVQUFJWSxZQUFZO0FBQUlaLFVBQUlhLE9BQU87QUFHakZiLFVBQUlNLFVBQVU7QUFDZE4sVUFBSU8sT0FBT29CLElBQUlyTCxJQUFJcUwsSUFBSW5MLEtBQUs0SyxLQUFLO0FBQUVwQixVQUFJUSxPQUFPb0IsSUFBSXRMLElBQUlzTCxJQUFJcEwsS0FBSzRLLEtBQUs7QUFDcEVwQixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsS0FBSzRLLEtBQUs7QUFBRXBCLFVBQUlRLE9BQU9zQixJQUFJeEwsSUFBSXdMLElBQUl0TCxLQUFLNEssS0FBSztBQUNwRXBCLFVBQUlTLFVBQVU7QUFBRVQsVUFBSUcsWUFBWTRCO0FBQUsvQixVQUFJVSxLQUFLO0FBQzlDVixVQUFJVyxjQUFjUSxhQUFhLFlBQVlZO0FBQzNDL0IsVUFBSVksWUFBWU8sYUFBYSxJQUFJO0FBQUVuQixVQUFJYSxPQUFPO0FBRzlDLFlBQU1xQixXQUFXUCxJQUFJckwsS0FBS3VMLElBQUl2TCxNQUFNO0FBQ3BDLFlBQU02TCxXQUFXUixJQUFJbkwsS0FBS3FMLElBQUlyTCxNQUFNLElBQUk0SztBQUN4QyxZQUFNZ0IsV0FBV3hMLEtBQUtVLElBQUksR0FBR1YsS0FBS1csSUFBSStGLEtBQUtILEtBQUssTUFBTSxLQUFLM0UsS0FBSyxDQUFDO0FBQ2pFd0gsVUFBSXFDLE9BQU8sR0FBR0QsUUFBUTtBQUN0QnBDLFVBQUlzQyxZQUFZO0FBQ2hCdEMsVUFBSXVDLGVBQWU7QUFDbkJ2QyxVQUFJd0MsU0FBU2xILEtBQUttSCxRQUFRLEtBQUtQLFNBQVNDLE9BQU87QUFHL0MsVUFBSTlLLEVBQUVrSCxRQUFRLEdBQUc7QUFDZixjQUFNdEgsSUFBSSxJQUFJdUI7QUFDZHdILFlBQUlHLFlBQVk7QUFBVUgsWUFBSU0sVUFBVTtBQUN4Q04sWUFBSTBDLElBQUlkLElBQUl0TCxJQUFJc0wsSUFBSXBMLEtBQUs0SyxRQUFRbkssR0FBR0EsR0FBRyxHQUFHTCxLQUFLK0wsS0FBSyxDQUFDO0FBQUUzQyxZQUFJVSxLQUFLO0FBQ2hFVixZQUFJcUMsT0FBTyxRQUFRekwsS0FBS1UsSUFBSSxHQUFHLElBQUlrQixLQUFLLENBQUM7QUFDekN3SCxZQUFJRyxZQUFZO0FBQ2hCSCxZQUFJd0MsU0FBU25MLEVBQUVrSCxPQUFPcUQsSUFBSXRMLElBQUlzTCxJQUFJcEwsS0FBSzRLLFFBQVFuSyxDQUFDO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBR0EsUUFBSW1DLGdCQUFnQkUsVUFBVTtBQUM1QixZQUFNLEVBQUV2RCxJQUFJQyxHQUFHLElBQUlzRDtBQUNuQixZQUFNLENBQUNnRSxJQUFJQyxFQUFFLElBQUluQyxhQUFhaEMsYUFBYWlDLElBQUk7QUFDL0MsWUFBTXVILFFBQVE1RSxpQkFBaUJqSSxJQUFJQyxJQUFJc0gsSUFBSUMsSUFBSW5FLGFBQWF5QixFQUFFO0FBQzlELFlBQU0sRUFBRXRFLEdBQUdFLEVBQUUsSUFBSVgsSUFBSUMsSUFBSUMsRUFBRTtBQUMzQixZQUFNLEVBQUVNLElBQUl1TSxLQUFLck0sSUFBSXNNLElBQUksSUFBSTdNLGNBQWNNLEdBQUdFLEdBQUcrQixPQUFPRSxNQUFNO0FBQzlELFlBQU0wSSxRQUFRaEUsTUFBTWhFLGFBQWFpQyxTQUFTLGNBQWMsTUFBTTtBQUU5RCxZQUFNZ0csYUFBYUEsQ0FBQzBCLEtBQUtDLFFBQVE7QUFDL0IsY0FBTTFCLElBQUl4TCxJQUFJaU4sS0FBS0MsR0FBRztBQUN0QixlQUFPL00sY0FBY3FMLEVBQUUvSyxHQUFHK0ssRUFBRTdLLEdBQUcrQixPQUFPRSxNQUFNO0FBQUEsTUFDOUM7QUFDQSxZQUFNNkksTUFBTUYsV0FBV3RMLElBQUlDLEVBQUU7QUFDN0IsWUFBTXdMLE9BQU9ILFdBQVd0TCxLQUFLdUgsS0FBSyxHQUFHdEgsRUFBRTtBQUN2QyxZQUFNeUwsT0FBT0osV0FBV3RMLEtBQUt1SCxLQUFLLEdBQUd0SCxLQUFLdUgsS0FBSyxDQUFDO0FBQ2hELFlBQU1tRSxPQUFPTCxXQUFXdEwsSUFBSUMsS0FBS3VILEtBQUssQ0FBQztBQUN2QyxZQUFNb0UsTUFBTSxFQUFFckwsSUFBSWlMLElBQUlqTCxJQUFJRSxJQUFJK0ssSUFBSS9LLEtBQUs0RyxLQUFLLEVBQUU7QUFDOUMsWUFBTXdFLE1BQU0sRUFBRXRMLElBQUlrTCxLQUFLbEwsS0FBSzZHLEtBQUssR0FBRzNHLElBQUlnTCxLQUFLaEwsR0FBRztBQUNoRCxZQUFNcUwsTUFBTSxFQUFFdkwsSUFBSW1MLEtBQUtuTCxJQUFJRSxJQUFJaUwsS0FBS2pMLEtBQUs0RyxLQUFLLEVBQUU7QUFDaEQsWUFBTTBFLE1BQU0sRUFBRXhMLElBQUlvTCxLQUFLcEwsS0FBSzZHLEtBQUssR0FBRzNHLElBQUlrTCxLQUFLbEwsR0FBRztBQUVoRHdKLFVBQUlpRCxjQUFjO0FBQ2xCakQsVUFBSU0sVUFBVTtBQUNkTixVQUFJTyxPQUFPb0IsSUFBSXJMLElBQUlxTCxJQUFJbkwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT29CLElBQUl0TCxJQUFJc0wsSUFBSXBMLEVBQUU7QUFDcER3SixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT3NCLElBQUl4TCxJQUFJd0wsSUFBSXRMLEVBQUU7QUFDcER3SixVQUFJUyxVQUFVO0FBQ2RULFVBQUlHLFlBQVl5QyxRQUFRLHlCQUF5QjtBQUNqRDVDLFVBQUlXLGNBQWNpQyxRQUFRLFlBQVk7QUFDdEM1QyxVQUFJWSxZQUFZO0FBQ2hCWixVQUFJa0QsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCbEQsVUFBSVUsS0FBSztBQUNUVixVQUFJYSxPQUFPO0FBQ1hiLFVBQUlrRCxZQUFZLEVBQUU7QUFDbEJsRCxVQUFJaUQsY0FBYztBQUFBLElBQ3BCO0FBR0EsUUFBSTdLLGFBQWFVLFNBQVMsV0FBVyxDQUFDTSxjQUFjO0FBQ2xELFlBQU0sRUFBRXJELElBQUlDLEdBQUcsSUFBSW9DO0FBQ25CLFlBQU0sQ0FBQ2tGLElBQUlDLEVBQUUsSUFBSW5DLGFBQWFwRCxZQUFZO0FBQzFDLFVBQUlqQyxNQUFNcEIsZUFBZXFCLE1BQU1yQixlQUFlb0IsS0FBS3ZCLFlBQVlHLGVBQWVxQixLQUFLeEIsWUFBWUcsYUFBYTtBQUMxRyxjQUFNLEVBQUU0QixHQUFHRSxFQUFFLElBQUlYLElBQUlDLElBQUlDLEVBQUU7QUFDM0IsY0FBTSxFQUFFTSxJQUFJdU0sS0FBS3JNLElBQUlzTSxJQUFJLElBQUk3TSxjQUFjTSxHQUFHRSxHQUFHK0IsT0FBT0UsTUFBTTtBQUM5RHNILFlBQUlNLFVBQVU7QUFDZE4sWUFBSU8sT0FBT3NDLEtBQUtDLE1BQU0xRixLQUFLLENBQUM7QUFBRTRDLFlBQUlRLE9BQU9xQyxNQUFNMUYsS0FBSyxHQUFHMkYsR0FBRztBQUMxRDlDLFlBQUlRLE9BQU9xQyxLQUFLQyxNQUFNMUYsS0FBSyxDQUFDO0FBQUU0QyxZQUFJUSxPQUFPcUMsTUFBTTFGLEtBQUssR0FBRzJGLEdBQUc7QUFDMUQ5QyxZQUFJUyxVQUFVO0FBQ2RULFlBQUlHLFlBQVk7QUFDaEJILFlBQUlXLGNBQWM7QUFBVVgsWUFBSVksWUFBWTtBQUM1Q1osWUFBSVUsS0FBSztBQUFFVixZQUFJYSxPQUFPO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBR0EsUUFBSXpHLHNCQUFzQnRCLFNBQVMsU0FBUztBQUMxQyxZQUFNekIsSUFBSStDO0FBQ1YsWUFBTWtELEtBQUtqRyxFQUFFdUcsZUFBZTtBQUM1QixZQUFNTCxLQUFLbEcsRUFBRXdHLGVBQWU7QUFDNUIsWUFBTXVELFFBQVFoRSxNQUFNL0YsRUFBRWdFLFNBQVMsY0FBYyxNQUFNO0FBRW5ELFlBQU1nRyxhQUFhQSxDQUFDMEIsS0FBS0MsUUFBUTtBQUMvQixjQUFNMUIsSUFBSXhMLElBQUlpTixLQUFLQyxHQUFHO0FBQ3RCLGVBQU8vTSxjQUFjcUwsRUFBRS9LLEdBQUcrSyxFQUFFN0ssR0FBRytCLE9BQU9FLE1BQU07QUFBQSxNQUM5QztBQUNBLFlBQU02SSxNQUFNRixXQUFXaEssRUFBRXRCLElBQUlzQixFQUFFckIsRUFBRTtBQUNqQyxZQUFNd0wsT0FBT0gsV0FBV2hLLEVBQUV0QixLQUFLdUgsS0FBSyxHQUFHakcsRUFBRXJCLEVBQUU7QUFDM0MsWUFBTXlMLE9BQU9KLFdBQVdoSyxFQUFFdEIsS0FBS3VILEtBQUssR0FBR2pHLEVBQUVyQixLQUFLdUgsS0FBSyxDQUFDO0FBQ3BELFlBQU1tRSxPQUFPTCxXQUFXaEssRUFBRXRCLElBQUlzQixFQUFFckIsS0FBS3VILEtBQUssQ0FBQztBQUMzQyxZQUFNb0UsTUFBTSxFQUFFckwsSUFBSWlMLElBQUlqTCxJQUFJRSxJQUFJK0ssSUFBSS9LLEtBQUs0RyxLQUFLLEVBQUU7QUFDOUMsWUFBTXdFLE1BQU0sRUFBRXRMLElBQUlrTCxLQUFLbEwsS0FBSzZHLEtBQUssR0FBRzNHLElBQUlnTCxLQUFLaEwsR0FBRztBQUNoRCxZQUFNcUwsTUFBTSxFQUFFdkwsSUFBSW1MLEtBQUtuTCxJQUFJRSxJQUFJaUwsS0FBS2pMLEtBQUs0RyxLQUFLLEVBQUU7QUFDaEQsWUFBTTBFLE1BQU0sRUFBRXhMLElBQUlvTCxLQUFLcEwsS0FBSzZHLEtBQUssR0FBRzNHLElBQUlrTCxLQUFLbEwsR0FBRztBQUVoRHdKLFVBQUlpRCxjQUFjO0FBQ2xCakQsVUFBSU0sVUFBVTtBQUNkTixVQUFJTyxPQUFPb0IsSUFBSXJMLElBQUlxTCxJQUFJbkwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT29CLElBQUl0TCxJQUFJc0wsSUFBSXBMLEVBQUU7QUFDcER3SixVQUFJUSxPQUFPcUIsSUFBSXZMLElBQUl1TCxJQUFJckwsRUFBRTtBQUFFd0osVUFBSVEsT0FBT3NCLElBQUl4TCxJQUFJd0wsSUFBSXRMLEVBQUU7QUFDcER3SixVQUFJUyxVQUFVO0FBQ2RULFVBQUlHLFlBQVk7QUFDaEJILFVBQUlXLGNBQWM7QUFDbEJYLFVBQUlZLFlBQVk7QUFDaEJaLFVBQUlrRCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEJsRCxVQUFJVSxLQUFLO0FBQ1RWLFVBQUlhLE9BQU87QUFDWGIsVUFBSWtELFlBQVksRUFBRTtBQUNsQmxELFVBQUlpRCxjQUFjO0FBQUEsSUFDcEI7QUFBQSxFQUNGLEdBQUcsQ0FBQzlOLFdBQVdpRCxXQUFXSSxPQUFPTSxNQUFNUixvQkFBb0JJLFFBQVFVLGNBQWNFLFVBQVVNLGlCQUFpQkUsV0FBV00sb0JBQW9Cd0IsV0FBVyxDQUFDO0FBRXZKLFFBQU11SCxlQUFlaE8sVUFBVTRJLEtBQUssQ0FBQzFHLE1BQU1BLEVBQUV3RCxPQUFPdkMsa0JBQWtCO0FBRXRFLFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsc0VBQ3BHLGlDQUFDLFNBQUksd0JBQXFCLHVDQUFzQyx3QkFBcUIsUUFBTyxXQUFVLHVEQUFzRCxPQUFPLEVBQUU4SyxZQUFZLFdBQVdsQyxRQUFRLHFCQUFxQm1DLFdBQVcsUUFBUUMsVUFBVSxPQUFPLEdBRTNQO0FBQUEsMkJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsd0RBQXVELE9BQU8sRUFBRUMsYUFBYSxXQUFXSCxZQUFZLFVBQVUsR0FDbE47QUFBQSw2QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSwyQkFDckc7QUFBQSwrQkFBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSxzQ0FBcUMsNENBQTlJO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMEs7QUFBQSxRQUN6S3hLLFNBQVMsdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLFdBQVUsZ0RBQStDLHdCQUF4SjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWdLO0FBQUEsV0FGNUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsTUFDQSx1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSwyQkFDckc7QUFBQSwrQkFBQyxZQUFPLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sU0FBU29ELFlBQVksVUFBVXRDLGdCQUFnQixHQUFHLE9BQU0sZ0JBQWUsV0FBVSxvRUFDL0ssaUNBQUMsUUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLE1BQU0sTUFBckc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF3RyxLQUQxRztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFlBQU8sd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxTQUFTd0MsWUFBWSxVQUFVeEMsZ0JBQWdCRixRQUFRMkMsU0FBUyxHQUFHLE9BQU0sc0JBQXFCLFdBQVUsb0VBQ3RNLGlDQUFDLFFBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxNQUFNLE1BQXJHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBd0csS0FEMUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFDQSx1QkFBQyxZQUFPLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sU0FBUyxNQUFNO0FBQUNoQywrQkFBcUIsWUFBWTtBQUFFRiw2QkFBbUIsSUFBSTtBQUFBLFFBQUUsR0FBRyxPQUFNLG9CQUFtQixXQUFVLGdEQUNoTixpQ0FBQyxXQUFRLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxNQUF4RztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTJHLEtBRDdHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsWUFBTyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFNBQVNtQyxnQkFBZ0IsT0FBTSx1QkFBc0IsV0FBVSw0RUFBMkUsT0FBTyxFQUFFOEUsUUFBUSxvQkFBb0IsR0FDN1E7QUFBQSxpQ0FBQyxVQUFPLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxJQUFJLFdBQVUsaUJBQXJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtJO0FBQUEsVUFBRztBQUFBLGFBRHZJO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsWUFBTyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFNBQVN4RixhQUFhLE9BQU0sMkJBQTBCLFdBQVUsa0ZBQWlGLE9BQU8sRUFBRXdGLFFBQVEsb0JBQW9CLEdBQ3BSO0FBQUEsaUNBQUMsYUFBVSx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLE1BQU0sSUFBSSxXQUFVLGlCQUF4SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxSTtBQUFBLFVBQUc7QUFBQSxhQUQxSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFlBQU8sd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxTQUFTMUYsWUFBWSxXQUFVLHNEQUFxRCxPQUFPLEVBQUU0SCxZQUFZLFdBQVdsQyxRQUFRLG9CQUFvQixHQUM5TztBQUFBLGlDQUFDLFFBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxNQUFNLElBQUksV0FBVSxpQkFBbkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0k7QUFBQSxVQUFHO0FBQUEsYUFEckk7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFDQSx1QkFBQyxZQUFPLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sU0FBU3pKLFNBQVMsV0FBVSxpRUFBZ0UsaUNBQUMsS0FBRSx3QkFBcUIseUNBQXdDLHdCQUFxQixTQUFRLE1BQU0sTUFBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFzRyxLQUFsUztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXFTO0FBQUEsV0FuQnZTO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFvQkE7QUFBQSxTQXpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMEJBO0FBQUEsSUFFQSx1QkFBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSwrQkFFcEc7QUFBQSw2QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxvREFBbUQsT0FBTyxFQUFFOEwsYUFBYSxXQUFXSCxZQUFZLFdBQVdJLFVBQVUsUUFBUSxHQUVsTztBQUFBLCtCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSw2Q0FBNEMseUJBQXBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTZKO0FBQUEsVUFDNUp2UCxlQUFlMEc7QUFBQUEsWUFBSSxDQUFDOUYsR0FBRytGLE1BQ3hCO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQU8sd0JBQXFCO0FBQUEsZ0JBQXVDLHdCQUFxQjtBQUFBLGdCQUFlLFNBQVMsTUFBTTtBQUFDaEQsK0JBQWFnRCxDQUFDO0FBQUU5QyxnQ0FBYyxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxnQkFDekosV0FBVTtBQUFBLGdCQUNWLE9BQU8sRUFBRXNMLFlBQVluTyxjQUFjMkYsSUFBSSxZQUFZLFdBQVdzRyxRQUFRLGFBQWFqTSxjQUFjMkYsSUFBSSxZQUFZLFNBQVMsSUFBSWtGLE9BQU83SyxjQUFjMkYsSUFBSSxZQUFZLE9BQU87QUFBQSxnQkFBRyw4QkFBMkI7QUFBQSxnQkFBTywyQkFBeUIvRixHQUFHZ0csTUFBTWhHLEdBQUc0TztBQUFBQSxnQkFDL081TztBQUFBQSxvQkFBRTROO0FBQUFBLGtCQUFLO0FBQUEsa0JBQUU1TixFQUFFNk87QUFBQUE7QUFBQUE7QUFBQUEsY0FIcUY5STtBQUFBQSxjQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSUU7QUFBQSxVQUNGO0FBQUEsYUFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBU0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSw2Q0FBNEMsdUJBQXBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJKO0FBQUEsVUFDMUoxRyxtQkFBbUJlLFNBQVMsR0FBRzBGO0FBQUFBLFlBQUksQ0FBQzdGLEdBQUc4RixNQUN4QztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUF1Qyx3QkFBcUI7QUFBQSxnQkFBZSxTQUFTLE1BQU05QyxjQUFjOEMsQ0FBQztBQUFBLGdCQUN0SSxXQUFVO0FBQUEsZ0JBQ1YsT0FBTyxFQUFFd0ksWUFBWXZMLGVBQWUrQyxJQUFJLFlBQVksV0FBV3NHLFFBQVEsYUFBYXJKLGVBQWUrQyxJQUFJLFlBQVksU0FBUyxJQUFJa0YsT0FBT2pJLGVBQWUrQyxJQUFJLFlBQVksT0FBTztBQUFBLGdCQUFHLDJCQUF5QjlGLElBQUkseUJBQXlCO0FBQUEsZ0JBQUcsOEJBQTJCO0FBQUEsZ0JBQy9QQTtBQUFBQSxvQkFBRXlKO0FBQUFBLGtCQUFNO0FBQUEsa0JBQUd6SixFQUFFNE87QUFBQUEsa0JBQUs7QUFBQSxrQkFBRTVPLEVBQUU2TyxPQUFPLE9BQU87QUFBQSxrQkFDcENuTyxXQUFXUCxXQUFXMkYsQ0FBQyxJQUFJLFFBQVE7QUFBQTtBQUFBO0FBQUEsY0FKNkRBO0FBQUFBLGNBQXJHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFLRTtBQUFBLFVBQ0Y7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUNwRjtBQUFBLGlDQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxXQUFVLDZDQUE0QyxvQkFBcEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBd0o7QUFBQSxVQUN2SixDQUFDLENBQUMsU0FBUyxXQUFXLEdBQUcsQ0FBQyxTQUFTLFdBQVcsR0FBRyxDQUFDLFVBQVUsV0FBVyxDQUFDLEVBQUVEO0FBQUFBLFlBQUksQ0FBQyxDQUFDaUosR0FBR0MsS0FBSyxNQUN6RjtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUF1Qyx3QkFBcUI7QUFBQSxnQkFBZSxTQUFTLE1BQU05SyxRQUFRNkssQ0FBQztBQUFBLGdCQUNoSSxXQUFVO0FBQUEsZ0JBQ1YsT0FBTyxFQUFFUixZQUFZdEssU0FBUzhLLElBQUksWUFBWSxXQUFXMUMsUUFBUSxhQUFhcEksU0FBUzhLLElBQUksWUFBWSxTQUFTLElBQUk5RCxPQUFPaEgsU0FBUzhLLElBQUksWUFBWSxPQUFPO0FBQUEsZ0JBQUcsOEJBQTJCO0FBQUEsZ0JBQ3BMQztBQUFBQTtBQUFBQSxjQUhnR0Q7QUFBQUEsY0FBckc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUlFO0FBQUEsVUFDRjtBQUFBLGFBUkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVNBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQ3BGO0FBQUEsaUNBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLFdBQVUsNkNBQTRDLG9CQUFwSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3SjtBQUFBLFVBQ3hKLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLDJCQUNyRztBQUFBLG1DQUFDLFlBQU8sd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxTQUFTLE1BQU1uTCxTQUFTLENBQUNxTCxNQUFNbE4sS0FBS1UsSUFBSSxLQUFLd00sSUFBSSxHQUFHLENBQUMsR0FBRyxXQUFVLDBEQUNoSyxpQ0FBQyxTQUFNLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxNQUF0RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5RyxLQUQzRztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQSx1QkFBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxxREFBc0R0TDtBQUFBQSx1QkFBUSxLQUFLdUwsUUFBUSxDQUFDO0FBQUEsY0FBRTtBQUFBLGlCQUF0TDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1TDtBQUFBLFlBQ3ZMLHVCQUFDLFlBQU8sd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxTQUFTLE1BQU10TCxTQUFTLENBQUNxTCxNQUFNbE4sS0FBS1csSUFBSSxHQUFHdU0sSUFBSSxHQUFHLENBQUMsR0FBRyxXQUFVLDBEQUM5SixpQ0FBQyxRQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxNQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF3RyxLQUQxRztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVFBO0FBQUEsYUFWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBV0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSw2Q0FBNEMsc0JBQXBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTBKO0FBQUEsVUFDMUo7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFPLHdCQUFxQjtBQUFBLGNBQXVDLHdCQUFxQjtBQUFBLGNBQU8sU0FBUyxNQUFNO0FBQUMzSixxQ0FBcUIsWUFBWTtBQUFFRixtQ0FBbUIsSUFBSTtBQUFBLGNBQUU7QUFBQSxjQUM1SyxXQUFVO0FBQUEsY0FDVixPQUFPLEVBQUVtSixZQUFZeEosaUJBQWlCc0gsUUFBUSxrQkFBa0JwQixPQUFPLE9BQU87QUFBQSxjQUM1RTtBQUFBLHVDQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLDBCQUF5QixPQUFPLEVBQUVzRCxZQUFZeEosZ0JBQWdCLEtBQXJLO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVLO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFIeks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FBTyx3QkFBcUI7QUFBQSxjQUF1Qyx3QkFBcUI7QUFBQSxjQUFPLFNBQVMsTUFBTTtBQUFDTyxxQ0FBcUIsTUFBTTtBQUFFRixtQ0FBbUIsSUFBSTtBQUFBLGNBQUU7QUFBQSxjQUN0SyxXQUFVO0FBQUEsY0FDVixPQUFPLEVBQUVtSixZQUFZdEosV0FBV29ILFFBQVEsa0JBQWtCcEIsT0FBTyxPQUFPO0FBQUEsY0FDdEU7QUFBQSx1Q0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSwwQkFBeUIsT0FBTyxFQUFFc0QsWUFBWXRKLFVBQVUsS0FBL0o7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBaUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUhuSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFLQTtBQUFBLGFBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWNBO0FBQUEsV0FuRUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9FQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsc0RBQXFELE9BQU8sRUFBRXNKLFlBQVksVUFBVSxHQUN6TDtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLGlEQUFnRCw4QkFBMkIsUUFBTywyQkFBeUI5SSxZQUFZTyxNQUFNUCxZQUFZbUosS0FDN09uSjtBQUFBQSxzQkFBWW9KO0FBQUFBLFVBQUs7QUFBQSxVQUFJdk8sVUFBVWdIO0FBQUFBLFVBQU87QUFBQSxhQUR6QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBTyx3QkFBcUI7QUFBQSxZQUF1Qyx3QkFBcUI7QUFBQSxZQUN6RixLQUFLeEU7QUFBQUEsWUFDTCxPQUFPeEQ7QUFBQUEsWUFDUCxRQUFRRztBQUFBQSxZQUNSLE9BQU87QUFBQSxjQUNMMFAsUUFBUTVLLGVBQWUsY0FBY0osV0FBVyxhQUFhRixTQUFTLFVBQVUsZ0JBQWdCQSxTQUFTLFdBQVcsWUFBWTtBQUFBLGNBQ2hJb0ksUUFBUTtBQUFBLGNBQ1IrQyxjQUFjO0FBQUEsY0FDZEMsYUFBYTtBQUFBLFlBQ2Y7QUFBQSxZQUNBLFNBQVNoRztBQUFBQSxZQUNULGFBQWFTO0FBQUFBLFlBQ2IsYUFBYUk7QUFBQUEsWUFDYixXQUFXSztBQUFBQSxZQUNYLGNBQWMsTUFBTTtBQUFDbkcsMEJBQVksS0FBSztBQUFFRSwyQkFBYSxJQUFJO0FBQUVkLDJCQUFhLElBQUk7QUFBQSxZQUFFO0FBQUEsWUFDOUUsU0FBU2dIO0FBQUFBO0FBQUFBLFVBZlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBZXFCO0FBQUEsUUFFcEI4RCxnQkFBZ0JySyxTQUFTLFlBQzFCLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLG9EQUFtRCxPQUFPLEVBQUVzSyxZQUFZLFdBQVdsQyxRQUFRLHFCQUFxQnNDLFVBQVUsUUFBUSxHQUNyTztBQUFBLGlDQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLHFDQUNyRztBQUFBLG1DQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLDRDQUEyQyw4QkFBMkIsUUFBUTdQO0FBQUFBLDRCQUFjd1AsYUFBYTlILElBQUksR0FBR3FJO0FBQUFBLGNBQUs7QUFBQSxjQUFLUCxhQUFhNUU7QUFBQUEsaUJBQS9PO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXFQO0FBQUEsWUFDclAsdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUscUNBQW9DLDhCQUEyQixNQUFLLDJCQUF5QjRFLGNBQWN0SSxNQUFNc0ksY0FBY00sS0FBSztBQUFBO0FBQUEsY0FBRU4sYUFBYXBOO0FBQUFBLGNBQUc7QUFBQSxjQUFFb04sYUFBYW5OO0FBQUFBLGNBQUc7QUFBQSxpQkFBaFI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBaVI7QUFBQSxlQUZuUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFHQSx1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSwyQkFDckc7QUFBQSxtQ0FBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSxzQ0FBcUMsc0JBQTlJO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9KO0FBQUEsWUFDcEo7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFBTyx3QkFBcUI7QUFBQSxnQkFBdUMsd0JBQXFCO0FBQUEsZ0JBQU8sU0FBUyxNQUFNK0IsYUFBYSxDQUFDK0QsU0FBU0EsS0FBS25CLElBQUksQ0FBQ3RELE1BQU1BLEVBQUV3RCxPQUFPc0ksYUFBYXRJLEtBQUssRUFBRSxHQUFHeEQsR0FBR2tILE9BQU8zSCxLQUFLVSxJQUFJLEdBQUdELEVBQUVrSCxRQUFRLENBQUMsRUFBRSxJQUFJbEgsQ0FBQyxDQUFDO0FBQUEsZ0JBQ2pPLFdBQVU7QUFBQSxnQkFBNEMsT0FBTyxFQUFFK0wsWUFBWSxXQUFXbEMsUUFBUSxxQkFBcUJwQixPQUFPLE9BQU87QUFBQSxnQkFBRTtBQUFBO0FBQUEsY0FEakk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBR0E7QUFBQSxZQUNBLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLHdEQUF1RCw4QkFBMkIsU0FBUSwyQkFBeUJxRCxjQUFjdEksTUFBTXNJLGNBQWNNLEtBQU1OLHVCQUFhNUUsU0FBaFI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBc1I7QUFBQSxZQUN0UjtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUF1Qyx3QkFBcUI7QUFBQSxnQkFBTyxTQUFTLE1BQU14RyxhQUFhLENBQUMrRCxTQUFTQSxLQUFLbkIsSUFBSSxDQUFDdEQsTUFBTUEsRUFBRXdELE9BQU9zSSxhQUFhdEksS0FBSyxFQUFFLEdBQUd4RCxHQUFHa0gsT0FBTzNILEtBQUtXLElBQUksSUFBSUYsRUFBRWtILFFBQVEsQ0FBQyxFQUFFLElBQUlsSCxDQUFDLENBQUM7QUFBQSxnQkFDbE8sV0FBVTtBQUFBLGdCQUE0QyxPQUFPLEVBQUUrTCxZQUFZLFdBQVdsQyxRQUFRLHFCQUFxQnBCLE9BQU8sT0FBTztBQUFBLGdCQUFFO0FBQUE7QUFBQSxjQURqSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFHQTtBQUFBLGVBVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFXQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsNEJBQTJCLE9BQU8sRUFBRXlELGFBQWEsVUFBVSxHQUNoSztBQUFBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQU8sd0JBQXFCO0FBQUEsZ0JBQXVDLHdCQUFxQjtBQUFBLGdCQUFPLFNBQVMsTUFBTTtBQUFDbEssa0NBQWdCOEosWUFBWTtBQUFFNUosOEJBQVksRUFBRXhELElBQUlvTixhQUFhcE4sSUFBSUMsSUFBSW1OLGFBQWFuTixHQUFHLENBQUM7QUFBQSxnQkFBRTtBQUFBLGdCQUMxTSxXQUFVO0FBQUEsZ0JBQ1YsT0FBTyxFQUFFb04sWUFBWSxXQUFXbEMsUUFBUSxxQkFBcUJwQixPQUFPLE9BQU87QUFBQSxnQkFBRTtBQUFBO0FBQUEsY0FGM0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSUE7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQU8sd0JBQXFCO0FBQUEsZ0JBQXVDLHdCQUFxQjtBQUFBLGdCQUFPLFNBQVMsTUFBTTtBQUFDL0gsK0JBQWEsQ0FBQytELFNBQVNBLEtBQUt1QyxPQUFPLENBQUNoSCxNQUFNQSxFQUFFd0QsT0FBT3NJLGFBQWF0SSxFQUFFLENBQUM7QUFBRXRDLHdDQUFzQixJQUFJO0FBQUEsZ0JBQUU7QUFBQSxnQkFDbk4sV0FBVTtBQUFBLGdCQUNWLE9BQU8sRUFBRTZLLFlBQVksV0FBV2xDLFFBQVEscUJBQXFCcEIsT0FBTyxPQUFPO0FBQUEsZ0JBQUU7QUFBQTtBQUFBLGNBRjNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUlBO0FBQUEsZUFWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVdBO0FBQUEsYUFoQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWlDRTtBQUFBLFFBRUYsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsZ0RBQ3BHMUc7QUFBQUEseUJBQWUsK0JBQStCLDZDQUE2Q047QUFBQUEsVUFBSztBQUFBLFVBQWtCM0QsVUFBVWdIO0FBQUFBLFVBQU87QUFBQSxhQUR0STtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQTNERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNERBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxvREFBbUQsT0FBTyxFQUFFb0gsYUFBYSxXQUFXSCxZQUFZLFdBQVdJLFVBQVUsUUFBUSxHQUNsTztBQUFBLCtCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxXQUFVLDJDQUEwQyw0QkFBbEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE4SjtBQUFBLFFBQzlKLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLHVCQUNwRzNOLG9CQUFVOEUsSUFBSSxDQUFDVSxNQUFNOEksZUFBZTtBQUNuQyxnQkFBTTdJLE1BQU0zSCxjQUFjMEgsSUFBSTtBQUM5QixjQUFJLENBQUNDLElBQUssUUFBTztBQUNqQixpQkFDRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQU8sd0JBQXFCO0FBQUEsY0FBdUMsd0JBQXFCO0FBQUEsY0FBa0IsU0FBUyxNQUFNO0FBQUNyRCxnQ0FBZ0JvRCxJQUFJO0FBQUV0Qyx3QkFBUSxPQUFPO0FBQUEsY0FBRTtBQUFBLGNBQ2xLLFdBQVU7QUFBQSxjQUNWLE9BQU8sRUFBRXFLLFlBQVlwTCxpQkFBaUJxRCxRQUFRdkMsU0FBUyxVQUFVLFlBQVksV0FBV29JLFFBQVEsYUFBYWxKLGlCQUFpQnFELFFBQVF2QyxTQUFTLFVBQVUsWUFBWSxTQUFTLElBQUlnSCxPQUFPOUgsaUJBQWlCcUQsUUFBUXZDLFNBQVMsVUFBVSxZQUFZLE9BQU87QUFBQSxjQUFHLGtCQUFnQnFMO0FBQUFBLGNBQVksMEJBQXVCO0FBQUEsY0FDNVM7QUFBQSx1Q0FBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sOEJBQTJCLFFBQU8sMkJBQXlCN0ksS0FBS1QsTUFBTVMsS0FBS21JLEtBQUssa0JBQWdCVSxZQUFZLDBCQUF1QixhQUFhN0ksY0FBSW1ILFFBQWxQO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVQO0FBQUEsZ0JBQ3ZQLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLHdCQUF1Qiw4QkFBMkIsUUFBTywyQkFBeUJuSCxLQUFLVCxNQUFNUyxLQUFLbUksS0FBSyxrQkFBZ0JVLFlBQVksMEJBQXVCLGFBQWE3SSxjQUFJb0ksUUFBblI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBd1I7QUFBQTtBQUFBO0FBQUEsWUFKckxySTtBQUFBQSxZQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxRQUVKLENBQUMsS0FaSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBYUE7QUFBQSxRQUdBLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsV0FBVSw2Q0FBNEMscUJBQXBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXlKO0FBQUEsVUFDekosdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsMEJBQ3BHLFdBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFVjtBQUFBQSxZQUFJLENBQUN5SixHQUFHRCxlQUN6QztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUF1Qyx3QkFBcUI7QUFBQSxnQkFBZSxTQUFTLE1BQU1oTSxpQkFBaUJpTSxDQUFDO0FBQUEsZ0JBQ3pJLFdBQVU7QUFBQSxnQkFDVixPQUFPLEVBQUVoQixZQUFZbEwsa0JBQWtCa00sSUFBSSxZQUFZLFdBQVdsRCxRQUFRLGFBQWFoSixrQkFBa0JrTSxJQUFJLFlBQVksU0FBUyxJQUFJdEUsT0FBTzVILGtCQUFrQmtNLElBQUksU0FBUyxPQUFPO0FBQUEsZ0JBQUcsa0JBQWdCRDtBQUFBQSxnQkFDak1DO0FBQUFBO0FBQUFBLGNBSGdHQTtBQUFBQSxjQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSUU7QUFBQSxVQUNGLEtBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFRQTtBQUFBLGFBVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVdBO0FBQUEsV0E3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQThCQTtBQUFBLFNBdEtGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F1S0E7QUFBQSxJQUdDcEssbUJBQ0QsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsc0VBQ25HLGlDQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLGtCQUFpQixPQUFPLEVBQUVvSixZQUFZLFdBQVdsQyxRQUFRLG9CQUFvQixHQUNsTDtBQUFBLDZCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLDhDQUNwR2hILGdDQUFzQixlQUFlLHFCQUFxQixnQkFEN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFDQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQW9CLHdCQUFxQjtBQUFBLFVBQXVDLHdCQUFxQjtBQUFBLFVBQ3hHLE9BQU9BLHNCQUFzQixlQUFlTixrQkFBa0JFO0FBQUFBLFVBQzlELFVBQVUrRjtBQUFBQTtBQUFBQSxRQUZSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUV3QjtBQUFBLE1BRXhCO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFBTyx3QkFBcUI7QUFBQSxVQUF1Qyx3QkFBcUI7QUFBQSxVQUFPLFNBQVMsTUFBTTVGLG1CQUFtQixLQUFLO0FBQUEsVUFDekksV0FBVTtBQUFBLFVBQ1YsT0FBTyxFQUFFaUgsUUFBUSxpQkFBaUI7QUFBQSxVQUFFO0FBQUE7QUFBQSxRQUZsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJQTtBQUFBLFNBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWFBLEtBZEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWVFO0FBQUEsT0F4Tko7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQTBOQSxLQTNORjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBNE5BO0FBRUo7QUFBQ3hKLEdBMXRCdUJGLGVBQWE7QUFBQSxNQUFiQTtBQUFhLElBQUF6QyxJQUFBc1A7QUFBQSxhQUFBdFAsSUFBQTtBQUFBLGFBQUFzUCxLQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZUNhbGxiYWNrIiwiWCIsIlNhdmUiLCJSb3RhdGVDY3ciLCJUcmFzaDIiLCJQbHVzIiwiTWludXMiLCJVbmRvIiwiUmVkbyIsIkVyYXNlciIsIlBhbGV0dGUiLCJCVUlMRElOR19ERUZTIiwiQlVJTERJTkdfQ09MT1JTIiwiVElMRV9XIiwiVElMRV9IIiwiZ3JpZFRvU2NyZWVuIiwiU3BlY3RydW1Db2xvclBpY2tlciIsIlRFUlJJVE9SWV9ERUZTIiwiVEVSUklUT1JZX0RVTkdFT05TIiwiQ0FOVkFTX1ciLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiQ0FOVkFTX0giLCJpbm5lckhlaWdodCIsIkdSSURfU0laRSIsIkNBTlZBU19PRkZTRVRfWCIsIkNBTlZBU19PRkZTRVRfWSIsIkZPUkVTVF9SSU5HIiwiTFNfS0VZIiwidCIsImQiLCJfYyIsInNhdmVMYXlvdXQiLCJ0ZXJyaXRvcnkiLCJkdW5nZW9uIiwiYnVpbGRpbmdzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2FkTGF5b3V0IiwicmF3IiwiZ2V0SXRlbSIsInBhcnNlIiwiZ2V0RHVuZ2VvbkxheW91dCIsIlBMQUNFQUJMRSIsImd0cyIsImd4IiwiZ3kiLCJ3b3JsZFRvQ2FudmFzIiwid3giLCJ3eSIsInNjIiwib2ZmIiwiY3giLCJ4IiwiY3kiLCJ5IiwiY2FudmFzVG9Xb3JsZCIsInNjcmVlblRvR3JpZCIsIk1hdGgiLCJyb3VuZCIsInNoYWRlQ29sb3IiLCJoZXgiLCJhbW91bnQiLCJyIiwicGFyc2VJbnQiLCJzbGljZSIsImciLCJiIiwibWF4IiwibWluIiwiRHVuZ2VvbkVkaXRvciIsIm9uQ2xvc2UiLCJfcyIsImNhbnZhc1JlZiIsInNldFRlcnJpdG9yeSIsImR1bmdlb25JZHgiLCJzZXREdW5nZW9uSWR4Iiwic2V0QnVpbGRpbmdzIiwic2VsZWN0ZWRUeXBlIiwic2V0U2VsZWN0ZWRUeXBlIiwic2VsZWN0ZWRMZXZlbCIsInNldFNlbGVjdGVkTGV2ZWwiLCJob3ZlckNlbGwiLCJzZXRIb3ZlckNlbGwiLCJzZWxlY3RlZEJ1aWxkaW5nSWQiLCJzZXRTZWxlY3RlZEJ1aWxkaW5nSWQiLCJzY2FsZSIsInNldFNjYWxlIiwib2Zmc2V0Iiwic2V0T2Zmc2V0Iiwic2F2ZWQiLCJzZXRTYXZlZCIsIm1vZGUiLCJzZXRNb2RlIiwiZHJhZ2dpbmciLCJzZXREcmFnZ2luZyIsImRyYWdTdGFydCIsInNldERyYWdTdGFydCIsIm1vdmVCdWlsZGluZyIsInNldE1vdmVCdWlsZGluZyIsImdob3N0UG9zIiwic2V0R2hvc3RQb3MiLCJoaXN0b3J5Iiwic2V0SGlzdG9yeSIsImhpc3RvcnlJbmRleCIsInNldEhpc3RvcnlJbmRleCIsImJhY2tncm91bmRDb2xvciIsInNldEJhY2tncm91bmRDb2xvciIsImdyaWRDb2xvciIsInNldEdyaWRDb2xvciIsInNob3dDb2xvclBpY2tlciIsInNldFNob3dDb2xvclBpY2tlciIsImNvbG9yUGlja2VyVGFyZ2V0Iiwic2V0Q29sb3JQaWNrZXJUYXJnZXQiLCJlcmFzZUhvdmVyQnVpbGRpbmciLCJzZXRFcmFzZUhvdmVyQnVpbGRpbmciLCJkdW5nZW9uRGVmIiwiYnVpbGRpbmdzUmVmIiwiaGlzdG9yeVJlZiIsImhpc3RvcnlJbmRleFJlZiIsImN1cnJlbnQiLCJtYXAiLCJpIiwiaWQiLCJjZW50ZXJHeCIsImNlbnRlckd5IiwiY2VudGVyUCIsImdyaWRXIiwiZ3JpZEgiLCJiYXNlU2NhbGUiLCJnZXRGb290cHJpbnQiLCJ0eXBlIiwiZGVmIiwiZm9vdHByaW50IiwiaGFuZGxlU2F2ZSIsInNldFRpbWVvdXQiLCJoYW5kbGVSZXNldCIsInJlc2V0IiwicHVzaEhpc3RvcnkiLCJzbmFwc2hvdCIsInByZXYiLCJ0cmltbWVkIiwiaGFuZGxlVW5kbyIsIm5ld0lkeCIsImhhbmRsZVJlZG8iLCJsZW5ndGgiLCJoYW5kbGVDbGVhckFsbCIsImNvbmZpcm0iLCJnZXRDYW52YXNQb3MiLCJlIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJsZWZ0IiwiY2xpZW50WSIsInRvcCIsImdldEJ1aWxkaW5nQXQiLCJjeFAiLCJjeVAiLCJ0dyIsInRoIiwiaGl0QnVpbGRpbmciLCJmdyIsImZoIiwic29ydGVkIiwic29ydCIsImEiLCJkQSIsImZvb3RwcmludF93IiwiZm9vdHByaW50X2giLCJkQiIsImZpbmQiLCJpc1ZhbGlkUGxhY2VtZW50IiwiZXhjbHVkZUlkIiwiaGFuZGxlQ2FudmFzQ2xpY2siLCJwb3MiLCJoaXQiLCJmaWx0ZXIiLCJuZXdCIiwibGV2ZWwiLCJEYXRlIiwibm93IiwicmFuZG9tIiwiaGFuZGxlTW91c2VEb3duIiwiYnV0dG9uIiwib3giLCJveSIsImhhbmRsZU1vdXNlTW92ZSIsInNuYXBwZWRYIiwic25hcHBlZFkiLCJuZXdYIiwibmV3WSIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVXaGVlbCIsInByZXZlbnREZWZhdWx0IiwibXgiLCJteSIsImZhY3RvciIsImRlbHRhWSIsIm5ld1NjYWxlIiwicmF3T2ZmIiwiaGFuZGxlQ29sb3JQaWNrIiwiY29sb3IiLCJjYW52YXMiLCJjdHgiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJpbkZvcmVzdCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlUGF0aCIsImZpbGwiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsImRlcHRoQSIsImRlcHRoQiIsImNvbG9ycyIsImJnIiwiYm9yZGVyIiwiaXNTZWxlY3RlZCIsIndhbGxIIiwidGlsZUNlbnRlciIsInAiLCJjMDAiLCJjRlcwIiwiY0ZXSCIsImMwRkgiLCJnTlciLCJnTkUiLCJnU0UiLCJnU1ciLCJ0b3BDIiwibGVmdEMiLCJyaWdodEMiLCJjZW50ZXJYIiwiY2VudGVyWSIsImljb25TaXplIiwiZm9udCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxUZXh0IiwiaWNvbiIsImFyYyIsIlBJIiwidmFsaWQiLCJoY3giLCJoY3kiLCJnZ3giLCJnZ3kiLCJnbG9iYWxBbHBoYSIsInNldExpbmVEYXNoIiwic2VsZWN0ZWRCbGRnIiwiYmFja2dyb3VuZCIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwiYm9yZGVyQ29sb3IiLCJtaW5XaWR0aCIsIl9pZCIsIm5hbWUiLCJib3NzIiwibSIsImxhYmVsIiwicyIsInRvRml4ZWQiLCJjdXJzb3IiLCJib3JkZXJSYWRpdXMiLCJ0b3VjaEFjdGlvbiIsIl9fYXJySWR4X18iLCJsIiwiX2MyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkR1bmdlb25FZGl0b3IuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYLCBTYXZlLCBSb3RhdGVDY3csIFRyYXNoMiwgUGx1cywgTWludXMsIFVuZG8sIFJlZG8sIEVyYXNlciwgUGFsZXR0ZSB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IEJVSUxESU5HX0RFRlMsIEJVSUxESU5HX0NPTE9SUywgVElMRV9XLCBUSUxFX0gsIGdyaWRUb1NjcmVlbiB9IGZyb20gXCJAL2xpYi9nYW1lQ29uc3RhbnRzXCI7XG5pbXBvcnQgU3BlY3RydW1Db2xvclBpY2tlciBmcm9tIFwiLi9TcGVjdHJ1bUNvbG9yUGlja2VyXCI7XG5pbXBvcnQgeyBURVJSSVRPUllfREVGUywgVEVSUklUT1JZX0RVTkdFT05TIH0gZnJvbSBcIkAvbGliL2R1bmdlb25EYXRhXCI7XG5cbmNvbnN0IENBTlZBU19XID0gd2luZG93LmlubmVyV2lkdGg7XG5jb25zdCBDQU5WQVNfSCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IEdSSURfU0laRSA9IDkwO1xuY29uc3QgQ0FOVkFTX09GRlNFVF9YID0gOTAwO1xuY29uc3QgQ0FOVkFTX09GRlNFVF9ZID0gMzAwO1xuY29uc3QgRk9SRVNUX1JJTkcgPSAxMDtcblxuY29uc3QgTFNfS0VZID0gKHQsIGQpID0+IGBkdW5nZW9uX2xheW91dF90JHt0fV9kJHtkfWA7XG5cbmZ1bmN0aW9uIHNhdmVMYXlvdXQodGVycml0b3J5LCBkdW5nZW9uLCBidWlsZGluZ3MpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTFNfS0VZKHRlcnJpdG9yeSwgZHVuZ2VvbiksIEpTT04uc3RyaW5naWZ5KGJ1aWxkaW5ncykpO1xufVxuXG5mdW5jdGlvbiBsb2FkTGF5b3V0KHRlcnJpdG9yeSwgZHVuZ2Vvbikge1xuICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMU19LRVkodGVycml0b3J5LCBkdW5nZW9uKSk7XG4gIGlmIChyYXcpIHt0cnkge3JldHVybiBKU09OLnBhcnNlKHJhdyk7fSBjYXRjaCB7cmV0dXJuIG51bGw7fX1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREdW5nZW9uTGF5b3V0KHRlcnJpdG9yeSwgZHVuZ2Vvbikge1xuICByZXR1cm4gbG9hZExheW91dCh0ZXJyaXRvcnksIGR1bmdlb24pO1xufVxuXG5jb25zdCBQTEFDRUFCTEUgPSBbXG5cInRvd25faGFsbFwiLCBcImRlZmVuc2VfdG93ZXJcIiwgXCJ3YWxsXCIsIFwiZ29sZF9taW5lXCIsIFwibWFuYV9taW5lXCIsIFwiZ29sZF9taWxsXCIsIFwiYXJteV9jYW1wXCIsIFwiaGVyb19iYXNlXCIsIFwiYmFycmFja3NcIiwgXCJhcm1vcnlcIiwgXCJ3YXJlaG91c2VcIl07XG5cblxuLy8gSXNvbWV0cmljIGhlbHBlcnMgKHNhbWUgZm9ybXVsYSBhcyBJc29tZXRyaWNHcmlkKVxuZnVuY3Rpb24gZ3RzKGd4LCBneSkge1xuICByZXR1cm4gZ3JpZFRvU2NyZWVuKGd4LCBneSk7XG59XG5cbmZ1bmN0aW9uIHdvcmxkVG9DYW52YXMod3gsIHd5LCBzYywgb2ZmKSB7XG4gIHJldHVybiB7IGN4OiB3eCAqIHNjICsgQ0FOVkFTX09GRlNFVF9YICsgb2ZmLngsIGN5OiB3eSAqIHNjICsgQ0FOVkFTX09GRlNFVF9ZICsgb2ZmLnkgfTtcbn1cblxuZnVuY3Rpb24gY2FudmFzVG9Xb3JsZChjeCwgY3ksIHNjLCBvZmYpIHtcbiAgY29uc3Qgd3ggPSAoY3ggLSBDQU5WQVNfT0ZGU0VUX1ggLSBvZmYueCkgLyBzYztcbiAgY29uc3Qgd3kgPSAoY3kgLSBDQU5WQVNfT0ZGU0VUX1kgLSBvZmYueSkgLyBzYztcbiAgcmV0dXJuIHsgd3gsIHd5IH07XG59XG5cbmZ1bmN0aW9uIHNjcmVlblRvR3JpZCh3eCwgd3kpIHtcbiAgY29uc3QgZ3ggPSBNYXRoLnJvdW5kKCh3eCAvIChUSUxFX1cgLyAyKSArIHd5IC8gKFRJTEVfSCAvIDIpKSAvIDIpO1xuICBjb25zdCBneSA9IE1hdGgucm91bmQoKHd5IC8gKFRJTEVfSCAvIDIpIC0gd3ggLyAoVElMRV9XIC8gMikpIC8gMik7XG4gIHJldHVybiB7IGd4LCBneSB9O1xufVxuXG5mdW5jdGlvbiBzaGFkZUNvbG9yKGhleCwgYW1vdW50KSB7XG4gIHRyeSB7XG4gICAgbGV0IHIgPSBwYXJzZUludChoZXguc2xpY2UoMSwgMyksIDE2KSxnID0gcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNiksYiA9IHBhcnNlSW50KGhleC5zbGljZSg1LCA3KSwgMTYpO1xuICAgIHJldHVybiBgcmdiKCR7TWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByICsgYW1vdW50KSl9LCR7TWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBnICsgYW1vdW50KSl9LCR7TWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBiICsgYW1vdW50KSl9KWA7XG4gIH0gY2F0Y2gge3JldHVybiBoZXg7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEdW5nZW9uRWRpdG9yKHsgb25DbG9zZSB9KSB7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3RlcnJpdG9yeSwgc2V0VGVycml0b3J5XSA9IHVzZVN0YXRlKDApOyAvLyAwLWluZGV4ZWRcbiAgY29uc3QgW2R1bmdlb25JZHgsIHNldER1bmdlb25JZHhdID0gdXNlU3RhdGUoMCk7IC8vIDAtaW5kZXhlZFxuICBjb25zdCBbYnVpbGRpbmdzLCBzZXRCdWlsZGluZ3NdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VsZWN0ZWRUeXBlLCBzZXRTZWxlY3RlZFR5cGVdID0gdXNlU3RhdGUoXCJ3YWxsXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRMZXZlbCwgc2V0U2VsZWN0ZWRMZXZlbF0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2hvdmVyQ2VsbCwgc2V0SG92ZXJDZWxsXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRCdWlsZGluZ0lkLCBzZXRTZWxlY3RlZEJ1aWxkaW5nSWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzY2FsZSwgc2V0U2NhbGVdID0gdXNlU3RhdGUoMS4wKTtcbiAgY29uc3QgW29mZnNldCwgc2V0T2Zmc2V0XSA9IHVzZVN0YXRlKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW3NhdmVkLCBzZXRTYXZlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RlLCBzZXRNb2RlXSA9IHVzZVN0YXRlKFwicGxhY2VcIik7IC8vIFwicGxhY2VcIiB8IFwiZXJhc2VcIiB8IFwic2VsZWN0XCJcbiAgY29uc3QgW2RyYWdnaW5nLCBzZXREcmFnZ2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkcmFnU3RhcnQsIHNldERyYWdTdGFydF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW21vdmVCdWlsZGluZywgc2V0TW92ZUJ1aWxkaW5nXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZ2hvc3RQb3MsIHNldEdob3N0UG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtoaXN0b3J5SW5kZXgsIHNldEhpc3RvcnlJbmRleF0gPSB1c2VTdGF0ZSgtMSk7XG4gIGNvbnN0IFtiYWNrZ3JvdW5kQ29sb3IsIHNldEJhY2tncm91bmRDb2xvcl0gPSB1c2VTdGF0ZShcIiMxYTJmMWFcIik7XG4gIGNvbnN0IFtncmlkQ29sb3IsIHNldEdyaWRDb2xvcl0gPSB1c2VTdGF0ZShcIiMyZDVhMjdcIik7XG4gIGNvbnN0IFtzaG93Q29sb3JQaWNrZXIsIHNldFNob3dDb2xvclBpY2tlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb2xvclBpY2tlclRhcmdldCwgc2V0Q29sb3JQaWNrZXJUYXJnZXRdID0gdXNlU3RhdGUobnVsbCk7IC8vIFwiYmFja2dyb3VuZFwiIHwgXCJncmlkXCJcbiAgY29uc3QgW2VyYXNlSG92ZXJCdWlsZGluZywgc2V0RXJhc2VIb3ZlckJ1aWxkaW5nXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IGR1bmdlb25EZWYgPSBURVJSSVRPUllfRFVOR0VPTlNbdGVycml0b3J5XT8uW2R1bmdlb25JZHhdO1xuICBjb25zdCBidWlsZGluZ3NSZWYgPSB1c2VSZWYoYnVpbGRpbmdzKTtcbiAgY29uc3QgaGlzdG9yeVJlZiA9IHVzZVJlZihoaXN0b3J5KTtcbiAgY29uc3QgaGlzdG9yeUluZGV4UmVmID0gdXNlUmVmKGhpc3RvcnlJbmRleCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7YnVpbGRpbmdzUmVmLmN1cnJlbnQgPSBidWlsZGluZ3M7fSwgW2J1aWxkaW5nc10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge2hpc3RvcnlSZWYuY3VycmVudCA9IGhpc3Rvcnk7fSwgW2hpc3RvcnldKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtoaXN0b3J5SW5kZXhSZWYuY3VycmVudCA9IGhpc3RvcnlJbmRleDt9LCBbaGlzdG9yeUluZGV4XSk7XG5cbiAgLy8gTG9hZCBsYXlvdXQgd2hlbiB0ZXJyaXRvcnkvZHVuZ2VvbiBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2FkTGF5b3V0KHRlcnJpdG9yeSwgZHVuZ2VvbklkeCk7XG4gICAgaWYgKHNhdmVkKSB7XG4gICAgICBzZXRCdWlsZGluZ3Moc2F2ZWQpO1xuICAgIH0gZWxzZSBpZiAoZHVuZ2VvbkRlZj8uYnVpbGRpbmdzKSB7XG4gICAgICBzZXRCdWlsZGluZ3MoZHVuZ2VvbkRlZi5idWlsZGluZ3MubWFwKChiLCBpKSA9PiAoeyAuLi5iLCBpZDogYGRlZmF1bHRfJHtpfWAgfSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QnVpbGRpbmdzKFtdKTtcbiAgICB9XG4gICAgc2V0U2VsZWN0ZWRCdWlsZGluZ0lkKG51bGwpO1xuICAgIC8vIENlbnRlciB0aGUgZ3JpZCBvbiBsb2FkXG4gICAgY29uc3QgY2VudGVyR3ggPSBHUklEX1NJWkUgLyAyO1xuICAgIGNvbnN0IGNlbnRlckd5ID0gR1JJRF9TSVpFIC8gMjtcbiAgICBjb25zdCBjZW50ZXJQID0gZ3RzKGNlbnRlckd4LCBjZW50ZXJHeSk7XG4gICAgc2V0T2Zmc2V0KHtcbiAgICAgIHg6IENBTlZBU19XIC8gMiAtIChjZW50ZXJQLnggKiAxLjAgKyBDQU5WQVNfT0ZGU0VUX1gpLFxuICAgICAgeTogQ0FOVkFTX0ggLyAyIC0gKGNlbnRlclAueSAqIDEuMCArIENBTlZBU19PRkZTRVRfWSlcbiAgICB9KTtcbiAgICBzZXRTY2FsZSgxLjApO1xuICB9LCBbdGVycml0b3J5LCBkdW5nZW9uSWR4XSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBzY2FsZSAmIG9mZnNldCB0byBzaG93IHRoZSBmdWxsIGdyaWQgY2VudGVyZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBncmlkVyA9IEdSSURfU0laRSAqIFRJTEVfVztcbiAgICBjb25zdCBncmlkSCA9IEdSSURfU0laRSAqIFRJTEVfSDtcbiAgICBjb25zdCBiYXNlU2NhbGUgPSBNYXRoLm1pbihDQU5WQVNfVyAvIChncmlkVyAqIDEuMDgpLCBDQU5WQVNfSCAvIChncmlkSCAqIDEuMDgpKSAqIDEuMTU7XG4gICAgc2V0U2NhbGUoYmFzZVNjYWxlKTtcbiAgICBjb25zdCBjZW50ZXJQID0gZ3RzKEdSSURfU0laRSAvIDIsIEdSSURfU0laRSAvIDIpO1xuICAgIHNldE9mZnNldCh7XG4gICAgICB4OiBDQU5WQVNfVyAvIDIgLSAoY2VudGVyUC54ICogYmFzZVNjYWxlICsgQ0FOVkFTX09GRlNFVF9YKSxcbiAgICAgIHk6IENBTlZBU19IIC8gMiAtIChjZW50ZXJQLnkgKiBiYXNlU2NhbGUgKyBDQU5WQVNfT0ZGU0VUX1kpXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnZXRGb290cHJpbnQgPSAodHlwZSkgPT4ge1xuICAgIGNvbnN0IGRlZiA9IEJVSUxESU5HX0RFRlNbdHlwZV07XG4gICAgaWYgKCFkZWYpIHJldHVybiBbMSwgMV07XG4gICAgcmV0dXJuIGRlZi5mb290cHJpbnQgfHwgWzEsIDFdO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSAoKSA9PiB7XG4gICAgc2F2ZUxheW91dCh0ZXJyaXRvcnksIGR1bmdlb25JZHgsIGJ1aWxkaW5ncyk7XG4gICAgc2V0U2F2ZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTYXZlZChmYWxzZSksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIGlmICghZHVuZ2VvbkRlZj8uYnVpbGRpbmdzKSByZXR1cm47XG4gICAgY29uc3QgcmVzZXQgPSBkdW5nZW9uRGVmLmJ1aWxkaW5ncy5tYXAoKGIsIGkpID0+ICh7IC4uLmIsIGlkOiBgZGVmYXVsdF8ke2l9YCB9KSk7XG4gICAgc2V0QnVpbGRpbmdzKHJlc2V0KTtcbiAgICBwdXNoSGlzdG9yeSgpO1xuICAgIHNhdmVMYXlvdXQodGVycml0b3J5LCBkdW5nZW9uSWR4LCByZXNldCk7XG4gIH07XG5cbiAgY29uc3QgcHVzaEhpc3RvcnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc25hcHNob3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJ1aWxkaW5ncykpO1xuICAgIHNldEhpc3RvcnkoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IHRyaW1tZWQgPSBwcmV2LnNsaWNlKDAsIGhpc3RvcnlJbmRleFJlZi5jdXJyZW50ICsgMSk7XG4gICAgICByZXR1cm4gWy4uLnRyaW1tZWQsIHNuYXBzaG90XS5zbGljZSgtNTApO1xuICAgIH0pO1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4gTWF0aC5taW4ocHJldiArIDEsIDQ5KSk7XG4gIH0sIFtidWlsZGluZ3NdKTtcblxuICBjb25zdCBoYW5kbGVVbmRvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3SWR4ID0gTWF0aC5tYXgoMCwgcHJldiAtIDEpO1xuICAgICAgY29uc3Qgc25hcHNob3QgPSBoaXN0b3J5UmVmLmN1cnJlbnRbbmV3SWR4XTtcbiAgICAgIGlmIChzbmFwc2hvdCkgc2V0QnVpbGRpbmdzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc25hcHNob3QpKSk7XG4gICAgICByZXR1cm4gbmV3SWR4O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVkbyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIaXN0b3J5SW5kZXgoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld0lkeCA9IE1hdGgubWluKGhpc3RvcnlSZWYuY3VycmVudC5sZW5ndGggLSAxLCBwcmV2ICsgMSk7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IGhpc3RvcnlSZWYuY3VycmVudFtuZXdJZHhdO1xuICAgICAgaWYgKHNuYXBzaG90KSBzZXRCdWlsZGluZ3MoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzbmFwc2hvdCkpKTtcbiAgICAgIHJldHVybiBuZXdJZHg7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDbGVhckFsbCA9ICgpID0+IHtcbiAgICBpZiAoIWNvbmZpcm0oXCJDbGVhciBhbGwgYnVpbGRpbmdzIGZyb20gdGhpcyBkdW5nZW9uP1wiKSkgcmV0dXJuO1xuICAgIHNldEJ1aWxkaW5ncyhbXSk7XG4gICAgcHVzaEhpc3RvcnkoKTtcbiAgfTtcblxuICBjb25zdCBnZXRDYW52YXNQb3MgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXNSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0b3VjaCA9IGUudG91Y2hlcz8uWzBdIHx8IGU7XG4gICAgcmV0dXJuIHsgY3g6IHRvdWNoLmNsaWVudFggLSByZWN0LmxlZnQsIGN5OiB0b3VjaC5jbGllbnRZIC0gcmVjdC50b3AgfTtcbiAgfTtcblxuICBjb25zdCBnZXRCdWlsZGluZ0F0ID0gKGN4UCwgY3lQLCBzYywgb2ZmKSA9PiB7XG4gICAgY29uc3QgdHcgPSBUSUxFX1cgKiBzYztcbiAgICBjb25zdCB0aCA9IFRJTEVfSCAqIHNjO1xuICAgIGNvbnN0IHsgd3gsIHd5IH0gPSBjYW52YXNUb1dvcmxkKGN4UCwgY3lQLCBzYywgb2ZmKTtcbiAgICBjb25zdCB7IGd4LCBneSB9ID0gc2NyZWVuVG9HcmlkKHd4LCB3eSk7XG5cbiAgICBjb25zdCBoaXRCdWlsZGluZyA9IChiKSA9PiB7XG4gICAgICBjb25zdCBbZncsIGZoXSA9IGdldEZvb3RwcmludChiLnR5cGUpO1xuICAgICAgcmV0dXJuIGd4ID49IGIuZ3ggJiYgZ3ggPCBiLmd4ICsgZncgJiYgZ3kgPj0gYi5neSAmJiBneSA8IGIuZ3kgKyBmaDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc29ydGVkID0gWy4uLmJ1aWxkaW5nc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZEEgPSBhLmd4ICsgYS5mb290cHJpbnRfdyArIChhLmd5ICsgYS5mb290cHJpbnRfaCk7XG4gICAgICBjb25zdCBkQiA9IGIuZ3ggKyBiLmZvb3RwcmludF93ICsgKGIuZ3kgKyBiLmZvb3RwcmludF9oKTtcbiAgICAgIHJldHVybiBkQiAtIGRBO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3J0ZWQuZmluZCgoYikgPT4gaGl0QnVpbGRpbmcoYikpIHx8IG51bGw7XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBsYWNlbWVudCA9IChneCwgZ3ksIGZ3LCBmaCwgZXhjbHVkZUlkKSA9PiB7XG4gICAgaWYgKGd4IDwgRk9SRVNUX1JJTkcgfHwgZ3kgPCBGT1JFU1RfUklORyB8fCBneCArIGZ3ID4gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcgfHwgZ3kgKyBmaCA+IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChjb25zdCBiIG9mIGJ1aWxkaW5ncykge1xuICAgICAgaWYgKGIuaWQgPT09IGV4Y2x1ZGVJZCkgY29udGludWU7XG4gICAgICBpZiAoZ3ggPCBiLmd4ICsgYi5mb290cHJpbnRfdyAmJiBneCArIGZ3ID4gYi5neCAmJlxuICAgICAgZ3kgPCBiLmd5ICsgYi5mb290cHJpbnRfaCAmJiBneSArIGZoID4gYi5neSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDYW52YXNDbGljayA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XG4gICAgaWYgKG1vdmVCdWlsZGluZykge1xuICAgICAgY29uc3QgcG9zID0gZ2V0Q2FudmFzUG9zKGUpO1xuICAgICAgY29uc3QgeyB3eCwgd3kgfSA9IGNhbnZhc1RvV29ybGQocG9zLmN4LCBwb3MuY3ksIHNjYWxlLCBvZmZzZXQpO1xuICAgICAgY29uc3QgeyBneCwgZ3kgfSA9IHNjcmVlblRvR3JpZCh3eCwgd3kpO1xuICAgICAgY29uc3QgW2Z3LCBmaF0gPSBnZXRGb290cHJpbnQobW92ZUJ1aWxkaW5nLnR5cGUpO1xuICAgICAgaWYgKGlzVmFsaWRQbGFjZW1lbnQoZ3gsIGd5LCBmdywgZmgsIG1vdmVCdWlsZGluZy5pZCkpIHtcbiAgICAgICAgc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBwcmV2Lm1hcCgoYikgPT4gYi5pZCA9PT0gbW92ZUJ1aWxkaW5nLmlkID8geyAuLi5iLCBneCwgZ3kgfSA6IGIpKTtcbiAgICAgICAgcHVzaEhpc3RvcnkoKTtcbiAgICAgIH1cbiAgICAgIHNldE1vdmVCdWlsZGluZyhudWxsKTtcbiAgICAgIHNldEdob3N0UG9zKG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBvcyA9IGdldENhbnZhc1BvcyhlKTtcbiAgICBjb25zdCB7IHd4LCB3eSB9ID0gY2FudmFzVG9Xb3JsZChwb3MuY3gsIHBvcy5jeSwgc2NhbGUsIG9mZnNldCk7XG4gICAgY29uc3QgeyBneCwgZ3kgfSA9IHNjcmVlblRvR3JpZCh3eCwgd3kpO1xuXG4gICAgaWYgKG1vZGUgPT09IFwiZXJhc2VcIikge1xuICAgICAgY29uc3QgaGl0ID0gZ2V0QnVpbGRpbmdBdChwb3MuY3gsIHBvcy5jeSwgc2NhbGUsIG9mZnNldCk7XG4gICAgICBpZiAoaGl0KSB7XG4gICAgICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5maWx0ZXIoKGIpID0+IGIuaWQgIT09IGhpdC5pZCkpO1xuICAgICAgICBwdXNoSGlzdG9yeSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtb2RlID09PSBcInNlbGVjdFwiKSB7XG4gICAgICBjb25zdCBoaXQgPSBnZXRCdWlsZGluZ0F0KHBvcy5jeCwgcG9zLmN5LCBzY2FsZSwgb2Zmc2V0KTtcbiAgICAgIHNldFNlbGVjdGVkQnVpbGRpbmdJZChoaXQ/LmlkIHx8IG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHBsYWNlIG1vZGVcbiAgICBpZiAoZ3ggPCBGT1JFU1RfUklORyB8fCBneSA8IEZPUkVTVF9SSU5HIHx8IGd4ID49IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HIHx8IGd5ID49IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HKSByZXR1cm47XG4gICAgY29uc3QgW2Z3LCBmaF0gPSBnZXRGb290cHJpbnQoc2VsZWN0ZWRUeXBlKTtcbiAgICBpZiAoIWlzVmFsaWRQbGFjZW1lbnQoZ3gsIGd5LCBmdywgZmgsIG51bGwpKSByZXR1cm47XG4gICAgY29uc3QgZGVmID0gQlVJTERJTkdfREVGU1tzZWxlY3RlZFR5cGVdO1xuICAgIGNvbnN0IG5ld0IgPSB7XG4gICAgICB0eXBlOiBzZWxlY3RlZFR5cGUsXG4gICAgICBsZXZlbDogc2VsZWN0ZWRMZXZlbCxcbiAgICAgIGd4LFxuICAgICAgZ3ksXG4gICAgICBpZDogYGJfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCl9YCxcbiAgICAgIGZvb3RwcmludF93OiBkZWYuZm9vdHByaW50Py5bMF0gfHwgMixcbiAgICAgIGZvb3RwcmludF9oOiBkZWYuZm9vdHByaW50Py5bMV0gfHwgMlxuICAgIH07XG4gICAgc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBbLi4ucHJldiwgbmV3Ql0pO1xuICAgIHB1c2hIaXN0b3J5KCk7XG4gIH0sIFttb2RlLCBzZWxlY3RlZFR5cGUsIHNlbGVjdGVkTGV2ZWwsIHNjYWxlLCBvZmZzZXQsIG1vdmVCdWlsZGluZywgYnVpbGRpbmdzLCBwdXNoSGlzdG9yeV0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgY29uc3QgcG9zID0gZ2V0Q2FudmFzUG9zKGUpO1xuICAgIHNldERyYWdnaW5nKHRydWUpO1xuICAgIHNldERyYWdTdGFydCh7IC4uLnBvcywgb3g6IG9mZnNldC54LCBveTogb2Zmc2V0LnkgfSk7XG5cbiAgICAvLyBDaGVjayBpZiBjbGlja2luZyBvbiBhIGJ1aWxkaW5nIGluIHNlbGVjdCBtb2RlXG4gICAgaWYgKG1vZGUgPT09IFwic2VsZWN0XCIpIHtcbiAgICAgIGNvbnN0IGhpdCA9IGdldEJ1aWxkaW5nQXQocG9zLmN4LCBwb3MuY3ksIHNjYWxlLCBvZmZzZXQpO1xuICAgICAgaWYgKGhpdCkge1xuICAgICAgICBzZXRNb3ZlQnVpbGRpbmcoaGl0KTtcbiAgICAgICAgc2V0R2hvc3RQb3MoeyBneDogaGl0Lmd4LCBneTogaGl0Lmd5IH0pO1xuICAgICAgICBzZXRTZWxlY3RlZEJ1aWxkaW5nSWQoaGl0LmlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFcmFzZSBvbiBjbGljayBpbiBlcmFzZSBtb2RlXG4gICAgaWYgKG1vZGUgPT09IFwiZXJhc2VcIikge1xuICAgICAgY29uc3QgaGl0ID0gZ2V0QnVpbGRpbmdBdChwb3MuY3gsIHBvcy5jeSwgc2NhbGUsIG9mZnNldCk7XG4gICAgICBpZiAoaGl0KSB7XG4gICAgICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5maWx0ZXIoKGIpID0+IGIuaWQgIT09IGhpdC5pZCkpO1xuICAgICAgICBwdXNoSGlzdG9yeSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW21vZGUsIHNjYWxlLCBvZmZzZXQsIGJ1aWxkaW5ncywgcHVzaEhpc3RvcnldKTtcblxuICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGdldENhbnZhc1BvcyhlKTtcblxuICAgIGlmIChtb3ZlQnVpbGRpbmcpIHtcbiAgICAgIGNvbnN0IHsgd3gsIHd5IH0gPSBjYW52YXNUb1dvcmxkKHBvcy5jeCwgcG9zLmN5LCBzY2FsZSwgb2Zmc2V0KTtcbiAgICAgIGNvbnN0IHsgZ3gsIGd5IH0gPSBzY3JlZW5Ub0dyaWQod3gsIHd5KTtcbiAgICAgIGNvbnN0IFtmdywgZmhdID0gZ2V0Rm9vdHByaW50KG1vdmVCdWlsZGluZy50eXBlKTtcbiAgICAgIGNvbnN0IHNuYXBwZWRYID0gTWF0aC5tYXgoRk9SRVNUX1JJTkcsIE1hdGgubWluKGd4LCBHUklEX1NJWkUgLSBGT1JFU1RfUklORyAtIGZ3KSk7XG4gICAgICBjb25zdCBzbmFwcGVkWSA9IE1hdGgubWF4KEZPUkVTVF9SSU5HLCBNYXRoLm1pbihneSwgR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcgLSBmaCkpO1xuICAgICAgc2V0R2hvc3RQb3MoeyBneDogc25hcHBlZFgsIGd5OiBzbmFwcGVkWSB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZHJhZ2dpbmcgJiYgZHJhZ1N0YXJ0KSB7XG4gICAgICBjb25zdCBuZXdYID0gZHJhZ1N0YXJ0Lm94ICsgcG9zLmN4IC0gZHJhZ1N0YXJ0LmN4O1xuICAgICAgY29uc3QgbmV3WSA9IGRyYWdTdGFydC5veSArIHBvcy5jeSAtIGRyYWdTdGFydC5jeTtcbiAgICAgIHNldE9mZnNldCh7IHg6IG5ld1gsIHk6IG5ld1kgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyB3eCwgd3kgfSA9IGNhbnZhc1RvV29ybGQocG9zLmN4LCBwb3MuY3ksIHNjYWxlLCBvZmZzZXQpO1xuICAgIGNvbnN0IHsgZ3gsIGd5IH0gPSBzY3JlZW5Ub0dyaWQod3gsIHd5KTtcbiAgICBzZXRIb3ZlckNlbGwoeyBneCwgZ3kgfSk7XG5cbiAgICAvLyBUcmFjayBob3ZlciBidWlsZGluZyBmb3IgZXJhc2UgbW9kZVxuICAgIGlmIChtb2RlID09PSBcImVyYXNlXCIpIHtcbiAgICAgIGNvbnN0IGhpdCA9IGdldEJ1aWxkaW5nQXQocG9zLmN4LCBwb3MuY3ksIHNjYWxlLCBvZmZzZXQpO1xuICAgICAgc2V0RXJhc2VIb3ZlckJ1aWxkaW5nKGhpdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVyYXNlSG92ZXJCdWlsZGluZyhudWxsKTtcbiAgICB9XG4gIH0sIFtzY2FsZSwgb2Zmc2V0LCBkcmFnZ2luZywgZHJhZ1N0YXJ0LCBtb3ZlQnVpbGRpbmcsIG1vZGVdKTtcblxuICBjb25zdCBoYW5kbGVNb3VzZVVwID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICBzZXREcmFnU3RhcnQobnVsbCk7XG4gICAgaWYgKCFtb3ZlQnVpbGRpbmcpIHtcbiAgICAgIHNldE1vdmVCdWlsZGluZyhudWxsKTtcbiAgICAgIHNldEdob3N0UG9zKG51bGwpO1xuICAgIH1cbiAgfSwgW21vdmVCdWlsZGluZ10pO1xuXG4gIGNvbnN0IGhhbmRsZVdoZWVsID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcmVjdCA9IGNhbnZhc1JlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IG15ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgICBjb25zdCBmYWN0b3IgPSBlLmRlbHRhWSA8IDAgPyAxLjEgOiAwLjk7XG4gICAgY29uc3QgbmV3U2NhbGUgPSBNYXRoLm1heCgwLjMsIE1hdGgubWluKHNjYWxlICogZmFjdG9yLCA1KSk7XG5cbiAgICBjb25zdCByYXdPZmYgPSB7XG4gICAgICB4OiBteCAtIChteCAtIG9mZnNldC54KSAqIChuZXdTY2FsZSAvIHNjYWxlKSxcbiAgICAgIHk6IG15IC0gKG15IC0gb2Zmc2V0LnkpICogKG5ld1NjYWxlIC8gc2NhbGUpXG4gICAgfTtcblxuICAgIHNldFNjYWxlKG5ld1NjYWxlKTtcbiAgICBzZXRPZmZzZXQocmF3T2ZmKTtcbiAgfSwgW3NjYWxlLCBvZmZzZXRdKTtcblxuICBjb25zdCBoYW5kbGVDb2xvclBpY2sgPSAoY29sb3IpID0+IHtcbiAgICBpZiAoY29sb3JQaWNrZXJUYXJnZXQgPT09IFwiYmFja2dyb3VuZFwiKSBzZXRCYWNrZ3JvdW5kQ29sb3IoY29sb3IpO1xuICAgIGlmIChjb2xvclBpY2tlclRhcmdldCA9PT0gXCJncmlkXCIpIHNldEdyaWRDb2xvcihjb2xvcik7XG4gICAgc2V0U2hvd0NvbG9yUGlja2VyKGZhbHNlKTtcbiAgfTtcblxuICAvLyBEcmF3XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1csIENBTlZBU19IKTtcblxuICAgIGNvbnN0IHR3ID0gVElMRV9XICogc2NhbGU7XG4gICAgY29uc3QgdGggPSBUSUxFX0ggKiBzY2FsZTtcblxuICAgIC8vIEJhY2tncm91bmRcbiAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBDQU5WQVNfVywgQ0FOVkFTX0gpO1xuXG4gICAgLy8gRHJhdyBncmlkIHRpbGVzXG4gICAgZm9yIChsZXQgZ3kgPSAwOyBneSA8IEdSSURfU0laRTsgZ3krKykge1xuICAgICAgZm9yIChsZXQgZ3ggPSAwOyBneCA8IEdSSURfU0laRTsgZ3grKykge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGd0cyhneCwgZ3kpO1xuICAgICAgICBjb25zdCB7IGN4LCBjeSB9ID0gd29ybGRUb0NhbnZhcyh4LCB5LCBzY2FsZSwgb2Zmc2V0KTtcbiAgICAgICAgaWYgKGN4IDwgLXR3IHx8IGN4ID4gQ0FOVkFTX1cgKyB0dyB8fCBjeSA8IC10aCB8fCBjeSA+IENBTlZBU19IICsgdGgpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGluRm9yZXN0ID0gZ3ggPCBGT1JFU1RfUklORyB8fCBneSA8IEZPUkVTVF9SSU5HIHx8IGd4ID49IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HIHx8IGd5ID49IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3gsIGN5IC0gdGggLyAyKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHR3IC8gMiwgY3kpO1xuICAgICAgICBjdHgubGluZVRvKGN4LCBjeSArIHRoIC8gMik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSB0dyAvIDIsIGN5KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gaW5Gb3Jlc3QgPyBzaGFkZUNvbG9yKGdyaWRDb2xvciwgLTIwKSA6IChneCArIGd5KSAlIDIgPT09IDAgPyBncmlkQ29sb3IgOiBzaGFkZUNvbG9yKGdyaWRDb2xvciwgLTEwKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYgKCFpbkZvcmVzdCkge2N0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjE1KVwiO2N0eC5saW5lV2lkdGggPSAwLjM7Y3R4LnN0cm9rZSgpO31cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmF3IGJ1aWxkaW5ncyBzb3J0ZWQgYnkgZGVwdGhcbiAgICBjb25zdCBzb3J0ZWQgPSBbLi4uYnVpbGRpbmdzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkZXB0aEEgPSBhLmd4ICsgYS5mb290cHJpbnRfdyArIChhLmd5ICsgYS5mb290cHJpbnRfaCk7XG4gICAgICBjb25zdCBkZXB0aEIgPSBiLmd4ICsgYi5mb290cHJpbnRfdyArIChiLmd5ICsgYi5mb290cHJpbnRfaCk7XG4gICAgICByZXR1cm4gZGVwdGhBIC0gZGVwdGhCO1xuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCBiIG9mIHNvcnRlZCkge1xuICAgICAgY29uc3QgZGVmID0gQlVJTERJTkdfREVGU1tiLnR5cGVdO1xuICAgICAgY29uc3QgY29sb3JzID0gQlVJTERJTkdfQ09MT1JTW2IudHlwZV0gfHwgeyBiZzogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIjNGE0YTZlXCIgfTtcbiAgICAgIGNvbnN0IGZ3ID0gYi5mb290cHJpbnRfdyB8fCAyO1xuICAgICAgY29uc3QgZmggPSBiLmZvb3RwcmludF9oIHx8IDI7XG4gICAgICBjb25zdCBpc1NlbGVjdGVkID0gYi5pZCA9PT0gc2VsZWN0ZWRCdWlsZGluZ0lkO1xuICAgICAgY29uc3Qgd2FsbEggPSB0aCAqIChiLnR5cGUgPT09IFwidG93bl9oYWxsXCIgPyAzLjEgOiAyLjA4KTtcblxuICAgICAgY29uc3QgdGlsZUNlbnRlciA9IChneCwgZ3kpID0+IHtcbiAgICAgICAgY29uc3QgcCA9IGd0cyhneCwgZ3kpO1xuICAgICAgICByZXR1cm4gd29ybGRUb0NhbnZhcyhwLngsIHAueSwgc2NhbGUsIG9mZnNldCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjMDAgPSB0aWxlQ2VudGVyKGIuZ3gsIGIuZ3kpO1xuICAgICAgY29uc3QgY0ZXMCA9IHRpbGVDZW50ZXIoYi5neCArIGZ3IC0gMSwgYi5neSk7XG4gICAgICBjb25zdCBjRldIID0gdGlsZUNlbnRlcihiLmd4ICsgZncgLSAxLCBiLmd5ICsgZmggLSAxKTtcbiAgICAgIGNvbnN0IGMwRkggPSB0aWxlQ2VudGVyKGIuZ3gsIGIuZ3kgKyBmaCAtIDEpO1xuXG4gICAgICBjb25zdCBnTlcgPSB7IGN4OiBjMDAuY3gsIGN5OiBjMDAuY3kgLSB0aCAvIDIgfTtcbiAgICAgIGNvbnN0IGdORSA9IHsgY3g6IGNGVzAuY3ggKyB0dyAvIDIsIGN5OiBjRlcwLmN5IH07XG4gICAgICBjb25zdCBnU0UgPSB7IGN4OiBjRldILmN4LCBjeTogY0ZXSC5jeSArIHRoIC8gMiB9O1xuICAgICAgY29uc3QgZ1NXID0geyBjeDogYzBGSC5jeCAtIHR3IC8gMiwgY3k6IGMwRkguY3kgfTtcblxuICAgICAgY29uc3QgdG9wQyA9IGNvbG9ycy5iZztcbiAgICAgIGNvbnN0IGxlZnRDID0gc2hhZGVDb2xvcih0b3BDLCAtNTUpO1xuICAgICAgY29uc3QgcmlnaHRDID0gc2hhZGVDb2xvcih0b3BDLCAtMzApO1xuXG4gICAgICAvLyBHcm91bmRcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ05XLmN4LCBnTlcuY3kpO2N0eC5saW5lVG8oZ05FLmN4LCBnTkUuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSk7Y3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7Y3R4LmZpbGxTdHlsZSA9IHNoYWRlQ29sb3IodG9wQywgLTgwKTtjdHguZmlsbCgpO1xuXG4gICAgICAvLyBMZWZ0IGZhY2VcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ1NXLmN4LCBnU1cuY3kpO2N0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSAtIHdhbGxIKTtjdHgubGluZVRvKGdTVy5jeCwgZ1NXLmN5IC0gd2FsbEgpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO2N0eC5maWxsU3R5bGUgPSBsZWZ0QztjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNTZWxlY3RlZCA/IFwiI2ZiYmYyNFwiIDogbGVmdEM7Y3R4LmxpbmVXaWR0aCA9IDAuNTtjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFJpZ2h0IGZhY2VcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ05FLmN4LCBnTkUuY3kpO2N0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSAtIHdhbGxIKTtjdHgubGluZVRvKGdORS5jeCwgZ05FLmN5IC0gd2FsbEgpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO2N0eC5maWxsU3R5bGUgPSByaWdodEM7Y3R4LmZpbGwoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzU2VsZWN0ZWQgPyBcIiNmYmJmMjRcIiA6IHJpZ2h0QztjdHgubGluZVdpZHRoID0gMC41O2N0eC5zdHJva2UoKTtcblxuICAgICAgLy8gVG9wIGZhY2VcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ05XLmN4LCBnTlcuY3kgLSB3YWxsSCk7Y3R4LmxpbmVUbyhnTkUuY3gsIGdORS5jeSAtIHdhbGxIKTtcbiAgICAgIGN0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kgLSB3YWxsSCk7Y3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSAtIHdhbGxIKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtjdHguZmlsbFN0eWxlID0gdG9wQztjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNTZWxlY3RlZCA/IFwiI2ZiYmYyNFwiIDogdG9wQztcbiAgICAgIGN0eC5saW5lV2lkdGggPSBpc1NlbGVjdGVkID8gMiA6IDE7Y3R4LnN0cm9rZSgpO1xuXG4gICAgICAvLyBJY29uXG4gICAgICBjb25zdCBjZW50ZXJYID0gKGdOVy5jeCArIGdTRS5jeCkgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9IChnTlcuY3kgKyBnU0UuY3kpIC8gMiAtIHdhbGxIO1xuICAgICAgY29uc3QgaWNvblNpemUgPSBNYXRoLm1heCg2LCBNYXRoLm1pbihmdyAqIHR3ICogMC4yMiwgMTQgKiBzY2FsZSkpO1xuICAgICAgY3R4LmZvbnQgPSBgJHtpY29uU2l6ZX1weCBzZXJpZmA7XG4gICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgICAgY3R4LmZpbGxUZXh0KGRlZj8uaWNvbiB8fCBcIj9cIiwgY2VudGVyWCwgY2VudGVyWSk7XG5cbiAgICAgIC8vIExldmVsIGJhZGdlXG4gICAgICBpZiAoYi5sZXZlbCA+IDEpIHtcbiAgICAgICAgY29uc3QgciA9IDUgKiBzY2FsZTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzBkMGQxYVwiO2N0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhnTkUuY3gsIGdORS5jeSAtIHdhbGxIIC0gciwgciwgMCwgTWF0aC5QSSAqIDIpO2N0eC5maWxsKCk7XG4gICAgICAgIGN0eC5mb250ID0gYGJvbGQgJHtNYXRoLm1heCg0LCA1ICogc2NhbGUpfXB4IHNhbnMtc2VyaWZgO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmJiZjI0XCI7XG4gICAgICAgIGN0eC5maWxsVGV4dChiLmxldmVsLCBnTkUuY3gsIGdORS5jeSAtIHdhbGxIIC0gcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2hvc3QgZm9yIG1vdmluZyBidWlsZGluZ1xuICAgIGlmIChtb3ZlQnVpbGRpbmcgJiYgZ2hvc3RQb3MpIHtcbiAgICAgIGNvbnN0IHsgZ3gsIGd5IH0gPSBnaG9zdFBvcztcbiAgICAgIGNvbnN0IFtmdywgZmhdID0gZ2V0Rm9vdHByaW50KG1vdmVCdWlsZGluZy50eXBlKTtcbiAgICAgIGNvbnN0IHZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChneCwgZ3ksIGZ3LCBmaCwgbW92ZUJ1aWxkaW5nLmlkKTtcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZ3RzKGd4LCBneSk7XG4gICAgICBjb25zdCB7IGN4OiBoY3gsIGN5OiBoY3kgfSA9IHdvcmxkVG9DYW52YXMoeCwgeSwgc2NhbGUsIG9mZnNldCk7XG4gICAgICBjb25zdCB3YWxsSCA9IHRoICogKG1vdmVCdWlsZGluZy50eXBlID09PSBcInRvd25faGFsbFwiID8gMy4xIDogMi4wOCk7XG5cbiAgICAgIGNvbnN0IHRpbGVDZW50ZXIgPSAoZ2d4LCBnZ3kpID0+IHtcbiAgICAgICAgY29uc3QgcCA9IGd0cyhnZ3gsIGdneSk7XG4gICAgICAgIHJldHVybiB3b3JsZFRvQ2FudmFzKHAueCwgcC55LCBzY2FsZSwgb2Zmc2V0KTtcbiAgICAgIH07XG4gICAgICBjb25zdCBjMDAgPSB0aWxlQ2VudGVyKGd4LCBneSk7XG4gICAgICBjb25zdCBjRlcwID0gdGlsZUNlbnRlcihneCArIGZ3IC0gMSwgZ3kpO1xuICAgICAgY29uc3QgY0ZXSCA9IHRpbGVDZW50ZXIoZ3ggKyBmdyAtIDEsIGd5ICsgZmggLSAxKTtcbiAgICAgIGNvbnN0IGMwRkggPSB0aWxlQ2VudGVyKGd4LCBneSArIGZoIC0gMSk7XG4gICAgICBjb25zdCBnTlcgPSB7IGN4OiBjMDAuY3gsIGN5OiBjMDAuY3kgLSB0aCAvIDIgfTtcbiAgICAgIGNvbnN0IGdORSA9IHsgY3g6IGNGVzAuY3ggKyB0dyAvIDIsIGN5OiBjRlcwLmN5IH07XG4gICAgICBjb25zdCBnU0UgPSB7IGN4OiBjRldILmN4LCBjeTogY0ZXSC5jeSArIHRoIC8gMiB9O1xuICAgICAgY29uc3QgZ1NXID0geyBjeDogYzBGSC5jeCAtIHR3IC8gMiwgY3k6IGMwRkguY3kgfTtcblxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhnTlcuY3gsIGdOVy5jeSk7Y3R4LmxpbmVUbyhnTkUuY3gsIGdORS5jeSk7XG4gICAgICBjdHgubGluZVRvKGdTRS5jeCwgZ1NFLmN5KTtjdHgubGluZVRvKGdTVy5jeCwgZ1NXLmN5KTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB2YWxpZCA/IFwicmdiYSg3NCwyMjIsMTI4LDAuMylcIiA6IFwicmdiYSgyMzksNjgsNjgsMC4zKVwiO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdmFsaWQgPyBcIiM0YWRlODBcIiA6IFwiI2VmNDQ0NFwiO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICBjdHguc2V0TGluZURhc2goWzQsIDNdKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMS4wO1xuICAgIH1cblxuICAgIC8vIEhvdmVyIGdob3N0IGZvciBwbGFjZW1lbnRcbiAgICBpZiAoaG92ZXJDZWxsICYmIG1vZGUgPT09IFwicGxhY2VcIiAmJiAhbW92ZUJ1aWxkaW5nKSB7XG4gICAgICBjb25zdCB7IGd4LCBneSB9ID0gaG92ZXJDZWxsO1xuICAgICAgY29uc3QgW2Z3LCBmaF0gPSBnZXRGb290cHJpbnQoc2VsZWN0ZWRUeXBlKTtcbiAgICAgIGlmIChneCA+PSBGT1JFU1RfUklORyAmJiBneSA+PSBGT1JFU1RfUklORyAmJiBneCA8IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HICYmIGd5IDwgR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBndHMoZ3gsIGd5KTtcbiAgICAgICAgY29uc3QgeyBjeDogaGN4LCBjeTogaGN5IH0gPSB3b3JsZFRvQ2FudmFzKHgsIHksIHNjYWxlLCBvZmZzZXQpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oaGN4LCBoY3kgLSB0aCAvIDIpO2N0eC5saW5lVG8oaGN4ICsgdHcgLyAyLCBoY3kpO1xuICAgICAgICBjdHgubGluZVRvKGhjeCwgaGN5ICsgdGggLyAyKTtjdHgubGluZVRvKGhjeCAtIHR3IC8gMiwgaGN5KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDI1MSwxOTEsMzYsMC4yNSlcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmJiZjI0XCI7Y3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5maWxsKCk7Y3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhpZ2hsaWdodCBob3ZlciBidWlsZGluZyBpbiBlcmFzZSBtb2RlXG4gICAgaWYgKGVyYXNlSG92ZXJCdWlsZGluZyAmJiBtb2RlID09PSBcImVyYXNlXCIpIHtcbiAgICAgIGNvbnN0IGIgPSBlcmFzZUhvdmVyQnVpbGRpbmc7XG4gICAgICBjb25zdCBmdyA9IGIuZm9vdHByaW50X3cgfHwgMjtcbiAgICAgIGNvbnN0IGZoID0gYi5mb290cHJpbnRfaCB8fCAyO1xuICAgICAgY29uc3Qgd2FsbEggPSB0aCAqIChiLnR5cGUgPT09IFwidG93bl9oYWxsXCIgPyAzLjEgOiAyLjA4KTtcblxuICAgICAgY29uc3QgdGlsZUNlbnRlciA9IChnZ3gsIGdneSkgPT4ge1xuICAgICAgICBjb25zdCBwID0gZ3RzKGdneCwgZ2d5KTtcbiAgICAgICAgcmV0dXJuIHdvcmxkVG9DYW52YXMocC54LCBwLnksIHNjYWxlLCBvZmZzZXQpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGMwMCA9IHRpbGVDZW50ZXIoYi5neCwgYi5neSk7XG4gICAgICBjb25zdCBjRlcwID0gdGlsZUNlbnRlcihiLmd4ICsgZncgLSAxLCBiLmd5KTtcbiAgICAgIGNvbnN0IGNGV0ggPSB0aWxlQ2VudGVyKGIuZ3ggKyBmdyAtIDEsIGIuZ3kgKyBmaCAtIDEpO1xuICAgICAgY29uc3QgYzBGSCA9IHRpbGVDZW50ZXIoYi5neCwgYi5neSArIGZoIC0gMSk7XG4gICAgICBjb25zdCBnTlcgPSB7IGN4OiBjMDAuY3gsIGN5OiBjMDAuY3kgLSB0aCAvIDIgfTtcbiAgICAgIGNvbnN0IGdORSA9IHsgY3g6IGNGVzAuY3ggKyB0dyAvIDIsIGN5OiBjRlcwLmN5IH07XG4gICAgICBjb25zdCBnU0UgPSB7IGN4OiBjRldILmN4LCBjeTogY0ZXSC5jeSArIHRoIC8gMiB9O1xuICAgICAgY29uc3QgZ1NXID0geyBjeDogYzBGSC5jeCAtIHR3IC8gMiwgY3k6IGMwRkguY3kgfTtcblxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC43O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhnTlcuY3gsIGdOVy5jeSk7Y3R4LmxpbmVUbyhnTkUuY3gsIGdORS5jeSk7XG4gICAgICBjdHgubGluZVRvKGdTRS5jeCwgZ1NFLmN5KTtjdHgubGluZVRvKGdTVy5jeCwgZ1NXLmN5KTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjM5LDY4LDY4LDAuNClcIjtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2VmNDQ0NFwiO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICBjdHguc2V0TGluZURhc2goWzQsIDNdKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMS4wO1xuICAgIH1cbiAgfSwgW2J1aWxkaW5ncywgaG92ZXJDZWxsLCBzY2FsZSwgbW9kZSwgc2VsZWN0ZWRCdWlsZGluZ0lkLCBvZmZzZXQsIG1vdmVCdWlsZGluZywgZ2hvc3RQb3MsIGJhY2tncm91bmRDb2xvciwgZ3JpZENvbG9yLCBlcmFzZUhvdmVyQnVpbGRpbmcsIHB1c2hIaXN0b3J5XSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRCbGRnID0gYnVpbGRpbmdzLmZpbmQoKGIpID0+IGIuaWQgPT09IHNlbGVjdGVkQnVpbGRpbmdJZCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTcwOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotWzEwMF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODBcIj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1NzE6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNkYzI2MjZcIiwgbWF4SGVpZ2h0OiBcIjk4dmhcIiwgbWF4V2lkdGg6IFwiOTh2d1wiIH19PlxuICAgICAgICB7LyogVGl0bGUgYmFyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTczOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS0yIGJvcmRlci1iXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQ0ZVwiLCBiYWNrZ3JvdW5kOiBcIiMxMzEzMmFcIiB9fT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTc0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTc1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LXJlZC00MDBcIj7impTvuI8gRFVOR0VPTiBFRElUT1Ig4oCUIERFViBNT0RFPC9zcGFuPlxuICAgICAgICAgICAge3NhdmVkICYmIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTc2OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LWdyZWVuLTQwMCBhbmltYXRlLXB1bHNlXCI+4pyTIFNhdmVkITwvc3Bhbj59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjU3ODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTc5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlVW5kb30gZGlzYWJsZWQ9e2hpc3RvcnlJbmRleCA8PSAwfSB0aXRsZT1cIlVuZG8gKENtZCtaKVwiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGRpc2FibGVkOm9wYWNpdHktMzBcIj5cbiAgICAgICAgICAgICAgPFVuZG8gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1ODA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1ODI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVSZWRvfSBkaXNhYmxlZD17aGlzdG9yeUluZGV4ID49IGhpc3RvcnkubGVuZ3RoIC0gMX0gdGl0bGU9XCJSZWRvIChDbWQrU2hpZnQrWilcIiBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCBkaXNhYmxlZDpvcGFjaXR5LTMwXCI+XG4gICAgICAgICAgICAgIDxSZWRvIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTgzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTg1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge3NldENvbG9yUGlja2VyVGFyZ2V0KFwiYmFja2dyb3VuZFwiKTtzZXRTaG93Q29sb3JQaWNrZXIodHJ1ZSk7fX0gdGl0bGU9XCJCYWNrZ3JvdW5kIENvbG9yXCIgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPFBhbGV0dGUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1ODY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1ODg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVDbGVhckFsbH0gdGl0bGU9XCJDbGVhciBBbGwgQnVpbGRpbmdzXCIgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtcmVkLTMwMCBob3ZlcjpiZy1yZWQtOTAwLzMwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjZGMyNjI2XCIgfX0+XG4gICAgICAgICAgICAgIDxUcmFzaDIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1ODk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTF9IGNsYXNzTmFtZT1cImlubGluZSBtci0xXCIgLz5DTEVBUlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NTkxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlUmVzZXR9IHRpdGxlPVwiUmVzZXQgdG8gZGVmYXVsdCBsYXlvdXRcIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1vcmFuZ2UtMzAwIGhvdmVyOmJnLW9yYW5nZS05MDAvMzBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICNjMjQxMGNcIiB9fT5cbiAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjU5MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMX0gY2xhc3NOYW1lPVwiaW5saW5lIG1yLTFcIiAvPlJFU0VUXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1OTQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVTYXZlfSBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzE2YTM0YVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YWRlODBcIiB9fT5cbiAgICAgICAgICAgICAgPFNhdmUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1OTU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTF9IGNsYXNzTmFtZT1cImlubGluZSBtci0xXCIgLz5TQVZFXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1OTc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+PFggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo1OTc6MTEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjAxOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtMSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICB7LyogTGVmdCBzaWRlYmFyICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2MDM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0zIHAtMyBib3JkZXItciBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDRlXCIsIGJhY2tncm91bmQ6IFwiIzEzMTMyYVwiLCBtaW5XaWR0aDogXCIxNjBweFwiIH19PlxuICAgICAgICAgICAgey8qIFRlcnJpdG9yeSBzZWxlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2MDU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjYwNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbWItMVwiPlRFUlJJVE9SWTwvZGl2PlxuICAgICAgICAgICAgICB7VEVSUklUT1JZX0RFRlMubWFwKCh0LCBpKSA9PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjA4OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiB7c2V0VGVycml0b3J5KGkpO3NldER1bmdlb25JZHgoMCk7fX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBweC0yIHB5LTEgbWItMC41IHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogdGVycml0b3J5ID09PSBpID8gXCIjN2YxZDFkXCIgOiBcIiMyZDJkNGVcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGVycml0b3J5ID09PSBpID8gXCIjZGMyNjI2XCIgOiBcIiMzZDNkNWVcIn1gLCBjb2xvcjogdGVycml0b3J5ID09PSBpID8gXCIjZmNhNWE1XCIgOiBcIiNhYWFcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImljb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWQgfHwgdD8uX2lkfT5cbiAgICAgICAgICAgICAgICAgIHt0Lmljb259IHt0Lm5hbWV9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIER1bmdlb24gc2VsZWN0b3IgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjE3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2MTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5EVU5HRU9OPC9kaXY+XG4gICAgICAgICAgICAgIHtURVJSSVRPUllfRFVOR0VPTlNbdGVycml0b3J5XT8ubWFwKChkLCBpKSA9PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjIwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBzZXREdW5nZW9uSWR4KGkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHB4LTIgcHktMSBtYi0wLjUgcm91bmRlZCBmb250LXVpIHRleHQtWzEwcHhdIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogZHVuZ2VvbklkeCA9PT0gaSA/IFwiIzdmMWQxZFwiIDogXCIjMmQyZDRlXCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2R1bmdlb25JZHggPT09IGkgPyBcIiNkYzI2MjZcIiA6IFwiIzNkM2Q1ZVwifWAsIGNvbG9yOiBkdW5nZW9uSWR4ID09PSBpID8gXCIjZmNhNWE1XCIgOiBcIiNhYWFcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZD8uW1wiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIl19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGV2ZWxcIj5cbiAgICAgICAgICAgICAgICAgIHtkLmxldmVsfS4ge2QubmFtZX0ge2QuYm9zcyA/IFwi8J+SgFwiIDogXCJcIn1cbiAgICAgICAgICAgICAgICAgIHtsb2FkTGF5b3V0KHRlcnJpdG9yeSwgaSkgPyBcIiDinI/vuI9cIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1vZGUgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjMwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2MzE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5NT0RFPC9kaXY+XG4gICAgICAgICAgICAgIHtbW1wicGxhY2VcIiwgXCLwn4+X77iPIFBsYWNlXCJdLCBbXCJlcmFzZVwiLCBcIvCfl5HvuI8gRXJhc2VcIl0sIFtcInNlbGVjdFwiLCBcIvCflI0gU2VsZWN0XCJdXS5tYXAoKFttLCBsYWJlbF0pID0+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2MzM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e219IG9uQ2xpY2s9eygpID0+IHNldE1vZGUobSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtMiBweS0xIG1iLTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IG1vZGUgPT09IG0gPyBcIiM0YzFkOTVcIiA6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHttb2RlID09PSBtID8gXCIjYTg1NWY3XCIgOiBcIiMzZDNkNWVcIn1gLCBjb2xvcjogbW9kZSA9PT0gbSA/IFwiI2U5ZDVmZlwiIDogXCIjYWFhXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiPlxuICAgICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBab29tIGNvbnRyb2xzICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY0MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjQzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCBtYi0xXCI+Wk9PTTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjQ0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjQ1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2NhbGUoKHMpID0+IE1hdGgubWF4KDAuMywgcyAtIDAuMikpfSBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBiZy1zbGF0ZS03MDAgdGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxNaW51cyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY0NjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMn0gLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY0ODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSB0ZXh0LWNlbnRlciBmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj57KHNjYWxlICogMTAwKS50b0ZpeGVkKDApfSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY0OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNjYWxlKChzKSA9PiBNYXRoLm1pbig1LCBzICsgMC4yKSl9IGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGJnLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgPFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2NTA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDb2xvcnMgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjU2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2NTc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5DT0xPUlM8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY1ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtzZXRDb2xvclBpY2tlclRhcmdldChcImJhY2tncm91bmRcIik7c2V0U2hvd0NvbG9yUGlja2VyKHRydWUpO319XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYi0xIHB4LTIgcHktMSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBiYWNrZ3JvdW5kQ29sb3IsIGJvcmRlcjogXCIxcHggc29saWQgIzQ0NFwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY2MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCBib3JkZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBiYWNrZ3JvdW5kQ29sb3IgfX0gLz5cbiAgICAgICAgICAgICAgICBCYWNrZ3JvdW5kXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NjY0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge3NldENvbG9yUGlja2VyVGFyZ2V0KFwiZ3JpZFwiKTtzZXRTaG93Q29sb3JQaWNrZXIodHJ1ZSk7fX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTIgcHktMSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBncmlkQ29sb3IsIGJvcmRlcjogXCIxcHggc29saWQgIzQ0NFwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY2NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCBib3JkZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBncmlkQ29sb3IgfX0gLz5cbiAgICAgICAgICAgICAgICBHcmlkXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2VudGVyIC0gQ2FudmFzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2NzQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0IHAtMyBnYXAtMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMGQxYVwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY3NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgc2VsZi1zdGFydFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkdW5nZW9uRGVmPy5pZCB8fCBkdW5nZW9uRGVmPy5faWR9PlxuICAgICAgICAgICAgICB7ZHVuZ2VvbkRlZj8ubmFtZX0g4oCUIHtidWlsZGluZ3MubGVuZ3RofSBidWlsZGluZ3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGNhbnZhcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY3ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgICAgIHdpZHRoPXtDQU5WQVNfV31cbiAgICAgICAgICAgIGhlaWdodD17Q0FOVkFTX0h9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBjdXJzb3I6IG1vdmVCdWlsZGluZyA/IFwiY3Jvc3NoYWlyXCIgOiBkcmFnZ2luZyA/IFwiZ3JhYmJpbmdcIiA6IG1vZGUgPT09IFwiZXJhc2VcIiA/IFwibm90LWFsbG93ZWRcIiA6IG1vZGUgPT09IFwic2VsZWN0XCIgPyBcInBvaW50ZXJcIiA6IFwiY3Jvc3NoYWlyXCIsXG4gICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgIzJkMmQ0ZVwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICAgICAgICAgIHRvdWNoQWN0aW9uOiBcIm5vbmVcIlxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNhbnZhc0NsaWNrfVxuICAgICAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgICAgICBvbk1vdXNlVXA9e2hhbmRsZU1vdXNlVXB9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHtzZXREcmFnZ2luZyhmYWxzZSk7c2V0RHJhZ1N0YXJ0KG51bGwpO3NldEhvdmVyQ2VsbChudWxsKTt9fVxuICAgICAgICAgICAgb25XaGVlbD17aGFuZGxlV2hlZWx9IC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHtzZWxlY3RlZEJsZGcgJiYgbW9kZSA9PT0gXCJzZWxlY3RcIiAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY5NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIgcHgtMyBweS0yIHJvdW5kZWQgc2VsZi1zdGFydFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YzFkOTVcIiwgbWluV2lkdGg6IFwiMjgwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6Njk3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjY5ODoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIj57QlVJTERJTkdfREVGU1tzZWxlY3RlZEJsZGcudHlwZV0/Lm5hbWV9IEx2LntzZWxlY3RlZEJsZGcubGV2ZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo2OTk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImd4XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3NlbGVjdGVkQmxkZz8uaWQgfHwgc2VsZWN0ZWRCbGRnPy5faWR9Pih7c2VsZWN0ZWRCbGRnLmd4fSx7c2VsZWN0ZWRCbGRnLmd5fSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIExldmVsIGNvbnRyb2xzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3MDM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3MDQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPkxldmVsOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3MDU6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiBiLmlkID09PSBzZWxlY3RlZEJsZGcuaWQgPyB7IC4uLmIsIGxldmVsOiBNYXRoLm1heCgxLCBiLmxldmVsIC0gMSkgfSA6IGIpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQgZm9udC11aSB0ZXh0LXNtIGZvbnQtYm9sZFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YzFkOTVcIiwgY29sb3I6IFwiI2ZmZlwiIH19PlxuICAgICAgICAgICAgICAgICAgICAtXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzA5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtd2hpdGUgZm9udC1ib2xkIHctNiB0ZXh0LWNlbnRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c2VsZWN0ZWRCbGRnPy5pZCB8fCBzZWxlY3RlZEJsZGc/Ll9pZH0+e3NlbGVjdGVkQmxkZy5sZXZlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzEwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBwcmV2Lm1hcCgoYikgPT4gYi5pZCA9PT0gc2VsZWN0ZWRCbGRnLmlkID8geyAuLi5iLCBsZXZlbDogTWF0aC5taW4oMjAsIGIubGV2ZWwgKyAxKSB9IDogYikpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZCBmb250LXVpIHRleHQtc20gZm9udC1ib2xkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMmQyZDRlXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzRjMWQ5NVwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEFjdGlvbiBidXR0b25zICovfVxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3MTc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIHB0LTEgYm9yZGVyLXRcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDRlXCIgfX0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzE4OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge3NldE1vdmVCdWlsZGluZyhzZWxlY3RlZEJsZGcpO3NldEdob3N0UG9zKHsgZ3g6IHNlbGVjdGVkQmxkZy5neCwgZ3k6IHNlbGVjdGVkQmxkZy5neSB9KTt9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZCBmb250LXVpIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGVhNWU5XCIsIGJvcmRlcjogXCIxcHggc29saWQgIzM4YmRmOFwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgIPCflIQgTW92ZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzIzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge3NldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5maWx0ZXIoKGIpID0+IGIuaWQgIT09IHNlbGVjdGVkQmxkZy5pZCkpO3NldFNlbGVjdGVkQnVpbGRpbmdJZChudWxsKTt9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZCBmb250LXVpIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZGMyNjI2XCIsIGJvcmRlcjogXCIxcHggc29saWQgI2VmNDQ0NFwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgIPCfl5HvuI8gRGVsZXRlXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzMxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNjAwIHNlbGYtc3RhcnRcIj5cbiAgICAgICAgICAgICAge21vdmVCdWlsZGluZyA/IFwi8J+UgCBNb3ZpbmcgLSBjbGljayB0byBwbGFjZVwiIDogXCJEcmFnIHRvIHBhbiDCtyBTY3JvbGwgdG8gem9vbSDCtyBDbGljayB0byBcIiArIG1vZGV9IMK3IENtZCtaOiBVbmRvIMK3IHtidWlsZGluZ3MubGVuZ3RofSBidWlsZGluZ3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0IHNpZGViYXIgLSBidWlsZGluZyBwYWxldHRlICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3Mzc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHAtMyBnYXAtMyBib3JkZXItbCBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDRlXCIsIGJhY2tncm91bmQ6IFwiIzEzMTMyYVwiLCBtaW5XaWR0aDogXCIxNjBweFwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjczODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1yZWQtNDAwIG1iLTFcIj7wn4+X77iPIEJVSUxESU5HPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzM5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICB7UExBQ0VBQkxFLm1hcCgodHlwZSwgX19hcnJJZHhfXykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlZiA9IEJVSUxESU5HX0RFRlNbdHlwZV07XG4gICAgICAgICAgICAgICAgaWYgKCFkZWYpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzQ0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXt0eXBlfSBvbkNsaWNrPXsoKSA9PiB7c2V0U2VsZWN0ZWRUeXBlKHR5cGUpO3NldE1vZGUoXCJwbGFjZVwiKTt9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yIHB5LTEgcm91bmRlZCBmb250LXVpIHRleHQteHMgdHJhbnNpdGlvbi1hbGwgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHNlbGVjdGVkVHlwZSA9PT0gdHlwZSAmJiBtb2RlID09PSBcInBsYWNlXCIgPyBcIiM0YzFkOTVcIiA6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHtzZWxlY3RlZFR5cGUgPT09IHR5cGUgJiYgbW9kZSA9PT0gXCJwbGFjZVwiID8gXCIjYTg1NWY3XCIgOiBcIiMzZDNkNWVcIn1gLCBjb2xvcjogc2VsZWN0ZWRUeXBlID09PSB0eXBlICYmIG1vZGUgPT09IFwicGxhY2VcIiA/IFwiI2U5ZDVmZlwiIDogXCIjYWFhXCIgfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQTEFDRUFCTEVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvcjo3NDc6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImljb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZGVmPy5pZCB8fCBkZWY/Ll9pZH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQTEFDRUFCTEVcIj57ZGVmLmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc0ODoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRydW5jYXRlIHRleHQtWzEwcHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2RlZj8uaWQgfHwgZGVmPy5faWR9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUExBQ0VBQkxFXCI+e2RlZi5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIExldmVsICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc1NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzU2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCBtYi0xXCI+TEVWRUw8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc1NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICB7WzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXS5tYXAoKGwsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc1OToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17bH0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRMZXZlbChsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTYgcm91bmRlZCB0ZXh0LVs5cHhdIGZvbnQtdWkgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHNlbGVjdGVkTGV2ZWwgPT09IGwgPyBcIiM0YzFkOTVcIiA6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHtzZWxlY3RlZExldmVsID09PSBsID8gXCIjYTg1NWY3XCIgOiBcIiMzZDNkNWVcIn1gLCBjb2xvcjogc2VsZWN0ZWRMZXZlbCA9PT0gbCA/IFwiI2ZmZlwiIDogXCIjYWFhXCIgfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199PlxuICAgICAgICAgICAgICAgICAgICB7bH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb2xvciBQaWNrZXIgTW9kYWwgKi99XG4gICAgICAgIHtzaG93Q29sb3JQaWNrZXIgJiZcbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc3MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bMTEwXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84MFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc3MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgcC00XCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgIzRjMWQ5NVwiIH19PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6Nzc0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIHRleHQtcHVycGxlLTQwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAge2NvbG9yUGlja2VyVGFyZ2V0ID09PSBcImJhY2tncm91bmRcIiA/IFwiQkFDS0dST1VORCBDT0xPUlwiIDogXCJHUklEIENPTE9SXCJ9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8U3BlY3RydW1Db2xvclBpY2tlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yOjc3NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBjb2xvcj17Y29sb3JQaWNrZXJUYXJnZXQgPT09IFwiYmFja2dyb3VuZFwiID8gYmFja2dyb3VuZENvbG9yIDogZ3JpZENvbG9yfVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNvbG9yUGlja30gLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25FZGl0b3I6NzgxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd0NvbG9yUGlja2VyKGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTMgdy1mdWxsIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtNzAwXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzQ0NFwiIH19PlxuICAgICAgICAgICAgICAgIENMT1NFXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yLmpzeCJ9