import { LineDisplay } from "./LineDisplay.tsx";
import type { CastLineDetail, Hexagram } from "../types/index.ts";

interface HexagramDisplayProps {
  title: string;
  hexagram: Hexagram | null;
  details: CastLineDetail[];
  mode: "original" | "changed";
}

export function HexagramDisplay({ title, hexagram, details, mode }: HexagramDisplayProps) {
  return (
    <section className="hexagram-card">
      <div className="hexagram-header">
        <div>
          <div className="muted-text">{title}</div>
          <div className="hexagram-title">{hexagram?.name ?? "未知卦"}</div>
        </div>
        <div className="tag-row">
          <span className="tag">上卦：{hexagram?.upperTrigram ?? "-"}</span>
          <span className="tag">下卦：{hexagram?.lowerTrigram ?? "-"}</span>
        </div>
      </div>

      <div className="hexagram-lines">
        {[...details].reverse().map((detail) => (
          <LineDisplay key={`${mode}-${detail.position}`} detail={detail} mode={mode} />
        ))}
      </div>
    </section>
  );
}
