import type { Hexagram } from "../types/index.ts";

export function getSixGods(_lines: Hexagram["lines"], _dayStem?: string) {
  return {
    status: "placeholder",
    gods: [],
    message: "六神接口已预留，后续将按日干起六神。"
  };
}
