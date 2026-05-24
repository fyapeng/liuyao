export type YinYang = "\u9634" | "\u9633";
export type CoinFace = "\u5b57" | "\u82b1";
export type CoinSelection = "\u5b57\u5b57\u5b57" | "\u5b57\u5b57\u82b1" | "\u5b57\u82b1\u82b1" | "\u82b1\u82b1\u82b1";
export type DayStem =
  | "\u7532"
  | "\u4e59"
  | "\u4e19"
  | "\u4e01"
  | "\u620a"
  | "\u5df1"
  | "\u5e9a"
  | "\u8f9b"
  | "\u58ec"
  | "\u7678";
export type EarthlyBranchLabel =
  | "\u5b50"
  | "\u4e11"
  | "\u5bc5"
  | "\u536f"
  | "\u8fb0"
  | "\u5df3"
  | "\u5348"
  | "\u672a"
  | "\u7533"
  | "\u9149"
  | "\u620c"
  | "\u4ea5";
export type Wuxing = "\u6728" | "\u706b" | "\u571f" | "\u91d1" | "\u6c34";
export type SixRelative = "\u5144\u5f1f" | "\u5b50\u5b59" | "\u59bb\u8d22" | "\u5b98\u9b3c" | "\u7236\u6bcd";

export interface CoinRule {
  label: CoinSelection;
  value: 6 | 7 | 8 | 9;
  name: "\u8001\u9634" | "\u5c11\u9633" | "\u5c11\u9634" | "\u8001\u9633";
  yinYang: YinYang;
  isMoving: boolean;
  description: string;
  marker: "\u00d7" | "\u25cb" | "";
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
  | "\u611f\u60c5\u5a5a\u59fb"
  | "\u6b63\u7f18\u6843\u82b1"
  | "\u8d22\u8fd0\u751f\u610f"
  | "\u6c42\u804c\u4e8b\u4e1a"
  | "\u5b66\u4e1a\u8003\u8bd5"
  | "\u8bba\u6587\u6295\u7a3f"
  | "\u6587\u4e66\u7533\u8bf7"
  | "\u6d88\u606f\u8054\u7edc"
  | "\u75be\u75c5\u5065\u5eb7"
  | "\u5b98\u53f8\u7ea0\u7eb7"
  | "\u51fa\u884c\u8fc1\u79fb"
  | "\u5bfb\u4eba\u5bfb\u7269"
  | "\u5408\u4f5c\u9879\u76ee"
  | "\u5176\u5b83\u6742\u5360";

export interface RuleHit {
  id: string;
  title: string;
  type: "favorable" | "unfavorable" | "info";
  description: string;
}

export interface YongShenMatch {
  line: number;
  label: string;
  source: "relative" | "shi" | "ying";
  relative?: SixRelative;
  isMoving: boolean;
}

export type YongShenRoleType = "\u5143\u795e" | "\u5fcc\u795e" | "\u4ec7\u795e";

export interface YongShenRoleMatch {
  line: number;
  role: YongShenRoleType;
  relative: SixRelative;
  branchElement: Wuxing;
  isMoving: boolean;
  note: string;
}

export interface YongShenProfile {
  yongShenMatches: YongShenMatch[];
  roleMatches: YongShenRoleMatch[];
  favorableFactors: string[];
  unfavorableFactors: string[];
  statusSummary: string[];
}

export interface TemporalOverviewCard {
  key: "month" | "day" | "void" | "timestamp";
  label: string;
  value: string;
  note: string;
  tone: "pending" | "partial" | "ready";
}

export interface TemporalLineStatus {
  line: number;
  monthState: string;
  dayState: string;
  voidState: string;
  relationSummary: string;
  flags: string[];
  isVoid: boolean;
  isMonthBroken: boolean;
  hasSupport: boolean;
  hasPressure: boolean;
}

export interface TemporalProfile {
  overview: TemporalOverviewCard[];
  lineStatuses: TemporalLineStatus[];
}

export interface TimeContext {
  timestampLabel: string;
  solarDateLabel: string;
  lunarDateLabel: string;
  lunarYearName: string;
  solarTermLabel: string;
  monthBuild: EarthlyBranchLabel;
  monthBuildDetail: string;
  dayGanzhi: `${DayStem}${EarthlyBranchLabel}`;
  dayStem: DayStem;
  dayBranch: EarthlyBranchLabel;
  voidBranches: [EarthlyBranchLabel, EarthlyBranchLabel];
  sourceNote: string;
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

export interface RuleEngineContext {
  categoryKey: QuestionCategoryKey;
  primaryYongShen: string;
  movingLinePositions: number[];
  shiYing: ShiYingInfo;
  relatives: SixRelativeAssignment[];
  details: CastLineDetail[];
  dayStem: DayStem;
  timeContext: TimeContext;
  temporalProfile: TemporalProfile;
}
