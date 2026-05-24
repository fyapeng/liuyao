import { SHI_YING_MAP } from "../data/shiYing.ts";
import type { Hexagram, ShiYingInfo } from "../types/index.ts";

export function getShiYing(hexagramKey?: string | null, _lines?: Hexagram["lines"]): ShiYingInfo {
  if (!hexagramKey || !SHI_YING_MAP[hexagramKey]) {
    return {
      shi: null,
      ying: null,
      palace: null,
      palaceElement: null,
      message: "\u672a\u80fd\u5339\u914d\u516b\u5bab\u4fe1\u606f\uff0c\u6682\u65f6\u65e0\u6cd5\u5b9a\u4f4d\u4e16\u5e94\u3002"
    };
  }

  const matched = SHI_YING_MAP[hexagramKey];
  return {
    shi: matched.shi,
    ying: matched.ying,
    palace: matched.palace,
    palaceElement: matched.palaceElement,
    message:
      `${matched.palace}\u5bab\u5366\uff0c\u4e16\u5728${matched.shi}\u723b\uff0c` +
      `\u5e94\u5728${matched.ying}\u723b\uff0c\u5bab\u4e94\u884c\u4e3a${matched.palaceElement}\u3002`
  };
}
