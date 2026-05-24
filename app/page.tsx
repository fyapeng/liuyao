"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getNajia } from "../src/lib/getNajia.ts";
import { getShiYing } from "../src/lib/getShiYing.ts";
import { getSixGods } from "../src/lib/getSixGods.ts";
import { getSixRelatives } from "../src/lib/getSixRelatives.ts";
import { buildTemporalProfile } from "../src/lib/temporalProfile.ts";
import { buildTimeContext } from "../src/lib/timeContext.ts";
import { resolveYongShenMatches } from "../src/lib/yongShen.ts";
import type { CoinFace, CoinSelection, QuestionCategoryKey, RuleEngineContext, TimeContext } from "../src/types/index.ts";

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

const defaultQuestion = "\u8fd9\u7bc7\u8bba\u6587\u8fd9\u4e00\u8f6e\u6295\u7a3f\u662f\u5426\u80fd\u987a\u5229\u63a8\u8fdb\uff1f";

function selectionsToCoinLines(selections: CoinSelection[]): [CoinFace, CoinFace, CoinFace][] {
  return selections.map(selectionToCoinFaces);
}

export default function HomePage() {
  const [question, setQuestion] = useState(defaultQuestion);
  const [category, setCategory] = useState<QuestionCategoryKey>("\u8bba\u6587\u6295\u7a3f");
  const [coinLines, setCoinLines] = useState<[CoinFace, CoinFace, CoinFace][]>(selectionsToCoinLines(defaultSelections));
  const [timeContext, setTimeContext] = useState<TimeContext | null>(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    setTimeContext(buildTimeContext());
  }, []);
  const activeTimeContext = timeContext ?? buildTimeContext(new Date());

  const selections = useMemo(() => coinLinesToSelections(coinLines), [coinLines]);
  const result = useMemo(() => buildHexagramResult(selections), [selections]);
  const shiYing = useMemo(
    () => getShiYing(result.originalHexagram?.key ?? null, result.originalLines),
    [result.originalHexagram?.key, result.originalLines]
  );
  const najia = useMemo(() => getNajia(result.originalLines), [result.originalLines]);
  const relatives = useMemo(
    () => getSixRelatives(result.originalLines, result.originalHexagram?.key ?? null),
    [result.originalHexagram?.key, result.originalLines]
  );
  const sixGods = useMemo(
    () => getSixGods(result.originalLines, activeTimeContext.dayStem).gods,
    [activeTimeContext.dayStem, result.originalLines]
  );
  const temporalProfile = useMemo(() => buildTemporalProfile(activeTimeContext, najia.assignments), [activeTimeContext, najia.assignments]);
  const yongShenMatches = useMemo(
    () =>
      resolveYongShenMatches({
        categoryKey: category,
        primaryYongShen: QUESTION_CATEGORIES[category].primaryYongShen,
        movingLinePositions: result.movingLinePositions,
        shiYing,
        relatives: relatives.relatives,
        details: result.details,
        dayStem: activeTimeContext.dayStem,
        timeContext: activeTimeContext,
        temporalProfile
      }),
    [activeTimeContext, category, relatives.relatives, result.details, result.movingLinePositions, shiYing, temporalProfile]
  );

  const analysisContext: RuleEngineContext = {
    categoryKey: category,
    primaryYongShen: QUESTION_CATEGORIES[category].primaryYongShen,
    movingLinePositions: result.movingLinePositions,
    shiYing,
    relatives: relatives.relatives,
    details: result.details,
    dayStem: activeTimeContext.dayStem,
    timeContext: activeTimeContext,
    temporalProfile
  };

  const yongShenLines = yongShenMatches.map((item) => item.line);

  const applyExample = () => {
    setCategory("\u8bba\u6587\u6295\u7a3f");
    setQuestion(defaultQuestion);
    setCoinLines(selectionsToCoinLines(exampleSelections));
    setTimeContext(buildTimeContext());
    setShowInputs(false);
  };

  const applyRandom = () => {
    setCoinLines(generateRandomCoinLines());
    setTimeContext(buildTimeContext());
    setShowInputs(false);
  };

  const resetBoard = () => {
    setCategory("\u5176\u5b83\u6742\u5360");
    setQuestion("");
    setCoinLines(selectionsToCoinLines(defaultSelections));
    setTimeContext(buildTimeContext());
    setShowInputs(true);
  };

  return (
    <main className="page-shell">
      <section className="hero-stage">
        <div className="hero-ornament hero-ornament-left" />
        <div className="hero-ornament hero-ornament-right" />

        <div className="hero-card hero-main">
          <div className="hero-copy">
            <p className="eyebrow">Liuyao Reading Studio</p>
            <h1>{"\u4e00\u5366\u65e2\u6210\uff0c\u5148\u522b\u6025\u7740\u65ad\u5409\u51f6\uff1b\u8981\u770b\u7528\u795e\u3001\u4e16\u5e94\u4e0e\u65f6\u4ee4\u600e\u6837\u4e00\u8d77\u8d77\u52bf\u3002"}</h1>
            <p className="hero-text">
              {
                "\u672c\u9875\u9762\u5185\u5bb9\u4ec5\u4f9b\u6c11\u4fd7\u6587\u5316\u4f53\u9a8c\u4e0e\u5a31\u4e50\u53c2\u8003\uff0c\u4e0d\u66ff\u4ee3\u73b0\u5b9e\u5224\u65ad\u3001\u4e13\u4e1a\u610f\u89c1\u6216\u4efb\u4f55\u533b\u7597\u3001\u6cd5\u5f8b\u3001\u8d22\u52a1\u5efa\u8bae\u3002"
              }
            </p>

            <div className="hero-actions">
              <RandomCastButton onGenerate={applyRandom} />
              <button className="selector-chip" type="button" onClick={applyExample}>
                {"\u52a0\u8f7d\u793a\u4f8b\u5366"}
              </button>
              <button className="selector-chip" type="button" onClick={resetBoard}>
                {"\u91cd\u7f6e\u6392\u76d8"}
              </button>
              <button className="selector-chip" type="button" onClick={() => setShowInputs((value) => !value)}>
                {showInputs ? "\u6536\u8d77\u8bbe\u5b9a\u533a" : "\u4fee\u6539\u5360\u4e8b\u4e0e\u8d77\u5366"}
              </button>
            </div>
          </div>

          <div className="hero-aside">
            <div className="stat-card">
              <span className="stat-label">{"\u5f53\u524d\u52a8\u723b"}</span>
              <strong>
                {result.movingLinePositions.length > 0 ? `${result.movingLinePositions.join("\u3001")}\u723b` : "\u65e0\u52a8\u723b"}
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
            <div className="stat-card">
              <span className="stat-label">{"\u81ea\u52a8\u65f6\u95f4"}</span>
              <strong>{`${activeTimeContext.dayGanzhi}\u65e5`}</strong>
              <span className="stat-subtle">{`${activeTimeContext.solarTermLabel} \u00b7 ${activeTimeContext.monthBuild}\u6708\u5efa \u00b7 \u65ec\u7a7a ${activeTimeContext.voidBranches.join("\u3001")}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`content-grid ${showInputs ? "" : "content-grid-results-only"}`}>
        {showInputs ? (
          <div className="stack-column stack-inputs">
            <QuestionForm
              categories={QUESTION_CATEGORIES}
              question={question}
              selectedCategory={category}
              timeContext={activeTimeContext}
              onQuestionChange={setQuestion}
              onCategoryChange={setCategory}
              onRefreshTime={() => setTimeContext(buildTimeContext())}
            />
            <CoinSelector coinLines={coinLines} onChange={(value) => setCoinLines(value as [CoinFace, CoinFace, CoinFace][])} />
          </div>
        ) : null}

        <div className="stack-column stack-results">
          {!showInputs ? (
            <section className="panel-card compact-intro-card">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Reading Snapshot</p>
                  <h2>{"\u5f53\u524d\u65ad\u76d8\u4f9d\u636e"}</h2>
                </div>
                <button className="selector-chip" type="button" onClick={() => setShowInputs(true)}>
                  {"\u5c55\u5f00\u5360\u4e8b\u4e0e\u8d77\u5366"}
                </button>
              </div>
              <div className="tag-row">
                <span className="tag">{`\u5206\u7c7b\uff1a${category}`}</span>
                <span className="tag">{`\u65e5\u8fb0\uff1a${activeTimeContext.dayGanzhi}`}</span>
                <span className="tag">{`\u6708\u5efa\uff1a${activeTimeContext.monthBuild}`}</span>
                <span className="tag">{`\u8282\u6c14\uff1a${activeTimeContext.solarTermLabel}`}</span>
                <span className="tag">{`\u65ec\u7a7a\uff1a${activeTimeContext.voidBranches.join("\u3001")}`}</span>
              </div>
              {question ? <p className="muted-text">{`\u5360\u4e8b\u95ee\u9898\uff1a${question}`}</p> : null}
            </section>
          ) : null}

          <HexagramResult
            result={result}
            question={question}
            selectedCategory={category}
            dayStem={activeTimeContext.dayStem}
            timeContext={activeTimeContext}
            shiYing={shiYing}
            najiaAssignments={najia.assignments}
            sixGods={sixGods}
            relativeAssignments={relatives.relatives}
            temporalProfile={temporalProfile}
            yongShenLines={yongShenLines}
          />
          <AnalysisPanel category={QUESTION_CATEGORIES[category]} context={analysisContext} />
        </div>
      </section>

      <section className="footer-grid">
        <div className="placeholder-card">
          <h2>{"\u65ad\u76d8\u8fb9\u754c"}</h2>
          <p>
            {
              "\u5f53\u524d\u7cfb\u7edf\u5df2\u7ecf\u63a5\u5165\u81ea\u52a8\u65f6\u95f4\u3001\u6708\u5efa\u3001\u65ec\u7a7a\u3001\u6708\u7834\u4e0e\u57fa\u7840\u5408\u51b2\u5211\u5bb3\u63d0\u793a\uff0c\u4f46\u4ecd\u5e94\u7ed3\u5408\u73b0\u5b9e\u80cc\u666f\u3001\u884c\u52a8\u8282\u594f\u4e0e\u53ef\u9a8c\u8bc1\u4fe1\u606f\u7efc\u5408\u5224\u65ad\u3002"
            }
          </p>
        </div>
        <div className="placeholder-card">
          <h2>{"\u4e0b\u4e00\u6b65\u6269\u5c55"}</h2>
          <p>
            {
              "\u63a5\u4e0b\u6765\u6700\u503c\u5f97\u7ee7\u7eed\u8865\u5f3a\u7684\u662f\u5fcc\u795e\u3001\u5143\u795e\u3001\u4f0f\u795e\u98de\u795e\u3001\u591a\u52a8\u723b\u4f18\u5148\u7ea7\uff0c\u4ee5\u53ca\u6848\u4f8b\u4fdd\u5b58\u3001\u590d\u76d8\u8bb0\u5f55\u548c\u672f\u8bed\u8bf4\u660e\u7b49\u5b8c\u6574\u4ea7\u54c1\u529f\u80fd\u3002"
            }
          </p>
        </div>
      </section>
    </main>
  );
}
