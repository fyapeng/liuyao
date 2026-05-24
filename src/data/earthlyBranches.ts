export interface EarthlyBranch {
  key: string;
  label: string;
  wuxing: "\u6728" | "\u706b" | "\u571f" | "\u91d1" | "\u6c34";
}

export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  { key: "zi", label: "\u5b50", wuxing: "\u6c34" },
  { key: "chou", label: "\u4e11", wuxing: "\u571f" },
  { key: "yin", label: "\u5bc5", wuxing: "\u6728" },
  { key: "mao", label: "\u536f", wuxing: "\u6728" },
  { key: "chen", label: "\u8fb0", wuxing: "\u571f" },
  { key: "si", label: "\u5df3", wuxing: "\u706b" },
  { key: "wu", label: "\u5348", wuxing: "\u706b" },
  { key: "wei", label: "\u672a", wuxing: "\u571f" },
  { key: "shen", label: "\u7533", wuxing: "\u91d1" },
  { key: "you", label: "\u9149", wuxing: "\u91d1" },
  { key: "xu", label: "\u620c", wuxing: "\u571f" },
  { key: "hai", label: "\u4ea5", wuxing: "\u6c34" }
];

export const EARTHLY_BRANCH_WUXING = Object.fromEntries(
  EARTHLY_BRANCHES.map((item) => [item.label, item.wuxing])
) as Record<string, EarthlyBranch["wuxing"]>;
