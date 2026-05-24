import { HexagramRecord, YinYang } from '@/types';

const trigrams: Record<string, { bits: YinYang[]; lines: string }> = {
  乾: { bits: [1, 1, 1], lines: '111' },
  兑: { bits: [1, 1, 0], lines: '110' },
  离: { bits: [1, 0, 1], lines: '101' },
  震: { bits: [1, 0, 0], lines: '100' },
  巽: { bits: [0, 1, 1], lines: '011' },
  坎: { bits: [0, 1, 0], lines: '010' },
  艮: { bits: [0, 0, 1], lines: '001' },
  坤: { bits: [0, 0, 0], lines: '000' }
};

const names = [
'乾为天','天泽履','天火同人','天雷无妄','天风姤','天水讼','天山遁','天地否',
'泽天夬','兑为泽','泽火革','泽雷随','泽风大过','泽水困','泽山咸','泽地萃',
'火天大有','火泽睽','离为火','火雷噬嗑','火风鼎','火水未济','火山旅','火地晋',
'雷天大壮','雷泽归妹','雷火丰','震为雷','雷风恒','雷水解','雷山小过','雷地豫',
'风天小畜','风泽中孚','风火家人','风雷益','巽为风','风水涣','风山渐','风地观',
'水天需','水泽节','水火既济','水雷屯','水风井','坎为水','水山蹇','水地比',
'山天大畜','山泽损','山火贲','山雷颐','山风蛊','山水蒙','艮为山','山地剥',
'地天泰','地泽临','地火明夷','地雷复','地风升','地水师','地山谦','坤为地'
];

const trigramOrder = ['乾','兑','离','震','巽','坎','艮','坤'] as const;

export const hexagrams: HexagramRecord[] = [];
let idx = 0;
for (const upper of trigramOrder) {
  for (const lower of trigramOrder) {
    const lines = [...trigrams[lower].bits, ...trigrams[upper].bits] as YinYang[];
    hexagrams.push({ key: `H${idx + 1}`, name: names[idx], upperTrigram: upper, lowerTrigram: lower, lines });
    idx++;
  }
}
