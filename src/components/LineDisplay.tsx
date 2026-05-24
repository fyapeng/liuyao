import { CastLineResult } from '@/types';

export function LineDisplay({ line }: { line: CastLineResult }) {
  const graphic = line.yinYang === 1 ? '━━━━━━' : '━━  ━━';
  return <li>{line.index + 1}爻 | {line.pattern} | {line.value} | {line.yaoType} | {graphic} | {line.isMoving ? `动爻${line.symbol ?? ''}` : '静爻'}</li>;
}
