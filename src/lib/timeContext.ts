import type { DayStem, EarthlyBranchLabel, TimeContext } from "../types/index.ts";

const STEMS: DayStem[] = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];
const BRANCHES: EarthlyBranchLabel[] = [
  "\u5b50",
  "\u4e11",
  "\u5bc5",
  "\u536f",
  "\u8fb0",
  "\u5df3",
  "\u5348",
  "\u672a",
  "\u7533",
  "\u9149",
  "\u620c",
  "\u4ea5"
];
const VOID_BRANCHES_BY_XUN: [EarthlyBranchLabel, EarthlyBranchLabel][] = [
  ["\u620c", "\u4ea5"],
  ["\u7533", "\u9149"],
  ["\u5348", "\u672a"],
  ["\u8fb0", "\u5df3"],
  ["\u5bc5", "\u536f"],
  ["\u5b50", "\u4e11"]
];
const SOLAR_TERMS = [
  { label: "\u6625\u5206", longitude: 0 },
  { label: "\u6e05\u660e", longitude: 15 },
  { label: "\u8c37\u96e8", longitude: 30 },
  { label: "\u7acb\u590f", longitude: 45 },
  { label: "\u5c0f\u6ee1", longitude: 60 },
  { label: "\u8292\u79cd", longitude: 75 },
  { label: "\u590f\u81f3", longitude: 90 },
  { label: "\u5c0f\u6691", longitude: 105 },
  { label: "\u5927\u6691", longitude: 120 },
  { label: "\u7acb\u79cb", longitude: 135 },
  { label: "\u5904\u6691", longitude: 150 },
  { label: "\u767d\u9732", longitude: 165 },
  { label: "\u79cb\u5206", longitude: 180 },
  { label: "\u5bd2\u9732", longitude: 195 },
  { label: "\u971c\u964d", longitude: 210 },
  { label: "\u7acb\u51ac", longitude: 225 },
  { label: "\u5c0f\u96ea", longitude: 240 },
  { label: "\u5927\u96ea", longitude: 255 },
  { label: "\u51ac\u81f3", longitude: 270 },
  { label: "\u5c0f\u5bd2", longitude: 285 },
  { label: "\u5927\u5bd2", longitude: 300 },
  { label: "\u7acb\u6625", longitude: 315 },
  { label: "\u96e8\u6c34", longitude: 330 },
  { label: "\u60ca\u86f0", longitude: 345 }
] as const;
const MONTH_BUILD_SEGMENTS = [
  { start: 315, end: 345, monthBuild: "\u5bc5" as const, anchorTerm: "\u7acb\u6625" },
  { start: 345, end: 15, monthBuild: "\u536f" as const, anchorTerm: "\u60ca\u86f0" },
  { start: 15, end: 45, monthBuild: "\u8fb0" as const, anchorTerm: "\u6e05\u660e" },
  { start: 45, end: 75, monthBuild: "\u5df3" as const, anchorTerm: "\u7acb\u590f" },
  { start: 75, end: 105, monthBuild: "\u5348" as const, anchorTerm: "\u8292\u79cd" },
  { start: 105, end: 135, monthBuild: "\u672a" as const, anchorTerm: "\u5c0f\u6691" },
  { start: 135, end: 165, monthBuild: "\u7533" as const, anchorTerm: "\u7acb\u79cb" },
  { start: 165, end: 195, monthBuild: "\u9149" as const, anchorTerm: "\u767d\u9732" },
  { start: 195, end: 225, monthBuild: "\u620c" as const, anchorTerm: "\u5bd2\u9732" },
  { start: 225, end: 255, monthBuild: "\u4ea5" as const, anchorTerm: "\u7acb\u51ac" },
  { start: 255, end: 285, monthBuild: "\u5b50" as const, anchorTerm: "\u5927\u96ea" },
  { start: 285, end: 315, monthBuild: "\u4e11" as const, anchorTerm: "\u5c0f\u5bd2" }
] as const;

const SOLAR_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

const LUNAR_FORMATTER = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

function mod(value: number, base: number) {
  return ((value % base) + base) % base;
}

