import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/BuildingPanel.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/BuildingPanel.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { BUILDING_DEFS, BUILDING_COLORS, getUpgradeCost, getUpgradeSecondsRemaining, formatTime, getMineProduction, getVaultCapacity, getGearUpgradeCost, getSpellsTempleUpgradeCost, getSpellsTempleUsageCost, getBuildingLevelCap, getBuildingMaxHP } from "/src/lib/gameConstants.js";
import { X, ArrowUp, Clock, Move } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { getCachedHeroImage } from "/src/lib/heroSprites.js";
export default function BuildingPanel({ building, playerBase, onUpgrade, onClose, onMove, heroes, onSpeedUp, onUpgradeWithGems, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (!building?.is_upgrading) return;
    const interval = setInterval(() => {
      setTimeLeft(getUpgradeSecondsRemaining(building));
    }, 1e3);
    setTimeLeft(getUpgradeSecondsRemaining(building));
    return () => clearInterval(interval);
  }, [building]);
  if (!building) return null;
  const def = BUILDING_DEFS[building.building_type];
  const colors = BUILDING_COLORS[building.building_type] || { border: "#4a4a6e" };
  const upgCost = getUpgradeCost(building.building_type, building.level);
  const canAfford = (upgCost.gold === 0 || (playerBase?.gold ?? 0) >= upgCost.gold) && (upgCost.mana === 0 || (playerBase?.mana ?? 0) >= upgCost.mana);
  const goldMissing = upgCost.gold > 0 ? Math.max(0, upgCost.gold - (playerBase?.gold ?? 0)) : 0;
  const manaMissing = upgCost.mana > 0 ? Math.max(0, upgCost.mana - (playerBase?.mana ?? 0)) : 0;
  const gemsNeededForMissing = Math.ceil(goldMissing / 100 + manaMissing / 200);
  const canAffordWithGems = canAfford || (playerBase?.gems ?? 0) >= gemsNeededForMissing;
  const levelCap = getBuildingLevelCap(building.building_type, playerBase?.town_hall_level ?? 1);
  const isMaxLevel = building.level >= levelCap;
  const stationedHero = heroes?.find((h) => h.stationed_at_building_id === building.id);
  const isMineOrMill = building.building_type === "gold_mine" || building.building_type === "gold_mill" || building.building_type === "mana_mine";
  const storedGold = building.custom_data?.stored_gold || 0;
  const storedMana = building.custom_data?.stored_mana || 0;
  const prodStats = isMineOrMill ? getMineProduction(building.level) : null;
  const isVault = building.building_type === "gold_mill" || building.building_type === "mana_vault";
  const isMine = building.building_type === "gold_mine" || building.building_type === "mana_mine";
  const vaultCapacity = isVault ? getVaultCapacity(building.level) : null;
  const buildingMaxHP = getBuildingMaxHP(building.building_type, building.level);
  const isGearVault = building.building_type === "gear_vault";
  const gearSlots = 8;
  const isSpellsTemple = building.building_type === "spells_temple";
  const spellUpgradeCost = isSpellsTemple ? getSpellsTempleUpgradeCost(building.level) : 0;
  const spellUsageCost = isSpellsTemple ? getSpellsTempleUsageCost(building.level) : 0;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "components/game/BuildingPanel:61:4",
      "data-dynamic-content": "true",
      className: "absolute bottom-20 left-1/2 -translate-x-1/2 z-40 w-[360px] rounded-lg overflow-hidden",
      style: { background: "#d4b896", border: "2px solid #6b3f1f", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:64:6", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-3", style: { borderBottom: "1px solid #6b3f1f66", background: "#c4a47a" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:65:8", "data-dynamic-content": "true", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/BuildingPanel:66:10",
              "data-dynamic-content": "true",
              onClick: onMove,
              className: "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-pixel transition-all hover:opacity-80",
              style: { background: "#6b3f1f", color: "#f5e6d0", border: "1px solid #3d1f05" },
              title: "Move building",
              children: [
                /* @__PURE__ */ jsxDEV(Move, { "data-source-location": "components/game/BuildingPanel:72:12", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 91,
                  columnNumber: 13
                }, this),
                " MOVE"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 85,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 84,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:75:8", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:76:10", "data-dynamic-content": "true", className: "text-right", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:77:12", "data-dynamic-content": "true", className: "font-pixel text-[9px]", style: { color: "#3d1f05" }, children: def?.name || building.building_type }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 96,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:78:12", "data-dynamic-content": "true", className: "font-ui text-xs", style: { color: "#6b3f1f" }, "data-collection-item-field": "levelCap", "data-collection-item-id": __dataCollectionItemId, children: [
                "Level ",
                /* @__PURE__ */ jsxDEV(NumVal, { "data-source-location": "components/game/BuildingPanel:79:20", "data-dynamic-content": "true", "data-collection-item-field": "level", "data-collection-item-id": building?.id || building?._id, children: building.level }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 98,
                  columnNumber: 21
                }, this),
                " / ",
                levelCap,
                " ",
                isMaxLevel && "(MAX)"
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 97,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 95,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:82:10", "data-dynamic-content": "true", className: "text-2xl", children: def?.icon || "🏠" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 101,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/BuildingPanel:83:10", "data-dynamic-content": "true", onClick: onClose, className: "transition-colors hover:opacity-60", style: { color: "#6b3f1f" }, children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/BuildingPanel:84:12", "data-dynamic-content": "false", size: 18 }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 103,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 102,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 94,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/BuildingPanel.jsx",
          lineNumber: 83,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:89:6", "data-dynamic-content": "true", className: "px-4 py-3 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:91:8", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:92:10", "data-dynamic-content": "true", className: "flex justify-between text-xs font-ui mb-1", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:93:12", "data-dynamic-content": "true", style: { color: "#6b3f1f" }, children: "HP" }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 112,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:94:12", "data-dynamic-content": "true", className: "font-ui text-xs font-bold", style: { color: "#fff", textShadow: "0 0 3px #333, 0 1px 2px #555" }, "data-collection-item-field": "hp", "data-collection-item-id": building?.id || building?._id, children: [
                building.hp.toLocaleString(),
                " / ",
                buildingMaxHP.toLocaleString()
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 113,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 111,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:96:10", "data-dynamic-content": "true", className: "health-bar h-2", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:97:12", "data-dynamic-content": "true", className: "health-bar-fill", style: { width: `${building.hp / buildingMaxHP * 100}%` } }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 116,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 115,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 110,
            columnNumber: 9
          }, this),
          building.building_type === "hero_base" && stationedHero && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:103:10", "data-dynamic-content": "true", className: "rounded px-3 py-2 flex items-center gap-3", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV(HeroSpriteDisplay, { "data-source-location": "components/game/BuildingPanel:104:12", "data-dynamic-content": "true", heroType: stationedHero.hero_type || stationedHero.portrait }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 123,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:105:12", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:106:14", "data-dynamic-content": "true", className: "font-ui font-semibold text-sm", style: { color: "#3d1f05" }, "data-collection-item-field": "name", "data-collection-item-id": stationedHero?.id || stationedHero?._id, children: stationedHero.name }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 125,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:107:14", "data-dynamic-content": "true", className: "font-ui text-xs", style: { color: "#6b3f1f" }, "data-collection-item-field": "level", "data-collection-item-id": stationedHero?.id || stationedHero?._id, children: [
                "Stationed · Lv.",
                stationedHero.level
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 126,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 124,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 122,
            columnNumber: 9
          }, this),
          building.building_type === "hero_base" && !stationedHero && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:112:10", "data-dynamic-content": "true", className: "rounded px-3 py-2 text-center", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:113:12", "data-dynamic-content": "true", className: "font-ui text-xs", style: { color: "#6b3f1f" }, children: "No hero stationed" }, void 0, false, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 132,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 131,
            columnNumber: 9
          }, this),
          isMineOrMill && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:119:10", "data-dynamic-content": "true", className: "rounded px-3 py-2", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:120:12", "data-dynamic-content": "true", className: "font-ui text-xs font-semibold mb-1", style: { color: "#3d1f05" }, children: [
              building.building_type.includes("gold") ? "💰 GOLD" : "🔷 MANA",
              " STORAGE"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 139,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:123:12", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:124:14", "data-dynamic-content": "true", className: "font-ui text-lg font-bold", style: { color: "#fff", textShadow: "0 0 3px #333" }, children: building.building_type.includes("gold") ? storedGold.toLocaleString() : storedMana.toLocaleString() }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 143,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:127:14", "data-dynamic-content": "true", className: "font-ui text-xs", style: { color: "#6b3f1f" }, children: [
                "/ ",
                prodStats?.storage.toLocaleString()
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 146,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 142,
              columnNumber: 13
            }, this),
            isMine && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:132:14", "data-dynamic-content": "true", className: "font-ui text-[10px] mt-1", style: { color: "#6b3f1f" }, children: [
              "Production: ",
              prodStats?.production_per_hour.toLocaleString(),
              "/hr"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 151,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 138,
            columnNumber: 9
          }, this),
          isVault && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:141:10", "data-dynamic-content": "true", className: "rounded px-3 py-2", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:142:12", "data-dynamic-content": "true", className: "font-ui text-xs font-semibold mb-1", style: { color: "#3d1f05" }, children: "VAULT CAPACITY" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 161,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:143:12", "data-dynamic-content": "true", className: "font-ui text-lg font-bold", style: { color: "#fff", textShadow: "0 0 3px #333" }, children: vaultCapacity?.toLocaleString() }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 162,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:146:12", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "Gold storage limit" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 165,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 160,
            columnNumber: 9
          }, this),
          isGearVault && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:152:10", "data-dynamic-content": "true", className: "rounded px-3 py-2", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:153:12", "data-dynamic-content": "true", className: "font-ui text-xs font-semibold mb-1", style: { color: "#3d1f05" }, children: "GEAR SLOTS" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 172,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:154:12", "data-dynamic-content": "true", className: "font-ui text-lg font-bold", style: { color: "#fff", textShadow: "0 0 3px #333" }, "data-collection-item-field": "gearSlots", "data-collection-item-id": __dataCollectionItemId, children: [
              gearSlots,
              " Equipment Slots"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 173,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:157:12", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "Upgrade gear with shards & mana" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 176,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 171,
            columnNumber: 9
          }, this),
          isSpellsTemple && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:163:10", "data-dynamic-content": "true", className: "rounded px-3 py-2 space-y-2", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:164:12", "data-dynamic-content": "true", className: "font-ui text-xs font-semibold", style: { color: "#3d1f05" }, children: "SPELL POWER" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 183,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:165:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:166:14", "data-dynamic-content": "true", className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:167:16", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "Upgrade Cost" }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 186,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:168:16", "data-dynamic-content": "true", className: "font-ui text-sm font-bold", style: { color: "#38bdf8" }, children: [
                  "🔷 ",
                  spellUpgradeCost.toLocaleString()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 185,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:170:14", "data-dynamic-content": "true", className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:171:16", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "Battle Cost" }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:172:16", "data-dynamic-content": "true", className: "font-ui text-sm font-bold", style: { color: "#38bdf8" }, children: [
                  "🔷 ",
                  spellUsageCost.toLocaleString()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 191,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 189,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 184,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:175:12", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "Damage, Protection & Healing spells" }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 194,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 182,
            columnNumber: 9
          }, this),
          building.is_upgrading ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:181:10", "data-dynamic-content": "true", className: "rounded px-3 py-3 text-center space-y-2", style: { background: "#b8936a", border: "1px solid #6b3f1f" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:182:12", "data-dynamic-content": "true", className: "flex items-center justify-center gap-2 mb-1", style: { color: "#3d1f05" }, children: [
              /* @__PURE__ */ jsxDEV(Clock, { "data-source-location": "components/game/BuildingPanel:183:14", "data-dynamic-content": "false", size: 14 }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 202,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:184:14", "data-dynamic-content": "false", className: "font-pixel text-[8px]", children: "UPGRADING" }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 203,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 201,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:186:12", "data-dynamic-content": "true", className: "font-ui text-xl font-bold", style: { color: "#fff", textShadow: "0 0 4px #555, 0 1px 3px #333" }, children: formatTime(timeLeft) }, void 0, false, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 205,
              columnNumber: 13
            }, this),
            onSpeedUp && /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/BuildingPanel:188:14",
                "data-dynamic-content": "true",
                onClick: () => onSpeedUp(building, timeLeft),
                disabled: (playerBase?.gems ?? 0) < upgCost.gems,
                className: "w-full py-1.5 rounded font-pixel text-[8px] transition-all btn-rpg",
                style: { background: "#6366f1", border: "1px solid #4f46e5", color: "#fff" },
                "data-collection-item-field": "gems",
                "data-collection-item-id": upgCost?.id || upgCost?._id,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:194:16", "data-dynamic-content": "false", className: "inline mr-1", children: "💎" }, void 0, false, {
                    fileName: "/app/src/components/game/BuildingPanel.jsx",
                    lineNumber: 213,
                    columnNumber: 17
                  }, this),
                  "SPEED UP (",
                  upgCost.gems,
                  " gems)"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 207,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 200,
            columnNumber: 9
          }, this) : isMaxLevel ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:200:10", "data-dynamic-content": "true", className: "text-center py-2", children: /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:201:12", "data-dynamic-content": "true", className: "font-pixel text-[9px]", style: { color: "#3d1f05" }, children: "⭐ MAX LEVEL" }, void 0, false, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 220,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 219,
            columnNumber: 9
          }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:204:10", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:205:12", "data-dynamic-content": "true", className: "font-pixel text-[8px] mb-2", style: { color: "#6b3f1f" }, children: [
              "UPGRADE TO LVL ",
              building.level + 1
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 224,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:206:12", "data-dynamic-content": "true", className: "flex gap-3 mb-3", children: [
              upgCost.gold > 0 && /* @__PURE__ */ jsxDEV(CostBadge, { "data-source-location": "components/game/BuildingPanel:207:35", "data-dynamic-content": "true", icon: "💰", value: upgCost.gold.toLocaleString(), label: "Gold", enough: (playerBase?.gold ?? 0) >= upgCost.gold }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 226,
                columnNumber: 36
              }, this),
              upgCost.mana > 0 && /* @__PURE__ */ jsxDEV(CostBadge, { "data-source-location": "components/game/BuildingPanel:208:35", "data-dynamic-content": "true", icon: "🔷", value: upgCost.mana.toLocaleString(), label: "Mana", enough: (playerBase?.mana ?? 0) >= upgCost.mana }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 227,
                columnNumber: 36
              }, this),
              /* @__PURE__ */ jsxDEV(CostBadge, { "data-source-location": "components/game/BuildingPanel:209:14", "data-dynamic-content": "true", icon: "⏱️", value: formatTime(upgCost.seconds), label: "Time", enough: true }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 228,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(CostBadge, { "data-source-location": "components/game/BuildingPanel:210:14", "data-dynamic-content": "true", icon: "💎", value: upgCost.gems, label: "Skip", enough: true }, void 0, false, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 229,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 225,
              columnNumber: 13
            }, this),
            canAfford ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/BuildingPanel:213:14",
                "data-dynamic-content": "true",
                onClick: () => onUpgrade(building, upgCost),
                className: "w-full py-2 rounded font-pixel text-[9px] transition-all btn-rpg cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(ArrowUp, { "data-source-location": "components/game/BuildingPanel:217:16", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
                    fileName: "/app/src/components/game/BuildingPanel.jsx",
                    lineNumber: 236,
                    columnNumber: 17
                  }, this),
                  "UPGRADE"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 232,
                columnNumber: 11
              },
              this
            ) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:221:14", "data-dynamic-content": "true", className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:222:16", "data-dynamic-content": "true", className: "rounded px-3 py-2 text-center", style: { background: "#7a2020", border: "1px solid #a03030" }, children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:223:18", "data-dynamic-content": "true", className: "font-ui text-xs font-bold", style: { color: "#ffaaaa" }, children: "INSUFFICIENT RESOURCES" }, void 0, false, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 242,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:224:18", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#ffcccc" }, children: [
                  "Missing: ",
                  goldMissing > 0 && `${goldMissing.toLocaleString()} 💰 `,
                  manaMissing > 0 && `${manaMissing.toLocaleString()} 🔷`
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 243,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/BuildingPanel.jsx",
                lineNumber: 241,
                columnNumber: 17
              }, this),
              onUpgradeWithGems && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/BuildingPanel:229:18",
                  "data-dynamic-content": "true",
                  onClick: () => onUpgradeWithGems(building, upgCost, gemsNeededForMissing),
                  disabled: (playerBase?.gems ?? 0) < gemsNeededForMissing,
                  className: `w-full py-2 rounded font-pixel text-[9px] transition-all ${(playerBase?.gems ?? 0) >= gemsNeededForMissing ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`,
                  style: {
                    background: "linear-gradient(180deg, hsl(280 65% 55%) 0%, hsl(280 60% 40%) 100%)",
                    border: "2px solid hsl(280 70% 65%)",
                    borderBottom: "3px solid hsl(280 60% 25%)",
                    color: "#fff",
                    boxShadow: "0 2px 0 hsl(280 60% 20%), inset 0 1px 0 hsl(280 100% 80% / 0.3)"
                  },
                  "data-collection-item-field": "gemsNeededForMissing",
                  "data-collection-item-id": __dataCollectionItemId,
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:245:20", "data-dynamic-content": "false", className: "inline mr-1", children: "💎" }, void 0, false, {
                      fileName: "/app/src/components/game/BuildingPanel.jsx",
                      lineNumber: 264,
                      columnNumber: 21
                    }, this),
                    "USE ",
                    gemsNeededForMissing,
                    " GEMS INSTEAD"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/components/game/BuildingPanel.jsx",
                  lineNumber: 248,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/BuildingPanel.jsx",
              lineNumber: 240,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/BuildingPanel.jsx",
            lineNumber: 223,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/BuildingPanel.jsx",
          lineNumber: 108,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/BuildingPanel.jsx",
      lineNumber: 80,
      columnNumber: 5
    },
    this
  );
}
_s(BuildingPanel, "+8R8qG0ytIJ3hDO9yvGoGENFV+4=");
_c = BuildingPanel;
function HeroSpriteDisplay({ heroType, "data-collection-item-id": __dataCollectionItemId }) {
  const img = heroType ? getCachedHeroImage(heroType, "S") : null;
  if (img) {
    return /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/BuildingPanel:261:11", "data-dynamic-content": "true", src: img.src, style: { width: 40, height: 40, imageRendering: "pixelated" }, alt: "", "data-collection-item-id": __dataCollectionItemId }, void 0, false, {
      fileName: "/app/src/components/game/BuildingPanel.jsx",
      lineNumber: 280,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:263:9", "data-dynamic-content": "false", className: "text-2xl", "data-collection-item-id": __dataCollectionItemId, children: "🗡️" }, void 0, false, {
    fileName: "/app/src/components/game/BuildingPanel.jsx",
    lineNumber: 282,
    columnNumber: 10
  }, this);
}
_c2 = HeroSpriteDisplay;
function NumVal({ children, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/BuildingPanel:269:4", "data-dynamic-content": "true", style: { color: "#fff", textShadow: "0 0 3px #555, 0 1px 2px #333" }, "data-collection-item-id": __dataCollectionItemId, children }, void 0, false, {
    fileName: "/app/src/components/game/BuildingPanel.jsx",
    lineNumber: 288,
    columnNumber: 5
  }, this);
}
_c3 = NumVal;
function CostBadge({ icon, value, label, enough, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:275:4", "data-dynamic-content": "true", className: "flex-1 rounded px-2 py-1.5 text-center", style: { background: enough ? "#b8936a" : "#7a2020", border: `1px solid ${enough ? "#6b3f1f" : "#a03030"}` }, "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:276:6", "data-dynamic-content": "true", className: "text-base", "data-collection-item-field": "icon", "data-collection-item-id": __dataCollectionItemId, children: icon }, void 0, false, {
      fileName: "/app/src/components/game/BuildingPanel.jsx",
      lineNumber: 295,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:277:6", "data-dynamic-content": "true", className: "font-ui font-bold text-xs", style: { color: "#fff", textShadow: "0 0 3px #555, 0 1px 2px #333" }, "data-collection-item-field": "value", "data-collection-item-id": __dataCollectionItemId, children: value }, void 0, false, {
      fileName: "/app/src/components/game/BuildingPanel.jsx",
      lineNumber: 296,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/BuildingPanel:278:6", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: enough ? "#3d1f05" : "#ffaaaa" }, "data-collection-item-field": "label", "data-collection-item-id": __dataCollectionItemId, children: label }, void 0, false, {
      fileName: "/app/src/components/game/BuildingPanel.jsx",
      lineNumber: 297,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/BuildingPanel.jsx",
    lineNumber: 294,
    columnNumber: 5
  }, this);
}
_c4 = CostBadge;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "BuildingPanel");
$RefreshReg$(_c2, "HeroSpriteDisplay");
$RefreshReg$(_c3, "NumVal");
$RefreshReg$(_c4, "CostBadge");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/BuildingPanel.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/BuildingPanel.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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SCxPQUFPLFFBQVFJLFlBQVksK0JBQStCLEdBQUcsOEJBQTJCLFNBQVEsMkJBQXlCeEQsd0JBQXlCNkUsbUJBQTdSO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBbVM7QUFBQSxJQUNuUyx1QkFBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSx1QkFBc0IsT0FBTyxFQUFFekIsT0FBTzJCLFNBQVMsWUFBWSxVQUFVLEdBQUcsOEJBQTJCLFNBQVEsMkJBQXlCL0Usd0JBQXlCOEUsbUJBQW5RO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBeVE7QUFBQSxPQUgzUTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSUE7QUFFSjtBQUFDRSxNQVJRSjtBQUFTLElBQUFLLElBQUFULEtBQUFHLEtBQUFLO0FBQUEsYUFBQUMsSUFBQTtBQUFBLGFBQUFULEtBQUE7QUFBQSxhQUFBRyxLQUFBO0FBQUEsYUFBQUssS0FBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCVUlMRElOR19ERUZTIiwiQlVJTERJTkdfQ09MT1JTIiwiZ2V0VXBncmFkZUNvc3QiLCJnZXRVcGdyYWRlU2Vjb25kc1JlbWFpbmluZyIsImZvcm1hdFRpbWUiLCJnZXRNaW5lUHJvZHVjdGlvbiIsImdldFZhdWx0Q2FwYWNpdHkiLCJnZXRHZWFyVXBncmFkZUNvc3QiLCJnZXRTcGVsbHNUZW1wbGVVcGdyYWRlQ29zdCIsImdldFNwZWxsc1RlbXBsZVVzYWdlQ29zdCIsImdldEJ1aWxkaW5nTGV2ZWxDYXAiLCJnZXRCdWlsZGluZ01heEhQIiwiWCIsIkFycm93VXAiLCJDbG9jayIsIk1vdmUiLCJnZXRDYWNoZWRIZXJvSW1hZ2UiLCJCdWlsZGluZ1BhbmVsIiwiYnVpbGRpbmciLCJwbGF5ZXJCYXNlIiwib25VcGdyYWRlIiwib25DbG9zZSIsIm9uTW92ZSIsImhlcm9lcyIsIm9uU3BlZWRVcCIsIm9uVXBncmFkZVdpdGhHZW1zIiwiX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCIsIl9zIiwidGltZUxlZnQiLCJzZXRUaW1lTGVmdCIsImlzX3VwZ3JhZGluZyIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiZGVmIiwiYnVpbGRpbmdfdHlwZSIsImNvbG9ycyIsImJvcmRlciIsInVwZ0Nvc3QiLCJsZXZlbCIsImNhbkFmZm9yZCIsImdvbGQiLCJtYW5hIiwiZ29sZE1pc3NpbmciLCJNYXRoIiwibWF4IiwibWFuYU1pc3NpbmciLCJnZW1zTmVlZGVkRm9yTWlzc2luZyIsImNlaWwiLCJjYW5BZmZvcmRXaXRoR2VtcyIsImdlbXMiLCJsZXZlbENhcCIsInRvd25faGFsbF9sZXZlbCIsImlzTWF4TGV2ZWwiLCJzdGF0aW9uZWRIZXJvIiwiZmluZCIsImgiLCJzdGF0aW9uZWRfYXRfYnVpbGRpbmdfaWQiLCJpZCIsImlzTWluZU9yTWlsbCIsInN0b3JlZEdvbGQiLCJjdXN0b21fZGF0YSIsInN0b3JlZF9nb2xkIiwic3RvcmVkTWFuYSIsInN0b3JlZF9tYW5hIiwicHJvZFN0YXRzIiwiaXNWYXVsdCIsImlzTWluZSIsInZhdWx0Q2FwYWNpdHkiLCJidWlsZGluZ01heEhQIiwiaXNHZWFyVmF1bHQiLCJnZWFyU2xvdHMiLCJpc1NwZWxsc1RlbXBsZSIsInNwZWxsVXBncmFkZUNvc3QiLCJzcGVsbFVzYWdlQ29zdCIsImJhY2tncm91bmQiLCJib3hTaGFkb3ciLCJib3JkZXJCb3R0b20iLCJjb2xvciIsIm5hbWUiLCJfaWQiLCJpY29uIiwidGV4dFNoYWRvdyIsImhwIiwidG9Mb2NhbGVTdHJpbmciLCJ3aWR0aCIsImhlcm9fdHlwZSIsInBvcnRyYWl0IiwiaW5jbHVkZXMiLCJzdG9yYWdlIiwicHJvZHVjdGlvbl9wZXJfaG91ciIsInNlY29uZHMiLCJIZXJvU3ByaXRlRGlzcGxheSIsImhlcm9UeXBlIiwiaW1nIiwic3JjIiwiaGVpZ2h0IiwiaW1hZ2VSZW5kZXJpbmciLCJfYzIiLCJOdW1WYWwiLCJjaGlsZHJlbiIsIl9jMyIsIkNvc3RCYWRnZSIsInZhbHVlIiwibGFiZWwiLCJlbm91Z2giLCJfYzQiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJCdWlsZGluZ1BhbmVsLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQlVJTERJTkdfREVGUywgQlVJTERJTkdfQ09MT1JTLCBnZXRVcGdyYWRlQ29zdCwgZ2V0VXBncmFkZVNlY29uZHNSZW1haW5pbmcsIGZvcm1hdFRpbWUsIGdldE1pbmVQcm9kdWN0aW9uLCBnZXRWYXVsdENhcGFjaXR5LCBnZXRHZWFyVXBncmFkZUNvc3QsIGdldFNwZWxsc1RlbXBsZVVwZ3JhZGVDb3N0LCBnZXRTcGVsbHNUZW1wbGVVc2FnZUNvc3QsIGdldEJ1aWxkaW5nTGV2ZWxDYXAsIGdldEJ1aWxkaW5nTWF4SFAgfSBmcm9tIFwiQC9saWIvZ2FtZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgWCwgQXJyb3dVcCwgQ2xvY2ssIE1vdmUgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBnZXRDYWNoZWRIZXJvSW1hZ2UgfSBmcm9tIFwiQC9saWIvaGVyb1Nwcml0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQnVpbGRpbmdQYW5lbCh7IGJ1aWxkaW5nLCBwbGF5ZXJCYXNlLCBvblVwZ3JhZGUsIG9uQ2xvc2UsIG9uTW92ZSwgaGVyb2VzLCBvblNwZWVkVXAsIG9uVXBncmFkZVdpdGhHZW1zLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBbdGltZUxlZnQsIHNldFRpbWVMZWZ0XSA9IHVzZVN0YXRlKDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFidWlsZGluZz8uaXNfdXBncmFkaW5nKSByZXR1cm47XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZXRUaW1lTGVmdChnZXRVcGdyYWRlU2Vjb25kc1JlbWFpbmluZyhidWlsZGluZykpO1xuICAgIH0sIDEwMDApO1xuICAgIHNldFRpbWVMZWZ0KGdldFVwZ3JhZGVTZWNvbmRzUmVtYWluaW5nKGJ1aWxkaW5nKSk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbYnVpbGRpbmddKTtcblxuICBpZiAoIWJ1aWxkaW5nKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkZWYgPSBCVUlMRElOR19ERUZTW2J1aWxkaW5nLmJ1aWxkaW5nX3R5cGVdO1xuICBjb25zdCBjb2xvcnMgPSBCVUlMRElOR19DT0xPUlNbYnVpbGRpbmcuYnVpbGRpbmdfdHlwZV0gfHwgeyBib3JkZXI6IFwiIzRhNGE2ZVwiIH07XG4gIGNvbnN0IHVwZ0Nvc3QgPSBnZXRVcGdyYWRlQ29zdChidWlsZGluZy5idWlsZGluZ190eXBlLCBidWlsZGluZy5sZXZlbCk7XG4gIGNvbnN0IGNhbkFmZm9yZCA9ICh1cGdDb3N0LmdvbGQgPT09IDAgfHwgKHBsYXllckJhc2U/LmdvbGQgPz8gMCkgPj0gdXBnQ29zdC5nb2xkKSAmJiAoXG4gIHVwZ0Nvc3QubWFuYSA9PT0gMCB8fCAocGxheWVyQmFzZT8ubWFuYSA/PyAwKSA+PSB1cGdDb3N0Lm1hbmEpO1xuICBjb25zdCBnb2xkTWlzc2luZyA9IHVwZ0Nvc3QuZ29sZCA+IDAgPyBNYXRoLm1heCgwLCB1cGdDb3N0LmdvbGQgLSAocGxheWVyQmFzZT8uZ29sZCA/PyAwKSkgOiAwO1xuICBjb25zdCBtYW5hTWlzc2luZyA9IHVwZ0Nvc3QubWFuYSA+IDAgPyBNYXRoLm1heCgwLCB1cGdDb3N0Lm1hbmEgLSAocGxheWVyQmFzZT8ubWFuYSA/PyAwKSkgOiAwO1xuICBjb25zdCBnZW1zTmVlZGVkRm9yTWlzc2luZyA9IE1hdGguY2VpbChnb2xkTWlzc2luZyAvIDEwMCArIG1hbmFNaXNzaW5nIC8gMjAwKTtcbiAgY29uc3QgY2FuQWZmb3JkV2l0aEdlbXMgPSBjYW5BZmZvcmQgfHwgKHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPj0gZ2Vtc05lZWRlZEZvck1pc3Npbmc7XG4gIGNvbnN0IGxldmVsQ2FwID0gZ2V0QnVpbGRpbmdMZXZlbENhcChidWlsZGluZy5idWlsZGluZ190eXBlLCBwbGF5ZXJCYXNlPy50b3duX2hhbGxfbGV2ZWwgPz8gMSk7XG4gIGNvbnN0IGlzTWF4TGV2ZWwgPSBidWlsZGluZy5sZXZlbCA+PSBsZXZlbENhcDtcblxuICBjb25zdCBzdGF0aW9uZWRIZXJvID0gaGVyb2VzPy5maW5kKChoKSA9PiBoLnN0YXRpb25lZF9hdF9idWlsZGluZ19pZCA9PT0gYnVpbGRpbmcuaWQpO1xuXG4gIC8vIFNob3cgc3RvcmVkIHJlc291cmNlcyBmb3IgbWluZXMvdmF1bHRzXG4gIGNvbnN0IGlzTWluZU9yTWlsbCA9IGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbmUnIHx8IGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbGwnIHx8XG4gIGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdtYW5hX21pbmUnO1xuICBjb25zdCBzdG9yZWRHb2xkID0gYnVpbGRpbmcuY3VzdG9tX2RhdGE/LnN0b3JlZF9nb2xkIHx8IDA7XG4gIGNvbnN0IHN0b3JlZE1hbmEgPSBidWlsZGluZy5jdXN0b21fZGF0YT8uc3RvcmVkX21hbmEgfHwgMDtcbiAgY29uc3QgcHJvZFN0YXRzID0gaXNNaW5lT3JNaWxsID8gZ2V0TWluZVByb2R1Y3Rpb24oYnVpbGRpbmcubGV2ZWwpIDogbnVsbDtcblxuICAvLyBTaG93IGNhcGFjaXR5IGZvciB2YXVsdHNcbiAgY29uc3QgaXNWYXVsdCA9IGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbGwnIHx8IGJ1aWxkaW5nLmJ1aWxkaW5nX3R5cGUgPT09ICdtYW5hX3ZhdWx0JztcblxuICAvLyBTaG93IHByb2R1Y3Rpb24gcmF0ZSBmb3IgbWluZXMgb25seSAobm90IHZhdWx0cylcbiAgY29uc3QgaXNNaW5lID0gYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSA9PT0gJ2dvbGRfbWluZScgfHwgYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSA9PT0gJ21hbmFfbWluZSc7XG4gIGNvbnN0IHZhdWx0Q2FwYWNpdHkgPSBpc1ZhdWx0ID8gZ2V0VmF1bHRDYXBhY2l0eShidWlsZGluZy5sZXZlbCkgOiBudWxsO1xuXG4gIC8vIENhbGN1bGF0ZSBtYXggSFAgYmFzZWQgb24gYnVpbGRpbmcgdHlwZSBhbmQgbGV2ZWxcbiAgY29uc3QgYnVpbGRpbmdNYXhIUCA9IGdldEJ1aWxkaW5nTWF4SFAoYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSwgYnVpbGRpbmcubGV2ZWwpO1xuXG4gIC8vIFNob3cgR2VhciBWYXVsdCBpbmZvXG4gIGNvbnN0IGlzR2VhclZhdWx0ID0gYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSA9PT0gJ2dlYXJfdmF1bHQnO1xuICBjb25zdCBnZWFyU2xvdHMgPSA4OyAvLyBGaXhlZCA4IHNsb3RzXG5cbiAgLy8gU2hvdyBTcGVsbHMgVGVtcGxlIGluZm9cbiAgY29uc3QgaXNTcGVsbHNUZW1wbGUgPSBidWlsZGluZy5idWlsZGluZ190eXBlID09PSAnc3BlbGxzX3RlbXBsZSc7XG4gIGNvbnN0IHNwZWxsVXBncmFkZUNvc3QgPSBpc1NwZWxsc1RlbXBsZSA/IGdldFNwZWxsc1RlbXBsZVVwZ3JhZGVDb3N0KGJ1aWxkaW5nLmxldmVsKSA6IDA7XG4gIGNvbnN0IHNwZWxsVXNhZ2VDb3N0ID0gaXNTcGVsbHNUZW1wbGUgPyBnZXRTcGVsbHNUZW1wbGVVc2FnZUNvc3QoYnVpbGRpbmcubGV2ZWwpIDogMDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo2MTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTIwIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgei00MCB3LVszNjBweF0gcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW5cIlxuICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2Q0Yjg5NlwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM2YjNmMWZcIiwgYm94U2hhZG93OiBcIjAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjUpXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo2NDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTQgcHktM1wiIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgIzZiM2YxZjY2XCIsIGJhY2tncm91bmQ6IFwiI2M0YTQ3YVwiIH19PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6NjU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjY2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmV9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1waXhlbCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTgwXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiM2YjNmMWZcIiwgY29sb3I6IFwiI2Y1ZTZkMFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMzZDFmMDVcIiB9fVxuICAgICAgICAgIHRpdGxlPVwiTW92ZSBidWlsZGluZ1wiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8TW92ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjcyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPiBNT1ZFXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6NzU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjc2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjc3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PntkZWY/Lm5hbWUgfHwgYnVpbGRpbmcuYnVpbGRpbmdfdHlwZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo3ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14c1wiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxldmVsQ2FwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgICAgICAgICBMZXZlbCA8TnVtVmFsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6Nzk6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxldmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2J1aWxkaW5nPy5pZCB8fCBidWlsZGluZz8uX2lkfT57YnVpbGRpbmcubGV2ZWx9PC9OdW1WYWw+IC8ge2xldmVsQ2FwfSB7aXNNYXhMZXZlbCAmJiBcIihNQVgpXCJ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjgyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj57ZGVmPy5pY29uIHx8IFwi8J+PoFwifTwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6ODM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJ0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpvcGFjaXR5LTYwXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19PlxuICAgICAgICAgICAgPFggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo4NDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjg5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC00IHB5LTMgc3BhY2UteS0zXCI+XG4gICAgICAgIHsvKiBIUCBCYXIgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo5MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjkyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LXVpIG1iLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6OTM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+SFA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjk0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIGZvbnQtYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiNmZmZcIiwgdGV4dFNoYWRvdzogXCIwIDAgM3B4ICMzMzMsIDAgMXB4IDJweCAjNTU1XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJocFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtidWlsZGluZz8uaWQgfHwgYnVpbGRpbmc/Ll9pZH0+e2J1aWxkaW5nLmhwLnRvTG9jYWxlU3RyaW5nKCl9IC8ge2J1aWxkaW5nTWF4SFAudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjk2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaGVhbHRoLWJhciBoLTJcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDo5NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImhlYWx0aC1iYXItZmlsbFwiIHN0eWxlPXt7IHdpZHRoOiBgJHtidWlsZGluZy5ocCAvIGJ1aWxkaW5nTWF4SFAgKiAxMDB9JWAgfX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEhlcm8gc3RhdGlvbmVkIOKAlCBzaG93IHNwcml0ZSBmYWNpbmcgU291dGggKi99XG4gICAgICAgIHtidWlsZGluZy5idWlsZGluZ190eXBlID09PSBcImhlcm9fYmFzZVwiICYmIHN0YXRpb25lZEhlcm8gJiZcbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjEwMzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjYjg5MzZhXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzZiM2YxZlwiIH19PlxuICAgICAgICAgICAgPEhlcm9TcHJpdGVEaXNwbGF5IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTA0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaGVyb1R5cGU9e3N0YXRpb25lZEhlcm8uaGVyb190eXBlIHx8IHN0YXRpb25lZEhlcm8ucG9ydHJhaXR9IC8+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTA1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMDY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIGZvbnQtc2VtaWJvbGQgdGV4dC1zbVwiIHN0eWxlPXt7IGNvbG9yOiBcIiMzZDFmMDVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c3RhdGlvbmVkSGVybz8uaWQgfHwgc3RhdGlvbmVkSGVybz8uX2lkfT57c3RhdGlvbmVkSGVyby5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTA3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17c3RhdGlvbmVkSGVybz8uaWQgfHwgc3RhdGlvbmVkSGVybz8uX2lkfT5TdGF0aW9uZWQgwrcgTHYue3N0YXRpb25lZEhlcm8ubGV2ZWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7YnVpbGRpbmcuYnVpbGRpbmdfdHlwZSA9PT0gXCJoZXJvX2Jhc2VcIiAmJiAhc3RhdGlvbmVkSGVybyAmJlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTEyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZCBweC0zIHB5LTIgdGV4dC1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNiODkzNmFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTEzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19Pk5vIGhlcm8gc3RhdGlvbmVkPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICB7LyogU3RvcmVkIHJlc291cmNlcyBmb3IgbWluZXMvdmF1bHRzICovfVxuICAgICAgICB7aXNNaW5lT3JNaWxsICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMTk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTMgcHktMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2I4OTM2YVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM2YjNmMWZcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMjA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgZm9udC1zZW1pYm9sZCBtYi0xXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PlxuICAgICAgICAgICAgICB7YnVpbGRpbmcuYnVpbGRpbmdfdHlwZS5pbmNsdWRlcygnZ29sZCcpID8gJ/CfkrAgR09MRCcgOiAn8J+UtyBNQU5BJ30gU1RPUkFHRVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTIzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMjQ6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtbGcgZm9udC1ib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiI2ZmZlwiLCB0ZXh0U2hhZG93OiBcIjAgMCAzcHggIzMzM1wiIH19PlxuICAgICAgICAgICAgICAgIHtidWlsZGluZy5idWlsZGluZ190eXBlLmluY2x1ZGVzKCdnb2xkJykgPyBzdG9yZWRHb2xkLnRvTG9jYWxlU3RyaW5nKCkgOiBzdG9yZWRNYW5hLnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMjc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHNcIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICAgICAgLyB7cHJvZFN0YXRzPy5zdG9yYWdlLnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzTWluZSAmJlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxMzI6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIG10LTFcIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICAgICAgUHJvZHVjdGlvbjoge3Byb2RTdGF0cz8ucHJvZHVjdGlvbl9wZXJfaG91ci50b0xvY2FsZVN0cmluZygpfS9oclxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICB7LyogVmF1bHQgY2FwYWNpdHkgKi99XG4gICAgICAgIHtpc1ZhdWx0ICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNDE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTMgcHktMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2I4OTM2YVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM2YjNmMWZcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgZm9udC1zZW1pYm9sZCBtYi0xXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PlZBVUxUIENBUEFDSVRZPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTQzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LWxnIGZvbnQtYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiNmZmZcIiwgdGV4dFNoYWRvdzogXCIwIDAgM3B4ICMzMzNcIiB9fT5cbiAgICAgICAgICAgICAge3ZhdWx0Q2FwYWNpdHk/LnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNDY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19PkdvbGQgc3RvcmFnZSBsaW1pdDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgey8qIEdlYXIgVmF1bHQgaW5mbyAqL31cbiAgICAgICAge2lzR2VhclZhdWx0ICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNTI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTMgcHktMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2I4OTM2YVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM2YjNmMWZcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNTM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgZm9udC1zZW1pYm9sZCBtYi0xXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PkdFQVIgU0xPVFM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNTQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtbGcgZm9udC1ib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiI2ZmZlwiLCB0ZXh0U2hhZG93OiBcIjAgMCAzcHggIzMzM1wiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZ2VhclNsb3RzXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgICAgICAgICB7Z2VhclNsb3RzfSBFcXVpcG1lbnQgU2xvdHNcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjE1NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+VXBncmFkZSBnZWFyIHdpdGggc2hhcmRzICYgbWFuYTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgey8qIFNwZWxscyBUZW1wbGUgaW5mbyAqL31cbiAgICAgICAge2lzU3BlbGxzVGVtcGxlICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNjM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTMgcHktMiBzcGFjZS15LTJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNiODkzNmFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTY0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjM2QxZjA1XCIgfX0+U1BFTEwgUE9XRVI8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNjU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxNjY6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTY3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XVwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fT5VcGdyYWRlIENvc3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTY4OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtIGZvbnQtYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMzOGJkZjhcIiB9fT7wn5S3IHtzcGVsbFVwZ3JhZGVDb3N0LnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTcwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjE3MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+QmF0dGxlIENvc3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTcyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtIGZvbnQtYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMzOGJkZjhcIiB9fT7wn5S3IHtzcGVsbFVzYWdlQ29zdC50b0xvY2FsZVN0cmluZygpfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjE3NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+RGFtYWdlLCBQcm90ZWN0aW9uICYgSGVhbGluZyBzcGVsbHM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHsvKiBVcGdyYWRlIGluIHByb2dyZXNzICovfVxuICAgICAgICB7YnVpbGRpbmcuaXNfdXBncmFkaW5nID9cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjE4MToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0zIHRleHQtY2VudGVyIHNwYWNlLXktMlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2I4OTM2YVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM2YjNmMWZcIiB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxODI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBtYi0xXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PlxuICAgICAgICAgICAgICA8Q2xvY2sgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoxODM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTg0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOHB4XVwiPlVQR1JBRElORzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjE4NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14bCBmb250LWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjZmZmXCIsIHRleHRTaGFkb3c6IFwiMCAwIDRweCAjNTU1LCAwIDFweCAzcHggIzMzM1wiIH19Pntmb3JtYXRUaW1lKHRpbWVMZWZ0KX08L2Rpdj5cbiAgICAgICAgICAgIHtvblNwZWVkVXAgJiZcbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTg4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNwZWVkVXAoYnVpbGRpbmcsIHRpbWVMZWZ0KX1cbiAgICAgICAgICBkaXNhYmxlZD17KHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPCB1cGdDb3N0LmdlbXN9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTEuNSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0cmFuc2l0aW9uLWFsbCBidG4tcnBnXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiM2MzY2ZjFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGY0NmU1XCIsIGNvbG9yOiBcIiNmZmZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImdlbXNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dXBnQ29zdD8uaWQgfHwgdXBnQ29zdD8uX2lkfT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MTk0OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImlubGluZSBtci0xXCI+8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBTUEVFRCBVUCAoe3VwZ0Nvc3QuZ2Vtc30gZ2VtcylcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PiA6XG4gICAgICAgIGlzTWF4TGV2ZWwgP1xuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MjAwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMlwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMDE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjM2QxZjA1XCIgfX0+4q2QIE1BWCBMRVZFTDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMDQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMDU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF0gbWItMlwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fT5VUEdSQURFIFRPIExWTCB7YnVpbGRpbmcubGV2ZWwgKyAxfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjIwNjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgbWItM1wiPlxuICAgICAgICAgICAgICB7dXBnQ29zdC5nb2xkID4gMCAmJiA8Q29zdEJhZGdlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MjA3OjM1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIvCfkrBcIiB2YWx1ZT17dXBnQ29zdC5nb2xkLnRvTG9jYWxlU3RyaW5nKCl9IGxhYmVsPVwiR29sZFwiIGVub3VnaD17KHBsYXllckJhc2U/LmdvbGQgPz8gMCkgPj0gdXBnQ29zdC5nb2xkfSAvPn1cbiAgICAgICAgICAgICAge3VwZ0Nvc3QubWFuYSA+IDAgJiYgPENvc3RCYWRnZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjIwODozNVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGljb249XCLwn5S3XCIgdmFsdWU9e3VwZ0Nvc3QubWFuYS50b0xvY2FsZVN0cmluZygpfSBsYWJlbD1cIk1hbmFcIiBlbm91Z2g9eyhwbGF5ZXJCYXNlPy5tYW5hID8/IDApID49IHVwZ0Nvc3QubWFuYX0gLz59XG4gICAgICAgICAgICAgIDxDb3N0QmFkZ2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMDk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpY29uPVwi4o+x77iPXCIgdmFsdWU9e2Zvcm1hdFRpbWUodXBnQ29zdC5zZWNvbmRzKX0gbGFiZWw9XCJUaW1lXCIgZW5vdWdoPXt0cnVlfSAvPlxuICAgICAgICAgICAgICA8Q29zdEJhZGdlIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MjEwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIvCfko5cIiB2YWx1ZT17dXBnQ29zdC5nZW1zfSBsYWJlbD1cIlNraXBcIiBlbm91Z2g9e3RydWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtjYW5BZmZvcmQgP1xuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMTM6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVXBncmFkZShidWlsZGluZywgdXBnQ29zdCl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzlweF0gdHJhbnNpdGlvbi1hbGwgYnRuLXJwZyBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPEFycm93VXAgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMTc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTJ9IGNsYXNzTmFtZT1cImlubGluZSBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICBVUEdSQURFXG4gICAgICAgICAgICAgIDwvYnV0dG9uPiA6XG5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MjIxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjIyMjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQgcHgtMyBweS0yIHRleHQtY2VudGVyXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjN2EyMDIwXCIsIGJvcmRlcjogXCIxcHggc29saWQgI2EwMzAzMFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjIyMzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyBmb250LWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjZmZhYWFhXCIgfX0+SU5TVUZGSUNJRU5UIFJFU09VUkNFUzwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjIyNDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjZmZjY2NjXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgIE1pc3Npbmc6IHtnb2xkTWlzc2luZyA+IDAgJiYgYCR7Z29sZE1pc3NpbmcudG9Mb2NhbGVTdHJpbmcoKX0g8J+SsCBgfXttYW5hTWlzc2luZyA+IDAgJiYgYCR7bWFuYU1pc3NpbmcudG9Mb2NhbGVTdHJpbmcoKX0g8J+Ut2B9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7b25VcGdyYWRlV2l0aEdlbXMgJiZcbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyMjk6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGdyYWRlV2l0aEdlbXMoYnVpbGRpbmcsIHVwZ0Nvc3QsIGdlbXNOZWVkZWRGb3JNaXNzaW5nKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXsocGxheWVyQmFzZT8uZ2VtcyA/PyAwKSA8IGdlbXNOZWVkZWRGb3JNaXNzaW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzlweF0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIChwbGF5ZXJCYXNlPy5nZW1zID8/IDApID49IGdlbXNOZWVkZWRGb3JNaXNzaW5nID9cbiAgICAgICAgICAgIFwiY3Vyc29yLXBvaW50ZXJcIiA6XG4gICAgICAgICAgICBcImN1cnNvci1ub3QtYWxsb3dlZCBvcGFjaXR5LTUwXCJ9YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCBoc2woMjgwIDY1JSA1NSUpIDAlLCBoc2woMjgwIDYwJSA0MCUpIDEwMCUpXCIsXG4gICAgICAgICAgICAgIGJvcmRlcjogXCIycHggc29saWQgaHNsKDI4MCA3MCUgNjUlKVwiLFxuICAgICAgICAgICAgICBib3JkZXJCb3R0b206IFwiM3B4IHNvbGlkIGhzbCgyODAgNjAlIDI1JSlcIixcbiAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6IFwiMCAycHggMCBoc2woMjgwIDYwJSAyMCUpLCBpbnNldCAwIDFweCAwIGhzbCgyODAgMTAwJSA4MCUgLyAwLjMpXCJcbiAgICAgICAgICAgIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZ2Vtc05lZWRlZEZvck1pc3NpbmdcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjI0NToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiPvCfko48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIFVTRSB7Z2Vtc05lZWRlZEZvck1pc3Npbmd9IEdFTVMgSU5TVEVBRFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufVxuXG5mdW5jdGlvbiBIZXJvU3ByaXRlRGlzcGxheSh7IGhlcm9UeXBlLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBpbWcgPSBoZXJvVHlwZSA/IGdldENhY2hlZEhlcm9JbWFnZShoZXJvVHlwZSwgXCJTXCIpIDogbnVsbDtcbiAgaWYgKGltZykge1xuICAgIHJldHVybiA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWw6MjYxOjExXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtpbWcuc3JjfSBzdHlsZT17eyB3aWR0aDogNDAsIGhlaWdodDogNDAsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiIH19IGFsdD1cIlwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfSAvPjtcbiAgfVxuICByZXR1cm4gPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyNjM6OVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT7wn5eh77iPPC9zcGFuPjtcbn1cblxuLy8gV2hpdGUgbnVtYmVyIHdpdGggZ3JheSB0ZXh0LXNoYWRvdyBvdXRsaW5lXG5mdW5jdGlvbiBOdW1WYWwoeyBjaGlsZHJlbiwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjI2OTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgY29sb3I6IFwiI2ZmZlwiLCB0ZXh0U2hhZG93OiBcIjAgMCAzcHggIzU1NSwgMCAxcHggMnB4ICMzMzNcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e2NoaWxkcmVufTwvc3Bhbj4pO1xuXG59XG5cbmZ1bmN0aW9uIENvc3RCYWRnZSh7IGljb24sIHZhbHVlLCBsYWJlbCwgZW5vdWdoLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyNzU6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSByb3VuZGVkIHB4LTIgcHktMS41IHRleHQtY2VudGVyXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogZW5vdWdoID8gXCIjYjg5MzZhXCIgOiBcIiM3YTIwMjBcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7ZW5vdWdoID8gXCIjNmIzZjFmXCIgOiBcIiNhMDMwMzBcIn1gIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyNzY6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtYmFzZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57aWNvbn08L2Rpdj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQnVpbGRpbmdQYW5lbDoyNzc6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgZm9udC1ib2xkIHRleHQteHNcIiBzdHlsZT17eyBjb2xvcjogXCIjZmZmXCIsIHRleHRTaGFkb3c6IFwiMCAwIDNweCAjNTU1LCAwIDFweCAycHggIzMzM1wiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidmFsdWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e3ZhbHVlfTwvZGl2PlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsOjI3ODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XVwiIHN0eWxlPXt7IGNvbG9yOiBlbm91Z2ggPyBcIiMzZDFmMDVcIiA6IFwiI2ZmYWFhYVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGFiZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e2xhYmVsfTwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1BhbmVsLmpzeCJ9