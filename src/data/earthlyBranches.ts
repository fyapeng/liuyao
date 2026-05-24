export interface EarthlyBranch {
  key: string;
  label: string;
  wuxing?: string;
}

export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  { key: "zi", label: "子", wuxing: "水" },
  { key: "chou", label: "丑", wuxing: "土" },
  { key: "yin", label: "寅", wuxing: "木" },
  { key: "mao", label: "卯", wuxing: "木" },
  { key: "chen", label: "辰", wuxing: "土" },
  { key: "si", label: "巳", wuxing: "火" },
  { key: "wu", label: "午", wuxing: "火" },
  { key: "wei", label: "未", wuxing: "土" },
  { key: "shen", label: "申", wuxing: "金" },
  { key: "you", label: "酉", wuxing: "金" },
  { key: "xu", label: "戌", wuxing: "土" },
  { key: "hai", label: "亥", wuxing: "水" }
];

