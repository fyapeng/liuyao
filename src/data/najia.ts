export interface NajiaMapping {
  trigram: string;
  sequence: [string, string, string, string, string, string];
  notes: string;
}

export const NAJIA_BY_TRIGRAM: Record<string, NajiaMapping> = {
  乾: {
    trigram: "乾",
    sequence: ["子", "寅", "辰", "午", "申", "戌"],
    notes: "阳卦顺行阳支，乾宫以子起。"
  },
  震: {
    trigram: "震",
    sequence: ["子", "寅", "辰", "午", "申", "戌"],
    notes: "阳卦顺行阳支，震宫以子起。"
  },
  坎: {
    trigram: "坎",
    sequence: ["寅", "辰", "午", "申", "戌", "子"],
    notes: "阳卦顺行阳支，坎宫以寅起。"
  },
  艮: {
    trigram: "艮",
    sequence: ["辰", "午", "申", "戌", "子", "寅"],
    notes: "阳卦顺行阳支，艮宫以辰起。"
  },
  坤: {
    trigram: "坤",
    sequence: ["未", "巳", "卯", "丑", "亥", "酉"],
    notes: "阴卦逆行阴支，坤宫以未起。"
  },
  兑: {
    trigram: "兑",
    sequence: ["巳", "卯", "丑", "亥", "酉", "未"],
    notes: "阴卦逆行阴支，兑宫以巳起。"
  },
  离: {
    trigram: "离",
    sequence: ["卯", "丑", "亥", "酉", "未", "巳"],
    notes: "阴卦逆行阴支，离宫以卯起。"
  },
  巽: {
    trigram: "巽",
    sequence: ["丑", "亥", "酉", "未", "巳", "卯"],
    notes: "阴卦逆行阴支，巽宫以丑起。"
  }
};
