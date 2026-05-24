import type { DayStem, QuestionCategory, QuestionCategoryKey } from "../types/index.ts";

interface QuestionFormProps {
  categories: Record<QuestionCategoryKey, QuestionCategory>;
  question: string;
  selectedCategory: QuestionCategoryKey;
  dayStem: DayStem;
  onQuestionChange: (value: string) => void;
  onCategoryChange: (value: QuestionCategoryKey) => void;
  onDayStemChange: (value: DayStem) => void;
}

const DAY_STEMS = [
  "\u7532",
  "\u4e59",
  "\u4e19",
  "\u4e01",
  "\u620a",
  "\u5df1",
  "\u5e9a",
  "\u8f9b",
  "\u58ec",
  "\u7678"
] as const;

export function QuestionForm({
  categories,
  question,
  selectedCategory,
  dayStem,
  onQuestionChange,
  onCategoryChange,
  onDayStemChange
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
            "\u5148\u8bb0\u5f55\u95ee\u9898\u3001\u5206\u7c7b\u4e0e\u8d77\u516d\u795e\u65e5\u5e72\uff0c\u65b9\u4fbf\u540e\u7eed\u89c4\u5219\u5206\u6790\u3001\u6848\u4f8b\u4fdd\u5b58\u4e0e\u590d\u76d8\u3002"
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

        <div className="field-group">
          <label htmlFor="dayStem">{"\u8d77\u516d\u795e\u65e5\u5e72"}</label>
          <select id="dayStem" value={dayStem} onChange={(event) => onDayStemChange(event.target.value as DayStem)}>
            {DAY_STEMS.map((stem) => (
              <option key={stem} value={stem}>
                {stem}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
