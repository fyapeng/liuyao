# [codex] scaffold liuyao casting system v1

## 已实现内容

- 搭建 `Next.js + React + TypeScript` 项目骨架
- 支持随机起卦与手动起卦
- 固定三枚硬币规则映射与六爻自下而上排盘
- 自动生成本卦、变卦与动爻标记
- 自动匹配本卦与变卦卦名
- 提供占事问题输入框与占事分类下拉框
- 第一版分析面板展示分类、主用神、辅助参考与说明
- 增加基础单元测试

## 项目结构

- `app/`
  - 页面入口与全局样式
- `src/data/`
  - 规则数据、64 卦、分类数据与后续扩展占位
- `src/lib/`
  - 排卦、变卦、查卦名、规则引擎占位逻辑
- `src/components/`
  - 表单、排盘展示、分析面板等 UI 组件
- `tests/`
  - 核心逻辑测试

## 如何运行

```bash
npm install
npm run dev
```

## 如何测试

```bash
npm run test
```

## 已实现模块

- `src/data/coinRules.ts`
- `src/data/hexagrams.ts`
- `src/data/questionCategories.ts`
- `src/lib/castHexagram.ts`
- `src/lib/changeHexagram.ts`
- `src/lib/getHexagramName.ts`
- `src/lib/getTrigrams.ts`
- `src/components/CoinSelector.tsx`
- `src/components/RandomCastButton.tsx`
- `src/components/HexagramDisplay.tsx`
- `src/components/LineDisplay.tsx`
- `src/components/QuestionForm.tsx`
- `src/components/HexagramResult.tsx`
- `src/components/AnalysisPanel.tsx`
- `src/components/RuleHitList.tsx`

## 为后续扩展预留的模块

- `src/data/najia.ts`
- `src/data/shiYing.ts`
- `src/data/sixGods.ts`
- `src/data/earthlyBranches.ts`
- `src/data/ruleTemplates.ts`
- `src/lib/getNajia.ts`
- `src/lib/getShiYing.ts`
- `src/lib/getSixRelatives.ts`
- `src/lib/getSixGods.ts`
- `src/lib/getDayMonthStrength.ts`
- `src/lib/ruleEngine.ts`
