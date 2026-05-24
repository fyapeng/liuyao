import type { QuestionCategory, RuleHit } from "../types/index.ts";

export function ruleEngine(category: QuestionCategory): RuleHit[] {
  return [
    {
      id: `${category.key}-placeholder`,
      title: "规则分析预留",
      type: "info",
      description: "规则命中、有利因素、不利因素分析将在后续版本加入。"
    },
    {
      id: `${category.key}-yongshen`,
      title: "主用神提醒",
      type: "info",
      description: `当前分类建议优先关注：${category.primaryYongShen}。`
    }
  ];
}
