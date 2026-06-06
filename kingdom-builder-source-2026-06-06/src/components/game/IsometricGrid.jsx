import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/IsometricGrid.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/IsometricGrid.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useCallback = __vite__cjsImport3_react["useCallback"]; const useImperativeHandle = __vite__cjsImport3_react["useImperativeHandle"]; const forwardRef = __vite__cjsImport3_react["forwardRef"];
import { TILE_W, TILE_H, GRID_SIZE, gridToScreen, screenToGrid, BUILDING_DEFS, BUILDING_COLORS } from "/src/lib/gameConstants.js";
import { getCachedImage } from "/src/lib/buildingSprites.js";
import { getCachedWallLayerImage } from "/src/lib/buildingStats.js";
import { getCachedHeroImage } from "/src/lib/heroSprites.js";
import { getCachedPublishedBuilding, getCachedPublishedHero, getCachedPublishedWallLayer } from "/src/lib/publishedSprites.js";
const CANVAS_OFFSET_X = 900;
const CANVAS_OFFSET_Y = 300;
const FOREST_RING = 10;
const getBaseScale = (canvasW, canvasH) => {
  const gridW = GRID_SIZE * TILE_W;
  const gridH = GRID_SIZE * TILE_H;
  return Math.min(canvasW / (gridW * 1.08), canvasH / (gridH * 1.08)) * 1.15;
};
const getCenteredOffset = (canvasW, canvasH, sc) => {
  const gridCenterX = (GRID_SIZE / 2 - GRID_SIZE / 2) * TILE_W;
  const cx = (GRID_SIZE / 2 - GRID_SIZE / 2) * (TILE_W / 2);
  const cy = (GRID_SIZE / 2 + GRID_SIZE / 2) * (TILE_H / 2);
  return {
    x: canvasW / 2 - CANVAS_OFFSET_X * sc - cx * sc,
    y: canvasH / 2 - CANVAS_OFFSET_Y * sc - cy * sc
  };
};
const IsometricGrid = _s(forwardRef(_c = _s(function IsometricGrid2({ buildings, heroes, selectedBuilding, onSelectBuilding, onMoveBuilding, pendingShopPlacement, onPlaceShopBuilding, onWallDrag, "data-collection-item-id": __dataCollectionItemId }, ref) {
  _s();
  const buildingsRef = useRef(buildings);
  const heroesRef = useRef(heroes || []);
  useEffect(() => {
    buildingsRef.current = buildings;
    stateRef.current.buildings = buildings;
  }, [buildings]);
  const canvasRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [moveBuilding, setMoveBuilding] = useState(null);
  const [ghostPos, setGhostPos] = useState(null);
  const [hoverBuilding, setHoverBuilding] = useState(null);
  const [hoverCanvasPos, setHoverCanvasPos] = useState(null);
  const stateRef = useRef({ offset, scale, moveBuilding, ghostPos, buildings, pendingShopPlacement });
  useEffect(() => {
    stateRef.current = { offset, scale, moveBuilding, ghostPos, buildings, pendingShopPlacement };
  }, [offset, scale, moveBuilding, ghostPos, buildings, pendingShopPlacement]);
  useEffect(() => {
    heroesRef.current = heroes || [];
  }, [heroes]);
  const animFrameRef = useRef();
  const worldToCanvas = useCallback((wx, wy, off) => ({
    cx: wx + CANVAS_OFFSET_X + off.x,
    cy: wy + CANVAS_OFFSET_Y + off.y
  }), []);
  const canvasToWorld = useCallback((cx, cy, off, sc) => ({
    wx: (cx - CANVAS_OFFSET_X - off.x) / sc,
    wy: (cy - CANVAS_OFFSET_Y - off.y) / sc
  }), []);
  const isValidPlacement = (gx, gy, fw, fh, excludeId, bldgs, movingBuildingType) => {
    if (gx < FOREST_RING || gy < FOREST_RING || gx + fw > GRID_SIZE - FOREST_RING || gy + fh > GRID_SIZE - FOREST_RING) return false;
    for (const b of bldgs) {
      if (b.id === excludeId) continue;
      if (gx < b.grid_x + b.footprint_w && gx + fw > b.grid_x && gy < b.grid_y + b.footprint_h && gy + fh > b.grid_y) return false;
    }
    return true;
  };
  const drawBuilding = (ctx, building, isGhost, isSelected, isValidGhost, off, sc, canvasW, canvasH, allBuildings) => {
    const def = BUILDING_DEFS[building.building_type];
    const colors = BUILDING_COLORS[building.building_type] || { bg: "#1a1a2e", border: "#4a4a6e", icon: "#8888cc" };
    const fw = building.footprint_w || 2;
    const fh = building.footprint_h || 2;
    const tw = TILE_W * sc;
    const th = TILE_H * sc;
    const tileCenter = (gx, gy) => {
      const p = gridToScreen(gx, gy);
      return worldToCanvas(p.x * sc, p.y * sc, off);
    };
    const c00 = tileCenter(building.grid_x, building.grid_y);
    const cFW0 = tileCenter(building.grid_x + fw - 1, building.grid_y);
    const cFWH = tileCenter(building.grid_x + fw - 1, building.grid_y + fh - 1);
    const c0FH = tileCenter(building.grid_x, building.grid_y + fh - 1);
    const cCenter = tileCenter(building.grid_x + fw / 2 - 0.5, building.grid_y + fh / 2 - 0.5);
    const gNW = { cx: c00.cx, cy: c00.cy - th / 2 };
    const gNE = { cx: cFW0.cx + tw / 2, cy: cFW0.cy };
    const gSE = { cx: cFWH.cx, cy: cFWH.cy + th / 2 };
    const gSW = { cx: c0FH.cx - tw / 2, cy: c0FH.cy };
    const center = { cx: (gNW.cx + gSE.cx) / 2, cy: (gNW.cy + gSE.cy) / 2 };
    if (center.cx < -200 || center.cx > canvasW + 200 || center.cy < -200 || center.cy > canvasH + 200) return;
    const wallH = TILE_H * sc * (building.building_type === "town_hall" ? 2.08 * 1.5 : 2.08);
    ctx.globalAlpha = isGhost ? 0.65 : 1;
    const topColor = !isGhost || isValidGhost ? colors.bg : "#3a0000";
    const leftColor = shadeColor(topColor, -55);
    const rightColor = shadeColor(topColor, -30);
    const groundColor = shadeColor(topColor, -80);
    const topEdgeColor = isSelected ? "#fbbf24" : isGhost ? isValidGhost ? "#4ade80" : "#ef4444" : topColor;
    const leftEdgeColor = isSelected ? "#fbbf24" : isGhost ? isValidGhost ? "#4ade80" : "#ef4444" : leftColor;
    const rightEdgeColor = isSelected ? "#fbbf24" : isGhost ? isValidGhost ? "#4ade80" : "#ef4444" : rightColor;
    const pubImg = !isGhost ? getCachedPublishedBuilding(building.building_type, building.level) : null;
    const draftImg = !isGhost && !pubImg ? getCachedImage(building.building_type, building.level) : null;
    const spriteImg = pubImg || draftImg;
    const hasSprite = spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0;
    if (!hasSprite) {
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy);
      ctx.lineTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSW.cx, gSW.cy);
      ctx.closePath();
      ctx.fillStyle = groundColor;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(gSW.cx, gSW.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gSW.cx, gSW.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = leftColor;
      ctx.fill();
      ctx.strokeStyle = leftEdgeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gNE.cx, gNE.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = rightColor;
      ctx.fill();
      ctx.strokeStyle = rightEdgeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy - wallH);
      ctx.lineTo(gNE.cx, gNE.cy - wallH);
      ctx.lineTo(gSE.cx, gSE.cy - wallH);
      ctx.lineTo(gSW.cx, gSW.cy - wallH);
      ctx.closePath();
      ctx.fillStyle = topColor;
      ctx.fill();
      ctx.strokeStyle = topEdgeColor;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();
      const i = 0.2;
      const lerp = (a, b, t) => ({ cx: a.cx + (b.cx - a.cx) * t, cy: a.cy + (b.cy - a.cy) * t });
      const tNW = { cx: gNW.cx, cy: gNW.cy - wallH };
      const tNE = { cx: gNE.cx, cy: gNE.cy - wallH };
      const tSE = { cx: gSE.cx, cy: gSE.cy - wallH };
      const tSW = { cx: gSW.cx, cy: gSW.cy - wallH };
      const iNW = lerp(lerp(tNW, tNE, i), lerp(tSW, tSE, i), i);
      const iNE = lerp(lerp(tNW, tNE, 1 - i), lerp(tSW, tSE, 1 - i), i);
      const iSE = lerp(lerp(tNW, tNE, 1 - i), lerp(tSW, tSE, 1 - i), 1 - i);
      const iSW = lerp(lerp(tNW, tNE, i), lerp(tSW, tSE, i), 1 - i);
      ctx.beginPath();
      ctx.moveTo(iNW.cx, iNW.cy);
      ctx.lineTo(iNE.cx, iNE.cy);
      ctx.lineTo(iSE.cx, iSE.cy);
      ctx.lineTo(iSW.cx, iSW.cy);
      ctx.closePath();
      ctx.fillStyle = shadeColor(topColor, 20);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    const drawSpriteFull = (img) => {
      const minX = Math.min(gNW.cx, gSW.cx);
      const maxX = Math.max(gNE.cx, gSE.cx);
      const minY = Math.min(gNW.cy, gNE.cy) - wallH;
      const maxY = Math.max(gSE.cy, gSW.cy);
      ctx.drawImage(img, minX, minY, maxX - minX, maxY - minY);
    };
    if (hasSprite) {
      drawSpriteFull(spriteImg);
    } else {
      const iconSize = Math.max(6, Math.min(fw * tw * 0.22, 20 * sc));
      ctx.font = `${iconSize}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(def?.icon || "?", center.cx, center.cy - wallH);
    }
    if (!isGhost && building.building_type === "hero_base" && allBuildings) {
      const stationedHero = heroesRef.current?.find((h) => h.stationed_at_building_id === building.id);
      if (stationedHero) {
        const heroType = stationedHero.hero_type || stationedHero.portrait;
        const pubHeroImg = heroType ? getCachedPublishedHero(heroType, "S") : null;
        const draftHeroImg = !pubHeroImg && heroType ? getCachedHeroImage(heroType, "S") : null;
        const heroImg = pubHeroImg || draftHeroImg;
        if (heroImg && heroImg.complete && heroImg.naturalWidth > 0) {
          const heroSize = Math.max(tw, th) * 1.2 * sc;
          ctx.save();
          ctx.drawImage(
            heroImg,
            center.cx - heroSize / 2,
            center.cy - wallH - heroSize * 1.4,
            heroSize,
            heroSize * 1.5
          );
          ctx.restore();
        }
      }
    }
    if (!isGhost && building.level > 1) {
      const r = 7 * sc;
      ctx.fillStyle = "#0d0d1a";
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(gNE.cx, gNE.cy - wallH - r, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.font = `bold ${Math.max(5, 6 * sc)}px sans-serif`;
      ctx.fillStyle = "#fbbf24";
      ctx.fillText(building.level, gNE.cx, gNE.cy - wallH - r);
    }
    if (building.is_upgrading) {
      ctx.font = `${Math.max(8, 11 * sc)}px serif`;
      ctx.fillText("⚙️", center.cx, gNW.cy - wallH - 10 * sc);
    }
    if (isSelected) {
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(gNW.cx, gNW.cy);
      ctx.lineTo(gNE.cx, gNE.cy);
      ctx.lineTo(gSE.cx, gSE.cy);
      ctx.lineTo(gSW.cx, gSW.cy);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (!isGhost && building.building_type === "wall" && allBuildings) {
      const wallSet = new Set(allBuildings.filter((b) => b.building_type === "wall").map((b) => `${b.grid_x},${b.grid_y}`));
      const gx = building.grid_x, gy = building.grid_y;
      const neighbors = {
        sw: wallSet.has(`${gx - 1},${gy}`),
        se: wallSet.has(`${gx},${gy - 1}`),
        nw: wallSet.has(`${gx},${gy + 1}`),
        ne: wallSet.has(`${gx + 1},${gy}`)
      };
      for (const [layer, active] of Object.entries(neighbors)) {
        if (!active) continue;
        const pubLayerImg = getCachedPublishedWallLayer(building.level, layer);
        const draftLayerImg = !pubLayerImg ? getCachedWallLayerImage(building.level, layer) : null;
        const layerImg = pubLayerImg || draftLayerImg;
        if (!layerImg || !layerImg.complete || !layerImg.naturalWidth) continue;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(gNW.cx, gNW.cy - wallH);
        ctx.lineTo(gNE.cx, gNE.cy - wallH);
        ctx.lineTo(gSE.cx, gSE.cy - wallH);
        ctx.lineTo(gSW.cx, gSW.cy - wallH);
        ctx.closePath();
        ctx.clip();
        const topMinX = Math.min(gNW.cx, gSW.cx);
        const topMinY = Math.min(gNW.cy, gNE.cy) - wallH;
        const topW = Math.max(gNE.cx, gSE.cx) - topMinX;
        const topH = Math.max(gSE.cy, gSW.cy) - wallH - topMinY;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(layerImg, topMinX, topMinY, topW, topH);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  };
  const drawGrid = useCallback((ctx, w, h, off, sc, bldgs, selB, movB, ghost) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#1a2f1a";
    ctx.fillRect(0, 0, w, h);
    for (let gy = 0; gy < GRID_SIZE; gy++) {
      for (let gx = 0; gx < GRID_SIZE; gx++) {
        const { x, y } = gridToScreen(gx, gy);
        const tw = TILE_W * sc;
        const th = TILE_H * sc;
        const { cx, cy } = worldToCanvas(x * sc, y * sc, off);
        if (cx < -tw * 2 || cx > w + tw * 2 || cy < -th * 2 || cy > h + th * 2) continue;
        const inForest = gx < FOREST_RING || gy < FOREST_RING || gx >= GRID_SIZE - FOREST_RING || gy >= GRID_SIZE - FOREST_RING;
        const isVeryEdge = gx < 2 || gy < 2 || gx >= GRID_SIZE - 2 || gy >= GRID_SIZE - 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - th / 2);
        ctx.lineTo(cx + tw / 2, cy);
        ctx.lineTo(cx, cy + th / 2);
        ctx.lineTo(cx - tw / 2, cy);
        ctx.closePath();
        if (isVeryEdge) {
          ctx.fillStyle = "#0d1f0d";
        } else if (inForest) {
          const forestColors = ["#1a3d1a", "#163516", "#1e4020", "#183818"];
          ctx.fillStyle = forestColors[(gx * 3 + gy * 7) % 4];
        } else {
          ctx.fillStyle = (gx + gy) % 2 === 0 ? "#2d5a27" : "#285224";
        }
        ctx.fill();
        if (!inForest) {
          ctx.strokeStyle = "rgba(0,0,0,0.15)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    const treeRng = (gx, gy) => (gx * 374761393 + gy * 1234567891 & 2147483647) / 2147483647;
    for (let gy = 0; gy < GRID_SIZE; gy++) {
      for (let gx = 0; gx < GRID_SIZE; gx++) {
        const inForest = gx < FOREST_RING || gy < FOREST_RING || gx >= GRID_SIZE - FOREST_RING || gy >= GRID_SIZE - FOREST_RING;
        if (!inForest) continue;
        const rnd = treeRng(gx, gy);
        if (rnd > 0.45) continue;
        const { x, y } = gridToScreen(gx, gy);
        const tw = TILE_W * sc;
        const th = TILE_H * sc;
        const { cx, cy } = worldToCanvas(x * sc, y * sc, off);
        if (cx < -tw * 3 || cx > w + tw * 3 || cy < -th * 6 || cy > h + th * 3) continue;
        const treeH = (th * 2.5 + rnd * th * 2) * 0.7;
        const treeW = tw * 0.4 + rnd * tw * 0.2;
        ctx.globalAlpha = 0.85 + rnd * 0.15;
        ctx.fillStyle = "#3d2b1a";
        ctx.fillRect(cx - tw * 0.04, cy - th * 0.2, tw * 0.08, th * 0.35);
        ctx.fillStyle = rnd > 0.3 ? "#1a4d1a" : "#1e5c1e";
        ctx.beginPath();
        ctx.moveTo(cx, cy - treeH);
        ctx.lineTo(cx + treeW * 0.6, cy - treeH * 0.5);
        ctx.lineTo(cx - treeW * 0.6, cy - treeH * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = rnd > 0.3 ? "#246b24" : "#2d7a2d";
        ctx.beginPath();
        ctx.moveTo(cx, cy - treeH * 0.7);
        ctx.lineTo(cx + treeW * 0.75, cy - treeH * 0.25);
        ctx.lineTo(cx - treeW * 0.75, cy - treeH * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    const sorted = [...bldgs].sort((a, b) => {
      const depthA = a.grid_x + a.footprint_w + (a.grid_y + a.footprint_h);
      const depthB = b.grid_x + b.footprint_w + (b.grid_y + b.footprint_h);
      return depthA - depthB;
    });
    sorted.forEach((b) => {
      if (movB && b.id === movB.id) return;
      drawBuilding(ctx, b, false, b.id === selB?.id, true, off, sc, w, h, bldgs);
    });
    if (ghost && movB) {
      const ghostB = { ...movB, grid_x: ghost.gx, grid_y: ghost.gy };
      const valid = isValidPlacement(ghost.gx, ghost.gy, movB.footprint_w, movB.footprint_h, movB.id, bldgs, movB.building_type);
      drawBuilding(ctx, ghostB, true, false, valid, off, sc, w, h, bldgs);
    }
  }, [worldToCanvas]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const baseScale = getBaseScale(canvas.width, canvas.height);
    setScale(baseScale);
    const centerP = gridToScreen(GRID_SIZE / 2, GRID_SIZE / 2);
    setOffset({
      x: canvas.width / 2 - (centerP.x * baseScale + CANVAS_OFFSET_X),
      y: canvas.height / 2 - (centerP.y * baseScale + CANVAS_OFFSET_Y)
    });
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      const { offset: off, scale: sc, moveBuilding: movB, ghostPos: ghost, buildings: bldgs } = stateRef.current;
      if (!sc) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      drawGrid(ctx, canvas.width, canvas.height, off, sc, bldgs, selectedBuilding, movB, ghost);
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [drawGrid, selectedBuilding]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const MIN_SCALE = getBaseScale(canvas.width, canvas.height);
    const MAX_SCALE = MIN_SCALE * 5;
    const clampOffset = (ox, oy, sc) => {
      const PAD = 20;
      const w = canvas.width;
      const h = canvas.height;
      const corners = [
        gridToScreen(0, 0),
        gridToScreen(GRID_SIZE - 1, 0),
        gridToScreen(GRID_SIZE - 1, GRID_SIZE - 1),
        gridToScreen(0, GRID_SIZE - 1)
      ].map((p) => ({
        cx: p.x * sc + CANVAS_OFFSET_X + ox,
        cy: p.y * sc + CANVAS_OFFSET_Y + oy
      }));
      const minCX = Math.min(...corners.map((c) => c.cx));
      const maxCX = Math.max(...corners.map((c) => c.cx));
      const minCY = Math.min(...corners.map((c) => c.cy));
      const maxCY = Math.max(...corners.map((c) => c.cy));
      let dx = 0, dy = 0;
      if (maxCX - minCX <= w - PAD * 2) {
        if (minCX < PAD) dx = PAD - minCX;
        if (maxCX > w - PAD) dx = w - PAD - maxCX;
      } else {
        if (minCX > PAD) dx = PAD - minCX;
        if (maxCX < w - PAD) dx = w - PAD - maxCX;
      }
      if (maxCY - minCY <= h - PAD * 2) {
        if (minCY < PAD) dy = PAD - minCY;
        if (maxCY > h - PAD) dy = h - PAD - maxCY;
      } else {
        if (minCY > PAD) dy = PAD - minCY;
        if (maxCY < h - PAD) dy = h - PAD - maxCY;
      }
      return { x: ox + dx, y: oy + dy };
    };
    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const { scale: prevScale, offset: prevOff } = stateRef.current;
      if (!prevScale) return;
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prevScale * factor));
      const rawOff = {
        x: mx - (mx - prevOff.x) * (newScale / prevScale),
        y: my - (my - prevOff.y) * (newScale / prevScale)
      };
      const clampedOff = clampOffset(rawOff.x, rawOff.y, newScale);
      setScale(newScale);
      setOffset(clampedOff);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, []);
  const getCanvasPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches?.[0] || e;
    return { cx: touch.clientX - rect.left, cy: touch.clientY - rect.top };
  };
  const getBuildingAt = (cxP, cyP) => {
    const { offset: off, scale: sc, buildings: bldgs } = stateRef.current;
    const tw = TILE_W * sc;
    const th = TILE_H * sc;
    const hitBuilding = (b) => {
      const fw = b.footprint_w || 2;
      const fh = b.footprint_h || 2;
      const wallH = TILE_H * sc * (b.building_type === "town_hall" ? 2.08 * 1.5 : 2.08);
      const tileCenter = (gx, gy) => {
        const p = gridToScreen(gx, gy);
        return worldToCanvas(p.x * sc, p.y * sc, off);
      };
      const c00 = tileCenter(b.grid_x, b.grid_y);
      const cFW0 = tileCenter(b.grid_x + fw - 1, b.grid_y);
      const cFWH = tileCenter(b.grid_x + fw - 1, b.grid_y + fh - 1);
      const c0FH = tileCenter(b.grid_x, b.grid_y + fh - 1);
      const gNW = { cx: c00.cx, cy: c00.cy - th / 2 };
      const gNE = { cx: cFW0.cx + tw / 2, cy: cFW0.cy };
      const gSE = { cx: cFWH.cx, cy: cFWH.cy + th / 2 };
      const gSW = { cx: c0FH.cx - tw / 2, cy: c0FH.cy };
      const minX = Math.min(gNW.cx, gNE.cx, gSE.cx, gSW.cx);
      const maxX = Math.max(gNW.cx, gNE.cx, gSE.cx, gSW.cx);
      const minY = Math.min(gNW.cy, gNE.cy, gSE.cy, gSW.cy) - wallH;
      const maxY = Math.max(gNW.cy, gNE.cy, gSE.cy, gSW.cy);
      if (cxP < minX || cxP > maxX || cyP < minY || cyP > maxY) return false;
      const polygon = [
        { cx: gNW.cx, cy: gNW.cy - wallH },
        // top-NW
        { cx: gNE.cx, cy: gNE.cy - wallH },
        // top-NE
        { cx: gSE.cx, cy: gSE.cy - wallH },
        // top-SE
        { cx: gSE.cx, cy: gSE.cy },
        // ground-SE
        { cx: gSW.cx, cy: gSW.cy },
        // ground-SW
        { cx: gNW.cx, cy: gNW.cy }
        // ground-NW (only visible if no left face)
      ];
      return pointInPolygon(cxP, cyP, polygon);
    };
    const sorted = [...bldgs].sort((a, b) => {
      const dA = a.grid_x + a.footprint_w + (a.grid_y + a.footprint_h);
      const dB = b.grid_x + b.footprint_w + (b.grid_y + b.footprint_h);
      return dB - dA;
    });
    return sorted.find((b) => hitBuilding(b)) || null;
  };
  const clickStartRef = useRef(null);
  const computeShiftWallLine = (clickGx, clickGy, bldgs) => {
    const wallSet = new Set(bldgs.filter((b) => b.building_type === "wall").map((b) => `${b.grid_x},${b.grid_y}`));
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    let chosenDir = null;
    for (const [dgx, dgy] of dirs) {
      if (wallSet.has(`${clickGx + dgx},${clickGy + dgy}`)) {
        chosenDir = [-dgx, -dgy];
        break;
      }
    }
    if (!chosenDir) {
      const valid = isValidPlacement(clickGx, clickGy, 1, 1, null, bldgs, "wall");
      return valid ? [{ gx: clickGx, gy: clickGy }] : [];
    }
    const cells = [];
    let cx = clickGx, cy = clickGy;
    const [dx, dy] = chosenDir;
    while (true) {
      if (!isValidPlacement(cx, cy, 1, 1, null, bldgs, "wall")) break;
      cells.push({ gx: cx, gy: cy });
      cx += dx;
      cy += dy;
    }
    return cells;
  };
  const handleMouseDown = (e) => {
    if (e.button === 2 && pendingShopPlacement) {
      e.preventDefault();
      const pos2 = getCanvasPos(e);
      const { offset: off, scale: sc } = stateRef.current;
      const { wx, wy } = canvasToWorld(pos2.cx, pos2.cy, off, sc);
      const { gx, gy } = screenToGrid(wx, wy);
      onPlaceShopBuilding?.(gx, gy);
      return;
    }
    if (e.button !== 0) return;
    const pos = getCanvasPos(e);
    if (e.shiftKey && pendingShopPlacement?.buildingType === "wall") {
      const { offset: off, scale: sc, buildings: bldgs } = stateRef.current;
      const { wx, wy } = canvasToWorld(pos.cx, pos.cy, off, sc);
      const { gx, gy } = screenToGrid(wx, wy);
      const cells = computeShiftWallLine(gx, gy, bldgs);
      if (cells.length > 0) {
        onWallDrag?.(cells);
      }
      return;
    }
    clickStartRef.current = pos;
    setDragging(true);
    setDragStart({ ...pos, ox: offset.x, oy: offset.y });
  };
  const handleMouseMove = (e) => {
    const pos = getCanvasPos(e);
    if (stateRef.current.moveBuilding) {
      const { offset: off, scale: sc, moveBuilding: movB } = stateRef.current;
      const { wx, wy } = canvasToWorld(pos.cx, pos.cy, off, sc);
      const { gx, gy } = screenToGrid(wx, wy);
      const snappedX = Math.max(FOREST_RING, Math.min(gx, GRID_SIZE - FOREST_RING - movB.footprint_w));
      const snappedY = Math.max(FOREST_RING, Math.min(gy, GRID_SIZE - FOREST_RING - movB.footprint_h));
      setGhostPos({ gx: snappedX, gy: snappedY });
      return;
    }
    if (dragging && dragStart) {
      const canvas = canvasRef.current;
      const sc = stateRef.current.scale || 1;
      const newX = dragStart.ox + pos.cx - dragStart.cx;
      const newY = dragStart.oy + pos.cy - dragStart.cy;
      const PAD = 20;
      const w = canvas?.width || 1280;
      const h = canvas?.height || 720;
      const corners = [
        gridToScreen(0, 0),
        gridToScreen(GRID_SIZE - 1, 0),
        gridToScreen(GRID_SIZE - 1, GRID_SIZE - 1),
        gridToScreen(0, GRID_SIZE - 1)
      ].map((p) => ({ cx: p.x * sc + CANVAS_OFFSET_X + newX, cy: p.y * sc + CANVAS_OFFSET_Y + newY }));
      const minCX = Math.min(...corners.map((c) => c.cx));
      const maxCX = Math.max(...corners.map((c) => c.cx));
      const minCY = Math.min(...corners.map((c) => c.cy));
      const maxCY = Math.max(...corners.map((c) => c.cy));
      let dx = 0, dy = 0;
      if (maxCX - minCX <= w - PAD * 2) {
        if (minCX < PAD) dx = PAD - minCX;
        if (maxCX > w - PAD) dx = w - PAD - maxCX;
      } else {
        if (minCX > PAD) dx = PAD - minCX;
        if (maxCX < w - PAD) dx = w - PAD - maxCX;
      }
      if (maxCY - minCY <= h - PAD * 2) {
        if (minCY < PAD) dy = PAD - minCY;
        if (maxCY > h - PAD) dy = h - PAD - maxCY;
      } else {
        if (minCY > PAD) dy = PAD - minCY;
        if (maxCY < h - PAD) dy = h - PAD - maxCY;
      }
      setOffset({ x: newX + dx, y: newY + dy });
    }
    const building = getBuildingAt(pos.cx, pos.cy);
    setHoverBuilding(building || null);
    setHoverCanvasPos(building ? { cx: pos.cx, cy: pos.cy } : null);
  };
  const handleMouseUp = (e) => {
    const pos = getCanvasPos(e);
    if (stateRef.current.moveBuilding) {
      const { ghostPos: ghost, moveBuilding: movB } = stateRef.current;
      const bldgs = buildingsRef.current;
      if (ghost && isValidPlacement(ghost.gx, ghost.gy, movB.footprint_w, movB.footprint_h, movB.id, bldgs, movB.building_type)) {
        onMoveBuilding?.(movB, ghost.gx, ghost.gy);
      }
      setMoveBuilding(null);
      setGhostPos(null);
      setDragging(false);
      setDragStart(null);
      return;
    }
    setDragging(false);
    setDragStart(null);
    if (clickStartRef.current) {
      const dx = Math.abs(pos.cx - clickStartRef.current.cx);
      const dy = Math.abs(pos.cy - clickStartRef.current.cy);
      if (dx < 6 && dy < 6) {
        const building = getBuildingAt(pos.cx, pos.cy);
        onSelectBuilding?.(building || null);
      }
    }
    clickStartRef.current = null;
  };
  const handleMouseLeave = () => {
    if (!stateRef.current.moveBuilding) {
      setDragging(false);
      setDragStart(null);
    }
    setHoverBuilding(null);
    setHoverCanvasPos(null);
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };
  const startMoveMode = (building) => {
    setMoveBuilding(building);
    setGhostPos({ gx: building.grid_x, gy: building.grid_y });
    onSelectBuilding?.(null);
  };
  useImperativeHandle(ref, () => ({ startMoveMode }), []);
  const cancelMove = () => {
    setMoveBuilding(null);
    setGhostPos(null);
  };
  const hoverDef = hoverBuilding ? BUILDING_DEFS[hoverBuilding.building_type] : null;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/IsometricGrid:813:4", "data-dynamic-content": "true", className: "absolute inset-0", style: { userSelect: "none" }, "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        "data-source-location": "components/game/IsometricGrid:814:6",
        "data-dynamic-content": "true",
        ref: canvasRef,
        width: window.innerWidth,
        height: window.innerHeight,
        className: "absolute inset-0",
        style: { cursor: pendingShopPlacement ? "crosshair" : moveBuilding ? "crosshair" : dragging ? "grabbing" : "grab", touchAction: "none" },
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onContextMenu: handleContextMenu,
        onTouchStart: handleMouseDown,
        onTouchMove: handleMouseMove,
        onTouchEnd: handleMouseUp
      },
      void 0,
      false,
      {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 833,
        columnNumber: 7
      },
      this
    ),
    hoverBuilding && hoverCanvasPos && !moveBuilding && !selectedBuilding && /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/IsometricGrid:832:8",
        "data-dynamic-content": "true",
        className: "absolute pointer-events-none z-20 px-2 py-1 rounded",
        style: { left: hoverCanvasPos.cx + 14, top: hoverCanvasPos.cy - 28, background: "#d4b896", border: "1px solid #6b3f1f" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/IsometricGrid:836:10", "data-dynamic-content": "true", className: "font-ui text-xs font-semibold", style: { color: "#3d1f05" }, children: hoverDef?.name || hoverBuilding.building_type }, void 0, false, {
            fileName: "/app/src/components/game/IsometricGrid.jsx",
            lineNumber: 855,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/IsometricGrid:837:10", "data-dynamic-content": "true", className: "font-ui text-[10px] ml-2", style: { color: "#6b3f1f" }, "data-collection-item-field": "level", "data-collection-item-id": hoverBuilding?.id || hoverBuilding?._id, children: [
            "Lv.",
            hoverBuilding.level
          ] }, void 0, true, {
            fileName: "/app/src/components/game/IsometricGrid.jsx",
            lineNumber: 856,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 851,
        columnNumber: 7
      },
      this
    ),
    moveBuilding && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/IsometricGrid:843:8", "data-dynamic-content": "true", className: "absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/IsometricGrid:844:10", "data-dynamic-content": "true", className: "px-4 py-2 rounded", style: { background: "#d4b896", border: "2px solid #6b3f1f" }, children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/IsometricGrid:845:12", "data-dynamic-content": "true", className: "font-pixel text-[8px]", style: { color: "#3d1f05" }, "data-collection-item-field": "name", children: [
        "🔀 MOVING: ",
        BUILDING_DEFS[moveBuilding.building_type]?.name,
        " — click to place"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 864,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 863,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/IsometricGrid:847:10", "data-dynamic-content": "true", onClick: cancelMove, className: "btn-rpg-red btn-rpg px-3 py-2 rounded text-[8px] font-pixel", children: "CANCEL" }, void 0, false, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 866,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/IsometricGrid.jsx",
      lineNumber: 862,
      columnNumber: 7
    }, this),
    pendingShopPlacement && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/IsometricGrid:853:8", "data-dynamic-content": "true", className: "absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/IsometricGrid:854:10", "data-dynamic-content": "true", className: "px-4 py-2 rounded", style: { background: "#d4b896", border: "2px solid #6b3f1f" }, children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/IsometricGrid:855:12", "data-dynamic-content": "true", className: "font-pixel text-[8px]", style: { color: "#3d1f05" }, "data-collection-item-field": "name", children: [
        "🏗️ PLACING: ",
        BUILDING_DEFS[pendingShopPlacement.buildingType]?.name,
        " — right-click to place",
        pendingShopPlacement.buildingType === "wall" && " · Shift+click adjacent to a wall to extend in a line"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 874,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 873,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/IsometricGrid:860:10", "data-dynamic-content": "true", onClick: () => {
        onPlaceShopBuilding?.(null, null);
      }, className: "btn-rpg-red btn-rpg px-3 py-2 rounded text-[8px] font-pixel flex items-center gap-1", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/IsometricGrid:861:12", "data-dynamic-content": "false", children: "✕" }, void 0, false, {
          fileName: "/app/src/components/game/IsometricGrid.jsx",
          lineNumber: 880,
          columnNumber: 13
        }, this),
        " CANCEL"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/IsometricGrid.jsx",
        lineNumber: 879,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/IsometricGrid.jsx",
      lineNumber: 872,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/IsometricGrid.jsx",
    lineNumber: 832,
    columnNumber: 5
  }, this);
}, "ni17g3eAcVD9PzD9Hd8297WZDtI=")), "ni17g3eAcVD9PzD9Hd8297WZDtI=");
_c2 = IsometricGrid;
export default IsometricGrid;
function pointInPolygon(px, py, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].cx, yi = polygon[i].cy;
    const xj = polygon[j].cx, yj = polygon[j].cy;
    if (yi > py !== yj > py && px < (xj - xi) * (py - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}
function shadeColor(hex, amount) {
  try {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return `rgb(${r},${g},${b})`;
  } catch {
    return hex;
  }
}
var _c, _c2;
$RefreshReg$(_c, "IsometricGrid$forwardRef");
$RefreshReg$(_c2, "IsometricGrid");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/IsometricGrid.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/IsometricGrid.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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VDtBQUVBLFNBQVM1TSxXQUFXa04sS0FBS0MsUUFBUTtBQUMvQixNQUFJO0FBQ0YsUUFBSXZKLElBQUl3SixTQUFTRixJQUFJRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUU7QUFDcEMsUUFBSUMsSUFBSUYsU0FBU0YsSUFBSUcsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ3BDLFFBQUkxUCxJQUFJeVAsU0FBU0YsSUFBSUcsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ3BDekosUUFBSTFKLEtBQUtvSSxJQUFJLEdBQUdwSSxLQUFLQyxJQUFJLEtBQUt5SixJQUFJdUosTUFBTSxDQUFDO0FBQ3pDRyxRQUFJcFQsS0FBS29JLElBQUksR0FBR3BJLEtBQUtDLElBQUksS0FBS21ULElBQUlILE1BQU0sQ0FBQztBQUN6Q3hQLFFBQUl6RCxLQUFLb0ksSUFBSSxHQUFHcEksS0FBS0MsSUFBSSxLQUFLd0QsSUFBSXdQLE1BQU0sQ0FBQztBQUN6QyxXQUFPLE9BQU92SixDQUFDLElBQUkwSixDQUFDLElBQUkzUCxDQUFDO0FBQUEsRUFDM0IsUUFBUTtBQUFDLFdBQU91UDtBQUFBQSxFQUFJO0FBQ3RCO0FBQUMsSUFBQXJTLElBQUE0UjtBQUFBLGFBQUE1UixJQUFBO0FBQUEsYUFBQTRSLEtBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ2FsbGJhY2siLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwiZm9yd2FyZFJlZiIsIlRJTEVfVyIsIlRJTEVfSCIsIkdSSURfU0laRSIsImdyaWRUb1NjcmVlbiIsInNjcmVlblRvR3JpZCIsIkJVSUxESU5HX0RFRlMiLCJCVUlMRElOR19DT0xPUlMiLCJnZXRDYWNoZWRJbWFnZSIsImdldENhY2hlZFdhbGxMYXllckltYWdlIiwiZ2V0Q2FjaGVkSGVyb0ltYWdlIiwiZ2V0Q2FjaGVkUHVibGlzaGVkQnVpbGRpbmciLCJnZXRDYWNoZWRQdWJsaXNoZWRIZXJvIiwiZ2V0Q2FjaGVkUHVibGlzaGVkV2FsbExheWVyIiwiQ0FOVkFTX09GRlNFVF9YIiwiQ0FOVkFTX09GRlNFVF9ZIiwiRk9SRVNUX1JJTkciLCJnZXRCYXNlU2NhbGUiLCJjYW52YXNXIiwiY2FudmFzSCIsImdyaWRXIiwiZ3JpZEgiLCJNYXRoIiwibWluIiwiZ2V0Q2VudGVyZWRPZmZzZXQiLCJzYyIsImdyaWRDZW50ZXJYIiwiY3giLCJjeSIsIngiLCJ5IiwiSXNvbWV0cmljR3JpZCIsIl9zIiwiX2MiLCJidWlsZGluZ3MiLCJoZXJvZXMiLCJzZWxlY3RlZEJ1aWxkaW5nIiwib25TZWxlY3RCdWlsZGluZyIsIm9uTW92ZUJ1aWxkaW5nIiwicGVuZGluZ1Nob3BQbGFjZW1lbnQiLCJvblBsYWNlU2hvcEJ1aWxkaW5nIiwib25XYWxsRHJhZyIsIl9fZGF0YUNvbGxlY3Rpb25JdGVtSWQiLCJyZWYiLCJidWlsZGluZ3NSZWYiLCJoZXJvZXNSZWYiLCJjdXJyZW50Iiwic3RhdGVSZWYiLCJjYW52YXNSZWYiLCJvZmZzZXQiLCJzZXRPZmZzZXQiLCJzY2FsZSIsInNldFNjYWxlIiwiZHJhZ2dpbmciLCJzZXREcmFnZ2luZyIsImRyYWdTdGFydCIsInNldERyYWdTdGFydCIsIm1vdmVCdWlsZGluZyIsInNldE1vdmVCdWlsZGluZyIsImdob3N0UG9zIiwic2V0R2hvc3RQb3MiLCJob3ZlckJ1aWxkaW5nIiwic2V0SG92ZXJCdWlsZGluZyIsImhvdmVyQ2FudmFzUG9zIiwic2V0SG92ZXJDYW52YXNQb3MiLCJhbmltRnJhbWVSZWYiLCJ3b3JsZFRvQ2FudmFzIiwid3giLCJ3eSIsIm9mZiIsImNhbnZhc1RvV29ybGQiLCJpc1ZhbGlkUGxhY2VtZW50IiwiZ3giLCJneSIsImZ3IiwiZmgiLCJleGNsdWRlSWQiLCJibGRncyIsIm1vdmluZ0J1aWxkaW5nVHlwZSIsImIiLCJpZCIsImdyaWRfeCIsImZvb3RwcmludF93IiwiZ3JpZF95IiwiZm9vdHByaW50X2giLCJkcmF3QnVpbGRpbmciLCJjdHgiLCJidWlsZGluZyIsImlzR2hvc3QiLCJpc1NlbGVjdGVkIiwiaXNWYWxpZEdob3N0IiwiYWxsQnVpbGRpbmdzIiwiZGVmIiwiYnVpbGRpbmdfdHlwZSIsImNvbG9ycyIsImJnIiwiYm9yZGVyIiwiaWNvbiIsInR3IiwidGgiLCJ0aWxlQ2VudGVyIiwicCIsImMwMCIsImNGVzAiLCJjRldIIiwiYzBGSCIsImNDZW50ZXIiLCJnTlciLCJnTkUiLCJnU0UiLCJnU1ciLCJjZW50ZXIiLCJ3YWxsSCIsImdsb2JhbEFscGhhIiwidG9wQ29sb3IiLCJsZWZ0Q29sb3IiLCJzaGFkZUNvbG9yIiwicmlnaHRDb2xvciIsImdyb3VuZENvbG9yIiwidG9wRWRnZUNvbG9yIiwibGVmdEVkZ2VDb2xvciIsInJpZ2h0RWRnZUNvbG9yIiwicHViSW1nIiwibGV2ZWwiLCJkcmFmdEltZyIsInNwcml0ZUltZyIsImhhc1Nwcml0ZSIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2VQYXRoIiwiZmlsbFN0eWxlIiwiZmlsbCIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic3Ryb2tlIiwiaSIsImxlcnAiLCJhIiwidCIsInROVyIsInRORSIsInRTRSIsInRTVyIsImlOVyIsImlORSIsImlTRSIsImlTVyIsImRyYXdTcHJpdGVGdWxsIiwiaW1nIiwibWluWCIsIm1heFgiLCJtYXgiLCJtaW5ZIiwibWF4WSIsImRyYXdJbWFnZSIsImljb25TaXplIiwiZm9udCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxUZXh0Iiwic3RhdGlvbmVkSGVybyIsImZpbmQiLCJoIiwic3RhdGlvbmVkX2F0X2J1aWxkaW5nX2lkIiwiaGVyb1R5cGUiLCJoZXJvX3R5cGUiLCJwb3J0cmFpdCIsInB1Ykhlcm9JbWciLCJkcmFmdEhlcm9JbWciLCJoZXJvSW1nIiwiaGVyb1NpemUiLCJzYXZlIiwicmVzdG9yZSIsInIiLCJhcmMiLCJQSSIsImlzX3VwZ3JhZGluZyIsInNldExpbmVEYXNoIiwid2FsbFNldCIsIlNldCIsImZpbHRlciIsIm1hcCIsIm5laWdoYm9ycyIsInN3IiwiaGFzIiwic2UiLCJudyIsIm5lIiwibGF5ZXIiLCJhY3RpdmUiLCJPYmplY3QiLCJlbnRyaWVzIiwicHViTGF5ZXJJbWciLCJkcmFmdExheWVySW1nIiwibGF5ZXJJbWciLCJjbGlwIiwidG9wTWluWCIsInRvcE1pblkiLCJ0b3BXIiwidG9wSCIsImRyYXdHcmlkIiwidyIsInNlbEIiLCJtb3ZCIiwiZ2hvc3QiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsImluRm9yZXN0IiwiaXNWZXJ5RWRnZSIsImZvcmVzdENvbG9ycyIsInRyZWVSbmciLCJybmQiLCJ0cmVlSCIsInRyZWVXIiwic29ydGVkIiwic29ydCIsImRlcHRoQSIsImRlcHRoQiIsImZvckVhY2giLCJnaG9zdEIiLCJ2YWxpZCIsImNhbnZhcyIsImJhc2VTY2FsZSIsIndpZHRoIiwiaGVpZ2h0IiwiY2VudGVyUCIsImdldENvbnRleHQiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJNSU5fU0NBTEUiLCJNQVhfU0NBTEUiLCJjbGFtcE9mZnNldCIsIm94Iiwib3kiLCJQQUQiLCJjb3JuZXJzIiwibWluQ1giLCJjIiwibWF4Q1giLCJtaW5DWSIsIm1heENZIiwiZHgiLCJkeSIsIm9uV2hlZWwiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibXgiLCJjbGllbnRYIiwibGVmdCIsIm15IiwiY2xpZW50WSIsInRvcCIsInByZXZTY2FsZSIsInByZXZPZmYiLCJmYWN0b3IiLCJkZWx0YVkiLCJuZXdTY2FsZSIsInJhd09mZiIsImNsYW1wZWRPZmYiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRDYW52YXNQb3MiLCJ0b3VjaCIsInRvdWNoZXMiLCJnZXRCdWlsZGluZ0F0IiwiY3hQIiwiY3lQIiwiaGl0QnVpbGRpbmciLCJwb2x5Z29uIiwicG9pbnRJblBvbHlnb24iLCJkQSIsImRCIiwiY2xpY2tTdGFydFJlZiIsImNvbXB1dGVTaGlmdFdhbGxMaW5lIiwiY2xpY2tHeCIsImNsaWNrR3kiLCJkaXJzIiwiY2hvc2VuRGlyIiwiZGd4IiwiZGd5IiwiY2VsbHMiLCJwdXNoIiwiaGFuZGxlTW91c2VEb3duIiwiYnV0dG9uIiwicG9zIiwic2hpZnRLZXkiLCJidWlsZGluZ1R5cGUiLCJsZW5ndGgiLCJoYW5kbGVNb3VzZU1vdmUiLCJzbmFwcGVkWCIsInNuYXBwZWRZIiwibmV3WCIsIm5ld1kiLCJoYW5kbGVNb3VzZVVwIiwiYWJzIiwiaGFuZGxlTW91c2VMZWF2ZSIsImhhbmRsZUNvbnRleHRNZW51Iiwic3RhcnRNb3ZlTW9kZSIsImNhbmNlbE1vdmUiLCJob3ZlckRlZiIsInVzZXJTZWxlY3QiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjdXJzb3IiLCJ0b3VjaEFjdGlvbiIsImJhY2tncm91bmQiLCJjb2xvciIsIm5hbWUiLCJfaWQiLCJfYzIiLCJweCIsInB5IiwiaW5zaWRlIiwiaiIsInhpIiwieWkiLCJ4aiIsInlqIiwiaGV4IiwiYW1vdW50IiwicGFyc2VJbnQiLCJzbGljZSIsImciXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiSXNvbWV0cmljR3JpZC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZUltcGVyYXRpdmVIYW5kbGUsIGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRJTEVfVywgVElMRV9ILCBHUklEX1NJWkUsIGdyaWRUb1NjcmVlbiwgc2NyZWVuVG9HcmlkLCBCVUlMRElOR19ERUZTLCBCVUlMRElOR19DT0xPUlMgfSBmcm9tIFwiQC9saWIvZ2FtZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVkSW1hZ2UgfSBmcm9tIFwiQC9saWIvYnVpbGRpbmdTcHJpdGVzXCI7XG5pbXBvcnQgeyBnZXRDYWNoZWRXYWxsTGF5ZXJJbWFnZSB9IGZyb20gXCJAL2xpYi9idWlsZGluZ1N0YXRzXCI7XG5pbXBvcnQgeyBnZXRDYWNoZWRIZXJvSW1hZ2UgfSBmcm9tIFwiQC9saWIvaGVyb1Nwcml0ZXNcIjtcbmltcG9ydCB7IGdldENhY2hlZFB1Ymxpc2hlZEJ1aWxkaW5nLCBnZXRDYWNoZWRQdWJsaXNoZWRIZXJvLCBnZXRDYWNoZWRQdWJsaXNoZWRXYWxsTGF5ZXIgfSBmcm9tIFwiQC9saWIvcHVibGlzaGVkU3ByaXRlc1wiO1xuXG5jb25zdCBDQU5WQVNfT0ZGU0VUX1ggPSA5MDA7XG5jb25zdCBDQU5WQVNfT0ZGU0VUX1kgPSAzMDA7XG5jb25zdCBGT1JFU1RfUklORyA9IDEwO1xuXG4vLyBUaGUgaXNvbWV0cmljIGdyaWQgZGlhbW9uZCBzcGFucyBHUklEX1NJWkUgdGlsZXMgaW4gZWFjaCBheGlzLlxuLy8gVG90YWwgc2NyZWVuLXNwYWNlIHdpZHRoID0gR1JJRF9TSVpFICogVElMRV9XLCBoZWlnaHQgPSBHUklEX1NJWkUgKiBUSUxFX0hcbi8vIFdlIGNvbXB1dGUgYSBiYXNlIHNjYWxlIHRoYXQgZml0cyB0aGUgd2hvbGUgZ3JpZCAoaW5jbHVkaW5nIGZvcmVzdCByaW5nKSBpbnRvIHRoZSB2aWV3cG9ydC5cbmNvbnN0IGdldEJhc2VTY2FsZSA9IChjYW52YXNXLCBjYW52YXNIKSA9PiB7XG4gIGNvbnN0IGdyaWRXID0gR1JJRF9TSVpFICogVElMRV9XOyAvLyB0b3RhbCBkaWFtb25kIHdpZHRoIGluIHdvcmxkIHB4XG4gIGNvbnN0IGdyaWRIID0gR1JJRF9TSVpFICogVElMRV9IOyAvLyB0b3RhbCBkaWFtb25kIGhlaWdodCBpbiB3b3JsZCBweFxuICAvLyBmaXQgd2l0aCB+NSUgcGFkZGluZyBzbyBzb21lIHRyZWVzIGFsd2F5cyBzaG93XG4gIHJldHVybiBNYXRoLm1pbihjYW52YXNXIC8gKGdyaWRXICogMS4wOCksIGNhbnZhc0ggLyAoZ3JpZEggKiAxLjA4KSkgKiAxLjE1O1xufTtcblxuLy8gR2l2ZW4gYSBzY2FsZSwgY29tcHV0ZSB0aGUgY2VudGVyZWQgb2Zmc2V0IHNvIHRoZSBncmlkIGlzIGluIHRoZSBtaWRkbGVcbmNvbnN0IGdldENlbnRlcmVkT2Zmc2V0ID0gKGNhbnZhc1csIGNhbnZhc0gsIHNjKSA9PiB7XG4gIC8vIGdyaWQgY2VudGVyIGluIHdvcmxkIHNwYWNlIChiZWZvcmUgc2NhbGUpXG4gIGNvbnN0IGdyaWRDZW50ZXJYID0gKEdSSURfU0laRSAvIDIgLSBHUklEX1NJWkUgLyAyKSAqIFRJTEVfVzsgLy8gPSAwIGJ5IGlzbyBmb3JtdWxhXG4gIC8vIEluIG91ciBpc28gbWFwcGluZywgZ3JpZFRvU2NyZWVuIGZvciBjZW50ZXIgdGlsZTpcbiAgY29uc3QgY3ggPSAoR1JJRF9TSVpFIC8gMiAtIEdSSURfU0laRSAvIDIpICogKFRJTEVfVyAvIDIpOyAvLyA9IDBcbiAgY29uc3QgY3kgPSAoR1JJRF9TSVpFIC8gMiArIEdSSURfU0laRSAvIDIpICogKFRJTEVfSCAvIDIpOyAvLyA9IEdSSURfU0laRSAqIFRJTEVfSCAvIDJcbiAgcmV0dXJuIHtcbiAgICB4OiBjYW52YXNXIC8gMiAtIENBTlZBU19PRkZTRVRfWCAqIHNjIC0gY3ggKiBzYyxcbiAgICB5OiBjYW52YXNIIC8gMiAtIENBTlZBU19PRkZTRVRfWSAqIHNjIC0gY3kgKiBzY1xuICB9O1xufTtcblxuY29uc3QgSXNvbWV0cmljR3JpZCA9IGZvcndhcmRSZWYoZnVuY3Rpb24gSXNvbWV0cmljR3JpZCh7IGJ1aWxkaW5ncywgaGVyb2VzLCBzZWxlY3RlZEJ1aWxkaW5nLCBvblNlbGVjdEJ1aWxkaW5nLCBvbk1vdmVCdWlsZGluZywgcGVuZGluZ1Nob3BQbGFjZW1lbnQsIG9uUGxhY2VTaG9wQnVpbGRpbmcsIG9uV2FsbERyYWcsIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9LCByZWYpIHtcbiAgLy8gS2VlcCBidWlsZGluZ3NSZWYgaW4gc3luYyBmb3IgdmFsaWRhdGlvbiBBTkQgcmVuZGVyaW5nXG4gIGNvbnN0IGJ1aWxkaW5nc1JlZiA9IHVzZVJlZihidWlsZGluZ3MpO1xuICBjb25zdCBoZXJvZXNSZWYgPSB1c2VSZWYoaGVyb2VzIHx8IFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGJ1aWxkaW5nc1JlZi5jdXJyZW50ID0gYnVpbGRpbmdzO1xuICAgIHN0YXRlUmVmLmN1cnJlbnQuYnVpbGRpbmdzID0gYnVpbGRpbmdzO1xuICB9LCBbYnVpbGRpbmdzXSk7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW29mZnNldCwgc2V0T2Zmc2V0XSA9IHVzZVN0YXRlKHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgW3NjYWxlLCBzZXRTY2FsZV0gPSB1c2VTdGF0ZShudWxsKTsgLy8gbnVsbCB1bnRpbCBjYW52YXMgbW91bnRlZFxuICBjb25zdCBbZHJhZ2dpbmcsIHNldERyYWdnaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RyYWdTdGFydCwgc2V0RHJhZ1N0YXJ0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbW92ZUJ1aWxkaW5nLCBzZXRNb3ZlQnVpbGRpbmddID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtnaG9zdFBvcywgc2V0R2hvc3RQb3NdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtob3ZlckJ1aWxkaW5nLCBzZXRIb3ZlckJ1aWxkaW5nXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbaG92ZXJDYW52YXNQb3MsIHNldEhvdmVyQ2FudmFzUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IHN0YXRlUmVmID0gdXNlUmVmKHsgb2Zmc2V0LCBzY2FsZSwgbW92ZUJ1aWxkaW5nLCBnaG9zdFBvcywgYnVpbGRpbmdzLCBwZW5kaW5nU2hvcFBsYWNlbWVudCB9KTtcbiAgdXNlRWZmZWN0KCgpID0+IHtzdGF0ZVJlZi5jdXJyZW50ID0geyBvZmZzZXQsIHNjYWxlLCBtb3ZlQnVpbGRpbmcsIGdob3N0UG9zLCBidWlsZGluZ3MsIHBlbmRpbmdTaG9wUGxhY2VtZW50IH07fSwgW29mZnNldCwgc2NhbGUsIG1vdmVCdWlsZGluZywgZ2hvc3RQb3MsIGJ1aWxkaW5ncywgcGVuZGluZ1Nob3BQbGFjZW1lbnRdKTtcbiAgLy8gS2VlcCBoZXJvZXNSZWYgaW4gc3luYyBzbyBkcmF3QnVpbGRpbmcgYWx3YXlzIHNlZXMgZnJlc2ggaGVybyBkYXRhXG4gIHVzZUVmZmVjdCgoKSA9PiB7aGVyb2VzUmVmLmN1cnJlbnQgPSBoZXJvZXMgfHwgW107fSwgW2hlcm9lc10pO1xuXG4gIGNvbnN0IGFuaW1GcmFtZVJlZiA9IHVzZVJlZigpO1xuXG4gIGNvbnN0IHdvcmxkVG9DYW52YXMgPSB1c2VDYWxsYmFjaygod3gsIHd5LCBvZmYpID0+ICh7XG4gICAgY3g6IHd4ICsgQ0FOVkFTX09GRlNFVF9YICsgb2ZmLngsXG4gICAgY3k6IHd5ICsgQ0FOVkFTX09GRlNFVF9ZICsgb2ZmLnlcbiAgfSksIFtdKTtcblxuICBjb25zdCBjYW52YXNUb1dvcmxkID0gdXNlQ2FsbGJhY2soKGN4LCBjeSwgb2ZmLCBzYykgPT4gKHtcbiAgICB3eDogKGN4IC0gQ0FOVkFTX09GRlNFVF9YIC0gb2ZmLngpIC8gc2MsXG4gICAgd3k6IChjeSAtIENBTlZBU19PRkZTRVRfWSAtIG9mZi55KSAvIHNjXG4gIH0pLCBbXSk7XG5cbiAgY29uc3QgaXNWYWxpZFBsYWNlbWVudCA9IChneCwgZ3ksIGZ3LCBmaCwgZXhjbHVkZUlkLCBibGRncywgbW92aW5nQnVpbGRpbmdUeXBlKSA9PiB7XG4gICAgaWYgKGd4IDwgRk9SRVNUX1JJTkcgfHwgZ3kgPCBGT1JFU1RfUklORyB8fCBneCArIGZ3ID4gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcgfHwgZ3kgKyBmaCA+IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChjb25zdCBiIG9mIGJsZGdzKSB7XG4gICAgICBpZiAoYi5pZCA9PT0gZXhjbHVkZUlkKSBjb250aW51ZTtcbiAgICAgIC8vIE5vIHNwYWNpbmcgcmVxdWlyZWQgLSBvbmx5IGNoZWNrIGZvciBkaXJlY3Qgb3ZlcmxhcFxuICAgICAgaWYgKGd4IDwgYi5ncmlkX3ggKyBiLmZvb3RwcmludF93ICYmIGd4ICsgZncgPiBiLmdyaWRfeCAmJlxuICAgICAgZ3kgPCBiLmdyaWRfeSArIGIuZm9vdHByaW50X2ggJiYgZ3kgKyBmaCA+IGIuZ3JpZF95KSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGRyYXdCdWlsZGluZyA9IChjdHgsIGJ1aWxkaW5nLCBpc0dob3N0LCBpc1NlbGVjdGVkLCBpc1ZhbGlkR2hvc3QsIG9mZiwgc2MsIGNhbnZhc1csIGNhbnZhc0gsIGFsbEJ1aWxkaW5ncykgPT4ge1xuICAgIGNvbnN0IGRlZiA9IEJVSUxESU5HX0RFRlNbYnVpbGRpbmcuYnVpbGRpbmdfdHlwZV07XG4gICAgY29uc3QgY29sb3JzID0gQlVJTERJTkdfQ09MT1JTW2J1aWxkaW5nLmJ1aWxkaW5nX3R5cGVdIHx8IHsgYmc6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiIzRhNGE2ZVwiLCBpY29uOiBcIiM4ODg4Y2NcIiB9O1xuICAgIGNvbnN0IGZ3ID0gYnVpbGRpbmcuZm9vdHByaW50X3cgfHwgMjtcbiAgICBjb25zdCBmaCA9IGJ1aWxkaW5nLmZvb3RwcmludF9oIHx8IDI7XG5cbiAgICBjb25zdCB0dyA9IFRJTEVfVyAqIHNjO1xuICAgIGNvbnN0IHRoID0gVElMRV9IICogc2M7XG5cbiAgICAvLyBUaGUgZ3JpZCBkcmF3cyB0aWxlIChneCxneSkgd2l0aCBpdHMgQ0VOVEVSIGF0IGdyaWRUb1NjcmVlbihneCxneSksIHRoZW4gZHJhd3MgdGhlIGRpYW1vbmRcbiAgICAvLyB1c2luZyDCsXR3LzIgYW5kIMKxdGgvMiBvZmZzZXRzLiBTbyB0aGUgNCBhY3R1YWwgY29ybmVyIFBPSU5UUyBvZiBhIHRpbGUgYm91bmRhcnkgYXJlOlxuICAgIC8vICAgdG9wIHBvaW50IG9mIHRpbGUoZ3gsZ3kpICAgPSBjZW50ZXIgKyAoMCwgLXRoLzIpID0gZ3JpZFRvU2NyZWVuKGd4LCBneS0xKSBjZW50ZXI/IE5vIOKAlFxuICAgIC8vIFRoZSBrZXkgaW5zaWdodDogdGhlIFRPUCB2ZXJ0ZXggb2YgdGlsZShneCxneSkgaXMgdGhlIHNhbWUgcGl4ZWwgYXMgdGhlIENFTlRFUiBvZiB0aWxlKGd4LTEsZ3ktMSlcbiAgICAvLyB3aGVuIHVzaW5nIHRoaXMgaXNvIGZvcm11bGEuIEJVVCBzaW1wbGVyOiBqdXN0IGNvbXB1dGUgY29ybmVycyBmcm9tIHRoZSBmb290cHJpbnQgZGlyZWN0bHkuXG4gICAgLy9cbiAgICAvLyBGb3IgYSBmb290cHJpbnQgc3RhcnRpbmcgYXQgKGdyaWRfeCwgZ3JpZF95KSB3aXRoIHNpemUgKGZ3LCBmaCk6XG4gICAgLy8gLSBOVyBjb3JuZXIgKHRvcCBkaWFtb25kIHBvaW50KSAgPSB0b3Agb2YgdGlsZShncmlkX3gsIGdyaWRfeSkgICAgICAgICA9IGNlbnRlcihncmlkX3gsIGdyaWRfeSkgKyAoMCwgLXRoLzIpXG4gICAgLy8gICBCdXQgYWN0dWFsbHkgdGhlIHRvcCBwb2ludCBvZiB0aWxlKGd4LGd5KSBpcyB3aGVyZSBneC0xLGd5IG1lZXRzIGd4LGd5LTEgbWVldHMgZ3gsZ3kuXG4gICAgLy8gICBNb3JlIHNpbXBseTogdG9wIHZlcnRleCBvZiB0aWxlKGd4LGd5KSBpbiBzY3JlZW4gPSBncmlkVG9TY3JlZW4oZ3gsZ3kpIG9mZnNldCBieSAoMCwtdGgvMikuXG4gICAgLy8gICBBbmQgdGhlIFJJR0hUIHZlcnRleCA9IGNlbnRlciArICh0dy8yLCAwKSwgQk9UVE9NID0gY2VudGVyICsgKDAsIHRoLzIpLCBMRUZUID0gY2VudGVyICsgKC10dy8yLCAwKS5cbiAgICAvL1xuICAgIC8vIEZvciBhIG11bHRpLXRpbGUgZm9vdHByaW50LCB0aGUgNCBvdXRlciBjb3JuZXJzIGFyZTpcbiAgICAvLyAgIE5XICh0b3ApICAgID0gdG9wIHZlcnRleCBvZiB0aWxlKGdyaWRfeCwgICAgICAgZ3JpZF95KSAgICAgICA9IGNlbnRlcihneCxneSkgICAgICArICgwLCAtdGgvMilcbiAgICAvLyAgIE5FIChyaWdodCkgID0gcmlnaHQgdmVydGV4IG9mIHRpbGUoZ3JpZF94K2Z3LTEsIGdyaWRfeSkgICAgICA9IGNlbnRlcihneCtmdy0xLGd5KSArICh0dy8yLCAwKVxuICAgIC8vICAgU0UgKGJvdHRvbSkgPSBib3R0b20gdmVydGV4IG9mIHRpbGUoZ3JpZF94K2Z3LTEsIGdyaWRfeStmaC0xKT0gY2VudGVyKGd4K2Z3LTEsZ3krZmgtMSkgKyAoMCwgdGgvMilcbiAgICAvLyAgIFNXIChsZWZ0KSAgID0gbGVmdCB2ZXJ0ZXggb2YgdGlsZShncmlkX3gsICAgICAgIGdyaWRfeStmaC0xKSA9IGNlbnRlcihneCxneStmaC0xKSArICgtdHcvMiwgMClcblxuICAgIGNvbnN0IHRpbGVDZW50ZXIgPSAoZ3gsIGd5KSA9PiB7XG4gICAgICBjb25zdCBwID0gZ3JpZFRvU2NyZWVuKGd4LCBneSk7XG4gICAgICByZXR1cm4gd29ybGRUb0NhbnZhcyhwLnggKiBzYywgcC55ICogc2MsIG9mZik7XG4gICAgfTtcblxuICAgIGNvbnN0IGMwMCA9IHRpbGVDZW50ZXIoYnVpbGRpbmcuZ3JpZF94LCBidWlsZGluZy5ncmlkX3kpO1xuICAgIGNvbnN0IGNGVzAgPSB0aWxlQ2VudGVyKGJ1aWxkaW5nLmdyaWRfeCArIGZ3IC0gMSwgYnVpbGRpbmcuZ3JpZF95KTtcbiAgICBjb25zdCBjRldIID0gdGlsZUNlbnRlcihidWlsZGluZy5ncmlkX3ggKyBmdyAtIDEsIGJ1aWxkaW5nLmdyaWRfeSArIGZoIC0gMSk7XG4gICAgY29uc3QgYzBGSCA9IHRpbGVDZW50ZXIoYnVpbGRpbmcuZ3JpZF94LCBidWlsZGluZy5ncmlkX3kgKyBmaCAtIDEpO1xuICAgIGNvbnN0IGNDZW50ZXIgPSB0aWxlQ2VudGVyKGJ1aWxkaW5nLmdyaWRfeCArIGZ3IC8gMiAtIDAuNSwgYnVpbGRpbmcuZ3JpZF95ICsgZmggLyAyIC0gMC41KTtcblxuICAgIC8vIFRoZSA0IGdyb3VuZCBjb3JuZXJzIG9mIHRoZSBmb290cHJpbnQgZGlhbW9uZCwgZXhhY3RseSBtYXRjaGluZyB0aWxlIHZlcnRleCBwb3NpdGlvbnNcbiAgICBjb25zdCBnTlcgPSB7IGN4OiBjMDAuY3gsIGN5OiBjMDAuY3kgLSB0aCAvIDIgfTsgLy8gdG9wIHBvaW50XG4gICAgY29uc3QgZ05FID0geyBjeDogY0ZXMC5jeCArIHR3IC8gMiwgY3k6IGNGVzAuY3kgfTsgLy8gcmlnaHQgcG9pbnRcbiAgICBjb25zdCBnU0UgPSB7IGN4OiBjRldILmN4LCBjeTogY0ZXSC5jeSArIHRoIC8gMiB9OyAvLyBib3R0b20gcG9pbnRcbiAgICBjb25zdCBnU1cgPSB7IGN4OiBjMEZILmN4IC0gdHcgLyAyLCBjeTogYzBGSC5jeSB9OyAvLyBsZWZ0IHBvaW50XG5cbiAgICAvLyBWaXN1YWwgY2VudGVyIG9mIHRoZSBmb290cHJpbnQgZm9yIGljb25zL2JhZGdlc1xuICAgIGNvbnN0IGNlbnRlciA9IHsgY3g6IChnTlcuY3ggKyBnU0UuY3gpIC8gMiwgY3k6IChnTlcuY3kgKyBnU0UuY3kpIC8gMiB9O1xuXG4gICAgaWYgKGNlbnRlci5jeCA8IC0yMDAgfHwgY2VudGVyLmN4ID4gY2FudmFzVyArIDIwMCB8fCBjZW50ZXIuY3kgPCAtMjAwIHx8IGNlbnRlci5jeSA+IGNhbnZhc0ggKyAyMDApIHJldHVybjtcblxuICAgIC8vIFdhbGwgaGVpZ2h0IGluIHNjcmVlbiBwaXhlbHMg4oCUIHRvd24gaGFsbCBpcyA1MCUgdGFsbGVyIHRoYW4gb3RoZXIgYnVpbGRpbmdzXG4gICAgY29uc3Qgd2FsbEggPSBUSUxFX0ggKiBzYyAqIChidWlsZGluZy5idWlsZGluZ190eXBlID09PSAndG93bl9oYWxsJyA/IDIuMDggKiAxLjUgOiAyLjA4KTtcblxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IGlzR2hvc3QgPyAwLjY1IDogMS4wO1xuXG4gICAgY29uc3QgdG9wQ29sb3IgPSAhaXNHaG9zdCB8fCBpc1ZhbGlkR2hvc3QgPyBjb2xvcnMuYmcgOiBcIiMzYTAwMDBcIjtcbiAgICBjb25zdCBsZWZ0Q29sb3IgPSBzaGFkZUNvbG9yKHRvcENvbG9yLCAtNTUpOyAvLyBkYXJrZXIgc2hhZGUgZm9yIGxlZnQgZmFjZVxuICAgIGNvbnN0IHJpZ2h0Q29sb3IgPSBzaGFkZUNvbG9yKHRvcENvbG9yLCAtMzApOyAvLyBtZWRpdW0gc2hhZGUgZm9yIHJpZ2h0IGZhY2VcbiAgICBjb25zdCBncm91bmRDb2xvciA9IHNoYWRlQ29sb3IodG9wQ29sb3IsIC04MCk7IC8vIGRhcmtlc3QgZm9yIGdyb3VuZCBwbG90XG5cbiAgICAvLyBFZGdlIGNvbG9yczogdXNlIHRoZSBzb2xpZCBmYWNlIGNvbG9yIChub3QgZGFyayBib3JkZXIpXG4gICAgY29uc3QgdG9wRWRnZUNvbG9yID0gaXNTZWxlY3RlZCA/IFwiI2ZiYmYyNFwiIDpcbiAgICBpc0dob3N0ID8gaXNWYWxpZEdob3N0ID8gXCIjNGFkZTgwXCIgOiBcIiNlZjQ0NDRcIiA6XG4gICAgdG9wQ29sb3I7XG4gICAgY29uc3QgbGVmdEVkZ2VDb2xvciA9IGlzU2VsZWN0ZWQgPyBcIiNmYmJmMjRcIiA6XG4gICAgaXNHaG9zdCA/IGlzVmFsaWRHaG9zdCA/IFwiIzRhZGU4MFwiIDogXCIjZWY0NDQ0XCIgOlxuICAgIGxlZnRDb2xvcjtcbiAgICBjb25zdCByaWdodEVkZ2VDb2xvciA9IGlzU2VsZWN0ZWQgPyBcIiNmYmJmMjRcIiA6XG4gICAgaXNHaG9zdCA/IGlzVmFsaWRHaG9zdCA/IFwiIzRhZGU4MFwiIDogXCIjZWY0NDQ0XCIgOlxuICAgIHJpZ2h0Q29sb3I7XG5cbiAgICAvLyDilIDilIAgQ2hlY2sgZm9yIHNwcml0ZSBGSVJTVCDilIDilIBcbiAgICBjb25zdCBwdWJJbWcgPSAhaXNHaG9zdCA/IGdldENhY2hlZFB1Ymxpc2hlZEJ1aWxkaW5nKGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUsIGJ1aWxkaW5nLmxldmVsKSA6IG51bGw7XG4gICAgY29uc3QgZHJhZnRJbWcgPSAhaXNHaG9zdCAmJiAhcHViSW1nID8gZ2V0Q2FjaGVkSW1hZ2UoYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSwgYnVpbGRpbmcubGV2ZWwpIDogbnVsbDtcbiAgICBjb25zdCBzcHJpdGVJbWcgPSBwdWJJbWcgfHwgZHJhZnRJbWc7XG4gICAgY29uc3QgaGFzU3ByaXRlID0gc3ByaXRlSW1nICYmIHNwcml0ZUltZy5jb21wbGV0ZSAmJiBzcHJpdGVJbWcubmF0dXJhbFdpZHRoID4gMDtcblxuICAgIC8vIOKUgOKUgCBTVEVQIDHigJM1OiBPbmx5IGRyYXcgM0QgZ2VvbWV0cnkgaWYgTk8gc3ByaXRlIGlzIHByZXNlbnQg4pSA4pSAXG4gICAgaWYgKCFoYXNTcHJpdGUpIHtcbiAgICAgIC8vIOKUgOKUgCBTVEVQIDE6IERyYXcgZ3JvdW5kLWxldmVsIHBsb3Qgb3V0bGluZSAodGhlIFwibGFuZCBwbG90XCIpIOKUgOKUgFxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhnTlcuY3gsIGdOVy5jeSk7XG4gICAgICBjdHgubGluZVRvKGdORS5jeCwgZ05FLmN5KTtcbiAgICAgIGN0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gZ3JvdW5kQ29sb3I7XG4gICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAvLyDilIDilIAgU1RFUCAyOiBMRUZUIGZhY2Ug4oCUIFNXIGdyb3VuZCBlZGdlIGV4dHJ1ZGVkIFVQV0FSRCDilIDilIBcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ1NXLmN4LCBnU1cuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSk7XG4gICAgICBjdHgubGluZVRvKGdTRS5jeCwgZ1NFLmN5IC0gd2FsbEgpO1xuICAgICAgY3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSAtIHdhbGxIKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBsZWZ0Q29sb3I7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGVmdEVkZ2VDb2xvcjtcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAvLyDilIDilIAgU1RFUCAzOiBSSUdIVCBmYWNlIOKAlCBTRSBncm91bmQgZWRnZSBleHRydWRlZCBVUFdBUkQg4pSA4pSAXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGdORS5jeCwgZ05FLmN5KTtcbiAgICAgIGN0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSAtIHdhbGxIKTtcbiAgICAgIGN0eC5saW5lVG8oZ05FLmN4LCBnTkUuY3kgLSB3YWxsSCk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gcmlnaHRDb2xvcjtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSByaWdodEVkZ2VDb2xvcjtcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAvLyDilIDilIAgU1RFUCA0OiBUT1AgZmFjZSDigJQgZm9vdHByaW50IGRpYW1vbmQgc2hpZnRlZCB1cCBieSB3YWxsSCDilIDilIBcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZ05XLmN4LCBnTlcuY3kgLSB3YWxsSCk7XG4gICAgICBjdHgubGluZVRvKGdORS5jeCwgZ05FLmN5IC0gd2FsbEgpO1xuICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSAtIHdhbGxIKTtcbiAgICAgIGN0eC5saW5lVG8oZ1NXLmN4LCBnU1cuY3kgLSB3YWxsSCk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gdG9wQ29sb3I7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdG9wRWRnZUNvbG9yO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IGlzU2VsZWN0ZWQgPyAyLjUgOiAxLjU7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIOKUgOKUgCBTVEVQIDU6IFJvb2Z0b3AgaW5uZXIgZGV0YWlsIChpbnNldCBkaWFtb25kKSDilIDilIBcbiAgICAgIGNvbnN0IGkgPSAwLjI7XG4gICAgICBjb25zdCBsZXJwID0gKGEsIGIsIHQpID0+ICh7IGN4OiBhLmN4ICsgKGIuY3ggLSBhLmN4KSAqIHQsIGN5OiBhLmN5ICsgKGIuY3kgLSBhLmN5KSAqIHQgfSk7XG4gICAgICBjb25zdCB0TlcgPSB7IGN4OiBnTlcuY3gsIGN5OiBnTlcuY3kgLSB3YWxsSCB9O1xuICAgICAgY29uc3QgdE5FID0geyBjeDogZ05FLmN4LCBjeTogZ05FLmN5IC0gd2FsbEggfTtcbiAgICAgIGNvbnN0IHRTRSA9IHsgY3g6IGdTRS5jeCwgY3k6IGdTRS5jeSAtIHdhbGxIIH07XG4gICAgICBjb25zdCB0U1cgPSB7IGN4OiBnU1cuY3gsIGN5OiBnU1cuY3kgLSB3YWxsSCB9O1xuICAgICAgY29uc3QgaU5XID0gbGVycChsZXJwKHROVywgdE5FLCBpKSwgbGVycCh0U1csIHRTRSwgaSksIGkpO1xuICAgICAgY29uc3QgaU5FID0gbGVycChsZXJwKHROVywgdE5FLCAxIC0gaSksIGxlcnAodFNXLCB0U0UsIDEgLSBpKSwgaSk7XG4gICAgICBjb25zdCBpU0UgPSBsZXJwKGxlcnAodE5XLCB0TkUsIDEgLSBpKSwgbGVycCh0U1csIHRTRSwgMSAtIGkpLCAxIC0gaSk7XG4gICAgICBjb25zdCBpU1cgPSBsZXJwKGxlcnAodE5XLCB0TkUsIGkpLCBsZXJwKHRTVywgdFNFLCBpKSwgMSAtIGkpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpTlcuY3gsIGlOVy5jeSk7XG4gICAgICBjdHgubGluZVRvKGlORS5jeCwgaU5FLmN5KTtcbiAgICAgIGN0eC5saW5lVG8oaVNFLmN4LCBpU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhpU1cuY3gsIGlTVy5jeSk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gc2hhZGVDb2xvcih0b3BDb2xvciwgMjApO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjEpXCI7XG4gICAgICBjdHgubGluZVdpZHRoID0gMC44O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8vIOKUgOKUgCBTVEVQIDY6IFB1Ymxpc2hlZCBzcHJpdGUg4oaSIGRyYWZ0IHNwcml0ZSDihpIgZW1vamkgaWNvbiDilIDilIBcblxuICAgIC8vIEhlbHBlcjogZHJhdyBzcHJpdGUgdG8gZmlsbCBlbnRpcmUgYnVpbGRpbmcgdm9sdW1lIChncm91bmQgdG8gdG9wKVxuICAgIGNvbnN0IGRyYXdTcHJpdGVGdWxsID0gKGltZykgPT4ge1xuICAgICAgY29uc3QgbWluWCA9IE1hdGgubWluKGdOVy5jeCwgZ1NXLmN4KTtcbiAgICAgIGNvbnN0IG1heFggPSBNYXRoLm1heChnTkUuY3gsIGdTRS5jeCk7XG4gICAgICBjb25zdCBtaW5ZID0gTWF0aC5taW4oZ05XLmN5LCBnTkUuY3kpIC0gd2FsbEg7XG4gICAgICBjb25zdCBtYXhZID0gTWF0aC5tYXgoZ1NFLmN5LCBnU1cuY3kpO1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIG1pblgsIG1pblksIG1heFggLSBtaW5YLCBtYXhZIC0gbWluWSk7XG4gICAgfTtcblxuICAgIGlmIChoYXNTcHJpdGUpIHtcbiAgICAgIGRyYXdTcHJpdGVGdWxsKHNwcml0ZUltZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGljb25TaXplID0gTWF0aC5tYXgoNiwgTWF0aC5taW4oZncgKiB0dyAqIDAuMjIsIDIwICogc2MpKTtcbiAgICAgIGN0eC5mb250ID0gYCR7aWNvblNpemV9cHggc2VyaWZgO1xuICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICAgIGN0eC5maWxsVGV4dChkZWY/Lmljb24gfHwgXCI/XCIsIGNlbnRlci5jeCwgY2VudGVyLmN5IC0gd2FsbEgpO1xuICAgIH1cblxuICAgIC8vIOKUgOKUgCBTVEVQIDZiOiBIZXJvIHNwcml0ZSBvbiBoZXJvX2Jhc2Ug4oCUIGFsd2F5cyByZW5kZXJlZCBBQk9WRSB0aGUgYnVpbGRpbmcg4pSA4pSAXG4gICAgaWYgKCFpc0dob3N0ICYmIGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdoZXJvX2Jhc2UnICYmIGFsbEJ1aWxkaW5ncykge1xuICAgICAgY29uc3Qgc3RhdGlvbmVkSGVybyA9IGhlcm9lc1JlZi5jdXJyZW50Py5maW5kKChoKSA9PiBoLnN0YXRpb25lZF9hdF9idWlsZGluZ19pZCA9PT0gYnVpbGRpbmcuaWQpO1xuICAgICAgaWYgKHN0YXRpb25lZEhlcm8pIHtcbiAgICAgICAgY29uc3QgaGVyb1R5cGUgPSBzdGF0aW9uZWRIZXJvLmhlcm9fdHlwZSB8fCBzdGF0aW9uZWRIZXJvLnBvcnRyYWl0O1xuICAgICAgICAvLyBQcmVmZXIgcHVibGlzaGVkIGhlcm8gc3ByaXRlLCBmYWxsIGJhY2sgdG8gZHJhZnRcbiAgICAgICAgY29uc3QgcHViSGVyb0ltZyA9IGhlcm9UeXBlID8gZ2V0Q2FjaGVkUHVibGlzaGVkSGVybyhoZXJvVHlwZSwgXCJTXCIpIDogbnVsbDtcbiAgICAgICAgY29uc3QgZHJhZnRIZXJvSW1nID0gIXB1Ykhlcm9JbWcgJiYgaGVyb1R5cGUgPyBnZXRDYWNoZWRIZXJvSW1hZ2UoaGVyb1R5cGUsIFwiU1wiKSA6IG51bGw7XG4gICAgICAgIGNvbnN0IGhlcm9JbWcgPSBwdWJIZXJvSW1nIHx8IGRyYWZ0SGVyb0ltZztcbiAgICAgICAgaWYgKGhlcm9JbWcgJiYgaGVyb0ltZy5jb21wbGV0ZSAmJiBoZXJvSW1nLm5hdHVyYWxXaWR0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBoZXJvU2l6ZSA9IE1hdGgubWF4KHR3LCB0aCkgKiAxLjIgKiBzYztcbiAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgIC8vIEhlcm8gcmVuZGVycyBBQk9WRSB0aGUgYnVpbGRpbmcgKGhpZ2hlciB5IG9mZnNldCkgc28gaXQgYXBwZWFycyBpbiBmcm9udFxuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaGVyb0ltZyxcbiAgICAgICAgICBjZW50ZXIuY3ggLSBoZXJvU2l6ZSAvIDIsXG4gICAgICAgICAgY2VudGVyLmN5IC0gd2FsbEggLSBoZXJvU2l6ZSAqIDEuNCxcbiAgICAgICAgICBoZXJvU2l6ZSwgaGVyb1NpemUgKiAxLjVcbiAgICAgICAgICApO1xuICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDilIDilIAgU1RFUCA3OiBMZXZlbCBiYWRnZSBhdCBORSB0b3AgY29ybmVyIOKUgOKUgFxuICAgIGlmICghaXNHaG9zdCAmJiBidWlsZGluZy5sZXZlbCA+IDEpIHtcbiAgICAgIGNvbnN0IHIgPSA3ICogc2M7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjMGQwZDFhXCI7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcnMuYm9yZGVyO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKGdORS5jeCwgZ05FLmN5IC0gd2FsbEggLSByLCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LmZvbnQgPSBgYm9sZCAke01hdGgubWF4KDUsIDYgKiBzYyl9cHggc2Fucy1zZXJpZmA7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmJiZjI0XCI7XG4gICAgICBjdHguZmlsbFRleHQoYnVpbGRpbmcubGV2ZWwsIGdORS5jeCwgZ05FLmN5IC0gd2FsbEggLSByKTtcbiAgICB9XG5cbiAgICAvLyDilIDilIAgU1RFUCA4OiBVcGdyYWRpbmcgaW5kaWNhdG9yIOKUgOKUgFxuICAgIGlmIChidWlsZGluZy5pc191cGdyYWRpbmcpIHtcbiAgICAgIGN0eC5mb250ID0gYCR7TWF0aC5tYXgoOCwgMTEgKiBzYyl9cHggc2VyaWZgO1xuICAgICAgY3R4LmZpbGxUZXh0KFwi4pqZ77iPXCIsIGNlbnRlci5jeCwgZ05XLmN5IC0gd2FsbEggLSAxMCAqIHNjKTtcbiAgICB9XG5cbiAgICAvLyDilIDilIAgU1RFUCA5OiBTZWxlY3Rpb24gZGFzaGVkIG91dGxpbmUgYXQgQkFTRSAoZ3JvdW5kIGxldmVsKSDilIDilIBcbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmJiZjI0XCI7XG4gICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbNCwgM10pO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC44O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhnTlcuY3gsIGdOVy5jeSk7XG4gICAgICBjdHgubGluZVRvKGdORS5jeCwgZ05FLmN5KTtcbiAgICAgIGN0eC5saW5lVG8oZ1NFLmN4LCBnU0UuY3kpO1xuICAgICAgY3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSk7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuICAgIH1cblxuICAgIC8vIOKUgOKUgCBTVEVQIDEwOiBXYWxsIGxpbmsgbGF5ZXJzIOKUgOKUgFxuICAgIGlmICghaXNHaG9zdCAmJiBidWlsZGluZy5idWlsZGluZ190eXBlID09PSAnd2FsbCcgJiYgYWxsQnVpbGRpbmdzKSB7XG4gICAgICAvLyBEZXRlY3QgbmVpZ2hib3JzOiBzdz0oLTEsMCksIHNlPSgwLC0xKSwgbnc9KDAsMSksIG5lPSgxLDApIGluIGlzbyBncmlkIHRlcm1zXG4gICAgICAvLyBJbiBpc29tZXRyaWM6IHN3ID0gd2FsbCBhdCAoZ3gtMSwgZ3kpLCBzZSA9IChneCwgZ3ktMSksIG53ID0gKGd4LCBneSsxKSwgbmUgPSAoZ3grMSwgZ3kpXG4gICAgICBjb25zdCB3YWxsU2V0ID0gbmV3IFNldChhbGxCdWlsZGluZ3MuZmlsdGVyKChiKSA9PiBiLmJ1aWxkaW5nX3R5cGUgPT09ICd3YWxsJykubWFwKChiKSA9PiBgJHtiLmdyaWRfeH0sJHtiLmdyaWRfeX1gKSk7XG4gICAgICBjb25zdCBneCA9IGJ1aWxkaW5nLmdyaWRfeCxneSA9IGJ1aWxkaW5nLmdyaWRfeTtcbiAgICAgIGNvbnN0IG5laWdoYm9ycyA9IHtcbiAgICAgICAgc3c6IHdhbGxTZXQuaGFzKGAke2d4IC0gMX0sJHtneX1gKSxcbiAgICAgICAgc2U6IHdhbGxTZXQuaGFzKGAke2d4fSwke2d5IC0gMX1gKSxcbiAgICAgICAgbnc6IHdhbGxTZXQuaGFzKGAke2d4fSwke2d5ICsgMX1gKSxcbiAgICAgICAgbmU6IHdhbGxTZXQuaGFzKGAke2d4ICsgMX0sJHtneX1gKVxuICAgICAgfTtcbiAgICAgIGZvciAoY29uc3QgW2xheWVyLCBhY3RpdmVdIG9mIE9iamVjdC5lbnRyaWVzKG5laWdoYm9ycykpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIGNvbnRpbnVlO1xuICAgICAgICAvLyBQcmVmZXIgcHVibGlzaGVkIHdhbGwgbGF5ZXIsIGZhbGwgYmFjayB0byBkcmFmdFxuICAgICAgICBjb25zdCBwdWJMYXllckltZyA9IGdldENhY2hlZFB1Ymxpc2hlZFdhbGxMYXllcihidWlsZGluZy5sZXZlbCwgbGF5ZXIpO1xuICAgICAgICBjb25zdCBkcmFmdExheWVySW1nID0gIXB1YkxheWVySW1nID8gZ2V0Q2FjaGVkV2FsbExheWVySW1hZ2UoYnVpbGRpbmcubGV2ZWwsIGxheWVyKSA6IG51bGw7XG4gICAgICAgIGNvbnN0IGxheWVySW1nID0gcHViTGF5ZXJJbWcgfHwgZHJhZnRMYXllckltZztcbiAgICAgICAgaWYgKCFsYXllckltZyB8fCAhbGF5ZXJJbWcuY29tcGxldGUgfHwgIWxheWVySW1nLm5hdHVyYWxXaWR0aCkgY29udGludWU7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhnTlcuY3gsIGdOVy5jeSAtIHdhbGxIKTtcbiAgICAgICAgY3R4LmxpbmVUbyhnTkUuY3gsIGdORS5jeSAtIHdhbGxIKTtcbiAgICAgICAgY3R4LmxpbmVUbyhnU0UuY3gsIGdTRS5jeSAtIHdhbGxIKTtcbiAgICAgICAgY3R4LmxpbmVUbyhnU1cuY3gsIGdTVy5jeSAtIHdhbGxIKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguY2xpcCgpO1xuICAgICAgICBjb25zdCB0b3BNaW5YID0gTWF0aC5taW4oZ05XLmN4LCBnU1cuY3gpO1xuICAgICAgICBjb25zdCB0b3BNaW5ZID0gTWF0aC5taW4oZ05XLmN5LCBnTkUuY3kpIC0gd2FsbEg7XG4gICAgICAgIGNvbnN0IHRvcFcgPSBNYXRoLm1heChnTkUuY3gsIGdTRS5jeCkgLSB0b3BNaW5YO1xuICAgICAgICBjb25zdCB0b3BIID0gTWF0aC5tYXgoZ1NFLmN5LCBnU1cuY3kpIC0gd2FsbEggLSB0b3BNaW5ZO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UobGF5ZXJJbWcsIHRvcE1pblgsIHRvcE1pblksIHRvcFcsIHRvcEgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcbiAgfTtcblxuICBjb25zdCBkcmF3R3JpZCA9IHVzZUNhbGxiYWNrKChjdHgsIHcsIGgsIG9mZiwgc2MsIGJsZGdzLCBzZWxCLCBtb3ZCLCBnaG9zdCkgPT4ge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzFhMmYxYVwiO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3LCBoKTtcblxuICAgIGZvciAobGV0IGd5ID0gMDsgZ3kgPCBHUklEX1NJWkU7IGd5KyspIHtcbiAgICAgIGZvciAobGV0IGd4ID0gMDsgZ3ggPCBHUklEX1NJWkU7IGd4KyspIHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBncmlkVG9TY3JlZW4oZ3gsIGd5KTtcbiAgICAgICAgY29uc3QgdHcgPSBUSUxFX1cgKiBzYztcbiAgICAgICAgY29uc3QgdGggPSBUSUxFX0ggKiBzYztcbiAgICAgICAgY29uc3QgeyBjeCwgY3kgfSA9IHdvcmxkVG9DYW52YXMoeCAqIHNjLCB5ICogc2MsIG9mZik7XG5cbiAgICAgICAgaWYgKGN4IDwgLXR3ICogMiB8fCBjeCA+IHcgKyB0dyAqIDIgfHwgY3kgPCAtdGggKiAyIHx8IGN5ID4gaCArIHRoICogMikgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgaW5Gb3Jlc3QgPSBneCA8IEZPUkVTVF9SSU5HIHx8IGd5IDwgRk9SRVNUX1JJTkcgfHwgZ3ggPj0gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcgfHwgZ3kgPj0gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkc7XG4gICAgICAgIGNvbnN0IGlzVmVyeUVkZ2UgPSBneCA8IDIgfHwgZ3kgPCAyIHx8IGd4ID49IEdSSURfU0laRSAtIDIgfHwgZ3kgPj0gR1JJRF9TSVpFIC0gMjtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3gsIGN5IC0gdGggLyAyKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHR3IC8gMiwgY3kpO1xuICAgICAgICBjdHgubGluZVRvKGN4LCBjeSArIHRoIC8gMik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSB0dyAvIDIsIGN5KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIGlmIChpc1ZlcnlFZGdlKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzBkMWYwZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGluRm9yZXN0KSB7XG4gICAgICAgICAgY29uc3QgZm9yZXN0Q29sb3JzID0gW1wiIzFhM2QxYVwiLCBcIiMxNjM1MTZcIiwgXCIjMWU0MDIwXCIsIFwiIzE4MzgxOFwiXTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZm9yZXN0Q29sb3JzWyhneCAqIDMgKyBneSAqIDcpICUgNF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IChneCArIGd5KSAlIDIgPT09IDAgPyBcIiMyZDVhMjdcIiA6IFwiIzI4NTIyNFwiO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgaWYgKCFpbkZvcmVzdCkge1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjE1KVwiO1xuICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAwLjU7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJlZXMgb24gZm9yZXN0IHJpbmdcbiAgICBjb25zdCB0cmVlUm5nID0gKGd4LCBneSkgPT4gKGd4ICogMzc0NzYxMzkzICsgZ3kgKiAxMjM0NTY3ODkxICYgMHg3ZmZmZmZmZikgLyAweDdmZmZmZmZmO1xuICAgIGZvciAobGV0IGd5ID0gMDsgZ3kgPCBHUklEX1NJWkU7IGd5KyspIHtcbiAgICAgIGZvciAobGV0IGd4ID0gMDsgZ3ggPCBHUklEX1NJWkU7IGd4KyspIHtcbiAgICAgICAgY29uc3QgaW5Gb3Jlc3QgPSBneCA8IEZPUkVTVF9SSU5HIHx8IGd5IDwgRk9SRVNUX1JJTkcgfHwgZ3ggPj0gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkcgfHwgZ3kgPj0gR1JJRF9TSVpFIC0gRk9SRVNUX1JJTkc7XG4gICAgICAgIGlmICghaW5Gb3Jlc3QpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBybmQgPSB0cmVlUm5nKGd4LCBneSk7XG4gICAgICAgIGlmIChybmQgPiAwLjQ1KSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBncmlkVG9TY3JlZW4oZ3gsIGd5KTtcbiAgICAgICAgY29uc3QgdHcgPSBUSUxFX1cgKiBzYztcbiAgICAgICAgY29uc3QgdGggPSBUSUxFX0ggKiBzYztcbiAgICAgICAgY29uc3QgeyBjeCwgY3kgfSA9IHdvcmxkVG9DYW52YXMoeCAqIHNjLCB5ICogc2MsIG9mZik7XG4gICAgICAgIGlmIChjeCA8IC10dyAqIDMgfHwgY3ggPiB3ICsgdHcgKiAzIHx8IGN5IDwgLXRoICogNiB8fCBjeSA+IGggKyB0aCAqIDMpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHRyZWVIID0gKHRoICogMi41ICsgcm5kICogdGggKiAyKSAqIDAuNztcbiAgICAgICAgY29uc3QgdHJlZVcgPSB0dyAqIDAuNCArIHJuZCAqIHR3ICogMC4yO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjg1ICsgcm5kICogMC4xNTtcblxuICAgICAgICAvLyBUcnVua1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjM2QyYjFhXCI7XG4gICAgICAgIGN0eC5maWxsUmVjdChjeCAtIHR3ICogMC4wNCwgY3kgLSB0aCAqIDAuMiwgdHcgKiAwLjA4LCB0aCAqIDAuMzUpO1xuXG4gICAgICAgIC8vIENhbm9weVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gcm5kID4gMC4zID8gXCIjMWE0ZDFhXCIgOiBcIiMxZTVjMWVcIjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGN4LCBjeSAtIHRyZWVIKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHRyZWVXICogMC42LCBjeSAtIHRyZWVIICogMC41KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRyZWVXICogMC42LCBjeSAtIHRyZWVIICogMC41KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBybmQgPiAwLjMgPyBcIiMyNDZiMjRcIiA6IFwiIzJkN2EyZFwiO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3gsIGN5IC0gdHJlZUggKiAwLjcpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgdHJlZVcgKiAwLjc1LCBjeSAtIHRyZWVIICogMC4yNSk7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSB0cmVlVyAqIDAuNzUsIGN5IC0gdHJlZUggKiAwLjI1KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCdWlsZGluZ3Mgc29ydGVkIGJ5IGRlcHRoIChwYWludGVyJ3MgYWxnb3JpdGhtOiBOVyBmaXJzdCwgU0UgbGFzdClcbiAgICAvLyBVc2UgZ3JpZF94ICsgZ3JpZF95IGFzIHRoZSBpc29tZXRyaWMgZGVwdGgga2V5XG4gICAgY29uc3Qgc29ydGVkID0gWy4uLmJsZGdzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkZXB0aEEgPSBhLmdyaWRfeCArIGEuZm9vdHByaW50X3cgKyAoYS5ncmlkX3kgKyBhLmZvb3RwcmludF9oKTtcbiAgICAgIGNvbnN0IGRlcHRoQiA9IGIuZ3JpZF94ICsgYi5mb290cHJpbnRfdyArIChiLmdyaWRfeSArIGIuZm9vdHByaW50X2gpO1xuICAgICAgcmV0dXJuIGRlcHRoQSAtIGRlcHRoQjtcbiAgICB9KTtcbiAgICBzb3J0ZWQuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgaWYgKG1vdkIgJiYgYi5pZCA9PT0gbW92Qi5pZCkgcmV0dXJuO1xuICAgICAgZHJhd0J1aWxkaW5nKGN0eCwgYiwgZmFsc2UsIGIuaWQgPT09IHNlbEI/LmlkLCB0cnVlLCBvZmYsIHNjLCB3LCBoLCBibGRncyk7XG4gICAgfSk7XG5cbiAgICBpZiAoZ2hvc3QgJiYgbW92Qikge1xuICAgICAgY29uc3QgZ2hvc3RCID0geyAuLi5tb3ZCLCBncmlkX3g6IGdob3N0Lmd4LCBncmlkX3k6IGdob3N0Lmd5IH07XG4gICAgICBjb25zdCB2YWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoZ2hvc3QuZ3gsIGdob3N0Lmd5LCBtb3ZCLmZvb3RwcmludF93LCBtb3ZCLmZvb3RwcmludF9oLCBtb3ZCLmlkLCBibGRncywgbW92Qi5idWlsZGluZ190eXBlKTtcbiAgICAgIGRyYXdCdWlsZGluZyhjdHgsIGdob3N0QiwgdHJ1ZSwgZmFsc2UsIHZhbGlkLCBvZmYsIHNjLCB3LCBoLCBibGRncyk7XG4gICAgfVxuXG4gIH0sIFt3b3JsZFRvQ2FudmFzXSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBzY2FsZSAmIG9mZnNldCB0byBzaG93IHRoZSBmdWxsIGdyaWQgY2VudGVyZWQg4oCUIHRoaXMgaXMgYWxzbyB0aGUgTUFYIHpvb20tb3V0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBiYXNlU2NhbGUgPSBnZXRCYXNlU2NhbGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBzZXRTY2FsZShiYXNlU2NhbGUpO1xuICAgIC8vIENlbnRlciB0aGUgZ3JpZDogdGhlIGlzbyBncmlkIGNlbnRlciBpbiB3b3JsZCBzcGFjZSBpcyBhdCBncmlkVG9TY3JlZW4oR1JJRF9TSVpFLzIsIEdSSURfU0laRS8yKVxuICAgIGNvbnN0IGNlbnRlclAgPSBncmlkVG9TY3JlZW4oR1JJRF9TSVpFIC8gMiwgR1JJRF9TSVpFIC8gMik7XG4gICAgc2V0T2Zmc2V0KHtcbiAgICAgIHg6IGNhbnZhcy53aWR0aCAvIDIgLSAoY2VudGVyUC54ICogYmFzZVNjYWxlICsgQ0FOVkFTX09GRlNFVF9YKSxcbiAgICAgIHk6IGNhbnZhcy5oZWlnaHQgLyAyIC0gKGNlbnRlclAueSAqIGJhc2VTY2FsZSArIENBTlZBU19PRkZTRVRfWSlcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIEFuaW1hdGlvbiBsb29wXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IG9mZnNldDogb2ZmLCBzY2FsZTogc2MsIG1vdmVCdWlsZGluZzogbW92QiwgZ2hvc3RQb3M6IGdob3N0LCBidWlsZGluZ3M6IGJsZGdzIH0gPSBzdGF0ZVJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFzYykge2FuaW1GcmFtZVJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO3JldHVybjt9XG4gICAgICBkcmF3R3JpZChjdHgsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgb2ZmLCBzYywgYmxkZ3MsIHNlbGVjdGVkQnVpbGRpbmcsIG1vdkIsIGdob3N0KTtcbiAgICAgIGFuaW1GcmFtZVJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIH07XG4gICAgZHJhdygpO1xuICAgIHJldHVybiAoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltRnJhbWVSZWYuY3VycmVudCk7XG4gIH0sIFtkcmF3R3JpZCwgc2VsZWN0ZWRCdWlsZGluZ10pO1xuXG4gIC8vIFNjcm9sbCB0byB6b29tIOKAlCBNQVggem9vbS1vdXQgPSBmdWxsIGdyaWQgdmlldywgY2FuIG9ubHkgem9vbSBJTiBmcm9tIHRoZXJlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcblxuICAgIGNvbnN0IE1JTl9TQ0FMRSA9IGdldEJhc2VTY2FsZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOyAvLyBmdWxsLWdyaWQgdmlldyA9IG1vc3Qgem9vbWVkIG91dFxuICAgIGNvbnN0IE1BWF9TQ0FMRSA9IE1JTl9TQ0FMRSAqIDU7IC8vIDXDlyB6b29tIGluIG1heFxuXG4gICAgY29uc3QgY2xhbXBPZmZzZXQgPSAob3gsIG95LCBzYykgPT4ge1xuICAgICAgY29uc3QgUEFEID0gMjA7XG4gICAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xuICAgICAgY29uc3QgaCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgIGNvbnN0IGNvcm5lcnMgPSBbXG4gICAgICBncmlkVG9TY3JlZW4oMCwgMCksXG4gICAgICBncmlkVG9TY3JlZW4oR1JJRF9TSVpFIC0gMSwgMCksXG4gICAgICBncmlkVG9TY3JlZW4oR1JJRF9TSVpFIC0gMSwgR1JJRF9TSVpFIC0gMSksXG4gICAgICBncmlkVG9TY3JlZW4oMCwgR1JJRF9TSVpFIC0gMSldLlxuICAgICAgbWFwKChwKSA9PiAoe1xuICAgICAgICBjeDogcC54ICogc2MgKyBDQU5WQVNfT0ZGU0VUX1ggKyBveCxcbiAgICAgICAgY3k6IHAueSAqIHNjICsgQ0FOVkFTX09GRlNFVF9ZICsgb3lcbiAgICAgIH0pKTtcblxuICAgICAgY29uc3QgbWluQ1ggPSBNYXRoLm1pbiguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeCkpO1xuICAgICAgY29uc3QgbWF4Q1ggPSBNYXRoLm1heCguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeCkpO1xuICAgICAgY29uc3QgbWluQ1kgPSBNYXRoLm1pbiguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeSkpO1xuICAgICAgY29uc3QgbWF4Q1kgPSBNYXRoLm1heCguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeSkpO1xuXG4gICAgICBsZXQgZHggPSAwLGR5ID0gMDtcblxuICAgICAgLy8gWDogaWYgdGhlIHdob2xlIGdyaWQgZml0cyBpbiB2aWV3cG9ydCwga2VlcCBpdCBpbnNpZGU7IGlmIHdpZGVyIHRoYW4gdmlld3BvcnQsIGNsYW1wIHNvIGVkZ2Ugc3RheXMgaW4gdmlld1xuICAgICAgaWYgKG1heENYIC0gbWluQ1ggPD0gdyAtIFBBRCAqIDIpIHtcbiAgICAgICAgLy8gR3JpZCBmaXRzIGhvcml6b250YWxseSDigJQga2VlcCBpdCBmdWxseSBpbnNpZGVcbiAgICAgICAgaWYgKG1pbkNYIDwgUEFEKSBkeCA9IFBBRCAtIG1pbkNYO1xuICAgICAgICBpZiAobWF4Q1ggPiB3IC0gUEFEKSBkeCA9IHcgLSBQQUQgLSBtYXhDWDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEdyaWQgd2lkZXIgdGhhbiB2aWV3cG9ydCDigJQgZG9uJ3QgbGV0IG9uZSBlZGdlIGdvIHBhc3QgdGhlIGZhciBzaWRlXG4gICAgICAgIGlmIChtaW5DWCA+IFBBRCkgZHggPSBQQUQgLSBtaW5DWDtcbiAgICAgICAgaWYgKG1heENYIDwgdyAtIFBBRCkgZHggPSB3IC0gUEFEIC0gbWF4Q1g7XG4gICAgICB9XG5cbiAgICAgIC8vIFk6IHNhbWUgbG9naWNcbiAgICAgIGlmIChtYXhDWSAtIG1pbkNZIDw9IGggLSBQQUQgKiAyKSB7XG4gICAgICAgIGlmIChtaW5DWSA8IFBBRCkgZHkgPSBQQUQgLSBtaW5DWTtcbiAgICAgICAgaWYgKG1heENZID4gaCAtIFBBRCkgZHkgPSBoIC0gUEFEIC0gbWF4Q1k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluQ1kgPiBQQUQpIGR5ID0gUEFEIC0gbWluQ1k7XG4gICAgICAgIGlmIChtYXhDWSA8IGggLSBQQUQpIGR5ID0gaCAtIFBBRCAtIG1heENZO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyB4OiBveCArIGR4LCB5OiBveSArIGR5IH07XG4gICAgfTtcblxuICAgIGNvbnN0IG9uV2hlZWwgPSAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG14ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgY29uc3QgbXkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgICAgLy8gUmVhZCBjdXJyZW50IHZhbHVlcyBzeW5jaHJvbm91c2x5IGZyb20gcmVmIHRvIGF2b2lkIHN0YWxlIGNsb3N1cmVzXG4gICAgICBjb25zdCB7IHNjYWxlOiBwcmV2U2NhbGUsIG9mZnNldDogcHJldk9mZiB9ID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICAgIGlmICghcHJldlNjYWxlKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDAuOTtcbiAgICAgIGNvbnN0IG5ld1NjYWxlID0gTWF0aC5tYXgoTUlOX1NDQUxFLCBNYXRoLm1pbihNQVhfU0NBTEUsIHByZXZTY2FsZSAqIGZhY3RvcikpO1xuXG4gICAgICAvLyBab29tIHRvd2FyZCBtb3VzZSBwb2ludGVyXG4gICAgICBjb25zdCByYXdPZmYgPSB7XG4gICAgICAgIHg6IG14IC0gKG14IC0gcHJldk9mZi54KSAqIChuZXdTY2FsZSAvIHByZXZTY2FsZSksXG4gICAgICAgIHk6IG15IC0gKG15IC0gcHJldk9mZi55KSAqIChuZXdTY2FsZSAvIHByZXZTY2FsZSlcbiAgICAgIH07XG5cbiAgICAgIC8vIENsYW1wIHNvIGdyaWQgY2FuJ3Qgem9vbS9wYW4gb3V0IG9mIHZpZXdcbiAgICAgIGNvbnN0IGNsYW1wZWRPZmYgPSBjbGFtcE9mZnNldChyYXdPZmYueCwgcmF3T2ZmLnksIG5ld1NjYWxlKTtcblxuICAgICAgc2V0U2NhbGUobmV3U2NhbGUpO1xuICAgICAgc2V0T2Zmc2V0KGNsYW1wZWRPZmYpO1xuICAgIH07XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBvbldoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIHJldHVybiAoKSA9PiBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIG9uV2hlZWwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZ2V0Q2FudmFzUG9zID0gKGUpID0+IHtcbiAgICBjb25zdCByZWN0ID0gY2FudmFzUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXM/LlswXSB8fCBlO1xuICAgIHJldHVybiB7IGN4OiB0b3VjaC5jbGllbnRYIC0gcmVjdC5sZWZ0LCBjeTogdG91Y2guY2xpZW50WSAtIHJlY3QudG9wIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0QnVpbGRpbmdBdCA9IChjeFAsIGN5UCkgPT4ge1xuICAgIGNvbnN0IHsgb2Zmc2V0OiBvZmYsIHNjYWxlOiBzYywgYnVpbGRpbmdzOiBibGRncyB9ID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICBjb25zdCB0dyA9IFRJTEVfVyAqIHNjO1xuICAgIGNvbnN0IHRoID0gVElMRV9IICogc2M7XG5cbiAgICAvLyBQb2ludC1pbi1kaWFtb25kIHRlc3QgZm9yIGEgYnVpbGRpbmcncyB0b3AgZmFjZSBhbmQgc2lkZSBmYWNlc1xuICAgIGNvbnN0IGhpdEJ1aWxkaW5nID0gKGIpID0+IHtcbiAgICAgIGNvbnN0IGZ3ID0gYi5mb290cHJpbnRfdyB8fCAyO1xuICAgICAgY29uc3QgZmggPSBiLmZvb3RwcmludF9oIHx8IDI7XG4gICAgICBjb25zdCB3YWxsSCA9IFRJTEVfSCAqIHNjICogKGIuYnVpbGRpbmdfdHlwZSA9PT0gJ3Rvd25faGFsbCcgPyAyLjA4ICogMS41IDogMi4wOCk7XG5cbiAgICAgIGNvbnN0IHRpbGVDZW50ZXIgPSAoZ3gsIGd5KSA9PiB7XG4gICAgICAgIGNvbnN0IHAgPSBncmlkVG9TY3JlZW4oZ3gsIGd5KTtcbiAgICAgICAgcmV0dXJuIHdvcmxkVG9DYW52YXMocC54ICogc2MsIHAueSAqIHNjLCBvZmYpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGMwMCA9IHRpbGVDZW50ZXIoYi5ncmlkX3gsIGIuZ3JpZF95KTtcbiAgICAgIGNvbnN0IGNGVzAgPSB0aWxlQ2VudGVyKGIuZ3JpZF94ICsgZncgLSAxLCBiLmdyaWRfeSk7XG4gICAgICBjb25zdCBjRldIID0gdGlsZUNlbnRlcihiLmdyaWRfeCArIGZ3IC0gMSwgYi5ncmlkX3kgKyBmaCAtIDEpO1xuICAgICAgY29uc3QgYzBGSCA9IHRpbGVDZW50ZXIoYi5ncmlkX3gsIGIuZ3JpZF95ICsgZmggLSAxKTtcbiAgICAgIGNvbnN0IGdOVyA9IHsgY3g6IGMwMC5jeCwgY3k6IGMwMC5jeSAtIHRoIC8gMiB9O1xuICAgICAgY29uc3QgZ05FID0geyBjeDogY0ZXMC5jeCArIHR3IC8gMiwgY3k6IGNGVzAuY3kgfTtcbiAgICAgIGNvbnN0IGdTRSA9IHsgY3g6IGNGV0guY3gsIGN5OiBjRldILmN5ICsgdGggLyAyIH07XG4gICAgICBjb25zdCBnU1cgPSB7IGN4OiBjMEZILmN4IC0gdHcgLyAyLCBjeTogYzBGSC5jeSB9O1xuXG4gICAgICAvLyBUZXN0IGJvdW5kaW5nIGJveCBvZiB0aGUgZnVsbCAzRCB2b2x1bWUgZmlyc3QgKGZhc3QgcmVqZWN0KVxuICAgICAgY29uc3QgbWluWCA9IE1hdGgubWluKGdOVy5jeCwgZ05FLmN4LCBnU0UuY3gsIGdTVy5jeCk7XG4gICAgICBjb25zdCBtYXhYID0gTWF0aC5tYXgoZ05XLmN4LCBnTkUuY3gsIGdTRS5jeCwgZ1NXLmN4KTtcbiAgICAgIGNvbnN0IG1pblkgPSBNYXRoLm1pbihnTlcuY3ksIGdORS5jeSwgZ1NFLmN5LCBnU1cuY3kpIC0gd2FsbEg7XG4gICAgICBjb25zdCBtYXhZID0gTWF0aC5tYXgoZ05XLmN5LCBnTkUuY3ksIGdTRS5jeSwgZ1NXLmN5KTtcbiAgICAgIGlmIChjeFAgPCBtaW5YIHx8IGN4UCA+IG1heFggfHwgY3lQIDwgbWluWSB8fCBjeVAgPiBtYXhZKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIFBvaW50LWluLXBvbHlnb24gZm9yIHRoZSBmdWxsIHNpbGhvdWV0dGU6IHRvcCBmYWNlICsgbGVmdC9yaWdodCBzaWRlc1xuICAgICAgLy8gQnVpbGQgYSBwb2x5Z29uIHRoYXQgY292ZXJzIHRoZSBlbnRpcmUgdmlzaWJsZSAzRCBzaGFwZVxuICAgICAgY29uc3QgcG9seWdvbiA9IFtcbiAgICAgIHsgY3g6IGdOVy5jeCwgY3k6IGdOVy5jeSAtIHdhbGxIIH0sIC8vIHRvcC1OV1xuICAgICAgeyBjeDogZ05FLmN4LCBjeTogZ05FLmN5IC0gd2FsbEggfSwgLy8gdG9wLU5FXG4gICAgICB7IGN4OiBnU0UuY3gsIGN5OiBnU0UuY3kgLSB3YWxsSCB9LCAvLyB0b3AtU0VcbiAgICAgIHsgY3g6IGdTRS5jeCwgY3k6IGdTRS5jeSB9LCAvLyBncm91bmQtU0VcbiAgICAgIHsgY3g6IGdTVy5jeCwgY3k6IGdTVy5jeSB9LCAvLyBncm91bmQtU1dcbiAgICAgIHsgY3g6IGdOVy5jeCwgY3k6IGdOVy5jeSB9IC8vIGdyb3VuZC1OVyAob25seSB2aXNpYmxlIGlmIG5vIGxlZnQgZmFjZSlcbiAgICAgIF07XG4gICAgICByZXR1cm4gcG9pbnRJblBvbHlnb24oY3hQLCBjeVAsIHBvbHlnb24pO1xuICAgIH07XG5cbiAgICAvLyBDaGVjayBmcm9tIFNFIHRvIE5XIChyZXZlcnNlIHBhaW50ZXIncyBvcmRlcikgc28gdG9wbW9zdC1yZW5kZXJlZCBidWlsZGluZyB3aW5zXG4gICAgY29uc3Qgc29ydGVkID0gWy4uLmJsZGdzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBkQSA9IGEuZ3JpZF94ICsgYS5mb290cHJpbnRfdyArIChhLmdyaWRfeSArIGEuZm9vdHByaW50X2gpO1xuICAgICAgY29uc3QgZEIgPSBiLmdyaWRfeCArIGIuZm9vdHByaW50X3cgKyAoYi5ncmlkX3kgKyBiLmZvb3RwcmludF9oKTtcbiAgICAgIHJldHVybiBkQiAtIGRBOyAvLyByZXZlcnNlOiBmcm9udC1tb3N0IGZpcnN0XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvcnRlZC5maW5kKChiKSA9PiBoaXRCdWlsZGluZyhiKSkgfHwgbnVsbDtcbiAgfTtcblxuICBjb25zdCBjbGlja1N0YXJ0UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIC8vIFNoaWZ0K2NsaWNrIG9uIGEgcGxhY2VkIHdhbGw6IGZpbGwgaW4gYSBzdHJhaWdodCBheGlzIGRpcmVjdGlvbiAoTi9TL0UvVylcbiAgY29uc3QgY29tcHV0ZVNoaWZ0V2FsbExpbmUgPSAoY2xpY2tHeCwgY2xpY2tHeSwgYmxkZ3MpID0+IHtcbiAgICAvLyBGaW5kIG5lYXJlc3QgYWRqYWNlbnQgcGxhY2VkIHdhbGwgdG8gZGV0ZXJtaW5lIGRpcmVjdGlvblxuICAgIGNvbnN0IHdhbGxTZXQgPSBuZXcgU2V0KGJsZGdzLmZpbHRlcigoYikgPT4gYi5idWlsZGluZ190eXBlID09PSAnd2FsbCcpLm1hcCgoYikgPT4gYCR7Yi5ncmlkX3h9LCR7Yi5ncmlkX3l9YCkpO1xuICAgIC8vIDQgYXhpcyBkaXJlY3Rpb25zOiBbZGd4LCBkZ3ksIGxhYmVsXVxuICAgIGNvbnN0IGRpcnMgPSBbXG4gICAgWzEsIDBdLCBbLTEsIDBdLCBbMCwgMV0sIFswLCAtMV1dO1xuXG4gICAgLy8gRmluZCB3aGljaCBhZGphY2VudCB0aWxlIGhhcyBhIHdhbGwgKG9yaWdpbiBmb3IgZGlyZWN0aW9uKVxuICAgIGxldCBjaG9zZW5EaXIgPSBudWxsO1xuICAgIGZvciAoY29uc3QgW2RneCwgZGd5XSBvZiBkaXJzKSB7XG4gICAgICBpZiAod2FsbFNldC5oYXMoYCR7Y2xpY2tHeCArIGRneH0sJHtjbGlja0d5ICsgZGd5fWApKSB7XG4gICAgICAgIC8vIERpcmVjdGlvbiBhd2F5IGZyb20gdGhlIGV4aXN0aW5nIHdhbGwgPSB0b3dhcmQgY2xpY2tcbiAgICAgICAgY2hvc2VuRGlyID0gWy1kZ3gsIC1kZ3ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjaG9zZW5EaXIpIHtcbiAgICAgIC8vIE5vIGFkamFjZW50IHdhbGwg4oCUIGp1c3QgdHJ5IHRvIHBsYWNlIHRoZSBzaW5nbGUgY2xpY2tlZCBjZWxsXG4gICAgICBjb25zdCB2YWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoY2xpY2tHeCwgY2xpY2tHeSwgMSwgMSwgbnVsbCwgYmxkZ3MsICd3YWxsJyk7XG4gICAgICByZXR1cm4gdmFsaWQgPyBbeyBneDogY2xpY2tHeCwgZ3k6IGNsaWNrR3kgfV0gOiBbXTtcbiAgICB9XG5cbiAgICAvLyBXYWxrIGZyb20gdGhlIGNsaWNrZWQgY2VsbCBvdXR3YXJkIGluIHRoZSBjaG9zZW4gYXhpcyB1bnRpbCB3ZSBoaXQgYW4gb2JzdGFjbGUgb3IgYm91bmRhcnlcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgIGxldCBjeCA9IGNsaWNrR3gsY3kgPSBjbGlja0d5O1xuICAgIGNvbnN0IFtkeCwgZHldID0gY2hvc2VuRGlyO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoIWlzVmFsaWRQbGFjZW1lbnQoY3gsIGN5LCAxLCAxLCBudWxsLCBibGRncywgJ3dhbGwnKSkgYnJlYWs7XG4gICAgICBjZWxscy5wdXNoKHsgZ3g6IGN4LCBneTogY3kgfSk7XG4gICAgICBjeCArPSBkeDtjeSArPSBkeTtcbiAgICB9XG4gICAgcmV0dXJuIGNlbGxzO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XG4gICAgLy8gUmlnaHQtY2xpY2sgZm9yIHNob3AgcGxhY2VtZW50XG4gICAgaWYgKGUuYnV0dG9uID09PSAyICYmIHBlbmRpbmdTaG9wUGxhY2VtZW50KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBwb3MgPSBnZXRDYW52YXNQb3MoZSk7XG4gICAgICBjb25zdCB7IG9mZnNldDogb2ZmLCBzY2FsZTogc2MgfSA9IHN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCB7IHd4LCB3eSB9ID0gY2FudmFzVG9Xb3JsZChwb3MuY3gsIHBvcy5jeSwgb2ZmLCBzYyk7XG4gICAgICBjb25zdCB7IGd4LCBneSB9ID0gc2NyZWVuVG9HcmlkKHd4LCB3eSk7XG4gICAgICBvblBsYWNlU2hvcEJ1aWxkaW5nPy4oZ3gsIGd5KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICBjb25zdCBwb3MgPSBnZXRDYW52YXNQb3MoZSk7XG5cbiAgICAvLyBTaGlmdCtjbGljazogZGlyZWN0aW9uYWwgd2FsbCBsaW5lIHBsYWNlbWVudCAob25seSBpZiB3YWxsIGlzIHBlbmRpbmcgc2hvcCBwbGFjZW1lbnQpXG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgcGVuZGluZ1Nob3BQbGFjZW1lbnQ/LmJ1aWxkaW5nVHlwZSA9PT0gJ3dhbGwnKSB7XG4gICAgICBjb25zdCB7IG9mZnNldDogb2ZmLCBzY2FsZTogc2MsIGJ1aWxkaW5nczogYmxkZ3MgfSA9IHN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCB7IHd4LCB3eSB9ID0gY2FudmFzVG9Xb3JsZChwb3MuY3gsIHBvcy5jeSwgb2ZmLCBzYyk7XG4gICAgICBjb25zdCB7IGd4LCBneSB9ID0gc2NyZWVuVG9HcmlkKHd4LCB3eSk7XG4gICAgICBjb25zdCBjZWxscyA9IGNvbXB1dGVTaGlmdFdhbGxMaW5lKGd4LCBneSwgYmxkZ3MpO1xuICAgICAgaWYgKGNlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgb25XYWxsRHJhZz8uKGNlbGxzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjsgLy8gZG9uJ3Qgc3RhcnQgcGFuXG4gICAgfVxuXG4gICAgY2xpY2tTdGFydFJlZi5jdXJyZW50ID0gcG9zO1xuICAgIHNldERyYWdnaW5nKHRydWUpO1xuICAgIHNldERyYWdTdGFydCh7IC4uLnBvcywgb3g6IG9mZnNldC54LCBveTogb2Zmc2V0LnkgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGUpID0+IHtcbiAgICBjb25zdCBwb3MgPSBnZXRDYW52YXNQb3MoZSk7XG5cbiAgICBpZiAoc3RhdGVSZWYuY3VycmVudC5tb3ZlQnVpbGRpbmcpIHtcbiAgICAgIGNvbnN0IHsgb2Zmc2V0OiBvZmYsIHNjYWxlOiBzYywgbW92ZUJ1aWxkaW5nOiBtb3ZCIH0gPSBzdGF0ZVJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgeyB3eCwgd3kgfSA9IGNhbnZhc1RvV29ybGQocG9zLmN4LCBwb3MuY3ksIG9mZiwgc2MpO1xuICAgICAgY29uc3QgeyBneCwgZ3kgfSA9IHNjcmVlblRvR3JpZCh3eCwgd3kpO1xuICAgICAgLy8gU25hcCB0byBncmlkIC0gbW91c2UgcG9zaXRpb24gaXMgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgYnVpbGRpbmdcbiAgICAgIGNvbnN0IHNuYXBwZWRYID0gTWF0aC5tYXgoRk9SRVNUX1JJTkcsIE1hdGgubWluKGd4LCBHUklEX1NJWkUgLSBGT1JFU1RfUklORyAtIG1vdkIuZm9vdHByaW50X3cpKTtcbiAgICAgIGNvbnN0IHNuYXBwZWRZID0gTWF0aC5tYXgoRk9SRVNUX1JJTkcsIE1hdGgubWluKGd5LCBHUklEX1NJWkUgLSBGT1JFU1RfUklORyAtIG1vdkIuZm9vdHByaW50X2gpKTtcbiAgICAgIHNldEdob3N0UG9zKHsgZ3g6IHNuYXBwZWRYLCBneTogc25hcHBlZFkgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRyYWdnaW5nICYmIGRyYWdTdGFydCkge1xuICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBzYyA9IHN0YXRlUmVmLmN1cnJlbnQuc2NhbGUgfHwgMTtcbiAgICAgIGNvbnN0IG5ld1ggPSBkcmFnU3RhcnQub3ggKyBwb3MuY3ggLSBkcmFnU3RhcnQuY3g7XG4gICAgICBjb25zdCBuZXdZID0gZHJhZ1N0YXJ0Lm95ICsgcG9zLmN5IC0gZHJhZ1N0YXJ0LmN5O1xuICAgICAgY29uc3QgUEFEID0gMjA7XG4gICAgICBjb25zdCB3ID0gY2FudmFzPy53aWR0aCB8fCAxMjgwO1xuICAgICAgY29uc3QgaCA9IGNhbnZhcz8uaGVpZ2h0IHx8IDcyMDtcbiAgICAgIGNvbnN0IGNvcm5lcnMgPSBbXG4gICAgICBncmlkVG9TY3JlZW4oMCwgMCksXG4gICAgICBncmlkVG9TY3JlZW4oR1JJRF9TSVpFIC0gMSwgMCksXG4gICAgICBncmlkVG9TY3JlZW4oR1JJRF9TSVpFIC0gMSwgR1JJRF9TSVpFIC0gMSksXG4gICAgICBncmlkVG9TY3JlZW4oMCwgR1JJRF9TSVpFIC0gMSldLlxuICAgICAgbWFwKChwKSA9PiAoeyBjeDogcC54ICogc2MgKyBDQU5WQVNfT0ZGU0VUX1ggKyBuZXdYLCBjeTogcC55ICogc2MgKyBDQU5WQVNfT0ZGU0VUX1kgKyBuZXdZIH0pKTtcblxuICAgICAgY29uc3QgbWluQ1ggPSBNYXRoLm1pbiguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeCkpO1xuICAgICAgY29uc3QgbWF4Q1ggPSBNYXRoLm1heCguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeCkpO1xuICAgICAgY29uc3QgbWluQ1kgPSBNYXRoLm1pbiguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeSkpO1xuICAgICAgY29uc3QgbWF4Q1kgPSBNYXRoLm1heCguLi5jb3JuZXJzLm1hcCgoYykgPT4gYy5jeSkpO1xuXG4gICAgICBsZXQgZHggPSAwLGR5ID0gMDtcbiAgICAgIGlmIChtYXhDWCAtIG1pbkNYIDw9IHcgLSBQQUQgKiAyKSB7XG4gICAgICAgIGlmIChtaW5DWCA8IFBBRCkgZHggPSBQQUQgLSBtaW5DWDtcbiAgICAgICAgaWYgKG1heENYID4gdyAtIFBBRCkgZHggPSB3IC0gUEFEIC0gbWF4Q1g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluQ1ggPiBQQUQpIGR4ID0gUEFEIC0gbWluQ1g7XG4gICAgICAgIGlmIChtYXhDWCA8IHcgLSBQQUQpIGR4ID0gdyAtIFBBRCAtIG1heENYO1xuICAgICAgfVxuICAgICAgaWYgKG1heENZIC0gbWluQ1kgPD0gaCAtIFBBRCAqIDIpIHtcbiAgICAgICAgaWYgKG1pbkNZIDwgUEFEKSBkeSA9IFBBRCAtIG1pbkNZO1xuICAgICAgICBpZiAobWF4Q1kgPiBoIC0gUEFEKSBkeSA9IGggLSBQQUQgLSBtYXhDWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW5DWSA+IFBBRCkgZHkgPSBQQUQgLSBtaW5DWTtcbiAgICAgICAgaWYgKG1heENZIDwgaCAtIFBBRCkgZHkgPSBoIC0gUEFEIC0gbWF4Q1k7XG4gICAgICB9XG4gICAgICBzZXRPZmZzZXQoeyB4OiBuZXdYICsgZHgsIHk6IG5ld1kgKyBkeSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBidWlsZGluZyA9IGdldEJ1aWxkaW5nQXQocG9zLmN4LCBwb3MuY3kpO1xuICAgIHNldEhvdmVyQnVpbGRpbmcoYnVpbGRpbmcgfHwgbnVsbCk7XG4gICAgc2V0SG92ZXJDYW52YXNQb3MoYnVpbGRpbmcgPyB7IGN4OiBwb3MuY3gsIGN5OiBwb3MuY3kgfSA6IG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGdldENhbnZhc1BvcyhlKTtcblxuICAgIGlmIChzdGF0ZVJlZi5jdXJyZW50Lm1vdmVCdWlsZGluZykge1xuICAgICAgY29uc3QgeyBnaG9zdFBvczogZ2hvc3QsIG1vdmVCdWlsZGluZzogbW92QiB9ID0gc3RhdGVSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGJsZGdzID0gYnVpbGRpbmdzUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoZ2hvc3QgJiYgaXNWYWxpZFBsYWNlbWVudChnaG9zdC5neCwgZ2hvc3QuZ3ksIG1vdkIuZm9vdHByaW50X3csIG1vdkIuZm9vdHByaW50X2gsIG1vdkIuaWQsIGJsZGdzLCBtb3ZCLmJ1aWxkaW5nX3R5cGUpKSB7XG4gICAgICAgIG9uTW92ZUJ1aWxkaW5nPy4obW92QiwgZ2hvc3QuZ3gsIGdob3N0Lmd5KTtcbiAgICAgIH1cbiAgICAgIHNldE1vdmVCdWlsZGluZyhudWxsKTtcbiAgICAgIHNldEdob3N0UG9zKG51bGwpO1xuICAgICAgc2V0RHJhZ2dpbmcoZmFsc2UpO1xuICAgICAgc2V0RHJhZ1N0YXJ0KG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldERyYWdnaW5nKGZhbHNlKTtcbiAgICBzZXREcmFnU3RhcnQobnVsbCk7XG5cbiAgICBpZiAoY2xpY2tTdGFydFJlZi5jdXJyZW50KSB7XG4gICAgICBjb25zdCBkeCA9IE1hdGguYWJzKHBvcy5jeCAtIGNsaWNrU3RhcnRSZWYuY3VycmVudC5jeCk7XG4gICAgICBjb25zdCBkeSA9IE1hdGguYWJzKHBvcy5jeSAtIGNsaWNrU3RhcnRSZWYuY3VycmVudC5jeSk7XG4gICAgICBpZiAoZHggPCA2ICYmIGR5IDwgNikge1xuICAgICAgICBjb25zdCBidWlsZGluZyA9IGdldEJ1aWxkaW5nQXQocG9zLmN4LCBwb3MuY3kpO1xuICAgICAgICBvblNlbGVjdEJ1aWxkaW5nPy4oYnVpbGRpbmcgfHwgbnVsbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNsaWNrU3RhcnRSZWYuY3VycmVudCA9IG51bGw7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICBpZiAoIXN0YXRlUmVmLmN1cnJlbnQubW92ZUJ1aWxkaW5nKSB7XG4gICAgICBzZXREcmFnZ2luZyhmYWxzZSk7XG4gICAgICBzZXREcmFnU3RhcnQobnVsbCk7XG4gICAgfVxuICAgIHNldEhvdmVyQnVpbGRpbmcobnVsbCk7XG4gICAgc2V0SG92ZXJDYW52YXNQb3MobnVsbCk7XG4gIH07XG5cbiAgLy8gUHJldmVudCBjb250ZXh0IG1lbnUgb24gcmlnaHQtY2xpY2tcbiAgY29uc3QgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRNb3ZlTW9kZSA9IChidWlsZGluZykgPT4ge1xuICAgIHNldE1vdmVCdWlsZGluZyhidWlsZGluZyk7XG4gICAgc2V0R2hvc3RQb3MoeyBneDogYnVpbGRpbmcuZ3JpZF94LCBneTogYnVpbGRpbmcuZ3JpZF95IH0pO1xuICAgIG9uU2VsZWN0QnVpbGRpbmc/LihudWxsKTsgLy8gY2xvc2UgcGFuZWwgd2hpbGUgbW92aW5nXG4gIH07XG5cbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsICgpID0+ICh7IHN0YXJ0TW92ZU1vZGUgfSksIFtdKTtcblxuICBjb25zdCBjYW5jZWxNb3ZlID0gKCkgPT4ge3NldE1vdmVCdWlsZGluZyhudWxsKTtzZXRHaG9zdFBvcyhudWxsKTt9O1xuXG4gIGNvbnN0IGhvdmVyRGVmID0gaG92ZXJCdWlsZGluZyA/IEJVSUxESU5HX0RFRlNbaG92ZXJCdWlsZGluZy5idWlsZGluZ190eXBlXSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODEzOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCIgc3R5bGU9e3sgdXNlclNlbGVjdDogXCJub25lXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgPGNhbnZhcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkOjgxNDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHJlZj17Y2FudmFzUmVmfVxuICAgICAgd2lkdGg9e3dpbmRvdy5pbm5lcldpZHRofVxuICAgICAgaGVpZ2h0PXt3aW5kb3cuaW5uZXJIZWlnaHR9XG4gICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCJcbiAgICAgIHN0eWxlPXt7IGN1cnNvcjogcGVuZGluZ1Nob3BQbGFjZW1lbnQgPyBcImNyb3NzaGFpclwiIDogbW92ZUJ1aWxkaW5nID8gXCJjcm9zc2hhaXJcIiA6IGRyYWdnaW5nID8gXCJncmFiYmluZ1wiIDogXCJncmFiXCIsIHRvdWNoQWN0aW9uOiBcIm5vbmVcIiB9fVxuICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmV9XG4gICAgICBvbk1vdXNlVXA9e2hhbmRsZU1vdXNlVXB9XG4gICAgICBvbk1vdXNlTGVhdmU9e2hhbmRsZU1vdXNlTGVhdmV9XG4gICAgICBvbkNvbnRleHRNZW51PXtoYW5kbGVDb250ZXh0TWVudX1cbiAgICAgIG9uVG91Y2hTdGFydD17aGFuZGxlTW91c2VEb3dufVxuICAgICAgb25Ub3VjaE1vdmU9e2hhbmRsZU1vdXNlTW92ZX1cbiAgICAgIG9uVG91Y2hFbmQ9e2hhbmRsZU1vdXNlVXB9IC8+XG4gICAgICBcblxuICAgICAgey8qIEhvdmVyIHRvb2x0aXAgKi99XG4gICAgICB7aG92ZXJCdWlsZGluZyAmJiBob3ZlckNhbnZhc1BvcyAmJiAhbW92ZUJ1aWxkaW5nICYmICFzZWxlY3RlZEJ1aWxkaW5nICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODMyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcG9pbnRlci1ldmVudHMtbm9uZSB6LTIwIHB4LTIgcHktMSByb3VuZGVkXCJcbiAgICAgIHN0eWxlPXt7IGxlZnQ6IGhvdmVyQ2FudmFzUG9zLmN4ICsgMTQsIHRvcDogaG92ZXJDYW52YXNQb3MuY3kgLSAyOCwgYmFja2dyb3VuZDogXCIjZDRiODk2XCIsIGJvcmRlcjogXCIxcHggc29saWQgIzZiM2YxZlwiIH19PlxuICAgICAgICBcbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkOjgzNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19Pntob3ZlckRlZj8ubmFtZSB8fCBob3ZlckJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGV9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODM3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSBtbC0yXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aG92ZXJCdWlsZGluZz8uaWQgfHwgaG92ZXJCdWlsZGluZz8uX2lkfT5Mdi57aG92ZXJCdWlsZGluZy5sZXZlbH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuXG4gICAgICB7LyogTW92ZSBtb2RlIG92ZXJsYXkgKi99XG4gICAgICB7bW92ZUJ1aWxkaW5nICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODQzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMjAgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB6LTQwIGZsZXggZ2FwLTMgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkOjg0NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZDRiODk2XCIsIGJvcmRlcjogXCIycHggc29saWQgIzZiM2YxZlwiIH19PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSXNvbWV0cmljR3JpZDo4NDU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjM2QxZjA1XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCI+8J+UgCBNT1ZJTkc6IHtCVUlMRElOR19ERUZTW21vdmVCdWlsZGluZy5idWlsZGluZ190eXBlXT8ubmFtZX0g4oCUIGNsaWNrIHRvIHBsYWNlPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSXNvbWV0cmljR3JpZDo4NDc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtjYW5jZWxNb3ZlfSBjbGFzc05hbWU9XCJidG4tcnBnLXJlZCBidG4tcnBnIHB4LTMgcHktMiByb3VuZGVkIHRleHQtWzhweF0gZm9udC1waXhlbFwiPkNBTkNFTDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cblxuICAgICAgey8qIFNob3AgcGxhY2VtZW50IG1vZGUgb3ZlcmxheSAqL31cbiAgICAgIHtwZW5kaW5nU2hvcFBsYWNlbWVudCAmJlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkOjg1Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTIwIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgei00MCBmbGV4IGdhcC0zIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSXNvbWV0cmljR3JpZDo4NTQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2Q0Yjg5NlwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM2YjNmMWZcIiB9fT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODU1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs4cHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiPlxuICAgICAgICAgICAgICDwn4+X77iPIFBMQUNJTkc6IHtCVUlMRElOR19ERUZTW3BlbmRpbmdTaG9wUGxhY2VtZW50LmJ1aWxkaW5nVHlwZV0/Lm5hbWV9IOKAlCByaWdodC1jbGljayB0byBwbGFjZVxuICAgICAgICAgICAgICB7cGVuZGluZ1Nob3BQbGFjZW1lbnQuYnVpbGRpbmdUeXBlID09PSAnd2FsbCcgJiYgJyDCtyBTaGlmdCtjbGljayBhZGphY2VudCB0byBhIHdhbGwgdG8gZXh0ZW5kIGluIGEgbGluZSd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkOjg2MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtvblBsYWNlU2hvcEJ1aWxkaW5nPy4obnVsbCwgbnVsbCk7fX0gY2xhc3NOYW1lPVwiYnRuLXJwZy1yZWQgYnRuLXJwZyBweC0zIHB5LTIgcm91bmRlZCB0ZXh0LVs4cHhdIGZvbnQtcGl4ZWwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0lzb21ldHJpY0dyaWQ6ODYxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPuKclTwvc3Bhbj4gQ0FOQ0VMXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgIDwvZGl2Pik7XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBJc29tZXRyaWNHcmlkO1xuXG5mdW5jdGlvbiBwb2ludEluUG9seWdvbihweCwgcHksIHBvbHlnb24pIHtcbiAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICBmb3IgKGxldCBpID0gMCwgaiA9IHBvbHlnb24ubGVuZ3RoIC0gMTsgaSA8IHBvbHlnb24ubGVuZ3RoOyBqID0gaSsrKSB7XG4gICAgY29uc3QgeGkgPSBwb2x5Z29uW2ldLmN4LHlpID0gcG9seWdvbltpXS5jeTtcbiAgICBjb25zdCB4aiA9IHBvbHlnb25bal0uY3gseWogPSBwb2x5Z29uW2pdLmN5O1xuICAgIGlmICh5aSA+IHB5ICE9PSB5aiA+IHB5ICYmIHB4IDwgKHhqIC0geGkpICogKHB5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpIHtcbiAgICAgIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnNpZGU7XG59XG5cbmZ1bmN0aW9uIHNoYWRlQ29sb3IoaGV4LCBhbW91bnQpIHtcbiAgdHJ5IHtcbiAgICBsZXQgciA9IHBhcnNlSW50KGhleC5zbGljZSgxLCAzKSwgMTYpO1xuICAgIGxldCBnID0gcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNik7XG4gICAgbGV0IGIgPSBwYXJzZUludChoZXguc2xpY2UoNSwgNyksIDE2KTtcbiAgICByID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByICsgYW1vdW50KSk7XG4gICAgZyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZyArIGFtb3VudCkpO1xuICAgIGIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGIgKyBhbW91bnQpKTtcbiAgICByZXR1cm4gYHJnYigke3J9LCR7Z30sJHtifSlgO1xuICB9IGNhdGNoIHtyZXR1cm4gaGV4O31cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9Jc29tZXRyaWNHcmlkLmpzeCJ9