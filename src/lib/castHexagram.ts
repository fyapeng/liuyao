import { COIN_RULES, POSITION_NAMES } from "../data/coinRules.ts";
import type { CoinFace, CoinSelection, HexagramComputationResult } from "../types/index.ts";
import { changeHexagram } from "./changeHexagram.ts";

const ZI = "\u5b57" as const;
const HUA = "\u82b1" as const;
const ZZZ = "\u5b57\u5b57\u5b57" as const;
const ZZH = "\u5b57\u5b57\u82b1" as const;
const ZHH = "\u5b57\u82b1\u82b1" as const;
const HHH = "\u82b1\u82b1\u82b1" as const;
const VALID_SELECTIONS = new Set<CoinSelection>([ZZZ, ZZH, ZHH, HHH]);

export function castHexagram(selections: CoinSelection[]): HexagramComputationResult {
  if (selections.length !== 6) {
    throw new Error("\u516d\u723b\u6392\u76d8\u9700\u8981\u6070\u597d\u516d\u6b21\u786c\u5e01\u7ed3\u679c\u3002");
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

export function coinFacesToSelection(faces: CoinFace[]): CoinSelection {
  if (faces.length !== 3) {
    throw new Error("\u6bcf\u4e00\u723b\u5fc5\u987b\u7531\u4e09\u679a\u201c\u5b57/\u82b1\u201d\u786c\u5e01\u7ec4\u6210\u3002");
  }

  const normalized = faces.join("") as CoinSelection;
  if (VALID_SELECTIONS.has(normalized)) {
    return normalized;
  }

  throw new Error("\u6bcf\u4e00\u723b\u5fc5\u987b\u7531\u4e09\u679a\u201c\u5b57/\u82b1\u201d\u786c\u5e01\u7ec4\u6210\u3002");
}

export function selectionToCoinFaces(selection: CoinSelection): [CoinFace, CoinFace, CoinFace] {
  return selection.split("") as [CoinFace, CoinFace, CoinFace];
}

export function coinLinesToSelections(lines: CoinFace[][]): CoinSelection[] {
  if (lines.length !== 6) {
    throw new Error("\u8d77\u5366\u9700\u8981\u516d\u7ec4\u786c\u5e01\u3002");
  }

  return lines.map((faces) => coinFacesToSelection(faces));
}

export function generateRandomCoinSelections(): CoinSelection[] {
  const options: CoinSelection[] = [ZZZ, ZZH, ZHH, HHH];
  return Array.from({ length: 6 }, () => options[Math.floor(Math.random() * options.length)]);
}

export function generateRandomCoinLines(): [CoinFace, CoinFace, CoinFace][] {
  return generateRandomCoinSelections().map(selectionToCoinFaces);
}

export const COIN_FACE_VALUES = { ZI, HUA };
