import type { Hexagram } from "../types/index.ts";

const TRIGRAM_NAME_BY_LINES: Record<string, string> = {
  "111": "乾",
  "110": "兑",
  "101": "离",
  "100": "震",
  "011": "巽",
  "010": "坎",
  "001": "艮",
  "000": "坤"
};

export function getTrigrams(lines: Hexagram["lines"]) {
  const lowerKey = lines.slice(0, 3).join("");
  const upperKey = lines.slice(3, 6).join("");

  return {
    lowerTrigram: TRIGRAM_NAME_BY_LINES[lowerKey] ?? "未知",
    upperTrigram: TRIGRAM_NAME_BY_LINES[upperKey] ?? "未知"
  };
}
