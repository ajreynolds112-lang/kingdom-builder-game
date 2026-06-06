import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Game.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/pages/Game.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=1cd573cc"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"];
import { base44 } from "/src/api/base44Client.js";
import { initializeNewBase, tickResources, calculateMineProduction, collectFromMines } from "/src/lib/gameEngine.js";
import { getBuildingMaxHP } from "/src/lib/gameConstants.js";
import { getVaultCapacity, getMineProduction, getAutoCollectIntervalHours } from "/src/lib/gameConstants.js";
import { BUILDING_DEFS, TH_SHOP_UNLOCKS, getUpgradeCost, formatTime, GRID_SIZE, getBuildingLevelCap } from "/src/lib/gameConstants.js";
import { TERRITORY_DEFS } from "/src/lib/dungeonData.js";
import IsometricGrid from "/src/components/game/IsometricGrid.jsx";
import HUD from "/src/components/game/HUD.jsx";
import BuildingPanel from "/src/components/game/BuildingPanel.jsx";
import ShopModal from "/src/components/game/ShopModal.jsx";
import AltarModal from "/src/components/game/AltarModal.jsx";
import DungeonsModal from "/src/components/game/DungeonsModal.jsx";
import CombatScreen from "/src/components/game/CombatScreen.jsx";
import PackConversionModal from "/src/components/game/PackConversionModal.jsx";
import GemShopModal from "/src/components/game/GemShopModal.jsx";
import PixelEditor from "/src/components/game/PixelEditor.jsx";
import DungeonEditor from "/src/components/game/DungeonEditor.jsx";
import DungeonEditorLayout from "/src/components/game/DungeonEditorLayout.jsx";
import WallGroupPanel from "/src/components/game/WallGroupPanel.jsx";
import HeroCreator from "/src/components/game/HeroCreator.jsx";
import HeroEditor from "/src/components/game/HeroEditor.jsx";
import WallLayerEditor from "/src/components/game/WallLayerEditor.jsx";
import BuildingHpEditor from "/src/components/game/BuildingHpEditor.jsx";
import BuildingStatsEditor from "/src/components/game/BuildingStatsEditor.jsx";
import DevDocumentation from "/src/components/game/DevDocumentation.jsx?t=1780754825034";
import { toast } from "/node_modules/.vite/deps/sonner.js?v=d7bf68dd";
export default function Game() {
  _s();
  const [user, setUser] = useState(null);
  const [playerBase, setPlayerBase] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [troops, setTroops] = useState([]);
  const [aspects, setAspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("INITIALIZING...");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const gridRef = useRef(null);
  const [showShop, setShowShop] = useState(false);
  const [showAltar, setShowAltar] = useState(false);
  const [showDungeons, setShowDungeons] = useState(false);
  const [activeDungeon, setActiveDungeon] = useState(null);
  const [showCollectButton, setShowCollectButton] = useState(false);
  const [showPackConversion, setShowPackConversion] = useState(false);
  const [showGemShop, setShowGemShop] = useState(false);
  const [showPixelEditor, setShowPixelEditor] = useState(false);
  const [showDungeonEditor, setShowDungeonEditor] = useState(false);
  const [showHeroCreator, setShowHeroCreator] = useState(false);
  const [showHeroEditor, setShowHeroEditor] = useState(false);
  const [showWallLayerEditor, setShowWallLayerEditor] = useState(false);
  const [showBuildingHpEditor, setShowBuildingHpEditor] = useState(false);
  const [showBuildingStatsEditor, setShowBuildingStatsEditor] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [pendingOverflow, setPendingOverflow] = useState({ gold: 0, mana: 0 });
  const [pendingShopPlacement, setPendingShopPlacement] = useState(null);
  const [gemPlacementConfirm, setGemPlacementConfirm] = useState(null);
  const [wallDragConfirm, setWallDragConfirm] = useState(null);
  const [wallGroup, setWallGroup] = useState(null);
  const resourceTickRef = useRef(null);
  useEffect(() => {
    loadGame();
  }, []);
  const loadGame = async () => {
    setLoading(true);
    setLoadingMessage("LOADING KINGDOM...");
    const me = await base44.auth.me();
    setUser(me);
    const [existingBases, bldgs, heroList, troopList, aspectList] = await Promise.all(
      [
        base44.entities.PlayerBase.filter({ player_id: me.id }),
        base44.entities.Building.filter({ player_id: me.id }),
        base44.entities.Hero.filter({ player_id: me.id }),
        base44.entities.Troop.filter({ player_id: me.id }),
        base44.entities.Aspect.filter({ player_id: me.id })
      ]
    );
    let base;
    if (existingBases.length > 0) {
      base = existingBases[0];
      const townHall = bldgs.find((b) => b.building_type === "town_hall");
      const actualTHLevel = townHall?.level || 1;
      if (base.town_hall_level !== actualTHLevel) {
        base = await base44.entities.PlayerBase.update(base.id, {
          town_hall_level: actualTHLevel
        });
      }
      setLoadingMessage("CALCULATING OFFLINE PROGRESS...");
      const now = /* @__PURE__ */ new Date();
      const lastTick = base.last_resource_tick ? new Date(base.last_resource_tick) : now;
      const elapsedHours = (now - lastTick) / (1e3 * 60 * 60);
      if (elapsedHours > 0 && (base.gold_per_hour > 0 || base.mana_per_hour > 0)) {
        const goldGain = Math.floor(base.gold_per_hour * elapsedHours);
        const manaGain = Math.floor(base.mana_per_hour * elapsedHours);
        const newGold = Math.min(base.gold + goldGain, base.gold_capacity);
        const newMana = Math.min(base.mana + manaGain, base.mana_capacity);
        if (goldGain > 0 || manaGain > 0) {
          base = await base44.entities.PlayerBase.update(base.id, {
            gold: newGold,
            mana: newMana,
            last_resource_tick: now.toISOString()
          });
          console.log(`Offline resources: +${goldGain} gold, +${manaGain} mana (${elapsedHours.toFixed(2)}h away)`);
        }
      }
      setLoadingMessage("CHECKING UPGRADES...");
      const upgradedBuildings = [];
      for (const b of bldgs) {
        if (b.is_upgrading && b.upgrade_started_at) {
          const elapsed = (now - new Date(b.upgrade_started_at)) / 1e3;
          const remaining = b.upgrade_duration_seconds - elapsed;
          if (remaining <= 0) {
            const newLevel = b.level + 1;
            const updated = await base44.entities.Building.update(b.id, {
              is_upgrading: false,
              level: newLevel,
              upgrade_started_at: null,
              upgrade_duration_seconds: 0,
              max_hp: getBuildingMaxHP(b.building_type, newLevel),
              hp: getBuildingMaxHP(b.building_type, newLevel)
            });
            upgradedBuildings.push(updated);
            console.log(`Upgrade completed while away: ${b.building_type} -> Lv.${newLevel}`);
          }
        }
      }
      if (upgradedBuildings.length > 0) {
        setBuildings((prev) => prev.map((b) => {
          const updated = upgradedBuildings.find((u) => u.id === b.id);
          return updated || b;
        }));
        toast.success(`Welcome back! ${upgradedBuildings.length} upgrade(s) completed while you were away.`);
      }
      const vaultBuildings = bldgs.filter(
        (b) => b.building_type === "gold_mill" || b.building_type === "mana_vault" || b.building_type === "gold_mine" || b.building_type === "mana_mine"
      );
      if (vaultBuildings.length > 0) {
        let capacityChanged = false;
        let newBase = { ...base };
        for (const b of vaultBuildings) {
          const { storage } = getMineProduction(b.level);
          if (b.building_type === "gold_mill" && storage !== base.gold_capacity) {
            newBase.gold_capacity = storage;
            capacityChanged = true;
          }
          if (b.building_type === "mana_vault" && storage !== base.mana_capacity) {
            newBase.mana_capacity = storage;
            capacityChanged = true;
          }
        }
        if (capacityChanged) {
          base = await base44.entities.PlayerBase.update(base.id, newBase);
        }
      }
      setPlayerBase(base);
      setBuildings(bldgs);
      setHeroes(heroList);
      setTroops(troopList);
      setAspects(aspectList);
      setLoading(false);
    } else {
      setLoadingMessage("CREATING NEW KINGDOM...");
      await base44.entities.Building.deleteMany({ player_id: me.id });
      await base44.entities.Hero.deleteMany({ player_id: me.id });
      await base44.entities.Troop.deleteMany({ player_id: me.id });
      await base44.entities.Aspect.deleteMany({ player_id: me.id });
      await base44.entities.ResourcePack.deleteMany({ player_id: me.id });
      base = await base44.entities.PlayerBase.create({
        player_id: me.id,
        town_hall_level: 1,
        gold: 5e3,
        mana: 5e3,
        soul_shards: 0,
        gems: 0,
        gold_capacity: 3e4,
        mana_capacity: 3e4,
        last_resource_tick: (/* @__PURE__ */ new Date()).toISOString(),
        gold_per_hour: 0,
        mana_per_hour: 0
      });
      await initializeNewBase(base44, me.id);
      setPlayerBase(base);
      const [freshBldgs, freshHeroes, freshTroops, freshAspects] = await Promise.all(
        [
          base44.entities.Building.filter({ player_id: me.id }),
          base44.entities.Hero.filter({ player_id: me.id }),
          base44.entities.Troop.filter({ player_id: me.id }),
          base44.entities.Aspect.filter({ player_id: me.id })
        ]
      );
      setBuildings(freshBldgs);
      setHeroes(freshHeroes);
      setTroops(freshTroops);
      setAspects(freshAspects);
      setLoading(false);
      toast.success("New kingdom created!");
    }
  };
  useEffect(() => {
    if (!playerBase) return;
    resourceTickRef.current = setInterval(async () => {
      try {
        const { goldGain, manaGain, overflowGold, overflowMana } = tickResources(playerBase, buildings);
        const thLevel = playerBase.town_hall_level || 1;
        const autoCollectInterval = getAutoCollectIntervalHours(thLevel);
        let updates = {
          gold: Math.min(playerBase.gold + goldGain, playerBase.gold_capacity),
          mana: Math.min(playerBase.mana + manaGain, playerBase.mana_capacity),
          last_resource_tick: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (autoCollectInterval && (overflowGold > 0 || overflowMana > 0)) {
          updates.last_auto_collect = (/* @__PURE__ */ new Date()).toISOString();
          updates.pending_overflow_gold = (playerBase.pending_overflow_gold || 0) + overflowGold;
          updates.pending_overflow_mana = (playerBase.pending_overflow_mana || 0) + overflowMana;
        }
        const updated = await base44.entities.PlayerBase.update(playerBase.id, updates);
        setPlayerBase(updated);
      } catch (error) {
        console.error("Resource tick failed:", error);
        if (error.message?.includes("not found")) {
          clearInterval(resourceTickRef.current);
        }
      }
    }, 3e4);
    return () => clearInterval(resourceTickRef.current);
  }, [playerBase, buildings]);
  useEffect(() => {
    if (!buildings.length) return;
    const interval = setInterval(async () => {
      const upgrading = buildings.filter((b) => b.is_upgrading);
      let baseUpdated = false;
      let newBase = { ...playerBase };
      for (const b of upgrading) {
        const remaining = b.upgrade_started_at ? Math.max(0, b.upgrade_duration_seconds - (Date.now() - new Date(b.upgrade_started_at).getTime()) / 1e3) : 0;
        if (remaining <= 0) {
          try {
            const updated = await base44.entities.Building.update(b.id, {
              is_upgrading: false,
              level: b.level + 1,
              upgrade_started_at: null,
              upgrade_duration_seconds: 0
            });
            setBuildings((prev) => prev.map((x) => x.id === updated.id ? updated : x));
            toast.success(`${BUILDING_DEFS[b.building_type]?.name} upgraded to Level ${b.level + 1}!`);
            if (b.building_type === "gold_mill" || b.building_type === "gold_mine") {
              const { storage } = getMineProduction(updated.level);
              if (b.building_type === "gold_mill") {
                newBase.gold_capacity = storage;
                baseUpdated = true;
              }
            }
            if (b.building_type === "mana_vault") {
              const { storage } = getMineProduction(updated.level);
              newBase.mana_capacity = storage;
              baseUpdated = true;
            }
            if (b.building_type === "mana_mine") {
              const { storage } = getMineProduction(updated.level);
              newBase.mana_capacity = storage;
              baseUpdated = true;
            }
            const newMaxHP = getBuildingMaxHP(b.building_type, updated.level);
            await base44.entities.Building.update(b.id, { max_hp: newMaxHP, hp: newMaxHP });
            setBuildings((prev) => prev.map((x) => x.id === b.id ? { ...x, max_hp: newMaxHP, hp: newMaxHP } : x));
            if (b.building_type === "town_hall") {
              newBase.town_hall_level = updated.level;
              baseUpdated = true;
            }
          } catch (error) {
            console.error("Building upgrade completion failed:", error);
            if (error.message?.includes("not found")) {
              setBuildings((prev) => prev.filter((x) => x.id !== b.id));
            }
          }
        }
      }
      if (baseUpdated) {
        try {
          const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, newBase);
          setPlayerBase(updatedBase);
        } catch (error) {
          console.error("Failed to update base capacities:", error);
          if (error.message?.includes("not found")) {
            clearInterval(interval);
          }
        }
      }
    }, 5e3);
    return () => clearInterval(interval);
  }, [buildings, playerBase]);
  useEffect(() => {
    if (!buildings.length || (playerBase?.town_hall_level || 1) >= 15) {
      setShowCollectButton(false);
      return;
    }
    const hasResources = buildings.some(
      (b) => (b.building_type === "gold_mine" || b.building_type === "gold_mill") && (b.custom_data?.stored_gold || 0) > 0 || b.building_type === "mana_mine" && (b.custom_data?.stored_mana || 0) > 0
    );
    setShowCollectButton(hasResources);
  }, [buildings, playerBase]);
  useEffect(() => {
    if (!playerBase || (playerBase?.town_hall_level || 1) < 15) return;
    const totalOverflow = (playerBase.pending_overflow_gold || 0) + (playerBase.pending_overflow_mana || 0);
    if (totalOverflow > 0) {
      setPendingOverflow({
        gold: playerBase.pending_overflow_gold || 0,
        mana: playerBase.pending_overflow_mana || 0
      });
      setShowPackConversion(true);
    }
  }, [playerBase]);
  const handleUpgradeBuilding = async (building, cost) => {
    if ((playerBase?.gold ?? 0) < cost.gold || (playerBase?.mana ?? 0) < cost.mana) {
      toast.error("Not enough resources!");
      return;
    }
    if (building.is_upgrading) {
      toast.error("Already upgrading!");
      return;
    }
    try {
      const upgradeStartTime = (/* @__PURE__ */ new Date()).toISOString();
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gold: playerBase.gold - cost.gold,
        mana: playerBase.mana - cost.mana
      });
      setPlayerBase(updatedBase);
      const updatedBuilding = await base44.entities.Building.update(building.id, {
        is_upgrading: true,
        upgrade_started_at: upgradeStartTime,
        upgrade_duration_seconds: cost.seconds
      });
      setBuildings((prev) => prev.map((b) => b.id === updatedBuilding.id ? updatedBuilding : b));
      setSelectedBuilding(updatedBuilding);
      toast(`⚙️ Upgrading ${BUILDING_DEFS[building.building_type]?.name}... ${formatTime(cost.seconds)}`);
      if (building.building_type === "town_hall") {
        const newTHLevel = building.level + 1;
        await base44.entities.PlayerBase.update(playerBase.id, { town_hall_level: newTHLevel });
      }
    } catch (error) {
      console.error("Failed to upgrade building:", error);
      toast.error("Upgrade failed. Please try again.");
    }
  };
  const handleUpgradeWithGems = async (building, cost, gemsNeeded) => {
    if ((playerBase?.gems ?? 0) < gemsNeeded) {
      toast.error("Not enough gems!");
      return;
    }
    if (building.is_upgrading) {
      toast.error("Already upgrading!");
      return;
    }
    try {
      const upgradeStartTime = (/* @__PURE__ */ new Date()).toISOString();
      const goldHas = playerBase?.gold ?? 0;
      const manaHas = playerBase?.mana ?? 0;
      const goldNeeded = cost.gold - goldHas;
      const manaNeeded = cost.mana - manaHas;
      const gemsForGold = Math.ceil(goldNeeded / 100);
      const gemsForMana = Math.ceil(manaNeeded / 200);
      const totalGemsCost = gemsForGold + gemsForMana;
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gold: 0,
        // Use all gold
        mana: 0,
        // Use all mana
        gems: playerBase.gems - totalGemsCost
      });
      setPlayerBase(updatedBase);
      const updatedBuilding = await base44.entities.Building.update(building.id, {
        is_upgrading: true,
        upgrade_started_at: upgradeStartTime,
        upgrade_duration_seconds: cost.seconds
      });
      setBuildings((prev) => prev.map((b) => b.id === updatedBuilding.id ? updatedBuilding : b));
      setSelectedBuilding(updatedBuilding);
      toast.success(`💎 Used ${totalGemsCost} gems to upgrade ${BUILDING_DEFS[building.building_type]?.name}!`);
    } catch (error) {
      console.error("Failed to upgrade with gems:", error);
      toast.error("Upgrade failed. Please try again.");
    }
  };
  const handleSpeedUpUpgrade = async (building, timeLeftSeconds) => {
    const gemCost = Math.ceil(Math.pow(Math.max(timeLeftSeconds / 60, 1), 0.75));
    if ((playerBase?.gems ?? 0) < gemCost) {
      toast.error("Not enough gems!");
      return;
    }
    try {
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gems: playerBase.gems - gemCost
      });
      setPlayerBase(updatedBase);
      const updatedBuilding = await base44.entities.Building.update(building.id, {
        is_upgrading: false,
        level: building.level + 1,
        upgrade_started_at: null,
        upgrade_duration_seconds: 0,
        max_hp: getBuildingMaxHP(building.building_type, building.level + 1),
        hp: getBuildingMaxHP(building.building_type, building.level + 1)
      });
      setBuildings((prev) => prev.map((b) => b.id === updatedBuilding.id ? updatedBuilding : b));
      setSelectedBuilding(updatedBuilding);
      toast.success(`⚡ Upgrade completed! ${building.building_type} is now level ${building.level + 1}!`);
    } catch (error) {
      console.error("Failed to speed up upgrade:", error);
      toast.error("Speed up failed. Please try again.");
    }
  };
  const handleMoveBuilding = async (building, newX, newY) => {
    try {
      console.log("Moving building:", building.building_type, "id:", building.id, "from", building.grid_x, building.grid_y, "to", newX, newY);
      setBuildings((prev) => prev.map((b) => b.id === building.id ? { ...b, grid_x: newX, grid_y: newY } : b));
      setSelectedBuilding(null);
      await base44.entities.Building.update(building.id, { grid_x: newX, grid_y: newY });
      console.log("Building position saved to DB");
      toast.success(`Moved ${BUILDING_DEFS[building.building_type]?.name} to (${newX}, ${newY})`);
    } catch (error) {
      console.error("Failed to save building position:", error);
      toast.error("Failed to move building. Please try again.");
    }
  };
  const handleBuyFromShop = async (buildingType, def) => {
    setPendingShopPlacement({ buildingType, def, useGems: false });
  };
  const handleBuyFromShopWithGems = async (buildingType, def, gemCost) => {
    setPendingShopPlacement({ buildingType, def, useGems: true, gemCost, requireConfirmation: true });
  };
  const handlePlaceShopBuilding = async (gx, gy) => {
    if (!pendingShopPlacement) return;
    const { buildingType, def, useGems, gemCost, requireConfirmation } = pendingShopPlacement;
    if (gx === null || gy === null) {
      setPendingShopPlacement(null);
      return;
    }
    const fw = def.footprint[0];
    const fh = def.footprint[1];
    const FOREST_RING = 10;
    if (gx < FOREST_RING || gy < FOREST_RING || gx + fw > GRID_SIZE - FOREST_RING || gy + fh > GRID_SIZE - FOREST_RING) {
      toast.error("Invalid placement!");
      return;
    }
    for (const b of buildings) {
      const spacing = buildingType === "wall" ? 0 : 1;
      if (gx < b.grid_x + b.footprint_w + spacing && gx + fw + spacing > b.grid_x && gy < b.grid_y + b.footprint_h + spacing && gy + fh + spacing > b.grid_y) {
        toast.error("Cannot place here!");
        return;
      }
    }
    if (useGems && requireConfirmation) {
      if ((playerBase?.gems ?? 0) < gemCost) {
        toast.error("Not enough gems!");
        setPendingShopPlacement(null);
        return;
      }
      setGemPlacementConfirm({ buildingType, def, gemCost, gx, gy });
      return;
    }
    await finalizeShopPlacement(buildingType, def, gx, gy, useGems, gemCost);
    if (buildingType === "wall") {
      toast.success(`${def.name} placed! Right-click to place another.`);
    }
  };
  const finalizeShopPlacement = async (buildingType, def, gx, gy, useGems, gemCost) => {
    try {
      if (!useGems) {
        if ((playerBase?.gold ?? 0) < def.baseCostGold || (playerBase?.mana ?? 0) < def.baseCostMana) {
          toast.error("Not enough resources!");
          setPendingShopPlacement(null);
          return;
        }
        await base44.entities.PlayerBase.update(playerBase.id, {
          gold: playerBase.gold - def.baseCostGold,
          mana: playerBase.mana - def.baseCostMana
        });
      } else {
        await base44.entities.PlayerBase.update(playerBase.id, {
          gems: playerBase.gems - gemCost
        });
      }
      const newBuilding = await base44.entities.Building.create({
        player_id: user.id,
        building_type: buildingType,
        level: 1,
        grid_x: gx,
        grid_y: gy,
        footprint_w: def.footprint[0],
        footprint_h: def.footprint[1],
        hp: 100,
        max_hp: 100
      });
      setBuildings((prev) => [...prev, newBuilding]);
      setPendingShopPlacement(null);
      setGemPlacementConfirm(null);
      toast.success(`${def.name} placed!`);
    } catch (error) {
      console.error("Failed to place building:", error);
      toast.error("Placement failed. Please try again.");
      setPendingShopPlacement(null);
      setGemPlacementConfirm(null);
    }
  };
  const confirmGemPlacement = () => {
    if (!gemPlacementConfirm) return;
    const { buildingType, def, gemCost, gx, gy } = gemPlacementConfirm;
    finalizeShopPlacement(buildingType, def, gx, gy, true, gemCost);
  };
  const cancelGemPlacement = () => {
    setGemPlacementConfirm(null);
    setPendingShopPlacement(null);
  };
  const handleWallDrag = (cells) => {
    if (!pendingShopPlacement || pendingShopPlacement.buildingType !== "wall") return;
    const def = BUILDING_DEFS["wall"];
    const { useGems, gemCost } = pendingShopPlacement;
    let maxWalls = 0;
    const thLevel = playerBase?.town_hall_level ?? 1;
    for (let lvl = 1; lvl <= thLevel; lvl++) {
      if (TH_SHOP_UNLOCKS[lvl]?.wall != null) maxWalls = TH_SHOP_UNLOCKS[lvl].wall;
    }
    const currentWalls = buildings.filter((b) => b.building_type === "wall").length;
    const remaining = Math.max(0, maxWalls - currentWalls);
    const trimmed = cells.slice(0, remaining);
    if (trimmed.length === 0) {
      toast.error("Wall limit reached for your Town Hall level!");
      return;
    }
    const count = trimmed.length;
    const totalGold = useGems ? 0 : count * def.baseCostGold;
    const totalGems = useGems ? count * (gemCost ?? 1) : 0;
    setWallDragConfirm({ cells: trimmed, count, totalGold, totalGems, useGems, def });
  };
  const confirmWallDrag = async () => {
    if (!wallDragConfirm) return;
    const { cells, totalGold, totalGems, useGems, def } = wallDragConfirm;
    if (!useGems && (playerBase?.gold ?? 0) < totalGold) {
      toast.error("Not enough gold!");
      setWallDragConfirm(null);
      return;
    }
    if (useGems && (playerBase?.gems ?? 0) < totalGems) {
      toast.error("Not enough gems!");
      setWallDragConfirm(null);
      return;
    }
    if (!useGems) {
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gold: playerBase.gold - totalGold
      });
      setPlayerBase(updatedBase);
    } else {
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gems: playerBase.gems - totalGems
      });
      setPlayerBase(updatedBase);
    }
    const created = await Promise.all(cells.map(
      ({ gx, gy }) => base44.entities.Building.create({
        player_id: user.id,
        building_type: "wall",
        level: 1,
        grid_x: gx,
        grid_y: gy,
        footprint_w: 1,
        footprint_h: 1,
        hp: 100,
        max_hp: 100
      })
    ));
    setBuildings((prev) => [...prev, ...created]);
    setWallDragConfirm(null);
    toast.success(`${cells.length} wall${cells.length > 1 ? "s" : ""} placed!`);
  };
  const cancelWallDrag = () => {
    setWallDragConfirm(null);
  };
  const handleWallGroupSelect = (group) => {
    setWallGroup(group && group.length > 0 ? group : null);
    setSelectedBuilding(null);
  };
  const handleWallGroupUpgradeAll = async () => {
    if (!wallGroup) return;
    const thLevel = playerBase?.town_hall_level ?? 1;
    const levelCap = getBuildingLevelCap("wall", thLevel);
    const toUpgrade = wallGroup.filter((w) => w.level < levelCap && !w.is_upgrading);
    if (toUpgrade.length === 0) return;
    let totalGold = 0, totalMana = 0;
    for (const w of toUpgrade) {
      const c = getUpgradeCost("wall", w.level);
      totalGold += c.gold;
      totalMana += c.mana;
    }
    if ((playerBase?.gold ?? 0) < totalGold || (playerBase?.mana ?? 0) < totalMana) {
      toast.error("Not enough resources to upgrade all walls!");
      return;
    }
    const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
      gold: playerBase.gold - totalGold,
      mana: playerBase.mana - totalMana
    });
    setPlayerBase(updatedBase);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const upgraded = await Promise.all(toUpgrade.map((w) => {
      const c = getUpgradeCost("wall", w.level);
      return base44.entities.Building.update(w.id, {
        is_upgrading: true,
        upgrade_started_at: now,
        upgrade_duration_seconds: c.seconds
      });
    }));
    setBuildings((prev) => prev.map((b) => {
      const u = upgraded.find((x) => x.id === b.id);
      return u || b;
    }));
    setWallGroup((prev) => prev?.map((w) => {
      const u = upgraded.find((x) => x.id === w.id);
      return u || w;
    }) || null);
    toast.success(`Upgrading ${toUpgrade.length} wall${toUpgrade.length > 1 ? "s" : ""}!`);
  };
  const handleWallGroupMoveAll = () => {
    if (!wallGroup || !gridRef.current) return;
    gridRef.current.startGroupMoveMode(wallGroup);
  };
  const handleWallGroupRotate = async () => {
    if (!wallGroup || wallGroup.length < 2) return;
    const allSameGx = wallGroup.every((w) => w.grid_x === wallGroup[0].grid_x);
    const allSameGy = wallGroup.every((w) => w.grid_y === wallGroup[0].grid_y);
    if (!allSameGx && !allSameGy) {
      toast.error("Can only rotate straight wall lines!");
      return;
    }
    const cx = Math.round(wallGroup.reduce((s, w) => s + w.grid_x, 0) / wallGroup.length);
    const cy = Math.round(wallGroup.reduce((s, w) => s + w.grid_y, 0) / wallGroup.length);
    const rotated = wallGroup.map((w) => ({
      ...w,
      grid_x: cx - (w.grid_y - cy),
      grid_y: cy + (w.grid_x - cx)
    }));
    const occupied = new Set(buildings.filter((b) => !wallGroup.find((w) => w.id === b.id)).map((b) => `${b.grid_x},${b.grid_y}`));
    const FOREST_RING = 10;
    for (const rw of rotated) {
      if (rw.grid_x < FOREST_RING || rw.grid_y < FOREST_RING || rw.grid_x >= GRID_SIZE - FOREST_RING || rw.grid_y >= GRID_SIZE - FOREST_RING) {
        toast.error("Rotation blocked by boundary!");
        return;
      }
      if (occupied.has(`${rw.grid_x},${rw.grid_y}`)) {
        toast.error("Rotation blocked by another building!");
        return;
      }
    }
    const updated = await Promise.all(rotated.map(
      (rw) => base44.entities.Building.update(rw.id, { grid_x: rw.grid_x, grid_y: rw.grid_y })
    ));
    setBuildings((prev) => prev.map((b) => {
      const u = updated.find((x) => x.id === b.id);
      return u || b;
    }));
    setWallGroup(updated);
    toast.success("Wall group rotated 90°!");
  };
  const handleMoveBuilding_extended = async (buildingOrGroup, newX, newY) => {
    if (buildingOrGroup?.__wallGroup) {
      const { walls, dgx, dgy } = buildingOrGroup;
      const updated = await Promise.all(walls.map(
        (w) => base44.entities.Building.update(w.id, { grid_x: w.grid_x + dgx, grid_y: w.grid_y + dgy })
      ));
      setBuildings((prev) => prev.map((b) => {
        const u = updated.find((x) => x.id === b.id);
        return u || b;
      }));
      setWallGroup(updated);
      toast.success(`Moved ${walls.length} wall${walls.length > 1 ? "s" : ""}!`);
      return;
    }
    handleMoveBuilding(buildingOrGroup, newX, newY);
  };
  const handleUpgradeHero = async (hero) => {
    if ((playerBase?.gold ?? 0) < 500) {
      toast.error("Not enough gold! Need 500 gold.");
      return;
    }
    const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
      gold: playerBase.gold - 500
    });
    setPlayerBase(updatedBase);
    const updated = await base44.entities.Hero.update(hero.id, {
      level: hero.level + 1,
      max_hp: hero.max_hp + 30,
      hp: hero.hp + 30,
      attack: hero.attack + 5,
      defense: hero.defense + 3
    });
    setHeroes((prev) => prev.map((h) => h.id === updated.id ? updated : h));
    toast.success(`${hero.name} upgraded to Level ${hero.level + 1}!`);
  };
  const handleVictory = async (dungeon) => {
    setActiveDungeon(null);
    const updates = {
      gold: Math.min(playerBase.gold + dungeon.goldRew, playerBase.gold_capacity),
      mana: Math.min(playerBase.mana + dungeon.manaRew, playerBase.mana_capacity),
      soul_shards: (playerBase.soul_shards || 0) + dungeon.shardRew
    };
    if (dungeon.level === 10 && dungeon.territory) {
      const territoryDef = TERRITORY_DEFS[dungeon.territory - 1];
      if (territoryDef) {
        updates.gems = (playerBase.gems || 0) + territoryDef.gemReward;
        toast.success(`🎉 Territory ${dungeon.territory} cleared! +${territoryDef.gemReward.toLocaleString()} 💎`);
      }
    }
    const updated = await base44.entities.PlayerBase.update(playerBase.id, updates);
    setPlayerBase(updated);
    toast.success(`⚔️ Victory! +${dungeon.goldRew.toLocaleString()}💰 +${dungeon.manaRew.toLocaleString()}🔷 +${dungeon.shardRew}💜`);
  };
  const handleDefeat = () => {
    setActiveDungeon(null);
    toast.error("☠️ Defeated! Train more troops and try again.");
  };
  const handleCollectResources = async () => {
    const { goldCollected, manaCollected, buildingsToUpdate } = collectFromMines(buildings, playerBase);
    if (goldCollected === 0 && manaCollected === 0) {
      toast.error("No resources to collect!");
      return;
    }
    const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
      gold: playerBase.gold + goldCollected,
      mana: playerBase.mana + manaCollected
    });
    setPlayerBase(updatedBase);
    for (const b of buildingsToUpdate) {
      await base44.entities.Building.update(b.id, { custom_data: b.custom_data });
    }
    setBuildings((prev) => prev.map((b) => {
      const updated = buildingsToUpdate.find((x) => x.id === b.id);
      return updated ? updated : b;
    }));
    toast.success(`📦 Collected ${goldCollected > 0 ? `${goldCollected.toLocaleString()}💰` : ""}${goldCollected > 0 && manaCollected > 0 ? " + " : ""}${manaCollected > 0 ? `${manaCollected.toLocaleString()}🔷` : ""}!`);
  };
  const handleBuyResourcePack = async (pack) => {
    try {
      const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
        gems: playerBase.gems - pack.gemCost,
        [pack.resource]: playerBase[pack.resource] + pack.amount
      });
      setPlayerBase(updatedBase);
      toast.success(`💎 Purchased ${pack.name}! +${pack.amount.toLocaleString()} ${pack.resource.toUpperCase()}`);
      setShowGemShop(false);
    } catch (error) {
      console.error("Failed to buy resource pack:", error);
      toast.error("Purchase failed. Please try again.");
    }
  };
  const handleConvertToPacks = async (resourceType, packType, distribution) => {
    const gemCost = resourceType === "gold" ? distribution.storedAmount > 1e5 ? 150 : distribution.storedAmount > 1e4 ? 50 : 10 : distribution.storedAmount > 1e5 ? 150 : distribution.storedAmount > 1e4 ? 50 : 10;
    if ((playerBase?.gems ?? 0) < gemCost) {
      toast.error("Not enough gems!");
      return;
    }
    const updatedBase = await base44.entities.PlayerBase.update(playerBase.id, {
      gems: playerBase.gems - gemCost,
      pending_overflow_gold: resourceType === "gold" ? 0 : playerBase.pending_overflow_gold,
      pending_overflow_mana: resourceType === "mana" ? 0 : playerBase.pending_overflow_mana
    });
    setPlayerBase(updatedBase);
    if (distribution.packCount > 0) {
      await base44.entities.ResourcePack.create({
        player_id: user.id,
        pack_type: packType,
        resource_type: resourceType,
        quantity: distribution.packCount
      });
    }
    toast.success(`📦 Converted ${distribution.storedAmount.toLocaleString()} ${resourceType.toUpperCase()} to ${distribution.packCount} ${packType} packs!`);
    setShowPackConversion(false);
    setPendingOverflow({ gold: 0, mana: 0 });
  };
  const closeAllDevPanels = () => {
    setShowPixelEditor(false);
    setShowDungeonEditor(false);
    setShowHeroCreator(false);
    setShowHeroEditor(false);
    setShowWallLayerEditor(false);
    setShowBuildingHpEditor(false);
    setShowBuildingStatsEditor(false);
    setShowDocumentation(false);
  };
  const handleResetGame = async () => {
    if (!confirm("Are you sure you want to reset game progress? Design edits, stat overrides, and hero definitions will be preserved.")) return;
    setLoading(true);
    setLoadingMessage("RESETTING KINGDOM...");
    const PRESERVE_KEYS = [
      "building_sprites_v1",
      "published_building_sprites_v1",
      "building_hp_overrides_v1",
      "building_time_overrides_v1",
      "building_cost_overrides_v1",
      "hero_definitions_v1",
      "hero_sprites_v1",
      "published_hero_sprites_v1",
      "wall_layer_sprites_v1",
      "wall_link_layers_v1",
      "published_wall_layers_v1",
      "dev_documentation_v2"
    ];
    const preservedEntries = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (PRESERVE_KEYS.includes(key) || key.startsWith("dungeon_layout_")) {
        preservedEntries[key] = localStorage.getItem(key);
      }
    }
    try {
      await Promise.all(
        [
          base44.entities.Building.deleteMany({ player_id: user.id }),
          base44.entities.Hero.deleteMany({ player_id: user.id }),
          base44.entities.Troop.deleteMany({ player_id: user.id }),
          base44.entities.Aspect.deleteMany({ player_id: user.id }),
          base44.entities.ResourcePack.deleteMany({ player_id: user.id }),
          base44.entities.DungeonRun.deleteMany({ player_id: user.id }),
          base44.entities.Gear.deleteMany({ player_id: user.id }),
          base44.entities.Spell.deleteMany({ player_id: user.id })
        ]
      );
      if (playerBase) {
        await base44.entities.PlayerBase.delete(playerBase.id);
      }
      const newBase = await base44.entities.PlayerBase.create({
        player_id: user.id,
        town_hall_level: 1,
        gold: 5e3,
        mana: 5e3,
        soul_shards: 0,
        gems: 0,
        gold_capacity: 3e4,
        mana_capacity: 3e4,
        last_resource_tick: (/* @__PURE__ */ new Date()).toISOString(),
        gold_per_hour: 0,
        mana_per_hour: 0,
        last_auto_collect: null,
        pending_overflow_gold: 0,
        pending_overflow_mana: 0
      });
      await initializeNewBase(base44, user.id);
      const [freshBldgs, freshHeroes, freshTroops, freshAspects] = await Promise.all(
        [
          base44.entities.Building.filter({ player_id: user.id }),
          base44.entities.Hero.filter({ player_id: user.id }),
          base44.entities.Troop.filter({ player_id: user.id }),
          base44.entities.Aspect.filter({ player_id: user.id })
        ]
      );
      setPlayerBase(newBase);
      setBuildings(freshBldgs);
      setHeroes(freshHeroes);
      setTroops(freshTroops);
      setAspects(freshAspects);
      setPendingShopPlacement(null);
      setGemPlacementConfirm(null);
      setSelectedBuilding(null);
      setShowShop(false);
      setShowAltar(false);
      setShowDungeons(false);
      setShowPackConversion(false);
      setShowGemShop(false);
      for (const [key, val] of Object.entries(preservedEntries)) {
        localStorage.setItem(key, val);
      }
      toast.success("🎮 Game reset! All progress cleared. Design edits preserved.");
    } catch (error) {
      console.error("Failed to reset game:", error);
      toast.error("Reset failed. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1065:6", "data-dynamic-content": "true", className: "fixed inset-0 flex flex-col items-center justify-center", style: { background: "#0a0a12" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1066:8", "data-dynamic-content": "true", className: "font-pixel text-yellow-400 text-xs mb-4 animate-pulse", "data-collection-item-field": "loadingMessage", children: loadingMessage }, void 0, false, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1085,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1067:8", "data-dynamic-content": "false", className: "w-12 h-12 border-4 border-yellow-800 border-t-yellow-400 rounded-full animate-spin" }, void 0, false, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1086,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1084,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1073:4", "data-dynamic-content": "true", className: "fixed inset-0 overflow-hidden", style: { background: "#0d1117" }, children: [
    /* @__PURE__ */ jsxDEV(
      IsometricGrid,
      {
        "data-source-location": "pages/Game:1075:6",
        "data-dynamic-content": "true",
        ref: gridRef,
        buildings,
        heroes,
        selectedBuilding,
        onSelectBuilding: (b) => {
          setSelectedBuilding(b);
          if (b) setWallGroup(null);
        },
        onMoveBuilding: handleMoveBuilding_extended,
        pendingShopPlacement,
        onPlaceShopBuilding: handlePlaceShopBuilding,
        onWallDrag: handleWallDrag,
        wallGroup,
        onWallGroupSelect: handleWallGroupSelect
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1094,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      HUD,
      {
        "data-source-location": "pages/Game:1090:6",
        "data-dynamic-content": "true",
        playerBase,
        townHallLevel: buildings.find((b) => b.building_type === "town_hall")?.level || playerBase?.town_hall_level || 1,
        onOpenShop: () => {
          setShowShop(true);
          setSelectedBuilding(null);
        },
        onOpenDungeons: () => {
          setShowDungeons(true);
          setSelectedBuilding(null);
        },
        onOpenAltar: () => {
          setShowAltar(true);
          setSelectedBuilding(null);
        },
        onOpenGemShop: () => {
          setShowGemShop(true);
          setSelectedBuilding(null);
        },
        onOpenPixelEditor: () => {
          closeAllDevPanels();
          setShowPixelEditor(true);
          setSelectedBuilding(null);
        },
        onOpenDungeonEditor: () => {
          closeAllDevPanels();
          setShowDungeonEditor(true);
          setSelectedBuilding(null);
        },
        onOpenHeroCreator: () => {
          closeAllDevPanels();
          setShowHeroCreator(true);
          setSelectedBuilding(null);
        },
        onOpenHeroEditor: () => {
          closeAllDevPanels();
          setShowHeroEditor(true);
          setSelectedBuilding(null);
        },
        onOpenWallLayerEditor: () => {
          closeAllDevPanels();
          setShowWallLayerEditor(true);
          setSelectedBuilding(null);
        },
        onOpenBuildingHpEditor: () => {
          closeAllDevPanels();
          setShowBuildingHpEditor(true);
          setSelectedBuilding(null);
        },
        onOpenBuildingStatsEditor: () => {
          closeAllDevPanels();
          setShowBuildingStatsEditor(true);
          setSelectedBuilding(null);
        },
        onOpenDocumentation: () => {
          closeAllDevPanels();
          setShowDocumentation(true);
          setSelectedBuilding(null);
        },
        showCollectButton,
        onCollect: handleCollectResources,
        onReset: handleResetGame,
        onSetGems: async (amount, partialUpdates) => {
          if (partialUpdates) {
            const updated = await base44.entities.PlayerBase.update(playerBase.id, partialUpdates);
            setPlayerBase(updated);
          } else {
            const updated = await base44.entities.PlayerBase.update(playerBase.id, { gems: amount });
            setPlayerBase(updated);
          }
        }
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1109,
        columnNumber: 7
      },
      this
    ),
    wallGroup && wallGroup.length > 0 && !selectedBuilding && /* @__PURE__ */ jsxDEV(
      WallGroupPanel,
      {
        "data-source-location": "pages/Game:1121:8",
        "data-dynamic-content": "true",
        walls: wallGroup,
        playerBase,
        onClose: () => setWallGroup(null),
        onUpgradeAll: handleWallGroupUpgradeAll,
        onMoveAll: handleWallGroupMoveAll,
        onRotateAll: handleWallGroupRotate
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1140,
        columnNumber: 7
      },
      this
    ),
    selectedBuilding && /* @__PURE__ */ jsxDEV(
      BuildingPanel,
      {
        "data-source-location": "pages/Game:1133:8",
        "data-dynamic-content": "true",
        building: selectedBuilding,
        playerBase,
        heroes,
        onUpgrade: handleUpgradeBuilding,
        onSpeedUp: handleSpeedUpUpgrade,
        onUpgradeWithGems: handleUpgradeWithGems,
        onClose: () => setSelectedBuilding(null),
        onMove: () => gridRef.current?.startMoveMode(selectedBuilding)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1152,
        columnNumber: 7
      },
      this
    ),
    showShop && /* @__PURE__ */ jsxDEV(
      ShopModal,
      {
        "data-source-location": "pages/Game:1147:8",
        "data-dynamic-content": "true",
        playerBase,
        buildings,
        onBuy: handleBuyFromShop,
        onBuyWithGems: handleBuyFromShopWithGems,
        onClose: () => setShowShop(false)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1166,
        columnNumber: 7
      },
      this
    ),
    showAltar && /* @__PURE__ */ jsxDEV(
      AltarModal,
      {
        "data-source-location": "pages/Game:1156:8",
        "data-dynamic-content": "true",
        heroes,
        aspects,
        playerBase,
        heroBuildings: buildings.filter((b) => b.building_type === "hero_base"),
        onUpgradeHero: handleUpgradeHero,
        onClose: () => setShowAltar(false),
        onRollHero: async (heroData, activate) => {
          if (!activate) {
            const updated = await base44.entities.PlayerBase.update(playerBase.id, {
              gems: Math.max(0, (playerBase.gems ?? 0) - heroData.gem_cost)
            });
            setPlayerBase(updated);
          } else {
            const newHero = await base44.entities.Hero.create({
              player_id: user.id,
              hero_type: heroData.heroDefId || heroData.id,
              name: heroData.heroName || heroData.name,
              rarity: heroData.heroRarity || heroData.rarity || "common",
              level: 1,
              hp: heroData.heroStats?.hp ?? heroData.hp ?? 200,
              max_hp: heroData.heroStats?.hp ?? heroData.hp ?? 200,
              attack: heroData.heroStats?.attack ?? heroData.attack ?? 25,
              defense: heroData.heroStats?.defense ?? heroData.defense ?? 15,
              speed: heroData.heroStats?.speed ?? heroData.speed ?? 10,
              experience: 0,
              is_unlocked: true,
              portrait: heroData.heroDefId || heroData.id || "warrior"
            });
            setHeroes((prev) => [...prev, newHero]);
            toast.success(`🦸 ${newHero.name} has joined your kingdom!`);
          }
        }
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1175,
        columnNumber: 7
      },
      this
    ),
    showDungeons && /* @__PURE__ */ jsxDEV(
      DungeonsModal,
      {
        "data-source-location": "pages/Game:1194:8",
        "data-dynamic-content": "true",
        playerBase,
        heroes,
        troops,
        onEnterDungeon: (dungeon) => {
          setActiveDungeon(dungeon);
          setShowDungeons(false);
        },
        onClose: () => setShowDungeons(false)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1213,
        columnNumber: 7
      },
      this
    ),
    activeDungeon && /* @__PURE__ */ jsxDEV(
      CombatScreen,
      {
        "data-source-location": "pages/Game:1203:8",
        "data-dynamic-content": "true",
        dungeon: activeDungeon,
        heroes,
        troops,
        onClose: () => setActiveDungeon(null),
        onVictory: handleVictory,
        onDefeat: handleDefeat
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1222,
        columnNumber: 7
      },
      this
    ),
    showPackConversion && /* @__PURE__ */ jsxDEV(
      PackConversionModal,
      {
        "data-source-location": "pages/Game:1215:8",
        "data-dynamic-content": "true",
        playerBase,
        overflowGold: pendingOverflow.gold,
        overflowMana: pendingOverflow.mana,
        onConvert: handleConvertToPacks,
        onClose: () => {
          setShowPackConversion(false);
          base44.entities.PlayerBase.update(playerBase.id, {
            pending_overflow_gold: 0,
            pending_overflow_mana: 0
          });
          setPendingOverflow({ gold: 0, mana: 0 });
        }
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1234,
        columnNumber: 7
      },
      this
    ),
    showGemShop && /* @__PURE__ */ jsxDEV(
      GemShopModal,
      {
        "data-source-location": "pages/Game:1233:8",
        "data-dynamic-content": "true",
        playerBase,
        onBuy: handleBuyResourcePack,
        onClose: () => setShowGemShop(false)
      },
      void 0,
      false,
      {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1252,
        columnNumber: 7
      },
      this
    ),
    showPixelEditor && /* @__PURE__ */ jsxDEV(PixelEditor, { "data-source-location": "pages/Game:1240:8", "data-dynamic-content": "true", onClose: () => setShowPixelEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1259,
      columnNumber: 7
    }, this),
    showDungeonEditor && /* @__PURE__ */ jsxDEV(DungeonEditorLayout, { "data-source-location": "pages/Game:1243:8", "data-dynamic-content": "true", onClose: () => setShowDungeonEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1262,
      columnNumber: 7
    }, this),
    showHeroCreator && /* @__PURE__ */ jsxDEV(HeroCreator, { "data-source-location": "pages/Game:1246:8", "data-dynamic-content": "true", onClose: () => setShowHeroCreator(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1265,
      columnNumber: 7
    }, this),
    showHeroEditor && /* @__PURE__ */ jsxDEV(HeroEditor, { "data-source-location": "pages/Game:1249:8", "data-dynamic-content": "true", onClose: () => setShowHeroEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1268,
      columnNumber: 7
    }, this),
    showWallLayerEditor && /* @__PURE__ */ jsxDEV(WallLayerEditor, { "data-source-location": "pages/Game:1252:8", "data-dynamic-content": "true", onClose: () => setShowWallLayerEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1271,
      columnNumber: 7
    }, this),
    showBuildingHpEditor && /* @__PURE__ */ jsxDEV(BuildingHpEditor, { "data-source-location": "pages/Game:1255:8", "data-dynamic-content": "true", onClose: () => setShowBuildingHpEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1274,
      columnNumber: 7
    }, this),
    showBuildingStatsEditor && /* @__PURE__ */ jsxDEV(BuildingStatsEditor, { "data-source-location": "pages/Game:1258:8", "data-dynamic-content": "true", onClose: () => setShowBuildingStatsEditor(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1277,
      columnNumber: 7
    }, this),
    showDocumentation && /* @__PURE__ */ jsxDEV(DevDocumentation, { "data-source-location": "pages/Game:1261:8", "data-dynamic-content": "true", onClose: () => setShowDocumentation(false) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1280,
      columnNumber: 7
    }, this),
    wallDragConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1266:8", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1267:10", "data-dynamic-content": "true", className: "panel-dark rounded-lg p-5 w-[320px]", style: { background: "#d4b896", border: "2px solid #6b3f1f" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1268:12", "data-dynamic-content": "true", className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1269:14", "data-dynamic-content": "true", className: "font-pixel text-[9px] mb-2", style: { color: "#3d1f05" }, children: "PLACE WALLS?" }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1288,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1270:14", "data-dynamic-content": "true", className: "font-ui text-sm", style: { color: "#6b3f1f" }, "data-collection-item-field": "count", "data-collection-item-id": wallDragConfirm?.id || wallDragConfirm?._id, children: [
          wallDragConfirm.count,
          " wall",
          wallDragConfirm.count > 1 ? "s" : ""
        ] }, void 0, true, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1289,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1273:14", "data-dynamic-content": "true", className: "font-ui text-xs mt-1", style: { color: "#6b3f1f" }, children: wallDragConfirm.useGems ? `Spend ${wallDragConfirm.totalGems} 💎 gems?` : `Spend ${wallDragConfirm.totalGold.toLocaleString()} 💰 gold?` }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1292,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1278:14", "data-dynamic-content": "true", className: "font-ui text-lg font-bold mt-2", style: { color: wallDragConfirm.useGems ? "#60a5fa" : "#fbbf24" }, children: wallDragConfirm.useGems ? `💎 ${wallDragConfirm.totalGems}` : `💰 ${wallDragConfirm.totalGold.toLocaleString()}` }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1297,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1287,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1282:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/Game:1283:14", "data-dynamic-content": "true", onClick: cancelWallDrag, className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all", style: { background: "#6b3f1f", color: "#f5e6d0", border: "1px solid #3d1f05" }, children: "CANCEL" }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1302,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-source-location": "pages/Game:1286:14", "data-dynamic-content": "true", onClick: confirmWallDrag, className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all btn-rpg", children: "YES, PLACE" }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1305,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1301,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1286,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1285,
      columnNumber: 7
    }, this),
    gemPlacementConfirm && /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1296:8", "data-dynamic-content": "true", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1297:10", "data-dynamic-content": "true", className: "panel-dark rounded-lg p-5 w-[320px]", style: { background: "#d4b896", border: "2px solid #6b3f1f" }, children: [
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1298:12", "data-dynamic-content": "true", className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1299:14", "data-dynamic-content": "true", className: "font-pixel text-[9px] mb-2", style: { color: "#3d1f05" }, children: "CONFIRM PLACEMENT" }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1318,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1300:14", "data-dynamic-content": "true", className: "font-ui text-sm", style: { color: "#6b3f1f" }, "data-collection-item-field": "def.name", "data-collection-item-id": gemPlacementConfirm?.id || gemPlacementConfirm?._id, children: gemPlacementConfirm.def.name }, void 0, false, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1319,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1303:14", "data-dynamic-content": "true", className: "font-ui text-xs mt-1", style: { color: "#6b3f1f" }, "data-collection-item-field": "gemCost", "data-collection-item-id": gemPlacementConfirm?.id || gemPlacementConfirm?._id, children: [
          "Spend ",
          gemPlacementConfirm.gemCost,
          " gems to place here?"
        ] }, void 0, true, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1322,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1306:14", "data-dynamic-content": "true", className: "font-ui text-lg font-bold mt-2", style: { color: "#60a5fa" }, "data-collection-item-field": "gemCost", "data-collection-item-id": gemPlacementConfirm?.id || gemPlacementConfirm?._id, children: [
          "💎 ",
          gemPlacementConfirm.gemCost
        ] }, void 0, true, {
          fileName: "/app/src/pages/Game.jsx",
          lineNumber: 1325,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1317,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-source-location": "pages/Game:1310:12", "data-dynamic-content": "true", className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "pages/Game:1311:14",
            "data-dynamic-content": "true",
            onClick: cancelGemPlacement,
            className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all",
            style: { background: "#6b3f1f", color: "#f5e6d0", border: "1px solid #3d1f05" },
            children: "CANCEL"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Game.jsx",
            lineNumber: 1330,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            "data-source-location": "pages/Game:1318:14",
            "data-dynamic-content": "true",
            onClick: confirmGemPlacement,
            className: "flex-1 py-2 rounded font-pixel text-[8px] transition-all btn-rpg",
            style: {
              background: "linear-gradient(180deg, hsl(280 65% 55%) 0%, hsl(280 60% 40%) 100%)",
              border: "2px solid hsl(280 70% 65%)"
            },
            children: "CONFIRM"
          },
          void 0,
          false,
          {
            fileName: "/app/src/pages/Game.jsx",
            lineNumber: 1337,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/src/pages/Game.jsx",
        lineNumber: 1329,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1316,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/Game.jsx",
      lineNumber: 1315,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/Game.jsx",
    lineNumber: 1092,
    columnNumber: 5
  }, this);
}
_s(Game, "k3nN+pIoAxBVyaJufyNGhFZi9MU=");
_c = Game;
var _c;
$RefreshReg$(_c, "Game");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/pages/Game.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/pages/Game.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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Y3QiLCJ1c2VSZWYiLCJiYXNlNDQiLCJpbml0aWFsaXplTmV3QmFzZSIsInRpY2tSZXNvdXJjZXMiLCJjYWxjdWxhdGVNaW5lUHJvZHVjdGlvbiIsImNvbGxlY3RGcm9tTWluZXMiLCJnZXRCdWlsZGluZ01heEhQIiwiZ2V0VmF1bHRDYXBhY2l0eSIsImdldE1pbmVQcm9kdWN0aW9uIiwiZ2V0QXV0b0NvbGxlY3RJbnRlcnZhbEhvdXJzIiwiQlVJTERJTkdfREVGUyIsIlRIX1NIT1BfVU5MT0NLUyIsImdldFVwZ3JhZGVDb3N0IiwiZm9ybWF0VGltZSIsIkdSSURfU0laRSIsImdldEJ1aWxkaW5nTGV2ZWxDYXAiLCJURVJSSVRPUllfREVGUyIsIklzb21ldHJpY0dyaWQiLCJIVUQiLCJCdWlsZGluZ1BhbmVsIiwiU2hvcE1vZGFsIiwiQWx0YXJNb2RhbCIsIkR1bmdlb25zTW9kYWwiLCJDb21iYXRTY3JlZW4iLCJQYWNrQ29udmVyc2lvbk1vZGFsIiwiR2VtU2hvcE1vZGFsIiwiUGl4ZWxFZGl0b3IiLCJEdW5nZW9uRWRpdG9yIiwiRHVuZ2VvbkVkaXRvckxheW91dCIsIldhbGxHcm91cFBhbmVsIiwiSGVyb0NyZWF0b3IiLCJIZXJvRWRpdG9yIiwiV2FsbExheWVyRWRpdG9yIiwiQnVpbGRpbmdIcEVkaXRvciIsIkJ1aWxkaW5nU3RhdHNFZGl0b3IiLCJEZXZEb2N1bWVudGF0aW9uIiwidG9hc3QiLCJHYW1lIiwiX3MiLCJ1c2VyIiwic2V0VXNlciIsInBsYXllckJhc2UiLCJzZXRQbGF5ZXJCYXNlIiwiYnVpbGRpbmdzIiwic2V0QnVpbGRpbmdzIiwiaGVyb2VzIiwic2V0SGVyb2VzIiwidHJvb3BzIiwic2V0VHJvb3BzIiwiYXNwZWN0cyIsInNldEFzcGVjdHMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImxvYWRpbmdNZXNzYWdlIiwic2V0TG9hZGluZ01lc3NhZ2UiLCJzZWxlY3RlZEJ1aWxkaW5nIiwic2V0U2VsZWN0ZWRCdWlsZGluZyIsImdyaWRSZWYiLCJzaG93U2hvcCIsInNldFNob3dTaG9wIiwic2hvd0FsdGFyIiwic2V0U2hvd0FsdGFyIiwic2hvd0R1bmdlb25zIiwic2V0U2hvd0R1bmdlb25zIiwiYWN0aXZlRHVuZ2VvbiIsInNldEFjdGl2ZUR1bmdlb24iLCJzaG93Q29sbGVjdEJ1dHRvbiIsInNldFNob3dDb2xsZWN0QnV0dG9uIiwic2hvd1BhY2tDb252ZXJzaW9uIiwic2V0U2hvd1BhY2tDb252ZXJzaW9uIiwic2hvd0dlbVNob3AiLCJzZXRTaG93R2VtU2hvcCIsInNob3dQaXhlbEVkaXRvciIsInNldFNob3dQaXhlbEVkaXRvciIsInNob3dEdW5nZW9uRWRpdG9yIiwic2V0U2hvd0R1bmdlb25FZGl0b3IiLCJzaG93SGVyb0NyZWF0b3IiLCJzZXRTaG93SGVyb0NyZWF0b3IiLCJzaG93SGVyb0VkaXRvciIsInNldFNob3dIZXJvRWRpdG9yIiwic2hvd1dhbGxMYXllckVkaXRvciIsInNldFNob3dXYWxsTGF5ZXJFZGl0b3IiLCJzaG93QnVpbGRpbmdIcEVkaXRvciIsInNldFNob3dCdWlsZGluZ0hwRWRpdG9yIiwic2hvd0J1aWxkaW5nU3RhdHNFZGl0b3IiLCJzZXRTaG93QnVpbGRpbmdTdGF0c0VkaXRvciIsInNob3dEb2N1bWVudGF0aW9uIiwic2V0U2hvd0RvY3VtZW50YXRpb24iLCJwZW5kaW5nT3ZlcmZsb3ciLCJzZXRQZW5kaW5nT3ZlcmZsb3ciLCJnb2xkIiwibWFuYSIsInBlbmRpbmdTaG9wUGxhY2VtZW50Iiwic2V0UGVuZGluZ1Nob3BQbGFjZW1lbnQiLCJnZW1QbGFjZW1lbnRDb25maXJtIiwic2V0R2VtUGxhY2VtZW50Q29uZmlybSIsIndhbGxEcmFnQ29uZmlybSIsInNldFdhbGxEcmFnQ29uZmlybSIsIndhbGxHcm91cCIsInNldFdhbGxHcm91cCIsInJlc291cmNlVGlja1JlZiIsImxvYWRHYW1lIiwibWUiLCJhdXRoIiwiZXhpc3RpbmdCYXNlcyIsImJsZGdzIiwiaGVyb0xpc3QiLCJ0cm9vcExpc3QiLCJhc3BlY3RMaXN0IiwiUHJvbWlzZSIsImFsbCIsImVudGl0aWVzIiwiUGxheWVyQmFzZSIsImZpbHRlciIsInBsYXllcl9pZCIsImlkIiwiQnVpbGRpbmciLCJIZXJvIiwiVHJvb3AiLCJBc3BlY3QiLCJiYXNlIiwibGVuZ3RoIiwidG93bkhhbGwiLCJmaW5kIiwiYiIsImJ1aWxkaW5nX3R5cGUiLCJhY3R1YWxUSExldmVsIiwibGV2ZWwiLCJ0b3duX2hhbGxfbGV2ZWwiLCJ1cGRhdGUiLCJub3ciLCJEYXRlIiwibGFzdFRpY2siLCJsYXN0X3Jlc291cmNlX3RpY2siLCJlbGFwc2VkSG91cnMiLCJnb2xkX3Blcl9ob3VyIiwibWFuYV9wZXJfaG91ciIsImdvbGRHYWluIiwiTWF0aCIsImZsb29yIiwibWFuYUdhaW4iLCJuZXdHb2xkIiwibWluIiwiZ29sZF9jYXBhY2l0eSIsIm5ld01hbmEiLCJtYW5hX2NhcGFjaXR5IiwidG9JU09TdHJpbmciLCJjb25zb2xlIiwibG9nIiwidG9GaXhlZCIsInVwZ3JhZGVkQnVpbGRpbmdzIiwiaXNfdXBncmFkaW5nIiwidXBncmFkZV9zdGFydGVkX2F0IiwiZWxhcHNlZCIsInJlbWFpbmluZyIsInVwZ3JhZGVfZHVyYXRpb25fc2Vjb25kcyIsIm5ld0xldmVsIiwidXBkYXRlZCIsIm1heF9ocCIsImhwIiwicHVzaCIsInByZXYiLCJtYXAiLCJ1Iiwic3VjY2VzcyIsInZhdWx0QnVpbGRpbmdzIiwiY2FwYWNpdHlDaGFuZ2VkIiwibmV3QmFzZSIsInN0b3JhZ2UiLCJkZWxldGVNYW55IiwiUmVzb3VyY2VQYWNrIiwiY3JlYXRlIiwic291bF9zaGFyZHMiLCJnZW1zIiwiZnJlc2hCbGRncyIsImZyZXNoSGVyb2VzIiwiZnJlc2hUcm9vcHMiLCJmcmVzaEFzcGVjdHMiLCJjdXJyZW50Iiwic2V0SW50ZXJ2YWwiLCJvdmVyZmxvd0dvbGQiLCJvdmVyZmxvd01hbmEiLCJ0aExldmVsIiwiYXV0b0NvbGxlY3RJbnRlcnZhbCIsInVwZGF0ZXMiLCJsYXN0X2F1dG9fY29sbGVjdCIsInBlbmRpbmdfb3ZlcmZsb3dfZ29sZCIsInBlbmRpbmdfb3ZlcmZsb3dfbWFuYSIsImVycm9yIiwibWVzc2FnZSIsImluY2x1ZGVzIiwiY2xlYXJJbnRlcnZhbCIsImludGVydmFsIiwidXBncmFkaW5nIiwiYmFzZVVwZGF0ZWQiLCJtYXgiLCJnZXRUaW1lIiwieCIsIm5hbWUiLCJuZXdNYXhIUCIsInVwZGF0ZWRCYXNlIiwiaGFzUmVzb3VyY2VzIiwic29tZSIsImN1c3RvbV9kYXRhIiwic3RvcmVkX2dvbGQiLCJzdG9yZWRfbWFuYSIsInRvdGFsT3ZlcmZsb3ciLCJoYW5kbGVVcGdyYWRlQnVpbGRpbmciLCJidWlsZGluZyIsImNvc3QiLCJ1cGdyYWRlU3RhcnRUaW1lIiwidXBkYXRlZEJ1aWxkaW5nIiwic2Vjb25kcyIsIm5ld1RITGV2ZWwiLCJoYW5kbGVVcGdyYWRlV2l0aEdlbXMiLCJnZW1zTmVlZGVkIiwiZ29sZEhhcyIsIm1hbmFIYXMiLCJnb2xkTmVlZGVkIiwibWFuYU5lZWRlZCIsImdlbXNGb3JHb2xkIiwiY2VpbCIsImdlbXNGb3JNYW5hIiwidG90YWxHZW1zQ29zdCIsImhhbmRsZVNwZWVkVXBVcGdyYWRlIiwidGltZUxlZnRTZWNvbmRzIiwiZ2VtQ29zdCIsInBvdyIsImhhbmRsZU1vdmVCdWlsZGluZyIsIm5ld1giLCJuZXdZIiwiZ3JpZF94IiwiZ3JpZF95IiwiaGFuZGxlQnV5RnJvbVNob3AiLCJidWlsZGluZ1R5cGUiLCJkZWYiLCJ1c2VHZW1zIiwiaGFuZGxlQnV5RnJvbVNob3BXaXRoR2VtcyIsInJlcXVpcmVDb25maXJtYXRpb24iLCJoYW5kbGVQbGFjZVNob3BCdWlsZGluZyIsImd4IiwiZ3kiLCJmdyIsImZvb3RwcmludCIsImZoIiwiRk9SRVNUX1JJTkciLCJzcGFjaW5nIiwiZm9vdHByaW50X3ciLCJmb290cHJpbnRfaCIsImZpbmFsaXplU2hvcFBsYWNlbWVudCIsImJhc2VDb3N0R29sZCIsImJhc2VDb3N0TWFuYSIsIm5ld0J1aWxkaW5nIiwiY29uZmlybUdlbVBsYWNlbWVudCIsImNhbmNlbEdlbVBsYWNlbWVudCIsImhhbmRsZVdhbGxEcmFnIiwiY2VsbHMiLCJtYXhXYWxscyIsImx2bCIsIndhbGwiLCJjdXJyZW50V2FsbHMiLCJ0cmltbWVkIiwic2xpY2UiLCJjb3VudCIsInRvdGFsR29sZCIsInRvdGFsR2VtcyIsImNvbmZpcm1XYWxsRHJhZyIsImNyZWF0ZWQiLCJjYW5jZWxXYWxsRHJhZyIsImhhbmRsZVdhbGxHcm91cFNlbGVjdCIsImdyb3VwIiwiaGFuZGxlV2FsbEdyb3VwVXBncmFkZUFsbCIsImxldmVsQ2FwIiwidG9VcGdyYWRlIiwidyIsInRvdGFsTWFuYSIsImMiLCJ1cGdyYWRlZCIsImhhbmRsZVdhbGxHcm91cE1vdmVBbGwiLCJzdGFydEdyb3VwTW92ZU1vZGUiLCJoYW5kbGVXYWxsR3JvdXBSb3RhdGUiLCJhbGxTYW1lR3giLCJldmVyeSIsImFsbFNhbWVHeSIsImN4Iiwicm91bmQiLCJyZWR1Y2UiLCJzIiwiY3kiLCJyb3RhdGVkIiwib2NjdXBpZWQiLCJTZXQiLCJydyIsImhhcyIsImhhbmRsZU1vdmVCdWlsZGluZ19leHRlbmRlZCIsImJ1aWxkaW5nT3JHcm91cCIsIl9fd2FsbEdyb3VwIiwid2FsbHMiLCJkZ3giLCJkZ3kiLCJoYW5kbGVVcGdyYWRlSGVybyIsImhlcm8iLCJhdHRhY2siLCJkZWZlbnNlIiwiaCIsImhhbmRsZVZpY3RvcnkiLCJkdW5nZW9uIiwiZ29sZFJldyIsIm1hbmFSZXciLCJzaGFyZFJldyIsInRlcnJpdG9yeSIsInRlcnJpdG9yeURlZiIsImdlbVJld2FyZCIsInRvTG9jYWxlU3RyaW5nIiwiaGFuZGxlRGVmZWF0IiwiaGFuZGxlQ29sbGVjdFJlc291cmNlcyIsImdvbGRDb2xsZWN0ZWQiLCJtYW5hQ29sbGVjdGVkIiwiYnVpbGRpbmdzVG9VcGRhdGUiLCJoYW5kbGVCdXlSZXNvdXJjZVBhY2siLCJwYWNrIiwicmVzb3VyY2UiLCJhbW91bnQiLCJ0b1VwcGVyQ2FzZSIsImhhbmRsZUNvbnZlcnRUb1BhY2tzIiwicmVzb3VyY2VUeXBlIiwicGFja1R5cGUiLCJkaXN0cmlidXRpb24iLCJzdG9yZWRBbW91bnQiLCJwYWNrQ291bnQiLCJwYWNrX3R5cGUiLCJyZXNvdXJjZV90eXBlIiwicXVhbnRpdHkiLCJjbG9zZUFsbERldlBhbmVscyIsImhhbmRsZVJlc2V0R2FtZSIsImNvbmZpcm0iLCJQUkVTRVJWRV9LRVlTIiwicHJlc2VydmVkRW50cmllcyIsImkiLCJsb2NhbFN0b3JhZ2UiLCJrZXkiLCJzdGFydHNXaXRoIiwiZ2V0SXRlbSIsIkR1bmdlb25SdW4iLCJHZWFyIiwiU3BlbGwiLCJkZWxldGUiLCJ2YWwiLCJPYmplY3QiLCJlbnRyaWVzIiwic2V0SXRlbSIsImJhY2tncm91bmQiLCJwYXJ0aWFsVXBkYXRlcyIsInN0YXJ0TW92ZU1vZGUiLCJoZXJvRGF0YSIsImFjdGl2YXRlIiwiZ2VtX2Nvc3QiLCJuZXdIZXJvIiwiaGVyb190eXBlIiwiaGVyb0RlZklkIiwiaGVyb05hbWUiLCJyYXJpdHkiLCJoZXJvUmFyaXR5IiwiaGVyb1N0YXRzIiwic3BlZWQiLCJleHBlcmllbmNlIiwiaXNfdW5sb2NrZWQiLCJwb3J0cmFpdCIsImJvcmRlciIsImNvbG9yIiwiX2lkIiwiX2MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiR2FtZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgYmFzZTQ0IH0gZnJvbSBcIkAvYXBpL2Jhc2U0NENsaWVudFwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZU5ld0Jhc2UsIHRpY2tSZXNvdXJjZXMsIGNhbGN1bGF0ZU1pbmVQcm9kdWN0aW9uLCBjb2xsZWN0RnJvbU1pbmVzIH0gZnJvbSBcIkAvbGliL2dhbWVFbmdpbmVcIjtcbmltcG9ydCB7IGdldEJ1aWxkaW5nTWF4SFAgfSBmcm9tIFwiQC9saWIvZ2FtZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0VmF1bHRDYXBhY2l0eSwgZ2V0TWluZVByb2R1Y3Rpb24sIGdldEF1dG9Db2xsZWN0SW50ZXJ2YWxIb3VycyB9IGZyb20gXCJAL2xpYi9nYW1lQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCVUlMRElOR19ERUZTLCBUSF9TSE9QX1VOTE9DS1MsIGdldFVwZ3JhZGVDb3N0LCBmb3JtYXRUaW1lLCBHUklEX1NJWkUsIGdldEJ1aWxkaW5nTGV2ZWxDYXAgfSBmcm9tIFwiQC9saWIvZ2FtZUNvbnN0YW50c1wiO1xuaW1wb3J0IHsgVEVSUklUT1JZX0RFRlMgfSBmcm9tIFwiQC9saWIvZHVuZ2VvbkRhdGFcIjtcbmltcG9ydCBJc29tZXRyaWNHcmlkIGZyb20gXCIuLi9jb21wb25lbnRzL2dhbWUvSXNvbWV0cmljR3JpZFwiO1xuaW1wb3J0IEhVRCBmcm9tIFwiQC9jb21wb25lbnRzL2dhbWUvSFVELmpzeFwiO1xuaW1wb3J0IEJ1aWxkaW5nUGFuZWwgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nUGFuZWxcIjtcbmltcG9ydCBTaG9wTW9kYWwgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL1Nob3BNb2RhbFwiO1xuaW1wb3J0IEFsdGFyTW9kYWwgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL0FsdGFyTW9kYWxcIjtcbmltcG9ydCBEdW5nZW9uc01vZGFsIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9EdW5nZW9uc01vZGFsXCI7XG5pbXBvcnQgQ29tYmF0U2NyZWVuIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9Db21iYXRTY3JlZW5cIjtcbmltcG9ydCBQYWNrQ29udmVyc2lvbk1vZGFsIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9QYWNrQ29udmVyc2lvbk1vZGFsXCI7XG5pbXBvcnQgR2VtU2hvcE1vZGFsIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9HZW1TaG9wTW9kYWxcIjtcbmltcG9ydCBQaXhlbEVkaXRvciBmcm9tIFwiQC9jb21wb25lbnRzL2dhbWUvUGl4ZWxFZGl0b3JcIjtcbmltcG9ydCBEdW5nZW9uRWRpdG9yIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9EdW5nZW9uRWRpdG9yXCI7XG5pbXBvcnQgRHVuZ2VvbkVkaXRvckxheW91dCBmcm9tIFwiQC9jb21wb25lbnRzL2dhbWUvRHVuZ2VvbkVkaXRvckxheW91dFwiO1xuaW1wb3J0IFdhbGxHcm91cFBhbmVsIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9XYWxsR3JvdXBQYW5lbFwiO1xuaW1wb3J0IEhlcm9DcmVhdG9yIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9IZXJvQ3JlYXRvclwiO1xuaW1wb3J0IEhlcm9FZGl0b3IgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL0hlcm9FZGl0b3JcIjtcbmltcG9ydCBXYWxsTGF5ZXJFZGl0b3IgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL1dhbGxMYXllckVkaXRvclwiO1xuaW1wb3J0IEJ1aWxkaW5nSHBFZGl0b3IgZnJvbSBcIkAvY29tcG9uZW50cy9nYW1lL0J1aWxkaW5nSHBFZGl0b3JcIjtcbmltcG9ydCBCdWlsZGluZ1N0YXRzRWRpdG9yIGZyb20gXCJAL2NvbXBvbmVudHMvZ2FtZS9CdWlsZGluZ1N0YXRzRWRpdG9yXCI7XG5pbXBvcnQgRGV2RG9jdW1lbnRhdGlvbiBmcm9tIFwiQC9jb21wb25lbnRzL2dhbWUvRGV2RG9jdW1lbnRhdGlvblwiO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tIFwic29ubmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWUoKSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcGxheWVyQmFzZSwgc2V0UGxheWVyQmFzZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2J1aWxkaW5ncywgc2V0QnVpbGRpbmdzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2hlcm9lcywgc2V0SGVyb2VzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Ryb29wcywgc2V0VHJvb3BzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2FzcGVjdHMsIHNldEFzcGVjdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2xvYWRpbmdNZXNzYWdlLCBzZXRMb2FkaW5nTWVzc2FnZV0gPSB1c2VTdGF0ZShcIklOSVRJQUxJWklORy4uLlwiKTtcblxuICBjb25zdCBbc2VsZWN0ZWRCdWlsZGluZywgc2V0U2VsZWN0ZWRCdWlsZGluZ10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgZ3JpZFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3Nob3dTaG9wLCBzZXRTaG93U2hvcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93QWx0YXIsIHNldFNob3dBbHRhcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RHVuZ2VvbnMsIHNldFNob3dEdW5nZW9uc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVEdW5nZW9uLCBzZXRBY3RpdmVEdW5nZW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hvd0NvbGxlY3RCdXR0b24sIHNldFNob3dDb2xsZWN0QnV0dG9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dQYWNrQ29udmVyc2lvbiwgc2V0U2hvd1BhY2tDb252ZXJzaW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dHZW1TaG9wLCBzZXRTaG93R2VtU2hvcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93UGl4ZWxFZGl0b3IsIHNldFNob3dQaXhlbEVkaXRvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RHVuZ2VvbkVkaXRvciwgc2V0U2hvd0R1bmdlb25FZGl0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0hlcm9DcmVhdG9yLCBzZXRTaG93SGVyb0NyZWF0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0hlcm9FZGl0b3IsIHNldFNob3dIZXJvRWRpdG9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dXYWxsTGF5ZXJFZGl0b3IsIHNldFNob3dXYWxsTGF5ZXJFZGl0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0J1aWxkaW5nSHBFZGl0b3IsIHNldFNob3dCdWlsZGluZ0hwRWRpdG9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dCdWlsZGluZ1N0YXRzRWRpdG9yLCBzZXRTaG93QnVpbGRpbmdTdGF0c0VkaXRvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RG9jdW1lbnRhdGlvbiwgc2V0U2hvd0RvY3VtZW50YXRpb25dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGVuZGluZ092ZXJmbG93LCBzZXRQZW5kaW5nT3ZlcmZsb3ddID0gdXNlU3RhdGUoeyBnb2xkOiAwLCBtYW5hOiAwIH0pO1xuICBjb25zdCBbcGVuZGluZ1Nob3BQbGFjZW1lbnQsIHNldFBlbmRpbmdTaG9wUGxhY2VtZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZ2VtUGxhY2VtZW50Q29uZmlybSwgc2V0R2VtUGxhY2VtZW50Q29uZmlybV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3dhbGxEcmFnQ29uZmlybSwgc2V0V2FsbERyYWdDb25maXJtXSA9IHVzZVN0YXRlKG51bGwpOyAvLyB7IGNlbGxzLCB0b3RhbEdvbGQsIGNvdW50IH1cbiAgY29uc3QgW3dhbGxHcm91cCwgc2V0V2FsbEdyb3VwXSA9IHVzZVN0YXRlKG51bGwpOyAvLyBhcnJheSBvZiB3YWxsIGJ1aWxkaW5ncyBpbiBhIHNlbGVjdGVkIGdyb3VwXG5cbiAgY29uc3QgcmVzb3VyY2VUaWNrUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIC8vIExvYWQgZ2FtZSBkYXRhXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZEdhbWUoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRHYW1lID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZGluZ01lc3NhZ2UoXCJMT0FESU5HIEtJTkdET00uLi5cIik7XG5cbiAgICBjb25zdCBtZSA9IGF3YWl0IGJhc2U0NC5hdXRoLm1lKCk7XG4gICAgc2V0VXNlcihtZSk7XG5cbiAgICAvLyBGZXRjaCBleGlzdGluZyBkYXRhXG4gICAgY29uc3QgW2V4aXN0aW5nQmFzZXMsIGJsZGdzLCBoZXJvTGlzdCwgdHJvb3BMaXN0LCBhc3BlY3RMaXN0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS5maWx0ZXIoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pLFxuICAgIGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy5maWx0ZXIoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pLFxuICAgIGJhc2U0NC5lbnRpdGllcy5IZXJvLmZpbHRlcih7IHBsYXllcl9pZDogbWUuaWQgfSksXG4gICAgYmFzZTQ0LmVudGl0aWVzLlRyb29wLmZpbHRlcih7IHBsYXllcl9pZDogbWUuaWQgfSksXG4gICAgYmFzZTQ0LmVudGl0aWVzLkFzcGVjdC5maWx0ZXIoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pXVxuICAgICk7XG5cbiAgICBsZXQgYmFzZTtcblxuICAgIGlmIChleGlzdGluZ0Jhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIExvYWQgZXhpc3RpbmcgYmFzZVxuICAgICAgYmFzZSA9IGV4aXN0aW5nQmFzZXNbMF07XG5cbiAgICAgIC8vIEdldCB0b3duIGhhbGwgbGV2ZWwgZnJvbSB0aGUgYWN0dWFsIGJ1aWxkaW5nXG4gICAgICBjb25zdCB0b3duSGFsbCA9IGJsZGdzLmZpbmQoKGIpID0+IGIuYnVpbGRpbmdfdHlwZSA9PT0gJ3Rvd25faGFsbCcpO1xuICAgICAgY29uc3QgYWN0dWFsVEhMZXZlbCA9IHRvd25IYWxsPy5sZXZlbCB8fCAxO1xuXG4gICAgICAvLyBTeW5jIHRvd25faGFsbF9sZXZlbCBmaWVsZCB3aXRoIGFjdHVhbCBidWlsZGluZyBsZXZlbCBpZiBvdXQgb2Ygc3luY1xuICAgICAgaWYgKGJhc2UudG93bl9oYWxsX2xldmVsICE9PSBhY3R1YWxUSExldmVsKSB7XG4gICAgICAgIGJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUoYmFzZS5pZCwge1xuICAgICAgICAgIHRvd25faGFsbF9sZXZlbDogYWN0dWFsVEhMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIG9mZmxpbmUgcHJvZ3Jlc3NcbiAgICAgIHNldExvYWRpbmdNZXNzYWdlKFwiQ0FMQ1VMQVRJTkcgT0ZGTElORSBQUk9HUkVTUy4uLlwiKTtcblxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGxhc3RUaWNrID0gYmFzZS5sYXN0X3Jlc291cmNlX3RpY2sgPyBuZXcgRGF0ZShiYXNlLmxhc3RfcmVzb3VyY2VfdGljaykgOiBub3c7XG4gICAgICBjb25zdCBlbGFwc2VkSG91cnMgPSAobm93IC0gbGFzdFRpY2spIC8gKDEwMDAgKiA2MCAqIDYwKTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHJlc291cmNlcyBnYWluZWQgd2hpbGUgYXdheVxuICAgICAgaWYgKGVsYXBzZWRIb3VycyA+IDAgJiYgKGJhc2UuZ29sZF9wZXJfaG91ciA+IDAgfHwgYmFzZS5tYW5hX3Blcl9ob3VyID4gMCkpIHtcbiAgICAgICAgY29uc3QgZ29sZEdhaW4gPSBNYXRoLmZsb29yKGJhc2UuZ29sZF9wZXJfaG91ciAqIGVsYXBzZWRIb3Vycyk7XG4gICAgICAgIGNvbnN0IG1hbmFHYWluID0gTWF0aC5mbG9vcihiYXNlLm1hbmFfcGVyX2hvdXIgKiBlbGFwc2VkSG91cnMpO1xuXG4gICAgICAgIC8vIEFwcGx5IHJlc291cmNlIGdhaW5zIHdpdGggY2FwYWNpdHkgbGltaXRzXG4gICAgICAgIGNvbnN0IG5ld0dvbGQgPSBNYXRoLm1pbihiYXNlLmdvbGQgKyBnb2xkR2FpbiwgYmFzZS5nb2xkX2NhcGFjaXR5KTtcbiAgICAgICAgY29uc3QgbmV3TWFuYSA9IE1hdGgubWluKGJhc2UubWFuYSArIG1hbmFHYWluLCBiYXNlLm1hbmFfY2FwYWNpdHkpO1xuXG4gICAgICAgIGlmIChnb2xkR2FpbiA+IDAgfHwgbWFuYUdhaW4gPiAwKSB7XG4gICAgICAgICAgYmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShiYXNlLmlkLCB7XG4gICAgICAgICAgICBnb2xkOiBuZXdHb2xkLFxuICAgICAgICAgICAgbWFuYTogbmV3TWFuYSxcbiAgICAgICAgICAgIGxhc3RfcmVzb3VyY2VfdGljazogbm93LnRvSVNPU3RyaW5nKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgT2ZmbGluZSByZXNvdXJjZXM6ICske2dvbGRHYWlufSBnb2xkLCArJHttYW5hR2Fpbn0gbWFuYSAoJHtlbGFwc2VkSG91cnMudG9GaXhlZCgyKX1oIGF3YXkpYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYW5kIGNvbXBsZXRlIGFueSBmaW5pc2hlZCB1cGdyYWRlc1xuICAgICAgc2V0TG9hZGluZ01lc3NhZ2UoXCJDSEVDS0lORyBVUEdSQURFUy4uLlwiKTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVkQnVpbGRpbmdzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGIgb2YgYmxkZ3MpIHtcbiAgICAgICAgaWYgKGIuaXNfdXBncmFkaW5nICYmIGIudXBncmFkZV9zdGFydGVkX2F0KSB7XG4gICAgICAgICAgY29uc3QgZWxhcHNlZCA9IChub3cgLSBuZXcgRGF0ZShiLnVwZ3JhZGVfc3RhcnRlZF9hdCkpIC8gMTAwMDtcbiAgICAgICAgICBjb25zdCByZW1haW5pbmcgPSBiLnVwZ3JhZGVfZHVyYXRpb25fc2Vjb25kcyAtIGVsYXBzZWQ7XG5cbiAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgIC8vIFVwZ3JhZGUgY29tcGxldGVkIHdoaWxlIGF3YXlcbiAgICAgICAgICAgIGNvbnN0IG5ld0xldmVsID0gYi5sZXZlbCArIDE7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkJ1aWxkaW5nLnVwZGF0ZShiLmlkLCB7XG4gICAgICAgICAgICAgIGlzX3VwZ3JhZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIGxldmVsOiBuZXdMZXZlbCxcbiAgICAgICAgICAgICAgdXBncmFkZV9zdGFydGVkX2F0OiBudWxsLFxuICAgICAgICAgICAgICB1cGdyYWRlX2R1cmF0aW9uX3NlY29uZHM6IDAsXG4gICAgICAgICAgICAgIG1heF9ocDogZ2V0QnVpbGRpbmdNYXhIUChiLmJ1aWxkaW5nX3R5cGUsIG5ld0xldmVsKSxcbiAgICAgICAgICAgICAgaHA6IGdldEJ1aWxkaW5nTWF4SFAoYi5idWlsZGluZ190eXBlLCBuZXdMZXZlbClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXBncmFkZWRCdWlsZGluZ3MucHVzaCh1cGRhdGVkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGdyYWRlIGNvbXBsZXRlZCB3aGlsZSBhd2F5OiAke2IuYnVpbGRpbmdfdHlwZX0gLT4gTHYuJHtuZXdMZXZlbH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGJ1aWxkaW5ncyBsaXN0IHdpdGggY29tcGxldGVkIHVwZ3JhZGVzXG4gICAgICBpZiAodXBncmFkZWRCdWlsZGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHVwZ3JhZGVkQnVpbGRpbmdzLmZpbmQoKHUpID0+IHUuaWQgPT09IGIuaWQpO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkIHx8IGI7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdG9hc3Quc3VjY2VzcyhgV2VsY29tZSBiYWNrISAke3VwZ3JhZGVkQnVpbGRpbmdzLmxlbmd0aH0gdXBncmFkZShzKSBjb21wbGV0ZWQgd2hpbGUgeW91IHdlcmUgYXdheS5gKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHZhdWx0IGNhcGFjaXRpZXMgaWYgbmVlZGVkXG4gICAgICBjb25zdCB2YXVsdEJ1aWxkaW5ncyA9IGJsZGdzLmZpbHRlcigoYikgPT5cbiAgICAgIGIuYnVpbGRpbmdfdHlwZSA9PT0gJ2dvbGRfbWlsbCcgfHxcbiAgICAgIGIuYnVpbGRpbmdfdHlwZSA9PT0gJ21hbmFfdmF1bHQnIHx8XG4gICAgICBiLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbmUnIHx8XG4gICAgICBiLmJ1aWxkaW5nX3R5cGUgPT09ICdtYW5hX21pbmUnXG4gICAgICApO1xuXG4gICAgICBpZiAodmF1bHRCdWlsZGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgY2FwYWNpdHlDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdCYXNlID0geyAuLi5iYXNlIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBiIG9mIHZhdWx0QnVpbGRpbmdzKSB7XG4gICAgICAgICAgY29uc3QgeyBzdG9yYWdlIH0gPSBnZXRNaW5lUHJvZHVjdGlvbihiLmxldmVsKTtcbiAgICAgICAgICBpZiAoYi5idWlsZGluZ190eXBlID09PSAnZ29sZF9taWxsJyAmJiBzdG9yYWdlICE9PSBiYXNlLmdvbGRfY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIG5ld0Jhc2UuZ29sZF9jYXBhY2l0eSA9IHN0b3JhZ2U7XG4gICAgICAgICAgICBjYXBhY2l0eUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYi5idWlsZGluZ190eXBlID09PSAnbWFuYV92YXVsdCcgJiYgc3RvcmFnZSAhPT0gYmFzZS5tYW5hX2NhcGFjaXR5KSB7XG4gICAgICAgICAgICBuZXdCYXNlLm1hbmFfY2FwYWNpdHkgPSBzdG9yYWdlO1xuICAgICAgICAgICAgY2FwYWNpdHlDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FwYWNpdHlDaGFuZ2VkKSB7XG4gICAgICAgICAgYmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShiYXNlLmlkLCBuZXdCYXNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRQbGF5ZXJCYXNlKGJhc2UpO1xuICAgICAgc2V0QnVpbGRpbmdzKGJsZGdzKTtcbiAgICAgIHNldEhlcm9lcyhoZXJvTGlzdCk7XG4gICAgICBzZXRUcm9vcHModHJvb3BMaXN0KTtcbiAgICAgIHNldEFzcGVjdHMoYXNwZWN0TGlzdCk7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOZXcgZ2FtZSAtIGRlbGV0ZSBhbGwgYW5kIGluaXRpYWxpemUgZnJlc2hcbiAgICAgIHNldExvYWRpbmdNZXNzYWdlKFwiQ1JFQVRJTkcgTkVXIEtJTkdET00uLi5cIik7XG5cbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy5kZWxldGVNYW55KHsgcGxheWVyX2lkOiBtZS5pZCB9KTtcbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5IZXJvLmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pO1xuICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlRyb29wLmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pO1xuICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLkFzcGVjdC5kZWxldGVNYW55KHsgcGxheWVyX2lkOiBtZS5pZCB9KTtcbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5SZXNvdXJjZVBhY2suZGVsZXRlTWFueSh7IHBsYXllcl9pZDogbWUuaWQgfSk7XG5cbiAgICAgIGJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS5jcmVhdGUoe1xuICAgICAgICBwbGF5ZXJfaWQ6IG1lLmlkLFxuICAgICAgICB0b3duX2hhbGxfbGV2ZWw6IDEsXG4gICAgICAgIGdvbGQ6IDUwMDAsXG4gICAgICAgIG1hbmE6IDUwMDAsXG4gICAgICAgIHNvdWxfc2hhcmRzOiAwLFxuICAgICAgICBnZW1zOiAwLFxuICAgICAgICBnb2xkX2NhcGFjaXR5OiAzMDAwMCxcbiAgICAgICAgbWFuYV9jYXBhY2l0eTogMzAwMDAsXG4gICAgICAgIGxhc3RfcmVzb3VyY2VfdGljazogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBnb2xkX3Blcl9ob3VyOiAwLFxuICAgICAgICBtYW5hX3Blcl9ob3VyOiAwXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgaW5pdGlhbGl6ZU5ld0Jhc2UoYmFzZTQ0LCBtZS5pZCk7XG4gICAgICBzZXRQbGF5ZXJCYXNlKGJhc2UpO1xuXG4gICAgICBjb25zdCBbZnJlc2hCbGRncywgZnJlc2hIZXJvZXMsIGZyZXNoVHJvb3BzLCBmcmVzaEFzcGVjdHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgYmFzZTQ0LmVudGl0aWVzLkJ1aWxkaW5nLmZpbHRlcih7IHBsYXllcl9pZDogbWUuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuSGVyby5maWx0ZXIoeyBwbGF5ZXJfaWQ6IG1lLmlkIH0pLFxuICAgICAgYmFzZTQ0LmVudGl0aWVzLlRyb29wLmZpbHRlcih7IHBsYXllcl9pZDogbWUuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuQXNwZWN0LmZpbHRlcih7IHBsYXllcl9pZDogbWUuaWQgfSldXG4gICAgICApO1xuXG4gICAgICBzZXRCdWlsZGluZ3MoZnJlc2hCbGRncyk7XG4gICAgICBzZXRIZXJvZXMoZnJlc2hIZXJvZXMpO1xuICAgICAgc2V0VHJvb3BzKGZyZXNoVHJvb3BzKTtcbiAgICAgIHNldEFzcGVjdHMoZnJlc2hBc3BlY3RzKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgdG9hc3Quc3VjY2VzcyhcIk5ldyBraW5nZG9tIGNyZWF0ZWQhXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZXNvdXJjZSB0aWNrIC0gc2F2ZXMgdG8gREIgZXZlcnkgMzBzIGZvciBwZXJzaXN0ZW5jZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGxheWVyQmFzZSkgcmV0dXJuO1xuICAgIHJlc291cmNlVGlja1JlZi5jdXJyZW50ID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBnb2xkR2FpbiwgbWFuYUdhaW4sIG92ZXJmbG93R29sZCwgb3ZlcmZsb3dNYW5hIH0gPSB0aWNrUmVzb3VyY2VzKHBsYXllckJhc2UsIGJ1aWxkaW5ncyk7XG4gICAgICAgIGNvbnN0IHRoTGV2ZWwgPSBwbGF5ZXJCYXNlLnRvd25faGFsbF9sZXZlbCB8fCAxO1xuICAgICAgICBjb25zdCBhdXRvQ29sbGVjdEludGVydmFsID0gZ2V0QXV0b0NvbGxlY3RJbnRlcnZhbEhvdXJzKHRoTGV2ZWwpO1xuXG4gICAgICAgIGxldCB1cGRhdGVzID0ge1xuICAgICAgICAgIGdvbGQ6IE1hdGgubWluKHBsYXllckJhc2UuZ29sZCArIGdvbGRHYWluLCBwbGF5ZXJCYXNlLmdvbGRfY2FwYWNpdHkpLFxuICAgICAgICAgIG1hbmE6IE1hdGgubWluKHBsYXllckJhc2UubWFuYSArIG1hbmFHYWluLCBwbGF5ZXJCYXNlLm1hbmFfY2FwYWNpdHkpLFxuICAgICAgICAgIGxhc3RfcmVzb3VyY2VfdGljazogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSGFuZGxlIG92ZXJmbG93IGZvciBUSDE1K1xuICAgICAgICBpZiAoYXV0b0NvbGxlY3RJbnRlcnZhbCAmJiAob3ZlcmZsb3dHb2xkID4gMCB8fCBvdmVyZmxvd01hbmEgPiAwKSkge1xuICAgICAgICAgIHVwZGF0ZXMubGFzdF9hdXRvX2NvbGxlY3QgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgdXBkYXRlcy5wZW5kaW5nX292ZXJmbG93X2dvbGQgPSAocGxheWVyQmFzZS5wZW5kaW5nX292ZXJmbG93X2dvbGQgfHwgMCkgKyBvdmVyZmxvd0dvbGQ7XG4gICAgICAgICAgdXBkYXRlcy5wZW5kaW5nX292ZXJmbG93X21hbmEgPSAocGxheWVyQmFzZS5wZW5kaW5nX292ZXJmbG93X21hbmEgfHwgMCkgKyBvdmVyZmxvd01hbmE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbHdheXMgc2F2ZSB0byBEQiBmb3IgcGVyc2lzdGVuY2UgKGV2ZW4gaWYgbm8gZ2FpbiwgdXBkYXRlIHRpbWVzdGFtcClcbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShwbGF5ZXJCYXNlLmlkLCB1cGRhdGVzKTtcbiAgICAgICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jlc291cmNlIHRpY2sgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgLy8gSWYgUGxheWVyQmFzZSBkb2Vzbid0IGV4aXN0LCBzdG9wIHRoZSB0aWNrXG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlPy5pbmNsdWRlcygnbm90IGZvdW5kJykpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHJlc291cmNlVGlja1JlZi5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDMwMDAwKTsgLy8gZXZlcnkgMzBzXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwocmVzb3VyY2VUaWNrUmVmLmN1cnJlbnQpO1xuICB9LCBbcGxheWVyQmFzZSwgYnVpbGRpbmdzXSk7XG5cbiAgLy8gQ2hlY2sgdXBncmFkZSBjb21wbGV0aW9uIGFuZCB1cGRhdGUgdmF1bHQgY2FwYWNpdGllc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYnVpbGRpbmdzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXBncmFkaW5nID0gYnVpbGRpbmdzLmZpbHRlcigoYikgPT4gYi5pc191cGdyYWRpbmcpO1xuICAgICAgbGV0IGJhc2VVcGRhdGVkID0gZmFsc2U7XG4gICAgICBsZXQgbmV3QmFzZSA9IHsgLi4ucGxheWVyQmFzZSB9O1xuXG4gICAgICBmb3IgKGNvbnN0IGIgb2YgdXBncmFkaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IGIudXBncmFkZV9zdGFydGVkX2F0ID9cbiAgICAgICAgTWF0aC5tYXgoMCwgYi51cGdyYWRlX2R1cmF0aW9uX3NlY29uZHMgLSAoRGF0ZS5ub3coKSAtIG5ldyBEYXRlKGIudXBncmFkZV9zdGFydGVkX2F0KS5nZXRUaW1lKCkpIC8gMTAwMCkgOlxuICAgICAgICAwO1xuICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy51cGRhdGUoYi5pZCwge1xuICAgICAgICAgICAgICBpc191cGdyYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBsZXZlbDogYi5sZXZlbCArIDEsXG4gICAgICAgICAgICAgIHVwZ3JhZGVfc3RhcnRlZF9hdDogbnVsbCxcbiAgICAgICAgICAgICAgdXBncmFkZV9kdXJhdGlvbl9zZWNvbmRzOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5tYXAoKHgpID0+IHguaWQgPT09IHVwZGF0ZWQuaWQgPyB1cGRhdGVkIDogeCkpO1xuICAgICAgICAgICAgdG9hc3Quc3VjY2VzcyhgJHtCVUlMRElOR19ERUZTW2IuYnVpbGRpbmdfdHlwZV0/Lm5hbWV9IHVwZ3JhZGVkIHRvIExldmVsICR7Yi5sZXZlbCArIDF9IWApO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdmF1bHQgY2FwYWNpdGllcyBpZiBpdCdzIGEgdmF1bHQgb3IgbWluZS9taWxsXG4gICAgICAgICAgICBpZiAoYi5idWlsZGluZ190eXBlID09PSAnZ29sZF9taWxsJyB8fCBiLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbmUnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgc3RvcmFnZSB9ID0gZ2V0TWluZVByb2R1Y3Rpb24odXBkYXRlZC5sZXZlbCk7XG4gICAgICAgICAgICAgIGlmIChiLmJ1aWxkaW5nX3R5cGUgPT09ICdnb2xkX21pbGwnKSB7XG4gICAgICAgICAgICAgICAgbmV3QmFzZS5nb2xkX2NhcGFjaXR5ID0gc3RvcmFnZTtcbiAgICAgICAgICAgICAgICBiYXNlVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiLmJ1aWxkaW5nX3R5cGUgPT09ICdtYW5hX3ZhdWx0Jykge1xuICAgICAgICAgICAgICBjb25zdCB7IHN0b3JhZ2UgfSA9IGdldE1pbmVQcm9kdWN0aW9uKHVwZGF0ZWQubGV2ZWwpO1xuICAgICAgICAgICAgICBuZXdCYXNlLm1hbmFfY2FwYWNpdHkgPSBzdG9yYWdlO1xuICAgICAgICAgICAgICBiYXNlVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBtYW5hIGNhcGFjaXR5IGZyb20gbWFuYV9taW5lIHVwZ3JhZGVzIHRvb1xuICAgICAgICAgICAgaWYgKGIuYnVpbGRpbmdfdHlwZSA9PT0gJ21hbmFfbWluZScpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBzdG9yYWdlIH0gPSBnZXRNaW5lUHJvZHVjdGlvbih1cGRhdGVkLmxldmVsKTtcbiAgICAgICAgICAgICAgbmV3QmFzZS5tYW5hX2NhcGFjaXR5ID0gc3RvcmFnZTtcbiAgICAgICAgICAgICAgYmFzZVVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgbWF4IEhQIHdoZW4gYnVpbGRpbmcgbGV2ZWxzIHVwXG4gICAgICAgICAgICBjb25zdCBuZXdNYXhIUCA9IGdldEJ1aWxkaW5nTWF4SFAoYi5idWlsZGluZ190eXBlLCB1cGRhdGVkLmxldmVsKTtcbiAgICAgICAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy51cGRhdGUoYi5pZCwgeyBtYXhfaHA6IG5ld01heEhQLCBocDogbmV3TWF4SFAgfSk7XG4gICAgICAgICAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKCh4KSA9PiB4LmlkID09PSBiLmlkID8geyAuLi54LCBtYXhfaHA6IG5ld01heEhQLCBocDogbmV3TWF4SFAgfSA6IHgpKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRvd25faGFsbF9sZXZlbCBpZiB0b3duIGhhbGwgd2FzIHVwZ3JhZGVkXG4gICAgICAgICAgICBpZiAoYi5idWlsZGluZ190eXBlID09PSAndG93bl9oYWxsJykge1xuICAgICAgICAgICAgICBuZXdCYXNlLnRvd25faGFsbF9sZXZlbCA9IHVwZGF0ZWQubGV2ZWw7XG4gICAgICAgICAgICAgIGJhc2VVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQnVpbGRpbmcgdXBncmFkZSBjb21wbGV0aW9uIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZnJvbSB1cGdyYWRpbmcgbGlzdCBpZiBidWlsZGluZyBubyBsb25nZXIgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZT8uaW5jbHVkZXMoJ25vdCBmb3VuZCcpKSB7XG4gICAgICAgICAgICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5maWx0ZXIoKHgpID0+IHguaWQgIT09IGIuaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJhc2VVcGRhdGVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwgbmV3QmFzZSk7XG4gICAgICAgICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkQmFzZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBiYXNlIGNhcGFjaXRpZXM6JywgZXJyb3IpO1xuICAgICAgICAgIGlmIChlcnJvci5tZXNzYWdlPy5pbmNsdWRlcygnbm90IGZvdW5kJykpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDUwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW2J1aWxkaW5ncywgcGxheWVyQmFzZV0pO1xuXG4gIC8vIENoZWNrIGlmIGNvbGxlY3QgYnV0dG9uIHNob3VsZCBzaG93IChhbnkgbWluZS9taWxsIGhhcyByZXNvdXJjZXMgYW5kIFRIIDwgMTUpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFidWlsZGluZ3MubGVuZ3RoIHx8IChwbGF5ZXJCYXNlPy50b3duX2hhbGxfbGV2ZWwgfHwgMSkgPj0gMTUpIHtcbiAgICAgIHNldFNob3dDb2xsZWN0QnV0dG9uKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGFzUmVzb3VyY2VzID0gYnVpbGRpbmdzLnNvbWUoKGIpID0+XG4gICAgKGIuYnVpbGRpbmdfdHlwZSA9PT0gJ2dvbGRfbWluZScgfHwgYi5idWlsZGluZ190eXBlID09PSAnZ29sZF9taWxsJykgJiYgKGIuY3VzdG9tX2RhdGE/LnN0b3JlZF9nb2xkIHx8IDApID4gMCB8fFxuICAgIGIuYnVpbGRpbmdfdHlwZSA9PT0gJ21hbmFfbWluZScgJiYgKGIuY3VzdG9tX2RhdGE/LnN0b3JlZF9tYW5hIHx8IDApID4gMFxuICAgICk7XG4gICAgc2V0U2hvd0NvbGxlY3RCdXR0b24oaGFzUmVzb3VyY2VzKTtcbiAgfSwgW2J1aWxkaW5ncywgcGxheWVyQmFzZV0pO1xuXG4gIC8vIENoZWNrIGZvciBwZW5kaW5nIG92ZXJmbG93IG9uIGdhbWUgbG9hZCAoVEgxNSspIGFuZCBzaG93IHBhY2sgY29udmVyc2lvbiBtb2RhbFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGxheWVyQmFzZSB8fCAocGxheWVyQmFzZT8udG93bl9oYWxsX2xldmVsIHx8IDEpIDwgMTUpIHJldHVybjtcbiAgICBjb25zdCB0b3RhbE92ZXJmbG93ID0gKHBsYXllckJhc2UucGVuZGluZ19vdmVyZmxvd19nb2xkIHx8IDApICsgKHBsYXllckJhc2UucGVuZGluZ19vdmVyZmxvd19tYW5hIHx8IDApO1xuICAgIGlmICh0b3RhbE92ZXJmbG93ID4gMCkge1xuICAgICAgc2V0UGVuZGluZ092ZXJmbG93KHtcbiAgICAgICAgZ29sZDogcGxheWVyQmFzZS5wZW5kaW5nX292ZXJmbG93X2dvbGQgfHwgMCxcbiAgICAgICAgbWFuYTogcGxheWVyQmFzZS5wZW5kaW5nX292ZXJmbG93X21hbmEgfHwgMFxuICAgICAgfSk7XG4gICAgICBzZXRTaG93UGFja0NvbnZlcnNpb24odHJ1ZSk7XG4gICAgfVxuICB9LCBbcGxheWVyQmFzZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVVwZ3JhZGVCdWlsZGluZyA9IGFzeW5jIChidWlsZGluZywgY29zdCkgPT4ge1xuICAgIGlmICgocGxheWVyQmFzZT8uZ29sZCA/PyAwKSA8IGNvc3QuZ29sZCB8fCAocGxheWVyQmFzZT8ubWFuYSA/PyAwKSA8IGNvc3QubWFuYSkge1xuICAgICAgdG9hc3QuZXJyb3IoXCJOb3QgZW5vdWdoIHJlc291cmNlcyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChidWlsZGluZy5pc191cGdyYWRpbmcpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiQWxyZWFkeSB1cGdyYWRpbmchXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGdyYWRlU3RhcnRUaW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICBjb25zdCB1cGRhdGVkQmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShwbGF5ZXJCYXNlLmlkLCB7XG4gICAgICAgIGdvbGQ6IHBsYXllckJhc2UuZ29sZCAtIGNvc3QuZ29sZCxcbiAgICAgICAgbWFuYTogcGxheWVyQmFzZS5tYW5hIC0gY29zdC5tYW5hXG4gICAgICB9KTtcbiAgICAgIHNldFBsYXllckJhc2UodXBkYXRlZEJhc2UpO1xuXG4gICAgICBjb25zdCB1cGRhdGVkQnVpbGRpbmcgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcudXBkYXRlKGJ1aWxkaW5nLmlkLCB7XG4gICAgICAgIGlzX3VwZ3JhZGluZzogdHJ1ZSxcbiAgICAgICAgdXBncmFkZV9zdGFydGVkX2F0OiB1cGdyYWRlU3RhcnRUaW1lLFxuICAgICAgICB1cGdyYWRlX2R1cmF0aW9uX3NlY29uZHM6IGNvc3Quc2Vjb25kc1xuICAgICAgfSk7XG4gICAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiBiLmlkID09PSB1cGRhdGVkQnVpbGRpbmcuaWQgPyB1cGRhdGVkQnVpbGRpbmcgOiBiKSk7XG4gICAgICBzZXRTZWxlY3RlZEJ1aWxkaW5nKHVwZGF0ZWRCdWlsZGluZyk7XG4gICAgICB0b2FzdChg4pqZ77iPIFVwZ3JhZGluZyAke0JVSUxESU5HX0RFRlNbYnVpbGRpbmcuYnVpbGRpbmdfdHlwZV0/Lm5hbWV9Li4uICR7Zm9ybWF0VGltZShjb3N0LnNlY29uZHMpfWApO1xuXG4gICAgICAvLyBJZiB1cGdyYWRpbmcgdG93biBoYWxsLCB1cGRhdGUgdG93bl9oYWxsX2xldmVsIGltbWVkaWF0ZWx5XG4gICAgICBpZiAoYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSA9PT0gJ3Rvd25faGFsbCcpIHtcbiAgICAgICAgY29uc3QgbmV3VEhMZXZlbCA9IGJ1aWxkaW5nLmxldmVsICsgMTtcbiAgICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UudXBkYXRlKHBsYXllckJhc2UuaWQsIHsgdG93bl9oYWxsX2xldmVsOiBuZXdUSExldmVsIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBncmFkZSBidWlsZGluZzonLCBlcnJvcik7XG4gICAgICB0b2FzdC5lcnJvcignVXBncmFkZSBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwZ3JhZGVXaXRoR2VtcyA9IGFzeW5jIChidWlsZGluZywgY29zdCwgZ2Vtc05lZWRlZCkgPT4ge1xuICAgIGlmICgocGxheWVyQmFzZT8uZ2VtcyA/PyAwKSA8IGdlbXNOZWVkZWQpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCBnZW1zIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGJ1aWxkaW5nLmlzX3VwZ3JhZGluZykge1xuICAgICAgdG9hc3QuZXJyb3IoXCJBbHJlYWR5IHVwZ3JhZGluZyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBob3cgbXVjaCBnb2xkL21hbmEgd2UgaGF2ZSB2cyBuZWVkXG4gICAgICBjb25zdCBnb2xkSGFzID0gcGxheWVyQmFzZT8uZ29sZCA/PyAwO1xuICAgICAgY29uc3QgbWFuYUhhcyA9IHBsYXllckJhc2U/Lm1hbmEgPz8gMDtcbiAgICAgIGNvbnN0IGdvbGROZWVkZWQgPSBjb3N0LmdvbGQgLSBnb2xkSGFzO1xuICAgICAgY29uc3QgbWFuYU5lZWRlZCA9IGNvc3QubWFuYSAtIG1hbmFIYXM7XG5cbiAgICAgIC8vIENvbnZlcnQgbWlzc2luZyByZXNvdXJjZXMgdG8gZ2VtcyAoMTAwIGdvbGQgPSAxIGdlbSwgMjAwIG1hbmEgPSAxIGdlbSlcbiAgICAgIGNvbnN0IGdlbXNGb3JHb2xkID0gTWF0aC5jZWlsKGdvbGROZWVkZWQgLyAxMDApO1xuICAgICAgY29uc3QgZ2Vtc0Zvck1hbmEgPSBNYXRoLmNlaWwobWFuYU5lZWRlZCAvIDIwMCk7XG4gICAgICBjb25zdCB0b3RhbEdlbXNDb3N0ID0gZ2Vtc0ZvckdvbGQgKyBnZW1zRm9yTWFuYTtcblxuICAgICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICBnb2xkOiAwLCAvLyBVc2UgYWxsIGdvbGRcbiAgICAgICAgbWFuYTogMCwgLy8gVXNlIGFsbCBtYW5hXG4gICAgICAgIGdlbXM6IHBsYXllckJhc2UuZ2VtcyAtIHRvdGFsR2Vtc0Nvc3RcbiAgICAgIH0pO1xuICAgICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkQmFzZSk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRCdWlsZGluZyA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy51cGRhdGUoYnVpbGRpbmcuaWQsIHtcbiAgICAgICAgaXNfdXBncmFkaW5nOiB0cnVlLFxuICAgICAgICB1cGdyYWRlX3N0YXJ0ZWRfYXQ6IHVwZ3JhZGVTdGFydFRpbWUsXG4gICAgICAgIHVwZ3JhZGVfZHVyYXRpb25fc2Vjb25kczogY29zdC5zZWNvbmRzXG4gICAgICB9KTtcbiAgICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5tYXAoKGIpID0+IGIuaWQgPT09IHVwZGF0ZWRCdWlsZGluZy5pZCA/IHVwZGF0ZWRCdWlsZGluZyA6IGIpKTtcbiAgICAgIHNldFNlbGVjdGVkQnVpbGRpbmcodXBkYXRlZEJ1aWxkaW5nKTtcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoYPCfko4gVXNlZCAke3RvdGFsR2Vtc0Nvc3R9IGdlbXMgdG8gdXBncmFkZSAke0JVSUxESU5HX0RFRlNbYnVpbGRpbmcuYnVpbGRpbmdfdHlwZV0/Lm5hbWV9IWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBncmFkZSB3aXRoIGdlbXM6JywgZXJyb3IpO1xuICAgICAgdG9hc3QuZXJyb3IoJ1VwZ3JhZGUgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTcGVlZFVwVXBncmFkZSA9IGFzeW5jIChidWlsZGluZywgdGltZUxlZnRTZWNvbmRzKSA9PiB7XG4gICAgY29uc3QgZ2VtQ29zdCA9IE1hdGguY2VpbChNYXRoLnBvdyhNYXRoLm1heCh0aW1lTGVmdFNlY29uZHMgLyA2MCwgMSksIDAuNzUpKTtcblxuICAgIGlmICgocGxheWVyQmFzZT8uZ2VtcyA/PyAwKSA8IGdlbUNvc3QpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCBnZW1zIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICBnZW1zOiBwbGF5ZXJCYXNlLmdlbXMgLSBnZW1Db3N0XG4gICAgICB9KTtcbiAgICAgIHNldFBsYXllckJhc2UodXBkYXRlZEJhc2UpO1xuXG4gICAgICBjb25zdCB1cGRhdGVkQnVpbGRpbmcgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcudXBkYXRlKGJ1aWxkaW5nLmlkLCB7XG4gICAgICAgIGlzX3VwZ3JhZGluZzogZmFsc2UsXG4gICAgICAgIGxldmVsOiBidWlsZGluZy5sZXZlbCArIDEsXG4gICAgICAgIHVwZ3JhZGVfc3RhcnRlZF9hdDogbnVsbCxcbiAgICAgICAgdXBncmFkZV9kdXJhdGlvbl9zZWNvbmRzOiAwLFxuICAgICAgICBtYXhfaHA6IGdldEJ1aWxkaW5nTWF4SFAoYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSwgYnVpbGRpbmcubGV2ZWwgKyAxKSxcbiAgICAgICAgaHA6IGdldEJ1aWxkaW5nTWF4SFAoYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSwgYnVpbGRpbmcubGV2ZWwgKyAxKVxuICAgICAgfSk7XG4gICAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiBiLmlkID09PSB1cGRhdGVkQnVpbGRpbmcuaWQgPyB1cGRhdGVkQnVpbGRpbmcgOiBiKSk7XG4gICAgICBzZXRTZWxlY3RlZEJ1aWxkaW5nKHVwZGF0ZWRCdWlsZGluZyk7XG4gICAgICB0b2FzdC5zdWNjZXNzKGDimqEgVXBncmFkZSBjb21wbGV0ZWQhICR7YnVpbGRpbmcuYnVpbGRpbmdfdHlwZX0gaXMgbm93IGxldmVsICR7YnVpbGRpbmcubGV2ZWwgKyAxfSFgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNwZWVkIHVwIHVwZ3JhZGU6JywgZXJyb3IpO1xuICAgICAgdG9hc3QuZXJyb3IoJ1NwZWVkIHVwIGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW92ZUJ1aWxkaW5nID0gYXN5bmMgKGJ1aWxkaW5nLCBuZXdYLCBuZXdZKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdNb3ZpbmcgYnVpbGRpbmc6JywgYnVpbGRpbmcuYnVpbGRpbmdfdHlwZSwgJ2lkOicsIGJ1aWxkaW5nLmlkLCAnZnJvbScsIGJ1aWxkaW5nLmdyaWRfeCwgYnVpbGRpbmcuZ3JpZF95LCAndG8nLCBuZXdYLCBuZXdZKTtcblxuICAgICAgLy8gSW5zdGFudGx5IHVwZGF0ZSBVSSBmb3IgaW1tZWRpYXRlIHZpc3VhbCBmZWVkYmFja1xuICAgICAgc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBwcmV2Lm1hcCgoYikgPT4gYi5pZCA9PT0gYnVpbGRpbmcuaWQgPyB7IC4uLmIsIGdyaWRfeDogbmV3WCwgZ3JpZF95OiBuZXdZIH0gOiBiKSk7XG4gICAgICBzZXRTZWxlY3RlZEJ1aWxkaW5nKG51bGwpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGRhdGFiYXNlIGluIHRoZSBiYWNrZ3JvdW5kXG4gICAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcudXBkYXRlKGJ1aWxkaW5nLmlkLCB7IGdyaWRfeDogbmV3WCwgZ3JpZF95OiBuZXdZIH0pO1xuICAgICAgY29uc29sZS5sb2coJ0J1aWxkaW5nIHBvc2l0aW9uIHNhdmVkIHRvIERCJyk7XG4gICAgICB0b2FzdC5zdWNjZXNzKGBNb3ZlZCAke0JVSUxESU5HX0RFRlNbYnVpbGRpbmcuYnVpbGRpbmdfdHlwZV0/Lm5hbWV9IHRvICgke25ld1h9LCAke25ld1l9KWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBidWlsZGluZyBwb3NpdGlvbjonLCBlcnJvcik7XG4gICAgICB0b2FzdC5lcnJvcignRmFpbGVkIHRvIG1vdmUgYnVpbGRpbmcuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJ1eUZyb21TaG9wID0gYXN5bmMgKGJ1aWxkaW5nVHlwZSwgZGVmKSA9PiB7XG4gICAgLy8gU3RhcnQgcGxhY2VtZW50IG1vZGUgLSByZXNvdXJjZXMgd2lsbCBiZSBkZWR1Y3RlZCBvbiB2YWxpZCBwbGFjZW1lbnRcbiAgICBzZXRQZW5kaW5nU2hvcFBsYWNlbWVudCh7IGJ1aWxkaW5nVHlwZSwgZGVmLCB1c2VHZW1zOiBmYWxzZSB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVCdXlGcm9tU2hvcFdpdGhHZW1zID0gYXN5bmMgKGJ1aWxkaW5nVHlwZSwgZGVmLCBnZW1Db3N0KSA9PiB7XG4gICAgLy8gU3RhcnQgcGxhY2VtZW50IG1vZGUgLSB3aWxsIHByb21wdCBmb3IgZ2VtIGNvbmZpcm1hdGlvbiBhZnRlciB2YWxpZCBwbGFjZW1lbnRcbiAgICBzZXRQZW5kaW5nU2hvcFBsYWNlbWVudCh7IGJ1aWxkaW5nVHlwZSwgZGVmLCB1c2VHZW1zOiB0cnVlLCBnZW1Db3N0LCByZXF1aXJlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBsYWNlU2hvcEJ1aWxkaW5nID0gYXN5bmMgKGd4LCBneSkgPT4ge1xuICAgIGlmICghcGVuZGluZ1Nob3BQbGFjZW1lbnQpIHJldHVybjtcblxuICAgIGNvbnN0IHsgYnVpbGRpbmdUeXBlLCBkZWYsIHVzZUdlbXMsIGdlbUNvc3QsIHJlcXVpcmVDb25maXJtYXRpb24gfSA9IHBlbmRpbmdTaG9wUGxhY2VtZW50O1xuXG4gICAgLy8gQ2FuY2VsIHBsYWNlbWVudCBpZiBubyBjb29yZGluYXRlcyAodXNlciBjbGlja2VkIGNhbmNlbClcbiAgICBpZiAoZ3ggPT09IG51bGwgfHwgZ3kgPT09IG51bGwpIHtcbiAgICAgIHNldFBlbmRpbmdTaG9wUGxhY2VtZW50KG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIHBsYWNlbWVudFxuICAgIGNvbnN0IGZ3ID0gZGVmLmZvb3RwcmludFswXTtcbiAgICBjb25zdCBmaCA9IGRlZi5mb290cHJpbnRbMV07XG4gICAgY29uc3QgRk9SRVNUX1JJTkcgPSAxMDtcblxuICAgIC8vIENoZWNrIGJvdW5kc1xuICAgIGlmIChneCA8IEZPUkVTVF9SSU5HIHx8IGd5IDwgRk9SRVNUX1JJTkcgfHwgZ3ggKyBmdyA+IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HIHx8IGd5ICsgZmggPiBHUklEX1NJWkUgLSBGT1JFU1RfUklORykge1xuICAgICAgdG9hc3QuZXJyb3IoXCJJbnZhbGlkIHBsYWNlbWVudCFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgY29sbGlzaW9uXG4gICAgZm9yIChjb25zdCBiIG9mIGJ1aWxkaW5ncykge1xuICAgICAgY29uc3Qgc3BhY2luZyA9IGJ1aWxkaW5nVHlwZSA9PT0gJ3dhbGwnID8gMCA6IDE7XG4gICAgICBpZiAoZ3ggPCBiLmdyaWRfeCArIGIuZm9vdHByaW50X3cgKyBzcGFjaW5nICYmIGd4ICsgZncgKyBzcGFjaW5nID4gYi5ncmlkX3ggJiZcbiAgICAgIGd5IDwgYi5ncmlkX3kgKyBiLmZvb3RwcmludF9oICsgc3BhY2luZyAmJiBneSArIGZoICsgc3BhY2luZyA+IGIuZ3JpZF95KSB7XG4gICAgICAgIHRvYXN0LmVycm9yKFwiQ2Fubm90IHBsYWNlIGhlcmUhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIGdlbSBwdXJjaGFzZXMgd2l0aCBjb25maXJtYXRpb24gcmVxdWlyZWQsIHNob3cgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICh1c2VHZW1zICYmIHJlcXVpcmVDb25maXJtYXRpb24pIHtcbiAgICAgIGlmICgocGxheWVyQmFzZT8uZ2VtcyA/PyAwKSA8IGdlbUNvc3QpIHtcbiAgICAgICAgdG9hc3QuZXJyb3IoXCJOb3QgZW5vdWdoIGdlbXMhXCIpO1xuICAgICAgICBzZXRQZW5kaW5nU2hvcFBsYWNlbWVudChudWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgdGhlIHZhbGlkYXRlZCBwbGFjZW1lbnQgYW5kIHNob3cgY29uZmlybWF0aW9uXG4gICAgICBzZXRHZW1QbGFjZW1lbnRDb25maXJtKHsgYnVpbGRpbmdUeXBlLCBkZWYsIGdlbUNvc3QsIGd4LCBneSB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQbGFjZSB0aGUgYnVpbGRpbmdcbiAgICBhd2FpdCBmaW5hbGl6ZVNob3BQbGFjZW1lbnQoYnVpbGRpbmdUeXBlLCBkZWYsIGd4LCBneSwgdXNlR2VtcywgZ2VtQ29zdCk7XG5cbiAgICAvLyBGb3Igd2FsbHMsIGtlZXAgcGxhY2VtZW50IG1vZGUgYWN0aXZlIGZvciBjb252ZW5pZW50IG11bHRpLXBsYWNlbWVudFxuICAgIGlmIChidWlsZGluZ1R5cGUgPT09ICd3YWxsJykge1xuICAgICAgdG9hc3Quc3VjY2VzcyhgJHtkZWYubmFtZX0gcGxhY2VkISBSaWdodC1jbGljayB0byBwbGFjZSBhbm90aGVyLmApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaW5hbGl6ZVNob3BQbGFjZW1lbnQgPSBhc3luYyAoYnVpbGRpbmdUeXBlLCBkZWYsIGd4LCBneSwgdXNlR2VtcywgZ2VtQ29zdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZWR1Y3QgcmVzb3VyY2VzXG4gICAgICBpZiAoIXVzZUdlbXMpIHtcbiAgICAgICAgaWYgKChwbGF5ZXJCYXNlPy5nb2xkID8/IDApIDwgZGVmLmJhc2VDb3N0R29sZCB8fCAocGxheWVyQmFzZT8ubWFuYSA/PyAwKSA8IGRlZi5iYXNlQ29zdE1hbmEpIHtcbiAgICAgICAgICB0b2FzdC5lcnJvcihcIk5vdCBlbm91Z2ggcmVzb3VyY2VzIVwiKTtcbiAgICAgICAgICBzZXRQZW5kaW5nU2hvcFBsYWNlbWVudChudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UudXBkYXRlKHBsYXllckJhc2UuaWQsIHtcbiAgICAgICAgICBnb2xkOiBwbGF5ZXJCYXNlLmdvbGQgLSBkZWYuYmFzZUNvc3RHb2xkLFxuICAgICAgICAgIG1hbmE6IHBsYXllckJhc2UubWFuYSAtIGRlZi5iYXNlQ29zdE1hbmFcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICAgIGdlbXM6IHBsYXllckJhc2UuZ2VtcyAtIGdlbUNvc3RcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBidWlsZGluZ1xuICAgICAgY29uc3QgbmV3QnVpbGRpbmcgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcuY3JlYXRlKHtcbiAgICAgICAgcGxheWVyX2lkOiB1c2VyLmlkLFxuICAgICAgICBidWlsZGluZ190eXBlOiBidWlsZGluZ1R5cGUsXG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBncmlkX3g6IGd4LFxuICAgICAgICBncmlkX3k6IGd5LFxuICAgICAgICBmb290cHJpbnRfdzogZGVmLmZvb3RwcmludFswXSxcbiAgICAgICAgZm9vdHByaW50X2g6IGRlZi5mb290cHJpbnRbMV0sXG4gICAgICAgIGhwOiAxMDAsXG4gICAgICAgIG1heF9ocDogMTAwXG4gICAgICB9KTtcblxuICAgICAgc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBbLi4ucHJldiwgbmV3QnVpbGRpbmddKTtcbiAgICAgIHNldFBlbmRpbmdTaG9wUGxhY2VtZW50KG51bGwpO1xuICAgICAgc2V0R2VtUGxhY2VtZW50Q29uZmlybShudWxsKTtcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoYCR7ZGVmLm5hbWV9IHBsYWNlZCFgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHBsYWNlIGJ1aWxkaW5nOicsIGVycm9yKTtcbiAgICAgIHRvYXN0LmVycm9yKCdQbGFjZW1lbnQgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgc2V0UGVuZGluZ1Nob3BQbGFjZW1lbnQobnVsbCk7XG4gICAgICBzZXRHZW1QbGFjZW1lbnRDb25maXJtKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjb25maXJtR2VtUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIGlmICghZ2VtUGxhY2VtZW50Q29uZmlybSkgcmV0dXJuO1xuICAgIGNvbnN0IHsgYnVpbGRpbmdUeXBlLCBkZWYsIGdlbUNvc3QsIGd4LCBneSB9ID0gZ2VtUGxhY2VtZW50Q29uZmlybTtcbiAgICBmaW5hbGl6ZVNob3BQbGFjZW1lbnQoYnVpbGRpbmdUeXBlLCBkZWYsIGd4LCBneSwgdHJ1ZSwgZ2VtQ29zdCk7XG4gIH07XG5cbiAgY29uc3QgY2FuY2VsR2VtUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIHNldEdlbVBsYWNlbWVudENvbmZpcm0obnVsbCk7XG4gICAgc2V0UGVuZGluZ1Nob3BQbGFjZW1lbnQobnVsbCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlV2FsbERyYWcgPSAoY2VsbHMpID0+IHtcbiAgICBpZiAoIXBlbmRpbmdTaG9wUGxhY2VtZW50IHx8IHBlbmRpbmdTaG9wUGxhY2VtZW50LmJ1aWxkaW5nVHlwZSAhPT0gJ3dhbGwnKSByZXR1cm47XG4gICAgY29uc3QgZGVmID0gQlVJTERJTkdfREVGU1snd2FsbCddO1xuICAgIGNvbnN0IHsgdXNlR2VtcywgZ2VtQ29zdCB9ID0gcGVuZGluZ1Nob3BQbGFjZW1lbnQ7XG5cbiAgICAvLyBDb21wdXRlIGhvdyBtYW55IHdhbGxzIHRoZSBwbGF5ZXIgY2FuIHN0aWxsIHBsYWNlIChjYXAgYnkgVEggbGV2ZWwpXG4gICAgbGV0IG1heFdhbGxzID0gMDtcbiAgICBjb25zdCB0aExldmVsID0gcGxheWVyQmFzZT8udG93bl9oYWxsX2xldmVsID8/IDE7XG4gICAgZm9yIChsZXQgbHZsID0gMTsgbHZsIDw9IHRoTGV2ZWw7IGx2bCsrKSB7XG4gICAgICBpZiAoVEhfU0hPUF9VTkxPQ0tTW2x2bF0/LndhbGwgIT0gbnVsbCkgbWF4V2FsbHMgPSBUSF9TSE9QX1VOTE9DS1NbbHZsXS53YWxsO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50V2FsbHMgPSBidWlsZGluZ3MuZmlsdGVyKChiKSA9PiBiLmJ1aWxkaW5nX3R5cGUgPT09ICd3YWxsJykubGVuZ3RoO1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IE1hdGgubWF4KDAsIG1heFdhbGxzIC0gY3VycmVudFdhbGxzKTtcblxuICAgIC8vIFRyaW0gdG8gY2FwXG4gICAgY29uc3QgdHJpbW1lZCA9IGNlbGxzLnNsaWNlKDAsIHJlbWFpbmluZyk7XG4gICAgaWYgKHRyaW1tZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0b2FzdC5lcnJvcihcIldhbGwgbGltaXQgcmVhY2hlZCBmb3IgeW91ciBUb3duIEhhbGwgbGV2ZWwhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdW50ID0gdHJpbW1lZC5sZW5ndGg7XG4gICAgY29uc3QgdG90YWxHb2xkID0gdXNlR2VtcyA/IDAgOiBjb3VudCAqIGRlZi5iYXNlQ29zdEdvbGQ7XG4gICAgY29uc3QgdG90YWxHZW1zID0gdXNlR2VtcyA/IGNvdW50ICogKGdlbUNvc3QgPz8gMSkgOiAwO1xuXG4gICAgc2V0V2FsbERyYWdDb25maXJtKHsgY2VsbHM6IHRyaW1tZWQsIGNvdW50LCB0b3RhbEdvbGQsIHRvdGFsR2VtcywgdXNlR2VtcywgZGVmIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNvbmZpcm1XYWxsRHJhZyA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXdhbGxEcmFnQ29uZmlybSkgcmV0dXJuO1xuICAgIGNvbnN0IHsgY2VsbHMsIHRvdGFsR29sZCwgdG90YWxHZW1zLCB1c2VHZW1zLCBkZWYgfSA9IHdhbGxEcmFnQ29uZmlybTtcblxuICAgIC8vIEZpbmFsIGFmZm9yZGFiaWxpdHkgY2hlY2tcbiAgICBpZiAoIXVzZUdlbXMgJiYgKHBsYXllckJhc2U/LmdvbGQgPz8gMCkgPCB0b3RhbEdvbGQpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCBnb2xkIVwiKTtcbiAgICAgIHNldFdhbGxEcmFnQ29uZmlybShudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHVzZUdlbXMgJiYgKHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPCB0b3RhbEdlbXMpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCBnZW1zIVwiKTtcbiAgICAgIHNldFdhbGxEcmFnQ29uZmlybShudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBEZWR1Y3QgcmVzb3VyY2VzXG4gICAgaWYgKCF1c2VHZW1zKSB7XG4gICAgICBjb25zdCB1cGRhdGVkQmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShwbGF5ZXJCYXNlLmlkLCB7XG4gICAgICAgIGdvbGQ6IHBsYXllckJhc2UuZ29sZCAtIHRvdGFsR29sZFxuICAgICAgfSk7XG4gICAgICBzZXRQbGF5ZXJCYXNlKHVwZGF0ZWRCYXNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICBnZW1zOiBwbGF5ZXJCYXNlLmdlbXMgLSB0b3RhbEdlbXNcbiAgICAgIH0pO1xuICAgICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkQmFzZSk7XG4gICAgfVxuXG4gICAgLy8gUGxhY2UgYWxsIHdhbGxzXG4gICAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IFByb21pc2UuYWxsKGNlbGxzLm1hcCgoeyBneCwgZ3kgfSkgPT5cbiAgICBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcuY3JlYXRlKHtcbiAgICAgIHBsYXllcl9pZDogdXNlci5pZCxcbiAgICAgIGJ1aWxkaW5nX3R5cGU6ICd3YWxsJyxcbiAgICAgIGxldmVsOiAxLFxuICAgICAgZ3JpZF94OiBneCxcbiAgICAgIGdyaWRfeTogZ3ksXG4gICAgICBmb290cHJpbnRfdzogMSxcbiAgICAgIGZvb3RwcmludF9oOiAxLFxuICAgICAgaHA6IDEwMCxcbiAgICAgIG1heF9ocDogMTAwXG4gICAgfSlcbiAgICApKTtcbiAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IFsuLi5wcmV2LCAuLi5jcmVhdGVkXSk7XG4gICAgc2V0V2FsbERyYWdDb25maXJtKG51bGwpO1xuICAgIC8vIEtlZXAgcGxhY2VtZW50IG1vZGUgYWN0aXZlXG4gICAgdG9hc3Quc3VjY2VzcyhgJHtjZWxscy5sZW5ndGh9IHdhbGwke2NlbGxzLmxlbmd0aCA+IDEgPyAncycgOiAnJ30gcGxhY2VkIWApO1xuICB9O1xuXG4gIGNvbnN0IGNhbmNlbFdhbGxEcmFnID0gKCkgPT4ge1xuICAgIHNldFdhbGxEcmFnQ29uZmlybShudWxsKTtcbiAgfTtcblxuICAvLyDilIDilIAgV2FsbCBncm91cCBhY3Rpb25zIOKUgOKUgFxuICBjb25zdCBoYW5kbGVXYWxsR3JvdXBTZWxlY3QgPSAoZ3JvdXApID0+IHtcbiAgICBzZXRXYWxsR3JvdXAoZ3JvdXAgJiYgZ3JvdXAubGVuZ3RoID4gMCA/IGdyb3VwIDogbnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVXYWxsR3JvdXBVcGdyYWRlQWxsID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghd2FsbEdyb3VwKSByZXR1cm47XG4gICAgY29uc3QgdGhMZXZlbCA9IHBsYXllckJhc2U/LnRvd25faGFsbF9sZXZlbCA/PyAxO1xuICAgIGNvbnN0IGxldmVsQ2FwID0gZ2V0QnVpbGRpbmdMZXZlbENhcCgnd2FsbCcsIHRoTGV2ZWwpO1xuICAgIGNvbnN0IHRvVXBncmFkZSA9IHdhbGxHcm91cC5maWx0ZXIoKHcpID0+IHcubGV2ZWwgPCBsZXZlbENhcCAmJiAhdy5pc191cGdyYWRpbmcpO1xuICAgIGlmICh0b1VwZ3JhZGUubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBsZXQgdG90YWxHb2xkID0gMCx0b3RhbE1hbmEgPSAwO1xuICAgIGZvciAoY29uc3QgdyBvZiB0b1VwZ3JhZGUpIHtcbiAgICAgIGNvbnN0IGMgPSBnZXRVcGdyYWRlQ29zdCgnd2FsbCcsIHcubGV2ZWwpO1xuICAgICAgdG90YWxHb2xkICs9IGMuZ29sZDt0b3RhbE1hbmEgKz0gYy5tYW5hO1xuICAgIH1cbiAgICBpZiAoKHBsYXllckJhc2U/LmdvbGQgPz8gMCkgPCB0b3RhbEdvbGQgfHwgKHBsYXllckJhc2U/Lm1hbmEgPz8gMCkgPCB0b3RhbE1hbmEpIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCByZXNvdXJjZXMgdG8gdXBncmFkZSBhbGwgd2FsbHMhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZWRCYXNlID0gYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UudXBkYXRlKHBsYXllckJhc2UuaWQsIHtcbiAgICAgIGdvbGQ6IHBsYXllckJhc2UuZ29sZCAtIHRvdGFsR29sZCxcbiAgICAgIG1hbmE6IHBsYXllckJhc2UubWFuYSAtIHRvdGFsTWFuYVxuICAgIH0pO1xuICAgIHNldFBsYXllckJhc2UodXBkYXRlZEJhc2UpO1xuXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIGNvbnN0IHVwZ3JhZGVkID0gYXdhaXQgUHJvbWlzZS5hbGwodG9VcGdyYWRlLm1hcCgodykgPT4ge1xuICAgICAgY29uc3QgYyA9IGdldFVwZ3JhZGVDb3N0KCd3YWxsJywgdy5sZXZlbCk7XG4gICAgICByZXR1cm4gYmFzZTQ0LmVudGl0aWVzLkJ1aWxkaW5nLnVwZGF0ZSh3LmlkLCB7XG4gICAgICAgIGlzX3VwZ3JhZGluZzogdHJ1ZSxcbiAgICAgICAgdXBncmFkZV9zdGFydGVkX2F0OiBub3csXG4gICAgICAgIHVwZ3JhZGVfZHVyYXRpb25fc2Vjb25kczogYy5zZWNvbmRzXG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgc2V0QnVpbGRpbmdzKChwcmV2KSA9PiBwcmV2Lm1hcCgoYikgPT4ge1xuICAgICAgY29uc3QgdSA9IHVwZ3JhZGVkLmZpbmQoKHgpID0+IHguaWQgPT09IGIuaWQpO1xuICAgICAgcmV0dXJuIHUgfHwgYjtcbiAgICB9KSk7XG4gICAgc2V0V2FsbEdyb3VwKChwcmV2KSA9PiBwcmV2Py5tYXAoKHcpID0+IHtcbiAgICAgIGNvbnN0IHUgPSB1cGdyYWRlZC5maW5kKCh4KSA9PiB4LmlkID09PSB3LmlkKTtcbiAgICAgIHJldHVybiB1IHx8IHc7XG4gICAgfSkgfHwgbnVsbCk7XG4gICAgdG9hc3Quc3VjY2VzcyhgVXBncmFkaW5nICR7dG9VcGdyYWRlLmxlbmd0aH0gd2FsbCR7dG9VcGdyYWRlLmxlbmd0aCA+IDEgPyAncycgOiAnJ30hYCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlV2FsbEdyb3VwTW92ZUFsbCA9ICgpID0+IHtcbiAgICBpZiAoIXdhbGxHcm91cCB8fCAhZ3JpZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgZ3JpZFJlZi5jdXJyZW50LnN0YXJ0R3JvdXBNb3ZlTW9kZSh3YWxsR3JvdXApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVdhbGxHcm91cFJvdGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXdhbGxHcm91cCB8fCB3YWxsR3JvdXAubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgIC8vIERldGVybWluZSBheGlzOiBmaW5kIGlmIGFsbCBzaGFyZSBzYW1lIGdyaWRfeCAoZ3ktYXhpcyBydW4pIG9yIHNhbWUgZ3JpZF95IChneC1heGlzIHJ1bilcbiAgICBjb25zdCBhbGxTYW1lR3ggPSB3YWxsR3JvdXAuZXZlcnkoKHcpID0+IHcuZ3JpZF94ID09PSB3YWxsR3JvdXBbMF0uZ3JpZF94KTtcbiAgICBjb25zdCBhbGxTYW1lR3kgPSB3YWxsR3JvdXAuZXZlcnkoKHcpID0+IHcuZ3JpZF95ID09PSB3YWxsR3JvdXBbMF0uZ3JpZF95KTtcbiAgICBpZiAoIWFsbFNhbWVHeCAmJiAhYWxsU2FtZUd5KSB7dG9hc3QuZXJyb3IoXCJDYW4gb25seSByb3RhdGUgc3RyYWlnaHQgd2FsbCBsaW5lcyFcIik7cmV0dXJuO31cblxuICAgIC8vIFBpdm90ID0gY2VudGVyIG9mIHRoZSBncm91cCAocm91bmRlZClcbiAgICBjb25zdCBjeCA9IE1hdGgucm91bmQod2FsbEdyb3VwLnJlZHVjZSgocywgdykgPT4gcyArIHcuZ3JpZF94LCAwKSAvIHdhbGxHcm91cC5sZW5ndGgpO1xuICAgIGNvbnN0IGN5ID0gTWF0aC5yb3VuZCh3YWxsR3JvdXAucmVkdWNlKChzLCB3KSA9PiBzICsgdy5ncmlkX3ksIDApIC8gd2FsbEdyb3VwLmxlbmd0aCk7XG5cbiAgICAvLyBSb3RhdGUgZWFjaCB3YWxsIDkwwrA6IChkeCwgZHkpIOKGkiAoLWR5LCBkeCkgYXJvdW5kIGNlbnRlclxuICAgIGNvbnN0IHJvdGF0ZWQgPSB3YWxsR3JvdXAubWFwKCh3KSA9PiAoe1xuICAgICAgLi4udyxcbiAgICAgIGdyaWRfeDogY3ggLSAody5ncmlkX3kgLSBjeSksXG4gICAgICBncmlkX3k6IGN5ICsgKHcuZ3JpZF94IC0gY3gpXG4gICAgfSkpO1xuXG4gICAgLy8gVmFsaWRhdGUgYWxsIHJvdGF0ZWQgcG9zaXRpb25zXG4gICAgY29uc3Qgb2NjdXBpZWQgPSBuZXcgU2V0KGJ1aWxkaW5ncy5maWx0ZXIoKGIpID0+ICF3YWxsR3JvdXAuZmluZCgodykgPT4gdy5pZCA9PT0gYi5pZCkpLm1hcCgoYikgPT4gYCR7Yi5ncmlkX3h9LCR7Yi5ncmlkX3l9YCkpO1xuICAgIGNvbnN0IEZPUkVTVF9SSU5HID0gMTA7XG4gICAgZm9yIChjb25zdCBydyBvZiByb3RhdGVkKSB7XG4gICAgICBpZiAocncuZ3JpZF94IDwgRk9SRVNUX1JJTkcgfHwgcncuZ3JpZF95IDwgRk9SRVNUX1JJTkcgfHwgcncuZ3JpZF94ID49IEdSSURfU0laRSAtIEZPUkVTVF9SSU5HIHx8IHJ3LmdyaWRfeSA+PSBHUklEX1NJWkUgLSBGT1JFU1RfUklORykge1xuICAgICAgICB0b2FzdC5lcnJvcihcIlJvdGF0aW9uIGJsb2NrZWQgYnkgYm91bmRhcnkhXCIpO3JldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChvY2N1cGllZC5oYXMoYCR7cncuZ3JpZF94fSwke3J3LmdyaWRfeX1gKSkge1xuICAgICAgICB0b2FzdC5lcnJvcihcIlJvdGF0aW9uIGJsb2NrZWQgYnkgYW5vdGhlciBidWlsZGluZyFcIik7cmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBQcm9taXNlLmFsbChyb3RhdGVkLm1hcCgocncpID0+XG4gICAgYmFzZTQ0LmVudGl0aWVzLkJ1aWxkaW5nLnVwZGF0ZShydy5pZCwgeyBncmlkX3g6IHJ3LmdyaWRfeCwgZ3JpZF95OiBydy5ncmlkX3kgfSlcbiAgICApKTtcbiAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiB7XG4gICAgICBjb25zdCB1ID0gdXBkYXRlZC5maW5kKCh4KSA9PiB4LmlkID09PSBiLmlkKTtcbiAgICAgIHJldHVybiB1IHx8IGI7XG4gICAgfSkpO1xuICAgIHNldFdhbGxHcm91cCh1cGRhdGVkKTtcbiAgICB0b2FzdC5zdWNjZXNzKFwiV2FsbCBncm91cCByb3RhdGVkIDkwwrAhXCIpO1xuICB9O1xuXG4gIC8vIEhhbmRsZSBncm91cCBtb3ZlIGNvbW1pdCAoY2FsbGVkIGZyb20gSXNvbWV0cmljR3JpZCB2aWEgb25Nb3ZlQnVpbGRpbmcpXG4gIGNvbnN0IGhhbmRsZU1vdmVCdWlsZGluZ19leHRlbmRlZCA9IGFzeW5jIChidWlsZGluZ09yR3JvdXAsIG5ld1gsIG5ld1kpID0+IHtcbiAgICBpZiAoYnVpbGRpbmdPckdyb3VwPy5fX3dhbGxHcm91cCkge1xuICAgICAgY29uc3QgeyB3YWxscywgZGd4LCBkZ3kgfSA9IGJ1aWxkaW5nT3JHcm91cDtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBQcm9taXNlLmFsbCh3YWxscy5tYXAoKHcpID0+XG4gICAgICBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcudXBkYXRlKHcuaWQsIHsgZ3JpZF94OiB3LmdyaWRfeCArIGRneCwgZ3JpZF95OiB3LmdyaWRfeSArIGRneSB9KVxuICAgICAgKSk7XG4gICAgICBzZXRCdWlsZGluZ3MoKHByZXYpID0+IHByZXYubWFwKChiKSA9PiB7XG4gICAgICAgIGNvbnN0IHUgPSB1cGRhdGVkLmZpbmQoKHgpID0+IHguaWQgPT09IGIuaWQpO1xuICAgICAgICByZXR1cm4gdSB8fCBiO1xuICAgICAgfSkpO1xuICAgICAgc2V0V2FsbEdyb3VwKHVwZGF0ZWQpO1xuICAgICAgdG9hc3Quc3VjY2VzcyhgTW92ZWQgJHt3YWxscy5sZW5ndGh9IHdhbGwke3dhbGxzLmxlbmd0aCA+IDEgPyAncycgOiAnJ30hYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vdmVCdWlsZGluZyhidWlsZGluZ09yR3JvdXAsIG5ld1gsIG5ld1kpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwZ3JhZGVIZXJvID0gYXN5bmMgKGhlcm8pID0+IHtcbiAgICBpZiAoKHBsYXllckJhc2U/LmdvbGQgPz8gMCkgPCA1MDApIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm90IGVub3VnaCBnb2xkISBOZWVkIDUwMCBnb2xkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgZ29sZDogcGxheWVyQmFzZS5nb2xkIC0gNTAwXG4gICAgfSk7XG4gICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkQmFzZSk7XG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5IZXJvLnVwZGF0ZShoZXJvLmlkLCB7XG4gICAgICBsZXZlbDogaGVyby5sZXZlbCArIDEsXG4gICAgICBtYXhfaHA6IGhlcm8ubWF4X2hwICsgMzAsXG4gICAgICBocDogaGVyby5ocCArIDMwLFxuICAgICAgYXR0YWNrOiBoZXJvLmF0dGFjayArIDUsXG4gICAgICBkZWZlbnNlOiBoZXJvLmRlZmVuc2UgKyAzXG4gICAgfSk7XG4gICAgc2V0SGVyb2VzKChwcmV2KSA9PiBwcmV2Lm1hcCgoaCkgPT4gaC5pZCA9PT0gdXBkYXRlZC5pZCA/IHVwZGF0ZWQgOiBoKSk7XG4gICAgdG9hc3Quc3VjY2VzcyhgJHtoZXJvLm5hbWV9IHVwZ3JhZGVkIHRvIExldmVsICR7aGVyby5sZXZlbCArIDF9IWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVZpY3RvcnkgPSBhc3luYyAoZHVuZ2VvbikgPT4ge1xuICAgIHNldEFjdGl2ZUR1bmdlb24obnVsbCk7XG4gICAgY29uc3QgdXBkYXRlcyA9IHtcbiAgICAgIGdvbGQ6IE1hdGgubWluKHBsYXllckJhc2UuZ29sZCArIGR1bmdlb24uZ29sZFJldywgcGxheWVyQmFzZS5nb2xkX2NhcGFjaXR5KSxcbiAgICAgIG1hbmE6IE1hdGgubWluKHBsYXllckJhc2UubWFuYSArIGR1bmdlb24ubWFuYVJldywgcGxheWVyQmFzZS5tYW5hX2NhcGFjaXR5KSxcbiAgICAgIHNvdWxfc2hhcmRzOiAocGxheWVyQmFzZS5zb3VsX3NoYXJkcyB8fCAwKSArIGR1bmdlb24uc2hhcmRSZXdcbiAgICB9O1xuICAgIC8vIEdyYW50IGdlbXMgaWYgdGhpcyBpcyB0aGUgZmluYWwgZHVuZ2VvbiAobGV2ZWwgMTApIG9mIGEgdGVycml0b3J5XG4gICAgaWYgKGR1bmdlb24ubGV2ZWwgPT09IDEwICYmIGR1bmdlb24udGVycml0b3J5KSB7XG4gICAgICBjb25zdCB0ZXJyaXRvcnlEZWYgPSBURVJSSVRPUllfREVGU1tkdW5nZW9uLnRlcnJpdG9yeSAtIDFdO1xuICAgICAgaWYgKHRlcnJpdG9yeURlZikge1xuICAgICAgICB1cGRhdGVzLmdlbXMgPSAocGxheWVyQmFzZS5nZW1zIHx8IDApICsgdGVycml0b3J5RGVmLmdlbVJld2FyZDtcbiAgICAgICAgdG9hc3Quc3VjY2Vzcyhg8J+OiSBUZXJyaXRvcnkgJHtkdW5nZW9uLnRlcnJpdG9yeX0gY2xlYXJlZCEgKyR7dGVycml0b3J5RGVmLmdlbVJld2FyZC50b0xvY2FsZVN0cmluZygpfSDwn5KOYCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwgdXBkYXRlcyk7XG4gICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkKTtcbiAgICB0b2FzdC5zdWNjZXNzKGDimpTvuI8gVmljdG9yeSEgKyR7ZHVuZ2Vvbi5nb2xkUmV3LnRvTG9jYWxlU3RyaW5nKCl98J+SsCArJHtkdW5nZW9uLm1hbmFSZXcudG9Mb2NhbGVTdHJpbmcoKX3wn5S3ICske2R1bmdlb24uc2hhcmRSZXd98J+SnGApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlZmVhdCA9ICgpID0+IHtcbiAgICBzZXRBY3RpdmVEdW5nZW9uKG51bGwpO1xuICAgIHRvYXN0LmVycm9yKFwi4pig77iPIERlZmVhdGVkISBUcmFpbiBtb3JlIHRyb29wcyBhbmQgdHJ5IGFnYWluLlwiKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb2xsZWN0UmVzb3VyY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgZ29sZENvbGxlY3RlZCwgbWFuYUNvbGxlY3RlZCwgYnVpbGRpbmdzVG9VcGRhdGUgfSA9IGNvbGxlY3RGcm9tTWluZXMoYnVpbGRpbmdzLCBwbGF5ZXJCYXNlKTtcblxuICAgIGlmIChnb2xkQ29sbGVjdGVkID09PSAwICYmIG1hbmFDb2xsZWN0ZWQgPT09IDApIHtcbiAgICAgIHRvYXN0LmVycm9yKFwiTm8gcmVzb3VyY2VzIHRvIGNvbGxlY3QhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBwbGF5ZXIgYmFzZSB3aXRoIGNvbGxlY3RlZCByZXNvdXJjZXNcbiAgICBjb25zdCB1cGRhdGVkQmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShwbGF5ZXJCYXNlLmlkLCB7XG4gICAgICBnb2xkOiBwbGF5ZXJCYXNlLmdvbGQgKyBnb2xkQ29sbGVjdGVkLFxuICAgICAgbWFuYTogcGxheWVyQmFzZS5tYW5hICsgbWFuYUNvbGxlY3RlZFxuICAgIH0pO1xuICAgIHNldFBsYXllckJhc2UodXBkYXRlZEJhc2UpO1xuXG4gICAgLy8gVXBkYXRlIGJ1aWxkaW5ncyB3aXRoIG5ldyBzdG9yZWQgYW1vdW50cyAob3ZlcmZsb3cpXG4gICAgZm9yIChjb25zdCBiIG9mIGJ1aWxkaW5nc1RvVXBkYXRlKSB7XG4gICAgICBhd2FpdCBiYXNlNDQuZW50aXRpZXMuQnVpbGRpbmcudXBkYXRlKGIuaWQsIHsgY3VzdG9tX2RhdGE6IGIuY3VzdG9tX2RhdGEgfSk7XG4gICAgfVxuICAgIHNldEJ1aWxkaW5ncygocHJldikgPT4gcHJldi5tYXAoKGIpID0+IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBidWlsZGluZ3NUb1VwZGF0ZS5maW5kKCh4KSA9PiB4LmlkID09PSBiLmlkKTtcbiAgICAgIHJldHVybiB1cGRhdGVkID8gdXBkYXRlZCA6IGI7XG4gICAgfSkpO1xuXG4gICAgdG9hc3Quc3VjY2Vzcyhg8J+TpiBDb2xsZWN0ZWQgJHtnb2xkQ29sbGVjdGVkID4gMCA/IGAke2dvbGRDb2xsZWN0ZWQudG9Mb2NhbGVTdHJpbmcoKX3wn5KwYCA6ICcnfSR7Z29sZENvbGxlY3RlZCA+IDAgJiYgbWFuYUNvbGxlY3RlZCA+IDAgPyAnICsgJyA6ICcnfSR7bWFuYUNvbGxlY3RlZCA+IDAgPyBgJHttYW5hQ29sbGVjdGVkLnRvTG9jYWxlU3RyaW5nKCl98J+Ut2AgOiAnJ30hYCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQnV5UmVzb3VyY2VQYWNrID0gYXN5bmMgKHBhY2spID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBkYXRlZEJhc2UgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICBnZW1zOiBwbGF5ZXJCYXNlLmdlbXMgLSBwYWNrLmdlbUNvc3QsXG4gICAgICAgIFtwYWNrLnJlc291cmNlXTogcGxheWVyQmFzZVtwYWNrLnJlc291cmNlXSArIHBhY2suYW1vdW50XG4gICAgICB9KTtcbiAgICAgIHNldFBsYXllckJhc2UodXBkYXRlZEJhc2UpO1xuICAgICAgdG9hc3Quc3VjY2Vzcyhg8J+SjiBQdXJjaGFzZWQgJHtwYWNrLm5hbWV9ISArJHtwYWNrLmFtb3VudC50b0xvY2FsZVN0cmluZygpfSAke3BhY2sucmVzb3VyY2UudG9VcHBlckNhc2UoKX1gKTtcbiAgICAgIHNldFNob3dHZW1TaG9wKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGJ1eSByZXNvdXJjZSBwYWNrOicsIGVycm9yKTtcbiAgICAgIHRvYXN0LmVycm9yKCdQdXJjaGFzZSBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbnZlcnRUb1BhY2tzID0gYXN5bmMgKHJlc291cmNlVHlwZSwgcGFja1R5cGUsIGRpc3RyaWJ1dGlvbikgPT4ge1xuICAgIGNvbnN0IGdlbUNvc3QgPSByZXNvdXJjZVR5cGUgPT09IFwiZ29sZFwiID9cbiAgICBkaXN0cmlidXRpb24uc3RvcmVkQW1vdW50ID4gMTAwMDAwID8gMTUwIDogZGlzdHJpYnV0aW9uLnN0b3JlZEFtb3VudCA+IDEwMDAwID8gNTAgOiAxMCA6XG4gICAgZGlzdHJpYnV0aW9uLnN0b3JlZEFtb3VudCA+IDEwMDAwMCA/IDE1MCA6IGRpc3RyaWJ1dGlvbi5zdG9yZWRBbW91bnQgPiAxMDAwMCA/IDUwIDogMTA7XG5cbiAgICBpZiAoKHBsYXllckJhc2U/LmdlbXMgPz8gMCkgPCBnZW1Db3N0KSB7XG4gICAgICB0b2FzdC5lcnJvcihcIk5vdCBlbm91Z2ggZ2VtcyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRGVkdWN0IGdlbXNcbiAgICBjb25zdCB1cGRhdGVkQmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLnVwZGF0ZShwbGF5ZXJCYXNlLmlkLCB7XG4gICAgICBnZW1zOiBwbGF5ZXJCYXNlLmdlbXMgLSBnZW1Db3N0LFxuICAgICAgcGVuZGluZ19vdmVyZmxvd19nb2xkOiByZXNvdXJjZVR5cGUgPT09IFwiZ29sZFwiID8gMCA6IHBsYXllckJhc2UucGVuZGluZ19vdmVyZmxvd19nb2xkLFxuICAgICAgcGVuZGluZ19vdmVyZmxvd19tYW5hOiByZXNvdXJjZVR5cGUgPT09IFwibWFuYVwiID8gMCA6IHBsYXllckJhc2UucGVuZGluZ19vdmVyZmxvd19tYW5hXG4gICAgfSk7XG4gICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkQmFzZSk7XG5cbiAgICAvLyBDcmVhdGUgcmVzb3VyY2UgcGFja3NcbiAgICBpZiAoZGlzdHJpYnV0aW9uLnBhY2tDb3VudCA+IDApIHtcbiAgICAgIGF3YWl0IGJhc2U0NC5lbnRpdGllcy5SZXNvdXJjZVBhY2suY3JlYXRlKHtcbiAgICAgICAgcGxheWVyX2lkOiB1c2VyLmlkLFxuICAgICAgICBwYWNrX3R5cGU6IHBhY2tUeXBlLFxuICAgICAgICByZXNvdXJjZV90eXBlOiByZXNvdXJjZVR5cGUsXG4gICAgICAgIHF1YW50aXR5OiBkaXN0cmlidXRpb24ucGFja0NvdW50XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2FzdC5zdWNjZXNzKGDwn5OmIENvbnZlcnRlZCAke2Rpc3RyaWJ1dGlvbi5zdG9yZWRBbW91bnQudG9Mb2NhbGVTdHJpbmcoKX0gJHtyZXNvdXJjZVR5cGUudG9VcHBlckNhc2UoKX0gdG8gJHtkaXN0cmlidXRpb24ucGFja0NvdW50fSAke3BhY2tUeXBlfSBwYWNrcyFgKTtcbiAgICBzZXRTaG93UGFja0NvbnZlcnNpb24oZmFsc2UpO1xuICAgIHNldFBlbmRpbmdPdmVyZmxvdyh7IGdvbGQ6IDAsIG1hbmE6IDAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VBbGxEZXZQYW5lbHMgPSAoKSA9PiB7XG4gICAgc2V0U2hvd1BpeGVsRWRpdG9yKGZhbHNlKTtcbiAgICBzZXRTaG93RHVuZ2VvbkVkaXRvcihmYWxzZSk7XG4gICAgc2V0U2hvd0hlcm9DcmVhdG9yKGZhbHNlKTtcbiAgICBzZXRTaG93SGVyb0VkaXRvcihmYWxzZSk7XG4gICAgc2V0U2hvd1dhbGxMYXllckVkaXRvcihmYWxzZSk7XG4gICAgc2V0U2hvd0J1aWxkaW5nSHBFZGl0b3IoZmFsc2UpO1xuICAgIHNldFNob3dCdWlsZGluZ1N0YXRzRWRpdG9yKGZhbHNlKTtcbiAgICBzZXRTaG93RG9jdW1lbnRhdGlvbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZXRHYW1lID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXNldCBnYW1lIHByb2dyZXNzPyBEZXNpZ24gZWRpdHMsIHN0YXQgb3ZlcnJpZGVzLCBhbmQgaGVybyBkZWZpbml0aW9ucyB3aWxsIGJlIHByZXNlcnZlZC5cIikpIHJldHVybjtcblxuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TG9hZGluZ01lc3NhZ2UoXCJSRVNFVFRJTkcgS0lOR0RPTS4uLlwiKTtcblxuICAgIC8vIEtleXMgdG8gUFJFU0VSVkUgaW4gbG9jYWxTdG9yYWdlIChhbGwgZGV2L2Rlc2lnbiBhc3NldHMpXG4gICAgY29uc3QgUFJFU0VSVkVfS0VZUyA9IFtcbiAgICBcImJ1aWxkaW5nX3Nwcml0ZXNfdjFcIixcbiAgICBcInB1Ymxpc2hlZF9idWlsZGluZ19zcHJpdGVzX3YxXCIsXG4gICAgXCJidWlsZGluZ19ocF9vdmVycmlkZXNfdjFcIixcbiAgICBcImJ1aWxkaW5nX3RpbWVfb3ZlcnJpZGVzX3YxXCIsXG4gICAgXCJidWlsZGluZ19jb3N0X292ZXJyaWRlc192MVwiLFxuICAgIFwiaGVyb19kZWZpbml0aW9uc192MVwiLFxuICAgIFwiaGVyb19zcHJpdGVzX3YxXCIsXG4gICAgXCJwdWJsaXNoZWRfaGVyb19zcHJpdGVzX3YxXCIsXG4gICAgXCJ3YWxsX2xheWVyX3Nwcml0ZXNfdjFcIixcbiAgICBcIndhbGxfbGlua19sYXllcnNfdjFcIixcbiAgICBcInB1Ymxpc2hlZF93YWxsX2xheWVyc192MVwiLFxuICAgIFwiZGV2X2RvY3VtZW50YXRpb25fdjJcIl07XG5cbiAgICAvLyBQcmVzZXJ2ZSBkdW5nZW9uIGxheW91dHMgKGR5bmFtaWMga2V5cylcbiAgICBjb25zdCBwcmVzZXJ2ZWRFbnRyaWVzID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgICBpZiAoUFJFU0VSVkVfS0VZUy5pbmNsdWRlcyhrZXkpIHx8IGtleS5zdGFydHNXaXRoKFwiZHVuZ2Vvbl9sYXlvdXRfXCIpKSB7XG4gICAgICAgIHByZXNlcnZlZEVudHJpZXNba2V5XSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERlbGV0ZSBBTEwgcGxheWVyIGRhdGEgLSBldmVyeSBlbnRpdHkgdHlwZVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgYmFzZTQ0LmVudGl0aWVzLkJ1aWxkaW5nLmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuSGVyby5kZWxldGVNYW55KHsgcGxheWVyX2lkOiB1c2VyLmlkIH0pLFxuICAgICAgYmFzZTQ0LmVudGl0aWVzLlRyb29wLmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuQXNwZWN0LmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuUmVzb3VyY2VQYWNrLmRlbGV0ZU1hbnkoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuRHVuZ2VvblJ1bi5kZWxldGVNYW55KHsgcGxheWVyX2lkOiB1c2VyLmlkIH0pLFxuICAgICAgYmFzZTQ0LmVudGl0aWVzLkdlYXIuZGVsZXRlTWFueSh7IHBsYXllcl9pZDogdXNlci5pZCB9KSxcbiAgICAgIGJhc2U0NC5lbnRpdGllcy5TcGVsbC5kZWxldGVNYW55KHsgcGxheWVyX2lkOiB1c2VyLmlkIH0pXVxuICAgICAgKTtcblxuICAgICAgLy8gRGVsZXRlIFBsYXllckJhc2UgbGFzdFxuICAgICAgaWYgKHBsYXllckJhc2UpIHtcbiAgICAgICAgYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UuZGVsZXRlKHBsYXllckJhc2UuaWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgZnJlc2ggYmFzZSB3aXRoIDEgbWlsbGlvbiBnZW1zIGFuZCByZXNldCBzdGF0c1xuICAgICAgY29uc3QgbmV3QmFzZSA9IGF3YWl0IGJhc2U0NC5lbnRpdGllcy5QbGF5ZXJCYXNlLmNyZWF0ZSh7XG4gICAgICAgIHBsYXllcl9pZDogdXNlci5pZCxcbiAgICAgICAgdG93bl9oYWxsX2xldmVsOiAxLFxuICAgICAgICBnb2xkOiA1MDAwLFxuICAgICAgICBtYW5hOiA1MDAwLFxuICAgICAgICBzb3VsX3NoYXJkczogMCxcbiAgICAgICAgZ2VtczogMCxcbiAgICAgICAgZ29sZF9jYXBhY2l0eTogMzAwMDAsXG4gICAgICAgIG1hbmFfY2FwYWNpdHk6IDMwMDAwLFxuICAgICAgICBsYXN0X3Jlc291cmNlX3RpY2s6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgZ29sZF9wZXJfaG91cjogMCxcbiAgICAgICAgbWFuYV9wZXJfaG91cjogMCxcbiAgICAgICAgbGFzdF9hdXRvX2NvbGxlY3Q6IG51bGwsXG4gICAgICAgIHBlbmRpbmdfb3ZlcmZsb3dfZ29sZDogMCxcbiAgICAgICAgcGVuZGluZ19vdmVyZmxvd19tYW5hOiAwXG4gICAgICB9KTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBvbmx5IHN0YXJ0ZXIgYnVpbGRpbmdzIChhbGwgYXQgbGV2ZWwgMSlcbiAgICAgIGF3YWl0IGluaXRpYWxpemVOZXdCYXNlKGJhc2U0NCwgdXNlci5pZCk7XG5cbiAgICAgIC8vIFJlbG9hZCBhbGwgZGF0YVxuICAgICAgY29uc3QgW2ZyZXNoQmxkZ3MsIGZyZXNoSGVyb2VzLCBmcmVzaFRyb29wcywgZnJlc2hBc3BlY3RzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIGJhc2U0NC5lbnRpdGllcy5CdWlsZGluZy5maWx0ZXIoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuSGVyby5maWx0ZXIoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSksXG4gICAgICBiYXNlNDQuZW50aXRpZXMuVHJvb3AuZmlsdGVyKHsgcGxheWVyX2lkOiB1c2VyLmlkIH0pLFxuICAgICAgYmFzZTQ0LmVudGl0aWVzLkFzcGVjdC5maWx0ZXIoeyBwbGF5ZXJfaWQ6IHVzZXIuaWQgfSldXG4gICAgICApO1xuXG4gICAgICBzZXRQbGF5ZXJCYXNlKG5ld0Jhc2UpO1xuICAgICAgc2V0QnVpbGRpbmdzKGZyZXNoQmxkZ3MpO1xuICAgICAgc2V0SGVyb2VzKGZyZXNoSGVyb2VzKTtcbiAgICAgIHNldFRyb29wcyhmcmVzaFRyb29wcyk7XG4gICAgICBzZXRBc3BlY3RzKGZyZXNoQXNwZWN0cyk7XG4gICAgICBzZXRQZW5kaW5nU2hvcFBsYWNlbWVudChudWxsKTtcbiAgICAgIHNldEdlbVBsYWNlbWVudENvbmZpcm0obnVsbCk7XG4gICAgICBzZXRTZWxlY3RlZEJ1aWxkaW5nKG51bGwpO1xuICAgICAgc2V0U2hvd1Nob3AoZmFsc2UpO1xuICAgICAgc2V0U2hvd0FsdGFyKGZhbHNlKTtcbiAgICAgIHNldFNob3dEdW5nZW9ucyhmYWxzZSk7XG4gICAgICBzZXRTaG93UGFja0NvbnZlcnNpb24oZmFsc2UpO1xuICAgICAgc2V0U2hvd0dlbVNob3AoZmFsc2UpO1xuXG4gICAgICAvLyBSZXN0b3JlIHByZXNlcnZlZCBsb2NhbFN0b3JhZ2UgZW50cmllc1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHByZXNlcnZlZEVudHJpZXMpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsKTtcbiAgICAgIH1cblxuICAgICAgdG9hc3Quc3VjY2VzcyhcIvCfjq4gR2FtZSByZXNldCEgQWxsIHByb2dyZXNzIGNsZWFyZWQuIERlc2lnbiBlZGl0cyBwcmVzZXJ2ZWQuXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVzZXQgZ2FtZTonLCBlcnJvcik7XG4gICAgICB0b2FzdC5lcnJvcignUmVzZXQgZmFpbGVkLiBQbGVhc2UgcmVmcmVzaCB0aGUgcGFnZS4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEwNjU6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiMwYTBhMTJcIiB9fT5cbiAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTA2Njo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LXllbGxvdy00MDAgdGV4dC14cyBtYi00IGFuaW1hdGUtcHVsc2VcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImxvYWRpbmdNZXNzYWdlXCI+e2xvYWRpbmdNZXNzYWdlfTwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMDY3OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgY2xhc3NOYW1lPVwidy0xMiBoLTEyIGJvcmRlci00IGJvcmRlci15ZWxsb3ctODAwIGJvcmRlci10LXllbGxvdy00MDAgcm91bmRlZC1mdWxsIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICA8L2Rpdj4pO1xuXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEwNzM6NFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgb3ZlcmZsb3ctaGlkZGVuXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjMGQxMTE3XCIgfX0+XG4gICAgICB7LyogSXNvbWV0cmljIGdyaWQgKi99XG4gICAgICA8SXNvbWV0cmljR3JpZCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTA3NTo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHJlZj17Z3JpZFJlZn1cbiAgICAgIGJ1aWxkaW5ncz17YnVpbGRpbmdzfVxuICAgICAgaGVyb2VzPXtoZXJvZXN9XG4gICAgICBzZWxlY3RlZEJ1aWxkaW5nPXtzZWxlY3RlZEJ1aWxkaW5nfVxuICAgICAgb25TZWxlY3RCdWlsZGluZz17KGIpID0+IHtzZXRTZWxlY3RlZEJ1aWxkaW5nKGIpO2lmIChiKSBzZXRXYWxsR3JvdXAobnVsbCk7fX1cbiAgICAgIG9uTW92ZUJ1aWxkaW5nPXtoYW5kbGVNb3ZlQnVpbGRpbmdfZXh0ZW5kZWR9XG4gICAgICBwZW5kaW5nU2hvcFBsYWNlbWVudD17cGVuZGluZ1Nob3BQbGFjZW1lbnR9XG4gICAgICBvblBsYWNlU2hvcEJ1aWxkaW5nPXtoYW5kbGVQbGFjZVNob3BCdWlsZGluZ31cbiAgICAgIG9uV2FsbERyYWc9e2hhbmRsZVdhbGxEcmFnfVxuICAgICAgd2FsbEdyb3VwPXt3YWxsR3JvdXB9XG4gICAgICBvbldhbGxHcm91cFNlbGVjdD17aGFuZGxlV2FsbEdyb3VwU2VsZWN0fSAvPlxuICAgICAgXG5cbiAgICAgIHsvKiBIVUQgKi99XG4gICAgICA8SFVEIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMDkwOjZcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgcGxheWVyQmFzZT17cGxheWVyQmFzZX1cbiAgICAgIHRvd25IYWxsTGV2ZWw9e2J1aWxkaW5ncy5maW5kKChiKSA9PiBiLmJ1aWxkaW5nX3R5cGUgPT09ICd0b3duX2hhbGwnKT8ubGV2ZWwgfHwgcGxheWVyQmFzZT8udG93bl9oYWxsX2xldmVsIHx8IDF9XG4gICAgICBvbk9wZW5TaG9wPXsoKSA9PiB7c2V0U2hvd1Nob3AodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuRHVuZ2VvbnM9eygpID0+IHtzZXRTaG93RHVuZ2VvbnModHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuQWx0YXI9eygpID0+IHtzZXRTaG93QWx0YXIodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuR2VtU2hvcD17KCkgPT4ge3NldFNob3dHZW1TaG9wKHRydWUpO3NldFNlbGVjdGVkQnVpbGRpbmcobnVsbCk7fX1cbiAgICAgIG9uT3BlblBpeGVsRWRpdG9yPXsoKSA9PiB7Y2xvc2VBbGxEZXZQYW5lbHMoKTtzZXRTaG93UGl4ZWxFZGl0b3IodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuRHVuZ2VvbkVkaXRvcj17KCkgPT4ge2Nsb3NlQWxsRGV2UGFuZWxzKCk7c2V0U2hvd0R1bmdlb25FZGl0b3IodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuSGVyb0NyZWF0b3I9eygpID0+IHtjbG9zZUFsbERldlBhbmVscygpO3NldFNob3dIZXJvQ3JlYXRvcih0cnVlKTtzZXRTZWxlY3RlZEJ1aWxkaW5nKG51bGwpO319XG4gICAgICBvbk9wZW5IZXJvRWRpdG9yPXsoKSA9PiB7Y2xvc2VBbGxEZXZQYW5lbHMoKTtzZXRTaG93SGVyb0VkaXRvcih0cnVlKTtzZXRTZWxlY3RlZEJ1aWxkaW5nKG51bGwpO319XG4gICAgICBvbk9wZW5XYWxsTGF5ZXJFZGl0b3I9eygpID0+IHtjbG9zZUFsbERldlBhbmVscygpO3NldFNob3dXYWxsTGF5ZXJFZGl0b3IodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuQnVpbGRpbmdIcEVkaXRvcj17KCkgPT4ge2Nsb3NlQWxsRGV2UGFuZWxzKCk7c2V0U2hvd0J1aWxkaW5nSHBFZGl0b3IodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuQnVpbGRpbmdTdGF0c0VkaXRvcj17KCkgPT4ge2Nsb3NlQWxsRGV2UGFuZWxzKCk7c2V0U2hvd0J1aWxkaW5nU3RhdHNFZGl0b3IodHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgb25PcGVuRG9jdW1lbnRhdGlvbj17KCkgPT4ge2Nsb3NlQWxsRGV2UGFuZWxzKCk7c2V0U2hvd0RvY3VtZW50YXRpb24odHJ1ZSk7c2V0U2VsZWN0ZWRCdWlsZGluZyhudWxsKTt9fVxuICAgICAgc2hvd0NvbGxlY3RCdXR0b249e3Nob3dDb2xsZWN0QnV0dG9ufVxuICAgICAgb25Db2xsZWN0PXtoYW5kbGVDb2xsZWN0UmVzb3VyY2VzfVxuICAgICAgb25SZXNldD17aGFuZGxlUmVzZXRHYW1lfVxuICAgICAgb25TZXRHZW1zPXthc3luYyAoYW1vdW50LCBwYXJ0aWFsVXBkYXRlcykgPT4ge1xuICAgICAgICBpZiAocGFydGlhbFVwZGF0ZXMpIHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UudXBkYXRlKHBsYXllckJhc2UuaWQsIHBhcnRpYWxVcGRhdGVzKTtcbiAgICAgICAgICBzZXRQbGF5ZXJCYXNlKHVwZGF0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwgeyBnZW1zOiBhbW91bnQgfSk7XG4gICAgICAgICAgc2V0UGxheWVyQmFzZSh1cGRhdGVkKTtcbiAgICAgICAgfVxuICAgICAgfX0gLz5cbiAgICAgIFxuXG4gICAgICB7LyogV2FsbCBncm91cCBwYW5lbCAqL31cbiAgICAgIHt3YWxsR3JvdXAgJiYgd2FsbEdyb3VwLmxlbmd0aCA+IDAgJiYgIXNlbGVjdGVkQnVpbGRpbmcgJiZcbiAgICAgIDxXYWxsR3JvdXBQYW5lbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTEyMTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHdhbGxzPXt3YWxsR3JvdXB9XG4gICAgICBwbGF5ZXJCYXNlPXtwbGF5ZXJCYXNlfVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0V2FsbEdyb3VwKG51bGwpfVxuICAgICAgb25VcGdyYWRlQWxsPXtoYW5kbGVXYWxsR3JvdXBVcGdyYWRlQWxsfVxuICAgICAgb25Nb3ZlQWxsPXtoYW5kbGVXYWxsR3JvdXBNb3ZlQWxsfVxuICAgICAgb25Sb3RhdGVBbGw9e2hhbmRsZVdhbGxHcm91cFJvdGF0ZX0gLz5cblxuICAgICAgfVxuXG4gICAgICB7LyogQnVpbGRpbmcgcGFuZWwgKi99XG4gICAgICB7c2VsZWN0ZWRCdWlsZGluZyAmJlxuICAgICAgPEJ1aWxkaW5nUGFuZWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjExMzM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICBidWlsZGluZz17c2VsZWN0ZWRCdWlsZGluZ31cbiAgICAgIHBsYXllckJhc2U9e3BsYXllckJhc2V9XG4gICAgICBoZXJvZXM9e2hlcm9lc31cbiAgICAgIG9uVXBncmFkZT17aGFuZGxlVXBncmFkZUJ1aWxkaW5nfVxuICAgICAgb25TcGVlZFVwPXtoYW5kbGVTcGVlZFVwVXBncmFkZX1cbiAgICAgIG9uVXBncmFkZVdpdGhHZW1zPXtoYW5kbGVVcGdyYWRlV2l0aEdlbXN9XG4gICAgICBvbkNsb3NlPXsoKSA9PiBzZXRTZWxlY3RlZEJ1aWxkaW5nKG51bGwpfVxuICAgICAgb25Nb3ZlPXsoKSA9PiBncmlkUmVmLmN1cnJlbnQ/LnN0YXJ0TW92ZU1vZGUoc2VsZWN0ZWRCdWlsZGluZyl9IC8+XG5cbiAgICAgIH1cblxuICAgICAgey8qIE1vZGFscyAqL31cbiAgICAgIHtzaG93U2hvcCAmJlxuICAgICAgPFNob3BNb2RhbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTE0Nzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHBsYXllckJhc2U9e3BsYXllckJhc2V9XG4gICAgICBidWlsZGluZ3M9e2J1aWxkaW5nc31cbiAgICAgIG9uQnV5PXtoYW5kbGVCdXlGcm9tU2hvcH1cbiAgICAgIG9uQnV5V2l0aEdlbXM9e2hhbmRsZUJ1eUZyb21TaG9wV2l0aEdlbXN9XG4gICAgICBvbkNsb3NlPXsoKSA9PiBzZXRTaG93U2hvcChmYWxzZSl9IC8+XG5cbiAgICAgIH1cbiAgICAgIHtzaG93QWx0YXIgJiZcbiAgICAgIDxBbHRhck1vZGFsIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMTU2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgaGVyb2VzPXtoZXJvZXN9XG4gICAgICBhc3BlY3RzPXthc3BlY3RzfVxuICAgICAgcGxheWVyQmFzZT17cGxheWVyQmFzZX1cbiAgICAgIGhlcm9CdWlsZGluZ3M9e2J1aWxkaW5ncy5maWx0ZXIoKGIpID0+IGIuYnVpbGRpbmdfdHlwZSA9PT0gXCJoZXJvX2Jhc2VcIil9XG4gICAgICBvblVwZ3JhZGVIZXJvPXtoYW5kbGVVcGdyYWRlSGVyb31cbiAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dBbHRhcihmYWxzZSl9XG4gICAgICBvblJvbGxIZXJvPXthc3luYyAoaGVyb0RhdGEsIGFjdGl2YXRlKSA9PiB7XG4gICAgICAgIGlmICghYWN0aXZhdGUpIHtcbiAgICAgICAgICAvLyBEZWR1Y3QgZ2VtcyBmb3IgdGhlIHJvbGxcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgYmFzZTQ0LmVudGl0aWVzLlBsYXllckJhc2UudXBkYXRlKHBsYXllckJhc2UuaWQsIHtcbiAgICAgICAgICAgIGdlbXM6IE1hdGgubWF4KDAsIChwbGF5ZXJCYXNlLmdlbXMgPz8gMCkgLSBoZXJvRGF0YS5nZW1fY29zdClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRQbGF5ZXJCYXNlKHVwZGF0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFjdGl2YXRlOiBjcmVhdGUgaGVybyBlbnRpdHkgZnJvbSB0aGUgY3VzdG9tIGhlcm8gZGF0YVxuICAgICAgICAgIGNvbnN0IG5ld0hlcm8gPSBhd2FpdCBiYXNlNDQuZW50aXRpZXMuSGVyby5jcmVhdGUoe1xuICAgICAgICAgICAgcGxheWVyX2lkOiB1c2VyLmlkLFxuICAgICAgICAgICAgaGVyb190eXBlOiBoZXJvRGF0YS5oZXJvRGVmSWQgfHwgaGVyb0RhdGEuaWQsXG4gICAgICAgICAgICBuYW1lOiBoZXJvRGF0YS5oZXJvTmFtZSB8fCBoZXJvRGF0YS5uYW1lLFxuICAgICAgICAgICAgcmFyaXR5OiBoZXJvRGF0YS5oZXJvUmFyaXR5IHx8IGhlcm9EYXRhLnJhcml0eSB8fCBcImNvbW1vblwiLFxuICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgICBocDogaGVyb0RhdGEuaGVyb1N0YXRzPy5ocCA/PyBoZXJvRGF0YS5ocCA/PyAyMDAsXG4gICAgICAgICAgICBtYXhfaHA6IGhlcm9EYXRhLmhlcm9TdGF0cz8uaHAgPz8gaGVyb0RhdGEuaHAgPz8gMjAwLFxuICAgICAgICAgICAgYXR0YWNrOiBoZXJvRGF0YS5oZXJvU3RhdHM/LmF0dGFjayA/PyBoZXJvRGF0YS5hdHRhY2sgPz8gMjUsXG4gICAgICAgICAgICBkZWZlbnNlOiBoZXJvRGF0YS5oZXJvU3RhdHM/LmRlZmVuc2UgPz8gaGVyb0RhdGEuZGVmZW5zZSA/PyAxNSxcbiAgICAgICAgICAgIHNwZWVkOiBoZXJvRGF0YS5oZXJvU3RhdHM/LnNwZWVkID8/IGhlcm9EYXRhLnNwZWVkID8/IDEwLFxuICAgICAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgICAgIGlzX3VubG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgcG9ydHJhaXQ6IGhlcm9EYXRhLmhlcm9EZWZJZCB8fCBoZXJvRGF0YS5pZCB8fCBcIndhcnJpb3JcIlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldEhlcm9lcygocHJldikgPT4gWy4uLnByZXYsIG5ld0hlcm9dKTtcbiAgICAgICAgICB0b2FzdC5zdWNjZXNzKGDwn6a4ICR7bmV3SGVyby5uYW1lfSBoYXMgam9pbmVkIHlvdXIga2luZ2RvbSFgKTtcbiAgICAgICAgfVxuICAgICAgfX0gLz5cblxuICAgICAgfVxuICAgICAge3Nob3dEdW5nZW9ucyAmJlxuICAgICAgPER1bmdlb25zTW9kYWwgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjExOTQ6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICBwbGF5ZXJCYXNlPXtwbGF5ZXJCYXNlfVxuICAgICAgaGVyb2VzPXtoZXJvZXN9XG4gICAgICB0cm9vcHM9e3Ryb29wc31cbiAgICAgIG9uRW50ZXJEdW5nZW9uPXsoZHVuZ2VvbikgPT4ge3NldEFjdGl2ZUR1bmdlb24oZHVuZ2Vvbik7c2V0U2hvd0R1bmdlb25zKGZhbHNlKTt9fVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd0R1bmdlb25zKGZhbHNlKX0gLz5cblxuICAgICAgfVxuICAgICAge2FjdGl2ZUR1bmdlb24gJiZcbiAgICAgIDxDb21iYXRTY3JlZW4gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEyMDM6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiXG4gICAgICBkdW5nZW9uPXthY3RpdmVEdW5nZW9ufVxuICAgICAgaGVyb2VzPXtoZXJvZXN9XG4gICAgICB0cm9vcHM9e3Ryb29wc31cbiAgICAgIG9uQ2xvc2U9eygpID0+IHNldEFjdGl2ZUR1bmdlb24obnVsbCl9XG4gICAgICBvblZpY3Rvcnk9e2hhbmRsZVZpY3Rvcnl9XG4gICAgICBvbkRlZmVhdD17aGFuZGxlRGVmZWF0fSAvPlxuXG4gICAgICB9XG5cbiAgICAgIHsvKiBQYWNrIGNvbnZlcnNpb24gbW9kYWwgKi99XG4gICAgICB7c2hvd1BhY2tDb252ZXJzaW9uICYmXG4gICAgICA8UGFja0NvbnZlcnNpb25Nb2RhbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTIxNTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHBsYXllckJhc2U9e3BsYXllckJhc2V9XG4gICAgICBvdmVyZmxvd0dvbGQ9e3BlbmRpbmdPdmVyZmxvdy5nb2xkfVxuICAgICAgb3ZlcmZsb3dNYW5hPXtwZW5kaW5nT3ZlcmZsb3cubWFuYX1cbiAgICAgIG9uQ29udmVydD17aGFuZGxlQ29udmVydFRvUGFja3N9XG4gICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgIHNldFNob3dQYWNrQ29udmVyc2lvbihmYWxzZSk7XG4gICAgICAgIC8vIENsZWFyIG92ZXJmbG93IGlmIHVzZXIgY2xvc2VzIHdpdGhvdXQgY29udmVydGluZ1xuICAgICAgICBiYXNlNDQuZW50aXRpZXMuUGxheWVyQmFzZS51cGRhdGUocGxheWVyQmFzZS5pZCwge1xuICAgICAgICAgIHBlbmRpbmdfb3ZlcmZsb3dfZ29sZDogMCxcbiAgICAgICAgICBwZW5kaW5nX292ZXJmbG93X21hbmE6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFBlbmRpbmdPdmVyZmxvdyh7IGdvbGQ6IDAsIG1hbmE6IDAgfSk7XG4gICAgICB9fSAvPlxuXG4gICAgICB9XG5cbiAgICAgIHtzaG93R2VtU2hvcCAmJlxuICAgICAgPEdlbVNob3BNb2RhbCBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTIzMzo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgIHBsYXllckJhc2U9e3BsYXllckJhc2V9XG4gICAgICBvbkJ1eT17aGFuZGxlQnV5UmVzb3VyY2VQYWNrfVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd0dlbVNob3AoZmFsc2UpfSAvPlxuXG4gICAgICB9XG4gICAgICB7c2hvd1BpeGVsRWRpdG9yICYmXG4gICAgICA8UGl4ZWxFZGl0b3IgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEyNDA6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xvc2U9eygpID0+IHNldFNob3dQaXhlbEVkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0R1bmdlb25FZGl0b3IgJiZcbiAgICAgIDxEdW5nZW9uRWRpdG9yTGF5b3V0IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjQzOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsb3NlPXsoKSA9PiBzZXRTaG93RHVuZ2VvbkVkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0hlcm9DcmVhdG9yICYmXG4gICAgICA8SGVyb0NyZWF0b3IgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEyNDY6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xvc2U9eygpID0+IHNldFNob3dIZXJvQ3JlYXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0hlcm9FZGl0b3IgJiZcbiAgICAgIDxIZXJvRWRpdG9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjQ5OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsb3NlPXsoKSA9PiBzZXRTaG93SGVyb0VkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd1dhbGxMYXllckVkaXRvciAmJlxuICAgICAgPFdhbGxMYXllckVkaXRvciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI1Mjo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgb25DbG9zZT17KCkgPT4gc2V0U2hvd1dhbGxMYXllckVkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0J1aWxkaW5nSHBFZGl0b3IgJiZcbiAgICAgIDxCdWlsZGluZ0hwRWRpdG9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjU1OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsb3NlPXsoKSA9PiBzZXRTaG93QnVpbGRpbmdIcEVkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0J1aWxkaW5nU3RhdHNFZGl0b3IgJiZcbiAgICAgIDxCdWlsZGluZ1N0YXRzRWRpdG9yIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjU4OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsb3NlPXsoKSA9PiBzZXRTaG93QnVpbGRpbmdTdGF0c0VkaXRvcihmYWxzZSl9IC8+XG4gICAgICB9XG4gICAgICB7c2hvd0RvY3VtZW50YXRpb24gJiZcbiAgICAgIDxEZXZEb2N1bWVudGF0aW9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjYxOjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBvbkNsb3NlPXsoKSA9PiBzZXRTaG93RG9jdW1lbnRhdGlvbihmYWxzZSl9IC8+XG4gICAgICB9XG5cbiAgICAgIHsvKiBXYWxsIGRyYWcgY29uZmlybWF0aW9uICovfVxuICAgICAge3dhbGxEcmFnQ29uZmlybSAmJlxuICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI2Njo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzcwXCI+XG4gICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI2NzoxMFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInBhbmVsLWRhcmsgcm91bmRlZC1sZyBwLTUgdy1bMzIwcHhdXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjZDRiODk2XCIsIGJvcmRlcjogXCIycHggc29saWQgIzZiM2YxZlwiIH19PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI2ODoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI2OToxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtcGl4ZWwgdGV4dC1bOXB4XSBtYi0yXCIgc3R5bGU9e3sgY29sb3I6IFwiIzNkMWYwNVwiIH19PlBMQUNFIFdBTExTPzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjcwOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXNtXCIgc3R5bGU9e3sgY29sb3I6IFwiIzZiM2YxZlwiIH19IGRhdGEtY29sbGVjdGlvbi1pdGVtLWZpZWxkPVwiY291bnRcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17d2FsbERyYWdDb25maXJtPy5pZCB8fCB3YWxsRHJhZ0NvbmZpcm0/Ll9pZH0+XG4gICAgICAgICAgICAgICAge3dhbGxEcmFnQ29uZmlybS5jb3VudH0gd2FsbHt3YWxsRHJhZ0NvbmZpcm0uY291bnQgPiAxID8gJ3MnIDogJyd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjczOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIG10LTFcIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICAgICAge3dhbGxEcmFnQ29uZmlybS51c2VHZW1zID9cbiAgICAgICAgICAgICAgYFNwZW5kICR7d2FsbERyYWdDb25maXJtLnRvdGFsR2Vtc30g8J+SjiBnZW1zP2AgOlxuICAgICAgICAgICAgICBgU3BlbmQgJHt3YWxsRHJhZ0NvbmZpcm0udG90YWxHb2xkLnRvTG9jYWxlU3RyaW5nKCl9IPCfkrAgZ29sZD9gfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI3ODoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1sZyBmb250LWJvbGQgbXQtMlwiIHN0eWxlPXt7IGNvbG9yOiB3YWxsRHJhZ0NvbmZpcm0udXNlR2VtcyA/IFwiIzYwYTVmYVwiIDogXCIjZmJiZjI0XCIgfX0+XG4gICAgICAgICAgICAgICAge3dhbGxEcmFnQ29uZmlybS51c2VHZW1zID8gYPCfko4gJHt3YWxsRHJhZ0NvbmZpcm0udG90YWxHZW1zfWAgOiBg8J+SsCAke3dhbGxEcmFnQ29uZmlybS50b3RhbEdvbGQudG9Mb2NhbGVTdHJpbmcoKX1gfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI4MjoxMlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI4MzoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2NhbmNlbFdhbGxEcmFnfSBjbGFzc05hbWU9XCJmbGV4LTEgcHktMiByb3VuZGVkIGZvbnQtcGl4ZWwgdGV4dC1bOHB4XSB0cmFuc2l0aW9uLWFsbFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzZiM2YxZlwiLCBjb2xvcjogXCIjZjVlNmQwXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzNkMWYwNVwiIH19PlxuICAgICAgICAgICAgICAgIENBTkNFTFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTI4NjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIG9uQ2xpY2s9e2NvbmZpcm1XYWxsRHJhZ30gY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZCBmb250LXBpeGVsIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGwgYnRuLXJwZ1wiPlxuICAgICAgICAgICAgICAgIFlFUywgUExBQ0VcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIHsvKiBHZW0gcGxhY2VtZW50IGNvbmZpcm1hdGlvbiAqL31cbiAgICAgIHtnZW1QbGFjZW1lbnRDb25maXJtICYmXG4gICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjk2OjhcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svNzBcIj5cbiAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjk3OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwicGFuZWwtZGFyayByb3VuZGVkLWxnIHAtNSB3LVszMjBweF1cIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcIiNkNGI4OTZcIiwgYm9yZGVyOiBcIjJweCBzb2xpZCAjNmIzZjFmXCIgfX0+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjk4OjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMjk5OjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC1waXhlbCB0ZXh0LVs5cHhdIG1iLTJcIiBzdHlsZT17eyBjb2xvcjogXCIjM2QxZjA1XCIgfX0+Q09ORklSTSBQTEFDRU1FTlQ8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTMwMDoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1zbVwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2YjNmMWZcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImRlZi5uYW1lXCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2dlbVBsYWNlbWVudENvbmZpcm0/LmlkIHx8IGdlbVBsYWNlbWVudENvbmZpcm0/Ll9pZH0+XG4gICAgICAgICAgICAgICAge2dlbVBsYWNlbWVudENvbmZpcm0uZGVmLm5hbWV9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMzAzOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZm9udC11aSB0ZXh0LXhzIG10LTFcIiBzdHlsZT17eyBjb2xvcjogXCIjNmIzZjFmXCIgfX0gZGF0YS1jb2xsZWN0aW9uLWl0ZW0tZmllbGQ9XCJnZW1Db3N0XCIgZGF0YS1jb2xsZWN0aW9uLWl0ZW0taWQ9e2dlbVBsYWNlbWVudENvbmZpcm0/LmlkIHx8IGdlbVBsYWNlbWVudENvbmZpcm0/Ll9pZH0+XG4gICAgICAgICAgICAgICAgU3BlbmQge2dlbVBsYWNlbWVudENvbmZpcm0uZ2VtQ29zdH0gZ2VtcyB0byBwbGFjZSBoZXJlP1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cInBhZ2VzL0dhbWU6MTMwNjoxNFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwidHJ1ZVwiIGNsYXNzTmFtZT1cImZvbnQtdWkgdGV4dC1sZyBmb250LWJvbGQgbXQtMlwiIHN0eWxlPXt7IGNvbG9yOiBcIiM2MGE1ZmFcIiB9fSBkYXRhLWNvbGxlY3Rpb24taXRlbS1maWVsZD1cImdlbUNvc3RcIiBkYXRhLWNvbGxlY3Rpb24taXRlbS1pZD17Z2VtUGxhY2VtZW50Q29uZmlybT8uaWQgfHwgZ2VtUGxhY2VtZW50Q29uZmlybT8uX2lkfT5cbiAgICAgICAgICAgICAgICDwn5KOIHtnZW1QbGFjZW1lbnRDb25maXJtLmdlbUNvc3R9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMzEwOjEyXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtc291cmNlLWxvY2F0aW9uPVwicGFnZXMvR2FtZToxMzExOjE0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2NhbmNlbEdlbVBsYWNlbWVudH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiIzZiM2YxZlwiLCBjb2xvcjogXCIjZjVlNmQwXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzNkMWYwNVwiIH19PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1zb3VyY2UtbG9jYXRpb249XCJwYWdlcy9HYW1lOjEzMTg6MTRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIlxuICAgICAgICAgICAgb25DbGljaz17Y29uZmlybUdlbVBsYWNlbWVudH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0yIHJvdW5kZWQgZm9udC1waXhlbCB0ZXh0LVs4cHhdIHRyYW5zaXRpb24tYWxsIGJ0bi1ycGdcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCBoc2woMjgwIDY1JSA1NSUpIDAlLCBoc2woMjgwIDYwJSA0MCUpIDEwMCUpXCIsXG4gICAgICAgICAgICAgIGJvcmRlcjogXCIycHggc29saWQgaHNsKDI4MCA3MCUgNjUlKVwiXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQ09ORklSTVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj4pO1xuXG59Il0sImZpbGUiOiIvYXBwL3NyYy9wYWdlcy9HYW1lLmpzeCJ9