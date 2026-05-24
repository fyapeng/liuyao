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
          <h2>占事信息</h2>
        </div>
        <p className="muted-text">先记录问题、分类与起六神日干，方便后续规则分析、案例保存与复盘。</p>
      </div>

      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="question">占事问题</label>
          <textarea
            id="question"
            rows={4}
            placeholder="例如：这篇论文本轮投稿是否顺利进入外审？"
            value={question}
            onChange={(event) => onQuestionChange(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="category">占事分类</label>
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
          <label htmlFor="dayStem">起六神日干</label>
          <select id="dayStem" value={dayStem} onChange={(event) => onDayStemChange(event.target.value as DayStem)}>
            {(["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const).map((stem) => (
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
