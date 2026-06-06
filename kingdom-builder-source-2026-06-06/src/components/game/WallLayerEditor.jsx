import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/WallLayerEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/WallLayerEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useState = __vite__cjsImport3_react["useState"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { X, RotateCcw, RotateCw, FlipHorizontal, Eye, EyeOff, Send, Plus, ChevronDown } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { WALL_LINK_LAYERS, WALL_LINK_LABELS, getWallLayerSprite, saveWallLayerSprite, invalidateWallLayerCache, getWallLayerVariants } from "/src/lib/buildingStats.js";
import { getSprite } from "/src/lib/buildingSprites.js";
import { publishWallLayer, isPublishedWallLayer, invalidatePublishedWallLayerCache } from "/src/lib/publishedSprites.js";
import SpectrumColorPicker from "/src/components/game/SpectrumColorPicker.jsx";
const CANVAS_SIZE = 256;
const MAX_HISTORY = 60;
const MAX_WALL_LEVEL = 10;
const TOOLS = [
  { id: "pencil", label: "✏️", title: "Pencil (P)" },
  { id: "eraser", label: "⌫", title: "Eraser (E)" },
  { id: "bucket", label: "🪣", title: "Fill (F)" },
  { id: "eyedropper", label: "💉", title: "Eyedropper (I)" },
  { id: "line", label: "╱", title: "Line (L)" }
];
const TOOL_HOTKEYS = {
  p: "pencil",
  e: "eraser",
  f: "bucket",
  i: "eyedropper",
  l: "line"
};
function hexToRgba(hex) {
  if (hex === "transparent") return [0, 0, 0, 0];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255];
}
function rgbaToHex(r, g, b, a) {
  if (a === 0) return "transparent";
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
export default function WallLayerEditor({ onClose, id }) {
  _s();
  const canvasRef = useRef(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState("sw");
  const [showBaseWall, setShowBaseWall] = useState(true);
  const [tool, setTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(1);
  const [color, setColor] = useState("#8b7355");
  const [zoom, setZoom] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState(null);
  const [lastPoint, setLastPoint] = useState(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [variantList, setVariantList] = useState(["default"]);
  const [activeVariant, setActiveVariantState] = useState("default");
  const [showVariantModal, setShowVariantModal] = useState(false);
  useEffect(() => {
    setIsPublished(isPublishedWallLayer(selectedLevel, selectedLayer));
    const variants = getWallLayerVariants(selectedLevel, selectedLayer);
    setVariantList(variants.length > 0 ? variants : ["default"]);
    setActiveVariantState("default");
  }, [selectedLevel, selectedLayer]);
  const baseWallDataUrl = getSprite("wall", selectedLevel);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prevLevelRef.current !== selectedLevel || prevLayerRef.current !== selectedLayer) {
      const dataUrl = canvas.toDataURL("image/png");
      saveWallLayerSprite(prevLevelRef.current, prevLayerRef.current, dataUrl);
      invalidateWallLayerCache(prevLevelRef.current, prevLayerRef.current);
    }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const existing = getWallLayerSprite(selectedLevel, selectedLayer, activeVariant);
    if (existing) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.drawImage(img, 0, 0);
        pushHistory(canvas);
      };
      img.src = existing;
    } else {
      pushHistory(canvas);
    }
    setHistory([]);
    setHistoryIndex(-1);
    setLastPoint(null);
  }, [selectedLevel, selectedLayer]);
  const selectedLevelRef = useRef(selectedLevel);
  const selectedLayerRef = useRef(selectedLayer);
  const prevLevelRef = useRef(selectedLevel);
  const prevLayerRef = useRef(selectedLayer);
  useEffect(() => {
    selectedLevelRef.current = selectedLevel;
  }, [selectedLevel]);
  useEffect(() => {
    selectedLayerRef.current = selectedLayer;
  }, [selectedLayer]);
  useEffect(() => {
    prevLevelRef.current = selectedLevel;
  }, [selectedLevel]);
  useEffect(() => {
    prevLayerRef.current = selectedLayer;
  }, [selectedLayer]);
  const pushHistory = useCallback((canvasEl) => {
    const c = canvasEl || canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setHistory((prev) => [...prev, data].slice(-MAX_HISTORY));
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    const dataUrl = c.toDataURL("image/png");
    saveWallLayerSprite(selectedLevelRef.current, selectedLayerRef.current, dataUrl, activeVariant);
    invalidateWallLayerCache(selectedLevelRef.current, selectedLayerRef.current);
  }, [activeVariant]);
  const getPixelCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (CANVAS_SIZE / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (CANVAS_SIZE / rect.height));
    return { x: Math.max(0, Math.min(CANVAS_SIZE - 1, x)), y: Math.max(0, Math.min(CANVAS_SIZE - 1, y)) };
  };
  const drawPixel = (ctx, px, py, rgba) => {
    const [r, g, b, a] = rgba;
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const half = Math.floor(brushSize / 2);
    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const nx = px + dx, ny = py + dy;
        if (nx < 0 || nx >= CANVAS_SIZE || ny < 0 || ny >= CANVAS_SIZE) continue;
        const idx = (ny * CANVAS_SIZE + nx) * 4;
        if (a === 0) {
          imageData.data[idx + 3] = 0;
        } else {
          imageData.data[idx] = r;
          imageData.data[idx + 1] = g;
          imageData.data[idx + 2] = b;
          imageData.data[idx + 3] = a;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };
  const drawSmoothLine = (ctx, x0, y0, x1, y1, rgba) => {
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      drawPixel(ctx, x0, y0, rgba);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  };
  const floodFill = (ctx, sx, sy, fillColor) => {
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;
    const idx = (sy * CANVAS_SIZE + sx) * 4;
    const tR = data[idx], tG = data[idx + 1], tB = data[idx + 2], tA = data[idx + 3];
    const [fR, fG, fB, fA] = fillColor;
    if (tR === fR && tG === fG && tB === fB && tA === fA) return;
    const stack = [[sx, sy]];
    const visited = new Uint8Array(CANVAS_SIZE * CANVAS_SIZE);
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= CANVAS_SIZE || y < 0 || y >= CANVAS_SIZE) continue;
      const i = y * CANVAS_SIZE + x;
      if (visited[i]) continue;
      const pi = i * 4;
      if (data[pi] !== tR || data[pi + 1] !== tG || data[pi + 2] !== tB || data[pi + 3] !== tA) continue;
      visited[i] = 1;
      if (fA === 0) {
        data[pi + 3] = 0;
      } else {
        data[pi] = fR;
        data[pi + 1] = fG;
        data[pi + 2] = fB;
        data[pi + 3] = fA;
      }
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(imageData, 0, 0);
  };
  const drawLine = (ctx, x0, y0, x1, y1, rgba) => {
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      drawPixel(ctx, x0, y0, rgba);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  };
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setDrawing(true);
    setDrawStart({ x, y });
    if (tool === "eyedropper") {
      const px = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbaToHex(px[0], px[1], px[2], px[3]);
      if (hex !== "transparent") setColor(hex);
      return;
    }
    if (tool === "bucket") {
      floodFill(ctx, x, y, hexToRgba(color));
      pushHistory();
      return;
    }
    if (tool === "pencil" || tool === "eraser") {
      const rgba = tool === "eraser" ? [0, 0, 0, 0] : hexToRgba(color);
      if (e.shiftKey && lastPoint) {
        drawLine(ctx, lastPoint.x, lastPoint.y, x, y, rgba);
        pushHistory();
        setLastPoint({ x, y });
        setDrawing(false);
        return;
      }
      drawPixel(ctx, x, y, rgba);
      setLastPoint({ x, y });
    }
  };
  const [cursorPos, setCursorPos] = useState(null);
  const handleCanvasMouseMove = (e) => {
    const { x, y } = getPixelCoords(e);
    setCursorPos({ x, y });
    handleMouseMove(e);
  };
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (tool === "pencil" || tool === "eraser") {
      const rgba = tool === "eraser" ? [0, 0, 0, 0] : hexToRgba(color);
      let drawX = x, drawY = y;
      if (e.shiftKey && drawStart) {
        const dx = Math.abs(x - drawStart.x);
        const dy = Math.abs(y - drawStart.y);
        if (dx > dy) {
          drawY = drawStart.y;
        } else {
          drawX = drawStart.x;
        }
      }
      if (lastPoint) {
        drawSmoothLine(ctx, lastPoint.x, lastPoint.y, drawX, drawY, rgba);
      } else {
        drawPixel(ctx, drawX, drawY, rgba);
      }
      setLastPoint({ x: drawX, y: drawY });
    }
  };
  const handleMouseUp = (e) => {
    if (!drawing) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (tool === "line" && drawStart) {
      drawLine(ctx, drawStart.x, drawStart.y, x, y, hexToRgba(color));
    }
    pushHistory();
    if (tool === "pencil") setLastPoint({ x, y });
    setDrawing(false);
    setDrawStart(null);
  };
  useEffect(() => {
    const handleKey = (e) => {
      const metaOrCtrl = e.metaKey || e.ctrlKey;
      if (!metaOrCtrl && !e.target.matches("input, textarea")) {
        const key = e.key.toLowerCase();
        if (TOOL_HOTKEYS[key]) {
          setTool(TOOL_HOTKEYS[key]);
          return;
        }
      }
      if (metaOrCtrl && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleUndo, handleRedo]);
  const handleFlip = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const newData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    for (let y = 0; y < CANVAS_SIZE; y++) {
      for (let x = 0; x < CANVAS_SIZE; x++) {
        const s = (y * CANVAS_SIZE + x) * 4;
        const d = (y * CANVAS_SIZE + (CANVAS_SIZE - 1 - x)) * 4;
        newData.data[d] = imageData.data[s];
        newData.data[d + 1] = imageData.data[s + 1];
        newData.data[d + 2] = imageData.data[s + 2];
        newData.data[d + 3] = imageData.data[s + 3];
      }
    }
    ctx.putImageData(newData, 0, 0);
    pushHistory();
  };
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);
  const handleUndo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.max(0, prev - 1);
      const snap = historyRef.current[newIdx];
      if (snap) {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.putImageData(snap, 0, 0);
          const dataUrl = canvasRef.current.toDataURL("image/png");
          saveWallLayerSprite(selectedLevelRef.current, selectedLayerRef.current, dataUrl);
          invalidateWallLayerCache(selectedLevelRef.current, selectedLayerRef.current);
        }
      }
      return newIdx;
    });
  }, []);
  const handleRedo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.min(historyRef.current.length - 1, prev + 1);
      const snap = historyRef.current[newIdx];
      if (snap) {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.putImageData(snap, 0, 0);
          const dataUrl = canvasRef.current.toDataURL("image/png");
          saveWallLayerSprite(selectedLevelRef.current, selectedLayerRef.current, dataUrl);
          invalidateWallLayerCache(selectedLevelRef.current, selectedLayerRef.current);
        }
      }
      return newIdx;
    });
  }, []);
  const displaySize = CANVAS_SIZE;
  const handleCanvasWheel = (e) => {
    e.preventDefault();
    setZoom((prev) => {
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      return Math.max(0.3, Math.min(prev * factor, 16));
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:360:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/85", children: [
    showPublishConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:362:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/80", style: { borderRadius: "inherit" }, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:363:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[320px]", style: { background: "#0d1117", border: "2px solid #f59e0b" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:364:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-yellow-400 mb-2", children: "SEND TO GAME?" }, void 0, false, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 383,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:365:12", "data-dynamic-content": "true", className: "font-ui text-sm text-white mb-1", "data-collection-item-field": "selectedLevel", "data-collection-item-id": id, children: [
        "Wall Lv.",
        selectedLevel,
        " — ",
        WALL_LINK_LABELS[selectedLayer]
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 384,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:366:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400 mb-4", children: "This layer will render over wall tiles with adjacent neighbors in this direction. Persists after reload." }, void 0, false, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 385,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:369:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/WallLayerEditor:370:14",
            "data-dynamic-content": "true",
            onClick: () => setShowPublishConfirm(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #334155" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 389,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:374:14", "data-dynamic-content": "true", onClick: () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const dataUrl = canvas.toDataURL("image/png");
            publishWallLayer(selectedLevel, selectedLayer, dataUrl, activeVariant);
            invalidatePublishedWallLayerCache(selectedLevel, selectedLayer, activeVariant);
            setIsPublished(true);
          }
          setShowPublishConfirm(false);
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-black", style: { background: "#f59e0b", border: "1px solid #fbbf24" }, "data-collection-item-field": "activeVariant", "data-collection-item-id": id, children: [
          "✓ SEND TO GAME (",
          activeVariant,
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 393,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 388,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/WallLayerEditor.jsx",
      lineNumber: 382,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/WallLayerEditor.jsx",
      lineNumber: 381,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:390:6", "data-dynamic-content": "true", className: "flex flex-col rounded-xl overflow-hidden shadow-2xl", style: { background: "#1a1a1a", border: "2px solid #4b5563", width: "100vw", height: "100vh" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:392:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#2d2d2d", background: "#111" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:393:10", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-slate-300", children: "🧱 WALL LINK LAYER EDITOR — DEV MODE" }, void 0, false, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 412,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:394:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:395:12", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "Auto-saves" }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 414,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:396:12", "data-dynamic-content": "true", onClick: handleUndo, title: "Undo (Cmd+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCcw, { "data-source-location": "components/game/WallLayerEditor:396:136", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 415,
            columnNumber: 227
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 415,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:397:12", "data-dynamic-content": "true", onClick: handleRedo, title: "Redo (Cmd+Shift+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCw, { "data-source-location": "components/game/WallLayerEditor:397:142", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 416,
            columnNumber: 233
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 416,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:398:12", "data-dynamic-content": "true", onClick: handleFlip, className: "flex items-center gap-1 px-2 py-1 rounded font-ui text-[10px] text-blue-300", style: { background: "#1e3a5f", border: "1px solid #3b82f6" }, children: [
            /* @__PURE__ */ jsxDEV(FlipHorizontal, { "data-source-location": "components/game/WallLayerEditor:399:13", "data-dynamic-content": "false", size: 10 }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 418,
              columnNumber: 14
            }, this),
            "Flip H"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 417,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:401:12", "data-dynamic-content": "true", onClick: () => {
            const key = `wall_layer_sprites_${selectedLevel}_${selectedLayer}`;
            const data = localStorage.getItem(key);
            if (data) {
              localStorage.setItem(`wall_layer_clipboard_${selectedLevel}_${selectedLayer}`, data);
            }
          }, className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#0084ff", border: "1px solid #0055cc", color: "#fff" }, children: "📋 COPY LAYER" }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 420,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:402:12", "data-dynamic-content": "true", onClick: () => {
            const data = localStorage.getItem(`wall_layer_clipboard_${selectedLevel}_${selectedLayer}`);
            if (data) {
              const key = `wall_layer_sprites_${selectedLevel}_${selectedLayer}`;
              localStorage.setItem(key, data);
              invalidatePublishedWallLayerCache(selectedLevel, selectedLayer);
              setIsPublished(true);
            }
          }, className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#00b379", border: "1px solid #00844a", color: "#fff" }, children: "📥 PASTE LAYER" }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 421,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:403:12", "data-dynamic-content": "true", onClick: () => setShowVariantModal(true), className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#2d2d4e", border: "1px solid #4c1d95", color: "#c084fc" }, "data-collection-item-field": "activeVariant", "data-collection-item-id": id, children: [
            "📋 ",
            activeVariant,
            " ",
            /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "components/game/WallLayerEditor:404:33", "data-dynamic-content": "false", size: 10 }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 423,
              columnNumber: 34
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 422,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:406:12", "data-dynamic-content": "true", onClick: () => setShowPublishConfirm(true), className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: isPublished ? "#14532d" : "#1e3a5f", border: `1px solid ${isPublished ? "#4ade80" : "#f59e0b"}`, color: isPublished ? "#4ade80" : "#fbbf24" }, children: [
            /* @__PURE__ */ jsxDEV(Send, { "data-source-location": "components/game/WallLayerEditor:407:14", "data-dynamic-content": "false", size: 11 }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 426,
              columnNumber: 15
            }, this),
            isPublished ? "LIVE" : "SEND TO GAME"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 425,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:409:12", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/WallLayerEditor:409:112", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 428,
            columnNumber: 203
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 428,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 413,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 411,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:413:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:415:10", "data-dynamic-content": "true", className: "flex flex-col p-3 gap-3 border-r overflow-y-auto", style: { borderColor: "#2d2d2d", background: "#111", minWidth: "140px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:416:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:417:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "WALL LEVEL" }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 436,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:418:14", "data-dynamic-content": "true", className: "flex flex-col gap-1", children: Array.from({ length: MAX_WALL_LEVEL }, (_, i) => i + 1).map(
              (lvl) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/WallLayerEditor:420:18",
                  "data-dynamic-content": "true",
                  onClick: () => setSelectedLevel(lvl),
                  className: "px-2 py-1 rounded font-ui text-xs transition-all",
                  style: { background: selectedLevel === lvl ? "#374151" : "#1a1a1a", border: `1px solid ${selectedLevel === lvl ? "#6b7280" : "#2d2d2d"}`, color: selectedLevel === lvl ? "#fff" : "#777" },
                  "data-collection-item-field": "lvl",
                  children: [
                    "Level ",
                    lvl
                  ]
                },
                lvl,
                true,
                {
                  fileName: "/app/src/components/game/WallLayerEditor.jsx",
                  lineNumber: 439,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 437,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 435,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:428:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:429:15", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "WALL LAYER" }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 448,
              columnNumber: 16
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/WallLayerEditor:430:15",
                "data-dynamic-content": "true",
                onClick: () => setSelectedLayer("base"),
                className: "w-full mb-1 px-2 py-1.5 rounded font-ui text-xs text-left transition-all",
                style: {
                  background: selectedLayer === "base" ? "#374151" : "#1a1a1a",
                  border: `1px solid ${selectedLayer === "base" ? "#6b7280" : "#2d2d2d"}`,
                  color: selectedLayer === "base" ? "#fff" : "#555"
                },
                children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:437:17", "data-dynamic-content": "false", className: "font-bold", children: "BASE" }, void 0, false, {
                    fileName: "/app/src/components/game/WallLayerEditor.jsx",
                    lineNumber: 456,
                    columnNumber: 18
                  }, this),
                  /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/WallLayerEditor:438:17", "data-dynamic-content": "false" }, void 0, false, {
                    fileName: "/app/src/components/game/WallLayerEditor.jsx",
                    lineNumber: 457,
                    columnNumber: 18
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:438:23", "data-dynamic-content": "false", className: "text-[9px]", children: "Base Layer" }, void 0, false, {
                    fileName: "/app/src/components/game/WallLayerEditor.jsx",
                    lineNumber: 457,
                    columnNumber: 115
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 449,
                columnNumber: 16
              },
              this
            ),
            WALL_LINK_LAYERS.map((layer) => {
              const hasSprite = !!getWallLayerSprite(selectedLevel, layer);
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/WallLayerEditor:443:19",
                  "data-dynamic-content": "true",
                  onClick: () => setSelectedLayer(layer),
                  className: "w-full mb-1 px-2 py-1.5 rounded font-ui text-xs text-left transition-all",
                  style: {
                    background: selectedLayer === layer ? "#374151" : "#1a1a1a",
                    border: `1px solid ${selectedLayer === layer ? "#6b7280" : hasSprite ? "#4b5563" : "#2d2d2d"}`,
                    color: selectedLayer === layer ? "#fff" : hasSprite ? "#ccc" : "#555"
                  },
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:450:21", "data-dynamic-content": "true", className: "font-bold", children: layer.toUpperCase() }, void 0, false, {
                      fileName: "/app/src/components/game/WallLayerEditor.jsx",
                      lineNumber: 469,
                      columnNumber: 22
                    }, this),
                    /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/WallLayerEditor:451:21", "data-dynamic-content": "false" }, void 0, false, {
                      fileName: "/app/src/components/game/WallLayerEditor.jsx",
                      lineNumber: 470,
                      columnNumber: 22
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:451:27", "data-dynamic-content": "true", className: "text-[9px]", "data-collection-item-field": "layer", children: WALL_LINK_LABELS[layer] }, void 0, false, {
                      fileName: "/app/src/components/game/WallLayerEditor.jsx",
                      lineNumber: 470,
                      columnNumber: 119
                    }, this),
                    hasSprite && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:452:35", "data-dynamic-content": "false", className: "ml-1 text-green-500 text-[8px]", children: "✓" }, void 0, false, {
                      fileName: "/app/src/components/game/WallLayerEditor.jsx",
                      lineNumber: 471,
                      columnNumber: 36
                    }, this)
                  ]
                },
                layer,
                true,
                {
                  fileName: "/app/src/components/game/WallLayerEditor.jsx",
                  lineNumber: 462,
                  columnNumber: 19
                },
                this
              );
            })
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 447,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:457:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:458:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "TOOLS" }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 477,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:459:14", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-1", children: TOOLS.map(
              (t, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/WallLayerEditor:461:18",
                  "data-dynamic-content": "true",
                  onClick: () => setTool(t.id),
                  title: t.title,
                  className: "w-8 h-8 rounded text-lg flex items-center justify-center",
                  style: { background: tool === t.id ? "#374151" : "#1a1a1a", border: `1px solid ${tool === t.id ? "#6b7280" : "#2d2d2d"}` },
                  "data-collection-item-id": t?.id,
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "TOOLS",
                  "data-arr-field": "label",
                  children: t.label
                },
                t.id,
                false,
                {
                  fileName: "/app/src/components/game/WallLayerEditor.jsx",
                  lineNumber: 480,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 478,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 476,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:469:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:470:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "BRUSH SIZE" }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 489,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:471:14", "data-dynamic-content": "true", className: "flex flex-col gap-1", children: [1, 2, 3].map(
              (s, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/WallLayerEditor:473:18",
                  "data-dynamic-content": "true",
                  onClick: () => setBrushSize(s),
                  className: "h-6 rounded text-[10px] font-ui",
                  style: { background: brushSize === s ? "#374151" : "#1a1a1a", border: `1px solid ${brushSize === s ? "#6b7280" : "#2d2d2d"}`, color: brushSize === s ? "#fff" : "#777" },
                  "data-arr-index": __arrIdx__,
                  children: [
                    s,
                    "px"
                  ]
                },
                s,
                true,
                {
                  fileName: "/app/src/components/game/WallLayerEditor.jsx",
                  lineNumber: 492,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 490,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 488,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 434,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:484:10", "data-dynamic-content": "true", className: "flex flex-col items-center justify-start p-4 gap-3 overflow-auto flex-1", style: { background: "#0a0a0a" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:485:12", "data-dynamic-content": "true", className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:486:14", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-slate-400", "data-collection-item-field": "selectedLevel", "data-collection-item-id": id, children: [
              "Wall Lv.",
              selectedLevel,
              " — ",
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:487:42", "data-dynamic-content": "true", className: "text-slate-200", "data-collection-item-field": "selectedLayer", children: WALL_LINK_LABELS[selectedLayer] }, void 0, false, {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 506,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 505,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/WallLayerEditor:489:14",
                "data-dynamic-content": "true",
                onClick: () => setShowBaseWall((v) => !v),
                className: "flex items-center gap-1 px-2 py-0.5 rounded font-ui text-[10px]",
                style: { background: showBaseWall ? "#374151" : "#1a1a1a", border: "1px solid #4b5563", color: showBaseWall ? "#fff" : "#555" },
                children: [
                  showBaseWall ? /* @__PURE__ */ jsxDEV(Eye, { "data-source-location": "components/game/WallLayerEditor:492:32", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                    fileName: "/app/src/components/game/WallLayerEditor.jsx",
                    lineNumber: 511,
                    columnNumber: 33
                  }, this) : /* @__PURE__ */ jsxDEV(EyeOff, { "data-source-location": "components/game/WallLayerEditor:492:52", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                    fileName: "/app/src/components/game/WallLayerEditor.jsx",
                    lineNumber: 511,
                    columnNumber: 144
                  }, this),
                  "Base Wall"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 508,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:495:14", "data-dynamic-content": "true", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:496:16", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-400", children: [
                (zoom * 100).toFixed(0),
                "%"
              ] }, void 0, true, {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 515,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:497:16", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-600", children: "scroll canvas to zoom" }, void 0, false, {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 516,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 514,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 504,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:502:12", "data-dynamic-content": "true", style: { position: "relative", width: displaySize, height: displaySize, transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.05s ease-out" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:504:14", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23444'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23444'/%3E%3Crect x='8' width='8' height='8' fill='%23222'/%3E%3Crect y='8' width='8' height='8' fill='%23222'/%3E%3C/svg%3E")`,
              backgroundSize: `16px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 523,
              columnNumber: 15
            }, this),
            showBaseWall && baseWallDataUrl && /* @__PURE__ */ jsxDEV(
              "img",
              {
                "data-source-location": "components/game/WallLayerEditor:511:16",
                "data-dynamic-content": "true",
                src: baseWallDataUrl,
                alt: "",
                style: { position: "absolute", inset: 0, width: displaySize, height: displaySize, imageRendering: "pixelated", opacity: 0.25, pointerEvents: "none" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 530,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "canvas",
              {
                "data-source-location": "components/game/WallLayerEditor:515:14",
                "data-dynamic-content": "true",
                ref: canvasRef,
                width: CANVAS_SIZE,
                height: CANVAS_SIZE,
                style: { position: "absolute", inset: 0, width: displaySize, height: displaySize, imageRendering: "pixelated", cursor: "crosshair" },
                onMouseDown: handleMouseDown,
                onMouseMove: handleCanvasMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: () => {
                  setCursorPos(null);
                  if (drawing) {
                    pushHistory();
                    setDrawing(false);
                  }
                },
                onWheel: handleCanvasWheel
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 534,
                columnNumber: 15
              },
              this
            ),
            zoom >= 2 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:527:16", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: `1px 1px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 546,
              columnNumber: 15
            }, this),
            cursorPos && (tool === "pencil" || tool === "eraser") && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:535:16", "data-dynamic-content": "true", style: {
              position: "absolute",
              left: cursorPos.x,
              top: cursorPos.y,
              width: brushSize,
              height: brushSize,
              transform: "translate(-50%, -50%)",
              border: `2px solid ${tool === "eraser" ? "#ef4444" : color}`,
              borderRadius: "50%",
              pointerEvents: "none",
              boxShadow: `0 0 4px ${tool === "eraser" ? "#ef4444" : color}, 0 0 8px ${tool === "eraser" ? "#ef444488" : color + "88"}`
            } }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 554,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 521,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:549:12", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-600", children: [
            "Draw the overlay sprite that appears when a wall has an adjacent neighbor in this direction.",
            lastPoint && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:551:28", "data-dynamic-content": "false", className: "text-yellow-600", children: " · ● anchor" }, void 0, false, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 570,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 568,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 503,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:556:10", "data-dynamic-content": "true", className: "flex flex-col p-3 gap-3 border-l overflow-y-auto", style: { borderColor: "#2d2d2d", background: "#111", minWidth: "200px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:557:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "COLOR" }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 576,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(SpectrumColorPicker, { "data-source-location": "components/game/WallLayerEditor:558:12", "data-dynamic-content": "true", color, onChange: setColor }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 577,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/WallLayerEditor:559:12",
              "data-dynamic-content": "true",
              onClick: () => {
                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) {
                  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                  pushHistory();
                }
              },
              className: "px-2 py-1 rounded font-pixel text-[7px] text-red-400 hover:bg-red-900/30",
              style: { border: "1px solid #7f1d1d" },
              children: "CLEAR LAYER"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 578,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 575,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 432,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/WallLayerEditor.jsx",
      lineNumber: 409,
      columnNumber: 7
    }, this),
    showVariantModal && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:569:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:570:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[400px]", style: { background: "#1a1a2e", border: "2px solid #7c3aed" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:571:12", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-purple-400 mb-3", "data-collection-item-field": "selectedLevel", "data-collection-item-id": id, children: [
        "VARIANTS — Wall Lv.",
        selectedLevel,
        " ",
        WALL_LINK_LABELS[selectedLayer]
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 590,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:573:12", "data-dynamic-content": "true", className: "flex gap-2 mb-3", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/WallLayerEditor:574:14", "data-dynamic-content": "true", onClick: () => {
          const newVar = `var_${variantList.length + 1}`;
          setVariantList([...variantList, newVar]);
          setActiveVariantState(newVar);
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            pushHistory();
          }
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-white", style: { background: "#059669", border: "1px solid #10b981" }, children: [
          /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/WallLayerEditor:581:16", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 600,
            columnNumber: 17
          }, this),
          "NEW VARIANT"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/WallLayerEditor.jsx",
          lineNumber: 593,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/WallLayerEditor:583:14",
            "data-dynamic-content": "true",
            onClick: () => setShowVariantModal(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "CLOSE"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 602,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 592,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:589:12", "data-dynamic-content": "true", className: "grid gap-2 mb-4", style: { gridTemplateColumns: "repeat(2, 1fr)" }, children: variantList.map(
        (varId) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/WallLayerEditor:591:16",
            "data-dynamic-content": "true",
            onClick: () => {
              setActiveVariantState(varId);
              const existing = getWallLayerSprite(selectedLevel, selectedLayer, varId);
              const ctx = canvasRef.current?.getContext("2d");
              if (ctx) {
                if (existing) {
                  const img = new Image();
                  img.onload = () => {
                    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                    ctx.drawImage(img, 0, 0);
                    pushHistory();
                  };
                  img.src = existing;
                } else {
                  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                  pushHistory();
                }
              }
              setShowVariantModal(false);
            },
            className: "rounded px-3 py-2 font-ui text-xs transition-all text-left",
            style: {
              background: activeVariant === varId ? "#7c3aed" : "#2d2d4e",
              border: `1px solid ${activeVariant === varId ? "#a855f7" : "#3d3d5e"}`,
              color: activeVariant === varId ? "#fff" : "#aaa"
            },
            children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/WallLayerEditor:617:18", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:618:20", "data-dynamic-content": "true", "data-collection-item-field": "varId", children: varId }, void 0, false, {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 637,
                columnNumber: 21
              }, this),
              activeVariant === varId && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/WallLayerEditor:619:48", "data-dynamic-content": "false", className: "text-green-400 text-[10px]", children: "✓ ACTIVE" }, void 0, false, {
                fileName: "/app/src/components/game/WallLayerEditor.jsx",
                lineNumber: 638,
                columnNumber: 49
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/WallLayerEditor.jsx",
              lineNumber: 636,
              columnNumber: 19
            }, this)
          },
          varId,
          false,
          {
            fileName: "/app/src/components/game/WallLayerEditor.jsx",
            lineNumber: 610,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/game/WallLayerEditor.jsx",
        lineNumber: 608,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/WallLayerEditor.jsx",
      lineNumber: 589,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/WallLayerEditor.jsx",
      lineNumber: 588,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/WallLayerEditor.jsx",
    lineNumber: 379,
    columnNumber: 5
  }, this);
}
_s(WallLayerEditor, "8posI44ICM0sZFxQQucPNHNMMvM=");
_c = WallLayerEditor;
var _c;
$RefreshReg$(_c, "WallLayerEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/WallLayerEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/WallLayerEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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Q3BFaEwsT0FBT29CLGtCQUFrQjRKLFFBQVEsU0FBUztBQUFBLFlBQzVDO0FBQUEsWUFFTSxpQ0FBQyxTQUFJLHdCQUFxQiwwQ0FBeUMsd0JBQXFCLFFBQU8sV0FBVSxxQ0FDdkc7QUFBQSxxQ0FBQyxVQUFLLHdCQUFxQiwwQ0FBeUMsd0JBQXFCLFFBQU8sOEJBQTJCLFNBQVNBLG1CQUFwSTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEwSTtBQUFBLGNBQ3pJNUosa0JBQWtCNEosU0FBUyx1QkFBQyxVQUFLLHdCQUFxQiwwQ0FBeUMsd0JBQXFCLFNBQVEsV0FBVSw4QkFBNkIsd0JBQXhJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdKO0FBQUEsaUJBRjlLO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQTtBQUFBLFVBNUJEQTtBQUFBQSxVQURMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUE4Qkk7QUFBQSxNQUNKLEtBakNBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrQ0E7QUFBQSxTQXJERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBc0RBLEtBdkRKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F3REU7QUFBQSxPQXpRSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMlFBO0FBRUo7QUFBQzVMLEdBN2tCdUJGLGlCQUFlO0FBQUEsS0FBZkE7QUFBZSxJQUFBK0w7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiWCIsIlJvdGF0ZUNjdyIsIlJvdGF0ZUN3IiwiRmxpcEhvcml6b250YWwiLCJFeWUiLCJFeWVPZmYiLCJTZW5kIiwiUGx1cyIsIkNoZXZyb25Eb3duIiwiV0FMTF9MSU5LX0xBWUVSUyIsIldBTExfTElOS19MQUJFTFMiLCJnZXRXYWxsTGF5ZXJTcHJpdGUiLCJzYXZlV2FsbExheWVyU3ByaXRlIiwiaW52YWxpZGF0ZVdhbGxMYXllckNhY2hlIiwiZ2V0V2FsbExheWVyVmFyaWFudHMiLCJnZXRTcHJpdGUiLCJwdWJsaXNoV2FsbExheWVyIiwiaXNQdWJsaXNoZWRXYWxsTGF5ZXIiLCJpbnZhbGlkYXRlUHVibGlzaGVkV2FsbExheWVyQ2FjaGUiLCJTcGVjdHJ1bUNvbG9yUGlja2VyIiwiQ0FOVkFTX1NJWkUiLCJNQVhfSElTVE9SWSIsIk1BWF9XQUxMX0xFVkVMIiwiVE9PTFMiLCJpZCIsImxhYmVsIiwidGl0bGUiLCJUT09MX0hPVEtFWVMiLCJwIiwiZSIsImYiLCJpIiwibCIsImhleFRvUmdiYSIsImhleCIsInIiLCJwYXJzZUludCIsInNsaWNlIiwiZyIsImIiLCJyZ2JhVG9IZXgiLCJhIiwidG9TdHJpbmciLCJwYWRTdGFydCIsIldhbGxMYXllckVkaXRvciIsIm9uQ2xvc2UiLCJfcyIsImNhbnZhc1JlZiIsInNlbGVjdGVkTGV2ZWwiLCJzZXRTZWxlY3RlZExldmVsIiwic2VsZWN0ZWRMYXllciIsInNldFNlbGVjdGVkTGF5ZXIiLCJzaG93QmFzZVdhbGwiLCJzZXRTaG93QmFzZVdhbGwiLCJ0b29sIiwic2V0VG9vbCIsImJydXNoU2l6ZSIsInNldEJydXNoU2l6ZSIsImNvbG9yIiwic2V0Q29sb3IiLCJ6b29tIiwic2V0Wm9vbSIsImhpc3RvcnkiLCJzZXRIaXN0b3J5IiwiaGlzdG9yeUluZGV4Iiwic2V0SGlzdG9yeUluZGV4IiwiZHJhd2luZyIsInNldERyYXdpbmciLCJkcmF3U3RhcnQiLCJzZXREcmF3U3RhcnQiLCJsYXN0UG9pbnQiLCJzZXRMYXN0UG9pbnQiLCJzaG93UHVibGlzaENvbmZpcm0iLCJzZXRTaG93UHVibGlzaENvbmZpcm0iLCJpc1B1Ymxpc2hlZCIsInNldElzUHVibGlzaGVkIiwidmFyaWFudExpc3QiLCJzZXRWYXJpYW50TGlzdCIsImFjdGl2ZVZhcmlhbnQiLCJzZXRBY3RpdmVWYXJpYW50U3RhdGUiLCJzaG93VmFyaWFudE1vZGFsIiwic2V0U2hvd1ZhcmlhbnRNb2RhbCIsInZhcmlhbnRzIiwibGVuZ3RoIiwiYmFzZVdhbGxEYXRhVXJsIiwiY2FudmFzIiwiY3VycmVudCIsInByZXZMZXZlbFJlZiIsInByZXZMYXllclJlZiIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJjdHgiLCJnZXRDb250ZXh0IiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwiY2xlYXJSZWN0IiwiZXhpc3RpbmciLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsImRyYXdJbWFnZSIsInB1c2hIaXN0b3J5Iiwic3JjIiwic2VsZWN0ZWRMZXZlbFJlZiIsInNlbGVjdGVkTGF5ZXJSZWYiLCJjYW52YXNFbCIsImMiLCJkYXRhIiwiZ2V0SW1hZ2VEYXRhIiwicHJldiIsIk1hdGgiLCJtaW4iLCJnZXRQaXhlbENvb3JkcyIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ4IiwiZmxvb3IiLCJjbGllbnRYIiwibGVmdCIsIndpZHRoIiwieSIsImNsaWVudFkiLCJ0b3AiLCJoZWlnaHQiLCJtYXgiLCJkcmF3UGl4ZWwiLCJweCIsInB5IiwicmdiYSIsImltYWdlRGF0YSIsImhhbGYiLCJkeSIsImR4IiwibngiLCJueSIsImlkeCIsInB1dEltYWdlRGF0YSIsImRyYXdTbW9vdGhMaW5lIiwieDAiLCJ5MCIsIngxIiwieTEiLCJhYnMiLCJzeCIsInN5IiwiZXJyIiwiZTIiLCJmbG9vZEZpbGwiLCJmaWxsQ29sb3IiLCJ0UiIsInRHIiwidEIiLCJ0QSIsImZSIiwiZkciLCJmQiIsImZBIiwic3RhY2siLCJ2aXNpdGVkIiwiVWludDhBcnJheSIsInBvcCIsInBpIiwicHVzaCIsImRyYXdMaW5lIiwiaGFuZGxlTW91c2VEb3duIiwiYnV0dG9uIiwic2hpZnRLZXkiLCJjdXJzb3JQb3MiLCJzZXRDdXJzb3JQb3MiLCJoYW5kbGVDYW52YXNNb3VzZU1vdmUiLCJoYW5kbGVNb3VzZU1vdmUiLCJkcmF3WCIsImRyYXdZIiwiaGFuZGxlTW91c2VVcCIsImhhbmRsZUtleSIsIm1ldGFPckN0cmwiLCJtZXRhS2V5IiwiY3RybEtleSIsInRhcmdldCIsIm1hdGNoZXMiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlUmVkbyIsImhhbmRsZVVuZG8iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUZsaXAiLCJuZXdEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwicyIsImQiLCJoaXN0b3J5UmVmIiwiaGlzdG9yeUluZGV4UmVmIiwibmV3SWR4Iiwic25hcCIsImRpc3BsYXlTaXplIiwiaGFuZGxlQ2FudmFzV2hlZWwiLCJmYWN0b3IiLCJkZWx0YVkiLCJib3JkZXJSYWRpdXMiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsIm1pbldpZHRoIiwiQXJyYXkiLCJmcm9tIiwiXyIsIm1hcCIsImx2bCIsImxheWVyIiwiaGFzU3ByaXRlIiwidG9VcHBlckNhc2UiLCJ0IiwiX19hcnJJZHhfXyIsInYiLCJ0b0ZpeGVkIiwicG9zaXRpb24iLCJ0cmFuc2Zvcm0iLCJ0cmFuc2Zvcm1PcmlnaW4iLCJ0cmFuc2l0aW9uIiwiaW5zZXQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kU2l6ZSIsImltYWdlUmVuZGVyaW5nIiwib3BhY2l0eSIsInBvaW50ZXJFdmVudHMiLCJjdXJzb3IiLCJib3hTaGFkb3ciLCJuZXdWYXIiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwidmFySWQiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJXYWxsTGF5ZXJFZGl0b3IuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYLCBSb3RhdGVDY3csIFJvdGF0ZUN3LCBGbGlwSG9yaXpvbnRhbCwgRXllLCBFeWVPZmYsIFNlbmQsIFBsdXMsIENoZXZyb25Eb3duIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgV0FMTF9MSU5LX0xBWUVSUywgV0FMTF9MSU5LX0xBQkVMUywgZ2V0V2FsbExheWVyU3ByaXRlLCBzYXZlV2FsbExheWVyU3ByaXRlLCBpbnZhbGlkYXRlV2FsbExheWVyQ2FjaGUsIGdldFdhbGxMYXllclZhcmlhbnRzIH0gZnJvbSBcIkAvbGliL2J1aWxkaW5nU3RhdHNcIjtcbmltcG9ydCB7IGdldFNwcml0ZSB9IGZyb20gXCJAL2xpYi9idWlsZGluZ1Nwcml0ZXNcIjtcbmltcG9ydCB7IHB1Ymxpc2hXYWxsTGF5ZXIsIGlzUHVibGlzaGVkV2FsbExheWVyLCBpbnZhbGlkYXRlUHVibGlzaGVkV2FsbExheWVyQ2FjaGUgfSBmcm9tIFwiQC9saWIvcHVibGlzaGVkU3ByaXRlc1wiO1xuaW1wb3J0IFNwZWN0cnVtQ29sb3JQaWNrZXIgZnJvbSBcIi4vU3BlY3RydW1Db2xvclBpY2tlclwiO1xuXG5jb25zdCBDQU5WQVNfU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9ISVNUT1JZID0gNjA7XG5jb25zdCBNQVhfV0FMTF9MRVZFTCA9IDEwO1xuXG5jb25zdCBUT09MUyA9IFtcbnsgaWQ6IFwicGVuY2lsXCIsIGxhYmVsOiBcIuKcj++4j1wiLCB0aXRsZTogXCJQZW5jaWwgKFApXCIgfSxcbnsgaWQ6IFwiZXJhc2VyXCIsIGxhYmVsOiBcIuKMq1wiLCB0aXRsZTogXCJFcmFzZXIgKEUpXCIgfSxcbnsgaWQ6IFwiYnVja2V0XCIsIGxhYmVsOiBcIvCfqqNcIiwgdGl0bGU6IFwiRmlsbCAoRilcIiB9LFxueyBpZDogXCJleWVkcm9wcGVyXCIsIGxhYmVsOiBcIvCfkolcIiwgdGl0bGU6IFwiRXllZHJvcHBlciAoSSlcIiB9LFxueyBpZDogXCJsaW5lXCIsIGxhYmVsOiBcIuKVsVwiLCB0aXRsZTogXCJMaW5lIChMKVwiIH1dO1xuXG5cbmNvbnN0IFRPT0xfSE9US0VZUyA9IHtcbiAgcDogXCJwZW5jaWxcIixcbiAgZTogXCJlcmFzZXJcIixcbiAgZjogXCJidWNrZXRcIixcbiAgaTogXCJleWVkcm9wcGVyXCIsXG4gIGw6IFwibGluZVwiXG59O1xuXG5mdW5jdGlvbiBoZXhUb1JnYmEoaGV4KSB7XG4gIGlmIChoZXggPT09IFwidHJhbnNwYXJlbnRcIikgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zbGljZSgxLCAzKSwgMTYpO1xuICBjb25zdCBnID0gcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNik7XG4gIGNvbnN0IGIgPSBwYXJzZUludChoZXguc2xpY2UoNSwgNyksIDE2KTtcbiAgcmV0dXJuIFtyLCBnLCBiLCAyNTVdO1xufVxuZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPT09IDApIHJldHVybiBcInRyYW5zcGFyZW50XCI7XG4gIHJldHVybiBgIyR7ci50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfSR7Zy50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfSR7Yi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhbGxMYXllckVkaXRvcih7IG9uQ2xvc2UsIGlkIH0pIHtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRMZXZlbCwgc2V0U2VsZWN0ZWRMZXZlbF0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3NlbGVjdGVkTGF5ZXIsIHNldFNlbGVjdGVkTGF5ZXJdID0gdXNlU3RhdGUoXCJzd1wiKTtcbiAgY29uc3QgW3Nob3dCYXNlV2FsbCwgc2V0U2hvd0Jhc2VXYWxsXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbdG9vbCwgc2V0VG9vbF0gPSB1c2VTdGF0ZShcInBlbmNpbFwiKTtcbiAgY29uc3QgW2JydXNoU2l6ZSwgc2V0QnJ1c2hTaXplXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbY29sb3IsIHNldENvbG9yXSA9IHVzZVN0YXRlKFwiIzhiNzM1NVwiKTtcbiAgY29uc3QgW3pvb20sIHNldFpvb21dID0gdXNlU3RhdGUoMik7IC8vIGZyYWN0aW9uYWwgc2NhbGUgYXBwbGllZCB2aWEgQ1NTIHRyYW5zZm9ybVxuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtoaXN0b3J5SW5kZXgsIHNldEhpc3RvcnlJbmRleF0gPSB1c2VTdGF0ZSgtMSk7XG4gIGNvbnN0IFtkcmF3aW5nLCBzZXREcmF3aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RyYXdTdGFydCwgc2V0RHJhd1N0YXJ0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbGFzdFBvaW50LCBzZXRMYXN0UG9pbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtzaG93UHVibGlzaENvbmZpcm0sIHNldFNob3dQdWJsaXNoQ29uZmlybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1B1Ymxpc2hlZCwgc2V0SXNQdWJsaXNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdmFyaWFudExpc3QsIHNldFZhcmlhbnRMaXN0XSA9IHVzZVN0YXRlKFtcImRlZmF1bHRcIl0pO1xuICBjb25zdCBbYWN0aXZlVmFyaWFudCwgc2V0QWN0aXZlVmFyaWFudFN0YXRlXSA9IHVzZVN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgY29uc3QgW3Nob3dWYXJpYW50TW9kYWwsIHNldFNob3dWYXJpYW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SXNQdWJsaXNoZWQoaXNQdWJsaXNoZWRXYWxsTGF5ZXIoc2VsZWN0ZWRMZXZlbCwgc2VsZWN0ZWRMYXllcikpO1xuICAgIGNvbnN0IHZhcmlhbnRzID0gZ2V0V2FsbExheWVyVmFyaWFudHMoc2VsZWN0ZWRMZXZlbCwgc2VsZWN0ZWRMYXllcik7XG4gICAgc2V0VmFyaWFudExpc3QodmFyaWFudHMubGVuZ3RoID4gMCA/IHZhcmlhbnRzIDogW1wiZGVmYXVsdFwiXSk7XG4gICAgc2V0QWN0aXZlVmFyaWFudFN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgfSwgW3NlbGVjdGVkTGV2ZWwsIHNlbGVjdGVkTGF5ZXJdKTtcblxuXG4gIGNvbnN0IGJhc2VXYWxsRGF0YVVybCA9IGdldFNwcml0ZShcIndhbGxcIiwgc2VsZWN0ZWRMZXZlbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuXG4gICAgLy8gU2F2ZSBjdXJyZW50IGNhbnZhcyBiZWZvcmUgc3dpdGNoaW5nXG4gICAgaWYgKHByZXZMZXZlbFJlZi5jdXJyZW50ICE9PSBzZWxlY3RlZExldmVsIHx8IHByZXZMYXllclJlZi5jdXJyZW50ICE9PSBzZWxlY3RlZExheWVyKSB7XG4gICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgIHNhdmVXYWxsTGF5ZXJTcHJpdGUocHJldkxldmVsUmVmLmN1cnJlbnQsIHByZXZMYXllclJlZi5jdXJyZW50LCBkYXRhVXJsKTtcbiAgICAgIGludmFsaWRhdGVXYWxsTGF5ZXJDYWNoZShwcmV2TGV2ZWxSZWYuY3VycmVudCwgcHJldkxheWVyUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICBjb25zdCBleGlzdGluZyA9IGdldFdhbGxMYXllclNwcml0ZShzZWxlY3RlZExldmVsLCBzZWxlY3RlZExheWVyLCBhY3RpdmVWYXJpYW50KTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO3B1c2hIaXN0b3J5KGNhbnZhcyk7fTtcbiAgICAgIGltZy5zcmMgPSBleGlzdGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaEhpc3RvcnkoY2FudmFzKTtcbiAgICB9XG4gICAgc2V0SGlzdG9yeShbXSk7XG4gICAgc2V0SGlzdG9yeUluZGV4KC0xKTtcbiAgICBzZXRMYXN0UG9pbnQobnVsbCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIH0sIFtzZWxlY3RlZExldmVsLCBzZWxlY3RlZExheWVyXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRMZXZlbFJlZiA9IHVzZVJlZihzZWxlY3RlZExldmVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRMYXllclJlZiA9IHVzZVJlZihzZWxlY3RlZExheWVyKTtcbiAgY29uc3QgcHJldkxldmVsUmVmID0gdXNlUmVmKHNlbGVjdGVkTGV2ZWwpO1xuICBjb25zdCBwcmV2TGF5ZXJSZWYgPSB1c2VSZWYoc2VsZWN0ZWRMYXllcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7c2VsZWN0ZWRMZXZlbFJlZi5jdXJyZW50ID0gc2VsZWN0ZWRMZXZlbDt9LCBbc2VsZWN0ZWRMZXZlbF0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge3NlbGVjdGVkTGF5ZXJSZWYuY3VycmVudCA9IHNlbGVjdGVkTGF5ZXI7fSwgW3NlbGVjdGVkTGF5ZXJdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtwcmV2TGV2ZWxSZWYuY3VycmVudCA9IHNlbGVjdGVkTGV2ZWw7fSwgW3NlbGVjdGVkTGV2ZWxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtwcmV2TGF5ZXJSZWYuY3VycmVudCA9IHNlbGVjdGVkTGF5ZXI7fSwgW3NlbGVjdGVkTGF5ZXJdKTtcblxuICBjb25zdCBwdXNoSGlzdG9yeSA9IHVzZUNhbGxiYWNrKChjYW52YXNFbCkgPT4ge1xuICAgIGNvbnN0IGMgPSBjYW52YXNFbCB8fCBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIHNldEhpc3RvcnkoKHByZXYpID0+IFsuLi5wcmV2LCBkYXRhXS5zbGljZSgtTUFYX0hJU1RPUlkpKTtcbiAgICBzZXRIaXN0b3J5SW5kZXgoKHByZXYpID0+IE1hdGgubWluKHByZXYgKyAxLCBNQVhfSElTVE9SWSAtIDEpKTtcbiAgICAvLyBBdXRvLXNhdmUgdG8gY3VycmVudCB2YXJpYW50XG4gICAgY29uc3QgZGF0YVVybCA9IGMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgIHNhdmVXYWxsTGF5ZXJTcHJpdGUoc2VsZWN0ZWRMZXZlbFJlZi5jdXJyZW50LCBzZWxlY3RlZExheWVyUmVmLmN1cnJlbnQsIGRhdGFVcmwsIGFjdGl2ZVZhcmlhbnQpO1xuICAgIGludmFsaWRhdGVXYWxsTGF5ZXJDYWNoZShzZWxlY3RlZExldmVsUmVmLmN1cnJlbnQsIHNlbGVjdGVkTGF5ZXJSZWYuY3VycmVudCk7XG4gIH0sIFthY3RpdmVWYXJpYW50XSk7XG5cbiAgY29uc3QgZ2V0UGl4ZWxDb29yZHMgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgKiAoQ0FOVkFTX1NJWkUgLyByZWN0LndpZHRoKSk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoKGUuY2xpZW50WSAtIHJlY3QudG9wKSAqIChDQU5WQVNfU0laRSAvIHJlY3QuaGVpZ2h0KSk7XG4gICAgcmV0dXJuIHsgeDogTWF0aC5tYXgoMCwgTWF0aC5taW4oQ0FOVkFTX1NJWkUgLSAxLCB4KSksIHk6IE1hdGgubWF4KDAsIE1hdGgubWluKENBTlZBU19TSVpFIC0gMSwgeSkpIH07XG4gIH07XG5cbiAgY29uc3QgZHJhd1BpeGVsID0gKGN0eCwgcHgsIHB5LCByZ2JhKSA9PiB7XG4gICAgY29uc3QgW3IsIGcsIGIsIGFdID0gcmdiYTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IoYnJ1c2hTaXplIC8gMik7XG4gICAgZm9yIChsZXQgZHkgPSAtaGFsZjsgZHkgPD0gaGFsZjsgZHkrKykge1xuICAgICAgZm9yIChsZXQgZHggPSAtaGFsZjsgZHggPD0gaGFsZjsgZHgrKykge1xuICAgICAgICBjb25zdCBueCA9IHB4ICsgZHgsbnkgPSBweSArIGR5O1xuICAgICAgICBpZiAobnggPCAwIHx8IG54ID49IENBTlZBU19TSVpFIHx8IG55IDwgMCB8fCBueSA+PSBDQU5WQVNfU0laRSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGlkeCA9IChueSAqIENBTlZBU19TSVpFICsgbngpICogNDtcbiAgICAgICAgaWYgKGEgPT09IDApIHtpbWFnZURhdGEuZGF0YVtpZHggKyAzXSA9IDA7fSBlbHNlXG4gICAgICAgIHtpbWFnZURhdGEuZGF0YVtpZHhdID0gcjtpbWFnZURhdGEuZGF0YVtpZHggKyAxXSA9IGc7aW1hZ2VEYXRhLmRhdGFbaWR4ICsgMl0gPSBiO2ltYWdlRGF0YS5kYXRhW2lkeCArIDNdID0gYTt9XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgfTtcblxuICAvLyBEcmF3IHNtb290aCBsaW5lIGJldHdlZW4gdHdvIHBvaW50cyAoQnJlc2VuaGFtJ3MgYWxnb3JpdGhtKVxuICBjb25zdCBkcmF3U21vb3RoTGluZSA9IChjdHgsIHgwLCB5MCwgeDEsIHkxLCByZ2JhKSA9PiB7XG4gICAgY29uc3QgZHggPSBNYXRoLmFicyh4MSAtIHgwKSxkeSA9IE1hdGguYWJzKHkxIC0geTApO1xuICAgIGNvbnN0IHN4ID0geDAgPCB4MSA/IDEgOiAtMSxzeSA9IHkwIDwgeTEgPyAxIDogLTE7XG4gICAgbGV0IGVyciA9IGR4IC0gZHk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGRyYXdQaXhlbChjdHgsIHgwLCB5MCwgcmdiYSk7XG4gICAgICBpZiAoeDAgPT09IHgxICYmIHkwID09PSB5MSkgYnJlYWs7XG4gICAgICBjb25zdCBlMiA9IDIgKiBlcnI7XG4gICAgICBpZiAoZTIgPiAtZHkpIHtlcnIgLT0gZHk7eDAgKz0gc3g7fVxuICAgICAgaWYgKGUyIDwgZHgpIHtlcnIgKz0gZHg7eTAgKz0gc3k7fVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmbG9vZEZpbGwgPSAoY3R4LCBzeCwgc3ksIGZpbGxDb2xvcikgPT4ge1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgY29uc3QgaWR4ID0gKHN5ICogQ0FOVkFTX1NJWkUgKyBzeCkgKiA0O1xuICAgIGNvbnN0IHRSID0gZGF0YVtpZHhdLHRHID0gZGF0YVtpZHggKyAxXSx0QiA9IGRhdGFbaWR4ICsgMl0sdEEgPSBkYXRhW2lkeCArIDNdO1xuICAgIGNvbnN0IFtmUiwgZkcsIGZCLCBmQV0gPSBmaWxsQ29sb3I7XG4gICAgaWYgKHRSID09PSBmUiAmJiB0RyA9PT0gZkcgJiYgdEIgPT09IGZCICYmIHRBID09PSBmQSkgcmV0dXJuO1xuICAgIGNvbnN0IHN0YWNrID0gW1tzeCwgc3ldXTtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFVpbnQ4QXJyYXkoQ0FOVkFTX1NJWkUgKiBDQU5WQVNfU0laRSk7XG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgW3gsIHldID0gc3RhY2sucG9wKCk7XG4gICAgICBpZiAoeCA8IDAgfHwgeCA+PSBDQU5WQVNfU0laRSB8fCB5IDwgMCB8fCB5ID49IENBTlZBU19TSVpFKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IGkgPSB5ICogQ0FOVkFTX1NJWkUgKyB4O1xuICAgICAgaWYgKHZpc2l0ZWRbaV0pIGNvbnRpbnVlO1xuICAgICAgY29uc3QgcGkgPSBpICogNDtcbiAgICAgIGlmIChkYXRhW3BpXSAhPT0gdFIgfHwgZGF0YVtwaSArIDFdICE9PSB0RyB8fCBkYXRhW3BpICsgMl0gIT09IHRCIHx8IGRhdGFbcGkgKyAzXSAhPT0gdEEpIGNvbnRpbnVlO1xuICAgICAgdmlzaXRlZFtpXSA9IDE7XG4gICAgICBpZiAoZkEgPT09IDApIHtkYXRhW3BpICsgM10gPSAwO30gZWxzZVxuICAgICAge2RhdGFbcGldID0gZlI7ZGF0YVtwaSArIDFdID0gZkc7ZGF0YVtwaSArIDJdID0gZkI7ZGF0YVtwaSArIDNdID0gZkE7fVxuICAgICAgc3RhY2sucHVzaChbeCArIDEsIHldLCBbeCAtIDEsIHldLCBbeCwgeSArIDFdLCBbeCwgeSAtIDFdKTtcbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICB9O1xuXG4gIGNvbnN0IGRyYXdMaW5lID0gKGN0eCwgeDAsIHkwLCB4MSwgeTEsIHJnYmEpID0+IHtcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKHgxIC0geDApLGR5ID0gTWF0aC5hYnMoeTEgLSB5MCk7XG4gICAgY29uc3Qgc3ggPSB4MCA8IHgxID8gMSA6IC0xLHN5ID0geTAgPCB5MSA/IDEgOiAtMTtcbiAgICBsZXQgZXJyID0gZHggLSBkeTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgZHJhd1BpeGVsKGN0eCwgeDAsIHkwLCByZ2JhKTtcbiAgICAgIGlmICh4MCA9PT0geDEgJiYgeTAgPT09IHkxKSBicmVhaztcbiAgICAgIGNvbnN0IGUyID0gMiAqIGVycjtcbiAgICAgIGlmIChlMiA+IC1keSkge2VyciAtPSBkeTt4MCArPSBzeDt9XG4gICAgICBpZiAoZTIgPCBkeCkge2VyciArPSBkeDt5MCArPSBzeTt9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBnZXRQaXhlbENvb3JkcyhlKTtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHNldERyYXdpbmcodHJ1ZSk7XG4gICAgc2V0RHJhd1N0YXJ0KHsgeCwgeSB9KTtcbiAgICBpZiAodG9vbCA9PT0gXCJleWVkcm9wcGVyXCIpIHtcbiAgICAgIGNvbnN0IHB4ID0gY3R4LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKS5kYXRhO1xuICAgICAgY29uc3QgaGV4ID0gcmdiYVRvSGV4KHB4WzBdLCBweFsxXSwgcHhbMl0sIHB4WzNdKTtcbiAgICAgIGlmIChoZXggIT09IFwidHJhbnNwYXJlbnRcIikgc2V0Q29sb3IoaGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvb2wgPT09IFwiYnVja2V0XCIpIHtmbG9vZEZpbGwoY3R4LCB4LCB5LCBoZXhUb1JnYmEoY29sb3IpKTtwdXNoSGlzdG9yeSgpO3JldHVybjt9XG4gICAgaWYgKHRvb2wgPT09IFwicGVuY2lsXCIgfHwgdG9vbCA9PT0gXCJlcmFzZXJcIikge1xuICAgICAgY29uc3QgcmdiYSA9IHRvb2wgPT09IFwiZXJhc2VyXCIgPyBbMCwgMCwgMCwgMF0gOiBoZXhUb1JnYmEoY29sb3IpO1xuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgbGFzdFBvaW50KSB7ZHJhd0xpbmUoY3R4LCBsYXN0UG9pbnQueCwgbGFzdFBvaW50LnksIHgsIHksIHJnYmEpO3B1c2hIaXN0b3J5KCk7c2V0TGFzdFBvaW50KHsgeCwgeSB9KTtzZXREcmF3aW5nKGZhbHNlKTtyZXR1cm47fVxuICAgICAgZHJhd1BpeGVsKGN0eCwgeCwgeSwgcmdiYSk7XG4gICAgICBzZXRMYXN0UG9pbnQoeyB4LCB5IH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBDdXJzb3IgcG9zaXRpb24gZm9yIG91dGxpbmUgcmluZ1xuXG5cbiAgY29uc3QgW2N1cnNvclBvcywgc2V0Q3Vyc29yUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBoYW5kbGVDYW52YXNNb3VzZU1vdmUgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0UGl4ZWxDb29yZHMoZSk7XG4gICAgc2V0Q3Vyc29yUG9zKHsgeCwgeSB9KTtcbiAgICBoYW5kbGVNb3VzZU1vdmUoZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGUpID0+IHtcbiAgICBpZiAoIWRyYXdpbmcpIHJldHVybjtcbiAgICBjb25zdCB7IHgsIHkgfSA9IGdldFBpeGVsQ29vcmRzKGUpO1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKHRvb2wgPT09IFwicGVuY2lsXCIgfHwgdG9vbCA9PT0gXCJlcmFzZXJcIikge1xuICAgICAgY29uc3QgcmdiYSA9IHRvb2wgPT09IFwiZXJhc2VyXCIgPyBbMCwgMCwgMCwgMF0gOiBoZXhUb1JnYmEoY29sb3IpO1xuICAgICAgLy8gU2hpZnQtY29uc3RyYWluZWQgZHJhd2luZzogbG9jayB0byBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gICAgICBsZXQgZHJhd1ggPSB4LGRyYXdZID0geTtcbiAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGRyYXdTdGFydCkge1xuICAgICAgICBjb25zdCBkeCA9IE1hdGguYWJzKHggLSBkcmF3U3RhcnQueCk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoeSAtIGRyYXdTdGFydC55KTtcbiAgICAgICAgaWYgKGR4ID4gZHkpIHtcbiAgICAgICAgICBkcmF3WSA9IGRyYXdTdGFydC55OyAvLyBob3Jpem9udGFsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhd1ggPSBkcmF3U3RhcnQueDsgLy8gdmVydGljYWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gRHJhdyBzbW9vdGggbGluZSBmcm9tIGxhc3QgcG9pbnQgdG8gY3VycmVudCBwb2ludCBmb3IgY29udGludW91cyBzdHJva2VzXG4gICAgICBpZiAobGFzdFBvaW50KSB7XG4gICAgICAgIGRyYXdTbW9vdGhMaW5lKGN0eCwgbGFzdFBvaW50LngsIGxhc3RQb2ludC55LCBkcmF3WCwgZHJhd1ksIHJnYmEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhd1BpeGVsKGN0eCwgZHJhd1gsIGRyYXdZLCByZ2JhKTtcbiAgICAgIH1cbiAgICAgIHNldExhc3RQb2ludCh7IHg6IGRyYXdYLCB5OiBkcmF3WSB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VVcCA9IChlKSA9PiB7XG4gICAgaWYgKCFkcmF3aW5nKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBnZXRQaXhlbENvb3JkcyhlKTtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGlmICh0b29sID09PSBcImxpbmVcIiAmJiBkcmF3U3RhcnQpIHtcbiAgICAgIGRyYXdMaW5lKGN0eCwgZHJhd1N0YXJ0LngsIGRyYXdTdGFydC55LCB4LCB5LCBoZXhUb1JnYmEoY29sb3IpKTtcbiAgICB9XG4gICAgcHVzaEhpc3RvcnkoKTtcbiAgICBpZiAodG9vbCA9PT0gXCJwZW5jaWxcIikgc2V0TGFzdFBvaW50KHsgeCwgeSB9KTtcbiAgICBzZXREcmF3aW5nKGZhbHNlKTtcbiAgICBzZXREcmF3U3RhcnQobnVsbCk7XG4gIH07XG5cbiAgLy8gS2V5Ym9hcmQgc2hvcnRjdXRzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5ID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGFPckN0cmwgPSBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5O1xuICAgICAgLy8gVG9vbCBob3RrZXlzIChubyBtb2RpZmllciBuZWVkZWQpXG4gICAgICBpZiAoIW1ldGFPckN0cmwgJiYgIWUudGFyZ2V0Lm1hdGNoZXMoXCJpbnB1dCwgdGV4dGFyZWFcIikpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZS5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKFRPT0xfSE9US0VZU1trZXldKSB7XG4gICAgICAgICAgc2V0VG9vbChUT09MX0hPVEtFWVNba2V5XSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBVbmRvL1JlZG8gd2l0aCBDbWQvQ3RybCtaXG4gICAgICBpZiAobWV0YU9yQ3RybCAmJiAoZS5rZXkgPT09IFwielwiIHx8IGUua2V5ID09PSBcIlpcIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZS5zaGlmdEtleSkgaGFuZGxlUmVkbygpO2Vsc2UgaGFuZGxlVW5kbygpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXkpO1xuICB9LCBbaGFuZGxlVW5kbywgaGFuZGxlUmVkb10pO1xuXG4gIGNvbnN0IGhhbmRsZUZsaXAgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgY29uc3QgbmV3RGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEoQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IENBTlZBU19TSVpFOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgQ0FOVkFTX1NJWkU7IHgrKykge1xuICAgICAgICBjb25zdCBzID0gKHkgKiBDQU5WQVNfU0laRSArIHgpICogNDtcbiAgICAgICAgY29uc3QgZCA9ICh5ICogQ0FOVkFTX1NJWkUgKyAoQ0FOVkFTX1NJWkUgLSAxIC0geCkpICogNDtcbiAgICAgICAgbmV3RGF0YS5kYXRhW2RdID0gaW1hZ2VEYXRhLmRhdGFbc107XG4gICAgICAgIG5ld0RhdGEuZGF0YVtkICsgMV0gPSBpbWFnZURhdGEuZGF0YVtzICsgMV07XG4gICAgICAgIG5ld0RhdGEuZGF0YVtkICsgMl0gPSBpbWFnZURhdGEuZGF0YVtzICsgMl07XG4gICAgICAgIG5ld0RhdGEuZGF0YVtkICsgM10gPSBpbWFnZURhdGEuZGF0YVtzICsgM107XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEobmV3RGF0YSwgMCwgMCk7XG4gICAgcHVzaEhpc3RvcnkoKTtcbiAgfTtcblxuICBjb25zdCBoaXN0b3J5UmVmID0gdXNlUmVmKFtdKTtcbiAgY29uc3QgaGlzdG9yeUluZGV4UmVmID0gdXNlUmVmKC0xKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtoaXN0b3J5UmVmLmN1cnJlbnQgPSBoaXN0b3J5O30sIFtoaXN0b3J5XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7aGlzdG9yeUluZGV4UmVmLmN1cnJlbnQgPSBoaXN0b3J5SW5kZXg7fSwgW2hpc3RvcnlJbmRleF0pO1xuXG4gIGNvbnN0IGhhbmRsZVVuZG8gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SGlzdG9yeUluZGV4KChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXdJZHggPSBNYXRoLm1heCgwLCBwcmV2IC0gMSk7XG4gICAgICBjb25zdCBzbmFwID0gaGlzdG9yeVJlZi5jdXJyZW50W25ld0lkeF07XG4gICAgICBpZiAoc25hcCkge1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXNSZWYuY3VycmVudD8uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShzbmFwLCAwLCAwKTtcbiAgICAgICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzUmVmLmN1cnJlbnQudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICAgIHNhdmVXYWxsTGF5ZXJTcHJpdGUoc2VsZWN0ZWRMZXZlbFJlZi5jdXJyZW50LCBzZWxlY3RlZExheWVyUmVmLmN1cnJlbnQsIGRhdGFVcmwpO1xuICAgICAgICAgIGludmFsaWRhdGVXYWxsTGF5ZXJDYWNoZShzZWxlY3RlZExldmVsUmVmLmN1cnJlbnQsIHNlbGVjdGVkTGF5ZXJSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJZHg7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVSZWRvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3SWR4ID0gTWF0aC5taW4oaGlzdG9yeVJlZi5jdXJyZW50Lmxlbmd0aCAtIDEsIHByZXYgKyAxKTtcbiAgICAgIGNvbnN0IHNuYXAgPSBoaXN0b3J5UmVmLmN1cnJlbnRbbmV3SWR4XTtcbiAgICAgIGlmIChzbmFwKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50Py5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKHNuYXAsIDAsIDApO1xuICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXNSZWYuY3VycmVudC50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgICAgc2F2ZVdhbGxMYXllclNwcml0ZShzZWxlY3RlZExldmVsUmVmLmN1cnJlbnQsIHNlbGVjdGVkTGF5ZXJSZWYuY3VycmVudCwgZGF0YVVybCk7XG4gICAgICAgICAgaW52YWxpZGF0ZVdhbGxMYXllckNhY2hlKHNlbGVjdGVkTGV2ZWxSZWYuY3VycmVudCwgc2VsZWN0ZWRMYXllclJlZi5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0lkeDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGRpc3BsYXlTaXplID0gQ0FOVkFTX1NJWkU7IC8vIGNhbnZhcyBET00gc2l6ZSBpcyBmaXhlZDsgem9vbSBpcyBDU1MgdHJhbnNmb3JtIG9ubHlcblxuICBjb25zdCBoYW5kbGVDYW52YXNXaGVlbCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldFpvb20oKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IGUuZGVsdGFZIDwgMCA/IDEuMSA6IDEgLyAxLjE7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoMC4zLCBNYXRoLm1pbihwcmV2ICogZmFjdG9yLCAxNikpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6MzYwOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotWzExMF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODVcIj5cbiAgICAgIHtzaG93UHVibGlzaENvbmZpcm0gJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjM2Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCIgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBcImluaGVyaXRcIiB9fT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozNjM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHAtNSB3LVszMjBweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDExMTdcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjZjU5ZTBiXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozNjQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVsxMHB4XSB0ZXh0LXllbGxvdy00MDAgbWItMlwiPlNFTkQgVE8gR0FNRT88L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjM2NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXdoaXRlIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNlbGVjdGVkTGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PldhbGwgTHYue3NlbGVjdGVkTGV2ZWx9IOKAlCB7V0FMTF9MSU5LX0xBQkVMU1tzZWxlY3RlZExheWVyXX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjM2NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItNFwiPlxuICAgICAgICAgICAgICBUaGlzIGxheWVyIHdpbGwgcmVuZGVyIG92ZXIgd2FsbCB0aWxlcyB3aXRoIGFkamFjZW50IG5laWdoYm9ycyBpbiB0aGlzIGRpcmVjdGlvbi4gUGVyc2lzdHMgYWZ0ZXIgcmVsb2FkLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozNjk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjM3MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dQdWJsaXNoQ29uZmlybShmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICMzMzQxNTVcIiB9fT5cbiAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjM3NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgICAgICAgICBwdWJsaXNoV2FsbExheWVyKHNlbGVjdGVkTGV2ZWwsIHNlbGVjdGVkTGF5ZXIsIGRhdGFVcmwsIGFjdGl2ZVZhcmlhbnQpO1xuICAgICAgICAgICAgICAgIGludmFsaWRhdGVQdWJsaXNoZWRXYWxsTGF5ZXJDYWNoZShzZWxlY3RlZExldmVsLCBzZWxlY3RlZExheWVyLCBhY3RpdmVWYXJpYW50KTtcbiAgICAgICAgICAgICAgICBzZXRJc1B1Ymxpc2hlZCh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRTaG93UHVibGlzaENvbmZpcm0oZmFsc2UpO1xuICAgICAgICAgICAgfX0gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1ibGFja1wiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2Y1OWUwYlwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNmYmJmMjRcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImFjdGl2ZVZhcmlhbnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICAgIOKckyBTRU5EIFRPIEdBTUUgKHthY3RpdmVWYXJpYW50fSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozOTA6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWExYVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM0YjU1NjNcIiwgd2lkdGg6IFwiMTAwdndcIiwgaGVpZ2h0OiBcIjEwMHZoXCIgfX0+XG4gICAgICAgIHsvKiBUaXRsZSAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6MzkyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS0yIGJvcmRlci1iXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQyZFwiLCBiYWNrZ3JvdW5kOiBcIiMxMTFcIiB9fT5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6MzkzOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTMwMFwiPvCfp7EgV0FMTCBMSU5LIExBWUVSIEVESVRPUiDigJQgREVWIE1PREU8L3NwYW4+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6Mzk0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozOTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPkF1dG8tc2F2ZXM8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozOTY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVVbmRvfSB0aXRsZT1cIlVuZG8gKENtZCtaKVwiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48Um90YXRlQ2N3IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozOTY6MTM2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE0fSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6Mzk3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlUmVkb30gdGl0bGU9XCJSZWRvIChDbWQrU2hpZnQrWilcIiBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+PFJvdGF0ZUN3IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjozOTc6MTQyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE0fSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6Mzk4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlRmxpcH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0xIHJvdW5kZWQgZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LWJsdWUtMzAwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWUzYTVmXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzNiODJmNlwiIH19PlxuICAgICAgICAgICAgIDxGbGlwSG9yaXpvbnRhbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6Mzk5OjEzXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPkZsaXAgSFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MDE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7Y29uc3Qga2V5ID0gYHdhbGxfbGF5ZXJfc3ByaXRlc18ke3NlbGVjdGVkTGV2ZWx9XyR7c2VsZWN0ZWRMYXllcn1gO2NvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO2lmIChkYXRhKSB7bG9jYWxTdG9yYWdlLnNldEl0ZW0oYHdhbGxfbGF5ZXJfY2xpcGJvYXJkXyR7c2VsZWN0ZWRMZXZlbH1fJHtzZWxlY3RlZExheWVyfWAsIGRhdGEpO319fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwMDg0ZmZcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMDA1NWNjXCIsIGNvbG9yOiBcIiNmZmZcIiB9fT7wn5OLIENPUFkgTEFZRVI8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQwMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYHdhbGxfbGF5ZXJfY2xpcGJvYXJkXyR7c2VsZWN0ZWRMZXZlbH1fJHtzZWxlY3RlZExheWVyfWApO2lmIChkYXRhKSB7Y29uc3Qga2V5ID0gYHdhbGxfbGF5ZXJfc3ByaXRlc18ke3NlbGVjdGVkTGV2ZWx9XyR7c2VsZWN0ZWRMYXllcn1gO2xvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGF0YSk7aW52YWxpZGF0ZVB1Ymxpc2hlZFdhbGxMYXllckNhY2hlKHNlbGVjdGVkTGV2ZWwsIHNlbGVjdGVkTGF5ZXIpO3NldElzUHVibGlzaGVkKHRydWUpO319fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwMGIzNzlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMDA4NDRhXCIsIGNvbG9yOiBcIiNmZmZcIiB9fT7wn5OlIFBBU1RFIExBWUVSPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MDM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93VmFyaWFudE1vZGFsKHRydWUpfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJkNGVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGMxZDk1XCIsIGNvbG9yOiBcIiNjMDg0ZmNcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImFjdGl2ZVZhcmlhbnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICDwn5OLIHthY3RpdmVWYXJpYW50fSA8Q2hldnJvbkRvd24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQwNDozM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMH0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDA2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1B1Ymxpc2hDb25maXJtKHRydWUpfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBpc1B1Ymxpc2hlZCA/IFwiIzE0NTMyZFwiIDogXCIjMWUzYTVmXCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2lzUHVibGlzaGVkID8gXCIjNGFkZTgwXCIgOiBcIiNmNTllMGJcIn1gLCBjb2xvcjogaXNQdWJsaXNoZWQgPyBcIiM0YWRlODBcIiA6IFwiI2ZiYmYyNFwiIH19PlxuICAgICAgICAgICAgICA8U2VuZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDA3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezExfSAvPntpc1B1Ymxpc2hlZCA/IFwiTElWRVwiIDogXCJTRU5EIFRPIEdBTUVcIn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDA5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MDk6MTEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MTM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC0xIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHsvKiBMZWZ0OiBMZXZlbCArIExheWVyIHNlbGVjdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MTU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHAtMyBnYXAtMyBib3JkZXItciBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDJkXCIsIGJhY2tncm91bmQ6IFwiIzExMVwiLCBtaW5XaWR0aDogXCIxNDBweFwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDE2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQxNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbWItMVwiPldBTEwgTEVWRUw8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDE4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBNQVhfV0FMTF9MRVZFTCB9LCAoXywgaSkgPT4gaSArIDEpLm1hcCgobHZsKSA9PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQyMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17bHZsfSBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZExldmVsKGx2bCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBzZWxlY3RlZExldmVsID09PSBsdmwgPyBcIiMzNzQxNTFcIiA6IFwiIzFhMWExYVwiLCBib3JkZXI6IGAxcHggc29saWQgJHtzZWxlY3RlZExldmVsID09PSBsdmwgPyBcIiM2YjcyODBcIiA6IFwiIzJkMmQyZFwifWAsIGNvbG9yOiBzZWxlY3RlZExldmVsID09PSBsdmwgPyBcIiNmZmZcIiA6IFwiIzc3N1wiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibHZsXCI+XG4gICAgICAgICAgICAgICAgICAgIExldmVsIHtsdmx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDI4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0Mjk6MTVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5XQUxMIExBWUVSPC9kaXY+XG4gICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0MzA6MTVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZExheWVyKFwiYmFzZVwiKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1iLTEgcHgtMiBweS0xLjUgcm91bmRlZCBmb250LXVpIHRleHQteHMgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZExheWVyID09PSBcImJhc2VcIiA/IFwiIzM3NDE1MVwiIDogXCIjMWExYTFhXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7c2VsZWN0ZWRMYXllciA9PT0gXCJiYXNlXCIgPyBcIiM2YjcyODBcIiA6IFwiIzJkMmQyZFwifWAsXG4gICAgICAgICAgICAgICAgY29sb3I6IHNlbGVjdGVkTGF5ZXIgPT09IFwiYmFzZVwiID8gXCIjZmZmXCIgOiBcIiM1NTVcIlxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQzNzoxN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5CQVNFPC9zcGFuPlxuICAgICAgICAgICAgICAgICA8YnIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQzODoxN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPjxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0Mzg6MjNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1bOXB4XVwiPkJhc2UgTGF5ZXI8L3NwYW4+XG4gICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgIHtXQUxMX0xJTktfTEFZRVJTLm1hcCgobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNTcHJpdGUgPSAhIWdldFdhbGxMYXllclNwcml0ZShzZWxlY3RlZExldmVsLCBsYXllcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ0MzoxOVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17bGF5ZXJ9IG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkTGF5ZXIobGF5ZXIpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1iLTEgcHgtMiBweS0xLjUgcm91bmRlZCBmb250LXVpIHRleHQteHMgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkTGF5ZXIgPT09IGxheWVyID8gXCIjMzc0MTUxXCIgOiBcIiMxYTFhMWFcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7c2VsZWN0ZWRMYXllciA9PT0gbGF5ZXIgPyBcIiM2YjcyODBcIiA6IGhhc1Nwcml0ZSA/IFwiIzRiNTU2M1wiIDogXCIjMmQyZDJkXCJ9YCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNlbGVjdGVkTGF5ZXIgPT09IGxheWVyID8gXCIjZmZmXCIgOiBoYXNTcHJpdGUgPyBcIiNjY2NcIiA6IFwiIzU1NVwiXG4gICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0NTA6MjFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57bGF5ZXIudG9VcHBlckNhc2UoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICA8YnIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ1MToyMVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPjxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0NTE6MjdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYXllclwiPntXQUxMX0xJTktfTEFCRUxTW2xheWVyXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICB7aGFzU3ByaXRlICYmIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0NTI6MzVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwibWwtMSB0ZXh0LWdyZWVuLTUwMCB0ZXh0LVs4cHhdXCI+4pyTPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xuXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDU3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ1ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbWItMVwiPlRPT0xTPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ1OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICB7VE9PTFMubWFwKCh0LCBfX2FycklkeF9fKSA9PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ2MToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17dC5pZH0gb25DbGljaz17KCkgPT4gc2V0VG9vbCh0LmlkKX0gdGl0bGU9e3QudGl0bGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIHRleHQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHRvb2wgPT09IHQuaWQgPyBcIiMzNzQxNTFcIiA6IFwiIzFhMWExYVwiLCBib3JkZXI6IGAxcHggc29saWQgJHt0b29sID09PSB0LmlkID8gXCIjNmI3MjgwXCIgOiBcIiMyZDJkMmRcIn1gIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0Py5pZH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJUT09MU1wiIGRhdGEtYXJyLWZpZWxkPVwibGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAge3QubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDY5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ3MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbWItMVwiPkJSVVNIIFNJWkU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDcxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIHtbMSwgMiwgM10ubWFwKChzLCBfX2FycklkeF9fKSA9PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ3MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17c30gb25DbGljaz17KCkgPT4gc2V0QnJ1c2hTaXplKHMpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNiByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtdWlcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IGJydXNoU2l6ZSA9PT0gcyA/IFwiIzM3NDE1MVwiIDogXCIjMWExYTFhXCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2JydXNoU2l6ZSA9PT0gcyA/IFwiIzZiNzI4MFwiIDogXCIjMmQyZDJkXCJ9YCwgY29sb3I6IGJydXNoU2l6ZSA9PT0gcyA/IFwiI2ZmZlwiIDogXCIjNzc3XCIgfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199PlxuICAgICAgICAgICAgICAgICAgICB7c31weFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDZW50ZXI6IENhbnZhcyAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0ODQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0IHAtNCBnYXAtMyBvdmVyZmxvdy1hdXRvIGZsZXgtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBhMGEwYVwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDg1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItMVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0ODY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNlbGVjdGVkTGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICAgIFdhbGwgTHYue3NlbGVjdGVkTGV2ZWx9IOKAlCA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDg3OjQyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNlbGVjdGVkTGF5ZXJcIj57V0FMTF9MSU5LX0xBQkVMU1tzZWxlY3RlZExheWVyXX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0ODk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93QmFzZVdhbGwoKHYpID0+ICF2KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0wLjUgcm91bmRlZCBmb250LXVpIHRleHQtWzEwcHhdXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogc2hvd0Jhc2VXYWxsID8gXCIjMzc0MTUxXCIgOiBcIiMxYTFhMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGI1NTYzXCIsIGNvbG9yOiBzaG93QmFzZVdhbGwgPyBcIiNmZmZcIiA6IFwiIzU1NVwiIH19PlxuICAgICAgICAgICAgICAgIHtzaG93QmFzZVdhbGwgPyA8RXllIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo0OTI6MzJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTB9IC8+IDogPEV5ZU9mZiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDkyOjUyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPn1cbiAgICAgICAgICAgICAgICBCYXNlIFdhbGxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ5NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjQ5NjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj57KHpvb20gKiAxMDApLnRvRml4ZWQoMCl9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NDk3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTYwMFwiPnNjcm9sbCBjYW52YXMgdG8gem9vbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENvbXBvc2l0ZSBjYW52YXM6IGJhc2Ugd2FsbCAoZGltbWVkKSArIGxheWVyIG9uIHRvcCAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjUwMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsIHdpZHRoOiBkaXNwbGF5U2l6ZSwgaGVpZ2h0OiBkaXNwbGF5U2l6ZSwgdHJhbnNmb3JtOiBgc2NhbGUoJHt6b29tfSlgLCB0cmFuc2Zvcm1PcmlnaW46IFwidG9wIGNlbnRlclwiLCB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjA1cyBlYXNlLW91dFwiIH19PlxuICAgICAgICAgICAgICB7LyogQ2hlY2tlcmJvYXJkICovfVxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1MDQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsIGluc2V0OiAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnJTNFJTNDcmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSclMjM0NDQnLyUzRSUzQ3JlY3QgeD0nOCcgeT0nOCcgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nJTIzNDQ0Jy8lM0UlM0NyZWN0IHg9JzgnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyUyMzIyMicvJTNFJTNDcmVjdCB5PSc4JyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSclMjMyMjInLyUzRSUzQy9zdmclM0VcXFwiKVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiBgMTZweGBcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgey8qIEJhc2Ugd2FsbCBhcyBmYWludCBiYWNrZHJvcCAqL31cbiAgICAgICAgICAgICAge3Nob3dCYXNlV2FsbCAmJiBiYXNlV2FsbERhdGFVcmwgJiZcbiAgICAgICAgICAgICAgPGltZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NTExOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtiYXNlV2FsbERhdGFVcmx9IGFsdD1cIlwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIGluc2V0OiAwLCB3aWR0aDogZGlzcGxheVNpemUsIGhlaWdodDogZGlzcGxheVNpemUsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiLCBvcGFjaXR5OiAwLjI1LCBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fSAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsvKiBMYXllciBjYW52YXMgKHRoZSBlZGl0YWJsZSBvbmUpICovfVxuICAgICAgICAgICAgICA8Y2FudmFzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1MTU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgICAgICAgd2lkdGg9e0NBTlZBU19TSVpFfVxuICAgICAgICAgICAgICBoZWlnaHQ9e0NBTlZBU19TSVpFfVxuICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCwgd2lkdGg6IGRpc3BsYXlTaXplLCBoZWlnaHQ6IGRpc3BsYXlTaXplLCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiwgY3Vyc29yOiBcImNyb3NzaGFpclwiIH19XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVDYW52YXNNb3VzZU1vdmV9XG4gICAgICAgICAgICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7c2V0Q3Vyc29yUG9zKG51bGwpO2lmIChkcmF3aW5nKSB7cHVzaEhpc3RvcnkoKTtzZXREcmF3aW5nKGZhbHNlKTt9fX1cbiAgICAgICAgICAgICAgb25XaGVlbD17aGFuZGxlQ2FudmFzV2hlZWx9IC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7em9vbSA+PSAyICYmXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjUyNzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgaW5zZXQ6IDAsIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIDFweCwgdHJhbnNwYXJlbnQgMXB4KSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIDFweCwgdHJhbnNwYXJlbnQgMXB4KWAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6IGAxcHggMXB4YFxuICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsvKiBDdXJzb3Igb3V0bGluZSByaW5nIGZvciBkcmF3aW5nIHRvb2xzICovfVxuICAgICAgICAgICAgICB7Y3Vyc29yUG9zICYmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiZXJhc2VyXCIpICYmXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjUzNToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBsZWZ0OiBjdXJzb3JQb3MueCxcbiAgICAgICAgICAgICAgICB0b3A6IGN1cnNvclBvcy55LFxuICAgICAgICAgICAgICAgIHdpZHRoOiBicnVzaFNpemUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBicnVzaFNpemUsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke3Rvb2wgPT09IFwiZXJhc2VyXCIgPyBcIiNlZjQ0NDRcIiA6IGNvbG9yfWAsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCA0cHggJHt0b29sID09PSBcImVyYXNlclwiID8gXCIjZWY0NDQ0XCIgOiBjb2xvcn0sIDAgMCA4cHggJHt0b29sID09PSBcImVyYXNlclwiID8gXCIjZWY0NDQ0ODhcIiA6IGNvbG9yICsgXCI4OFwifWBcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1NDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIERyYXcgdGhlIG92ZXJsYXkgc3ByaXRlIHRoYXQgYXBwZWFycyB3aGVuIGEgd2FsbCBoYXMgYW4gYWRqYWNlbnQgbmVpZ2hib3IgaW4gdGhpcyBkaXJlY3Rpb24uXG4gICAgICAgICAgICAgIHtsYXN0UG9pbnQgJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU1MToyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy02MDBcIj4gwrcg4pePIGFuY2hvcjwvc3Bhbj59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSaWdodDogQ29sb3IgcGlja2VyICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU1NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcC0zIGdhcC0zIGJvcmRlci1sIG92ZXJmbG93LXktYXV0b1wiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiMyZDJkMmRcIiwgYmFja2dyb3VuZDogXCIjMTExXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1NTc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5DT0xPUjwvZGl2PlxuICAgICAgICAgICAgPFNwZWN0cnVtQ29sb3JQaWNrZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU1ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNvbG9yPXtjb2xvcn0gb25DaGFuZ2U9e3NldENvbG9yfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NTU5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge2NvbnN0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50Py5nZXRDb250ZXh0KFwiMmRcIik7aWYgKGN0eCkge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtwdXNoSGlzdG9yeSgpO319fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtcmVkLTQwMCBob3ZlcjpiZy1yZWQtOTAwLzMwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjN2YxZDFkXCIgfX0+XG4gICAgICAgICAgICAgIENMRUFSIExBWUVSXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZhcmlhbnQgTWFuYWdlciBNb2RhbCAqL31cbiAgICAgIHtzaG93VmFyaWFudE1vZGFsICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1Njk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84MFwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU3MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgcC01IHctWzQwMHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM3YzNhZWRcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU3MToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LXB1cnBsZS00MDAgbWItM1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2VsZWN0ZWRMZXZlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+VkFSSUFOVFMg4oCUIFdhbGwgTHYue3NlbGVjdGVkTGV2ZWx9IHtXQUxMX0xJTktfTEFCRUxTW3NlbGVjdGVkTGF5ZXJdfTwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1NzM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NTc0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBuZXdWYXIgPSBgdmFyXyR7dmFyaWFudExpc3QubGVuZ3RoICsgMX1gO1xuICAgICAgICAgICAgICBzZXRWYXJpYW50TGlzdChbLi4udmFyaWFudExpc3QsIG5ld1Zhcl0pO1xuICAgICAgICAgICAgICBzZXRBY3RpdmVWYXJpYW50U3RhdGUobmV3VmFyKTtcbiAgICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgaWYgKGN0eCkge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtwdXNoSGlzdG9yeSgpO31cbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwNTk2NjlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMTBiOTgxXCIgfX0+XG4gICAgICAgICAgICAgICAgPFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU4MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMn0gY2xhc3NOYW1lPVwiaW5saW5lIG1yLTFcIiAvPk5FVyBWQVJJQU5UXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1ODM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93VmFyaWFudE1vZGFsKGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJnLXNsYXRlLTcwMFwiIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzQ0NFwiIH19PlxuICAgICAgICAgICAgICAgIENMT1NFXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yOjU4OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ2FwLTIgbWItNFwiIHN0eWxlPXt7IGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDIsIDFmcilcIiB9fT5cbiAgICAgICAgICAgICAge3ZhcmlhbnRMaXN0Lm1hcCgodmFySWQpID0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo1OTE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAga2V5PXt2YXJJZH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlVmFyaWFudFN0YXRlKHZhcklkKTtcbiAgICAgICAgICAgICAgLy8gTG9hZCB0aGlzIHZhcmlhbnQncyBzcHJpdGVcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBnZXRXYWxsTGF5ZXJTcHJpdGUoc2VsZWN0ZWRMZXZlbCwgc2VsZWN0ZWRMYXllciwgdmFySWQpO1xuICAgICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXNSZWYuY3VycmVudD8uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7Y3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO2N0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtwdXNoSGlzdG9yeSgpO307XG4gICAgICAgICAgICAgICAgICBpbWcuc3JjID0gZXhpc3Rpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgICAgICAgICAgICAgIHB1c2hIaXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFNob3dWYXJpYW50TW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0yIGZvbnQtdWkgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnRcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogYWN0aXZlVmFyaWFudCA9PT0gdmFySWQgPyBcIiM3YzNhZWRcIiA6IFwiIzJkMmQ0ZVwiLFxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHthY3RpdmVWYXJpYW50ID09PSB2YXJJZCA/IFwiI2E4NTVmN1wiIDogXCIjM2QzZDVlXCJ9YCxcbiAgICAgICAgICAgICAgY29sb3I6IGFjdGl2ZVZhcmlhbnQgPT09IHZhcklkID8gXCIjZmZmXCIgOiBcIiNhYWFcIlxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9XYWxsTGF5ZXJFZGl0b3I6NjE3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo2MTg6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInZhcklkXCI+e3ZhcklkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVZhcmlhbnQgPT09IHZhcklkICYmIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvcjo2MTk6NDhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDAgdGV4dC1bMTBweF1cIj7inJMgQUNUSVZFPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2dhbWUvV2FsbExheWVyRWRpdG9yLmpzeCJ9