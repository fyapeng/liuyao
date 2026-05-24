"use client";

import { useMemo, useState } from "react";
import { AnalysisPanel } from "../src/components/AnalysisPanel.tsx";
import { CoinSelector } from "../src/components/CoinSelector.tsx";
import { HexagramResult } from "../src/components/HexagramResult.tsx";
import { QuestionForm } from "../src/components/QuestionForm.tsx";
import { RandomCastButton } from "../src/components/RandomCastButton.tsx";
import { QUESTION_CATEGORIES } from "../src/data/questionCategories.ts";
import {
  coinLinesToSelections,
  generateRandomCoinLines,
  selectionToCoinFaces
} from "../src/lib/castHexagram.ts";
import { buildHexagramResult } from "../src/lib/getHexagramName.ts";
import type { CoinFace, CoinSelection, DayStem, QuestionCategoryKey } from "../src/types/index.ts";

const defaultSelections: CoinSelection[] = ["字字花", "字字花", "字字花", "字字花", "字字花", "字字花"];
const exampleSelections: CoinSelection[] = ["字字花", "字字花", "花花花", "字字花", "字花花", "字花花"];

function selectionsToCoinLines(selections: CoinSelection[]): [CoinFace, CoinFace, CoinFace][] {
  return selections.map(selectionToCoinFaces);
}

export default function HomePage() {
  const [question, setQuestion] = useState("这篇论文这一轮投稿是否能顺利推进？");
  const [category, setCategory] = useState<QuestionCategoryKey>("论文投稿");
  const [dayStem, setDayStem] = useState<DayStem>("甲");
  const [coinLines, setCoinLines] = useState<[CoinFace, CoinFace, CoinFace][]>(selectionsToCoinLines(defaultSelections));

  const selections = useMemo(() => coinLinesToSelections(coinLines), [coinLines]);
  const result = useMemo(() => buildHexagramResult(selections), [selections]);

  return (
    <main className="page-shell">
      <section className="hero-stage">
        <div className="hero-ornament hero-ornament-left" />
        <div className="hero-ornament hero-ornament-right" />

        <div className="hero-card hero-main">
          <div className="hero-copy">
            <p className="eyebrow">Liuyao Casting System v1</p>
            <h1>六爻排盘，不止是算出一卦，更要看清每一次起势。</h1>
            <p className="hero-text">
              这一版把起卦体验做得更像真实桌面操作：逐枚落币、自动合并成爻、即时生成本卦与变卦，并开始展示世应、纳甲、六亲与六神等基础排盘信息。
            </p>

            <div className="hero-actions">
              <RandomCastButton onGenerate={() => setCoinLines(generateRandomCoinLines())} />
              <button
                className="selector-chip"
                type="button"
                onClick={() => {
                  setCategory("论文投稿");
                  setQuestion("这篇论文这一轮投稿是否能顺利推进？");
                  setDayStem("甲");
                  setCoinLines(selectionsToCoinLines(exampleSelections));
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
                  setDayStem("甲");
                  setCoinLines(selectionsToCoinLines(defaultSelections));
                }}
              >
                重置排盘
              </button>
            </div>
          </div>

          <div className="hero-aside">
            <div className="stat-card">
              <span className="stat-label">当前动爻</span>
              <strong>{result.movingLinePositions.length > 0 ? `${result.movingLinePositions.join("、")}爻` : "无动爻"}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">本卦</span>
              <strong>{result.originalHexagram?.name ?? "未知卦"}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">变卦</span>
              <strong>{result.changedHexagram?.name ?? "未知卦"}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="stack-column">
          <QuestionForm
            categories={QUESTION_CATEGORIES}
            question={question}
            selectedCategory={category}
            dayStem={dayStem}
            onQuestionChange={setQuestion}
            onCategoryChange={setCategory}
            onDayStemChange={setDayStem}
          />
          <CoinSelector coinLines={coinLines} onChange={(value) => setCoinLines(value as [CoinFace, CoinFace, CoinFace][])} />
        </div>

        <div className="stack-column">
          <HexagramResult result={result} question={question} selectedCategory={category} dayStem={dayStem} />
          <AnalysisPanel category={QUESTION_CATEGORIES[category]} />
        </div>
      </section>

      <section className="footer-grid">
        <div className="placeholder-card">
          <h2>规则分析</h2>
          <p>规则命中、有利因素、不利因素分析将在后续版本加入，当前已为排盘层打好数据基础。</p>
        </div>
        <div className="placeholder-card">
          <h2>案例记录</h2>
          <p>后续将支持保存占例、复盘过程与命中规则，适合长期积累个人案例库。</p>
        </div>
      </section>
    </main>
  );
}
