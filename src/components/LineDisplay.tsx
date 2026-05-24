import type { CastLineDetail } from "../types/index.ts";

interface LineDisplayProps {
  detail: CastLineDetail;
  mode: "original" | "changed";
  shi?: boolean;
  ying?: boolean;
  sixGod?: string;
  najia?: string;
  relative?: string;
}

export function LineDisplay({
  detail,
  mode,
  shi = false,
  ying = false,
  sixGod,
  najia,
  relative
}: LineDisplayProps) {
  const bit = mode === "original" ? detail.originalLine : detail.changedLine;

  return (
    <div className={`line-display ${shi ? "line-shi" : ""} ${ying ? "line-ying" : ""}`}>
      <strong>{detail.positionName}</strong>

      <div>
        <div className="yao-shape" aria-label={bit === 1 ? "\u9633\u723b" : "\u9634\u723b"}>
          {bit === 1 ? (
            <span className="segment" />
          ) : (
            <>
              <span className="segment broken" />
              <span className="segment broken" />
            </>
          )}
        </div>
        <div className="line-meta">
          {`${detail.label} = ${detail.value} = ${detail.name} = ${detail.yinYang}\u723b${detail.isMoving ? "\u52a8" : "\u9759"}`}
        </div>
        {(sixGod || najia || relative) && (
          <div className="line-chip-row">
            {sixGod ? <span className="mini-chip">{sixGod}</span> : null}
            {najia ? <span className="mini-chip">{najia}</span> : null}
            {relative ? <span className="mini-chip">{relative}</span> : null}
          </div>
        )}
      </div>

      <div className="line-side-tags">
        {shi ? <span className="line-pill">{"\u4e16"}</span> : null}
        {ying ? <span className="line-pill">{"\u5e94"}</span> : null}
        <span className="moving-marker">{mode === "original" ? detail.marker || "\u2014" : "\u2192"}</span>
      </div>
    </div>
  );
}
