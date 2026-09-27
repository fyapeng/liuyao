/* 六爻排盘 UI 逻辑 */
const LY = globalThis.LiuYao;
const $ = id => document.getElementById(id);
const POS_NAMES = ['初爻','二爻','三爻','四爻','五爻','上爻'];
const ORD = ['一','二','三','四','五','上'];

/* ---------- 页签 ---------- */
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  ['coin','time','num'].forEach(k => $('tab-'+k).classList.toggle('hidden', k !== t.dataset.tab));
}));

/* ---------- 断卦参数 ---------- */
Object.keys(LY.YONGSHEN).forEach(c => {
  const o = document.createElement('option'); o.textContent = c; $('p-cat').appendChild(o);
});
LY.STEMS.forEach(s => { const o = document.createElement('option'); o.textContent = s; $('p-stem').appendChild(o); });
LY.BRANCHES.forEach(b => { const o = document.createElement('option'); o.textContent = b; $('p-branch').appendChild(o); });
LY.BRANCHES.forEach(b => {
  const o = document.createElement('option'); o.value = b;
  o.textContent = `${b}（${LY.BRANCH_ELEMENT[b]}）`; $('p-yue').appendChild(o);
});

function selectedDayIdx() {
  const si = LY.STEMS.indexOf($('p-stem').value), bi = LY.BRANCHES.indexOf($('p-branch').value);
  for (let i = 0; i < 60; i++) if (i % 10 === si && i % 12 === bi) return i;
  return 0;
}
function updateDayInfo() {
  const idx = selectedDayIdx();
  $('p-dayinfo').textContent =
    `日柱 ${$('p-stem').value}${$('p-branch').value} · 旬空 ${LY.xunkong(idx).join('、')} · 日干${$('p-stem').value}起六兽`;
}
function setTodayStemBranch() {
  const n = new Date(), dp = LY.dayPillar(n.getFullYear(), n.getMonth()+1, n.getDate());
  $('p-stem').value = dp.stem; $('p-branch').value = dp.branch; updateDayInfo();
}
setTodayStemBranch();
$('p-yue').value = ['丑','寅','卯','辰','巳','午','未','申','酉','戌','亥','子'][new Date().getMonth()];
$('p-stem').onchange = $('p-branch').onchange = updateDayInfo;
$('btn-today').onclick = setTodayStemBranch;

/* ---------- 爻线 ---------- */
function yaoHTML(yang) {
  return yang ? '<div class="yao yang"></div>' : '<div class="yao yin"><i></i><i></i></div>';
}

/* ---------- 铜钱摇卦 ---------- */
const coinState = {throws: [], busy: false, rot: [0,0,0]};
function renderThrows() {
  const box = $('throws'); box.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const d = document.createElement('div');
    const t = coinState.throws[i];
    d.className = 'throw' + (t ? ' done' : '');
    d.innerHTML = t
      ? `<div>${POS_NAMES[i]}</div><div class="t-coins">${t.coins.map(c=>c?'字':'背').join(' ')}</div>
         <div class="t-line">${yaoHTML(t.yang)}</div><div class="t-label">${t.label}${t.mark}</div>`
      : `<div>${POS_NAMES[i]}</div><div>待摇</div>`;
    box.appendChild(d);
  }
  const n = coinState.throws.length;
  $('btn-throw').textContent = n >= 6 ? '六爻已成' : `摇第${ORD[n]}爻`;
  $('btn-throw').disabled = coinState.busy || n >= 6;
  $('btn-auto').disabled = coinState.busy || n >= 6;
}
function doThrow() {
  if (coinState.busy || coinState.throws.length >= 6) return;
  coinState.busy = true; renderThrows();
  const coins = [...document.querySelectorAll('#coins .coin')];
  const inners = [...document.querySelectorAll('#coins .coin-inner')];
  const results = [Math.random() < .5, Math.random() < .5, Math.random() < .5];
  coins.forEach(c => c.classList.add('shaking'));
  setTimeout(() => {
    coins.forEach(c => c.classList.remove('shaking'));
    results.forEach((r, i) => setTimeout(() => {
      // 持续向前旋转，落定面与结果一致（字=0°，背=180°）
      const base = coinState.rot[i] + 720 + Math.floor(Math.random()*360);
      const rem = ((base % 360) + 360) % 360;
      const target = r ? base + (360 - rem) % 360 : base + ((180 - rem) + 360) % 360;
      coinState.rot[i] = target;
      inners[i].style.transform = `rotateY(${target}deg)`;
    }, i * 280));
    setTimeout(() => {
      const y = LY.coinYao(results);
      coinState.throws.push({coins: results, ...y});
      coinState.busy = false; renderThrows();
      if (coinState.throws.length === 6) finishCoin();
    }, 3*280 + 1150);
  }, 950);
}
$('btn-throw').onclick = doThrow;
$('btn-auto').onclick = () => {
  if (coinState.busy || coinState.throws.length >= 6) return;
  const step = () => { if (coinState.throws.length < 6 && !$('btn-auto').disabled) { doThrow(); setTimeout(step, 3300); } };
  step();
};
$('btn-reset').onclick = () => {
  if (coinState.busy) return;
  coinState.throws = []; coinState.rot = [0,0,0];
  document.querySelectorAll('#coins .coin-inner').forEach(el => el.style.transform = 'rotateY(0deg)');
  renderThrows();
};
function finishCoin() {
  const bits = coinState.throws.map(t => t.yang ? 1 : 0);
  const moving = coinState.throws.map((t,i) => t.moving ? i+1 : null).filter(Boolean);
  renderAll(bits, moving, '铜钱摇卦');
}
renderThrows();

