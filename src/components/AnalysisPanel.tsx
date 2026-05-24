import { RuleHitList } from "./RuleHitList.tsx";
import { ruleEngine } from "../lib/ruleEngine.ts";
import type { QuestionCategory } from "../types/index.ts";

interface AnalysisPanelProps {
  category: QuestionCategory;
}

export function AnalysisPanel({ category }: AnalysisPanelProps) {
  const hits = ruleEngine(category);

  return (
    <section className="panel-card">
      <h2>第一版分析面板</h2>
      <div className="analysis-grid">
        <div className="analysis-item">
          <strong>占事分类</strong>
          <span>{category.label}</span>
        </div>
        <div className="analysis-item">
          <strong>主用神</strong>
          <span>{category.primaryYongShen}</span>
        </div>
        <div className="analysis-item">
          <strong>辅助参考</strong>
          <span>{category.secondaryReferences.join("、")}</span>
        </div>
        <div className="analysis-item">
          <strong>说明</strong>
          <span>{category.notes}</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <RuleHitList hits={hits} />
      </div>
    </section>
  );
}

