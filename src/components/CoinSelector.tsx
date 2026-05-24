'use client';
import { coinOptions } from '@/data/coinRules';
import { CoinPattern } from '@/types';

export function CoinSelector({ value, onChange }: { value: CoinPattern; onChange: (v: CoinPattern) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as CoinPattern)}>
      {coinOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
