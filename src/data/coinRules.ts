import { CoinRule } from '@/types';

export const coinRules: Record<string, CoinRule> = {
  字字字: { pattern: '字字字', value: 6, yaoType: '老阴', yinYang: 0, isMoving: true, changeTo: 1, symbol: '×', description: '字字字 = 6 = 老阴 = 阴爻动' },
  字字花: { pattern: '字字花', value: 7, yaoType: '少阳', yinYang: 1, isMoving: false, changeTo: 1, description: '字字花 = 7 = 少阳 = 阳爻静' },
  字花花: { pattern: '字花花', value: 8, yaoType: '少阴', yinYang: 0, isMoving: false, changeTo: 0, description: '字花花 = 8 = 少阴 = 阴爻静' },
  花花花: { pattern: '花花花', value: 9, yaoType: '老阳', yinYang: 1, isMoving: true, changeTo: 0, symbol: '○', description: '花花花 = 9 = 老阳 = 阳爻动' }
};

export const coinOptions = Object.keys(coinRules);
