import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/DungeonsModal.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/DungeonsModal.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { X, ChevronLeft, Skull, Swords, Trophy } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { TERRITORY_DEFS, TERRITORY_DUNGEONS, getDungeonWithLayout } from "/src/lib/dungeonData.js";
const TERRITORY_THEMES = [
  { bg: "from-stone-900 to-stone-800", accent: "#c8a96e", border: "#7a5c2e", glow: "rgba(200,169,110,0.3)" },
  { bg: "from-red-950 to-orange-950", accent: "#ef4444", border: "#7f1d1d", glow: "rgba(239,68,68,0.3)" },
  { bg: "from-blue-950 to-cyan-950", accent: "#06b6d4", border: "#164e63", glow: "rgba(6,182,212,0.3)" },
  { bg: "from-purple-950 to-violet-950", accent: "#a855f7", border: "#4c1d95", glow: "rgba(168,85,247,0.3)" }
];
export default function DungeonsModal({ playerBase, heroes, troops, onEnterDungeon, onClose, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const [selectedTerritory, setSelectedTerritory] = useState(0);
  const [view, setView] = useState("territories");
  const territory = TERRITORY_DEFS[selectedTerritory];
  const theme = TERRITORY_THEMES[selectedTerritory];
  const dungeons = TERRITORY_DUNGEONS[selectedTerritory];
  const handleSelectTerritory = (idx) => {
    setSelectedTerritory(idx);
    setView("dungeons");
  };
  const handleBack = () => setView("territories");
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:28:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80", "data-collection-item-id": __dataCollectionItemId, children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "components/game/DungeonsModal:29:6",
      "data-dynamic-content": "true",
      className: "rounded-xl overflow-hidden flex flex-col",
      style: {
        width: 780,
        maxHeight: "90vh",
        background: "#0f0f1a",
        border: `2px solid ${theme.border}`,
        boxShadow: `0 0 40px ${theme.glow}, 0 20px 60px rgba(0,0,0,0.8)`
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/DungeonsModal:40:8",
            "data-dynamic-content": "true",
            className: "flex items-center justify-between px-5 py-3 border-b",
            style: { borderColor: theme.border, background: "rgba(0,0,0,0.5)" },
            children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:44:10", "data-dynamic-content": "true", className: "flex items-center gap-3", children: [
                view === "dungeons" && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "components/game/DungeonsModal:46:14",
                    "data-dynamic-content": "true",
                    onClick: handleBack,
                    className: "flex items-center gap-1 text-xs font-pixel transition-opacity hover:opacity-70",
                    style: { color: theme.accent },
                    children: [
                      /* @__PURE__ */ jsxDEV(ChevronLeft, { "data-source-location": "components/game/DungeonsModal:51:16", "data-dynamic-content": "false", size: 14 }, void 0, false, {
                        fileName: "/app/src/components/game/DungeonsModal.jsx",
                        lineNumber: 70,
                        columnNumber: 17
                      }, this),
                      "BACK"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 65,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:55:12", "data-dynamic-content": "false", className: "text-xl", children: "⚔️" }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 74,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:56:12", "data-dynamic-content": "true", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:57:14", "data-dynamic-content": "true", className: "font-pixel text-[10px]", style: { color: theme.accent }, children: view === "territories" ? "DUNGEONS" : `${territory.name.toUpperCase()} — TERRITORY ${selectedTerritory + 1}` }, void 0, false, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 76,
                    columnNumber: 15
                  }, this),
                  view === "dungeons" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:61:16", "data-dynamic-content": "true", className: "font-ui text-xs", style: { color: theme.accent + "99" }, "data-collection-item-field": "thCap", "data-collection-item-id": territory?.id || territory?._id, children: [
                    "TH up to ",
                    territory.thCap,
                    " · ",
                    territory.multiplier,
                    "× buildings · 💎 ",
                    territory.gemReward.toLocaleString(),
                    " gems on clear"
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 80,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 75,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 63,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/DungeonsModal:67:10", "data-dynamic-content": "true", onClick: onClose, className: "text-slate-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/DungeonsModal:68:12", "data-dynamic-content": "false", size: 20 }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 87,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 86,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 59,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:73:8", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto", children: view === "territories" ? /* @__PURE__ */ jsxDEV(TerritoryView, { "data-source-location": "components/game/DungeonsModal:75:12", "data-dynamic-content": "true", onSelect: handleSelectTerritory }, void 0, false, {
          fileName: "/app/src/components/game/DungeonsModal.jsx",
          lineNumber: 94,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDEV(
          DungeonListView,
          {
            "data-source-location": "components/game/DungeonsModal:77:12",
            "data-dynamic-content": "true",
            dungeons,
            territory,
            theme,
            selectedTerritory,
            onEnter: (dungeon, idx) => {
              const withLayout = getDungeonWithLayout(selectedTerritory, idx);
              onEnterDungeon({ ...withLayout || dungeon, territory: selectedTerritory + 1 });
            }
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 96,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/components/game/DungeonsModal.jsx",
          lineNumber: 92,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/DungeonsModal.jsx",
      lineNumber: 48,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/src/components/game/DungeonsModal.jsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}
_s(DungeonsModal, "3HjZhU4K2Dh/9gWwNyamY14PEV0=");
_c = DungeonsModal;
function TerritoryView({ onSelect }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:97:4", "data-dynamic-content": "true", className: "p-6 grid grid-cols-2 gap-4", children: TERRITORY_DEFS.map((t, idx) => {
    const theme = TERRITORY_THEMES[idx];
    return /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/DungeonsModal:101:10",
        "data-dynamic-content": "true",
        onClick: () => onSelect(idx),
        className: "relative rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] text-left",
        style: {
          border: `2px solid ${theme.border}`,
          boxShadow: `0 4px 20px ${theme.glow}`,
          minHeight: 200
        },
        "data-collection-item-id": t?.id,
        children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/DungeonsModal:112:12",
              "data-dynamic-content": "true",
              className: "absolute inset-0 bg-cover bg-center",
              style: { backgroundImage: `url(${t.bgImage})`, filter: "brightness(0.4) saturate(0.8)" }
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 131,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/DungeonsModal:117:12",
              "data-dynamic-content": "true",
              className: `absolute inset-0 bg-gradient-to-t ${theme.bg} opacity-70`
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 136,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/DungeonsModal:121:12",
              "data-dynamic-content": "true",
              className: "absolute top-0 left-0 right-0 h-1",
              style: { background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 140,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:126:12", "data-dynamic-content": "true", className: "relative p-4 flex flex-col h-full justify-between", style: { minHeight: 200 }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:127:14", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:128:16", "data-dynamic-content": "true", className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:129:18", "data-dynamic-content": "true", className: "text-2xl", "data-collection-item-field": "icon", "data-collection-item-id": t?.id, children: t.icon }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:130:18", "data-dynamic-content": "true", className: "font-pixel text-[9px]", style: { color: theme.accent }, "data-collection-item-field": "id", "data-collection-item-id": t?.id, children: [
                  "TERRITORY ",
                  t.id
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 149,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 147,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:134:16", "data-dynamic-content": "true", className: "font-pixel text-sm mb-1", style: { color: "#fff" }, "data-collection-item-field": "name", "data-collection-item-id": t?.id, children: t.name }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 153,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:135:16", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-300", "data-collection-item-field": "description", "data-collection-item-id": t?.id, children: t.description }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 154,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 146,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:137:14", "data-dynamic-content": "true", className: "mt-3", children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:138:16", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:139:18", "data-dynamic-content": "true", className: "flex gap-3 text-xs font-ui text-slate-400", children: [
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:140:20", "data-dynamic-content": "true", children: [
                    "TH cap: ",
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:140:34", "data-dynamic-content": "true", style: { color: theme.accent }, "data-collection-item-field": "thCap", "data-collection-item-id": t?.id, children: t.thCap }, void 0, false, {
                      fileName: "/app/src/components/game/DungeonsModal.jsx",
                      lineNumber: 159,
                      columnNumber: 123
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 159,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:141:20", "data-dynamic-content": "true", children: [
                    "Dungeons: ",
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:141:36", "data-dynamic-content": "true", style: { color: theme.accent }, children: "10" }, void 0, false, {
                      fileName: "/app/src/components/game/DungeonsModal.jsx",
                      lineNumber: 160,
                      columnNumber: 125
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 160,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 158,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:143:18", "data-dynamic-content": "true", className: "flex items-center gap-1 font-pixel text-[8px]", style: { color: "#60a5fa" }, "data-collection-item-field": "gemReward", "data-collection-item-id": t?.id, children: [
                  "💎 ",
                  t.gemReward.toLocaleString()
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 162,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 157,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  "data-source-location": "components/game/DungeonsModal:148:16",
                  "data-dynamic-content": "true",
                  className: "mt-2 flex items-center justify-center gap-1 py-1.5 rounded",
                  style: { background: "rgba(0,0,0,0.5)", border: `1px solid ${theme.border}` },
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:152:18", "data-dynamic-content": "false", className: "text-sm", children: "🔥" }, void 0, false, {
                      fileName: "/app/src/components/game/DungeonsModal.jsx",
                      lineNumber: 171,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:153:18", "data-dynamic-content": "true", className: "font-pixel text-[8px]", style: { color: theme.accent }, children: "10 DUNGEONS" }, void 0, false, {
                      fileName: "/app/src/components/game/DungeonsModal.jsx",
                      lineNumber: 172,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 156,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 145,
            columnNumber: 13
          }, this)
        ]
      },
      t.id,
      true,
      {
        fileName: "/app/src/components/game/DungeonsModal.jsx",
        lineNumber: 120,
        columnNumber: 11
      },
      this
    );
  }) }, void 0, false, {
    fileName: "/app/src/components/game/DungeonsModal.jsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}
_c2 = TerritoryView;
function DungeonListView({ dungeons, territory, theme, selectedTerritory, onEnter }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:167:4", "data-dynamic-content": "true", className: "p-4", children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/DungeonsModal:169:6",
        "data-dynamic-content": "true",
        className: "mb-4 px-4 py-2 rounded-lg flex items-center gap-3",
        style: { background: "rgba(0,0,0,0.4)", border: `1px solid ${theme.border}` },
        children: [
          /* @__PURE__ */ jsxDEV(Trophy, { "data-source-location": "components/game/DungeonsModal:173:8", "data-dynamic-content": "true", size: 16, style: { color: theme.accent } }, void 0, false, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 192,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:174:8", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-300", children: [
            "Clear all 10 dungeons to earn",
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:176:10", "data-dynamic-content": "true", className: "font-pixel text-[9px] mx-2", style: { color: "#60a5fa" }, "data-collection-item-field": "gemReward", "data-collection-item-id": territory?.id || territory?._id, children: [
              "💎 ",
              territory.gemReward.toLocaleString(),
              " gems"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 195,
              columnNumber: 11
            }, this),
            "territory reward"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 193,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/DungeonsModal.jsx",
        lineNumber: 188,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:183:6", "data-dynamic-content": "true", className: "grid grid-cols-2 gap-3", "data-collection-id": "dungeons", children: dungeons.map(
      (dungeon, idx) => /* @__PURE__ */ jsxDEV(
        DungeonCard,
        {
          "data-source-location": "components/game/DungeonsModal:185:10",
          "data-dynamic-content": "true",
          dungeon,
          index: idx,
          theme,
          hasCustomLayout: !!localStorage.getItem(`dungeon_layout_t${selectedTerritory}_d${idx}`),
          onEnter: () => onEnter(dungeon, idx)
        },
        idx,
        false,
        {
          fileName: "/app/src/components/game/DungeonsModal.jsx",
          lineNumber: 204,
          columnNumber: 9
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/app/src/components/game/DungeonsModal.jsx",
      lineNumber: 202,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/DungeonsModal.jsx",
    lineNumber: 186,
    columnNumber: 5
  }, this);
}
_c3 = DungeonListView;
function DungeonCard({ dungeon, index, theme, onEnter, hasCustomLayout }) {
  const isBoss = dungeon.boss;
  const cardAccent = isBoss ? "#dc2626" : theme.accent;
  const cardBorder = isBoss ? "#7f1d1d" : theme.border;
  const cardGlow = isBoss ? "rgba(220,38,38,0.25)" : theme.glow;
  const stars = index < 3 ? 1 : index < 6 ? 2 : 3;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "components/game/DungeonsModal:210:4",
      "data-dynamic-content": "true",
      className: "rounded-xl overflow-hidden transition-all hover:scale-[1.01]",
      style: {
        border: `2px solid ${cardBorder}`,
        boxShadow: `0 4px 16px ${cardGlow}`,
        background: isBoss ? "linear-gradient(135deg, #1a0505 0%, #0f0f0f 100%)" : "linear-gradient(135deg, #12121e 0%, #0a0a14 100%)",
        minHeight: 140
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/DungeonsModal:220:6",
            "data-dynamic-content": "true",
            className: "px-3 py-2 flex items-center justify-between",
            style: { borderBottom: `1px solid ${cardBorder}40`, background: "rgba(0,0,0,0.4)" },
            children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:224:8", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    "data-source-location": "components/game/DungeonsModal:225:10",
                    "data-dynamic-content": "true",
                    className: "w-6 h-6 rounded-full flex items-center justify-center font-pixel text-[8px]",
                    style: { background: cardAccent + "22", border: `1px solid ${cardAccent}`, color: cardAccent },
                    children: index + 1
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 244,
                    columnNumber: 11
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:231:10", "data-dynamic-content": "true", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:232:12", "data-dynamic-content": "true", className: "font-pixel text-[8px]", style: { color: cardAccent }, children: [
                    isBoss && /* @__PURE__ */ jsxDEV(Skull, { "data-source-location": "components/game/DungeonsModal:233:25", "data-dynamic-content": "false", size: 8, className: "inline mr-1" }, void 0, false, {
                      fileName: "/app/src/components/game/DungeonsModal.jsx",
                      lineNumber: 252,
                      columnNumber: 26
                    }, this),
                    "DUNGEON ",
                    index + 1
                  ] }, void 0, true, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 251,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:236:12", "data-dynamic-content": "true", className: "font-ui text-xs text-white leading-tight", "data-collection-item-field": "name", "data-collection-item-id": dungeon?.id || dungeon?._id, children: dungeon.name }, void 0, false, {
                    fileName: "/app/src/components/game/DungeonsModal.jsx",
                    lineNumber: 255,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 250,
                  columnNumber: 11
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 243,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:240:8", "data-dynamic-content": "true", className: "flex gap-0.5", children: isBoss ? /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:242:12", "data-dynamic-content": "false", className: "text-red-500 text-sm", children: "💀" }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 261,
                columnNumber: 11
              }, this) : [...Array(3)].map(
                (_, i) => /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:245:14", "data-dynamic-content": "true", className: "text-[10px]", style: { color: i < stars ? cardAccent : "#333" }, "data-arr-index": i, children: "★" }, i, false, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 264,
                  columnNumber: 11
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/components/game/DungeonsModal.jsx",
                lineNumber: 259,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 239,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:252:6", "data-dynamic-content": "true", className: "px-3 pt-2 pb-1", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:253:8", "data-dynamic-content": "true", className: "font-ui text-[11px] text-slate-400 mb-1", "data-collection-item-field": "desc", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
            dungeon.desc,
            hasCustomLayout && /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:253:99", "data-dynamic-content": "false", className: "ml-1 text-yellow-500 text-[9px]", children: "✏️ custom" }, void 0, false, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 272,
              columnNumber: 275
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 272,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:254:8", "data-dynamic-content": "true", className: "flex items-center gap-2 text-[10px] font-ui text-slate-500", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:255:10", "data-dynamic-content": "true", "data-collection-item-field": "thLevel", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "🏰 TH ",
              dungeon.thLevel
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 274,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:256:10", "data-dynamic-content": "true", "data-collection-item-field": "enemies", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "👹 ",
              dungeon.enemies,
              " enemies"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 275,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 273,
            columnNumber: 9
          }, this),
          isBoss && dungeon.bossName && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:259:10", "data-dynamic-content": "true", className: "flex items-center gap-1 mt-1 text-[10px] font-ui text-red-400", children: [
            /* @__PURE__ */ jsxDEV(Skull, { "data-source-location": "components/game/DungeonsModal:260:12", "data-dynamic-content": "false", size: 9 }, void 0, false, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 279,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:261:12", "data-dynamic-content": "true", "data-collection-item-field": "bossName", "data-collection-item-id": dungeon?.id || dungeon?._id, children: dungeon.bossName }, void 0, false, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 280,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:262:12", "data-dynamic-content": "true", className: "text-slate-500", "data-collection-item-field": "bossHp", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "— ",
              dungeon.bossHp.toLocaleString(),
              " HP · ",
              dungeon.bossPhases,
              " phases"
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 281,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 278,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonsModal.jsx",
          lineNumber: 271,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:268:6", "data-dynamic-content": "true", className: "px-3 pb-2 flex items-center justify-between mt-1", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/DungeonsModal:269:8", "data-dynamic-content": "true", className: "flex gap-2 text-[10px] font-ui", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:270:10", "data-dynamic-content": "true", className: "text-yellow-400", "data-collection-item-field": "goldRew", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "💰 ",
              dungeon.goldRew.toLocaleString()
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 289,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:271:10", "data-dynamic-content": "true", className: "text-blue-400", "data-collection-item-field": "manaRew", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "🔷 ",
              dungeon.manaRew.toLocaleString()
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 290,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/DungeonsModal:272:10", "data-dynamic-content": "true", className: "text-purple-400", "data-collection-item-field": "shardRew", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
              "💜 ",
              dungeon.shardRew
            ] }, void 0, true, {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 291,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/DungeonsModal.jsx",
            lineNumber: 288,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/DungeonsModal:274:8",
              "data-dynamic-content": "true",
              onClick: onEnter,
              className: "flex items-center gap-1 px-3 py-1 rounded font-pixel text-[7px] transition-all hover:scale-105 active:scale-95",
              style: {
                background: isBoss ? "linear-gradient(180deg, #dc2626 0%, #991b1b 100%)" : `linear-gradient(180deg, ${cardAccent} 0%, ${cardBorder} 100%)`,
                border: `1px solid ${cardAccent}`,
                color: isBoss ? "#fff" : "#000",
                boxShadow: `0 2px 8px ${cardGlow}`
              },
              children: [
                /* @__PURE__ */ jsxDEV(Swords, { "data-source-location": "components/game/DungeonsModal:286:10", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                  fileName: "/app/src/components/game/DungeonsModal.jsx",
                  lineNumber: 305,
                  columnNumber: 11
                }, this),
                "ENTER"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/src/components/game/DungeonsModal.jsx",
              lineNumber: 293,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/DungeonsModal.jsx",
          lineNumber: 287,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/DungeonsModal.jsx",
      lineNumber: 229,
      columnNumber: 5
    },
    this
  );
}
_c4 = DungeonCard;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "DungeonsModal");
$RefreshReg$(_c2, "TerritoryView");
$RefreshReg$(_c3, "DungeonListView");
$RefreshReg$(_c4, "DungeonCard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/DungeonsModal.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/DungeonsModal.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBa0RnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFsRGhCLE9BQU9BLFNBQVNDLGdCQUFnQjtBQUNoQyxTQUFTQyxHQUFHQyxhQUFhQyxPQUFPQyxRQUFRQyxjQUFjO0FBQ3RELFNBQVNDLGdCQUFnQkMsb0JBQW9CQyw0QkFBNEI7QUFFekUsTUFBTUMsbUJBQW1CO0FBQUEsRUFDekIsRUFBRUMsSUFBSSwrQkFBK0JDLFFBQVEsV0FBV0MsUUFBUSxXQUFXQyxNQUFNLHdCQUF3QjtBQUFBLEVBQ3pHLEVBQUVILElBQUksOEJBQThCQyxRQUFRLFdBQVdDLFFBQVEsV0FBV0MsTUFBTSxzQkFBc0I7QUFBQSxFQUN0RyxFQUFFSCxJQUFJLDZCQUE2QkMsUUFBUSxXQUFXQyxRQUFRLFdBQVdDLE1BQU0sc0JBQXNCO0FBQUEsRUFDckcsRUFBRUgsSUFBSSxpQ0FBaUNDLFFBQVEsV0FBV0MsUUFBUSxXQUFXQyxNQUFNLHVCQUF1QjtBQUFDO0FBRzNHLHdCQUF3QkMsY0FBYyxFQUFFQyxZQUFZQyxRQUFRQyxRQUFRQyxnQkFBZ0JDLFNBQVMsMkJBQTJCQyx1QkFBdUIsR0FBRztBQUFBQyxLQUFBO0FBQ2hKLFFBQU0sQ0FBQ0MsbUJBQW1CQyxvQkFBb0IsSUFBSXZCLFNBQVMsQ0FBQztBQUM1RCxRQUFNLENBQUN3QixNQUFNQyxPQUFPLElBQUl6QixTQUFTLGFBQWE7QUFFOUMsUUFBTTBCLFlBQVlwQixlQUFlZ0IsaUJBQWlCO0FBQ2xELFFBQU1LLFFBQVFsQixpQkFBaUJhLGlCQUFpQjtBQUNoRCxRQUFNTSxXQUFXckIsbUJBQW1CZSxpQkFBaUI7QUFFckQsUUFBTU8sd0JBQXdCQSxDQUFDQyxRQUFRO0FBQ3JDUCx5QkFBcUJPLEdBQUc7QUFDeEJMLFlBQVEsVUFBVTtBQUFBLEVBQ3BCO0FBRUEsUUFBTU0sYUFBYUEsTUFBTU4sUUFBUSxhQUFhO0FBRTlDLFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsc0NBQXFDLHdCQUFxQixRQUFPLFdBQVUsbUVBQWtFLDJCQUF5Qkwsd0JBQzlMO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFBSSx3QkFBcUI7QUFBQSxNQUFxQyx3QkFBcUI7QUFBQSxNQUNwRixXQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsUUFDTFksT0FBTztBQUFBLFFBQ1BDLFdBQVc7QUFBQSxRQUNYQyxZQUFZO0FBQUEsUUFDWnRCLFFBQVEsYUFBYWUsTUFBTWYsTUFBTTtBQUFBLFFBQ2pDdUIsV0FBVyxZQUFZUixNQUFNZCxJQUFJO0FBQUEsTUFDbkM7QUFBQSxNQUdFO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFJLHdCQUFxQjtBQUFBLFlBQXFDLHdCQUFxQjtBQUFBLFlBQ3BGLFdBQVU7QUFBQSxZQUNWLE9BQU8sRUFBRXVCLGFBQWFULE1BQU1mLFFBQVFzQixZQUFZLGtCQUFrQjtBQUFBLFlBRWhFO0FBQUEscUNBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsMkJBQ25HVjtBQUFBQSx5QkFBUyxjQUNWO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUFPLHdCQUFxQjtBQUFBLG9CQUFzQyx3QkFBcUI7QUFBQSxvQkFDeEYsU0FBU087QUFBQUEsb0JBQ1QsV0FBVTtBQUFBLG9CQUNWLE9BQU8sRUFBRU0sT0FBT1YsTUFBTWhCLE9BQU87QUFBQSxvQkFFekI7QUFBQSw2Q0FBQyxlQUFZLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFNBQVEsTUFBTSxNQUEzRztBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUE4RztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUxsSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBT0U7QUFBQSxnQkFFRix1QkFBQyxVQUFLLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFNBQVEsV0FBVSxXQUFVLGtCQUFsSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFvSDtBQUFBLGdCQUNwSCx1QkFBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQ25GO0FBQUEseUNBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsMEJBQXlCLE9BQU8sRUFBRTBCLE9BQU9WLE1BQU1oQixPQUFPLEdBQ3pKYSxtQkFBUyxnQkFBZ0IsYUFBYSxHQUFHRSxVQUFVWSxLQUFLQyxZQUFZLENBQUMsZ0JBQWdCakIsb0JBQW9CLENBQUMsTUFEN0c7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFQTtBQUFBLGtCQUNDRSxTQUFTLGNBQ1YsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsbUJBQWtCLE9BQU8sRUFBRWEsT0FBT1YsTUFBTWhCLFNBQVMsS0FBSyxHQUFHLDhCQUEyQixTQUFRLDJCQUF5QmUsV0FBV2MsTUFBTWQsV0FBV2UsS0FBSTtBQUFBO0FBQUEsb0JBQzdPZixVQUFVZ0I7QUFBQUEsb0JBQU07QUFBQSxvQkFBSWhCLFVBQVVpQjtBQUFBQSxvQkFBVztBQUFBLG9CQUFrQmpCLFVBQVVrQixVQUFVQyxlQUFlO0FBQUEsb0JBQUU7QUFBQSx1QkFEOUc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFRTtBQUFBLHFCQVBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBU0E7QUFBQSxtQkFyQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFzQkE7QUFBQSxjQUNBLHVCQUFDLFlBQU8sd0JBQXFCLHVDQUFzQyx3QkFBcUIsUUFBTyxTQUFTMUIsU0FBUyxXQUFVLHFEQUN6SCxpQ0FBQyxLQUFFLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFNBQVEsTUFBTSxNQUFqRztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvRyxLQUR0RztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUE7QUFBQTtBQUFBLFVBN0JGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQThCQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSx3QkFBcUIsc0NBQXFDLHdCQUFxQixRQUFPLFdBQVUsMEJBQ2xHSyxtQkFBUyxnQkFDVix1QkFBQyxpQkFBYyx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFVBQVVLLHlCQUFoSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXNJLElBRXRJO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBZ0Isd0JBQXFCO0FBQUEsWUFBc0Msd0JBQXFCO0FBQUEsWUFDakc7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLFNBQVMsQ0FBQ2lCLFNBQVNoQixRQUFRO0FBQ3pCLG9CQUFNaUIsYUFBYXZDLHFCQUFxQmMsbUJBQW1CUSxHQUFHO0FBQzlEWiw2QkFBZSxFQUFFLEdBQUk2QixjQUFjRCxTQUFVcEIsV0FBV0osb0JBQW9CLEVBQUUsQ0FBQztBQUFBLFlBQ2pGO0FBQUE7QUFBQSxVQVJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVFFLEtBWko7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWVBO0FBQUE7QUFBQTtBQUFBLElBM0RGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTREQSxLQTdERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBOERBO0FBRUo7QUFFQUQsR0FsRndCUCxlQUFhO0FBQUEsS0FBYkE7QUFtRnhCLFNBQVNrQyxjQUFjLEVBQUVDLFNBQVMsR0FBRztBQUNuQyxTQUNFLHVCQUFDLFNBQUksd0JBQXFCLHNDQUFxQyx3QkFBcUIsUUFBTyxXQUFVLDhCQUNsRzNDLHlCQUFlNEMsSUFBSSxDQUFDQyxHQUFHckIsUUFBUTtBQUM5QixVQUFNSCxRQUFRbEIsaUJBQWlCcUIsR0FBRztBQUNsQyxXQUNFO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFBTyx3QkFBcUI7QUFBQSxRQUF1Qyx3QkFBcUI7QUFBQSxRQUV6RixTQUFTLE1BQU1tQixTQUFTbkIsR0FBRztBQUFBLFFBQzNCLFdBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxVQUNMbEIsUUFBUSxhQUFhZSxNQUFNZixNQUFNO0FBQUEsVUFDakN1QixXQUFXLGNBQWNSLE1BQU1kLElBQUk7QUFBQSxVQUNuQ3VDLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFBRywyQkFBeUJELEdBQUdYO0FBQUFBLFFBRzdCO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFJLHdCQUFxQjtBQUFBLGNBQXVDLHdCQUFxQjtBQUFBLGNBQ3RGLFdBQVU7QUFBQSxjQUNWLE9BQU8sRUFBRWEsaUJBQWlCLE9BQU9GLEVBQUVHLE9BQU8sS0FBS0MsUUFBUSxnQ0FBZ0M7QUFBQTtBQUFBLFlBRnZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUV5RjtBQUFBLFVBR3pGO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FBSSx3QkFBcUI7QUFBQSxjQUF1Qyx3QkFBcUI7QUFBQSxjQUN0RixXQUFXLHFDQUFxQzVCLE1BQU1qQixFQUFFO0FBQUE7QUFBQSxZQUR4RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFDc0U7QUFBQSxVQUd0RTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQUksd0JBQXFCO0FBQUEsY0FBdUMsd0JBQXFCO0FBQUEsY0FDdEYsV0FBVTtBQUFBLGNBQ1YsT0FBTyxFQUFFd0IsWUFBWSx1Q0FBdUNQLE1BQU1oQixNQUFNLGlCQUFpQjtBQUFBO0FBQUEsWUFGekY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBRTJGO0FBQUEsVUFHM0YsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUscURBQW9ELE9BQU8sRUFBRXlDLFdBQVcsSUFBSSxHQUNqTDtBQUFBLG1DQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSxxQ0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxnQ0FDckc7QUFBQSx1Q0FBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxZQUFXLDhCQUEyQixRQUFPLDJCQUF5QkQsR0FBR1gsSUFBS1csWUFBRUssUUFBeEw7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBNkw7QUFBQSxnQkFDN0wsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUseUJBQXdCLE9BQU8sRUFBRW5CLE9BQU9WLE1BQU1oQixPQUFPLEdBQUcsOEJBQTJCLE1BQUssMkJBQXlCd0MsR0FBR1gsSUFBRztBQUFBO0FBQUEsa0JBQ2pOVyxFQUFFWDtBQUFBQSxxQkFEZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFLQTtBQUFBLGNBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsMkJBQTBCLE9BQU8sRUFBRUgsT0FBTyxPQUFPLEdBQUcsOEJBQTJCLFFBQU8sMkJBQXlCYyxHQUFHWCxJQUFLVyxZQUFFYixRQUFoTztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFxTztBQUFBLGNBQ3JPLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLGtDQUFpQyw4QkFBMkIsZUFBYywyQkFBeUJhLEdBQUdYLElBQUtXLFlBQUVNLGVBQXBOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdPO0FBQUEsaUJBUmxPO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBU0E7QUFBQSxZQUNBLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLFFBQ3JHO0FBQUEscUNBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUscUNBQ3JHO0FBQUEsdUNBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsNkNBQ3JHO0FBQUEseUNBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPO0FBQUE7QUFBQSxvQkFBUSx1QkFBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sT0FBTyxFQUFFcEIsT0FBT1YsTUFBTWhCLE9BQU8sR0FBRyw4QkFBMkIsU0FBUSwyQkFBeUJ3QyxHQUFHWCxJQUFLVyxZQUFFVCxTQUFwTTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUEwTTtBQUFBLHVCQUFoVDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUF1VDtBQUFBLGtCQUN2VCx1QkFBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU87QUFBQTtBQUFBLG9CQUFVLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxPQUFPLEVBQUVMLE9BQU9WLE1BQU1oQixPQUFPLEdBQUcsa0JBQTlIO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQWdJO0FBQUEsdUJBQXhPO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQStPO0FBQUEscUJBRmpQO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBR0E7QUFBQSxnQkFDQSx1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxpREFBZ0QsT0FBTyxFQUFFMEIsT0FBTyxVQUFVLEdBQUcsOEJBQTJCLGFBQVksMkJBQXlCYyxHQUFHWCxJQUFHO0FBQUE7QUFBQSxrQkFDcFBXLEVBQUVQLFVBQVVDLGVBQWU7QUFBQSxxQkFEakM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLG1CQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUUE7QUFBQSxjQUVBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUFJLHdCQUFxQjtBQUFBLGtCQUF1Qyx3QkFBcUI7QUFBQSxrQkFDdEYsV0FBVTtBQUFBLGtCQUNWLE9BQU8sRUFBRVgsWUFBWSxtQkFBbUJ0QixRQUFRLGFBQWFlLE1BQU1mLE1BQU0sR0FBRztBQUFBLGtCQUUxRTtBQUFBLDJDQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxXQUFVLFdBQVUsa0JBQW5IO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQXFIO0FBQUEsb0JBQ3JILHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLHlCQUF3QixPQUFPLEVBQUV5QixPQUFPVixNQUFNaEIsT0FBTyxHQUFHLDJCQUFoSztBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUEySztBQUFBO0FBQUE7QUFBQSxnQkFMN0s7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBTUE7QUFBQSxpQkFqQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFrQkE7QUFBQSxlQTdCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQThCQTtBQUFBO0FBQUE7QUFBQSxNQXRER3dDLEVBQUVYO0FBQUFBLE1BRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXdEQTtBQUFBLEVBRUosQ0FBQyxLQTlESDtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBK0RBO0FBRUo7QUFFQWtCLE1BckVTVjtBQXNFVCxTQUFTVyxnQkFBZ0IsRUFBRS9CLFVBQVVGLFdBQVdDLE9BQU9MLG1CQUFtQnNDLFFBQVEsR0FBRztBQUNuRixTQUNFLHVCQUFDLFNBQUksd0JBQXFCLHVDQUFzQyx3QkFBcUIsUUFBTyxXQUFVLE9BRXBHO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUFJLHdCQUFxQjtBQUFBLFFBQXNDLHdCQUFxQjtBQUFBLFFBQ3JGLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRTFCLFlBQVksbUJBQW1CdEIsUUFBUSxhQUFhZSxNQUFNZixNQUFNLEdBQUc7QUFBQSxRQUUxRTtBQUFBLGlDQUFDLFVBQU8sd0JBQXFCLHVDQUFzQyx3QkFBcUIsUUFBTyxNQUFNLElBQUksT0FBTyxFQUFFeUIsT0FBT1YsTUFBTWhCLE9BQU8sS0FBdEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBd0k7QUFBQSxVQUN4SSx1QkFBQyxVQUFLLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSxrQ0FBZ0M7QUFBQTtBQUFBLFlBRXJJLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLDhCQUE2QixPQUFPLEVBQUUwQixPQUFPLFVBQVUsR0FBRyw4QkFBMkIsYUFBWSwyQkFBeUJYLFdBQVdjLE1BQU1kLFdBQVdlLEtBQUk7QUFBQTtBQUFBLGNBQzVQZixVQUFVa0IsVUFBVUMsZUFBZTtBQUFBLGNBQUU7QUFBQSxpQkFEM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQU07QUFBQSxlQUpSO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTUE7QUFBQTtBQUFBO0FBQUEsTUFYRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFZQTtBQUFBLElBRUEsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsMEJBQXlCLHNCQUFtQixZQUMvSWpCLG1CQUFTc0I7QUFBQUEsTUFBSSxDQUFDSixTQUFTaEIsUUFDeEI7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUFZLHdCQUFxQjtBQUFBLFVBQXVDLHdCQUFxQjtBQUFBLFVBRTlGO0FBQUEsVUFDQSxPQUFPQTtBQUFBQSxVQUNQO0FBQUEsVUFDQSxpQkFBaUIsQ0FBQyxDQUFDK0IsYUFBYUMsUUFBUSxtQkFBbUJ4QyxpQkFBaUIsS0FBS1EsR0FBRyxFQUFFO0FBQUEsVUFDdEYsU0FBUyxNQUFNOEIsUUFBUWQsU0FBU2hCLEdBQUc7QUFBQTtBQUFBLFFBTDlCQTtBQUFBQSxRQURMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNcUM7QUFBQSxJQUVyQyxLQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FXQTtBQUFBLE9BM0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E0QkE7QUFFSjtBQUVBaUMsTUFsQ1NKO0FBbUNULFNBQVNLLFlBQVksRUFBRWxCLFNBQVNtQixPQUFPdEMsT0FBT2lDLFNBQVNNLGdCQUFnQixHQUFHO0FBQ3hFLFFBQU1DLFNBQVNyQixRQUFRc0I7QUFDdkIsUUFBTUMsYUFBYUYsU0FBUyxZQUFZeEMsTUFBTWhCO0FBQzlDLFFBQU0yRCxhQUFhSCxTQUFTLFlBQVl4QyxNQUFNZjtBQUM5QyxRQUFNMkQsV0FBV0osU0FBUyx5QkFBeUJ4QyxNQUFNZDtBQUd6RCxRQUFNMkQsUUFBUVAsUUFBUSxJQUFJLElBQUlBLFFBQVEsSUFBSSxJQUFJO0FBRTlDLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUFJLHdCQUFxQjtBQUFBLE1BQXNDLHdCQUFxQjtBQUFBLE1BQ3JGLFdBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxRQUNMckQsUUFBUSxhQUFhMEQsVUFBVTtBQUFBLFFBQy9CbkMsV0FBVyxjQUFjb0MsUUFBUTtBQUFBLFFBQ2pDckMsWUFBWWlDLFNBQVMsc0RBQXNEO0FBQUEsUUFDM0VmLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFHRTtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBSSx3QkFBcUI7QUFBQSxZQUFzQyx3QkFBcUI7QUFBQSxZQUNyRixXQUFVO0FBQUEsWUFDVixPQUFPLEVBQUVxQixjQUFjLGFBQWFILFVBQVUsTUFBTXBDLFlBQVksa0JBQWtCO0FBQUEsWUFFaEY7QUFBQSxxQ0FBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSwyQkFDcEc7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFBSSx3QkFBcUI7QUFBQSxvQkFBdUMsd0JBQXFCO0FBQUEsb0JBQ3RGLFdBQVU7QUFBQSxvQkFDVixPQUFPLEVBQUVBLFlBQVltQyxhQUFhLE1BQU16RCxRQUFRLGFBQWF5RCxVQUFVLElBQUloQyxPQUFPZ0MsV0FBVztBQUFBLG9CQUUxRkosa0JBQVE7QUFBQTtBQUFBLGtCQUpYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFLQTtBQUFBLGdCQUNBLHVCQUFDLFNBQUksd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFDcEY7QUFBQSx5Q0FBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSx5QkFBd0IsT0FBTyxFQUFFNUIsT0FBT2dDLFdBQVcsR0FDdkpGO0FBQUFBLDhCQUFVLHVCQUFDLFNBQU0sd0JBQXFCLHdDQUF1Qyx3QkFBcUIsU0FBUSxNQUFNLEdBQUcsV0FBVSxpQkFBbkg7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBZ0k7QUFBQSxvQkFBRztBQUFBLG9CQUNySUYsUUFBUTtBQUFBLHVCQUZuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUdBO0FBQUEsa0JBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsNENBQTJDLDhCQUEyQixRQUFPLDJCQUF5Qm5CLFNBQVNOLE1BQU1NLFNBQVNMLEtBQU1LLGtCQUFRUixRQUFuUDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUF3UDtBQUFBLHFCQUwxUDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQU1BO0FBQUEsbUJBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFjQTtBQUFBLGNBRUEsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsZ0JBQ25HNkIsbUJBQ0QsdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLFdBQVUsd0JBQXVCLGtCQUFoSTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrSSxJQUVsSSxDQUFDLEdBQUdPLE1BQU0sQ0FBQyxDQUFDLEVBQUV4QjtBQUFBQSxnQkFBSSxDQUFDeUIsR0FBR0MsTUFDdEIsdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFlLFdBQVUsZUFBYyxPQUFPLEVBQUV2QyxPQUFPdUMsSUFBSUosUUFBUUgsYUFBYSxPQUFPLEdBQUcsa0JBQWdCTyxHQUFHLGlCQUFqR0EsR0FBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBcU07QUFBQSxjQUNyTSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUUE7QUFBQTtBQUFBO0FBQUEsVUE1QkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBNkJBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSxrQkFDcEc7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQix1Q0FBc0Msd0JBQXFCLFFBQU8sV0FBVSwyQ0FBMEMsOEJBQTJCLFFBQU8sMkJBQXlCOUIsU0FBU04sTUFBTU0sU0FBU0wsS0FBTUs7QUFBQUEsb0JBQVErQjtBQUFBQSxZQUFNWCxtQkFBbUIsdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixTQUFRLFdBQVUsbUNBQWtDLHlCQUEzSTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFvSjtBQUFBLGVBQTlaO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXNhO0FBQUEsVUFDdGEsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsOERBQ3BHO0FBQUEsbUNBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLDhCQUEyQixXQUFVLDJCQUF5QnBCLFNBQVNOLE1BQU1NLFNBQVNMLEtBQUs7QUFBQTtBQUFBLGNBQU9LLFFBQVFnQztBQUFBQSxpQkFBeE07QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ047QUFBQSxZQUNoTix1QkFBQyxVQUFLLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sOEJBQTJCLFdBQVUsMkJBQXlCaEMsU0FBU04sTUFBTU0sU0FBU0wsS0FBSztBQUFBO0FBQUEsY0FBSUssUUFBUWlDO0FBQUFBLGNBQVE7QUFBQSxpQkFBN007QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBcU47QUFBQSxlQUZ2TjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQ1osVUFBVXJCLFFBQVFrQyxZQUNuQix1QkFBQyxTQUFJLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFFBQU8sV0FBVSxpRUFDbkc7QUFBQSxtQ0FBQyxTQUFNLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxLQUF0RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF3RztBQUFBLFlBQ3hHLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyw4QkFBMkIsWUFBVywyQkFBeUJsQyxTQUFTTixNQUFNTSxTQUFTTCxLQUFNSyxrQkFBUWtDLFlBQW5NO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRNO0FBQUEsWUFDNU0sdUJBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsa0JBQWlCLDhCQUEyQixVQUFTLDJCQUF5QmxDLFNBQVNOLE1BQU1NLFNBQVNMLEtBQUs7QUFBQTtBQUFBLGNBQUdLLFFBQVFtQyxPQUFPcEMsZUFBZTtBQUFBLGNBQUU7QUFBQSxjQUFPQyxRQUFRb0M7QUFBQUEsY0FBVztBQUFBLGlCQUFoUjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1UjtBQUFBLGVBSDNSO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSUU7QUFBQSxhQVhKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFhQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsb0RBQ3BHO0FBQUEsaUNBQUMsU0FBSSx3QkFBcUIsdUNBQXNDLHdCQUFxQixRQUFPLFdBQVUsa0NBQ3BHO0FBQUEsbUNBQUMsVUFBSyx3QkFBcUIsd0NBQXVDLHdCQUFxQixRQUFPLFdBQVUsbUJBQWtCLDhCQUEyQixXQUFVLDJCQUF5QnBDLFNBQVNOLE1BQU1NLFNBQVNMLEtBQUs7QUFBQTtBQUFBLGNBQUlLLFFBQVFxQyxRQUFRdEMsZUFBZTtBQUFBLGlCQUF4UDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwUDtBQUFBLFlBQzFQLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLGlCQUFnQiw4QkFBMkIsV0FBVSwyQkFBeUJDLFNBQVNOLE1BQU1NLFNBQVNMLEtBQUs7QUFBQTtBQUFBLGNBQUlLLFFBQVFzQyxRQUFRdkMsZUFBZTtBQUFBLGlCQUF0UDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF3UDtBQUFBLFlBQ3hQLHVCQUFDLFVBQUssd0JBQXFCLHdDQUF1Qyx3QkFBcUIsUUFBTyxXQUFVLG1CQUFrQiw4QkFBMkIsWUFBVywyQkFBeUJDLFNBQVNOLE1BQU1NLFNBQVNMLEtBQUs7QUFBQTtBQUFBLGNBQUlLLFFBQVF1QztBQUFBQSxpQkFBbE87QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBMk87QUFBQSxlQUg3TztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUlBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQU8sd0JBQXFCO0FBQUEsY0FBc0Msd0JBQXFCO0FBQUEsY0FDeEYsU0FBU3pCO0FBQUFBLGNBQ1QsV0FBVTtBQUFBLGNBQ1YsT0FBTztBQUFBLGdCQUNMMUIsWUFBWWlDLFNBQ1osc0RBQ0EsMkJBQTJCRSxVQUFVLFFBQVFDLFVBQVU7QUFBQSxnQkFDdkQxRCxRQUFRLGFBQWF5RCxVQUFVO0FBQUEsZ0JBQy9CaEMsT0FBTzhCLFNBQVMsU0FBUztBQUFBLGdCQUN6QmhDLFdBQVcsYUFBYW9DLFFBQVE7QUFBQSxjQUNsQztBQUFBLGNBRUU7QUFBQSx1Q0FBQyxVQUFPLHdCQUFxQix3Q0FBdUMsd0JBQXFCLFNBQVEsTUFBTSxNQUF2RztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEwRztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBWjVHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWNBO0FBQUEsYUFwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXFCQTtBQUFBO0FBQUE7QUFBQSxJQS9FRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFnRkE7QUFFSjtBQUFDZSxNQTVGUXRCO0FBQVcsSUFBQXVCLElBQUE3QixLQUFBSyxLQUFBdUI7QUFBQSxhQUFBQyxJQUFBO0FBQUEsYUFBQTdCLEtBQUE7QUFBQSxhQUFBSyxLQUFBO0FBQUEsYUFBQXVCLEtBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiWCIsIkNoZXZyb25MZWZ0IiwiU2t1bGwiLCJTd29yZHMiLCJUcm9waHkiLCJURVJSSVRPUllfREVGUyIsIlRFUlJJVE9SWV9EVU5HRU9OUyIsImdldER1bmdlb25XaXRoTGF5b3V0IiwiVEVSUklUT1JZX1RIRU1FUyIsImJnIiwiYWNjZW50IiwiYm9yZGVyIiwiZ2xvdyIsIkR1bmdlb25zTW9kYWwiLCJwbGF5ZXJCYXNlIiwiaGVyb2VzIiwidHJvb3BzIiwib25FbnRlckR1bmdlb24iLCJvbkNsb3NlIiwiX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCIsIl9zIiwic2VsZWN0ZWRUZXJyaXRvcnkiLCJzZXRTZWxlY3RlZFRlcnJpdG9yeSIsInZpZXciLCJzZXRWaWV3IiwidGVycml0b3J5IiwidGhlbWUiLCJkdW5nZW9ucyIsImhhbmRsZVNlbGVjdFRlcnJpdG9yeSIsImlkeCIsImhhbmRsZUJhY2siLCJ3aWR0aCIsIm1heEhlaWdodCIsImJhY2tncm91bmQiLCJib3hTaGFkb3ciLCJib3JkZXJDb2xvciIsImNvbG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiaWQiLCJfaWQiLCJ0aENhcCIsIm11bHRpcGxpZXIiLCJnZW1SZXdhcmQiLCJ0b0xvY2FsZVN0cmluZyIsImR1bmdlb24iLCJ3aXRoTGF5b3V0IiwiVGVycml0b3J5VmlldyIsIm9uU2VsZWN0IiwibWFwIiwidCIsIm1pbkhlaWdodCIsImJhY2tncm91bmRJbWFnZSIsImJnSW1hZ2UiLCJmaWx0ZXIiLCJpY29uIiwiZGVzY3JpcHRpb24iLCJfYzIiLCJEdW5nZW9uTGlzdFZpZXciLCJvbkVudGVyIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIl9jMyIsIkR1bmdlb25DYXJkIiwiaW5kZXgiLCJoYXNDdXN0b21MYXlvdXQiLCJpc0Jvc3MiLCJib3NzIiwiY2FyZEFjY2VudCIsImNhcmRCb3JkZXIiLCJjYXJkR2xvdyIsInN0YXJzIiwiYm9yZGVyQm90dG9tIiwiQXJyYXkiLCJfIiwiaSIsImRlc2MiLCJ0aExldmVsIiwiZW5lbWllcyIsImJvc3NOYW1lIiwiYm9zc0hwIiwiYm9zc1BoYXNlcyIsImdvbGRSZXciLCJtYW5hUmV3Iiwic2hhcmRSZXciLCJfYzQiLCJfYyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEdW5nZW9uc01vZGFsLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFgsIENoZXZyb25MZWZ0LCBTa3VsbCwgU3dvcmRzLCBUcm9waHkgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBURVJSSVRPUllfREVGUywgVEVSUklUT1JZX0RVTkdFT05TLCBnZXREdW5nZW9uV2l0aExheW91dCB9IGZyb20gXCJAL2xpYi9kdW5nZW9uRGF0YVwiO1xuXG5jb25zdCBURVJSSVRPUllfVEhFTUVTID0gW1xueyBiZzogXCJmcm9tLXN0b25lLTkwMCB0by1zdG9uZS04MDBcIiwgYWNjZW50OiBcIiNjOGE5NmVcIiwgYm9yZGVyOiBcIiM3YTVjMmVcIiwgZ2xvdzogXCJyZ2JhKDIwMCwxNjksMTEwLDAuMylcIiB9LFxueyBiZzogXCJmcm9tLXJlZC05NTAgdG8tb3JhbmdlLTk1MFwiLCBhY2NlbnQ6IFwiI2VmNDQ0NFwiLCBib3JkZXI6IFwiIzdmMWQxZFwiLCBnbG93OiBcInJnYmEoMjM5LDY4LDY4LDAuMylcIiB9LFxueyBiZzogXCJmcm9tLWJsdWUtOTUwIHRvLWN5YW4tOTUwXCIsIGFjY2VudDogXCIjMDZiNmQ0XCIsIGJvcmRlcjogXCIjMTY0ZTYzXCIsIGdsb3c6IFwicmdiYSg2LDE4MiwyMTIsMC4zKVwiIH0sXG57IGJnOiBcImZyb20tcHVycGxlLTk1MCB0by12aW9sZXQtOTUwXCIsIGFjY2VudDogXCIjYTg1NWY3XCIsIGJvcmRlcjogXCIjNGMxZDk1XCIsIGdsb3c6IFwicmdiYSgxNjgsODUsMjQ3LDAuMylcIiB9XTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEdW5nZW9uc01vZGFsKHsgcGxheWVyQmFzZSwgaGVyb2VzLCB0cm9vcHMsIG9uRW50ZXJEdW5nZW9uLCBvbkNsb3NlLCBcImRhdGEtY29sbGVjdGlvbi1pdGVtLWlkXCI6IF9fZGF0YUNvbGxlY3Rpb25JdGVtSWQgfSkge1xuICBjb25zdCBbc2VsZWN0ZWRUZXJyaXRvcnksIHNldFNlbGVjdGVkVGVycml0b3J5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdmlldywgc2V0Vmlld10gPSB1c2VTdGF0ZShcInRlcnJpdG9yaWVzXCIpOyAvLyBcInRlcnJpdG9yaWVzXCIgfCBcImR1bmdlb25zXCJcblxuICBjb25zdCB0ZXJyaXRvcnkgPSBURVJSSVRPUllfREVGU1tzZWxlY3RlZFRlcnJpdG9yeV07XG4gIGNvbnN0IHRoZW1lID0gVEVSUklUT1JZX1RIRU1FU1tzZWxlY3RlZFRlcnJpdG9yeV07XG4gIGNvbnN0IGR1bmdlb25zID0gVEVSUklUT1JZX0RVTkdFT05TW3NlbGVjdGVkVGVycml0b3J5XTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RUZXJyaXRvcnkgPSAoaWR4KSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUZXJyaXRvcnkoaWR4KTtcbiAgICBzZXRWaWV3KFwiZHVuZ2VvbnNcIik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQmFjayA9ICgpID0+IHNldFZpZXcoXCJ0ZXJyaXRvcmllc1wiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyODo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogNzgwLFxuICAgICAgICBtYXhIZWlnaHQ6IFwiOTB2aFwiLFxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiMwZjBmMWFcIixcbiAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgIGJveFNoYWRvdzogYDAgMCA0MHB4ICR7dGhlbWUuZ2xvd30sIDAgMjBweCA2MHB4IHJnYmEoMCwwLDAsMC44KWBcbiAgICAgIH19PlxuICAgICAgICBcbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjQwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNSBweS0zIGJvcmRlci1iXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IHRoZW1lLmJvcmRlciwgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNSlcIiB9fT5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6NDQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAge3ZpZXcgPT09IFwiZHVuZ2VvbnNcIiAmJlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjQ2OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUJhY2t9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXhzIGZvbnQtcGl4ZWwgdHJhbnNpdGlvbi1vcGFjaXR5IGhvdmVyOm9wYWNpdHktNzBcIlxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHRoZW1lLmFjY2VudCB9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPENoZXZyb25MZWZ0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6NTE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTR9IC8+XG4gICAgICAgICAgICAgICAgQkFDS1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6NTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bFwiPuKalO+4jzwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDo1NjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6NTc6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzEwcHhdXCIgc3R5bGU9e3sgY29sb3I6IHRoZW1lLmFjY2VudCB9fT5cbiAgICAgICAgICAgICAgICB7dmlldyA9PT0gXCJ0ZXJyaXRvcmllc1wiID8gXCJEVU5HRU9OU1wiIDogYCR7dGVycml0b3J5Lm5hbWUudG9VcHBlckNhc2UoKX0g4oCUIFRFUlJJVE9SWSAke3NlbGVjdGVkVGVycml0b3J5ICsgMX1gfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3ZpZXcgPT09IFwiZHVuZ2VvbnNcIiAmJlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6NjE6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHNcIiBzdHlsZT17eyBjb2xvcjogdGhlbWUuYWNjZW50ICsgXCI5OVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGhDYXBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dGVycml0b3J5Py5pZCB8fCB0ZXJyaXRvcnk/Ll9pZH0+XG4gICAgICAgICAgICAgICAgICBUSCB1cCB0byB7dGVycml0b3J5LnRoQ2FwfSDCtyB7dGVycml0b3J5Lm11bHRpcGxpZXJ9w5cgYnVpbGRpbmdzIMK3IPCfko4ge3RlcnJpdG9yeS5nZW1SZXdhcmQudG9Mb2NhbGVTdHJpbmcoKX0gZ2VtcyBvbiBjbGVhclxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6Njc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICA8WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjY4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezIwfSAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjczOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAge3ZpZXcgPT09IFwidGVycml0b3JpZXNcIiA/XG4gICAgICAgICAgPFRlcnJpdG9yeVZpZXcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDo3NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3RUZXJyaXRvcnl9IC8+IDpcblxuICAgICAgICAgIDxEdW5nZW9uTGlzdFZpZXcgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDo3NzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgZHVuZ2VvbnM9e2R1bmdlb25zfVxuICAgICAgICAgIHRlcnJpdG9yeT17dGVycml0b3J5fVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICBzZWxlY3RlZFRlcnJpdG9yeT17c2VsZWN0ZWRUZXJyaXRvcnl9XG4gICAgICAgICAgb25FbnRlcj17KGR1bmdlb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2l0aExheW91dCA9IGdldER1bmdlb25XaXRoTGF5b3V0KHNlbGVjdGVkVGVycml0b3J5LCBpZHgpO1xuICAgICAgICAgICAgb25FbnRlckR1bmdlb24oeyAuLi4od2l0aExheW91dCB8fCBkdW5nZW9uKSwgdGVycml0b3J5OiBzZWxlY3RlZFRlcnJpdG9yeSArIDEgfSk7XG4gICAgICAgICAgfX0gLz5cblxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59XG5cbi8vIOKUgOKUgCBUZXJyaXRvcnkgU2VsZWN0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZnVuY3Rpb24gVGVycml0b3J5Vmlldyh7IG9uU2VsZWN0IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6OTc6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInAtNiBncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICB7VEVSUklUT1JZX0RFRlMubWFwKCh0LCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgdGhlbWUgPSBURVJSSVRPUllfVEhFTUVTW2lkeF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjEwMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0KGlkeCl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gdHJhbnNpdGlvbi1hbGwgaG92ZXI6c2NhbGUtWzEuMDJdIGFjdGl2ZTpzY2FsZS1bMC45OF0gdGV4dC1sZWZ0XCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICBib3hTaGFkb3c6IGAwIDRweCAyMHB4ICR7dGhlbWUuZ2xvd31gLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiAyMDBcbiAgICAgICAgICB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWR9PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogQmFja2dyb3VuZCBpbWFnZSAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxMTI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7dC5iZ0ltYWdlfSlgLCBmaWx0ZXI6IFwiYnJpZ2h0bmVzcygwLjQpIHNhdHVyYXRlKDAuOClcIiB9fSAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogR3JhZGllbnQgb3ZlcmxheSAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxMTc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10ICR7dGhlbWUuYmd9IG9wYWNpdHktNzBgfSAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogR29sZCBhcmNoIGZyYW1lIHRvcCAqL31cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxMjE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC0xXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCAke3RoZW1lLmFjY2VudH0sIHRyYW5zcGFyZW50KWAgfX0gLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTI2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmUgcC00IGZsZXggZmxleC1jb2wgaC1mdWxsIGp1c3RpZnktYmV0d2VlblwiIHN0eWxlPXt7IG1pbkhlaWdodDogMjAwIH19PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTI3OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjEyODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTI5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImljb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWR9Pnt0Lmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjEzMDoxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XVwiIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS5hY2NlbnQgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJpZFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXt0Py5pZH0+XG4gICAgICAgICAgICAgICAgICAgIFRFUlJJVE9SWSB7dC5pZH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxMzQ6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtc20gbWItMVwiIHN0eWxlPXt7IGNvbG9yOiBcIiNmZmZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cIm5hbWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWR9Pnt0Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjEzNToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZGVzY3JpcHRpb25cIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dD8uaWR9Pnt0LmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjEzNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cIm10LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTM4OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTM5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMyB0ZXh0LXhzIGZvbnQtdWkgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxNDA6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5USCBjYXA6IDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTQwOjM0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3R5bGU9e3sgY29sb3I6IHRoZW1lLmFjY2VudCB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRoQ2FwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Q/LmlkfT57dC50aENhcH08L3NwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjE0MToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPkR1bmdlb25zOiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjE0MTozNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS5hY2NlbnQgfX0+MTA8L3NwYW4+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTQzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC1waXhlbCB0ZXh0LVs4cHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzYwYTVmYVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZ2VtUmV3YXJkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Q/LmlkfT5cbiAgICAgICAgICAgICAgICAgICAg8J+SjiB7dC5nZW1SZXdhcmQudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBCb3R0b20gZmxhbWUgKyBjb3VudCBiYXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjE0ODoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweS0xLjUgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNSlcIiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTUyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQtc21cIj7wn5SlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxNTM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBjb2xvcjogdGhlbWUuYWNjZW50IH19PjEwIERVTkdFT05TPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYnV0dG9uPik7XG5cbiAgICAgIH0pfVxuICAgIDwvZGl2Pik7XG5cbn1cblxuLy8g4pSA4pSAIER1bmdlb24gTGlzdCBWaWV3IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZnVuY3Rpb24gRHVuZ2Vvbkxpc3RWaWV3KHsgZHVuZ2VvbnMsIHRlcnJpdG9yeSwgdGhlbWUsIHNlbGVjdGVkVGVycml0b3J5LCBvbkVudGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTY3OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJwLTRcIj5cbiAgICAgIHsvKiBDb21wbGV0aW9uIHJld2FyZCBiYW5uZXIgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTY5OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgY2xhc3NOYW1lPVwibWItNCBweC00IHB5LTIgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40KVwiLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cbiAgICAgICAgXG4gICAgICAgIDxUcm9waHkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoxNzM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHNpemU9ezE2fSBzdHlsZT17eyBjb2xvcjogdGhlbWUuYWNjZW50IH19IC8+XG4gICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTc0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICBDbGVhciBhbGwgMTAgZHVuZ2VvbnMgdG8gZWFyblxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTc2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIG14LTJcIiBzdHlsZT17eyBjb2xvcjogXCIjNjBhNWZhXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJnZW1SZXdhcmRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17dGVycml0b3J5Py5pZCB8fCB0ZXJyaXRvcnk/Ll9pZH0+XG4gICAgICAgICAgICDwn5KOIHt0ZXJyaXRvcnkuZ2VtUmV3YXJkLnRvTG9jYWxlU3RyaW5nKCl9IGdlbXNcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgdGVycml0b3J5IHJld2FyZFxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjE4Mzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtM1wiIGRhdGEtY29sbGVjdGlvbi1pZD1cImR1bmdlb25zXCI+XG4gICAgICAgIHtkdW5nZW9ucy5tYXAoKGR1bmdlb24sIGlkeCkgPT5cbiAgICAgICAgPER1bmdlb25DYXJkIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MTg1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAga2V5PXtpZHh9XG4gICAgICAgIGR1bmdlb249e2R1bmdlb259XG4gICAgICAgIGluZGV4PXtpZHh9XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgaGFzQ3VzdG9tTGF5b3V0PXshIWxvY2FsU3RvcmFnZS5nZXRJdGVtKGBkdW5nZW9uX2xheW91dF90JHtzZWxlY3RlZFRlcnJpdG9yeX1fZCR7aWR4fWApfVxuICAgICAgICBvbkVudGVyPXsoKSA9PiBvbkVudGVyKGR1bmdlb24sIGlkeCl9IC8+XG5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn1cblxuLy8g4pSA4pSAIER1bmdlb24gQ2FyZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmZ1bmN0aW9uIER1bmdlb25DYXJkKHsgZHVuZ2VvbiwgaW5kZXgsIHRoZW1lLCBvbkVudGVyLCBoYXNDdXN0b21MYXlvdXQgfSkge1xuICBjb25zdCBpc0Jvc3MgPSBkdW5nZW9uLmJvc3M7XG4gIGNvbnN0IGNhcmRBY2NlbnQgPSBpc0Jvc3MgPyBcIiNkYzI2MjZcIiA6IHRoZW1lLmFjY2VudDtcbiAgY29uc3QgY2FyZEJvcmRlciA9IGlzQm9zcyA/IFwiIzdmMWQxZFwiIDogdGhlbWUuYm9yZGVyO1xuICBjb25zdCBjYXJkR2xvdyA9IGlzQm9zcyA/IFwicmdiYSgyMjAsMzgsMzgsMC4yNSlcIiA6IHRoZW1lLmdsb3c7XG5cbiAgLy8gRGlmZmljdWx0eSBzdGFycyAoMS0zLCBib3NzIGdldHMgc2t1bGwpXG4gIGNvbnN0IHN0YXJzID0gaW5kZXggPCAzID8gMSA6IGluZGV4IDwgNiA/IDIgOiAzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjIxMDo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS1bMS4wMV1cIlxuICAgIHN0eWxlPXt7XG4gICAgICBib3JkZXI6IGAycHggc29saWQgJHtjYXJkQm9yZGVyfWAsXG4gICAgICBib3hTaGFkb3c6IGAwIDRweCAxNnB4ICR7Y2FyZEdsb3d9YCxcbiAgICAgIGJhY2tncm91bmQ6IGlzQm9zcyA/IFwibGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzFhMDUwNSAwJSwgIzBmMGYwZiAxMDAlKVwiIDogXCJsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMTIxMjFlIDAlLCAjMGEwYTE0IDEwMCUpXCIsXG4gICAgICBtaW5IZWlnaHQ6IDE0MFxuICAgIH19PlxuICAgICAgXG4gICAgICB7LyogVG9wIGJhciB3aXRoIG51bWJlciArIG5hbWUgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MjIwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICBzdHlsZT17eyBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtjYXJkQm9yZGVyfTQwYCwgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNClcIiB9fT5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyMjQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjIyNToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1waXhlbCB0ZXh0LVs4cHhdXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBjYXJkQWNjZW50ICsgXCIyMlwiLCBib3JkZXI6IGAxcHggc29saWQgJHtjYXJkQWNjZW50fWAsIGNvbG9yOiBjYXJkQWNjZW50IH19PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7aW5kZXggKyAxfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyMzE6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyMzI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF1cIiBzdHlsZT17eyBjb2xvcjogY2FyZEFjY2VudCB9fT5cbiAgICAgICAgICAgICAge2lzQm9zcyAmJiA8U2t1bGwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyMzM6MjVcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17OH0gY2xhc3NOYW1lPVwiaW5saW5lIG1yLTFcIiAvPn1cbiAgICAgICAgICAgICAgRFVOR0VPTiB7aW5kZXggKyAxfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MjM2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtd2hpdGUgbGVhZGluZy10aWdodFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkdW5nZW9uPy5pZCB8fCBkdW5nZW9uPy5faWR9PntkdW5nZW9uLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogRGlmZmljdWx0eSAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI0MDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMC41XCI+XG4gICAgICAgICAge2lzQm9zcyA/XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwIHRleHQtc21cIj7wn5KAPC9zcGFuPiA6XG5cbiAgICAgICAgICBbLi4uQXJyYXkoMyldLm1hcCgoXywgaSkgPT5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI0NToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aX0gY2xhc3NOYW1lPVwidGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogaSA8IHN0YXJzID8gY2FyZEFjY2VudCA6IFwiIzMzM1wiIH19IGRhdGEtYXJyLWluZGV4PXtpfT7imIU8L3NwYW4+XG4gICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIERlc2MgKyBUSCAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNTI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInB4LTMgcHQtMiBwYi0xXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNTM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbWItMVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiZGVzY1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkdW5nZW9uPy5pZCB8fCBkdW5nZW9uPy5faWR9PntkdW5nZW9uLmRlc2N9e2hhc0N1c3RvbUxheW91dCAmJiA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI1Mzo5OVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJtbC0xIHRleHQteWVsbG93LTUwMCB0ZXh0LVs5cHhdXCI+4pyP77iPIGN1c3RvbTwvc3Bhbj59PC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNTQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtWzEwcHhdIGZvbnQtdWkgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI1NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGhMZXZlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkdW5nZW9uPy5pZCB8fCBkdW5nZW9uPy5faWR9PvCfj7AgVEgge2R1bmdlb24udGhMZXZlbH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNTY6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImVuZW1pZXNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZHVuZ2Vvbj8uaWQgfHwgZHVuZ2Vvbj8uX2lkfT7wn5G5IHtkdW5nZW9uLmVuZW1pZXN9IGVuZW1pZXM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXNCb3NzICYmIGR1bmdlb24uYm9zc05hbWUgJiZcbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI1OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIG10LTEgdGV4dC1bMTBweF0gZm9udC11aSB0ZXh0LXJlZC00MDBcIj5cbiAgICAgICAgICAgIDxTa3VsbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI2MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXs5fSAvPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNjE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImJvc3NOYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2R1bmdlb24/LmlkIHx8IGR1bmdlb24/Ll9pZH0+e2R1bmdlb24uYm9zc05hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNjI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiYm9zc0hwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2R1bmdlb24/LmlkIHx8IGR1bmdlb24/Ll9pZH0+4oCUIHtkdW5nZW9uLmJvc3NIcC50b0xvY2FsZVN0cmluZygpfSBIUCDCtyB7ZHVuZ2Vvbi5ib3NzUGhhc2VzfSBwaGFzZXM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUmV3YXJkcyArIEVudGVyICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI2ODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMyBwYi0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtdC0xXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNjk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgdGV4dC1bMTBweF0gZm9udC11aVwiPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MjcwOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctNDAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJnb2xkUmV3XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2R1bmdlb24/LmlkIHx8IGR1bmdlb24/Ll9pZH0+8J+SsCB7ZHVuZ2Vvbi5nb2xkUmV3LnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0R1bmdlb25zTW9kYWw6MjcxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibWFuYVJld1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtkdW5nZW9uPy5pZCB8fCBkdW5nZW9uPy5faWR9PvCflLcge2R1bmdlb24ubWFuYVJldy50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI3MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwic2hhcmRSZXdcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZHVuZ2Vvbj8uaWQgfHwgZHVuZ2Vvbj8uX2lkfT7wn5KcIHtkdW5nZW9uLnNoYXJkUmV3fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvRHVuZ2VvbnNNb2RhbDoyNzQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uRW50ZXJ9XG4gICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS0xMDUgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBpc0Jvc3MgP1xuICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2RjMjYyNiAwJSwgIzk5MWIxYiAxMDAlKVwiIDpcbiAgICAgICAgICBgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgJHtjYXJkQWNjZW50fSAwJSwgJHtjYXJkQm9yZGVyfSAxMDAlKWAsXG4gICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7Y2FyZEFjY2VudH1gLFxuICAgICAgICAgIGNvbG9yOiBpc0Jvc3MgPyBcIiNmZmZcIiA6IFwiIzAwMFwiLFxuICAgICAgICAgIGJveFNoYWRvdzogYDAgMnB4IDhweCAke2NhcmRHbG93fWBcbiAgICAgICAgfX0+XG4gICAgICAgICAgXG4gICAgICAgICAgPFN3b3JkcyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsOjI4NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMH0gLz5cbiAgICAgICAgICBFTlRFUlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsLmpzeCJ9