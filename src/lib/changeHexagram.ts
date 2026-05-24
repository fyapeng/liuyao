import type { CastLineDetail, Hexagram } from "../types/index.ts";

export function changeHexagram(details: Pick<CastLineDetail, "changedLine">[]): Hexagram["lines"] {
  return details.map((detail) => detail.changedLine) as Hexagram["lines"];
}
