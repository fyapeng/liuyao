import type { QuestionCategory, QuestionCategoryKey, TimeContext } from "../types/index.ts";

interface QuestionFormProps {
  categories: Record<QuestionCategoryKey, QuestionCategory>;
  question: string;
  selectedCategory: QuestionCategoryKey;
  timeContext: TimeContext;
  onQuestionChange: (value: string) => void;
  onCategoryChange: (value: QuestionCategoryKey) => void;
  onRefreshTime: () => void;
}

export function QuestionForm({
  categories,
  question,
  selectedCategory,
  timeContext,
  onQuestionChange,
  onCategoryChange,
  onRefreshTime
}: QuestionFormProps) {
  return (
    <section className="panel-card ornate-panel">
      <div className="section-head">
        <div>
          <p className="section-kicker">Question Context</p>
          <h2>{"\u5360\u4e8b\u4fe1\u606f"}</h2>
        </div>
        <p className="muted-text">
          {
            "\u5148\u5b9a\u95ee\u9898\u4e0e\u5206\u7c7b\uff0c\u518d\u7528\u5f53\u524d\u65f6\u95f4\u81ea\u52a8\u8d77\u51fa\u65e5\u8fb0\u3001\u6708\u5efa\u4e0e\u65ec\u7a7a\uff0c\u540e\u7eed\u89c4\u5219\u90fd\u4f1a\u6cbf\u8fd9\u6761\u65f6\u95f4\u7ebf\u5c55\u5f00\u3002"
          }
        </p>
      </div>

      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="question">{"\u5360\u4e8b\u95ee\u9898"}</label>
          <textarea
            id="question"
            rows={4}
            placeholder={"\u4f8b\u5982\uff1a\u8fd9\u7bc7\u8bba\u6587\u8fd9\u4e00\u8f6e\u6295\u7a3f\u662f\u5426\u80fd\u987a\u5229\u63a8\u8fdb\uff1f"}
            value={question}
            onChange={(event) => onQuestionChange(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="category">{"\u5360\u4e8b\u5206\u7c7b"}</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value as QuestionCategoryKey)}
          >
            {Object.values(categories).map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="time-context-card">
          <div className="time-context-head">
            <div>
              <span className="meta-label">{"\u81ea\u52a8\u65f6\u95f4"}</span>
              <strong>{`${timeContext.dayGanzhi}\u65e5`}</strong>
            </div>
            <button className="selector-chip" type="button" onClick={onRefreshTime}>
              {"\u5237\u65b0\u5f53\u524d\u65f6\u95f4"}
            </button>
          </div>

          <div className="time-context-grid">
            <div className="time-context-item">
              <span className="meta-label">{"\u516c\u5386"}</span>
              <span>{timeContext.solarDateLabel}</span>
            </div>
            <div className="time-context-item">
              <span className="meta-label">{"\u519c\u5386"}</span>
              <span>{timeContext.lunarDateLabel}</span>
            </div>
            <div className="time-context-item">
              <span className="meta-label">{"\u6708\u5efa"}</span>
              <span>{`${timeContext.monthBuild}\u6708\u5efa`}</span>
              <small>{timeContext.monthBuildDetail}</small>
            </div>
            <div className="time-context-item">
              <span className="meta-label">{"\u8282\u6c14"}</span>
              <span>{timeContext.solarTermLabel}</span>
            </div>
            <div className="time-context-item">
              <span className="meta-label">{"\u65ec\u7a7a"}</span>
              <span>{timeContext.voidBranches.join("\u3001")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
