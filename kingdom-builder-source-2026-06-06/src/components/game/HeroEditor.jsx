import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/HeroEditor.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/HeroEditor.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { X, Trash2, Plus } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { getAllCustomHeroes, saveCustomHero, deleteCustomHero, createNewHero, DEFAULT_HERO_STATS } from "/src/lib/heroData.js";
import { getAllHeroSpritesForType } from "/src/lib/heroSprites.js";
const STAT_FIELDS = [
  { key: "hp", label: "Base HP", min: 1, max: 1e5, step: 10 },
  { key: "attack", label: "Attack", min: 1, max: 1e4, step: 5 },
  { key: "defense", label: "Defense", min: 0, max: 1e4, step: 5 },
  { key: "speed", label: "Move Speed", min: 1, max: 100, step: 1 },
  { key: "attack_speed", label: "Attack Speed", min: 0.1, max: 10, step: 0.1 },
  { key: "range", label: "Range", min: 1, max: 20, step: 1 },
  { key: "crit_chance", label: "Crit %", min: 0, max: 100, step: 1 },
  { key: "dodge_chance", label: "Dodge %", min: 0, max: 100, step: 1 },
  { key: "gem_cost", label: "Roll Cost (💎)", min: 1, max: 1e5, step: 10 }
];
const RARITIES = ["common", "uncommon", "rare", "epic", "legendary"];
const RARITY_COLORS = {
  common: "#9ca3af",
  uncommon: "#4ade80",
  rare: "#60a5fa",
  epic: "#c084fc",
  legendary: "#f59e0b"
};
export default function HeroEditor({ onClose }) {
  _s();
  const [heroes, setHeroes] = useState(() => getAllCustomHeroes());
  const [selectedId, setSelectedId] = useState(() => getAllCustomHeroes()[0]?.id || null);
  const [editData, setEditData] = useState(null);
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);
  const selectedHero = heroes.find((h) => h.id === selectedId) || null;
  useEffect(() => {
    if (selectedHero) setEditData({ ...selectedHero });
    else
      setEditData(null);
  }, [selectedId]);
  const handleFieldChange = (key, val) => {
    setEditData((prev) => {
      const updated = { ...prev, [key]: val };
      saveCustomHero(updated);
      setHeroes(getAllCustomHeroes());
      return updated;
    });
  };
  const handleDelete = (id) => {
    if (!confirm("Delete this hero?")) return;
    deleteCustomHero(id);
    const updated = getAllCustomHeroes();
    setHeroes(updated);
    if (selectedId === id) setSelectedId(updated[0]?.id || null);
  };
  const handleCreate = () => {
    if (!newName.trim()) return;
    const hero = createNewHero(newName.trim());
    saveCustomHero(hero);
    const updated = getAllCustomHeroes();
    setHeroes(updated);
    setSelectedId(hero.id);
    setNewName("");
    setShowNew(false);
  };
  const spritePreview = selectedId ? getAllHeroSpritesForType(selectedId)["S"] : null;
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:69:4", "data-dynamic-content": "true", className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/85", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:70:6", "data-dynamic-content": "true", className: "flex rounded-xl overflow-hidden shadow-2xl", style: { background: "#0f1a0f", border: "2px solid #166534", maxHeight: "95vh", maxWidth: "900px", width: "100%" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:72:8", "data-dynamic-content": "true", className: "flex flex-col border-r overflow-y-auto", style: { borderColor: "#1a3a1a", background: "#0a120a", width: 180 }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:73:10", "data-dynamic-content": "true", className: "px-3 pt-3 pb-1 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:74:12", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-500", children: "HEROES" }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroEditor:75:12", "data-dynamic-content": "true", onClick: () => setShowNew((v) => !v), className: "p-0.5 rounded hover:bg-green-900/30 text-green-500", children: /* @__PURE__ */ jsxDEV(Plus, { "data-source-location": "components/game/HeroEditor:75:119", "data-dynamic-content": "false", size: 12 }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 94,
          columnNumber: 206
        }, this) }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 92,
        columnNumber: 11
      }, this),
      showNew && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:78:12", "data-dynamic-content": "true", className: "px-2 pb-2 flex gap-1", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            "data-source-location": "components/game/HeroEditor:79:14",
            "data-dynamic-content": "true",
            autoFocus: true,
            value: newName,
            onChange: (e) => setNewName(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") setShowNew(false);
            },
            placeholder: "Name...",
            className: "flex-1 px-1 py-0.5 rounded text-[10px] font-ui outline-none",
            style: { background: "#1a2a1a", border: "1px solid #166534", color: "#4ade80" }
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 98,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroEditor:83:14", "data-dynamic-content": "true", onClick: handleCreate, className: "px-1.5 py-0.5 rounded text-[9px] font-pixel text-white", style: { background: "#166534" }, children: "+" }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 102,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 97,
        columnNumber: 11
      }, this),
      heroes.length === 0 && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:86:34", "data-dynamic-content": "false", className: "p-3 text-[10px] text-slate-500 text-center font-ui", children: "No heroes yet." }, void 0, false, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 105,
        columnNumber: 35
      }, this),
      heroes.map((h) => {
        const preview = getAllHeroSpritesForType(h.id)["S"];
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/HeroEditor:90:14",
            "data-dynamic-content": "true",
            onClick: () => setSelectedId(h.id),
            className: "group flex items-center gap-2 px-2 py-2 cursor-pointer transition-all",
            style: { background: selectedId === h.id ? "#1a2a1a" : "transparent" },
            "data-collection-item-id": h?.id,
            children: [
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  "data-source-location": "components/game/HeroEditor:93:16",
                  "data-dynamic-content": "true",
                  className: "w-8 h-8 rounded flex items-center justify-center flex-shrink-0",
                  style: { background: "#0d1a0d", border: `1px solid ${RARITY_COLORS[h.rarity] || "#333"}` },
                  children: preview ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/HeroEditor:95:29", "data-dynamic-content": "true", src: preview, style: { width: 28, height: 28, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
                    fileName: "/app/src/components/game/HeroEditor.jsx",
                    lineNumber: 114,
                    columnNumber: 30
                  }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:96:22", "data-dynamic-content": "true", style: { fontSize: 16 }, children: "🦸" }, void 0, false, {
                    fileName: "/app/src/components/game/HeroEditor.jsx",
                    lineNumber: 115,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 112,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:98:16", "data-dynamic-content": "true", className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:99:18", "data-dynamic-content": "true", className: "font-ui text-xs truncate", style: { color: selectedId === h.id ? "#4ade80" : "#aaa" }, "data-collection-item-field": "name", "data-collection-item-id": h?.id, children: h.name }, void 0, false, {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 118,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:100:18", "data-dynamic-content": "true", className: "font-ui text-[9px]", style: { color: RARITY_COLORS[h.rarity] }, "data-collection-item-field": "rarity", "data-collection-item-id": h?.id, children: h.rarity }, void 0, false, {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 119,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 117,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  "data-source-location": "components/game/HeroEditor:102:16",
                  "data-dynamic-content": "true",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleDelete(h.id);
                  },
                  className: "opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-900/40 text-red-500",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { "data-source-location": "components/game/HeroEditor:104:18", "data-dynamic-content": "false", size: 10 }, void 0, false, {
                    fileName: "/app/src/components/game/HeroEditor.jsx",
                    lineNumber: 123,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 121,
                  columnNumber: 17
                },
                this
              )
            ]
          },
          h.id,
          true,
          {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 109,
            columnNumber: 15
          },
          this
        );
      })
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroEditor.jsx",
      lineNumber: 91,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:112:8", "data-dynamic-content": "true", className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:114:10", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b", style: { borderColor: "#1a3a1a", background: "#0a120a" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:115:12", "data-dynamic-content": "false", className: "font-pixel text-[9px] text-green-400", children: "✏️ HERO EDITOR — DEV MODE" }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 134,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:116:12", "data-dynamic-content": "true", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:117:14", "data-dynamic-content": "false", className: "font-ui text-[10px] text-slate-500", children: "Auto-saves" }, void 0, false, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 136,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HeroEditor:118:14", "data-dynamic-content": "true", onClick: onClose, className: "p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/HeroEditor:118:114", "data-dynamic-content": "false", size: 16 }, void 0, false, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 137,
            columnNumber: 200
          }, this) }, void 0, false, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 137,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 135,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 133,
        columnNumber: 11
      }, this),
      editData ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:123:12", "data-dynamic-content": "true", className: "flex-1 overflow-y-auto p-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:125:14", "data-dynamic-content": "true", className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/HeroEditor:126:16",
              "data-dynamic-content": "true",
              className: "w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0",
              style: { background: "#0d1a0d", border: `2px solid ${RARITY_COLORS[editData.rarity] || "#333"}` },
              children: spritePreview ? /* @__PURE__ */ jsxDEV("img", { "data-source-location": "components/game/HeroEditor:129:22", "data-dynamic-content": "true", src: spritePreview, style: { width: 64, height: 64, imageRendering: "pixelated" }, alt: "" }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 148,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:130:22", "data-dynamic-content": "true", style: { fontSize: 36 }, children: "🦸" }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 149,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 145,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:132:16", "data-dynamic-content": "true", className: "flex-1 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:133:18", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("label", { "data-source-location": "components/game/HeroEditor:134:20", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-600 block mb-1", children: "NAME" }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 153,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "components/game/HeroEditor:135:20",
                  "data-dynamic-content": "true",
                  value: editData.name,
                  onChange: (e) => handleFieldChange("name", e.target.value),
                  className: "w-full px-2 py-1 rounded font-ui text-sm outline-none",
                  style: { background: "#1a2a1a", border: "1px solid #166534", color: "#fff" }
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 154,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 152,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:139:18", "data-dynamic-content": "true", children: [
              /* @__PURE__ */ jsxDEV("label", { "data-source-location": "components/game/HeroEditor:140:20", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-600 block mb-1", children: "RARITY" }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 159,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  "data-source-location": "components/game/HeroEditor:141:20",
                  "data-dynamic-content": "true",
                  value: editData.rarity,
                  onChange: (e) => handleFieldChange("rarity", e.target.value),
                  className: "w-full px-2 py-1 rounded font-ui text-sm outline-none",
                  style: { background: "#1a2a1a", border: "1px solid #166534", color: RARITY_COLORS[editData.rarity] },
                  children: RARITIES.map((r, __arrIdx__) => /* @__PURE__ */ jsxDEV("option", { "data-source-location": "components/game/HeroEditor:144:41", "data-dynamic-content": "true", value: r, "data-arr-index": __arrIdx__, "data-arr-variable-name": "RARITIES", children: r }, r, false, {
                    fileName: "/app/src/components/game/HeroEditor.jsx",
                    lineNumber: 163,
                    columnNumber: 56
                  }, this))
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 160,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 158,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:147:18", "data-dynamic-content": "true", className: "col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { "data-source-location": "components/game/HeroEditor:148:20", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-600 block mb-1", children: "DESCRIPTION" }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 167,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  "data-source-location": "components/game/HeroEditor:149:20",
                  "data-dynamic-content": "true",
                  value: editData.description || "",
                  onChange: (e) => handleFieldChange("description", e.target.value),
                  placeholder: "Hero description...",
                  className: "w-full px-2 py-1 rounded font-ui text-sm outline-none",
                  style: { background: "#1a2a1a", border: "1px solid #166534", color: "#aaa" }
                },
                void 0,
                false,
                {
                  fileName: "/app/src/components/game/HeroEditor.jsx",
                  lineNumber: 168,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 166,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 151,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 144,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:158:14", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-500 mb-2", children: "BASE STATS" }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:159:14", "data-dynamic-content": "true", className: "grid grid-cols-3 gap-3", children: STAT_FIELDS.map(
          ({ key, label, min, max, step, id }) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:161:18", "data-dynamic-content": "true", className: "rounded-lg p-3", style: { background: "#0d1a0d", border: "1px solid #1a3a1a" }, children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:162:20", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-green-600 mb-1", "data-collection-item-field": "label", "data-collection-item-id": id, children: label }, void 0, false, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 181,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                "data-source-location": "components/game/HeroEditor:163:20",
                "data-dynamic-content": "true",
                type: "number",
                min,
                max,
                step,
                value: editData[key] ?? DEFAULT_HERO_STATS[key] ?? 0,
                onChange: (e) => {
                  const v = step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
                  handleFieldChange(key, isNaN(v) ? 0 : v);
                },
                className: "w-full px-2 py-1 rounded font-ui text-sm font-bold outline-none text-center",
                style: { background: "#0a120a", border: "1px solid #166534", color: "#4ade80" }
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 182,
                columnNumber: 21
              },
              this
            )
          ] }, key, true, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 180,
            columnNumber: 15
          }, this)
        ) }, void 0, false, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 178,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:178:14", "data-dynamic-content": "true", className: "mt-4 p-3 rounded-lg flex items-center justify-between", style: { background: "#0d1a0d", border: "1px solid #1a3a1a" }, children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:179:16", "data-dynamic-content": "true", className: "flex-1 mr-4", children: [
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:180:18", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-green-600 mb-1", children: "ALTAR ROLL" }, void 0, false, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 199,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:181:18", "data-dynamic-content": "true", className: "font-ui text-xs text-slate-400", children: editData.is_rollable !== false ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              "Players spend ",
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:183:40", "data-dynamic-content": "true", className: "text-yellow-400 font-bold", "data-collection-item-field": "gem_cost", "data-collection-item-id": editData?.id || editData?._id, children: [
                "💎 ",
                editData.gem_cost
              ] }, void 0, true, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 202,
                columnNumber: 35
              }, this),
              " gems at the Altar to roll for ",
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:183:144", "data-dynamic-content": "true", style: { color: RARITY_COLORS[editData.rarity] }, className: "font-bold", "data-collection-item-field": "name", "data-collection-item-id": editData?.id || editData?._id, children: editData.name }, void 0, false, {
                fileName: "/app/src/components/game/HeroEditor.jsx",
                lineNumber: 202,
                columnNumber: 318
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 202,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HeroEditor:184:24", "data-dynamic-content": "false", className: "text-slate-500", children: "This hero is hidden from the Altar roll pool." }, void 0, false, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 203,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 200,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HeroEditor.jsx",
            lineNumber: 198,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              "data-source-location": "components/game/HeroEditor:187:16",
              "data-dynamic-content": "true",
              onClick: () => handleFieldChange("is_rollable", editData.is_rollable === false ? true : false),
              className: "flex items-center gap-2 px-3 py-2 rounded font-pixel text-[7px] transition-all flex-shrink-0",
              style: {
                background: editData.is_rollable !== false ? "#166534" : "#1f2937",
                border: `1px solid ${editData.is_rollable !== false ? "#4ade80" : "#374151"}`,
                color: editData.is_rollable !== false ? "#4ade80" : "#6b7280"
              },
              children: editData.is_rollable !== false ? "✓ ENABLED" : "✗ DISABLED"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HeroEditor.jsx",
              lineNumber: 206,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HeroEditor.jsx",
          lineNumber: 197,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 142,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HeroEditor:201:12", "data-dynamic-content": "false", className: "flex-1 flex items-center justify-center text-slate-500 font-ui text-sm", children: "Select or create a hero to edit." }, void 0, false, {
        fileName: "/app/src/components/game/HeroEditor.jsx",
        lineNumber: 220,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HeroEditor.jsx",
      lineNumber: 131,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/HeroEditor.jsx",
    lineNumber: 89,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/HeroEditor.jsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}
