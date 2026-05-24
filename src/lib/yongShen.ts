import type {
  RuleEngineContext,
  SixRelative,
  SixRelativeAssignment,
  Wuxing,
  YongShenMatch,
  YongShenProfile,
  YongShenRoleMatch
} from "../types/index.ts";

type YongShenLocator =
  | { kind: "relative"; relative: SixRelative; label: string }
  | { kind: "shi"; label: string }
  | { kind: "ying"; label: string };

const CATEGORY_TARGET_RELATIVE: Partial<Record<RuleEngineContext["categoryKey"], SixRelative>> = {
  "\u8d22\u8fd0\u751f\u610f": "\u59bb\u8d22",
  "\u6c42\u804c\u4e8b\u4e1a": "\u5b98\u9b3c",
  "\u5b66\u4e1a\u8003\u8bd5": "\u7236\u6bcd",
  "\u8bba\u6587\u6295\u7a3f": "\u7236\u6bcd",
  "\u6587\u4e66\u7533\u8bf7": "\u7236\u6bcd",
  "\u6d88\u606f\u8054\u7edc": "\u7236\u6bcd",
  "\u75be\u75c5\u5065\u5eb7": "\u5b98\u9b3c",
  "\u5b98\u53f8\u7ea0\u7eb7": "\u5b98\u9b3c"
};

const GENERATES: Record<Wuxing, Wuxing> = {
  "\u6728": "\u706b",
  "\u706b": "\u571f",
  "\u571f": "\u91d1",
  "\u91d1": "\u6c34",
  "\u6c34": "\u6728"
};

const GENERATED_BY: Record<Wuxing, Wuxing> = {
  "\u6728": "\u6c34",
  "\u706b": "\u6728",
  "\u571f": "\u706b",
  "\u91d1": "\u571f",
  "\u6c34": "\u91d1"
};

const CONTROLLED_BY: Record<Wuxing, Wuxing> = {
  "\u6728": "\u91d1",
  "\u706b": "\u6c34",
  "\u571f": "\u6728",
  "\u91d1": "\u706b",
  "\u6c34": "\u571f"
};

function resolveRelativeFromText(primaryYongShen: string): SixRelative | null {
  if (primaryYongShen.includes("\u59bb\u8d22")) return "\u59bb\u8d22";
  if (primaryYongShen.includes("\u5b98\u9b3c")) return "\u5b98\u9b3c";
  if (primaryYongShen.includes("\u7236\u6bcd")) return "\u7236\u6bcd";
  if (primaryYongShen.includes("\u5b50\u5b59")) return "\u5b50\u5b59";
  if (primaryYongShen.includes("\u5144\u5f1f")) return "\u5144\u5f1f";
  return null;
}

