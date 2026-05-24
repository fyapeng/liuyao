export type YinYang = "阴" | "阳";

export type CoinSelection = "字字字" | "字字花" | "字花花" | "花花花";

export interface CoinRule {
  label: CoinSelection;
  value: 6 | 7 | 8 | 9;
  name: "老阴" | "少阳" | "少阴" | "老阳";
  yinYang: YinYang;
  isMoving: boolean;
  description: string;
  marker: "×" | "○" | "";
  originalLine: 0 | 1;
  changedLine: 0 | 1;
}

export interface CastLineDetail extends CoinRule {
  position: 1 | 2 | 3 | 4 | 5 | 6;
  positionName: string;
}

export interface Hexagram {
  key: string;
  name: string;
  upperTrigram: string;
  lowerTrigram: string;
  lines: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
}

export interface HexagramComputationResult {
  selections: CoinSelection[];
  details: CastLineDetail[];
  originalLines: Hexagram["lines"];
  changedLines: Hexagram["lines"];
  movingLinePositions: number[];
}

export interface HexagramViewModel {
  hexagram: Hexagram | null;
  details: CastLineDetail[];
  label: string;
}

export interface CategoryRuleTemplate {
  id: string;
  title: string;
  description: string;
}

export interface QuestionCategory {
  key: string;
  label: string;
  primaryYongShen: string;
  secondaryReferences: string[];
  favorableRules: CategoryRuleTemplate[];
  unfavorableRules: CategoryRuleTemplate[];
  notes: string;
}

export type QuestionCategoryKey =
  | "感情婚姻"
  | "正缘桃花"
  | "财运生意"
  | "求职事业"
  | "学业考试"
  | "论文投稿"
  | "文书申请"
  | "消息联络"
  | "疾病健康"
  | "官司纠纷"
  | "出行迁移"
  | "寻人寻物"
  | "合作项目"
  | "其它杂占";

export interface RuleHit {
  id: string;
  title: string;
  type: "favorable" | "unfavorable" | "info";
  description: string;
}

