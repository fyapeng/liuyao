import { LineDisplay } from "./LineDisplay.tsx";
import type {
  CastLineDetail,
  Hexagram,
  NajiaAssignment,
  SixGodAssignment,
  SixRelativeAssignment
} from "../types/index.ts";

interface HexagramDisplayProps {
  title: string;
  hexagram: Hexagram | null;
  details: CastLineDetail[];
  mode: "original" | "changed";
  shi?: number | null;
  ying?: number | null;
  sixGods?: SixGodAssignment[];
  najiaAssignments?: NajiaAssignment[];
  relativeAssignments?: SixRelativeAssignment[];
}

export function HexagramDisplay({
  title,
  hexagram,
  details,
  mode,
  shi,
  ying,
  sixGods = [],
  najiaAssignments = [],
  relativeAssignments = []
}: HexagramDisplayProps) {
  return (
    <section className="hexagram-card">
      <div className="hexagram-header">
        <div>
          <div className="muted-text">{title}</div>
          <div className="hexagram-title">{hexagram?.name ?? "\u672a\u77e5\u5366"}</div>
        </div>
        <div className="tag-row">
          <span className="tag">{`\u4e0a\u5366\uff1a${hexagram?.upperTrigram ?? "-"}`}</span>
          <span className="tag">{`\u4e0b\u5366\uff1a${hexagram?.lowerTrigram ?? "-"}`}</span>
        </div>
      </div>

      <div className="hexagram-lines">
        {[...details].reverse().map((detail) => {
          const sixGod = sixGods.find((item) => item.line === detail.position)?.label;
          const najia = najiaAssignments.find((item) => item.line === detail.position);
          const relative = relativeAssignments.find((item) => item.line === detail.position)?.relative;

          return (
            <LineDisplay
              key={`${mode}-${detail.position}`}
              detail={detail}
              mode={mode}
              shi={detail.position === shi}
              ying={detail.position === ying}
              sixGod={sixGod}
              najia={najia ? `${najia.branch}${najia.branchElement}` : undefined}
              relative={relative}
            />
          );
        })}
      </div>
    </section>
  );
}
