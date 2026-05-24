import { coinFacesToSelection } from "../lib/castHexagram.ts";
import type { CoinFace } from "../types/index.ts";

interface CoinSelectorProps {
  coinLines: CoinFace[][];
  onChange: (value: CoinFace[][]) => void;
}

const lineLabels = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"] as const;

export function CoinSelector({ coinLines, onChange }: CoinSelectorProps) {
  const updateCoin = (lineIndex: number, coinIndex: number, face: CoinFace) => {
    const next = coinLines.map((line) => [...line]) as CoinFace[][];
    next[lineIndex][coinIndex] = face;
    onChange(next);
  };

  const toggleCoin = (lineIndex: number, coinIndex: number) => {
    const current = coinLines[lineIndex][coinIndex];
    updateCoin(lineIndex, coinIndex, current === "字" ? "花" : "字");
  };

  return (
    <section className="panel-card ornate-panel coin-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Manual Casting</p>
          <h2>逐枚选择硬币</h2>
        </div>
        <p className="muted-text">每一爻用三枚硬币表示，共 18 次选择。点击硬币即可在“字 / 花”之间翻面切换。</p>
      </div>

      <div className="coin-line-grid">
        {coinLines.map((line, lineIndex) => {
          const selection = coinFacesToSelection(line);

          return (
            <article key={`${lineLabels[lineIndex]}-${selection}`} className="coin-line-card">
              <div className="coin-line-header">
                <div>
                  <strong>{lineLabels[lineIndex]}</strong>
                  <p>{selection}</p>
                </div>
                <span className="line-badge">{selection}</span>
              </div>

              <div className="coin-tray">
                {line.map((face, coinIndex) => (
                  <div key={`${lineIndex}-${coinIndex}`} className="single-coin-group">
                    <span className="coin-index">第 {coinIndex + 1} 枚</span>
                    <button
                      type="button"
                      className={`coin-token coin-single ${face === "字" ? "coin-zi" : "coin-hua"} active`}
                      onClick={() => toggleCoin(lineIndex, coinIndex)}
                    >
                      <span className="coin-ring" />
                      <span className="coin-face-shadow">{face === "字" ? "花" : "字"}</span>
                      <span className="coin-label">{face}</span>
                      <span className="coin-hint">点击翻面</span>
                    </button>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
