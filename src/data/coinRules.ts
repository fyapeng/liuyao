import type { CoinRule, CoinSelection } from "../types/index.ts";

export const COIN_RULES: Record<CoinSelection, CoinRule> = {
  字字字: {
    label: "字字字",
    value: 6,
    name: "老阴",
    yinYang: "阴",
    isMoving: true,
    description: "字字字 = 6 = 老阴 = 阴爻动，变阳",
    marker: "×",
    originalLine: 0,
    changedLine: 1
  },
  字字花: {
    label: "字字花",
    value: 7,
    name: "少阳",
    yinYang: "阳",
    isMoving: false,
    description: "字字花 = 7 = 少阳 = 阳爻静",
    marker: "",
    originalLine: 1,
    changedLine: 1
  },
  字花花: {
    label: "字花花",
    value: 8,
    name: "少阴",
    yinYang: "阴",
    isMoving: false,
    description: "字花花 = 8 = 少阴 = 阴爻静",
    marker: "",
    originalLine: 0,
    changedLine: 0
  },
  花花花: {
    label: "花花花",
    value: 9,
    name: "老阳",
    yinYang: "阳",
    isMoving: true,
    description: "花花花 = 9 = 老阳 = 阳爻动，变阴",
    marker: "○",
    originalLine: 1,
    changedLine: 0
  }
};

export const POSITION_NAMES = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"] as const;
