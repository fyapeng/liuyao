import { HexagramDisplay } from "./HexagramDisplay.tsx";
import { HexagramMetaBoard } from "./HexagramMetaBoard.tsx";
import { LineDetailLedger } from "./LineDetailLedger.tsx";
import { getNajia } from "../lib/getNajia.ts";
import { getShiYing } from "../lib/getShiYing.ts";
import { getSixGods } from "../lib/getSixGods.ts";
import { getSixRelatives } from "../lib/getSixRelatives.ts";
import { buildHexagramResult } from "../lib/getHexagramName.ts";
import type { DayStem, QuestionCategoryKey } from "../types/index.ts";

interface HexagramResultProps {
  result: ReturnType<typeof buildHexagramResult>;
  question: string;
  selectedCategory: QuestionCategoryKey;
  dayStem: DayStem;
}

export function HexagramResult({ result, question, selectedCategory, dayStem }: HexagramResultProps) {
  const shiYing = getShiYing(result.originalHexagram?.key ?? null, result.originalLines);
  const najia = getNajia(result.originalLines);
  const sixGods = getSixGods(result.originalLines, dayStem).gods;
  const relatives = getSixRelatives(result.originalLines, result.originalHexagram?.key ?? null);
  const movingLinesText = result.movingLinePositions.length > 0 ? `${result.movingLinePositions.join("、")}爻` : "无动爻";

  return (
    <>
      <section className="panel-card result-panel">
        <div className="section-head">
          <div>
            <p className="section-kicker">Hexagram Output</p>
            <h2>排盘结果</h2>
          </div>
          <div className="tag-row">
            <span className="tag">分类：{selectedCategory}</span>
            <span className="tag">动爻：{movingLinesText}</span>
          </div>
        </div>

        {question ? <p className="muted-text">占事问题：{question}</p> : null}

        <div className="hexagram-pair">
          <HexagramDisplay
            title="本卦"
            hexagram={result.originalHexagram}
            details={result.details}
            mode="original"
            shi={shiYing.shi}
            ying={shiYing.ying}
            sixGods={sixGods}
            najiaAssignments={najia.assignments}
            relativeAssignments={relatives.relatives}
          />
          <HexagramDisplay
            title="变卦"
            hexagram={result.changedHexagram}
            details={result.details}
            mode="changed"
            shi={shiYing.shi}
            ying={shiYing.ying}
            sixGods={sixGods}
            najiaAssignments={najia.assignments}
            relativeAssignments={relatives.relatives}
          />
        </div>
      </section>

      <LineDetailLedger
        details={result.details}
        dayStem={dayStem}
        sixGods={sixGods}
        najiaAssignments={najia.assignments}
        relativeAssignments={relatives.relatives}
      />

      <HexagramMetaBoard
        originalName={result.originalHexagram?.name ?? "未知卦"}
        changedName={result.changedHexagram?.name ?? "未知卦"}
        originalUpper={result.originalHexagram?.upperTrigram ?? "-"}
        originalLower={result.originalHexagram?.lowerTrigram ?? "-"}
        changedUpper={result.changedHexagram?.upperTrigram ?? "-"}
        changedLower={result.changedHexagram?.lowerTrigram ?? "-"}
        movingLinesText={movingLinesText}
        shiYingMessage={shiYing.message}
        najiaMessage={najia.message}
        relativesMessage={relatives.message}
      />
    </>
  );
}
