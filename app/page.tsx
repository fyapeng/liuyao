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

const defaultSelections: CoinSelection[] = ["字字花", "字字花", "字字花", "字字花", "字字花", "字字花"];
const exampleSelections: CoinSelection[] = ["字字花", "字字花", "花花花", "字字花", "字花花", "字花花"];

export default function HomePage() {
  const [question, setQuestion] = useState("这篇论文这一轮投稿是否能顺利推进？");
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
            当前版本聚焦准确排卦、动爻识别、变卦生成与结构化展示，适合作为 GitHub Pages 上的在线演示站，也为后续纳甲、世应、六亲、六神与规则命中分析预留了清晰扩展位。
          </p>
          <div className="control-row" style={{ marginTop: 16 }}>
            <button
              className="selector-chip"
              type="button"
              onClick={() => {
                setCategory("论文投稿");
                setQuestion("这篇论文这一轮投稿是否能顺利推进？");
                setSelections(exampleSelections);
              }}
            >
              加载示例卦
            </button>
            <button
              className="selector-chip"
              type="button"
              onClick={() => {
                setCategory("其它杂占");
                setQuestion("");
                setSelections(defaultSelections);
              }}
            >
              重置排盘
            </button>
          </div>
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
          <p>后续将支持保存占例、复盘过程与规则命中记录，便于长期积累样本与自学。</p>
        </div>
      </section>
    </main>
  );
}

