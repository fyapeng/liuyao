import { getNajia } from "./getNajia.ts";
import { getShiYing } from "./getShiYing.ts";
import type { Hexagram, SixRelativeAssignment } from "../types/index.ts";

const GENERATES = {
  木: "火",
  火: "土",
  土: "金",
  金: "水",
  水: "木"
} as const;

const CONTROLS = {
  木: "土",
  火: "金",
  土: "水",
  金: "木",
  水: "火"
} as const;

function getRelative(
  palaceElement: "木" | "火" | "土" | "金" | "水",
  branchElement: "木" | "火" | "土" | "金" | "水"
): SixRelativeAssignment["relative"] {
  if (palaceElement === branchElement) {
    return "兄弟";
  }
  if (GENERATES[palaceElement] === branchElement) {
    return "子孙";
  }
  if (CONTROLS[palaceElement] === branchElement) {
    return "妻财";
  }
  if (GENERATES[branchElement] === palaceElement) {
    return "父母";
  }
  return "官鬼";
}

export function getSixRelatives(lines: Hexagram["lines"], hexagramKey?: string | null) {
  const najia = getNajia(lines);
  const shiYing = getShiYing(hexagramKey, lines);

  if (!shiYing.palaceElement || najia.assignments.length === 0) {
    return {
      status: "unresolved",
      relatives: [] as SixRelativeAssignment[],
      message: "六亲计算依赖八宫五行与纳甲信息，当前数据不足。"
    };
  }

  const relatives = najia.assignments.map((assignment) => ({
    line: assignment.line,
    relative: getRelative(shiYing.palaceElement!, assignment.branchElement),
    branch: assignment.branch,
    branchElement: assignment.branchElement
  })) as SixRelativeAssignment[];

  return {
    status: "implemented",
    relatives,
    message: `已按${shiYing.palace}宫五行${shiYing.palaceElement}生成基础六亲。`
  };
}