function buildRelativeMatches(
  relativeAssignments: SixRelativeAssignment[],
  movingLinePositions: number[],
  relative: SixRelative
): YongShenMatch[] {
  return relativeAssignments
    .filter((item) => item.relative === relative)
    .map((item) => ({
      line: item.line,
      label: relative,
      source: "relative" as const,
      relative,
      isMoving: movingLinePositions.includes(item.line)
    }));
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

function summarizeLines(lines: number[]) {
  return unique(lines).sort((left, right) => left - right).join("\u3001");
}

export function resolveYongShenLocator(context: RuleEngineContext): YongShenLocator | null {
  if (context.primaryYongShen.includes("\u5e94\u723b")) {
    return { kind: "ying", label: "\u5e94\u723b" };
  }

  if (context.primaryYongShen.includes("\u4e16\u723b")) {
    return { kind: "shi", label: "\u4e16\u723b" };
  }

  const categoryRelative = CATEGORY_TARGET_RELATIVE[context.categoryKey];
  if (categoryRelative) {
    return { kind: "relative", relative: categoryRelative, label: categoryRelative };
  }

  const inferredRelative = resolveRelativeFromText(context.primaryYongShen);
  if (inferredRelative) {
    return { kind: "relative", relative: inferredRelative, label: inferredRelative };
  }

  return null;
}

export function resolveYongShenMatches(context: RuleEngineContext): YongShenMatch[] {
  const locator = resolveYongShenLocator(context);

  if (!locator) {
    return [];
  }

  if (locator.kind === "relative") {
    return buildRelativeMatches(context.relatives, context.movingLinePositions, locator.relative);
  }

  if (locator.kind === "shi" && context.shiYing.shi) {
    return [
      {
        line: context.shiYing.shi,
        label: locator.label,
        source: "shi",
        isMoving: context.movingLinePositions.includes(context.shiYing.shi)
      }
    ];
  }

  if (locator.kind === "ying" && context.shiYing.ying) {
    return [
      {
        line: context.shiYing.ying,
        label: locator.label,
        source: "ying",
        isMoving: context.movingLinePositions.includes(context.shiYing.ying)
      }
    ];
  }

  return [];
}

function resolveYongShenElements(context: RuleEngineContext, yongShenMatches: YongShenMatch[]) {
  const lineSet = new Set(yongShenMatches.map((item) => item.line));
  return unique(
    context.relatives.filter((item) => lineSet.has(item.line)).map((item) => item.branchElement)
  );
}

function buildRoleMatch(
  item: SixRelativeAssignment,
  movingLinePositions: number[],
  role: YongShenRoleMatch["role"],
  note: string
): YongShenRoleMatch {
  return {
    line: item.line,
    role,
    relative: item.relative,
    branchElement: item.branchElement,
    isMoving: movingLinePositions.includes(item.line),
    note
  };
}

export function resolveYongShenRoleMatches(context: RuleEngineContext): YongShenRoleMatch[] {
  const yongShenMatches = resolveYongShenMatches(context);
  const yongShenElements = resolveYongShenElements(context, yongShenMatches);
  const yongShenLineSet = new Set(yongShenMatches.map((item) => item.line));

  if (yongShenElements.length === 0) {
    return [];
  }

  return context.relatives.flatMap((item) => {
    if (yongShenLineSet.has(item.line)) {
      return [];
    }

    if (yongShenElements.some((element) => item.branchElement === GENERATED_BY[element])) {
      return [buildRoleMatch(item, context.movingLinePositions, "\u5143\u795e", "\u53ef\u4ee5\u751f\u6276\u7528\u795e")];
    }

    if (yongShenElements.some((element) => item.branchElement === CONTROLLED_BY[element])) {
      return [buildRoleMatch(item, context.movingLinePositions, "\u5fcc\u795e", "\u5bb9\u6613\u514b\u5236\u7528\u795e")];
    }

    if (
      yongShenElements.some((element) => item.branchElement === CONTROLLED_BY[GENERATED_BY[element]] || item.branchElement === GENERATES[CONTROLLED_BY[element]])
    ) {
      return [buildRoleMatch(item, context.movingLinePositions, "\u4ec7\u795e", "\u5bb9\u6613\u538b\u5236\u5143\u795e\u6216\u52a9\u5fcc")];
    }

    return [];
  });
}

export function buildYongShenProfile(context: RuleEngineContext): YongShenProfile {
  const yongShenMatches = resolveYongShenMatches(context);
  const roleMatches = resolveYongShenRoleMatches(context);
  const yongShenLineSet = new Set(yongShenMatches.map((item) => item.line));
  const yongShenStatuses = context.temporalProfile.lineStatuses.filter((item) => yongShenLineSet.has(item.line));
  const yuanShenMatches = roleMatches.filter((item) => item.role === "\u5143\u795e");
  const jiShenMatches = roleMatches.filter((item) => item.role === "\u5fcc\u795e");
  const chouShenMatches = roleMatches.filter((item) => item.role === "\u4ec7\u795e");
  const favorableFactors: string[] = [];
  const unfavorableFactors: string[] = [];
  const statusSummary: string[] = [];

  if (yongShenMatches.length === 0) {
    unfavorableFactors.push("\u5f53\u524d\u672a\u80fd\u5728\u76d8\u4e2d\u7a33\u5b9a\u5b9a\u4f4d\u7528\u795e\u843d\u723b");
    return { yongShenMatches, roleMatches, favorableFactors, unfavorableFactors, statusSummary };
  }

  const movingYongShenLines = yongShenMatches.filter((item) => item.isMoving).map((item) => item.line);
  if (movingYongShenLines.length > 0) {
    favorableFactors.push(`\u7528\u795e\u53d1\u52a8\uff0c\u91cd\u70b9\u843d\u5728\u7b2c ${summarizeLines(movingYongShenLines)} \u723b`);
  }

  const supportedLines = yongShenStatuses.filter((item) => item.hasSupport).map((item) => item.line);
  if (supportedLines.length > 0) {
    favorableFactors.push(`\u7528\u795e\u5f97\u65e5\u6708\u751f\u6276\u6216\u4e34\u503c\uff0c\u5f53\u524d\u4ee5\u7b2c ${summarizeLines(supportedLines)} \u723b\u6700\u6709\u529b`);
  }

  const shiYongShenLines = yongShenMatches
    .filter((item) => context.shiYing.shi === item.line || context.shiYing.ying === item.line)
    .map((item) => item.line);
  if (shiYongShenLines.length > 0) {
    favorableFactors.push(`\u4e16\u5e94\u76f4\u63a5\u627f\u8f7d\u7528\u795e\uff0c\u7b2c ${summarizeLines(shiYongShenLines)} \u723b\u4fe1\u606f\u66f4\u76f4\u63a5`);
  }

  const activeYuanShenLines = yuanShenMatches.filter((item) => item.isMoving).map((item) => item.line);
  if (activeYuanShenLines.length > 0) {
    favorableFactors.push(`\u5143\u795e\u53d1\u52a8\uff0c\u7b2c ${summarizeLines(activeYuanShenLines)} \u723b\u5bf9\u7528\u795e\u6709\u8865\u7ed9\u610f\u5473`);
  }

  const voidLines = yongShenStatuses.filter((item) => item.isVoid).map((item) => item.line);
  if (voidLines.length > 0) {
    unfavorableFactors.push(`\u7528\u795e\u9017\u7a7a\uff0c\u7b2c ${summarizeLines(voidLines)} \u723b\u77ed\u671f\u4e0d\u6613\u5b9e\u843d`);
  }

  const monthBrokenLines = yongShenStatuses.filter((item) => item.isMonthBroken).map((item) => item.line);
  if (monthBrokenLines.length > 0) {
    unfavorableFactors.push(`\u7528\u795e\u89c1\u6708\u7834\uff0c\u7b2c ${summarizeLines(monthBrokenLines)} \u723b\u5bb9\u6613\u53d7\u5916\u90e8\u8282\u594f\u6253\u65ad`);
  }

  const pressuredLines = yongShenStatuses.filter((item) => item.hasPressure).map((item) => item.line);
  if (pressuredLines.length > 0) {
    unfavorableFactors.push(`\u7528\u795e\u53d7\u51b2\u514b\u5211\u5bb3\u7275\u5236\uff0c\u9700\u56de\u770b\u7b2c ${summarizeLines(pressuredLines)} \u723b\u7684\u65f6\u4ee4\u6807\u8bb0`);
  }

  const activeJiShenLines = jiShenMatches.filter((item) => item.isMoving).map((item) => item.line);
  if (activeJiShenLines.length > 0) {
    unfavorableFactors.push(`\u5fcc\u795e\u53d1\u52a8\uff0c\u7b2c ${summarizeLines(activeJiShenLines)} \u723b\u53ef\u80fd\u76f4\u63a5\u514b\u5236\u7528\u795e`);
  }

  const activeChouShenLines = chouShenMatches.filter((item) => item.isMoving).map((item) => item.line);
  if (activeChouShenLines.length > 0) {
    unfavorableFactors.push(`\u4ec7\u795e\u53d1\u529b\uff0c\u7b2c ${summarizeLines(activeChouShenLines)} \u723b\u5bb9\u6613\u538b\u5143\u795e\u6216\u52a9\u5fcc`);
  }

  const roleSummaryItems = [
    yuanShenMatches.length > 0 ? `\u5143\u795e\uff1a${summarizeLines(yuanShenMatches.map((item) => item.line))}\u723b` : "",
    jiShenMatches.length > 0 ? `\u5fcc\u795e\uff1a${summarizeLines(jiShenMatches.map((item) => item.line))}\u723b` : "",
    chouShenMatches.length > 0 ? `\u4ec7\u795e\uff1a${summarizeLines(chouShenMatches.map((item) => item.line))}\u723b` : ""
  ].filter(Boolean);

  if (roleSummaryItems.length > 0) {
    statusSummary.push(roleSummaryItems.join("\u3002"));
  }

  const statusLabels = yongShenStatuses.map((item) => {
    const tags = [
      item.hasSupport ? "\u5f97\u52a9" : "",
      item.hasPressure ? "\u53d7\u5236" : "",
      item.isVoid ? "\u9017\u7a7a" : "",
      item.isMonthBroken ? "\u6708\u7834" : ""
    ].filter(Boolean);

    return tags.length > 0 ? `\u7b2c${item.line}\u723b${tags.join("\u00b7")}` : "";
  }).filter(Boolean);

  if (statusLabels.length > 0) {
    statusSummary.push(`\u7528\u795e\u72b6\u6001\uff1a${statusLabels.join("\u3001")}`);
  }

  return {
    yongShenMatches,
    roleMatches,
    favorableFactors,
    unfavorableFactors,
    statusSummary
  };
}
