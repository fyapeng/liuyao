import type { QuestionCategory, QuestionCategoryKey } from "../types/index.ts";

interface QuestionFormProps {
  categories: Record<QuestionCategoryKey, QuestionCategory>;
  question: string;
  selectedCategory: QuestionCategoryKey;
  onQuestionChange: (value: string) => void;
  onCategoryChange: (value: QuestionCategoryKey) => void;
}

export function QuestionForm({
  categories,
  question,
  selectedCategory,
  onQuestionChange,
  onCategoryChange
}: QuestionFormProps) {
  return (
    <section className="panel-card">
      <h2>占事信息</h2>
      <p className="muted-text">先记录问题与分类，便于后续规则分析、案例保存与复盘。</p>
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
      </div>
    </section>
  );
}

