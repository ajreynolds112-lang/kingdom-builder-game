import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/SpectrumColorPicker.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/SpectrumColorPicker.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useCallback = __vite__cjsImport3_react["useCallback"];
function hsvToRgb(h, s, v) {
  const i = Math.floor(h / 60) % 6;
  const f = h / 60 - Math.floor(h / 60);
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const map = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i];
  return map.map((x) => Math.round(x * 255));
}
function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else
      h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s, v];
}
function hexToRgb(hex) {
  if (!hex || hex === "transparent") return [255, 0, 0];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}
function rgbToHex(r, g, b) {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
export default function SpectrumColorPicker({ color, onChange, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const spectrumRef = useRef(null);
  const hueRef = useRef(null);
  const dragTypeRef = useRef(null);
  const [r, g, b] = hexToRgb(color);
  const [hue, sat, val] = rgbToHsv(r, g, b);
  const hueColor = rgbToHex(...hsvToRgb(hue, 1, 1));
  useEffect(() => {
    const canvas = spectrumRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const gradH = ctx.createLinearGradient(0, 0, w, 0);
    gradH.addColorStop(0, "#ffffff");
    gradH.addColorStop(1, hueColor);
    ctx.fillStyle = gradH;
    ctx.fillRect(0, 0, w, h);
    const gradV = ctx.createLinearGradient(0, 0, 0, h);
    gradV.addColorStop(0, "rgba(0,0,0,0)");
    gradV.addColorStop(1, "#000000");
    ctx.fillStyle = gradV;
    ctx.fillRect(0, 0, w, h);
  }, [hueColor]);
  useEffect(() => {
    const canvas = hueRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    const stops = [0, 60, 120, 180, 240, 300, 360];
    stops.forEach((deg) => {
      const [rr, gg, bb] = hsvToRgb(deg, 1, 1);
      grad.addColorStop(deg / 360, `rgb(${rr},${gg},${bb})`);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, []);
  const pickFromSpectrum = useCallback((e) => {
    const canvas = spectrumRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width - 1, (e.clientX - rect.left) * canvas.width / rect.width));
    const y = Math.max(0, Math.min(canvas.height - 1, (e.clientY - rect.top) * canvas.height / rect.height));
    const newS = x / canvas.width;
    const newV = 1 - y / canvas.height;
    const [rr, gg, bb] = hsvToRgb(hue, newS, newV);
    onChange(rgbToHex(rr, gg, bb));
  }, [hue, onChange]);
  const pickFromHue = useCallback((e) => {
    const canvas = hueRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width - 1, (e.clientX - rect.left) * canvas.width / rect.width));
    const newHue = x / canvas.width * 360;
    const [rr, gg, bb] = hsvToRgb(newHue, sat, val);
    onChange(rgbToHex(rr, gg, bb));
  }, [sat, val, onChange]);
  const handleMouseDown = (type) => (e) => {
    dragTypeRef.current = type;
    if (type === "spectrum") pickFromSpectrum(e);
    else
      pickFromHue(e);
  };
  useEffect(() => {
    const onMove = (e) => {
      if (!dragTypeRef.current) return;
      if (dragTypeRef.current === "spectrum") pickFromSpectrum(e);
      else
        pickFromHue(e);
    };
    const onUp = () => {
      dragTypeRef.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [pickFromSpectrum, pickFromHue]);
  const cursorX = sat * 180;
  const cursorY = (1 - val) * 120;
  const hueX = hue / 360 * 180;
  const hexVal = color && color !== "transparent" ? color.toUpperCase() : "#000000";
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:132:4", "data-dynamic-content": "true", className: "flex flex-col gap-2", style: { width: 184 }, "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:134:6", "data-dynamic-content": "true", className: "relative", style: { width: 180, height: 120 }, children: [
      /* @__PURE__ */ jsxDEV(
        "canvas",
        {
          "data-source-location": "components/game/SpectrumColorPicker:135:8",
          "data-dynamic-content": "true",
          ref: spectrumRef,
          width: 180,
          height: 120,
          className: "rounded",
          style: { cursor: "crosshair", display: "block" },
          onMouseDown: handleMouseDown("spectrum")
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
          lineNumber: 154,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:144:8", "data-dynamic-content": "true", style: {
        position: "absolute",
        left: cursorX - 6,
        top: cursorY - 6,
        width: 12,
        height: 12,
        borderRadius: "50%",
        border: "2px solid white",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
        pointerEvents: "none",
        background: color
      } }, void 0, false, {
        fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
        lineNumber: 163,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:158:6", "data-dynamic-content": "true", className: "relative", style: { width: 180, height: 14 }, children: [
      /* @__PURE__ */ jsxDEV(
        "canvas",
        {
          "data-source-location": "components/game/SpectrumColorPicker:159:8",
          "data-dynamic-content": "true",
          ref: hueRef,
          width: 180,
          height: 14,
          className: "rounded",
          style: { cursor: "crosshair", display: "block" },
          onMouseDown: handleMouseDown("hue")
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
          lineNumber: 178,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:168:8", "data-dynamic-content": "true", style: {
        position: "absolute",
        left: hueX - 6,
        top: 1,
        width: 12,
        height: 12,
        borderRadius: "50%",
        border: "2px solid white",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
        background: hueColor,
        pointerEvents: "none"
      } }, void 0, false, {
        fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
        lineNumber: 187,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
      lineNumber: 177,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:182:6", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/SpectrumColorPicker:183:8", "data-dynamic-content": "true", className: "w-7 h-7 rounded border border-white/20 flex-shrink-0", style: { background: color } }, void 0, false, {
        fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
        lineNumber: 202,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          "data-source-location": "components/game/SpectrumColorPicker:184:8",
          "data-dynamic-content": "true",
          value: hexVal,
          onChange: (e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
          },
          className: "flex-1 px-2 py-1 rounded font-pixel text-[8px] text-white uppercase",
          style: { background: "#0d0d1a", border: "1px solid #4c1d95" },
          maxLength: 7
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
          lineNumber: 203,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
      lineNumber: 201,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/SpectrumColorPicker.jsx",
    lineNumber: 151,
    columnNumber: 5
  }, this);
}
_s(SpectrumColorPicker, "qvD874sRqI3rnmHWs8+eniBjTO0=");
_c = SpectrumColorPicker;
var _c;
$RefreshReg$(_c, "SpectrumColorPicker");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/SpectrumColorPicker.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/SpectrumColorPicker.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QyxFQUFHMkIsVUFBUzNCLENBQUM7QUFBQSxVQUM3QztBQUFBLFVBQ0EsV0FBVTtBQUFBLFVBQ1YsT0FBTyxFQUFFeUYsWUFBWSxXQUFXSCxRQUFRLG9CQUFvQjtBQUFBLFVBQzVELFdBQVc7QUFBQTtBQUFBLFFBUlg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BUWE7QUFBQSxTQVZmO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FZQTtBQUFBLE9BOURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0ErREE7QUFFSjtBQUFDekQsR0E3SnVCSixxQkFBbUI7QUFBQSxLQUFuQkE7QUFBbUIsSUFBQW9FO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlRWZmZWN0IiwidXNlQ2FsbGJhY2siLCJoc3ZUb1JnYiIsImgiLCJzIiwidiIsImkiLCJNYXRoIiwiZmxvb3IiLCJmIiwicCIsInEiLCJ0IiwibWFwIiwieCIsInJvdW5kIiwicmdiVG9Ic3YiLCJyIiwiZyIsImIiLCJtYXgiLCJtaW4iLCJkIiwiaGV4VG9SZ2IiLCJoZXgiLCJwYXJzZUludCIsInNsaWNlIiwicmdiVG9IZXgiLCJ0b1N0cmluZyIsInBhZFN0YXJ0IiwiU3BlY3RydW1Db2xvclBpY2tlciIsImNvbG9yIiwib25DaGFuZ2UiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX3MiLCJzcGVjdHJ1bVJlZiIsImh1ZVJlZiIsImRyYWdUeXBlUmVmIiwiaHVlIiwic2F0IiwidmFsIiwiaHVlQ29sb3IiLCJjYW52YXMiLCJjdXJyZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsInciLCJ3aWR0aCIsImhlaWdodCIsImdyYWRIIiwiY3JlYXRlTGluZWFyR3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImdyYWRWIiwiZ3JhZCIsInN0b3BzIiwiZm9yRWFjaCIsImRlZyIsInJyIiwiZ2ciLCJiYiIsInBpY2tGcm9tU3BlY3RydW0iLCJlIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJsZWZ0IiwieSIsImNsaWVudFkiLCJ0b3AiLCJuZXdTIiwibmV3ViIsInBpY2tGcm9tSHVlIiwibmV3SHVlIiwiaGFuZGxlTW91c2VEb3duIiwidHlwZSIsIm9uTW92ZSIsIm9uVXAiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnNvclgiLCJjdXJzb3JZIiwiaHVlWCIsImhleFZhbCIsInRvVXBwZXJDYXNlIiwiY3Vyc29yIiwiZGlzcGxheSIsInBvc2l0aW9uIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyIiwiYm94U2hhZG93IiwicG9pbnRlckV2ZW50cyIsImJhY2tncm91bmQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRlc3QiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJTcGVjdHJ1bUNvbG9yUGlja2VyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5cbmZ1bmN0aW9uIGhzdlRvUmdiKGgsIHMsIHYpIHtcbiAgY29uc3QgaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG4gIGNvbnN0IGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gIGNvbnN0IHAgPSB2ICogKDEgLSBzKTtcbiAgY29uc3QgcSA9IHYgKiAoMSAtIGYgKiBzKTtcbiAgY29uc3QgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKTtcbiAgY29uc3QgbWFwID0gW1t2LCB0LCBwXSwgW3EsIHYsIHBdLCBbcCwgdiwgdF0sIFtwLCBxLCB2XSwgW3QsIHAsIHZdLCBbdiwgcCwgcV1dW2ldO1xuICByZXR1cm4gbWFwLm1hcCgoeCkgPT4gTWF0aC5yb3VuZCh4ICogMjU1KSk7XG59XG5cbmZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcbiAgciAvPSAyNTU7ZyAvPSAyNTU7YiAvPSAyNTU7XG4gIGNvbnN0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICBjb25zdCBkID0gbWF4IC0gbWluO1xuICBjb25zdCBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXg7XG4gIGNvbnN0IHYgPSBtYXg7XG4gIGxldCBoID0gMDtcbiAgaWYgKGQgIT09IDApIHtcbiAgICBpZiAobWF4ID09PSByKSBoID0gKChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApKSAvIDY7ZWxzZVxuICAgIGlmIChtYXggPT09IGcpIGggPSAoKGIgLSByKSAvIGQgKyAyKSAvIDY7ZWxzZVxuICAgIGggPSAoKHIgLSBnKSAvIGQgKyA0KSAvIDY7XG4gIH1cbiAgcmV0dXJuIFtoICogMzYwLCBzLCB2XTtcbn1cblxuZnVuY3Rpb24gaGV4VG9SZ2IoaGV4KSB7XG4gIGlmICghaGV4IHx8IGhleCA9PT0gXCJ0cmFuc3BhcmVudFwiKSByZXR1cm4gWzI1NSwgMCwgMF07XG4gIGNvbnN0IHIgPSBwYXJzZUludChoZXguc2xpY2UoMSwgMyksIDE2KTtcbiAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zbGljZSgzLCA1KSwgMTYpO1xuICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDUsIDcpLCAxNik7XG4gIHJldHVybiBbciwgZywgYl07XG59XG5cbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgcmV0dXJuIGAjJHtyLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIil9JHtnLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIil9JHtiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIil9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BlY3RydW1Db2xvclBpY2tlcih7IGNvbG9yLCBvbkNoYW5nZSwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgY29uc3Qgc3BlY3RydW1SZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGh1ZVJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgZHJhZ1R5cGVSZWYgPSB1c2VSZWYobnVsbCk7IC8vIFwic3BlY3RydW1cIiB8IFwiaHVlXCJcblxuICBjb25zdCBbciwgZywgYl0gPSBoZXhUb1JnYihjb2xvcik7XG4gIGNvbnN0IFtodWUsIHNhdCwgdmFsXSA9IHJnYlRvSHN2KHIsIGcsIGIpO1xuXG4gIGNvbnN0IGh1ZUNvbG9yID0gcmdiVG9IZXgoLi4uaHN2VG9SZ2IoaHVlLCAxLCAxKSk7XG5cbiAgLy8gRHJhdyBzcGVjdHJ1bSBncmFkaWVudCBvbiBjYW52YXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBzcGVjdHJ1bVJlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoLGggPSBjYW52YXMuaGVpZ2h0O1xuICAgIC8vIFdoaXRlLXRvLWh1ZSBob3Jpem9udGFsIGdyYWRpZW50XG4gICAgY29uc3QgZ3JhZEggPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgdywgMCk7XG4gICAgZ3JhZEguYWRkQ29sb3JTdG9wKDAsIFwiI2ZmZmZmZlwiKTtcbiAgICBncmFkSC5hZGRDb2xvclN0b3AoMSwgaHVlQ29sb3IpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBncmFkSDtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG4gICAgLy8gVHJhbnNwYXJlbnQtdG8tYmxhY2sgdmVydGljYWwgZ3JhZGllbnRcbiAgICBjb25zdCBncmFkViA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBoKTtcbiAgICBncmFkVi5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDAsMCwwLDApXCIpO1xuICAgIGdyYWRWLmFkZENvbG9yU3RvcCgxLCBcIiMwMDAwMDBcIik7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRWO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3LCBoKTtcbiAgfSwgW2h1ZUNvbG9yXSk7XG5cbiAgLy8gRHJhdyBodWUgYmFyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gaHVlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGgsaCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgY29uc3QgZ3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB3LCAwKTtcbiAgICBjb25zdCBzdG9wcyA9IFswLCA2MCwgMTIwLCAxODAsIDI0MCwgMzAwLCAzNjBdO1xuICAgIHN0b3BzLmZvckVhY2goKGRlZykgPT4ge1xuICAgICAgY29uc3QgW3JyLCBnZywgYmJdID0gaHN2VG9SZ2IoZGVnLCAxLCAxKTtcbiAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKGRlZyAvIDM2MCwgYHJnYigke3JyfSwke2dnfSwke2JifSlgKTtcbiAgICB9KTtcbiAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwaWNrRnJvbVNwZWN0cnVtID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBzcGVjdHJ1bVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGNhbnZhcy53aWR0aCAtIDEsIChlLmNsaWVudFggLSByZWN0LmxlZnQpICogY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihjYW52YXMuaGVpZ2h0IC0gMSwgKGUuY2xpZW50WSAtIHJlY3QudG9wKSAqIGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodCkpO1xuICAgIGNvbnN0IG5ld1MgPSB4IC8gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IG5ld1YgPSAxIC0geSAvIGNhbnZhcy5oZWlnaHQ7XG4gICAgY29uc3QgW3JyLCBnZywgYmJdID0gaHN2VG9SZ2IoaHVlLCBuZXdTLCBuZXdWKTtcbiAgICBvbkNoYW5nZShyZ2JUb0hleChyciwgZ2csIGJiKSk7XG4gIH0sIFtodWUsIG9uQ2hhbmdlXSk7XG5cbiAgY29uc3QgcGlja0Zyb21IdWUgPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGh1ZVJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGNhbnZhcy53aWR0aCAtIDEsIChlLmNsaWVudFggLSByZWN0LmxlZnQpICogY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IG5ld0h1ZSA9IHggLyBjYW52YXMud2lkdGggKiAzNjA7XG4gICAgY29uc3QgW3JyLCBnZywgYmJdID0gaHN2VG9SZ2IobmV3SHVlLCBzYXQsIHZhbCk7XG4gICAgb25DaGFuZ2UocmdiVG9IZXgocnIsIGdnLCBiYikpO1xuICB9LCBbc2F0LCB2YWwsIG9uQ2hhbmdlXSk7XG5cbiAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKHR5cGUpID0+IChlKSA9PiB7XG4gICAgZHJhZ1R5cGVSZWYuY3VycmVudCA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwic3BlY3RydW1cIikgcGlja0Zyb21TcGVjdHJ1bShlKTtlbHNlXG4gICAgcGlja0Zyb21IdWUoZSk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbk1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFkcmFnVHlwZVJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoZHJhZ1R5cGVSZWYuY3VycmVudCA9PT0gXCJzcGVjdHJ1bVwiKSBwaWNrRnJvbVNwZWN0cnVtKGUpO2Vsc2VcbiAgICAgIHBpY2tGcm9tSHVlKGUpO1xuICAgIH07XG4gICAgY29uc3Qgb25VcCA9ICgpID0+IHtkcmFnVHlwZVJlZi5jdXJyZW50ID0gbnVsbDt9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uVXApO1xuICAgIHJldHVybiAoKSA9PiB7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3ZlKTt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgb25VcCk7fTtcbiAgfSwgW3BpY2tGcm9tU3BlY3RydW0sIHBpY2tGcm9tSHVlXSk7XG5cbiAgLy8gQ3Vyc29yIHBvc2l0aW9uc1xuICBjb25zdCBjdXJzb3JYID0gc2F0ICogMTgwO1xuICBjb25zdCBjdXJzb3JZID0gKDEgLSB2YWwpICogMTIwO1xuICBjb25zdCBodWVYID0gaHVlIC8gMzYwICogMTgwO1xuXG4gIGNvbnN0IGhleFZhbCA9IGNvbG9yICYmIGNvbG9yICE9PSBcInRyYW5zcGFyZW50XCIgPyBjb2xvci50b1VwcGVyQ2FzZSgpIDogXCIjMDAwMDAwXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTMyOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yXCIgc3R5bGU9e3sgd2lkdGg6IDE4NCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICB7LyogU3BlY3RydW0gKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTM0OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiIHN0eWxlPXt7IHdpZHRoOiAxODAsIGhlaWdodDogMTIwIH19PlxuICAgICAgICA8Y2FudmFzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTM1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICByZWY9e3NwZWN0cnVtUmVmfVxuICAgICAgICB3aWR0aD17MTgwfVxuICAgICAgICBoZWlnaHQ9ezEyMH1cbiAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZFwiXG4gICAgICAgIHN0eWxlPXt7IGN1cnNvcjogXCJjcm9zc2hhaXJcIiwgZGlzcGxheTogXCJibG9ja1wiIH19XG4gICAgICAgIG9uTW91c2VEb3duPXtoYW5kbGVNb3VzZURvd24oXCJzcGVjdHJ1bVwiKX0gLz5cbiAgICAgICAgXG4gICAgICAgIHsvKiBDdXJzb3IgZG90ICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTQ0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgbGVmdDogY3Vyc29yWCAtIDYsXG4gICAgICAgICAgdG9wOiBjdXJzb3JZIC0gNixcbiAgICAgICAgICB3aWR0aDogMTIsIGhlaWdodDogMTIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgIGJvcmRlcjogXCIycHggc29saWQgd2hpdGVcIixcbiAgICAgICAgICBib3hTaGFkb3c6IFwiMCAwIDAgMXB4IHJnYmEoMCwwLDAsMC41KVwiLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yXG4gICAgICAgIH19IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEh1ZSBiYXIgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTU4OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiIHN0eWxlPXt7IHdpZHRoOiAxODAsIGhlaWdodDogMTQgfX0+XG4gICAgICAgIDxjYW52YXMgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvU3BlY3RydW1Db2xvclBpY2tlcjoxNTk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIHJlZj17aHVlUmVmfVxuICAgICAgICB3aWR0aD17MTgwfVxuICAgICAgICBoZWlnaHQ9ezE0fVxuICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkXCJcbiAgICAgICAgc3R5bGU9e3sgY3Vyc29yOiBcImNyb3NzaGFpclwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfX1cbiAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bihcImh1ZVwiKX0gLz5cbiAgICAgICAgXG4gICAgICAgIHsvKiBIdWUgY3Vyc29yICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1NwZWN0cnVtQ29sb3JQaWNrZXI6MTY4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgbGVmdDogaHVlWCAtIDYsXG4gICAgICAgICAgdG9wOiAxLFxuICAgICAgICAgIHdpZHRoOiAxMiwgaGVpZ2h0OiAxMixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjJweCBzb2xpZCB3aGl0ZVwiLFxuICAgICAgICAgIGJveFNoYWRvdzogXCIwIDAgMCAxcHggcmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgICAgICAgYmFja2dyb3VuZDogaHVlQ29sb3IsXG4gICAgICAgICAgcG9pbnRlckV2ZW50czogXCJub25lXCJcbiAgICAgICAgfX0gLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGV4IGRpc3BsYXkgKyBwcmV2aWV3ICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TcGVjdHJ1bUNvbG9yUGlja2VyOjE4Mjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TcGVjdHJ1bUNvbG9yUGlja2VyOjE4Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy03IGgtNyByb3VuZGVkIGJvcmRlciBib3JkZXItd2hpdGUvMjAgZmxleC1zaHJpbmstMFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IGNvbG9yIH19IC8+XG4gICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TcGVjdHJ1bUNvbG9yUGlja2VyOjE4NDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgdmFsdWU9e2hleFZhbH1cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdiA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIGlmICgvXiNbMC05YS1mQS1GXXs2fSQvLnRlc3QodikpIG9uQ2hhbmdlKHYpO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHgtMiBweS0xIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGUgdXBwZXJjYXNlXCJcbiAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGQwZDFhXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzRjMWQ5NVwiIH19XG4gICAgICAgIG1heExlbmd0aD17N30gLz5cbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2dhbWUvU3BlY3RydW1Db2xvclBpY2tlci5qc3gifQ==