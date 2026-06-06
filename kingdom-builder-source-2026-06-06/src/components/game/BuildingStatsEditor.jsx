import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/BuildingStatsEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/BuildingStatsEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { X, RotateCcw } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { BUILDING_DEFS, getUpgradeCost, getBuildingMaxHP } from "/src/lib/gameConstants.js";
const STORAGE_KEY_HP = "building_hp_overrides_v1";
const STORAGE_KEY_TIME = "building_time_overrides_v1";
const STORAGE_KEY_COST = "building_cost_overrides_v1";
const TABS = ["HP", "Upgrade Time", "Cost"];
const BUILDING_TYPES = Object.keys(BUILDING_DEFS);
_c = BUILDING_TYPES;
const MAX_LEVELS = 30;
function loadOverrides(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}
function saveOverrides(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export default function BuildingStatsEditor({ onClose }) {
  _s();
  const [activeTab, setActiveTab] = useState("HP");
  const [selectedType, setSelectedType] = useState(BUILDING_TYPES[0]);
  const [hpOverrides, setHpOverrides] = useState(loadOverrides(STORAGE_KEY_HP));
  const [timeOverrides, setTimeOverrides] = useState(loadOverrides(STORAGE_KEY_TIME));
  const [costOverrides, setCostOverrides] = useState(loadOverrides(STORAGE_KEY_COST));
  const key = (type, level) => `${type}__${level}`;
  const getBaseVal = (type, level) => {
    if (activeTab === "HP") return getBuildingMaxHP(type, level);
    const base = getUpgradeCost(type, level - 1);
    if (activeTab === "Upgrade Time") return base.seconds;
    const def2 = BUILDING_DEFS[type];
    return def2?.costCurrency === "mana" ? base.mana : base.gold;
  };
  const getOverrides = () => {
    if (activeTab === "HP") return hpOverrides;
    if (activeTab === "Upgrade Time") return timeOverrides;
    return costOverrides;
  };
  const setOverride = (type, level, val) => {
    const k = key(type, level);
    const parsed = val === "" ? void 0 : Number(val);
    if (activeTab === "HP") setHpOverrides((prev) => {
      const n = { ...prev };
      parsed == null ? delete n[k] : n[k] = parsed;
      saveOverrides(STORAGE_KEY_HP, n);
      return n;
    });
    else if (activeTab === "Upgrade Time") setTimeOverrides((prev) => {
      const n = { ...prev };
      parsed == null ? delete n[k] : n[k] = parsed;
      saveOverrides(STORAGE_KEY_TIME, n);
      return n;
    });
    else
      setCostOverrides((prev) => {
        const n = { ...prev };
        parsed == null ? delete n[k] : n[k] = parsed;
        saveOverrides(STORAGE_KEY_COST, n);
        return n;
      });
  };
  const handleReset = () => {
    const k_all = BUILDING_TYPES.flatMap((t) => Array.from({ length: MAX_LEVELS }, (_, i) => key(t, i + 1)));
    if (activeTab === "HP") {
      const n = { ...hpOverrides };
      k_all.filter((k) => k.startsWith(selectedType)).forEach((k) => delete n[k]);
      setHpOverrides(n);
    } else if (activeTab === "Upgrade Time") {
      const n = { ...timeOverrides };
      k_all.filter((k) => k.startsWith(selectedType)).forEach((k) => delete n[k]);
      setTimeOverrides(n);
    } else {
      const n = { ...costOverrides };
      k_all.filter((k) => k.startsWith(selectedType)).forEach((k) => delete n[k]);
      setCostOverrides(n);
    }
  };
  const overrides = getOverrides();
  const def = BUILDING_DEFS[selectedType];
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:71:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:72:6", "data-dynamic-content": "true", className: "rounded-xl overflow-hidden flex flex-col", style: { width: 820, maxHeight: "90vh", background: "#0d1117", border: "2px solid #2563eb", boxShadow: "0 0 40px rgba(37,99,235,0.3)" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:74:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-3 border-b", style: { borderColor: "#2563eb44", background: "rgba(0,0,0,0.5)" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:75:10", "data-dynamic-content": "false", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:76:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-blue-400", children: "BUILDING STATS EDITOR" }, void 0, false, {
          fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
          lineNumber: 95,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:77:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400", children: "Override HP, upgrade times, and costs per level" }, void 0, false, {
          fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
          lineNumber: 96,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingStatsEditor:79:10", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/BuildingStatsEditor:79:80", "data-dynamic-content": "false", size: 20 }, void 0, false, {
        fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
        lineNumber: 98,
        columnNumber: 174
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
      lineNumber: 93,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:83:8", "data-dynamic-content": "true", className: "flex border-b", style: { borderColor: "#2563eb44" }, children: TABS.map(
      (tab, __arrIdx__) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/BuildingStatsEditor:85:12",
          "data-dynamic-content": "true",
          onClick: () => setActiveTab(tab),
          className: "px-5 py-2 font-pixel text-[8px] transition-colors",
          style: { color: activeTab === tab ? "#60a5fa" : "#64748b", borderBottom: activeTab === tab ? "2px solid #3b82f6" : "2px solid transparent" },
          "data-arr-index": __arrIdx__,
          "data-arr-variable-name": "TABS",
          children: tab.toUpperCase()
        },
        tab,
        false,
        {
          fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
          lineNumber: 104,
          columnNumber: 11
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:93:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:95:10", "data-dynamic-content": "true", className: "w-44 border-r overflow-y-auto flex-shrink-0", style: { borderColor: "#1e293b", background: "#080c12" }, children: BUILDING_TYPES.map(
        (type) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/BuildingStatsEditor:97:14",
            "data-dynamic-content": "true",
            onClick: () => setSelectedType(type),
            className: "w-full text-left px-3 py-2 font-ui text-xs transition-colors",
            style: { background: selectedType === type ? "#1e3a5f" : "transparent", color: selectedType === type ? "#60a5fa" : "#94a3b8" },
            "data-collection-item-field": "type.icon",
            children: [
              BUILDING_DEFS[type]?.icon,
              " ",
              BUILDING_DEFS[type]?.name
            ]
          },
          type,
          true,
          {
            fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
            lineNumber: 116,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
        lineNumber: 114,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:106:10", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:107:12", "data-dynamic-content": "true", className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:108:14", "data-dynamic-content": "true", className: "font-pixel text-[9px] text-blue-400", children: [
            def?.name?.toUpperCase(),
            " — ",
            activeTab.toUpperCase()
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
            lineNumber: 127,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:109:14", "data-dynamic-content": "true", className: "flex gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingStatsEditor:110:16", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500 self-center", children: "Auto-saves" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
              lineNumber: 129,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingStatsEditor:111:16", "data-dynamic-content": "true", onClick: handleReset, className: "flex items-center gap-1 px-3 py-1 rounded font-ui text-xs text-slate-400 hover:text-white", style: { background: "#1e293b", border: "1px solid #334155" }, children: [
              /* @__PURE__ */ jsxDEV(RotateCcw, { "data-source-location": "components/game/BuildingStatsEditor:112:18", "data-dynamic-content": "false", size: 11 }, void 0, false, {
                fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
                lineNumber: 131,
                columnNumber: 19
              }, this),
              " Reset"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
              lineNumber: 130,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
            lineNumber: 128,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
          lineNumber: 126,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:116:12", "data-dynamic-content": "true", className: "grid grid-cols-5 gap-2", children: Array.from({ length: MAX_LEVELS }, (_, i) => i + 1).map((level) => {
          if (level === 1 && activeTab !== "HP") return null;
          const k = key(selectedType, level);
          const hasOverride = overrides[k] != null;
          const baseVal = getBaseVal(selectedType, level);
          const displayVal = hasOverride ? overrides[k] : baseVal;
          return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:124:18", "data-dynamic-content": "true", className: "rounded p-2", style: { background: hasOverride ? "#0f2a4a" : "#0d1117", border: `1px solid ${hasOverride ? "#3b82f6" : "#1e293b"}` }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:125:20", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-slate-500 mb-1", "data-collection-item-field": "level", children: [
              "LV ",
              level
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
              lineNumber: 144,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/BuildingStatsEditor:126:20",
                "data-dynamic-content": "true",
                type: "number",
                value: displayVal || "",
                onChange: (e) => setOverride(selectedType, level, e.target.value),
                className: "w-full bg-transparent font-ui text-xs outline-none tabular-nums",
                style: { color: hasOverride ? "#60a5fa" : "#94a3b8" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
                lineNumber: 145,
                columnNumber: 21
              },
              this
            ),
            hasOverride && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingStatsEditor:134:22", "data-dynamic-content": "true", className: "font-ui text-[9px] text-slate-600 mt-0.5", children: [
              "base: ",
              baseVal.toLocaleString()
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
              lineNumber: 153,
              columnNumber: 21
            }, this)
          ] }, level, true, {
            fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
            lineNumber: 143,
            columnNumber: 19
          }, this);
        }).filter(Boolean) }, void 0, false, {
          fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
          lineNumber: 135,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
        lineNumber: 125,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
      lineNumber: 112,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
    lineNumber: 91,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/BuildingStatsEditor.jsx",
    lineNumber: 90,
    columnNumber: 5
  }, this);
}
_s(BuildingStatsEditor, "zUlH3Q3T/3HQD8JqeqStRH6qDCA=");
_c2 = BuildingStatsEditor;
var _c, _c2;
$RefreshReg$(_c, "BUILDING_TYPES");
$RefreshReg$(_c2, "BuildingStatsEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/BuildingStatsEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/BuildingStatsEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LGlCQVlBO0FBQUEsUUFFSixDQUFDLEVBQUUwQixPQUFPeUIsT0FBTyxLQXRCbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXVCQTtBQUFBLFdBakNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrQ0E7QUFBQSxTQS9DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBZ0RBO0FBQUEsT0FyRUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNFQSxLQXZFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBd0VBO0FBRUo7QUFBQy9ELEdBN0h1QkYscUJBQW1CO0FBQUEsTUFBbkJBO0FBQW1CLElBQUFaLElBQUE4RTtBQUFBLGFBQUE5RSxJQUFBO0FBQUEsYUFBQThFLEtBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiWCIsIlJvdGF0ZUNjdyIsIkJVSUxESU5HX0RFRlMiLCJnZXRVcGdyYWRlQ29zdCIsImdldEJ1aWxkaW5nTWF4SFAiLCJTVE9SQUdFX0tFWV9IUCIsIlNUT1JBR0VfS0VZX1RJTUUiLCJTVE9SQUdFX0tFWV9DT1NUIiwiVEFCUyIsIkJVSUxESU5HX1RZUEVTIiwiT2JqZWN0Iiwia2V5cyIsIl9jIiwiTUFYX0xFVkVMUyIsImxvYWRPdmVycmlkZXMiLCJrZXkiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2F2ZU92ZXJyaWRlcyIsImRhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiQnVpbGRpbmdTdGF0c0VkaXRvciIsIm9uQ2xvc2UiLCJfcyIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsInNlbGVjdGVkVHlwZSIsInNldFNlbGVjdGVkVHlwZSIsImhwT3ZlcnJpZGVzIiwic2V0SHBPdmVycmlkZXMiLCJ0aW1lT3ZlcnJpZGVzIiwic2V0VGltZU92ZXJyaWRlcyIsImNvc3RPdmVycmlkZXMiLCJzZXRDb3N0T3ZlcnJpZGVzIiwidHlwZSIsImxldmVsIiwiZ2V0QmFzZVZhbCIsImJhc2UiLCJzZWNvbmRzIiwiZGVmIiwiY29zdEN1cnJlbmN5IiwibWFuYSIsImdvbGQiLCJnZXRPdmVycmlkZXMiLCJzZXRPdmVycmlkZSIsInZhbCIsImsiLCJwYXJzZWQiLCJ1bmRlZmluZWQiLCJOdW1iZXIiLCJwcmV2IiwibiIsImhhbmRsZVJlc2V0Iiwia19hbGwiLCJmbGF0TWFwIiwidCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpIiwiZmlsdGVyIiwic3RhcnRzV2l0aCIsImZvckVhY2giLCJvdmVycmlkZXMiLCJ3aWR0aCIsIm1heEhlaWdodCIsImJhY2tncm91bmQiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJib3JkZXJDb2xvciIsIm1hcCIsInRhYiIsIl9fYXJySWR4X18iLCJjb2xvciIsImJvcmRlckJvdHRvbSIsInRvVXBwZXJDYXNlIiwiaWNvbiIsIm5hbWUiLCJoYXNPdmVycmlkZSIsImJhc2VWYWwiLCJkaXNwbGF5VmFsIiwiZSIsInRhcmdldCIsInZhbHVlIiwidG9Mb2NhbGVTdHJpbmciLCJCb29sZWFuIiwiX2MyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkJ1aWxkaW5nU3RhdHNFZGl0b3IuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYLCBSb3RhdGVDY3cgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBCVUlMRElOR19ERUZTLCBnZXRVcGdyYWRlQ29zdCwgZ2V0QnVpbGRpbmdNYXhIUCB9IGZyb20gXCJAL2xpYi9nYW1lQ29uc3RhbnRzXCI7XG5cbmNvbnN0IFNUT1JBR0VfS0VZX0hQID0gXCJidWlsZGluZ19ocF9vdmVycmlkZXNfdjFcIjtcbmNvbnN0IFNUT1JBR0VfS0VZX1RJTUUgPSBcImJ1aWxkaW5nX3RpbWVfb3ZlcnJpZGVzX3YxXCI7XG5jb25zdCBTVE9SQUdFX0tFWV9DT1NUID0gXCJidWlsZGluZ19jb3N0X292ZXJyaWRlc192MVwiO1xuXG5jb25zdCBUQUJTID0gW1wiSFBcIiwgXCJVcGdyYWRlIFRpbWVcIiwgXCJDb3N0XCJdO1xuY29uc3QgQlVJTERJTkdfVFlQRVMgPSBPYmplY3Qua2V5cyhCVUlMRElOR19ERUZTKTtcbmNvbnN0IE1BWF9MRVZFTFMgPSAzMDtcblxuZnVuY3Rpb24gbG9hZE92ZXJyaWRlcyhrZXkpIHtcbiAgdHJ5IHtyZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIHx8IFwie31cIik7fSBjYXRjaCB7cmV0dXJuIHt9O31cbn1cbmZ1bmN0aW9uIHNhdmVPdmVycmlkZXMoa2V5LCBkYXRhKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCdWlsZGluZ1N0YXRzRWRpdG9yKHsgb25DbG9zZSB9KSB7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZShcIkhQXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRUeXBlLCBzZXRTZWxlY3RlZFR5cGVdID0gdXNlU3RhdGUoQlVJTERJTkdfVFlQRVNbMF0pO1xuICBjb25zdCBbaHBPdmVycmlkZXMsIHNldEhwT3ZlcnJpZGVzXSA9IHVzZVN0YXRlKGxvYWRPdmVycmlkZXMoU1RPUkFHRV9LRVlfSFApKTtcbiAgY29uc3QgW3RpbWVPdmVycmlkZXMsIHNldFRpbWVPdmVycmlkZXNdID0gdXNlU3RhdGUobG9hZE92ZXJyaWRlcyhTVE9SQUdFX0tFWV9USU1FKSk7XG4gIGNvbnN0IFtjb3N0T3ZlcnJpZGVzLCBzZXRDb3N0T3ZlcnJpZGVzXSA9IHVzZVN0YXRlKGxvYWRPdmVycmlkZXMoU1RPUkFHRV9LRVlfQ09TVCkpO1xuICBjb25zdCBrZXkgPSAodHlwZSwgbGV2ZWwpID0+IGAke3R5cGV9X18ke2xldmVsfWA7XG5cbiAgY29uc3QgZ2V0QmFzZVZhbCA9ICh0eXBlLCBsZXZlbCkgPT4ge1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFwiSFBcIikgcmV0dXJuIGdldEJ1aWxkaW5nTWF4SFAodHlwZSwgbGV2ZWwpO1xuICAgIGNvbnN0IGJhc2UgPSBnZXRVcGdyYWRlQ29zdCh0eXBlLCBsZXZlbCAtIDEpO1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFwiVXBncmFkZSBUaW1lXCIpIHJldHVybiBiYXNlLnNlY29uZHM7XG4gICAgLy8gQ29zdFxuICAgIGNvbnN0IGRlZiA9IEJVSUxESU5HX0RFRlNbdHlwZV07XG4gICAgcmV0dXJuIGRlZj8uY29zdEN1cnJlbmN5ID09PSBcIm1hbmFcIiA/IGJhc2UubWFuYSA6IGJhc2UuZ29sZDtcbiAgfTtcblxuICBjb25zdCBnZXRPdmVycmlkZXMgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVRhYiA9PT0gXCJIUFwiKSByZXR1cm4gaHBPdmVycmlkZXM7XG4gICAgaWYgKGFjdGl2ZVRhYiA9PT0gXCJVcGdyYWRlIFRpbWVcIikgcmV0dXJuIHRpbWVPdmVycmlkZXM7XG4gICAgcmV0dXJuIGNvc3RPdmVycmlkZXM7XG4gIH07XG5cbiAgY29uc3Qgc2V0T3ZlcnJpZGUgPSAodHlwZSwgbGV2ZWwsIHZhbCkgPT4ge1xuICAgIGNvbnN0IGsgPSBrZXkodHlwZSwgbGV2ZWwpO1xuICAgIGNvbnN0IHBhcnNlZCA9IHZhbCA9PT0gXCJcIiA/IHVuZGVmaW5lZCA6IE51bWJlcih2YWwpO1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFwiSFBcIikgc2V0SHBPdmVycmlkZXMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IG4gPSB7IC4uLnByZXYgfTtwYXJzZWQgPT0gbnVsbCA/IGRlbGV0ZSBuW2tdIDogbltrXSA9IHBhcnNlZDtcbiAgICAgIHNhdmVPdmVycmlkZXMoU1RPUkFHRV9LRVlfSFAsIG4pO3JldHVybiBuO1xuICAgIH0pO2Vsc2VcbiAgICBpZiAoYWN0aXZlVGFiID09PSBcIlVwZ3JhZGUgVGltZVwiKSBzZXRUaW1lT3ZlcnJpZGVzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuID0geyAuLi5wcmV2IH07cGFyc2VkID09IG51bGwgPyBkZWxldGUgbltrXSA6IG5ba10gPSBwYXJzZWQ7XG4gICAgICBzYXZlT3ZlcnJpZGVzKFNUT1JBR0VfS0VZX1RJTUUsIG4pO3JldHVybiBuO1xuICAgIH0pO2Vsc2VcbiAgICBzZXRDb3N0T3ZlcnJpZGVzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuID0geyAuLi5wcmV2IH07cGFyc2VkID09IG51bGwgPyBkZWxldGUgbltrXSA6IG5ba10gPSBwYXJzZWQ7XG4gICAgICBzYXZlT3ZlcnJpZGVzKFNUT1JBR0VfS0VZX0NPU1QsIG4pO3JldHVybiBuO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGtfYWxsID0gQlVJTERJTkdfVFlQRVMuZmxhdE1hcCgodCkgPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogTUFYX0xFVkVMUyB9LCAoXywgaSkgPT4ga2V5KHQsIGkgKyAxKSkpO1xuICAgIGlmIChhY3RpdmVUYWIgPT09IFwiSFBcIikge2NvbnN0IG4gPSB7IC4uLmhwT3ZlcnJpZGVzIH07a19hbGwuZmlsdGVyKChrKSA9PiBrLnN0YXJ0c1dpdGgoc2VsZWN0ZWRUeXBlKSkuZm9yRWFjaCgoaykgPT4gZGVsZXRlIG5ba10pO3NldEhwT3ZlcnJpZGVzKG4pO30gZWxzZVxuICAgIGlmIChhY3RpdmVUYWIgPT09IFwiVXBncmFkZSBUaW1lXCIpIHtjb25zdCBuID0geyAuLi50aW1lT3ZlcnJpZGVzIH07a19hbGwuZmlsdGVyKChrKSA9PiBrLnN0YXJ0c1dpdGgoc2VsZWN0ZWRUeXBlKSkuZm9yRWFjaCgoaykgPT4gZGVsZXRlIG5ba10pO3NldFRpbWVPdmVycmlkZXMobik7fSBlbHNlXG4gICAge2NvbnN0IG4gPSB7IC4uLmNvc3RPdmVycmlkZXMgfTtrX2FsbC5maWx0ZXIoKGspID0+IGsuc3RhcnRzV2l0aChzZWxlY3RlZFR5cGUpKS5mb3JFYWNoKChrKSA9PiBkZWxldGUgbltrXSk7c2V0Q29zdE92ZXJyaWRlcyhuKTt9XG4gIH07XG5cbiAgY29uc3Qgb3ZlcnJpZGVzID0gZ2V0T3ZlcnJpZGVzKCk7XG4gIGNvbnN0IGRlZiA9IEJVSUxESU5HX0RFRlNbc2VsZWN0ZWRUeXBlXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3MTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6NzI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2xcIiBzdHlsZT17eyB3aWR0aDogODIwLCBtYXhIZWlnaHQ6IFwiOTB2aFwiLCBiYWNrZ3JvdW5kOiBcIiMwZDExMTdcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjMjU2M2ViXCIsIGJveFNoYWRvdzogXCIwIDAgNDBweCByZ2JhKDM3LDk5LDIzNSwwLjMpXCIgfX0+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3NDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTUgcHktMyBib3JkZXItYlwiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiMyNTYzZWI0NFwiLCBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC41KVwiIH19PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzEwcHhdIHRleHQtYmx1ZS00MDBcIj5CVUlMRElORyBTVEFUUyBFRElUT1I8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5PdmVycmlkZSBIUCwgdXBncmFkZSB0aW1lcywgYW5kIGNvc3RzIHBlciBsZXZlbDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo3OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjc5OjgwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezIwfSAvPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFicyAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjgzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGJvcmRlci1iXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzI1NjNlYjQ0XCIgfX0+XG4gICAgICAgICAge1RBQlMubWFwKCh0YWIsIF9fYXJySWR4X18pID0+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjg1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXt0YWJ9IG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYih0YWIpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBhY3RpdmVUYWIgPT09IHRhYiA/IFwiIzYwYTVmYVwiIDogXCIjNjQ3NDhiXCIsIGJvcmRlckJvdHRvbTogYWN0aXZlVGFiID09PSB0YWIgPyBcIjJweCBzb2xpZCAjM2I4MmY2XCIgOiBcIjJweCBzb2xpZCB0cmFuc3BhcmVudFwiIH19IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiVEFCU1wiPlxuICAgICAgICAgICAgICB7dGFiLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6OTM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC0xIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHsvKiBTaWRlYmFyICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo5NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctNDQgYm9yZGVyLXIgb3ZlcmZsb3cteS1hdXRvIGZsZXgtc2hyaW5rLTBcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMWUyOTNiXCIsIGJhY2tncm91bmQ6IFwiIzA4MGMxMlwiIH19PlxuICAgICAgICAgICAge0JVSUxESU5HX1RZUEVTLm1hcCgodHlwZSkgPT5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjo5NzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17dHlwZX0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRUeXBlKHR5cGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBweC0zIHB5LTIgZm9udC11aSB0ZXh0LXhzIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IHNlbGVjdGVkVHlwZSA9PT0gdHlwZSA/IFwiIzFlM2E1ZlwiIDogXCJ0cmFuc3BhcmVudFwiLCBjb2xvcjogc2VsZWN0ZWRUeXBlID09PSB0eXBlID8gXCIjNjBhNWZhXCIgOiBcIiM5NGEzYjhcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInR5cGUuaWNvblwiPlxuICAgICAgICAgICAgICAgIHtCVUlMRElOR19ERUZTW3R5cGVdPy5pY29ufSB7QlVJTERJTkdfREVGU1t0eXBlXT8ubmFtZX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEdyaWQgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjEwNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6MTA3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibWItMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjEwODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LWJsdWUtNDAwXCI+e2RlZj8ubmFtZT8udG9VcHBlckNhc2UoKX0g4oCUIHthY3RpdmVUYWIudG9VcHBlckNhc2UoKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjEwOToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjExMDoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIHNlbGYtY2VudGVyXCI+QXV0by1zYXZlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6MTExOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlUmVzZXR9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMSByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWUyOTNiXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzMzNDE1NVwiIH19PlxuICAgICAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yOjExMjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMX0gLz4gUmVzZXRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjoxMTY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy01IGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBNQVhfTEVWRUxTIH0sIChfLCBpKSA9PiBpICsgMSkubWFwKChsZXZlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMSAmJiBhY3RpdmVUYWIgIT09IFwiSFBcIikgcmV0dXJuIG51bGw7IC8vIG5vIHVwZ3JhZGUgY29zdCBhdCBMMVxuICAgICAgICAgICAgICAgIGNvbnN0IGsgPSBrZXkoc2VsZWN0ZWRUeXBlLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFzT3ZlcnJpZGUgPSBvdmVycmlkZXNba10gIT0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlVmFsID0gZ2V0QmFzZVZhbChzZWxlY3RlZFR5cGUsIGxldmVsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsID0gaGFzT3ZlcnJpZGUgPyBvdmVycmlkZXNba10gOiBiYXNlVmFsO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6MTI0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtsZXZlbH0gY2xhc3NOYW1lPVwicm91bmRlZCBwLTJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBoYXNPdmVycmlkZSA/IFwiIzBmMmE0YVwiIDogXCIjMGQxMTE3XCIsIGJvcmRlcjogYDFweCBzb2xpZCAke2hhc092ZXJyaWRlID8gXCIjM2I4MmY2XCIgOiBcIiMxZTI5M2JcIn1gIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6MTI1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG1iLTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxldmVsXCI+TFYge2xldmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdTdGF0c0VkaXRvcjoxMjY6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWwgfHwgXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRPdmVycmlkZShzZWxlY3RlZFR5cGUsIGxldmVsLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy10cmFuc3BhcmVudCBmb250LXVpIHRleHQteHMgb3V0bGluZS1ub25lIHRhYnVsYXItbnVtc1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBoYXNPdmVycmlkZSA/IFwiIzYwYTVmYVwiIDogXCIjOTRhM2I4XCIgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtoYXNPdmVycmlkZSAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3I6MTM0OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNjAwIG10LTAuNVwiPmJhc2U6IHtiYXNlVmFsLnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nU3RhdHNFZGl0b3IuanN4In0=