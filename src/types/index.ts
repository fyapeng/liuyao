export type CoinPattern = '字字字' | '字字花' | '字花花' | '花花花';

export type YinYang = 0 | 1;

export interface CoinRule {
  pattern: CoinPattern;
  value: 6 | 7 | 8 | 9;
  yaoType: '老阴' | '少阳' | '少阴' | '老阳';
  yinYang: YinYang;
  isMoving: boolean;
  changeTo: YinYang;
  symbol?: '×' | '○';
  description: string;
}

export interface HexagramRecord {
  key: string;
  name: string;
  upperTrigram: string;
  lowerTrigram: string;
  lines: YinYang[];
}

export interface CategoryRule {
  key: string;
  label: string;
  primaryYongShen: string;
  secondaryReferences: string[];
  favorableRules: string[];
  unfavorableRules: string[];
  notes: string;
}

export interface CastLineResult extends CoinRule {
  index: number;
}
