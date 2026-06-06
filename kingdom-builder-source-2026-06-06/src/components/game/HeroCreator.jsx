import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/HeroCreator.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/HeroCreator.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useState = __vite__cjsImport3_react["useState"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { X, RotateCcw, RotateCw, FlipHorizontal, Trash2, Plus, Send, ChevronDown } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { DIRECTIONS, DIRECTION_LABELS, getHeroSprite, saveHeroSprite, invalidateHeroSpriteCache, getAllHeroSpritesForType, getHeroVariants, createNewHeroVariant } from "/src/lib/heroSprites.js";
import { getAllCustomHeroes, saveCustomHero, createNewHero, deleteCustomHero } from "/src/lib/heroData.js";
import { publishHeroSprite, isPublishedHero, invalidatePublishedHeroCache } from "/src/lib/publishedSprites.js";
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
const MAX_TEMPLATES_PER_DIR = 20;
const BRUSH_SIZES = [1, 2, 3, 5, 8];
function hexToRgba(hex) {
  if (hex === "transparent") return [0, 0, 0, 0];
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), 255];
}
function rgbaToHex(r, g, b, a) {
  if (a === 0) return "transparent";
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function autoSaveSprite(heroId, dir, canvas, variantId = "default") {
  if (!heroId || !canvas) return;
  const dataUrl = canvas.toDataURL("image/png");
  saveHeroSprite(heroId, dir, dataUrl, variantId);
  invalidateHeroSpriteCache(heroId, dir);
}
export default function HeroCreator({ onClose, id }) {
  _s();
  const canvasRef = useRef(null);
  const [heroes, setHeroes] = useState(() => getAllCustomHeroes());
  const [selectedHeroId, setSelectedHeroId] = useState(() => getAllCustomHeroes()[0]?.id || null);
  const [selectedDir, setSelectedDir] = useState("S");
  const [tool, setTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(1);
  const [color, setColor] = useState("#e05050");
  const [zoom, setZoom] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState(null);
  const [lastPoint, setLastPoint] = useState(null);
  const [cursorPos, setCursorPos] = useState(null);
  const [newHeroName, setNewHeroName] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [dirThumbs, setDirThumbs] = useState({});
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [variantList, setVariantList] = useState(["default"]);
  const [activeVariant, setActiveVariantState] = useState("default");
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [showSaveTemplateConfirm, setShowSaveTemplateConfirm] = useState(false);
  const [showLoadTemplateConfirm, setShowLoadTemplateConfirm] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [availableTemplates, setAvailableTemplates] = useState([]);
  useEffect(() => {
    if (selectedHeroId && selectedDir) {
      setIsPublished(isPublishedHero(selectedHeroId, selectedDir));
    }
  }, [selectedHeroId, selectedDir]);
  const historyRef = useRef(history);
  const historyIndexRef = useRef(historyIndex);
  const selectedHeroIdRef = useRef(selectedHeroId);
  const selectedDirRef = useRef(selectedDir);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);
  useEffect(() => {
    selectedHeroIdRef.current = selectedHeroId;
  }, [selectedHeroId]);
  useEffect(() => {
    selectedDirRef.current = selectedDir;
  }, [selectedDir]);
  const selectedHero = heroes.find((h) => h.id === selectedHeroId) || null;
  const refreshThumbs = useCallback(() => {
    if (!selectedHeroId) return;
    setDirThumbs(getAllHeroSpritesForType(selectedHeroId, activeVariant));
    const variants = getHeroVariants(selectedHeroId, selectedDir);
    setVariantList(variants.length > 0 ? variants : ["default"]);
    setActiveVariantState("default");
  }, [selectedHeroId, activeVariant]);
  useEffect(() => {
    refreshThumbs();
  }, [selectedHeroId, activeVariant, selectedDir]);
  const getTemplateKey = (dir) => `hero_templates_${dir}`;
  const getTemplatesForDir = useCallback((dir) => {
    if (!dir) return [];
    try {
      const data = localStorage.getItem(getTemplateKey(dir));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }, []);
  useEffect(() => {
    if (selectedDir) {
      const templates = getTemplatesForDir(selectedDir);
      setAvailableTemplates(templates);
    }
  }, [selectedDir, getTemplatesForDir]);
  const handleSaveAsTemplate = () => {
    if (!selectedDir || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const templates = getTemplatesForDir(selectedDir);
    if (templates.length >= MAX_TEMPLATES_PER_DIR) {
      alert(`Maximum ${MAX_TEMPLATES_PER_DIR} templates allowed per direction. Delete some first.`);
      return;
    }
    const newTemplate = {
      id: `template_${Date.now()}`,
      name: templateName || `Template ${templates.length + 1}`,
      dataUrl,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    templates.push(newTemplate);
    localStorage.setItem(getTemplateKey(selectedDir), JSON.stringify(templates));
    setAvailableTemplates(templates);
    setTemplateName("");
    setShowSaveTemplateConfirm(false);
  };
  const handleLoadTemplate = (template) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.drawImage(img, 0, 0);
      pushHistory();
    };
    img.src = template.dataUrl;
    setShowLoadTemplateConfirm(false);
  };
  const prevHeroIdRef = useRef(null);
  const prevDirRef = useRef(null);
  const prevVariantRef = useRef(activeVariant);
  useEffect(() => {
    if (prevHeroIdRef.current && prevDirRef.current) {
      autoSaveSprite(prevHeroIdRef.current, prevDirRef.current, canvasRef.current, prevVariantRef.current);
    }
    prevHeroIdRef.current = selectedHeroId;
    prevDirRef.current = selectedDir;
    prevVariantRef.current = activeVariant;
    if (!selectedHeroId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const existing = getHeroSprite(selectedHeroId, selectedDir, activeVariant);
    if (existing) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        setHistory([data]);
        setHistoryIndex(0);
      };
      img.src = existing;
    } else {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      setHistory([data]);
      setHistoryIndex(0);
    }
    setLastPoint(null);
  }, [selectedHeroId, selectedDir]);
  const pushHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndexRef.current + 1);
      return [...trimmed, data].slice(-MAX_HISTORY);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    autoSaveSprite(selectedHeroIdRef.current, selectedDirRef.current, canvas, activeVariant);
    setDirThumbs(getAllHeroSpritesForType(selectedHeroIdRef.current, activeVariant));
  }, [activeVariant]);
  const handleUndo = useCallback(() => {
    setHistoryIndex((prev) => {
      const newIdx = Math.max(0, prev - 1);
      const snap = historyRef.current[newIdx];
      if (snap) {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.putImageData(snap, 0, 0);
          autoSaveSprite(selectedHeroIdRef.current, selectedDirRef.current, canvasRef.current);
          setDirThumbs(getAllHeroSpritesForType(selectedHeroIdRef.current));
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
          autoSaveSprite(selectedHeroIdRef.current, selectedDirRef.current, canvasRef.current);
          setDirThumbs(getAllHeroSpritesForType(selectedHeroIdRef.current));
        }
      }
      return newIdx;
    });
  }, []);
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
  const drawRect = (ctx, x0, y0, x1, y1, rgba) => {
    const minX = Math.min(x0, x1), maxX = Math.max(x0, x1), minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
    for (let x = minX; x <= maxX; x++) {
      drawPixel(ctx, x, minY, rgba);
      drawPixel(ctx, x, maxY, rgba);
    }
    for (let y = minY + 1; y < maxY; y++) {
      drawPixel(ctx, minX, y, rgba);
      drawPixel(ctx, maxX, y, rgba);
    }
  };
  const drawCircle = (ctx, centerX, centerY, radius, rgba, fill = false) => {
    if (fill) {
      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          if (x * x + y * y <= radius * radius) {
            drawPixel(ctx, centerX + x, centerY + y, rgba);
          }
        }
      }
    } else {
      let x = radius, y = 0;
      let err = 0;
      while (x >= y) {
        drawPixel(ctx, centerX + x, centerY + y, rgba);
        drawPixel(ctx, centerX + y, centerY + x, rgba);
        drawPixel(ctx, centerX - y, centerY + x, rgba);
        drawPixel(ctx, centerX - x, centerY + y, rgba);
        drawPixel(ctx, centerX - x, centerY - y, rgba);
        drawPixel(ctx, centerX - y, centerY - x, rgba);
        drawPixel(ctx, centerX + y, centerY - x, rgba);
        drawPixel(ctx, centerX + x, centerY - y, rgba);
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
    if (e.button !== 0 || !selectedHero) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setDrawing(true);
    setDrawStart({ x, y });
    if (tool === "eyedropper") {
      const px = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbaToHex(px[0], px[1], px[2], px[3]);
      if (hex !== "transparent") setColor(hex);
      setDrawing(false);
      return;
    }
    if (tool === "bucket") {
      floodFill(ctx, x, y, hexToRgba(color));
      pushHistory();
      setDrawing(false);
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
  const handleCanvasMouseMove = (e) => {
    const { x, y } = getPixelCoords(e);
    setCursorPos({ x, y });
    handleMouseMove(e);
  };
  const handleMouseUp = (e) => {
    if (!drawing) return;
    const { x, y } = getPixelCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rgba = hexToRgba(color);
    if (tool === "line" && drawStart) {
      drawLine(ctx, drawStart.x, drawStart.y, x, y, rgba);
      setLastPoint({ x, y });
    } else if (tool === "rect" && drawStart) {
      drawRect(ctx, drawStart.x, drawStart.y, x, y, rgba);
    } else if (tool === "circle" && drawStart) {
      const radius = Math.max(1, Math.sqrt(Math.pow(x - drawStart.x, 2) + Math.pow(y - drawStart.y, 2)));
      drawCircle(ctx, drawStart.x, drawStart.y, Math.floor(radius), rgba, e.shiftKey);
    } else if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      setLastPoint({ x, y });
    }
    pushHistory();
    setDrawing(false);
    setDrawStart(null);
  };
  const handleFlipHorizontal = () => {
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
  const handleCopyFromDir = (fromDir) => {
    if (!selectedHero || fromDir === selectedDir) return;
    const existing = getHeroSprite(selectedHeroId, fromDir);
    if (!existing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.drawImage(img, 0, 0);
      pushHistory();
    };
    img.src = existing;
  };
  const handleCreateHero = () => {
    if (!newHeroName.trim()) return;
    const hero = createNewHero(newHeroName.trim());
    saveCustomHero(hero);
    const updated = getAllCustomHeroes();
    setHeroes(updated);
    setSelectedHeroId(hero.id);
    setNewHeroName("");
    setShowNewForm(false);
  };
  const handleDeleteHero = (id2) => {
    if (!confirm("Delete this hero template?")) return;
    deleteCustomHero(id2);
    const updated = getAllCustomHeroes();
    setHeroes(updated);
    if (selectedHeroId === id2) setSelectedHeroId(updated[0]?.id || null);
  };
  const displaySize = CANVAS_SIZE;
  const handleCanvasWheel = (e) => {
    e.preventDefault();
    setZoom((prev) => {
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      return Math.max(0.3, Math.min(prev * factor, 16));
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:552:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/85", children: [
    showPublishConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:554:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:555:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[340px]", style: { background: "#0d1117", border: "2px solid #f59e0b" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:556:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-yellow-400 mb-2", children: "SEND TO GAME?" }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 575,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:557:12", "data-dynamic-content": "true", className: "font-ui text-sm text-white mb-1", "data-collection-item-field": "name", "data-collection-item-id": selectedHero?.id || selectedHero?._id, children: [
        selectedHero?.name,
        " — ",
        selectedDir,
        " (",
        DIRECTION_LABELS[selectedDir],
        ")"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 576,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:558:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400 mb-4", children: "This hero sprite will render in-game on the Hero Base tile when stationed. The hero always renders above the building. Persists after reload." }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 577,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:561:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:562:14",
            "data-dynamic-content": "true",
            onClick: () => setShowPublishConfirm(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #334155" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 581,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:566:14", "data-dynamic-content": "true", onClick: () => {
          const canvas = canvasRef.current;
          if (canvas && selectedHeroId && selectedDir) {
            const dataUrl = canvas.toDataURL("image/png");
            publishHeroSprite(selectedHeroId, selectedDir, dataUrl, activeVariant);
            invalidatePublishedHeroCache(selectedHeroId, selectedDir, activeVariant);
            setIsPublished(true);
          }
          setShowPublishConfirm(false);
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-black", style: { background: "#f59e0b", border: "1px solid #fbbf24" }, "data-collection-item-field": "activeVariant", "data-collection-item-id": id, children: [
          "✓ SEND TO GAME (",
          activeVariant,
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 585,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 580,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 574,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 573,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:582:6", "data-dynamic-content": "true", className: "relative flex flex-col rounded-xl overflow-hidden shadow-2xl", style: { background: "#1a1a2e", border: "2px solid #b45309", width: "100vw", height: "100vh" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:584:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#2d2d1e", background: "#13130a" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:585:10", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-yellow-400", children: "🦸 HERO CREATOR — DEV MODE" }, void 0, false, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 604,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:586:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:587:12", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "Auto-saves every stroke" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 606,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:588:12", "data-dynamic-content": "true", onClick: handleUndo, title: "Undo (Cmd+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCcw, { "data-source-location": "components/game/HeroCreator:588:136", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 607,
            columnNumber: 223
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 607,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:589:12", "data-dynamic-content": "true", onClick: handleRedo, title: "Redo (Cmd+Shift+Z)", className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(RotateCw, { "data-source-location": "components/game/HeroCreator:589:142", "data-dynamic-content": "false", size: 14 }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 608,
            columnNumber: 229
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 608,
            columnNumber: 13
          }, this),
          selectedHero && /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:591:14", "data-dynamic-content": "true", onClick: () => setShowPublishConfirm(true), className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: isPublished ? "#14532d" : "#1e3a5f", border: `1px solid ${isPublished ? "#4ade80" : "#f59e0b"}`, color: isPublished ? "#4ade80" : "#fbbf24" }, children: [
            /* @__PURE__ */ jsxDEV(Send, { "data-source-location": "components/game/HeroCreator:592:16", "data-dynamic-content": "false", size: 11 }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 611,
              columnNumber: 17
            }, this),
            isPublished ? "LIVE" : "SEND TO GAME"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 610,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:595:12", "data-dynamic-content": "true", onClick: () => setShowVariantModal(true), className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#2d2d1e", border: "1px solid #b45309", color: "#fbbf24" }, "data-collection-item-field": "activeVariant", "data-collection-item-id": id, children: [
            "📋 ",
            activeVariant,
            " ",
            /* @__PURE__ */ jsxDEV(ChevronDown, { "data-source-location": "components/game/HeroCreator:596:33", "data-dynamic-content": "false", size: 10 }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 615,
              columnNumber: 34
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 614,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:598:12", "data-dynamic-content": "true", onClick: () => {
            if (selectedHeroId && selectedDir) {
              setTemplateName("");
              setShowSaveTemplateConfirm(true);
            }
          }, className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#0f766e", border: "1px solid #14b8a6", color: "#fff" }, children: "💾 SAVE AS TEMPLATE" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 617,
            columnNumber: 13
          }, this),
          availableTemplates.length > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:607:14", "data-dynamic-content": "true", className: "relative", children: /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:608:16", "data-dynamic-content": "true", onClick: () => setShowLoadTemplateConfirm(true), className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[8px]", style: { background: "#059669", border: "1px solid #10b981", color: "#fff" }, children: "📂 LOAD TEMPLATE" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 627,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 626,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:613:12", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/HeroCreator:613:112", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 632,
            columnNumber: 199
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 632,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 605,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 603,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:617:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:619:10", "data-dynamic-content": "true", className: "flex flex-col border-r overflow-y-auto", style: { borderColor: "#2d2d1e", background: "#13130a", width: 160 }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:620:12", "data-dynamic-content": "true", className: "px-2 pt-2 pb-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:621:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600", children: "HEROES" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 640,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:622:14", "data-dynamic-content": "true", onClick: () => setShowNewForm((v) => !v), className: "p-0.5 rounded hover:bg-yellow-900/30 text-yellow-500", children: /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/HeroCreator:622:127", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 641,
              columnNumber: 216
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 641,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 639,
            columnNumber: 13
          }, this),
          showNewForm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:625:14", "data-dynamic-content": "true", className: "px-2 pb-2 flex gap-1", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/HeroCreator:626:16",
                "data-dynamic-content": "true",
                autoFocus: true,
                value: newHeroName,
                onChange: (e) => setNewHeroName(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleCreateHero();
                  if (e.key === "Escape") setShowNewForm(false);
                },
                placeholder: "Hero name...",
                className: "flex-1 px-1 py-0.5 rounded text-[10px] font-ui outline-none",
                style: { background: "#2d2d1e", border: "1px solid #b45309", color: "#fbbf24" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 645,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:630:16", "data-dynamic-content": "true", onClick: handleCreateHero, className: "px-1.5 py-0.5 rounded text-[9px] font-pixel text-white", style: { background: "#b45309" }, children: "+" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 649,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 644,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:633:12", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto", children: [
            heroes.length === 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:634:38", "data-dynamic-content": "false", className: "px-2 py-3 font-ui text-[10px] text-slate-500 text-center", children: [
              "No heroes yet.",
              /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/HeroCreator:634:126", "data-dynamic-content": "false" }, void 0, false, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 653,
                columnNumber: 214
              }, this),
              "Click + to create."
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 653,
              columnNumber: 39
            }, this),
            heroes.map(
              (h) => /* @__PURE__ */ jsxDEV(
                "div",
                {
                  "data-source-location": "components/game/HeroCreator:636:16",
                  "data-dynamic-content": "true",
                  className: "group flex items-center gap-1 px-2 py-1.5 cursor-pointer transition-all",
                  style: { background: selectedHeroId === h.id ? "#2d2a10" : "transparent" },
                  onClick: () => setSelectedHeroId(h.id),
                  "data-collection-item-id": h?.id,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:639:18", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:640:20", "data-dynamic-content": "true", className: "font-ui text-xs truncate", style: { color: selectedHeroId === h.id ? "#fbbf24" : "#aaa" }, "data-collection-item-field": "name", "data-collection-item-id": h?.id, children: h.name }, void 0, false, {
                        fileName: "/app/src/components/game/HeroCreator.jsx",
                        lineNumber: 659,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:641:20", "data-dynamic-content": "true", className: "font-ui text-[9px] text-slate-600", "data-collection-item-field": "rarity", "data-collection-item-id": h?.id, children: h.rarity }, void 0, false, {
                        fileName: "/app/src/components/game/HeroCreator.jsx",
                        lineNumber: 660,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/HeroCreator.jsx",
                      lineNumber: 658,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        "data-source-location": "components/game/HeroCreator:643:18",
                        "data-dynamic-content": "true",
                        onClick: (e) => {
                          e.stopPropagation();
                          handleDeleteHero(h.id);
                        },
                        className: "opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-900/40 text-red-500",
                        title: "Delete",
                        children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "components/game/HeroCreator:645:20", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                          fileName: "/app/src/components/game/HeroCreator.jsx",
                          lineNumber: 664,
                          columnNumber: 21
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/components/game/HeroCreator.jsx",
                        lineNumber: 662,
                        columnNumber: 19
                      },
                      this
                    )
                  ]
                },
                h.id,
                true,
                {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 655,
                  columnNumber: 15
                },
                this
              )
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 652,
            columnNumber: 13
          }, this),
          selectedHero && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:653:14", "data-dynamic-content": "true", className: "border-t p-2", style: { borderColor: "#2d2d1e" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:654:16", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600 mb-1", children: "DIRECTIONS" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 673,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:655:16", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-0.5", children: ["NW", "N", "NE", "W", null, "E", "SW", "S", "SE"].map((dir, i) => {
              if (!dir) return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:657:37", "data-dynamic-content": "true", "data-arr-index": i }, i, false, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 676,
                columnNumber: 36
              }, this);
              const thumb = dirThumbs[dir];
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/HeroCreator:660:22",
                  "data-dynamic-content": "true",
                  onClick: () => setSelectedDir(dir),
                  title: DIRECTION_LABELS[dir],
                  className: "rounded transition-all flex items-center justify-center",
                  style: {
                    width: 34,
                    height: 34,
                    background: selectedDir === dir ? "#b45309" : thumb ? "#2d2a10" : "#1a1a0d",
                    border: `1px solid ${selectedDir === dir ? "#f59e0b" : thumb ? "#b45309" : "#333"}`
                  },
                  "data-arr-index": i,
                  children: thumb ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/HeroCreator:667:28", "data-dynamic-content": "true", src: thumb, alt: dir, style: { width: 28, height: 28, imageRendering: "pixelated" }, "data-arr-index": i }, void 0, false, {
                    fileName: "/app/src/components/game/HeroCreator.jsx",
                    lineNumber: 686,
                    columnNumber: 23
                  }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:668:28", "data-dynamic-content": "true", className: "font-pixel text-[6px]", style: { color: selectedDir === dir ? "#fff" : "#555" }, "data-arr-index": i, children: dir }, void 0, false, {
                    fileName: "/app/src/components/game/HeroCreator.jsx",
                    lineNumber: 687,
                    columnNumber: 23
                  }, this)
                },
                dir,
                false,
                {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 679,
                  columnNumber: 21
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 674,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 672,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 638,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:678:10", "data-dynamic-content": "true", className: "flex flex-col gap-3 p-2 border-r overflow-y-auto", style: { borderColor: "#2d2d1e", background: "#13130a", minWidth: "78px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:679:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:680:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600 mb-1", children: "TOOLS" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 699,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:681:14", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-1", children: TOOLS.map(
              (t, __arrIdx__) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/HeroCreator:683:18",
                  "data-dynamic-content": "true",
                  onClick: () => setTool(t.id),
                  title: t.title,
                  className: "w-8 h-8 rounded text-lg flex items-center justify-center",
                  style: { background: tool === t.id ? "#b45309" : "#2d2d1e", border: `1px solid ${tool === t.id ? "#f59e0b" : "#3d3d2e"}` },
                  "data-collection-item-id": t?.id,
                  "data-arr-index": __arrIdx__,
                  "data-arr-variable-name": "TOOLS",
                  "data-arr-field": "label",
                  children: t.label
                },
                t.id,
                false,
                {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 702,
                  columnNumber: 17
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 700,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 698,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:691:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:692:14", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-yellow-600 mb-1", "data-collection-item-field": "brushSize", "data-collection-item-id": id, children: [
              "SIZE: ",
              brushSize,
              "px"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 711,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/HeroCreator:693:14",
                "data-dynamic-content": "true",
                type: "range",
                min: "1",
                max: "200",
                value: brushSize,
                onChange: (e) => setBrushSize(parseInt(e.target.value)),
                className: "w-full h-6",
                style: { background: "#2d2d1e", accentColor: "#b45309" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 712,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 710,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:703:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:704:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600 mb-1", children: "ZOOM" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 723,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:705:14", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-400 text-center", children: [
              (zoom * 100).toFixed(0),
              "%"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 724,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:706:14", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-600 text-center mt-0.5", children: "scroll to zoom" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 725,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 722,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/HeroCreator:708:12",
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
              children: "CLEAR"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 727,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 697,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:715:10", "data-dynamic-content": "true", className: "flex flex-col items-center justify-start p-3 gap-2 overflow-auto flex-1", style: { background: "#0d0d1a" }, children: selectedHero ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:718:16", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:719:18", "data-dynamic-content": "true", className: "font-ui text-sm text-white font-semibold", "data-collection-item-field": "name", "data-collection-item-id": selectedHero?.id || selectedHero?._id, children: selectedHero.name }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 738,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:720:18", "data-dynamic-content": "true", className: "font-pixel text-[8px] px-2 py-0.5 rounded", style: { background: "#2d2a10", color: "#f59e0b" }, "data-collection-item-field": "selectedDir", "data-collection-item-id": id, children: [
              selectedDir,
              " — ",
              DIRECTION_LABELS[selectedDir]
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 739,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 737,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:722:16", "data-dynamic-content": "true", className: "flex items-center gap-1 flex-wrap justify-center mb-1", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:723:18", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "Copy from:" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 742,
              columnNumber: 19
            }, this),
            DIRECTIONS.filter((d) => d !== selectedDir).map(
              (d) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/HeroCreator:725:20",
                  "data-dynamic-content": "true",
                  onClick: () => handleCopyFromDir(d),
                  disabled: !dirThumbs[d],
                  className: "px-1.5 py-0.5 rounded font-ui text-[9px] transition-all",
                  style: {
                    background: dirThumbs[d] ? "#2d2a10" : "#111",
                    border: `1px solid ${dirThumbs[d] ? "#b45309" : "#222"}`,
                    color: dirThumbs[d] ? "#fbbf24" : "#444",
                    cursor: dirThumbs[d] ? "pointer" : "not-allowed"
                  },
                  "data-collection-item-field": "d",
                  children: d
                },
                d,
                false,
                {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 744,
                  columnNumber: 17
                },
                this
              )
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/HeroCreator:732:18",
                "data-dynamic-content": "true",
                onClick: handleFlipHorizontal,
                className: "flex items-center gap-1 px-2 py-0.5 rounded font-ui text-[9px] text-blue-300",
                style: { background: "#0d1a2e", border: "1px solid #1e40af" },
                children: [
                  /* @__PURE__ */ jsxDEV(FlipHorizontal, { "data-source-location": "components/game/HeroCreator:734:20", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                    fileName: "/app/src/components/game/HeroCreator.jsx",
                    lineNumber: 753,
                    columnNumber: 21
                  }, this),
                  " Flip H"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 751,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:736:18", "data-dynamic-content": "true", onClick: () => {
              const key = `hero_sprites_${selectedHero}_${selectedDir}`;
              const data = localStorage.getItem(key);
              if (data) {
                localStorage.setItem(`hero_clipboard_${selectedHero}`, data);
              }
            }, className: "px-2 py-0.5 rounded font-ui text-[9px]", style: { background: "#0084ff", border: "1px solid #0055cc", color: "#fff" }, children: "📋 COPY" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 755,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:737:18", "data-dynamic-content": "true", onClick: () => {
              const data = localStorage.getItem(`hero_clipboard_${selectedHero}`);
              if (data) {
                const key = `hero_sprites_${selectedHeroId}_${selectedDir}`;
                localStorage.setItem(key, data);
                autoSaveSprite(selectedHeroId, selectedDir, canvasRef.current);
                setIsPublished(isPublishedHero(selectedHeroId, selectedDir));
              }
            }, className: "px-2 py-0.5 rounded font-ui text-[9px]", style: { background: "#00b379", border: "1px solid #00844a", color: "#fff" }, children: "📥 PASTE" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 756,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 741,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:740:16", "data-dynamic-content": "true", style: { position: "relative", width: displaySize, height: displaySize, transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.05s ease-out" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:741:18", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23555'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23555'/%3E%3Crect x='8' width='8' height='8' fill='%23333'/%3E%3Crect y='8' width='8' height='8' fill='%23333'/%3E%3C/svg%3E")`,
              backgroundSize: `16px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 760,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "canvas",
              {
                "data-source-location": "components/game/HeroCreator:744:18",
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
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 763,
                columnNumber: 19
              },
              this
            ),
            zoom >= 2 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:751:20", "data-dynamic-content": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
              backgroundSize: `1px 1px`
            } }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 770,
              columnNumber: 17
            }, this),
            cursorPos && (tool === "pencil" || tool === "brush" || tool === "eraser" || tool === "circle") && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:757:20", "data-dynamic-content": "true", style: {
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
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 776,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 759,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:771:16", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-600 mt-1", children: [
            "Cmd+Z: Undo · Cmd+Shift+Z: Redo · Shift+Click: Straight line",
            lastPoint && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:773:32", "data-dynamic-content": "false", className: "text-yellow-600", children: " · ● anchor set" }, void 0, false, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 792,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 790,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 736,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:777:14", "data-dynamic-content": "false", className: "flex flex-col items-center justify-center h-64 text-slate-500 font-ui text-sm", children: "Create or select a hero to start drawing." }, void 0, false, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 796,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 734,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:784:10", "data-dynamic-content": "true", className: "flex flex-col gap-2 p-2 border-l overflow-y-auto", style: { borderColor: "#2d2d1e", background: "#13130a", minWidth: "200px" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:785:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600 mb-1", children: "COLOR" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 804,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(SpectrumColorPicker, { "data-source-location": "components/game/HeroCreator:786:12", "data-dynamic-content": "true", color: color === "transparent" ? "#000000" : color, onChange: (c) => setColor(c) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 805,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:787:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-600 mt-1 mb-1", children: "PALETTE" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 806,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:788:12", "data-dynamic-content": "true", className: "grid gap-0.5", style: { gridTemplateColumns: "repeat(8,1fr)" }, children: PALETTE.map(
            (c, i) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/HeroCreator:790:16",
                "data-dynamic-content": "true",
                onClick: () => setColor(c),
                title: c,
                className: "rounded-sm transition-all",
                style: {
                  width: 18,
                  height: 18,
                  background: c === "transparent" ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23aaa'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23aaa'/%3E%3Crect x='4' width='4' height='4' fill='%23fff'/%3E%3Crect y='4' width='4' height='4' fill='%23fff'/%3E%3C/svg%3E")` : c,
                  border: color === c ? "2px solid #f59e0b" : "1px solid rgba(255,255,255,0.1)",
                  outline: color === c ? "1px solid #b45309" : "none"
                },
                "data-arr-index": i,
                "data-arr-variable-name": "PALETTE"
              },
              i,
              false,
              {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 809,
                columnNumber: 15
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 807,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 803,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 636,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 601,
      columnNumber: 7
    }, this),
    showSaveTemplateConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:805:8", "data-dynamic-content": "true", className: "absolute inset-0 z-30 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:806:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[400px]", style: { background: "#1a1a2e", border: "2px solid #14b8a6" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:807:12", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-teal-400 mb-3", children: "💾 SAVE AS TEMPLATE" }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 826,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:808:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400 mb-2", "data-collection-item-field": "selectedDir", "data-collection-item-id": id, children: [
        "Save current ",
        selectedDir,
        " direction sprite as a reusable template?"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 827,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:811:12", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 mb-3", "data-collection-item-field": "MAX_TEMPLATES_PER_DIR", "data-collection-item-id": id, children: [
        "Templates are direction-specific and can be loaded for any new hero facing this direction. Max ",
        MAX_TEMPLATES_PER_DIR,
        " templates per direction."
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 830,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          "data-source-location": "components/game/HeroCreator:815:12",
          "data-dynamic-content": "true",
          autoFocus: true,
          value: templateName,
          onChange: (e) => setTemplateName(e.target.value.slice(0, 50)),
          onKeyDown: (e) => {
            if (e.key === "Enter") handleSaveAsTemplate();
            if (e.key === "Escape") setShowSaveTemplateConfirm(false);
          },
          placeholder: "Template name (optional)",
          className: "w-full px-3 py-2 rounded font-ui text-sm outline-none mb-3",
          style: { background: "#0d0d1a", border: "1px solid #333", color: "#fff" }
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 834,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:824:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:825:14",
            "data-dynamic-content": "true",
            onClick: () => setShowSaveTemplateConfirm(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 844,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:829:14",
            "data-dynamic-content": "true",
            onClick: handleSaveAsTemplate,
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-white",
            style: { background: "#059669", border: "1px solid #10b981" },
            children: "SAVE TEMPLATE"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 848,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 843,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 825,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 824,
      columnNumber: 7
    }, this),
    showLoadTemplateConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:840:8", "data-dynamic-content": "true", className: "absolute inset-0 z-30 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:841:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[450px]", style: { background: "#1a1a2e", border: "2px solid #059669" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:842:12", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-green-400 mb-3", "data-collection-item-field": "selectedDir", "data-collection-item-id": id, children: [
        "📂 LOAD TEMPLATE — ",
        selectedDir
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 861,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:843:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400 mb-3", children: "Select a template to load. This will replace the current canvas." }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 862,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:847:12", "data-dynamic-content": "true", className: "grid gap-2 mb-4 max-h-[400px] overflow-y-auto", style: { gridTemplateColumns: "repeat(2, 1fr)" }, children: availableTemplates.map(
        (template) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:849:16",
            "data-dynamic-content": "true",
            onClick: () => handleLoadTemplate(template),
            className: "rounded p-2 flex items-center gap-3 transition-all text-left",
            style: {
              background: "#2d2d1e",
              border: "1px solid #3d3d2e"
            },
            "data-collection-item-id": template?.id,
            "data-collection-item-field": "dataUrl",
            children: [
              /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/HeroCreator:858:18", "data-dynamic-content": "true", src: template.dataUrl, alt: "", style: { width: 48, height: 48, imageRendering: "pixelated", border: "1px solid #444" } }, void 0, false, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 877,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:859:18", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:860:20", "data-dynamic-content": "true", className: "font-ui text-xs text-white truncate", "data-collection-item-field": "name", "data-collection-item-id": template?.id, children: template.name }, void 0, false, {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 879,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:861:20", "data-dynamic-content": "true", className: "font-ui text-[9px] text-slate-500", children: new Date(template.createdAt).toLocaleDateString() }, void 0, false, {
                  fileName: "/app/src/components/game/HeroCreator.jsx",
                  lineNumber: 880,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 878,
                columnNumber: 19
              }, this)
            ]
          },
          template.id,
          true,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 868,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 866,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:869:12", "data-dynamic-content": "true", className: "flex gap-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/HeroCreator:870:14",
          "data-dynamic-content": "true",
          onClick: () => setShowLoadTemplateConfirm(false),
          className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
          style: { border: "1px solid #444" },
          children: "CLOSE"
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 889,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 888,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 860,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 859,
      columnNumber: 7
    }, this),
    showVariantModal && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:881:8", "data-dynamic-content": "true", className: "absolute inset-0 z-20 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:882:10", "data-dynamic-content": "true", className: "rounded-xl p-5 w-[400px]", style: { background: "#1a1a2e", border: "2px solid #b45309" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:883:12", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-yellow-400 mb-3", "data-collection-item-field": "name", "data-collection-item-id": selectedHero?.id || selectedHero?._id, children: [
        "VARIANTS — ",
        selectedHero?.name,
        " ",
        selectedDir
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 902,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:885:12", "data-dynamic-content": "true", className: "flex gap-2 mb-3", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroCreator:886:14", "data-dynamic-content": "true", onClick: () => {
          const newVar = createNewHeroVariant(selectedHeroId, selectedDir);
          const variants = getHeroVariants(selectedHeroId, selectedDir);
          setVariantList(variants.length > 0 ? variants : ["default"]);
          setActiveVariantState(newVar);
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            pushHistory();
          }
        }, className: "flex-1 py-2 rounded font-pixel text-[8px] text-white", style: { background: "#059669", border: "1px solid #10b981" }, children: [
          /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/HeroCreator:894:16", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 913,
            columnNumber: 17
          }, this),
          "NEW VARIANT"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroCreator.jsx",
          lineNumber: 905,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:896:14",
            "data-dynamic-content": "true",
            onClick: () => setShowVariantModal(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-700",
            style: { border: "1px solid #444" },
            children: "CLOSE"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 915,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 904,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:902:12", "data-dynamic-content": "true", className: "grid gap-2 mb-4", style: { gridTemplateColumns: "repeat(2, 1fr)" }, children: variantList.map(
        (varId) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HeroCreator:904:16",
            "data-dynamic-content": "true",
            onClick: () => {
              setActiveVariantState(varId);
              const existing = getHeroSprite(selectedHeroId, selectedDir, varId);
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
              setDirThumbs(getAllHeroSpritesForType(selectedHeroId, varId));
              setShowVariantModal(false);
            },
            className: "rounded px-3 py-2 font-ui text-xs transition-all text-left",
            style: {
              background: activeVariant === varId ? "#b45309" : "#2d2d1e",
              border: `1px solid ${activeVariant === varId ? "#f59e0b" : "#3d3d2e"}`,
              color: activeVariant === varId ? "#fff" : "#aaa"
            },
            children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroCreator:932:18", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:933:20", "data-dynamic-content": "true", "data-collection-item-field": "varId", children: varId }, void 0, false, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 952,
                columnNumber: 21
              }, this),
              activeVariant === varId && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroCreator:934:48", "data-dynamic-content": "false", className: "text-green-400 text-[10px]", children: "✓ ACTIVE" }, void 0, false, {
                fileName: "/app/src/components/game/HeroCreator.jsx",
                lineNumber: 953,
                columnNumber: 49
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroCreator.jsx",
              lineNumber: 951,
              columnNumber: 19
            }, this)
          },
          varId,
          false,
          {
            fileName: "/app/src/components/game/HeroCreator.jsx",
            lineNumber: 923,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/game/HeroCreator.jsx",
        lineNumber: 921,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 901,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/HeroCreator.jsx",
      lineNumber: 900,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/HeroCreator.jsx",
    lineNumber: 571,
    columnNumber: 5
  }, this);
}
_s(HeroCreator, "GWQ8spG418QhNbQLse3iH2I6cQo=");
_c = HeroCreator;
var _c;
$RefreshReg$(_c, "HeroCreator");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/HeroCreator.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/HeroCreator.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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Tyw4QkFBMkIsU0FBU0EsbUJBQWhJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNJO0FBQUEsY0FDckl2TSxrQkFBa0J1TSxTQUFTLHVCQUFDLFVBQUssd0JBQXFCLHNDQUFxQyx3QkFBcUIsU0FBUSxXQUFVLDhCQUE2Qix3QkFBcEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNEk7QUFBQSxpQkFGMUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBO0FBQUEsVUE5QkRBO0FBQUFBLFVBREw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQWdDSTtBQUFBLE1BQ0osS0FuQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9DQTtBQUFBLFNBeERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5REEsS0ExREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTJERTtBQUFBLE9BcFlKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzWUE7QUFFSjtBQUFDL08sR0E5MkJ1QkYsYUFBVztBQUFBLEtBQVhBO0FBQVcsSUFBQWtQO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIlgiLCJSb3RhdGVDY3ciLCJSb3RhdGVDdyIsIkZsaXBIb3Jpem9udGFsIiwiVHJhc2gyIiwiUGx1cyIsIlNlbmQiLCJDaGV2cm9uRG93biIsIkRJUkVDVElPTlMiLCJESVJFQ1RJT05fTEFCRUxTIiwiZ2V0SGVyb1Nwcml0ZSIsInNhdmVIZXJvU3ByaXRlIiwiaW52YWxpZGF0ZUhlcm9TcHJpdGVDYWNoZSIsImdldEFsbEhlcm9TcHJpdGVzRm9yVHlwZSIsImdldEhlcm9WYXJpYW50cyIsImNyZWF0ZU5ld0hlcm9WYXJpYW50IiwiZ2V0QWxsQ3VzdG9tSGVyb2VzIiwic2F2ZUN1c3RvbUhlcm8iLCJjcmVhdGVOZXdIZXJvIiwiZGVsZXRlQ3VzdG9tSGVybyIsInB1Ymxpc2hIZXJvU3ByaXRlIiwiaXNQdWJsaXNoZWRIZXJvIiwiaW52YWxpZGF0ZVB1Ymxpc2hlZEhlcm9DYWNoZSIsIlNwZWN0cnVtQ29sb3JQaWNrZXIiLCJDQU5WQVNfU0laRSIsIk1BWF9ISVNUT1JZIiwiUEFMRVRURSIsIlRPT0xTIiwiaWQiLCJsYWJlbCIsInRpdGxlIiwiVE9PTF9IT1RLRVlTIiwicCIsImIiLCJlIiwiZiIsImkiLCJsIiwiciIsImMiLCJNQVhfVEVNUExBVEVTX1BFUl9ESVIiLCJCUlVTSF9TSVpFUyIsImhleFRvUmdiYSIsImhleCIsInBhcnNlSW50Iiwic2xpY2UiLCJyZ2JhVG9IZXgiLCJnIiwiYSIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJhdXRvU2F2ZVNwcml0ZSIsImhlcm9JZCIsImRpciIsImNhbnZhcyIsInZhcmlhbnRJZCIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJIZXJvQ3JlYXRvciIsIm9uQ2xvc2UiLCJfcyIsImNhbnZhc1JlZiIsImhlcm9lcyIsInNldEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkIiwic2V0U2VsZWN0ZWRIZXJvSWQiLCJzZWxlY3RlZERpciIsInNldFNlbGVjdGVkRGlyIiwidG9vbCIsInNldFRvb2wiLCJicnVzaFNpemUiLCJzZXRCcnVzaFNpemUiLCJjb2xvciIsInNldENvbG9yIiwiem9vbSIsInNldFpvb20iLCJoaXN0b3J5Iiwic2V0SGlzdG9yeSIsImhpc3RvcnlJbmRleCIsInNldEhpc3RvcnlJbmRleCIsImRyYXdpbmciLCJzZXREcmF3aW5nIiwiZHJhd1N0YXJ0Iiwic2V0RHJhd1N0YXJ0IiwibGFzdFBvaW50Iiwic2V0TGFzdFBvaW50IiwiY3Vyc29yUG9zIiwic2V0Q3Vyc29yUG9zIiwibmV3SGVyb05hbWUiLCJzZXROZXdIZXJvTmFtZSIsInNob3dOZXdGb3JtIiwic2V0U2hvd05ld0Zvcm0iLCJkaXJUaHVtYnMiLCJzZXREaXJUaHVtYnMiLCJzaG93UHVibGlzaENvbmZpcm0iLCJzZXRTaG93UHVibGlzaENvbmZpcm0iLCJpc1B1Ymxpc2hlZCIsInNldElzUHVibGlzaGVkIiwidmFyaWFudExpc3QiLCJzZXRWYXJpYW50TGlzdCIsImFjdGl2ZVZhcmlhbnQiLCJzZXRBY3RpdmVWYXJpYW50U3RhdGUiLCJzaG93VmFyaWFudE1vZGFsIiwic2V0U2hvd1ZhcmlhbnRNb2RhbCIsInNob3dTYXZlVGVtcGxhdGVDb25maXJtIiwic2V0U2hvd1NhdmVUZW1wbGF0ZUNvbmZpcm0iLCJzaG93TG9hZFRlbXBsYXRlQ29uZmlybSIsInNldFNob3dMb2FkVGVtcGxhdGVDb25maXJtIiwidGVtcGxhdGVOYW1lIiwic2V0VGVtcGxhdGVOYW1lIiwiYXZhaWxhYmxlVGVtcGxhdGVzIiwic2V0QXZhaWxhYmxlVGVtcGxhdGVzIiwiaGlzdG9yeVJlZiIsImhpc3RvcnlJbmRleFJlZiIsInNlbGVjdGVkSGVyb0lkUmVmIiwic2VsZWN0ZWREaXJSZWYiLCJjdXJyZW50Iiwic2VsZWN0ZWRIZXJvIiwiZmluZCIsImgiLCJyZWZyZXNoVGh1bWJzIiwidmFyaWFudHMiLCJsZW5ndGgiLCJnZXRUZW1wbGF0ZUtleSIsImdldFRlbXBsYXRlc0ZvckRpciIsImRhdGEiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwidGVtcGxhdGVzIiwiaGFuZGxlU2F2ZUFzVGVtcGxhdGUiLCJhbGVydCIsIm5ld1RlbXBsYXRlIiwiRGF0ZSIsIm5vdyIsIm5hbWUiLCJjcmVhdGVkQXQiLCJ0b0lTT1N0cmluZyIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiaGFuZGxlTG9hZFRlbXBsYXRlIiwidGVtcGxhdGUiLCJjdHgiLCJnZXRDb250ZXh0IiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJjbGVhclJlY3QiLCJkcmF3SW1hZ2UiLCJwdXNoSGlzdG9yeSIsInNyYyIsInByZXZIZXJvSWRSZWYiLCJwcmV2RGlyUmVmIiwicHJldlZhcmlhbnRSZWYiLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJleGlzdGluZyIsImdldEltYWdlRGF0YSIsInByZXYiLCJ0cmltbWVkIiwiTWF0aCIsIm1pbiIsImhhbmRsZVVuZG8iLCJuZXdJZHgiLCJtYXgiLCJzbmFwIiwicHV0SW1hZ2VEYXRhIiwiaGFuZGxlUmVkbyIsImhhbmRsZUtleSIsIm1ldGFPckN0cmwiLCJtZXRhS2V5IiwiY3RybEtleSIsInRhcmdldCIsIm1hdGNoZXMiLCJrZXkiLCJ0b0xvd2VyQ2FzZSIsInByZXZlbnREZWZhdWx0Iiwic2hpZnRLZXkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImdldFBpeGVsQ29vcmRzIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJmbG9vciIsImNsaWVudFgiLCJsZWZ0Iiwid2lkdGgiLCJ5IiwiY2xpZW50WSIsInRvcCIsImhlaWdodCIsImRyYXdQaXhlbCIsInB4IiwicHkiLCJyZ2JhIiwiaW1hZ2VEYXRhIiwiaGFsZiIsImR5IiwiZHgiLCJueCIsIm55IiwiaWR4IiwiZHJhd1Ntb290aExpbmUiLCJ4MCIsInkwIiwieDEiLCJ5MSIsImFicyIsInN4Iiwic3kiLCJlcnIiLCJlMiIsImZsb29kRmlsbCIsImZpbGxDb2xvciIsInRSIiwidEciLCJ0QiIsInRBIiwiZlIiLCJmRyIsImZCIiwiZkEiLCJzdGFjayIsInZpc2l0ZWQiLCJVaW50OEFycmF5IiwicG9wIiwicGkiLCJkcmF3TGluZSIsImRyYXdSZWN0IiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsImRyYXdDaXJjbGUiLCJjZW50ZXJYIiwiY2VudGVyWSIsInJhZGl1cyIsImZpbGwiLCJoYW5kbGVNb3VzZURvd24iLCJidXR0b24iLCJoYW5kbGVNb3VzZU1vdmUiLCJkcmF3WCIsImRyYXdZIiwiaGFuZGxlQ2FudmFzTW91c2VNb3ZlIiwiaGFuZGxlTW91c2VVcCIsInNxcnQiLCJwb3ciLCJoYW5kbGVGbGlwSG9yaXpvbnRhbCIsIm5ld0RhdGEiLCJjcmVhdGVJbWFnZURhdGEiLCJzIiwiZCIsImhhbmRsZUNvcHlGcm9tRGlyIiwiZnJvbURpciIsImhhbmRsZUNyZWF0ZUhlcm8iLCJ0cmltIiwiaGVybyIsInVwZGF0ZWQiLCJoYW5kbGVEZWxldGVIZXJvIiwiY29uZmlybSIsImRpc3BsYXlTaXplIiwiaGFuZGxlQ2FudmFzV2hlZWwiLCJmYWN0b3IiLCJkZWx0YVkiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyIiwiX2lkIiwiYm9yZGVyQ29sb3IiLCJ2IiwidmFsdWUiLCJtYXAiLCJyYXJpdHkiLCJzdG9wUHJvcGFnYXRpb24iLCJ0aHVtYiIsImltYWdlUmVuZGVyaW5nIiwibWluV2lkdGgiLCJ0IiwiX19hcnJJZHhfXyIsImFjY2VudENvbG9yIiwidG9GaXhlZCIsImZpbHRlciIsImN1cnNvciIsInBvc2l0aW9uIiwidHJhbnNmb3JtIiwidHJhbnNmb3JtT3JpZ2luIiwidHJhbnNpdGlvbiIsImluc2V0IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJwb2ludGVyRXZlbnRzIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsIm91dGxpbmUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJuZXdWYXIiLCJ2YXJJZCIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkhlcm9DcmVhdG9yLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgWCwgUm90YXRlQ2N3LCBSb3RhdGVDdywgRmxpcEhvcml6b250YWwsIFRyYXNoMiwgUGx1cywgU2VuZCwgQ2hldnJvbkRvd24gfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBESVJFQ1RJT05TLCBESVJFQ1RJT05fTEFCRUxTLCBnZXRIZXJvU3ByaXRlLCBzYXZlSGVyb1Nwcml0ZSwgaW52YWxpZGF0ZUhlcm9TcHJpdGVDYWNoZSwgZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlLCBnZXRIZXJvVmFyaWFudHMsIGNyZWF0ZU5ld0hlcm9WYXJpYW50IH0gZnJvbSBcIkAvbGliL2hlcm9TcHJpdGVzXCI7XG5pbXBvcnQgeyBnZXRBbGxDdXN0b21IZXJvZXMsIHNhdmVDdXN0b21IZXJvLCBjcmVhdGVOZXdIZXJvLCBkZWxldGVDdXN0b21IZXJvIH0gZnJvbSBcIkAvbGliL2hlcm9EYXRhXCI7XG5pbXBvcnQgeyBwdWJsaXNoSGVyb1Nwcml0ZSwgaXNQdWJsaXNoZWRIZXJvLCBpbnZhbGlkYXRlUHVibGlzaGVkSGVyb0NhY2hlIH0gZnJvbSBcIkAvbGliL3B1Ymxpc2hlZFNwcml0ZXNcIjtcbmltcG9ydCBTcGVjdHJ1bUNvbG9yUGlja2VyIGZyb20gXCIuL1NwZWN0cnVtQ29sb3JQaWNrZXJcIjtcblxuY29uc3QgQ0FOVkFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfSElTVE9SWSA9IDEwMDtcblxuY29uc3QgUEFMRVRURSA9IFtcblwiIzAwMDAwMFwiLCBcIiMxMTExMTFcIiwgXCIjMjIyMjIyXCIsIFwiIzMzMzMzM1wiLCBcIiM0NDQ0NDRcIiwgXCIjNTU1NTU1XCIsIFwiIzY2NjY2NlwiLCBcIiM3Nzc3NzdcIixcblwiIzg4ODg4OFwiLCBcIiM5OTk5OTlcIiwgXCIjYWFhYWFhXCIsIFwiI2JiYmJiYlwiLCBcIiNjY2NjY2NcIiwgXCIjZGRkZGRkXCIsIFwiI2VlZWVlZVwiLCBcIiNmZmZmZmZcIixcblwiI2ZmMDAwMFwiLCBcIiNmZjQ0MDBcIiwgXCIjZmY4ODAwXCIsIFwiI2ZmY2MwMFwiLCBcIiNmZmZmMDBcIiwgXCIjODhmZjAwXCIsIFwiIzAwZmYwMFwiLCBcIiMwMGZmODhcIixcblwiIzAwZmZmZlwiLCBcIiMwMDg4ZmZcIiwgXCIjMDAwMGZmXCIsIFwiIzg4MDBmZlwiLCBcIiNmZjAwZmZcIiwgXCIjZmYwMDg4XCIsIFwiI2ZmODhhYVwiLCBcIiNmZmNjYWFcIixcblwiIzg4MDAwMFwiLCBcIiM4ODQ0MDBcIiwgXCIjODg0NDAwXCIsIFwiIzg4NjYwMFwiLCBcIiM4ODg4MDBcIiwgXCIjNDQ4ODAwXCIsIFwiIzAwODgwMFwiLCBcIiMwMDg4NDRcIixcblwiIzAwODg4OFwiLCBcIiMwMDQ0ODhcIiwgXCIjMDAwMDg4XCIsIFwiIzQ0MDA4OFwiLCBcIiM4ODAwODhcIiwgXCIjODgwMDQ0XCIsIFwiIzg4NDQ2NlwiLCBcIiM4ODY2NDRcIixcblwiI2ZmODg4OFwiLCBcIiNmZmFhODhcIiwgXCIjZmZjYzg4XCIsIFwiI2ZmZWU4OFwiLCBcIiNmZmZmODhcIiwgXCIjYWFmZjg4XCIsIFwiIzg4ZmY4OFwiLCBcIiM4OGZmYWFcIixcblwiIzg4ZmZmZlwiLCBcIiM4OGFhZmZcIiwgXCIjODg4OGZmXCIsIFwiI2FhODhmZlwiLCBcIiNmZjg4ZmZcIiwgXCIjZmY4OGFhXCIsIFwiI2ZmYWFiYlwiLCBcIiNmZmQ4YThcIixcblwidHJhbnNwYXJlbnRcIl07XG5cblxuY29uc3QgVE9PTFMgPSBbXG57IGlkOiBcInBlbmNpbFwiLCBsYWJlbDogXCLinI/vuI9cIiwgdGl0bGU6IFwiUGVuY2lsIChQKVwiIH0sXG57IGlkOiBcImJydXNoXCIsIGxhYmVsOiBcIvCflozvuI9cIiwgdGl0bGU6IFwiQnJ1c2ggKEIpXCIgfSxcbnsgaWQ6IFwiZXJhc2VyXCIsIGxhYmVsOiBcIuKMq1wiLCB0aXRsZTogXCJFcmFzZXIgKEUpXCIgfSxcbnsgaWQ6IFwiYnVja2V0XCIsIGxhYmVsOiBcIvCfqqNcIiwgdGl0bGU6IFwiRmlsbCAoRilcIiB9LFxueyBpZDogXCJleWVkcm9wcGVyXCIsIGxhYmVsOiBcIvCfkolcIiwgdGl0bGU6IFwiRXllZHJvcHBlciAoSSlcIiB9LFxueyBpZDogXCJsaW5lXCIsIGxhYmVsOiBcIuKVsVwiLCB0aXRsZTogXCJMaW5lIChMKVwiIH0sXG57IGlkOiBcInJlY3RcIiwgbGFiZWw6IFwi4patXCIsIHRpdGxlOiBcIlJlY3RhbmdsZSAoUilcIiB9LFxueyBpZDogXCJjaXJjbGVcIiwgbGFiZWw6IFwi4peLXCIsIHRpdGxlOiBcIkNpcmNsZSAoQylcIiB9XTtcblxuXG5jb25zdCBUT09MX0hPVEtFWVMgPSB7XG4gIHA6IFwicGVuY2lsXCIsXG4gIGI6IFwiYnJ1c2hcIixcbiAgZTogXCJlcmFzZXJcIixcbiAgZjogXCJidWNrZXRcIixcbiAgaTogXCJleWVkcm9wcGVyXCIsXG4gIGw6IFwibGluZVwiLFxuICByOiBcInJlY3RcIixcbiAgYzogXCJjaXJjbGVcIlxufTtcblxuY29uc3QgTUFYX1RFTVBMQVRFU19QRVJfRElSID0gMjA7XG5cbmNvbnN0IEJSVVNIX1NJWkVTID0gWzEsIDIsIDMsIDUsIDhdO1xuXG5mdW5jdGlvbiBoZXhUb1JnYmEoaGV4KSB7XG4gIGlmIChoZXggPT09IFwidHJhbnNwYXJlbnRcIikgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgcmV0dXJuIFtwYXJzZUludChoZXguc2xpY2UoMSwgMyksIDE2KSwgcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNiksIHBhcnNlSW50KGhleC5zbGljZSg1LCA3KSwgMTYpLCAyNTVdO1xufVxuZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPT09IDApIHJldHVybiBcInRyYW5zcGFyZW50XCI7XG4gIHJldHVybiBgIyR7ci50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfSR7Zy50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfSR7Yi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfWA7XG59XG5cbi8vIFNhdmUgY3VycmVudCBjYW52YXMgZm9yIGEgZ2l2ZW4gaGVybytkaXJlY3Rpb24gaW1tZWRpYXRlbHlcbmZ1bmN0aW9uIGF1dG9TYXZlU3ByaXRlKGhlcm9JZCwgZGlyLCBjYW52YXMsIHZhcmlhbnRJZCA9IFwiZGVmYXVsdFwiKSB7XG4gIGlmICghaGVyb0lkIHx8ICFjYW52YXMpIHJldHVybjtcbiAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gIHNhdmVIZXJvU3ByaXRlKGhlcm9JZCwgZGlyLCBkYXRhVXJsLCB2YXJpYW50SWQpO1xuICBpbnZhbGlkYXRlSGVyb1Nwcml0ZUNhY2hlKGhlcm9JZCwgZGlyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVyb0NyZWF0b3IoeyBvbkNsb3NlLCBpZCB9KSB7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW2hlcm9lcywgc2V0SGVyb2VzXSA9IHVzZVN0YXRlKCgpID0+IGdldEFsbEN1c3RvbUhlcm9lcygpKTtcbiAgY29uc3QgW3NlbGVjdGVkSGVyb0lkLCBzZXRTZWxlY3RlZEhlcm9JZF0gPSB1c2VTdGF0ZSgoKSA9PiBnZXRBbGxDdXN0b21IZXJvZXMoKVswXT8uaWQgfHwgbnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZERpciwgc2V0U2VsZWN0ZWREaXJdID0gdXNlU3RhdGUoXCJTXCIpO1xuICBjb25zdCBbdG9vbCwgc2V0VG9vbF0gPSB1c2VTdGF0ZShcInBlbmNpbFwiKTtcbiAgY29uc3QgW2JydXNoU2l6ZSwgc2V0QnJ1c2hTaXplXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbY29sb3IsIHNldENvbG9yXSA9IHVzZVN0YXRlKFwiI2UwNTA1MFwiKTtcbiAgY29uc3QgW3pvb20sIHNldFpvb21dID0gdXNlU3RhdGUoMik7IC8vIGZyYWN0aW9uYWwgc2NhbGUgYXBwbGllZCB2aWEgQ1NTIHRyYW5zZm9ybVxuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtoaXN0b3J5SW5kZXgsIHNldEhpc3RvcnlJbmRleF0gPSB1c2VTdGF0ZSgtMSk7XG4gIGNvbnN0IFtkcmF3aW5nLCBzZXREcmF3aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RyYXdTdGFydCwgc2V0RHJhd1N0YXJ0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbGFzdFBvaW50LCBzZXRMYXN0UG9pbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtjdXJzb3JQb3MsIHNldEN1cnNvclBvc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW25ld0hlcm9OYW1lLCBzZXROZXdIZXJvTmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3Nob3dOZXdGb3JtLCBzZXRTaG93TmV3Rm9ybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIC8vIFRyYWNrIGRpcmVjdGlvbiB0aHVtYm5haWxzIGZvciBhbGwgZGlycyBsaXZlXG4gIGNvbnN0IFtkaXJUaHVtYnMsIHNldERpclRodW1ic10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtzaG93UHVibGlzaENvbmZpcm0sIHNldFNob3dQdWJsaXNoQ29uZmlybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1B1Ymxpc2hlZCwgc2V0SXNQdWJsaXNoZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdmFyaWFudExpc3QsIHNldFZhcmlhbnRMaXN0XSA9IHVzZVN0YXRlKFtcImRlZmF1bHRcIl0pO1xuICBjb25zdCBbYWN0aXZlVmFyaWFudCwgc2V0QWN0aXZlVmFyaWFudFN0YXRlXSA9IHVzZVN0YXRlKFwiZGVmYXVsdFwiKTtcbiAgY29uc3QgW3Nob3dWYXJpYW50TW9kYWwsIHNldFNob3dWYXJpYW50TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1NhdmVUZW1wbGF0ZUNvbmZpcm0sIHNldFNob3dTYXZlVGVtcGxhdGVDb25maXJtXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dMb2FkVGVtcGxhdGVDb25maXJtLCBzZXRTaG93TG9hZFRlbXBsYXRlQ29uZmlybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt0ZW1wbGF0ZU5hbWUsIHNldFRlbXBsYXRlTmFtZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2F2YWlsYWJsZVRlbXBsYXRlcywgc2V0QXZhaWxhYmxlVGVtcGxhdGVzXSA9IHVzZVN0YXRlKFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEhlcm9JZCAmJiBzZWxlY3RlZERpcikge1xuICAgICAgc2V0SXNQdWJsaXNoZWQoaXNQdWJsaXNoZWRIZXJvKHNlbGVjdGVkSGVyb0lkLCBzZWxlY3RlZERpcikpO1xuICAgIH1cbiAgfSwgW3NlbGVjdGVkSGVyb0lkLCBzZWxlY3RlZERpcl0pO1xuXG4gIC8vIFJlZnMgc28gY2FsbGJhY2tzIGFsd2F5cyBoYXZlIGN1cnJlbnQgdmFsdWVzXG4gIGNvbnN0IGhpc3RvcnlSZWYgPSB1c2VSZWYoaGlzdG9yeSk7XG4gIGNvbnN0IGhpc3RvcnlJbmRleFJlZiA9IHVzZVJlZihoaXN0b3J5SW5kZXgpO1xuICBjb25zdCBzZWxlY3RlZEhlcm9JZFJlZiA9IHVzZVJlZihzZWxlY3RlZEhlcm9JZCk7XG4gIGNvbnN0IHNlbGVjdGVkRGlyUmVmID0gdXNlUmVmKHNlbGVjdGVkRGlyKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtoaXN0b3J5UmVmLmN1cnJlbnQgPSBoaXN0b3J5O30sIFtoaXN0b3J5XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7aGlzdG9yeUluZGV4UmVmLmN1cnJlbnQgPSBoaXN0b3J5SW5kZXg7fSwgW2hpc3RvcnlJbmRleF0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge3NlbGVjdGVkSGVyb0lkUmVmLmN1cnJlbnQgPSBzZWxlY3RlZEhlcm9JZDt9LCBbc2VsZWN0ZWRIZXJvSWRdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtzZWxlY3RlZERpclJlZi5jdXJyZW50ID0gc2VsZWN0ZWREaXI7fSwgW3NlbGVjdGVkRGlyXSk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRIZXJvID0gaGVyb2VzLmZpbmQoKGgpID0+IGguaWQgPT09IHNlbGVjdGVkSGVyb0lkKSB8fCBudWxsO1xuXG4gIC8vIFJlZnJlc2ggZGlyZWN0aW9uIHRodW1ibmFpbHMgZnJvbSBzdG9yYWdlXG4gIGNvbnN0IHJlZnJlc2hUaHVtYnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZEhlcm9JZCkgcmV0dXJuO1xuICAgIHNldERpclRodW1icyhnZXRBbGxIZXJvU3ByaXRlc0ZvclR5cGUoc2VsZWN0ZWRIZXJvSWQsIGFjdGl2ZVZhcmlhbnQpKTtcbiAgICBjb25zdCB2YXJpYW50cyA9IGdldEhlcm9WYXJpYW50cyhzZWxlY3RlZEhlcm9JZCwgc2VsZWN0ZWREaXIpO1xuICAgIHNldFZhcmlhbnRMaXN0KHZhcmlhbnRzLmxlbmd0aCA+IDAgPyB2YXJpYW50cyA6IFtcImRlZmF1bHRcIl0pO1xuICAgIHNldEFjdGl2ZVZhcmlhbnRTdGF0ZShcImRlZmF1bHRcIik7XG4gIH0sIFtzZWxlY3RlZEhlcm9JZCwgYWN0aXZlVmFyaWFudF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7cmVmcmVzaFRodW1icygpO30sIFtzZWxlY3RlZEhlcm9JZCwgYWN0aXZlVmFyaWFudCwgc2VsZWN0ZWREaXJdKTtcblxuICAvLyBUZW1wbGF0ZSBtYW5hZ2VtZW50IGZ1bmN0aW9uc1xuICBjb25zdCBnZXRUZW1wbGF0ZUtleSA9IChkaXIpID0+IGBoZXJvX3RlbXBsYXRlc18ke2Rpcn1gO1xuXG4gIGNvbnN0IGdldFRlbXBsYXRlc0ZvckRpciA9IHVzZUNhbGxiYWNrKChkaXIpID0+IHtcbiAgICBpZiAoIWRpcikgcmV0dXJuIFtdO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0VGVtcGxhdGVLZXkoZGlyKSk7XG4gICAgICByZXR1cm4gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiBbXTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZERpcikge1xuICAgICAgY29uc3QgdGVtcGxhdGVzID0gZ2V0VGVtcGxhdGVzRm9yRGlyKHNlbGVjdGVkRGlyKTtcbiAgICAgIHNldEF2YWlsYWJsZVRlbXBsYXRlcyh0ZW1wbGF0ZXMpO1xuICAgIH1cbiAgfSwgW3NlbGVjdGVkRGlyLCBnZXRUZW1wbGF0ZXNGb3JEaXJdKTtcblxuICBjb25zdCBoYW5kbGVTYXZlQXNUZW1wbGF0ZSA9ICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkRGlyIHx8ICFjYW52YXNSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgIGNvbnN0IHRlbXBsYXRlcyA9IGdldFRlbXBsYXRlc0ZvckRpcihzZWxlY3RlZERpcik7XG5cbiAgICBpZiAodGVtcGxhdGVzLmxlbmd0aCA+PSBNQVhfVEVNUExBVEVTX1BFUl9ESVIpIHtcbiAgICAgIGFsZXJ0KGBNYXhpbXVtICR7TUFYX1RFTVBMQVRFU19QRVJfRElSfSB0ZW1wbGF0ZXMgYWxsb3dlZCBwZXIgZGlyZWN0aW9uLiBEZWxldGUgc29tZSBmaXJzdC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdUZW1wbGF0ZSA9IHtcbiAgICAgIGlkOiBgdGVtcGxhdGVfJHtEYXRlLm5vdygpfWAsXG4gICAgICBuYW1lOiB0ZW1wbGF0ZU5hbWUgfHwgYFRlbXBsYXRlICR7dGVtcGxhdGVzLmxlbmd0aCArIDF9YCxcbiAgICAgIGRhdGFVcmwsXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH07XG5cbiAgICB0ZW1wbGF0ZXMucHVzaChuZXdUZW1wbGF0ZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0VGVtcGxhdGVLZXkoc2VsZWN0ZWREaXIpLCBKU09OLnN0cmluZ2lmeSh0ZW1wbGF0ZXMpKTtcbiAgICBzZXRBdmFpbGFibGVUZW1wbGF0ZXModGVtcGxhdGVzKTtcbiAgICBzZXRUZW1wbGF0ZU5hbWUoXCJcIik7XG4gICAgc2V0U2hvd1NhdmVUZW1wbGF0ZUNvbmZpcm0oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvYWRUZW1wbGF0ZSA9ICh0ZW1wbGF0ZSkgPT4ge1xuICAgIGlmICghY2FudmFzUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICBwdXNoSGlzdG9yeSgpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHRlbXBsYXRlLmRhdGFVcmw7XG4gICAgc2V0U2hvd0xvYWRUZW1wbGF0ZUNvbmZpcm0oZmFsc2UpO1xuICB9O1xuXG4gIC8vIExvYWQgc3ByaXRlIHdoZW4gaGVyby9kaXJlY3Rpb24gY2hhbmdlcyDigJQgU0FWRSBjdXJyZW50IGJlZm9yZSBzd2l0Y2hpbmdcbiAgY29uc3QgcHJldkhlcm9JZFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgcHJldkRpclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgcHJldlZhcmlhbnRSZWYgPSB1c2VSZWYoYWN0aXZlVmFyaWFudCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGNhbnZhcyBiZWZvcmUgc3dpdGNoaW5nIGF3YXlcbiAgICBpZiAocHJldkhlcm9JZFJlZi5jdXJyZW50ICYmIHByZXZEaXJSZWYuY3VycmVudCkge1xuICAgICAgYXV0b1NhdmVTcHJpdGUocHJldkhlcm9JZFJlZi5jdXJyZW50LCBwcmV2RGlyUmVmLmN1cnJlbnQsIGNhbnZhc1JlZi5jdXJyZW50LCBwcmV2VmFyaWFudFJlZi5jdXJyZW50KTtcbiAgICB9XG4gICAgcHJldkhlcm9JZFJlZi5jdXJyZW50ID0gc2VsZWN0ZWRIZXJvSWQ7XG4gICAgcHJldkRpclJlZi5jdXJyZW50ID0gc2VsZWN0ZWREaXI7XG4gICAgcHJldlZhcmlhbnRSZWYuY3VycmVudCA9IGFjdGl2ZVZhcmlhbnQ7XG5cbiAgICBpZiAoIXNlbGVjdGVkSGVyb0lkKSByZXR1cm47XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBleGlzdGluZyA9IGdldEhlcm9TcHJpdGUoc2VsZWN0ZWRIZXJvSWQsIHNlbGVjdGVkRGlyLCBhY3RpdmVWYXJpYW50KTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgICAgIHNldEhpc3RvcnkoW2RhdGFdKTtcbiAgICAgICAgc2V0SGlzdG9yeUluZGV4KDApO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSBleGlzdGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgICAgY29uc3QgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICAgIHNldEhpc3RvcnkoW2RhdGFdKTtcbiAgICAgIHNldEhpc3RvcnlJbmRleCgwKTtcbiAgICB9XG4gICAgc2V0TGFzdFBvaW50KG51bGwpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICB9LCBbc2VsZWN0ZWRIZXJvSWQsIHNlbGVjdGVkRGlyXSk7XG5cbiAgLy8gcHVzaEhpc3RvcnkgKyBhdXRvLXNhdmVcbiAgY29uc3QgcHVzaEhpc3RvcnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgc2V0SGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IHByZXYuc2xpY2UoMCwgaGlzdG9yeUluZGV4UmVmLmN1cnJlbnQgKyAxKTtcbiAgICAgIHJldHVybiBbLi4udHJpbW1lZCwgZGF0YV0uc2xpY2UoLU1BWF9ISVNUT1JZKTtcbiAgICB9KTtcbiAgICBzZXRIaXN0b3J5SW5kZXgoKHByZXYpID0+IE1hdGgubWluKHByZXYgKyAxLCBNQVhfSElTVE9SWSAtIDEpKTtcbiAgICAvLyBBdXRvLXNhdmUgdGhpcyBzdHJva2UgdG8gY3VycmVudCB2YXJpYW50XG4gICAgYXV0b1NhdmVTcHJpdGUoc2VsZWN0ZWRIZXJvSWRSZWYuY3VycmVudCwgc2VsZWN0ZWREaXJSZWYuY3VycmVudCwgY2FudmFzLCBhY3RpdmVWYXJpYW50KTtcbiAgICAvLyBSZWZyZXNoIHRodW1ibmFpbHNcbiAgICBzZXREaXJUaHVtYnMoZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlKHNlbGVjdGVkSGVyb0lkUmVmLmN1cnJlbnQsIGFjdGl2ZVZhcmlhbnQpKTtcbiAgfSwgW2FjdGl2ZVZhcmlhbnRdKTtcblxuICBjb25zdCBoYW5kbGVVbmRvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3SWR4ID0gTWF0aC5tYXgoMCwgcHJldiAtIDEpO1xuICAgICAgY29uc3Qgc25hcCA9IGhpc3RvcnlSZWYuY3VycmVudFtuZXdJZHhdO1xuICAgICAgaWYgKHNuYXApIHtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgIGN0eC5wdXRJbWFnZURhdGEoc25hcCwgMCwgMCk7XG4gICAgICAgICAgLy8gQXV0by1zYXZlIHRoZSB1bmRvbmUgc3RhdGVcbiAgICAgICAgICBhdXRvU2F2ZVNwcml0ZShzZWxlY3RlZEhlcm9JZFJlZi5jdXJyZW50LCBzZWxlY3RlZERpclJlZi5jdXJyZW50LCBjYW52YXNSZWYuY3VycmVudCk7XG4gICAgICAgICAgc2V0RGlyVGh1bWJzKGdldEFsbEhlcm9TcHJpdGVzRm9yVHlwZShzZWxlY3RlZEhlcm9JZFJlZi5jdXJyZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJZHg7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVSZWRvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEhpc3RvcnlJbmRleCgocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV3SWR4ID0gTWF0aC5taW4oaGlzdG9yeVJlZi5jdXJyZW50Lmxlbmd0aCAtIDEsIHByZXYgKyAxKTtcbiAgICAgIGNvbnN0IHNuYXAgPSBoaXN0b3J5UmVmLmN1cnJlbnRbbmV3SWR4XTtcbiAgICAgIGlmIChzbmFwKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50Py5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKHNuYXAsIDAsIDApO1xuICAgICAgICAgIGF1dG9TYXZlU3ByaXRlKHNlbGVjdGVkSGVyb0lkUmVmLmN1cnJlbnQsIHNlbGVjdGVkRGlyUmVmLmN1cnJlbnQsIGNhbnZhc1JlZi5jdXJyZW50KTtcbiAgICAgICAgICBzZXREaXJUaHVtYnMoZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlKHNlbGVjdGVkSGVyb0lkUmVmLmN1cnJlbnQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0lkeDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIEtleWJvYXJkIHNob3J0Y3V0c1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleSA9IChlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhT3JDdHJsID0gZS5tZXRhS2V5IHx8IGUuY3RybEtleTtcbiAgICAgIC8vIFRvb2wgaG90a2V5cyAobm8gbW9kaWZpZXIgbmVlZGVkKVxuICAgICAgaWYgKCFtZXRhT3JDdHJsICYmICFlLnRhcmdldC5tYXRjaGVzKFwiaW5wdXQsIHRleHRhcmVhXCIpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChUT09MX0hPVEtFWVNba2V5XSkge1xuICAgICAgICAgIHNldFRvb2woVE9PTF9IT1RLRVlTW2tleV0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVW5kby9SZWRvIHdpdGggQ21kL0N0cmxcbiAgICAgIGlmIChtZXRhT3JDdHJsICYmIChlLmtleSA9PT0gXCJ6XCIgfHwgZS5rZXkgPT09IFwiWlwiKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSBoYW5kbGVSZWRvKCk7ZWxzZSBoYW5kbGVVbmRvKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleSk7XG4gIH0sIFtoYW5kbGVVbmRvLCBoYW5kbGVSZWRvXSk7XG5cbiAgY29uc3QgZ2V0UGl4ZWxDb29yZHMgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgKiAoQ0FOVkFTX1NJWkUgLyByZWN0LndpZHRoKSk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoKGUuY2xpZW50WSAtIHJlY3QudG9wKSAqIChDQU5WQVNfU0laRSAvIHJlY3QuaGVpZ2h0KSk7XG4gICAgcmV0dXJuIHsgeDogTWF0aC5tYXgoMCwgTWF0aC5taW4oQ0FOVkFTX1NJWkUgLSAxLCB4KSksIHk6IE1hdGgubWF4KDAsIE1hdGgubWluKENBTlZBU19TSVpFIC0gMSwgeSkpIH07XG4gIH07XG5cbiAgY29uc3QgZHJhd1BpeGVsID0gKGN0eCwgcHgsIHB5LCByZ2JhKSA9PiB7XG4gICAgY29uc3QgW3IsIGcsIGIsIGFdID0gcmdiYTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IoYnJ1c2hTaXplIC8gMik7XG4gICAgZm9yIChsZXQgZHkgPSAtaGFsZjsgZHkgPD0gaGFsZjsgZHkrKykge1xuICAgICAgZm9yIChsZXQgZHggPSAtaGFsZjsgZHggPD0gaGFsZjsgZHgrKykge1xuICAgICAgICBjb25zdCBueCA9IHB4ICsgZHgsbnkgPSBweSArIGR5O1xuICAgICAgICBpZiAobnggPCAwIHx8IG54ID49IENBTlZBU19TSVpFIHx8IG55IDwgMCB8fCBueSA+PSBDQU5WQVNfU0laRSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGlkeCA9IChueSAqIENBTlZBU19TSVpFICsgbngpICogNDtcbiAgICAgICAgaWYgKGEgPT09IDApIHtpbWFnZURhdGEuZGF0YVtpZHggKyAzXSA9IDA7fSBlbHNlXG4gICAgICAgIHtpbWFnZURhdGEuZGF0YVtpZHhdID0gcjtpbWFnZURhdGEuZGF0YVtpZHggKyAxXSA9IGc7aW1hZ2VEYXRhLmRhdGFbaWR4ICsgMl0gPSBiO2ltYWdlRGF0YS5kYXRhW2lkeCArIDNdID0gYTt9XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgfTtcblxuICAvLyBEcmF3IHNtb290aCBsaW5lIGJldHdlZW4gdHdvIHBvaW50cyAoQnJlc2VuaGFtJ3MgYWxnb3JpdGhtKVxuICBjb25zdCBkcmF3U21vb3RoTGluZSA9IChjdHgsIHgwLCB5MCwgeDEsIHkxLCByZ2JhKSA9PiB7XG4gICAgY29uc3QgZHggPSBNYXRoLmFicyh4MSAtIHgwKSxkeSA9IE1hdGguYWJzKHkxIC0geTApO1xuICAgIGNvbnN0IHN4ID0geDAgPCB4MSA/IDEgOiAtMSxzeSA9IHkwIDwgeTEgPyAxIDogLTE7XG4gICAgbGV0IGVyciA9IGR4IC0gZHk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGRyYXdQaXhlbChjdHgsIHgwLCB5MCwgcmdiYSk7XG4gICAgICBpZiAoeDAgPT09IHgxICYmIHkwID09PSB5MSkgYnJlYWs7XG4gICAgICBjb25zdCBlMiA9IDIgKiBlcnI7XG4gICAgICBpZiAoZTIgPiAtZHkpIHtlcnIgLT0gZHk7eDAgKz0gc3g7fVxuICAgICAgaWYgKGUyIDwgZHgpIHtlcnIgKz0gZHg7eTAgKz0gc3k7fVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmbG9vZEZpbGwgPSAoY3R4LCBzeCwgc3ksIGZpbGxDb2xvcikgPT4ge1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgY29uc3QgaWR4ID0gKHN5ICogQ0FOVkFTX1NJWkUgKyBzeCkgKiA0O1xuICAgIGNvbnN0IHRSID0gZGF0YVtpZHhdLHRHID0gZGF0YVtpZHggKyAxXSx0QiA9IGRhdGFbaWR4ICsgMl0sdEEgPSBkYXRhW2lkeCArIDNdO1xuICAgIGNvbnN0IFtmUiwgZkcsIGZCLCBmQV0gPSBmaWxsQ29sb3I7XG4gICAgaWYgKHRSID09PSBmUiAmJiB0RyA9PT0gZkcgJiYgdEIgPT09IGZCICYmIHRBID09PSBmQSkgcmV0dXJuO1xuICAgIGNvbnN0IHN0YWNrID0gW1tzeCwgc3ldXTtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFVpbnQ4QXJyYXkoQ0FOVkFTX1NJWkUgKiBDQU5WQVNfU0laRSk7XG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgW3gsIHldID0gc3RhY2sucG9wKCk7XG4gICAgICBpZiAoeCA8IDAgfHwgeCA+PSBDQU5WQVNfU0laRSB8fCB5IDwgMCB8fCB5ID49IENBTlZBU19TSVpFKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IGkgPSB5ICogQ0FOVkFTX1NJWkUgKyB4O1xuICAgICAgaWYgKHZpc2l0ZWRbaV0pIGNvbnRpbnVlO1xuICAgICAgY29uc3QgcGkgPSBpICogNDtcbiAgICAgIGlmIChkYXRhW3BpXSAhPT0gdFIgfHwgZGF0YVtwaSArIDFdICE9PSB0RyB8fCBkYXRhW3BpICsgMl0gIT09IHRCIHx8IGRhdGFbcGkgKyAzXSAhPT0gdEEpIGNvbnRpbnVlO1xuICAgICAgdmlzaXRlZFtpXSA9IDE7XG4gICAgICBpZiAoZkEgPT09IDApIHtkYXRhW3BpICsgM10gPSAwO30gZWxzZSB7ZGF0YVtwaV0gPSBmUjtkYXRhW3BpICsgMV0gPSBmRztkYXRhW3BpICsgMl0gPSBmQjtkYXRhW3BpICsgM10gPSBmQTt9XG4gICAgICBzdGFjay5wdXNoKFt4ICsgMSwgeV0sIFt4IC0gMSwgeV0sIFt4LCB5ICsgMV0sIFt4LCB5IC0gMV0pO1xuICAgIH1cbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gIH07XG5cbiAgY29uc3QgZHJhd0xpbmUgPSAoY3R4LCB4MCwgeTAsIHgxLCB5MSwgcmdiYSkgPT4ge1xuICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMoeDEgLSB4MCksZHkgPSBNYXRoLmFicyh5MSAtIHkwKTtcbiAgICBjb25zdCBzeCA9IHgwIDwgeDEgPyAxIDogLTEsc3kgPSB5MCA8IHkxID8gMSA6IC0xO1xuICAgIGxldCBlcnIgPSBkeCAtIGR5O1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBkcmF3UGl4ZWwoY3R4LCB4MCwgeTAsIHJnYmEpO1xuICAgICAgaWYgKHgwID09PSB4MSAmJiB5MCA9PT0geTEpIGJyZWFrO1xuICAgICAgY29uc3QgZTIgPSAyICogZXJyO1xuICAgICAgaWYgKGUyID4gLWR5KSB7ZXJyIC09IGR5O3gwICs9IHN4O31cbiAgICAgIGlmIChlMiA8IGR4KSB7ZXJyICs9IGR4O3kwICs9IHN5O31cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZHJhd1JlY3QgPSAoY3R4LCB4MCwgeTAsIHgxLCB5MSwgcmdiYSkgPT4ge1xuICAgIGNvbnN0IG1pblggPSBNYXRoLm1pbih4MCwgeDEpLG1heFggPSBNYXRoLm1heCh4MCwgeDEpLG1pblkgPSBNYXRoLm1pbih5MCwgeTEpLG1heFkgPSBNYXRoLm1heCh5MCwgeTEpO1xuICAgIGZvciAobGV0IHggPSBtaW5YOyB4IDw9IG1heFg7IHgrKykge2RyYXdQaXhlbChjdHgsIHgsIG1pblksIHJnYmEpO2RyYXdQaXhlbChjdHgsIHgsIG1heFksIHJnYmEpO31cbiAgICBmb3IgKGxldCB5ID0gbWluWSArIDE7IHkgPCBtYXhZOyB5KyspIHtkcmF3UGl4ZWwoY3R4LCBtaW5YLCB5LCByZ2JhKTtkcmF3UGl4ZWwoY3R4LCBtYXhYLCB5LCByZ2JhKTt9XG4gIH07XG5cbiAgY29uc3QgZHJhd0NpcmNsZSA9IChjdHgsIGNlbnRlclgsIGNlbnRlclksIHJhZGl1cywgcmdiYSwgZmlsbCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKGZpbGwpIHtcbiAgICAgIGZvciAobGV0IHkgPSAtcmFkaXVzOyB5IDw9IHJhZGl1czsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAtcmFkaXVzOyB4IDw9IHJhZGl1czsgeCsrKSB7XG4gICAgICAgICAgaWYgKHggKiB4ICsgeSAqIHkgPD0gcmFkaXVzICogcmFkaXVzKSB7XG4gICAgICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYICsgeCwgY2VudGVyWSArIHksIHJnYmEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgeCA9IHJhZGl1cyx5ID0gMDtcbiAgICAgIGxldCBlcnIgPSAwO1xuICAgICAgd2hpbGUgKHggPj0geSkge1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYICsgeCwgY2VudGVyWSArIHksIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYICsgeSwgY2VudGVyWSArIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYIC0geSwgY2VudGVyWSArIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYIC0geCwgY2VudGVyWSArIHksIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYIC0geCwgY2VudGVyWSAtIHksIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYIC0geSwgY2VudGVyWSAtIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYICsgeSwgY2VudGVyWSAtIHgsIHJnYmEpO1xuICAgICAgICBkcmF3UGl4ZWwoY3R4LCBjZW50ZXJYICsgeCwgY2VudGVyWSAtIHksIHJnYmEpO1xuICAgICAgICB5Kys7XG4gICAgICAgIGVyciArPSAxICsgMiAqIHk7XG4gICAgICAgIGlmICgyICogKGVyciAtIHgpICsgMSA+IDApIHtcbiAgICAgICAgICB4LS07XG4gICAgICAgICAgZXJyICs9IDEgLSAyICogeDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCB8fCAhc2VsZWN0ZWRIZXJvKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBnZXRQaXhlbENvb3JkcyhlKTtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHNldERyYXdpbmcodHJ1ZSk7XG4gICAgc2V0RHJhd1N0YXJ0KHsgeCwgeSB9KTtcblxuICAgIGlmICh0b29sID09PSBcImV5ZWRyb3BwZXJcIikge1xuICAgICAgY29uc3QgcHggPSBjdHguZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpLmRhdGE7XG4gICAgICBjb25zdCBoZXggPSByZ2JhVG9IZXgocHhbMF0sIHB4WzFdLCBweFsyXSwgcHhbM10pO1xuICAgICAgaWYgKGhleCAhPT0gXCJ0cmFuc3BhcmVudFwiKSBzZXRDb2xvcihoZXgpO1xuICAgICAgc2V0RHJhd2luZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0b29sID09PSBcImJ1Y2tldFwiKSB7Zmxvb2RGaWxsKGN0eCwgeCwgeSwgaGV4VG9SZ2JhKGNvbG9yKSk7cHVzaEhpc3RvcnkoKTtzZXREcmF3aW5nKGZhbHNlKTtyZXR1cm47fVxuICAgIGlmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiYnJ1c2hcIiB8fCB0b29sID09PSBcImVyYXNlclwiKSB7XG4gICAgICBjb25zdCByZ2JhID0gdG9vbCA9PT0gXCJlcmFzZXJcIiA/IFswLCAwLCAwLCAwXSA6IGhleFRvUmdiYShjb2xvcik7XG4gICAgICBpZiAoZS5zaGlmdEtleSAmJiBsYXN0UG9pbnQpIHtcbiAgICAgICAgZHJhd0xpbmUoY3R4LCBsYXN0UG9pbnQueCwgbGFzdFBvaW50LnksIHgsIHksIHJnYmEpO1xuICAgICAgICBwdXNoSGlzdG9yeSgpO1xuICAgICAgICBzZXRMYXN0UG9pbnQoeyB4LCB5IH0pO1xuICAgICAgICBzZXREcmF3aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZHJhd1BpeGVsKGN0eCwgeCwgeSwgcmdiYSk7XG4gICAgICBzZXRMYXN0UG9pbnQoeyB4LCB5IH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZSkgPT4ge1xuICAgIGlmICghZHJhd2luZykgcmV0dXJuO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0UGl4ZWxDb29yZHMoZSk7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAodG9vbCA9PT0gXCJwZW5jaWxcIiB8fCB0b29sID09PSBcImJydXNoXCIgfHwgdG9vbCA9PT0gXCJlcmFzZXJcIikge1xuICAgICAgY29uc3QgcmdiYSA9IHRvb2wgPT09IFwiZXJhc2VyXCIgPyBbMCwgMCwgMCwgMF0gOiBoZXhUb1JnYmEoY29sb3IpO1xuICAgICAgLy8gU2hpZnQtY29uc3RyYWluZWQgZHJhd2luZzogbG9jayB0byBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gICAgICBsZXQgZHJhd1ggPSB4LGRyYXdZID0geTtcbiAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGRyYXdTdGFydCkge1xuICAgICAgICBjb25zdCBkeCA9IE1hdGguYWJzKHggLSBkcmF3U3RhcnQueCk7XG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoeSAtIGRyYXdTdGFydC55KTtcbiAgICAgICAgaWYgKGR4ID4gZHkpIHtcbiAgICAgICAgICBkcmF3WSA9IGRyYXdTdGFydC55OyAvLyBob3Jpem9udGFsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhd1ggPSBkcmF3U3RhcnQueDsgLy8gdmVydGljYWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gRHJhdyBzbW9vdGggbGluZSBmcm9tIGxhc3QgcG9pbnQgdG8gY3VycmVudCBwb2ludCBmb3IgY29udGludW91cyBzdHJva2VzXG4gICAgICBpZiAobGFzdFBvaW50KSB7XG4gICAgICAgIGRyYXdTbW9vdGhMaW5lKGN0eCwgbGFzdFBvaW50LngsIGxhc3RQb2ludC55LCBkcmF3WCwgZHJhd1ksIHJnYmEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhd1BpeGVsKGN0eCwgZHJhd1gsIGRyYXdZLCByZ2JhKTtcbiAgICAgIH1cbiAgICAgIHNldExhc3RQb2ludCh7IHg6IGRyYXdYLCB5OiBkcmF3WSB9KTtcbiAgICB9XG4gIH07XG5cblxuXG5cblxuICBjb25zdCBoYW5kbGVDYW52YXNNb3VzZU1vdmUgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0UGl4ZWxDb29yZHMoZSk7XG4gICAgc2V0Q3Vyc29yUG9zKHsgeCwgeSB9KTtcbiAgICBoYW5kbGVNb3VzZU1vdmUoZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VVcCA9IChlKSA9PiB7XG4gICAgaWYgKCFkcmF3aW5nKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBnZXRQaXhlbENvb3JkcyhlKTtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHJnYmEgPSBoZXhUb1JnYmEoY29sb3IpO1xuICAgIGlmICh0b29sID09PSBcImxpbmVcIiAmJiBkcmF3U3RhcnQpIHtkcmF3TGluZShjdHgsIGRyYXdTdGFydC54LCBkcmF3U3RhcnQueSwgeCwgeSwgcmdiYSk7c2V0TGFzdFBvaW50KHsgeCwgeSB9KTt9IGVsc2VcbiAgICBpZiAodG9vbCA9PT0gXCJyZWN0XCIgJiYgZHJhd1N0YXJ0KSB7ZHJhd1JlY3QoY3R4LCBkcmF3U3RhcnQueCwgZHJhd1N0YXJ0LnksIHgsIHksIHJnYmEpO30gZWxzZVxuICAgIGlmICh0b29sID09PSBcImNpcmNsZVwiICYmIGRyYXdTdGFydCkge1xuICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5tYXgoMSwgTWF0aC5zcXJ0KE1hdGgucG93KHggLSBkcmF3U3RhcnQueCwgMikgKyBNYXRoLnBvdyh5IC0gZHJhd1N0YXJ0LnksIDIpKSk7XG4gICAgICBkcmF3Q2lyY2xlKGN0eCwgZHJhd1N0YXJ0LngsIGRyYXdTdGFydC55LCBNYXRoLmZsb29yKHJhZGl1cyksIHJnYmEsIGUuc2hpZnRLZXkpO1xuICAgIH0gZWxzZVxuICAgIGlmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiYnJ1c2hcIiB8fCB0b29sID09PSBcImVyYXNlclwiKSB7c2V0TGFzdFBvaW50KHsgeCwgeSB9KTt9XG4gICAgcHVzaEhpc3RvcnkoKTtcbiAgICBzZXREcmF3aW5nKGZhbHNlKTtcbiAgICBzZXREcmF3U3RhcnQobnVsbCk7XG4gIH07XG5cblxuXG4gIGNvbnN0IGhhbmRsZUZsaXBIb3Jpem9udGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgIGNvbnN0IG5ld0RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBDQU5WQVNfU0laRTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IENBTlZBU19TSVpFOyB4KyspIHtcbiAgICAgICAgY29uc3QgcyA9ICh5ICogQ0FOVkFTX1NJWkUgKyB4KSAqIDQ7XG4gICAgICAgIGNvbnN0IGQgPSAoeSAqIENBTlZBU19TSVpFICsgKENBTlZBU19TSVpFIC0gMSAtIHgpKSAqIDQ7XG4gICAgICAgIG5ld0RhdGEuZGF0YVtkXSA9IGltYWdlRGF0YS5kYXRhW3NdO25ld0RhdGEuZGF0YVtkICsgMV0gPSBpbWFnZURhdGEuZGF0YVtzICsgMV07XG4gICAgICAgIG5ld0RhdGEuZGF0YVtkICsgMl0gPSBpbWFnZURhdGEuZGF0YVtzICsgMl07bmV3RGF0YS5kYXRhW2QgKyAzXSA9IGltYWdlRGF0YS5kYXRhW3MgKyAzXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShuZXdEYXRhLCAwLCAwKTtcbiAgICBwdXNoSGlzdG9yeSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlGcm9tRGlyID0gKGZyb21EaXIpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkSGVybyB8fCBmcm9tRGlyID09PSBzZWxlY3RlZERpcikgcmV0dXJuO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gZ2V0SGVyb1Nwcml0ZShzZWxlY3RlZEhlcm9JZCwgZnJvbURpcik7XG4gICAgaWYgKCFleGlzdGluZykgcmV0dXJuO1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO3B1c2hIaXN0b3J5KCk7fTtcbiAgICBpbWcuc3JjID0gZXhpc3Rpbmc7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlSGVybyA9ICgpID0+IHtcbiAgICBpZiAoIW5ld0hlcm9OYW1lLnRyaW0oKSkgcmV0dXJuO1xuICAgIGNvbnN0IGhlcm8gPSBjcmVhdGVOZXdIZXJvKG5ld0hlcm9OYW1lLnRyaW0oKSk7XG4gICAgc2F2ZUN1c3RvbUhlcm8oaGVybyk7XG4gICAgY29uc3QgdXBkYXRlZCA9IGdldEFsbEN1c3RvbUhlcm9lcygpO1xuICAgIHNldEhlcm9lcyh1cGRhdGVkKTtcbiAgICBzZXRTZWxlY3RlZEhlcm9JZChoZXJvLmlkKTtcbiAgICBzZXROZXdIZXJvTmFtZShcIlwiKTtcbiAgICBzZXRTaG93TmV3Rm9ybShmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlSGVybyA9IChpZCkgPT4ge1xuICAgIGlmICghY29uZmlybShcIkRlbGV0ZSB0aGlzIGhlcm8gdGVtcGxhdGU/XCIpKSByZXR1cm47XG4gICAgZGVsZXRlQ3VzdG9tSGVybyhpZCk7XG4gICAgY29uc3QgdXBkYXRlZCA9IGdldEFsbEN1c3RvbUhlcm9lcygpO1xuICAgIHNldEhlcm9lcyh1cGRhdGVkKTtcbiAgICBpZiAoc2VsZWN0ZWRIZXJvSWQgPT09IGlkKSBzZXRTZWxlY3RlZEhlcm9JZCh1cGRhdGVkWzBdPy5pZCB8fCBudWxsKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5U2l6ZSA9IENBTlZBU19TSVpFOyAvLyBjYW52YXMgRE9NIHNpemUgaXMgZml4ZWQ7IHpvb20gaXMgQ1NTIHRyYW5zZm9ybSBvbmx5XG5cbiAgY29uc3QgaGFuZGxlQ2FudmFzV2hlZWwgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRab29tKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBmYWN0b3IgPSBlLmRlbHRhWSA8IDAgPyAxLjEgOiAxIC8gMS4xO1xuICAgICAgcmV0dXJuIE1hdGgubWF4KDAuMywgTWF0aC5taW4ocHJldiAqIGZhY3RvciwgMTYpKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTUyOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotWzExMF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODVcIj5cbiAgICAgIHtzaG93UHVibGlzaENvbmZpcm0gJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTU0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU1NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgcC01IHctWzM0MHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMTExN1wiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNmNTllMGJcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTU2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bMTBweF0gdGV4dC15ZWxsb3ctNDAwIG1iLTJcIj5TRU5EIFRPIEdBTUU/PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU1NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXdoaXRlIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c2VsZWN0ZWRIZXJvPy5pZCB8fCBzZWxlY3RlZEhlcm8/Ll9pZH0+e3NlbGVjdGVkSGVybz8ubmFtZX0g4oCUIHtzZWxlY3RlZERpcn0gKHtESVJFQ1RJT05fTEFCRUxTW3NlbGVjdGVkRGlyXX0pPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU1ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItNFwiPlxuICAgICAgICAgICAgICBUaGlzIGhlcm8gc3ByaXRlIHdpbGwgcmVuZGVyIGluLWdhbWUgb24gdGhlIEhlcm8gQmFzZSB0aWxlIHdoZW4gc3RhdGlvbmVkLiBUaGUgaGVybyBhbHdheXMgcmVuZGVycyBhYm92ZSB0aGUgYnVpbGRpbmcuIFBlcnNpc3RzIGFmdGVyIHJlbG9hZC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1NjE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTYyOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1B1Ymxpc2hDb25maXJtKGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJnLXNsYXRlLTcwMFwiIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzMzNDE1NVwiIH19PlxuICAgICAgICAgICAgICAgIENBTkNFTFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1NjY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgICBpZiAoY2FudmFzICYmIHNlbGVjdGVkSGVyb0lkICYmIHNlbGVjdGVkRGlyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgICAgICAgICAgcHVibGlzaEhlcm9TcHJpdGUoc2VsZWN0ZWRIZXJvSWQsIHNlbGVjdGVkRGlyLCBkYXRhVXJsLCBhY3RpdmVWYXJpYW50KTtcbiAgICAgICAgICAgICAgICBpbnZhbGlkYXRlUHVibGlzaGVkSGVyb0NhY2hlKHNlbGVjdGVkSGVyb0lkLCBzZWxlY3RlZERpciwgYWN0aXZlVmFyaWFudCk7XG4gICAgICAgICAgICAgICAgc2V0SXNQdWJsaXNoZWQodHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0U2hvd1B1Ymxpc2hDb25maXJtKGZhbHNlKTtcbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtYmxhY2tcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNmNTllMGJcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjZmJiZjI0XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJhY3RpdmVWYXJpYW50XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2lkfT5cbiAgICAgICAgICAgICAgICDinJMgU0VORCBUTyBHQU1FICh7YWN0aXZlVmFyaWFudH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1ODI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNiNDUzMDlcIiwgd2lkdGg6IFwiMTAwdndcIiwgaGVpZ2h0OiBcIjEwMHZoXCIgfX0+XG4gICAgICAgIHsvKiBUaXRsZSBiYXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTg0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS0yIGJvcmRlci1iXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQxZVwiLCBiYWNrZ3JvdW5kOiBcIiMxMzEzMGFcIiB9fT5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1ODU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIHRleHQteWVsbG93LTQwMFwiPvCfprggSEVSTyBDUkVBVE9SIOKAlCBERVYgTU9ERTwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU4NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1ODc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPkF1dG8tc2F2ZXMgZXZlcnkgc3Ryb2tlPC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1ODg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtoYW5kbGVVbmRvfSB0aXRsZT1cIlVuZG8gKENtZCtaKVwiIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48Um90YXRlQ2N3IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU4ODoxMzZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTR9IC8+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU4OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZVJlZG99IHRpdGxlPVwiUmVkbyAoQ21kK1NoaWZ0K1opXCIgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPjxSb3RhdGVDdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1ODk6MTQyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE0fSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAge3NlbGVjdGVkSGVybyAmJlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1OTE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UHVibGlzaENvbmZpcm0odHJ1ZSl9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IGlzUHVibGlzaGVkID8gXCIjMTQ1MzJkXCIgOiBcIiMxZTNhNWZcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7aXNQdWJsaXNoZWQgPyBcIiM0YWRlODBcIiA6IFwiI2Y1OWUwYlwifWAsIGNvbG9yOiBpc1B1Ymxpc2hlZCA/IFwiIzRhZGU4MFwiIDogXCIjZmJiZjI0XCIgfX0+XG4gICAgICAgICAgICAgICAgPFNlbmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTkyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezExfSAvPntpc1B1Ymxpc2hlZCA/IFwiTElWRVwiIDogXCJTRU5EIFRPIEdBTUVcIn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjU5NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dWYXJpYW50TW9kYWwodHJ1ZSl9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzJkMmQxZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNiNDUzMDlcIiwgY29sb3I6IFwiI2ZiYmYyNFwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiYWN0aXZlVmFyaWFudFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+XG4gICAgICAgICAgICAgIPCfk4sge2FjdGl2ZVZhcmlhbnR9IDxDaGV2cm9uRG93biBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo1OTY6MzNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTB9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NTk4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWQgJiYgc2VsZWN0ZWREaXIpIHtcbiAgICAgICAgICAgICAgICBzZXRUZW1wbGF0ZU5hbWUoXCJcIik7XG4gICAgICAgICAgICAgICAgc2V0U2hvd1NhdmVUZW1wbGF0ZUNvbmZpcm0odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBmNzY2ZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxNGI4YTZcIiwgY29sb3I6IFwiI2ZmZlwiIH19PlxuICAgICAgICAgICAgICDwn5K+IFNBVkUgQVMgVEVNUExBVEVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge2F2YWlsYWJsZVRlbXBsYXRlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYwNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2MDg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TG9hZFRlbXBsYXRlQ29uZmlybSh0cnVlKX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMyBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMDU5NjY5XCIsIGJvcmRlcjogXCIxcHggc29saWQgIzEwYjk4MVwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XG4gICAgICAgICAgICAgICAgICDwn5OCIExPQUQgVEVNUExBVEVcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYxMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2MTM6MTEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYxNzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LTEgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgey8qIExlZnQ6IEhlcm8gbGlzdCAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYxOToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgYm9yZGVyLXIgb3ZlcmZsb3cteS1hdXRvXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQxZVwiLCBiYWNrZ3JvdW5kOiBcIiMxMzEzMGFcIiwgd2lkdGg6IDE2MCB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjIwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMiBwdC0yIHBiLTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYyMToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC15ZWxsb3ctNjAwXCI+SEVST0VTPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYyMjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dOZXdGb3JtKCh2KSA9PiAhdil9IGNsYXNzTmFtZT1cInAtMC41IHJvdW5kZWQgaG92ZXI6YmcteWVsbG93LTkwMC8zMCB0ZXh0LXllbGxvdy01MDBcIj48UGx1cyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2MjI6MTI3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7c2hvd05ld0Zvcm0gJiZcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjI1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMiBwYi0yIGZsZXggZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjI2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgYXV0b0ZvY3VzIHZhbHVlPXtuZXdIZXJvTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdIZXJvTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikgaGFuZGxlQ3JlYXRlSGVybygpO2lmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0U2hvd05ld0Zvcm0oZmFsc2UpO319XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSGVybyBuYW1lLi4uXCIgY2xhc3NOYW1lPVwiZmxleC0xIHB4LTEgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC11aSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJkMWVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjQ1MzA5XCIsIGNvbG9yOiBcIiNmYmJmMjRcIiB9fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjMwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlQ3JlYXRlSGVyb30gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtWzlweF0gZm9udC1waXhlbCB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjYjQ1MzA5XCIgfX0+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjMzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICB7aGVyb2VzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYzNDozOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJweC0yIHB5LTMgZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCB0ZXh0LWNlbnRlclwiPk5vIGhlcm9lcyB5ZXQuPGJyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYzNDoxMjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz5DbGljayArIHRvIGNyZWF0ZS48L2Rpdj59XG4gICAgICAgICAgICAgIHtoZXJvZXMubWFwKChoKSA9PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjYzNjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aC5pZH0gY2xhc3NOYW1lPVwiZ3JvdXAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0xLjUgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBzZWxlY3RlZEhlcm9JZCA9PT0gaC5pZCA/IFwiIzJkMmExMFwiIDogXCJ0cmFuc3BhcmVudFwiIH19XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkSGVyb0lkKGguaWQpfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWR9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2Mzk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY0MDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0cnVuY2F0ZVwiIHN0eWxlPXt7IGNvbG9yOiBzZWxlY3RlZEhlcm9JZCA9PT0gaC5pZCA/IFwiI2ZiYmYyNFwiIDogXCIjYWFhXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkfT57aC5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY0MToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTYwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicmFyaXR5XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2g/LmlkfT57aC5yYXJpdHl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjQzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO2hhbmRsZURlbGV0ZUhlcm8oaC5pZCk7fX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgcC0wLjUgcm91bmRlZCBob3ZlcjpiZy1yZWQtOTAwLzQwIHRleHQtcmVkLTUwMFwiIHRpdGxlPVwiRGVsZXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjQ1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIERpcmVjdGlvbiBwcmV2aWV3cyAqL31cbiAgICAgICAgICAgIHtzZWxlY3RlZEhlcm8gJiZcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjUzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYm9yZGVyLXQgcC0yXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQxZVwiIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjU0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXllbGxvdy02MDAgbWItMVwiPkRJUkVDVElPTlM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY1NToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTAuNVwiPlxuICAgICAgICAgICAgICAgICAge1tcIk5XXCIsIFwiTlwiLCBcIk5FXCIsIFwiV1wiLCBudWxsLCBcIkVcIiwgXCJTV1wiLCBcIlNcIiwgXCJTRVwiXS5tYXAoKGRpciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCFkaXIpIHJldHVybiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY1NzozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gZGF0YS1hcnItaW5kZXg9e2l9IC8+O1xuICAgICAgICAgICAgICAgICAgY29uc3QgdGh1bWIgPSBkaXJUaHVtYnNbZGlyXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjYwOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtkaXJ9IG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkRGlyKGRpcil9IHRpdGxlPXtESVJFQ1RJT05fTEFCRUxTW2Rpcl19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogMzQsIGhlaWdodDogMzQsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogc2VsZWN0ZWREaXIgPT09IGRpciA/IFwiI2I0NTMwOVwiIDogdGh1bWIgPyBcIiMyZDJhMTBcIiA6IFwiIzFhMWEwZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3NlbGVjdGVkRGlyID09PSBkaXIgPyBcIiNmNTllMGJcIiA6IHRodW1iID8gXCIjYjQ1MzA5XCIgOiBcIiMzMzNcIn1gXG4gICAgICAgICAgICAgICAgICAgIH19IGRhdGEtYXJyLWluZGV4PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aHVtYiA/XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2Njc6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e3RodW1ifSBhbHQ9e2Rpcn0gc3R5bGU9e3sgd2lkdGg6IDI4LCBoZWlnaHQ6IDI4LCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBkYXRhLWFyci1pbmRleD17aX0gLz4gOlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY2ODoyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bNnB4XVwiIHN0eWxlPXt7IGNvbG9yOiBzZWxlY3RlZERpciA9PT0gZGlyID8gXCIjZmZmXCIgOiBcIiM1NTVcIiB9fSBkYXRhLWFyci1pbmRleD17aX0+e2Rpcn08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG5cbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTGVmdCB0b29scyBzaWRlYmFyICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6Njc4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMyBwLTIgYm9yZGVyLXIgb3ZlcmZsb3cteS1hdXRvXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJkMmQxZVwiLCBiYWNrZ3JvdW5kOiBcIiMxMzEzMGFcIiwgbWluV2lkdGg6IFwiNzhweFwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2Nzk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2ODA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQteWVsbG93LTYwMCBtYi0xXCI+VE9PTFM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2ODE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAge1RPT0xTLm1hcCgodCwgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjY4MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17dC5pZH0gb25DbGljaz17KCkgPT4gc2V0VG9vbCh0LmlkKX0gdGl0bGU9e3QudGl0bGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIHRleHQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHRvb2wgPT09IHQuaWQgPyBcIiNiNDUzMDlcIiA6IFwiIzJkMmQxZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHt0b29sID09PSB0LmlkID8gXCIjZjU5ZTBiXCIgOiBcIiMzZDNkMmVcIn1gIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0Py5pZH0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJUT09MU1wiIGRhdGEtYXJyLWZpZWxkPVwibGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAge3QubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2OTE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo2OTI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC15ZWxsb3ctNjAwIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImJydXNoU2l6ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+U0laRToge2JydXNoU2l6ZX1weDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NjkzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICAgIG1heD1cIjIwMFwiXG4gICAgICAgICAgICAgIHZhbHVlPXticnVzaFNpemV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QnJ1c2hTaXplKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTZcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJkMWVcIiwgYWNjZW50Q29sb3I6IFwiI2I0NTMwOVwiIH19IC8+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjcwMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjcwNDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC15ZWxsb3ctNjAwIG1iLTFcIj5aT09NPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzA1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB0ZXh0LWNlbnRlclwiPnsoem9vbSAqIDEwMCkudG9GaXhlZCgwKX0lPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzA2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTYwMCB0ZXh0LWNlbnRlciBtdC0wLjVcIj5zY3JvbGwgdG8gem9vbTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjcwODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtjb25zdCBjdHggPSBjYW52YXNSZWYuY3VycmVudD8uZ2V0Q29udGV4dChcIjJkXCIpO2lmIChjdHgpIHtjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7cHVzaEhpc3RvcnkoKTt9fX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXJlZC00MDAgaG92ZXI6YmctcmVkLTkwMC8zMFwiIHN0eWxlPXt7IGJvcmRlcjogXCIxcHggc29saWQgIzdmMWQxZFwiIH19PlxuICAgICAgICAgICAgICBDTEVBUlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2VudGVyOiBDYW52YXMgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3MTU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0IHAtMyBnYXAtMiBvdmVyZmxvdy1hdXRvIGZsZXgtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMGQxYVwiIH19PlxuICAgICAgICAgICAge3NlbGVjdGVkSGVybyA/XG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzE4OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzE5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtzZWxlY3RlZEhlcm8/LmlkIHx8IHNlbGVjdGVkSGVybz8uX2lkfT57c2VsZWN0ZWRIZXJvLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzIwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs4cHhdIHB4LTIgcHktMC41IHJvdW5kZWRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMyZDJhMTBcIiwgY29sb3I6IFwiI2Y1OWUwYlwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2VsZWN0ZWREaXJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PntzZWxlY3RlZERpcn0g4oCUIHtESVJFQ1RJT05fTEFCRUxTW3NlbGVjdGVkRGlyXX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3MjI6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzIzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5Db3B5IGZyb206PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge0RJUkVDVElPTlMuZmlsdGVyKChkKSA9PiBkICE9PSBzZWxlY3RlZERpcikubWFwKChkKSA9PlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzI1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtkfSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5RnJvbURpcihkKX0gZGlzYWJsZWQ9eyFkaXJUaHVtYnNbZF19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC1bOXB4XSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogZGlyVGh1bWJzW2RdID8gXCIjMmQyYTEwXCIgOiBcIiMxMTFcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7ZGlyVGh1bWJzW2RdID8gXCIjYjQ1MzA5XCIgOiBcIiMyMjJcIn1gLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IGRpclRodW1ic1tkXSA/IFwiI2ZiYmYyNFwiIDogXCIjNDQ0XCIsIGN1cnNvcjogZGlyVGh1bWJzW2RdID8gXCJwb2ludGVyXCIgOiBcIm5vdC1hbGxvd2VkXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2R9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjczMjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZUZsaXBIb3Jpem9udGFsfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC1bOXB4XSB0ZXh0LWJsdWUtMzAwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDFhMmVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMWU0MGFmXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxGbGlwSG9yaXpvbnRhbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3MzQ6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTB9IC8+IEZsaXAgSFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjczNjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtjb25zdCBrZXkgPSBgaGVyb19zcHJpdGVzXyR7c2VsZWN0ZWRIZXJvfV8ke3NlbGVjdGVkRGlyfWA7Y29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7aWYgKGRhdGEpIHtsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgaGVyb19jbGlwYm9hcmRfJHtzZWxlY3RlZEhlcm99YCwgZGF0YSk7fX19IGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC11aSB0ZXh0LVs5cHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMDA4NGZmXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzAwNTVjY1wiLCBjb2xvcjogXCIjZmZmXCIgfX0+8J+TiyBDT1BZPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjczNzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYGhlcm9fY2xpcGJvYXJkXyR7c2VsZWN0ZWRIZXJvfWApO2lmIChkYXRhKSB7Y29uc3Qga2V5ID0gYGhlcm9fc3ByaXRlc18ke3NlbGVjdGVkSGVyb0lkfV8ke3NlbGVjdGVkRGlyfWA7bG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTthdXRvU2F2ZVNwcml0ZShzZWxlY3RlZEhlcm9JZCwgc2VsZWN0ZWREaXIsIGNhbnZhc1JlZi5jdXJyZW50KTtzZXRJc1B1Ymxpc2hlZChpc1B1Ymxpc2hlZEhlcm8oc2VsZWN0ZWRIZXJvSWQsIHNlbGVjdGVkRGlyKSk7fX19IGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC11aSB0ZXh0LVs5cHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMDBiMzc5XCIsIGJvcmRlcjogXCIxcHggc29saWQgIzAwODQ0YVwiLCBjb2xvcjogXCIjZmZmXCIgfX0+8J+TpSBQQVNURTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3NDA6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLCB3aWR0aDogZGlzcGxheVNpemUsIGhlaWdodDogZGlzcGxheVNpemUsIHRyYW5zZm9ybTogYHNjYWxlKCR7em9vbX0pYCwgdHJhbnNmb3JtT3JpZ2luOiBcInRvcCBjZW50ZXJcIiwgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gMC4wNXMgZWFzZS1vdXRcIiB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzQxOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgaW5zZXQ6IDAsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2JyUzRSUzQ3JlY3Qgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nJTIzNTU1Jy8lM0UlM0NyZWN0IHg9JzgnIHk9JzgnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyUyMzU1NScvJTNFJTNDcmVjdCB4PSc4JyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSclMjMzMzMnLyUzRSUzQ3JlY3QgeT0nOCcgd2lkdGg9JzgnIGhlaWdodD0nOCcgZmlsbD0nJTIzMzMzJy8lM0UlM0Mvc3ZnJTNFXFxcIilcIixcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiBgMTZweGAgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDxjYW52YXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzQ0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcmVmPXtjYW52YXNSZWZ9IHdpZHRoPXtDQU5WQVNfU0laRX0gaGVpZ2h0PXtDQU5WQVNfU0laRX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCwgd2lkdGg6IGRpc3BsYXlTaXplLCBoZWlnaHQ6IGRpc3BsYXlTaXplLCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIixcbiAgICAgICAgICAgICAgICAgIGN1cnNvcjogdG9vbCA9PT0gXCJleWVkcm9wcGVyXCIgPyBcImNyb3NzaGFpclwiIDogdG9vbCA9PT0gXCJidWNrZXRcIiA/IFwiY2VsbFwiIDogXCJjcm9zc2hhaXJcIiB9fVxuICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd259IG9uTW91c2VNb3ZlPXtoYW5kbGVDYW52YXNNb3VzZU1vdmV9IG9uTW91c2VVcD17aGFuZGxlTW91c2VVcH1cbiAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHtpZiAoZHJhd2luZykge3B1c2hIaXN0b3J5KCk7c2V0RHJhd2luZyhmYWxzZSk7fX19XG4gICAgICAgICAgICAgICAgb25XaGVlbD17aGFuZGxlQ2FudmFzV2hlZWx9IC8+XG4gICAgICAgICAgICAgICAgICB7em9vbSA+PSAyICYmXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3NTE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBpbnNldDogMCwgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQocmdiYSgyNTUsMjU1LDI1NSwwLjA0KSAxcHgsdHJhbnNwYXJlbnQgMXB4KSxsaW5lYXItZ3JhZGllbnQoOTBkZWcscmdiYSgyNTUsMjU1LDI1NSwwLjA0KSAxcHgsdHJhbnNwYXJlbnQgMXB4KWAsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogYDFweCAxcHhgIH19IC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgey8qIEN1cnNvciBvdXRsaW5lIHJpbmcgZm9yIGRyYXdpbmcgdG9vbHMgKi99XG4gICAgICAgICAgICAgICAgICB7Y3Vyc29yUG9zICYmICh0b29sID09PSBcInBlbmNpbFwiIHx8IHRvb2wgPT09IFwiYnJ1c2hcIiB8fCB0b29sID09PSBcImVyYXNlclwiIHx8IHRvb2wgPT09IFwiY2lyY2xlXCIpICYmXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3NTc6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IGN1cnNvclBvcy54LFxuICAgICAgICAgICAgICAgICAgdG9wOiBjdXJzb3JQb3MueSxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBicnVzaFNpemUsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IGJydXNoU2l6ZSxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke3Rvb2wgPT09IFwiZXJhc2VyXCIgPyBcIiNlZjQ0NDRcIiA6IGNvbG9yfWAsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCA0cHggJHt0b29sID09PSBcImVyYXNlclwiID8gXCIjZWY0NDQ0XCIgOiBjb2xvcn0sIDAgMCA4cHggJHt0b29sID09PSBcImVyYXNlclwiID8gXCIjZWY0NDQ0ODhcIiA6IGNvbG9yICsgXCI4OFwifWBcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjc3MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS02MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgQ21kK1o6IFVuZG8gwrcgQ21kK1NoaWZ0K1o6IFJlZG8gwrcgU2hpZnQrQ2xpY2s6IFN0cmFpZ2h0IGxpbmVcbiAgICAgICAgICAgICAgICAgIHtsYXN0UG9pbnQgJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzczOjMyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTYwMFwiPiDCtyDil48gYW5jaG9yIHNldDwvc3Bhbj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvPiA6XG5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6Nzc3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGgtNjQgdGV4dC1zbGF0ZS01MDAgZm9udC11aSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgQ3JlYXRlIG9yIHNlbGVjdCBhIGhlcm8gdG8gc3RhcnQgZHJhd2luZy5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQ6IENvbG9ycyAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjc4NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIgcC0yIGJvcmRlci1sIG92ZXJmbG93LXktYXV0b1wiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiMyZDJkMWVcIiwgYmFja2dyb3VuZDogXCIjMTMxMzBhXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjc4NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC15ZWxsb3ctNjAwIG1iLTFcIj5DT0xPUjwvZGl2PlxuICAgICAgICAgICAgPFNwZWN0cnVtQ29sb3JQaWNrZXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6Nzg2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY29sb3I9e2NvbG9yID09PSBcInRyYW5zcGFyZW50XCIgPyBcIiMwMDAwMDBcIiA6IGNvbG9yfSBvbkNoYW5nZT17KGMpID0+IHNldENvbG9yKGMpfSAvPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo3ODc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQteWVsbG93LTYwMCBtdC0xIG1iLTFcIj5QQUxFVFRFPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjc4ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ2FwLTAuNVwiIHN0eWxlPXt7IGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDgsMWZyKVwiIH19PlxuICAgICAgICAgICAgICB7UEFMRVRURS5tYXAoKGMsIGkpID0+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6NzkwOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBvbkNsaWNrPXsoKSA9PiBzZXRDb2xvcihjKX0gdGl0bGU9e2N9IGNsYXNzTmFtZT1cInJvdW5kZWQtc20gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogMTgsIGhlaWdodDogMTgsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYyA9PT0gXCJ0cmFuc3BhcmVudFwiID9cbiAgICAgICAgICAgICAgICBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnJTNFJTNDcmVjdCB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPSclMjNhYWEnLyUzRSUzQ3JlY3QgeD0nNCcgeT0nNCcgd2lkdGg9JzQnIGhlaWdodD0nNCcgZmlsbD0nJTIzYWFhJy8lM0UlM0NyZWN0IHg9JzQnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnIGZpbGw9JyUyM2ZmZicvJTNFJTNDcmVjdCB5PSc0JyB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPSclMjNmZmYnLyUzRSUzQy9zdmclM0VcXFwiKVwiIDpcbiAgICAgICAgICAgICAgICBjLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogY29sb3IgPT09IGMgPyBcIjJweCBzb2xpZCAjZjU5ZTBiXCIgOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIixcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiBjb2xvciA9PT0gYyA/IFwiMXB4IHNvbGlkICNiNDUzMDlcIiA6IFwibm9uZVwiIH19IGRhdGEtYXJyLWluZGV4PXtpfSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUEFMRVRURVwiIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFNhdmUgVGVtcGxhdGUgQ29uZmlybSBNb2RhbCAqL31cbiAgICAgIHtzaG93U2F2ZVRlbXBsYXRlQ29uZmlybSAmJlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4MDU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84MFwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODA2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZC14bCBwLTUgdy1bNDAwcHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgIzE0YjhhNlwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4MDc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIHRleHQtdGVhbC00MDAgbWItM1wiPvCfkr4gU0FWRSBBUyBURU1QTEFURTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4MDg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItMlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2VsZWN0ZWREaXJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICBTYXZlIGN1cnJlbnQge3NlbGVjdGVkRGlyfSBkaXJlY3Rpb24gc3ByaXRlIGFzIGEgcmV1c2FibGUgdGVtcGxhdGU/XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODExOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtYi0zXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJNQVhfVEVNUExBVEVTX1BFUl9ESVJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aWR9PlxuICAgICAgICAgICAgICBUZW1wbGF0ZXMgYXJlIGRpcmVjdGlvbi1zcGVjaWZpYyBhbmQgY2FuIGJlIGxvYWRlZCBmb3IgYW55IG5ldyBoZXJvIGZhY2luZyB0aGlzIGRpcmVjdGlvbi5cbiAgICAgICAgICAgICAgTWF4IHtNQVhfVEVNUExBVEVTX1BFUl9ESVJ9IHRlbXBsYXRlcyBwZXIgZGlyZWN0aW9uLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODE1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICB2YWx1ZT17dGVtcGxhdGVOYW1lfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGVtcGxhdGVOYW1lKGUudGFyZ2V0LnZhbHVlLnNsaWNlKDAsIDUwKSl9XG4gICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge2lmIChlLmtleSA9PT0gXCJFbnRlclwiKSBoYW5kbGVTYXZlQXNUZW1wbGF0ZSgpO2lmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0U2hvd1NhdmVUZW1wbGF0ZUNvbmZpcm0oZmFsc2UpO319XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUZW1wbGF0ZSBuYW1lIChvcHRpb25hbClcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZCBmb250LXVpIHRleHQtc20gb3V0bGluZS1ub25lIG1iLTNcIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMGQxYVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMzMzNcIiwgY29sb3I6IFwiI2ZmZlwiIH19IC8+XG4gICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjgyNDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4MjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U2F2ZVRlbXBsYXRlQ29uZmlybShmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICM0NDRcIiB9fT5cbiAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODI5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlU2F2ZUFzVGVtcGxhdGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMDU5NjY5XCIsIGJvcmRlcjogXCIxcHggc29saWQgIzEwYjk4MVwiIH19PlxuICAgICAgICAgICAgICAgIFNBVkUgVEVNUExBVEVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHsvKiBMb2FkIFRlbXBsYXRlIE1vZGFsICovfVxuICAgICAge3Nob3dMb2FkVGVtcGxhdGVDb25maXJtICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjg0MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4NDE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHAtNSB3LVs0NTBweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxYTFhMmVcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjMDU5NjY5XCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjg0MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LWdyZWVuLTQwMCBtYi0zXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJzZWxlY3RlZERpclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+8J+TgiBMT0FEIFRFTVBMQVRFIOKAlCB7c2VsZWN0ZWREaXJ9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjg0MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItM1wiPlxuICAgICAgICAgICAgICBTZWxlY3QgYSB0ZW1wbGF0ZSB0byBsb2FkLiBUaGlzIHdpbGwgcmVwbGFjZSB0aGUgY3VycmVudCBjYW52YXMuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4NDc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdhcC0yIG1iLTQgbWF4LWgtWzQwMHB4XSBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBncmlkVGVtcGxhdGVDb2x1bW5zOiBcInJlcGVhdCgyLCAxZnIpXCIgfX0+XG4gICAgICAgICAgICAgIHthdmFpbGFibGVUZW1wbGF0ZXMubWFwKCh0ZW1wbGF0ZSkgPT5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODQ5OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIGtleT17dGVtcGxhdGUuaWR9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVMb2FkVGVtcGxhdGUodGVtcGxhdGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBwLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdHJhbnNpdGlvbi1hbGwgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiIzJkMmQxZVwiLFxuICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkICMzZDNkMmVcIlxuICAgICAgICAgICAgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3RlbXBsYXRlPy5pZH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJkYXRhVXJsXCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGltZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4NTg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e3RlbXBsYXRlLmRhdGFVcmx9IGFsdD1cIlwiIHN0eWxlPXt7IHdpZHRoOiA0OCwgaGVpZ2h0OiA0OCwgaW1hZ2VSZW5kZXJpbmc6IFwicGl4ZWxhdGVkXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzQ0NFwiIH19IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjg1OToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODYwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtd2hpdGUgdHJ1bmNhdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dGVtcGxhdGU/LmlkfT57dGVtcGxhdGUubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4NjE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bmV3IERhdGUodGVtcGxhdGUuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4Njk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODcwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd0xvYWRUZW1wbGF0ZUNvbmZpcm0oZmFsc2UpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtNzAwXCIgc3R5bGU9e3sgYm9yZGVyOiBcIjFweCBzb2xpZCAjNDQ0XCIgfX0+XG4gICAgICAgICAgICAgICAgQ0xPU0VcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHsvKiBWYXJpYW50IE1hbmFnZXIgTW9kYWwgKi99XG4gICAgICB7c2hvd1ZhcmlhbnRNb2RhbCAmJlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4ODE6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84MFwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODgyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZC14bCBwLTUgdy1bNDAwcHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgI2I0NTMwOVwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4ODM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF0gdGV4dC15ZWxsb3ctNDAwIG1iLTNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c2VsZWN0ZWRIZXJvPy5pZCB8fCBzZWxlY3RlZEhlcm8/Ll9pZH0+VkFSSUFOVFMg4oCUIHtzZWxlY3RlZEhlcm8/Lm5hbWV9IHtzZWxlY3RlZERpcn08L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4ODU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo4ODY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1ZhciA9IGNyZWF0ZU5ld0hlcm9WYXJpYW50KHNlbGVjdGVkSGVyb0lkLCBzZWxlY3RlZERpcik7XG4gICAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRzID0gZ2V0SGVyb1ZhcmlhbnRzKHNlbGVjdGVkSGVyb0lkLCBzZWxlY3RlZERpcik7XG4gICAgICAgICAgICAgIHNldFZhcmlhbnRMaXN0KHZhcmlhbnRzLmxlbmd0aCA+IDAgPyB2YXJpYW50cyA6IFtcImRlZmF1bHRcIl0pO1xuICAgICAgICAgICAgICBzZXRBY3RpdmVWYXJpYW50U3RhdGUobmV3VmFyKTtcbiAgICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgaWYgKGN0eCkge2N0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTX1NJWkUsIENBTlZBU19TSVpFKTtwdXNoSGlzdG9yeSgpO31cbiAgICAgICAgICAgIH19IGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwNTk2NjlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMTBiOTgxXCIgfX0+XG4gICAgICAgICAgICAgICAgPFBsdXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODk0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+TkVXIFZBUklBTlRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6ODk2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd1ZhcmlhbnRNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICM0NDRcIiB9fT5cbiAgICAgICAgICAgICAgICBDTE9TRVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjkwMjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ2FwLTIgbWItNFwiIHN0eWxlPXt7IGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDIsIDFmcilcIiB9fT5cbiAgICAgICAgICAgICAge3ZhcmlhbnRMaXN0Lm1hcCgodmFySWQpID0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9DcmVhdG9yOjkwNDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBrZXk9e3ZhcklkfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRBY3RpdmVWYXJpYW50U3RhdGUodmFySWQpO1xuICAgICAgICAgICAgICAvLyBMb2FkIHRoaXMgdmFyaWFudCdzIHNwcml0ZVxuICAgICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IGdldEhlcm9TcHJpdGUoc2VsZWN0ZWRIZXJvSWQsIHNlbGVjdGVkRGlyLCB2YXJJZCk7XG4gICAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhc1JlZi5jdXJyZW50Py5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtjdHguY2xlYXJSZWN0KDAsIDAsIENBTlZBU19TSVpFLCBDQU5WQVNfU0laRSk7Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO3B1c2hIaXN0b3J5KCk7fTtcbiAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBleGlzdGluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBDQU5WQVNfU0laRSwgQ0FOVkFTX1NJWkUpO1xuICAgICAgICAgICAgICAgICAgcHVzaEhpc3RvcnkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gUmVmcmVzaCB0aHVtYm5haWxzXG4gICAgICAgICAgICAgIHNldERpclRodW1icyhnZXRBbGxIZXJvU3ByaXRlc0ZvclR5cGUoc2VsZWN0ZWRIZXJvSWQsIHZhcklkKSk7XG4gICAgICAgICAgICAgIHNldFNob3dWYXJpYW50TW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0yIGZvbnQtdWkgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnRcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogYWN0aXZlVmFyaWFudCA9PT0gdmFySWQgPyBcIiNiNDUzMDlcIiA6IFwiIzJkMmQxZVwiLFxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHthY3RpdmVWYXJpYW50ID09PSB2YXJJZCA/IFwiI2Y1OWUwYlwiIDogXCIjM2QzZDJlXCJ9YCxcbiAgICAgICAgICAgICAgY29sb3I6IGFjdGl2ZVZhcmlhbnQgPT09IHZhcklkID8gXCIjZmZmXCIgOiBcIiNhYWFcIlxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo5MzI6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3I6OTMzOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YXJJZFwiPnt2YXJJZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVWYXJpYW50ID09PSB2YXJJZCAmJiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvcjo5MzQ6NDhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi00MDAgdGV4dC1bMTBweF1cIj7inJMgQUNUSVZFPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2dhbWUvSGVyb0NyZWF0b3IuanN4In0=