import { COIN_RULES, POSITION_NAMES } from "../data/coinRules.ts";
import type { CoinSelection, HexagramComputationResult } from "../types/index.ts";
import { changeHexagram } from "./changeHexagram.ts";

export function castHexagram(selections: CoinSelection[]): HexagramComputationResult {
  if (selections.length !== 6) {
    throw new Error("六爻排盘需要恰好六次硬币结果。");
  }

  const details = selections.map((selection, index) => ({
    ...COIN_RULES[selection],
    position: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6,
    positionName: POSITION_NAMES[index]
  }));

  const originalLines = details.map((detail) => detail.originalLine) as HexagramComputationResult["originalLines"];
  const changedLines = changeHexagram(details);
  const movingLinePositions = details.filter((detail) => detail.isMoving).map((detail) => detail.position);

  return {
    selections,
    details,
    originalLines,
    changedLines,
    movingLinePositions
  };
}

export function generateRandomCoinSelections(): CoinSelection[] {
  const options: CoinSelection[] = ["字字字", "字字花", "字花花", "花花花"];
  return Array.from({ length: 6 }, () => options[Math.floor(Math.random() * options.length)]);
}

