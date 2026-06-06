import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/BuildingHpEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/BuildingHpEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X, Save } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { BUILDING_DEFS } from "/src/lib/gameConstants.js";
import { getCustomBuildingHp, setCustomBuildingHp, getAllHpOverrides } from "/src/lib/buildingStats.js";
const BUILDING_TYPES = Object.keys(BUILDING_DEFS);
_c = BUILDING_TYPES;
const MAX_LEVELS = 20;
export default function BuildingHpEditor({ onClose }) {
  _s();
  const [selectedType, setSelectedType] = useState(BUILDING_TYPES[0]);
  const [overrides, setOverrides] = useState(() => getAllHpOverrides());
  const [saved, setSaved] = useState(false);
  const getKey = (type, level) => `${type}__${level}`;
  const getCurrentValue = (type, level) => overrides[getKey(type, level)] ?? "";
  const handleChange = (level, val) => {
    const key = getKey(selectedType, level);
    setOverrides((prev) => {
      const next = { ...prev };
      if (val === "" || val === null) delete next[key];
      else
        next[key] = parseInt(val, 10);
      return next;
    });
  };
  const handleSave = () => {
    const all = getAllHpOverrides();
    Object.keys(overrides).forEach((key) => {
      const [type, level] = key.split("__");
      if (overrides[key] != null && !isNaN(overrides[key])) {
        setCustomBuildingHp(type, parseInt(level), overrides[key]);
      }
    });
    for (let lvl = 1; lvl <= MAX_LEVELS; lvl++) {
      const key = getKey(selectedType, lvl);
      const val = overrides[key];
      if (val != null && !isNaN(val)) {
        setCustomBuildingHp(selectedType, lvl, val);
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  const def = BUILDING_DEFS[selectedType];
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:52:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/85", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:53:6", "data-dynamic-content": "true", className: "flex flex-col rounded-xl overflow-hidden shadow-2xl", style: { background: "#0d1117", border: "2px solid #374151", maxHeight: "90vh", width: 620 }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:55:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#1f2937", background: "#060a0f" }, children: [
      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:56:10", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-slate-300", children: "❤️ BUILDING HP EDITOR — DEV MODE" }, void 0, false, {
        fileName: "/app/src/components/game/BuildingHpEditor.jsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:57:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
        saved && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:58:22", "data-dynamic-content": "false", className: "font-ui text-xs text-green-400 animate-pulse", children: "✓ Saved!" }, void 0, false, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 77,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingHpEditor:59:12", "data-dynamic-content": "true", onClick: handleSave, className: "px-3 py-1 rounded font-pixel text-[8px] text-white", style: { background: "#374151", border: "1px solid #6b7280" }, children: [
          /* @__PURE__ */ jsxDEV(Save, { "data-source-location": "components/game/BuildingHpEditor:60:14", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
            fileName: "/app/src/components/game/BuildingHpEditor.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this),
          "SAVE ALL"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingHpEditor:62:12", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/BuildingHpEditor:62:112", "data-dynamic-content": "false", size: 16 }, void 0, false, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 81,
          columnNumber: 203
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/BuildingHpEditor.jsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/BuildingHpEditor.jsx",
      lineNumber: 74,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:66:8", "data-dynamic-content": "true", className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:68:10", "data-dynamic-content": "true", className: "flex flex-col border-r overflow-y-auto", style: { borderColor: "#1f2937", background: "#060a0f", width: 160 }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:69:12", "data-dynamic-content": "false", className: "px-2 pt-2 pb-1 font-pixel text-[7px] text-slate-500", children: "BUILDING TYPE" }, void 0, false, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 88,
          columnNumber: 13
        }, this),
        BUILDING_TYPES.map((type) => {
          const d = BUILDING_DEFS[type];
          const hasOverride = Array.from({ length: MAX_LEVELS }, (_, i) => i + 1).some((lvl) => overrides[getKey(type, lvl)] != null);
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/BuildingHpEditor:74:16",
              "data-dynamic-content": "true",
              onClick: () => setSelectedType(type),
              className: "flex items-center gap-2 px-2 py-2 text-left transition-all",
              style: { background: selectedType === type ? "#1f2937" : "transparent" },
              children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:77:18", "data-dynamic-content": "true", style: { fontSize: 14 }, "data-collection-item-field": "icon", "data-collection-item-id": d?.id || d?._id, children: d?.icon }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingHpEditor.jsx",
                  lineNumber: 96,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:78:18", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:79:20", "data-dynamic-content": "true", className: "font-ui text-xs truncate", style: { color: selectedType === type ? "#fff" : "#888" }, "data-collection-item-field": "name", "data-collection-item-id": d?.id || d?._id, children: d?.name }, void 0, false, {
                    fileName: "/app/src/components/game/BuildingHpEditor.jsx",
                    lineNumber: 98,
                    columnNumber: 21
                  }, this),
                  hasOverride && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:80:36", "data-dynamic-content": "false", className: "font-ui text-[8px] text-blue-400", children: "edited" }, void 0, false, {
                    fileName: "/app/src/components/game/BuildingHpEditor.jsx",
                    lineNumber: 99,
                    columnNumber: 37
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/BuildingHpEditor.jsx",
                  lineNumber: 97,
                  columnNumber: 19
                }, this)
              ]
            },
            type,
            true,
            {
              fileName: "/app/src/components/game/BuildingHpEditor.jsx",
              lineNumber: 93,
              columnNumber: 17
            },
            this
          );
        })
      ] }, void 0, true, {
        fileName: "/app/src/components/game/BuildingHpEditor.jsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:88:10", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-3", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:89:12", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:90:14", "data-dynamic-content": "true", style: { fontSize: 20 }, "data-collection-item-field": "icon", "data-collection-item-id": def?.id || def?._id, children: def?.icon }, void 0, false, {
            fileName: "/app/src/components/game/BuildingHpEditor.jsx",
            lineNumber: 109,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:91:14", "data-dynamic-content": "true", className: "font-ui text-sm font-bold text-white", "data-collection-item-field": "name", "data-collection-item-id": def?.id || def?._id, children: def?.name }, void 0, false, {
            fileName: "/app/src/components/game/BuildingHpEditor.jsx",
            lineNumber: 110,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:92:14", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "— override HP per level (leave blank to use default)" }, void 0, false, {
            fileName: "/app/src/components/game/BuildingHpEditor.jsx",
            lineNumber: 111,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:94:12", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: Array.from({ length: MAX_LEVELS }, (_, i) => i + 1).map((lvl) => {
          const val = getCurrentValue(selectedType, lvl);
          return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingHpEditor:98:18", "data-dynamic-content": "true", className: "flex items-center gap-2 rounded px-3 py-2", style: { background: "#0d1117", border: `1px solid ${val !== "" ? "#3b82f6" : "#1f2937"}` }, children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:99:20", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-slate-500 w-10", "data-collection-item-field": "lvl", children: [
              "Lv.",
              lvl
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingHpEditor.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/BuildingHpEditor:100:20",
                "data-dynamic-content": "true",
                type: "number",
                min: 1,
                max: 999999,
                step: 10,
                value: val,
                placeholder: "default",
                onChange: (e) => handleChange(lvl, e.target.value === "" ? "" : e.target.value),
                className: "flex-1 px-2 py-0.5 rounded font-ui text-sm outline-none text-right",
                style: { background: "#060a0f", border: `1px solid ${val !== "" ? "#3b82f6" : "#1f2937"}`, color: val !== "" ? "#60a5fa" : "#555" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/BuildingHpEditor.jsx",
                lineNumber: 119,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingHpEditor:109:20", "data-dynamic-content": "false", className: "font-ui text-[9px] text-slate-600", children: "HP" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingHpEditor.jsx",
              lineNumber: 128,
              columnNumber: 21
            }, this),
            val !== "" && /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingHpEditor:111:22", "data-dynamic-content": "true", onClick: () => handleChange(lvl, ""), className: "text-red-500 hover:text-red-400 font-ui text-[10px]", children: "×" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingHpEditor.jsx",
              lineNumber: 130,
              columnNumber: 21
            }, this)
          ] }, lvl, true, {
            fileName: "/app/src/components/game/BuildingHpEditor.jsx",
            lineNumber: 117,
            columnNumber: 19
          }, this);
        }) }, void 0, false, {
          fileName: "/app/src/components/game/BuildingHpEditor.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/BuildingHpEditor.jsx",
        lineNumber: 107,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/BuildingHpEditor.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/BuildingHpEditor.jsx",
    lineNumber: 72,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/BuildingHpEditor.jsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}
