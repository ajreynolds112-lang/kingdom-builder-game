import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/AltarModal.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/AltarModal.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { X, Star, Zap, Sparkles, ChevronRight } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { getAllCustomHeroes } from "/src/lib/heroData.js";
import { getHeroSprite } from "/src/lib/heroSprites.js";
const RARITY_COLORS = {
  common: "text-slate-300 border-slate-500",
  uncommon: "text-green-400 border-green-600",
  rare: "text-blue-400 border-blue-600",
  epic: "text-purple-400 border-purple-600",
  legendary: "text-yellow-400 border-yellow-500"
};
const RARITY_BG = {
  common: "bg-slate-800/40",
  uncommon: "bg-green-900/20",
  rare: "bg-blue-900/20",
  epic: "bg-purple-900/20",
  legendary: "bg-yellow-900/20"
};
const RARITY_GLOW = {
  common: "rgba(148,163,184,0.2)",
  uncommon: "rgba(74,222,128,0.25)",
  rare: "rgba(96,165,250,0.25)",
  epic: "rgba(192,132,252,0.3)",
  legendary: "rgba(251,191,36,0.4)"
};
const PENDING_KEY = "altar_pending_hero_cards_v1";
function getPendingCards() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
  } catch {
    return [];
  }
}
function savePendingCards(cards) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(cards));
}
export default function AltarModal({ heroes, aspects, playerBase, heroBuildings, onUpgradeHero, onClose, onRollHero, id }) {
  _s();
  const [view, setView] = useState("heroes");
  const [selectedHero, setSelectedHero] = useState(null);
  const [customHeroes, setCustomHeroes] = useState(() => getAllCustomHeroes());
  const [pendingCards, setPendingCards] = useState(() => getPendingCards());
  const [rolledCard, setRolledCard] = useState(null);
  const [activateCard, setActivateCard] = useState(null);
  useEffect(() => {
    if (view === "roll") setCustomHeroes(getAllCustomHeroes());
  }, [view]);
  const handleRoll = (customHero) => {
    if ((playerBase?.gems ?? 0) < customHero.gem_cost) return;
    const card = {
      id: `card_${Date.now()}`,
      heroDefId: customHero.id,
      heroName: customHero.name,
      heroRarity: customHero.rarity,
      heroStats: { ...customHero },
      portrait: getHeroSprite(customHero.id, "S"),
      rolledAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updated = [...pendingCards, card];
    setPendingCards(updated);
    savePendingCards(updated);
    onRollHero?.(customHero);
    setRolledCard(card);
  };
  const handleActivateCard = async (card) => {
    setActivateCard(card);
  };
  const handleConfirmActivate = () => {
    if (!activateCard) return;
    const updated = pendingCards.filter((c) => c.id !== activateCard.id);
    setPendingCards(updated);
    savePendingCards(updated);
    setActivateCard(null);
    setRolledCard(null);
    onRollHero?.(
      activateCard.heroStats,
      true
      /* activate */
    );
  };
  const totalPending = pendingCards.length;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:88:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:89:6", "data-dynamic-content": "true", className: "panel-dark rounded-xl flex flex-col overflow-hidden", style: { width: 640, maxHeight: "90vh" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:91:8", "data-dynamic-content": "true", className: "flex items-center justify-between px-5 py-4 border-b border-purple-400/20", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:92:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:93:12", "data-dynamic-content": "false", className: "text-2xl", children: "🔮" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 112,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:94:12", "data-dynamic-content": "true", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:95:14", "data-dynamic-content": "false", className: "font-pixel text-purple-400 text-[10px]", children: "ALTAR OF HEROES" }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 114,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:96:14", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-xs", children: [
              heroes.length,
              " heroes active"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 115,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 113,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 111,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:99:10", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/AltarModal:101:12",
              "data-dynamic-content": "true",
              onClick: () => setView("heroes"),
              className: "px-3 py-1 rounded font-pixel text-[8px] transition-all",
              style: { background: view === "heroes" ? "#4c1d95" : "#1a1a2e", border: `1px solid ${view === "heroes" ? "#a855f7" : "#333"}`, color: view === "heroes" ? "#fff" : "#888" },
              children: "HEROES"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 120,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/AltarModal:105:12",
              "data-dynamic-content": "true",
              onClick: () => setView("roll"),
              className: "px-3 py-1 rounded font-pixel text-[8px] transition-all",
              style: { background: view === "roll" ? "#b45309" : "#1a1a2e", border: `1px solid ${view === "roll" ? "#f59e0b" : "#333"}`, color: view === "roll" ? "#fff" : "#888" },
              children: "ROLL"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 124,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/AltarModal:109:12",
              "data-dynamic-content": "true",
              onClick: () => setView("cards"),
              className: "relative px-3 py-1 rounded font-pixel text-[8px] transition-all",
              style: { background: view === "cards" ? "#166534" : "#1a1a2e", border: `1px solid ${view === "cards" ? "#4ade80" : "#333"}`, color: view === "cards" ? "#fff" : "#888" },
              children: [
                "CARDS ",
                totalPending > 0 && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:111:41", "data-dynamic-content": "true", className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 font-ui text-[9px] text-white flex items-center justify-center", "data-collection-item-field": "totalPending", "data-collection-item-id": id, children: totalPending }, void 0, false, {
                  fileName: "/app/src/components/game/AltarModal.jsx",
                  lineNumber: 130,
                  columnNumber: 42
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 128,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/AltarModal:113:12", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/AltarModal:113:82", "data-dynamic-content": "false", size: 20 }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 132,
            columnNumber: 168
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 132,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 118,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:118:8", "data-dynamic-content": "true", className: "flex-1 overflow-hidden", children: [
        view === "heroes" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:120:12", "data-dynamic-content": "true", className: "flex h-full", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:121:14", "data-dynamic-content": "true", className: "w-[220px] border-r border-purple-400/10 overflow-y-auto p-3 space-y-2", "data-collection-id": "heroes", children: [
            heroes.map(
              (hero) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/AltarModal:123:18",
                  "data-dynamic-content": "true",
                  onClick: () => setSelectedHero(hero),
                  className: `w-full text-left rounded-lg px-3 py-2.5 transition-all border ${selectedHero?.id === hero.id ? "border-purple-500/60 bg-purple-900/30" : `border-transparent hover:border-slate-600 ${RARITY_BG[hero.rarity]}`}`,
                  "data-collection-item-id": hero?.id,
                  children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:125:20", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(HeroPortrait, { "data-source-location": "components/game/AltarModal:126:22", "data-dynamic-content": "true", heroId: hero.hero_type, size: 28, fallback: "⚔️" }, void 0, false, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 145,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:127:22", "data-dynamic-content": "true", children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:128:24", "data-dynamic-content": "true", className: `font-ui font-semibold text-sm ${RARITY_COLORS[hero.rarity]?.split(" ")[0]}`, "data-collection-item-field": "name", "data-collection-item-id": hero?.id, children: hero.name }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 147,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:129:24", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-500", "data-collection-item-field": "level", "data-collection-item-id": hero?.id, children: [
                        "Lv.",
                        hero.level,
                        " · ",
                        hero.rarity
                      ] }, void 0, true, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 148,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 146,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/AltarModal.jsx",
                    lineNumber: 144,
                    columnNumber: 21
                  }, this)
                },
                hero.id,
                false,
                {
                  fileName: "/app/src/components/game/AltarModal.jsx",
                  lineNumber: 142,
                  columnNumber: 15
                },
                this
              )
            ),
            heroes.length === 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:134:40", "data-dynamic-content": "false", className: "text-center py-8 text-slate-500 font-ui text-sm", children: [
              "No heroes yet.",
              /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/AltarModal:134:119", "data-dynamic-content": "false" }, void 0, false, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 153,
                columnNumber: 206
              }, this),
              "Roll for heroes!"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 153,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 140,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:136:14", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-4", children: selectedHero ? /* @__PURE__ */ jsxDEV(HeroDetail, { "data-source-location": "components/game/AltarModal:138:18", "data-dynamic-content": "true", hero: selectedHero, aspects, playerBase, heroBuildings, onUpgradeHero }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 157,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:140:18", "data-dynamic-content": "false", className: "h-full flex items-center justify-center text-slate-500 font-ui text-sm", children: "Select a hero to view details" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 159,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 155,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 139,
          columnNumber: 11
        }, this),
        view === "roll" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:147:12", "data-dynamic-content": "true", className: "overflow-y-auto p-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:148:14", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-yellow-400 mb-3", children: "🎲 ROLL FOR HEROES" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 167,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:149:14", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-400 mb-4", children: "Spend gems to roll for custom heroes. Rolled heroes appear as cards to activate." }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 168,
            columnNumber: 15
          }, this),
          customHeroes.filter((h) => h.is_rollable !== false).length === 0 ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:151:16", "data-dynamic-content": "false", className: "flex flex-col items-center justify-center py-16 gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:152:18", "data-dynamic-content": "false", className: "text-4xl", children: "🔮" }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 171,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:153:18", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-purple-400 text-center", children: [
              "This feature will be",
              /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/AltarModal:153:106", "data-dynamic-content": "false" }, void 0, false, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 172,
                columnNumber: 193
              }, this),
              "available shortly!"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 172,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:154:18", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-500 text-center", children: "Check back soon for new heroes to roll." }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 173,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 170,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:157:16", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", children: customHeroes.filter((h) => h.is_rollable !== false).map((ch) => {
            const portrait = getHeroSprite(ch.id, "S");
            const canAfford = (playerBase?.gems ?? 0) >= ch.gem_cost;
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                "data-source-location": "components/game/AltarModal:162:22",
                "data-dynamic-content": "true",
                className: "rounded-xl p-4 flex flex-col gap-2",
                style: { background: RARITY_BG[ch.rarity] || "#1a1a2e", border: `2px solid ${RARITY_COLORS[ch.rarity]?.split(" ")[1]?.replace("border-", "") || "#333"}`, boxShadow: `0 4px 16px ${RARITY_GLOW[ch.rarity] || "transparent"}` },
                "data-collection-item-id": ch?.id,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:164:24", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        "data-source-location": "components/game/AltarModal:165:26",
                        "data-dynamic-content": "true",
                        className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                        style: { background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.1)" },
                        children: portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:167:40", "data-dynamic-content": "true", src: portrait, style: { width: 44, height: 44, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
                          fileName: "/app/src/components/game/AltarModal.jsx",
                          lineNumber: 186,
                          columnNumber: 41
                        }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:167:135", "data-dynamic-content": "true", style: { fontSize: 28 }, children: "🦸" }, void 0, false, {
                          fileName: "/app/src/components/game/AltarModal.jsx",
                          lineNumber: 186,
                          columnNumber: 221
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 184,
                        columnNumber: 27
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:169:26", "data-dynamic-content": "true", className: "flex-1", "data-collection-item-field": "description", "data-collection-item-id": ch?.id, children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:170:28", "data-dynamic-content": "true", className: `font-ui font-bold text-sm ${RARITY_COLORS[ch.rarity]?.split(" ")[0]}`, "data-collection-item-field": "name", "data-collection-item-id": ch?.id, children: ch.name }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 189,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:171:28", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 capitalize", "data-collection-item-field": "rarity", "data-collection-item-id": ch?.id, children: ch.rarity }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 190,
                        columnNumber: 29
                      }, this),
                      ch.description && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:172:47", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-400 mt-0.5", "data-collection-item-field": "description", "data-collection-item-id": ch?.id, children: ch.description }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 191,
                        columnNumber: 48
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 188,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/AltarModal.jsx",
                    lineNumber: 183,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:175:24", "data-dynamic-content": "true", className: "grid grid-cols-4 gap-1 text-center", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:176:26", "data-dynamic-content": "true", className: "rounded p-1", style: { background: "rgba(0,0,0,0.3)" }, children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:176:97", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-500", children: "HP" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 195,
                        columnNumber: 183
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:176:156", "data-dynamic-content": "true", className: "font-ui text-[10px] text-white font-bold", "data-collection-item-field": "hp", "data-collection-item-id": ch?.id, children: ch.hp }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 195,
                        columnNumber: 328
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 195,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:177:26", "data-dynamic-content": "true", className: "rounded p-1", style: { background: "rgba(0,0,0,0.3)" }, children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:177:97", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-500", children: "ATK" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 196,
                        columnNumber: 183
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:177:157", "data-dynamic-content": "true", className: "font-ui text-[10px] text-white font-bold", "data-collection-item-field": "attack", "data-collection-item-id": ch?.id, children: ch.attack }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 196,
                        columnNumber: 329
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 196,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:178:26", "data-dynamic-content": "true", className: "rounded p-1", style: { background: "rgba(0,0,0,0.3)" }, children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:178:97", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-500", children: "SPD" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 197,
                        columnNumber: 183
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:178:157", "data-dynamic-content": "true", className: "font-ui text-[10px] text-white font-bold", "data-collection-item-field": "speed", "data-collection-item-id": ch?.id, children: ch.speed }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 197,
                        columnNumber: 329
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 197,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:179:26", "data-dynamic-content": "true", className: "rounded p-1", style: { background: "rgba(0,0,0,0.3)" }, children: [
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:179:97", "data-dynamic-content": "false", className: "font-ui text-[8px] text-slate-500", children: "RNG" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 198,
                        columnNumber: 183
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:179:157", "data-dynamic-content": "true", className: "font-ui text-[10px] text-white font-bold", "data-collection-item-field": "range", "data-collection-item-id": ch?.id, children: ch.range }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 198,
                        columnNumber: 329
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 198,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/AltarModal.jsx",
                    lineNumber: 194,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      "data-source-location": "components/game/AltarModal:181:24",
                      "data-dynamic-content": "true",
                      onClick: () => handleRoll(ch),
                      disabled: !canAfford,
                      className: "w-full py-2 rounded font-pixel text-[8px] transition-all",
                      style: {
                        background: canAfford ? "linear-gradient(180deg, #b45309 0%, #78350f 100%)" : "#1f1f1f",
                        border: `2px solid ${canAfford ? "#f59e0b" : "#374151"}`,
                        color: canAfford ? "#fff" : "#555",
                        cursor: canAfford ? "pointer" : "not-allowed"
                      },
                      "data-collection-item-field": "gem_cost",
                      "data-collection-item-id": ch?.id,
                      children: [
                        "💎 ",
                        ch.gem_cost.toLocaleString(),
                        " — ROLL"
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 200,
                      columnNumber: 25
                    },
                    this
                  )
                ]
              },
              ch.id,
              true,
              {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 181,
                columnNumber: 19
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 176,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 166,
          columnNumber: 11
        }, this),
        view === "cards" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:200:12", "data-dynamic-content": "true", className: "overflow-y-auto p-4", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:201:14", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-green-400 mb-3", children: "🃏 HERO CARDS" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 220,
            columnNumber: 15
          }, this),
          pendingCards.length === 0 ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:203:16", "data-dynamic-content": "false", className: "text-center py-8 text-slate-500 font-ui text-sm", children: [
            "No pending hero cards.",
            /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/AltarModal:203:103", "data-dynamic-content": "false" }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 222,
              columnNumber: 186
            }, this),
            "Roll for heroes to receive cards."
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 222,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:205:16", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", children: pendingCards.map((card) => {
            const rarityColorCls = RARITY_COLORS[card.heroRarity] || "text-slate-300 border-slate-500";
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                "data-source-location": "components/game/AltarModal:209:22",
                "data-dynamic-content": "true",
                className: "rounded-xl p-4 flex flex-col gap-2 cursor-pointer transition-all hover:scale-[1.02]",
                onClick: () => setActivateCard(card),
                style: { background: RARITY_BG[card.heroRarity] || "#1a1a2e", border: `2px solid ${rarityColorCls.split(" ")[1]?.replace("border-", "") || "#333"}`, boxShadow: `0 4px 16px ${RARITY_GLOW[card.heroRarity] || "transparent"}` },
                "data-collection-item-id": card?.id,
                children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:212:24", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      "data-source-location": "components/game/AltarModal:213:26",
                      "data-dynamic-content": "true",
                      className: "w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0",
                      style: { background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.15)" },
                      children: card.portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:215:45", "data-dynamic-content": "true", src: card.portrait, style: { width: 52, height: 52, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 234,
                        columnNumber: 46
                      }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:215:145", "data-dynamic-content": "true", style: { fontSize: 32 }, children: "🦸" }, void 0, false, {
                        fileName: "/app/src/components/game/AltarModal.jsx",
                        lineNumber: 234,
                        columnNumber: 231
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 232,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:217:26", "data-dynamic-content": "true", className: "flex-1", children: [
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:218:28", "data-dynamic-content": "true", className: `font-ui font-bold text-sm ${rarityColorCls.split(" ")[0]}`, "data-collection-item-field": "heroName", "data-collection-item-id": card?.id, children: card.heroName }, void 0, false, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 237,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:219:28", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-500 capitalize", "data-collection-item-field": "heroRarity", "data-collection-item-id": card?.id, children: card.heroRarity }, void 0, false, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 238,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:220:28", "data-dynamic-content": "false", className: "font-ui text-[9px] text-slate-600 mt-0.5", children: "Tap to activate" }, void 0, false, {
                      fileName: "/app/src/components/game/AltarModal.jsx",
                      lineNumber: 239,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/AltarModal.jsx",
                    lineNumber: 236,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV(ChevronRight, { "data-source-location": "components/game/AltarModal:222:26", "data-dynamic-content": "false", size: 16, className: "text-slate-500" }, void 0, false, {
                    fileName: "/app/src/components/game/AltarModal.jsx",
                    lineNumber: 241,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/AltarModal.jsx",
                  lineNumber: 231,
                  columnNumber: 25
                }, this)
              },
              card.id,
              false,
              {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 228,
                columnNumber: 19
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 224,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 219,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    rolledCard && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:236:8", "data-dynamic-content": "true", className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/80", onClick: () => setRolledCard(null), children: /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/AltarModal:237:10",
        "data-dynamic-content": "true",
        className: "rounded-2xl p-8 flex flex-col items-center gap-4 max-w-xs w-full animate-bounce-once",
        style: { background: RARITY_BG[rolledCard.heroRarity] || "#1a1a2e", border: `3px solid ${RARITY_COLORS[rolledCard.heroRarity]?.split(" ")[1]?.replace("border-", "") || "#333"}`, boxShadow: `0 0 40px ${RARITY_GLOW[rolledCard.heroRarity]}` },
        children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:239:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-yellow-400 animate-pulse", children: "✨ HERO ROLLED! ✨" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 258,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:240:12", "data-dynamic-content": "true", className: "w-24 h-24 rounded-xl flex items-center justify-center", style: { background: "#0d0d1a" }, children: rolledCard.portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:241:37", "data-dynamic-content": "true", src: rolledCard.portrait, style: { width: 88, height: 88, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 260,
            columnNumber: 38
          }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:241:143", "data-dynamic-content": "true", style: { fontSize: 56 }, children: "🦸" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 260,
            columnNumber: 229
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 259,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:243:12", "data-dynamic-content": "true", className: `font-pixel text-[11px] ${RARITY_COLORS[rolledCard.heroRarity]?.split(" ")[0]}`, "data-collection-item-field": "heroName", "data-collection-item-id": rolledCard?.id || rolledCard?._id, children: rolledCard.heroName }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 262,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:244:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400 capitalize", "data-collection-item-field": "heroRarity", "data-collection-item-id": rolledCard?.id || rolledCard?._id, children: rolledCard.heroRarity }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:245:12", "data-dynamic-content": "false", className: "font-ui text-xs text-slate-500 text-center", children: "Check your Hero Cards to activate this hero!" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 264,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/AltarModal:246:12", "data-dynamic-content": "true", onClick: () => setRolledCard(null), className: "mt-2 px-6 py-2 rounded font-pixel text-[8px] text-white", style: { background: "#4c1d95", border: "1px solid #a855f7" }, children: "AWESOME!" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 265,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 256,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 255,
      columnNumber: 7
    }, this),
    activateCard && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:255:8", "data-dynamic-content": "true", className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/80", children: /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/AltarModal:256:10",
        "data-dynamic-content": "true",
        className: "rounded-2xl p-6 flex flex-col items-center gap-4 max-w-xs w-full",
        style: { background: "#0d1117", border: `2px solid ${RARITY_COLORS[activateCard.heroRarity]?.split(" ")[1]?.replace("border-", "") || "#333"}` },
        children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:258:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-purple-400", children: "ACTIVATE THIS HERO?" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 277,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:259:12", "data-dynamic-content": "true", className: "w-20 h-20 rounded-xl flex items-center justify-center", style: { background: "#0d0d1a" }, children: activateCard.portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:260:39", "data-dynamic-content": "true", src: activateCard.portrait, style: { width: 72, height: 72, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 279,
            columnNumber: 40
          }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:260:147", "data-dynamic-content": "true", style: { fontSize: 44 }, children: "🦸" }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 279,
            columnNumber: 233
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 278,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:262:12", "data-dynamic-content": "true", className: `font-pixel text-[11px] ${RARITY_COLORS[activateCard.heroRarity]?.split(" ")[0]}`, "data-collection-item-field": "heroName", "data-collection-item-id": activateCard?.id || activateCard?._id, children: activateCard.heroName }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 281,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:263:12", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400 capitalize", "data-collection-item-field": "heroRarity", "data-collection-item-id": activateCard?.id || activateCard?._id, children: activateCard.heroRarity }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 282,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:264:12", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2 w-full text-center text-xs font-ui", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:265:14", "data-dynamic-content": "true", className: "rounded p-1.5", style: { background: "rgba(255,255,255,0.05)" }, children: [
              "HP: ",
              /* @__PURE__ */ jsxDEV("b", { "data-source-location": "components/game/AltarModal:265:98", "data-dynamic-content": "true", className: "text-white", "data-collection-item-field": "heroStats.hp", "data-collection-item-id": activateCard?.id || activateCard?._id, children: activateCard.heroStats.hp }, void 0, false, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 284,
                columnNumber: 184
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 284,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:266:14", "data-dynamic-content": "true", className: "rounded p-1.5", style: { background: "rgba(255,255,255,0.05)" }, children: [
              "ATK: ",
              /* @__PURE__ */ jsxDEV("b", { "data-source-location": "components/game/AltarModal:266:99", "data-dynamic-content": "true", className: "text-white", "data-collection-item-field": "heroStats.attack", "data-collection-item-id": activateCard?.id || activateCard?._id, children: activateCard.heroStats.attack }, void 0, false, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 285,
                columnNumber: 185
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 285,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:267:14", "data-dynamic-content": "true", className: "rounded p-1.5", style: { background: "rgba(255,255,255,0.05)" }, children: [
              "SPD: ",
              /* @__PURE__ */ jsxDEV("b", { "data-source-location": "components/game/AltarModal:267:99", "data-dynamic-content": "true", className: "text-white", "data-collection-item-field": "heroStats.speed", "data-collection-item-id": activateCard?.id || activateCard?._id, children: activateCard.heroStats.speed }, void 0, false, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 286,
                columnNumber: 185
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 286,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:268:14", "data-dynamic-content": "true", className: "rounded p-1.5", style: { background: "rgba(255,255,255,0.05)" }, children: [
              "CRIT: ",
              /* @__PURE__ */ jsxDEV("b", { "data-source-location": "components/game/AltarModal:268:100", "data-dynamic-content": "true", className: "text-white", "data-collection-item-field": "heroStats.crit_chance", "data-collection-item-id": activateCard?.id || activateCard?._id, children: [
                activateCard.heroStats.crit_chance,
                "%"
              ] }, void 0, true, {
                fileName: "/app/src/components/game/AltarModal.jsx",
                lineNumber: 287,
                columnNumber: 186
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 287,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 283,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:270:12", "data-dynamic-content": "true", className: "flex gap-2 w-full mt-2", children: [
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/AltarModal:271:14", "data-dynamic-content": "true", onClick: () => setActivateCard(null), className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400 hover:bg-slate-800", style: { border: "1px solid #374151" }, children: "CANCEL" }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 290,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/AltarModal:272:14", "data-dynamic-content": "true", onClick: handleConfirmActivate, className: "flex-1 py-2 rounded font-pixel text-[8px] text-white", style: { background: "#166534", border: "1px solid #4ade80" }, children: "ACTIVATE!" }, void 0, false, {
              fileName: "/app/src/components/game/AltarModal.jsx",
              lineNumber: 291,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 289,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 275,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 274,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/AltarModal.jsx",
    lineNumber: 107,
    columnNumber: 5
  }, this);
}
_s(AltarModal, "WkJhtuQ7EbvDYO8VxDchJmIFPzI=");
_c = AltarModal;
function HeroPortrait({ heroId, size, fallback, "data-collection-item-id": __dataCollectionItemId }) {
  const portrait = heroId ? getHeroSprite(heroId, "S") : null;
  if (portrait) return /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:283:23", "data-dynamic-content": "true", src: portrait, style: { width: size, height: size, imageRendering: "pixelated" }, alt: "", "data-collection-item-id": __dataCollectionItemId }, void 0, false, {
    fileName: "/app/src/components/game/AltarModal.jsx",
    lineNumber: 302,
    columnNumber: 24
  }, this);
  return /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:284:9", "data-dynamic-content": "true", style: { fontSize: size * 0.7 }, "data-collection-item-id": __dataCollectionItemId, "data-collection-item-field": "fallback", children: fallback }, void 0, false, {
    fileName: "/app/src/components/game/AltarModal.jsx",
    lineNumber: 303,
    columnNumber: 10
  }, this);
}
_c2 = HeroPortrait;
function HeroDetail({ hero, aspects, playerBase, heroBuildings, onUpgradeHero }) {
  const rarityClass = RARITY_COLORS[hero.rarity] || "text-slate-300 border-slate-500";
  const heroAspects = aspects.filter((a) => hero.aspect_ids?.includes(a.id));
  const portrait = getHeroSprite(hero.hero_type, "S");
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:293:4", "data-dynamic-content": "true", className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:294:6", "data-dynamic-content": "true", className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:295:8", "data-dynamic-content": "true", className: `w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-slate-900 ${rarityClass.split(" ")[1] || "border-slate-500"}`, children: portrait ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/AltarModal:296:22", "data-dynamic-content": "true", src: portrait, style: { width: 56, height: 56, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 315,
        columnNumber: 23
      }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:296:117", "data-dynamic-content": "false", className: "text-3xl", children: "⚔️" }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 315,
        columnNumber: 203
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 314,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:298:8", "data-dynamic-content": "true", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:299:10", "data-dynamic-content": "true", className: `font-pixel text-[11px] ${rarityClass.split(" ")[0]}`, "data-collection-item-field": "name", "data-collection-item-id": hero?.id || hero?._id, children: hero.name }, void 0, false, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:300:10", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-sm capitalize", "data-collection-item-field": "rarity", "data-collection-item-id": hero?.id || hero?._id, children: [
          hero.rarity,
          " · Level ",
          hero.level
        ] }, void 0, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 319,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:301:10", "data-dynamic-content": "true", className: "flex gap-1 mt-1", children: [...Array(Math.min(hero.level, 10))].map((_, i) => /* @__PURE__ */ jsxDEV(Star, { "data-source-location": "components/game/AltarModal:301:95", "data-dynamic-content": "true", size: 10, fill: "#fbbf24", className: "text-yellow-400", "data-arr-index": i }, i, false, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 320,
          columnNumber: 181
        }, this)) }, void 0, false, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 320,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 317,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 313,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:304:6", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxDEV(StatRow, { "data-source-location": "components/game/AltarModal:305:8", "data-dynamic-content": "true", icon: "❤️", label: "HP", value: `${hero.hp} / ${hero.max_hp}` }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 324,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatRow, { "data-source-location": "components/game/AltarModal:306:8", "data-dynamic-content": "true", icon: "⚔️", label: "ATK", value: hero.attack }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 325,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatRow, { "data-source-location": "components/game/AltarModal:307:8", "data-dynamic-content": "true", icon: "🛡️", label: "DEF", value: hero.defense }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 326,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatRow, { "data-source-location": "components/game/AltarModal:308:8", "data-dynamic-content": "true", icon: "💨", label: "SPD", value: hero.speed }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 327,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 323,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:310:6", "data-dynamic-content": "true", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:311:8", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-slate-400 mb-2", children: [
        "ASPECTS (",
        heroAspects.length,
        ")"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 330,
        columnNumber: 9
      }, this),
      heroAspects.length > 0 ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:313:10", "data-dynamic-content": "true", className: "space-y-1", "data-collection-id": "aspects", children: heroAspects.map(
        (a) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:315:14", "data-dynamic-content": "true", className: "bg-purple-900/20 border border-purple-800/30 rounded px-2 py-1.5 flex items-center justify-between", "data-collection-item-id": a?.id, children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:316:16", "data-dynamic-content": "true", className: "font-ui text-purple-300 text-xs", "data-collection-item-field": "name", "data-collection-item-id": a?.id, children: a.name }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 335,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:317:16", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400", "data-collection-item-field": "level", "data-collection-item-id": a?.id, children: [
            "Lv.",
            a.level
          ] }, void 0, true, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 336,
            columnNumber: 17
          }, this)
        ] }, a.id, true, {
          fileName: "/app/src/components/game/AltarModal.jsx",
          lineNumber: 334,
          columnNumber: 11
        }, this)
      ) }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 332,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:322:10", "data-dynamic-content": "false", className: "text-slate-500 font-ui text-xs", children: "No aspects equipped." }, void 0, false, {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 341,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 329,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/AltarModal:325:6",
        "data-dynamic-content": "true",
        onClick: () => onUpgradeHero?.(hero),
        className: "w-full btn-rpg-purple btn-rpg py-2 rounded font-pixel text-[8px] flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ jsxDEV(Zap, { "data-source-location": "components/game/AltarModal:327:8", "data-dynamic-content": "false", size: 12 }, void 0, false, {
            fileName: "/app/src/components/game/AltarModal.jsx",
            lineNumber: 346,
            columnNumber: 9
          }, this),
          "UPGRADE HERO (500💰)"
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/AltarModal.jsx",
        lineNumber: 344,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/src/components/game/AltarModal.jsx",
    lineNumber: 312,
    columnNumber: 5
  }, this);
}
_c3 = HeroDetail;
function StatRow({ icon, label, value, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/AltarModal:335:4", "data-dynamic-content": "true", className: "bg-slate-900/50 rounded px-2.5 py-1.5 flex items-center gap-2", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:336:6", "data-dynamic-content": "true", "data-collection-item-field": "icon", "data-collection-item-id": __dataCollectionItemId, children: icon }, void 0, false, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 355,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:337:6", "data-dynamic-content": "true", className: "font-ui text-slate-400 text-xs flex-1", "data-collection-item-field": "label", "data-collection-item-id": __dataCollectionItemId, children: label }, void 0, false, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 356,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/AltarModal:338:6", "data-dynamic-content": "true", className: "font-ui font-bold text-white text-sm", "data-collection-item-field": "value", "data-collection-item-id": __dataCollectionItemId, children: value }, void 0, false, {
      fileName: "/app/src/components/game/AltarModal.jsx",
      lineNumber: 357,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/AltarModal.jsx",
    lineNumber: 354,
    columnNumber: 5
  }, this);
}
_c4 = StatRow;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "AltarModal");
$RefreshReg$(_c2, "HeroPortrait");
$RefreshReg$(_c3, "HeroDetail");
$RefreshReg$(_c4, "StatRow");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/AltarModal.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/AltarModal.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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T0FBT0MsT0FBTywyQkFBMkJuQix1QkFBdUIsR0FBRztBQUMxRixTQUNFLHVCQUFDLFNBQUksd0JBQXFCLG9DQUFtQyx3QkFBcUIsUUFBTyxXQUFVLGlFQUFnRSwyQkFBeUJBLHdCQUMxTDtBQUFBLDJCQUFDLFVBQUssd0JBQXFCLG9DQUFtQyx3QkFBcUIsUUFBTyw4QkFBMkIsUUFBTywyQkFBeUJBLHdCQUF5QmlCLGtCQUE5SztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQW1MO0FBQUEsSUFDbkwsdUJBQUMsVUFBSyx3QkFBcUIsb0NBQW1DLHdCQUFxQixRQUFPLFdBQVUseUNBQXdDLDhCQUEyQixTQUFRLDJCQUF5QmpCLHdCQUF5QmtCLG1CQUFqTztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXVPO0FBQUEsSUFDdk8sdUJBQUMsVUFBSyx3QkFBcUIsb0NBQW1DLHdCQUFxQixRQUFPLFdBQVUsd0NBQXVDLDhCQUEyQixTQUFRLDJCQUF5QmxCLHdCQUF5Qm1CLG1CQUFoTztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXNPO0FBQUEsT0FIeE87QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUlBO0FBRUo7QUFBQ0MsTUFSUUo7QUFBTyxJQUFBSyxJQUFBcEIsS0FBQWMsS0FBQUs7QUFBQSxhQUFBQyxJQUFBO0FBQUEsYUFBQXBCLEtBQUE7QUFBQSxhQUFBYyxLQUFBO0FBQUEsYUFBQUssS0FBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJYIiwiU3RhciIsIlphcCIsIlNwYXJrbGVzIiwiQ2hldnJvblJpZ2h0IiwiZ2V0QWxsQ3VzdG9tSGVyb2VzIiwiZ2V0SGVyb1Nwcml0ZSIsIlJBUklUWV9DT0xPUlMiLCJjb21tb24iLCJ1bmNvbW1vbiIsInJhcmUiLCJlcGljIiwibGVnZW5kYXJ5IiwiUkFSSVRZX0JHIiwiUkFSSVRZX0dMT1ciLCJQRU5ESU5HX0tFWSIsImdldFBlbmRpbmdDYXJkcyIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlUGVuZGluZ0NhcmRzIiwiY2FyZHMiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiQWx0YXJNb2RhbCIsImhlcm9lcyIsImFzcGVjdHMiLCJwbGF5ZXJCYXNlIiwiaGVyb0J1aWxkaW5ncyIsIm9uVXBncmFkZUhlcm8iLCJvbkNsb3NlIiwib25Sb2xsSGVybyIsImlkIiwiX3MiLCJ2aWV3Iiwic2V0VmlldyIsInNlbGVjdGVkSGVybyIsInNldFNlbGVjdGVkSGVybyIsImN1c3RvbUhlcm9lcyIsInNldEN1c3RvbUhlcm9lcyIsInBlbmRpbmdDYXJkcyIsInNldFBlbmRpbmdDYXJkcyIsInJvbGxlZENhcmQiLCJzZXRSb2xsZWRDYXJkIiwiYWN0aXZhdGVDYXJkIiwic2V0QWN0aXZhdGVDYXJkIiwiaGFuZGxlUm9sbCIsImN1c3RvbUhlcm8iLCJnZW1zIiwiZ2VtX2Nvc3QiLCJjYXJkIiwiRGF0ZSIsIm5vdyIsImhlcm9EZWZJZCIsImhlcm9OYW1lIiwibmFtZSIsImhlcm9SYXJpdHkiLCJyYXJpdHkiLCJoZXJvU3RhdHMiLCJwb3J0cmFpdCIsInJvbGxlZEF0IiwidG9JU09TdHJpbmciLCJ1cGRhdGVkIiwiaGFuZGxlQWN0aXZhdGVDYXJkIiwiaGFuZGxlQ29uZmlybUFjdGl2YXRlIiwiZmlsdGVyIiwiYyIsInRvdGFsUGVuZGluZyIsImxlbmd0aCIsIndpZHRoIiwibWF4SGVpZ2h0IiwiYmFja2dyb3VuZCIsImJvcmRlciIsImNvbG9yIiwibWFwIiwiaGVybyIsImhlcm9fdHlwZSIsInNwbGl0IiwibGV2ZWwiLCJoIiwiaXNfcm9sbGFibGUiLCJjaCIsImNhbkFmZm9yZCIsInJlcGxhY2UiLCJib3hTaGFkb3ciLCJoZWlnaHQiLCJpbWFnZVJlbmRlcmluZyIsImZvbnRTaXplIiwiZGVzY3JpcHRpb24iLCJocCIsImF0dGFjayIsInNwZWVkIiwicmFuZ2UiLCJjdXJzb3IiLCJ0b0xvY2FsZVN0cmluZyIsInJhcml0eUNvbG9yQ2xzIiwiX2lkIiwiY3JpdF9jaGFuY2UiLCJIZXJvUG9ydHJhaXQiLCJoZXJvSWQiLCJzaXplIiwiZmFsbGJhY2siLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX2MyIiwiSGVyb0RldGFpbCIsInJhcml0eUNsYXNzIiwiaGVyb0FzcGVjdHMiLCJhIiwiYXNwZWN0X2lkcyIsImluY2x1ZGVzIiwiQXJyYXkiLCJNYXRoIiwibWluIiwiXyIsImkiLCJtYXhfaHAiLCJkZWZlbnNlIiwiX2MzIiwiU3RhdFJvdyIsImljb24iLCJsYWJlbCIsInZhbHVlIiwiX2M0IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQWx0YXJNb2RhbC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFgsIFN0YXIsIFphcCwgU3BhcmtsZXMsIENoZXZyb25SaWdodCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGdldEFsbEN1c3RvbUhlcm9lcyB9IGZyb20gXCJAL2xpYi9oZXJvRGF0YVwiO1xuaW1wb3J0IHsgZ2V0SGVyb1Nwcml0ZSB9IGZyb20gXCJAL2xpYi9oZXJvU3ByaXRlc1wiO1xuXG5jb25zdCBSQVJJVFlfQ09MT1JTID0ge1xuICBjb21tb246IFwidGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTUwMFwiLFxuICB1bmNvbW1vbjogXCJ0ZXh0LWdyZWVuLTQwMCBib3JkZXItZ3JlZW4tNjAwXCIsXG4gIHJhcmU6IFwidGV4dC1ibHVlLTQwMCBib3JkZXItYmx1ZS02MDBcIixcbiAgZXBpYzogXCJ0ZXh0LXB1cnBsZS00MDAgYm9yZGVyLXB1cnBsZS02MDBcIixcbiAgbGVnZW5kYXJ5OiBcInRleHQteWVsbG93LTQwMCBib3JkZXIteWVsbG93LTUwMFwiXG59O1xuY29uc3QgUkFSSVRZX0JHID0ge1xuICBjb21tb246IFwiYmctc2xhdGUtODAwLzQwXCIsXG4gIHVuY29tbW9uOiBcImJnLWdyZWVuLTkwMC8yMFwiLFxuICByYXJlOiBcImJnLWJsdWUtOTAwLzIwXCIsXG4gIGVwaWM6IFwiYmctcHVycGxlLTkwMC8yMFwiLFxuICBsZWdlbmRhcnk6IFwiYmcteWVsbG93LTkwMC8yMFwiXG59O1xuY29uc3QgUkFSSVRZX0dMT1cgPSB7XG4gIGNvbW1vbjogXCJyZ2JhKDE0OCwxNjMsMTg0LDAuMilcIixcbiAgdW5jb21tb246IFwicmdiYSg3NCwyMjIsMTI4LDAuMjUpXCIsXG4gIHJhcmU6IFwicmdiYSg5NiwxNjUsMjUwLDAuMjUpXCIsXG4gIGVwaWM6IFwicmdiYSgxOTIsMTMyLDI1MiwwLjMpXCIsXG4gIGxlZ2VuZGFyeTogXCJyZ2JhKDI1MSwxOTEsMzYsMC40KVwiXG59O1xuXG4vLyBSb2xsZWQgaGVybyBjYXJkcyBwZW5kaW5nIGFjdGl2YXRpb24g4oCUIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2VcbmNvbnN0IFBFTkRJTkdfS0VZID0gXCJhbHRhcl9wZW5kaW5nX2hlcm9fY2FyZHNfdjFcIjtcbmZ1bmN0aW9uIGdldFBlbmRpbmdDYXJkcygpIHtcbiAgdHJ5IHtyZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQRU5ESU5HX0tFWSkgfHwgXCJbXVwiKTt9IGNhdGNoIHtyZXR1cm4gW107fVxufVxuZnVuY3Rpb24gc2F2ZVBlbmRpbmdDYXJkcyhjYXJkcykge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQRU5ESU5HX0tFWSwgSlNPTi5zdHJpbmdpZnkoY2FyZHMpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWx0YXJNb2RhbCh7IGhlcm9lcywgYXNwZWN0cywgcGxheWVyQmFzZSwgaGVyb0J1aWxkaW5ncywgb25VcGdyYWRlSGVybywgb25DbG9zZSwgb25Sb2xsSGVybywgaWQgfSkge1xuICBjb25zdCBbdmlldywgc2V0Vmlld10gPSB1c2VTdGF0ZShcImhlcm9lc1wiKTsgLy8gXCJoZXJvZXNcIiB8IFwicm9sbFwiIHwgXCJjYXJkc1wiXG4gIGNvbnN0IFtzZWxlY3RlZEhlcm8sIHNldFNlbGVjdGVkSGVyb10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2N1c3RvbUhlcm9lcywgc2V0Q3VzdG9tSGVyb2VzXSA9IHVzZVN0YXRlKCgpID0+IGdldEFsbEN1c3RvbUhlcm9lcygpKTtcbiAgY29uc3QgW3BlbmRpbmdDYXJkcywgc2V0UGVuZGluZ0NhcmRzXSA9IHVzZVN0YXRlKCgpID0+IGdldFBlbmRpbmdDYXJkcygpKTtcbiAgY29uc3QgW3JvbGxlZENhcmQsIHNldFJvbGxlZENhcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFthY3RpdmF0ZUNhcmQsIHNldEFjdGl2YXRlQ2FyZF0gPSB1c2VTdGF0ZShudWxsKTtcblxuICAvLyBSZWZyZXNoIGN1c3RvbSBoZXJvZXMgd2hlbiBzd2l0Y2hpbmcgdG8gcm9sbCB2aWV3XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHZpZXcgPT09IFwicm9sbFwiKSBzZXRDdXN0b21IZXJvZXMoZ2V0QWxsQ3VzdG9tSGVyb2VzKCkpO1xuICB9LCBbdmlld10pO1xuXG4gIGNvbnN0IGhhbmRsZVJvbGwgPSAoY3VzdG9tSGVybykgPT4ge1xuICAgIGlmICgocGxheWVyQmFzZT8uZ2VtcyA/PyAwKSA8IGN1c3RvbUhlcm8uZ2VtX2Nvc3QpIHJldHVybjtcbiAgICAvLyBDcmVhdGUgYSBwZW5kaW5nIGNhcmRcbiAgICBjb25zdCBjYXJkID0ge1xuICAgICAgaWQ6IGBjYXJkXyR7RGF0ZS5ub3coKX1gLFxuICAgICAgaGVyb0RlZklkOiBjdXN0b21IZXJvLmlkLFxuICAgICAgaGVyb05hbWU6IGN1c3RvbUhlcm8ubmFtZSxcbiAgICAgIGhlcm9SYXJpdHk6IGN1c3RvbUhlcm8ucmFyaXR5LFxuICAgICAgaGVyb1N0YXRzOiB7IC4uLmN1c3RvbUhlcm8gfSxcbiAgICAgIHBvcnRyYWl0OiBnZXRIZXJvU3ByaXRlKGN1c3RvbUhlcm8uaWQsIFwiU1wiKSxcbiAgICAgIHJvbGxlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4ucGVuZGluZ0NhcmRzLCBjYXJkXTtcbiAgICBzZXRQZW5kaW5nQ2FyZHModXBkYXRlZCk7XG4gICAgc2F2ZVBlbmRpbmdDYXJkcyh1cGRhdGVkKTtcbiAgICBvblJvbGxIZXJvPy4oY3VzdG9tSGVybyk7IC8vIGRlZHVjdCBnZW1zICsgaGFuZGxlIERCXG4gICAgc2V0Um9sbGVkQ2FyZChjYXJkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBY3RpdmF0ZUNhcmQgPSBhc3luYyAoY2FyZCkgPT4ge1xuICAgIHNldEFjdGl2YXRlQ2FyZChjYXJkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtQWN0aXZhdGUgPSAoKSA9PiB7XG4gICAgaWYgKCFhY3RpdmF0ZUNhcmQpIHJldHVybjtcbiAgICAvLyBSZW1vdmUgZnJvbSBwZW5kaW5nXG4gICAgY29uc3QgdXBkYXRlZCA9IHBlbmRpbmdDYXJkcy5maWx0ZXIoKGMpID0+IGMuaWQgIT09IGFjdGl2YXRlQ2FyZC5pZCk7XG4gICAgc2V0UGVuZGluZ0NhcmRzKHVwZGF0ZWQpO1xuICAgIHNhdmVQZW5kaW5nQ2FyZHModXBkYXRlZCk7XG4gICAgc2V0QWN0aXZhdGVDYXJkKG51bGwpO1xuICAgIHNldFJvbGxlZENhcmQobnVsbCk7XG4gICAgLy8gTm90aWZ5IHBhcmVudCB0byBjcmVhdGUgdGhlIGhlcm8gZW50aXR5XG4gICAgb25Sb2xsSGVybz8uKGFjdGl2YXRlQ2FyZC5oZXJvU3RhdHMsIHRydWUgLyogYWN0aXZhdGUgKi8pO1xuICB9O1xuXG4gIGNvbnN0IHRvdGFsUGVuZGluZyA9IHBlbmRpbmdDYXJkcy5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6ODg6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay83MFwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjg5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwYW5lbC1kYXJrIHJvdW5kZWQteGwgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW5cIiBzdHlsZT17eyB3aWR0aDogNjQwLCBtYXhIZWlnaHQ6IFwiOTB2aFwiIH19PlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6OTE6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXB1cnBsZS00MDAvMjBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6OTI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDo5MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCflK48L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6OTQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjk1OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1wdXJwbGUtNDAwIHRleHQtWzEwcHhdXCI+QUxUQVIgT0YgSEVST0VTPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDo5NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbGF0ZS00MDAgdGV4dC14c1wiPntoZXJvZXMubGVuZ3RofSBoZXJvZXMgYWN0aXZlPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6OTk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgey8qIFRhYiBidXR0b25zICovfVxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEwMToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFZpZXcoXCJoZXJvZXNcIil9IGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiB2aWV3ID09PSBcImhlcm9lc1wiID8gXCIjNGMxZDk1XCIgOiBcIiMxYTFhMmVcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dmlldyA9PT0gXCJoZXJvZXNcIiA/IFwiI2E4NTVmN1wiIDogXCIjMzMzXCJ9YCwgY29sb3I6IHZpZXcgPT09IFwiaGVyb2VzXCIgPyBcIiNmZmZcIiA6IFwiIzg4OFwiIH19PlxuICAgICAgICAgICAgICBIRVJPRVNcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEwNToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFZpZXcoXCJyb2xsXCIpfSBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogdmlldyA9PT0gXCJyb2xsXCIgPyBcIiNiNDUzMDlcIiA6IFwiIzFhMWEyZVwiLCBib3JkZXI6IGAxcHggc29saWQgJHt2aWV3ID09PSBcInJvbGxcIiA/IFwiI2Y1OWUwYlwiIDogXCIjMzMzXCJ9YCwgY29sb3I6IHZpZXcgPT09IFwicm9sbFwiID8gXCIjZmZmXCIgOiBcIiM4ODhcIiB9fT5cbiAgICAgICAgICAgICAgUk9MTFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTA5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0VmlldyhcImNhcmRzXCIpfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBweC0zIHB5LTEgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogdmlldyA9PT0gXCJjYXJkc1wiID8gXCIjMTY2NTM0XCIgOiBcIiMxYTFhMmVcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dmlldyA9PT0gXCJjYXJkc1wiID8gXCIjNGFkZTgwXCIgOiBcIiMzMzNcIn1gLCBjb2xvcjogdmlldyA9PT0gXCJjYXJkc1wiID8gXCIjZmZmXCIgOiBcIiM4ODhcIiB9fT5cbiAgICAgICAgICAgICAgQ0FSRFMge3RvdGFsUGVuZGluZyA+IDAgJiYgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMTE6NDFcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEgLXJpZ2h0LTEgdy00IGgtNCByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMCBmb250LXVpIHRleHQtWzlweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidG90YWxQZW5kaW5nXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2lkfT57dG90YWxQZW5kaW5nfTwvc3Bhbj59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMTM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+PFggZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMTM6ODJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MjB9IC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBWaWV3cyAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjExODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHt2aWV3ID09PSBcImhlcm9lc1wiICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEyMDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaC1mdWxsXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMjE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LVsyMjBweF0gYm9yZGVyLXIgYm9yZGVyLXB1cnBsZS00MDAvMTAgb3ZlcmZsb3cteS1hdXRvIHAtMyBzcGFjZS15LTJcIiBkYXRhLWNvbGxlY3Rpb24taWQ9XCJoZXJvZXNcIj5cbiAgICAgICAgICAgICAgICB7aGVyb2VzLm1hcCgoaGVybykgPT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEyMzoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aGVyby5pZH0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRIZXJvKGhlcm8pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgdGV4dC1sZWZ0IHJvdW5kZWQtbGcgcHgtMyBweS0yLjUgdHJhbnNpdGlvbi1hbGwgYm9yZGVyICR7c2VsZWN0ZWRIZXJvPy5pZCA9PT0gaGVyby5pZCA/IFwiYm9yZGVyLXB1cnBsZS01MDAvNjAgYmctcHVycGxlLTkwMC8zMFwiIDogYGJvcmRlci10cmFuc3BhcmVudCBob3Zlcjpib3JkZXItc2xhdGUtNjAwICR7UkFSSVRZX0JHW2hlcm8ucmFyaXR5XX1gfWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoZXJvPy5pZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMjU6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxIZXJvUG9ydHJhaXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMjY6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBoZXJvSWQ9e2hlcm8uaGVyb190eXBlfSBzaXplPXsyOH0gZmFsbGJhY2s9XCLimpTvuI9cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMjc6MjJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMjg6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2Bmb250LXVpIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSAke1JBUklUWV9DT0xPUlNbaGVyby5yYXJpdHldPy5zcGxpdChcIiBcIilbMF19YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2hlcm8/LmlkfT57aGVyby5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEyOToyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aGVybz8uaWR9Pkx2LntoZXJvLmxldmVsfSDCtyB7aGVyby5yYXJpdHl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2hlcm9lcy5sZW5ndGggPT09IDAgJiYgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjEzNDo0MFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS04IHRleHQtc2xhdGUtNTAwIGZvbnQtdWkgdGV4dC1zbVwiPk5vIGhlcm9lcyB5ZXQuPGJyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTM0OjExOVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPlJvbGwgZm9yIGhlcm9lcyE8L2Rpdj59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTM2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTRcIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRIZXJvID9cbiAgICAgICAgICAgICAgPEhlcm9EZXRhaWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxMzg6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBoZXJvPXtzZWxlY3RlZEhlcm99IGFzcGVjdHM9e2FzcGVjdHN9IHBsYXllckJhc2U9e3BsYXllckJhc2V9IGhlcm9CdWlsZGluZ3M9e2hlcm9CdWlsZGluZ3N9IG9uVXBncmFkZUhlcm89e29uVXBncmFkZUhlcm99IC8+IDpcblxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTQwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImgtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCBmb250LXVpIHRleHQtc21cIj5TZWxlY3QgYSBoZXJvIHRvIHZpZXcgZGV0YWlsczwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuXG4gICAgICAgICAge3ZpZXcgPT09IFwicm9sbFwiICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE0NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm92ZXJmbG93LXktYXV0byBwLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE0ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzlweF0gdGV4dC15ZWxsb3ctNDAwIG1iLTNcIj7wn46yIFJPTEwgRk9SIEhFUk9FUzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTQ5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtYi00XCI+U3BlbmQgZ2VtcyB0byByb2xsIGZvciBjdXN0b20gaGVyb2VzLiBSb2xsZWQgaGVyb2VzIGFwcGVhciBhcyBjYXJkcyB0byBhY3RpdmF0ZS48L2Rpdj5cbiAgICAgICAgICAgICAge2N1c3RvbUhlcm9lcy5maWx0ZXIoKGgpID0+IGguaXNfcm9sbGFibGUgIT09IGZhbHNlKS5sZW5ndGggPT09IDAgP1xuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE1MToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweS0xNiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE1MjoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTR4bFwiPvCflK48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNTM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS00MDAgdGV4dC1jZW50ZXJcIj5UaGlzIGZlYXR1cmUgd2lsbCBiZTxiciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE1MzoxMDZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz5hdmFpbGFibGUgc2hvcnRseSE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNTQ6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHRleHQtY2VudGVyXCI+Q2hlY2sgYmFjayBzb29uIGZvciBuZXcgaGVyb2VzIHRvIHJvbGwuPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+IDpcblxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE1NzoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIHtjdXN0b21IZXJvZXMuZmlsdGVyKChoKSA9PiBoLmlzX3JvbGxhYmxlICE9PSBmYWxzZSkubWFwKChjaCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcnRyYWl0ID0gZ2V0SGVyb1Nwcml0ZShjaC5pZCwgXCJTXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkFmZm9yZCA9IChwbGF5ZXJCYXNlPy5nZW1zID8/IDApID49IGNoLmdlbV9jb3N0O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTYyOjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtjaC5pZH0gY2xhc3NOYW1lPVwicm91bmRlZC14bCBwLTQgZmxleCBmbGV4LWNvbCBnYXAtMlwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBSQVJJVFlfQkdbY2gucmFyaXR5XSB8fCBcIiMxYTFhMmVcIiwgYm9yZGVyOiBgMnB4IHNvbGlkICR7UkFSSVRZX0NPTE9SU1tjaC5yYXJpdHldPy5zcGxpdChcIiBcIilbMV0/LnJlcGxhY2UoXCJib3JkZXItXCIsIFwiXCIpIHx8IFwiIzMzM1wifWAsIGJveFNoYWRvdzogYDAgNHB4IDE2cHggJHtSQVJJVFlfR0xPV1tjaC5yYXJpdHldIHx8IFwidHJhbnNwYXJlbnRcIn1gIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjaD8uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE2NDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNjU6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cG9ydHJhaXQgPyA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTY3OjQwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtwb3J0cmFpdH0gc3R5bGU9e3sgd2lkdGg6IDQ0LCBoZWlnaHQ6IDQ0LCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBhbHQ9XCJcIiAvPiA6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTY3OjEzNVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGZvbnRTaXplOiAyOCB9fT7wn6a4PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNjk6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTFcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlc2NyaXB0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2NoPy5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE3MDoyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YGZvbnQtdWkgZm9udC1ib2xkIHRleHQtc20gJHtSQVJJVFlfQ09MT1JTW2NoLnJhcml0eV0/LnNwbGl0KFwiIFwiKVswXX1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2g/LmlkfT57Y2gubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTcxOjI4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBjYXBpdGFsaXplXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJyYXJpdHlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2g/LmlkfT57Y2gucmFyaXR5fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaC5kZXNjcmlwdGlvbiAmJiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTcyOjQ3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlc2NyaXB0aW9uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2NoPy5pZH0+e2NoLmRlc2NyaXB0aW9ufTwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzU6MjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy00IGdhcC0xIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzY6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHAtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjMpXCIgfX0+PGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE3Njo5N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5IUDwvZGl2PjxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzY6MTU2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaHBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2g/LmlkfT57Y2guaHB9PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzc6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHAtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjMpXCIgfX0+PGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE3Nzo5N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5BVEs8L2Rpdj48ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTc3OjE1N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC13aGl0ZSBmb250LWJvbGRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImF0dGFja1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjaD8uaWR9PntjaC5hdHRhY2t9PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzg6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHAtMVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjMpXCIgfX0+PGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE3ODo5N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5TUEQ8L2Rpdj48ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTc4OjE1N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF0gdGV4dC13aGl0ZSBmb250LWJvbGRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInNwZWVkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2NoPy5pZH0+e2NoLnNwZWVkfTwvZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MTc5OjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZCBwLTFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC4zKVwiIH19PjxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoxNzk6OTdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+Uk5HPC9kaXY+PGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE3OToxNTdcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtd2hpdGUgZm9udC1ib2xkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJyYW5nZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjaD8uaWR9PntjaC5yYW5nZX08L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjE4MToyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJvbGwoY2gpfSBkaXNhYmxlZD17IWNhbkFmZm9yZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGNhbkFmZm9yZCA/IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2I0NTMwOSAwJSwgIzc4MzUwZiAxMDAlKVwiIDogXCIjMWYxZjFmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7Y2FuQWZmb3JkID8gXCIjZjU5ZTBiXCIgOiBcIiMzNzQxNTFcIn1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjYW5BZmZvcmQgPyBcIiNmZmZcIiA6IFwiIzU1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogY2FuQWZmb3JkID8gXCJwb2ludGVyXCIgOiBcIm5vdC1hbGxvd2VkXCJcbiAgICAgICAgICAgICAgICAgICAgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJnZW1fY29zdFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjaD8uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICDwn5KOIHtjaC5nZW1fY29zdC50b0xvY2FsZVN0cmluZygpfSDigJQgUk9MTFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cblxuICAgICAgICAgIHt2aWV3ID09PSBcImNhcmRzXCIgJiZcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjAwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwib3ZlcmZsb3cteS1hdXRvIHAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjAxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSB0ZXh0LWdyZWVuLTQwMCBtYi0zXCI+8J+DjyBIRVJPIENBUkRTPC9kaXY+XG4gICAgICAgICAgICAgIHtwZW5kaW5nQ2FyZHMubGVuZ3RoID09PSAwID9cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMDM6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktOCB0ZXh0LXNsYXRlLTUwMCBmb250LXVpIHRleHQtc21cIj5ObyBwZW5kaW5nIGhlcm8gY2FyZHMuPGJyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjAzOjEwM1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPlJvbGwgZm9yIGhlcm9lcyB0byByZWNlaXZlIGNhcmRzLjwvZGl2PiA6XG5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMDU6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICB7cGVuZGluZ0NhcmRzLm1hcCgoY2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhcml0eUNvbG9yQ2xzID0gUkFSSVRZX0NPTE9SU1tjYXJkLmhlcm9SYXJpdHldIHx8IFwidGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTUwMFwiO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjA5OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtjYXJkLmlkfSBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIHAtNCBmbGV4IGZsZXgtY29sIGdhcC0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOnNjYWxlLVsxLjAyXVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmF0ZUNhcmQoY2FyZCl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBSQVJJVFlfQkdbY2FyZC5oZXJvUmFyaXR5XSB8fCBcIiMxYTFhMmVcIiwgYm9yZGVyOiBgMnB4IHNvbGlkICR7cmFyaXR5Q29sb3JDbHMuc3BsaXQoXCIgXCIpWzFdPy5yZXBsYWNlKFwiYm9yZGVyLVwiLCBcIlwiKSB8fCBcIiMzMzNcIn1gLCBib3hTaGFkb3c6IGAwIDRweCAxNnB4ICR7UkFSSVRZX0dMT1dbY2FyZC5oZXJvUmFyaXR5XSB8fCBcInRyYW5zcGFyZW50XCJ9YCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2FyZD8uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjIxMjoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMTM6MjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMTUpXCIgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhcmQucG9ydHJhaXQgPyA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjE1OjQ1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtjYXJkLnBvcnRyYWl0fSBzdHlsZT17eyB3aWR0aDogNTIsIGhlaWdodDogNTIsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiIH19IGFsdD1cIlwiIC8+IDogPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMTU6MTQ1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgZm9udFNpemU6IDMyIH19PvCfprg8L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjIxNzoyNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMTg6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9e2Bmb250LXVpIGZvbnQtYm9sZCB0ZXh0LXNtICR7cmFyaXR5Q29sb3JDbHMuc3BsaXQoXCIgXCIpWzBdfWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb05hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2FyZD8uaWR9PntjYXJkLmhlcm9OYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMTk6MjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGNhcGl0YWxpemVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImhlcm9SYXJpdHlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y2FyZD8uaWR9PntjYXJkLmhlcm9SYXJpdHl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjIyMDoyOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF0gdGV4dC1zbGF0ZS02MDAgbXQtMC41XCI+VGFwIHRvIGFjdGl2YXRlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjIyOjI2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezE2fSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUm9sbGVkIGNhcmQgcmV2ZWFsICovfVxuICAgICAge3JvbGxlZENhcmQgJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyMzY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bNjBdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCIgb25DbGljaz17KCkgPT4gc2V0Um9sbGVkQ2FyZChudWxsKX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjIzNzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIHAtOCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtNCBtYXgtdy14cyB3LWZ1bGwgYW5pbWF0ZS1ib3VuY2Utb25jZVwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFJBUklUWV9CR1tyb2xsZWRDYXJkLmhlcm9SYXJpdHldIHx8IFwiIzFhMWEyZVwiLCBib3JkZXI6IGAzcHggc29saWQgJHtSQVJJVFlfQ09MT1JTW3JvbGxlZENhcmQuaGVyb1Jhcml0eV0/LnNwbGl0KFwiIFwiKVsxXT8ucmVwbGFjZShcImJvcmRlci1cIiwgXCJcIikgfHwgXCIjMzMzXCJ9YCwgYm94U2hhZG93OiBgMCAwIDQwcHggJHtSQVJJVFlfR0xPV1tyb2xsZWRDYXJkLmhlcm9SYXJpdHldfWAgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjM5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bMTBweF0gdGV4dC15ZWxsb3ctNDAwIGFuaW1hdGUtcHVsc2VcIj7inKggSEVSTyBST0xMRUQhIOKcqDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI0MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInctMjQgaC0yNCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGQwZDFhXCIgfX0+XG4gICAgICAgICAgICAgIHtyb2xsZWRDYXJkLnBvcnRyYWl0ID8gPGltZyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI0MTozN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHNyYz17cm9sbGVkQ2FyZC5wb3J0cmFpdH0gc3R5bGU9e3sgd2lkdGg6IDg4LCBoZWlnaHQ6IDg4LCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBhbHQ9XCJcIiAvPiA6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjQxOjE0M1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGZvbnRTaXplOiA1NiB9fT7wn6a4PC9zcGFuPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI0MzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YGZvbnQtcGl4ZWwgdGV4dC1bMTFweF0gJHtSQVJJVFlfQ09MT1JTW3JvbGxlZENhcmQuaGVyb1Jhcml0eV0/LnNwbGl0KFwiIFwiKVswXX1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImhlcm9OYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3JvbGxlZENhcmQ/LmlkIHx8IHJvbGxlZENhcmQ/Ll9pZH0+e3JvbGxlZENhcmQuaGVyb05hbWV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjQ0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGNhcGl0YWxpemVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImhlcm9SYXJpdHlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17cm9sbGVkQ2FyZD8uaWQgfHwgcm9sbGVkQ2FyZD8uX2lkfT57cm9sbGVkQ2FyZC5oZXJvUmFyaXR5fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI0NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgdGV4dC1jZW50ZXJcIj5DaGVjayB5b3VyIEhlcm8gQ2FyZHMgdG8gYWN0aXZhdGUgdGhpcyBoZXJvITwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI0NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldFJvbGxlZENhcmQobnVsbCl9IGNsYXNzTmFtZT1cIm10LTIgcHgtNiBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtd2hpdGVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiM0YzFkOTVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjYTg1NWY3XCIgfX0+XG4gICAgICAgICAgICAgIEFXRVNPTUUhXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHsvKiBBY3RpdmF0ZSBjYXJkIGNvbmZpcm1hdGlvbiAqL31cbiAgICAgIHthY3RpdmF0ZUNhcmQgJiZcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNTU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bNzBdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI1NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIHAtNiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtNCBtYXgtdy14cyB3LWZ1bGxcIlxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDExMTdcIiwgYm9yZGVyOiBgMnB4IHNvbGlkICR7UkFSSVRZX0NPTE9SU1thY3RpdmF0ZUNhcmQuaGVyb1Jhcml0eV0/LnNwbGl0KFwiIFwiKVsxXT8ucmVwbGFjZShcImJvcmRlci1cIiwgXCJcIikgfHwgXCIjMzMzXCJ9YCB9fT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNTg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS00MDBcIj5BQ1RJVkFURSBUSElTIEhFUk8/PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjU5OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy0yMCBoLTIwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDBkMWFcIiB9fT5cbiAgICAgICAgICAgICAge2FjdGl2YXRlQ2FyZC5wb3J0cmFpdCA/IDxpbWcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNjA6MzlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e2FjdGl2YXRlQ2FyZC5wb3J0cmFpdH0gc3R5bGU9e3sgd2lkdGg6IDcyLCBoZWlnaHQ6IDcyLCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBhbHQ9XCJcIiAvPiA6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjYwOjE0N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGZvbnRTaXplOiA0NCB9fT7wn6a4PC9zcGFuPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI2MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YGZvbnQtcGl4ZWwgdGV4dC1bMTFweF0gJHtSQVJJVFlfQ09MT1JTW2FjdGl2YXRlQ2FyZC5oZXJvUmFyaXR5XT8uc3BsaXQoXCIgXCIpWzBdfWB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb05hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17YWN0aXZhdGVDYXJkPy5pZCB8fCBhY3RpdmF0ZUNhcmQ/Ll9pZH0+e2FjdGl2YXRlQ2FyZC5oZXJvTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNjM6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgY2FwaXRhbGl6ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb1Jhcml0eVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXthY3RpdmF0ZUNhcmQ/LmlkIHx8IGFjdGl2YXRlQ2FyZD8uX2lkfT57YWN0aXZhdGVDYXJkLmhlcm9SYXJpdHl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiB3LWZ1bGwgdGV4dC1jZW50ZXIgdGV4dC14cyBmb250LXVpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHAtMS41XCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpXCIgfX0+SFA6IDxiIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY1Ojk4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb1N0YXRzLmhwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2FjdGl2YXRlQ2FyZD8uaWQgfHwgYWN0aXZhdGVDYXJkPy5faWR9PnthY3RpdmF0ZUNhcmQuaGVyb1N0YXRzLmhwfTwvYj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI2NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJvdW5kZWQgcC0xLjVcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC4wNSlcIiB9fT5BVEs6IDxiIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY2Ojk5XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb1N0YXRzLmF0dGFja1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXthY3RpdmF0ZUNhcmQ/LmlkIHx8IGFjdGl2YXRlQ2FyZD8uX2lkfT57YWN0aXZhdGVDYXJkLmhlcm9TdGF0cy5hdHRhY2t9PC9iPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZCBwLTEuNVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjA1KVwiIH19PlNQRDogPGIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyNjc6OTlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJoZXJvU3RhdHMuc3BlZWRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17YWN0aXZhdGVDYXJkPy5pZCB8fCBhY3RpdmF0ZUNhcmQ/Ll9pZH0+e2FjdGl2YXRlQ2FyZC5oZXJvU3RhdHMuc3BlZWR9PC9iPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZCBwLTEuNVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjA1KVwiIH19PkNSSVQ6IDxiIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjY4OjEwMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImhlcm9TdGF0cy5jcml0X2NoYW5jZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXthY3RpdmF0ZUNhcmQ/LmlkIHx8IGFjdGl2YXRlQ2FyZD8uX2lkfT57YWN0aXZhdGVDYXJkLmhlcm9TdGF0cy5jcml0X2NoYW5jZX0lPC9iPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjcwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiB3LWZ1bGwgbXQtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjcxOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0QWN0aXZhdGVDYXJkKG51bGwpfSBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBob3ZlcjpiZy1zbGF0ZS04MDBcIiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICMzNzQxNTFcIiB9fT5DQU5DRUw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI3MjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZUNvbmZpcm1BY3RpdmF0ZX0gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC13aGl0ZVwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzE2NjUzNFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICM0YWRlODBcIiB9fT5BQ1RJVkFURSE8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59XG5cbmZ1bmN0aW9uIEhlcm9Qb3J0cmFpdCh7IGhlcm9JZCwgc2l6ZSwgZmFsbGJhY2ssIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIGNvbnN0IHBvcnRyYWl0ID0gaGVyb0lkID8gZ2V0SGVyb1Nwcml0ZShoZXJvSWQsIFwiU1wiKSA6IG51bGw7XG4gIGlmIChwb3J0cmFpdCkgcmV0dXJuIDxpbWcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyODM6MjNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e3BvcnRyYWl0fSBzdHlsZT17eyB3aWR0aDogc2l6ZSwgaGVpZ2h0OiBzaXplLCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBhbHQ9XCJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0gLz47XG4gIHJldHVybiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjI4NDo5XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgZm9udFNpemU6IHNpemUgKiAwLjcgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZmFsbGJhY2tcIj57ZmFsbGJhY2t9PC9zcGFuPjtcbn1cblxuZnVuY3Rpb24gSGVyb0RldGFpbCh7IGhlcm8sIGFzcGVjdHMsIHBsYXllckJhc2UsIGhlcm9CdWlsZGluZ3MsIG9uVXBncmFkZUhlcm8gfSkge1xuICBjb25zdCByYXJpdHlDbGFzcyA9IFJBUklUWV9DT0xPUlNbaGVyby5yYXJpdHldIHx8IFwidGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTUwMFwiO1xuICBjb25zdCBoZXJvQXNwZWN0cyA9IGFzcGVjdHMuZmlsdGVyKChhKSA9PiBoZXJvLmFzcGVjdF9pZHM/LmluY2x1ZGVzKGEuaWQpKTtcbiAgY29uc3QgcG9ydHJhaXQgPSBnZXRIZXJvU3ByaXRlKGhlcm8uaGVyb190eXBlLCBcIlNcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MjkzOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyOTQ6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDoyOTU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT17YHctMTYgaC0xNiByb3VuZGVkLWxnIGJvcmRlci0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTkwMCAke3Jhcml0eUNsYXNzLnNwbGl0KFwiIFwiKVsxXSB8fCBcImJvcmRlci1zbGF0ZS01MDBcIn1gfT5cbiAgICAgICAgICB7cG9ydHJhaXQgPyA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6Mjk2OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtwb3J0cmFpdH0gc3R5bGU9e3sgd2lkdGg6IDU2LCBoZWlnaHQ6IDU2LCBpbWFnZVJlbmRlcmluZzogXCJwaXhlbGF0ZWRcIiB9fSBhbHQ9XCJcIiAvPiA6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6Mjk2OjExN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPuKalO+4jzwvc3Bhbj59XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6Mjk4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6Mjk5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgZm9udC1waXhlbCB0ZXh0LVsxMXB4XSAke3Jhcml0eUNsYXNzLnNwbGl0KFwiIFwiKVswXX1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aGVybz8uaWQgfHwgaGVybz8uX2lkfT57aGVyby5uYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMDA6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtc2xhdGUtNDAwIHRleHQtc20gY2FwaXRhbGl6ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicmFyaXR5XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2hlcm8/LmlkIHx8IGhlcm8/Ll9pZH0+e2hlcm8ucmFyaXR5fSDCtyBMZXZlbCB7aGVyby5sZXZlbH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzAxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMSBtdC0xXCI+e1suLi5BcnJheShNYXRoLm1pbihoZXJvLmxldmVsLCAxMCkpXS5tYXAoKF8sIGkpID0+IDxTdGFyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzAxOjk1XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBzaXplPXsxMH0gZmlsbD1cIiNmYmJmMjRcIiBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy00MDBcIiBkYXRhLWFyci1pbmRleD17aX0gLz4pfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMwNDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICA8U3RhdFJvdyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMwNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIuKdpO+4j1wiIGxhYmVsPVwiSFBcIiB2YWx1ZT17YCR7aGVyby5ocH0gLyAke2hlcm8ubWF4X2hwfWB9IC8+XG4gICAgICAgIDxTdGF0Um93IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzA2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpY29uPVwi4pqU77iPXCIgbGFiZWw9XCJBVEtcIiB2YWx1ZT17aGVyby5hdHRhY2t9IC8+XG4gICAgICAgIDxTdGF0Um93IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzA3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpY29uPVwi8J+boe+4j1wiIGxhYmVsPVwiREVGXCIgdmFsdWU9e2hlcm8uZGVmZW5zZX0gLz5cbiAgICAgICAgPFN0YXRSb3cgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMDg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGljb249XCLwn5KoXCIgbGFiZWw9XCJTUERcIiB2YWx1ZT17aGVyby5zcGVlZH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMxMDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMTE6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBtYi0yXCI+QVNQRUNUUyAoe2hlcm9Bc3BlY3RzLmxlbmd0aH0pPC9kaXY+XG4gICAgICAgIHtoZXJvQXNwZWN0cy5sZW5ndGggPiAwID9cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMxMzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMVwiIGRhdGEtY29sbGVjdGlvbi1pZD1cImFzcGVjdHNcIj5cbiAgICAgICAgICAgIHtoZXJvQXNwZWN0cy5tYXAoKGEpID0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMxNToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17YS5pZH0gY2xhc3NOYW1lPVwiYmctcHVycGxlLTkwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvMzAgcm91bmRlZCBweC0yIHB5LTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17YT8uaWR9PlxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzE2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXB1cnBsZS0zMDAgdGV4dC14c1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXthPy5pZH0+e2EubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMTc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxldmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2E/LmlkfT5Mdi57YS5sZXZlbH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+IDpcblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzIyOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGZvbnQtdWkgdGV4dC14c1wiPk5vIGFzcGVjdHMgZXF1aXBwZWQuPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMyNTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gb25VcGdyYWRlSGVybz8uKGhlcm8pfVxuICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJ0bi1ycGctcHVycGxlIGJ0bi1ycGcgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiPlxuICAgICAgICA8WmFwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzI3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTJ9IC8+VVBHUkFERSBIRVJPICg1MDDwn5KwKVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+KTtcblxufVxuXG5mdW5jdGlvbiBTdGF0Um93KHsgaWNvbiwgbGFiZWwsIHZhbHVlLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMzU6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC81MCByb3VuZGVkIHB4LTIuNSBweS0xLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9BbHRhck1vZGFsOjMzNjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJpY29uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PntpY29ufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWw6MzM3OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtc2xhdGUtNDAwIHRleHQteHMgZmxleC0xXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57bGFiZWx9PC9zcGFuPlxuICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbDozMzg6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC1zbVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidmFsdWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e3ZhbHVlfTwvc3Bhbj5cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9jb21wb25lbnRzL2dhbWUvQWx0YXJNb2RhbC5qc3gifQ==