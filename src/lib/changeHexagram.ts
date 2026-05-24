import { CastLineResult, YinYang } from '@/types';

export function changeHexagram(lines: CastLineResult[]): YinYang[] {
  return lines.map((line) => (line.isMoving ? line.changeTo : line.yinYang)) as YinYang[];
}
