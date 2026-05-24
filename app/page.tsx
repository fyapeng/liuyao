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
import { getShiYing } from "../src/lib/getShiYing.ts";
import { getSixRelatives } from "../src/lib/getSixRelatives.ts";
import type { CoinFace, CoinSelection, DayStem, QuestionCategoryKey, RuleEngineContext } from "../src/types/index.ts";

const defaultSelections: CoinSelection[] = [
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1"
];
const exampleSelections: CoinSelection[] = [
  "\u5b57\u5b57\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u82b1\u82b1\u82b1",
  "\u5b57\u5b57\u82b1",
  "\u5b57\u82b1\u82b1",
  "\u5b57\u82b1\u82b1"
];

function selectionsToCoinLines(selections: CoinSelection[]): [CoinFace, CoinFace, CoinFace][] {
  return selections.map(selectionToCoinFaces);
}

export default function HomePage() {
  const [question, setQuestion] = useState("\u8fd9\u7bc7\u8bba\u6587\u8fd9\u4e00\u8f6e\u6295\u7a3f\u662f\u5426\u80fd\u987a\u5229\u63a8\u8fdb\uff1f");
  const [category, setCategory] = useState<QuestionCategoryKey>("\u8bba\u6587\u6295\u7a3f");
  const [dayStem, setDayStem] = useState<DayStem>("\u7532");
  const [coinLines, setCoinLines] = useState<[CoinFace, CoinFace, CoinFace][]>(selectionsToCoinLines(defaultSelections));

  const selections = useMemo(() => coinLinesToSelections(coinLines), [coinLines]);
  const result = useMemo(() => buildHexagramResult(selections), [selections]);
  const shiYing = useMemo(
    () => getShiYing(result.originalHexagram?.key ?? null, result.originalLines),
    [result.originalHexagram?.key, result.originalLines]
  );
  const relatives = useMemo(
    () => getSixRelatives(result.originalLines, result.originalHexagram?.key ?? null),
    [result.originalHexagram?.key, result.originalLines]
  );

  const analysisContext: RuleEngineContext = {
    categoryKey: category,
    primaryYongShen: QUESTION_CATEGORIES[category].primaryYongShen,
    movingLinePositions: result.movingLinePositions,
    shiYing,
    relatives: relatives.relatives,
    details: result.details
  };

  return (
    <main className="page-shell">
      <section className="hero-stage">
        <div className="hero-ornament hero-ornament-left" />
        <div className="hero-ornament hero-ornament-right" />

        <div className="hero-card hero-main">
          <div className="hero-copy">
            <p className="eyebrow">Liuyao Casting System v1</p>
            <h1>{"\u516d\u723b\u6392\u76d8\uff0c\u4e0d\u6b62\u662f\u7b97\u51fa\u4e00\u5366\uff0c\u66f4\u8981\u770b\u6e05\u6bcf\u4e00\u6b21\u8d77\u52bf\u3002"}</h1>
            <p className="hero-text">
              {
                "\u8fd9\u4e00\u7248\u5df2\u7ecf\u628a\u57fa\u7840\u6392\u76d8\u4fe1\u606f\u4e32\u8d77\u6765\u4e86\uff1a\u9010\u679a\u843d\u5e01\u3001\u81ea\u52a8\u751f\u6210\u672c\u5366\u4e0e\u53d8\u5366\uff0c\u5e76\u540c\u6b65\u5c55\u793a\u4e16\u5e94\u3001\u7eb3\u7532\u3001\u516d\u4eb2\u3001\u516d\u795e\u4e0e\u7b2c\u4e00\u7248\u89c4\u5219\u547d\u4e2d\u63d0\u793a\u3002"
              }
            </p>

            <div className="hero-actions">
              <RandomCastButton onGenerate={() => setCoinLines(generateRandomCoinLines())} />
              <button
                className="selector-chip"
                type="button"
                onClick={() => {
                  setCategory("\u8bba\u6587\u6295\u7a3f");
                  setQuestion("\u8fd9\u7bc7\u8bba\u6587\u8fd9\u4e00\u8f6e\u6295\u7a3f\u662f\u5426\u80fd\u987a\u5229\u63a8\u8fdb\uff1f");
                  setDayStem("\u7532");
                  setCoinLines(selectionsToCoinLines(exampleSelections));
                }}
              >
                {"\u52a0\u8f7d\u793a\u4f8b\u5366"}
              </button>
              <button
                className="selector-chip"
                type="button"
                onClick={() => {
                  setCategory("\u5176\u5b83\u6742\u5360");
                  setQuestion("");
                  setDayStem("\u7532");
                  setCoinLines(selectionsToCoinLines(defaultSelections));
                }}
              >
                {"\u91cd\u7f6e\u6392\u76d8"}
              </button>
            </div>
          </div>

          <div className="hero-aside">
            <div className="stat-card">
              <span className="stat-label">{"\u5f53\u524d\u52a8\u723b"}</span>
              <strong>
                {result.movingLinePositions.length > 0
                  ? `${result.movingLinePositions.join("\u3001")}\u723b`
                  : "\u65e0\u52a8\u723b"}
              </strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">{"\u672c\u5366"}</span>
              <strong>{result.originalHexagram?.name ?? "\u672a\u77e5\u5366"}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">{"\u53d8\u5366"}</span>
              <strong>{result.changedHexagram?.name ?? "\u672a\u77e5\u5366"}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="stack-column stack-inputs">
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

        <div className="stack-column stack-results">
          <HexagramResult result={result} question={question} selectedCategory={category} dayStem={dayStem} />
          <AnalysisPanel category={QUESTION_CATEGORIES[category]} context={analysisContext} />
        </div>
      </section>

      <section className="footer-grid">
        <div className="placeholder-card">
          <h2>{"\u89c4\u5219\u5206\u6790"}</h2>
          <p>
            {
              "\u5f53\u524d\u7248\u672c\u5df2\u7ecf\u5f00\u59cb\u8f93\u51fa\u57fa\u7840\u89c4\u5219\u547d\u4e2d\uff0c\u540e\u7eed\u4f1a\u7ee7\u7eed\u52a0\u5165\u65e5\u6708\u65fa\u8870\u3001\u7a7a\u4ea1\u3001\u5408\u51b2\u5211\u5bb3\u7b49\u5c42\u9762\u7684\u63d0\u793a\u3002"
            }
          </p>
        </div>
        <div className="placeholder-card">
          <h2>{"\u6848\u4f8b\u8bb0\u5f55"}</h2>
          <p>
            {
              "\u540e\u7eed\u5c06\u652f\u6301\u4fdd\u5b58\u5360\u4f8b\u3001\u590d\u76d8\u8fc7\u7a0b\u4e0e\u547d\u4e2d\u89c4\u5219\uff0c\u9002\u5408\u957f\u671f\u79ef\u7d2f\u4e2a\u4eba\u6848\u4f8b\u5e93\u3002"
            }
          </p>
        </div>
      </section>
    </main>
  );
}
