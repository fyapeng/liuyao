import { EARTHLY_BRANCH_WUXING } from "../data/earthlyBranches.ts";
import type {
  EarthlyBranchLabel,
  NajiaAssignment,
  TemporalLineStatus,
  TemporalProfile,
  TimeContext,
  Wuxing
} from "../types/index.ts";

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

const COMBINE_PAIRS = new Set([
  "\u5b50-\u4e11",
  "\u4e11-\u5b50",
  "\u5bc5-\u4ea5",
  "\u4ea5-\u5bc5",
  "\u536f-\u620c",
  "\u620c-\u536f",
  "\u8fb0-\u9149",
  "\u9149-\u8fb0",
  "\u5df3-\u7533",
  "\u7533-\u5df3",
  "\u5348-\u672a",
  "\u672a-\u5348"
]);

const CLASH_PAIRS = new Set([
  "\u5b50-\u5348",
  "\u5348-\u5b50",
  "\u4e11-\u672a",
  "\u672a-\u4e11",
  "\u5bc5-\u7533",
  "\u7533-\u5bc5",
  "\u536f-\u9149",
  "\u9149-\u536f",
  "\u8fb0-\u620c",
  "\u620c-\u8fb0",
  "\u5df3-\u4ea5",
  "\u4ea5-\u5df3"
]);

const HARM_PAIRS = new Set([
  "\u5b50-\u672a",
  "\u672a-\u5b50",
  "\u4e11-\u5348",
  "\u5348-\u4e11",
  "\u5bc5-\u5df3",
  "\u5df3-\u5bc5",
  "\u536f-\u8fb0",
  "\u8fb0-\u536f",
  "\u7533-\u4ea5",
  "\u4ea5-\u7533",
  "\u9149-\u620c",
  "\u620c-\u9149"
]);

const PUNISH_GROUPS: EarthlyBranchLabel[][] = [
  ["\u5bc5", "\u5df3", "\u7533"],
  ["\u4e11", "\u672a", "\u620c"],
  ["\u5b50", "\u536f"]
];

function describeElementInfluence(
  sourceBranch: EarthlyBranchLabel,
  targetBranch: EarthlyBranchLabel,
  prefix: "\u6708" | "\u65e5"
) {
  const sourceElement = EARTHLY_BRANCH_WUXING[sourceBranch];
  const targetElement = EARTHLY_BRANCH_WUXING[targetBranch];

  if (sourceBranch === targetBranch) return `${prefix}\u4e34`;
  if (sourceElement === targetElement) return `${prefix}\u6276`;
  if (GENERATES[sourceElement] === targetElement) return `${prefix}\u751f`;
  if (CONTROLS[sourceElement] === targetElement) return `${prefix}\u514b`;
  if (GENERATES[targetElement] === sourceElement) return `${prefix}\u6cc4`;
  return `${prefix}\u5236`;
}

function getRelationTags(sourceBranch: EarthlyBranchLabel, targetBranch: EarthlyBranchLabel, prefix: "\u6708" | "\u65e5") {
  const tags: string[] = [];
  const key = `${sourceBranch}-${targetBranch}`;

  if (COMBINE_PAIRS.has(key)) tags.push(`${prefix}\u5408`);
  if (CLASH_PAIRS.has(key)) tags.push(prefix === "\u6708" ? "\u6708\u7834" : "\u65e5\u51b2");
  if (HARM_PAIRS.has(key)) tags.push(`${prefix}\u5bb3`);

  for (const group of PUNISH_GROUPS) {
    if (group.includes(sourceBranch) && group.includes(targetBranch) && sourceBranch !== targetBranch) {
      tags.push(`${prefix}\u5211`);
      break;
    }
  }

  if (sourceBranch === targetBranch && ["\u8fb0", "\u5348", "\u9149", "\u4ea5"].includes(sourceBranch)) {
    tags.push(`${prefix}\u81ea\u5211`);
  }

  return tags;
}

