import { NAJIA_BY_TRIGRAM } from "../data/najia.ts";
import { EARTHLY_BRANCH_WUXING } from "../data/earthlyBranches.ts";
import { getTrigrams } from "./getTrigrams.ts";
import type { Hexagram, NajiaAssignment } from "../types/index.ts";

const LINE_NAMES = [
  "\u521d\u723b",
  "\u4e8c\u723b",
  "\u4e09\u723b",
  "\u56db\u723b",
  "\u4e94\u723b",
  "\u4e0a\u723b"
] as const;

export function getNajia(lines: Hexagram["lines"]) {
  const { lowerTrigram, upperTrigram } = getTrigrams(lines);
  const lowerSequence = NAJIA_BY_TRIGRAM[lowerTrigram]?.sequence;
  const upperSequence = NAJIA_BY_TRIGRAM[upperTrigram]?.sequence;

  if (!lowerSequence || !upperSequence) {
    return {
      status: "unresolved",
      assignments: [] as NajiaAssignment[],
      message: "\u672a\u80fd\u6839\u636e\u4e0a\u4e0b\u5366\u5339\u914d\u7eb3\u7532\u4fe1\u606f\u3002"
    };
  }

  const branches = [...lowerSequence.slice(0, 3), ...upperSequence.slice(3, 6)];
  const assignments = branches.map((branch, index) => ({
    line: index + 1,
    lineName: LINE_NAMES[index],
    branch,
    branchElement: EARTHLY_BRANCH_WUXING[branch]
  })) as NajiaAssignment[];

  return {
    status: "implemented",
    assignments,
    message: `\u5df2\u6309\u4e0b\u5366 ${lowerTrigram}\u3001\u4e0a\u5366 ${upperTrigram} \u751f\u6210\u57fa\u7840\u7eb3\u7532\u5730\u652f\u3002`
  };
}
