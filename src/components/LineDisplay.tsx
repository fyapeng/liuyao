import type { CastLineDetail } from "../types/index.ts";

interface LineDisplayProps {
  detail: CastLineDetail;
  mode: "original" | "changed";
}

export function LineDisplay({ detail, mode }: LineDisplayProps) {
  const bit = mode === "original" ? detail.originalLine : detail.changedLine;

  return (
    <div className="line-display">
      <strong>{detail.positionName}</strong>

      <div>
        <div className="yao-shape" aria-label={bit === 1 ? "阳爻" : "阴爻"}>
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
          {detail.label} = {detail.value} = {detail.name} = {detail.yinYang}爻
          {detail.isMoving ? "动" : "静"}
        </div>
      </div>

      <span className="moving-marker">{mode === "original" ? detail.marker : ""}</span>
    </div>
  );
}
