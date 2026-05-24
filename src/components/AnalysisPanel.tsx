import { ReadingSummary } from "./ReadingSummary.tsx";
import { RuleHitList } from "./RuleHitList.tsx";
import { TemporalOverview } from "./TemporalOverview.tsx";
import { ruleEngine } from "../lib/ruleEngine.ts";
import { buildYongShenProfile } from "../lib/yongShen.ts";
import type { QuestionCategory, RuleEngineContext } from "../types/index.ts";

interface AnalysisPanelProps {
  category: QuestionCategory;
  context: RuleEngineContext;
}

export function AnalysisPanel({ category, context }: AnalysisPanelProps) {
  const hits = ruleEngine(context);
  const yongShenProfile = buildYongShenProfile(context);
  const yongShenMatches = yongShenProfile.yongShenMatches;
  const yongShenSummary =
    yongShenMatches.length > 0
      ? yongShenMatches
          .map((item) => `\u7b2c${item.line}\u723b${item.isMoving ? "\u00b7\u52a8" : "\u00b7\u9759"}`)
          .join("\u3001")
      : "\u5f53\u524d\u5c1a\u672a\u5b9a\u4f4d\u5230\u660e\u786e\u843d\u723b";
  const roleSummary =
    yongShenProfile.roleMatches.length > 0
      ? yongShenProfile.roleMatches
          .map((item) => `\u7b2c${item.line}\u723b${item.role}`)
          .join("\u3001")
      : "\u5f53\u524d\u5c1a\u672a\u62c6\u51fa\u5143\u795e\u3001\u5fcc\u795e\u4e0e\u4ec7\u795e\u840c\u82bd";
  const statusSummary = yongShenProfile.statusSummary.join("\u3002") || "\u7528\u795e\u4e0e\u65f6\u4ee4\u5173\u7cfb\u5df2\u63a5\u5165\uff0c\u53ef\u7ed3\u5408\u4e0b\u65b9\u547d\u4e2d\u7ee7\u7eed\u8bfb\u3002";

  return (
    <section className="panel-card ornate-panel analysis-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Assistive Reading</p>
          <h2>{"\u7b2c\u4e00\u7248\u5206\u6790\u9762\u677f"}</h2>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="analysis-item">
          <strong>{"\u5360\u4e8b\u5206\u7c7b"}</strong>
          <span>{category.label}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u4e3b\u7528\u795e"}</strong>
          <span>{category.primaryYongShen}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u8f85\u52a9\u53c2\u8003"}</strong>
          <span>{category.secondaryReferences.join("\u3001")}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u7528\u795e\u843d\u723b"}</strong>
          <span>{yongShenSummary}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u5143\u5fcc\u4ec7\u795e"}</strong>
          <span>{roleSummary}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u7528\u795e\u6001\u52bf"}</strong>
          <span>{statusSummary}</span>
        </div>
        <div className="analysis-item">
          <strong>{"\u8bf4\u660e"}</strong>
          <span>{category.notes}</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <ReadingSummary
          hits={hits}
          favorableFactors={yongShenProfile.favorableFactors}
          unfavorableFactors={yongShenProfile.unfavorableFactors}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <TemporalOverview profile={context.temporalProfile} />
      </div>

      <div style={{ marginTop: 16 }}>
        <RuleHitList hits={hits} />
      </div>
    </section>
  );
}
