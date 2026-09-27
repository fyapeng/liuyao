/* 六爻排盘规则引擎 v1
 * 纯函数 + 数据表，无 DOM 依赖，可在 Node 下单元测试。
 * 规则依据：京房八宫纳甲体系（纳甲歌、安世应诀、六亲六兽旬空）。
 */

const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRANCH_ELEMENT = {
  子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',
  午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'
};
const SHENG = {木:'火',火:'土',土:'金',金:'水',水:'木'}; // 我生
const KE   = {木:'土',火:'金',土:'水',金:'木',水:'火'}; // 我克

/* 八卦：bin 为自下而上 [初,二,三]，1=阳 0=阴
 * is/ib: 内卦天干/地支(自下而上)；os/ob: 外卦天干/地支 */
const TRIGRAMS = {
  乾:{bin:[1,1,1],el:'金',is:'甲',ib:['子','寅','辰'],os:'壬',ob:['午','申','戌']},
  兑:{bin:[1,1,0],el:'金',is:'丁',ib:['巳','卯','丑'],os:'丁',ob:['亥','酉','未']},
  离:{bin:[1,0,1],el:'火',is:'己',ib:['卯','丑','亥'],os:'己',ob:['酉','未','巳']},
  震:{bin:[1,0,0],el:'木',is:'庚',ib:['子','寅','辰'],os:'庚',ob:['午','申','戌']},
  巽:{bin:[0,1,1],el:'木',is:'辛',ib:['丑','亥','酉'],os:'辛',ob:['未','巳','卯']},
  坎:{bin:[0,1,0],el:'水',is:'戊',ib:['寅','辰','午'],os:'戊',ob:['申','戌','子']},
  艮:{bin:[0,0,1],el:'土',is:'丙',ib:['辰','午','申'],os:'丙',ob:['戌','子','寅']},
  坤:{bin:[0,0,0],el:'土',is:'乙',ib:['未','巳','卯'],os:'癸',ob:['丑','亥','酉']},
};

/* 八宫：gua 按 本宫→一世→二世→三世→四世→五世→游魂→归魂 排列 */
const PALACES = [
  {name:'乾宫',pure:'乾',el:'金',gua:['乾为天','天风姤','天山遁','天地否','风地观','山地剥','火地晋','火天大有']},
  {name:'坎宫',pure:'坎',el:'水',gua:['坎为水','水泽节','水雷屯','水火既济','泽火革','雷火丰','地火明夷','地水师']},
  {name:'艮宫',pure:'艮',el:'土',gua:['艮为山','山火贲','山天大畜','山泽损','火泽睽','天泽履','风泽中孚','风山渐']},
  {name:'震宫',pure:'震',el:'木',gua:['震为雷','雷地豫','雷水解','雷风恒','地风升','水风井','泽风大过','泽雷随']},
  {name:'巽宫',pure:'巽',el:'木',gua:['巽为风','风天小畜','风火家人','风雷益','天雷无妄','火雷噬嗑','山雷颐','山风蛊']},
  {name:'离宫',pure:'离',el:'火',gua:['离为火','火山旅','火风鼎','火水未济','山水蒙','风水涣','天水讼','天火同人']},
  {name:'坤宫',pure:'坤',el:'土',gua:['坤为地','地雷复','地泽临','地天泰','雷天大壮','泽天夬','水天需','水地比']},
  {name:'兑宫',pure:'兑',el:'金',gua:['兑为泽','泽水困','泽地萃','泽山咸','水山蹇','地山谦','雷山小过','雷泽归妹']},
];

/* 由八宫纯卦按变爻规律生成全部 64 卦：
 * 一世变初爻，二世变初二，三世变初二三，四世变初二三四，五世变初二三四五，
 * 游魂=五世变四爻，归魂=游魂变初二三爻。世爻：本宫6,一世1,二世2,三世3,四世4,五世5,游魂4,归魂3 */
const HEXMAP = (() => {
  const flip = (bits, idxs) => bits.map((b,i) => idxs.includes(i) ? 1-b : b);
  const shiOf = [6,1,2,3,4,5,4,3];
  const map = {};
  for (const p of PALACES) {
    const t = TRIGRAMS[p.pure].bin;
    const pure = [...t, ...t];
    const w5 = flip(pure,[0,1,2,3,4]);
    const yh = flip(w5,[3]);
    const seqs = [
      pure, flip(pure,[0]), flip(pure,[0,1]), flip(pure,[0,1,2]),
      flip(pure,[0,1,2,3]), w5, yh, flip(yh,[0,1,2]),
    ];
    seqs.forEach((bits,pos) => {
      map[bits.join('')] = {name:p.gua[pos], palace:p.name, palaceEl:p.el, pos, shi:shiOf[pos]};
    });
  }
  return map;
})();