function buildLineStatus(timeContext: TimeContext, assignment: NajiaAssignment): TemporalLineStatus {
  const branch = assignment.branch as EarthlyBranchLabel;
  const monthRelationTags = getRelationTags(timeContext.monthBuild, branch, "\u6708");
  const dayRelationTags = getRelationTags(timeContext.dayBranch, branch, "\u65e5");
  const monthSignals = [describeElementInfluence(timeContext.monthBuild, branch, "\u6708")];
  const daySignals = [describeElementInfluence(timeContext.dayBranch, branch, "\u65e5")];
  const relationFlags = [...monthRelationTags, ...dayRelationTags];
  const isVoid = timeContext.voidBranches.includes(branch);
  const isMonthBroken = relationFlags.includes("\u6708\u7834");

  if (isVoid) {
    relationFlags.push("\u7a7a\u4ea1");
  }

  const supportTags = ["\u6708\u751f", "\u6708\u6276", "\u6708\u4e34", "\u65e5\u751f", "\u65e5\u6276", "\u65e5\u4e34", "\u6708\u5408", "\u65e5\u5408"];
  const pressureTags = ["\u6708\u514b", "\u65e5\u514b", "\u6708\u7834", "\u65e5\u51b2", "\u6708\u5bb3", "\u65e5\u5bb3", "\u6708\u5211", "\u65e5\u5211", "\u7a7a\u4ea1"];
  const allSignals = monthSignals.concat(daySignals, relationFlags);
  const hasSupport = allSignals.some((item) => supportTags.includes(item));
  const hasPressure = allSignals.some((item) => pressureTags.includes(item));

  return {
    line: assignment.line,
    monthState: [...monthSignals, ...monthRelationTags].join(" \u00b7 "),
    dayState: [...daySignals, ...dayRelationTags].join(" \u00b7 "),
    voidState: isVoid ? `\u7a7a\u4ea1(${timeContext.voidBranches.join("\u3001")})` : "\u4e0d\u7a7a",
    relationSummary: relationFlags.length > 0 ? relationFlags.join("\u3001") : "\u65e0\u7279\u522b\u51b2\u5408",
    flags: relationFlags,
    isVoid,
    isMonthBroken,
    hasSupport,
    hasPressure
  };
}

export function buildTemporalProfile(timeContext: TimeContext, najiaAssignments: NajiaAssignment[]): TemporalProfile {
  const lineStatuses = najiaAssignments.map((assignment) => buildLineStatus(timeContext, assignment));

  return {
    overview: [
      {
        key: "timestamp",
        label: "\u81ea\u52a8\u53d6\u65f6",
        value: timeContext.solarDateLabel,
        note: timeContext.sourceNote,
        tone: "ready"
      },
      {
        key: "month",
        label: "\u6708\u5efa",
        value: `${timeContext.monthBuild}\u6708\u5efa`,
        note: `${timeContext.monthBuildDetail}\uff0c\u5f53\u524d\u8282\u6c14\uff1a${timeContext.solarTermLabel}\u3002`,
        tone: "ready"
      },
      {
        key: "day",
        label: "\u65e5\u8fb0",
        value: timeContext.dayGanzhi,
        note: `\u65e5\u5e72 ${timeContext.dayStem} \u7528\u4e8e\u516d\u795e\uff0c\u65e5\u652f ${timeContext.dayBranch} \u7528\u4e8e\u65fa\u8870\u4e0e\u51b2\u5408\u3002`,
        tone: "ready"
      },
      {
        key: "void",
        label: "\u65ec\u7a7a",
        value: timeContext.voidBranches.join("\u3001"),
        note: `\u6309 ${timeContext.dayGanzhi} \u6240\u5728\u65ec\u63a8\u5f97\u7a7a\u4ea1\u3002`,
        tone: "ready"
      }
    ],
    lineStatuses
  };
}
