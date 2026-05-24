import { useEffect, useState } from "react";
import { coinFacesToSelection, COIN_FACE_VALUES } from "../lib/castHexagram.ts";
import { COIN_RULES } from "../data/coinRules.ts";
import type { CoinFace } from "../types/index.ts";

interface CoinSelectorProps {
  coinLines: CoinFace[][];
  onChange: (value: CoinFace[][]) => void;
}

const lineLabels = [
  "\u521d\u723b",
  "\u4e8c\u723b",
  "\u4e09\u723b",
  "\u56db\u723b",
  "\u4e94\u723b",
  "\u4e0a\u723b"
] as const;

export function CoinSelector({ coinLines, onChange }: CoinSelectorProps) {
  const [flippingCoinId, setFlippingCoinId] = useState<string | null>(null);

  useEffect(() => {
    if (!flippingCoinId) {
      return undefined;
    }

    const timer = window.setTimeout(() => setFlippingCoinId(null), 420);
    return () => window.clearTimeout(timer);
  }, [flippingCoinId]);

  const updateCoin = (lineIndex: number, coinIndex: number, face: CoinFace) => {
    const next = coinLines.map((line) => [...line]) as CoinFace[][];
    next[lineIndex][coinIndex] = face;
    onChange(next);
  };

  const toggleCoin = (lineIndex: number, coinIndex: number) => {
    const current = coinLines[lineIndex][coinIndex];
    const nextFace: CoinFace = current === COIN_FACE_VALUES.ZI ? COIN_FACE_VALUES.HUA : COIN_FACE_VALUES.ZI;
    setFlippingCoinId(`${lineIndex}-${coinIndex}`);
    updateCoin(lineIndex, coinIndex, nextFace);
  };

  return (
    <section className="panel-card ornate-panel coin-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Manual Casting</p>
          <h2>{"\u9010\u679a\u9009\u62e9\u786c\u5e01"}</h2>
        </div>
        <p className="muted-text">
          {
            "\u6bcf\u4e00\u723b\u7528\u4e09\u679a\u786c\u5e01\u8868\u793a\uff0c\u5171 18 \u6b21\u9009\u62e9\u3002\u70b9\u51fb\u5355\u679a\u786c\u5e01\u5373\u53ef\u5728\u201c\u5b57 / \u82b1\u201d\u4e4b\u95f4\u7ffb\u9762\u5207\u6362\u3002"
          }
        </p>
      </div>

      <div className="coin-line-grid">
        {coinLines.map((line, lineIndex) => {
          const selection = coinFacesToSelection(line);
          const detail = COIN_RULES[selection];

          return (
            <article key={lineLabels[lineIndex]} className="coin-line-card">
              <div className="coin-line-header">
                <div>
                  <strong>{lineLabels[lineIndex]}</strong>
                  <p>{detail.description}</p>
                </div>
                <span className="line-badge">
                  {selection} {"\u00b7"} {detail.value}
                </span>
              </div>

              <div className="coin-tray">
                {line.map((face, coinIndex) => {
                  const coinId = `${lineIndex}-${coinIndex}`;
                  const isFlipping = flippingCoinId === coinId;

                  return (
                    <div key={coinId} className="single-coin-group">
                      <span className="coin-index">
                        {"\u7b2c "} {coinIndex + 1} {" \u679a"}
                      </span>
                      <button
                        type="button"
                        className={`coin-token coin-single ${face === COIN_FACE_VALUES.ZI ? "coin-zi" : "coin-hua"} ${
                          isFlipping ? "is-flipping" : ""
                        }`}
                        onClick={() => toggleCoin(lineIndex, coinIndex)}
                        aria-label={`\u5207\u6362\u7b2c ${lineIndex + 1} \u723b\u7b2c ${coinIndex + 1} \u679a\u786c\u5e01\uff0c\u5f53\u524d\u4e3a${face}`}
                      >
                        <span className="coin-ring" />
                        <span className="coin-face-shadow">{face === COIN_FACE_VALUES.ZI ? COIN_FACE_VALUES.HUA : COIN_FACE_VALUES.ZI}</span>
                        <span className="coin-label">{face}</span>
                        <span className="coin-hint">{"\u70b9\u51fb\u7ffb\u9762"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
