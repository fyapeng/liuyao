import { questionCategories } from '@/data/questionCategories';

export function AnalysisPanel({ categoryKey }: { categoryKey: string }) {
  const category = questionCategories.find((c) => c.key === categoryKey) ?? questionCategories[0];
  return <section><h3>第一版分析面板</h3><p>占事分类：{category.label}</p><p>主用神：{category.primaryYongShen}</p><p>辅助参考：{category.secondaryReferences.join('、')}</p><p>说明：{category.notes}</p><p>规则命中、有利因素、不利因素分析将在后续版本加入。</p></section>;
}
