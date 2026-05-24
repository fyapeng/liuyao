import { COIN_RULES, COIN_SELECTION_OPTIONS } from "../data/coinRules.ts";
import type { CoinSelection } from "../types/index.ts";

interface CoinSelectorProps {
  selections: CoinSelection[];
  onChange: (value: CoinSelection[]) => void;
}

export function CoinSelector({ selections, onChange }: CoinSelectorProps) {
  const updateSelection = (index: number, value: CoinSelection) => {
    const next = [...selections];
    next[index] = value;
    onChange(next);
  };

  return (
    <section className="panel-card">
      <h2>手动起卦</h2>
      <p className="muted-text">六次结果按从下往上排。第 1 次是初爻，第 6 次是上爻。</p>

      <div className="coin-selector-grid">
        {selections.map((selection, index) => {
          const rule = COIN_RULES[selection];

          return (
            <article key={`${index + 1}-${selection}`} className="line-card">
              <div className="line-card-header">
                <strong>
                  第 {index + 1} 次 {index === 0 ? "（初爻）" : index === 5 ? "（上爻）" : ""}
                </strong>
                <span className="muted-text">{rule.description}</span>
              </div>

              <div className="coin-options">
                {COIN_SELECTION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`coin-option ${selection === option ? "active" : ""}`}
                    onClick={() => updateSelection(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

