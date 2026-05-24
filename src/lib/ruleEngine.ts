import type { RuleEngineContext, RuleHit, SixRelative } from "../types/index.ts";

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

function getTargetRelative(context: RuleEngineContext): SixRelative | null {
  if (CATEGORY_TARGET_RELATIVE[context.categoryKey]) {
    return CATEGORY_TARGET_RELATIVE[context.categoryKey]!;
  }
  if (context.primaryYongShen.includes("\u59bb\u8d22")) return "\u59bb\u8d22";
  if (context.primaryYongShen.includes("\u5b98\u9b3c")) return "\u5b98\u9b3c";
  if (context.primaryYongShen.includes("\u7236\u6bcd")) return "\u7236\u6bcd";
  if (context.primaryYongShen.includes("\u5b50\u5b59")) return "\u5b50\u5b59";
  if (context.primaryYongShen.includes("\u5144\u5f1f")) return "\u5144\u5f1f";
  return null;
}

export function ruleEngine(context: RuleEngineContext): RuleHit[] {
  const hits: RuleHit[] = [];
  const targetRelative = getTargetRelative(context);
  const targetLines = targetRelative
    ? context.relatives.filter((item) => item.relative === targetRelative).map((item) => item.line)
    : [];

  hits.push({
    id: `${context.categoryKey}-summary`,
    title: "\u8bfb\u76d8\u8d77\u70b9",
    type: "info",
    description:
      `\u5f53\u524d\u5206\u7c7b\u4f18\u5148\u5173\u6ce8 ${context.primaryYongShen}\u3002` +
      "\u4e16\u5e94\u3001\u52a8\u723b\u4e0e\u5bf9\u5e94\u516d\u4eb2\u5df2\u7ecf\u63a5\u5165\u57fa\u7840\u89c4\u5219\u9762\u677f\u3002"
  });

  if (context.movingLinePositions.length === 0) {
    hits.push({
      id: `${context.categoryKey}-no-moving`,
      title: "\u65e0\u52a8\u723b",
      type: "info",
      description:
        "\u672c\u5366\u65e0\u52a8\u723b\uff0c\u7b2c\u4e00\u7248\u5efa\u8bae\u5148\u91cd\u770b\u4e16\u5e94\u3001\u7528\u795e\u843d\u4f4d\u4e0e\u9759\u723b\u4e4b\u95f4\u7684\u5173\u7cfb\u3002"
    });
  } else if (context.movingLinePositions.length <= 2) {
    hits.push({
      id: `${context.categoryKey}-few-moving`,
      title: "\u52a8\u723b\u96c6\u4e2d",
      type: "favorable",
      description:
        `\u5f53\u524d\u53ea\u6709 ${context.movingLinePositions.length} \u4e2a\u52a8\u723b\uff0c` +
        `\u53d8\u52a8\u7126\u70b9\u76f8\u5bf9\u96c6\u4e2d\uff0c\u53ef\u4f18\u5148\u9605\u8bfb ${context.movingLinePositions.join("\u3001")} \u723b\u3002`
    });
  } else {
    hits.push({
      id: `${context.categoryKey}-many-moving`,
      title: "\u52a8\u723b\u8f83\u591a",
      type: "unfavorable",
      description:
        `\u5f53\u524d\u5171\u6709 ${context.movingLinePositions.length} \u4e2a\u52a8\u723b\uff0c` +
        "\u5c40\u9762\u53d8\u5316\u8f83\u591a\uff0c\u89e3\u8bfb\u65f6\u5e94\u907f\u514d\u53ea\u76ef\u5355\u4e00\u723b\u4f4d\u3002"
    });
  }

  if (context.shiYing.shi && context.movingLinePositions.includes(context.shiYing.shi)) {
    hits.push({
      id: `${context.categoryKey}-shi-moving`,
      title: "\u4e16\u723b\u53d1\u52a8",
      type: "info",
      description:
        `\u4e16\u723b\u843d\u5728\u7b2c ${context.shiYing.shi} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
        "\u8868\u793a\u63d0\u95ee\u8005\u4e00\u65b9\u4e3b\u52a8\u6027\u6216\u81ea\u8eab\u72b6\u6001\u53d8\u5316\u66f4\u660e\u663e\u3002"
    });
  }

  if (context.shiYing.ying && context.movingLinePositions.includes(context.shiYing.ying)) {
    hits.push({
      id: `${context.categoryKey}-ying-moving`,
      title: "\u5e94\u723b\u53d1\u52a8",
      type: "info",
      description:
        `\u5e94\u723b\u843d\u5728\u7b2c ${context.shiYing.ying} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
        "\u8868\u793a\u5bf9\u65b9\u3001\u5bf9\u8c61\u6216\u5916\u90e8\u53cd\u9988\u4e00\u4fa7\u53d8\u5316\u66f4\u660e\u663e\u3002"
    });
  }

  if (context.shiYing.shi && context.shiYing.ying) {
    const shiMoving = context.movingLinePositions.includes(context.shiYing.shi);
    const yingMoving = context.movingLinePositions.includes(context.shiYing.ying);

    if (shiMoving && yingMoving) {
      hits.push({
        id: `${context.categoryKey}-both-moving`,
        title: "\u4e16\u5e94\u540c\u52a8",
        type: "favorable",
        description:
          "\u4e16\u5e94\u540c\u65f6\u53d1\u52a8\uff0c\u901a\u5e38\u610f\u5473\u7740\u53cc\u65b9\u6216\u5185\u5916\u4e24\u7aef\u90fd\u5728\u53d1\u751f\u53d8\u5316\uff0c\u540e\u7eed\u53ef\u91cd\u70b9\u89c2\u5bdf\u4e92\u52a8\u662f\u5426\u5f62\u6210\u547c\u5e94\u3002"
      });
    }
  }

  if (targetRelative && targetLines.length > 0) {
    const movingTargetLines = targetLines.filter((line) => context.movingLinePositions.includes(line));
    if (movingTargetLines.length > 0) {
      hits.push({
        id: `${context.categoryKey}-target-moving`,
        title: "\u7528\u795e\u5bf9\u5e94\u516d\u4eb2\u53d1\u52a8",
        type: "favorable",
        description:
          `${targetRelative}\u843d\u5728\u7b2c ${movingTargetLines.join("\u3001")} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
          "\u5efa\u8bae\u4f18\u5148\u628a\u8fd9\u4e9b\u723b\u4f5c\u4e3a\u7b2c\u4e00\u7248\u91cd\u70b9\u89c2\u5bdf\u5bf9\u8c61\u3002"
      });
    } else {
      hits.push({
        id: `${context.categoryKey}-target-static`,
        title: "\u7528\u795e\u5bf9\u5e94\u516d\u4eb2\u9759\u5b88",
        type: "info",
        description:
          `${targetRelative}\u5df2\u5728\u76d8\u4e2d\u843d\u4f4d\uff0c\u4f46\u5f53\u524d\u672a\u89c1\u5176\u53d1\u52a8\uff0c` +
          "\u53ef\u7ed3\u5408\u4e16\u5e94\u5173\u7cfb\u548c\u6240\u5728\u4f4d\u7f6e\u7ee7\u7eed\u5224\u65ad\u3002"
      });
    }
  }

  if (targetRelative && targetLines.length === 0) {
    hits.push({
      id: `${context.categoryKey}-target-pending`,
      title: "\u7528\u795e\u5b9a\u4f4d\u5f85\u7ec6\u5316",
      type: "unfavorable",
      description:
        `\u5f53\u524d\u76d8\u9762\u5c1a\u672a\u627e\u5230\u660e\u786e\u7684 ${targetRelative} \u843d\u4f4d\uff0c` +
        "\u540e\u7eed\u7eb3\u7532\u4e0e\u516d\u4eb2\u89c4\u5219\u7ec6\u5316\u540e\u4f1a\u7ee7\u7eed\u589e\u5f3a\u8fd9\u4e00\u90e8\u5206\u3002"
    });
  }

  return hits;
}
