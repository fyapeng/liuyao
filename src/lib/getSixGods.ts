import { SIX_GODS } from "../data/sixGods.ts";
import type { DayStem, Hexagram, SixGodAssignment } from "../types/index.ts";

const START_INDEX_BY_DAY_STEM: Record<DayStem, number> = {
  "\u7532": 0,
  "\u4e59": 0,
  "\u4e19": 1,
  "\u4e01": 1,
  "\u620a": 2,
  "\u5df1": 3,
  "\u5e9a": 4,
  "\u8f9b": 4,
  "\u58ec": 5,
  "\u7678": 5
};

export function getSixGods(_lines: Hexagram["lines"], dayStem: DayStem = "\u7532") {
  const startIndex = START_INDEX_BY_DAY_STEM[dayStem];
  const gods: SixGodAssignment[] = Array.from({ length: 6 }, (_, index) => ({
    line: index + 1,
    label: SIX_GODS[(startIndex + index) % SIX_GODS.length].label
  }));

  return {
    status: "implemented",
    gods,
    message: `${dayStem}\u65e5\u8d77\u516d\u795e\u5df2\u751f\u6210\uff0c\u53ef\u7ee7\u7eed\u4e0e\u52a8\u723b\u3001\u4e16\u5e94\u548c\u7528\u795e\u7ed3\u5408\u5206\u6790\u3002`
  };
}
