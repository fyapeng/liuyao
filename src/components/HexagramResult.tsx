import { HexagramDisplay } from "./HexagramDisplay.tsx";
import { buildHexagramResult } from "../lib/getHexagramName.ts";
import type { QuestionCategoryKey } from "../types/index.ts";

interface HexagramResultProps {
  result: ReturnType<typeof buildHexagramResult>;
  question: string;
  selectedCategory: QuestionCategoryKey;
}

export function HexagramResult({ result, question, selectedCategory }: HexagramResultProps) {
  return (
    <section className="panel-card">
      <h2>排盘结果</h2>
      <div className="tag-row" style={{ marginTop: 12, marginBottom: 16 }}>
        <span className="tag">分类：{selectedCategory}</span>
        <span className="tag">动爻：{result.movingLinePositions.length > 0 ? result.movingLinePositions.join("、") + "爻" : "无动爻"}</span>
      </div>

      {question ? <p className="muted-text">占事问题：{question}</p> : null}

      <div className="hexagram-pair">
        <HexagramDisplay title="本卦" hexagram={result.originalHexagram} details={result.details} mode="original" />
        <HexagramDisplay title="变卦" hexagram={result.changedHexagram} details={result.details} mode="changed" />
      </div>
    </section>
  );
}
