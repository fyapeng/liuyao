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

  return (
    <section className="panel-card ornate-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Manual Casting</p>
          <h2>逐枚选择硬币</h2>
        </div>
        <p className="muted-text">每一爻用三枚硬币表示，共 18 次选择。系统会自动汇总成 6 / 7 / 8 / 9。</p>
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
                    <div className="coin-face-toggle">
                      {(["字", "花"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`coin-token ${face === option ? "active" : ""} ${option === "字" ? "coin-zi" : "coin-hua"}`}
                          onClick={() => updateCoin(lineIndex, coinIndex, option)}
                        >
                          <span className="coin-ring" />
                          <span className="coin-label">{option}</span>
                        </button>
                      ))}
                    </div>
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