/* ---------- 时间 / 数字起卦 ---------- */
function setNow() {
  const n = new Date();
  const yIdx = (((n.getFullYear() - 4) % 12) + 12) % 12;
  $('t-year').value = yIdx + 1;
  $('t-month').value = n.getMonth() + 1;
  $('t-day').value = n.getDate();
  const h = n.getHours();
  $('t-hour').value = (h >= 23 || h < 1 ? 0 : Math.floor((h + 1) / 2)) + 1;
}
setNow();
$('btn-now').onclick = setNow;
$('btn-time-go').onclick = () => {
  const g = LY.timeGua(+$('t-year').value, +$('t-month').value, +$('t-day').value, +$('t-hour').value);
  const el = $('time-calc'); el.classList.remove('hidden'); el.textContent = g.calc;
  renderAll(g.bits, g.moving, '时间起卦');
};
$('btn-num-go').onclick = () => {
  const a = +$('n-a').value || 0, b = +$('n-b').value || 0;
  const c = $('n-c').value === '' ? 0 : (+$('n-c').value || 0);
  const g = LY.numGua(a, b, c);
  const el = $('num-calc'); el.classList.remove('hidden'); el.textContent = g.calc;
  renderAll(g.bits, g.moving, '数字起卦');
};

/* ---------- 排盘渲染 ---------- */
function isYongShen(r, cat, cfg) {
  if (!cfg) return false;
  if (cfg.qin === '世') return r.shi;
  if (cfg.qin === '应') return r.ying;
  if (cat === '婚姻感情') return r.qin === '妻财' || r.qin === '官鬼';
  return r.qin === cfg.qin;
}
function yaoTable(rows, full, moving, p) {
  const cfg = LY.YONGSHEN[p.cat];
  let h = '<table class="yao-table"><tbody>';
  [...rows].reverse().forEach(r => {
    const mark = moving.includes(r.line) ? (r.yang ? '○' : '×') : '';
    h += `<tr class="${isYongShen(r, p.cat, cfg) ? 'hl' : ''}">` +
      `<td class="c-pos">${POS_NAMES[r.line-1]}</td>` +
      (full ? `<td class="c-beast">${r.beast}</td>` : '') +
      `<td class="c-gz">${r.ganzhi}${r.kong ? '<span class="kong">空</span>' : ''}</td>` +
      `<td class="c-qin">${r.qin}</td><td>${yaoHTML(r.yang)}</td>` +
      `<td class="c-mark">${mark}</td>` +
      `<td class="c-sy">${r.shi ? '<span class="shi">世</span>' : r.ying ? '<span class="ying">应</span>' : ''}</td></tr>`;
  });
  return h + '</tbody></table>';
}
function bianTable(rows) {
  let h = '<table class="yao-table"><tbody>';
  [...rows].reverse().forEach(r => {
    h += `<tr class="${r.moved ? 'hl' : ''}">` +
      `<td class="c-pos">${POS_NAMES[r.line-1]}</td>` +
      `<td class="c-gz">${r.ganzhi}</td><td class="c-qin">${r.qin}</td><td>${yaoHTML(r.yang)}</td>` +
      `<td class="c-sy"></td></tr>`;
  });
  return h + '</tbody></table>';
}

