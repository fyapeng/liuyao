import type {
  CastLineDetail,
  DayStem,
  NajiaAssignment,
  SixGodAssignment,
  SixRelativeAssignment
} from "../types/index.ts";

interface LineDetailLedgerProps {
  details: CastLineDetail[];
  dayStem: DayStem;
  sixGods: SixGodAssignment[];
  najiaAssignments: NajiaAssignment[];
  relativeAssignments: SixRelativeAssignment[];
}

export function LineDetailLedger({
  details,
  dayStem,
  sixGods,
  najiaAssignments,
  relativeAssignments
}: LineDetailLedgerProps) {
  return (
    <section className="panel-card ledger-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Line Ledger</p>
          <h2>{"\u9010\u723b\u660e\u7ec6"}</h2>
        </div>
        <div className="tag-row">
          <span className="tag">{`\u8d77\u516d\u795e\u65e5\u5e72\uff1a${dayStem}`}</span>
        </div>
      </div>

      <div className="ledger-scroll">
        <div className="ledger-table">
          <div className="ledger-row ledger-head">
            <span>{"\u723b\u4f4d"}</span>
            <span>{"\u786c\u5e01"}</span>
            <span>{"\u6570\u503c"}</span>
            <span>{"\u540d\u79f0"}</span>
            <span>{"\u516d\u795e"}</span>
            <span>{"\u7eb3\u7532"}</span>
            <span>{"\u516d\u4eb2"}</span>
            <span>{"\u52a8\u9759"}</span>
          </div>

          {[...details].reverse().map((detail) => {
            const sixGod = sixGods.find((item) => item.line === detail.position);
            const najia = najiaAssignments.find((item) => item.line === detail.position);
            const relative = relativeAssignments.find((item) => item.line === detail.position);

            return (
              <div key={detail.position} className="ledger-row">
                <span>{detail.positionName}</span>
                <span>{detail.label}</span>
                <span>{detail.value}</span>
                <span>{detail.name}</span>
                <span>{sixGod?.label ?? "-"}</span>
                <span>{najia ? `${najia.branch}${najia.branchElement}` : "-"}</span>
                <span>{relative?.relative ?? "-"}</span>
                <span>{detail.isMoving ? `\u52a8 ${detail.marker}` : "\u9759"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
