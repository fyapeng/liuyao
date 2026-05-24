import { HEXAGRAMS } from "../data/hexagrams.ts";
import { castHexagram } from "./castHexagram.ts";
import type { CoinSelection, Hexagram, HexagramComputationResult } from "../types/index.ts";

export function getHexagramByLines(lines: Hexagram["lines"]) {
  return HEXAGRAMS.find((hexagram) => hexagram.lines.join("") === lines.join("")) ?? null;
}

export function getHexagramName(lines: Hexagram["lines"]) {
  return getHexagramByLines(lines)?.name ?? "\u672a\u77e5\u5366";
}

export function buildHexagramResult(selections: CoinSelection[]) {
  const computed: HexagramComputationResult = castHexagram(selections);
  const originalHexagram = getHexagramByLines(computed.originalLines);
  const changedHexagram = getHexagramByLines(computed.changedLines);

  return {
    ...computed,
    originalHexagram,
    changedHexagram
  };
}
