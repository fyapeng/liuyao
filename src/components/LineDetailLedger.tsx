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
          <h2>逐爻明细</h2>
        </div>
        <div className="tag-row">
          <span className="tag">起六神日干：{dayStem}</span>
        </div>
      </div>

      <div className="ledger-table">
        <div className="ledger-row ledger-head">
          <span>爻位</span>
          <span>硬币</span>
          <span>数值</span>
          <span>六神</span>
          <span>纳甲</span>
          <span>六亲</span>
          <span>动静</span>
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
              <span>{sixGod?.label ?? "-"}</span>
              <span>{najia ? `${najia.branch}${najia.branchElement}` : "-"}</span>
              <span>{relative?.relative ?? "-"}</span>
              <span>{detail.isMoving ? `动 ${detail.marker}` : "静"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
