import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/PackConversionModal.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/PackConversionModal.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { PACK_TYPES, getGemCostForOverflow, calculatePackDistribution } from "/src/lib/gameConstants.js";
export default function PackConversionModal({ playerBase, overflowGold, overflowMana, onConvert, onClose }) {
  _s();
  const [selectedPackType, setSelectedPackType] = useState("M");
  const [resourceType, setResourceType] = useState("gold");
  const overflowAmount = resourceType === "gold" ? overflowGold : overflowMana;
  const gemCost = getGemCostForOverflow(overflowAmount);
  const canAfford = (playerBase?.gems ?? 0) >= gemCost;
  const distribution = calculatePackDistribution(overflowAmount, selectedPackType);
  const packDef = PACK_TYPES[selectedPackType];
  if (!overflowAmount || overflowAmount <= 0) return null;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:19:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:20:6", "data-dynamic-content": "true", className: "panel-dark rounded-xl w-[450px] overflow-hidden", style: { background: "#1a1a2e", border: "2px solid #fbbf24" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:22:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-4 border-b border-yellow-400/20", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:23:10", "data-dynamic-content": "false", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PackConversionModal:24:12", "data-dynamic-content": "false", className: "text-2xl", children: "📦" }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 43,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:25:12", "data-dynamic-content": "false", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:26:14", "data-dynamic-content": "false", className: "font-pixel text-yellow-400 text-[10px]", children: "OVERFLOW RESOURCES" }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 45,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:27:14", "data-dynamic-content": "false", className: "font-ui text-slate-400 text-xs", children: "Convert to storage packs" }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 46,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 44,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/PackConversionModal:30:10", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/PackConversionModal:30:80", "data-dynamic-content": "false", size: 20 }, void 0, false, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 49,
        columnNumber: 174
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PackConversionModal.jsx",
      lineNumber: 41,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:33:8", "data-dynamic-content": "true", className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:35:10", "data-dynamic-content": "true", className: "rounded-lg p-3", style: { background: "#0d0d1a", border: "1px solid #4a4a6e" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:36:12", "data-dynamic-content": "true", className: "font-ui text-sm text-slate-400 mb-1", children: [
          "Pending ",
          resourceType === "gold" ? "Gold" : "Mana",
          " Overflow"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:37:12", "data-dynamic-content": "true", className: "font-ui text-2xl font-bold", style: { color: resourceType === "gold" ? "#fbbf24" : "#38bdf8" }, children: overflowAmount.toLocaleString() }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 56,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:40:12", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500 mt-1", children: "Will be lost if not converted" }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:46:10", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PackConversionModal:47:12",
            "data-dynamic-content": "true",
            onClick: () => setResourceType("gold"),
            className: `flex-1 py-2 rounded font-pixel text-[8px] transition-all ${resourceType === "gold" ? "bg-yellow-600 text-black" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`,
            children: "💰 GOLD"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 66,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/PackConversionModal:57:12",
            "data-dynamic-content": "true",
            onClick: () => setResourceType("mana"),
            className: `flex-1 py-2 rounded font-pixel text-[8px] transition-all ${resourceType === "mana" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`,
            children: "🔷 MANA"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 76,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:70:10", "data-dynamic-content": "true", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:71:12", "data-dynamic-content": "false", className: "font-pixel text-yellow-400 text-[8px] mb-2", children: "SELECT PACK TYPE" }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 90,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:72:12", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: Object.entries(PACK_TYPES).map(([type, def]) => {
          const dist = calculatePackDistribution(overflowAmount, type);
          const isSelected = selectedPackType === type;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/PackConversionModal:77:18",
              "data-dynamic-content": "true",
              onClick: () => setSelectedPackType(type),
              className: `rounded-lg p-3 transition-all border-2 ${isSelected ? "border-yellow-400 bg-yellow-400/10" : "border-slate-600 bg-slate-800 hover:border-slate-500"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:86:20", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PackConversionModal:87:22", "data-dynamic-content": "true", className: "text-xl", "data-collection-item-field": "icon", "data-collection-item-id": def?.id || def?._id, children: def.icon }, void 0, false, {
                    fileName: "/app/src/components/game/PackConversionModal.jsx",
                    lineNumber: 106,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PackConversionModal:88:22", "data-dynamic-content": "true", className: "font-pixel text-[7px]", style: { color: def.color }, "data-collection-item-field": "name", "data-collection-item-id": def?.id || def?._id, children: def.name }, void 0, false, {
                    fileName: "/app/src/components/game/PackConversionModal.jsx",
                    lineNumber: 107,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/PackConversionModal.jsx",
                  lineNumber: 105,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:90:20", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-300", "data-collection-item-field": "capacity", "data-collection-item-id": def?.id || def?._id, children: [
                  def.capacity.toLocaleString(),
                  " ",
                  resourceType.toUpperCase()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/PackConversionModal.jsx",
                  lineNumber: 109,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:93:20", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 mt-1", children: [
                  "You'll get: ",
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PackConversionModal:94:34", "data-dynamic-content": "true", className: "font-bold text-slate-200", "data-collection-item-field": "packCount", "data-collection-item-id": dist?.id || dist?._id, children: dist.packCount }, void 0, false, {
                    fileName: "/app/src/components/game/PackConversionModal.jsx",
                    lineNumber: 113,
                    columnNumber: 35
                  }, this),
                  " packs"
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/PackConversionModal.jsx",
                  lineNumber: 112,
                  columnNumber: 21
                }, this),
                dist.wastedAmount > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:97:22", "data-dynamic-content": "true", className: "font-ui text-[9px] text-red-400 mt-1", "data-collection-item-field": "wastedAmount", "data-collection-item-id": dist?.id || dist?._id, children: [
                  "Lost: ",
                  dist.wastedAmount.toLocaleString()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/PackConversionModal.jsx",
                  lineNumber: 116,
                  columnNumber: 21
                }, this)
              ]
            },
            type,
            true,
            {
              fileName: "/app/src/components/game/PackConversionModal.jsx",
              lineNumber: 96,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 91,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:108:10", "data-dynamic-content": "true", className: "rounded-lg p-3 flex items-center justify-between", style: { background: "#0d0d1a", border: "1px solid #4a4a6e" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:109:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:110:14", "data-dynamic-content": "false", className: "font-ui text-sm text-slate-400", children: "Gem Cost" }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 129,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:111:14", "data-dynamic-content": "true", className: "font-ui text-lg font-bold", style: { color: canAfford ? "#60a5fa" : "#ef4444" }, children: [
            "💎 ",
            gemCost.toLocaleString()
          ] }, void 0, true, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 130,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 128,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:115:12", "data-dynamic-content": "true", className: "text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:116:14", "data-dynamic-content": "false", className: "font-ui text-sm text-slate-400", children: "Your Gems" }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 135,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:117:14", "data-dynamic-content": "true", className: `font-ui text-lg font-bold ${canAfford ? "text-blue-400" : "text-red-400"}`, children: playerBase?.gems?.toLocaleString() ?? 0 }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 136,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 134,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 127,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:124:10", "data-dynamic-content": "true", className: "rounded-lg p-3", style: { background: "#0d0d1a", border: "1px solid #4a4a6e" }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:125:12", "data-dynamic-content": "false", className: "font-ui text-sm text-slate-400 mb-1", children: "Conversion Summary" }, void 0, false, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 144,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:126:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-300", "data-collection-item-field": "packCount", "data-collection-item-id": distribution?.id || distribution?._id, children: [
          distribution.packCount,
          " × ",
          packDef.name,
          " = ",
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/PackConversionModal:127:58", "data-dynamic-content": "true", className: "font-bold", style: { color: packDef.color }, children: (distribution.packCount * packDef.capacity).toLocaleString() }, void 0, false, {
            fileName: "/app/src/components/game/PackConversionModal.jsx",
            lineNumber: 146,
            columnNumber: 59
          }, this),
          " ",
          resourceType.toUpperCase()
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 145,
          columnNumber: 13
        }, this),
        distribution.wastedAmount > 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/PackConversionModal:130:14", "data-dynamic-content": "true", className: "font-ui text-[10px] text-red-400 mt-1", "data-collection-item-field": "wastedAmount", "data-collection-item-id": distribution?.id || distribution?._id, children: [
          "⚠️ ",
          distribution.wastedAmount.toLocaleString(),
          " ",
          resourceType.toUpperCase(),
          " will be lost (doesn't fit evenly)"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 149,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/PackConversionModal.jsx",
        lineNumber: 143,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/PackConversionModal:137:10",
          "data-dynamic-content": "true",
          onClick: () => onConvert(resourceType, selectedPackType, distribution),
          disabled: !canAfford,
          className: `w-full py-3 rounded font-pixel text-[9px] transition-all ${canAfford ? "btn-rpg cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-600"}`,
          children: canAfford ? "CONVERT TO PACKS" : "NOT ENOUGH GEMS"
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/PackConversionModal.jsx",
          lineNumber: 156,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/components/game/PackConversionModal.jsx",
      lineNumber: 52,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/PackConversionModal.jsx",
    lineNumber: 39,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/PackConversionModal.jsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
_s(PackConversionModal, "96/0WiYLUDdWazzw+FdY+Ntd3nY=");
_c = PackConversionModal;
var _c;
$RefreshReg$(_c, "PackConversionModal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/PackConversionModal.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/PackConversionModal.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBdUJZOzs7Ozs7Ozs7Ozs7Ozs7OztBQXZCWixPQUFPQSxTQUFTQyxnQkFBZ0I7QUFDaEMsU0FBU0MsU0FBUztBQUNsQixTQUFTQyxZQUFZQyx1QkFBdUJDLGlDQUFpQztBQUU3RSx3QkFBd0JDLG9CQUFvQixFQUFFQyxZQUFZQyxjQUFjQyxjQUFjQyxXQUFXQyxRQUFRLEdBQUc7QUFBQUMsS0FBQTtBQUMxRyxRQUFNLENBQUNDLGtCQUFrQkMsbUJBQW1CLElBQUliLFNBQVMsR0FBRztBQUM1RCxRQUFNLENBQUNjLGNBQWNDLGVBQWUsSUFBSWYsU0FBUyxNQUFNO0FBRXZELFFBQU1nQixpQkFBaUJGLGlCQUFpQixTQUFTUCxlQUFlQztBQUNoRSxRQUFNUyxVQUFVZCxzQkFBc0JhLGNBQWM7QUFDcEQsUUFBTUUsYUFBYVosWUFBWWEsUUFBUSxNQUFNRjtBQUU3QyxRQUFNRyxlQUFlaEIsMEJBQTBCWSxnQkFBZ0JKLGdCQUFnQjtBQUMvRSxRQUFNUyxVQUFVbkIsV0FBV1UsZ0JBQWdCO0FBRTNDLE1BQUksQ0FBQ0ksa0JBQWtCQSxrQkFBa0IsRUFBRyxRQUFPO0FBRW5ELFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsNENBQTJDLHdCQUFxQixRQUFPLFdBQVUsbUVBQ3pHLGlDQUFDLFNBQUksd0JBQXFCLDRDQUEyQyx3QkFBcUIsUUFBTyxXQUFVLG1EQUFrRCxPQUFPLEVBQUVNLFlBQVksV0FBV0MsUUFBUSxvQkFBb0IsR0FFdk47QUFBQSwyQkFBQyxTQUFJLHdCQUFxQiw0Q0FBMkMsd0JBQXFCLFFBQU8sV0FBVSw2RUFDekc7QUFBQSw2QkFBQyxTQUFJLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFNBQVEsV0FBVSwyQkFDM0c7QUFBQSwrQkFBQyxVQUFLLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFNBQVEsV0FBVSxZQUFXLGtCQUF6SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTJIO0FBQUEsUUFDM0gsdUJBQUMsU0FBSSx3QkFBcUIsNkNBQTRDLHdCQUFxQixTQUN6RjtBQUFBLGlDQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsU0FBUSxXQUFVLDBDQUF5QyxrQ0FBdEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBd0s7QUFBQSxVQUN4Syx1QkFBQyxTQUFJLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFNBQVEsV0FBVSxrQ0FBaUMsd0NBQTlJO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXNLO0FBQUEsYUFGeEs7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsV0FMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBTUE7QUFBQSxNQUNBLHVCQUFDLFlBQU8sd0JBQXFCLDZDQUE0Qyx3QkFBcUIsUUFBTyxTQUFTYixTQUFTLFdBQVUsbUNBQWtDLGlDQUFDLEtBQUUsd0JBQXFCLDZDQUE0Qyx3QkFBcUIsU0FBUSxNQUFNLE1BQXZHO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMEcsS0FBN1E7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFnUjtBQUFBLFNBUmxSO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FTQTtBQUFBLElBRUEsdUJBQUMsU0FBSSx3QkFBcUIsNENBQTJDLHdCQUFxQixRQUFPLFdBQVUsaUJBRXpHO0FBQUEsNkJBQUMsU0FBSSx3QkFBcUIsNkNBQTRDLHdCQUFxQixRQUFPLFdBQVUsa0JBQWlCLE9BQU8sRUFBRVksWUFBWSxXQUFXQyxRQUFRLG9CQUFvQixHQUN2TDtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsUUFBTyxXQUFVLHVDQUFzQztBQUFBO0FBQUEsVUFBU1QsaUJBQWlCLFNBQVMsU0FBUztBQUFBLFVBQU87QUFBQSxhQUFyTTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQThNO0FBQUEsUUFDOU0sdUJBQUMsU0FBSSx3QkFBcUIsNkNBQTRDLHdCQUFxQixRQUFPLFdBQVUsOEJBQTZCLE9BQU8sRUFBRVUsT0FBT1YsaUJBQWlCLFNBQVMsWUFBWSxVQUFVLEdBQ3RNRSx5QkFBZVMsZUFBZSxLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsU0FBUSxXQUFVLDJDQUF5Qyw2Q0FBdEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUUE7QUFBQSxNQUdBLHVCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsUUFBTyxXQUFVLGNBQzFHO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFPLHdCQUFxQjtBQUFBLFlBQTRDLHdCQUFxQjtBQUFBLFlBQzlGLFNBQVMsTUFBTVYsZ0JBQWdCLE1BQU07QUFBQSxZQUNyQyxXQUFXLDREQUNYRCxpQkFBaUIsU0FDakIsNkJBQ0EsZ0RBQWdEO0FBQUEsWUFDL0M7QUFBQTtBQUFBLFVBTkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBU0E7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBTyx3QkFBcUI7QUFBQSxZQUE0Qyx3QkFBcUI7QUFBQSxZQUM5RixTQUFTLE1BQU1DLGdCQUFnQixNQUFNO0FBQUEsWUFDckMsV0FBVyw0REFDWEQsaUJBQWlCLFNBQ2pCLDJCQUNBLGdEQUFnRDtBQUFBLFlBQy9DO0FBQUE7QUFBQSxVQU5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVNBO0FBQUEsV0FwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXFCQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSx3QkFBcUIsNkNBQTRDLHdCQUFxQixRQUN6RjtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsU0FBUSxXQUFVLDhDQUE2QyxnQ0FBMUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEwSztBQUFBLFFBQzFLLHVCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsUUFBTyxXQUFVLDBCQUN6R1ksaUJBQU9DLFFBQVF6QixVQUFVLEVBQUUwQixJQUFJLENBQUMsQ0FBQ0MsTUFBTUMsR0FBRyxNQUFNO0FBQy9DLGdCQUFNQyxPQUFPM0IsMEJBQTBCWSxnQkFBZ0JhLElBQUk7QUFDM0QsZ0JBQU1HLGFBQWFwQixxQkFBcUJpQjtBQUN4QyxpQkFDRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQU8sd0JBQXFCO0FBQUEsY0FBNEMsd0JBQXFCO0FBQUEsY0FFOUYsU0FBUyxNQUFNaEIsb0JBQW9CZ0IsSUFBSTtBQUFBLGNBQ3ZDLFdBQVcsMENBQ1hHLGFBQ0EsdUNBQ0Esc0RBQXNEO0FBQUEsY0FHcEQ7QUFBQSx1Q0FBQyxTQUFJLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFFBQU8sV0FBVSxnQ0FDMUc7QUFBQSx5Q0FBQyxVQUFLLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFFBQU8sV0FBVSxXQUFVLDhCQUEyQixRQUFPLDJCQUF5QkYsS0FBS0csTUFBTUgsS0FBS0ksS0FBTUosY0FBSUssUUFBNU07QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBaU47QUFBQSxrQkFDak4sdUJBQUMsVUFBSyx3QkFBcUIsNkNBQTRDLHdCQUFxQixRQUFPLFdBQVUseUJBQXdCLE9BQU8sRUFBRVgsT0FBT00sSUFBSU4sTUFBTSxHQUFHLDhCQUEyQixRQUFPLDJCQUF5Qk0sS0FBS0csTUFBTUgsS0FBS0ksS0FBTUosY0FBSU0sUUFBdlA7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBNFA7QUFBQSxxQkFGOVA7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHQTtBQUFBLGdCQUNBLHVCQUFDLFNBQUksd0JBQXFCLDZDQUE0Qyx3QkFBcUIsUUFBTyxXQUFVLGtDQUFpQyw4QkFBMkIsWUFBVywyQkFBeUJOLEtBQUtHLE1BQU1ILEtBQUtJLEtBQ3pOSjtBQUFBQSxzQkFBSU8sU0FBU1osZUFBZTtBQUFBLGtCQUFFO0FBQUEsa0JBQUVYLGFBQWF3QixZQUFZO0FBQUEscUJBRDVEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxTQUFJLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFFBQU8sV0FBVSwyQ0FBeUM7QUFBQTtBQUFBLGtCQUN2SSx1QkFBQyxVQUFLLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFFBQU8sV0FBVSw0QkFBMkIsOEJBQTJCLGFBQVksMkJBQXlCUCxNQUFNRSxNQUFNRixNQUFNRyxLQUFNSCxlQUFLUSxhQUFyTztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUErTztBQUFBLGtCQUFPO0FBQUEscUJBRHBRO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQ1IsS0FBS1MsZUFBZSxLQUNyQix1QkFBQyxTQUFJLHdCQUFxQiw2Q0FBNEMsd0JBQXFCLFFBQU8sV0FBVSx3Q0FBdUMsOEJBQTJCLGdCQUFlLDJCQUF5QlQsTUFBTUUsTUFBTUYsTUFBTUcsS0FBSTtBQUFBO0FBQUEsa0JBQ2pPSCxLQUFLUyxhQUFhZixlQUFlO0FBQUEscUJBRDVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUU7QUFBQTtBQUFBO0FBQUEsWUFyQkNJO0FBQUFBLFlBREw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQXdCQTtBQUFBLFFBRUosQ0FBQyxLQS9CSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZ0NBO0FBQUEsV0FsQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW1DQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSx3QkFBcUIsOENBQTZDLHdCQUFxQixRQUFPLFdBQVUsb0RBQW1ELE9BQU8sRUFBRVAsWUFBWSxXQUFXQyxRQUFRLG9CQUFvQixHQUMxTjtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDhDQUE2Qyx3QkFBcUIsUUFDMUY7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQiw4Q0FBNkMsd0JBQXFCLFNBQVEsV0FBVSxrQ0FBaUMsd0JBQS9JO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVKO0FBQUEsVUFDdkosdUJBQUMsU0FBSSx3QkFBcUIsOENBQTZDLHdCQUFxQixRQUFPLFdBQVUsNkJBQTRCLE9BQU8sRUFBRUMsT0FBT04sWUFBWSxZQUFZLFVBQVUsR0FBRTtBQUFBO0FBQUEsWUFDdkxELFFBQVFRLGVBQWU7QUFBQSxlQUQ3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBS0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksd0JBQXFCLDhDQUE2Qyx3QkFBcUIsUUFBTyxXQUFVLGNBQzNHO0FBQUEsaUNBQUMsU0FBSSx3QkFBcUIsOENBQTZDLHdCQUFxQixTQUFRLFdBQVUsa0NBQWlDLHlCQUEvSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3SjtBQUFBLFVBQ3hKLHVCQUFDLFNBQUksd0JBQXFCLDhDQUE2Qyx3QkFBcUIsUUFBTyxXQUFXLDZCQUE2QlAsWUFBWSxrQkFBa0IsY0FBYyxJQUNwTFosc0JBQVlhLE1BQU1NLGVBQWUsS0FBSyxLQUR6QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBS0E7QUFBQSxXQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFhQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSx3QkFBcUIsOENBQTZDLHdCQUFxQixRQUFPLFdBQVUsa0JBQWlCLE9BQU8sRUFBRUgsWUFBWSxXQUFXQyxRQUFRLG9CQUFvQixHQUN4TDtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDhDQUE2Qyx3QkFBcUIsU0FBUSxXQUFVLHVDQUFzQyxrQ0FBcEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFzSztBQUFBLFFBQ3RLLHVCQUFDLFNBQUksd0JBQXFCLDhDQUE2Qyx3QkFBcUIsUUFBTyxXQUFVLGtDQUFpQyw4QkFBMkIsYUFBWSwyQkFBeUJILGNBQWNhLE1BQU1iLGNBQWNjLEtBQzdPZDtBQUFBQSx1QkFBYW1CO0FBQUFBLFVBQVU7QUFBQSxVQUFJbEIsUUFBUWU7QUFBQUEsVUFBSztBQUFBLFVBQUcsdUJBQUMsVUFBSyx3QkFBcUIsOENBQTZDLHdCQUFxQixRQUFPLFdBQVUsYUFBWSxPQUFPLEVBQUVaLE9BQU9ILFFBQVFHLE1BQU0sR0FBS0osd0JBQWFtQixZQUFZbEIsUUFBUWdCLFVBQVVaLGVBQWUsS0FBdk47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBeU47QUFBQSxVQUFPO0FBQUEsVUFBRVgsYUFBYXdCLFlBQVk7QUFBQSxhQUR6UztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNDbEIsYUFBYW9CLGVBQWUsS0FDN0IsdUJBQUMsU0FBSSx3QkFBcUIsOENBQTZDLHdCQUFxQixRQUFPLFdBQVUseUNBQXdDLDhCQUEyQixnQkFBZSwyQkFBeUJwQixjQUFjYSxNQUFNYixjQUFjYyxLQUFJO0FBQUE7QUFBQSxVQUN0UGQsYUFBYW9CLGFBQWFmLGVBQWU7QUFBQSxVQUFFO0FBQUEsVUFBRVgsYUFBYXdCLFlBQVk7QUFBQSxVQUFFO0FBQUEsYUFEaEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVFO0FBQUEsV0FSSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBVUE7QUFBQSxNQUdBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFBTyx3QkFBcUI7QUFBQSxVQUE2Qyx3QkFBcUI7QUFBQSxVQUMvRixTQUFTLE1BQU03QixVQUFVSyxjQUFjRixrQkFBa0JRLFlBQVk7QUFBQSxVQUNyRSxVQUFVLENBQUNGO0FBQUFBLFVBQ1gsV0FBVyw0REFDWEEsWUFDQSwyQkFDQSx3RUFBd0U7QUFBQSxVQUdyRUEsc0JBQVkscUJBQXFCO0FBQUE7QUFBQSxRQVRwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFVQTtBQUFBLFNBbEhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FtSEE7QUFBQSxPQWhJRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBaUlBLEtBbElGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FtSUE7QUFFSjtBQUFDUCxHQW5KdUJOLHFCQUFtQjtBQUFBLEtBQW5CQTtBQUFtQixJQUFBb0M7QUFBQSxhQUFBQSxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlgiLCJQQUNLX1RZUEVTIiwiZ2V0R2VtQ29zdEZvck92ZXJmbG93IiwiY2FsY3VsYXRlUGFja0Rpc3RyaWJ1dGlvbiIsIlBhY2tDb252ZXJzaW9uTW9kYWwiLCJwbGF5ZXJCYXNlIiwib3ZlcmZsb3dHb2xkIiwib3ZlcmZsb3dNYW5hIiwib25Db252ZXJ0Iiwib25DbG9zZSIsIl9zIiwic2VsZWN0ZWRQYWNrVHlwZSIsInNldFNlbGVjdGVkUGFja1R5cGUiLCJyZXNvdXJjZVR5cGUiLCJzZXRSZXNvdXJjZVR5cGUiLCJvdmVyZmxvd0Ftb3VudCIsImdlbUNvc3QiLCJjYW5BZmZvcmQiLCJnZW1zIiwiZGlzdHJpYnV0aW9uIiwicGFja0RlZiIsImJhY2tncm91bmQiLCJib3JkZXIiLCJjb2xvciIsInRvTG9jYWxlU3RyaW5nIiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsInR5cGUiLCJkZWYiLCJkaXN0IiwiaXNTZWxlY3RlZCIsImlkIiwiX2lkIiwiaWNvbiIsIm5hbWUiLCJjYXBhY2l0eSIsInRvVXBwZXJDYXNlIiwicGFja0NvdW50Iiwid2FzdGVkQW1vdW50IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiUGFja0NvbnZlcnNpb25Nb2RhbC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgUEFDS19UWVBFUywgZ2V0R2VtQ29zdEZvck92ZXJmbG93LCBjYWxjdWxhdGVQYWNrRGlzdHJpYnV0aW9uIH0gZnJvbSBcIkAvbGliL2dhbWVDb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFja0NvbnZlcnNpb25Nb2RhbCh7IHBsYXllckJhc2UsIG92ZXJmbG93R29sZCwgb3ZlcmZsb3dNYW5hLCBvbkNvbnZlcnQsIG9uQ2xvc2UgfSkge1xuICBjb25zdCBbc2VsZWN0ZWRQYWNrVHlwZSwgc2V0U2VsZWN0ZWRQYWNrVHlwZV0gPSB1c2VTdGF0ZShcIk1cIik7XG4gIGNvbnN0IFtyZXNvdXJjZVR5cGUsIHNldFJlc291cmNlVHlwZV0gPSB1c2VTdGF0ZShcImdvbGRcIik7XG5cbiAgY29uc3Qgb3ZlcmZsb3dBbW91bnQgPSByZXNvdXJjZVR5cGUgPT09IFwiZ29sZFwiID8gb3ZlcmZsb3dHb2xkIDogb3ZlcmZsb3dNYW5hO1xuICBjb25zdCBnZW1Db3N0ID0gZ2V0R2VtQ29zdEZvck92ZXJmbG93KG92ZXJmbG93QW1vdW50KTtcbiAgY29uc3QgY2FuQWZmb3JkID0gKHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPj0gZ2VtQ29zdDtcblxuICBjb25zdCBkaXN0cmlidXRpb24gPSBjYWxjdWxhdGVQYWNrRGlzdHJpYnV0aW9uKG92ZXJmbG93QW1vdW50LCBzZWxlY3RlZFBhY2tUeXBlKTtcbiAgY29uc3QgcGFja0RlZiA9IFBBQ0tfVFlQRVNbc2VsZWN0ZWRQYWNrVHlwZV07XG5cbiAgaWYgKCFvdmVyZmxvd0Ftb3VudCB8fCBvdmVyZmxvd0Ftb3VudCA8PSAwKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDoxOTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzcwXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MjA6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInBhbmVsLWRhcmsgcm91bmRlZC14bCB3LVs0NTBweF0gb3ZlcmZsb3ctaGlkZGVuXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMWExYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgI2ZiYmYyNFwiIH19PlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MjI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXllbGxvdy00MDAvMjBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MjM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MjQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5OmPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjI1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MjY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LXllbGxvdy00MDAgdGV4dC1bMTBweF1cIj5PVkVSRkxPVyBSRVNPVVJDRVM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjI3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbGF0ZS00MDAgdGV4dC14c1wiPkNvbnZlcnQgdG8gc3RvcmFnZSBwYWNrczwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjMwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiPjxYIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MzA6ODBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MjB9IC8+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDozMzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgIHsvKiBPdmVyZmxvdyBhbW91bnQgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjM1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZC1sZyBwLTNcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGE0YTZlXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MzY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtc20gdGV4dC1zbGF0ZS00MDAgbWItMVwiPlBlbmRpbmcge3Jlc291cmNlVHlwZSA9PT0gXCJnb2xkXCIgPyBcIkdvbGRcIiA6IFwiTWFuYVwifSBPdmVyZmxvdzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjM3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LTJ4bCBmb250LWJvbGRcIiBzdHlsZT17eyBjb2xvcjogcmVzb3VyY2VUeXBlID09PSBcImdvbGRcIiA/IFwiI2ZiYmYyNFwiIDogXCIjMzhiZGY4XCIgfX0+XG4gICAgICAgICAgICAgIHtvdmVyZmxvd0Ftb3VudC50b0xvY2FsZVN0cmluZygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6NDA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIFdpbGwgYmUgbG9zdCBpZiBub3QgY29udmVydGVkXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSZXNvdXJjZSB0eXBlIHNlbGVjdG9yICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo0NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo0NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRSZXNvdXJjZVR5cGUoXCJnb2xkXCIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIHJlc291cmNlVHlwZSA9PT0gXCJnb2xkXCIgP1xuICAgICAgICAgICAgXCJiZy15ZWxsb3ctNjAwIHRleHQtYmxhY2tcIiA6XG4gICAgICAgICAgICBcImJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS03MDBcIn1gXG4gICAgICAgICAgICB9PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAg8J+SsCBHT0xEXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo1NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRSZXNvdXJjZVR5cGUoXCJtYW5hXCIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIHJlc291cmNlVHlwZSA9PT0gXCJtYW5hXCIgP1xuICAgICAgICAgICAgXCJiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlXCIgOlxuICAgICAgICAgICAgXCJiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtNzAwXCJ9YFxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIPCflLcgTUFOQVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUGFjayB0eXBlIHNlbGVjdG9yICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo3MDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjcxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC15ZWxsb3ctNDAwIHRleHQtWzhweF0gbWItMlwiPlNFTEVDVCBQQUNLIFRZUEU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo3MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKFBBQ0tfVFlQRVMpLm1hcCgoW3R5cGUsIGRlZl0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gY2FsY3VsYXRlUGFja0Rpc3RyaWJ1dGlvbihvdmVyZmxvd0Ftb3VudCwgdHlwZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkUGFja1R5cGUgPT09IHR5cGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo3NzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICBrZXk9e3R5cGV9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFBhY2tUeXBlKHR5cGUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC1sZyBwLTMgdHJhbnNpdGlvbi1hbGwgYm9yZGVyLTIgJHtcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgP1xuICAgICAgICAgICAgICAgICAgXCJib3JkZXIteWVsbG93LTQwMCBiZy15ZWxsb3ctNDAwLzEwXCIgOlxuICAgICAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtNjAwIGJnLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNTAwXCJ9YFxuICAgICAgICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo4NjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjg3OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC14bFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT57ZGVmLmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6ODg6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF1cIiBzdHlsZT17eyBjb2xvcjogZGVmLmNvbG9yIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT57ZGVmLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjkwOjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJjYXBhY2l0eVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGVmLmNhcGFjaXR5LnRvTG9jYWxlU3RyaW5nKCl9IHtyZXNvdXJjZVR5cGUudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo5MzoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIFlvdSdsbCBnZXQ6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6OTQ6MzRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInBhY2tDb3VudFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkaXN0Py5pZCB8fCBkaXN0Py5faWR9PntkaXN0LnBhY2tDb3VudH08L3NwYW4+IHBhY2tzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGlzdC53YXN0ZWRBbW91bnQgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDo5NzoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bOXB4XSB0ZXh0LXJlZC00MDAgbXQtMVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwid2FzdGVkQW1vdW50XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2Rpc3Q/LmlkIHx8IGRpc3Q/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICBMb3N0OiB7ZGlzdC53YXN0ZWRBbW91bnQudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+KTtcblxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEdlbSBjb3N0ICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDoxMDg6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkLWxnIHAtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGE0YTZlXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MTA5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvUGFja0NvbnZlcnNpb25Nb2RhbDoxMTA6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtIHRleHQtc2xhdGUtNDAwXCI+R2VtIENvc3Q8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjExMToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1sZyBmb250LWJvbGRcIiBzdHlsZT17eyBjb2xvcjogY2FuQWZmb3JkID8gXCIjNjBhNWZhXCIgOiBcIiNlZjQ0NDRcIiB9fT5cbiAgICAgICAgICAgICAgICDwn5KOIHtnZW1Db3N0LnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MTE1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MTE2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXNsYXRlLTQwMFwiPllvdXIgR2VtczwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MTE3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgZm9udC11aSB0ZXh0LWxnIGZvbnQtYm9sZCAke2NhbkFmZm9yZCA/IFwidGV4dC1ibHVlLTQwMFwiIDogXCJ0ZXh0LXJlZC00MDBcIn1gfT5cbiAgICAgICAgICAgICAgICB7cGxheWVyQmFzZT8uZ2Vtcz8udG9Mb2NhbGVTdHJpbmcoKSA/PyAwfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFN1bW1hcnkgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjEyNDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgcC0zXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGQwZDFhXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzRhNGE2ZVwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjEyNToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtc20gdGV4dC1zbGF0ZS00MDAgbWItMVwiPkNvbnZlcnNpb24gU3VtbWFyeTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjEyNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicGFja0NvdW50XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2Rpc3RyaWJ1dGlvbj8uaWQgfHwgZGlzdHJpYnV0aW9uPy5faWR9PlxuICAgICAgICAgICAgICB7ZGlzdHJpYnV0aW9uLnBhY2tDb3VudH0gw5cge3BhY2tEZWYubmFtZX0gPSA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjEyNzo1OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBwYWNrRGVmLmNvbG9yIH19PnsoZGlzdHJpYnV0aW9uLnBhY2tDb3VudCAqIHBhY2tEZWYuY2FwYWNpdHkpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPiB7cmVzb3VyY2VUeXBlLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtkaXN0cmlidXRpb24ud2FzdGVkQW1vdW50ID4gMCAmJlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsOjEzMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC1yZWQtNDAwIG10LTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIndhc3RlZEFtb3VudFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkaXN0cmlidXRpb24/LmlkIHx8IGRpc3RyaWJ1dGlvbj8uX2lkfT5cbiAgICAgICAgICAgICAgICDimqDvuI8ge2Rpc3RyaWJ1dGlvbi53YXN0ZWRBbW91bnQudG9Mb2NhbGVTdHJpbmcoKX0ge3Jlc291cmNlVHlwZS50b1VwcGVyQ2FzZSgpfSB3aWxsIGJlIGxvc3QgKGRvZXNuJ3QgZml0IGV2ZW5seSlcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIGJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWw6MTM3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNvbnZlcnQocmVzb3VyY2VUeXBlLCBzZWxlY3RlZFBhY2tUeXBlLCBkaXN0cmlidXRpb24pfVxuICAgICAgICAgIGRpc2FibGVkPXshY2FuQWZmb3JkfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0zIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs5cHhdIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgY2FuQWZmb3JkID9cbiAgICAgICAgICBcImJ0bi1ycGcgY3Vyc29yLXBvaW50ZXJcIiA6XG4gICAgICAgICAgXCJiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItc2xhdGUtNjAwXCJ9YFxuICAgICAgICAgIH0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHtjYW5BZmZvcmQgPyBcIkNPTlZFUlQgVE8gUEFDS1NcIiA6IFwiTk9UIEVOT1VHSCBHRU1TXCJ9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9nYW1lL1BhY2tDb252ZXJzaW9uTW9kYWwuanN4In0=