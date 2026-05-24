export type YinYang = "阴" | "阳";
export type CoinFace = "字" | "花";
export type CoinSelection = "字字字" | "字字花" | "字花花" | "花花花";
export type DayStem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";
export type Wuxing = "木" | "火" | "土" | "金" | "水";
export type SixRelative = "兄弟" | "子孙" | "妻财" | "官鬼" | "父母";

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

export interface SixGodAssignment {
  line: number;
  label: string;
}

export interface NajiaAssignment {
  line: number;
  lineName: string;
  branch: string;
  branchElement: Wuxing;
}

export interface SixRelativeAssignment {
  line: number;
  relative: SixRelative;
  branch: string;
  branchElement: Wuxing;
}

export interface ShiYingInfo {
  shi: 1 | 2 | 3 | 4 | 5 | 6 | null;
  ying: 1 | 2 | 3 | 4 | 5 | 6 | null;
  palace: string | null;
  palaceElement: Wuxing | null;
  message: string;
}
