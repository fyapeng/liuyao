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
  palaceSummary: string;
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
  relativesMessage,
  palaceSummary
}: HexagramMetaBoardProps) {
  return (
    <section className="panel-card ornate-panel meta-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Casting Metadata</p>
          <h2>{"\u6392\u76d8\u6269\u5c55\u4fe1\u606f"}</h2>
        </div>
      </div>

      <div className="meta-grid">
        <div className="meta-card">
          <span className="meta-label">{"\u672c\u5366\u7ed3\u6784"}</span>
          <strong>{originalName}</strong>
          <p>{`\u4e0a\u5366\uff1a${originalUpper} \u4e0b\u5366\uff1a${originalLower}`}</p>
        </div>
        <div className="meta-card">
          <span className="meta-label">{"\u53d8\u5366\u7ed3\u6784"}</span>
          <strong>{changedName}</strong>
          <p>{`\u4e0a\u5366\uff1a${changedUpper} \u4e0b\u5366\uff1a${changedLower}`}</p>
        </div>
        <div className="meta-card">
          <span className="meta-label">{"\u5bab\u4f4d\u4e0e\u52a8\u723b"}</span>
          <strong>{movingLinesText}</strong>
          <p>{palaceSummary}</p>
        </div>
      </div>

      <div className="placeholder-stack">
        <div className="placeholder-note">
          <strong>{"\u4e16\u5e94"}</strong>
          <span>{shiYingMessage}</span>
        </div>
        <div className="placeholder-note">
          <strong>{"\u7eb3\u7532"}</strong>
          <span>{najiaMessage}</span>
        </div>
        <div className="placeholder-note">
          <strong>{"\u516d\u4eb2"}</strong>
          <span>{relativesMessage}</span>
        </div>
      </div>
    </section>
  );
}
