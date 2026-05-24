import type { CoinRule, CoinSelection } from "../types/index.ts";

const ZZZ = "\u5b57\u5b57\u5b57" as const;
const ZZH = "\u5b57\u5b57\u82b1" as const;
const ZHH = "\u5b57\u82b1\u82b1" as const;
const HHH = "\u82b1\u82b1\u82b1" as const;

export const COIN_RULES: Record<CoinSelection, CoinRule> = {
  [ZZZ]: {
    label: ZZZ,
    value: 6,
    name: "\u8001\u9634",
    yinYang: "\u9634",
    isMoving: true,
    description: "\u5b57\u5b57\u5b57 = 6 = \u8001\u9634 = \u9634\u723b\u52a8\uff0c\u53d8\u9633",
    marker: "\u00d7",
    originalLine: 0,
    changedLine: 1
  },
  [ZZH]: {
    label: ZZH,
    value: 7,
    name: "\u5c11\u9633",
    yinYang: "\u9633",
    isMoving: false,
    description: "\u5b57\u5b57\u82b1 = 7 = \u5c11\u9633 = \u9633\u723b\u9759",
    marker: "",
    originalLine: 1,
    changedLine: 1
  },
  [ZHH]: {
    label: ZHH,
    value: 8,
    name: "\u5c11\u9634",
    yinYang: "\u9634",
    isMoving: false,
    description: "\u5b57\u82b1\u82b1 = 8 = \u5c11\u9634 = \u9634\u723b\u9759",
    marker: "",
    originalLine: 0,
    changedLine: 0
  },
  [HHH]: {
    label: HHH,
    value: 9,
    name: "\u8001\u9633",
    yinYang: "\u9633",
    isMoving: true,
    description: "\u82b1\u82b1\u82b1 = 9 = \u8001\u9633 = \u9633\u723b\u52a8\uff0c\u53d8\u9634",
    marker: "\u25cb",
    originalLine: 1,
    changedLine: 0
  }
};

export const POSITION_NAMES = [
  "\u521d\u723b",
  "\u4e8c\u723b",
  "\u4e09\u723b",
  "\u56db\u723b",
  "\u4e94\u723b",
  "\u4e0a\u723b"
] as const;
