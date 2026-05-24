import type { Hexagram } from "../types/index.ts";

const TRIGRAM_NAME_BY_LINES: Record<string, string> = {
  "111": "\u4e7e",
  "110": "\u5151",
  "101": "\u79bb",
  "100": "\u9707",
  "011": "\u5deb",
  "010": "\u574e",
  "001": "\u826e",
  "000": "\u5764"
};

export function getTrigrams(lines: Hexagram["lines"]) {
  const lowerKey = lines.slice(0, 3).join("");
  const upperKey = lines.slice(3, 6).join("");

  return {
    lowerTrigram: TRIGRAM_NAME_BY_LINES[lowerKey] ?? "\u672a\u77e5",
    upperTrigram: TRIGRAM_NAME_BY_LINES[upperKey] ?? "\u672a\u77e5"
  };
}
