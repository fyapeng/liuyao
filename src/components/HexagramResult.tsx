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
  const movingLinesText = result.movingLinePositions.length > 0 ? `${result.movingLinePositions.join("\u3001")}\u723b` : "\u65e0\u52a8\u723b";
  const palaceSummary =
    shiYing.palace && shiYing.palaceElement
      ? `${shiYing.palace}\u5bab \u00b7 ${shiYing.palaceElement} \u00b7 \u4e16${shiYing.shi} / \u5e94${shiYing.ying}`
      : "\u5bab\u4f4d\u4fe1\u606f\u5f85\u8865\u5145";

  return (
    <>
      <section className="panel-card result-panel">
        <div className="section-head">
          <div>
            <p className="section-kicker">Hexagram Output</p>
            <h2>{"\u6392\u76d8\u7ed3\u679c"}</h2>
          </div>
          <div className="tag-row">
            <span className="tag">{`\u5206\u7c7b\uff1a${selectedCategory}`}</span>
            <span className="tag">{`\u52a8\u723b\uff1a${movingLinesText}`}</span>
          </div>
        </div>

        {question ? <p className="muted-text">{`\u5360\u4e8b\u95ee\u9898\uff1a${question}`}</p> : null}

        <div className="hexagram-pair">
          <HexagramDisplay
            title="\u672c\u5366"
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
            title="\u53d8\u5366"
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
        originalName={result.originalHexagram?.name ?? "\u672a\u77e5\u5366"}
        changedName={result.changedHexagram?.name ?? "\u672a\u77e5\u5366"}
        originalUpper={result.originalHexagram?.upperTrigram ?? "-"}
        originalLower={result.originalHexagram?.lowerTrigram ?? "-"}
        changedUpper={result.changedHexagram?.upperTrigram ?? "-"}
        changedLower={result.changedHexagram?.lowerTrigram ?? "-"}
        movingLinesText={movingLinesText}
        shiYingMessage={shiYing.message}
        najiaMessage={najia.message}
        relativesMessage={relatives.message}
        palaceSummary={palaceSummary}
      />
    </>
  );
}
