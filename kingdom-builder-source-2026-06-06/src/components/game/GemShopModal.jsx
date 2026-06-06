import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/GemShopModal.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/GemShopModal.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
const PACKS = [
  { id: "gold_s", name: "Small Gold Pack", resource: "gold", amount: 5e3, gemCost: 100 },
  { id: "gold_m", name: "Medium Gold Pack", resource: "gold", amount: 25e3, gemCost: 400 },
  { id: "gold_l", name: "Large Gold Pack", resource: "gold", amount: 1e5, gemCost: 1200 },
  { id: "mana_s", name: "Small Mana Pack", resource: "mana", amount: 2500, gemCost: 100 },
  { id: "mana_m", name: "Medium Mana Pack", resource: "mana", amount: 12500, gemCost: 400 },
  { id: "mana_l", name: "Large Mana Pack", resource: "mana", amount: 5e4, gemCost: 1200 }
];
export default function GemShopModal({ playerBase, onBuy, onClose }) {
  _s();
  const [selectedPack, setSelectedPack] = useState(null);
  const handleBuy = (pack) => {
    if ((playerBase?.gems ?? 0) < pack.gemCost) {
      return;
    }
    setSelectedPack(pack);
  };
  const confirmBuy = () => {
    if (selectedPack) {
      onBuy(selectedPack);
      setSelectedPack(null);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:31:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:32:6", "data-dynamic-content": "true", className: "panel-dark rounded-xl w-[450px] max-h-[85vh] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:34:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-4 border-b border-yellow-400/20", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:35:10", "data-dynamic-content": "false", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/GemShopModal:36:12", "data-dynamic-content": "false", className: "text-2xl", children: "💎" }, void 0, false, {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:37:12", "data-dynamic-content": "false", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:38:14", "data-dynamic-content": "false", className: "font-pixel text-yellow-400 text-[10px]", children: "GEM SHOP" }, void 0, false, {
            fileName: "/app/src/components/game/GemShopModal.jsx",
            lineNumber: 57,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:39:14", "data-dynamic-content": "false", className: "font-ui text-slate-400 text-xs", children: "Convert gems to resources" }, void 0, false, {
            fileName: "/app/src/components/game/GemShopModal.jsx",
            lineNumber: 58,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 56,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/GemShopModal:42:10", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/GemShopModal:42:80", "data-dynamic-content": "false", size: 20 }, void 0, false, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 61,
        columnNumber: 167
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 61,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 53,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:46:8", "data-dynamic-content": "true", className: "px-5 py-3 border-b border-yellow-400/10", style: { background: "rgba(99, 102, 241, 0.1)" }, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:47:10", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/GemShopModal:48:12", "data-dynamic-content": "false", className: "font-ui text-sm text-slate-300", children: "Your Gems:" }, void 0, false, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 67,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/GemShopModal:49:12", "data-dynamic-content": "true", className: "font-ui font-bold text-lg", style: { color: "#60a5fa" }, children: (playerBase?.gems ?? 0).toLocaleString() }, void 0, false, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 68,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 66,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 65,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:54:8", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3", children: PACKS.map((pack, __arrIdx__) => {
      const canAfford = (playerBase?.gems ?? 0) >= pack.gemCost;
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          "data-source-location": "components/game/GemShopModal:58:14",
          "data-dynamic-content": "true",
          className: "panel-dark rounded-lg p-3 transition-all hover:border-yellow-400/40",
          "data-collection-item-id": pack?.id,
          "data-arr-index": __arrIdx__,
          "data-arr-variable-name": "PACKS",
          children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:62:16", "data-dynamic-content": "true", className: "flex items-start gap-2 mb-2", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/GemShopModal:63:18", "data-dynamic-content": "true", className: "text-2xl", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", children: pack.resource === "gold" ? "💰" : "🔷" }, void 0, false, {
                fileName: "/app/src/components/game/GemShopModal.jsx",
                lineNumber: 82,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:64:18", "data-dynamic-content": "true", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:65:20", "data-dynamic-content": "true", className: "font-pixel text-yellow-400 text-[7px]", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", "data-arr-field": "name", children: pack.name }, void 0, false, {
                  fileName: "/app/src/components/game/GemShopModal.jsx",
                  lineNumber: 84,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:66:20", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-xs", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", children: [
                  pack.resource === "gold" ? "💰" : "🔷",
                  " ",
                  pack.amount.toLocaleString()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/GemShopModal.jsx",
                  lineNumber: 85,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/GemShopModal.jsx",
                lineNumber: 83,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/GemShopModal.jsx",
              lineNumber: 81,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:72:16", "data-dynamic-content": "true", className: "flex items-center justify-between mb-2", "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/GemShopModal:73:18", "data-dynamic-content": "true", className: "text-xs font-ui", style: { color: "#60a5fa" }, "data-arr-index": __arrIdx__, "data-arr-variable-name": "PACKS", "data-arr-field": "gemCost", children: [
              "💎 ",
              pack.gemCost
            ] }, void 0, true, {
              fileName: "/app/src/components/game/GemShopModal.jsx",
              lineNumber: 92,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/GemShopModal.jsx",
              lineNumber: 91,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/GemShopModal:76:16",
                "data-dynamic-content": "true",
                onClick: () => handleBuy(pack),
                disabled: !canAfford,
                className: `w-full py-1.5 rounded font-pixel text-[7px] transition-all ${canAfford ? "btn-rpg cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-600"}`,
                "data-arr-index": __arrIdx__,
                "data-arr-variable-name": "PACKS",
                children: canAfford ? "BUY" : "❌ FUNDS"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/GemShopModal.jsx",
                lineNumber: 95,
                columnNumber: 17
              },
              this
            )
          ]
        },
        pack.id,
        true,
        {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 77,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 73,
      columnNumber: 9
    }, this),
    selectedPack && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:94:10", "data-dynamic-content": "true", className: "absolute inset-0 z-10 flex items-center justify-center bg-black/60", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:95:12", "data-dynamic-content": "true", className: "panel-dark rounded-lg p-5 w-[300px]", style: { background: "#d4b896", border: "2px solid #6b3f1f" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:96:14", "data-dynamic-content": "true", className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:97:16", "data-dynamic-content": "true", className: "font-pixel text-[9px] mb-2", style: { color: "#3d1f05" }, children: "CONFIRM PURCHASE" }, void 0, false, {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 116,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:98:16", "data-dynamic-content": "true", className: "font-ui text-sm", style: { color: "#6b3f1f" }, "data-collection-item-field": "name", "data-collection-item-id": selectedPack?.id || selectedPack?._id, children: [
          selectedPack.name,
          " (",
          selectedPack.amount.toLocaleString(),
          " ",
          selectedPack.resource.toUpperCase(),
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 117,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:101:16", "data-dynamic-content": "true", className: "font-ui text-lg font-bold mt-2", style: { color: "#60a5fa" }, "data-collection-item-field": "gemCost", "data-collection-item-id": selectedPack?.id || selectedPack?._id, children: [
          "💎 ",
          selectedPack.gemCost
        ] }, void 0, true, {
          fileName: "/app/src/components/game/GemShopModal.jsx",
          lineNumber: 120,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 115,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/GemShopModal:105:14", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/GemShopModal:106:16",
            "data-dynamic-content": "true",
            onClick: () => setSelectedPack(null),
            className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all",
            style: { background: "#6b3f1f", color: "#f5e6d0", border: "1px solid #3d1f05" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/GemShopModal.jsx",
            lineNumber: 125,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/GemShopModal:113:16",
            "data-dynamic-content": "true",
            onClick: confirmBuy,
            className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all btn-rpg",
            children: "CONFIRM"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/GemShopModal.jsx",
            lineNumber: 132,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/GemShopModal.jsx",
        lineNumber: 124,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 114,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/GemShopModal.jsx",
      lineNumber: 113,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/GemShopModal.jsx",
    lineNumber: 51,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/GemShopModal.jsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
_s(GemShopModal, "BUmx0NoCcAF9hxoA4SINb6Ln4nM=");
_c = GemShopModal;
var _c;
$RefreshReg$(_c, "GemShopModal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/GemShopModal.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/GemShopModal.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUE7QUFBQSxVQUNsUWIsYUFBYU47QUFBQUEsYUFEbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUUE7QUFBQSxNQUNBLHVCQUFDLFNBQUksd0JBQXFCLHVDQUFzQyx3QkFBcUIsUUFBTyxXQUFVLGNBQ3BHO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFPLHdCQUFxQjtBQUFBLFlBQXNDLHdCQUFxQjtBQUFBLFlBQzFGLFNBQVMsTUFBTU8sZ0JBQWdCLElBQUk7QUFBQSxZQUNuQyxXQUFVO0FBQUEsWUFDVixPQUFPLEVBQUVLLFlBQVksV0FBV0MsT0FBTyxXQUFXSyxRQUFRLG9CQUFvQjtBQUFBLFlBQUU7QUFBQTtBQUFBLFVBSDlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU1BO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQU8sd0JBQXFCO0FBQUEsWUFBc0Msd0JBQXFCO0FBQUEsWUFDMUYsU0FBU1A7QUFBQUEsWUFDVCxXQUFVO0FBQUEsWUFBa0U7QUFBQTtBQUFBLFVBRjFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtBO0FBQUEsV0FiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBY0E7QUFBQSxTQXhCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBeUJBLEtBMUJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EyQkU7QUFBQSxPQXpGSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMkZBLEtBNUZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E2RkE7QUFFSjtBQUFDTixHQWpIdUJKLGNBQVk7QUFBQSxLQUFaQTtBQUFZLElBQUFvQjtBQUFBLGFBQUFBLElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiWCIsIlBBQ0tTIiwiaWQiLCJuYW1lIiwicmVzb3VyY2UiLCJhbW91bnQiLCJnZW1Db3N0IiwiR2VtU2hvcE1vZGFsIiwicGxheWVyQmFzZSIsIm9uQnV5Iiwib25DbG9zZSIsIl9zIiwic2VsZWN0ZWRQYWNrIiwic2V0U2VsZWN0ZWRQYWNrIiwiaGFuZGxlQnV5IiwicGFjayIsImdlbXMiLCJjb25maXJtQnV5IiwiYmFja2dyb3VuZCIsImNvbG9yIiwidG9Mb2NhbGVTdHJpbmciLCJtYXAiLCJfX2FycklkeF9fIiwiY2FuQWZmb3JkIiwiYm9yZGVyIiwiX2lkIiwidG9VcHBlckNhc2UiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJHZW1TaG9wTW9kYWwuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgWCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcblxuY29uc3QgUEFDS1MgPSBbXG57IGlkOiBcImdvbGRfc1wiLCBuYW1lOiBcIlNtYWxsIEdvbGQgUGFja1wiLCByZXNvdXJjZTogXCJnb2xkXCIsIGFtb3VudDogNTAwMCwgZ2VtQ29zdDogMTAwIH0sXG57IGlkOiBcImdvbGRfbVwiLCBuYW1lOiBcIk1lZGl1bSBHb2xkIFBhY2tcIiwgcmVzb3VyY2U6IFwiZ29sZFwiLCBhbW91bnQ6IDI1MDAwLCBnZW1Db3N0OiA0MDAgfSxcbnsgaWQ6IFwiZ29sZF9sXCIsIG5hbWU6IFwiTGFyZ2UgR29sZCBQYWNrXCIsIHJlc291cmNlOiBcImdvbGRcIiwgYW1vdW50OiAxMDAwMDAsIGdlbUNvc3Q6IDEyMDAgfSxcbnsgaWQ6IFwibWFuYV9zXCIsIG5hbWU6IFwiU21hbGwgTWFuYSBQYWNrXCIsIHJlc291cmNlOiBcIm1hbmFcIiwgYW1vdW50OiAyNTAwLCBnZW1Db3N0OiAxMDAgfSxcbnsgaWQ6IFwibWFuYV9tXCIsIG5hbWU6IFwiTWVkaXVtIE1hbmEgUGFja1wiLCByZXNvdXJjZTogXCJtYW5hXCIsIGFtb3VudDogMTI1MDAsIGdlbUNvc3Q6IDQwMCB9LFxueyBpZDogXCJtYW5hX2xcIiwgbmFtZTogXCJMYXJnZSBNYW5hIFBhY2tcIiwgcmVzb3VyY2U6IFwibWFuYVwiLCBhbW91bnQ6IDUwMDAwLCBnZW1Db3N0OiAxMjAwIH1dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdlbVNob3BNb2RhbCh7IHBsYXllckJhc2UsIG9uQnV5LCBvbkNsb3NlIH0pIHtcbiAgY29uc3QgW3NlbGVjdGVkUGFjaywgc2V0U2VsZWN0ZWRQYWNrXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUJ1eSA9IChwYWNrKSA9PiB7XG4gICAgaWYgKChwbGF5ZXJCYXNlPy5nZW1zID8/IDApIDwgcGFjay5nZW1Db3N0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFNlbGVjdGVkUGFjayhwYWNrKTtcbiAgfTtcblxuICBjb25zdCBjb25maXJtQnV5ID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZFBhY2spIHtcbiAgICAgIG9uQnV5KHNlbGVjdGVkUGFjayk7XG4gICAgICBzZXRTZWxlY3RlZFBhY2sobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6MzE6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay83MFwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6MzI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInBhbmVsLWRhcmsgcm91bmRlZC14bCB3LVs0NTBweF0gbWF4LWgtWzg1dmhdIGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjM0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNSBweS00IGJvcmRlci1iIGJvcmRlci15ZWxsb3ctNDAwLzIwXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6MzU6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDozNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfko48L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDozNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6Mzg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LXllbGxvdy00MDAgdGV4dC1bMTBweF1cIj5HRU0gU0hPUDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDozOToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtc2xhdGUtNDAwIHRleHQteHNcIj5Db252ZXJ0IGdlbXMgdG8gcmVzb3VyY2VzPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo0MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NDI6ODBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MjB9IC8+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDdXJyZW50IGdlbXMgZGlzcGxheSAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NDY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTUgcHktMyBib3JkZXItYiBib3JkZXIteWVsbG93LTQwMC8xMFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSg5OSwgMTAyLCAyNDEsIDAuMSlcIiB9fT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo0NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjQ4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXNsYXRlLTMwMFwiPllvdXIgR2Vtczo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIGZvbnQtYm9sZCB0ZXh0LWxnXCIgc3R5bGU9e3sgY29sb3I6IFwiIzYwYTVmYVwiIH19PnsocGxheWVyQmFzZT8uZ2VtcyA/PyAwKS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFBhY2tzIGdyaWQgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjU0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAge1BBQ0tTLm1hcCgocGFjaywgX19hcnJJZHhfXykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQWZmb3JkID0gKHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPj0gcGFjay5nZW1Db3N0O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBrZXk9e3BhY2suaWR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBhbmVsLWRhcmsgcm91bmRlZC1sZyBwLTMgdHJhbnNpdGlvbi1hbGwgaG92ZXI6Ym9yZGVyLXllbGxvdy00MDAvNDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cGFjaz8uaWR9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUEFDS1NcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo2MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTIgbWItMlwiIGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUEFDS1NcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo2MzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtMnhsXCIgZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQQUNLU1wiPntwYWNrLnJlc291cmNlID09PSBcImdvbGRcIiA/IFwi8J+SsFwiIDogXCLwn5S3XCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NjQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBBQ0tTXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjY1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LXllbGxvdy00MDAgdGV4dC1bN3B4XVwiIGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUEFDS1NcIiBkYXRhLWFyci1maWVsZD1cIm5hbWVcIj57cGFjay5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo2NjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbGF0ZS00MDAgdGV4dC14c1wiIGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiUEFDS1NcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGFjay5yZXNvdXJjZSA9PT0gXCJnb2xkXCIgPyBcIvCfkrBcIiA6IFwi8J+Ut1wifSB7cGFjay5hbW91bnQudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjcyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTJcIiBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBBQ0tTXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWw6NzM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtdWlcIiBzdHlsZT17eyBjb2xvcjogXCIjNjBhNWZhXCIgfX0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJQQUNLU1wiIGRhdGEtYXJyLWZpZWxkPVwiZ2VtQ29zdFwiPvCfko4ge3BhY2suZ2VtQ29zdH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo3NjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQnV5KHBhY2spfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuQWZmb3JkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0xLjUgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzdweF0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICBjYW5BZmZvcmQgP1xuICAgICAgICAgICAgICAgIFwiYnRuLXJwZyBjdXJzb3ItcG9pbnRlclwiIDpcbiAgICAgICAgICAgICAgICBcImJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCBjdXJzb3Itbm90LWFsbG93ZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS02MDBcIn1gXG4gICAgICAgICAgICAgICAgfSBkYXRhLWFyci1pbmRleD17X19hcnJJZHhfX30gZGF0YS1hcnItdmFyaWFibGUtbmFtZT1cIlBBQ0tTXCI+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHtjYW5BZmZvcmQgPyBcIkJVWVwiIDogXCLinYwgRlVORFNcIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29uZmlybWF0aW9uIG1vZGFsICovfVxuICAgICAgICB7c2VsZWN0ZWRQYWNrICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjk0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzYwXCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo5NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInBhbmVsLWRhcmsgcm91bmRlZC1sZyBwLTUgdy1bMzAwcHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZDRiODk2XCIsIGJvcmRlcjogXCIycHggc29saWQgIzZiM2YxZlwiIH19PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo5NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo5NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSBtYi0yXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PkNPTkZJUk0gUFVSQ0hBU0U8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDo5ODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbVwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c2VsZWN0ZWRQYWNrPy5pZCB8fCBzZWxlY3RlZFBhY2s/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRQYWNrLm5hbWV9ICh7c2VsZWN0ZWRQYWNrLmFtb3VudC50b0xvY2FsZVN0cmluZygpfSB7c2VsZWN0ZWRQYWNrLnJlc291cmNlLnRvVXBwZXJDYXNlKCl9KVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjEwMToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1sZyBmb250LWJvbGQgbXQtMlwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2MGE1ZmFcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImdlbUNvc3RcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c2VsZWN0ZWRQYWNrPy5pZCB8fCBzZWxlY3RlZFBhY2s/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICDwn5KOIHtzZWxlY3RlZFBhY2suZ2VtQ29zdH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvR2VtU2hvcE1vZGFsOjEwNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDoxMDY6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFBhY2sobnVsbCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjNmIzZjFmXCIsIGNvbG9yOiBcIiNmNWU2ZDBcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjM2QxZjA1XCIgfX0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0dlbVNob3BNb2RhbDoxMTM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtjb25maXJtQnV5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0cmFuc2l0aW9uLWFsbCBidG4tcnBnXCI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBDT05GSVJNXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWwuanN4In0=