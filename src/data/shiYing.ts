export interface ShiYingPattern {
  hexagramKey: string;
  palace: string;
  palaceElement: "木" | "火" | "土" | "金" | "水";
  palaceOrder: number;
  shi: 1 | 2 | 3 | 4 | 5 | 6;
  ying: 1 | 2 | 3 | 4 | 5 | 6;
}

const SHI_SEQUENCE = [6, 1, 2, 3, 4, 5, 4, 3] as const;
const YING_SEQUENCE = [3, 4, 5, 6, 1, 2, 1, 6] as const;

const PALACE_DEFINITIONS = {
  乾: {
    element: "金",
    keys: ["qian", "gou", "dun", "pi", "guan", "bo", "jin", "dayou"]
  },
  兑: {
    element: "金",
    keys: ["dui", "kun2", "cui", "xian", "jian", "qian2", "xiaoguo", "guimei"]
  },
  离: {
    element: "火",
    keys: ["li", "lv2", "ding", "weiji", "meng", "huan", "song", "tongren"]
  },
  震: {
    element: "木",
    keys: ["zhen", "yu", "jie", "heng", "sheng", "jing", "daguo", "sui"]
  },
  巽: {
    element: "木",
    keys: ["xun", "xiaoxu", "jiaren", "yi2", "wuwang", "shike", "yi", "gu"]
  },
  坎: {
    element: "水",
    keys: ["kan", "jie2", "zhun", "jiji", "ge", "feng", "mingyi", "shi"]
  },
  艮: {
    element: "土",
    keys: ["gen", "bi2", "daxu", "sun", "kui", "lv", "zhongfu", "jian2"]
  },
  坤: {
    element: "土",
    keys: ["kun", "fu", "lin", "tai", "dazhuang", "guai", "xu", "bi"]
  }
} as const;

export const SHI_YING_MAP: Record<string, ShiYingPattern> = Object.fromEntries(
  Object.entries(PALACE_DEFINITIONS).flatMap(([palace, definition]) =>
    definition.keys.map((hexagramKey, index) => [
      hexagramKey,
      {
        hexagramKey,
        palace,
        palaceElement: definition.element,
        palaceOrder: index + 1,
        shi: SHI_SEQUENCE[index],
        ying: YING_SEQUENCE[index]
      }
    ])
  )
) as Record<string, ShiYingPattern>;
