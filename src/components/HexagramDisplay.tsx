import { HexagramRecord, YinYang } from '@/types';

export function HexagramDisplay({ title, lines, name }: { title: string; lines: YinYang[]; name?: HexagramRecord }) {
  return <div><h3>{title}：{name?.name ?? '未知卦'}</h3><pre>{[...lines].reverse().map(l=>l===1?'━━━━━━':'━━  ━━').join('\n')}</pre></div>;
}
