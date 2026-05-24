import { CastLineResult, HexagramRecord, YinYang } from '@/types';
import { HexagramDisplay } from './HexagramDisplay';
import { LineDisplay } from './LineDisplay';

export function HexagramResult({ lines, base, changed, baseName, changedName }: { lines: CastLineResult[]; base: YinYang[]; changed: YinYang[]; baseName?: HexagramRecord; changedName?: HexagramRecord }) {
  return <div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}><HexagramDisplay title='本卦' lines={base} name={baseName}/><HexagramDisplay title='变卦' lines={changed} name={changedName}/></div><ul>{[...lines].reverse().map((l)=><LineDisplay key={l.index} line={l} />)}</ul></div>;
}
