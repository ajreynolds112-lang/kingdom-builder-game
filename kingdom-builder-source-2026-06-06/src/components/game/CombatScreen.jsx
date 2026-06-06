import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/game/CombatScreen.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/components/game/CombatScreen.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { runAutoBattleTick } from "/src/lib/gameEngine.js";
import { X, Play, Pause, Zap, Shield, Sword } from "/node_modules/.vite/deps/lucide-react.js?v=f1eca726";
export default function CombatScreen({ dungeon, heroes, troops, onClose, onVictory, onDefeat, id }) {
  _s();
  const [combatState, setCombatState] = useState(null);
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [controlledHero, setControlledHero] = useState(null);
  const [phase, setPhase] = useState(1);
  const [spellCooldown, setSpellCooldown] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const intervalRef = useRef(null);
  const logRef = useRef(null);
  const initCombat = useCallback(() => {
    const enemyCount = dungeon.enemies + (dungeon.boss ? 1 : 0);
    const enemyStates = [];
    for (let i = 0; i < dungeon.enemies; i++) {
      enemyStates.push({
        id: `enemy_${i}`,
        name: i === dungeon.enemies - 1 && dungeon.boss ? dungeon.bossName : `Enemy ${i + 1}`,
        hp: dungeon.boss && i === dungeon.enemies - 1 ? dungeon.bossHp : dungeon.hp,
        max_hp: dungeon.boss && i === dungeon.enemies - 1 ? dungeon.bossHp : dungeon.hp,
        attack: dungeon.atk,
        defense: Math.floor(dungeon.atk * 0.3),
        is_boss: dungeon.boss && i === dungeon.enemies - 1
      });
    }
    const heroStates = heroes.slice(0, 3).map((h) => ({ ...h, max_hp: h.max_hp || h.hp }));
    const troopStates = troops.map((t) => ({ ...t, max_hp: t.hp }));
    setCombatState({ heroStates, enemyStates, troopStates });
    setLog([{ type: "system", text: `Entering ${dungeon.name}...` }]);
  }, [dungeon, heroes, troops]);
  useEffect(() => {
    initCombat();
  }, [initCombat]);
  useEffect(() => {
    if (!isRunning || !combatState) return;
    intervalRef.current = setInterval(() => {
      setCombatState((prev) => {
        if (!prev) return prev;
        const result = runAutoBattleTick(prev.heroStates, prev.enemyStates, prev.troopStates);
        result.log.forEach((entry) => {
          if (entry.damage) {
            const id2 = Math.random().toString(36).slice(2);
            const side = entry.type?.includes("enemy") ? "right" : "left";
            setFloatingTexts((ft) => [...ft.slice(-8), { id: id2, text: `-${entry.damage}`, side }]);
            setTimeout(() => setFloatingTexts((ft) => ft.filter((f) => f.id !== id2)), 1200);
          }
        });
        setLog((l) => [...l.slice(-20), ...result.log.map((e) => ({
          type: e.type,
          text: formatLogEntry(e)
        }))]);
        if (result.victory) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setTimeout(() => onVictory(dungeon), 800);
        }
        if (result.defeat) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setTimeout(() => onDefeat(), 800);
        }
        return { heroStates: result.heroStates, enemyStates: result.enemyStates, troopStates: result.troopStates };
      });
    }, 800);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, dungeon, onVictory, onDefeat]);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);
  useEffect(() => {
    if (spellCooldown > 0) {
      const t = setTimeout(() => setSpellCooldown((cd) => cd - 1), 1e3);
      return () => clearTimeout(t);
    }
  }, [spellCooldown]);
  const castSpell = () => {
    if (spellCooldown > 0 || !combatState) return;
    setCombatState((prev) => {
      if (!prev) return prev;
      const enemies = prev.enemyStates.map((e, i) => {
        if (i === 0 && e.hp > 0) {
          const dmg = 80;
          return { ...e, hp: Math.max(0, e.hp - dmg) };
        }
        return e;
      });
      return { ...prev, enemyStates: enemies };
    });
    setLog((l) => [...l, { type: "spell", text: "✨ Magic spell unleashed! -80 damage!" }]);
    setSpellCooldown(8);
  };
  if (!combatState) return null;
  const aliveEnemies = combatState.enemyStates.filter((e) => e.hp > 0);
  const alliesAlive = combatState.heroStates.filter((h) => h.hp > 0).length + combatState.troopStates.reduce((s, t) => s + t.count, 0);
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:118:4", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex flex-col", style: { background: "linear-gradient(180deg, #0a0015 0%, #0d0d1a 50%, #0a0a0a 100%)" }, children: [
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:120:6", "data-dynamic-content": "true", className: "flex items-center justify-between px-4 py-2 border-b border-red-900/40", style: { background: "rgba(0,0,0,0.6)" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:121:8", "data-dynamic-content": "true", "data-collection-item-field": "boss", "data-collection-item-id": dungeon?.id || dungeon?._id, children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:122:10", "data-dynamic-content": "true", className: "font-pixel text-red-400 text-[9px]", "data-collection-item-field": "name", "data-collection-item-id": dungeon?.id || dungeon?._id, children: dungeon.name }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 141,
          columnNumber: 11
        }, this),
        dungeon.boss && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:123:27", "data-dynamic-content": "false", className: "font-ui text-xs text-red-300 animate-pulse", children: "⚠️ BOSS DUNGEON" }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 142,
          columnNumber: 28
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/CombatScreen:125:8", "data-dynamic-content": "true", onClick: onClose, className: "btn-rpg-red btn-rpg px-3 py-1 text-[8px] rounded", children: [
        /* @__PURE__ */ jsxDEV(X, { "data-source-location": "components/game/CombatScreen:126:10", "data-dynamic-content": "false", size: 12, className: "inline mr-1" }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        "FLEE"
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 144,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:131:6", "data-dynamic-content": "true", className: "flex-1 flex gap-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:133:8", "data-dynamic-content": "true", className: "flex-1 flex flex-col items-center justify-center gap-3 p-4 relative", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:134:10", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-red-400 mb-2", children: [
          "ENEMIES (",
          aliveEnemies.length,
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:135:10", "data-dynamic-content": "true", className: "space-y-2 w-full max-w-[240px]", children: combatState.enemyStates.slice(0, 5).map(
          (enemy) => /* @__PURE__ */ jsxDEV(
            CombatantBar,
            {
              "data-source-location": "components/game/CombatScreen:137:14",
              "data-dynamic-content": "true",
              name: enemy.name,
              hp: enemy.hp,
              maxHp: enemy.max_hp,
              isBoss: enemy.is_boss,
              side: "enemy",
              "data-collection-item-id": enemy?.id
            },
            enemy.id,
            false,
            {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 156,
              columnNumber: 13
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        floatingTexts.filter((f) => f.side === "right").map(
          (ft) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/CombatScreen:149:12",
              "data-dynamic-content": "true",
              className: "float-up absolute text-red-400 font-pixel text-[10px] pointer-events-none",
              style: { top: "40%", left: "60%" },
              "data-collection-item-id": ft?.id,
              "data-collection-item-field": "text",
              children: ft.text
            },
            ft.id,
            false,
            {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 168,
              columnNumber: 11
            },
            this
          )
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:157:8", "data-dynamic-content": "false", className: "flex flex-col items-center justify-center px-2", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:158:10", "data-dynamic-content": "false", className: "font-pixel text-yellow-600 text-[8px] writing-mode-vertical", children: "⚔️" }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 177,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:159:10", "data-dynamic-content": "false", className: "w-px flex-1 bg-gradient-to-b from-transparent via-yellow-800/40 to-transparent" }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 178,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 176,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:163:8", "data-dynamic-content": "true", className: "flex-1 flex flex-col items-center justify-center gap-3 p-4 relative", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:164:10", "data-dynamic-content": "true", className: "font-pixel text-[8px] text-green-400 mb-2", "data-collection-item-field": "alliesAlive", "data-collection-item-id": id, children: [
          "YOUR FORCES (",
          alliesAlive,
          ")"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 183,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:167:10", "data-dynamic-content": "true", className: "space-y-1 w-full max-w-[240px]", "data-collection-item-field": "heroStates", "data-collection-item-id": combatState?.id || combatState?._id, children: combatState.heroStates.map(
          (hero) => /* @__PURE__ */ jsxDEV(
            CombatantBar,
            {
              "data-source-location": "components/game/CombatScreen:169:14",
              "data-dynamic-content": "true",
              name: hero.name,
              hp: hero.hp,
              maxHp: hero.max_hp,
              side: "ally",
              isControlled: controlledHero?.id === hero.id,
              onControl: () => setControlledHero(controlledHero?.id === hero.id ? null : hero),
              "data-collection-item-id": hero?.id
            },
            hero.id,
            false,
            {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 188,
              columnNumber: 13
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 186,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:182:10", "data-dynamic-content": "true", className: "space-y-1 w-full max-w-[240px]", "data-collection-item-field": "troopStates", "data-collection-item-id": combatState?.id || combatState?._id, children: combatState.troopStates.map(
          (troop) => /* @__PURE__ */ jsxDEV(TroopBar, { "data-source-location": "components/game/CombatScreen:184:14", "data-dynamic-content": "true", troop }, troop.id || troop.troop_type, false, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 203,
            columnNumber: 13
          }, this)
        ) }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 201,
          columnNumber: 11
        }, this),
        floatingTexts.filter((f) => f.side === "left").map(
          (ft) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              "data-source-location": "components/game/CombatScreen:190:12",
              "data-dynamic-content": "true",
              className: "float-up absolute text-red-400 font-pixel text-[10px] pointer-events-none",
              style: { top: "40%", right: "60%" },
              "data-collection-item-id": ft?.id,
              "data-collection-item-field": "text",
              children: ft.text
            },
            ft.id,
            false,
            {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 209,
              columnNumber: 11
            },
            this
          )
        )
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 182,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:199:6", "data-dynamic-content": "true", className: "border-t border-slate-700/50 px-4 py-3 flex items-center gap-3", style: { background: "rgba(0,0,0,0.7)" }, children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/CombatScreen:200:8",
          "data-dynamic-content": "true",
          onClick: () => setIsRunning((r) => !r),
          className: "btn-rpg px-4 py-2 rounded font-pixel text-[8px] flex items-center gap-2",
          children: isRunning ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Pause, { "data-source-location": "components/game/CombatScreen:204:25", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 223,
              columnNumber: 26
            }, this),
            "PAUSE"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 223,
            columnNumber: 24
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Play, { "data-source-location": "components/game/CombatScreen:204:57", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 223,
              columnNumber: 146
            }, this),
            "FIGHT"
          ] }, void 0, true, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 223,
            columnNumber: 144
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 219,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          "data-source-location": "components/game/CombatScreen:208:8",
          "data-dynamic-content": "true",
          onClick: castSpell,
          disabled: spellCooldown > 0,
          className: `btn-rpg-purple btn-rpg px-3 py-2 rounded font-pixel text-[8px] flex items-center gap-1 ${spellCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""}`,
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { "data-source-location": "components/game/CombatScreen:213:10", "data-dynamic-content": "false", size: 12 }, void 0, false, {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 232,
              columnNumber: 11
            }, this),
            spellCooldown > 0 ? `SPELL (${spellCooldown}s)` : "SPELL"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 227,
          columnNumber: 9
        },
        this
      ),
      controlledHero && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:218:10", "data-dynamic-content": "false", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/CombatScreen:219:12", "data-dynamic-content": "false", className: "btn-rpg px-2 py-1.5 rounded text-[8px] font-pixel flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Sword, { "data-source-location": "components/game/CombatScreen:220:14", "data-dynamic-content": "false", size: 10 }, void 0, false, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 239,
            columnNumber: 15
          }, this),
          "ATK"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 238,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "components/game/CombatScreen:222:12", "data-dynamic-content": "false", className: "btn-rpg-purple btn-rpg px-2 py-1.5 rounded text-[8px] font-pixel flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Zap, { "data-source-location": "components/game/CombatScreen:223:14", "data-dynamic-content": "false", size: 10 }, void 0, false, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 242,
            columnNumber: 15
          }, this),
          "SKILL"
        ] }, void 0, true, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 241,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 237,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          "data-source-location": "components/game/CombatScreen:229:8",
          "data-dynamic-content": "true",
          ref: logRef,
          className: "ml-auto h-12 w-[240px] overflow-y-auto rounded border border-slate-700/50 bg-black/30 px-2 py-1 space-y-0.5",
          children: log.slice(-8).map(
            (entry, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:234:12", "data-dynamic-content": "true", className: `font-ui text-[10px] ${entry.type === "spell" ? "text-purple-400" : entry.type === "system" ? "text-yellow-400" : entry.type?.includes("enemy") ? "text-red-300" : "text-green-300"}`, "data-collection-item-field": "text", "data-collection-item-id": entry?.id || entry?._id, children: entry.text }, i, false, {
              fileName: "/app/src/components/game/CombatScreen.jsx",
              lineNumber: 253,
              columnNumber: 11
            }, this)
          )
        },
        void 0,
        false,
        {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 248,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 218,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/CombatScreen.jsx",
    lineNumber: 137,
    columnNumber: 5
  }, this);
}
_s(CombatScreen, "UjjL/x10FieOv2+aQlv6e82Dhwk=");
_c = CombatScreen;
function CombatantBar({ name, hp, maxHp, isBoss, side, isControlled, onControl, "data-collection-item-id": __dataCollectionItemId }) {
  const pct = Math.max(0, hp / maxHp * 100);
  const alive = hp > 0;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-source-location": "components/game/CombatScreen:253:4",
      "data-dynamic-content": "true",
      onClick: side === "ally" ? onControl : void 0,
      className: `rounded px-2.5 py-1.5 transition-all ${isBoss ? "border border-red-700/60 bg-red-900/20" : side === "ally" ? `border ${isControlled ? "border-yellow-500/60 bg-yellow-900/10" : "border-slate-700/40 bg-slate-900/30"} ${onControl ? "cursor-pointer hover:border-yellow-500/40" : ""}` : "border border-slate-700/40 bg-slate-900/30"} ${!alive ? "opacity-40" : ""}`,
      "data-collection-item-id": __dataCollectionItemId,
      children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:261:6", "data-dynamic-content": "true", className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/CombatScreen:262:8", "data-dynamic-content": "true", className: `font-ui text-xs font-semibold ${isBoss ? "text-red-400" : side === "ally" ? "text-green-400" : "text-slate-300"}`, "data-collection-item-field": "name", "data-collection-item-id": __dataCollectionItemId, children: [
            isBoss && "☠️ ",
            name
          ] }, void 0, true, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 281,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/CombatScreen:265:8", "data-dynamic-content": "true", className: "font-ui text-[10px] text-slate-400", "data-collection-item-field": "hp", "data-collection-item-id": __dataCollectionItemId, children: [
            hp,
            "/",
            maxHp
          ] }, void 0, true, {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 284,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 280,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:267:6", "data-dynamic-content": "true", className: "health-bar h-1.5", children: /* @__PURE__ */ jsxDEV(
          "div",
          {
            "data-source-location": "components/game/CombatScreen:268:8",
            "data-dynamic-content": "true",
            className: "health-bar-fill transition-all duration-300",
            style: {
              width: `${pct}%`,
              background: isBoss ? "linear-gradient(90deg, #7f1d1d 0%, #dc2626 100%)" : side === "ally" ? "linear-gradient(90deg, #14532d 0%, #22c55e 100%)" : "linear-gradient(90deg, #7f1d1d 0%, #ef4444 100%)"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/game/CombatScreen.jsx",
            lineNumber: 287,
            columnNumber: 9
          },
          this
        ) }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 286,
          columnNumber: 7
        }, this),
        isControlled && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:278:23", "data-dynamic-content": "false", className: "font-pixel text-[7px] text-yellow-400 mt-0.5", children: "CONTROLLED" }, void 0, false, {
          fileName: "/app/src/components/game/CombatScreen.jsx",
          lineNumber: 297,
          columnNumber: 24
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 272,
      columnNumber: 5
    },
    this
  );
}
_c2 = CombatantBar;
function TroopBar({ troop }) {
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:285:4", "data-dynamic-content": "true", className: "rounded px-2.5 py-1 border border-green-900/30 bg-green-900/10", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:286:6", "data-dynamic-content": "true", className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDEV("span", { "data-source-location": "components/game/CombatScreen:287:8", "data-dynamic-content": "true", className: "font-ui text-xs text-green-300", "data-collection-item-field": "troop_type", "data-collection-item-id": troop?.id || troop?._id, children: [
      "⚔️ ",
      troop.troop_type,
      " x",
      troop.count
    ] }, void 0, true, {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 306,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:288:8", "data-dynamic-content": "true", className: "flex gap-1", children: [...Array(Math.min(troop.count, 10))].map(
      (_, i) => /* @__PURE__ */ jsxDEV("div", { "data-source-location": "components/game/CombatScreen:290:12", "data-dynamic-content": "true", className: "w-2 h-2 rounded-full bg-green-500", "data-arr-index": i }, i, false, {
        fileName: "/app/src/components/game/CombatScreen.jsx",
        lineNumber: 309,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "/app/src/components/game/CombatScreen.jsx",
      lineNumber: 307,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/components/game/CombatScreen.jsx",
    lineNumber: 305,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/components/game/CombatScreen.jsx",
    lineNumber: 304,
    columnNumber: 5
  }, this);
}
_c3 = TroopBar;
function formatLogEntry(entry) {
  switch (entry.type) {
    case "troop_attack":
      return `⚔️ Troops deal ${entry.damage} dmg`;
    case "hero_attack":
      return `🗡️ Hero deals ${entry.damage} dmg`;
    case "enemy_attack":
      return `💥 Enemy hits for ${entry.damage}`;
    case "enemy_attack_hero":
      return `⚡ Enemy attacks hero: -${entry.damage}`;
    default:
      return `• ${entry.type}`;
  }
}
var _c, _c2, _c3;
$RefreshReg$(_c, "CombatScreen");
$RefreshReg$(_c2, "CombatantBar");
$RefreshReg$(_c3, "TroopBar");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/components/game/CombatScreen.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/components/game/CombatScreen.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QixhQUFPLDBCQUEwQkQsTUFBTUMsTUFBTTtBQUFBLElBQ3RFO0FBQVEsYUFBTyxLQUFLRCxNQUFNUCxJQUFJO0FBQUEsRUFDaEM7QUFDRjtBQUFDLElBQUE4RCxJQUFBTixLQUFBSztBQUFBLGFBQUFDLElBQUE7QUFBQSxhQUFBTixLQUFBO0FBQUEsYUFBQUssS0FBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VDYWxsYmFjayIsInJ1bkF1dG9CYXR0bGVUaWNrIiwiWCIsIlBsYXkiLCJQYXVzZSIsIlphcCIsIlNoaWVsZCIsIlN3b3JkIiwiQ29tYmF0U2NyZWVuIiwiZHVuZ2VvbiIsImhlcm9lcyIsInRyb29wcyIsIm9uQ2xvc2UiLCJvblZpY3RvcnkiLCJvbkRlZmVhdCIsImlkIiwiX3MiLCJjb21iYXRTdGF0ZSIsInNldENvbWJhdFN0YXRlIiwibG9nIiwic2V0TG9nIiwiaXNSdW5uaW5nIiwic2V0SXNSdW5uaW5nIiwiY29udHJvbGxlZEhlcm8iLCJzZXRDb250cm9sbGVkSGVybyIsInBoYXNlIiwic2V0UGhhc2UiLCJzcGVsbENvb2xkb3duIiwic2V0U3BlbGxDb29sZG93biIsImZsb2F0aW5nVGV4dHMiLCJzZXRGbG9hdGluZ1RleHRzIiwiaW50ZXJ2YWxSZWYiLCJsb2dSZWYiLCJpbml0Q29tYmF0IiwiZW5lbXlDb3VudCIsImVuZW1pZXMiLCJib3NzIiwiZW5lbXlTdGF0ZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJib3NzTmFtZSIsImhwIiwiYm9zc0hwIiwibWF4X2hwIiwiYXR0YWNrIiwiYXRrIiwiZGVmZW5zZSIsIk1hdGgiLCJmbG9vciIsImlzX2Jvc3MiLCJoZXJvU3RhdGVzIiwic2xpY2UiLCJtYXAiLCJoIiwidHJvb3BTdGF0ZXMiLCJ0IiwidHlwZSIsInRleHQiLCJjdXJyZW50Iiwic2V0SW50ZXJ2YWwiLCJwcmV2IiwicmVzdWx0IiwiZm9yRWFjaCIsImVudHJ5IiwiZGFtYWdlIiwicmFuZG9tIiwidG9TdHJpbmciLCJzaWRlIiwiaW5jbHVkZXMiLCJmdCIsInNldFRpbWVvdXQiLCJmaWx0ZXIiLCJmIiwibCIsImUiLCJmb3JtYXRMb2dFbnRyeSIsInZpY3RvcnkiLCJjbGVhckludGVydmFsIiwiZGVmZWF0Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY2QiLCJjbGVhclRpbWVvdXQiLCJjYXN0U3BlbGwiLCJkbWciLCJtYXgiLCJhbGl2ZUVuZW1pZXMiLCJhbGxpZXNBbGl2ZSIsImxlbmd0aCIsInJlZHVjZSIsInMiLCJjb3VudCIsImJhY2tncm91bmQiLCJfaWQiLCJlbmVteSIsInRvcCIsImxlZnQiLCJoZXJvIiwidHJvb3AiLCJ0cm9vcF90eXBlIiwicmlnaHQiLCJyIiwiQ29tYmF0YW50QmFyIiwibWF4SHAiLCJpc0Jvc3MiLCJpc0NvbnRyb2xsZWQiLCJvbkNvbnRyb2wiLCJfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIiwicGN0IiwiYWxpdmUiLCJ1bmRlZmluZWQiLCJ3aWR0aCIsIl9jMiIsIlRyb29wQmFyIiwiQXJyYXkiLCJtaW4iLCJfIiwiX2MzIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ29tYmF0U2NyZWVuLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcnVuQXV0b0JhdHRsZVRpY2sgfSBmcm9tIFwiQC9saWIvZ2FtZUVuZ2luZVwiO1xuaW1wb3J0IHsgWCwgUGxheSwgUGF1c2UsIFphcCwgU2hpZWxkLCBTd29yZCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tYmF0U2NyZWVuKHsgZHVuZ2VvbiwgaGVyb2VzLCB0cm9vcHMsIG9uQ2xvc2UsIG9uVmljdG9yeSwgb25EZWZlYXQsIGlkIH0pIHtcbiAgY29uc3QgW2NvbWJhdFN0YXRlLCBzZXRDb21iYXRTdGF0ZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvZywgc2V0TG9nXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2lzUnVubmluZywgc2V0SXNSdW5uaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NvbnRyb2xsZWRIZXJvLCBzZXRDb250cm9sbGVkSGVyb10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3BoYXNlLCBzZXRQaGFzZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3NwZWxsQ29vbGRvd24sIHNldFNwZWxsQ29vbGRvd25dID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtmbG9hdGluZ1RleHRzLCBzZXRGbG9hdGluZ1RleHRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgaW50ZXJ2YWxSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGxvZ1JlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBpbml0Q29tYmF0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15Q291bnQgPSBkdW5nZW9uLmVuZW1pZXMgKyAoZHVuZ2Vvbi5ib3NzID8gMSA6IDApO1xuICAgIGNvbnN0IGVuZW15U3RhdGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1bmdlb24uZW5lbWllczsgaSsrKSB7XG4gICAgICBlbmVteVN0YXRlcy5wdXNoKHtcbiAgICAgICAgaWQ6IGBlbmVteV8ke2l9YCxcbiAgICAgICAgbmFtZTogaSA9PT0gZHVuZ2Vvbi5lbmVtaWVzIC0gMSAmJiBkdW5nZW9uLmJvc3MgPyBkdW5nZW9uLmJvc3NOYW1lIDogYEVuZW15ICR7aSArIDF9YCxcbiAgICAgICAgaHA6IGR1bmdlb24uYm9zcyAmJiBpID09PSBkdW5nZW9uLmVuZW1pZXMgLSAxID8gZHVuZ2Vvbi5ib3NzSHAgOiBkdW5nZW9uLmhwLFxuICAgICAgICBtYXhfaHA6IGR1bmdlb24uYm9zcyAmJiBpID09PSBkdW5nZW9uLmVuZW1pZXMgLSAxID8gZHVuZ2Vvbi5ib3NzSHAgOiBkdW5nZW9uLmhwLFxuICAgICAgICBhdHRhY2s6IGR1bmdlb24uYXRrLFxuICAgICAgICBkZWZlbnNlOiBNYXRoLmZsb29yKGR1bmdlb24uYXRrICogMC4zKSxcbiAgICAgICAgaXNfYm9zczogZHVuZ2Vvbi5ib3NzICYmIGkgPT09IGR1bmdlb24uZW5lbWllcyAtIDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhlcm9TdGF0ZXMgPSBoZXJvZXMuc2xpY2UoMCwgMykubWFwKChoKSA9PiAoeyAuLi5oLCBtYXhfaHA6IGgubWF4X2hwIHx8IGguaHAgfSkpO1xuICAgIGNvbnN0IHRyb29wU3RhdGVzID0gdHJvb3BzLm1hcCgodCkgPT4gKHsgLi4udCwgbWF4X2hwOiB0LmhwIH0pKTtcblxuICAgIHNldENvbWJhdFN0YXRlKHsgaGVyb1N0YXRlcywgZW5lbXlTdGF0ZXMsIHRyb29wU3RhdGVzIH0pO1xuICAgIHNldExvZyhbeyB0eXBlOiBcInN5c3RlbVwiLCB0ZXh0OiBgRW50ZXJpbmcgJHtkdW5nZW9uLm5hbWV9Li4uYCB9XSk7XG4gIH0sIFtkdW5nZW9uLCBoZXJvZXMsIHRyb29wc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaW5pdENvbWJhdCgpO1xuICB9LCBbaW5pdENvbWJhdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1J1bm5pbmcgfHwgIWNvbWJhdFN0YXRlKSByZXR1cm47XG4gICAgaW50ZXJ2YWxSZWYuY3VycmVudCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHNldENvbWJhdFN0YXRlKChwcmV2KSA9PiB7XG4gICAgICAgIGlmICghcHJldikgcmV0dXJuIHByZXY7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bkF1dG9CYXR0bGVUaWNrKHByZXYuaGVyb1N0YXRlcywgcHJldi5lbmVteVN0YXRlcywgcHJldi50cm9vcFN0YXRlcyk7XG5cbiAgICAgICAgLy8gQWRkIGZsb2F0aW5nIGRhbWFnZSB0ZXh0c1xuICAgICAgICByZXN1bHQubG9nLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmRhbWFnZSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKTtcbiAgICAgICAgICAgIGNvbnN0IHNpZGUgPSBlbnRyeS50eXBlPy5pbmNsdWRlcyhcImVuZW15XCIpID8gXCJyaWdodFwiIDogXCJsZWZ0XCI7XG4gICAgICAgICAgICBzZXRGbG9hdGluZ1RleHRzKChmdCkgPT4gWy4uLmZ0LnNsaWNlKC04KSwgeyBpZCwgdGV4dDogYC0ke2VudHJ5LmRhbWFnZX1gLCBzaWRlIH1dKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0RmxvYXRpbmdUZXh0cygoZnQpID0+IGZ0LmZpbHRlcigoZikgPT4gZi5pZCAhPT0gaWQpKSwgMTIwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRMb2coKGwpID0+IFsuLi5sLnNsaWNlKC0yMCksIC4uLnJlc3VsdC5sb2cubWFwKChlKSA9PiAoe1xuICAgICAgICAgIHR5cGU6IGUudHlwZSxcbiAgICAgICAgICB0ZXh0OiBmb3JtYXRMb2dFbnRyeShlKVxuICAgICAgICB9KSldKTtcblxuICAgICAgICBpZiAocmVzdWx0LnZpY3RvcnkpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIHNldElzUnVubmluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvblZpY3RvcnkoZHVuZ2VvbiksIDgwMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5kZWZlYXQpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIHNldElzUnVubmluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvbkRlZmVhdCgpLCA4MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgaGVyb1N0YXRlczogcmVzdWx0Lmhlcm9TdGF0ZXMsIGVuZW15U3RhdGVzOiByZXN1bHQuZW5lbXlTdGF0ZXMsIHRyb29wU3RhdGVzOiByZXN1bHQudHJvb3BTdGF0ZXMgfTtcbiAgICAgIH0pO1xuICAgIH0sIDgwMCk7XG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbFJlZi5jdXJyZW50KTtcbiAgfSwgW2lzUnVubmluZywgZHVuZ2Vvbiwgb25WaWN0b3J5LCBvbkRlZmVhdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGxvZ1JlZi5jdXJyZW50KSBsb2dSZWYuY3VycmVudC5zY3JvbGxUb3AgPSBsb2dSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQ7XG4gIH0sIFtsb2ddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzcGVsbENvb2xkb3duID4gMCkge1xuICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gc2V0U3BlbGxDb29sZG93bigoY2QpID0+IGNkIC0gMSksIDEwMDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0KTtcbiAgICB9XG4gIH0sIFtzcGVsbENvb2xkb3duXSk7XG5cbiAgY29uc3QgY2FzdFNwZWxsID0gKCkgPT4ge1xuICAgIGlmIChzcGVsbENvb2xkb3duID4gMCB8fCAhY29tYmF0U3RhdGUpIHJldHVybjtcbiAgICAvLyBEZWFsIGV4dHJhIGRhbWFnZSB0byBmaXJzdCBlbmVteVxuICAgIHNldENvbWJhdFN0YXRlKChwcmV2KSA9PiB7XG4gICAgICBpZiAoIXByZXYpIHJldHVybiBwcmV2O1xuICAgICAgY29uc3QgZW5lbWllcyA9IHByZXYuZW5lbXlTdGF0ZXMubWFwKChlLCBpKSA9PiB7XG4gICAgICAgIGlmIChpID09PSAwICYmIGUuaHAgPiAwKSB7XG4gICAgICAgICAgY29uc3QgZG1nID0gODA7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uZSwgaHA6IE1hdGgubWF4KDAsIGUuaHAgLSBkbWcpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7IC4uLnByZXYsIGVuZW15U3RhdGVzOiBlbmVtaWVzIH07XG4gICAgfSk7XG4gICAgc2V0TG9nKChsKSA9PiBbLi4ubCwgeyB0eXBlOiBcInNwZWxsXCIsIHRleHQ6IFwi4pyoIE1hZ2ljIHNwZWxsIHVubGVhc2hlZCEgLTgwIGRhbWFnZSFcIiB9XSk7XG4gICAgc2V0U3BlbGxDb29sZG93big4KTtcbiAgfTtcblxuICBpZiAoIWNvbWJhdFN0YXRlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBhbGl2ZUVuZW1pZXMgPSBjb21iYXRTdGF0ZS5lbmVteVN0YXRlcy5maWx0ZXIoKGUpID0+IGUuaHAgPiAwKTtcbiAgY29uc3QgYWxsaWVzQWxpdmUgPSBjb21iYXRTdGF0ZS5oZXJvU3RhdGVzLmZpbHRlcigoaCkgPT4gaC5ocCA+IDApLmxlbmd0aCArIGNvbWJhdFN0YXRlLnRyb29wU3RhdGVzLnJlZHVjZSgocywgdCkgPT4gcyArIHQuY291bnQsIDApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTE4OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBmbGV4LWNvbFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBhMDAxNSAwJSwgIzBkMGQxYSA1MCUsICMwYTBhMGEgMTAwJSlcIiB9fT5cbiAgICAgIHsvKiBUb3AgYmFyICovfVxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTIwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS0yIGJvcmRlci1iIGJvcmRlci1yZWQtOTAwLzQwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNilcIiB9fT5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTIxOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImJvc3NcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZHVuZ2Vvbj8uaWQgfHwgZHVuZ2Vvbj8uX2lkfT5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoxMjI6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtcmVkLTQwMCB0ZXh0LVs5cHhdXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2R1bmdlb24/LmlkIHx8IGR1bmdlb24/Ll9pZH0+e2R1bmdlb24ubmFtZX08L2Rpdj5cbiAgICAgICAgICB7ZHVuZ2Vvbi5ib3NzICYmIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjEyMzoyN1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXVpIHRleHQteHMgdGV4dC1yZWQtMzAwIGFuaW1hdGUtcHVsc2VcIj7imqDvuI8gQk9TUyBEVU5HRU9OPC9kaXY+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTI1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsaWNrPXtvbkNsb3NlfSBjbGFzc05hbWU9XCJidG4tcnBnLXJlZCBidG4tcnBnIHB4LTMgcHktMSB0ZXh0LVs4cHhdIHJvdW5kZWRcIj5cbiAgICAgICAgICA8WCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTI2OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSBjbGFzc05hbWU9XCJpbmxpbmUgbXItMVwiIC8+RkxFRVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBjb21iYXQgYXJlYSAqL31cbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjEzMTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZ2FwLTAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBFbmVtaWVzICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoxMzM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMyBwLTQgcmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoxMzQ6MTBcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQtWzhweF0gdGV4dC1yZWQtNDAwIG1iLTJcIj5FTkVNSUVTICh7YWxpdmVFbmVtaWVzLmxlbmd0aH0pPC9kaXY+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTM1OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwic3BhY2UteS0yIHctZnVsbCBtYXgtdy1bMjQwcHhdXCI+XG4gICAgICAgICAgICB7Y29tYmF0U3RhdGUuZW5lbXlTdGF0ZXMuc2xpY2UoMCwgNSkubWFwKChlbmVteSkgPT5cbiAgICAgICAgICAgIDxDb21iYXRhbnRCYXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjEzNzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgICAgICBrZXk9e2VuZW15LmlkfVxuICAgICAgICAgICAgbmFtZT17ZW5lbXkubmFtZX1cbiAgICAgICAgICAgIGhwPXtlbmVteS5ocH1cbiAgICAgICAgICAgIG1heEhwPXtlbmVteS5tYXhfaHB9XG4gICAgICAgICAgICBpc0Jvc3M9e2VuZW15LmlzX2Jvc3N9XG4gICAgICAgICAgICBzaWRlPVwiZW5lbXlcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZW5lbXk/LmlkfSAvPlxuXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHsvKiBGbG9hdGluZyB0ZXh0cyAqL31cbiAgICAgICAgICB7ZmxvYXRpbmdUZXh0cy5maWx0ZXIoKGYpID0+IGYuc2lkZSA9PT0gXCJyaWdodFwiKS5tYXAoKGZ0KSA9PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE0OToxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17ZnQuaWR9IGNsYXNzTmFtZT1cImZsb2F0LXVwIGFic29sdXRlIHRleHQtcmVkLTQwMCBmb250LXBpeGVsIHRleHQtWzEwcHhdIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgIHN0eWxlPXt7IHRvcDogXCI0MCVcIiwgbGVmdDogXCI2MCVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZnQ/LmlkfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRleHRcIj5cbiAgICAgICAgICAgICAge2Z0LnRleHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVlMgZGl2aWRlciAqL31cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTU3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtMlwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE1ODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmb250LXBpeGVsIHRleHQteWVsbG93LTYwMCB0ZXh0LVs4cHhdIHdyaXRpbmctbW9kZS12ZXJ0aWNhbFwiPuKalO+4jzwvZGl2PlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE1OToxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LXB4IGZsZXgtMSBiZy1ncmFkaWVudC10by1iIGZyb20tdHJhbnNwYXJlbnQgdmlhLXllbGxvdy04MDAvNDAgdG8tdHJhbnNwYXJlbnRcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUGxheWVyIHNpZGUgKi99XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE2Mzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zIHAtNCByZWxhdGl2ZVwiPlxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE2NDoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0ZXh0LWdyZWVuLTQwMCBtYi0yXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJhbGxpZXNBbGl2ZVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtpZH0+WU9VUiBGT1JDRVMgKHthbGxpZXNBbGl2ZX0pPC9kaXY+XG5cbiAgICAgICAgICB7LyogSGVyb2VzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE2NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMSB3LWZ1bGwgbWF4LXctWzI0MHB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaGVyb1N0YXRlc1wiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtjb21iYXRTdGF0ZT8uaWQgfHwgY29tYmF0U3RhdGU/Ll9pZH0+XG4gICAgICAgICAgICB7Y29tYmF0U3RhdGUuaGVyb1N0YXRlcy5tYXAoKGhlcm8pID0+XG4gICAgICAgICAgICA8Q29tYmF0YW50QmFyIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoxNjk6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAga2V5PXtoZXJvLmlkfVxuICAgICAgICAgICAgbmFtZT17aGVyby5uYW1lfVxuICAgICAgICAgICAgaHA9e2hlcm8uaHB9XG4gICAgICAgICAgICBtYXhIcD17aGVyby5tYXhfaHB9XG4gICAgICAgICAgICBzaWRlPVwiYWxseVwiXG4gICAgICAgICAgICBpc0NvbnRyb2xsZWQ9e2NvbnRyb2xsZWRIZXJvPy5pZCA9PT0gaGVyby5pZH1cbiAgICAgICAgICAgIG9uQ29udHJvbD17KCkgPT4gc2V0Q29udHJvbGxlZEhlcm8oY29udHJvbGxlZEhlcm8/LmlkID09PSBoZXJvLmlkID8gbnVsbCA6IGhlcm8pfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17aGVybz8uaWR9IC8+XG5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVHJvb3BzICovfVxuICAgICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE4MjoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNwYWNlLXktMSB3LWZ1bGwgbWF4LXctWzI0MHB4XVwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidHJvb3BTdGF0ZXNcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Y29tYmF0U3RhdGU/LmlkIHx8IGNvbWJhdFN0YXRlPy5faWR9PlxuICAgICAgICAgICAge2NvbWJhdFN0YXRlLnRyb29wU3RhdGVzLm1hcCgodHJvb3ApID0+XG4gICAgICAgICAgICA8VHJvb3BCYXIgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjE4NDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGtleT17dHJvb3AuaWQgfHwgdHJvb3AudHJvb3BfdHlwZX0gdHJvb3A9e3Ryb29wfSAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGbG9hdGluZyB0ZXh0cyAqL31cbiAgICAgICAgICB7ZmxvYXRpbmdUZXh0cy5maWx0ZXIoKGYpID0+IGYuc2lkZSA9PT0gXCJsZWZ0XCIpLm1hcCgoZnQpID0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MTkwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtmdC5pZH0gY2xhc3NOYW1lPVwiZmxvYXQtdXAgYWJzb2x1dGUgdGV4dC1yZWQtNDAwIGZvbnQtcGl4ZWwgdGV4dC1bMTBweF0gcG9pbnRlci1ldmVudHMtbm9uZVwiXG4gICAgICAgICAgc3R5bGU9e3sgdG9wOiBcIjQwJVwiLCByaWdodDogXCI2MCVcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17ZnQ/LmlkfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cInRleHRcIj5cbiAgICAgICAgICAgICAge2Z0LnRleHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ29udHJvbHMgKi99XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoxOTk6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1zbGF0ZS03MDAvNTAgcHgtNCBweS0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNylcIiB9fT5cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjAwOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1J1bm5pbmcoKHIpID0+ICFyKX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXJwZyBweC00IHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7aXNSdW5uaW5nID8gPD48UGF1c2UgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjIwNDoyNVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMn0gLz5QQVVTRTwvPiA6IDw+PFBsYXkgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjIwNDo1N1wiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMn0gLz5GSUdIVDwvPn1cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgey8qIFNwZWxsIGJ1dHRvbiAqL31cbiAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjA4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBvbkNsaWNrPXtjYXN0U3BlbGx9XG4gICAgICAgIGRpc2FibGVkPXtzcGVsbENvb2xkb3duID4gMH1cbiAgICAgICAgY2xhc3NOYW1lPXtgYnRuLXJwZy1wdXJwbGUgYnRuLXJwZyBweC0zIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHtzcGVsbENvb2xkb3duID4gMCA/IFwib3BhY2l0eS01MCBjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiXCJ9YH0+XG4gICAgICAgICAgXG4gICAgICAgICAgPFphcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjEzOjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEyfSAvPlxuICAgICAgICAgIHtzcGVsbENvb2xkb3duID4gMCA/IGBTUEVMTCAoJHtzcGVsbENvb2xkb3dufXMpYCA6IFwiU1BFTExcIn1cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAge2NvbnRyb2xsZWRIZXJvICYmXG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjIxODoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoyMTk6MTJcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiYnRuLXJwZyBweC0yIHB5LTEuNSByb3VuZGVkIHRleHQtWzhweF0gZm9udC1waXhlbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8U3dvcmQgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjIyMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBzaXplPXsxMH0gLz5BVEtcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjIyOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImJ0bi1ycGctcHVycGxlIGJ0bi1ycGcgcHgtMiBweS0xLjUgcm91bmRlZCB0ZXh0LVs4cHhdIGZvbnQtcGl4ZWwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFphcCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjIzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIHNpemU9ezEwfSAvPlNLSUxMXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHsvKiBDb21iYXQgbG9nICovfVxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoyMjk6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICAgIHJlZj17bG9nUmVmfVxuICAgICAgICBjbGFzc05hbWU9XCJtbC1hdXRvIGgtMTIgdy1bMjQwcHhdIG92ZXJmbG93LXktYXV0byByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzUwIGJnLWJsYWNrLzMwIHB4LTIgcHktMSBzcGFjZS15LTAuNVwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHtsb2cuc2xpY2UoLTgpLm1hcCgoZW50cnksIGkpID0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjM0OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9e2Bmb250LXVpIHRleHQtWzEwcHhdICR7XG4gICAgICAgICAgZW50cnkudHlwZSA9PT0gXCJzcGVsbFwiID8gXCJ0ZXh0LXB1cnBsZS00MDBcIiA6XG4gICAgICAgICAgZW50cnkudHlwZSA9PT0gXCJzeXN0ZW1cIiA/IFwidGV4dC15ZWxsb3ctNDAwXCIgOlxuICAgICAgICAgIGVudHJ5LnR5cGU/LmluY2x1ZGVzKFwiZW5lbXlcIikgPyBcInRleHQtcmVkLTMwMFwiIDogXCJ0ZXh0LWdyZWVuLTMwMFwifWBcbiAgICAgICAgICB9IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwidGV4dFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWlkPXtlbnRyeT8uaWQgfHwgZW50cnk/Ll9pZH0+XG4gICAgICAgICAgICAgIHtlbnRyeS50ZXh0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4pO1xuXG59XG5cbmZ1bmN0aW9uIENvbWJhdGFudEJhcih7IG5hbWUsIGhwLCBtYXhIcCwgaXNCb3NzLCBzaWRlLCBpc0NvbnRyb2xsZWQsIG9uQ29udHJvbCwgXCJkYXRhLWNvbGxlY3Rpb24taXRlbS1pZFwiOiBfX2RhdGFDb2xsZWN0aW9uSXRlbUlkIH0pIHtcbiAgY29uc3QgcGN0ID0gTWF0aC5tYXgoMCwgaHAgLyBtYXhIcCAqIDEwMCk7XG4gIGNvbnN0IGFsaXZlID0gaHAgPiAwO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjUzOjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgIG9uQ2xpY2s9e3NpZGUgPT09IFwiYWxseVwiID8gb25Db250cm9sIDogdW5kZWZpbmVkfVxuICAgIGNsYXNzTmFtZT17YHJvdW5kZWQgcHgtMi41IHB5LTEuNSB0cmFuc2l0aW9uLWFsbCAke1xuICAgIGlzQm9zcyA/IFwiYm9yZGVyIGJvcmRlci1yZWQtNzAwLzYwIGJnLXJlZC05MDAvMjBcIiA6XG4gICAgc2lkZSA9PT0gXCJhbGx5XCIgPyBgYm9yZGVyICR7aXNDb250cm9sbGVkID8gXCJib3JkZXIteWVsbG93LTUwMC82MCBiZy15ZWxsb3ctOTAwLzEwXCIgOiBcImJvcmRlci1zbGF0ZS03MDAvNDAgYmctc2xhdGUtOTAwLzMwXCJ9ICR7b25Db250cm9sID8gXCJjdXJzb3ItcG9pbnRlciBob3Zlcjpib3JkZXIteWVsbG93LTUwMC80MFwiIDogXCJcIn1gIDpcbiAgICBcImJvcmRlciBib3JkZXItc2xhdGUtNzAwLzQwIGJnLXNsYXRlLTkwMC8zMFwifSAke1xuICAgICFhbGl2ZSA/IFwib3BhY2l0eS00MFwiIDogXCJcIn1gfSBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+XG4gICAgICBcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjI2MTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTFcIj5cbiAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjI2Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPXtgZm9udC11aSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgJHtpc0Jvc3MgPyBcInRleHQtcmVkLTQwMFwiIDogc2lkZSA9PT0gXCJhbGx5XCIgPyBcInRleHQtZ3JlZW4tNDAwXCIgOiBcInRleHQtc2xhdGUtMzAwXCJ9YH0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJuYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e19fZGF0YUNvbGxlY3Rpb25JdGVtSWR9PlxuICAgICAgICAgIHtpc0Jvc3MgJiYgXCLimKDvuI8gXCJ9e25hbWV9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjI2NTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiIGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiaHBcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17X19kYXRhQ29sbGVjdGlvbkl0ZW1JZH0+e2hwfS97bWF4SHB9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoyNjc6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImhlYWx0aC1iYXIgaC0xLjVcIj5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjY4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICBjbGFzc05hbWU9XCJoZWFsdGgtYmFyLWZpbGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7cGN0fSVgLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGlzQm9zcyA/IFwibGluZWFyLWdyYWRpZW50KDkwZGVnLCAjN2YxZDFkIDAlLCAjZGMyNjI2IDEwMCUpXCIgOlxuICAgICAgICAgIHNpZGUgPT09IFwiYWxseVwiID8gXCJsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMxNDUzMmQgMCUsICMyMmM1NWUgMTAwJSlcIiA6XG4gICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM3ZjFkMWQgMCUsICNlZjQ0NDQgMTAwJSlcIlxuICAgICAgICB9fSAvPlxuICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgICAge2lzQ29udHJvbGxlZCAmJiA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoyNzg6MjNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs3cHhdIHRleHQteWVsbG93LTQwMCBtdC0wLjVcIj5DT05UUk9MTEVEPC9kaXY+fVxuICAgIDwvZGl2Pik7XG5cbn1cblxuZnVuY3Rpb24gVHJvb3BCYXIoeyB0cm9vcCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46Mjg1OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJyb3VuZGVkIHB4LTIuNSBweS0xIGJvcmRlciBib3JkZXItZ3JlZW4tOTAwLzMwIGJnLWdyZWVuLTkwMC8xMFwiPlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46Mjg2OjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPHNwYW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJjb21wb25lbnRzL2dhbWUvQ29tYmF0U2NyZWVuOjI4Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIHRleHQtZ3JlZW4tMzAwXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJ0cm9vcF90eXBlXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e3Ryb29wPy5pZCB8fCB0cm9vcD8uX2lkfT7impTvuI8ge3Ryb29wLnRyb29wX3R5cGV9IHh7dHJvb3AuY291bnR9PC9zcGFuPlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwiY29tcG9uZW50cy9nYW1lL0NvbWJhdFNjcmVlbjoyODg6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTFcIj5cbiAgICAgICAgICB7Wy4uLkFycmF5KE1hdGgubWluKHRyb29wLmNvdW50LCAxMCkpXS5tYXAoKF8sIGkpID0+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cImNvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW46MjkwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1ncmVlbi01MDBcIiBkYXRhLWFyci1pbmRleD17aX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2Pik7XG5cbn1cblxuZnVuY3Rpb24gZm9ybWF0TG9nRW50cnkoZW50cnkpIHtcbiAgc3dpdGNoIChlbnRyeS50eXBlKSB7XG4gICAgY2FzZSBcInRyb29wX2F0dGFja1wiOnJldHVybiBg4pqU77iPIFRyb29wcyBkZWFsICR7ZW50cnkuZGFtYWdlfSBkbWdgO1xuICAgIGNhc2UgXCJoZXJvX2F0dGFja1wiOnJldHVybiBg8J+Xoe+4jyBIZXJvIGRlYWxzICR7ZW50cnkuZGFtYWdlfSBkbWdgO1xuICAgIGNhc2UgXCJlbmVteV9hdHRhY2tcIjpyZXR1cm4gYPCfkqUgRW5lbXkgaGl0cyBmb3IgJHtlbnRyeS5kYW1hZ2V9YDtcbiAgICBjYXNlIFwiZW5lbXlfYXR0YWNrX2hlcm9cIjpyZXR1cm4gYOKaoSBFbmVteSBhdHRhY2tzIGhlcm86IC0ke2VudHJ5LmRhbWFnZX1gO1xuICAgIGRlZmF1bHQ6cmV0dXJuIGDigKIgJHtlbnRyeS50eXBlfWA7XG4gIH1cbn0iXSwiZmlsZSI6Ii9hcHAvc3JjL2NvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW4uanN4In0=