function trigramNameOf(b3) {
  const k = b3.join('');
  for (const n of Object.keys(TRIGRAMS)) if (TRIGRAMS[n].bin.join('') === k) return n;
  throw new Error('未知卦形: ' + k);
}

/* 纳甲：返回每爻 {stem, branch}，顺序初爻→上爻 */
function najia(bits) {
  const L = TRIGRAMS[trigramNameOf(bits.slice(0,3))];
  const U = TRIGRAMS[trigramNameOf(bits.slice(3,6))];
  const rows = [];
  for (let i=0;i<3;i++) rows.push({stem:L.is, branch:L.ib[i]});
  for (let i=0;i<3;i++) rows.push({stem:U.os, branch:U.ob[i]});
  return rows;
}

/* 六亲：宫五行 vs 爻支五行 */
function qin(palaceEl, branchEl) {
  if (palaceEl === branchEl) return '兄弟';
  if (SHENG[palaceEl] === branchEl) return '子孙';
  if (SHENG[branchEl] === palaceEl) return '父母';
  if (KE[palaceEl] === branchEl) return '妻财';
  return '官鬼';
}

const BEASTS = ['青龙','朱雀','勾陈','螣蛇','白虎','玄武'];
/* 六兽：按日干起，顺序初爻→上爻 */
function beasts(dayStemIdx) {
  const start = [0,0,1,1,2,3,4,4,5,5][dayStemIdx % 10];
  return [0,1,2,3,4,5].map(i => BEASTS[(start+i) % 6]);
}

/* 旬空：dayIdx 为日柱在六十甲子中的序号（甲子=0） */
function xunkong(dayIdx) {
  const pairs = [['戌','亥'],['申','酉'],['午','未'],['辰','巳'],['寅','卯'],['子','丑']];
  return pairs[Math.floor(((dayIdx % 60)+60)%60 / 10)];
}

/* 公历 → 日柱（以 1900-01-01 甲戌日为基准） */
function dayPillar(y, m, d) {
  const dayMs = 86400000;
  const days = Math.round(Date.UTC(y, m-1, d) / dayMs) - Math.round(Date.UTC(1900,0,1) / dayMs);
  const idx = (((days + 10) % 60) + 60) % 60;
  return {stem:STEMS[idx%10], stemIdx:idx%10, branch:BRANCHES[idx%12], idx};
}

/* 主排盘：bits 自下而上 [初..上]，1=阳；dayIdx 日柱序号 */
function paipan(bits, dayIdx) {
  const key = bits.join('');
  const info = HEXMAP[key];
  if (!info) throw new Error('未知卦形: ' + key);
  const nj = najia(bits);
  const bst = beasts(dayIdx % 10);
  const xk = xunkong(dayIdx);
  const yingLine = ((info.shi - 1 + 3) % 6) + 1;
  const rows = bits.map((b, i) => ({
    line: i+1,
    yang: !!b,
    stem: nj[i].stem,
    branch: nj[i].branch,
    ganzhi: nj[i].stem + nj[i].branch,
    qin: qin(info.palaceEl, BRANCH_ELEMENT[nj[i].branch]),
    beast: bst[i],
    kong: xk.includes(nj[i].branch),
    shi: info.shi === i+1,
    ying: yingLine === i+1,
  }));
  return {hex: info, rows, xunkong: xk, dayIdx};
}

/* 变卦：moving 为动爻号数组 [1..6]；六亲仍按原宫五行 */
function biangua(bits, moving, palaceEl) {
  const nb = bits.map((b,i) => moving.includes(i+1) ? 1-b : b);
  const key = nb.join('');
  const info = HEXMAP[key];
  if (!info) throw new Error('未知卦形: ' + key);
  const nj = najia(nb);
  const rows = nb.map((b, i) => ({
    line: i+1,
    yang: !!b,
    stem: nj[i].stem,
    branch: nj[i].branch,
    ganzhi: nj[i].stem + nj[i].branch,
    qin: qin(palaceEl, BRANCH_ELEMENT[nj[i].branch]),
    moved: moving.includes(i+1),
  }));
  return {hex: info, rows};
}

