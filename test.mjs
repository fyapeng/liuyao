/* 六爻引擎单元测试：node test.mjs */
import fs from 'fs';
import vm from 'vm';

const src = fs.readFileSync('./engine.js', 'utf8');
const ctx = {console, Date, Math};
vm.createContext(ctx);
vm.runInContext(src + '\nglobalThis.__LY = LiuYao;', ctx);
const LY = ctx.__LY;
const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];

let pass = 0, fail = 0;
function eq(actual, expected, name) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; }
  else { fail++; console.log(`FAIL ${name}\n  实际: ${a}\n  期望: ${e}`); }
}

// 1. 64 卦无重复、全部可查
eq(Object.keys(LY.HEXMAP).length, 64, '64卦总数');
// 每宫8卦
for (const p of LY.PALACES) {
  const n = Object.values(LY.HEXMAP).filter(h => h.palace === p.name).length;
  eq(n, 8, p.name + '卦数');
}

// 2. 乾为天 [1,1,1,1,1,1]
{
  const r = LY.paipan([1,1,1,1,1,1], 0); // 甲子日
  eq(r.hex.name, '乾为天', '乾卦名');
  eq(r.hex.palace, '乾宫', '乾宫位');
  eq(r.rows[0].shi, false, '乾世不在初爻');
  eq(r.rows[5].shi, true, '乾世在上爻');
  eq(r.rows[2].ying, true, '乾应在三爻');
  eq(r.rows.map(x => x.ganzhi).join(','), '甲子,甲寅,甲辰,壬午,壬申,壬戌', '乾纳甲');
  eq(r.rows.map(x => x.qin).join(','), '子孙,妻财,父母,官鬼,兄弟,父母', '乾六亲');
  eq(r.rows[0].beast, '青龙', '甲子日初爻青龙');
  eq(r.xunkong.join(''), '戌亥', '甲子旬空戌亥');
}

// 3. 天风姤 [0,1,1,1,1,1]：乾宫一世，世初应四
{
  const r = LY.paipan([0,1,1,1,1,1], 0);
  eq(r.hex.name, '天风姤', '姤卦名');
  eq(r.rows[0].shi, true, '姤世初爻');
  eq(r.rows[3].ying, true, '姤应四爻');
  eq(r.rows[0].ganzhi, '辛丑', '姤初爻纳甲辛丑');
  eq(r.rows[0].qin, '父母', '姤初爻六亲父母(丑土生乾金)');
}

// 4. 火天大有 [1,1,1,1,0,1]：乾宫归魂，世三爻
{
  const r = LY.paipan([1,1,1,1,0,1], 0);
  eq(r.hex.name, '火天大有', '大有卦名');
  eq(r.rows[2].shi, true, '大有世三爻(归魂)');
}

// 5. 火地晋 [0,0,0,1,0,1]：乾宫游魂，世四爻
{
  const r = LY.paipan([0,0,0,1,0,1], 0);
  eq(r.hex.name, '火地晋', '晋卦名');
  eq(r.rows[3].shi, true, '晋世四爻(游魂)');
}

// 6. 地水师 [0,1,0,0,0,0]：坎宫归魂
{
  const r = LY.paipan([0,1,0,0,0,0], 12); // 丙寅日
  eq(r.hex.name, '地水师', '师卦名');
  eq(r.hex.palace, '坎宫', '师宫位');
  eq(r.rows[2].shi, true, '师世三爻');
  eq(r.rows[0].beast, '朱雀', '丙日起朱雀');
  eq(r.rows.map(x => x.ganzhi).join(','), '戊寅,戊辰,戊午,癸丑,癸亥,癸酉', '师纳甲');
}

