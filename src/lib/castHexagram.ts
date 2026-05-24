import { coinRules } from '@/data/coinRules';
import { CastLineResult, CoinPattern, YinYang } from '@/types';

export function castHexagram(patterns: CoinPattern[]): { lines: CastLineResult[]; base: YinYang[] } {
  const lines = patterns.map((pattern, index) => ({ ...coinRules[pattern], index }));
  return { lines, base: lines.map((line) => line.yinYang) as YinYang[] };
}

export function randomCoinPattern(): CoinPattern {
  const n = Math.floor(Math.random() * 4);
  return ['字字字', '字字花', '字花花', '花花花'][n] as CoinPattern;
}
