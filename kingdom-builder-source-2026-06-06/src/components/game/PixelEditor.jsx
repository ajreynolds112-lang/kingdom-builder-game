import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/PixelEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/PixelEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useState = __vite__cjsImport3_react["useState"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { X, Save, RotateCcw, RotateCw, ChevronDown, Copy, Send, Plus, Trash2, Upload, Download } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { BUILDING_DEFS } from "/src/lib/gameConstants.js";
import { saveSprite, getSprite, invalidateSpriteCache, getVariantList, getActiveVariant, setActiveVariant, createNewVariant, deleteVariant } from "/src/lib/buildingSprites.js";
import { publishBuildingSprite, isPublishedBuilding, invalidatePublishedBuildingCache } from "/src/lib/publishedSprites.js";
import SpectrumColorPicker from "/src/components/game/SpectrumColorPicker.jsx";
const CANVAS_SIZE = 256;
const MAX_HISTORY = 100;
const PALETTE = [
  "#000000",
  "#111111",
  "#222222",
  "#333333",
  "#444444",
  "#555555",
  "#666666",
  "#777777",
  "#888888",
  "#999999",
  "#aaaaaa",
  "#bbbbbb",
  "#cccccc",
  "#dddddd",
  "#eeeeee",
  "#ffffff",
  "#ff0000",
  "#ff4400",
  "#ff8800",
  "#ffcc00",
  "#ffff00",
  "#88ff00",
  "#00ff00",
  "#00ff88",
  "#00ffff",
  "#0088ff",
  "#0000ff",
  "#8800ff",
  "#ff00ff",
  "#ff0088",
  "#ff88aa",
  "#ffccaa",
  "#880000",
  "#884400",
  "#884400",
  "#886600",
  "#888800",
  "#448800",
  "#008800",
  "#008844",
  "#008888",
  "#004488",
  "#000088",
  "#440088",
  "#880088",
  "#880044",
  "#884466",
  "#886644",
  "#ff8888",
  "#ffaa88",
  "#ffcc88",
  "#ffee88",
  "#ffff88",
  "#aaff88",
  "#88ff88",
  "#88ffaa",
  "#88ffff",
  "#88aaff",
  "#8888ff",
  "#aa88ff",
  "#ff88ff",
  "#ff88aa",
  "#ffaabb",
  "#ffd8a8",
  "#440000",
  "#442200",
  "#441100",
  "#443300",
  "#444400",
  "#224400",
  "#004400",
  "#004422",
  "#004444",
  "#002244",
  "#000044",
  "#220044",
  "#440044",
  "#440022",
  "#442233",
  "#443322",
  "#ff6666",
  "#ff9966",
  "#ffbb66",
  "#ffdd66",
  "#ffff66",
  "#99ff66",
  "#66ff66",
  "#66ff99",
  "#66ffff",
  "#6699ff",
  "#6666ff",
  "#9966ff",
  "#ff66ff",
  "#ff6699",
  "#ff99bb",
  "#ffd699",
  // transparent
  "transparent"
];
const TOOLS = [
  { id: "pencil", label: "✏️", title: "Pencil (P)" },
  { id: "brush", label: "🖌️", title: "Brush (B)" },
  { id: "eraser", label: "⌫", title: "Eraser (E)" },
  { id: "bucket", label: "🪣", title: "Fill (F)" },
  { id: "eyedropper", label: "💉", title: "Eyedropper (I)" },
  { id: "line", label: "╱", title: "Line (L)" },
  { id: "rect", label: "▭", title: "Rectangle (R)" },
  { id: "circle", label: "○", title: "Circle (C)" }
];
const TOOL_HOTKEYS = {
  p: "pencil",
  b: "brush",
  e: "eraser",
  f: "bucket",
  i: "eyedropper",
  l: "line",
  r: "rect",
  c: "circle"
};
const BRUSH_SIZES = [1, 2, 3, 5, 8];
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
export default function PixelEditor({ onClose, id }) {
  _s();
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(1);
  const [color, setColor] = useState("#ff0000");
  const [customHex, setCustomHex] = useState("#ff0000");
  const [zoom, setZoom] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedBuilding, setSelectedBuilding] = useState(Object.keys(BUILDING_DEFS)[0]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState(null);
  const [saved, setSaved] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [cursorPos, setCursorPos] = useState(null);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copyTargetLevels, setCopyTargetLevels] = useState([]);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [selectedWallLayer, setSelectedWallLayer] = useState("base");
  const [variantList, setVariantList] = useState([]);
  const [activeVariant, setActiveVariantState] = useState("default");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [overlayImage, setOverlayImage] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const fileInputRef = useRef(null);
  useEffect(() => {
    setIsPublished(isPublishedBuilding(selectedBuilding, selectedLevel));
    const variants = getVariantList(selectedBuilding, selectedLevel);
    const active = getActiveVariant(selectedBuilding, selectedLevel);
    setVariantList(variants.length > 0 ? variants : ["default"]);
    setActiveVariantState(active || "default");
  }, [selectedBuilding, selectedLevel]);
  const pixelDataRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prevBuildingRef.current !== selectedBuilding || prevLevelRef.current !== selectedLevel) {
      const dataUrl = canvas.toDataURL("image/png");
      saveSprite(prevBuildingRef.current, prevLevelRef.current, dataUrl, prevVariantRef.current);
      invalidateSpriteCache(prevBuildingRef.current, prevLevelRef.current);
      prevBuildingRef.current = selectedBuilding;
      prevLevelRef.current = selectedLevel;
      prevVariantRef.current = activeVariant;
    }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const existing = getSprite(selectedBuilding, selectedLevel, activeVariant);
    if (existing) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.drawImage(img, 0, 0);
        pixelDataRef.current = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        setHistory([ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)]);
        setHistoryIndex(0);
      };
      img.src = existing;
    } else {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      pixelDataRef.current = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      setHistory([ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)]);
      setHistoryIndex(0);
    }
  }, [selectedBuilding, selectedLevel]);
  const selectedBuildingRef = useRef(selectedBuilding);
  const selectedLevelRef = useRef(selectedLevel);
  const prevBuildingRef = useRef(selectedBuilding);
  const prevLevelRef = useRef(selectedLevel);
  const prevVariantRef = useRef(activeVariant);
  useEffect(() => {
    selectedBuildingRef.current = selectedBuilding;
  }, [selectedBuilding]);
  useEffect(() => {
    selectedLevelRef.current = selectedLevel;
  }, [selectedLevel]);
  useEffect(() => {
    prevVariantRef.current = activeVariant;
  }, [activeVariant]);
  const pushHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setHistory((prev) => {
      const newH = prev.slice(0, prev.length).concat([data]);
      if (newH.length > MAX_HISTORY) newH.shift();
      return newH;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    const dataUrl = canvas.toDataURL("image/png");
    saveSprite(selectedBuildingRef.current, selectedLevelRef.current, dataUrl, activeVariant);
    invalidateSpriteCache(selectedBuildingRef.current, selectedLevelRef.current);
  }, [activeVariant]);
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
      if (metaOrCtrl && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        handleSave();
        return;
      }
      if (metaOrCtrl && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [history, historyIndex]);
  const historyRef = useRef([]);
  const historyIndexRef2 = useRef(-1);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    historyIndexRef2.current = historyIndex;
  }, [historyIndex]);
  const handleUndo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.max(0, prev - 1);
      const snap = historyRef.current[newIdx];
      if (snap) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
          ctx.putImageData(snap, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          saveSprite(selectedBuildingRef.current, selectedLevelRef.current, dataUrl);
          invalidateSpriteCache(selectedBuildingRef.current, selectedLevelRef.current);
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
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
          ctx.putImageData(snap, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          saveSprite(selectedBuildingRef.current, selectedLevelRef.current, dataUrl);
          invalidateSpriteCache(selectedBuildingRef.current, selectedLevelRef.current);
        }
      }
      return newIdx;
    });
  }, []);
  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    saveSprite(selectedBuilding, selectedLevel, dataUrl, activeVariant);
    invalidateSpriteCache(selectedBuilding, selectedLevel);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  }, [selectedBuilding, selectedLevel, activeVariant]);
  const handleCopyToLevels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || copyTargetLevels.length === 0) return;
    const dataUrl = canvas.toDataURL("image/png");
    copyTargetLevels.forEach((lvl) => {
      saveSprite(selectedBuilding, lvl, dataUrl, activeVariant);
      invalidateSpriteCache(selectedBuilding, lvl);
    });
    setCopyFeedback(`Copied to level${copyTargetLevels.length > 1 ? "s" : ""} ${copyTargetLevels.sort((a, b) => a - b).join(", ")}!`);
    setTimeout(() => {
      setCopyFeedback("");
      setShowCopyModal(false);
      setCopyTargetLevels([]);
    }, 2e3);
  }, [selectedBuilding, copyTargetLevels, activeVariant]);
  const toggleCopyLevel = (lvl) => {
    setCopyTargetLevels(
      (prev) => prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };
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
  const floodFill = (ctx, startX, startY, fillColor) => {
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;
    const idx = (startY * CANVAS_SIZE + startX) * 4;
    const targetR = data[idx], targetG = data[idx + 1], targetB = data[idx + 2], targetA = data[idx + 3];
    const [fillR, fillG, fillB, fillA] = fillColor;
    if (targetR === fillR && targetG === fillG && targetB === fillB && targetA === fillA) return;
    const stack = [[startX, startY]];
    const visited = new Uint8Array(CANVAS_SIZE * CANVAS_SIZE);
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= CANVAS_SIZE || y < 0 || y >= CANVAS_SIZE) continue;
      const i = y * CANVAS_SIZE + x;
      if (visited[i]) continue;
      const pi = i * 4;
      if (data[pi] !== targetR || data[pi + 1] !== targetG || data[pi + 2] !== targetB || data[pi + 3] !== targetA) continue;
      visited[i] = 1;
      if (fillA === 0) {
        data[pi + 3] = 0;
      } else {
        data[pi] = fillR;
        data[pi + 1] = fillG;
        data[pi + 2] = fillB;
        data[pi + 3] = fillA;
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
  const drawRect = (ctx, x0, y0, x1, y1, rgba) => {
    const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
    for (let x = minX; x <= maxX; x++) {
      drawPixel(ctx, x, minY, rgba);
      drawPixel(ctx, x, maxY, rgba);
    }
    for (let y = minY; y <= maxY; y++) {
      drawPixel(ctx, minX, y, rgba);
      drawPixel(ctx, maxX, y, rgba);
    }
  };
  const drawCircle = (ctx, centerX, centerY, radius, rgba, fill = false) => {
    const cx = Math.round(centerX);
    const cy = Math.round(centerY);
    const r = Math.round(radius);
    if (r <= 0) return;
    const rSquared = r * r;
    if (fill) {
      for (let y = 0; y < CANVAS_SIZE; y++) {
        for (let x = 0; x < CANVAS_SIZE; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const distSquared = dx * dx + dy * dy;
          if (distSquared <= rSquared) {
            drawPixel(ctx, x, y, rgba);
          }
        }
      }
    } else {
      let x = r, y = 0;
      let err = 0;
      while (x >= y) {
        drawPixel(ctx, cx + x, cy + y, rgba);
        drawPixel(ctx, cx + y, cy + x, rgba);
        drawPixel(ctx, cx - y, cy + x, rgba);
        drawPixel(ctx, cx - x, cy + y, rgba);
        drawPixel(ctx, cx - x, cy - y, rgba);
        drawPixel(ctx, cx - y, cy - x, rgba);
        drawPixel(ctx, cx + y, cy - x, rgba);
        drawPixel(ctx, cx + x, cy - y, rgba);
        y++;
        err += 1 + 2 * y;
        if (2 * (err - x) + 1 > 0) {
          x--;
          err += 1 - 2 * x;
        }
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
      if (hex !== "transparent") {
        setColor(hex);
        setCustomHex(hex);
      }
      return;
    }
    if (tool === "bucket") {
      floodFill(ctx, x, y, hexToRgba(color));
      pushHistory();
      return;
    }
    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
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
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
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
    const rgba = hexToRgba(color);
    if (tool === "line" && drawStart) {
      drawLine(ctx, drawStart.x, drawStart.y, x, y, rgba);
      pushHistory();
      setLastPoint({ x, y });
    } else if (tool === "rect" && drawStart) {
      drawRect(ctx, drawStart.x, drawStart.y, x, y, rgba);
      pushHistory();
    } else if (tool === "circle" && drawStart) {
      const radius = Math.max(1, Math.min(200, Math.sqrt(Math.pow(x - drawStart.x, 2) + Math.pow(y - drawStart.y, 2))));
      drawCircle(ctx, drawStart.x, drawStart.y, radius, rgba, e.shiftKey);
      pushHistory();
    } else if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      pushHistory();
      setLastPoint({ x, y });
    }
    setDrawing(false);
    setDrawStart(null);
  };
  const handleCanvasMouseMove = (e) => {
    const { x, y } = getPixelCoords(e);
    setCursorPos({ x, y });
    handleMouseMove(e);
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    pushHistory();
  };
  const handleCustomHex = (val) => {
    setCustomHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setColor(val);
  };
  const displaySize = CANVAS_SIZE;
  const handleCanvasWheel = (e) => {
    e.preventDefault();
    setZoom((prev) => {
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      return Math.max(0.3, Math.min(prev * factor, 16));
    });
  };
  const handleUploadPNG = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        pushHistory();
        setOverlayImage(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${selectedBuilding}_lv${selectedLevel}_${activeVariant}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const handleClearOverlay = () => {
    setOverlayImage(null);
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:565:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:566:6", "data-dynamic-content": "true", className: "relative flex flex-col rounded-xl overflow-hidden shadow-2xl", style: { background: "#1a1a2e", border: "2px solid #4c1d95", width: "100vw", height: "100vh" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:568:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#2d2d4e", background: "#13132a" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:569:10", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:570:12", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-purple-400", children: "🎨 PIXEL EDITOR — DEV MODE" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 589,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:571:12", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "Auto-saves every stroke" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 590,
            columnNumber: 13
          }, this),
          saved && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:572:22", "data-dynamic-content": "false", className: "font-ui text-xs text-green-400 animate-pulse", children: "✓ Copied!" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 591,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 588,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:574:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:575:12", "data-dynamic-content": "true", onClick: handleUndo, title: "Undo (Cmd+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCcw, { "data-source-location": "components/game/PixelEditor:576:14", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 595,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 594,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:578:12", "data-dynamic-content": "true", onClick: handleRedo, title: "Redo (Cmd+Shift+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCw, { "data-source-location": "components/game/PixelEditor:579:14", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 598,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 597,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:581:12", "data-dynamic-content": "true", onClick: handleSave, title: "Save (Cmd+S)", className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#7c3aed", border: "1px solid #a855f7" }, children: [
            /* @__PURE__ */ jsxDEV(Save, { "data-source-location": "components/game/PixelEditor:582:14", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 601,
              columnNumber: 15
            }, this),
            "SAVE"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 600,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:584:12", "data-dynamic-content": "true", onClick: () => {
            const canvas = canvasRef.current;
            if (canvas) {
              const dataUrl = canvas.toDataURL("image/png");
              localStorage.setItem(`building_clipboard_${selectedBuilding}`, dataUrl);
              setSaved(true);
              setTimeout(() => setSaved(false), 1500);
            }
          }, className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#0084ff", border: "1px solid #0055cc" }, children: "📋 COPY" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 603,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:587:12", "data-dynamic-content": "true", onClick: () => {
            const data = localStorage.getItem(`building_clipboard_${selectedBuilding}`);
            if (data) {
              const canvas = canvasRef.current;
              if (canvas) {
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = () => {
                  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                  ctx.drawImage(img, 0, 0);
                  pushHistory();
                };
                img.src = data;
                saveSprite(selectedBuilding, selectedLevel, data);
                invalidateSpriteCache(selectedBuilding, selectedLevel);
                setSaved(true);
                setTimeout(() => setSaved(false), 1500);
              }
            }
          }, className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#00b379", border: "1px solid #00844a" }, children: "📥 PASTE" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 606,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:590:12", "data-dynamic-content": "true", onClick: () => {
            setCopyTargetLevels([]);
            setCopyFeedback("");
            setShowCopyModal(true);
          }, title: "Copy design to other levels", className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#0f766e", border: "1px solid #14b8a6" }, children: [
            /* @__PURE__ */ jsxDEV(Copy, { "data-source-location": "components/game/PixelEditor:591:14", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 610,
              columnNumber: 15
            }, this),
            "COPY TO"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 609,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:593:12", "data-dynamic-content": "true", onClick: () => setShowPublishConfirm(true), title: "Send to Game", className: "px-3 py-1 rounded font-pixel text-[8px] flex items-center gap-1", style: { background: isPublished ? "#14532d" : "#1e3a5f", border: `1px solid ${isPublished ? "#4ade80" : "#f59e0b"}`, color: isPublished ? "#4ade80" : "#fbbf24" }, children: [
            /* @__PURE__ */ jsxDEV(Send, { "data-source-location": "components/game/PixelEditor:594:14", "data-dynamic-content": "false", size: 11 }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 613,
              columnNumber: 15
            }, this),
            isPublished ? "LIVE" : "SEND TO GAME"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 612,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:596:12", "data-dynamic-content": "true", onClick: handleDownloadPNG, title: "Download PNG", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(Download, { "data-source-location": "components/game/PixelEditor:597:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 616,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 615,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:599:12", "data-dynamic-content": "true", onClick: () => fileInputRef.current?.click(), title: "Upload PNG Reference", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(Upload, { "data-source-location": "components/game/PixelEditor:600:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 619,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 618,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "components/game/PixelEditor:602:12",
              "data-dynamic-content": "true",
              ref: fileInputRef,
              type: "file",
              accept: "image/png,image/jpeg",
              onChange: handleUploadPNG,
              className: "hidden"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 621,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:609:12", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/PixelEditor:610:14", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 629,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 628,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 593,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 587,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:615:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:617:10", "data-dynamic-content": "true", className: "flex flex-col gap-3 p-3 border-r overflow-y-auto", style: { borderColor: "#2d2d4e", background: "#13132a", minWidth: "80px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:619:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:620:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "TOOLS" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 639,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:621:14", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-1", children: TOOLS.map(
              (t, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/PixelEditor:623:18",
                  "data-dynamic-content": "true",
                  onClick: () => setTool(t.id),
                  title: t.title,
                  className: "w-8 h-8 rounded text-lg flex items-center justify-center transition-all",
                  style: { background: tool === t.id ? "#7c3aed" : "#2d2d4e", border: `1px solid ${tool === t.id ? "#a855f7" : "#3d3d5e"}` },
                  "data-collection-item-id": t?.id,
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "TOOLS",
                  "data-arr-field": "label",
                  children: t.label
                },
                t.id,
                false,
                {
                  fileName: "/app/src/components/game/PixelEditor.jsx",
                  lineNumber: 642,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 640,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 638,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:637:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:638:14", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-slate-500 mb-1", "data-collection-item-field": "brushSize", "data-collection-item-id": id, children: [
              "SIZE: ",
              brushSize,
              "px"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 657,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/PixelEditor:639:14",
                "data-dynamic-content": "true",
                type: "range",
                min: "1",
                max: "200",
                value: brushSize,
                onChange: (e) => setBrushSize(parseInt(e.target.value)),
                className: "w-full h-6",
                style: { background: "#2d2d4e", accentColor: "#7c3aed" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 658,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 656,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:651:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:652:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "ZOOM" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 671,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:653:14", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-400 text-center", children: [
              (zoom * 100).toFixed(0),
              "%"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 672,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:654:14", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-600 text-center mt-0.5", children: "scroll to zoom" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 673,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 670,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:658:12", "data-dynamic-content": "true", onClick: clearCanvas, className: "px-2 py-1 rounded font-pixel text-[7px] text-red-400 hover:bg-red-900/30", style: { border: "1px solid #7f1d1d" }, children: "CLEAR" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 677,
            columnNumber: 13
          }, this),
          selectedBuilding === "wall" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:664:14", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:665:16", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "WALL LAYER" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 684,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/PixelEditor:666:16",
                "data-dynamic-content": "true",
                onClick: () => setSelectedWallLayer("base"),
                className: "w-full mb-1 px-2 py-1 rounded font-ui text-xs text-left transition-all",
                style: {
                  background: selectedWallLayer === "base" ? "#7c3aed" : "#2d2d4e",
                  border: `1px solid ${selectedWallLayer === "base" ? "#a855f7" : "#3d3d5e"}`,
                  color: selectedWallLayer === "base" ? "#fff" : "#aaa"
                },
                children: "BASE"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 685,
                columnNumber: 17
              },
              this
            ),
            ["sw", "se", "nw", "ne"].map(
              (dir, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/PixelEditor:676:18",
                  "data-dynamic-content": "true",
                  onClick: () => setSelectedWallLayer(dir),
                  className: "w-full mb-1 px-2 py-1 rounded font-ui text-xs text-left transition-all",
                  style: {
                    background: selectedWallLayer === dir ? "#7c3aed" : "#2d2d4e",
                    border: `1px solid ${selectedWallLayer === dir ? "#a855f7" : "#3d3d5e"}`,
                    color: selectedWallLayer === dir ? "#fff" : "#aaa"
                  },
                  "data-arr-index": __arrIdx__,
                  children: dir.toUpperCase()
                },
                dir,
                false,
                {
                  fileName: "/app/src/components/game/PixelEditor.jsx",
                  lineNumber: 695,
                  columnNumber: 15
                },
                this
              )
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 683,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 636,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:691:10", "data-dynamic-content": "true", className: "flex flex-col items-center justify-start p-4 gap-2 overflow-auto flex-1", style: { background: "#0d0d1a" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:693:12", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                "data-source-location": "components/game/PixelEditor:694:14",
                "data-dynamic-content": "true",
                value: selectedBuilding,
                onChange: (e) => {
                  setSelectedBuilding(e.target.value);
                  setSelectedLevel(1);
                },
                className: "rounded px-2 py-1 font-ui text-xs text-white",
                style: { background: "#2d2d4e", border: "1px solid #4c1d95" },
                children: Object.entries(BUILDING_DEFS).map(
                  ([key, def]) => /* @__PURE__ */ jsxDEV("option", { "data-source-location": "components/game/PixelEditor:701:18", "data-dynamic-content": "true", value: key, "data-collection-item-field": "name", "data-collection-item-id": def?.id || def?._id, children: def.name }, key, false, {
                    fileName: "/app/src/components/game/PixelEditor.jsx",
                    lineNumber: 720,
                    columnNumber: 17
                  }, this)
                )
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 713,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:706:14", "data-dynamic-content": "true", className: "relative", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/PixelEditor:707:16",
                  "data-dynamic-content": "true",
                  onClick: () => setShowLevelDropdown((v) => !v),
                  className: "flex items-center gap-1 px-2 py-1 rounded font-ui text-xs text-white",
                  style: { background: "#2d2d4e", border: "1px solid #4c1d95" },
                  "data-collection-item-field": "selectedLevel",
                  "data-collection-item-id": id,
                  children: [
                    "Lv.",
                    selectedLevel,
                    " ",
                    /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "components/game/PixelEditor:712:37", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                      fileName: "/app/src/components/game/PixelEditor.jsx",
                      lineNumber: 731,
                      columnNumber: 38
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/components/game/PixelEditor.jsx",
                  lineNumber: 726,
                  columnNumber: 17
                },
                this
              ),
              showLevelDropdown && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:715:18", "data-dynamic-content": "true", className: "absolute top-7 left-0 z-10 rounded overflow-y-auto", style: { background: "#1a1a2e", border: "1px solid #4c1d95", maxHeight: "200px", width: "70px" }, children: Array.from({ length: 30 }, (_, i) => i + 1).map(
                (l) => /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "components/game/PixelEditor:717:22",
                    "data-dynamic-content": "true",
                    onClick: () => {
                      setSelectedLevel(l);
                      setShowLevelDropdown(false);
                    },
                    className: "w-full text-left px-2 py-1 font-ui text-xs hover:bg-purple-900/40",
                    style: { color: selectedLevel === l ? "#c084fc" : "#aaa" },
                    "data-collection-item-field": "l",
                    children: [
                      "Level ",
                      l
                    ]
                  },
                  l,
                  true,
                  {
                    fileName: "/app/src/components/game/PixelEditor.jsx",
                    lineNumber: 736,
                    columnNumber: 19
                  },
                  this
                )
              ) }, void 0, false, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 734,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 725,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:729:14", "data-dynamic-content": "true", className: "relative", children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/PixelEditor:730:16",
                "data-dynamic-content": "true",
                onClick: () => setShowVariantModal(true),
                className: "flex items-center gap-1 px-2 py-1 rounded font-ui text-xs text-white",
                style: { background: "#2d2d4e", border: "1px solid #4c1d95" },
                "data-collection-item-field": "activeVariant",
                "data-collection-item-id": id,
                children: [
                  "📋 ",
                  activeVariant,
                  " ",
                  /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "components/game/PixelEditor:735:37", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                    fileName: "/app/src/components/game/PixelEditor.jsx",
                    lineNumber: 754,
                    columnNumber: 38
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 749,
                columnNumber: 17
              },
              this
            ) }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 748,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:739:14", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500", "data-collection-item-field": "selectedBuilding.icon", children: [
              BUILDING_DEFS[selectedBuilding]?.icon,
              " ",
              CANVAS_SIZE,
              "×",
              CANVAS_SIZE
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 758,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 712,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:745:12", "data-dynamic-content": "true", style: { position: "relative", width: displaySize, height: displaySize, transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.05s ease-out" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:747:14", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23555'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23555'/%3E%3Crect x='8' width='8' height='8' fill='%23333'/%3E%3Crect y='8' width='8' height='8' fill='%23333'/%3E%3C/svg%3E")`,
              backgroundSize: `16px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 766,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "canvas",
              {
                "data-source-location": "components/game/PixelEditor:752:14",
                "data-dynamic-content": "true",
                ref: canvasRef,
                width: CANVAS_SIZE,
                height: CANVAS_SIZE,
                style: {
                  position: "absolute",
                  inset: 0,
                  width: displaySize,
                  height: displaySize,
                  imageRendering: "pixelated",
                  cursor: tool === "eyedropper" ? "crosshair" : tool === "bucket" ? "cell" : "crosshair"
                },
                onMouseDown: handleMouseDown,
                onMouseMove: handleCanvasMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: () => {
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
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 771,
                columnNumber: 15
              },
              this
            ),
            overlayImage && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:770:16", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: overlayOpacity
            }, children: [
              /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/PixelEditor:774:18", "data-dynamic-content": "true", src: overlayImage, alt: "Reference", style: { width: "100%", height: "100%", imageRendering: "pixelated" } }, void 0, false, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 793,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/PixelEditor:775:18",
                  "data-dynamic-content": "true",
                  onClick: handleClearOverlay,
                  className: "absolute top-1 right-1 p-1 rounded bg-red-600 text-white hover:bg-red-700",
                  style: { fontSize: "10px" },
                  title: "Remove overlay",
                  children: "✕"
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/PixelEditor.jsx",
                  lineNumber: 794,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 789,
              columnNumber: 15
            }, this),
            zoom >= 2 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:788:16", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: `1px 1px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 807,
              columnNumber: 15
            }, this),
            overlayImage && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:797:16", "data-dynamic-content": "true", style: {
              position: "absolute",
              bottom: 8,
              right: 8,
              background: "rgba(0,0,0,0.7)",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              pointerEvents: "auto"
            }, children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:803:18", "data-dynamic-content": "true", style: { color: "#fff", fontSize: "10px" }, children: "Overlay:" }, void 0, false, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 822,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "components/game/PixelEditor:804:18",
                  "data-dynamic-content": "true",
                  type: "range",
                  min: "0",
                  max: "100",
                  value: Math.round(overlayOpacity * 100),
                  onChange: (e) => setOverlayOpacity(parseInt(e.target.value) / 100),
                  style: { width: "80px", accentColor: "#7c3aed" }
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/PixelEditor.jsx",
                  lineNumber: 823,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:812:18", "data-dynamic-content": "true", style: { color: "#fff", fontSize: "10px", width: "30px" }, children: [
                Math.round(overlayOpacity * 100),
                "%"
              ] }, void 0, true, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 831,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 816,
              columnNumber: 15
            }, this),
            cursorPos && (tool === "pencil" || tool === "brush" || tool === "eraser" || tool === "circle") && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:817:16", "data-dynamic-content": "true", style: {
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
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 836,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 764,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:832:12", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-600 mt-1", children: [
            "Cmd+Z: Undo · Cmd+Shift+Z: Redo · Cmd+S: Save · Shift+Click: Straight line",
            lastPoint && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:834:28", "data-dynamic-content": "false", className: "text-yellow-600", children: " · ● anchor set" }, void 0, false, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 853,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 851,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 710,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:839:10", "data-dynamic-content": "true", className: "flex flex-col p-3 gap-3 border-l overflow-y-auto", style: { borderColor: "#2d2d4e", background: "#13132a", minWidth: "210px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:840:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "COLOR" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 859,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            SpectrumColorPicker,
            {
              "data-source-location": "components/game/PixelEditor:843:12",
              "data-dynamic-content": "true",
              color: color === "transparent" ? "#000000" : color,
              onChange: (c) => {
                setColor(c);
                setCustomHex(c);
              }
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 862,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:849:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-slate-500 mb-1", children: "PALETTE" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 868,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:850:12", "data-dynamic-content": "true", className: "grid gap-0.5", style: { gridTemplateColumns: "repeat(8, 1fr)" }, children: PALETTE.map(
            (c, i) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/PixelEditor:852:16",
                "data-dynamic-content": "true",
                onClick: () => {
                  setColor(c);
                  if (c !== "transparent") setCustomHex(c);
                },
                title: c,
                className: "rounded-sm transition-all",
                style: {
                  width: 18,
                  height: 18,
                  background: c === "transparent" ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23aaa'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23aaa'/%3E%3Crect x='4' width='4' height='4' fill='%23fff'/%3E%3Crect y='4' width='4' height='4' fill='%23fff'/%3E%3C/svg%3E")` : c,
                  border: color === c ? "2px solid #c084fc" : "1px solid rgba(255,255,255,0.1)",
                  outline: color === c ? "1px solid #7c3aed" : "none"
                },
                "data-arr-index": i,
                "data-arr-variable-name": "PALETTE"
              },
              i,
              false,
              {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 871,
                columnNumber: 15
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 869,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 858,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 634,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 585,
      columnNumber: 7
    }, this),
    showPublishConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:873:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/75 rounded-xl", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:874:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[320px]", style: { background: "#0d1117", border: "2px solid #f59e0b" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:875:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-yellow-400 mb-2", children: "SEND TO GAME?" }, void 0, false, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 894,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:876:12", "data-dynamic-content": "true", className: "font-ui text-sm text-white mb-1", "data-collection-item-field": "selectedBuilding.name", children: [
        BUILDING_DEFS[selectedBuilding]?.name,
        " — Level ",
        selectedLevel
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 895,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:877:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400 mb-4", children: "This will replace the emoji block with your pixel art on the main game screen. This persists after reload." }, void 0, false, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 896,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:880:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:881:14",
            "data-dynamic-content": "true",
            onClick: () => setShowPublishConfirm(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #334155" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 900,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:885:14", "data-dynamic-content": "true", onClick: () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const dataUrl = canvas.toDataURL("image/png");
            publishBuildingSprite(selectedBuilding, selectedLevel, dataUrl, activeVariant);
            invalidatePublishedBuildingCache(selectedBuilding, selectedLevel, activeVariant);
            setIsPublished(true);
          }
          setShowPublishConfirm(false);
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-black", style: { background: "#f59e0b", border: "1px solid #fbbf24" }, "data-collection-item-field": "activeVariant", "data-collection-item-id": id, children: [
          "✓ SEND TO GAME (",
          activeVariant,
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 904,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 899,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 893,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 892,
      columnNumber: 7
    }, this),
    showCopyModal && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:904:8", "data-dynamic-content": "true", className: "absolute inset-0 z-10 flex items-center justify-center bg-black/70 rounded-xl", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:905:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[360px]", style: { background: "#1a1a2e", border: "2px solid #14b8a6" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:906:12", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-teal-400 mb-1", children: "COPY DESIGN TO LEVELS" }, void 0, false, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 925,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:907:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400 mb-3", children: [
        "Copy ",
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:908:19", "data-dynamic-content": "true", className: "text-white", "data-collection-item-field": "selectedBuilding.name", children: [
          BUILDING_DEFS[selectedBuilding]?.name,
          " Lv.",
          selectedLevel
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 927,
          columnNumber: 20
        }, this),
        " design to:"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 926,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:912:12", "data-dynamic-content": "true", className: "flex gap-2 mb-3 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:913:14",
            "data-dynamic-content": "true",
            onClick: () => setCopyTargetLevels(Array.from({ length: 30 }, (_, i) => i + 1).filter((l) => l !== selectedLevel)),
            className: "px-2 py-0.5 rounded font-ui text-[10px] text-teal-300 hover:bg-teal-900/40",
            style: { border: "1px solid #14b8a6" },
            children: "All levels"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 932,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:917:14",
            "data-dynamic-content": "true",
            onClick: () => setCopyTargetLevels(Array.from({ length: 30 }, (_, i) => i + 1).filter((l) => l > selectedLevel)),
            className: "px-2 py-0.5 rounded font-ui text-[10px] text-teal-300 hover:bg-teal-900/40",
            style: { border: "1px solid #14b8a6" },
            children: "All above"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 936,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:921:14",
            "data-dynamic-content": "true",
            onClick: () => setCopyTargetLevels(Array.from({ length: 30 }, (_, i) => i + 1).filter((l) => l < selectedLevel)),
            className: "px-2 py-0.5 rounded font-ui text-[10px] text-teal-300 hover:bg-teal-900/40",
            style: { border: "1px solid #14b8a6" },
            children: "All below"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 940,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:925:14",
            "data-dynamic-content": "true",
            onClick: () => setCopyTargetLevels([]),
            className: "px-2 py-0.5 rounded font-ui text-[10px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "Clear"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 944,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 931,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:932:12", "data-dynamic-content": "true", className: "grid gap-1 mb-4", style: { gridTemplateColumns: "repeat(10, 1fr)" }, children: Array.from({ length: 30 }, (_, i) => i + 1).map((lvl) => {
        const isCurrent = lvl === selectedLevel;
        const isSelected = copyTargetLevels.includes(lvl);
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:937:18",
            "data-dynamic-content": "true",
            onClick: () => !isCurrent && toggleCopyLevel(lvl),
            disabled: isCurrent,
            className: "rounded font-ui text-[10px] h-7 transition-all",
            style: {
              background: isCurrent ? "#374151" : isSelected ? "#0f766e" : "#2d2d4e",
              border: `1px solid ${isCurrent ? "#4b5563" : isSelected ? "#14b8a6" : "#3d3d5e"}`,
              color: isCurrent ? "#6b7280" : isSelected ? "#fff" : "#aaa",
              cursor: isCurrent ? "not-allowed" : "pointer"
            },
            "data-collection-item-field": "lvl",
            children: lvl
          },
          lvl,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 956,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 951,
        columnNumber: 13
      }, this),
      copyFeedback ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:956:14", "data-dynamic-content": "true", className: "text-center font-ui text-sm text-green-400 py-2", "data-collection-item-field": "copyFeedback", "data-collection-item-id": id, children: [
        "✓ ",
        copyFeedback
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 975,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:958:14", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:959:16",
            "data-dynamic-content": "true",
            onClick: () => {
              setShowCopyModal(false);
              setCopyTargetLevels([]);
            },
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 978,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:963:16",
            "data-dynamic-content": "true",
            onClick: handleCopyToLevels,
            disabled: copyTargetLevels.length === 0,
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-white transition-all",
            style: { background: copyTargetLevels.length > 0 ? "#0f766e" : "#1f2937", border: `1px solid ${copyTargetLevels.length > 0 ? "#14b8a6" : "#374151"}` },
            children: [
              "COPY TO ",
              copyTargetLevels.length > 0 ? `${copyTargetLevels.length} LEVEL${copyTargetLevels.length > 1 ? "S" : ""}` : "..."
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 982,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 977,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 924,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 923,
      columnNumber: 7
    }, this),
    showVariantModal && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:979:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:980:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[400px]", style: { background: "#1a1a2e", border: "2px solid #7c3aed" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:981:12", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-purple-400 mb-3", "data-collection-item-field": "selectedBuilding.name", children: [
        "VARIANTS — ",
        BUILDING_DEFS[selectedBuilding]?.name,
        " Lv.",
        selectedLevel
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 1e3,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:983:12", "data-dynamic-content": "true", className: "flex gap-2 mb-3", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:984:14", "data-dynamic-content": "true", onClick: () => {
          const newVar = createNewVariant(selectedBuilding, selectedLevel);
          const variants = getVariantList(selectedBuilding, selectedLevel);
          setVariantList(variants.length > 0 ? variants : ["default"]);
          setActiveVariantState(newVar);
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            pushHistory();
          }
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-white", style: { background: "#059669", border: "1px solid #10b981" }, children: [
          /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/PixelEditor:992:16", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 1011,
            columnNumber: 17
          }, this),
          "NEW VARIANT"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 1003,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:994:14",
            "data-dynamic-content": "true",
            onClick: () => setShowVariantModal(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "CLOSE"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 1013,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 1002,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:1000:12", "data-dynamic-content": "true", className: "grid gap-2 mb-4", style: { gridTemplateColumns: "repeat(2, 1fr)" }, children: variantList.map(
        (varId) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PixelEditor:1002:16",
            "data-dynamic-content": "true",
            onClick: () => {
              setActiveVariantState(varId);
              setActiveVariant(selectedBuilding, selectedLevel, varId);
              const existing = getSprite(selectedBuilding, selectedLevel, varId);
              if (existing) {
                const img = new Image();
                img.onload = () => {
                  const ctx = canvasRef.current?.getContext("2d");
                  if (ctx) {
                    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                    ctx.drawImage(img, 0, 0);
                    pushHistory();
                  }
                };
                img.src = existing;
              } else {
                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) {
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
            children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PixelEditor:1029:18", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:1030:20", "data-dynamic-content": "true", "data-collection-item-field": "varId", children: varId }, void 0, false, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 1049,
                columnNumber: 21
              }, this),
              activeVariant === varId && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PixelEditor:1031:48", "data-dynamic-content": "false", className: "text-green-400 text-[10px]", children: "✓ ACTIVE" }, void 0, false, {
                fileName: "/app/src/components/game/PixelEditor.jsx",
                lineNumber: 1050,
                columnNumber: 49
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/PixelEditor.jsx",
              lineNumber: 1048,
              columnNumber: 19
            }, this)
          },
          varId,
          false,
          {
            fileName: "/app/src/components/game/PixelEditor.jsx",
            lineNumber: 1021,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 1019,
        columnNumber: 13
      }, this),
      variantList.length > 1 && /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PixelEditor:1038:14", "data-dynamic-content": "true", onClick: () => {
        if (!confirm(`Delete variant "${activeVariant}"?`)) return;
        deleteVariant(selectedBuilding, selectedLevel, activeVariant);
        const variants = getVariantList(selectedBuilding, selectedLevel);
        const active = getActiveVariant(selectedBuilding, selectedLevel);
        setVariantList(variants.length > 0 ? variants : ["default"]);
        setActiveVariantState(active || "default");
        const existing = getSprite(selectedBuilding, selectedLevel, active);
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
      }, className: "w-full py-2 rounded font-pixel text-[8px] text-red-400 hover:bg-red-900/30", style: { border: "1px solid #7f1d1d" }, children: [
        /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "components/game/PixelEditor:1059:16", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
          fileName: "/app/src/components/game/PixelEditor.jsx",
          lineNumber: 1078,
          columnNumber: 17
        }, this),
        "DELETE CURRENT VARIANT"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PixelEditor.jsx",
        lineNumber: 1057,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 999,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/PixelEditor.jsx",
      lineNumber: 998,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/PixelEditor.jsx",
    lineNumber: 584,
    columnNumber: 5
  }, this);
}
_s(PixelEditor, "jSAzck4l0zpiV3MbSNyQMfRO7Wk=");
_c = PixelEditor;
var _c;
$RefreshReg$(_c, "PixelEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/PixelEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/PixelEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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Q04sa0JBQUlPLFVBQVUsR0FBRyxHQUFHeEcsYUFBYUEsV0FBVztBQUFFaUcsa0JBQUlRLFVBQVVKLEtBQUssR0FBRyxDQUFDO0FBQUVTLDBCQUFZO0FBQUEsWUFBRTtBQUN6R1QsZ0JBQUlNLE1BQU1QO0FBQUFBLFVBQ1osT0FBTztBQUNMSCxnQkFBSU8sVUFBVSxHQUFHLEdBQUd4RyxhQUFhQSxXQUFXO0FBQzVDOEcsd0JBQVk7QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLE1BQ0YsR0FBRyxXQUFVLDhFQUE2RSxPQUFPLEVBQUUrSSxRQUFRLG9CQUFvQixHQUN6SDtBQUFBLCtCQUFDLFVBQU8sd0JBQXFCLHVDQUFzQyx3QkFBcUIsU0FBUSxNQUFNLElBQUksV0FBVSxpQkFBcEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpSTtBQUFBLFFBQUc7QUFBQSxXQXJCMUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXNCSTtBQUFBLFNBaEZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FrRkEsS0FuRko7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW9GRTtBQUFBLE9BbGZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FvZkE7QUFFSjtBQUFDak8sR0ExK0J1QkYsYUFBVztBQUFBLEtBQVhBO0FBQVcsSUFBQXFSO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIlgiLCJTYXZlIiwiUm90YXRlQ2N3IiwiUm90YXRlQ3ciLCJDaGV2cm9uRG93biIsIkNvcHkiLCJTZW5kIiwiUGx1cyIsIlRyYXNoMiIsIlVwbG9hZCIsIkRvd25sb2FkIiwiQlVJTERJTkdfREVGUyIsInNhdmVTcHJpdGUiLCJnZXRTcHJpdGUiLCJpbnZhbGlkYXRlU3ByaXRlQ2FjaGUiLCJnZXRWYXJpYW50TGlzdCIsImdldEFjdGl2ZVZhcmlhbnQiLCJzZXRBY3RpdmVWYXJpYW50IiwiY3JlYXRlTmV3VmFyaWFudCIsImRlbGV0ZVZhcmlhbnQiLCJwdWJsaXNoQnVpbGRpbmdTcHJpdGUiLCJpc1B1Ymxpc2hlZEJ1aWxkaW5nIiwiaW52YWxpZGF0ZVB1Ymxpc2hlZEJ1aWxkaW5nQ2FjaGUiLCJTcGVjdHJ1bUNvbG9yUGlja2VyIiwiQ0FOVkFTX1NJWkUiLCJNQVhfSElTVE9SWSIsIlBBTEVUVEUiLCJUT09MUyIsImlkIiwibGFiZWwiLCJ0aXRsZSIsIlRPT0xfSE9US0VZUyIsInAiLCJiIiwiZSIsImYiLCJpIiwibCIsInIiLCJjIiwiQlJVU0hfU0laRVMiLCJoZXhUb1JnYmEiLCJoZXgiLCJwYXJzZUludCIsInNsaWNlIiwiZyIsInJnYmFUb0hleCIsImEiLCJ0b1N0cmluZyIsInBhZFN0YXJ0IiwiUGl4ZWxFZGl0b3IiLCJvbkNsb3NlIiwiX3MiLCJjYW52YXNSZWYiLCJvdmVybGF5UmVmIiwidG9vbCIsInNldFRvb2wiLCJicnVzaFNpemUiLCJzZXRCcnVzaFNpemUiLCJjb2xvciIsInNldENvbG9yIiwiY3VzdG9tSGV4Iiwic2V0Q3VzdG9tSGV4Iiwiem9vbSIsInNldFpvb20iLCJoaXN0b3J5Iiwic2V0SGlzdG9yeSIsImhpc3RvcnlJbmRleCIsInNldEhpc3RvcnlJbmRleCIsInNlbGVjdGVkQnVpbGRpbmciLCJzZXRTZWxlY3RlZEJ1aWxkaW5nIiwiT2JqZWN0Iiwia2V5cyIsInNlbGVjdGVkTGV2ZWwiLCJzZXRTZWxlY3RlZExldmVsIiwic2hvd0xldmVsRHJvcGRvd24iLCJzZXRTaG93TGV2ZWxEcm9wZG93biIsImRyYXdpbmciLCJzZXREcmF3aW5nIiwiZHJhd1N0YXJ0Iiwic2V0RHJhd1N0YXJ0Iiwic2F2ZWQiLCJzZXRTYXZlZCIsImxhc3RQb2ludCIsInNldExhc3RQb2ludCIsImN1cnNvclBvcyIsInNldEN1cnNvclBvcyIsInNob3dDb3B5TW9kYWwiLCJzZXRTaG93Q29weU1vZGFsIiwiY29weVRhcmdldExldmVscyIsInNldENvcHlUYXJnZXRMZXZlbHMiLCJjb3B5RmVlZGJhY2siLCJzZXRDb3B5RmVlZGJhY2siLCJzaG93UHVibGlzaENvbmZpcm0iLCJzZXRTaG93UHVibGlzaENvbmZpcm0iLCJpc1B1Ymxpc2hlZCIsInNldElzUHVibGlzaGVkIiwic2VsZWN0ZWRXYWxsTGF5ZXIiLCJzZXRTZWxlY3RlZFdhbGxMYXllciIsInZhcmlhbnRMaXN0Iiwic2V0VmFyaWFudExpc3QiLCJhY3RpdmVWYXJpYW50Iiwic2V0QWN0aXZlVmFyaWFudFN0YXRlIiwic2hvd1ZhcmlhbnRNb2RhbCIsInNldFNob3dWYXJpYW50TW9kYWwiLCJvdmVybGF5SW1hZ2UiLCJzZXRPdmVybGF5SW1hZ2UiLCJvdmVybGF5T3BhY2l0eSIsInNldE92ZXJsYXlPcGFjaXR5IiwiZmlsZUlucHV0UmVmIiwidmFyaWFudHMiLCJhY3RpdmUiLCJsZW5ndGgiLCJwaXhlbERhdGFSZWYiLCJjYW52YXMiLCJjdXJyZW50IiwicHJldkJ1aWxkaW5nUmVmIiwicHJldkxldmVsUmVmIiwiZGF0YVVybCIsInRvRGF0YVVSTCIsInByZXZWYXJpYW50UmVmIiwiY3R4IiwiZ2V0Q29udGV4dCIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsImV4aXN0aW5nIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJjbGVhclJlY3QiLCJkcmF3SW1hZ2UiLCJnZXRJbWFnZURhdGEiLCJzcmMiLCJzZWxlY3RlZEJ1aWxkaW5nUmVmIiwic2VsZWN0ZWRMZXZlbFJlZiIsInB1c2hIaXN0b3J5IiwiZGF0YSIsInByZXYiLCJuZXdIIiwiY29uY2F0Iiwic2hpZnQiLCJNYXRoIiwibWluIiwiaGFuZGxlS2V5IiwibWV0YU9yQ3RybCIsIm1ldGFLZXkiLCJjdHJsS2V5IiwidGFyZ2V0IiwibWF0Y2hlcyIsImtleSIsInRvTG93ZXJDYXNlIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVTYXZlIiwic2hpZnRLZXkiLCJoYW5kbGVSZWRvIiwiaGFuZGxlVW5kbyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGlzdG9yeVJlZiIsImhpc3RvcnlJbmRleFJlZjIiLCJuZXdJZHgiLCJtYXgiLCJzbmFwIiwicHV0SW1hZ2VEYXRhIiwic2V0VGltZW91dCIsImhhbmRsZUNvcHlUb0xldmVscyIsImZvckVhY2giLCJsdmwiLCJzb3J0Iiwiam9pbiIsInRvZ2dsZUNvcHlMZXZlbCIsImluY2x1ZGVzIiwiZmlsdGVyIiwiZ2V0UGl4ZWxDb29yZHMiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwieCIsImZsb29yIiwiY2xpZW50WCIsImxlZnQiLCJ3aWR0aCIsInkiLCJjbGllbnRZIiwidG9wIiwiaGVpZ2h0IiwiZHJhd1BpeGVsIiwicHgiLCJweSIsInJnYmEiLCJpbWFnZURhdGEiLCJoYWxmIiwiZHkiLCJkeCIsIm54IiwibnkiLCJpZHgiLCJkcmF3U21vb3RoTGluZSIsIngwIiwieTAiLCJ4MSIsInkxIiwiYWJzIiwic3giLCJzeSIsImVyciIsImUyIiwiZmxvb2RGaWxsIiwic3RhcnRYIiwic3RhcnRZIiwiZmlsbENvbG9yIiwidGFyZ2V0UiIsInRhcmdldEciLCJ0YXJnZXRCIiwidGFyZ2V0QSIsImZpbGxSIiwiZmlsbEciLCJmaWxsQiIsImZpbGxBIiwic3RhY2siLCJ2aXNpdGVkIiwiVWludDhBcnJheSIsInBvcCIsInBpIiwicHVzaCIsImRyYXdMaW5lIiwiZHJhd1JlY3QiLCJtaW5YIiwibWF4WCIsIm1pblkiLCJtYXhZIiwiZHJhd0NpcmNsZSIsImNlbnRlclgiLCJjZW50ZXJZIiwicmFkaXVzIiwiZmlsbCIsImN4Iiwicm91bmQiLCJjeSIsInJTcXVhcmVkIiwiZGlzdFNxdWFyZWQiLCJoYW5kbGVNb3VzZURvd24iLCJidXR0b24iLCJoYW5kbGVNb3VzZU1vdmUiLCJkcmF3WCIsImRyYXdZIiwiaGFuZGxlTW91c2VVcCIsInNxcnQiLCJwb3ciLCJoYW5kbGVDYW52YXNNb3VzZU1vdmUiLCJjbGVhckNhbnZhcyIsImhhbmRsZUN1c3RvbUhleCIsInZhbCIsInRlc3QiLCJkaXNwbGF5U2l6ZSIsImhhbmRsZUNhbnZhc1doZWVsIiwiZmFjdG9yIiwiZGVsdGFZIiwiaGFuZGxlVXBsb2FkUE5HIiwiZmlsZSIsImZpbGVzIiwidHlwZSIsInN0YXJ0c1dpdGgiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwiZXZlbnQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwidmFsdWUiLCJoYW5kbGVEb3dubG9hZFBORyIsImxpbmsiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJkb3dubG9hZCIsImhyZWYiLCJjbGljayIsImhhbmRsZUNsZWFyT3ZlcmxheSIsImJhY2tncm91bmQiLCJib3JkZXIiLCJib3JkZXJDb2xvciIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwibWluV2lkdGgiLCJtYXAiLCJ0IiwiX19hcnJJZHhfXyIsImFjY2VudENvbG9yIiwidG9GaXhlZCIsImRpciIsInRvVXBwZXJDYXNlIiwiZW50cmllcyIsImRlZiIsIl9pZCIsIm5hbWUiLCJ2IiwibWF4SGVpZ2h0IiwiQXJyYXkiLCJmcm9tIiwiXyIsImljb24iLCJwb3NpdGlvbiIsInRyYW5zZm9ybSIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zaXRpb24iLCJpbnNldCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRTaXplIiwiaW1hZ2VSZW5kZXJpbmciLCJjdXJzb3IiLCJwb2ludGVyRXZlbnRzIiwib3BhY2l0eSIsImZvbnRTaXplIiwiYm90dG9tIiwicmlnaHQiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJnYXAiLCJib3hTaGFkb3ciLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwib3V0bGluZSIsImlzQ3VycmVudCIsImlzU2VsZWN0ZWQiLCJuZXdWYXIiLCJ2YXJJZCIsImNvbmZpcm0iLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJQaXhlbEVkaXRvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFgsIFNhdmUsIFJvdGF0ZUNjdywgUm90YXRlQ3csIENoZXZyb25Eb3duLCBDb3B5LCBTZW5kLCBQbHVzLCBUcmFzaDIsIFVwbG9hZCwgRG93bmxvYWQgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBCVUlMRElOR19ERUZTIH0gZnJvbSBcIkAvbGliL2dhbWVDb25zdGFudHNcIjtcbmltcG9ydCB7IHNhdmVTcHJpdGUsIGdldFNwcml0ZSwgaW52YWxpZGF0ZVNwcml0ZUNhY2hlLCBnZXRWYXJpYW50TGlzdCwgZ2V0QWN0aXZlVmFyaWFudCwgc2V0QWN0aXZlVmFyaWFudCwgY3JlYXRlTmV3VmFyaWFudCwgZGVsZXRlVmFyaWFudCB9IGZyb20gXCJAL2xpYi9idWlsZGluZ1Nwcml0ZXNcIjtcbmltcG9ydCB7IHB1Ymxpc2hCdWlsZGluZ1Nwcml0ZSwgaXNQdWJsaXNoZWRCdWlsZGluZywgaW52YWxpZGF0ZVB1Ymxpc2hlZEJ1aWxkaW5nQ2FjaGUgfSBmcm9tIFwiQC9saWIvcHVibGlzaGVkU3ByaXRlc1wiO1xuaW1wb3J0IFNwZWN0cnVtQ29sb3JQaWNrZXIgZnJvbSBcIi4vU3BlY3RydW1Db2xvclBpY2tlclwiO1xuXG5jb25zdCBDQU5WQVNfU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9ISVNUT1JZID0gMTAwO1xuXG5jb25zdCBQQUxFVFRFID0gW1xuXCIjMDAwMDAwXCIsIFwiIzExMTExMVwiLCBcIiMyMjIyMjJcIiwgXCIjMzMzMzMzXCIsIFwiIzQ0NDQ0NFwiLCBcIiM1NTU1NTVcIiwgXCIjNjY2NjY2XCIsIFwiIzc3Nzc3N1wiLFxuXCIjODg4ODg4XCIsIFwiIzk5OTk5OVwiLCBcIiNhYWFhYWFcIiwgXCIjYmJiYmJiXCIsIFwiI2NjY2NjY1wiLCBcIiNkZGRkZGRcIiwgXCIjZWVlZWVlXCIsIFwiI2ZmZmZmZlwiLFxuXCIjZmYwMDAwXCIsIFwiI2ZmNDQwMFwiLCBcIiNmZjg4MDBcIiwgXCIjZmZjYzAwXCIsIFwiI2ZmZmYwMFwiLCBcIiM4OGZmMDBcIiwgXCIjMDBmZjAwXCIsIFwiIzAwZmY4OFwiLFxuXCIjMDBmZmZmXCIsIFwiIzAwODhmZlwiLCBcIiMwMDAwZmZcIiwgXCIjODgwMGZmXCIsIFwiI2ZmMDBmZlwiLCBcIiNmZjAwODhcIiwgXCIjZmY4OGFhXCIsIFwiI2ZmY2NhYVwiLFxuXCIjODgwMDAwXCIsIFwiIzg4NDQwMFwiLCBcIiM4ODQ0MDBcIiwgXCIjODg2NjAwXCIsIFwiIzg4ODgwMFwiLCBcIiM0NDg4MDBcIiwgXCIjMDA4ODAwXCIsIFwiIzAwODg0NFwiLFxuXCIjMDA4ODg4XCIsIFwiIzAwNDQ4OFwiLCBcIiMwMDAwODhcIiwgXCIjNDQwMDg4XCIsIFwiIzg4MDA4OFwiLCBcIiM4ODAwNDRcIiwgXCIjODg0NDY2XCIsIFwiIzg4NjY0NFwiLFxuXCIjZmY4ODg4XCIsIFwiI2ZmYWE4OFwiLCBcIiNmZmNjODhcIiwgXCIjZmZlZTg4XCIsIFwiI2ZmZmY4OFwiLCBcIiNhYWZmODhcIiwgXCIjODhmZjg4XCIsIFwiIzg4ZmZhYVwiLFxuXCIjODhmZmZmXCIsIFwiIzg4YWFmZlwiLCBcIiM4ODg4ZmZcIiwgXCIjYWE4OGZmXCIsIFwiI2ZmODhmZlwiLCBcIiNmZjg4YWFcIiwgXCIjZmZhYWJiXCIsIFwiI2ZmZDhhOFwiLFxuXCIjNDQwMDAwXCIsIFwiIzQ0MjIwMFwiLCBcIiM0NDExMDBcIiwgXCIjNDQzMzAwXCIsIFwiIzQ0NDQwMFwiLCBcIiMyMjQ0MDBcIiwgXCIjMDA0NDAwXCIsIFwiIzAwNDQyMlwiLFxuXCIjMDA0NDQ0XCIsIFwiIzAwMjI0NFwiLCBcIiMwMDAwNDRcIiwgXCIjMjIwMDQ0XCIsIFwiIzQ0MDA0NFwiLCBcIiM0NDAwMjJcIiwgXCIjNDQyMjMzXCIsIFwiIzQ0MzMyMlwiLFxuXCIjZmY2NjY2XCIsIFwiI2ZmOTk2NlwiLCBcIiNmZmJiNjZcIiwgXCIjZmZkZDY2XCIsIFwiI2ZmZmY2NlwiLCBcIiM5OWZmNjZcIiwgXCIjNjZmZjY2XCIsIFwiIzY2ZmY5OVwiLFxuXCIjNjZmZmZmXCIsIFwiIzY2OTlmZlwiLCBcIiM2NjY2ZmZcIiwgXCIjOTk2NmZmXCIsIFwiI2ZmNjZmZlwiLCBcIiNmZjY2OTlcIiwgXCIjZmY5OWJiXCIsIFwiI2ZmZDY5OVwiLFxuLy8gdHJhbnNwYXJlbnRcblwidHJhbnNwYXJlbnRcIl07XG5cblxuY29uc3QgVE9PTFMgPSBbXG57IGlkOiBcInBlbmNpbFwiLCBsYWJlbDogXCLinI/vuI9cIiwgdGl0bGU6IFwiUGVuY2lsIChQKVwiIH0sXG57IGlkOiBcImJydXNoXCIsIGxhYmVsOiBcIvCflozvuI9cIiwgdGl0bGU6IFwiQnJ1c2ggKEIpXCIgfSxcbnsgaWQ6IFwiZXJhc2VyXCIsIGxhYmVsOiBcIuKMq1wiLCB0aXRsZTogXCJFcmFzZXIgKEUpXCIgfSxcbnsgaWQ6IFwiYnVja2V0XCIsIGxhYmVsOiBcIvCfqqNcIiwgdGl0bGU6IFwiRmlsbCAoRilcIiB9LFxueyBpZDogXCJleWVkcm9wcGVyXCIsIGxhYmVsOiBcIvCfkolcIiwgdGl0bGU6IFwiRXllZHJvcHBlciAoSSlcIiB9LFxueyBpZDogXCJsaW5lXCIsIGxhYmVsOiBcIuKVsVwiLCB0aXRsZTogXCJMaW5lIChMKVwiIH0sXG57IGlkOiBcInJlY3RcIiwgbGFiZWw6IFwi4patXCIsIHRpdGxlOiBcIlJlY3RhbmdsZSAoUilcIiB9LFxueyBpZDogXCJjaXJjbGVcIiwgbGFiZWw6IFwi4peLXCIsIHRpdGxlOiBcIkNpcmNsZSAoQylcIiB9XTtcblxuXG5jb25zdCBUT09MX0hPVEtFWVMgPSB7XG4gIHA6IFwicGVuY2lsXCIsXG4gIGI6IFwiYnJ1c2hcIixcbiAgZTogXCJlcmFzZXJcIixcbiAgZjogXCJidWNrZXRcIixcbiAgaTogXCJleWVkcm9wcGVyXCIsXG4gIGw6IFwibGluZVwiLFxuICByOiBcInJlY3RcIixcbiAgYzogXCJjaXJjbGVcIlxufTtcblxuY29uc3QgQlJVU0hfU0laRVMgPSBbMSwgMiwgMywgNSwgOF07XG5cbmZ1bmN0aW9uIGhleFRvUmdiYShoZXgpIHtcbiAgaWYgKGhleCA9PT0gXCJ0cmFuc3BhcmVudFwiKSByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEsIDMpLCAxNik7XG4gIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMywgNSksIDE2KTtcbiAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zbGljZSg1LCA3KSwgMTYpO1xuICByZXR1cm4gW3IsIGcsIGIsIDI1NV07XG59XG5cbmZ1bmN0aW9uIHJnYmFUb0hleChyLCBnLCBiLCBhKSB7XG4gIGlmIChhID09PSAwKSByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xuICByZXR1cm4gYCMke3IudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKX0ke2cudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKX0ke2IudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQaXhlbEVkaXRvcih7IG9uQ2xvc2UsIGlkIH0pIHtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBvdmVybGF5UmVmID0gdXNlUmVmKG51bGwpOyAvLyBmb3Igc2VsZWN0aW9uL2xpbmUvcmVjdCBwcmV2aWV3XG4gIGNvbnN0IFt0b29sLCBzZXRUb29sXSA9IHVzZVN0YXRlKFwicGVuY2lsXCIpO1xuICBjb25zdCBbYnJ1c2hTaXplLCBzZXRCcnVzaFNpemVdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtjb2xvciwgc2V0Q29sb3JdID0gdXNlU3RhdGUoXCIjZmYwMDAwXCIpO1xuICBjb25zdCBbY3VzdG9tSGV4LCBzZXRDdXN0b21IZXhdID0gdXNlU3RhdGUoXCIjZmYwMDAwXCIpO1xuICBjb25zdCBbem9vbSwgc2V0Wm9vbV0gPSB1c2VTdGF0ZSgyKTsgLy8gZnJhY3Rpb25hbCBzY2FsZSBhcHBsaWVkIHZpYSBDU1MgdHJhbnNmb3JtXG4gIGNvbnN0IFtoaXN0b3J5LCBzZXRIaXN0b3J5XSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hpc3RvcnlJbmRleCwgc2V0SGlzdG9yeUluZGV4XSA9IHVzZVN0YXRlKC0xKTtcbiAgY29uc3QgW3NlbGVjdGVkQnVpbGRpbmcsIHNldFNlbGVjdGVkQnVpbGRpbmddID0gdXNlU3RhdGUoT2JqZWN0LmtleXMoQlVJTERJTkdfREVGUylbMF0pO1xuICBjb25zdCBbc2VsZWN0ZWRMZXZlbCwgc2V0U2VsZWN0ZWRMZXZlbF0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3Nob3dMZXZlbERyb3Bkb3duLCBzZXRTaG93TGV2ZWxEcm9wZG93bl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkcmF3aW5nLCBzZXREcmF3aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RyYXdTdGFydCwgc2V0RHJhd1N0YXJ0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2F2ZWQsIHNldFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xhc3RQb2ludCwgc2V0TGFzdFBvaW50XSA9IHVzZVN0YXRlKG51bGwpOyAvLyBmb3Igc2hpZnQrY2xpY2sgc3RyYWlnaHQgbGluZXNcbiAgY29uc3QgW2N1cnNvclBvcywgc2V0Q3Vyc29yUG9zXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hvd0NvcHlNb2RhbCwgc2V0U2hvd0NvcHlNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb3B5VGFyZ2V0TGV2ZWxzLCBzZXRDb3B5VGFyZ2V0TGV2ZWxzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvcHlGZWVkYmFjaywgc2V0Q29weUZlZWRiYWNrXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2hvd1B1Ymxpc2hDb25maXJtLCBzZXRTaG93UHVibGlzaENvbmZpcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNQdWJsaXNoZWQsIHNldElzUHVibGlzaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlbGVjdGVkV2FsbExheWVyLCBzZXRTZWxlY3RlZFdhbGxMYXllcl0gPSB1c2VTdGF0ZShcImJhc2VcIik7XG4gIGNvbnN0IFt2YXJpYW50TGlzdCwgc2V0VmFyaWFudExpc3RdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbYWN0aXZlVmFyaWFudCwgc2V0QWN0aXZlVmFyaWFudFN0YXRlXSA9IHVzZVN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgY29uc3QgW3Nob3dWYXJpYW50TW9kYWwsIHNldFNob3dWYXJpYW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3ZlcmxheUltYWdlLCBzZXRPdmVybGF5SW1hZ2VdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtvdmVybGF5T3BhY2l0eSwgc2V0T3ZlcmxheU9wYWNpdHldID0gdXNlU3RhdGUoMC41KTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIC8vIFJlZnJlc2ggcHVibGlzaGVkIHN0YXRlIGFuZCB2YXJpYW50cyB3aGVuIGJ1aWxkaW5nL2xldmVsIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRJc1B1Ymxpc2hlZChpc1B1Ymxpc2hlZEJ1aWxkaW5nKHNlbGVjdGVkQnVpbGRpbmcsIHNlbGVjdGVkTGV2ZWwpKTtcbiAgICBjb25zdCB2YXJpYW50cyA9IGdldFZhcmlhbnRMaXN0KHNlbGVjdGVkQnVpbGRpbmcsIHNlbGVjdGVkTGV2ZWwpO1xuICAgIGNvbnN0IGFjdGl2ZSA9IGdldEFjdGl2ZVZhcmlhbnQoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCk7XG4gICAgc2V0VmFyaWFudExpc3QodmFyaWFudHMubGVuZ3RoID4gMCA/IHZhcmlhbnRzIDogW1wiZGVmYXVsdFwiXSk7XG4gICAgc2V0QWN0aXZlVmFyaWFudFN0YXRlKGFjdGl2ZSB8fCBcImRlZmF1bHRcIik7XG4gIH0sIFtzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsXSk7XG5cbiAgY29uc3QgcGl4ZWxEYXRhUmVmID0gdXNlUmVmKG51bGwpOyAvLyBJbWFnZURhdGFcblxuICAvLyBJbml0aWFsaXplIGNhbnZhcyDigJQgYXV0by1zYXZlIGJlZm9yZSBzd2l0Y2hpbmcgYXdheVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG5cbiAgICAvLyBTYXZlIGN1cnJlbnQgY2FudmFzIGJlZm9yZSBzd2l0Y2hpbmdcbiAgICBpZiAocHJldkJ1aWxkaW5nUmVmLmN1cnJlbnQgIT09IHNlbGVjdGVkQnVpbGRpbmcgfHwgcHJldkxldmVsUmVmLmN1cnJlbnQgIT09IHNlbGVjdGVkTGV2ZWwpIHtcbiAgICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgc2F2ZVNwcml0ZShwcmV2QnVpbGRpbmdSZWYuY3VycmVudCwgcHJldkxldmVsUmVmLmN1cnJlbnQsIGRhdGFVcmwsIHByZXZWYXJpYW50UmVmLmN1cnJlbnQpO1xuICAgICAgaW52YWxpZGF0ZVNwcml0ZUNhY2hlKHByZXZCdWlsZGluZ1JlZi5jdXJyZW50LCBwcmV2TGV2ZWxSZWYuY3VycmVudCk7XG4gICAgICBwcmV2QnVpbGRpbmdSZWYuY3VycmVudCA9IHNlbGVjdGVkQnVpbGRpbmc7XG4gICAgICBwcmV2TGV2ZWxSZWYuY3VycmVudCA9IHNlbGVjdGVkTGV2ZWw7XG4gICAgICBwcmV2VmFyaWFudFJlZi5jdXJyZW50ID0gYWN0aXZlVmFyaWFudDtcbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBUcnkgdG8gbG9hZCBleGlzdGluZyBzcHJpdGUgZm9yIGFjdGl2ZSB2YXJpYW50XG4gICAgY29uc3QgZXhpc3RpbmcgPSBnZXRTcHJpdGUoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCwgYWN0aXZlVmFyaWFudCk7XG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICBwaXhlbERhdGFSZWYuY3VycmVudCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgICAgc2V0SGlzdG9yeShbY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpXSk7XG4gICAgICAgIHNldEhpc3RvcnlJbmRleCgwKTtcbiAgICAgIH07XG4gICAgICBpbWcuc3JjID0gZXhpc3Rpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgIHBpeGVsRGF0YVJlZi5jdXJyZW50ID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgICAgc2V0SGlzdG9yeShbY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpXSk7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgoMCk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW3NlbGVjdGVkQnVpbGRpbmcsIHNlbGVjdGVkTGV2ZWxdKTtcblxuICBjb25zdCBzZWxlY3RlZEJ1aWxkaW5nUmVmID0gdXNlUmVmKHNlbGVjdGVkQnVpbGRpbmcpO1xuICBjb25zdCBzZWxlY3RlZExldmVsUmVmID0gdXNlUmVmKHNlbGVjdGVkTGV2ZWwpO1xuICBjb25zdCBwcmV2QnVpbGRpbmdSZWYgPSB1c2VSZWYoc2VsZWN0ZWRCdWlsZGluZyk7XG4gIGNvbnN0IHByZXZMZXZlbFJlZiA9IHVzZVJlZihzZWxlY3RlZExldmVsKTtcbiAgY29uc3QgcHJldlZhcmlhbnRSZWYgPSB1c2VSZWYoYWN0aXZlVmFyaWFudCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7c2VsZWN0ZWRCdWlsZGluZ1JlZi5jdXJyZW50ID0gc2VsZWN0ZWRCdWlsZGluZzt9LCBbc2VsZWN0ZWRCdWlsZGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge3NlbGVjdGVkTGV2ZWxSZWYuY3VycmVudCA9IHNlbGVjdGVkTGV2ZWw7fSwgW3NlbGVjdGVkTGV2ZWxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtwcmV2VmFyaWFudFJlZi5jdXJyZW50ID0gYWN0aXZlVmFyaWFudDt9LCBbYWN0aXZlVmFyaWFudF0pO1xuXG4gIGNvbnN0IHB1c2hIaXN0b3J5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIHNldEhpc3RvcnkoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld0ggPSBwcmV2LnNsaWNlKDAsIHByZXYubGVuZ3RoKS5jb25jYXQoW2RhdGFdKTtcbiAgICAgIGlmIChuZXdILmxlbmd0aCA+IE1BWF9ISVNUT1JZKSBuZXdILnNoaWZ0KCk7XG4gICAgICByZXR1cm4gbmV3SDtcbiAgICB9KTtcbiAgICBzZXRIaXN0b3J5SW5kZXgoKHByZXYpID0+IE1hdGgubWluKHByZXYgKyAxLCBNQVhfSElTVE9SWSAtIDEpKTtcbiAgICAvLyBBdXRvLXNhdmUgdG8gY3VycmVudCB2YXJpYW50XG4gICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgc2F2ZVNwcml0ZShzZWxlY3RlZEJ1aWxkaW5nUmVmLmN1cnJlbnQsIHNlbGVjdGVkTGV2ZWxSZWYuY3VycmVudCwgZGF0YVVybCwgYWN0aXZlVmFyaWFudCk7XG4gICAgaW52YWxpZGF0ZVNwcml0ZUNhY2hlKHNlbGVjdGVkQnVpbGRpbmdSZWYuY3VycmVudCwgc2VsZWN0ZWRMZXZlbFJlZi5jdXJyZW50KTtcbiAgfSwgW2FjdGl2ZVZhcmlhbnRdKTtcblxuICAvLyBLZXlib2FyZCBzaG9ydGN1dHNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVLZXkgPSAoZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YU9yQ3RybCA9IGUubWV0YUtleSB8fCBlLmN0cmxLZXk7XG4gICAgICAvLyBUb29sIGhvdGtleXMgKG5vIG1vZGlmaWVyIG5lZWRlZClcbiAgICAgIGlmICghbWV0YU9yQ3RybCAmJiAhZS50YXJnZXQubWF0Y2hlcyhcImlucHV0LCB0ZXh0YXJlYVwiKSkge1xuICAgICAgICBjb25zdCBrZXkgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoVE9PTF9IT1RLRVlTW2tleV0pIHtcbiAgICAgICAgICBzZXRUb29sKFRPT0xfSE9US0VZU1trZXldKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNhdmUgd2l0aCBDbWQrU1xuICAgICAgaWYgKG1ldGFPckN0cmwgJiYgKGUua2V5ID09PSBcInNcIiB8fCBlLmtleSA9PT0gXCJTXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaGFuZGxlU2F2ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBVbmRvL1JlZG8gd2l0aCBDbWQvQ3RybCtaXG4gICAgICBpZiAobWV0YU9yQ3RybCAmJiAoZS5rZXkgPT09IFwielwiIHx8IGUua2V5ID09PSBcIlpcIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZS5zaGlmdEtleSkgaGFuZGxlUmVkbygpO2Vsc2UgaGFuZGxlVW5kbygpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXkpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW2hpc3RvcnksIGhpc3RvcnlJbmRleF0pO1xuXG4gIGNvbnN0IGhpc3RvcnlSZWYgPSB1c2VSZWYoW10pO1xuICBjb25zdCBoaXN0b3J5SW5kZXhSZWYyID0gdXNlUmVmKC0xKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtoaXN0b3J5UmVmLmN1cnJlbnQgPSBoaXN0b3J5O30sIFtoaXN0b3J5XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7aGlzdG9yeUluZGV4UmVmMi5jdXJyZW50ID0gaGlzdG9yeUluZGV4O30sIFtoaXN0b3J5SW5kZXhdKTtcblxuICBjb25zdCBoYW5kbGVVbmRvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3SWR4ID0gTWF0aC5tYXgoMCwgcHJldiAtIDEpO1xuICAgICAgY29uc3Qgc25hcCA9IGhpc3RvcnlSZWYuY3VycmVudFtuZXdJZHhdO1xuICAgICAgaWYgKHNuYXApIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShzbmFwLCAwLCAwKTtcbiAgICAgICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgICBzYXZlU3ByaXRlKHNlbGVjdGVkQnVpbGRpbmdSZWYuY3VycmVudCwgc2VsZWN0ZWRMZXZlbFJlZi5jdXJyZW50LCBkYXRhVXJsKTtcbiAgICAgICAgICBpbnZhbGlkYXRlU3ByaXRlQ2FjaGUoc2VsZWN0ZWRCdWlsZGluZ1JlZi5jdXJyZW50LCBzZWxlY3RlZExldmVsUmVmLmN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3SWR4O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUmVkbyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIaXN0b3J5SW5kZXgoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG5ld0lkeCA9IE1hdGgubWluKGhpc3RvcnlSZWYuY3VycmVudC5sZW5ndGggLSAxLCBwcmV2ICsgMSk7XG4gICAgICBjb25zdCBzbmFwID0gaGlzdG9yeVJlZi5jdXJyZW50W25ld0lkeF07XG4gICAgICBpZiAoc25hcCkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzPy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKHNuYXAsIDAsIDApO1xuICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICAgIHNhdmVTcHJpdGUoc2VsZWN0ZWRCdWlsZGluZ1JlZi5jdXJyZW50LCBzZWxlY3RlZExldmVsUmVmLmN1cnJlbnQsIGRhdGFVcmwpO1xuICAgICAgICAgIGludmFsaWRhdGVTcHJpdGVDYWNoZShzZWxlY3RlZEJ1aWxkaW5nUmVmLmN1cnJlbnQsIHNlbGVjdGVkTGV2ZWxSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJZHg7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVTYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgc2F2ZVNwcml0ZShzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsLCBkYXRhVXJsLCBhY3RpdmVWYXJpYW50KTtcbiAgICBpbnZhbGlkYXRlU3ByaXRlQ2FjaGUoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCk7XG4gICAgc2V0U2F2ZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTYXZlZChmYWxzZSksIDIwMDApO1xuICB9LCBbc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCwgYWN0aXZlVmFyaWFudF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlUb0xldmVscyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcyB8fCBjb3B5VGFyZ2V0TGV2ZWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgIGNvcHlUYXJnZXRMZXZlbHMuZm9yRWFjaCgobHZsKSA9PiB7XG4gICAgICBzYXZlU3ByaXRlKHNlbGVjdGVkQnVpbGRpbmcsIGx2bCwgZGF0YVVybCwgYWN0aXZlVmFyaWFudCk7XG4gICAgICBpbnZhbGlkYXRlU3ByaXRlQ2FjaGUoc2VsZWN0ZWRCdWlsZGluZywgbHZsKTtcbiAgICB9KTtcbiAgICBzZXRDb3B5RmVlZGJhY2soYENvcGllZCB0byBsZXZlbCR7Y29weVRhcmdldExldmVscy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwifSAke2NvcHlUYXJnZXRMZXZlbHMuc29ydCgoYSwgYikgPT4gYSAtIGIpLmpvaW4oXCIsIFwiKX0hYCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7c2V0Q29weUZlZWRiYWNrKFwiXCIpO3NldFNob3dDb3B5TW9kYWwoZmFsc2UpO3NldENvcHlUYXJnZXRMZXZlbHMoW10pO30sIDIwMDApO1xuICB9LCBbc2VsZWN0ZWRCdWlsZGluZywgY29weVRhcmdldExldmVscywgYWN0aXZlVmFyaWFudF0pO1xuXG4gIGNvbnN0IHRvZ2dsZUNvcHlMZXZlbCA9IChsdmwpID0+IHtcbiAgICBzZXRDb3B5VGFyZ2V0TGV2ZWxzKChwcmV2KSA9PlxuICAgIHByZXYuaW5jbHVkZXMobHZsKSA/IHByZXYuZmlsdGVyKChsKSA9PiBsICE9PSBsdmwpIDogWy4uLnByZXYsIGx2bF1cbiAgICApO1xuICB9O1xuXG4gIC8vIEdldCBwaXhlbCBjb29yZHMgZnJvbSBtb3VzZSBldmVudCDigJQgY2FudmFzIERPTSBzaXplID0gQ0FOVkFTX1NJWkUsIHpvb20gaXMgcHVyZSBDU1MgdHJhbnNmb3JtXG4gIGNvbnN0IGdldFBpeGVsQ29vcmRzID0gKGUpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCByZWZsZWN0cyB0aGUgQ1NTLXNjYWxlZCBzaXplLCBzbyB3ZSBtYXAgYmFjayB0byBsb2dpY2FsIHBpeGVsc1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKChlLmNsaWVudFggLSByZWN0LmxlZnQpICogKENBTlZBU19TSVpFIC8gcmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKChlLmNsaWVudFkgLSByZWN0LnRvcCkgKiAoQ0FOVkFTX1NJWkUgLyByZWN0LmhlaWdodCkpO1xuICAgIHJldHVybiB7IHg6IE1hdGgubWF4KDAsIE1hdGgubWluKENBTlZBU19TSVpFIC0gMSwgeCkpLCB5OiBNYXRoLm1heCgwLCBNYXRoLm1pbihDQU5WQVNfU0laRSAtIDEsIHkpKSB9O1xuICB9O1xuXG4gIGNvbnN0IGRyYXdQaXhlbCA9IChjdHgsIHB4LCBweSwgcmdiYSkgPT4ge1xuICAgIGNvbnN0IFtyLCBnLCBiLCBhXSA9IHJnYmE7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIGNvbnN0IGhhbGYgPSBNYXRoLmZsb29yKGJydXNoU2l6ZSAvIDIpO1xuICAgIGZvciAobGV0IGR5ID0gLWhhbGY7IGR5IDw9IGhhbGY7IGR5KyspIHtcbiAgICAgIGZvciAobGV0IGR4ID0gLWhhbGY7IGR4IDw9IGhhbGY7IGR4KyspIHtcbiAgICAgICAgY29uc3QgbnggPSBweCArIGR4LG55ID0gcHkgKyBkeTtcbiAgICAgICAgaWYgKG54IDwgMCB8fCBueCA+PSBDQU5WQVNfU0laRSB8fCBueSA8IDAgfHwgbnkgPj0gQ0FOVkFTX1NJWkUpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBpZHggPSAobnkgKiBDQU5WQVNfU0laRSArIG54KSAqIDQ7XG4gICAgICAgIGlmIChhID09PSAwKSB7XG4gICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaWR4ICsgM10gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2lkeF0gPSByO1xuICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2lkeCArIDFdID0gZztcbiAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpZHggKyAyXSA9IGI7XG4gICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaWR4ICsgM10gPSBhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgfTtcblxuICAvLyBEcmF3IHNtb290aCBsaW5lIGJldHdlZW4gdHdvIHBvaW50cyAoQnJlc2VuaGFtJ3MgYWxnb3JpdGhtKVxuICBjb25zdCBkcmF3U21vb3RoTGluZSA9IChjdHgsIHgwLCB5MCwgeDEsIHkxLCByZ2JhKSA9PiB7XG4gICAgY29uc3QgZHggPSBNYXRoLmFicyh4MSAtIHgwKSxkeSA9IE1hdGguYWJzKHkxIC0geTApO1xuICAgIGNvbnN0IHN4ID0geDAgPCB4MSA/IDEgOiAtMSxzeSA9IHkwIDwgeTEgPyAxIDogLTE7XG4gICAgbGV0IGVyciA9IGR4IC0gZHk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGRyYXdQaXhlbChjdHgsIHgwLCB5MCwgcmdiYSk7XG4gICAgICBpZiAoeDAgPT09IHgxICYmIHkwID09PSB5MSkgYnJlYWs7XG4gICAgICBjb25zdCBlMiA9IDIgKiBlcnI7XG4gICAgICBpZiAoZTIgPiAtZHkpIHtlcnIgLT0gZHk7eDAgKz0gc3g7fVxuICAgICAgaWYgKGUyIDwgZHgpIHtlcnIgKz0gZHg7eTAgKz0gc3k7fVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmbG9vZEZpbGwgPSAoY3R4LCBzdGFydFgsIHN0YXJ0WSwgZmlsbENvbG9yKSA9PiB7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcbiAgICBjb25zdCBpZHggPSAoc3RhcnRZICogQ0FOVkFTX1NJWkUgKyBzdGFydFgpICogNDtcbiAgICBjb25zdCB0YXJnZXRSID0gZGF0YVtpZHhdLHRhcmdldEcgPSBkYXRhW2lkeCArIDFdLHRhcmdldEIgPSBkYXRhW2lkeCArIDJdLHRhcmdldEEgPSBkYXRhW2lkeCArIDNdO1xuICAgIGNvbnN0IFtmaWxsUiwgZmlsbEcsIGZpbGxCLCBmaWxsQV0gPSBmaWxsQ29sb3I7XG4gICAgaWYgKHRhcmdldFIgPT09IGZpbGxSICYmIHRhcmdldEcgPT09IGZpbGxHICYmIHRhcmdldEIgPT09IGZpbGxCICYmIHRhcmdldEEgPT09IGZpbGxBKSByZXR1cm47XG4gICAgY29uc3Qgc3RhY2sgPSBbW3N0YXJ0WCwgc3RhcnRZXV07XG4gICAgY29uc3QgdmlzaXRlZCA9IG5ldyBVaW50OEFycmF5KENBTlZBU19TSVpFICogQ0FOVkFTX1NJWkUpO1xuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IHN0YWNrLnBvcCgpO1xuICAgICAgaWYgKHggPCAwIHx8IHggPj0gQ0FOVkFTX1NJWkUgfHwgeSA8IDAgfHwgeSA+PSBDQU5WQVNfU0laRSkgY29udGludWU7XG4gICAgICBjb25zdCBpID0geSAqIENBTlZBU19TSVpFICsgeDtcbiAgICAgIGlmICh2aXNpdGVkW2ldKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHBpID0gaSAqIDQ7XG4gICAgICBpZiAoZGF0YVtwaV0gIT09IHRhcmdldFIgfHwgZGF0YVtwaSArIDFdICE9PSB0YXJnZXRHIHx8IGRhdGFbcGkgKyAyXSAhPT0gdGFyZ2V0QiB8fCBkYXRhW3BpICsgM10gIT09IHRhcmdldEEpIGNvbnRpbnVlO1xuICAgICAgdmlzaXRlZFtpXSA9IDE7XG4gICAgICBpZiAoZmlsbEEgPT09IDApIHtkYXRhW3BpICsgM10gPSAwO30gZWxzZVxuICAgICAge2RhdGFbcGldID0gZmlsbFI7ZGF0YVtwaSArIDFdID0gZmlsbEc7ZGF0YVtwaSArIDJdID0gZmlsbEI7ZGF0YVtwaSArIDNdID0gZmlsbEE7fVxuICAgICAgc3RhY2sucHVzaChbeCArIDEsIHldLCBbeCAtIDEsIHldLCBbeCwgeSArIDFdLCBbeCwgeSAtIDFdKTtcbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICB9O1xuXG4gIGNvbnN0IGRyYXdMaW5lID0gKGN0eCwgeDAsIHkwLCB4MSwgeTEsIHJnYmEpID0+IHtcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKHgxIC0geDApLGR5ID0gTWF0aC5hYnMoeTEgLSB5MCk7XG4gICAgY29uc3Qgc3ggPSB4MCA8IHgxID8gMSA6IC0xLHN5ID0geTAgPCB5MSA/IDEgOiAtMTtcbiAgICBsZXQgZXJyID0gZHggLSBkeTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgZHJhd1BpeGVsKGN0eCwgeDAsIHkwLCByZ2JhKTtcbiAgICAgIGlmICh4MCA9PT0geDEgJiYgeTAgPT09IHkxKSBicmVhaztcbiAgICAgIGNvbnN0IGUyID0gMiAqIGVycjtcbiAgICAgIGlmIChlMiA+IC1keSkge2VyciAtPSBkeTt4MCArPSBzeDt9XG4gICAgICBpZiAoZTIgPCBkeCkge2VyciArPSBkeDt5MCArPSBzeTt9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRyYXdSZWN0ID0gKGN0eCwgeDAsIHkwLCB4MSwgeTEsIHJnYmEpID0+IHtcbiAgICBjb25zdCBtaW5YID0gTWF0aC5taW4oeDAsIHgxKSxtYXhYID0gTWF0aC5tYXgoeDAsIHgxKTtcbiAgICBjb25zdCBtaW5ZID0gTWF0aC5taW4oeTAsIHkxKSxtYXhZID0gTWF0aC5tYXgoeTAsIHkxKTtcbiAgICBmb3IgKGxldCB4ID0gbWluWDsgeCA8PSBtYXhYOyB4KyspIHtkcmF3UGl4ZWwoY3R4LCB4LCBtaW5ZLCByZ2JhKTtkcmF3UGl4ZWwoY3R4LCB4LCBtYXhZLCByZ2JhKTt9XG4gICAgZm9yIChsZXQgeSA9IG1pblk7IHkgPD0gbWF4WTsgeSsrKSB7ZHJhd1BpeGVsKGN0eCwgbWluWCwgeSwgcmdiYSk7ZHJhd1BpeGVsKGN0eCwgbWF4WCwgeSwgcmdiYSk7fVxuICB9O1xuXG4gIGNvbnN0IGRyYXdDaXJjbGUgPSAoY3R4LCBjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMsIHJnYmEsIGZpbGwgPSBmYWxzZSkgPT4ge1xuICAgIC8vIFNuYXAgY2VudGVyIGFuZCByYWRpdXMgdG8gaW50ZWdlciBwaXhlbHNcbiAgICBjb25zdCBjeCA9IE1hdGgucm91bmQoY2VudGVyWCk7XG4gICAgY29uc3QgY3kgPSBNYXRoLnJvdW5kKGNlbnRlclkpO1xuICAgIGNvbnN0IHIgPSBNYXRoLnJvdW5kKHJhZGl1cyk7XG5cbiAgICBpZiAociA8PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCByU3F1YXJlZCA9IHIgKiByO1xuXG4gICAgaWYgKGZpbGwpIHtcbiAgICAgIC8vIEZpbGxlZCBjaXJjbGUgdXNpbmcgdHJ1ZSBFdWNsaWRlYW4gZGlzdGFuY2UgZm9ybXVsYVxuICAgICAgLy8gRm9yIGVhY2ggcGl4ZWw6IGR4wrIgKyBkecKyIDw9IHLCslxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBDQU5WQVNfU0laRTsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgQ0FOVkFTX1NJWkU7IHgrKykge1xuICAgICAgICAgIGNvbnN0IGR4ID0geCAtIGN4O1xuICAgICAgICAgIGNvbnN0IGR5ID0geSAtIGN5O1xuICAgICAgICAgIGNvbnN0IGRpc3RTcXVhcmVkID0gZHggKiBkeCArIGR5ICogZHk7XG5cbiAgICAgICAgICBpZiAoZGlzdFNxdWFyZWQgPD0gclNxdWFyZWQpIHtcbiAgICAgICAgICAgIGRyYXdQaXhlbChjdHgsIHgsIHksIHJnYmEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDaXJjbGUgb3V0bGluZSB1c2luZyBNaWRwb2ludCBDaXJjbGUgQWxnb3JpdGhtIChCcmVzZW5oYW0pXG4gICAgICAvLyBQbG90cyA4LXdheSBzeW1tZXRyaWMgcG9pbnRzIGZvciBwZXJmZWN0IHBpeGVsIGFydCBjaXJjbGVzXG4gICAgICBsZXQgeCA9IHIseSA9IDA7XG4gICAgICBsZXQgZXJyID0gMDtcblxuICAgICAgd2hpbGUgKHggPj0geSkge1xuICAgICAgICAvLyBQbG90IDggc3ltbWV0cmljIHBvaW50c1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjeCArIHgsIGN5ICsgeSwgcmdiYSk7XG4gICAgICAgIGRyYXdQaXhlbChjdHgsIGN4ICsgeSwgY3kgKyB4LCByZ2JhKTtcbiAgICAgICAgZHJhd1BpeGVsKGN0eCwgY3ggLSB5LCBjeSArIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjeCAtIHgsIGN5ICsgeSwgcmdiYSk7XG4gICAgICAgIGRyYXdQaXhlbChjdHgsIGN4IC0geCwgY3kgLSB5LCByZ2JhKTtcbiAgICAgICAgZHJhd1BpeGVsKGN0eCwgY3ggLSB5LCBjeSAtIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjeCArIHksIGN5IC0geCwgcmdiYSk7XG4gICAgICAgIGRyYXdQaXhlbChjdHgsIGN4ICsgeCwgY3kgLSB5LCByZ2JhKTtcblxuICAgICAgICB5Kys7XG4gICAgICAgIGVyciArPSAxICsgMiAqIHk7XG4gICAgICAgIGlmICgyICogKGVyciAtIHgpICsgMSA+IDApIHtcbiAgICAgICAgICB4LS07XG4gICAgICAgICAgZXJyICs9IDEgLSAyICogeDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0UGl4ZWxDb29yZHMoZSk7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBzZXREcmF3aW5nKHRydWUpO1xuICAgIHNldERyYXdTdGFydCh7IHgsIHkgfSk7XG5cbiAgICBpZiAodG9vbCA9PT0gXCJleWVkcm9wcGVyXCIpIHtcbiAgICAgIGNvbnN0IHB4ID0gY3R4LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKS5kYXRhO1xuICAgICAgY29uc3QgaGV4ID0gcmdiYVRvSGV4KHB4WzBdLCBweFsxXSwgcHhbMl0sIHB4WzNdKTtcbiAgICAgIGlmIChoZXggIT09IFwidHJhbnNwYXJlbnRcIikge3NldENvbG9yKGhleCk7c2V0Q3VzdG9tSGV4KGhleCk7fVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodG9vbCA9PT0gXCJidWNrZXRcIikge1xuICAgICAgZmxvb2RGaWxsKGN0eCwgeCwgeSwgaGV4VG9SZ2JhKGNvbG9yKSk7XG4gICAgICBwdXNoSGlzdG9yeSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodG9vbCA9PT0gXCJwZW5jaWxcIiB8fCB0b29sID09PSBcImJydXNoXCIgfHwgdG9vbCA9PT0gXCJlcmFzZXJcIikge1xuICAgICAgY29uc3QgcmdiYSA9IHRvb2wgPT09IFwiZXJhc2VyXCIgPyBbMCwgMCwgMCwgMF0gOiBoZXhUb1JnYmEoY29sb3IpO1xuICAgICAgLy8gU2hpZnQrY2xpY2s6IGRyYXcgc3RyYWlnaHQgbGluZSBmcm9tIGxhc3QgcG9pbnRcbiAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGxhc3RQb2ludCkge1xuICAgICAgICBkcmF3TGluZShjdHgsIGxhc3RQb2ludC54LCBsYXN0UG9pbnQueSwgeCwgeSwgcmdiYSk7XG4gICAgICAgIHB1c2hIaXN0b3J5KCk7XG4gICAgICAgIHNldExhc3RQb2ludCh7IHgsIHkgfSk7XG4gICAgICAgIHNldERyYXdpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkcmF3UGl4ZWwoY3R4LCB4LCB5LCByZ2JhKTtcbiAgICAgIHNldExhc3RQb2ludCh7IHgsIHkgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlTW92ZSA9IChlKSA9PiB7XG4gICAgaWYgKCFkcmF3aW5nKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBnZXRQaXhlbENvb3JkcyhlKTtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgaWYgKHRvb2wgPT09IFwicGVuY2lsXCIgfHwgdG9vbCA9PT0gXCJicnVzaFwiIHx8IHRvb2wgPT09IFwiZXJhc2VyXCIpIHtcbiAgICAgIGNvbnN0IHJnYmEgPSB0b29sID09PSBcImVyYXNlclwiID8gWzAsIDAsIDAsIDBdIDogaGV4VG9SZ2JhKGNvbG9yKTtcbiAgICAgIC8vIFNoaWZ0LWNvbnN0cmFpbmVkIGRyYXdpbmc6IGxvY2sgdG8gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuICAgICAgbGV0IGRyYXdYID0geCxkcmF3WSA9IHk7XG4gICAgICBpZiAoZS5zaGlmdEtleSAmJiBkcmF3U3RhcnQpIHtcbiAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyh4IC0gZHJhd1N0YXJ0LngpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKHkgLSBkcmF3U3RhcnQueSk7XG4gICAgICAgIGlmIChkeCA+IGR5KSB7XG4gICAgICAgICAgZHJhd1kgPSBkcmF3U3RhcnQueTsgLy8gaG9yaXpvbnRhbFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyYXdYID0gZHJhd1N0YXJ0Lng7IC8vIHZlcnRpY2FsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIERyYXcgc21vb3RoIGxpbmUgZnJvbSBsYXN0IHBvaW50IHRvIGN1cnJlbnQgcG9pbnQgZm9yIGNvbnRpbnVvdXMgc3Ryb2tlc1xuICAgICAgaWYgKGxhc3RQb2ludCkge1xuICAgICAgICBkcmF3U21vb3RoTGluZShjdHgsIGxhc3RQb2ludC54LCBsYXN0UG9pbnQueSwgZHJhd1gsIGRyYXdZLCByZ2JhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYXdQaXhlbChjdHgsIGRyYXdYLCBkcmF3WSwgcmdiYSk7XG4gICAgICB9XG4gICAgICBzZXRMYXN0UG9pbnQoeyB4OiBkcmF3WCwgeTogZHJhd1kgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIGlmICghZHJhd2luZykgcmV0dXJuO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0UGl4ZWxDb29yZHMoZSk7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCByZ2JhID0gaGV4VG9SZ2JhKGNvbG9yKTtcblxuICAgIGlmICh0b29sID09PSBcImxpbmVcIiAmJiBkcmF3U3RhcnQpIHtcbiAgICAgIGRyYXdMaW5lKGN0eCwgZHJhd1N0YXJ0LngsIGRyYXdTdGFydC55LCB4LCB5LCByZ2JhKTtcbiAgICAgIHB1c2hIaXN0b3J5KCk7XG4gICAgICBzZXRMYXN0UG9pbnQoeyB4LCB5IH0pO1xuICAgIH0gZWxzZSBpZiAodG9vbCA9PT0gXCJyZWN0XCIgJiYgZHJhd1N0YXJ0KSB7XG4gICAgICBkcmF3UmVjdChjdHgsIGRyYXdTdGFydC54LCBkcmF3U3RhcnQueSwgeCwgeSwgcmdiYSk7XG4gICAgICBwdXNoSGlzdG9yeSgpO1xuICAgIH0gZWxzZSBpZiAodG9vbCA9PT0gXCJjaXJjbGVcIiAmJiBkcmF3U3RhcnQpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWF4KDEsIE1hdGgubWluKDIwMCwgTWF0aC5zcXJ0KE1hdGgucG93KHggLSBkcmF3U3RhcnQueCwgMikgKyBNYXRoLnBvdyh5IC0gZHJhd1N0YXJ0LnksIDIpKSkpO1xuICAgICAgZHJhd0NpcmNsZShjdHgsIGRyYXdTdGFydC54LCBkcmF3U3RhcnQueSwgcmFkaXVzLCByZ2JhLCBlLnNoaWZ0S2V5KTtcbiAgICAgIHB1c2hIaXN0b3J5KCk7XG4gICAgfSBlbHNlIGlmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiYnJ1c2hcIiB8fCB0b29sID09PSBcImVyYXNlclwiKSB7XG4gICAgICBwdXNoSGlzdG9yeSgpO1xuICAgICAgc2V0TGFzdFBvaW50KHsgeCwgeSB9KTtcbiAgICB9XG5cbiAgICBzZXREcmF3aW5nKGZhbHNlKTtcbiAgICBzZXREcmF3U3RhcnQobnVsbCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FudmFzTW91c2VNb3ZlID0gKGUpID0+IHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IGdldFBpeGVsQ29vcmRzKGUpO1xuICAgIHNldEN1cnNvclBvcyh7IHgsIHkgfSk7XG4gICAgaGFuZGxlTW91c2VNb3ZlKGUpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQ2FudmFzID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIHB1c2hIaXN0b3J5KCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3VzdG9tSGV4ID0gKHZhbCkgPT4ge1xuICAgIHNldEN1c3RvbUhleCh2YWwpO1xuICAgIGlmICgvXiNbMC05YS1mQS1GXXs2fSQvLnRlc3QodmFsKSkgc2V0Q29sb3IodmFsKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5U2l6ZSA9IENBTlZBU19TSVpFOyAvLyBjYW52YXMgRE9NIHNpemUgaXMgZml4ZWQ7IHpvb20gaXMgQ1NTIHRyYW5zZm9ybSBvbmx5XG5cbiAgY29uc3QgaGFuZGxlQ2FudmFzV2hlZWwgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRab29tKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBmYWN0b3IgPSBlLmRlbHRhWSA8IDAgPyAxLjEgOiAxIC8gMS4xO1xuICAgICAgcmV0dXJuIE1hdGgubWF4KDAuMywgTWF0aC5taW4ocHJldiAqIGZhY3RvciwgMTYpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGxvYWRQTkcgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSB8fCAhZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpKSByZXR1cm47XG5cbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIC8vIERyYXcgdXBsb2FkZWQgaW1hZ2UgYXMgYmFzZSBsYXllclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgICAgcHVzaEhpc3RvcnkoKTtcbiAgICAgICAgc2V0T3ZlcmxheUltYWdlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgLy8gUmVzZXQgZmlsZSBpbnB1dFxuICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRQTkcgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcblxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5kb3dubG9hZCA9IGAke3NlbGVjdGVkQnVpbGRpbmd9X2x2JHtzZWxlY3RlZExldmVsfV8ke2FjdGl2ZVZhcmlhbnR9LnBuZ2A7XG4gICAgbGluay5ocmVmID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgbGluay5jbGljaygpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyT3ZlcmxheSA9ICgpID0+IHtcbiAgICBzZXRPdmVybGF5SW1hZ2UobnVsbCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU2NTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LVsxMDBdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU2Njo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgIzRjMWQ5NVwiLCB3aWR0aDogXCIxMDB2d1wiLCBoZWlnaHQ6IFwiMTAwdmhcIiB9fT5cbiAgICAgICAgey8qIFRpdGxlIGJhciAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1Njg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTIgYm9yZGVyLWJcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDRlXCIsIGJhY2tncm91bmQ6IFwiIzEzMTMyYVwiIH19PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTY5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU3MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF0gdGV4dC1wdXJwbGUtNDAwXCI+8J+OqCBQSVhFTCBFRElUT1Ig4oCUIERFViBNT0RFPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTcxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5BdXRvLXNhdmVzIGV2ZXJ5IHN0cm9rZTwvc3Bhbj5cbiAgICAgICAgICAgIHtzYXZlZCAmJiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1NzI6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtZ3JlZW4tNDAwIGFuaW1hdGUtcHVsc2VcIj7inJMgQ29waWVkITwvc3Bhbj59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1NzQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1NzU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVVbmRvfSB0aXRsZT1cIlVuZG8gKENtZCtaKVwiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1NzY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTc4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlUmVkb30gdGl0bGU9XCJSZWRvIChDbWQrU2hpZnQrWilcIiBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxSb3RhdGVDdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1Nzk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTgxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlU2F2ZX0gdGl0bGU9XCJTYXZlIChDbWQrUylcIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzdjM2FlZFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNhODU1ZjdcIiB9fT5cbiAgICAgICAgICAgICAgPFNhdmUgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTgyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+U0FWRVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU4NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtpZiAoY2FudmFzKSB7Y29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7bG9jYWxTdG9yYWdlLnNldEl0ZW0oYGJ1aWxkaW5nX2NsaXBib2FyZF8ke3NlbGVjdGVkQnVpbGRpbmd9YCwgZGF0YVVybCk7c2V0U2F2ZWQodHJ1ZSk7c2V0VGltZW91dCgoKSA9PiBzZXRTYXZlZChmYWxzZSksIDE1MDApO319fSBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzAwODRmZlwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMwMDU1Y2NcIiB9fT5cbiAgICAgICAgICAgICAg8J+TiyBDT1BZXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTg3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge2NvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYnVpbGRpbmdfY2xpcGJvYXJkXyR7c2VsZWN0ZWRCdWlsZGluZ31gKTtpZiAoZGF0YSkge2NvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O2lmIChjYW52YXMpIHtjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO2NvbnN0IGltZyA9IG5ldyBJbWFnZSgpO2ltZy5vbmxvYWQgPSAoKSA9PiB7Y3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO2N0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtwdXNoSGlzdG9yeSgpO307aW1nLnNyYyA9IGRhdGE7c2F2ZVNwcml0ZShzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsLCBkYXRhKTtpbnZhbGlkYXRlU3ByaXRlQ2FjaGUoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCk7c2V0U2F2ZWQodHJ1ZSk7c2V0VGltZW91dCgoKSA9PiBzZXRTYXZlZChmYWxzZSksIDE1MDApO319fX0gY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwMGIzNzlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMDA4NDRhXCIgfX0+XG4gICAgICAgICAgICAgIPCfk6UgUEFTVEVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1OTA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7c2V0Q29weVRhcmdldExldmVscyhbXSk7c2V0Q29weUZlZWRiYWNrKFwiXCIpO3NldFNob3dDb3B5TW9kYWwodHJ1ZSk7fX0gdGl0bGU9XCJDb3B5IGRlc2lnbiB0byBvdGhlciBsZXZlbHNcIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBmNzY2ZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxNGI4YTZcIiB9fT5cbiAgICAgICAgICAgICAgPENvcHkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NTkxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+Q09QWSBUT1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU5MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dQdWJsaXNoQ29uZmlybSh0cnVlKX0gdGl0bGU9XCJTZW5kIHRvIEdhbWVcIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBpc1B1Ymxpc2hlZCA/IFwiIzE0NTMyZFwiIDogXCIjMWUzYTVmXCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2lzUHVibGlzaGVkID8gXCIjNGFkZTgwXCIgOiBcIiNmNTllMGJcIn1gLCBjb2xvcjogaXNQdWJsaXNoZWQgPyBcIiM0YWRlODBcIiA6IFwiI2ZiYmYyNFwiIH19PlxuICAgICAgICAgICAgICA8U2VuZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1OTQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTF9IC8+e2lzUHVibGlzaGVkID8gXCJMSVZFXCIgOiBcIlNFTkQgVE8gR0FNRVwifVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU5NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkUE5HfSB0aXRsZT1cIkRvd25sb2FkIFBOR1wiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjU5NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo1OTk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX0gdGl0bGU9XCJVcGxvYWQgUE5HIFJlZmVyZW5jZVwiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgPFVwbG9hZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2MDA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2MDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS9wbmcsaW1hZ2UvanBlZ1wiXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVXBsb2FkUE5HfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2MDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJwLTEgcm91bmRlZCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjYxMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjYxNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LTEgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgey8qIExlZnQgc2lkZWJhciDigJQgdG9vbHMgJiBicnVzaCAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjYxNzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTMgcC0zIGJvcmRlci1yIG92ZXJmbG93LXktYXV0b1wiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiMyZDJkNGVcIiwgYmFja2dyb3VuZDogXCIjMTMxMzJhXCIsIG1pbldpZHRoOiBcIjgwcHhcIiB9fT5cbiAgICAgICAgICAgIHsvKiBUb29scyAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjE5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjIwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCBtYi0xXCI+VE9PTFM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2MjE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAge1RPT0xTLm1hcCgodCwgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjYyMzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRvb2wodC5pZCl9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3QudGl0bGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIHRleHQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHRvb2wgPT09IHQuaWQgPyBcIiM3YzNhZWRcIiA6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHt0b29sID09PSB0LmlkID8gXCIjYTg1NWY3XCIgOiBcIiMzZDNkNWVcIn1gIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0Py5pZH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJUT09MU1wiIGRhdGEtYXJyLWZpZWxkPVwibGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7dC5sYWJlbH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCcnVzaCBzaXplIHNsaWRlciAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjM3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjM4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImJydXNoU2l6ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+U0laRToge2JydXNoU2l6ZX1weDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjM5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICAgIG1heD1cIjIwMFwiXG4gICAgICAgICAgICAgIHZhbHVlPXticnVzaFNpemV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QnJ1c2hTaXplKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTZcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJkNGVcIiwgYWNjZW50Q29sb3I6IFwiIzdjM2FlZFwiIH19IC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBab29tIGRpc3BsYXkgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjY1MToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjY1MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbWItMVwiPlpPT008L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2NTM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHRleHQtY2VudGVyXCI+eyh6b29tICogMTAwKS50b0ZpeGVkKDApfSU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2NTQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNjAwIHRleHQtY2VudGVyIG10LTAuNVwiPnNjcm9sbCB0byB6b29tPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENsZWFyICovfVxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2NTg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtjbGVhckNhbnZhc30gY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtcmVkLTQwMCBob3ZlcjpiZy1yZWQtOTAwLzMwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjN2YxZDFkXCIgfX0+XG4gICAgICAgICAgICAgIENMRUFSXG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFdhbGwgbGF5ZXJzIOKAlCBvbmx5IHNob3cgd2hlbiBlZGl0aW5nIHdhbGxzICovfVxuICAgICAgICAgICAge3NlbGVjdGVkQnVpbGRpbmcgPT09IFwid2FsbFwiICYmXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjY2NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjY1OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCBtYi0xXCI+V0FMTCBMQVlFUjwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjY2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRXYWxsTGF5ZXIoXCJiYXNlXCIpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWItMSBweC0yIHB5LTEgcm91bmRlZCBmb250LXVpIHRleHQteHMgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFdhbGxMYXllciA9PT0gXCJiYXNlXCIgPyBcIiM3YzNhZWRcIiA6IFwiIzJkMmQ0ZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3NlbGVjdGVkV2FsbExheWVyID09PSBcImJhc2VcIiA/IFwiI2E4NTVmN1wiIDogXCIjM2QzZDVlXCJ9YCxcbiAgICAgICAgICAgICAgICBjb2xvcjogc2VsZWN0ZWRXYWxsTGF5ZXIgPT09IFwiYmFzZVwiID8gXCIjZmZmXCIgOiBcIiNhYWFcIlxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgIEJBU0VcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7W1wic3dcIiwgXCJzZVwiLCBcIm53XCIsIFwibmVcIl0ubWFwKChkaXIsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6Njc2OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtkaXJ9IG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkV2FsbExheWVyKGRpcil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYi0xIHB4LTIgcHktMSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkV2FsbExheWVyID09PSBkaXIgPyBcIiM3YzNhZWRcIiA6IFwiIzJkMmQ0ZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3NlbGVjdGVkV2FsbExheWVyID09PSBkaXIgPyBcIiNhODU1ZjdcIiA6IFwiIzNkM2Q1ZVwifWAsXG4gICAgICAgICAgICAgICAgY29sb3I6IHNlbGVjdGVkV2FsbExheWVyID09PSBkaXIgPyBcIiNmZmZcIiA6IFwiI2FhYVwiXG4gICAgICAgICAgICAgIH19IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffT5cbiAgICAgICAgICAgICAgICAgICAge2Rpci50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENlbnRlciDigJQgY2FudmFzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjkxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1zdGFydCBwLTQgZ2FwLTIgb3ZlcmZsb3ctYXV0byBmbGV4LTFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiB9fT5cbiAgICAgICAgICAgIHsvKiBCdWlsZGluZyBzZWxlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NjkzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItMSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPHNlbGVjdCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo2OTQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRCdWlsZGluZ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7c2V0U2VsZWN0ZWRCdWlsZGluZyhlLnRhcmdldC52YWx1ZSk7c2V0U2VsZWN0ZWRMZXZlbCgxKTt9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTIgcHktMSBmb250LXVpIHRleHQteHMgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YzFkOTVcIiB9fT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoQlVJTERJTkdfREVGUykubWFwKChba2V5LCBkZWZdKSA9PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzAxOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtrZXl9IHZhbHVlPXtrZXl9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT57ZGVmLm5hbWV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgey8qIExldmVsIGRyb3Bkb3duICovfVxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjcwNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo3MDc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dMZXZlbERyb3Bkb3duKCh2KSA9PiAhdil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0xIHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzJkMmQ0ZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YzFkOTVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNlbGVjdGVkTGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBMdi57c2VsZWN0ZWRMZXZlbH0gPENoZXZyb25Eb3duIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjcxMjozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMH0gLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7c2hvd0xldmVsRHJvcGRvd24gJiZcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjcxNToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC03IGxlZnQtMCB6LTEwIHJvdW5kZWQgb3ZlcmZsb3cteS1hdXRvXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzRjMWQ5NVwiLCBtYXhIZWlnaHQ6IFwiMjAwcHhcIiwgd2lkdGg6IFwiNzBweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMzAgfSwgKF8sIGkpID0+IGkgKyAxKS5tYXAoKGwpID0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjcxNzoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17bH0gb25DbGljaz17KCkgPT4ge3NldFNlbGVjdGVkTGV2ZWwobCk7c2V0U2hvd0xldmVsRHJvcGRvd24oZmFsc2UpO319XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHB4LTIgcHktMSBmb250LXVpIHRleHQteHMgaG92ZXI6YmctcHVycGxlLTkwMC80MFwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogc2VsZWN0ZWRMZXZlbCA9PT0gbCA/IFwiI2MwODRmY1wiIDogXCIjYWFhXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsXCI+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgTGV2ZWwge2x9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVmFyaWFudCBkcm9wZG93biAqL31cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo3Mjk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzMwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93VmFyaWFudE1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJkNGVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGMxZDk1XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJhY3RpdmVWYXJpYW50XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2lkfT5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAg8J+TiyB7YWN0aXZlVmFyaWFudH0gPENoZXZyb25Eb3duIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjczNTozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMH0gLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzM5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2VsZWN0ZWRCdWlsZGluZy5pY29uXCI+XG4gICAgICAgICAgICAgICAge0JVSUxESU5HX0RFRlNbc2VsZWN0ZWRCdWlsZGluZ10/Lmljb259IHtDQU5WQVNfU0laRX3Dl3tDQU5WQVNfU0laRX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQaXhlbCBjYW52YXMgd2l0aCBjaGVja2VyYm9hcmQgYmFja2dyb3VuZCDigJQgem9vbSB2aWEgQ1NTIHRyYW5zZm9ybSBvbmx5ICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo3NDU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLCB3aWR0aDogZGlzcGxheVNpemUsIGhlaWdodDogZGlzcGxheVNpemUsIHRyYW5zZm9ybTogYHNjYWxlKCR7em9vbX0pYCwgdHJhbnNmb3JtT3JpZ2luOiBcInRvcCBjZW50ZXJcIiwgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gMC4wNXMgZWFzZS1vdXRcIiB9fT5cbiAgICAgICAgICAgICAgey8qIENoZWNrZXJib2FyZCAodHJhbnNwYXJlbmN5IGluZGljYXRvcikgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzQ3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2JyUzRSUzQ3JlY3Qgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nJTIzNTU1Jy8lM0UlM0NyZWN0IHg9JzgnIHk9JzgnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyUyMzU1NScvJTNFJTNDcmVjdCB4PSc4JyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSclMjMzMzMnLyUzRSUzQ3JlY3QgeT0nOCcgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nJTIzMzMzJy8lM0UlM0Mvc3ZnJTNFXFxcIilcIixcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogYDE2cHhgXG4gICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgIDxjYW52YXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzUyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgcmVmPXtjYW52YXNSZWZ9XG4gICAgICAgICAgICAgIHdpZHRoPXtDQU5WQVNfU0laRX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtDQU5WQVNfU0laRX1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogZGlzcGxheVNpemUsIGhlaWdodDogZGlzcGxheVNpemUsXG4gICAgICAgICAgICAgICAgaW1hZ2VSZW5kZXJpbmc6IFwicGl4ZWxhdGVkXCIsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiB0b29sID09PSBcImV5ZWRyb3BwZXJcIiA/IFwiY3Jvc3NoYWlyXCIgOiB0b29sID09PSBcImJ1Y2tldFwiID8gXCJjZWxsXCIgOiBcImNyb3NzaGFpclwiXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVDYW52YXNNb3VzZU1vdmV9XG4gICAgICAgICAgICAgIG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7aWYgKGRyYXdpbmcpIHtwdXNoSGlzdG9yeSgpO3NldERyYXdpbmcoZmFsc2UpO319fVxuICAgICAgICAgICAgICBvbldoZWVsPXtoYW5kbGVDYW52YXNXaGVlbH0gLz5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBPdmVybGF5IGltYWdlIChyZWZlcmVuY2UpICovfVxuICAgICAgICAgICAgICB7b3ZlcmxheUltYWdlICYmXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6NzcwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogb3ZlcmxheU9wYWNpdHlcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjc3NDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHNyYz17b3ZlcmxheUltYWdlfSBhbHQ9XCJSZWZlcmVuY2VcIiBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIsIGhlaWdodDogXCIxMDAlXCIsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiIH19IC8+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjc3NToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xlYXJPdmVybGF5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIHJpZ2h0LTEgcC0xIHJvdW5kZWQgYmctcmVkLTYwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXJlZC03MDBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEwcHhcIiB9fVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUmVtb3ZlIG92ZXJsYXlcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICDinJVcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgey8qIEdyaWQgb3ZlcmxheSDigJQgcGl4ZWwgZ3JpZCBhdCB6b29tID49IDIgKi99XG4gICAgICAgICAgICAgIHt6b29tID49IDIgJiZcbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo3ODg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsIGluc2V0OiAwLCBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQocmdiYSgyNTUsMjU1LDI1NSwwLjA1KSAxcHgsIHRyYW5zcGFyZW50IDFweCksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwLjA1KSAxcHgsIHRyYW5zcGFyZW50IDFweClgLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiBgMXB4IDFweGBcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHsvKiBPdmVybGF5IG9wYWNpdHkgY29udHJvbCAqL31cbiAgICAgICAgICAgICAge292ZXJsYXlJbWFnZSAmJlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjc5NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgYm90dG9tOiA4LCByaWdodDogOCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC43KVwiLCBwYWRkaW5nOiBcIjRweCA4cHhcIiwgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogXCJhdXRvXCJcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4MDM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBjb2xvcjogXCIjZmZmXCIsIGZvbnRTaXplOiBcIjEwcHhcIiB9fT5PdmVybGF5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4MDQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgICAgbWF4PVwiMTAwXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17TWF0aC5yb3VuZChvdmVybGF5T3BhY2l0eSAqIDEwMCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRPdmVybGF5T3BhY2l0eShwYXJzZUludChlLnRhcmdldC52YWx1ZSkgLyAxMDApfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBcIjgwcHhcIiwgYWNjZW50Q29sb3I6IFwiIzdjM2FlZFwiIH19IC8+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4MTI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBjb2xvcjogXCIjZmZmXCIsIGZvbnRTaXplOiBcIjEwcHhcIiwgd2lkdGg6IFwiMzBweFwiIH19PntNYXRoLnJvdW5kKG92ZXJsYXlPcGFjaXR5ICogMTAwKX0lPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsvKiBDdXJzb3Igb3V0bGluZSByaW5nIGZvciBkcmF3aW5nIHRvb2xzICovfVxuICAgICAgICAgICAgICB7Y3Vyc29yUG9zICYmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiYnJ1c2hcIiB8fCB0b29sID09PSBcImVyYXNlclwiIHx8IHRvb2wgPT09IFwiY2lyY2xlXCIpICYmXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6ODE3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGN1cnNvclBvcy54LFxuICAgICAgICAgICAgICAgIHRvcDogY3Vyc29yUG9zLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJydXNoU2l6ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGJydXNoU2l6ZSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKC01MCUsIC01MCUpXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7dG9vbCA9PT0gXCJlcmFzZXJcIiA/IFwiI2VmNDQ0NFwiIDogY29sb3J9YCxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwIDRweCAke3Rvb2wgPT09IFwiZXJhc2VyXCIgPyBcIiNlZjQ0NDRcIiA6IGNvbG9yfSwgMCAwIDhweCAke3Rvb2wgPT09IFwiZXJhc2VyXCIgPyBcIiNlZjQ0NDQ4OFwiIDogY29sb3IgKyBcIjg4XCJ9YFxuICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4MzI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNjAwIG10LTFcIj5cbiAgICAgICAgICAgICAgQ21kK1o6IFVuZG8gwrcgQ21kK1NoaWZ0K1o6IFJlZG8gwrcgQ21kK1M6IFNhdmUgwrcgU2hpZnQrQ2xpY2s6IFN0cmFpZ2h0IGxpbmVcbiAgICAgICAgICAgICAge2xhc3RQb2ludCAmJiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4MzQ6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctNjAwXCI+IMK3IOKXjyBhbmNob3Igc2V0PC9zcGFuPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0IHNpZGViYXIg4oCUIGNvbG9yIHBhbGV0dGUgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4Mzk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHAtMyBnYXAtMyBib3JkZXItbCBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMmQyZDRlXCIsIGJhY2tncm91bmQ6IFwiIzEzMTMyYVwiLCBtaW5XaWR0aDogXCIyMTBweFwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4NDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5DT0xPUjwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3BlY3RydW0gcGlja2VyICovfVxuICAgICAgICAgICAgPFNwZWN0cnVtQ29sb3JQaWNrZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6ODQzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGNvbG9yPXtjb2xvciA9PT0gXCJ0cmFuc3BhcmVudFwiID8gXCIjMDAwMDAwXCIgOiBjb2xvcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoYykgPT4ge3NldENvbG9yKGMpO3NldEN1c3RvbUhleChjKTt9fSAvPlxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHsvKiBQYWxldHRlIHN3YXRjaGVzICovfVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo4NDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIj5QQUxFVFRFPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg1MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ2FwLTAuNVwiIHN0eWxlPXt7IGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDgsIDFmcilcIiB9fT5cbiAgICAgICAgICAgICAge1BBTEVUVEUubWFwKChjLCBpKSA9PlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg1MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge3NldENvbG9yKGMpO2lmIChjICE9PSBcInRyYW5zcGFyZW50XCIpIHNldEN1c3RvbUhleChjKTt9fVxuICAgICAgICAgICAgICB0aXRsZT17Y31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1zbSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE4LCBoZWlnaHQ6IDE4LFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGMgPT09IFwidHJhbnNwYXJlbnRcIiA/XG4gICAgICAgICAgICAgICAgXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyUzRSUzQ3JlY3Qgd2lkdGg9JzQnIGhlaWdodD0nNCcgZmlsbD0nJTIzYWFhJy8lM0UlM0NyZWN0IHg9JzQnIHk9JzQnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnIGZpbGw9JyUyM2FhYScvJTNFJTNDcmVjdCB4PSc0JyB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPSclMjNmZmYnLyUzRSUzQ3JlY3QgeT0nNCcgd2lkdGg9JzQnIGhlaWdodD0nNCcgZmlsbD0nJTIzZmZmJy8lM0UlM0Mvc3ZnJTNFXFxcIilcIiA6XG4gICAgICAgICAgICAgICAgYyxcbiAgICAgICAgICAgICAgICBib3JkZXI6IGNvbG9yID09PSBjID8gXCIycHggc29saWQgI2MwODRmY1wiIDogXCIxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjEpXCIsXG4gICAgICAgICAgICAgICAgb3V0bGluZTogY29sb3IgPT09IGMgPyBcIjFweCBzb2xpZCAjN2MzYWVkXCIgOiBcIm5vbmVcIlxuICAgICAgICAgICAgICB9fSBkYXRhLWFyci1pbmRleD17aX0gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBBTEVUVEVcIiAvPlxuXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHsvKiBQdWJsaXNoIENvbmZpcm0gTW9kYWwgKi99XG4gICAgICB7c2hvd1B1Ymxpc2hDb25maXJtICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg3Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzc1IHJvdW5kZWQteGxcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg3NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgcC01IHctWzMyMHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMTExN1wiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNmNTllMGJcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6ODc1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bMTBweF0gdGV4dC15ZWxsb3ctNDAwIG1iLTJcIj5TRU5EIFRPIEdBTUU/PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg3NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXdoaXRlIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNlbGVjdGVkQnVpbGRpbmcubmFtZVwiPntCVUlMRElOR19ERUZTW3NlbGVjdGVkQnVpbGRpbmddPy5uYW1lfSDigJQgTGV2ZWwge3NlbGVjdGVkTGV2ZWx9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg3NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItNFwiPlxuICAgICAgICAgICAgICBUaGlzIHdpbGwgcmVwbGFjZSB0aGUgZW1vamkgYmxvY2sgd2l0aCB5b3VyIHBpeGVsIGFydCBvbiB0aGUgbWFpbiBnYW1lIHNjcmVlbi4gVGhpcyBwZXJzaXN0cyBhZnRlciByZWxvYWQuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6ODgwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjg4MToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dQdWJsaXNoQ29uZmlybShmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICMzMzQxNTVcIiB9fT5cbiAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6ODg1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICAgICAgICAgIHB1Ymxpc2hCdWlsZGluZ1Nwcml0ZShzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsLCBkYXRhVXJsLCBhY3RpdmVWYXJpYW50KTtcbiAgICAgICAgICAgICAgICBpbnZhbGlkYXRlUHVibGlzaGVkQnVpbGRpbmdDYWNoZShzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsLCBhY3RpdmVWYXJpYW50KTtcbiAgICAgICAgICAgICAgICBzZXRJc1B1Ymxpc2hlZCh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRTaG93UHVibGlzaENvbmZpcm0oZmFsc2UpO1xuICAgICAgICAgICAgfX0gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1ibGFja1wiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2Y1OWUwYlwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNmYmJmMjRcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImFjdGl2ZVZhcmlhbnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICAgIOKckyBTRU5EIFRPIEdBTUUgKHthY3RpdmVWYXJpYW50fSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHsvKiBDb3B5IFRvIExldmVscyBNb2RhbCAqL31cbiAgICAgIHtzaG93Q29weU1vZGFsICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjkwNDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzcwIHJvdW5kZWQteGxcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjkwNToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgcC01IHctWzM2MHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICMxNGI4YTZcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTA2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LXRlYWwtNDAwIG1iLTFcIj5DT1BZIERFU0lHTiBUTyBMRVZFTFM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTA3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgQ29weSA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5MDg6MTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzZWxlY3RlZEJ1aWxkaW5nLm5hbWVcIj57QlVJTERJTkdfREVGU1tzZWxlY3RlZEJ1aWxkaW5nXT8ubmFtZX0gTHYue3NlbGVjdGVkTGV2ZWx9PC9zcGFuPiBkZXNpZ24gdG86XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIHNlbGVjdHMgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjkxMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbWItMyBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5MTM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRDb3B5VGFyZ2V0TGV2ZWxzKEFycmF5LmZyb20oeyBsZW5ndGg6IDMwIH0sIChfLCBpKSA9PiBpICsgMSkuZmlsdGVyKChsKSA9PiBsICE9PSBzZWxlY3RlZExldmVsKSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC10ZWFsLTMwMCBob3ZlcjpiZy10ZWFsLTkwMC80MFwiIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzE0YjhhNlwiIH19PlxuICAgICAgICAgICAgICAgIEFsbCBsZXZlbHNcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTE3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0Q29weVRhcmdldExldmVscyhBcnJheS5mcm9tKHsgbGVuZ3RoOiAzMCB9LCAoXywgaSkgPT4gaSArIDEpLmZpbHRlcigobCkgPT4gbCA+IHNlbGVjdGVkTGV2ZWwpKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXRlYWwtMzAwIGhvdmVyOmJnLXRlYWwtOTAwLzQwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjMTRiOGE2XCIgfX0+XG4gICAgICAgICAgICAgICAgQWxsIGFib3ZlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjkyMToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldENvcHlUYXJnZXRMZXZlbHMoQXJyYXkuZnJvbSh7IGxlbmd0aDogMzAgfSwgKF8sIGkpID0+IGkgKyAxKS5maWx0ZXIoKGwpID0+IGwgPCBzZWxlY3RlZExldmVsKSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC10ZWFsLTMwMCBob3ZlcjpiZy10ZWFsLTkwMC80MFwiIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzE0YjhhNlwiIH19PlxuICAgICAgICAgICAgICAgIEFsbCBiZWxvd1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5MjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRDb3B5VGFyZ2V0TGV2ZWxzKFtdKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICM0NDRcIiB9fT5cbiAgICAgICAgICAgICAgICBDbGVhclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTGV2ZWwgZ3JpZCAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTMyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtMSBtYi00XCIgc3R5bGU9e3sgZ3JpZFRlbXBsYXRlQ29sdW1uczogXCJyZXBlYXQoMTAsIDFmcilcIiB9fT5cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IDMwIH0sIChfLCBpKSA9PiBpICsgMSkubWFwKChsdmwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNDdXJyZW50ID0gbHZsID09PSBzZWxlY3RlZExldmVsO1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY29weVRhcmdldExldmVscy5pbmNsdWRlcyhsdmwpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTM3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBrZXk9e2x2bH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiAhaXNDdXJyZW50ICYmIHRvZ2dsZUNvcHlMZXZlbChsdmwpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0N1cnJlbnR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBmb250LXVpIHRleHQtWzEwcHhdIGgtNyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzQ3VycmVudCA/IFwiIzM3NDE1MVwiIDogaXNTZWxlY3RlZCA/IFwiIzBmNzY2ZVwiIDogXCIjMmQyZDRlXCIsXG4gICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0N1cnJlbnQgPyBcIiM0YjU1NjNcIiA6IGlzU2VsZWN0ZWQgPyBcIiMxNGI4YTZcIiA6IFwiIzNkM2Q1ZVwifWAsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogaXNDdXJyZW50ID8gXCIjNmI3MjgwXCIgOiBpc1NlbGVjdGVkID8gXCIjZmZmXCIgOiBcIiNhYWFcIixcbiAgICAgICAgICAgICAgICAgIGN1cnNvcjogaXNDdXJyZW50ID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCJcbiAgICAgICAgICAgICAgICB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImx2bFwiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtsdmx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xuXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7Y29weUZlZWRiYWNrID9cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk1NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZvbnQtdWkgdGV4dC1zbSB0ZXh0LWdyZWVuLTQwMCBweS0yXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJjb3B5RmVlZGJhY2tcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PuKckyB7Y29weUZlZWRiYWNrfTwvZGl2PiA6XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk1ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk1OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtzZXRTaG93Q29weU1vZGFsKGZhbHNlKTtzZXRDb3B5VGFyZ2V0TGV2ZWxzKFtdKTt9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtNzAwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjNDQ0XCIgfX0+XG4gICAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk2MzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5VG9MZXZlbHN9XG4gICAgICAgICAgICBkaXNhYmxlZD17Y29weVRhcmdldExldmVscy5sZW5ndGggPT09IDB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXdoaXRlIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IGNvcHlUYXJnZXRMZXZlbHMubGVuZ3RoID4gMCA/IFwiIzBmNzY2ZVwiIDogXCIjMWYyOTM3XCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2NvcHlUYXJnZXRMZXZlbHMubGVuZ3RoID4gMCA/IFwiIzE0YjhhNlwiIDogXCIjMzc0MTUxXCJ9YCB9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBDT1BZIFRPIHtjb3B5VGFyZ2V0TGV2ZWxzLmxlbmd0aCA+IDAgPyBgJHtjb3B5VGFyZ2V0TGV2ZWxzLmxlbmd0aH0gTEVWRUwke2NvcHlUYXJnZXRMZXZlbHMubGVuZ3RoID4gMSA/IFwiU1wiIDogXCJcIn1gIDogXCIuLi5cIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cblxuICAgICAgey8qIFZhcmlhbnQgTWFuYWdlciBNb2RhbCAqL31cbiAgICAgIHtzaG93VmFyaWFudE1vZGFsICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk3OTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5ODA6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHAtNSB3LVs0MDBweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxYTFhMmVcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjN2MzYWVkXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjk4MToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LXB1cnBsZS00MDAgbWItM1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2VsZWN0ZWRCdWlsZGluZy5uYW1lXCI+VkFSSUFOVFMg4oCUIHtCVUlMRElOR19ERUZTW3NlbGVjdGVkQnVpbGRpbmddPy5uYW1lfSBMdi57c2VsZWN0ZWRMZXZlbH08L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5ODM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjo5ODQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1ZhciA9IGNyZWF0ZU5ld1ZhcmlhbnQoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRzID0gZ2V0VmFyaWFudExpc3Qoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCk7XG4gICAgICAgICAgICAgIHNldFZhcmlhbnRMaXN0KHZhcmlhbnRzLmxlbmd0aCA+IDAgPyB2YXJpYW50cyA6IFtcImRlZmF1bHRcIl0pO1xuICAgICAgICAgICAgICBzZXRBY3RpdmVWYXJpYW50U3RhdGUobmV3VmFyKTtcbiAgICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgaWYgKGN0eCkge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtwdXNoSGlzdG9yeSgpO31cbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwNTk2NjlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMTBiOTgxXCIgfX0+XG4gICAgICAgICAgICAgICAgPFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTkyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+TkVXIFZBUklBTlRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6OTk0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1ZhcmlhbnRNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICM0NDRcIiB9fT5cbiAgICAgICAgICAgICAgICBDTE9TRVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjEwMDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdhcC0yIG1iLTRcIiBzdHlsZT17eyBncmlkVGVtcGxhdGVDb2x1bW5zOiBcInJlcGVhdCgyLCAxZnIpXCIgfX0+XG4gICAgICAgICAgICAgIHt2YXJpYW50TGlzdC5tYXAoKHZhcklkKSA9PlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjoxMDAyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGtleT17dmFySWR9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldEFjdGl2ZVZhcmlhbnRTdGF0ZSh2YXJJZCk7XG4gICAgICAgICAgICAgIHNldEFjdGl2ZVZhcmlhbnQoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCwgdmFySWQpO1xuICAgICAgICAgICAgICAvLyBMb2FkIHRoaXMgdmFyaWFudCdzIHNwcml0ZVxuICAgICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGdldFNwcml0ZShzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsLCB2YXJJZCk7XG4gICAgICAgICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXNSZWYuY3VycmVudD8uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgaWYgKGN0eCkge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7cHVzaEhpc3RvcnkoKTt9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gZXhpc3Rpbmc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICBpZiAoY3R4KSB7Y3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO3B1c2hIaXN0b3J5KCk7fVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFNob3dWYXJpYW50TW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0yIGZvbnQtdWkgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnRcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogYWN0aXZlVmFyaWFudCA9PT0gdmFySWQgPyBcIiM3YzNhZWRcIiA6IFwiIzJkMmQ0ZVwiLFxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHthY3RpdmVWYXJpYW50ID09PSB2YXJJZCA/IFwiI2E4NTVmN1wiIDogXCIjM2QzZDVlXCJ9YCxcbiAgICAgICAgICAgICAgY29sb3I6IGFjdGl2ZVZhcmlhbnQgPT09IHZhcklkID8gXCIjZmZmXCIgOiBcIiNhYWFcIlxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjoxMDI5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjEwMzA6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInZhcklkXCI+e3ZhcklkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVZhcmlhbnQgPT09IHZhcklkICYmIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BpeGVsRWRpdG9yOjEwMzE6NDhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDAgdGV4dC1bMTBweF1cIj7inJMgQUNUSVZFPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7dmFyaWFudExpc3QubGVuZ3RoID4gMSAmJlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3I6MTAzODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGlmICghY29uZmlybShgRGVsZXRlIHZhcmlhbnQgXCIke2FjdGl2ZVZhcmlhbnR9XCI/YCkpIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZVZhcmlhbnQoc2VsZWN0ZWRCdWlsZGluZywgc2VsZWN0ZWRMZXZlbCwgYWN0aXZlVmFyaWFudCk7XG4gICAgICAgICAgICBjb25zdCB2YXJpYW50cyA9IGdldFZhcmlhbnRMaXN0KHNlbGVjdGVkQnVpbGRpbmcsIHNlbGVjdGVkTGV2ZWwpO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZ2V0QWN0aXZlVmFyaWFudChzZWxlY3RlZEJ1aWxkaW5nLCBzZWxlY3RlZExldmVsKTtcbiAgICAgICAgICAgIHNldFZhcmlhbnRMaXN0KHZhcmlhbnRzLmxlbmd0aCA+IDAgPyB2YXJpYW50cyA6IFtcImRlZmF1bHRcIl0pO1xuICAgICAgICAgICAgc2V0QWN0aXZlVmFyaWFudFN0YXRlKGFjdGl2ZSB8fCBcImRlZmF1bHRcIik7XG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBuZXcgYWN0aXZlIHZhcmlhbnRcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gZ2V0U3ByaXRlKHNlbGVjdGVkQnVpbGRpbmcsIHNlbGVjdGVkTGV2ZWwsIGFjdGl2ZSk7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXNSZWYuY3VycmVudD8uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7cHVzaEhpc3RvcnkoKTt9O1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBleGlzdGluZztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgICAgICAgICAgICAgcHVzaEhpc3RvcnkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH19IGNsYXNzTmFtZT1cInctZnVsbCBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtcmVkLTQwMCBob3ZlcjpiZy1yZWQtOTAwLzMwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjN2YxZDFkXCIgfX0+XG4gICAgICAgICAgICAgICAgPFRyYXNoMiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvcjoxMDU5OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+REVMRVRFIENVUlJFTlQgVkFSSUFOVFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9QaXhlbEVkaXRvci5qc3gifQ==