import type { Hexagram } from "../types/index.ts";

export function getShiYing(_hexagramKey?: string | null, _lines?: Hexagram["lines"]) {
  return {
    shi: null,
    ying: null,
    message: "世应定位结构已预留，后续将结合八宫规则补全。"
  };
}
