import { describe, expect, it } from 'vitest';
import { coinRules } from '@/data/coinRules';
import { castHexagram } from '@/lib/castHexagram';
import { changeHexagram } from '@/lib/changeHexagram';
import { getHexagramName } from '@/lib/getHexagramName';

describe('硬币转换规则', () => {
  it('四种结果映射正确', () => {
    expect(coinRules['字字字']).toMatchObject({ value: 6, yaoType: '老阴', isMoving: true, yinYang: 0 });
    expect(coinRules['字字花']).toMatchObject({ value: 7, yaoType: '少阳', isMoving: false, yinYang: 1 });
    expect(coinRules['字花花']).toMatchObject({ value: 8, yaoType: '少阴', isMoving: false, yinYang: 0 });
    expect(coinRules['花花花']).toMatchObject({ value: 9, yaoType: '老阳', isMoving: true, yinYang: 1 });
  });
});

describe('变卦逻辑', () => {
  it('老阴老阳变，少阴少阳不变', () => {
    const cast = castHexagram(['字字字','字字花','字花花','花花花','字花花','字字花']);
    expect(changeHexagram(cast.lines)).toEqual([1,1,0,0,0,1]);
  });
});

describe('示例卦验证', () => {
  it('大壮 -> 归妹', () => {
    const cast = castHexagram(['字字花','字字花','花花花','字字花','字花花','字花花']);
    const changed = changeHexagram(cast.lines);
    const moving = cast.lines.map((l, i) => l.isMoving ? i + 1 : null).filter(Boolean);
    expect(getHexagramName(cast.base)?.name).toBe('雷天大壮');
    expect(moving).toEqual([3]);
    expect(getHexagramName(changed)?.name).toBe('雷泽归妹');
  });
});
