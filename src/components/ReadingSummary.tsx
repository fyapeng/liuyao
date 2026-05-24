import type { RuleHit } from "../types/index.ts";

interface ReadingSummaryProps {
  hits: RuleHit[];
  favorableFactors?: string[];
  unfavorableFactors?: string[];
}

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function buildFactorList(hits: RuleHit[], type: RuleHit["type"], externalFactors: string[] = []) {
  return unique([
    ...externalFactors,
    ...hits
      .filter((item) => item.type === type)
      .map((item) => item.title)
  ]).slice(0, 4);
}

export function ReadingSummary({ hits, favorableFactors = [], unfavorableFactors = [] }: ReadingSummaryProps) {
  const favorableList = buildFactorList(hits, "favorable", favorableFactors);
  const unfavorableList = buildFactorList(hits, "unfavorable", unfavorableFactors);

  return (
    <div className="reading-summary-grid">
      <article className="summary-card summary-card-favorable">
        <span className="summary-label">{"\u6709\u5229\u56e0\u7d20"}</span>
        <strong>{favorableList.length > 0 ? `${favorableList.length} \u9879` : "\u6682\u65e0\u7a81\u51fa"}</strong>
        <div className="summary-list">
          {favorableList.length > 0 ? (
            favorableList.map((item) => (
              <p key={item}>{item}</p>
            ))
          ) : (
            <p>{"\u76ee\u524d\u8fd8\u6ca1\u6709\u51fa\u73b0\u660e\u786e\u7684\u589e\u76ca\u4fe1\u53f7\u3002"}</p>
          )}
        </div>
      </article>

      <article className="summary-card summary-card-unfavorable">
        <span className="summary-label">{"\u4e0d\u5229\u56e0\u7d20"}</span>
        <strong>{unfavorableList.length > 0 ? `${unfavorableList.length} \u9879` : "\u6682\u65e0\u7a81\u51fa"}</strong>
        <div className="summary-list">
          {unfavorableList.length > 0 ? (
            unfavorableList.map((item) => (
              <p key={item}>{item}</p>
            ))
          ) : (
            <p>{"\u76ee\u524d\u8fd8\u6ca1\u6709\u51fa\u73b0\u660e\u786e\u7684\u51cf\u5206\u4fe1\u53f7\u3002"}</p>
          )}
        </div>
      </article>
    </div>
  );
}
