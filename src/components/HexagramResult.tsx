import { HexagramDisplay } from "./HexagramDisplay.tsx";
import { HexagramMetaBoard } from "./HexagramMetaBoard.tsx";
import { LineDetailLedger } from "./LineDetailLedger.tsx";
import type {
  DayStem,
  NajiaAssignment,
  QuestionCategoryKey,
  ShiYingInfo,
  SixGodAssignment,
  SixRelativeAssignment,
  TemporalProfile,
  TimeContext
} from "../types/index.ts";
import { buildHexagramResult } from "../lib/getHexagramName.ts";

interface HexagramResultProps {
  result: ReturnType<typeof buildHexagramResult>;
  question: string;
  selectedCategory: QuestionCategoryKey;
  dayStem: DayStem;
  timeContext: TimeContext;
  shiYing: ShiYingInfo;
  najiaAssignments: NajiaAssignment[];
  sixGods: SixGodAssignment[];
  relativeAssignments: SixRelativeAssignment[];
  temporalProfile: TemporalProfile;
  yongShenLines: number[];
}

export function HexagramResult({
  result,
  question,
  selectedCategory,
  dayStem,
  timeContext,
  shiYing,
  najiaAssignments,
  sixGods,
  relativeAssignments,
  temporalProfile,
  yongShenLines
}: HexagramResultProps) {
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
            <span className="tag">{`\u65e5\u8fb0\uff1a${timeContext.dayGanzhi}`}</span>
            <span className="tag">{`\u6708\u5efa\uff1a${timeContext.monthBuild}`}</span>
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
            yongShenLines={yongShenLines}
            sixGods={sixGods}
            najiaAssignments={najiaAssignments}
            relativeAssignments={relativeAssignments}
          />
          <HexagramDisplay
            title="\u53d8\u5366"
            hexagram={result.changedHexagram}
            details={result.details}
            mode="changed"
            shi={shiYing.shi}
            ying={shiYing.ying}
            yongShenLines={yongShenLines}
            sixGods={sixGods}
            najiaAssignments={najiaAssignments}
            relativeAssignments={relativeAssignments}
          />
        </div>
      </section>

      <LineDetailLedger
        details={result.details}
        dayStem={dayStem}
        sixGods={sixGods}
        najiaAssignments={najiaAssignments}
        relativeAssignments={relativeAssignments}
        yongShenLines={yongShenLines}
        temporalStatuses={temporalProfile.lineStatuses}
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
        najiaMessage={`\u65e5\u8fb0 ${timeContext.dayGanzhi}\uff0c\u65ec\u7a7a ${timeContext.voidBranches.join("\u3001")}\u3002`}
        relativesMessage={`\u6708\u5efa ${timeContext.monthBuild}\uff0c${timeContext.monthBuildDetail}\uff0c\u5e76\u5df2\u8054\u52a8\u9010\u723b\u65fa\u8870\u4e0e\u51b2\u5408\u63d0\u793a\u3002`}
        palaceSummary={palaceSummary}
      />
    </>
  );
}