_s(HeroEditor, "X2tudNCvj0/WiuIGVDawtvD5p/0=");
_c = HeroEditor;
var _c;
$RefreshReg$(_c, "HeroEditor");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/HeroEditor.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/HeroEditor.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QSxLQXpJRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMElBO0FBRUo7QUFBQ25ELEdBMUx1QkYsWUFBVTtBQUFBLEtBQVZBO0FBQVUsSUFBQXdEO0FBQUEsYUFBQUEsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJYIiwiVHJhc2gyIiwiUGx1cyIsImdldEFsbEN1c3RvbUhlcm9lcyIsInNhdmVDdXN0b21IZXJvIiwiZGVsZXRlQ3VzdG9tSGVybyIsImNyZWF0ZU5ld0hlcm8iLCJERUZBVUxUX0hFUk9fU1RBVFMiLCJnZXRBbGxIZXJvU3ByaXRlc0ZvclR5cGUiLCJTVEFUX0ZJRUxEUyIsImtleSIsImxhYmVsIiwibWluIiwibWF4Iiwic3RlcCIsIlJBUklUSUVTIiwiUkFSSVRZX0NPTE9SUyIsImNvbW1vbiIsInVuY29tbW9uIiwicmFyZSIsImVwaWMiLCJsZWdlbmRhcnkiLCJIZXJvRWRpdG9yIiwib25DbG9zZSIsIl9zIiwiaGVyb2VzIiwic2V0SGVyb2VzIiwic2VsZWN0ZWRJZCIsInNldFNlbGVjdGVkSWQiLCJpZCIsImVkaXREYXRhIiwic2V0RWRpdERhdGEiLCJuZXdOYW1lIiwic2V0TmV3TmFtZSIsInNob3dOZXciLCJzZXRTaG93TmV3Iiwic2VsZWN0ZWRIZXJvIiwiZmluZCIsImgiLCJoYW5kbGVGaWVsZENoYW5nZSIsInZhbCIsInByZXYiLCJ1cGRhdGVkIiwiaGFuZGxlRGVsZXRlIiwiY29uZmlybSIsImhhbmRsZUNyZWF0ZSIsInRyaW0iLCJoZXJvIiwic3ByaXRlUHJldmlldyIsImJhY2tncm91bmQiLCJib3JkZXIiLCJtYXhIZWlnaHQiLCJtYXhXaWR0aCIsIndpZHRoIiwiYm9yZGVyQ29sb3IiLCJ2IiwiZSIsInRhcmdldCIsInZhbHVlIiwiY29sb3IiLCJsZW5ndGgiLCJtYXAiLCJwcmV2aWV3IiwicmFyaXR5IiwiaGVpZ2h0IiwiaW1hZ2VSZW5kZXJpbmciLCJmb250U2l6ZSIsIm5hbWUiLCJzdG9wUHJvcGFnYXRpb24iLCJyIiwiX19hcnJJZHhfXyIsImRlc2NyaXB0aW9uIiwicGFyc2VGbG9hdCIsInBhcnNlSW50IiwiaXNOYU4iLCJpc19yb2xsYWJsZSIsIl9pZCIsImdlbV9jb3N0IiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiSGVyb0VkaXRvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFgsIFRyYXNoMiwgUGx1cyB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGdldEFsbEN1c3RvbUhlcm9lcywgc2F2ZUN1c3RvbUhlcm8sIGRlbGV0ZUN1c3RvbUhlcm8sIGNyZWF0ZU5ld0hlcm8sIERFRkFVTFRfSEVST19TVEFUUyB9IGZyb20gXCJAL2xpYi9oZXJvRGF0YVwiO1xuaW1wb3J0IHsgZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlIH0gZnJvbSBcIkAvbGliL2hlcm9TcHJpdGVzXCI7XG5cbmNvbnN0IFNUQVRfRklFTERTID0gW1xueyBrZXk6IFwiaHBcIiwgbGFiZWw6IFwiQmFzZSBIUFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCB9LFxueyBrZXk6IFwiYXR0YWNrXCIsIGxhYmVsOiBcIkF0dGFja1wiLCBtaW46IDEsIG1heDogMTAwMDAsIHN0ZXA6IDUgfSxcbnsga2V5OiBcImRlZmVuc2VcIiwgbGFiZWw6IFwiRGVmZW5zZVwiLCBtaW46IDAsIG1heDogMTAwMDAsIHN0ZXA6IDUgfSxcbnsga2V5OiBcInNwZWVkXCIsIGxhYmVsOiBcIk1vdmUgU3BlZWRcIiwgbWluOiAxLCBtYXg6IDEwMCwgc3RlcDogMSB9LFxueyBrZXk6IFwiYXR0YWNrX3NwZWVkXCIsIGxhYmVsOiBcIkF0dGFjayBTcGVlZFwiLCBtaW46IDAuMSwgbWF4OiAxMCwgc3RlcDogMC4xIH0sXG57IGtleTogXCJyYW5nZVwiLCBsYWJlbDogXCJSYW5nZVwiLCBtaW46IDEsIG1heDogMjAsIHN0ZXA6IDEgfSxcbnsga2V5OiBcImNyaXRfY2hhbmNlXCIsIGxhYmVsOiBcIkNyaXQgJVwiLCBtaW46IDAsIG1heDogMTAwLCBzdGVwOiAxIH0sXG57IGtleTogXCJkb2RnZV9jaGFuY2VcIiwgbGFiZWw6IFwiRG9kZ2UgJVwiLCBtaW46IDAsIG1heDogMTAwLCBzdGVwOiAxIH0sXG57IGtleTogXCJnZW1fY29zdFwiLCBsYWJlbDogXCJSb2xsIENvc3QgKPCfko4pXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwIH1dO1xuXG5cbmNvbnN0IFJBUklUSUVTID0gW1wiY29tbW9uXCIsIFwidW5jb21tb25cIiwgXCJyYXJlXCIsIFwiZXBpY1wiLCBcImxlZ2VuZGFyeVwiXTtcbmNvbnN0IFJBUklUWV9DT0xPUlMgPSB7XG4gIGNvbW1vbjogXCIjOWNhM2FmXCIsIHVuY29tbW9uOiBcIiM0YWRlODBcIiwgcmFyZTogXCIjNjBhNWZhXCIsIGVwaWM6IFwiI2MwODRmY1wiLCBsZWdlbmRhcnk6IFwiI2Y1OWUwYlwiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZXJvRWRpdG9yKHsgb25DbG9zZSB9KSB7XG4gIGNvbnN0IFtoZXJvZXMsIHNldEhlcm9lc10gPSB1c2VTdGF0ZSgoKSA9PiBnZXRBbGxDdXN0b21IZXJvZXMoKSk7XG4gIGNvbnN0IFtzZWxlY3RlZElkLCBzZXRTZWxlY3RlZElkXSA9IHVzZVN0YXRlKCgpID0+IGdldEFsbEN1c3RvbUhlcm9lcygpWzBdPy5pZCB8fCBudWxsKTtcbiAgY29uc3QgW2VkaXREYXRhLCBzZXRFZGl0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW25ld05hbWUsIHNldE5ld05hbWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzaG93TmV3LCBzZXRTaG93TmV3XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBzZWxlY3RlZEhlcm8gPSBoZXJvZXMuZmluZCgoaCkgPT4gaC5pZCA9PT0gc2VsZWN0ZWRJZCkgfHwgbnVsbDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEhlcm8pIHNldEVkaXREYXRhKHsgLi4uc2VsZWN0ZWRIZXJvIH0pO2Vsc2VcbiAgICBzZXRFZGl0RGF0YShudWxsKTtcbiAgfSwgW3NlbGVjdGVkSWRdKTtcblxuICBjb25zdCBoYW5kbGVGaWVsZENoYW5nZSA9IChrZXksIHZhbCkgPT4ge1xuICAgIHNldEVkaXREYXRhKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2LCBba2V5XTogdmFsIH07XG4gICAgICAvLyBBdXRvLXNhdmUgZXZlcnkgY2hhbmdlXG4gICAgICBzYXZlQ3VzdG9tSGVybyh1cGRhdGVkKTtcbiAgICAgIHNldEhlcm9lcyhnZXRBbGxDdXN0b21IZXJvZXMoKSk7XG4gICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSAoaWQpID0+IHtcbiAgICBpZiAoIWNvbmZpcm0oXCJEZWxldGUgdGhpcyBoZXJvP1wiKSkgcmV0dXJuO1xuICAgIGRlbGV0ZUN1c3RvbUhlcm8oaWQpO1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBnZXRBbGxDdXN0b21IZXJvZXMoKTtcbiAgICBzZXRIZXJvZXModXBkYXRlZCk7XG4gICAgaWYgKHNlbGVjdGVkSWQgPT09IGlkKSBzZXRTZWxlY3RlZElkKHVwZGF0ZWRbMF0/LmlkIHx8IG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZSA9ICgpID0+IHtcbiAgICBpZiAoIW5ld05hbWUudHJpbSgpKSByZXR1cm47XG4gICAgY29uc3QgaGVybyA9IGNyZWF0ZU5ld0hlcm8obmV3TmFtZS50cmltKCkpO1xuICAgIHNhdmVDdXN0b21IZXJvKGhlcm8pO1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBnZXRBbGxDdXN0b21IZXJvZXMoKTtcbiAgICBzZXRIZXJvZXModXBkYXRlZCk7XG4gICAgc2V0U2VsZWN0ZWRJZChoZXJvLmlkKTtcbiAgICBzZXROZXdOYW1lKFwiXCIpO1xuICAgIHNldFNob3dOZXcoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHNwcml0ZVByZXZpZXcgPSBzZWxlY3RlZElkID8gZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlKHNlbGVjdGVkSWQpW1wiU1wiXSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6Njk6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bMTEwXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84NVwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjcwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy0yeGxcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZjFhMGZcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjMTY2NTM0XCIsIG1heEhlaWdodDogXCI5NXZoXCIsIG1heFdpZHRoOiBcIjkwMHB4XCIsIHdpZHRoOiBcIjEwMCVcIiB9fT5cbiAgICAgICAgey8qIEhlcm8gbGlzdCBzaWRlYmFyICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6NzI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgYm9yZGVyLXIgb3ZlcmZsb3cteS1hdXRvXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzFhM2ExYVwiLCBiYWNrZ3JvdW5kOiBcIiMwYTEyMGFcIiwgd2lkdGg6IDE4MCB9fT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6NzM6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJweC0zIHB0LTMgcGItMSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6NzQ6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtZ3JlZW4tNTAwXCI+SEVST0VTPC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjc1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd05ldygodikgPT4gIXYpfSBjbGFzc05hbWU9XCJwLTAuNSByb3VuZGVkIGhvdmVyOmJnLWdyZWVuLTkwMC8zMCB0ZXh0LWdyZWVuLTUwMFwiPjxQbHVzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6NzU6MTE5XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtzaG93TmV3ICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjc4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicHgtMiBwYi0yIGZsZXggZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6Nzk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBhdXRvRm9jdXMgdmFsdWU9e25ld05hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3TmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7aWYgKGUua2V5ID09PSBcIkVudGVyXCIpIGhhbmRsZUNyZWF0ZSgpO2lmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0U2hvd05ldyhmYWxzZSk7fX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZS4uLlwiIGNsYXNzTmFtZT1cImZsZXgtMSBweC0xIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtdWkgb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMmExYVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxNjY1MzRcIiwgY29sb3I6IFwiIzRhZGU4MFwiIH19IC8+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjo4MzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2hhbmRsZUNyZWF0ZX0gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtWzlweF0gZm9udC1waXhlbCB0ZXh0LXdoaXRlXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMTY2NTM0XCIgfX0+KzwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIHtoZXJvZXMubGVuZ3RoID09PSAwICYmIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjo4NjozNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJwLTMgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgdGV4dC1jZW50ZXIgZm9udC11aVwiPk5vIGhlcm9lcyB5ZXQuPC9kaXY+fVxuICAgICAgICAgIHtoZXJvZXMubWFwKChoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3ID0gZ2V0QWxsSGVyb1Nwcml0ZXNGb3JUeXBlKGguaWQpW1wiU1wiXTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjo5MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17aC5pZH0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRJZChoLmlkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMiBweS0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogc2VsZWN0ZWRJZCA9PT0gaC5pZCA/IFwiIzFhMmExYVwiIDogXCJ0cmFuc3BhcmVudFwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoPy5pZH0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjkzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMWEwZFwiLCBib3JkZXI6IGAxcHggc29saWQgJHtSQVJJVFlfQ09MT1JTW2gucmFyaXR5XSB8fCBcIiMzMzNcIn1gIH19PlxuICAgICAgICAgICAgICAgICAge3ByZXZpZXcgPyA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6OTU6MjlcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBzcmM9e3ByZXZpZXd9IHN0eWxlPXt7IHdpZHRoOiAyOCwgaGVpZ2h0OiAyOCwgaW1hZ2VSZW5kZXJpbmc6IFwicGl4ZWxhdGVkXCIgfX0gYWx0PVwiXCIgLz4gOlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjo5NjoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGZvbnRTaXplOiAxNiB9fT7wn6a4PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6OTg6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjk5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRydW5jYXRlXCIgc3R5bGU9e3sgY29sb3I6IHNlbGVjdGVkSWQgPT09IGguaWQgPyBcIiM0YWRlODBcIiA6IFwiI2FhYVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwibmFtZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtoPy5pZH0+e2gubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMDA6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzlweF1cIiBzdHlsZT17eyBjb2xvcjogUkFSSVRZX0NPTE9SU1toLnJhcml0eV0gfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJyYXJpdHlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aD8uaWR9PntoLnJhcml0eX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTAyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO2hhbmRsZURlbGV0ZShoLmlkKTt9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCBwLTAuNSByb3VuZGVkIGhvdmVyOmJnLXJlZC05MDAvNDAgdGV4dC1yZWQtNTAwXCI+XG4gICAgICAgICAgICAgICAgICA8VHJhc2gyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTA0OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBFZGl0b3IgcGFuZWwgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMTI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjExNDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTIgYm9yZGVyLWJcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogXCIjMWEzYTFhXCIsIGJhY2tncm91bmQ6IFwiIzBhMTIwYVwiIH19PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMTU6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIHRleHQtZ3JlZW4tNDAwXCI+4pyP77iPIEhFUk8gRURJVE9SIOKAlCBERVYgTU9ERTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMTY6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjExNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+QXV0by1zYXZlczwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjExODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIj48WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjExODoxMTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgc2l6ZT17MTZ9IC8+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlZGl0RGF0YSA/XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjEyMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC00XCI+XG4gICAgICAgICAgICAgIHsvKiBUb3AgaW5mbyByb3cgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00IG1iLTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTI2OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidy0yMCBoLTIwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC1zaHJpbmstMFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMWEwZFwiLCBib3JkZXI6IGAycHggc29saWQgJHtSQVJJVFlfQ09MT1JTW2VkaXREYXRhLnJhcml0eV0gfHwgXCIjMzMzXCJ9YCB9fT5cbiAgICAgICAgICAgICAgICAgIHtzcHJpdGVQcmV2aWV3ID9cbiAgICAgICAgICAgICAgICA8aW1nIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTI5OjIyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc3JjPXtzcHJpdGVQcmV2aWV3fSBzdHlsZT17eyB3aWR0aDogNjQsIGhlaWdodDogNjQsIGltYWdlUmVuZGVyaW5nOiBcInBpeGVsYXRlZFwiIH19IGFsdD1cIlwiIC8+IDpcbiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjEzMDoyMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGZvbnRTaXplOiAzNiB9fT7wn6a4PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTMyOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxMzM6MThcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTM0OjIwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LWdyZWVuLTYwMCBibG9jayBtYi0xXCI+TkFNRTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjEzNToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXtlZGl0RGF0YS5uYW1lfSBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUZpZWxkQ2hhbmdlKFwibmFtZVwiLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMiBweS0xIHJvdW5kZWQgZm9udC11aSB0ZXh0LXNtIG91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxYTJhMWFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMTY2NTM0XCIsIGNvbG9yOiBcIiNmZmZcIiB9fSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTM5OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE0MDoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gdGV4dC1ncmVlbi02MDAgYmxvY2sgbWItMVwiPlJBUklUWTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxNDE6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiB2YWx1ZT17ZWRpdERhdGEucmFyaXR5fSBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUZpZWxkQ2hhbmdlKFwicmFyaXR5XCIsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEgcm91bmRlZCBmb250LXVpIHRleHQtc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMmExYVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxNjY1MzRcIiwgY29sb3I6IFJBUklUWV9DT0xPUlNbZWRpdERhdGEucmFyaXR5XSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7UkFSSVRJRVMubWFwKChyLCBfX2FycklkeF9fKSA9PiA8b3B0aW9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTQ0OjQxXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtyfSB2YWx1ZT17cn0gZGF0YS1hcnItaW5kZXg9e19fYXJySWR4X199IGRhdGEtYXJyLXZhcmlhYmxlLW5hbWU9XCJSQVJJVElFU1wiPntyfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTQ3OjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiY29sLXNwYW4tMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxNDg6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtZ3JlZW4tNjAwIGJsb2NrIG1iLTFcIj5ERVNDUklQVElPTjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE0OToyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHZhbHVlPXtlZGl0RGF0YS5kZXNjcmlwdGlvbiB8fCBcIlwifSBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUZpZWxkQ2hhbmdlKFwiZGVzY3JpcHRpb25cIiwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJIZXJvIGRlc2NyaXB0aW9uLi4uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEgcm91bmRlZCBmb250LXVpIHRleHQtc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMmExYVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxNjY1MzRcIiwgY29sb3I6IFwiI2FhYVwiIH19IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFN0YXRzIGdyaWQgKi99XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxNTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtZ3JlZW4tNTAwIG1iLTJcIj5CQVNFIFNUQVRTPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxNTk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAge1NUQVRfRklFTERTLm1hcCgoeyBrZXksIGxhYmVsLCBtaW4sIG1heCwgc3RlcCwgaWQgfSkgPT5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE2MToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17a2V5fSBjbGFzc05hbWU9XCJyb3VuZGVkLWxnIHAtM1wiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBkMWEwZFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMxYTNhMWFcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE2MjoyMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LWdyZWVuLTYwMCBtYi0xXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSGVyb0VkaXRvcjoxNjM6MjBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIG1pbj17bWlufSBtYXg9e21heH0gc3RlcD17c3RlcH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdERhdGFba2V5XSA/PyBERUZBVUxUX0hFUk9fU1RBVFNba2V5XSA/PyAwfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IHN0ZXAgPCAxID8gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgaGFuZGxlRmllbGRDaGFuZ2Uoa2V5LCBpc05hTih2KSA/IDAgOiB2KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB5LTEgcm91bmRlZCBmb250LXVpIHRleHQtc20gZm9udC1ib2xkIG91dGxpbmUtbm9uZSB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGExMjBhXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzE2NjUzNFwiLCBjb2xvcjogXCIjNGFkZTgwXCIgfX0gLz5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTc4OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwibXQtNCBwLTMgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwZDFhMGRcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMWEzYTFhXCIgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE3OToxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBtci00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTgwOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSB0ZXh0LWdyZWVuLTYwMCBtYi0xXCI+QUxUQVIgUk9MTDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE4MToxOFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZWRpdERhdGEuaXNfcm9sbGFibGUgIT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIDw+UGxheWVycyBzcGVuZCA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE4Mzo0MFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTQwMCBmb250LWJvbGRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImdlbV9jb3N0XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2VkaXREYXRhPy5pZCB8fCBlZGl0RGF0YT8uX2lkfT7wn5KOIHtlZGl0RGF0YS5nZW1fY29zdH08L3NwYW4+IGdlbXMgYXQgdGhlIEFsdGFyIHRvIHJvbGwgZm9yIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTgzOjE0NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIHN0eWxlPXt7IGNvbG9yOiBSQVJJVFlfQ09MT1JTW2VkaXREYXRhLnJhcml0eV0gfX0gY2xhc3NOYW1lPVwiZm9udC1ib2xkXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2VkaXREYXRhPy5pZCB8fCBlZGl0RGF0YT8uX2lkfT57ZWRpdERhdGEubmFtZX08L3NwYW4+LjwvPiA6XG4gICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjE4NDoyNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlRoaXMgaGVybyBpcyBoaWRkZW4gZnJvbSB0aGUgQWx0YXIgcm9sbCBwb29sLjwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3I6MTg3OjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRmllbGRDaGFuZ2UoXCJpc19yb2xsYWJsZVwiLCBlZGl0RGF0YS5pc19yb2xsYWJsZSA9PT0gZmFsc2UgPyB0cnVlIDogZmFsc2UpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzdweF0gdHJhbnNpdGlvbi1hbGwgZmxleC1zaHJpbmstMFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZWRpdERhdGEuaXNfcm9sbGFibGUgIT09IGZhbHNlID8gXCIjMTY2NTM0XCIgOiBcIiMxZjI5MzdcIixcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtlZGl0RGF0YS5pc19yb2xsYWJsZSAhPT0gZmFsc2UgPyBcIiM0YWRlODBcIiA6IFwiIzM3NDE1MVwifWAsXG4gICAgICAgICAgICAgICAgY29sb3I6IGVkaXREYXRhLmlzX3JvbGxhYmxlICE9PSBmYWxzZSA/IFwiIzRhZGU4MFwiIDogXCIjNmI3MjgwXCJcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB7ZWRpdERhdGEuaXNfcm9sbGFibGUgIT09IGZhbHNlID8gXCLinJMgRU5BQkxFRFwiIDogXCLinJcgRElTQUJMRURcIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IZXJvRWRpdG9yOjIwMToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1zbGF0ZS01MDAgZm9udC11aSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIFNlbGVjdCBvciBjcmVhdGUgYSBoZXJvIHRvIGVkaXQuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcblxufSJdLCJmaWxlIjoiL2FwcC9zcmMvY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3IuanN4In0=