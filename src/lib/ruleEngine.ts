import type { RuleEngineContext, RuleHit } from "../types/index.ts";
import { buildYongShenProfile, resolveYongShenLocator } from "./yongShen.ts";

export function ruleEngine(context: RuleEngineContext): RuleHit[] {
  const hits: RuleHit[] = [];
  const yongShenLocator = resolveYongShenLocator(context);
  const yongShenProfile = buildYongShenProfile(context);
  const targetLines = yongShenProfile.yongShenMatches.map((item) => item.line);
  const yongShenTemporalStatuses = context.temporalProfile.lineStatuses.filter((item) => targetLines.includes(item.line));

  hits.push({
    id: `${context.categoryKey}-summary`,
    title: "\u8bfb\u76d8\u8d77\u70b9",
    type: "info",
    description:
      `\u5f53\u524d\u5206\u7c7b\u4f18\u5148\u5173\u6ce8 ${context.primaryYongShen}\u3002` +
      "\u73b0\u5728\u4f1a\u540c\u65f6\u7ed3\u5408\u4e16\u5e94\u3001\u52a8\u723b\u3001\u65e5\u6708\u65fa\u8870\u4e0e\u7528\u795e\u7cfb\u7edf\u4e00\u8d77\u770b\u3002"
  });

  if (context.movingLinePositions.length === 0) {
    hits.push({
      id: `${context.categoryKey}-no-moving`,
      title: "\u65e0\u52a8\u723b",
      type: "info",
      description:
        "\u672c\u5366\u65e0\u52a8\u723b\uff0c\u7b2c\u4e00\u5c42\u8bfb\u6cd5\u5efa\u8bae\u5148\u91cd\u770b\u4e16\u5e94\u5bf9\u5f85\u3001\u7528\u795e\u843d\u4f4d\u4e0e\u65e5\u6708\u662f\u5426\u5f97\u529b\u3002"
    });
  } else if (context.movingLinePositions.length <= 2) {
    hits.push({
      id: `${context.categoryKey}-few-moving`,
      title: "\u52a8\u723b\u96c6\u4e2d",
      type: "favorable",
      description:
        `\u5f53\u524d\u53ea\u6709 ${context.movingLinePositions.length} \u4e2a\u52a8\u723b\uff0c` +
        `\u53ef\u4f18\u5148\u9605\u8bfb ${context.movingLinePositions.join("\u3001")} \u723b\u53ca\u5176\u53d8\u5316\u8def\u5f84\u3002`
    });
  } else {
    hits.push({
      id: `${context.categoryKey}-many-moving`,
      title: "\u52a8\u723b\u8f83\u591a",
      type: "unfavorable",
      description:
        `\u5f53\u524d\u5171\u6709 ${context.movingLinePositions.length} \u4e2a\u52a8\u723b\uff0c` +
        "\u5c40\u9762\u6d41\u52a8\u6027\u5f3a\uff0c\u4e0d\u5b9c\u53ea\u76ef\u5355\u4e00\u723b\u8f7b\u4e0b\u5b9a\u8bba\u3002"
    });
  }

  if (context.shiYing.shi && context.movingLinePositions.includes(context.shiYing.shi)) {
    hits.push({
      id: `${context.categoryKey}-shi-moving`,
      title: "\u4e16\u723b\u53d1\u52a8",
      type: "info",
      description:
        `\u4e16\u723b\u843d\u5728\u7b2c ${context.shiYing.shi} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
        "\u63d0\u95ee\u8005\u81ea\u8eab\u7684\u4e3b\u52a8\u6027\u3001\u6001\u5ea6\u8f6c\u53d8\u6216\u53d1\u529b\u8282\u594f\u66f4\u660e\u663e\u3002"
    });
  }

  if (context.shiYing.ying && context.movingLinePositions.includes(context.shiYing.ying)) {
    hits.push({
      id: `${context.categoryKey}-ying-moving`,
      title: "\u5e94\u723b\u53d1\u52a8",
      type: "info",
      description:
        `\u5e94\u723b\u843d\u5728\u7b2c ${context.shiYing.ying} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
        "\u5bf9\u65b9\u3001\u5916\u90e8\u53cd\u9988\u6216\u73af\u5883\u56e0\u7d20\u7684\u53d8\u5316\u4e5f\u8f83\u6d3b\u8dc3\u3002"
    });
  }

  if (
    context.shiYing.shi &&
    context.shiYing.ying &&
    context.movingLinePositions.includes(context.shiYing.shi) &&
    context.movingLinePositions.includes(context.shiYing.ying)
  ) {
    hits.push({
      id: `${context.categoryKey}-both-moving`,
      title: "\u4e16\u5e94\u540c\u52a8",
      type: "favorable",
      description:
        "\u4e16\u5e94\u540c\u65f6\u53d1\u52a8\uff0c\u5f80\u5f80\u8868\u793a\u53cc\u65b9\u6216\u5185\u5916\u4e24\u7aef\u90fd\u5728\u53d1\u751f\u53d8\u5316\uff0c\u540e\u7eed\u89c2\u5bdf\u4e92\u52a8\u6548\u5e94\u5f88\u5173\u952e\u3002"
    });
  }

  if (yongShenLocator && targetLines.length > 0) {
    const movingTargetLines = yongShenProfile.yongShenMatches.filter((item) => item.isMoving).map((item) => item.line);

    if (movingTargetLines.length > 0) {
      hits.push({
        id: `${context.categoryKey}-target-moving`,
        title: "\u7528\u795e\u53d1\u52a8",
        type: "favorable",
        description:
          `${yongShenLocator.label}\u843d\u5728\u7b2c ${movingTargetLines.join("\u3001")} \u723b\u4e14\u5904\u4e8e\u52a8\u4f4d\uff0c` +
          "\u4e8b\u60c5\u7684\u5173\u952e\u652f\u70b9\u76f8\u5bf9\u660e\u786e\uff0c\u53ef\u4f18\u5148\u4ece\u8fd9\u4e9b\u723b\u8bfb\u8d77\u3002"
      });
    } else {
      hits.push({
        id: `${context.categoryKey}-target-static`,
        title: "\u7528\u795e\u9759\u5b88",
        type: "info",
        description:
          `${yongShenLocator.label}\u5df2\u5728\u76d8\u4e2d\u843d\u4f4d\uff0c\u4f46\u5f53\u524d\u672a\u89c1\u5176\u53d1\u52a8\uff0c` +
          "\u8981\u66f4\u591a\u501f\u52a9\u65e5\u6708\u65fa\u8870\u3001\u4e16\u5e94\u548c\u5143\u5fcc\u4ec7\u795e\u6765\u5224\u65ad\u3002"
      });
    }
  }

  if (yongShenLocator && targetLines.length === 0) {
    hits.push({
      id: `${context.categoryKey}-target-pending`,
      title: "\u7528\u795e\u5b9a\u4f4d\u5f85\u7ec6\u5316",
      type: "unfavorable",
      description:
        `\u5f53\u524d\u76d8\u9762\u5c1a\u672a\u627e\u5230\u660e\u786e\u7684 ${yongShenLocator.label} \u843d\u4f4d\uff0c` +
        "\u8fd9\u79cd\u76d8\u9762\u9700\u8981\u66f4\u4f9d\u8d56\u4e16\u5e94\u4e0e\u5168\u76d8\u7ed3\u6784\uff0c\u4e0d\u5b9c\u6025\u4e8e\u7ed9\u5b9a\u7ed3\u8bba\u3002"
    });
  }

  if (yongShenTemporalStatuses.some((item) => item.hasSupport)) {
    const supportedLines = yongShenTemporalStatuses.filter((item) => item.hasSupport).map((item) => item.line);
    hits.push({
      id: `${context.categoryKey}-yongshen-supported`,
      title: "\u7528\u795e\u5f97\u65e5\u6708\u52a9\u529b",
      type: "favorable",
      description:
        `\u7528\u795e\u6240\u5728\u7684\u7b2c ${supportedLines.join("\u3001")} \u723b\u53ef\u89c1\u65e5\u6708\u751f\u6276\u3001\u4e34\u503c\u6216\u76f8\u5408\uff0c` +
        "\u65f6\u4ee4\u5bf9\u4e8b\u60c5\u6709\u4e00\u5b9a\u63a8\u52a8\u529b\u3002"
      });
  }

  if (yongShenTemporalStatuses.some((item) => item.isVoid || item.isMonthBroken || item.hasPressure)) {
    const pressuredLines = yongShenTemporalStatuses
      .filter((item) => item.isVoid || item.isMonthBroken || item.hasPressure)
      .map((item) => `\u7b2c${item.line}\u723b(${item.relationSummary})`);

    hits.push({
      id: `${context.categoryKey}-yongshen-pressured`,
      title: "\u7528\u795e\u53d7\u65f6\u4ee4\u7275\u5236",
      type: "unfavorable",
      description:
        `\u7528\u795e\u5bf9\u5e94\u723b\u4f4d\u51fa\u73b0 ${pressuredLines.join("\u3001")}\uff0c` +
        "\u8bf4\u660e\u81f3\u5c11\u5b58\u5728\u7a7a\u4ea1\u3001\u6708\u7834\u3001\u51b2\u514b\u6216\u5211\u5bb3\u7b49\u963b\u529b\uff0c\u9700\u8981\u4fdd\u5b88\u4e00\u4e9b\u8bfb\u3002"
    });
  }

  if (yongShenProfile.roleMatches.some((item) => item.role === "\u5143\u795e" && item.isMoving)) {
    const lines = yongShenProfile.roleMatches.filter((item) => item.role === "\u5143\u795e" && item.isMoving).map((item) => item.line);
    hits.push({
      id: `${context.categoryKey}-yuanshen-moving`,
      title: "\u5143\u795e\u53d1\u52a8",
      type: "favorable",
      description: `\u7b2c ${lines.join("\u3001")} \u723b\u4f5c\u4e3a\u5143\u795e\u53d1\u52a8\uff0c\u5bf9\u7528\u795e\u6709\u8f93\u9001\u6c14\u529b\u7684\u53ef\u80fd\u3002`
    });
  }

  if (yongShenProfile.roleMatches.some((item) => item.role === "\u5fcc\u795e" && item.isMoving)) {
    const lines = yongShenProfile.roleMatches.filter((item) => item.role === "\u5fcc\u795e" && item.isMoving).map((item) => item.line);
    hits.push({
      id: `${context.categoryKey}-jishen-moving`,
      title: "\u5fcc\u795e\u53d1\u52a8",
      type: "unfavorable",
      description: `\u7b2c ${lines.join("\u3001")} \u723b\u4f5c\u4e3a\u5fcc\u795e\u53d1\u52a8\uff0c\u9700\u63d0\u9632\u5bf9\u7528\u795e\u5f62\u6210\u76f4\u63a5\u538b\u529b\u3002`
    });
  }

  if (context.temporalProfile.lineStatuses.some((item) => item.flags.includes("\u65e5\u51b2"))) {
    const dayClashLines = context.temporalProfile.lineStatuses.filter((item) => item.flags.includes("\u65e5\u51b2")).map((item) => item.line);
    hits.push({
      id: `${context.categoryKey}-day-clash`,
      title: "\u76d8\u4e2d\u89c1\u65e5\u51b2",
      type: "info",
      description: `\u7b2c ${dayClashLines.join("\u3001")} \u723b\u4e0e\u65e5\u652f\u76f8\u51b2\uff0c\u8bf4\u660e\u5f53\u5929\u5c42\u9762\u7684\u6ce2\u52a8\u8f83\u5f3a\uff0c\u77ed\u671f\u53d8\u5316\u4fe1\u53f7\u4f1a\u66f4\u660e\u663e\u3002`
    });
  }

  return hits;
}
