import type { QuestionCategory, QuestionCategoryKey } from "../types/index.ts";

export const QUESTION_CATEGORIES: Record<QuestionCategoryKey, QuestionCategory> = {
  感情婚姻: {
    key: "感情婚姻",
    label: "感情婚姻",
    primaryYongShen: "结合提问身份判断：男看妻财，女看官鬼",
    secondaryReferences: ["应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "感情类占问通常结合提问者身份细分用神。男问感情多以妻财为主，女问感情多以官鬼为主，并参考世应互动。"
  },
  正缘桃花: {
    key: "正缘桃花",
    label: "正缘桃花",
    primaryYongShen: "结合提问身份判断：男看妻财，女看官鬼",
    secondaryReferences: ["子孙", "应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "用于判断缘分出现、互动意愿与关系推进节奏，后续可扩展桃花、合冲与世应规则。"
  },
  财运生意: {
    key: "财运生意",
    label: "财运生意",
    primaryYongShen: "妻财",
    secondaryReferences: ["世爻", "应爻", "官鬼"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "财运与生意以财爻为主，后续会加入财源、阻力、合作对象与风险控制相关规则。"
  },
  求职事业: {
    key: "求职事业",
    label: "求职事业",
    primaryYongShen: "官鬼",
    secondaryReferences: ["父母", "世爻", "应爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "官鬼可代表职位、约束、制度与压力，父母可参考简历、文书、证明材料。"
  },
  学业考试: {
    key: "学业考试",
    label: "学业考试",
    primaryYongShen: "父母",
    secondaryReferences: ["官鬼", "世爻", "子孙"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "父母可代表试卷、成绩、文书与学习成果，官鬼也可表示考试压力与制度门槛。"
  },
  论文投稿: {
    key: "论文投稿",
    label: "论文投稿",
    primaryYongShen: "父母",
    secondaryReferences: ["官鬼", "应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "父母代表论文、文书、录用通知；官鬼代表审稿压力、规则门槛；应爻代表期刊、编辑部、审稿方。"
  },
  文书申请: {
    key: "文书申请",
    label: "文书申请",
    primaryYongShen: "父母",
    secondaryReferences: ["官鬼", "应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "常用于申请材料、审批文件、盖章流程与制度门槛分析。"
  },
  消息联络: {
    key: "消息联络",
    label: "消息联络",
    primaryYongShen: "父母",
    secondaryReferences: ["应爻", "世爻", "子孙"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "可用于判断回复速度、沟通意愿与消息是否顺利到达。"
  },
  疾病健康: {
    key: "疾病健康",
    label: "疾病健康",
    primaryYongShen: "官鬼",
    secondaryReferences: ["子孙", "世爻", "父母"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "健康议题后续会补充六亲、六神与日月旺衰，不在第一版做结论性判断。"
  },
  官司纠纷: {
    key: "官司纠纷",
    label: "官司纠纷",
    primaryYongShen: "官鬼",
    secondaryReferences: ["父母", "应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "适用于法务、争议、仲裁与制度博弈，后续可扩展文书证据与胜负倾向规则。"
  },
  出行迁移: {
    key: "出行迁移",
    label: "出行迁移",
    primaryYongShen: "世爻",
    secondaryReferences: ["应爻", "子孙", "官鬼"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "后续将结合冲合、动变与空亡查看出行阻碍、顺利程度与环境变化。"
  },
  寻人寻物: {
    key: "寻人寻物",
    label: "寻人寻物",
    primaryYongShen: "根据对象类型细分",
    secondaryReferences: ["应爻", "世爻", "父母"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "第一版先保留分类结构，后续再细化寻人、寻物、失联、方位与时间判断。"
  },
  合作项目: {
    key: "合作项目",
    label: "合作项目",
    primaryYongShen: "应爻",
    secondaryReferences: ["世爻", "妻财", "官鬼"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "重点看双方互动、利益点、规则阻碍与项目推进节奏。"
  },
  其它杂占: {
    key: "其它杂占",
    label: "其它杂占",
    primaryYongShen: "待根据问题确定",
    secondaryReferences: ["世爻", "应爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "用于暂时无法归类的问题。后续可加入更细分类和取用神引导。"
  }
};

export const QUESTION_CATEGORY_LIST = Object.values(QUESTION_CATEGORIES);

