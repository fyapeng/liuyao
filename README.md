# 六爻排盘与规则辅助分析系统

基于 `Next.js + React + TypeScript` 的六爻排盘项目骨架。第一版优先保证排卦准确、动爻标记明确、变卦生成清晰，并为后续纳甲、六亲、世应、六神、日月旺衰与规则命中系统预留稳定的数据结构和模块边界。

## 已实现内容

- 支持随机起卦与手动起卦
- 固定三枚硬币规则映射
- 六爻从下到上排盘
- 自动生成本卦与变卦
- 自动标记动爻
- 自动匹配本卦与变卦卦名
- 本卦 / 变卦并排展示，移动端自动上下排列
- 占事问题输入框
- 占事分类数据结构与第一版分析面板
- 基础单元测试

## 项目结构

```text
app/
  layout.tsx
  page.tsx
  globals.css
src/
  components/
  data/
  lib/
  types/
tests/
```

其中：

- `src/data`：规则与基础数据
- `src/lib`：排卦、变卦、查卦名、后续规则接口
- `src/components`：页面 UI 组件
- `tests`：基础单元测试

## 如何运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看页面。

## 如何测试

```bash
npm run test
```

## GitHub Pages 部署

这个项目已经预留了 GitHub Pages 自动部署工作流：

- 工作流文件：`.github/workflows/deploy-pages.yml`
- Next.js 已配置为静态导出：`next.config.ts`
- 推送到 `main` 后可由 GitHub Actions 自动构建并发布

建议你在 GitHub 仓库中确认以下设置：

1. 进入 `Settings -> Pages`
2. `Source` 选择 `GitHub Actions`
3. 保持默认的 `main` 分支触发工作流

如果你要绑定自定义域名，有两种方式：

- 直接在 GitHub Pages 设置页填写自定义域名
- 或在 `public/CNAME` 中写入你的域名后一起发布

如果你把域名告诉我，我可以直接把 `public/CNAME` 也补进项目里。

当前测试覆盖：

- 硬币规则映射
- 变卦逻辑
- 示例卦结果校验

## 当前已实现模块

- `coinRules.ts`
- `hexagrams.ts`
- `questionCategories.ts`
- `castHexagram.ts`
- `changeHexagram.ts`
- `getHexagramName.ts`
- `getTrigrams.ts`
- `CoinSelector.tsx`
- `RandomCastButton.tsx`
- `HexagramDisplay.tsx`
- `LineDisplay.tsx`
- `QuestionForm.tsx`
- `HexagramResult.tsx`
- `AnalysisPanel.tsx`
- `RuleHitList.tsx`

## 为后续扩展预留的模块

- `najia.ts`
- `shiYing.ts`
- `sixGods.ts`
- `earthlyBranches.ts`
- `ruleTemplates.ts`
- `getNajia.ts`
- `getShiYing.ts`
- `getSixRelatives.ts`
- `getSixGods.ts`
- `getDayMonthStrength.ts`
- `ruleEngine.ts`

## TODO

1. 完整纳甲数据
2. 八宫与世应
3. 六亲计算
4. 六神计算
5. 日月旺衰
6. 空亡、月破、合冲刑害
7. 分类取用神
8. 规则命中系统
9. 有利因素 / 不利因素归纳
10. 案例保存与复盘
11. AI 辅助解释接口
