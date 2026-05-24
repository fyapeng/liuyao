import type { RuleHit } from "../types/index.ts";

interface RuleHitListProps {
  hits: RuleHit[];
}

export function RuleHitList({ hits }: RuleHitListProps) {
  return (
    <div className="analysis-grid">
      {hits.map((hit) => (
        <div key={hit.id} className="analysis-item">
          <strong>{hit.title}</strong>
          <span className="muted-text"> {hit.description}</span>
        </div>
      ))}
    </div>
  );
}
