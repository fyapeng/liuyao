import { hexagrams } from '@/data/hexagrams';
import { HexagramRecord, YinYang } from '@/types';

export function getHexagramName(lines: YinYang[]): HexagramRecord | undefined {
  return hexagrams.find((h) => h.lines.join('') === lines.join(''));
}
