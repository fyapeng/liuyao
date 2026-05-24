import { SIX_GODS } from "../data/sixGods.ts";
import type { DayStem, Hexagram, SixGodAssignment } from "../types/index.ts";

const START_INDEX_BY_DAY_STEM: Record<DayStem, number> = {
  甲: 0,
  乙: 0,
  丙: 1,
  丁: 1,
  戊: 2,
  己: 3,
  庚: 4,
  辛: 4,
  壬: 5,
  癸: 5
};

export function getSixGods(_lines: Hexagram["lines"], dayStem: DayStem = "甲") {
  const startIndex = START_INDEX_BY_DAY_STEM[dayStem];
  const gods: SixGodAssignment[] = Array.from({ length: 6 }, (_, index) => ({
    line: index + 1,
    label: SIX_GODS[(startIndex + index) % SIX_GODS.length].label
  }));

  return {
    status: "implemented",
    gods,
    message: `${dayStem}日起六神已生成，可继续与动爻、世应和用神结合分析。`
  };
}
