import type { RuleHit } from "../types/index.ts";

interface RuleHitListProps {
  hits: RuleHit[];
}

const TYPE_LABELS: Record<RuleHit["type"], string> = {
  favorable: "\u6709\u5229\u63d0\u793a",
  unfavorable: "\u4e0d\u5229\u63d0\u793a",
  info: "\u8bfb\u76d8\u63d0\u793a"
};

export function RuleHitList({ hits }: RuleHitListProps) {
  return (
    <div className="rule-hit-list">
      {hits.map((hit) => (
        <div key={hit.id} className={`analysis-item rule-hit rule-hit-${hit.type}`}>
          <div className="rule-hit-head">
            <strong>{hit.title}</strong>
            <span className="mini-chip">{TYPE_LABELS[hit.type]}</span>
          </div>
          <span className="muted-text">{hit.description}</span>
        </div>
      ))}
    </div>
  );
}
