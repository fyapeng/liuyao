"use client";

import { useMemo, useState } from "react";
import { AnalysisPanel } from "../src/components/AnalysisPanel.tsx";
import { CoinSelector } from "../src/components/CoinSelector.tsx";
import { HexagramResult } from "../src/components/HexagramResult.tsx";
import { QuestionForm } from "../src/components/QuestionForm.tsx";
import { RandomCastButton } from "../src/components/RandomCastButton.tsx";
import { QUESTION_CATEGORIES } from "../src/data/questionCategories.ts";
import { generateRandomCoinSelections } from "../src/lib/castHexagram.ts";
import { buildHexagramResult } from "../src/lib/getHexagramName.ts";
import type { CoinSelection, QuestionCategoryKey } from "../src/types/index.ts";

const defaultSelections: CoinSelection[] = [
  "字字花",
  "字字花",
  "字字花",
  "字字花",
  "字字花",
  "字字花"
];

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<QuestionCategoryKey>("论文投稿");
  const [selections, setSelections] = useState<CoinSelection[]>(defaultSelections);

  const result = useMemo(() => buildHexagramResult(selections), [selections]);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Liuyao Casting System v1</p>
          <h1>六爻排盘与规则辅助分析系统</h1>
          <p className="hero-text">
            第一版聚焦准确排卦、动爻标记、变卦生成与可扩展架构，方便后续继续接入纳甲、六亲、世应、六神与规则命中分析。
          </p>
        </div>
        <RandomCastButton onGenerate={() => setSelections(generateRandomCoinSelections())} />
      </section>

      <section className="content-grid">
        <div className="stack-column">
          <QuestionForm
            categories={QUESTION_CATEGORIES}
            question={question}
            selectedCategory={category}
            onQuestionChange={setQuestion}
            onCategoryChange={setCategory}
          />
          <CoinSelector selections={selections} onChange={setSelections} />
        </div>

        <div className="stack-column">
          <HexagramResult result={result} question={question} selectedCategory={category} />
          <AnalysisPanel category={QUESTION_CATEGORIES[category]} />
        </div>
      </section>

      <section className="footer-grid">
        <div className="placeholder-card">
          <h2>规则分析</h2>
          <p>规则命中、有利因素、不利因素分析将在后续版本加入。</p>
        </div>
        <div className="placeholder-card">
          <h2>案例记录</h2>
          <p>后续将支持保存占例、复盘过程与规则命中记录。</p>
        </div>
      </section>
    </main>
  );
}
