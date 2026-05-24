import type { Hexagram } from "../types/index.ts";

const TRIGRAM_LINES = {
  乾: [1, 1, 1],
  兑: [1, 1, 0],
  离: [1, 0, 1],
  震: [1, 0, 0],
  巽: [0, 1, 1],
  坎: [0, 1, 0],
  艮: [0, 0, 1],
  坤: [0, 0, 0]
} as const satisfies Record<string, [0 | 1, 0 | 1, 0 | 1]>;

const HEXAGRAM_CATALOG = [
  ["qian", "乾为天", "乾", "乾"],
  ["kun", "坤为地", "坤", "坤"],
  ["zhun", "水雷屯", "坎", "震"],
  ["meng", "山水蒙", "艮", "坎"],
  ["xu", "水天需", "坎", "乾"],
  ["song", "天水讼", "乾", "坎"],
  ["shi", "地水师", "坤", "坎"],
  ["bi", "水地比", "坎", "坤"],
  ["xiaoxu", "风天小畜", "巽", "乾"],
  ["lv", "天泽履", "乾", "兑"],
  ["tai", "地天泰", "坤", "乾"],
  ["pi", "天地否", "乾", "坤"],
  ["tongren", "天火同人", "乾", "离"],
  ["dayou", "火天大有", "离", "乾"],
  ["qian2", "地山谦", "坤", "艮"],
  ["yu", "雷地豫", "震", "坤"],
  ["sui", "泽雷随", "兑", "震"],
  ["gu", "山风蛊", "艮", "巽"],
  ["lin", "地泽临", "坤", "兑"],
  ["guan", "风地观", "巽", "坤"],
  ["shike", "火雷噬嗑", "离", "震"],
  ["bi2", "山火贲", "艮", "离"],
  ["bo", "山地剥", "艮", "坤"],
  ["fu", "地雷复", "坤", "震"],
  ["wuwang", "天雷无妄", "乾", "震"],
  ["daxu", "山天大畜", "艮", "乾"],
  ["yi", "山雷颐", "艮", "震"],
  ["daguo", "泽风大过", "兑", "巽"],
  ["kan", "坎为水", "坎", "坎"],
  ["li", "离为火", "离", "离"],
  ["xian", "泽山咸", "兑", "艮"],
  ["heng", "雷风恒", "震", "巽"],
  ["dun", "天山遁", "乾", "艮"],
  ["dazhuang", "雷天大壮", "震", "乾"],
  ["jin", "火地晋", "离", "坤"],
  ["mingyi", "地火明夷", "坤", "离"],
  ["jiaren", "风火家人", "巽", "离"],
  ["kui", "火泽睽", "离", "兑"],
  ["jian", "水山蹇", "坎", "艮"],
  ["jie", "雷水解", "震", "坎"],
  ["sun", "山泽损", "艮", "兑"],
  ["yi2", "风雷益", "巽", "震"],
  ["guai", "泽天夬", "兑", "乾"],
  ["gou", "天风姤", "乾", "巽"],
  ["cui", "泽地萃", "兑", "坤"],
  ["sheng", "地风升", "坤", "巽"],
  ["kun2", "泽水困", "兑", "坎"],
  ["jing", "水风井", "坎", "巽"],
  ["ge", "泽火革", "兑", "离"],
  ["ding", "火风鼎", "离", "巽"],
  ["zhen", "震为雷", "震", "震"],
  ["gen", "艮为山", "艮", "艮"],
  ["jian2", "风山渐", "巽", "艮"],
  ["guimei", "雷泽归妹", "震", "兑"],
  ["feng", "雷火丰", "震", "离"],
  ["lv2", "火山旅", "离", "艮"],
  ["xun", "巽为风", "巽", "巽"],
  ["dui", "兑为泽", "兑", "兑"],
  ["huan", "风水涣", "巽", "坎"],
  ["jie2", "水泽节", "坎", "兑"],
  ["zhongfu", "风泽中孚", "巽", "兑"],
  ["xiaoguo", "雷山小过", "震", "艮"],
  ["jiji", "水火既济", "坎", "离"],
  ["weiji", "火水未济", "离", "坎"]
] as const;

function buildLines(upperTrigram: keyof typeof TRIGRAM_LINES, lowerTrigram: keyof typeof TRIGRAM_LINES) {
  return [...TRIGRAM_LINES[lowerTrigram], ...TRIGRAM_LINES[upperTrigram]] as Hexagram["lines"];
}

export const HEXAGRAMS: Hexagram[] = HEXAGRAM_CATALOG.map(([key, name, upperTrigram, lowerTrigram]) => ({
  key,
  name,
  upperTrigram,
  lowerTrigram,
  lines: buildLines(upperTrigram, lowerTrigram)
}));

