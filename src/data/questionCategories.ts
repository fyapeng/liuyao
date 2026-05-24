import { CategoryRule } from '@/types';

export const questionCategories: CategoryRule[] = [
  { key: 'love', label: '感情婚姻', primaryYongShen: '按提问者性别：男取妻财，女取官鬼', secondaryReferences: ['应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '用于亲密关系与婚姻进展分析。' },
  { key: 'soulmate', label: '正缘桃花', primaryYongShen: '男取妻财，女取官鬼', secondaryReferences: ['应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '聚焦缘分质量、出现时机、稳定度。' },
  { key: 'wealth', label: '财运生意', primaryYongShen: '妻财', secondaryReferences: ['兄弟', '官鬼', '世爻'], favorableRules: [], unfavorableRules: [], notes: '看收益、回款、开销与竞争压力。' },
  { key: 'career', label: '求职事业', primaryYongShen: '官鬼', secondaryReferences: ['父母', '应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '关注岗位机会、流程阻碍和录用节奏。' },
  { key: 'study', label: '学业考试', primaryYongShen: '父母', secondaryReferences: ['官鬼', '子孙', '世爻'], favorableRules: [], unfavorableRules: [], notes: '用于考试发挥、结果通知和学习状态。' },
  { key: 'paper', label: '论文投稿', primaryYongShen: '父母', secondaryReferences: ['官鬼', '应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '父母代表论文、文书、录用通知；官鬼代表审稿压力、规则门槛；应爻代表期刊、编辑部、审稿方。' },
  { key: 'docs', label: '文书申请', primaryYongShen: '父母', secondaryReferences: ['官鬼', '应爻'], favorableRules: [], unfavorableRules: [], notes: '涉及材料准备、审批流程、反馈结果。' },
  { key: 'contact', label: '消息联络', primaryYongShen: '父母', secondaryReferences: ['应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '关注消息是否到达、是否回复、回复质量。' },
  { key: 'health', label: '疾病健康', primaryYongShen: '官鬼', secondaryReferences: ['子孙', '世爻'], favorableRules: [], unfavorableRules: [], notes: '仅作规则辅助，不替代医学建议。' },
  { key: 'lawsuit', label: '官司纠纷', primaryYongShen: '官鬼', secondaryReferences: ['父母', '应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '用于程序进展、证据材料与对方态势观察。' },
  { key: 'travel', label: '出行迁移', primaryYongShen: '世爻', secondaryReferences: ['应爻', '父母'], favorableRules: [], unfavorableRules: [], notes: '看行程顺利度与外部条件变化。' },
  { key: 'search', label: '寻人寻物', primaryYongShen: '用神按对象而定', secondaryReferences: ['应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '后续补充更细粒度规则模板。' },
  { key: 'coop', label: '合作项目', primaryYongShen: '应爻', secondaryReferences: ['世爻', '妻财', '官鬼'], favorableRules: [], unfavorableRules: [], notes: '看对方意愿、资源匹配和执行障碍。' },
  { key: 'misc', label: '其它杂占', primaryYongShen: '按问题取用神', secondaryReferences: ['应爻', '世爻'], favorableRules: [], unfavorableRules: [], notes: '用于暂未归类问题。' }
];
