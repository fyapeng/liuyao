export interface ShiYingPattern {
  hexagramKey: string;
  palace: string;
  palaceElement: "\u6728" | "\u706b" | "\u571f" | "\u91d1" | "\u6c34";
  palaceOrder: number;
  shi: 1 | 2 | 3 | 4 | 5 | 6;
  ying: 1 | 2 | 3 | 4 | 5 | 6;
}

const SHI_SEQUENCE = [6, 1, 2, 3, 4, 5, 4, 3] as const;
const YING_SEQUENCE = [3, 4, 5, 6, 1, 2, 1, 6] as const;

const PALACE_DEFINITIONS = {
  "\u4e7e": {
    element: "\u91d1",
    keys: ["qian", "gou", "dun", "pi", "guan", "bo", "jin", "dayou"]
  },
  "\u5151": {
    element: "\u91d1",
    keys: ["dui", "kun2", "cui", "xian", "jian", "qian2", "xiaoguo", "guimei"]
  },
  "\u79bb": {
    element: "\u706b",
    keys: ["li", "lv2", "ding", "weiji", "meng", "huan", "song", "tongren"]
  },
  "\u9707": {
    element: "\u6728",
    keys: ["zhen", "yu", "jie", "heng", "sheng", "jing", "daguo", "sui"]
  },
  "\u5deb": {
    element: "\u6728",
    keys: ["xun", "xiaoxu", "jiaren", "yi2", "wuwang", "shike", "yi", "gu"]
  },
  "\u574e": {
    element: "\u6c34",
    keys: ["kan", "jie2", "zhun", "jiji", "ge", "feng", "mingyi", "shi"]
  },
  "\u826e": {
    element: "\u571f",
    keys: ["gen", "bi2", "daxu", "sun", "kui", "lv", "zhongfu", "jian2"]
  },
  "\u5764": {
    element: "\u571f",
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
