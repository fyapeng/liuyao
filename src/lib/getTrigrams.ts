import { YinYang } from '@/types';

const trigramMap: Record<string, string> = { '111': '乾', '110': '兑', '101': '离', '100': '震', '011': '巽', '010': '坎', '001': '艮', '000': '坤' };

export function getTrigrams(lines: YinYang[]) {
  const lower = lines.slice(0, 3).join('');
  const upper = lines.slice(3, 6).join('');
  return { lowerTrigram: trigramMap[lower], upperTrigram: trigramMap[upper] };
}