_s(BuildingHpEditor, "X2rfdid0uaiX+KG2INBmc0e8OrU=");
_c2 = BuildingHpEditor;
var _c, _c2;
$RefreshReg$(_c, "BUILDING_TYPES");
$RefreshReg$(_c2, "BuildingHpEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/BuildingHpEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/BuildingHpEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QTtBQUFBLFFBRUosQ0FBQyxLQXJCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBc0JBO0FBQUEsV0E1QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTZCQTtBQUFBLFNBbkRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FvREE7QUFBQSxPQWpFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa0VBLEtBbkVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FvRUE7QUFFSjtBQUFDdEIsR0FqSHVCRixrQkFBZ0I7QUFBQSxNQUFoQkE7QUFBZ0IsSUFBQUYsSUFBQW9EO0FBQUEsYUFBQXBELElBQUE7QUFBQSxhQUFBb0QsS0FBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJYIiwiU2F2ZSIsIkJVSUxESU5HX0RFRlMiLCJnZXRDdXN0b21CdWlsZGluZ0hwIiwic2V0Q3VzdG9tQnVpbGRpbmdIcCIsImdldEFsbEhwT3ZlcnJpZGVzIiwiQlVJTERJTkdfVFlQRVMiLCJPYmplY3QiLCJrZXlzIiwiX2MiLCJNQVhfTEVWRUxTIiwiQnVpbGRpbmdIcEVkaXRvciIsIm9uQ2xvc2UiLCJfcyIsInNlbGVjdGVkVHlwZSIsInNldFNlbGVjdGVkVHlwZSIsIm92ZXJyaWRlcyIsInNldE92ZXJyaWRlcyIsInNhdmVkIiwic2V0U2F2ZWQiLCJnZXRLZXkiLCJ0eXBlIiwibGV2ZWwiLCJnZXRDdXJyZW50VmFsdWUiLCJoYW5kbGVDaGFuZ2UiLCJ2YWwiLCJrZXkiLCJwcmV2IiwibmV4dCIsInBhcnNlSW50IiwiaGFuZGxlU2F2ZSIsImFsbCIsImZvckVhY2giLCJzcGxpdCIsImlzTmFOIiwibHZsIiwic2V0VGltZW91dCIsImRlZiIsImJhY2tncm91bmQiLCJib3JkZXIiLCJtYXhIZWlnaHQiLCJ3aWR0aCIsImJvcmRlckNvbG9yIiwibWFwIiwiZCIsImhhc092ZXJyaWRlIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImkiLCJzb21lIiwiZm9udFNpemUiLCJpZCIsIl9pZCIsImljb24iLCJjb2xvciIsIm5hbWUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJfYzIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQnVpbGRpbmdIcEVkaXRvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYLCBTYXZlIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgQlVJTERJTkdfREVGUyB9IGZyb20gXCJAL2xpYi9nYW1lQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRDdXN0b21CdWlsZGluZ0hwLCBzZXRDdXN0b21CdWlsZGluZ0hwLCBnZXRBbGxIcE92ZXJyaWRlcyB9IGZyb20gXCJAL2xpYi9idWlsZGluZ1N0YXRzXCI7XG5cbmNvbnN0IEJVSUxESU5HX1RZUEVTID0gT2JqZWN0LmtleXMoQlVJTERJTkdfREVGUyk7XG5jb25zdCBNQVhfTEVWRUxTID0gMjA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJ1aWxkaW5nSHBFZGl0b3IoeyBvbkNsb3NlIH0pIHtcbiAgY29uc3QgW3NlbGVjdGVkVHlwZSwgc2V0U2VsZWN0ZWRUeXBlXSA9IHVzZVN0YXRlKEJVSUxESU5HX1RZUEVTWzBdKTtcbiAgY29uc3QgW292ZXJyaWRlcywgc2V0T3ZlcnJpZGVzXSA9IHVzZVN0YXRlKCgpID0+IGdldEFsbEhwT3ZlcnJpZGVzKCkpO1xuICBjb25zdCBbc2F2ZWQsIHNldFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBnZXRLZXkgPSAodHlwZSwgbGV2ZWwpID0+IGAke3R5cGV9X18ke2xldmVsfWA7XG4gIGNvbnN0IGdldEN1cnJlbnRWYWx1ZSA9ICh0eXBlLCBsZXZlbCkgPT4gb3ZlcnJpZGVzW2dldEtleSh0eXBlLCBsZXZlbCldID8/IFwiXCI7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGxldmVsLCB2YWwpID0+IHtcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoc2VsZWN0ZWRUeXBlLCBsZXZlbCk7XG4gICAgc2V0T3ZlcnJpZGVzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH07XG4gICAgICBpZiAodmFsID09PSBcIlwiIHx8IHZhbCA9PT0gbnVsbCkgZGVsZXRlIG5leHRba2V5XTtlbHNlXG4gICAgICBuZXh0W2tleV0gPSBwYXJzZUludCh2YWwsIDEwKTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSAoKSA9PiB7XG4gICAgLy8gU2F2ZSBhbGwgY3VycmVudCBvdmVycmlkZXNcbiAgICBjb25zdCBhbGwgPSBnZXRBbGxIcE92ZXJyaWRlcygpO1xuICAgIC8vIE1lcmdlL3VwZGF0ZSB3aXRoIGN1cnJlbnQgc3RhdGVcbiAgICBPYmplY3Qua2V5cyhvdmVycmlkZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgW3R5cGUsIGxldmVsXSA9IGtleS5zcGxpdChcIl9fXCIpO1xuICAgICAgaWYgKG92ZXJyaWRlc1trZXldICE9IG51bGwgJiYgIWlzTmFOKG92ZXJyaWRlc1trZXldKSkge1xuICAgICAgICBzZXRDdXN0b21CdWlsZGluZ0hwKHR5cGUsIHBhcnNlSW50KGxldmVsKSwgb3ZlcnJpZGVzW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEFsc28gc2F2ZSB0aGUgY3VycmVudGx5IHZpc2libGUgb25lc1xuICAgIGZvciAobGV0IGx2bCA9IDE7IGx2bCA8PSBNQVhfTEVWRUxTOyBsdmwrKykge1xuICAgICAgY29uc3Qga2V5ID0gZ2V0S2V5KHNlbGVjdGVkVHlwZSwgbHZsKTtcbiAgICAgIGNvbnN0IHZhbCA9IG92ZXJyaWRlc1trZXldO1xuICAgICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTih2YWwpKSB7XG4gICAgICAgIHNldEN1c3RvbUJ1aWxkaW5nSHAoc2VsZWN0ZWRUeXBlLCBsdmwsIHZhbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldFNhdmVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2F2ZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBkZWYgPSBCVUlMRElOR19ERUZTW3NlbGVjdGVkVHlwZV07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NTI6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bMTEwXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84NVwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjUzOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy0yeGxcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDExMTdcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjMzc0MTUxXCIsIG1heEhlaWdodDogXCI5MHZoXCIsIHdpZHRoOiA2MjAgfX0+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo1NTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTQgcHktMiBib3JkZXItYlwiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcIiMxZjI5MzdcIiwgYmFja2dyb3VuZDogXCIjMDYwYTBmXCIgfX0+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo1NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF0gdGV4dC1zbGF0ZS0zMDBcIj7inaTvuI8gQlVJTERJTkcgSFAgRURJVE9SIOKAlCBERVYgTU9ERTwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NTc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAge3NhdmVkICYmIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NTg6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtZ3JlZW4tNDAwIGFuaW1hdGUtcHVsc2VcIj7inJMgU2F2ZWQhPC9zcGFuPn1cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo1OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZVNhdmV9IGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMzc0MTUxXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzZiNzI4MFwiIH19PlxuICAgICAgICAgICAgICA8U2F2ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjYwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+U0FWRSBBTExcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjYyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NjI6MTEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NjY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC0xIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHsvKiBCdWlsZGluZyB0eXBlIGxpc3QgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjY4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBib3JkZXItciBvdmVyZmxvdy15LWF1dG9cIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMWYyOTM3XCIsIGJhY2tncm91bmQ6IFwiIzA2MGEwZlwiLCB3aWR0aDogMTYwIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjY5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInB4LTIgcHQtMiBwYi0xIGZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMFwiPkJVSUxESU5HIFRZUEU8L2Rpdj5cbiAgICAgICAgICAgIHtCVUlMRElOR19UWVBFUy5tYXAoKHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZCA9IEJVSUxESU5HX0RFRlNbdHlwZV07XG4gICAgICAgICAgICAgIGNvbnN0IGhhc092ZXJyaWRlID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogTUFYX0xFVkVMUyB9LCAoXywgaSkgPT4gaSArIDEpLnNvbWUoKGx2bCkgPT4gb3ZlcnJpZGVzW2dldEtleSh0eXBlLCBsdmwpXSAhPSBudWxsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6NzQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBrZXk9e3R5cGV9IG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkVHlwZSh0eXBlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0yIHB5LTIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBzZWxlY3RlZFR5cGUgPT09IHR5cGUgPyBcIiMxZjI5MzdcIiA6IFwidHJhbnNwYXJlbnRcIiB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6Nzc6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBmb250U2l6ZTogMTQgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJpY29uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2Q/LmlkIHx8IGQ/Ll9pZH0+e2Q/Lmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjc4OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjc5OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRydW5jYXRlXCIgc3R5bGU9e3sgY29sb3I6IHNlbGVjdGVkVHlwZSA9PT0gdHlwZSA/IFwiI2ZmZlwiIDogXCIjODg4XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2Q/LmlkIHx8IGQ/Ll9pZH0+e2Q/Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtoYXNPdmVycmlkZSAmJiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6ODA6MzZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs4cHhdIHRleHQtYmx1ZS00MDBcIj5lZGl0ZWQ8L2Rpdj59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xuXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBIUCB0YWJsZSAqL31cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6ODg6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtM1wiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjg5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItM1wiPlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjkwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgZm9udFNpemU6IDIwIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT57ZGVmPy5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjkxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2RlZj8uaWQgfHwgZGVmPy5faWR9PntkZWY/Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo5MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+4oCUIG92ZXJyaWRlIEhQIHBlciBsZXZlbCAobGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQpPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo5NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IE1BWF9MRVZFTFMgfSwgKF8sIGkpID0+IGkgKyAxKS5tYXAoKGx2bCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGdldEN1cnJlbnRWYWx1ZShzZWxlY3RlZFR5cGUsIGx2bCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvcjo5ODoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17bHZsfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiByb3VuZGVkIHB4LTMgcHktMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMTExN1wiLCBib3JkZXI6IGAxcHggc29saWQgJHt2YWwgIT09IFwiXCIgPyBcIiMzYjgyZjZcIiA6IFwiIzFmMjkzN1wifWAgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6OTk6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgdy0xMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibHZsXCI+THYue2x2bH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjEwMDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICBtaW49ezF9IG1heD17OTk5OTk5fSBzdGVwPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UobHZsLCBlLnRhcmdldC52YWx1ZSA9PT0gXCJcIiA/IFwiXCIgOiBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtdWkgdGV4dC1zbSBvdXRsaW5lLW5vbmUgdGV4dC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzA2MGEwZlwiLCBib3JkZXI6IGAxcHggc29saWQgJHt2YWwgIT09IFwiXCIgPyBcIiMzYjgyZjZcIiA6IFwiIzFmMjkzN1wifWAsIGNvbG9yOiB2YWwgIT09IFwiXCIgPyBcIiM2MGE1ZmFcIiA6IFwiIzU1NVwiIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ0hwRWRpdG9yOjEwOToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gdGV4dC1zbGF0ZS02MDBcIj5IUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3ZhbCAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3I6MTExOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gaGFuZGxlQ2hhbmdlKGx2bCwgXCJcIil9IGNsYXNzTmFtZT1cInRleHQtcmVkLTUwMCBob3Zlcjp0ZXh0LXJlZC00MDAgZm9udC11aSB0ZXh0LVsxMHB4XVwiPsOXPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2dhbWUvQnVpbGRpbmdIcEVkaXRvci5qc3gifQ==