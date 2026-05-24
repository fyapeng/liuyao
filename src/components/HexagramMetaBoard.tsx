interface HexagramMetaBoardProps {
  originalName: string;
  changedName: string;
  originalUpper: string;
  originalLower: string;
  changedUpper: string;
  changedLower: string;
  movingLinesText: string;
  shiYingMessage: string;
  najiaMessage: string;
  relativesMessage: string;
}

export function HexagramMetaBoard({
  originalName,
  changedName,
  originalUpper,
  originalLower,
  changedUpper,
  changedLower,
  movingLinesText,
  shiYingMessage,
  najiaMessage,
  relativesMessage
}: HexagramMetaBoardProps) {
  return (
    <section className="panel-card ornate-panel meta-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Casting Metadata</p>
          <h2>排盘扩展信息</h2>
        </div>
      </div>

      <div className="meta-grid">
        <div className="meta-card">
          <span className="meta-label">本卦结构</span>
          <strong>{originalName}</strong>
          <p>上卦：{originalUpper} 下卦：{originalLower}</p>
        </div>
        <div className="meta-card">
          <span className="meta-label">变卦结构</span>
          <strong>{changedName}</strong>
          <p>上卦：{changedUpper} 下卦：{changedLower}</p>
        </div>
        <div className="meta-card">
          <span className="meta-label">动爻摘要</span>
          <strong>{movingLinesText}</strong>
          <p>本卦侧已高亮世应与动爻，便于快速读盘。</p>
        </div>
      </div>

      <div className="placeholder-stack">
        <div className="placeholder-note">
          <strong>世应</strong>
          <span>{shiYingMessage}</span>
        </div>
        <div className="placeholder-note">
          <strong>纳甲</strong>
          <span>{najiaMessage}</span>
        </div>
        <div className="placeholder-note">
          <strong>六亲</strong>
          <span>{relativesMessage}</span>
        </div>
      </div>
    </section>
  );
}
