# 六爻排盘与规则辅助分析系统（V1）

一个基于 **Next.js + React + TypeScript** 的六爻排盘工具骨架项目。  
当前版本聚焦：**准确起卦、排卦、动爻识别、变卦生成与可扩展架构**。

---

## 项目定位

第一版目标：
- 完成随机/手动起卦流程；
- 严格落实三枚硬币规则；
- 输出本卦、动爻与变卦；
- 提供占事分类和基础规则说明面板；
- 预留后续纳甲、世应、六亲、六神、规则命中等模块接口。

> 当前版本 **不包含 AI 自动解卦**，也不输出绝对吉凶结论。

---

## 已实现功能

- [x] 两种起卦方式：随机起卦、手动起卦（六次选择）
- [x] 三枚硬币固定规则映射（6/7/8/9）
- [x] 本卦生成（六爻从初爻到上爻，1=阳，0=阴）
- [x] 动爻识别与标记（老阴×、老阳○）
- [x] 变卦生成
- [x] 本卦/变卦卦名识别与展示
- [x] 每一爻详细信息展示（爻位、硬币结果、数值、阴阳类别、动静）
- [x] 占事问题输入框 + 占事分类下拉框
- [x] 第一版 AnalysisPanel（主用神、辅助参考、说明、后续占位）
- [x] 页面底部“规则分析”“案例记录”预留区域
- [x] 基础单元测试（硬币规则、变卦逻辑、示例卦）

---

## 快速开始

```bash
npm install
npm run dev
```

默认访问：`http://localhost:3000`

---

## 运行测试

```bash
npm test
```

测试覆盖：
1. 硬币转换规则（字字字/字字花/字花花/花花花）
2. 变卦逻辑（老阴老阳变化，少阴少阳不变）
3. 示例卦（雷天大壮 -> 雷泽归妹）

---

## 项目结构

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    CoinSelector.tsx
    RandomCastButton.tsx
    HexagramDisplay.tsx
    LineDisplay.tsx
    QuestionForm.tsx
    HexagramResult.tsx
    AnalysisPanel.tsx
    RuleHitList.tsx
  data/
    coinRules.ts
    hexagrams.ts
    questionCategories.ts
    najia.ts
    shiYing.ts
    sixGods.ts
    earthlyBranches.ts
    ruleTemplates.ts
  lib/
    castHexagram.ts
    changeHexagram.ts
    getHexagramName.ts
    getTrigrams.ts
    getNajia.ts
    getShiYing.ts
    getSixRelatives.ts
    getSixGods.ts
    getDayMonthStrength.ts
    ruleEngine.ts
  __tests__/
    liuyao.test.ts
  types/
    index.ts
```

---

## 后续 TODO

1. 完整纳甲数据
2. 八宫与世应
3. 六亲计算
4. 六神计算
5. 日月旺衰
6. 空亡、月破、合冲刑害
7. 分类取用神
8. 规则命中系统
9. 有利因素/不利因素归纳
10. 案例保存与复盘
11. AI 辅助解释接口

---

## 说明

如在某些网络环境中 `npm install` 失败（如镜像/代理权限限制），请切换可访问 npm registry 的网络后重试。
