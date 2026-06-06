import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/ShopModal.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/ShopModal.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { BUILDING_DEFS, TH_SHOP_UNLOCKS } from "/src/lib/gameConstants.js";
const SHOP_ITEMS = [
  { type: "wall", category: "defense", thReq: 1 },
  { type: "army_camp", category: "military", thReq: 1 },
  { type: "hero_base", category: "heroes", thReq: 1 },
  { type: "gold_mine", category: "resources", thReq: 1 },
  { type: "mana_mine", category: "resources", thReq: 1 },
  { type: "gold_mill", category: "resources", thReq: 1 },
  { type: "mana_mill", category: "resources", thReq: 1 },
  { type: "defense_tower", category: "defense", thReq: 1 },
  { type: "armory", category: "special", thReq: 3 },
  { type: "barracks", category: "military", thReq: 4 },
  { type: "gear_vault", category: "special", thReq: 5 },
  { type: "spells_temple", category: "special", thReq: 2 }
];
const CATEGORIES = ["all", "resources", "military", "defense", "heroes", "special"];
export default function ShopModal({ playerBase, buildings, onBuy, onBuyWithGems, onClose, id }) {
  _s();
  const [category, setCategory] = useState(() => {
    try {
      return localStorage.getItem("shop_selected_category") || "all";
    } catch {
      return "all";
    }
  });
  const thLevel = playerBase?.town_hall_level ?? 1;
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    try {
      localStorage.setItem("shop_selected_category", cat);
    } catch {
    }
  };
  const getBuildingCount = (type) => buildings.filter((b) => b.building_type === type).length;
  const getMaxForType = (type) => {
    let max = 0;
    for (let lvl = 1; lvl <= thLevel; lvl++) {
      if (TH_SHOP_UNLOCKS[lvl]?.[type]) max = TH_SHOP_UNLOCKS[lvl][type];
    }
    return max;
  };
  const filtered = SHOP_ITEMS.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    return true;
  });
  const calculateGemCost = (def) => {
    const goldMissing = Math.max(0, def.baseCostGold - (playerBase?.gold ?? 0));
    const manaMissing = Math.max(0, def.baseCostMana - (playerBase?.mana ?? 0));
    return Math.ceil(goldMissing / 100 + manaMissing / 200);
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:61:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:62:6", "data-dynamic-content": "true", className: "panel-dark rounded-xl w-[500px] max-h-[85vh] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:64:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-4 border-b border-yellow-400/20", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:65:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/ShopModal:66:12", "data-dynamic-content": "false", className: "text-2xl", children: "🛒" }, void 0, false, {
          fileName: "/app/src/components/game/ShopModal.jsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:67:12", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:68:14", "data-dynamic-content": "false", className: "font-pixel text-yellow-400 text-[10px]", children: "SHOP" }, void 0, false, {
            fileName: "/app/src/components/game/ShopModal.jsx",
            lineNumber: 87,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:69:14", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-xs", "data-collection-item-field": "thLevel", "data-collection-item-id": id, children: [
            "Town Hall Level ",
            thLevel
          ] }, void 0, true, {
            fileName: "/app/src/components/game/ShopModal.jsx",
            lineNumber: 88,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/ShopModal.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/ShopModal.jsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/ShopModal:72:10", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/ShopModal:72:80", "data-dynamic-content": "false", size: 20 }, void 0, false, {
        fileName: "/app/src/components/game/ShopModal.jsx",
        lineNumber: 91,
        columnNumber: 164
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/ShopModal.jsx",
        lineNumber: 91,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/ShopModal.jsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:76:9", "data-dynamic-content": "true", className: "flex gap-1 px-4 py-2 border-b border-yellow-400/10 overflow-x-auto", children: CATEGORIES.map(
      (cat, __arrIdx__) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/ShopModal:78:13",
          "data-dynamic-content": "true",
          onClick: () => handleCategoryChange(cat),
          className: `px-3 py-1 rounded font-pixel text-[7px] capitalize whitespace-nowrap transition-all ${category === cat ? "bg-yellow-600 text-black" : "text-slate-400 hover:text-yellow-400 hover:bg-slate-800"}`,
          "data-arr-index": __arrIdx__,
          "data-arr-variable-name": "CATEGORIES",
          children: cat
        },
        cat,
        false,
        {
          fileName: "/app/src/components/game/ShopModal.jsx",
          lineNumber: 97,
          columnNumber: 11
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/app/src/components/game/ShopModal.jsx",
      lineNumber: 95,
      columnNumber: 10
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:93:8", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3", children: filtered.map((item) => {
      const def = BUILDING_DEFS[item.type];
      if (!def) return null;
      const isUnlocked = thLevel >= item.thReq;
      const currentCount = getBuildingCount(item.type);
      const maxCount = getMaxForType(item.type);
      const isFull = currentCount >= maxCount && maxCount > 0;
      const canAfford = (playerBase?.gold ?? 0) >= def.baseCostGold && (playerBase?.mana ?? 0) >= def.baseCostMana;
      const gemCost = calculateGemCost(def);
      const canAffordWithGems = (playerBase?.gems ?? 0) >= gemCost;
      const isDisabled = !isUnlocked || isFull || !canAfford && !canAffordWithGems;
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          "data-source-location": "components/game/ShopModal:107:14",
          "data-dynamic-content": "true",
          className: `panel-dark rounded-lg p-3 transition-all ${!isUnlocked ? "opacity-40" : ""} ${isDisabled ? "opacity-50" : ""}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:111:16", "data-dynamic-content": "true", className: "flex items-start gap-2 mb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/ShopModal:112:18", "data-dynamic-content": "true", className: "text-2xl", "data-collection-item-field": "icon", "data-collection-item-id": def?.id || def?._id, children: def.icon }, void 0, false, {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 131,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:113:18", "data-dynamic-content": "true", className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:114:20", "data-dynamic-content": "true", className: "font-pixel text-yellow-400 text-[8px]", "data-collection-item-field": "name", "data-collection-item-id": def?.id || def?._id, children: def.name }, void 0, false, {
                  fileName: "/app/src/components/game/ShopModal.jsx",
                  lineNumber: 133,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:115:20", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-xs", children: isUnlocked ? `${currentCount}/${maxCount > 0 ? maxCount : "∞"} placed` : `TH ${item.thReq} required` }, void 0, false, {
                  fileName: "/app/src/components/game/ShopModal.jsx",
                  lineNumber: 134,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 132,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/ShopModal.jsx",
              lineNumber: 130,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/ShopModal:121:16", "data-dynamic-content": "true", className: "flex gap-2 mb-2", children: [
              def.baseCostGold > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/ShopModal:123:20", "data-dynamic-content": "true", className: `text-xs font-ui ${(playerBase?.gold ?? 0) >= def.baseCostGold ? "text-yellow-400" : "text-red-400"}`, "data-collection-item-field": "baseCostGold", "data-collection-item-id": def?.id || def?._id, children: [
                "💰 ",
                def.baseCostGold
              ] }, void 0, true, {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 142,
                columnNumber: 19
              }, this),
              def.baseCostMana > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/ShopModal:128:20", "data-dynamic-content": "true", className: `text-xs font-ui ${(playerBase?.mana ?? 0) >= def.baseCostMana ? "text-blue-400" : "text-red-400"}`, "data-collection-item-field": "baseCostMana", "data-collection-item-id": def?.id || def?._id, children: [
                "🔷 ",
                def.baseCostMana
              ] }, void 0, true, {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 147,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/ShopModal.jsx",
              lineNumber: 140,
              columnNumber: 17
            }, this),
            canAfford ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/ShopModal:135:19",
                "data-dynamic-content": "true",
                onClick: () => !isDisabled && (onBuy(item.type, def), onClose()),
                disabled: isDisabled,
                className: `w-full py-1.5 rounded font-pixel text-[7px] transition-all ${!isDisabled ? "btn-rpg cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-600"}`,
                children: !isUnlocked ? `🔒 TH ${item.thReq}` : isFull ? "✓ MAX" : "BUY"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 154,
                columnNumber: 17
              },
              this
            ) : canAffordWithGems ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/ShopModal:147:19",
                "data-dynamic-content": "true",
                onClick: () => !isDisabled && (onBuyWithGems(item.type, def, gemCost), onClose()),
                disabled: isDisabled,
                className: `w-full py-1.5 rounded font-pixel text-[7px] transition-all ${!isDisabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`,
                style: {
                  background: "linear-gradient(180deg, hsl(280 65% 55%) 0%, hsl(280 60% 40%) 100%)",
                  border: "2px solid hsl(280 70% 65%)",
                  borderBottom: "3px solid hsl(280 60% 25%)",
                  color: "#fff",
                  boxShadow: "0 2px 0 hsl(280 60% 20%), inset 0 1px 0 hsl(280 100% 80% / 0.3)"
                },
                "data-collection-item-field": "gemCost",
                children: [
                  "💎 PLACE (",
                  gemCost,
                  " gems)"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 166,
                columnNumber: 17
              },
              this
            ) : /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/ShopModal:166:19",
                "data-dynamic-content": "false",
                disabled: true,
                className: "w-full py-1.5 rounded font-pixel text-[7px] transition-all bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-600",
                children: "❌ FUNDS"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/ShopModal.jsx",
                lineNumber: 185,
                columnNumber: 17
              },
              this
            )
          ]
        },
        item.type,
        true,
        {
          fileName: "/app/src/components/game/ShopModal.jsx",
          lineNumber: 126,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/src/components/game/ShopModal.jsx",
      lineNumber: 112,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/ShopModal.jsx",
    lineNumber: 81,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/ShopModal.jsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
_s(ShopModal, "a9t8YZvqf3nBYW44vyAwmz9EOc4=");
_c = ShopModal;
var _c;
$RefreshReg$(_c, "ShopModal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/ShopModal.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/ShopModal.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QSxnQkFFL0IsT0FBTztBQUFBLGtCQUNMSSxZQUFZO0FBQUEsa0JBQ1pDLFFBQVE7QUFBQSxrQkFDUkMsY0FBYztBQUFBLGtCQUNkQyxPQUFPO0FBQUEsa0JBQ1BDLFdBQVc7QUFBQSxnQkFDYjtBQUFBLGdCQUFHLDhCQUEyQjtBQUFBLGdCQUFTO0FBQUE7QUFBQSxrQkFFdkJYO0FBQUFBLGtCQUFRO0FBQUE7QUFBQTtBQUFBLGNBaEJ4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFpQkcsSUFFSDtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUFtQyx3QkFBcUI7QUFBQSxnQkFDckY7QUFBQSxnQkFDQSxXQUFVO0FBQUEsZ0JBQW1JO0FBQUE7QUFBQSxjQUY3STtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFLRztBQUFBO0FBQUE7QUFBQSxRQS9EQWxCLEtBQUs3QjtBQUFBQSxRQURWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFrRUE7QUFBQSxJQUVKLENBQUMsS0FsRkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW1GQTtBQUFBLE9BbEhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FtSEEsS0FwSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVIQTtBQUVKO0FBQUNXLEdBaEt1QlAsV0FBUztBQUFBLEtBQVRBO0FBQVMsSUFBQXVEO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJYIiwiQlVJTERJTkdfREVGUyIsIlRIX1NIT1BfVU5MT0NLUyIsIlNIT1BfSVRFTVMiLCJ0eXBlIiwiY2F0ZWdvcnkiLCJ0aFJlcSIsIkNBVEVHT1JJRVMiLCJTaG9wTW9kYWwiLCJwbGF5ZXJCYXNlIiwiYnVpbGRpbmdzIiwib25CdXkiLCJvbkJ1eVdpdGhHZW1zIiwib25DbG9zZSIsImlkIiwiX3MiLCJzZXRDYXRlZ29yeSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0aExldmVsIiwidG93bl9oYWxsX2xldmVsIiwiaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UiLCJjYXQiLCJzZXRJdGVtIiwiZ2V0QnVpbGRpbmdDb3VudCIsImZpbHRlciIsImIiLCJidWlsZGluZ190eXBlIiwibGVuZ3RoIiwiZ2V0TWF4Rm9yVHlwZSIsIm1heCIsImx2bCIsImZpbHRlcmVkIiwiaXRlbSIsImNhbGN1bGF0ZUdlbUNvc3QiLCJkZWYiLCJnb2xkTWlzc2luZyIsIk1hdGgiLCJiYXNlQ29zdEdvbGQiLCJnb2xkIiwibWFuYU1pc3NpbmciLCJiYXNlQ29zdE1hbmEiLCJtYW5hIiwiY2VpbCIsIm1hcCIsIl9fYXJySWR4X18iLCJpc1VubG9ja2VkIiwiY3VycmVudENvdW50IiwibWF4Q291bnQiLCJpc0Z1bGwiLCJjYW5BZmZvcmQiLCJnZW1Db3N0IiwiY2FuQWZmb3JkV2l0aEdlbXMiLCJnZW1zIiwiaXNEaXNhYmxlZCIsIl9pZCIsImljb24iLCJuYW1lIiwiYmFja2dyb3VuZCIsImJvcmRlciIsImJvcmRlckJvdHRvbSIsImNvbG9yIiwiYm94U2hhZG93IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2hvcE1vZGFsLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBCVUlMRElOR19ERUZTLCBUSF9TSE9QX1VOTE9DS1MgfSBmcm9tIFwiQC9saWIvZ2FtZUNvbnN0YW50c1wiO1xuXG5jb25zdCBTSE9QX0lURU1TID0gW1xueyB0eXBlOiBcIndhbGxcIiwgY2F0ZWdvcnk6IFwiZGVmZW5zZVwiLCB0aFJlcTogMSB9LFxueyB0eXBlOiBcImFybXlfY2FtcFwiLCBjYXRlZ29yeTogXCJtaWxpdGFyeVwiLCB0aFJlcTogMSB9LFxueyB0eXBlOiBcImhlcm9fYmFzZVwiLCBjYXRlZ29yeTogXCJoZXJvZXNcIiwgdGhSZXE6IDEgfSxcbnsgdHlwZTogXCJnb2xkX21pbmVcIiwgY2F0ZWdvcnk6IFwicmVzb3VyY2VzXCIsIHRoUmVxOiAxIH0sXG57IHR5cGU6IFwibWFuYV9taW5lXCIsIGNhdGVnb3J5OiBcInJlc291cmNlc1wiLCB0aFJlcTogMSB9LFxueyB0eXBlOiBcImdvbGRfbWlsbFwiLCBjYXRlZ29yeTogXCJyZXNvdXJjZXNcIiwgdGhSZXE6IDEgfSxcbnsgdHlwZTogXCJtYW5hX21pbGxcIiwgY2F0ZWdvcnk6IFwicmVzb3VyY2VzXCIsIHRoUmVxOiAxIH0sXG57IHR5cGU6IFwiZGVmZW5zZV90b3dlclwiLCBjYXRlZ29yeTogXCJkZWZlbnNlXCIsIHRoUmVxOiAxIH0sXG57IHR5cGU6IFwiYXJtb3J5XCIsIGNhdGVnb3J5OiBcInNwZWNpYWxcIiwgdGhSZXE6IDMgfSxcbnsgdHlwZTogXCJiYXJyYWNrc1wiLCBjYXRlZ29yeTogXCJtaWxpdGFyeVwiLCB0aFJlcTogNCB9LFxueyB0eXBlOiBcImdlYXJfdmF1bHRcIiwgY2F0ZWdvcnk6IFwic3BlY2lhbFwiLCB0aFJlcTogNSB9LFxueyB0eXBlOiBcInNwZWxsc190ZW1wbGVcIiwgY2F0ZWdvcnk6IFwic3BlY2lhbFwiLCB0aFJlcTogMiB9XTtcblxuXG5jb25zdCBDQVRFR09SSUVTID0gW1wiYWxsXCIsIFwicmVzb3VyY2VzXCIsIFwibWlsaXRhcnlcIiwgXCJkZWZlbnNlXCIsIFwiaGVyb2VzXCIsIFwic3BlY2lhbFwiXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hvcE1vZGFsKHsgcGxheWVyQmFzZSwgYnVpbGRpbmdzLCBvbkJ1eSwgb25CdXlXaXRoR2Vtcywgb25DbG9zZSwgaWQgfSkge1xuICBjb25zdCBbY2F0ZWdvcnksIHNldENhdGVnb3J5XSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2hvcF9zZWxlY3RlZF9jYXRlZ29yeVwiKSB8fCBcImFsbFwiO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIFwiYWxsXCI7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgdGhMZXZlbCA9IHBsYXllckJhc2U/LnRvd25faGFsbF9sZXZlbCA/PyAxO1xuXG4gIGNvbnN0IGhhbmRsZUNhdGVnb3J5Q2hhbmdlID0gKGNhdCkgPT4ge1xuICAgIHNldENhdGVnb3J5KGNhdCk7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2hvcF9zZWxlY3RlZF9jYXRlZ29yeVwiLCBjYXQpO1xuICAgIH0gY2F0Y2gge31cbiAgfTtcblxuICBjb25zdCBnZXRCdWlsZGluZ0NvdW50ID0gKHR5cGUpID0+IGJ1aWxkaW5ncy5maWx0ZXIoKGIpID0+IGIuYnVpbGRpbmdfdHlwZSA9PT0gdHlwZSkubGVuZ3RoO1xuXG4gIGNvbnN0IGdldE1heEZvclR5cGUgPSAodHlwZSkgPT4ge1xuICAgIGxldCBtYXggPSAwO1xuICAgIGZvciAobGV0IGx2bCA9IDE7IGx2bCA8PSB0aExldmVsOyBsdmwrKykge1xuICAgICAgaWYgKFRIX1NIT1BfVU5MT0NLU1tsdmxdPy5bdHlwZV0pIG1heCA9IFRIX1NIT1BfVU5MT0NLU1tsdmxdW3R5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gbWF4O1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gU0hPUF9JVEVNUy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICBpZiAoY2F0ZWdvcnkgIT09IFwiYWxsXCIgJiYgaXRlbS5jYXRlZ29yeSAhPT0gY2F0ZWdvcnkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlR2VtQ29zdCA9IChkZWYpID0+IHtcbiAgICBjb25zdCBnb2xkTWlzc2luZyA9IE1hdGgubWF4KDAsIGRlZi5iYXNlQ29zdEdvbGQgLSAocGxheWVyQmFzZT8uZ29sZCA/PyAwKSk7XG4gICAgY29uc3QgbWFuYU1pc3NpbmcgPSBNYXRoLm1heCgwLCBkZWYuYmFzZUNvc3RNYW5hIC0gKHBsYXllckJhc2U/Lm1hbmEgPz8gMCkpO1xuICAgIHJldHVybiBNYXRoLmNlaWwoZ29sZE1pc3NpbmcgLyAxMDAgKyBtYW5hTWlzc2luZyAvIDIwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDo2MTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzcwXCI+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDo2Mjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicGFuZWwtZGFyayByb3VuZGVkLXhsIHctWzUwMHB4XSBtYXgtaC1bODV2aF0gZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6NjQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXllbGxvdy00MDAvMjBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDo2NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6NjY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5uSPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6Njc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6Njg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LXllbGxvdy00MDAgdGV4dC1bMTBweF1cIj5TSE9QPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvU2hvcE1vZGFsOjY5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ0aExldmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2lkfT5Ub3duIEhhbGwgTGV2ZWwge3RoTGV2ZWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDo3MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6NzI6ODBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MjB9IC8+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDYXRlZ29yeSB0YWJzICovfVxuICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6NzY6OVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTEgcHgtNCBweS0yIGJvcmRlci1iIGJvcmRlci15ZWxsb3ctNDAwLzEwIG92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgICB7Q0FURUdPUklFUy5tYXAoKGNhdCwgX19hcnJJZHhfXykgPT5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDo3ODoxM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAga2V5PXtjYXR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UoY2F0KX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzdweF0gY2FwaXRhbGl6ZSB3aGl0ZXNwYWNlLW5vd3JhcCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgIGNhdGVnb3J5ID09PSBjYXQgP1xuICAgICAgICAgIFwiYmcteWVsbG93LTYwMCB0ZXh0LWJsYWNrXCIgOlxuICAgICAgICAgIFwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC15ZWxsb3ctNDAwIGhvdmVyOmJnLXNsYXRlLTgwMFwifWBcbiAgICAgICAgICB9IGRhdGEtYXJyLWluZGV4PXtfX2FycklkeF9ffSBkYXRhLWFyci12YXJpYWJsZS1uYW1lPVwiQ0FURUdPUklFU1wiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICB7Y2F0fVxuICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogSXRlbXMgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvU2hvcE1vZGFsOjkzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAge2ZpbHRlcmVkLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVmID0gQlVJTERJTkdfREVGU1tpdGVtLnR5cGVdO1xuICAgICAgICAgICAgaWYgKCFkZWYpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgY29uc3QgaXNVbmxvY2tlZCA9IHRoTGV2ZWwgPj0gaXRlbS50aFJlcTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IGdldEJ1aWxkaW5nQ291bnQoaXRlbS50eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IG1heENvdW50ID0gZ2V0TWF4Rm9yVHlwZShpdGVtLnR5cGUpO1xuICAgICAgICAgICAgY29uc3QgaXNGdWxsID0gY3VycmVudENvdW50ID49IG1heENvdW50ICYmIG1heENvdW50ID4gMDtcbiAgICAgICAgICAgIGNvbnN0IGNhbkFmZm9yZCA9IChwbGF5ZXJCYXNlPy5nb2xkID8/IDApID49IGRlZi5iYXNlQ29zdEdvbGQgJiYgKHBsYXllckJhc2U/Lm1hbmEgPz8gMCkgPj0gZGVmLmJhc2VDb3N0TWFuYTtcbiAgICAgICAgICAgIGNvbnN0IGdlbUNvc3QgPSBjYWxjdWxhdGVHZW1Db3N0KGRlZik7XG4gICAgICAgICAgICBjb25zdCBjYW5BZmZvcmRXaXRoR2VtcyA9IChwbGF5ZXJCYXNlPy5nZW1zID8/IDApID49IGdlbUNvc3Q7XG4gICAgICAgICAgICBjb25zdCBpc0Rpc2FibGVkID0gIWlzVW5sb2NrZWQgfHwgaXNGdWxsIHx8ICFjYW5BZmZvcmQgJiYgIWNhbkFmZm9yZFdpdGhHZW1zO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDoxMDc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBrZXk9e2l0ZW0udHlwZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGFuZWwtZGFyayByb3VuZGVkLWxnIHAtMyB0cmFuc2l0aW9uLWFsbCAkeyFpc1VubG9ja2VkID8gXCJvcGFjaXR5LTQwXCIgOiBcIlwifSAke2lzRGlzYWJsZWQgPyBcIm9wYWNpdHktNTBcIiA6IFwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6MTExOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMiBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6MTEyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImljb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZGVmPy5pZCB8fCBkZWY/Ll9pZH0+e2RlZi5pY29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvU2hvcE1vZGFsOjExMzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDoxMTQ6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQteWVsbG93LTQwMCB0ZXh0LVs4cHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2RlZj8uaWQgfHwgZGVmPy5faWR9PntkZWYubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6MTE1OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2lzVW5sb2NrZWQgPyBgJHtjdXJyZW50Q291bnR9LyR7bWF4Q291bnQgPiAwID8gbWF4Q291bnQgOiBcIuKInlwifSBwbGFjZWRgIDogYFRIICR7aXRlbS50aFJlcX0gcmVxdWlyZWRgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6MTIxOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICB7ZGVmLmJhc2VDb3N0R29sZCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDoxMjM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtdWkgJHsocGxheWVyQmFzZT8uZ29sZCA/PyAwKSA+PSBkZWYuYmFzZUNvc3RHb2xkID8gXCJ0ZXh0LXllbGxvdy00MDBcIiA6IFwidGV4dC1yZWQtNDAwXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJiYXNlQ29zdEdvbGRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZGVmPy5pZCB8fCBkZWY/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICAgICAg8J+SsCB7ZGVmLmJhc2VDb3N0R29sZH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAge2RlZi5iYXNlQ29zdE1hbmEgPiAwICYmXG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9TaG9wTW9kYWw6MTI4OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LXVpICR7KHBsYXllckJhc2U/Lm1hbmEgPz8gMCkgPj0gZGVmLmJhc2VDb3N0TWFuYSA/IFwidGV4dC1ibHVlLTQwMFwiIDogXCJ0ZXh0LXJlZC00MDBcIn1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImJhc2VDb3N0TWFuYVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkZWY/LmlkIHx8IGRlZj8uX2lkfT5cbiAgICAgICAgICAgICAgICAgICAgICDwn5S3IHtkZWYuYmFzZUNvc3RNYW5hfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7Y2FuQWZmb3JkID9cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDoxMzU6MTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0Rpc2FibGVkICYmIChvbkJ1eShpdGVtLnR5cGUsIGRlZiksIG9uQ2xvc2UoKSl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTEuNSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICFpc0Rpc2FibGVkID9cbiAgICAgICAgICAgICAgICBcImJ0bi1ycGcgY3Vyc29yLXBvaW50ZXJcIiA6XG4gICAgICAgICAgICAgICAgXCJiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItc2xhdGUtNjAwXCJ9YFxuICAgICAgICAgICAgICAgIH0+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIHshaXNVbmxvY2tlZCA/IGDwn5SSIFRIICR7aXRlbS50aFJlcX1gIDogaXNGdWxsID8gXCLinJMgTUFYXCIgOiBcIkJVWVwifVxuICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPiA6XG4gICAgICAgICAgICAgICAgY2FuQWZmb3JkV2l0aEdlbXMgP1xuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvU2hvcE1vZGFsOjE0NzoxOVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gIWlzRGlzYWJsZWQgJiYgKG9uQnV5V2l0aEdlbXMoaXRlbS50eXBlLCBkZWYsIGdlbUNvc3QpLCBvbkNsb3NlKCkpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0xLjUgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzdweF0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAhaXNEaXNhYmxlZCA/XG4gICAgICAgICAgICAgICAgXCJjdXJzb3ItcG9pbnRlclwiIDpcbiAgICAgICAgICAgICAgICBcImN1cnNvci1ub3QtYWxsb3dlZCBvcGFjaXR5LTUwXCJ9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCBoc2woMjgwIDY1JSA1NSUpIDAlLCBoc2woMjgwIDYwJSA0MCUpIDEwMCUpXCIsXG4gICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMnB4IHNvbGlkIGhzbCgyODAgNzAlIDY1JSlcIixcbiAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIzcHggc29saWQgaHNsKDI4MCA2MCUgMjUlKVwiLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBcIjAgMnB4IDAgaHNsKDI4MCA2MCUgMjAlKSwgaW5zZXQgMCAxcHggMCBoc2woMjgwIDEwMCUgODAlIC8gMC4zKVwiXG4gICAgICAgICAgICAgICAgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJnZW1Db3N0XCI+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIPCfko4gUExBQ0UgKHtnZW1Db3N0fSBnZW1zKVxuICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPiA6XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbDoxNjY6MTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0xLjUgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzdweF0gdHJhbnNpdGlvbi1hbGwgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICDinYwgRlVORFNcbiAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2Pik7XG5cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuXG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbC5qc3gifQ==