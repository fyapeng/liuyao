import { SHI_YING_MAP } from "../data/shiYing.ts";
import type { Hexagram, ShiYingInfo } from "../types/index.ts";

export function getShiYing(hexagramKey?: string | null, _lines?: Hexagram["lines"]): ShiYingInfo {
  if (!hexagramKey || !SHI_YING_MAP[hexagramKey]) {
    return {
      shi: null,
      ying: null,
      palace: null,
      palaceElement: null,
      message: "未能匹配八宫信息，暂无法定位世应。"
    };
  }

  const matched = SHI_YING_MAP[hexagramKey];
  return {
    shi: matched.shi,
    ying: matched.ying,
    palace: matched.palace,
    palaceElement: matched.palaceElement,
    message: `${matched.palace}宫卦，世在${matched.shi}爻，应在${matched.ying}爻，宫五行为${matched.palaceElement}。`
  };
}