function renderAll(bits, moving, method) {
  const p = {dayIdx: selectedDayIdx(), yue: $('p-yue').value,
             cat: $('p-cat').value, question: $('p-question').value.trim()};
  const stem = $('p-stem').value, branch = $('p-branch').value;
  const ben = LY.paipan(bits, p.dayIdx);

  $('r-gname').textContent = ben.hex.name;
  let meta = `${ben.hex.palace} · ${ben.hex.palaceEl}行 | ${method} | 日柱${stem}${branch}（旬空${ben.xunkong.join('')}）· 月建${p.yue}`;
  if (p.question) meta += ` | 问：${p.question}`;
  $('r-gmeta').textContent = meta;
  $('r-ben-sub').textContent = `${ben.hex.palace} · 世在${POS_NAMES[ben.hex.shi-1]}`;
  $('r-ben').innerHTML = yaoTable(ben.rows, true, moving, p);

  let bian = null;
  if (moving.length) {
    bian = LY.biangua(bits, moving, ben.hex.palaceEl);
    $('r-bian-panel').classList.remove('hidden');
    $('r-bian-sub').textContent = `${bian.hex.name} · ${bian.hex.palace}`;
    $('r-bian').innerHTML = bianTable(bian.rows);
  } else $('r-bian-panel').classList.add('hidden');

  $('result').classList.remove('hidden');
  renderTips(ben, bian, moving, p);
  $('tips-card').classList.remove('hidden');
  $('result').scrollIntoView({behavior: 'smooth', block: 'start'});
}

/* ---------- 断卦提示 ---------- */
function renderTips(ben, bian, moving, p) {
  const T = [];
  const yueEl = LY.BRANCH_ELEMENT[p.yue];

  // 动爻
  if (moving.length) {
    const items = moving.map(m => {
      const r0 = ben.rows[m-1], r1 = bian.rows[m-1];
      return `<li>${POS_NAMES[m-1]}发动：${r0.ganzhi}${r0.qin}（${r0.yang?'阳':'阴'}）→ ${r1.ganzhi}${r1.qin}（${r1.yang?'阳':'阴'}）</li>`;
    }).join('');
    T.push({h:'动爻', b:`<ul>${items}</ul><p>有动爻以动爻为断卦重点；多爻动则兼看旺衰与变爻关系。</p>`});
  } else {
    T.push({h:'动爻', b:'<p>六爻安静，无动爻。以世应、用神旺衰为主断。</p>'});
  }

  // 用神
  const cfg = LY.YONGSHEN[p.cat];
  const ys = ben.rows.filter(r => isYongShen(r, p.cat, cfg));
  const ysTxt = ys.length
    ? ys.map(r => `${POS_NAMES[r.line-1]}（${r.ganzhi}${r.qin}${r.kong?'·旬空':''}）`).join('、')
    : '本卦无此六亲（伏藏）';
  T.push({h:`用神 · ${p.cat}`, b:`<p>${cfg.note}</p><p>用神位置：${ysTxt}</p>`});

  // 日月旬空
  const kongRows = ben.rows.filter(r => r.kong);
  T.push({h:'日月 · 旬空', b:
    `<p>日辰${$('p-stem').value}${$('p-branch').value}（旬空${ben.xunkong.join('')}）· 月建${p.yue}（${yueEl}行当令）。` +
    (kongRows.length ? `旬空之爻：${kongRows.map(r=>POS_NAMES[r.line-1]+r.ganzhi).join('、')}——空则无力，出空/填实方可用。` : '本卦无旬空之爻。') + '</p>'});

  // 旺衰
  let wx = '<table class="wx"><tr><th>爻位</th><th>干支</th><th>五行</th><th>月建旺衰</th></tr>';
  ben.rows.forEach(r => {
    const el = LY.BRANCH_ELEMENT[r.branch];
    wx += `<tr><td>${POS_NAMES[r.line-1]}</td><td>${r.ganzhi}</td><td>${el}</td><td>${LY.wangxiang(yueEl, el)}</td></tr>`;
  });
  T.push({h:'六爻旺衰（按月建）', b: wx + '</table><p>旺相为有力，休囚为无力；动爻、世爻、用神宜旺相。</p>'});

  // 世应
  const shi = ben.rows.find(r => r.shi), ying = ben.rows.find(r => r.ying);
  T.push({h:'世应', b:`<p>世爻${POS_NAMES[shi.line-1]}（${shi.ganzhi}${shi.qin}）为问事人自身；应爻${POS_NAMES[ying.line-1]}（${ying.ganzhi}${ying.qin}）为对方、事态或环境。世旺宜进取，世衰宜守成；世应相生则顺，相克则阻。</p>`});

  $('tips').innerHTML = T.map(t => `<div class="tip"><h3>${t.h}</h3>${t.b}</div>`).join('');
}
