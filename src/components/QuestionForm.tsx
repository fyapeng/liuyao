'use client';
import { questionCategories } from '@/data/questionCategories';

export function QuestionForm({ question, setQuestion, category, setCategory }: { question: string; setQuestion: (v: string) => void; category: string; setCategory: (v: string) => void }) {
  return <div><input placeholder='请输入占事问题' value={question} onChange={(e)=>setQuestion(e.target.value)} /><select value={category} onChange={(e)=>setCategory(e.target.value)}>{questionCategories.map(c=><option key={c.key} value={c.key}>{c.label}</option>)}</select></div>;
}
