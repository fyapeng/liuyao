import { getNajia } from "./getNajia.ts";
import { getShiYing } from "./getShiYing.ts";
import type { Hexagram, SixRelativeAssignment, Wuxing } from "../types/index.ts";

const GENERATES: Record<Wuxing, Wuxing> = {
  "\u6728": "\u706b",
  "\u706b": "\u571f",
  "\u571f": "\u91d1",
  "\u91d1": "\u6c34",
  "\u6c34": "\u6728"
};

const CONTROLS: Record<Wuxing, Wuxing> = {
  "\u6728": "\u571f",
  "\u706b": "\u91d1",
  "\u571f": "\u6c34",
  "\u91d1": "\u6728",
  "\u6c34": "\u706b"
};

function getRelative(palaceElement: Wuxing, branchElement: Wuxing): SixRelativeAssignment["relative"] {
  if (palaceElement === branchElement) return "\u5144\u5f1f";
  if (GENERATES[palaceElement] === branchElement) return "\u5b50\u5b59";
  if (CONTROLS[palaceElement] === branchElement) return "\u59bb\u8d22";
  if (GENERATES[branchElement] === palaceElement) return "\u7236\u6bcd";
  return "\u5b98\u9b3c";
}

export function getSixRelatives(lines: Hexagram["lines"], hexagramKey?: string | null) {
  const najia = getNajia(lines);
  const shiYing = getShiYing(hexagramKey, lines);

  if (!shiYing.palaceElement || najia.assignments.length === 0) {
    return {
      status: "unresolved",
      relatives: [] as SixRelativeAssignment[],
      message: "\u516d\u4eb2\u8ba1\u7b97\u4f9d\u8d56\u516b\u5bab\u4e94\u884c\u4e0e\u7eb3\u7532\u4fe1\u606f\uff0c\u5f53\u524d\u6570\u636e\u4e0d\u8db3\u3002"
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
    message: `\u5df2\u6309${shiYing.palace}\u5bab\u4e94\u884c${shiYing.palaceElement}\u751f\u6210\u57fa\u7840\u516d\u4eb2\u3002`
  };
}
