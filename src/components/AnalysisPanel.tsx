import { RuleHitList } from "./RuleHitList.tsx";
import { ruleEngine } from "../lib/ruleEngine.ts";
import type { QuestionCategory, RuleEngineContext } from "../types/index.ts";

interface AnalysisPanelProps {
  category: QuestionCategory;
  context: RuleEngineContext;
}

export function AnalysisPanel({ category, context }: AnalysisPanelProps) {
  const hits = ruleEngine(context);

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
          <strong>{"\u8bf4\u660e"}</strong>
          <span>{category.notes}</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <RuleHitList hits={hits} />
      </div>
    </section>
  );
}