// 7. 铜钱：三字=老阳动，三背=老阴动
eq(LY.coinYao([true,true,true]), {yang:true,moving:true,label:'老阳',mark:'○'}, '三字老阳');
eq(LY.coinYao([false,false,false]), {yang:false,moving:true,label:'老阴',mark:'×'}, '三背老阴');
eq(LY.coinYao([true,false,false]), {yang:true,moving:false,label:'少阳',mark:''}, '一字二背少阳');
eq(LY.coinYao([false,true,true]), {yang:false,moving:false,label:'少阴',mark:''}, '二字一背少阴');

// 8. 时间起卦：年7 月9 日27 时7 → 上离下兑=火泽睽，二爻动
{
  const g = LY.timeGua(7, 9, 27, 7);
  eq(g.bits, [1,1,0,1,0,1], '时间起卦卦画');
  eq(g.moving, [2], '时间起卦动爻');
  const r = LY.paipan(g.bits, 0);
  eq(r.hex.name, '火泽睽', '睽卦名');
  eq(r.hex.palace, '艮宫', '睽宫位(艮宫四世)');
  eq(r.rows[3].shi, true, '睽世四爻');
}

// 9. 变卦：乾初爻动 → 天风姤；六亲按原宫
{
  const b = LY.biangua([1,1,1,1,1,1], [1], '金');
  eq(b.hex.name, '天风姤', '变卦为姤');
  eq(b.rows[0].ganzhi, '辛丑', '变卦初爻辛丑');
  eq(b.rows[0].qin, '父母', '变卦六亲按原宫(乾金)');
}

// 10. 日柱：2026-09-27（周日）应为丙午日？
{
  const dp = LY.dayPillar(2026, 9, 27);
  console.log('  [info] 2026-09-27 日柱 =', dp.stem + dp.branch, 'idx=' + dp.idx);
  eq(dp.idx % 10, STEMS.indexOf(dp.stem), '日柱干支一致性');
  const xk = LY.xunkong(dp.idx);
  eq(xk.length, 2, '旬空两支');
}

// 11. 旬空表
eq(LY.xunkong(0), ['戌','亥'], '甲子旬');
eq(LY.xunkong(10), ['申','酉'], '甲戌旬');
eq(LY.xunkong(59), ['子','丑'], '癸亥旬');

// 12. 六兽
eq(LY.beasts(4), ['勾陈','螣蛇','白虎','玄武','青龙','朱雀'], '戊日六兽');
eq(LY.beasts(8)[0], '玄武', '壬日起玄武');

// 13. 旺相休囚死：月建木
eq(LY.wangxiang('木','木'), '旺', '木月木旺');
eq(LY.wangxiang('木','火'), '相', '木月火相');
eq(LY.wangxiang('木','水'), '休', '木月水休');
eq(LY.wangxiang('木','金'), '囚', '木月金囚');
eq(LY.wangxiang('木','土'), '死', '木月土死');

// 14. 六亲边界
eq(LY.qin('水','水'), '兄弟', '同我兄弟');
eq(LY.qin('水','木'), '子孙', '水生木子孙');
eq(LY.qin('水','金'), '父母', '金生水父母');
eq(LY.qin('水','土'), '官鬼', '土克水官鬼');
eq(LY.qin('水','火'), '妻财', '水克火妻财');

// 15. 数字起卦
{
  const g = LY.numGua(8, 8, 8);
  eq(g.up, '坤', '数8上卦坤');
  eq(g.dn, '坤', '数8下卦坤');
  eq(g.moving, [6], '24÷6余6上爻动');
  eq(LY.paipan(g.bits, 0).hex.name, '坤为地', '坤卦');
}

// 16. 抽查：泽雷随 [1,0,0,1,1,0] 震宫归魂
{
  const r = LY.paipan([1,0,0,1,1,0], 0);
  eq(r.hex.name, '泽雷随', '随卦名');
  eq(r.hex.palace, '震宫', '随宫位');
  eq(r.rows[2].shi, true, '随世三爻');
}

console.log(`\n${pass} 通过, ${fail} 失败`);
process.exit(fail ? 1 : 0);
