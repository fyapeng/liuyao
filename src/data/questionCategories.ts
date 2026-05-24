import type { QuestionCategory, QuestionCategoryKey } from "../types/index.ts";

export const QUESTION_CATEGORIES: Record<QuestionCategoryKey, QuestionCategory> = {
  感情婚姻: {
    key: "感情婚姻",
    label: "感情婚姻",
    primaryYongShen: "结合提问身份判断：男看妻财，女看官鬼",
    secondaryReferences: ["应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "感情婚姻类占问通常先区分提问者身份，再结合世应关系、动爻位置与后续用神规则综合判断。"
  },
  正缘桃花: {
    key: "正缘桃花",
    label: "正缘桃花",
    primaryYongShen: "结合提问身份判断：男看妻财，女看官鬼",
    secondaryReferences: ["应爻", "世爻", "子孙"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "用于观察缘分出现、彼此吸引、关系推进节奏，后续可扩展桃花、合冲与世应规则。"
  },
  财运生意: {
    key: "财运生意",
    label: "财运生意",
    primaryYongShen: "妻财",
    secondaryReferences: ["世爻", "应爻", "官鬼"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "财运与生意以财爻为主，后续会加入回款、竞争、阻力与合作对象相关规则。"
  },
  求职事业: {
    key: "求职事业",
    label: "求职事业",
    primaryYongShen: "官鬼",
    secondaryReferences: ["父母", "世爻", "应爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "官鬼可代表职位、制度与压力，父母可参考简历、证明、通知与流程文件。"
  },
  学业考试: {
    key: "学业考试",
    label: "学业考试",
    primaryYongShen: "父母",
    secondaryReferences: ["官鬼", "世爻", "子孙"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "父母可代表试卷、成绩、材料与学习成果，官鬼也可代表考试压力和门槛。"
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
    notes: "适用于申请材料、审批文件、盖章流程与制度门槛分析。"
  },
  消息联络: {
    key: "消息联络",
    label: "消息联络",
    primaryYongShen: "父母",
    secondaryReferences: ["应爻", "世爻", "子孙"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "用于观察消息是否送达、是否回复、互动速度以及沟通意愿。"
  },
  疾病健康: {
    key: "疾病健康",
    label: "疾病健康",
    primaryYongShen: "官鬼",
    secondaryReferences: ["子孙", "世爻", "父母"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "当前版本不做医学性结论，只保留后续六亲、六神、旺衰与规则分析接口。"
  },
  官司纠纷: {
    key: "官司纠纷",
    label: "官司纠纷",
    primaryYongShen: "官鬼",
    secondaryReferences: ["父母", "应爻", "世爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "适用于争议、程序推进、文书证据与制度博弈场景。"
  },
  出行迁移: {
    key: "出行迁移",
    label: "出行迁移",
    primaryYongShen: "世爻",
    secondaryReferences: ["应爻", "子孙", "官鬼"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "后续将结合动变、空亡、合冲与环境变化判断出行阻碍和迁移走势。"
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
    notes: "重点看双方互动、资源匹配、利益点与项目推进节奏。"
  },
  其它杂占: {
    key: "其它杂占",
    label: "其它杂占",
    primaryYongShen: "待根据问题确定",
    secondaryReferences: ["世爻", "应爻"],
    favorableRules: [],
    unfavorableRules: [],
    notes: "用于暂时无法归类的问题，后续可加入更细的引导与取用神模板。"
  }
};