/* 铜钱摇卦：coins 为 [bool×3]，true=字(3点) false=背(2点) */
function coinYao(coins) {
  const s = coins.reduce((a,c) => a + (c ? 3 : 2), 0);
  if (s === 9) return {yang:true,  moving:true,  label:'老阳', mark:'○'};
  if (s === 7) return {yang:true,  moving:false, label:'少阳', mark:''};
  if (s === 8) return {yang:false, moving:false, label:'少阴', mark:''};
  return           {yang:false, moving:true,  label:'老阴', mark:'×'};
}

/* 先天八卦数 */
const XIAN_TIAN = {1:'乾',2:'兑',3:'离',4:'震',5:'巽',6:'坎',7:'艮',8:'坤'};
const mod8 = n => (n % 8 === 0 ? 8 : n % 8);
const mod6 = n => (n % 6 === 0 ? 6 : n % 6);

/* 时间起卦（梅花易数）：年取地支序数(子1..亥12)，月日时取数 */
function timeGua(y, mo, d, h) {
  const s1 = y + mo + d, s2 = s1 + h;
  const upN = mod8(s1), dnN = mod8(s2), mvN = mod6(s2);
  const upT = XIAN_TIAN[upN], dnT = XIAN_TIAN[dnN];
  const bits = [...TRIGRAMS[dnT].bin, ...TRIGRAMS[upT].bin];
  return {bits, moving:[mvN], up:upT, dn:dnT, calc:`上卦=(${y}+${mo}+${d})÷8 余${upN}→${upT}；下卦=(${y}+${mo}+${d}+${h})÷8 余${dnN}→${dnT}；动爻=${s2}÷6 余${mvN}`};
}

/* 数字起卦：a→上卦，b→下卦，(a+b+c)→动爻 */
function numGua(a, b, c) {
  const upT = XIAN_TIAN[mod8(a)], dnT = XIAN_TIAN[mod8(b)];
  const mvN = mod6(a + b + (c || 0));
  const bits = [...TRIGRAMS[dnT].bin, ...TRIGRAMS[upT].bin];
  return {bits, moving:[mvN], up:upT, dn:dnT, calc:`上卦=${a}÷8 余${mod8(a)}→${upT}；下卦=${b}÷8 余${mod8(b)}→${dnT}；动爻=${a}+${b}${c?`+${c}`:''}=${a+b+(c||0)}÷6 余${mvN}`};
}

/* 旺相休囚死（按月建五行） */
function wangxiang(yueEl, branchEl) {
  if (yueEl === branchEl) return '旺';
  if (SHENG[yueEl] === branchEl) return '相';
  if (SHENG[branchEl] === yueEl) return '休';
  if (KE[branchEl] === yueEl) return '囚'; // 克我者囚
  return '死'; // 我克者死
}

/* 问事类别 → 用神 */
const YONGSHEN = {
  '求财':      {qin:'妻财', note:'看妻财爻：喜妻财持世、旺相生世；忌兄动劫财、父动克财。'},
  '工作求官':  {qin:'官鬼', note:'看官鬼爻：喜官鬼持世、旺相；忌子孙发动克官。'},
  '考试':      {qin:'父母', note:'看父母爻（文书）：喜父母旺相生世；忌财动克父。'},
  '婚姻感情':  {qin:null,   note:'男测看妻财，女测看官鬼：喜用神旺相生合世爻，忌用神空亡、发动化凶。'},
  '子女':      {qin:'子孙', note:'看子孙爻：喜子孙旺相；忌官鬼发动克子孙。'},
  '父母长辈':  {qin:'父母', note:'看父母爻：喜旺相生世。'},
  '兄弟朋友':  {qin:'兄弟', note:'看兄弟爻：喜旺相；测竞争忌兄弟持世克财。'},
  '自身出行':  {qin:'世',   note:'看世爻旺衰：世旺宜进，世衰宜守；忌世爻空亡、月破日破。'},
  '对方他人':  {qin:'应',   note:'看应爻：应生世吉，世生应劳；应爻空亡则对方无心。'},
};

globalThis.LiuYao = {
  STEMS, BRANCHES, BRANCH_ELEMENT, TRIGRAMS, PALACES, HEXMAP,
  najia, qin, beasts, xunkong, dayPillar, paipan, biangua,
  coinYao, timeGua, numGua, wangxiang, YONGSHEN,
};
if (typeof module !== 'undefined' && module.exports) module.exports = globalThis.LiuYao;
