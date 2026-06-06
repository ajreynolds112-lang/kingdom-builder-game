import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/HUD.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/HUD.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { Settings } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
import { downloadSourceCode } from "/src/lib/downloadSourceCode.js";
const DEV_PASSCODE = "007342";
export default function HUD({ playerBase, townHallLevel, onOpenShop, onOpenDungeons, onOpenAltar, onOpenGemShop, showCollectButton, onCollect, onReset, onSetGems, onOpenPixelEditor, onOpenDungeonEditor, onOpenHeroCreator, onOpenHeroEditor, onOpenWallLayerEditor, onOpenBuildingStatsEditor, onOpenDocumentation, "data-collection-item-id": __dataCollectionItemId }) {
  _s();
  const [devMode, setDevMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [editingGems, setEditingGems] = useState(false);
  const [gemInput, setGemInput] = useState("");
  const [editingGold, setEditingGold] = useState(false);
  const [goldInput, setGoldInput] = useState("");
  const [editingMana, setEditingMana] = useState(false);
  const [manaInput, setManaInput] = useState("");
  const [editingShards, setEditingShards] = useState(false);
  const [shardsInput, setShardsInput] = useState("");
  const gemInputRef = useRef(null);
  const goldInputRef = useRef(null);
  const manaInputRef = useRef(null);
  const shardsInputRef = useRef(null);
  useEffect(() => {
    if (editingGems && gemInputRef.current) gemInputRef.current.focus();
    if (editingGold && goldInputRef.current) goldInputRef.current.focus();
    if (editingMana && manaInputRef.current) manaInputRef.current.focus();
    if (editingShards && shardsInputRef.current) shardsInputRef.current.focus();
  }, [editingGems, editingGold, editingMana, editingShards]);
  if (!playerBase) return null;
  const gold = playerBase.gold ?? 0;
  const mana = playerBase.mana ?? 0;
  const shards = playerBase.soul_shards ?? 0;
  const gems = playerBase.gems ?? 0;
  const thLevel = townHallLevel ?? playerBase.town_hall_level ?? 1;
  const handleDevToggle = () => {
    if (devMode) {
      setDevMode(false);
      setShowSettings(false);
    } else {
      setPasscode("");
      setPasscodeError(false);
      setShowPasscodePrompt(true);
      setShowSettings(false);
    }
  };
  const handlePasscodeSubmit = () => {
    if (passcode === DEV_PASSCODE) {
      setDevMode(true);
      setShowPasscodePrompt(false);
      setPasscode("");
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setPasscode("");
    }
  };
  const handleGemClick = () => {
    if (!devMode) {
      onOpenGemShop();
      return;
    }
    setGemInput(String(gems));
    setEditingGems(true);
  };
  const handleGemInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setGemInput(val);
  };
  const handleGemInputCommit = () => {
    if (gemInput !== "" && onSetGems) {
      onSetGems(parseInt(gemInput, 10));
    }
    setEditingGems(false);
  };
  const handleGemInputKey = (e) => {
    if (e.key === "Enter") handleGemInputCommit();
    if (e.key === "Escape") setEditingGems(false);
  };
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:95:4", "data-dynamic-content": "true", className: "absolute inset-0 pointer-events-none z-30", "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:98:6", "data-dynamic-content": "true", className: "absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto", children: [
      editingGold ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:101:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-3 py-1.5 rounded", style: { background: "#c4a47a", border: "2px solid #fbbf24", boxShadow: "0 2px 6px rgba(0,0,0,0.4)", minWidth: "130px" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:102:12", "data-dynamic-content": "false", className: "text-base", children: "💰" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 121,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:103:12", "data-dynamic-content": "true", className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "components/game/HUD:104:14",
              "data-dynamic-content": "true",
              ref: goldInputRef,
              value: goldInput,
              onChange: (e) => setGoldInput(e.target.value.replace(/\D/g, "").slice(0, 10)),
              onBlur: () => {
                if (goldInput !== "" && onSetGems) {
                  const updated = { ...playerBase, gold: parseInt(goldInput, 10) };
                  onSetGems(null, updated);
                }
                setEditingGold(false);
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  if (goldInput !== "" && onSetGems) {
                    const updated = { ...playerBase, gold: parseInt(goldInput, 10) };
                    onSetGems(null, updated);
                  }
                  setEditingGold(false);
                }
                if (e.key === "Escape") setEditingGold(false);
              },
              className: "bg-transparent w-full font-ui font-bold text-sm tabular-nums outline-none",
              style: { color: "#c8860a", fontFamily: "monospace", letterSpacing: "-0.5px" },
              maxLength: 10,
              inputMode: "numeric"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 123,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:115:14", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "DEV EDIT" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 134,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 122,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 120,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:119:10", "data-dynamic-content": "true", onClick: () => {
        if (!devMode) return;
        setGoldInput(String(gold));
        setEditingGold(true);
      }, className: "cursor-pointer hover:opacity-90 transition-opacity", title: devMode ? "Click to edit gold (dev mode)" : "", children: /* @__PURE__ */ jsxDEV(ResourcePill, { "data-source-location": "components/game/HUD:120:12", "data-dynamic-content": "true", icon: "💰", value: gold.toLocaleString(), label: "Gold", color: "#c8860a" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 139,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      editingMana ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:126:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-3 py-1.5 rounded", style: { background: "#c4a47a", border: "2px solid #60a5fa", boxShadow: "0 2px 6px rgba(0,0,0,0.4)", minWidth: "130px" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:127:12", "data-dynamic-content": "false", className: "text-base", children: "🔷" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 146,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:128:12", "data-dynamic-content": "true", className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "components/game/HUD:129:14",
              "data-dynamic-content": "true",
              ref: manaInputRef,
              value: manaInput,
              onChange: (e) => setManaInput(e.target.value.replace(/\D/g, "").slice(0, 10)),
              onBlur: () => {
                if (manaInput !== "" && onSetGems) {
                  const updated = { ...playerBase, mana: parseInt(manaInput, 10) };
                  onSetGems(null, updated);
                }
                setEditingMana(false);
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  if (manaInput !== "" && onSetGems) {
                    const updated = { ...playerBase, mana: parseInt(manaInput, 10) };
                    onSetGems(null, updated);
                  }
                  setEditingMana(false);
                }
                if (e.key === "Escape") setEditingMana(false);
              },
              className: "bg-transparent w-full font-ui font-bold text-sm tabular-nums outline-none",
              style: { color: "#4a90d9", fontFamily: "monospace", letterSpacing: "-0.5px" },
              maxLength: 10,
              inputMode: "numeric"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 148,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:140:14", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "DEV EDIT" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 159,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 147,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 145,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:144:10", "data-dynamic-content": "true", onClick: () => {
        if (!devMode) return;
        setManaInput(String(mana));
        setEditingMana(true);
      }, className: "cursor-pointer hover:opacity-90 transition-opacity", title: devMode ? "Click to edit mana (dev mode)" : "", children: /* @__PURE__ */ jsxDEV(ResourcePill, { "data-source-location": "components/game/HUD:145:12", "data-dynamic-content": "true", icon: "🔷", value: mana.toLocaleString(), label: "Mana", color: "#4a90d9" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 164,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 163,
        columnNumber: 9
      }, this),
      editingShards ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:151:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-3 py-1.5 rounded", style: { background: "#c4a47a", border: "2px solid #c084fc", boxShadow: "0 2px 6px rgba(0,0,0,0.4)", minWidth: "130px" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:152:12", "data-dynamic-content": "false", className: "text-base", children: "💜" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 171,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:153:12", "data-dynamic-content": "true", className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              "data-source-location": "components/game/HUD:154:14",
              "data-dynamic-content": "true",
              ref: shardsInputRef,
              value: shardsInput,
              onChange: (e) => setShardsInput(e.target.value.replace(/\D/g, "").slice(0, 10)),
              onBlur: () => {
                if (shardsInput !== "" && onSetGems) {
                  const updated = { ...playerBase, soul_shards: parseInt(shardsInput, 10) };
                  onSetGems(null, updated);
                }
                setEditingShards(false);
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  if (shardsInput !== "" && onSetGems) {
                    const updated = { ...playerBase, soul_shards: parseInt(shardsInput, 10) };
                    onSetGems(null, updated);
                  }
                  setEditingShards(false);
                }
                if (e.key === "Escape") setEditingShards(false);
              },
              className: "bg-transparent w-full font-ui font-bold text-sm tabular-nums outline-none",
              style: { color: "#9b5dd4", fontFamily: "monospace", letterSpacing: "-0.5px" },
              maxLength: 10,
              inputMode: "numeric"
            },
            void 0,
            false,
            {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 173,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:165:14", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, children: "DEV EDIT" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 184,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 172,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 170,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:169:10", "data-dynamic-content": "true", onClick: () => {
        if (!devMode) return;
        setShardsInput(String(shards));
        setEditingShards(true);
      }, className: "cursor-pointer hover:opacity-90 transition-opacity", title: devMode ? "Click to edit shards (dev mode)" : "", children: /* @__PURE__ */ jsxDEV(ResourcePill, { "data-source-location": "components/game/HUD:170:12", "data-dynamic-content": "true", icon: "💜", value: shards.toLocaleString(), label: "Shards", color: "#9b5dd4" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 189,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 188,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:174:8", "data-dynamic-content": "true", className: "flex items-center gap-2 px-3 py-1.5 rounded", style: { background: "#c4a47a", border: "2px solid #6b3f1f", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }, children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:175:10", "data-dynamic-content": "false", className: "text-base", children: "🏰" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 194,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:176:10", "data-dynamic-content": "true", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:177:12", "data-dynamic-content": "true", className: "font-pixel text-[7px]", style: { color: "#6b3f1f" }, children: "TOWN HALL" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 196,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:178:12", "data-dynamic-content": "true", className: "font-ui font-bold text-sm", style: { color: "#3d1f05" }, "data-collection-item-field": "thLevel", "data-collection-item-id": __dataCollectionItemId, children: [
            "Level ",
            thLevel
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 197,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 195,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 193,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 117,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:184:6", "data-dynamic-content": "true", className: "absolute top-2 right-4 pointer-events-auto", children: editingGems ? /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:186:10", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-3 py-1.5 rounded", style: { background: "#0a1a2a", border: "2px solid #a855f7", boxShadow: "0 2px 6px rgba(0,0,0,0.4)", minWidth: "140px" }, children: [
      /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:187:12", "data-dynamic-content": "false", className: "text-base", children: "💎" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 206,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:188:12", "data-dynamic-content": "true", className: "flex-1", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            "data-source-location": "components/game/HUD:189:14",
            "data-dynamic-content": "true",
            ref: gemInputRef,
            value: gemInput,
            onChange: handleGemInputChange,
            onBlur: handleGemInputCommit,
            onKeyDown: handleGemInputKey,
            className: "bg-transparent w-full font-ui font-bold text-sm tabular-nums outline-none",
            style: { color: "#c084fc", fontFamily: "monospace", letterSpacing: "-0.5px" },
            maxLength: 10,
            inputMode: "numeric"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 208,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:200:14", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#a855f7" }, children: "DEV EDIT" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 219,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 207,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 205,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/HUD:204:10",
        "data-dynamic-content": "true",
        onClick: handleGemClick,
        className: "cursor-pointer hover:opacity-90 transition-opacity",
        title: devMode ? "Click to edit gems (dev mode)" : "Open Gem Shop",
        children: /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/HUD:209:12",
            "data-dynamic-content": "true",
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded",
            style: {
              background: "#0a1a2a",
              border: `2px solid ${devMode ? "#a855f7" : "#2563eb"}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              minWidth: "140px"
            },
            children: [
              /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:218:14", "data-dynamic-content": "false", className: "text-base", children: "💎" }, void 0, false, {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 237,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:219:14", "data-dynamic-content": "true", className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:220:16", "data-dynamic-content": "true", className: "font-ui font-bold text-sm tabular-nums", style: { color: devMode ? "#c084fc" : "#60a5fa", fontFamily: "monospace", letterSpacing: "-0.5px" }, children: gems.toLocaleString() }, void 0, false, {
                  fileName: "/app/src/components/game/HUD.jsx",
                  lineNumber: 239,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:223:16", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: devMode ? "#a855f7" : "#3b82f6" }, children: devMode ? "Gems (DEV)" : "Gems" }, void 0, false, {
                  fileName: "/app/src/components/game/HUD.jsx",
                  lineNumber: 242,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 238,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 228,
            columnNumber: 13
          },
          this
        )
      },
      void 0,
      false,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 223,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 203,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:233:6", "data-dynamic-content": "true", className: "absolute bottom-4 left-4 flex gap-2 pointer-events-auto", children: [
      /* @__PURE__ */ jsxDEV(NavButton, { "data-source-location": "components/game/HUD:234:8", "data-dynamic-content": "true", icon: "⚔️", label: "Dungeons", onClick: onOpenDungeons }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 253,
        columnNumber: 9
      }, this),
      showCollectButton && /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/HUD:236:10",
          "data-dynamic-content": "true",
          onClick: onCollect,
          className: "flex flex-col items-center px-4 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95 animate-pulse",
          style: { background: "#4ade80", border: "2px solid #166534", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
          children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:241:12", "data-dynamic-content": "false", className: "text-2xl", children: "📦" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 260,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:242:12", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#166534" }, children: "COLLECT" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 261,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 255,
          columnNumber: 9
        },
        this
      ),
      devMode && /* @__PURE__ */ jsxDEV(
        DevToolbar,
        {
          "data-source-location": "components/game/HUD:246:10",
          "data-dynamic-content": "true",
          onReset,
          onOpenPixelEditor,
          onOpenWallLayerEditor,
          onOpenBuildingStatsEditor,
          onOpenDungeonEditor,
          onOpenHeroCreator,
          onOpenHeroEditor,
          onOpenDocumentation
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 265,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 252,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:260:6", "data-dynamic-content": "true", className: "absolute bottom-4 right-4 flex gap-2 pointer-events-auto items-end", children: [
      /* @__PURE__ */ jsxDEV(NavButton, { "data-source-location": "components/game/HUD:261:8", "data-dynamic-content": "true", icon: "🔮", label: "Altar", onClick: onOpenAltar }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 280,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(NavButton, { "data-source-location": "components/game/HUD:262:8", "data-dynamic-content": "true", icon: "🛒", label: "Shop", onClick: onOpenShop }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 281,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:264:8", "data-dynamic-content": "true", className: "relative", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HUD:265:10",
            "data-dynamic-content": "true",
            onClick: () => setShowSettings((s) => !s),
            className: "flex items-center justify-center w-8 h-8 rounded-full transition-all hover:opacity-80",
            style: { background: "rgba(0,0,0,0.5)", border: "1px solid #444" },
            title: "Settings",
            children: /* @__PURE__ */ jsxDEV(Settings, { "data-source-location": "components/game/HUD:271:12", "data-dynamic-content": "true", size: 14, className: "text-slate-400", style: { transform: showSettings ? "rotate(45deg)" : "none", transition: "transform 0.2s" } }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 290,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 284,
            columnNumber: 11
          },
          this
        ),
        showSettings && /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/HUD:276:12",
            "data-dynamic-content": "true",
            className: "absolute bottom-10 right-0 rounded-lg p-3 w-52",
            style: { background: "#1a1a2e", border: "1px solid #333", boxShadow: "0 4px 20px rgba(0,0,0,0.7)" },
            children: [
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:280:14", "data-dynamic-content": "false", className: "font-pixel text-[8px] text-slate-400 mb-2", children: "SETTINGS" }, void 0, false, {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 299,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:281:14", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:282:16", "data-dynamic-content": "true", children: [
                  /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:283:18", "data-dynamic-content": "false", className: "font-ui text-sm text-white", children: "Dev Mode" }, void 0, false, {
                    fileName: "/app/src/components/game/HUD.jsx",
                    lineNumber: 302,
                    columnNumber: 19
                  }, this),
                  devMode && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:284:30", "data-dynamic-content": "false", className: "font-ui text-[10px] text-purple-400", children: "Active" }, void 0, false, {
                    fileName: "/app/src/components/game/HUD.jsx",
                    lineNumber: 303,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/components/game/HUD.jsx",
                  lineNumber: 301,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    "data-source-location": "components/game/HUD:287:16",
                    "data-dynamic-content": "true",
                    onClick: handleDevToggle,
                    className: "relative w-10 h-5 rounded-full transition-colors",
                    style: { background: devMode ? "#a855f7" : "#374151" },
                    children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        "data-source-location": "components/game/HUD:292:18",
                        "data-dynamic-content": "true",
                        className: "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                        style: { left: devMode ? "22px" : "2px", transition: "left 0.2s" }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/components/game/HUD.jsx",
                        lineNumber: 311,
                        columnNumber: 19
                      },
                      this
                    )
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/components/game/HUD.jsx",
                    lineNumber: 306,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 300,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 295,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 283,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 279,
      columnNumber: 7
    }, this),
    showPasscodePrompt && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:305:8", "data-dynamic-content": "true", className: "absolute inset-0 flex items-center justify-center pointer-events-auto", style: { background: "rgba(0,0,0,0.7)" }, children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:306:10", "data-dynamic-content": "true", className: "rounded-xl p-6 w-72", style: { background: "#1a1a2e", border: "2px solid #4c1d95", boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:307:12", "data-dynamic-content": "false", className: "font-pixel text-[10px] text-purple-400 mb-1", children: "DEV MODE" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 326,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:308:12", "data-dynamic-content": "false", className: "font-ui text-white text-sm mb-4", children: "Enter passcode to activate" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 327,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          "data-source-location": "components/game/HUD:309:12",
          "data-dynamic-content": "true",
          autoFocus: true,
          type: "password",
          value: passcode,
          onChange: (e) => {
            setPasscode(e.target.value.slice(0, 10));
            setPasscodeError(false);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") handlePasscodeSubmit();
            if (e.key === "Escape") setShowPasscodePrompt(false);
          },
          className: "w-full px-3 py-2 rounded font-pixel text-[10px] tracking-widest outline-none mb-2",
          style: { background: "#0a0a1a", border: `1px solid ${passcodeError ? "#dc2626" : "#4c1d95"}`, color: "#c084fc" },
          placeholder: "••••••"
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 328,
          columnNumber: 13
        },
        this
      ),
      passcodeError && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:319:30", "data-dynamic-content": "false", className: "font-ui text-xs text-red-400 mb-2", children: "Incorrect passcode" }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 338,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:320:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HUD:321:14",
            "data-dynamic-content": "true",
            onClick: () => setShowPasscodePrompt(false),
            className: "flex-1 py-2 rounded font-pixel text-[8px] text-slate-400",
            style: { background: "#2a2a3e", border: "1px solid #333" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 340,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "components/game/HUD:328:14",
            "data-dynamic-content": "true",
            onClick: handlePasscodeSubmit,
            className: "flex-1 py-2 rounded font-pixel text-[8px]",
            style: { background: "#7c3aed", border: "1px solid #a855f7", color: "#fff" },
            children: "CONFIRM"
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 347,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 339,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 325,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 324,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/HUD.jsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
_s(HUD, "vgDaoTYX4Wf8qAwHUKnUhlF/4gw=");
_c = HUD;
function DevToolbar({ onReset, onOpenPixelEditor, onOpenWallLayerEditor, onOpenBuildingStatsEditor, onOpenDungeonEditor, onOpenHeroCreator, onOpenHeroEditor, onOpenDocumentation }) {
  _s2();
  const [openMenu, setOpenMenu] = useState(null);
  const toggle = (menu) => setOpenMenu((prev) => prev === menu ? null : menu);
  const close = () => setOpenMenu(null);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/HUD:352:6",
        "data-dynamic-content": "true",
        onClick: onReset,
        className: "flex flex-col items-center px-4 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
        style: { background: "#dc2626", border: "2px solid #991b1b", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:357:8", "data-dynamic-content": "false", className: "text-2xl", children: "🔄" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 376,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:358:8", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#7f1d1d" }, children: "RESET" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 377,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 371,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:362:6", "data-dynamic-content": "true", className: "relative", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/HUD:363:8",
          "data-dynamic-content": "true",
          onClick: () => toggle("buildings"),
          className: "flex flex-col items-center px-3 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
          style: { background: "#0a0a2e", border: `2px solid ${openMenu === "buildings" ? "#a855f7" : "#7c3aed"}`, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
          children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:368:10", "data-dynamic-content": "false", className: "text-xl", children: "🏗️" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 387,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:369:10", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#a78bfa" }, children: "BUILDINGS" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 388,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 382,
          columnNumber: 9
        },
        this
      ),
      openMenu === "buildings" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:372:10", "data-dynamic-content": "true", className: "absolute bottom-14 left-0 rounded-lg p-1 z-50", style: { background: "#0a0a1e", border: "1px solid #4c1d95", boxShadow: "0 4px 16px rgba(0,0,0,0.8)", minWidth: 180 }, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:373:12", "data-dynamic-content": "true", className: "font-pixel text-[7px] text-purple-500 px-3 py-1.5 border-b mb-1", style: { borderColor: "#2e1e5e" }, children: "BUILDINGS" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 392,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:374:12", "data-dynamic-content": "true", onClick: () => {
          onOpenPixelEditor();
          close();
        }, className: "w-full text-left px-3 py-2 rounded font-ui text-xs hover:bg-purple-900/30 text-purple-300", children: "🎨 Building Design Editor" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 393,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:375:12", "data-dynamic-content": "true", onClick: () => {
          onOpenBuildingStatsEditor();
          close();
        }, className: "w-full text-left px-3 py-2 rounded font-ui text-xs hover:bg-purple-900/30 text-purple-300", children: "📊 Building Stats (HP/Time/Cost)" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 394,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 391,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 381,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/HUD:381:6",
        "data-dynamic-content": "true",
        onClick: onOpenDungeonEditor,
        className: "flex flex-col items-center px-4 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
        style: { background: "#7f1d1d", border: "2px solid #dc2626", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:386:8", "data-dynamic-content": "false", className: "text-2xl", children: "⚔️" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 405,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:387:8", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#fca5a5" }, children: "DUNGEONS" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 406,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 400,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:391:6", "data-dynamic-content": "true", className: "relative", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/HUD:392:8",
          "data-dynamic-content": "true",
          onClick: () => toggle("heroes"),
          className: "flex flex-col items-center px-3 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
          style: { background: "#2a1a0a", border: `2px solid ${openMenu === "heroes" ? "#fbbf24" : "#f59e0b"}`, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
          children: [
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:397:10", "data-dynamic-content": "false", className: "text-xl", children: "🦸" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 416,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:398:10", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#f59e0b" }, children: "HEROES" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 417,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 411,
          columnNumber: 9
        },
        this
      ),
      openMenu === "heroes" && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:401:10", "data-dynamic-content": "true", className: "absolute bottom-14 left-0 rounded-lg p-1 z-50", style: { background: "#1a1205", border: "1px solid #b45309", boxShadow: "0 4px 16px rgba(0,0,0,0.8)", minWidth: 140 }, children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:402:12", "data-dynamic-content": "true", onClick: () => {
          onOpenHeroCreator();
          close();
        }, className: "w-full text-left px-3 py-2 rounded font-ui text-xs hover:bg-yellow-900/30 text-yellow-300", children: "🎨 Create Hero" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 421,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/HUD:403:12", "data-dynamic-content": "true", onClick: () => {
          onOpenHeroEditor();
          close();
        }, className: "w-full text-left px-3 py-2 rounded font-ui text-xs hover:bg-yellow-900/30 text-yellow-300", children: "✏️ Edit Heroes" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 422,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 420,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 410,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        "data-source-location": "components/game/HUD:409:6",
        "data-dynamic-content": "true",
        onClick: onOpenDocumentation,
        className: "flex flex-col items-center px-3 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
        style: { background: "#0a1a0a", border: "2px solid #22c55e", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:414:8", "data-dynamic-content": "false", className: "text-xl", children: "📄" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 433,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:415:8", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#22c55e" }, children: "DOCS" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 434,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 428,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(DownloadSourceButton, { "data-source-location": "components/game/HUD:418:6", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 437,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/HUD.jsx",
    lineNumber: 370,
    columnNumber: 5
  }, this);
}
_s2(DevToolbar, "QjmGQMcuEb/8tFy9H9NPVRsM1/A=");
_c2 = DevToolbar;
function DownloadSourceButton() {
  _s3();
  const [confirm, setConfirm] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState("");
  const handleConfirm = async () => {
    setConfirm(false);
    setDownloading(true);
    setProgress("Starting...");
    await downloadSourceCode((msg) => {
      if (msg) setProgress(msg);
      else {
        setDownloading(false);
        setProgress("");
      }
    });
  };
  if (downloading) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/HUD:440:6",
        "data-dynamic-content": "true",
        className: "flex flex-col items-center px-3 py-2 rounded",
        style: { background: "#0a0a2e", border: "2px solid #3b82f6", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:442:8", "data-dynamic-content": "false", className: "text-xl animate-spin", children: "⚙️" }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 461,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:443:8", "data-dynamic-content": "true", className: "font-pixel text-[6px] mt-0.5 text-center max-w-[60px]", style: { color: "#60a5fa" }, "data-collection-item-field": "progress", children: progress }, void 0, false, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 462,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 459,
        columnNumber: 7
      },
      this
    );
  }
  if (confirm) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        "data-source-location": "components/game/HUD:450:6",
        "data-dynamic-content": "true",
        className: "flex flex-col items-center px-3 py-2 rounded gap-1",
        style: { background: "#1a0a0a", border: "2px solid #ef4444", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
        children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:452:8", "data-dynamic-content": "true", className: "font-pixel text-[6px] text-center", style: { color: "#fca5a5" }, children: [
            "DOWNLOAD",
            /* @__PURE__ */ jsxDEV("br", { "data-source-location": "components/game/HUD:452:97", "data-dynamic-content": "false" }, void 0, false, {
              fileName: "/app/src/components/game/HUD.jsx",
              lineNumber: 471,
              columnNumber: 175
            }, this),
            "SOURCE?"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 471,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:453:8", "data-dynamic-content": "true", className: "flex gap-1", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/HUD:454:10",
                "data-dynamic-content": "true",
                onClick: handleConfirm,
                className: "px-2 py-0.5 rounded font-pixel text-[6px]",
                style: { background: "#ef4444", color: "#fff", border: "1px solid #b91c1c" },
                children: "YES"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 473,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                "data-source-location": "components/game/HUD:457:10",
                "data-dynamic-content": "true",
                onClick: () => setConfirm(false),
                className: "px-2 py-0.5 rounded font-pixel text-[6px]",
                style: { background: "#374151", color: "#9ca3af", border: "1px solid #4b5563" },
                children: "NO"
              },
              void 0,
              false,
              {
                fileName: "/app/src/components/game/HUD.jsx",
                lineNumber: 476,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/src/components/game/HUD.jsx",
            lineNumber: 472,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 469,
        columnNumber: 7
      },
      this
    );
  }
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      "data-source-location": "components/game/HUD:466:4",
      "data-dynamic-content": "true",
      onClick: () => setConfirm(true),
      className: "flex flex-col items-center px-3 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
      style: { background: "#0a0a2e", border: "2px solid #3b82f6", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
      children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:469:6", "data-dynamic-content": "false", className: "text-xl", children: "💾" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 488,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:470:6", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#60a5fa" }, children: "SOURCE" }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 489,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 485,
      columnNumber: 5
    },
    this
  );
}
_s3(DownloadSourceButton, "q53DZMSQaJMqwXhSyh2n15k/CB0=");
_c3 = DownloadSourceButton;
function ResourcePill({ icon, value, label, color, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:477:4", "data-dynamic-content": "true", className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded", style: { background: "#c4a47a", border: "2px solid #6b3f1f", boxShadow: "0 2px 6px rgba(0,0,0,0.4)", minWidth: "130px" }, "data-collection-item-id": __dataCollectionItemId, children: [
    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:478:6", "data-dynamic-content": "true", className: "text-base", "data-collection-item-field": "icon", "data-collection-item-id": __dataCollectionItemId, children: icon }, void 0, false, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 497,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:479:6", "data-dynamic-content": "true", className: "flex-1", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:480:8", "data-dynamic-content": "true", className: "font-ui font-bold text-sm tabular-nums", style: { color }, "data-collection-item-field": "value", "data-collection-item-id": __dataCollectionItemId, children: value }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 499,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/HUD:481:8", "data-dynamic-content": "true", className: "font-ui text-[10px]", style: { color: "#6b3f1f" }, "data-collection-item-field": "label", "data-collection-item-id": __dataCollectionItemId, children: label }, void 0, false, {
        fileName: "/app/src/components/game/HUD.jsx",
        lineNumber: 500,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 498,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/HUD.jsx",
    lineNumber: 496,
    columnNumber: 5
  }, this);
}
_c4 = ResourcePill;
function NavButton({ icon, label, onClick, "data-collection-item-id": __dataCollectionItemId }) {
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      "data-source-location": "components/game/HUD:489:4",
      "data-dynamic-content": "true",
      onClick,
      className: "flex flex-col items-center px-4 py-2 rounded cursor-pointer transition-all hover:opacity-90 active:scale-95",
      style: { background: "#c4a47a", border: "2px solid #6b3f1f", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" },
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:494:6", "data-dynamic-content": "true", className: "text-2xl", "data-collection-item-field": "icon", "data-collection-item-id": __dataCollectionItemId, children: icon }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 513,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/HUD:495:6", "data-dynamic-content": "true", className: "font-pixel text-[7px] mt-0.5", style: { color: "#3d1f05" }, "data-collection-item-field": "label", "data-collection-item-id": __dataCollectionItemId, children: label }, void 0, false, {
          fileName: "/app/src/components/game/HUD.jsx",
          lineNumber: 514,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/HUD.jsx",
      lineNumber: 508,
      columnNumber: 5
    },
    this
  );
}
_c5 = NavButton;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "HUD");
$RefreshReg$(_c2, "DevToolbar");
$RefreshReg$(_c3, "DownloadSourceButton");
$RefreshReg$(_c4, "ResourcePill");
$RefreshReg$(_c5, "NavButton");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/HUD.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/HUD.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBcUdZLFNBeVBSLFVBelBROzs7Ozs7Ozs7Ozs7Ozs7OztBQXJHWixPQUFPQSxTQUFTQyxVQUFVQyxRQUFRQyxpQkFBaUI7QUFDbkQsU0FBU0MsZ0JBQWdCO0FBQ3pCLFNBQVNDLDBCQUEwQjtBQUduQyxNQUFNQyxlQUFlO0FBRXJCLHdCQUF3QkMsSUFBSSxFQUFFQyxZQUFZQyxlQUFlQyxZQUFZQyxnQkFBZ0JDLGFBQWFDLGVBQWVDLG1CQUFtQkMsV0FBV0MsU0FBU0MsV0FBV0MsbUJBQW1CQyxxQkFBcUJDLG1CQUFtQkMsa0JBQWtCQyx1QkFBdUJDLDJCQUEyQkMscUJBQXFCLDJCQUEyQkMsdUJBQXVCLEdBQUc7QUFBQUMsS0FBQTtBQUMxVyxRQUFNLENBQUNDLFNBQVNDLFVBQVUsSUFBSTNCLFNBQVMsS0FBSztBQUM1QyxRQUFNLENBQUM0QixjQUFjQyxlQUFlLElBQUk3QixTQUFTLEtBQUs7QUFDdEQsUUFBTSxDQUFDOEIsb0JBQW9CQyxxQkFBcUIsSUFBSS9CLFNBQVMsS0FBSztBQUNsRSxRQUFNLENBQUNnQyxVQUFVQyxXQUFXLElBQUlqQyxTQUFTLEVBQUU7QUFDM0MsUUFBTSxDQUFDa0MsZUFBZUMsZ0JBQWdCLElBQUluQyxTQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDb0MsYUFBYUMsY0FBYyxJQUFJckMsU0FBUyxLQUFLO0FBQ3BELFFBQU0sQ0FBQ3NDLFVBQVVDLFdBQVcsSUFBSXZDLFNBQVMsRUFBRTtBQUMzQyxRQUFNLENBQUN3QyxhQUFhQyxjQUFjLElBQUl6QyxTQUFTLEtBQUs7QUFDcEQsUUFBTSxDQUFDMEMsV0FBV0MsWUFBWSxJQUFJM0MsU0FBUyxFQUFFO0FBQzdDLFFBQU0sQ0FBQzRDLGFBQWFDLGNBQWMsSUFBSTdDLFNBQVMsS0FBSztBQUNwRCxRQUFNLENBQUM4QyxXQUFXQyxZQUFZLElBQUkvQyxTQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDZ0QsZUFBZUMsZ0JBQWdCLElBQUlqRCxTQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDa0QsYUFBYUMsY0FBYyxJQUFJbkQsU0FBUyxFQUFFO0FBQ2pELFFBQU1vRCxjQUFjbkQsT0FBTyxJQUFJO0FBQy9CLFFBQU1vRCxlQUFlcEQsT0FBTyxJQUFJO0FBQ2hDLFFBQU1xRCxlQUFlckQsT0FBTyxJQUFJO0FBQ2hDLFFBQU1zRCxpQkFBaUJ0RCxPQUFPLElBQUk7QUFFbENDLFlBQVUsTUFBTTtBQUNkLFFBQUlrQyxlQUFlZ0IsWUFBWUksUUFBU0osYUFBWUksUUFBUUMsTUFBTTtBQUNsRSxRQUFJakIsZUFBZWEsYUFBYUcsUUFBU0gsY0FBYUcsUUFBUUMsTUFBTTtBQUNwRSxRQUFJYixlQUFlVSxhQUFhRSxRQUFTRixjQUFhRSxRQUFRQyxNQUFNO0FBQ3BFLFFBQUlULGlCQUFpQk8sZUFBZUMsUUFBU0QsZ0JBQWVDLFFBQVFDLE1BQU07QUFBQSxFQUM1RSxHQUFHLENBQUNyQixhQUFhSSxhQUFhSSxhQUFhSSxhQUFhLENBQUM7QUFFekQsTUFBSSxDQUFDekMsV0FBWSxRQUFPO0FBRXhCLFFBQU1tRCxPQUFPbkQsV0FBV21ELFFBQVE7QUFDaEMsUUFBTUMsT0FBT3BELFdBQVdvRCxRQUFRO0FBQ2hDLFFBQU1DLFNBQVNyRCxXQUFXc0QsZUFBZTtBQUN6QyxRQUFNQyxPQUFPdkQsV0FBV3VELFFBQVE7QUFDaEMsUUFBTUMsVUFBVXZELGlCQUFpQkQsV0FBV3lELG1CQUFtQjtBQUUvRCxRQUFNQyxrQkFBa0JBLE1BQU07QUFDNUIsUUFBSXZDLFNBQVM7QUFFWEMsaUJBQVcsS0FBSztBQUNoQkUsc0JBQWdCLEtBQUs7QUFBQSxJQUN2QixPQUFPO0FBRUxJLGtCQUFZLEVBQUU7QUFDZEUsdUJBQWlCLEtBQUs7QUFDdEJKLDRCQUFzQixJQUFJO0FBQzFCRixzQkFBZ0IsS0FBSztBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUVBLFFBQU1xQyx1QkFBdUJBLE1BQU07QUFDakMsUUFBSWxDLGFBQWEzQixjQUFjO0FBQzdCc0IsaUJBQVcsSUFBSTtBQUNmSSw0QkFBc0IsS0FBSztBQUMzQkUsa0JBQVksRUFBRTtBQUNkRSx1QkFBaUIsS0FBSztBQUFBLElBQ3hCLE9BQU87QUFDTEEsdUJBQWlCLElBQUk7QUFDckJGLGtCQUFZLEVBQUU7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFFQSxRQUFNa0MsaUJBQWlCQSxNQUFNO0FBQzNCLFFBQUksQ0FBQ3pDLFNBQVM7QUFDWmQsb0JBQWM7QUFDZDtBQUFBLElBQ0Y7QUFDQTJCLGdCQUFZNkIsT0FBT04sSUFBSSxDQUFDO0FBQ3hCekIsbUJBQWUsSUFBSTtBQUFBLEVBQ3JCO0FBRUEsUUFBTWdDLHVCQUF1QkEsQ0FBQ0MsTUFBTTtBQUNsQyxVQUFNQyxNQUFNRCxFQUFFRSxPQUFPQyxNQUFNQyxRQUFRLE9BQU8sRUFBRSxFQUFFQyxNQUFNLEdBQUcsRUFBRTtBQUN6RHBDLGdCQUFZZ0MsR0FBRztBQUFBLEVBQ2pCO0FBRUEsUUFBTUssdUJBQXVCQSxNQUFNO0FBQ2pDLFFBQUl0QyxhQUFhLE1BQU10QixXQUFXO0FBQ2hDQSxnQkFBVTZELFNBQVN2QyxVQUFVLEVBQUUsQ0FBQztBQUFBLElBQ2xDO0FBQ0FELG1CQUFlLEtBQUs7QUFBQSxFQUN0QjtBQUVBLFFBQU15QyxvQkFBb0JBLENBQUNSLE1BQU07QUFDL0IsUUFBSUEsRUFBRVMsUUFBUSxRQUFTSCxzQkFBcUI7QUFDNUMsUUFBSU4sRUFBRVMsUUFBUSxTQUFVMUMsZ0JBQWUsS0FBSztBQUFBLEVBQzlDO0FBRUEsU0FDRSx1QkFBQyxTQUFJLHdCQUFxQiw0QkFBMkIsd0JBQXFCLFFBQU8sV0FBVSw2Q0FBNEMsMkJBQXlCYix3QkFHOUo7QUFBQSwyQkFBQyxTQUFJLHdCQUFxQiw0QkFBMkIsd0JBQXFCLFFBQU8sV0FBVSx3RkFFeEZnQjtBQUFBQSxvQkFDRCx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxpREFBZ0QsT0FBTyxFQUFFd0MsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkMsV0FBVyw2QkFBNkJDLFVBQVUsUUFBUSxHQUNoUTtBQUFBLCtCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLGFBQVksa0JBQTNHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBNkc7QUFBQSxRQUM3Ryx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxVQUMzRjtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FBTSx3QkFBcUI7QUFBQSxjQUE2Qix3QkFBcUI7QUFBQSxjQUNoRixLQUFLOUI7QUFBQUEsY0FDTCxPQUFPWDtBQUFBQSxjQUNQLFVBQVUsQ0FBQzRCLE1BQU0zQixhQUFhMkIsRUFBRUUsT0FBT0MsTUFBTUMsUUFBUSxPQUFPLEVBQUUsRUFBRUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLGNBQzVFLFFBQVEsTUFBTTtBQUFDLG9CQUFJakMsY0FBYyxNQUFNMUIsV0FBVztBQUFDLHdCQUFNb0UsVUFBVSxFQUFFLEdBQUc3RSxZQUFZbUQsTUFBTW1CLFNBQVNuQyxXQUFXLEVBQUUsRUFBRTtBQUFFMUIsNEJBQVUsTUFBTW9FLE9BQU87QUFBQSxnQkFBRTtBQUFDM0MsK0JBQWUsS0FBSztBQUFBLGNBQUU7QUFBQSxjQUNwSyxXQUFXLENBQUM2QixNQUFNO0FBQUMsb0JBQUlBLEVBQUVTLFFBQVEsU0FBUztBQUFDLHNCQUFJckMsY0FBYyxNQUFNMUIsV0FBVztBQUFDLDBCQUFNb0UsVUFBVSxFQUFFLEdBQUc3RSxZQUFZbUQsTUFBTW1CLFNBQVNuQyxXQUFXLEVBQUUsRUFBRTtBQUFFMUIsOEJBQVUsTUFBTW9FLE9BQU87QUFBQSxrQkFBRTtBQUFDM0MsaUNBQWUsS0FBSztBQUFBLGdCQUFFO0FBQUMsb0JBQUk2QixFQUFFUyxRQUFRLFNBQVV0QyxnQkFBZSxLQUFLO0FBQUEsY0FBRTtBQUFBLGNBQy9PLFdBQVU7QUFBQSxjQUNWLE9BQU8sRUFBRTRDLE9BQU8sV0FBV0MsWUFBWSxhQUFhQyxlQUFlLFNBQVM7QUFBQSxjQUM1RSxXQUFXO0FBQUEsY0FDWCxXQUFVO0FBQUE7QUFBQSxZQVRSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVNpQjtBQUFBLFVBRWpCLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHVCQUFzQixPQUFPLEVBQUVGLE9BQU8sVUFBVSxHQUFHLHdCQUFoSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3SjtBQUFBLGFBWjFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFhQTtBQUFBLFdBZko7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWdCRSxJQUVGLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTLE1BQU07QUFBQyxZQUFJLENBQUMzRCxRQUFTO0FBQU9pQixxQkFBYXlCLE9BQU9WLElBQUksQ0FBQztBQUFFakIsdUJBQWUsSUFBSTtBQUFBLE1BQUUsR0FBRyxXQUFVLHNEQUFxRCxPQUFPZixVQUFVLGtDQUFrQyxJQUM1UixpQ0FBQyxnQkFBYSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLE1BQUssTUFBSyxPQUFPZ0MsS0FBSzhCLGVBQWUsR0FBRyxPQUFNLFFBQU8sT0FBTSxhQUF2SjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWdLLEtBRHBLO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFRTtBQUFBLE1BSUQ1QyxjQUNELHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGlEQUFnRCxPQUFPLEVBQUVvQyxZQUFZLFdBQVdDLFFBQVEscUJBQXFCQyxXQUFXLDZCQUE2QkMsVUFBVSxRQUFRLEdBQ2hRO0FBQUEsK0JBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBWSxrQkFBM0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE2RztBQUFBLFFBQzdHLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLFVBQzNGO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFNLHdCQUFxQjtBQUFBLGNBQTZCLHdCQUFxQjtBQUFBLGNBQ2hGLEtBQUs3QjtBQUFBQSxjQUNMLE9BQU9SO0FBQUFBLGNBQ1AsVUFBVSxDQUFDd0IsTUFBTXZCLGFBQWF1QixFQUFFRSxPQUFPQyxNQUFNQyxRQUFRLE9BQU8sRUFBRSxFQUFFQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsY0FDNUUsUUFBUSxNQUFNO0FBQUMsb0JBQUk3QixjQUFjLE1BQU05QixXQUFXO0FBQUMsd0JBQU1vRSxVQUFVLEVBQUUsR0FBRzdFLFlBQVlvRCxNQUFNa0IsU0FBUy9CLFdBQVcsRUFBRSxFQUFFO0FBQUU5Qiw0QkFBVSxNQUFNb0UsT0FBTztBQUFBLGdCQUFFO0FBQUN2QywrQkFBZSxLQUFLO0FBQUEsY0FBRTtBQUFBLGNBQ3BLLFdBQVcsQ0FBQ3lCLE1BQU07QUFBQyxvQkFBSUEsRUFBRVMsUUFBUSxTQUFTO0FBQUMsc0JBQUlqQyxjQUFjLE1BQU05QixXQUFXO0FBQUMsMEJBQU1vRSxVQUFVLEVBQUUsR0FBRzdFLFlBQVlvRCxNQUFNa0IsU0FBUy9CLFdBQVcsRUFBRSxFQUFFO0FBQUU5Qiw4QkFBVSxNQUFNb0UsT0FBTztBQUFBLGtCQUFFO0FBQUN2QyxpQ0FBZSxLQUFLO0FBQUEsZ0JBQUU7QUFBQyxvQkFBSXlCLEVBQUVTLFFBQVEsU0FBVWxDLGdCQUFlLEtBQUs7QUFBQSxjQUFFO0FBQUEsY0FDL08sV0FBVTtBQUFBLGNBQ1YsT0FBTyxFQUFFd0MsT0FBTyxXQUFXQyxZQUFZLGFBQWFDLGVBQWUsU0FBUztBQUFBLGNBQzVFLFdBQVc7QUFBQSxjQUNYLFdBQVU7QUFBQTtBQUFBLFlBVFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBU2lCO0FBQUEsVUFFakIsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsdUJBQXNCLE9BQU8sRUFBRUYsT0FBTyxVQUFVLEdBQUcsd0JBQWhKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdKO0FBQUEsYUFaMUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWFBO0FBQUEsV0FmSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZ0JFLElBRUYsdUJBQUMsWUFBTyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFNBQVMsTUFBTTtBQUFDLFlBQUksQ0FBQzNELFFBQVM7QUFBT3FCLHFCQUFhcUIsT0FBT1QsSUFBSSxDQUFDO0FBQUVkLHVCQUFlLElBQUk7QUFBQSxNQUFFLEdBQUcsV0FBVSxzREFBcUQsT0FBT25CLFVBQVUsa0NBQWtDLElBQzVSLGlDQUFDLGdCQUFhLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sTUFBSyxNQUFLLE9BQU9pQyxLQUFLNkIsZUFBZSxHQUFHLE9BQU0sUUFBTyxPQUFNLGFBQXZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBZ0ssS0FEcEs7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVFO0FBQUEsTUFJRHhDLGdCQUNELHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGlEQUFnRCxPQUFPLEVBQUVnQyxZQUFZLFdBQVdDLFFBQVEscUJBQXFCQyxXQUFXLDZCQUE2QkMsVUFBVSxRQUFRLEdBQ2hRO0FBQUEsK0JBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBWSxrQkFBM0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE2RztBQUFBLFFBQzdHLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLFVBQzNGO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFNLHdCQUFxQjtBQUFBLGNBQTZCLHdCQUFxQjtBQUFBLGNBQ2hGLEtBQUs1QjtBQUFBQSxjQUNMLE9BQU9MO0FBQUFBLGNBQ1AsVUFBVSxDQUFDb0IsTUFBTW5CLGVBQWVtQixFQUFFRSxPQUFPQyxNQUFNQyxRQUFRLE9BQU8sRUFBRSxFQUFFQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsY0FDOUUsUUFBUSxNQUFNO0FBQUMsb0JBQUl6QixnQkFBZ0IsTUFBTWxDLFdBQVc7QUFBQyx3QkFBTW9FLFVBQVUsRUFBRSxHQUFHN0UsWUFBWXNELGFBQWFnQixTQUFTM0IsYUFBYSxFQUFFLEVBQUU7QUFBRWxDLDRCQUFVLE1BQU1vRSxPQUFPO0FBQUEsZ0JBQUU7QUFBQ25DLGlDQUFpQixLQUFLO0FBQUEsY0FBRTtBQUFBLGNBQ2pMLFdBQVcsQ0FBQ3FCLE1BQU07QUFBQyxvQkFBSUEsRUFBRVMsUUFBUSxTQUFTO0FBQUMsc0JBQUk3QixnQkFBZ0IsTUFBTWxDLFdBQVc7QUFBQywwQkFBTW9FLFVBQVUsRUFBRSxHQUFHN0UsWUFBWXNELGFBQWFnQixTQUFTM0IsYUFBYSxFQUFFLEVBQUU7QUFBRWxDLDhCQUFVLE1BQU1vRSxPQUFPO0FBQUEsa0JBQUU7QUFBQ25DLG1DQUFpQixLQUFLO0FBQUEsZ0JBQUU7QUFBQyxvQkFBSXFCLEVBQUVTLFFBQVEsU0FBVTlCLGtCQUFpQixLQUFLO0FBQUEsY0FBRTtBQUFBLGNBQzlQLFdBQVU7QUFBQSxjQUNWLE9BQU8sRUFBRW9DLE9BQU8sV0FBV0MsWUFBWSxhQUFhQyxlQUFlLFNBQVM7QUFBQSxjQUM1RSxXQUFXO0FBQUEsY0FDWCxXQUFVO0FBQUE7QUFBQSxZQVRSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVNpQjtBQUFBLFVBRWpCLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHVCQUFzQixPQUFPLEVBQUVGLE9BQU8sVUFBVSxHQUFHLHdCQUFoSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3SjtBQUFBLGFBWjFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFhQTtBQUFBLFdBZko7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWdCRSxJQUVGLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTLE1BQU07QUFBQyxZQUFJLENBQUMzRCxRQUFTO0FBQU95Qix1QkFBZWlCLE9BQU9SLE1BQU0sQ0FBQztBQUFFWCx5QkFBaUIsSUFBSTtBQUFBLE1BQUUsR0FBRyxXQUFVLHNEQUFxRCxPQUFPdkIsVUFBVSxvQ0FBb0MsSUFDcFMsaUNBQUMsZ0JBQWEsd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxNQUFLLE1BQUssT0FBT2tDLE9BQU80QixlQUFlLEdBQUcsT0FBTSxVQUFTLE9BQU0sYUFBM0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFvSyxLQUR4SztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUU7QUFBQSxNQUdGLHVCQUFDLFNBQUksd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLCtDQUE4QyxPQUFPLEVBQUVSLFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNEJBQTRCLEdBQzVPO0FBQUEsK0JBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsYUFBWSxrQkFBM0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE2RztBQUFBLFFBQzdHLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFDMUU7QUFBQSxpQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSx5QkFBd0IsT0FBTyxFQUFFRyxPQUFPLFVBQVUsR0FBRyx5QkFBbEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMko7QUFBQSxVQUMzSix1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSw2QkFBNEIsT0FBTyxFQUFFQSxPQUFPLFVBQVUsR0FBRyw4QkFBMkIsV0FBVSwyQkFBeUI3RCx3QkFBd0I7QUFBQTtBQUFBLFlBQU91QztBQUFBQSxlQUFuUDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyUDtBQUFBLGFBRjdQO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFdBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQU1BO0FBQUEsU0FsRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW1GQTtBQUFBLElBR0EsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsOENBQ3pGM0Isd0JBQ0QsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsaURBQWdELE9BQU8sRUFBRTRDLFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNkJBQTZCQyxVQUFVLFFBQVEsR0FDaFE7QUFBQSw2QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxhQUFZLGtCQUEzRztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTZHO0FBQUEsTUFDN0csdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsVUFDM0Y7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQU0sd0JBQXFCO0FBQUEsWUFBNkIsd0JBQXFCO0FBQUEsWUFDaEYsS0FBSy9CO0FBQUFBLFlBQ0wsT0FBT2Q7QUFBQUEsWUFDUCxVQUFVK0I7QUFBQUEsWUFDVixRQUFRTztBQUFBQSxZQUNSLFdBQVdFO0FBQUFBLFlBQ1gsV0FBVTtBQUFBLFlBQ1YsT0FBTyxFQUFFTyxPQUFPLFdBQVdDLFlBQVksYUFBYUMsZUFBZSxTQUFTO0FBQUEsWUFDNUUsV0FBVztBQUFBLFlBQ1gsV0FBVTtBQUFBO0FBQUEsVUFUUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFTaUI7QUFBQSxRQUVqQix1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSx1QkFBc0IsT0FBTyxFQUFFRixPQUFPLFVBQVUsR0FBRyx3QkFBaEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF3SjtBQUFBLFdBWjFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFhQTtBQUFBLFNBZko7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdCRSxJQUVGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFBTyx3QkFBcUI7QUFBQSxRQUE2Qix3QkFBcUI7QUFBQSxRQUMvRSxTQUFTbEI7QUFBQUEsUUFDVCxXQUFVO0FBQUEsUUFDVixPQUFPekMsVUFBVSxrQ0FBa0M7QUFBQSxRQUUvQztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQUksd0JBQXFCO0FBQUEsWUFBNkIsd0JBQXFCO0FBQUEsWUFDOUUsV0FBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLGNBQ0xzRCxZQUFZO0FBQUEsY0FDWkMsUUFBUSxhQUFhdkQsVUFBVSxZQUFZLFNBQVM7QUFBQSxjQUNwRHdELFdBQVc7QUFBQSxjQUNYQyxVQUFVO0FBQUEsWUFDWjtBQUFBLFlBRUk7QUFBQSxxQ0FBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxhQUFZLGtCQUEzRztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE2RztBQUFBLGNBQzdHLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLFVBQzNGO0FBQUEsdUNBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsMENBQXlDLE9BQU8sRUFBRUUsT0FBTzNELFVBQVUsWUFBWSxXQUFXNEQsWUFBWSxhQUFhQyxlQUFlLFNBQVMsR0FDck96QixlQUFLMEIsZUFBZSxLQUR2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsdUJBQXNCLE9BQU8sRUFBRUgsT0FBTzNELFVBQVUsWUFBWSxVQUFVLEdBQ2hLQSxvQkFBVSxlQUFlLFVBRDVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU9BO0FBQUE7QUFBQTtBQUFBLFVBakJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQWtCQTtBQUFBO0FBQUEsTUF2Qko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBd0JFLEtBNUNKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0E4Q0E7QUFBQSxJQUdBLHVCQUFDLFNBQUksd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLDJEQUMxRjtBQUFBLDZCQUFDLGFBQVUsd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxNQUFLLE1BQUssT0FBTSxZQUFXLFNBQVNoQixrQkFBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUEySTtBQUFBLE1BQzFJRyxxQkFDRDtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQU8sd0JBQXFCO0FBQUEsVUFBNkIsd0JBQXFCO0FBQUEsVUFDL0UsU0FBU0M7QUFBQUEsVUFDVCxXQUFVO0FBQUEsVUFDVixPQUFPLEVBQUVrRSxZQUFZLFdBQVdDLFFBQVEscUJBQXFCQyxXQUFXLDRCQUE0QjtBQUFBLFVBRWhHO0FBQUEsbUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsWUFBVyxrQkFBMUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBNEc7QUFBQSxZQUM1Ryx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxnQ0FBK0IsT0FBTyxFQUFFRyxPQUFPLFVBQVUsR0FBRyx1QkFBMUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBaUs7QUFBQTtBQUFBO0FBQUEsUUFOcks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BT0U7QUFBQSxNQUVEM0QsV0FDRDtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQVcsd0JBQXFCO0FBQUEsVUFBNkIsd0JBQXFCO0FBQUEsVUFDbkY7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUE7QUFBQSxRQVJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVF5QztBQUFBLFNBckIzQztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBd0JBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxzRUFDMUY7QUFBQSw2QkFBQyxhQUFVLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sTUFBSyxNQUFLLE9BQU0sU0FBUSxTQUFTZixlQUF6SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXFJO0FBQUEsTUFDckksdUJBQUMsYUFBVSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLE1BQUssTUFBSyxPQUFNLFFBQU8sU0FBU0YsY0FBeEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFtSTtBQUFBLE1BRW5JLHVCQUFDLFNBQUksd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLFlBQzFGO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFPLHdCQUFxQjtBQUFBLFlBQTZCLHdCQUFxQjtBQUFBLFlBQy9FLFNBQVMsTUFBTW9CLGdCQUFnQixDQUFDNEQsTUFBTSxDQUFDQSxDQUFDO0FBQUEsWUFDeEMsV0FBVTtBQUFBLFlBQ1YsT0FBTyxFQUFFVCxZQUFZLG1CQUFtQkMsUUFBUSxpQkFBaUI7QUFBQSxZQUNqRSxPQUFNO0FBQUEsWUFFSixpQ0FBQyxZQUFTLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sTUFBTSxJQUFJLFdBQVUsa0JBQWlCLE9BQU8sRUFBRVMsV0FBVzlELGVBQWUsa0JBQWtCLFFBQVErRCxZQUFZLGlCQUFpQixLQUF2TjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5TjtBQUFBO0FBQUEsVUFOM047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUdDL0QsZ0JBQ0Q7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFJLHdCQUFxQjtBQUFBLFlBQTZCLHdCQUFxQjtBQUFBLFlBQzVFLFdBQVU7QUFBQSxZQUNWLE9BQU8sRUFBRW9ELFlBQVksV0FBV0MsUUFBUSxrQkFBa0JDLFdBQVcsNkJBQTZCO0FBQUEsWUFFOUY7QUFBQSxxQ0FBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSw2Q0FBNEMsd0JBQTFJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtKO0FBQUEsY0FDbEosdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUscUNBQzNGO0FBQUEsdUNBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUMxRTtBQUFBLHlDQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLDhCQUE2Qix3QkFBM0g7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBbUk7QUFBQSxrQkFDbEl4RCxXQUFXLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLHVDQUFzQyxzQkFBcEk7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBMEk7QUFBQSxxQkFGeEo7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHQTtBQUFBLGdCQUVBO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUFPLHdCQUFxQjtBQUFBLG9CQUE2Qix3QkFBcUI7QUFBQSxvQkFDakYsU0FBU3VDO0FBQUFBLG9CQUNULFdBQVU7QUFBQSxvQkFDVixPQUFPLEVBQUVlLFlBQVl0RCxVQUFVLFlBQVksVUFBVTtBQUFBLG9CQUVqRDtBQUFBLHNCQUFDO0FBQUE7QUFBQSx3QkFBSSx3QkFBcUI7QUFBQSx3QkFBNkIsd0JBQXFCO0FBQUEsd0JBQzlFLFdBQVU7QUFBQSx3QkFDVixPQUFPLEVBQUVrRSxNQUFNbEUsVUFBVSxTQUFTLE9BQU9pRSxZQUFZLFlBQVk7QUFBQTtBQUFBLHNCQUYvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBRWlFO0FBQUE7QUFBQSxrQkFQbkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQVNBO0FBQUEsbUJBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFnQkE7QUFBQTtBQUFBO0FBQUEsVUFyQko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBc0JFO0FBQUEsV0FsQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9DQTtBQUFBLFNBeENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5Q0E7QUFBQSxJQUdDN0Qsc0JBQ0QsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUseUVBQXdFLE9BQU8sRUFBRWtELFlBQVksa0JBQWtCLEdBQ3ZNLGlDQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLHVCQUFzQixPQUFPLEVBQUVBLFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNkJBQTZCLEdBQ3ROO0FBQUEsNkJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsK0NBQThDLHdCQUE1STtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW9KO0FBQUEsTUFDcEosdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsbUNBQWtDLDBDQUFoSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTBKO0FBQUEsTUFDMUo7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUFNLHdCQUFxQjtBQUFBLFVBQTZCLHdCQUFxQjtBQUFBLFVBQ2hGO0FBQUEsVUFDQSxNQUFLO0FBQUEsVUFDTCxPQUFPbEQ7QUFBQUEsVUFDUCxVQUFVLENBQUNzQyxNQUFNO0FBQUNyQyx3QkFBWXFDLEVBQUVFLE9BQU9DLE1BQU1FLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBRXhDLDZCQUFpQixLQUFLO0FBQUEsVUFBRTtBQUFBLFVBQ25GLFdBQVcsQ0FBQ21DLE1BQU07QUFBQyxnQkFBSUEsRUFBRVMsUUFBUSxRQUFTYixzQkFBcUI7QUFBRSxnQkFBSUksRUFBRVMsUUFBUSxTQUFVaEQsdUJBQXNCLEtBQUs7QUFBQSxVQUFFO0FBQUEsVUFDdEgsV0FBVTtBQUFBLFVBQ1YsT0FBTyxFQUFFaUQsWUFBWSxXQUFXQyxRQUFRLGFBQWEvQyxnQkFBZ0IsWUFBWSxTQUFTLElBQUltRCxPQUFPLFVBQVU7QUFBQSxVQUMvRyxhQUFZO0FBQUE7QUFBQSxRQVJWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVFrQjtBQUFBLE1BRWpCbkQsaUJBQWlCLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsU0FBUSxXQUFVLHFDQUFvQyxrQ0FBbEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFvSjtBQUFBLE1BQ3RLLHVCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGNBQzNGO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUFPLHdCQUFxQjtBQUFBLFlBQTZCLHdCQUFxQjtBQUFBLFlBQ2pGLFNBQVMsTUFBTUgsc0JBQXNCLEtBQUs7QUFBQSxZQUMxQyxXQUFVO0FBQUEsWUFDVixPQUFPLEVBQUVpRCxZQUFZLFdBQVdDLFFBQVEsaUJBQWlCO0FBQUEsWUFBRTtBQUFBO0FBQUEsVUFIekQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFBTyx3QkFBcUI7QUFBQSxZQUE2Qix3QkFBcUI7QUFBQSxZQUNqRixTQUFTZjtBQUFBQSxZQUNULFdBQVU7QUFBQSxZQUNWLE9BQU8sRUFBRWMsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkksT0FBTyxPQUFPO0FBQUEsWUFBRTtBQUFBO0FBQUEsVUFIM0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxXQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFlQTtBQUFBLFNBN0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0E4QkEsS0EvQko7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdDRTtBQUFBLE9BbFBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FxUEE7QUFFSjtBQUFDNUQsR0E5VXVCbkIsS0FBRztBQUFBLEtBQUhBO0FBZ1Z4QixTQUFTdUYsV0FBVyxFQUFFOUUsU0FBU0UsbUJBQW1CSSx1QkFBdUJDLDJCQUEyQkoscUJBQXFCQyxtQkFBbUJDLGtCQUFrQkcsb0JBQW9CLEdBQUc7QUFBQXVFLE1BQUE7QUFDbkwsUUFBTSxDQUFDQyxVQUFVQyxXQUFXLElBQUloRyxTQUFTLElBQUk7QUFFN0MsUUFBTWlHLFNBQVNBLENBQUNDLFNBQVNGLFlBQVksQ0FBQ0csU0FBU0EsU0FBU0QsT0FBTyxPQUFPQSxJQUFJO0FBQzFFLFFBQU1FLFFBQVFBLE1BQU1KLFlBQVksSUFBSTtBQUVwQyxTQUNFLG1DQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUFPLHdCQUFxQjtBQUFBLFFBQTRCLHdCQUFxQjtBQUFBLFFBQzlFLFNBQVNqRjtBQUFBQSxRQUNULFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRWlFLFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNEJBQTRCO0FBQUEsUUFFbEc7QUFBQSxpQ0FBQyxVQUFLLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFNBQVEsV0FBVSxZQUFXLGtCQUF6RztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyRztBQUFBLFVBQzNHLHVCQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUVHLE9BQU8sVUFBVSxHQUFHLHFCQUF6SjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE4SjtBQUFBO0FBQUE7QUFBQSxNQU5oSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPQTtBQUFBLElBR0EsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsWUFDMUY7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQU8sd0JBQXFCO0FBQUEsVUFBNEIsd0JBQXFCO0FBQUEsVUFDOUUsU0FBUyxNQUFNWSxPQUFPLFdBQVc7QUFBQSxVQUNqQyxXQUFVO0FBQUEsVUFDVixPQUFPLEVBQUVqQixZQUFZLFdBQVdDLFFBQVEsYUFBYWMsYUFBYSxjQUFjLFlBQVksU0FBUyxJQUFJYixXQUFXLDRCQUE0QjtBQUFBLFVBRTlJO0FBQUEsbUNBQUMsVUFBSyx3QkFBcUIsOEJBQTZCLHdCQUFxQixTQUFRLFdBQVUsV0FBVSxtQkFBekc7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBNEc7QUFBQSxZQUM1Ryx1QkFBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxnQ0FBK0IsT0FBTyxFQUFFRyxPQUFPLFVBQVUsR0FBRyx5QkFBMUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUs7QUFBQTtBQUFBO0FBQUEsUUFOcks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BT0E7QUFBQSxNQUNDVSxhQUFhLGVBQ2QsdUJBQUMsU0FBSSx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFdBQVUsaURBQWdELE9BQU8sRUFBRWYsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkMsV0FBVyw4QkFBOEJDLFVBQVUsSUFBSSxHQUM3UDtBQUFBLCtCQUFDLFNBQUksd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLG1FQUFrRSxPQUFPLEVBQUVrQixhQUFhLFVBQVUsR0FBRyx5QkFBbE07QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEyTTtBQUFBLFFBQzNNLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTLE1BQU07QUFBQ3BGLDRCQUFrQjtBQUFFbUYsZ0JBQU07QUFBQSxRQUFFLEdBQUcsV0FBVSw2RkFBNEYseUNBQTNPO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBb1E7QUFBQSxRQUNwUSx1QkFBQyxZQUFPLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sU0FBUyxNQUFNO0FBQUM5RSxvQ0FBMEI7QUFBRThFLGdCQUFNO0FBQUEsUUFBRSxHQUFHLFdBQVUsNkZBQTRGLGdEQUFuUDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW1SO0FBQUEsV0FIdlI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlFO0FBQUEsU0FkSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBZ0JBO0FBQUEsSUFHQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQU8sd0JBQXFCO0FBQUEsUUFBNEIsd0JBQXFCO0FBQUEsUUFDOUUsU0FBU2xGO0FBQUFBLFFBQ1QsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFOEQsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkMsV0FBVyw0QkFBNEI7QUFBQSxRQUVsRztBQUFBLGlDQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsU0FBUSxXQUFVLFlBQVcsa0JBQXpHO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJHO0FBQUEsVUFDM0csdUJBQUMsVUFBSyx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsZ0NBQStCLE9BQU8sRUFBRUcsT0FBTyxVQUFVLEdBQUcsd0JBQXpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWlLO0FBQUE7QUFBQTtBQUFBLE1BTm5LO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9BO0FBQUEsSUFHQSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxZQUMxRjtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFBTyx3QkFBcUI7QUFBQSxVQUE0Qix3QkFBcUI7QUFBQSxVQUM5RSxTQUFTLE1BQU1ZLE9BQU8sUUFBUTtBQUFBLFVBQzlCLFdBQVU7QUFBQSxVQUNWLE9BQU8sRUFBRWpCLFlBQVksV0FBV0MsUUFBUSxhQUFhYyxhQUFhLFdBQVcsWUFBWSxTQUFTLElBQUliLFdBQVcsNEJBQTRCO0FBQUEsVUFFM0k7QUFBQSxtQ0FBQyxVQUFLLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFNBQVEsV0FBVSxXQUFVLGtCQUF6RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEyRztBQUFBLFlBQzNHLHVCQUFDLFVBQUssd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUVHLE9BQU8sVUFBVSxHQUFHLHNCQUExSjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFnSztBQUFBO0FBQUE7QUFBQSxRQU5sSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFPQTtBQUFBLE1BQ0NVLGFBQWEsWUFDZCx1QkFBQyxTQUFJLHdCQUFxQiw4QkFBNkIsd0JBQXFCLFFBQU8sV0FBVSxpREFBZ0QsT0FBTyxFQUFFZixZQUFZLFdBQVdDLFFBQVEscUJBQXFCQyxXQUFXLDhCQUE4QkMsVUFBVSxJQUFJLEdBQzdQO0FBQUEsK0JBQUMsWUFBTyx3QkFBcUIsOEJBQTZCLHdCQUFxQixRQUFPLFNBQVMsTUFBTTtBQUFDaEUsNEJBQWtCO0FBQUVpRixnQkFBTTtBQUFBLFFBQUUsR0FBRyxXQUFVLDZGQUE0Riw4QkFBM087QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF5UDtBQUFBLFFBQ3pQLHVCQUFDLFlBQU8sd0JBQXFCLDhCQUE2Qix3QkFBcUIsUUFBTyxTQUFTLE1BQU07QUFBQ2hGLDJCQUFpQjtBQUFFZ0YsZ0JBQU07QUFBQSxRQUFFLEdBQUcsV0FBVSw2RkFBNEYsOEJBQTFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBd1A7QUFBQSxXQUY1UDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBR0U7QUFBQSxTQWJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FlQTtBQUFBLElBR0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUFPLHdCQUFxQjtBQUFBLFFBQTRCLHdCQUFxQjtBQUFBLFFBQzlFLFNBQVM3RTtBQUFBQSxRQUNULFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRXlELFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNEJBQTRCO0FBQUEsUUFFbEc7QUFBQSxpQ0FBQyxVQUFLLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFNBQVEsV0FBVSxXQUFVLGtCQUF4RztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEwRztBQUFBLFVBQzFHLHVCQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUVHLE9BQU8sVUFBVSxHQUFHLG9CQUF6SjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE2SjtBQUFBO0FBQUE7QUFBQSxNQU4vSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPQTtBQUFBLElBRUEsdUJBQUMsd0JBQXFCLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFdBQTVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBbUc7QUFBQSxPQW5Fckc7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQW9FQTtBQUVKO0FBQUNTLElBN0VRRCxZQUFVO0FBQUEsTUFBVkE7QUErRVQsU0FBU1MsdUJBQXVCO0FBQUFDLE1BQUE7QUFDOUIsUUFBTSxDQUFDQyxTQUFTQyxVQUFVLElBQUl6RyxTQUFTLEtBQUs7QUFDNUMsUUFBTSxDQUFDMEcsYUFBYUMsY0FBYyxJQUFJM0csU0FBUyxLQUFLO0FBQ3BELFFBQU0sQ0FBQzRHLFVBQVVDLFdBQVcsSUFBSTdHLFNBQVMsRUFBRTtBQUUzQyxRQUFNOEcsZ0JBQWdCLFlBQVk7QUFDaENMLGVBQVcsS0FBSztBQUNoQkUsbUJBQWUsSUFBSTtBQUNuQkUsZ0JBQVksYUFBYTtBQUN6QixVQUFNekcsbUJBQW1CLENBQUMyRyxRQUFRO0FBQ2hDLFVBQUlBLElBQUtGLGFBQVlFLEdBQUc7QUFBQSxXQUN4QjtBQUFDSix1QkFBZSxLQUFLO0FBQUVFLG9CQUFZLEVBQUU7QUFBQSxNQUFFO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJSCxhQUFhO0FBQ2YsV0FDRTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQUksd0JBQXFCO0FBQUEsUUFBNEIsd0JBQXFCO0FBQUEsUUFBTyxXQUFVO0FBQUEsUUFDNUYsT0FBTyxFQUFFMUIsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkMsV0FBVyw0QkFBNEI7QUFBQSxRQUNsRztBQUFBLGlDQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsU0FBUSxXQUFVLHdCQUF1QixrQkFBckg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBdUg7QUFBQSxVQUN2SCx1QkFBQyxVQUFLLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSx5REFBd0QsT0FBTyxFQUFFRyxPQUFPLFVBQVUsR0FBRyw4QkFBMkIsWUFBWXVCLHNCQUF6TjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFrTztBQUFBO0FBQUE7QUFBQSxNQUhwTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJQTtBQUFBLEVBRUo7QUFFQSxNQUFJSixTQUFTO0FBQ1gsV0FDRTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQUksd0JBQXFCO0FBQUEsUUFBNEIsd0JBQXFCO0FBQUEsUUFBTyxXQUFVO0FBQUEsUUFDNUYsT0FBTyxFQUFFeEIsWUFBWSxXQUFXQyxRQUFRLHFCQUFxQkMsV0FBVyw0QkFBNEI7QUFBQSxRQUNsRztBQUFBLGlDQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLHFDQUFvQyxPQUFPLEVBQUVHLE9BQU8sVUFBVSxHQUFHO0FBQUE7QUFBQSxZQUFRLHVCQUFDLFFBQUcsd0JBQXFCLDhCQUE2Qix3QkFBcUIsV0FBM0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBa0Y7QUFBQSxZQUFHO0FBQUEsZUFBM1A7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBa1E7QUFBQSxVQUNsUSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxjQUMxRjtBQUFBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQU8sd0JBQXFCO0FBQUEsZ0JBQTZCLHdCQUFxQjtBQUFBLGdCQUFPLFNBQVN5QjtBQUFBQSxnQkFDL0YsV0FBVTtBQUFBLGdCQUNWLE9BQU8sRUFBRTlCLFlBQVksV0FBV0ssT0FBTyxRQUFRSixRQUFRLG9CQUFvQjtBQUFBLGdCQUFHO0FBQUE7QUFBQSxjQUY5RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFFaUY7QUFBQSxZQUNqRjtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUFPLHdCQUFxQjtBQUFBLGdCQUE2Qix3QkFBcUI7QUFBQSxnQkFBTyxTQUFTLE1BQU13QixXQUFXLEtBQUs7QUFBQSxnQkFDckgsV0FBVTtBQUFBLGdCQUNWLE9BQU8sRUFBRXpCLFlBQVksV0FBV0ssT0FBTyxXQUFXSixRQUFRLG9CQUFvQjtBQUFBLGdCQUFHO0FBQUE7QUFBQSxjQUZqRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFFbUY7QUFBQSxlQU5yRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU9BO0FBQUE7QUFBQTtBQUFBLE1BVkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBV0E7QUFBQSxFQUVKO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQU8sd0JBQXFCO0FBQUEsTUFBNEIsd0JBQXFCO0FBQUEsTUFBTyxTQUFTLE1BQU13QixXQUFXLElBQUk7QUFBQSxNQUNuSCxXQUFVO0FBQUEsTUFDVixPQUFPLEVBQUV6QixZQUFZLFdBQVdDLFFBQVEscUJBQXFCQyxXQUFXLDRCQUE0QjtBQUFBLE1BQ2xHO0FBQUEsK0JBQUMsVUFBSyx3QkFBcUIsNkJBQTRCLHdCQUFxQixTQUFRLFdBQVUsV0FBVSxrQkFBeEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEwRztBQUFBLFFBQzFHLHVCQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUVHLE9BQU8sVUFBVSxHQUFHLHNCQUF6SjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQStKO0FBQUE7QUFBQTtBQUFBLElBSmpLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBO0FBRUo7QUFBQ2tCLElBbERRRCxzQkFBb0I7QUFBQSxNQUFwQkE7QUFvRFQsU0FBU1UsYUFBYSxFQUFFQyxNQUFNeEMsT0FBT3lDLE9BQU83QixPQUFPLDJCQUEyQjdELHVCQUF1QixHQUFHO0FBQ3RHLFNBQ0UsdUJBQUMsU0FBSSx3QkFBcUIsNkJBQTRCLHdCQUFxQixRQUFPLFdBQVUsbURBQWtELE9BQU8sRUFBRXdELFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNkJBQTZCQyxVQUFVLFFBQVEsR0FBRywyQkFBeUIzRCx3QkFDL1I7QUFBQSwyQkFBQyxVQUFLLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxhQUFZLDhCQUEyQixRQUFPLDJCQUF5QkEsd0JBQXlCeUYsa0JBQTdMO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBa007QUFBQSxJQUNsTSx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSxVQUMxRjtBQUFBLDZCQUFDLFNBQUksd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLDBDQUF5QyxPQUFPLEVBQUU1QixNQUFNLEdBQUcsOEJBQTJCLFNBQVEsMkJBQXlCN0Qsd0JBQXlCaUQsbUJBQTVPO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBa1A7QUFBQSxNQUNsUCx1QkFBQyxTQUFJLHdCQUFxQiw2QkFBNEIsd0JBQXFCLFFBQU8sV0FBVSx1QkFBc0IsT0FBTyxFQUFFWSxPQUFPLFVBQVUsR0FBRyw4QkFBMkIsU0FBUSwyQkFBeUI3RCx3QkFBeUIwRixtQkFBcE87QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUEwTztBQUFBLFNBRjVPO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FHQTtBQUFBLE9BTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU1BO0FBRUo7QUFBQ0MsTUFWUUg7QUFZVCxTQUFTSSxVQUFVLEVBQUVILE1BQU1DLE9BQU9HLFNBQVMsMkJBQTJCN0YsdUJBQXVCLEdBQUc7QUFDOUYsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQU8sd0JBQXFCO0FBQUEsTUFBNEIsd0JBQXFCO0FBQUEsTUFDOUU7QUFBQSxNQUNBLFdBQVU7QUFBQSxNQUNWLE9BQU8sRUFBRXdELFlBQVksV0FBV0MsUUFBUSxxQkFBcUJDLFdBQVcsNEJBQTRCO0FBQUEsTUFBRywyQkFBeUIxRDtBQUFBQSxNQUU5SDtBQUFBLCtCQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLFlBQVcsOEJBQTJCLFFBQU8sMkJBQXlCQSx3QkFBeUJ5RixrQkFBNUw7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpTTtBQUFBLFFBQ2pNLHVCQUFDLFVBQUssd0JBQXFCLDZCQUE0Qix3QkFBcUIsUUFBTyxXQUFVLGdDQUErQixPQUFPLEVBQUU1QixPQUFPLFVBQVUsR0FBRyw4QkFBMkIsU0FBUSwyQkFBeUI3RCx3QkFBeUIwRixtQkFBOU87QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFvUDtBQUFBO0FBQUE7QUFBQSxJQU50UDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQTtBQUVKO0FBQUNJLE1BWFFGO0FBQVMsSUFBQUcsSUFBQUMsS0FBQUMsS0FBQU4sS0FBQUc7QUFBQSxhQUFBQyxJQUFBO0FBQUEsYUFBQUMsS0FBQTtBQUFBLGFBQUFDLEtBQUE7QUFBQSxhQUFBTixLQUFBO0FBQUEsYUFBQUcsS0FBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJTZXR0aW5ncyIsImRvd25sb2FkU291cmNlQ29kZSIsIkRFVl9QQVNTQ09ERSIsIkhVRCIsInBsYXllckJhc2UiLCJ0b3duSGFsbExldmVsIiwib25PcGVuU2hvcCIsIm9uT3BlbkR1bmdlb25zIiwib25PcGVuQWx0YXIiLCJvbk9wZW5HZW1TaG9wIiwic2hvd0NvbGxlY3RCdXR0b24iLCJvbkNvbGxlY3QiLCJvblJlc2V0Iiwib25TZXRHZW1zIiwib25PcGVuUGl4ZWxFZGl0b3IiLCJvbk9wZW5EdW5nZW9uRWRpdG9yIiwib25PcGVuSGVyb0NyZWF0b3IiLCJvbk9wZW5IZXJvRWRpdG9yIiwib25PcGVuV2FsbExheWVyRWRpdG9yIiwib25PcGVuQnVpbGRpbmdTdGF0c0VkaXRvciIsIm9uT3BlbkRvY3VtZW50YXRpb24iLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwiX3MiLCJkZXZNb2RlIiwic2V0RGV2TW9kZSIsInNob3dTZXR0aW5ncyIsInNldFNob3dTZXR0aW5ncyIsInNob3dQYXNzY29kZVByb21wdCIsInNldFNob3dQYXNzY29kZVByb21wdCIsInBhc3Njb2RlIiwic2V0UGFzc2NvZGUiLCJwYXNzY29kZUVycm9yIiwic2V0UGFzc2NvZGVFcnJvciIsImVkaXRpbmdHZW1zIiwic2V0RWRpdGluZ0dlbXMiLCJnZW1JbnB1dCIsInNldEdlbUlucHV0IiwiZWRpdGluZ0dvbGQiLCJzZXRFZGl0aW5nR29sZCIsImdvbGRJbnB1dCIsInNldEdvbGRJbnB1dCIsImVkaXRpbmdNYW5hIiwic2V0RWRpdGluZ01hbmEiLCJtYW5hSW5wdXQiLCJzZXRNYW5hSW5wdXQiLCJlZGl0aW5nU2hhcmRzIiwic2V0RWRpdGluZ1NoYXJkcyIsInNoYXJkc0lucHV0Iiwic2V0U2hhcmRzSW5wdXQiLCJnZW1JbnB1dFJlZiIsImdvbGRJbnB1dFJlZiIsIm1hbmFJbnB1dFJlZiIsInNoYXJkc0lucHV0UmVmIiwiY3VycmVudCIsImZvY3VzIiwiZ29sZCIsIm1hbmEiLCJzaGFyZHMiLCJzb3VsX3NoYXJkcyIsImdlbXMiLCJ0aExldmVsIiwidG93bl9oYWxsX2xldmVsIiwiaGFuZGxlRGV2VG9nZ2xlIiwiaGFuZGxlUGFzc2NvZGVTdWJtaXQiLCJoYW5kbGVHZW1DbGljayIsIlN0cmluZyIsImhhbmRsZUdlbUlucHV0Q2hhbmdlIiwiZSIsInZhbCIsInRhcmdldCIsInZhbHVlIiwicmVwbGFjZSIsInNsaWNlIiwiaGFuZGxlR2VtSW5wdXRDb21taXQiLCJwYXJzZUludCIsImhhbmRsZUdlbUlucHV0S2V5Iiwia2V5IiwiYmFja2dyb3VuZCIsImJvcmRlciIsImJveFNoYWRvdyIsIm1pbldpZHRoIiwidXBkYXRlZCIsImNvbG9yIiwiZm9udEZhbWlseSIsImxldHRlclNwYWNpbmciLCJ0b0xvY2FsZVN0cmluZyIsInMiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwibGVmdCIsIkRldlRvb2xiYXIiLCJfczIiLCJvcGVuTWVudSIsInNldE9wZW5NZW51IiwidG9nZ2xlIiwibWVudSIsInByZXYiLCJjbG9zZSIsImJvcmRlckNvbG9yIiwiRG93bmxvYWRTb3VyY2VCdXR0b24iLCJfczMiLCJjb25maXJtIiwic2V0Q29uZmlybSIsImRvd25sb2FkaW5nIiwic2V0RG93bmxvYWRpbmciLCJwcm9ncmVzcyIsInNldFByb2dyZXNzIiwiaGFuZGxlQ29uZmlybSIsIm1zZyIsIlJlc291cmNlUGlsbCIsImljb24iLCJsYWJlbCIsIl9jNCIsIk5hdkJ1dHRvbiIsIm9uQ2xpY2siLCJfYzUiLCJfYyIsIl9jMiIsIl9jMyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIVUQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgZG93bmxvYWRTb3VyY2VDb2RlIH0gZnJvbSBcIkAvbGliL2Rvd25sb2FkU291cmNlQ29kZVwiO1xuXG5cbmNvbnN0IERFVl9QQVNTQ09ERSA9IFwiMDA3MzQyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhVRCh7IHBsYXllckJhc2UsIHRvd25IYWxsTGV2ZWwsIG9uT3BlblNob3AsIG9uT3BlbkR1bmdlb25zLCBvbk9wZW5BbHRhciwgb25PcGVuR2VtU2hvcCwgc2hvd0NvbGxlY3RCdXR0b24sIG9uQ29sbGVjdCwgb25SZXNldCwgb25TZXRHZW1zLCBvbk9wZW5QaXhlbEVkaXRvciwgb25PcGVuRHVuZ2VvbkVkaXRvciwgb25PcGVuSGVyb0NyZWF0b3IsIG9uT3Blbkhlcm9FZGl0b3IsIG9uT3BlbldhbGxMYXllckVkaXRvciwgb25PcGVuQnVpbGRpbmdTdGF0c0VkaXRvciwgb25PcGVuRG9jdW1lbnRhdGlvbiwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgY29uc3QgW2Rldk1vZGUsIHNldERldk1vZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1NldHRpbmdzLCBzZXRTaG93U2V0dGluZ3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1Bhc3Njb2RlUHJvbXB0LCBzZXRTaG93UGFzc2NvZGVQcm9tcHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFzc2NvZGUsIHNldFBhc3Njb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcGFzc2NvZGVFcnJvciwgc2V0UGFzc2NvZGVFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlZGl0aW5nR2Vtcywgc2V0RWRpdGluZ0dlbXNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ2VtSW5wdXQsIHNldEdlbUlucHV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZWRpdGluZ0dvbGQsIHNldEVkaXRpbmdHb2xkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dvbGRJbnB1dCwgc2V0R29sZElucHV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZWRpdGluZ01hbmEsIHNldEVkaXRpbmdNYW5hXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21hbmFJbnB1dCwgc2V0TWFuYUlucHV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZWRpdGluZ1NoYXJkcywgc2V0RWRpdGluZ1NoYXJkc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaGFyZHNJbnB1dCwgc2V0U2hhcmRzSW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGdlbUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBnb2xkSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IG1hbmFJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgc2hhcmRzSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZWRpdGluZ0dlbXMgJiYgZ2VtSW5wdXRSZWYuY3VycmVudCkgZ2VtSW5wdXRSZWYuY3VycmVudC5mb2N1cygpO1xuICAgIGlmIChlZGl0aW5nR29sZCAmJiBnb2xkSW5wdXRSZWYuY3VycmVudCkgZ29sZElucHV0UmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICBpZiAoZWRpdGluZ01hbmEgJiYgbWFuYUlucHV0UmVmLmN1cnJlbnQpIG1hbmFJbnB1dFJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgaWYgKGVkaXRpbmdTaGFyZHMgJiYgc2hhcmRzSW5wdXRSZWYuY3VycmVudCkgc2hhcmRzSW5wdXRSZWYuY3VycmVudC5mb2N1cygpO1xuICB9LCBbZWRpdGluZ0dlbXMsIGVkaXRpbmdHb2xkLCBlZGl0aW5nTWFuYSwgZWRpdGluZ1NoYXJkc10pO1xuXG4gIGlmICghcGxheWVyQmFzZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZ29sZCA9IHBsYXllckJhc2UuZ29sZCA/PyAwO1xuICBjb25zdCBtYW5hID0gcGxheWVyQmFzZS5tYW5hID8/IDA7XG4gIGNvbnN0IHNoYXJkcyA9IHBsYXllckJhc2Uuc291bF9zaGFyZHMgPz8gMDtcbiAgY29uc3QgZ2VtcyA9IHBsYXllckJhc2UuZ2VtcyA/PyAwO1xuICBjb25zdCB0aExldmVsID0gdG93bkhhbGxMZXZlbCA/PyBwbGF5ZXJCYXNlLnRvd25faGFsbF9sZXZlbCA/PyAxO1xuXG4gIGNvbnN0IGhhbmRsZURldlRvZ2dsZSA9ICgpID0+IHtcbiAgICBpZiAoZGV2TW9kZSkge1xuICAgICAgLy8gVHVybiBvZmYgZGV2IG1vZGUgaW1tZWRpYXRlbHlcbiAgICAgIHNldERldk1vZGUoZmFsc2UpO1xuICAgICAgc2V0U2hvd1NldHRpbmdzKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUHJvbXB0IGZvciBwYXNzY29kZVxuICAgICAgc2V0UGFzc2NvZGUoXCJcIik7XG4gICAgICBzZXRQYXNzY29kZUVycm9yKGZhbHNlKTtcbiAgICAgIHNldFNob3dQYXNzY29kZVByb21wdCh0cnVlKTtcbiAgICAgIHNldFNob3dTZXR0aW5ncyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBhc3Njb2RlU3VibWl0ID0gKCkgPT4ge1xuICAgIGlmIChwYXNzY29kZSA9PT0gREVWX1BBU1NDT0RFKSB7XG4gICAgICBzZXREZXZNb2RlKHRydWUpO1xuICAgICAgc2V0U2hvd1Bhc3Njb2RlUHJvbXB0KGZhbHNlKTtcbiAgICAgIHNldFBhc3Njb2RlKFwiXCIpO1xuICAgICAgc2V0UGFzc2NvZGVFcnJvcihmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFBhc3Njb2RlRXJyb3IodHJ1ZSk7XG4gICAgICBzZXRQYXNzY29kZShcIlwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2VtQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCFkZXZNb2RlKSB7XG4gICAgICBvbk9wZW5HZW1TaG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldEdlbUlucHV0KFN0cmluZyhnZW1zKSk7XG4gICAgc2V0RWRpdGluZ0dlbXModHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2VtSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKS5zbGljZSgwLCAxMCk7XG4gICAgc2V0R2VtSW5wdXQodmFsKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHZW1JbnB1dENvbW1pdCA9ICgpID0+IHtcbiAgICBpZiAoZ2VtSW5wdXQgIT09IFwiXCIgJiYgb25TZXRHZW1zKSB7XG4gICAgICBvblNldEdlbXMocGFyc2VJbnQoZ2VtSW5wdXQsIDEwKSk7XG4gICAgfVxuICAgIHNldEVkaXRpbmdHZW1zKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHZW1JbnB1dEtleSA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIGhhbmRsZUdlbUlucHV0Q29tbWl0KCk7XG4gICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRFZGl0aW5nR2VtcyhmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo5NTo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIHotMzBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG5cbiAgICAgIHsvKiBUb3AgQ2VudGVyIOKAlCBSZXNvdXJjZXMgKyBUSCBMZXZlbCAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjk4OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgICAgey8qIEdvbGQgKi99XG4gICAgICAgIHtlZGl0aW5nR29sZCA/XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjEwMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2M0YTQ3YVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNmYmJmMjRcIiwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiwgbWluV2lkdGg6IFwiMTMwcHhcIiB9fT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxMDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1iYXNlXCI+8J+SsDwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjEwMzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjEwNDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICByZWY9e2dvbGRJbnB1dFJlZn1cbiAgICAgICAgICAgIHZhbHVlPXtnb2xkSW5wdXR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEdvbGRJbnB1dChlLnRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIikuc2xpY2UoMCwgMTApKX1cbiAgICAgICAgICAgIG9uQmx1cj17KCkgPT4ge2lmIChnb2xkSW5wdXQgIT09IFwiXCIgJiYgb25TZXRHZW1zKSB7Y29uc3QgdXBkYXRlZCA9IHsgLi4ucGxheWVyQmFzZSwgZ29sZDogcGFyc2VJbnQoZ29sZElucHV0LCAxMCkgfTtvblNldEdlbXMobnVsbCwgdXBkYXRlZCk7fXNldEVkaXRpbmdHb2xkKGZhbHNlKTt9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge2lmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7aWYgKGdvbGRJbnB1dCAhPT0gXCJcIiAmJiBvblNldEdlbXMpIHtjb25zdCB1cGRhdGVkID0geyAuLi5wbGF5ZXJCYXNlLCBnb2xkOiBwYXJzZUludChnb2xkSW5wdXQsIDEwKSB9O29uU2V0R2VtcyhudWxsLCB1cGRhdGVkKTt9c2V0RWRpdGluZ0dvbGQoZmFsc2UpO31pZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHNldEVkaXRpbmdHb2xkKGZhbHNlKTt9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgdy1mdWxsIGZvbnQtdWkgZm9udC1ib2xkIHRleHQtc20gdGFidWxhci1udW1zIG91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCIjYzg4NjBhXCIsIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsIGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCIgfX1cbiAgICAgICAgICAgIG1heExlbmd0aD17MTB9XG4gICAgICAgICAgICBpbnB1dE1vZGU9XCJudW1lcmljXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxMTU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19PkRFViBFRElUPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjExOToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtpZiAoIWRldk1vZGUpIHJldHVybjtzZXRHb2xkSW5wdXQoU3RyaW5nKGdvbGQpKTtzZXRFZGl0aW5nR29sZCh0cnVlKTt9fSBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciBob3ZlcjpvcGFjaXR5LTkwIHRyYW5zaXRpb24tb3BhY2l0eVwiIHRpdGxlPXtkZXZNb2RlID8gXCJDbGljayB0byBlZGl0IGdvbGQgKGRldiBtb2RlKVwiIDogXCJcIn0+XG4gICAgICAgICAgICA8UmVzb3VyY2VQaWxsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxMjA6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBpY29uPVwi8J+SsFwiIHZhbHVlPXtnb2xkLnRvTG9jYWxlU3RyaW5nKCl9IGxhYmVsPVwiR29sZFwiIGNvbG9yPVwiI2M4ODYwYVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH1cblxuICAgICAgICB7LyogTWFuYSAqL31cbiAgICAgICAge2VkaXRpbmdNYW5hID9cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTI2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjYzRhNDdhXCIsIGJvcmRlcjogXCIycHggc29saWQgIzYwYTVmYVwiLCBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC40KVwiLCBtaW5XaWR0aDogXCIxMzBweFwiIH19PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjEyNzoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2VcIj7wn5S3PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTI4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTI5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIHJlZj17bWFuYUlucHV0UmVmfVxuICAgICAgICAgICAgdmFsdWU9e21hbmFJbnB1dH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TWFuYUlucHV0KGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKS5zbGljZSgwLCAxMCkpfVxuICAgICAgICAgICAgb25CbHVyPXsoKSA9PiB7aWYgKG1hbmFJbnB1dCAhPT0gXCJcIiAmJiBvblNldEdlbXMpIHtjb25zdCB1cGRhdGVkID0geyAuLi5wbGF5ZXJCYXNlLCBtYW5hOiBwYXJzZUludChtYW5hSW5wdXQsIDEwKSB9O29uU2V0R2VtcyhudWxsLCB1cGRhdGVkKTt9c2V0RWRpdGluZ01hbmEoZmFsc2UpO319XG4gICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7aWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtpZiAobWFuYUlucHV0ICE9PSBcIlwiICYmIG9uU2V0R2Vtcykge2NvbnN0IHVwZGF0ZWQgPSB7IC4uLnBsYXllckJhc2UsIG1hbmE6IHBhcnNlSW50KG1hbmFJbnB1dCwgMTApIH07b25TZXRHZW1zKG51bGwsIHVwZGF0ZWQpO31zZXRFZGl0aW5nTWFuYShmYWxzZSk7fWlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgc2V0RWRpdGluZ01hbmEoZmFsc2UpO319XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCB3LWZ1bGwgZm9udC11aSBmb250LWJvbGQgdGV4dC1zbSB0YWJ1bGFyLW51bXMgb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcIiM0YTkwZDlcIiwgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIiwgbGV0dGVyU3BhY2luZzogXCItMC41cHhcIiB9fVxuICAgICAgICAgICAgbWF4TGVuZ3RoPXsxMH1cbiAgICAgICAgICAgIGlucHV0TW9kZT1cIm51bWVyaWNcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE0MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+REVWIEVESVQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PiA6XG5cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTQ0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge2lmICghZGV2TW9kZSkgcmV0dXJuO3NldE1hbmFJbnB1dChTdHJpbmcobWFuYSkpO3NldEVkaXRpbmdNYW5hKHRydWUpO319IGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIGhvdmVyOm9wYWNpdHktOTAgdHJhbnNpdGlvbi1vcGFjaXR5XCIgdGl0bGU9e2Rldk1vZGUgPyBcIkNsaWNrIHRvIGVkaXQgbWFuYSAoZGV2IG1vZGUpXCIgOiBcIlwifT5cbiAgICAgICAgICAgIDxSZXNvdXJjZVBpbGwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE0NToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGljb249XCLwn5S3XCIgdmFsdWU9e21hbmEudG9Mb2NhbGVTdHJpbmcoKX0gbGFiZWw9XCJNYW5hXCIgY29sb3I9XCIjNGE5MGQ5XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuXG4gICAgICAgIHsvKiBTaGFyZHMgKi99XG4gICAgICAgIHtlZGl0aW5nU2hhcmRzID9cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTUxOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjYzRhNDdhXCIsIGJvcmRlcjogXCIycHggc29saWQgI2MwODRmY1wiLCBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC40KVwiLCBtaW5XaWR0aDogXCIxMzBweFwiIH19PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE1MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2VcIj7wn5KcPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTUzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTU0OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIHJlZj17c2hhcmRzSW5wdXRSZWZ9XG4gICAgICAgICAgICB2YWx1ZT17c2hhcmRzSW5wdXR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNoYXJkc0lucHV0KGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKS5zbGljZSgwLCAxMCkpfVxuICAgICAgICAgICAgb25CbHVyPXsoKSA9PiB7aWYgKHNoYXJkc0lucHV0ICE9PSBcIlwiICYmIG9uU2V0R2Vtcykge2NvbnN0IHVwZGF0ZWQgPSB7IC4uLnBsYXllckJhc2UsIHNvdWxfc2hhcmRzOiBwYXJzZUludChzaGFyZHNJbnB1dCwgMTApIH07b25TZXRHZW1zKG51bGwsIHVwZGF0ZWQpO31zZXRFZGl0aW5nU2hhcmRzKGZhbHNlKTt9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge2lmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7aWYgKHNoYXJkc0lucHV0ICE9PSBcIlwiICYmIG9uU2V0R2Vtcykge2NvbnN0IHVwZGF0ZWQgPSB7IC4uLnBsYXllckJhc2UsIHNvdWxfc2hhcmRzOiBwYXJzZUludChzaGFyZHNJbnB1dCwgMTApIH07b25TZXRHZW1zKG51bGwsIHVwZGF0ZWQpO31zZXRFZGl0aW5nU2hhcmRzKGZhbHNlKTt9aWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSBzZXRFZGl0aW5nU2hhcmRzKGZhbHNlKTt9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgdy1mdWxsIGZvbnQtdWkgZm9udC1ib2xkIHRleHQtc20gdGFidWxhci1udW1zIG91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCIjOWI1ZGQ0XCIsIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsIGxldHRlclNwYWNpbmc6IFwiLTAuNXB4XCIgfX1cbiAgICAgICAgICAgIG1heExlbmd0aD17MTB9XG4gICAgICAgICAgICBpbnB1dE1vZGU9XCJudW1lcmljXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxNjU6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19PkRFViBFRElUPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4gOlxuXG4gICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE2OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHtpZiAoIWRldk1vZGUpIHJldHVybjtzZXRTaGFyZHNJbnB1dChTdHJpbmcoc2hhcmRzKSk7c2V0RWRpdGluZ1NoYXJkcyh0cnVlKTt9fSBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciBob3ZlcjpvcGFjaXR5LTkwIHRyYW5zaXRpb24tb3BhY2l0eVwiIHRpdGxlPXtkZXZNb2RlID8gXCJDbGljayB0byBlZGl0IHNoYXJkcyAoZGV2IG1vZGUpXCIgOiBcIlwifT5cbiAgICAgICAgICAgIDxSZXNvdXJjZVBpbGwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE3MDoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGljb249XCLwn5KcXCIgdmFsdWU9e3NoYXJkcy50b0xvY2FsZVN0cmluZygpfSBsYWJlbD1cIlNoYXJkc1wiIGNvbG9yPVwiIzliNWRkNFwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH1cblxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxNzQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMS41IHJvdW5kZWRcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNjNGE0N2FcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjNmIzZjFmXCIsIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIgfX0+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE3NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2VcIj7wn4+wPC9zcGFuPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE3NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTc3OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19PlRPV04gSEFMTDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MTc4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSBmb250LWJvbGQgdGV4dC1zbVwiIHN0eWxlPXt7IGNvbG9yOiBcIiMzZDFmMDVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRoTGV2ZWxcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+TGV2ZWwge3RoTGV2ZWx9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUb3AgUmlnaHQg4oCUIEdlbXMgKGVkaXRhYmxlIGluIGRldiBtb2RlKSAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE4NDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtNCBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgIHtlZGl0aW5nR2VtcyA/XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE4NjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBhMWEyYVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICNhODU1ZjdcIiwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiwgbWluV2lkdGg6IFwiMTQwcHhcIiB9fT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoxODc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC1iYXNlXCI+8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE4ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjE4OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICByZWY9e2dlbUlucHV0UmVmfVxuICAgICAgICAgICAgdmFsdWU9e2dlbUlucHV0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUdlbUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgb25CbHVyPXtoYW5kbGVHZW1JbnB1dENvbW1pdH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlR2VtSW5wdXRLZXl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCB3LWZ1bGwgZm9udC11aSBmb250LWJvbGQgdGV4dC1zbSB0YWJ1bGFyLW51bXMgb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcIiNjMDg0ZmNcIiwgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIiwgbGV0dGVyU3BhY2luZzogXCItMC41cHhcIiB9fVxuICAgICAgICAgICAgbWF4TGVuZ3RoPXsxMH1cbiAgICAgICAgICAgIGlucHV0TW9kZT1cIm51bWVyaWNcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjIwMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1bMTBweF1cIiBzdHlsZT17eyBjb2xvcjogXCIjYTg1NWY3XCIgfX0+REVWIEVESVQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PiA6XG5cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjA0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17aGFuZGxlR2VtQ2xpY2t9XG4gICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIGhvdmVyOm9wYWNpdHktOTAgdHJhbnNpdGlvbi1vcGFjaXR5XCJcbiAgICAgICAgdGl0bGU9e2Rldk1vZGUgPyBcIkNsaWNrIHRvIGVkaXQgZ2VtcyAoZGV2IG1vZGUpXCIgOiBcIk9wZW4gR2VtIFNob3BcIn0+XG4gICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoyMDk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiIzBhMWEyYVwiLFxuICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7ZGV2TW9kZSA/IFwiI2E4NTVmN1wiIDogXCIjMjU2M2ViXCJ9YCxcbiAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIsXG4gICAgICAgICAgICBtaW5XaWR0aDogXCIxNDBweFwiXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjIxODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2VcIj7wn5KOPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoyMTk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoyMjA6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXVpIGZvbnQtYm9sZCB0ZXh0LXNtIHRhYnVsYXItbnVtc1wiIHN0eWxlPXt7IGNvbG9yOiBkZXZNb2RlID8gXCIjYzA4NGZjXCIgOiBcIiM2MGE1ZmFcIiwgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIiwgbGV0dGVyU3BhY2luZzogXCItMC41cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgIHtnZW1zLnRvTG9jYWxlU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjIzOjE2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XVwiIHN0eWxlPXt7IGNvbG9yOiBkZXZNb2RlID8gXCIjYTg1NWY3XCIgOiBcIiMzYjgyZjZcIiB9fT5cbiAgICAgICAgICAgICAgICAgIHtkZXZNb2RlID8gXCJHZW1zIChERVYpXCIgOiBcIkdlbXNcIn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBCb3R0b20gTGVmdCDigJQgRHVuZ2VvbnMgKyBDb2xsZWN0ICsgUmVzZXQgKG9ubHkgaW4gZGV2IG1vZGUpICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjMzOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNCBsZWZ0LTQgZmxleCBnYXAtMiBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgIDxOYXZCdXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjIzNDo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIuKalO+4j1wiIGxhYmVsPVwiRHVuZ2VvbnNcIiBvbkNsaWNrPXtvbk9wZW5EdW5nZW9uc30gLz5cbiAgICAgICAge3Nob3dDb2xsZWN0QnV0dG9uICYmXG4gICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjIzNjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ29sbGVjdH1cbiAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MCBhY3RpdmU6c2NhbGUtOTUgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzRhZGU4MFwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICMxNjY1MzRcIiwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiB9fT5cbiAgICAgICAgICBcbiAgICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoyNDE6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5OmPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI0MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjMTY2NTM0XCIgfX0+Q09MTEVDVDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgICB7ZGV2TW9kZSAmJlxuICAgICAgICA8RGV2VG9vbGJhciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjQ2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgb25SZXNldD17b25SZXNldH1cbiAgICAgICAgb25PcGVuUGl4ZWxFZGl0b3I9e29uT3BlblBpeGVsRWRpdG9yfVxuICAgICAgICBvbk9wZW5XYWxsTGF5ZXJFZGl0b3I9e29uT3BlbldhbGxMYXllckVkaXRvcn1cbiAgICAgICAgb25PcGVuQnVpbGRpbmdTdGF0c0VkaXRvcj17b25PcGVuQnVpbGRpbmdTdGF0c0VkaXRvcn1cbiAgICAgICAgb25PcGVuRHVuZ2VvbkVkaXRvcj17b25PcGVuRHVuZ2VvbkVkaXRvcn1cbiAgICAgICAgb25PcGVuSGVyb0NyZWF0b3I9e29uT3Blbkhlcm9DcmVhdG9yfVxuICAgICAgICBvbk9wZW5IZXJvRWRpdG9yPXtvbk9wZW5IZXJvRWRpdG9yfVxuICAgICAgICBvbk9wZW5Eb2N1bWVudGF0aW9uPXtvbk9wZW5Eb2N1bWVudGF0aW9ufSAvPlxuXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQm90dG9tIFJpZ2h0IOKAlCBBbHRhciArIFNob3AgKyBTZXR0aW5ncyAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI2MDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgcmlnaHQtNCBmbGV4IGdhcC0yIHBvaW50ZXItZXZlbnRzLWF1dG8gaXRlbXMtZW5kXCI+XG4gICAgICAgIDxOYXZCdXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI2MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIvCflK5cIiBsYWJlbD1cIkFsdGFyXCIgb25DbGljaz17b25PcGVuQWx0YXJ9IC8+XG4gICAgICAgIDxOYXZCdXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI2Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgaWNvbj1cIvCfm5JcIiBsYWJlbD1cIlNob3BcIiBvbkNsaWNrPXtvbk9wZW5TaG9wfSAvPlxuICAgICAgICB7LyogU2V0dGluZ3MgZ2VhciAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjY0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI2NToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1NldHRpbmdzKChzKSA9PiAhcyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy04IGgtOCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS04MFwiXG4gICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNSlcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNDQ0XCIgfX1cbiAgICAgICAgICB0aXRsZT1cIlNldHRpbmdzXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxTZXR0aW5ncyBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjcxOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgc2l6ZT17MTR9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCIgc3R5bGU9e3sgdHJhbnNmb3JtOiBzaG93U2V0dGluZ3MgPyBcInJvdGF0ZSg0NWRlZylcIiA6IFwibm9uZVwiLCB0cmFuc2l0aW9uOiBcInRyYW5zZm9ybSAwLjJzXCIgfX0gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBTZXR0aW5ncyBkcm9wZG93biAqL31cbiAgICAgICAgICB7c2hvd1NldHRpbmdzICYmXG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6Mjc2OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMTAgcmlnaHQtMCByb3VuZGVkLWxnIHAtMyB3LTUyXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxYTFhMmVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMzMzXCIsIGJveFNoYWRvdzogXCIwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC43KVwiIH19PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI4MDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgbWItMlwiPlNFVFRJTkdTPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI4MToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI4MjoxNlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjgzOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbSB0ZXh0LXdoaXRlXCI+RGV2IE1vZGU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtkZXZNb2RlICYmIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjI4NDozMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQtWzEwcHhdIHRleHQtcHVycGxlLTQwMFwiPkFjdGl2ZTwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7LyogVG9nZ2xlIHN3aXRjaCAqL31cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDoyODc6MTZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZXZUb2dnbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMTAgaC01IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IGRldk1vZGUgPyBcIiNhODU1ZjdcIiA6IFwiIzM3NDE1MVwiIH19PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MjkyOjE4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMC41IHctNCBoLTQgcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRyYW5zaXRpb24tdHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiBkZXZNb2RlID8gXCIyMnB4XCIgOiBcIjJweFwiLCB0cmFuc2l0aW9uOiBcImxlZnQgMC4yc1wiIH19IC8+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUGFzc2NvZGUgbW9kYWwgKi99XG4gICAgICB7c2hvd1Bhc3Njb2RlUHJvbXB0ICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMDU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtYXV0b1wiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjcpXCIgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzA2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicm91bmRlZC14bCBwLTYgdy03MlwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMWEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM0YzFkOTVcIiwgYm94U2hhZG93OiBcIjAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjgpXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMDc6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS00MDAgbWItMVwiPkRFViBNT0RFPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMDg6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXdoaXRlIHRleHQtc20gbWItNFwiPkVudGVyIHBhc3Njb2RlIHRvIGFjdGl2YXRlPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjMwOToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICB2YWx1ZT17cGFzc2NvZGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7c2V0UGFzc2NvZGUoZS50YXJnZXQudmFsdWUuc2xpY2UoMCwgMTApKTtzZXRQYXNzY29kZUVycm9yKGZhbHNlKTt9fVxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikgaGFuZGxlUGFzc2NvZGVTdWJtaXQoKTtpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHNldFNob3dQYXNzY29kZVByb21wdChmYWxzZSk7fX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlc3Qgb3V0bGluZS1ub25lIG1iLTJcIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBhMGExYVwiLCBib3JkZXI6IGAxcHggc29saWQgJHtwYXNzY29kZUVycm9yID8gXCIjZGMyNjI2XCIgOiBcIiM0YzFkOTVcIn1gLCBjb2xvcjogXCIjYzA4NGZjXCIgfX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIuKAouKAouKAouKAouKAouKAolwiIC8+XG4gICAgICAgICAgXG4gICAgICAgICAgICB7cGFzc2NvZGVFcnJvciAmJiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMTk6MzBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtcmVkLTQwMCBtYi0yXCI+SW5jb3JyZWN0IHBhc3Njb2RlPC9kaXY+fVxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzIwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMjE6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1Bhc3Njb2RlUHJvbXB0KGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNDAwXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzJhMmEzZVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMzMzNcIiB9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQ0FOQ0VMXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozMjg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUGFzc2NvZGVTdWJtaXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XVwiXG4gICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiM3YzNhZWRcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjYTg1NWY3XCIsIGNvbG9yOiBcIiNmZmZcIiB9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQ09ORklSTVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cblxuICAgIDwvZGl2Pik7XG5cbn1cblxuZnVuY3Rpb24gRGV2VG9vbGJhcih7IG9uUmVzZXQsIG9uT3BlblBpeGVsRWRpdG9yLCBvbk9wZW5XYWxsTGF5ZXJFZGl0b3IsIG9uT3BlbkJ1aWxkaW5nU3RhdHNFZGl0b3IsIG9uT3BlbkR1bmdlb25FZGl0b3IsIG9uT3Blbkhlcm9DcmVhdG9yLCBvbk9wZW5IZXJvRWRpdG9yLCBvbk9wZW5Eb2N1bWVudGF0aW9uIH0pIHtcbiAgY29uc3QgW29wZW5NZW51LCBzZXRPcGVuTWVudV0gPSB1c2VTdGF0ZShudWxsKTsgLy8gXCJidWlsZGluZ3NcIiB8IFwiaGVyb2VzXCIgfCBudWxsXG5cbiAgY29uc3QgdG9nZ2xlID0gKG1lbnUpID0+IHNldE9wZW5NZW51KChwcmV2KSA9PiBwcmV2ID09PSBtZW51ID8gbnVsbCA6IG1lbnUpO1xuICBjb25zdCBjbG9zZSA9ICgpID0+IHNldE9wZW5NZW51KG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjM1Mjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIG9uQ2xpY2s9e29uUmVzZXR9XG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweC00IHB5LTIgcm91bmRlZCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTkwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNkYzI2MjZcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjOTkxYjFiXCIsIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIgfX0+XG4gICAgICAgIFxuICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzU3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5SEPC9zcGFuPlxuICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzU4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gbXQtMC41XCIgc3R5bGU9e3sgY29sb3I6IFwiIzdmMWQxZFwiIH19PlJFU0VUPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHsvKiBCdWlsZGluZ3MgZHJvcGRvd24gKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozNjI6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjM2Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlKFwiYnVpbGRpbmdzXCIpfVxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgcm91bmRlZCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTkwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBhMGEyZVwiLCBib3JkZXI6IGAycHggc29saWQgJHtvcGVuTWVudSA9PT0gXCJidWlsZGluZ3NcIiA/IFwiI2E4NTVmN1wiIDogXCIjN2MzYWVkXCJ9YCwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiB9fT5cbiAgICAgICAgICBcbiAgICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzY4OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cInRleHQteGxcIj7wn4+X77iPPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozNjk6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzdweF0gbXQtMC41XCIgc3R5bGU9e3sgY29sb3I6IFwiI2E3OGJmYVwiIH19PkJVSUxESU5HUzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIHtvcGVuTWVudSA9PT0gXCJidWlsZGluZ3NcIiAmJlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozNzI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMTQgbGVmdC0wIHJvdW5kZWQtbGcgcC0xIHotNTBcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwYTBhMWVcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjNGMxZDk1XCIsIGJveFNoYWRvdzogXCIwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC44KVwiLCBtaW5XaWR0aDogMTgwIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzczOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQtcHVycGxlLTUwMCBweC0zIHB5LTEuNSBib3JkZXItYiBtYi0xXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwiIzJlMWU1ZVwiIH19PkJVSUxESU5HUzwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6Mzc0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge29uT3BlblBpeGVsRWRpdG9yKCk7Y2xvc2UoKTt9fSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHB4LTMgcHktMiByb3VuZGVkIGZvbnQtdWkgdGV4dC14cyBob3ZlcjpiZy1wdXJwbGUtOTAwLzMwIHRleHQtcHVycGxlLTMwMFwiPvCfjqggQnVpbGRpbmcgRGVzaWduIEVkaXRvcjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6Mzc1OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge29uT3BlbkJ1aWxkaW5nU3RhdHNFZGl0b3IoKTtjbG9zZSgpO319IGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtMyBweS0yIHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIGhvdmVyOmJnLXB1cnBsZS05MDAvMzAgdGV4dC1wdXJwbGUtMzAwXCI+8J+TiiBCdWlsZGluZyBTdGF0cyAoSFAvVGltZS9Db3N0KTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIER1bmdlb25zIGJ1dHRvbiAqL31cbiAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjM4MTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIG9uQ2xpY2s9e29uT3BlbkR1bmdlb25FZGl0b3J9XG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweC00IHB5LTIgcm91bmRlZCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTkwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiM3ZjFkMWRcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjZGMyNjI2XCIsIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIgfX0+XG4gICAgICAgIFxuICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6Mzg2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7impTvuI88L3NwYW4+XG4gICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozODc6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjZmNhNWE1XCIgfX0+RFVOR0VPTlM8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgey8qIEhlcm9lcyBkcm9wZG93biAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjM5MTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6MzkyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGUoXCJoZXJvZXNcIil9XG4gICAgICAgIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHB4LTMgcHktMiByb3VuZGVkIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOm9wYWNpdHktOTAgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMmExYTBhXCIsIGJvcmRlcjogYDJweCBzb2xpZCAke29wZW5NZW51ID09PSBcImhlcm9lc1wiID8gXCIjZmJiZjI0XCIgOiBcIiNmNTllMGJcIn1gLCBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC40KVwiIH19PlxuICAgICAgICAgIFxuICAgICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDozOTc6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bFwiPvCfprg8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjM5ODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjZjU5ZTBiXCIgfX0+SEVST0VTPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAge29wZW5NZW51ID09PSBcImhlcm9lc1wiICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjQwMToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0xNCBsZWZ0LTAgcm91bmRlZC1sZyBwLTEgei01MFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzFhMTIwNVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNiNDUzMDlcIiwgYm94U2hhZG93OiBcIjAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjgpXCIsIG1pbldpZHRoOiAxNDAgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0MDI6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXsoKSA9PiB7b25PcGVuSGVyb0NyZWF0b3IoKTtjbG9zZSgpO319IGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtMyBweS0yIHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIGhvdmVyOmJnLXllbGxvdy05MDAvMzAgdGV4dC15ZWxsb3ctMzAwXCI+8J+OqCBDcmVhdGUgSGVybzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDAzOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4ge29uT3Blbkhlcm9FZGl0b3IoKTtjbG9zZSgpO319IGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtMyBweS0yIHJvdW5kZWQgZm9udC11aSB0ZXh0LXhzIGhvdmVyOmJnLXllbGxvdy05MDAvMzAgdGV4dC15ZWxsb3ctMzAwXCI+4pyP77iPIEVkaXQgSGVyb2VzPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRG9jcyAqL31cbiAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjQwOTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIG9uQ2xpY2s9e29uT3BlbkRvY3VtZW50YXRpb259XG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgcm91bmRlZCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTkwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwYTFhMGFcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjMjJjNTVlXCIsIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIgfX0+XG4gICAgICAgIFxuICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDE0OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bFwiPvCfk4Q8L3NwYW4+XG4gICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0MTU6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjMjJjNTVlXCIgfX0+RE9DUzwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8RG93bmxvYWRTb3VyY2VCdXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjQxODo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+XG4gICAgPC8+KTtcblxufVxuXG5mdW5jdGlvbiBEb3dubG9hZFNvdXJjZUJ1dHRvbigpIHtcbiAgY29uc3QgW2NvbmZpcm0sIHNldENvbmZpcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZG93bmxvYWRpbmcsIHNldERvd25sb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2dyZXNzLCBzZXRQcm9ncmVzc10gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldENvbmZpcm0oZmFsc2UpO1xuICAgIHNldERvd25sb2FkaW5nKHRydWUpO1xuICAgIHNldFByb2dyZXNzKFwiU3RhcnRpbmcuLi5cIik7XG4gICAgYXdhaXQgZG93bmxvYWRTb3VyY2VDb2RlKChtc2cpID0+IHtcbiAgICAgIGlmIChtc2cpIHNldFByb2dyZXNzKG1zZyk7ZWxzZVxuICAgICAge3NldERvd25sb2FkaW5nKGZhbHNlKTtzZXRQcm9ncmVzcyhcIlwiKTt9XG4gICAgfSk7XG4gIH07XG5cbiAgaWYgKGRvd25sb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjQ0MDo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yIHJvdW5kZWRcIlxuICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGEwYTJlXCIsIGJvcmRlcjogXCIycHggc29saWQgIzNiODJmNlwiLCBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC40KVwiIH19PlxuICAgICAgICA8c3BhbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDQyOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidGV4dC14bCBhbmltYXRlLXNwaW5cIj7impnvuI88L3NwYW4+XG4gICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0NDM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bNnB4XSBtdC0wLjUgdGV4dC1jZW50ZXIgbWF4LXctWzYwcHhdXCIgc3R5bGU9e3sgY29sb3I6IFwiIzYwYTVmYVwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwicHJvZ3Jlc3NcIj57cHJvZ3Jlc3N9PC9zcGFuPlxuICAgICAgPC9kaXY+KTtcblxuICB9XG5cbiAgaWYgKGNvbmZpcm0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDUwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgcm91bmRlZCBnYXAtMVwiXG4gICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMxYTBhMGFcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjZWY0NDQ0XCIsIGJveFNoYWRvdzogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjQpXCIgfX0+XG4gICAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0NTI6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bNnB4XSB0ZXh0LWNlbnRlclwiIHN0eWxlPXt7IGNvbG9yOiBcIiNmY2E1YTVcIiB9fT5ET1dOTE9BRDxiciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDUyOjk3XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+U09VUkNFPzwvc3Bhbj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDUzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0xXCI+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDU0OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17aGFuZGxlQ29uZmlybX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bNnB4XVwiXG4gICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZWY0NDQ0XCIsIGNvbG9yOiBcIiNmZmZcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjYjkxYzFjXCIgfX0+WUVTPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDU3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbGljaz17KCkgPT4gc2V0Q29uZmlybShmYWxzZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzZweF1cIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzM3NDE1MVwiLCBjb2xvcjogXCIjOWNhM2FmXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzRiNTU2M1wiIH19Pk5PPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+KTtcblxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0NjY6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9eygpID0+IHNldENvbmZpcm0odHJ1ZSl9XG4gICAgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzBhMGEyZVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICMzYjgyZjZcIiwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiB9fT5cbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0Njk6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ0ZXh0LXhsXCI+8J+Svjwvc3Bhbj5cbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0NzA6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjNjBhNWZhXCIgfX0+U09VUkNFPC9zcGFuPlxuICAgIDwvYnV0dG9uPik7XG5cbn1cblxuZnVuY3Rpb24gUmVzb3VyY2VQaWxsKHsgaWNvbiwgdmFsdWUsIGxhYmVsLCBjb2xvciwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0Nzc6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMi41IHB5LTEuNSByb3VuZGVkXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjYzRhNDdhXCIsIGJvcmRlcjogXCIycHggc29saWQgIzZiM2YxZlwiLCBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC40KVwiLCBtaW5XaWR0aDogXCIxMzBweFwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT5cbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0Nzg6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtYmFzZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaWNvblwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57aWNvbn08L3NwYW4+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0Nzk6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0ODA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgZm9udC1ib2xkIHRleHQtc20gdGFidWxhci1udW1zXCIgc3R5bGU9e3sgY29sb3IgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ2YWx1ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57dmFsdWV9PC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvSFVEOjQ4MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XVwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxhYmVsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PntsYWJlbH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn1cblxuZnVuY3Rpb24gTmF2QnV0dG9uKHsgaWNvbiwgbGFiZWwsIG9uQ2xpY2ssIFwiZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWRcIjogX19kYXRhQ29sbGVjdGlvbkl0ZW1JZCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9IVUQ6NDg5OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2M0YTQ3YVwiLCBib3JkZXI6IFwiMnB4IHNvbGlkICM2YjNmMWZcIiwgYm94U2hhZG93OiBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLDAuNClcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICBcbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0OTQ6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtMnhsXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJpY29uXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PntpY29ufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0hVRDo0OTU6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bN3B4XSBtdC0wLjVcIiBzdHlsZT17eyBjb2xvcjogXCIjM2QxZjA1XCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJsYWJlbFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtfX2RhdGFDb2xsZWN0aW9uSXRlbUlkfT57bGFiZWx9PC9zcGFuPlxuICAgIDwvYnV0dG9uPik7XG5cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9IVUQuanN4In0=