function normalizeAngle(value: number) {
  return mod(value, 360);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayGanzhi(date: Date) {
  const baseDate = new Date(1984, 1, 2);
  const baseIndex = 2;
  const diffDays = Math.round((startOfDay(date).getTime() - baseDate.getTime()) / 86_400_000);
  const ganzhiIndex = mod(baseIndex + diffDays, 60);
  const dayStem = STEMS[ganzhiIndex % 10];
  const dayBranch = BRANCHES[ganzhiIndex % 12];
  const xunIndex = Math.floor(ganzhiIndex / 10);

  return {
    dayStem,
    dayBranch,
    dayGanzhi: `${dayStem}${dayBranch}` as const,
    xunIndex
  };
}

function formatLunarDay(dayValue: string) {
  const dayNumber = Number(dayValue);
  if (!Number.isFinite(dayNumber)) {
    return dayValue;
  }

  const dayLabels = [
    "",
    "\u521d\u4e00",
    "\u521d\u4e8c",
    "\u521d\u4e09",
    "\u521d\u56db",
    "\u521d\u4e94",
    "\u521d\u516d",
    "\u521d\u4e03",
    "\u521d\u516b",
    "\u521d\u4e5d",
    "\u521d\u5341",
    "\u5341\u4e00",
    "\u5341\u4e8c",
    "\u5341\u4e09",
    "\u5341\u56db",
    "\u5341\u4e94",
    "\u5341\u516d",
    "\u5341\u4e03",
    "\u5341\u516b",
    "\u5341\u4e5d",
    "\u4e8c\u5341",
    "\u5eff\u4e00",
    "\u5eff\u4e8c",
    "\u5eff\u4e09",
    "\u5eff\u56db",
    "\u5eff\u4e94",
    "\u5eff\u516d",
    "\u5eff\u4e03",
    "\u5eff\u516b",
    "\u5eff\u4e5d",
    "\u4e09\u5341"
  ];

  return dayLabels[dayNumber] ?? dayValue;
}

function getSolarLongitude(date: Date) {
  const julianDay = date.getTime() / 86_400_000 + 2_440_587.5;
  const centuries = (julianDay - 2_451_545) / 36_525;
  const meanLongitude = normalizeAngle(280.46646 + 36_000.76983 * centuries + 0.0003032 * centuries * centuries);
  const meanAnomaly = normalizeAngle(357.52911 + 35_999.05029 * centuries - 0.0001537 * centuries * centuries);
  const meanAnomalyRadians = (meanAnomaly * Math.PI) / 180;
  const equationOfCenter =
    (1.914602 - 0.004817 * centuries - 0.000014 * centuries * centuries) * Math.sin(meanAnomalyRadians) +
    (0.019993 - 0.000101 * centuries) * Math.sin(2 * meanAnomalyRadians) +
    0.000289 * Math.sin(3 * meanAnomalyRadians);
  const trueLongitude = meanLongitude + equationOfCenter;
  const omega = 125.04 - 1_934.136 * centuries;
  const apparentLongitude = trueLongitude - 0.00569 - 0.00478 * Math.sin((omega * Math.PI) / 180);

  return normalizeAngle(apparentLongitude);
}

function isAngleInRange(angle: number, start: number, end: number) {
  if (start < end) {
    return angle >= start && angle < end;
  }

  return angle >= start || angle < end;
}

function resolveCurrentSolarTerm(longitude: number) {
  const offsetLongitude = normalizeAngle(longitude + 7.5);
  const segmentIndex = Math.floor(offsetLongitude / 15) % SOLAR_TERMS.length;
  return SOLAR_TERMS[segmentIndex]?.label ?? "\u7acb\u6625";
}

function resolveMonthBuild(longitude: number) {
  const segment =
    MONTH_BUILD_SEGMENTS.find((item) => isAngleInRange(longitude, item.start, item.end)) ?? MONTH_BUILD_SEGMENTS[0];

  return {
    monthBuild: segment.monthBuild,
    monthBuildDetail: `\u6309\u8282\u6c14\u5b9a\u6708\uff1a${segment.anchorTerm}\u540e\u5165${segment.monthBuild}\u6708`,
    anchorTerm: segment.anchorTerm
  };
}

export function buildTimeContext(date = new Date()): TimeContext {
  const lunarParts = Object.fromEntries(LUNAR_FORMATTER.formatToParts(date).map((part) => [part.type, part.value]));
  const lunarYearName = lunarParts.yearName ?? "";
  const lunarMonthLabel = lunarParts.month ?? "";
  const lunarDayLabel = formatLunarDay(lunarParts.day ?? "");
  const solarLongitude = getSolarLongitude(date);
  const solarTermLabel = resolveCurrentSolarTerm(solarLongitude);
  const { monthBuild, monthBuildDetail } = resolveMonthBuild(solarLongitude);
  const { dayStem, dayBranch, dayGanzhi, xunIndex } = getDayGanzhi(date);
  const voidBranches = VOID_BRANCHES_BY_XUN[xunIndex] ?? ["\u620c", "\u4ea5"];
  const solarLabel = SOLAR_FORMATTER.format(date);

  return {
    timestampLabel: `${solarLabel} \u00b7 \u81ea\u52a8\u53d6\u65f6`,
    solarDateLabel: solarLabel,
    lunarDateLabel: `${lunarYearName}\u5e74${lunarMonthLabel}${lunarDayLabel}`,
    lunarYearName,
    solarTermLabel,
    monthBuild,
    monthBuildDetail,
    dayGanzhi,
    dayStem,
    dayBranch,
    voidBranches,
    sourceNote:
      `\u516c\u519c\u5386\u4ecd\u53c2\u8003 Intl \u65e5\u5386\u6362\u7b97\uff0c\u6708\u5efa\u5219\u6309\u592a\u9633\u9ec4\u7ecf\u4e0e\u8282\u6c14\u5206\u6bb5\u63a8\u5b9a\uff0c\u5f53\u524d\u4f4d\u4e8e${solarTermLabel}\u65f6\u6bb5\u3002`
  };
}
