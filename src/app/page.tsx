'use client';
import { useMemo, useState } from 'react';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { CoinSelector } from '@/components/CoinSelector';
import { HexagramResult } from '@/components/HexagramResult';
import { QuestionForm } from '@/components/QuestionForm';
import { RandomCastButton } from '@/components/RandomCastButton';
import { RuleHitList } from '@/components/RuleHitList';
import { castHexagram, randomCoinPattern } from '@/lib/castHexagram';
import { changeHexagram } from '@/lib/changeHexagram';
import { getHexagramName } from '@/lib/getHexagramName';
import { CoinPattern } from '@/types';

export default function HomePage() {
  const [patterns, setPatterns] = useState<CoinPattern[]>(['字字花','字字花','字花花','字花花','字字花','字字花']);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('paper');

  const result = useMemo(() => {
    const cast = castHexagram(patterns);
    const changed = changeHexagram(cast.lines);
    return { ...cast, changed, baseName: getHexagramName(cast.base), changedName: getHexagramName(changed) };
  }, [patterns]);

  return <main><h1>六爻排盘与规则辅助分析系统（V1）</h1><QuestionForm question={question} setQuestion={setQuestion} category={category} setCategory={setCategory}/><RandomCastButton onClick={() => setPatterns(Array.from({ length: 6 }, () => randomCoinPattern()))} />
  {patterns.map((p, i) => <div key={i}>第{i + 1}次（{i===0?'初爻':i===5?'上爻':`${i+1}爻`}）：<CoinSelector value={p} onChange={(v)=>setPatterns((prev)=>prev.map((x,idx)=>idx===i?v:x))}/></div>)}
  <HexagramResult {...result} />
  <AnalysisPanel categoryKey={category} />
  <RuleHitList />
  <section><h4>案例记录（预留）</h4></section></main>;
}
