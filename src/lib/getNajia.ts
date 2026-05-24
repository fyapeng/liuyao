import { NAJIA_BY_TRIGRAM } from "../data/najia.ts";
import { EARTHLY_BRANCH_WUXING } from "../data/earthlyBranches.ts";
import { getTrigrams } from "./getTrigrams.ts";
import type { Hexagram, NajiaAssignment } from "../types/index.ts";

const LINE_NAMES = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"] as const;

export function getNajia(lines: Hexagram["lines"]) {
  const { lowerTrigram, upperTrigram } = getTrigrams(lines);
  const lowerSequence = NAJIA_BY_TRIGRAM[lowerTrigram]?.sequence;
  const upperSequence = NAJIA_BY_TRIGRAM[upperTrigram]?.sequence;

  if (!lowerSequence || !upperSequence) {
    return {
      status: "unresolved",
      assignments: [] as NajiaAssignment[],
      message: "未能根据上下卦匹配纳甲信息。"
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
    message: `已按${lowerTrigram}下卦、${upperTrigram}上卦生成基础纳甲地支。`
  };
}
