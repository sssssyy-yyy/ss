import { AssessmentResult, UserResponse } from "../types";

// --- 本地分析引擎配置 ---

// 1. 维度定义
const TOPIC_DIMENSIONS: Record<string, string[]> = {
  "default": ["开放性", "尽责性", "外向性", "宜人性", "情绪稳定性"],
  "MBTI": ["外向性 (E)", "直觉 (N)", "思考 (T)", "判断 (J)", "能量水平"],
  "压力": ["焦虑指数", "应对机制", "睡眠质量", "情绪韧性", "社会支持"],
  "情商": ["自我认知", "情绪控制", "自我激励", "同理心", "社交技巧"]
};

// 2. 结果语料库 (按分数段：高/中/低)
// 结构：Topic -> Level -> Array of Strings
const SUMMARY_POOL: Record<string, { high: string[], mid: string[], low: string[] }> = {
  "default": {
    high: [
      "分析显示您在该领域展现出卓越的潜质，各项指标均处于高位，具备极强的适应力。",
      "您的心理能量非常充沛，在面对复杂环境时能保持清晰的判断和积极的行动力。",
      "您处于最佳状态，无论是内在的稳定性还是外在的表现力都令人印象深刻。"
    ],
    mid: [
      "您的状态整体平衡，在感性与理性之间找到了很好的支点，具备稳健发展的潜力。",
      "分析显示您目前处于平稳期，虽无大起大落，但这种稳定性正是您当前最宝贵的资产。",
      "您在各方面表现均衡，既有突出的亮点，也有可提升的空间，未来可期。"
    ],
    low: [
      "您目前可能处于一个内省或调整期，建议给予自己更多的耐心和关怀。",
      "分析显示您正在积蓄力量，虽然当前面临一些挑战，但这往往是突破的前奏。",
      "建议您适当放慢脚步，关注内心的真实需求，平衡生活与工作的节奏。"
    ]
  }
};

const STRENGTH_POOL = [
  "思维逻辑严密，善于拆解复杂问题", "具备极强的行动力，拒绝拖延", "拥有敏锐的直觉，能捕捉关键信息", 
  "共情能力强，容易获得他人信任", "情绪控制能力出色，临危不乱", "目标导向清晰，专注力高",
  "适应变化的能力极强", "善于从多角度思考问题", "具备优秀的团队协作精神", "抗压能力强，能在逆境中成长",
  "善于倾听，能理解他人的言外之意", "具备成长型思维，乐于学习新知", "做事有条理，注重细节",
  "富有创造力，常有新颖的点子", "诚实守信，让人感到可靠"
];

const WEAKNESS_POOL = [
  "有时会对细节过于苛求，导致进度变慢", "在压力极大时可能略显急躁", "容易忽略自己的休息需求", 
  "对他人的评价较为敏感，容易内耗", "决策时偶尔会陷入纠结，难以取舍", "难以拒绝他人的请求，容易过劳",
  "可能过度承担了团队责任", "有时过于理性，忽略了情感因素", "对新环境的适应需要较长时间",
  "过于追求完美，导致自我压力过大", "有时过于谦虚，不敢表现自己", "在公众场合发言容易紧张"
];

const RECOMMENDATION_POOL = [
  "尝试每天进行10分钟的冥想或深呼吸，通过正念练习回归当下。", 
  "建立明确的个人边界，学会温和而坚定地说'不'。", 
  "记录每日的3个'小确幸'或成就，利用积极心理学增强自我效能感。",
  "每周预留一段'无电子设备'的独处时间，进行深度阅读或思考。", 
  "尝试一项全新的运动（如瑜伽或慢跑）来释放累积的皮质醇（压力荷尔蒙）。", 
  "将宏大的年度目标拆解为微小的、可立即执行的步骤，降低启动阻力。",
  "定期与信任的朋友或导师进行深度交谈，获取外部视角。",
  "优化睡眠环境，保证每晚7-8小时的高质量睡眠。",
  "培养一个新的兴趣爱好，与工作完全无关，纯粹为了快乐。",
  "在感到焦虑时，尝试'54321'着陆法，通过感官体验拉回注意力。"
];

// --- 辅助工具函数 ---

// 随机获取数组中的N个不重复项
const getRandomItems = (arr: string[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 获取带有随机波动的分数 (base +/- range)
const getJitteredScore = (base: number, range: number = 10) => {
  const jitter = Math.floor(Math.random() * (range * 2 + 1)) - range;
  return Math.min(100, Math.max(40, base + jitter));
};

// --- 核心服务逻辑 ---

export const analyzeAssessmentResults = async (
  topic: string,
  responses: UserResponse[]
): Promise<AssessmentResult> => {
  
  // 模拟异步延迟，让用户感觉正在“分析”
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 1. 计算基础得分 (0-100)
  // 假设每题最高3分，最低1分
  const totalPossible = responses.length * 3;
  const actualScore = responses.reduce((acc, r) => acc + r.score, 0);
  const ratio = totalPossible > 0 ? actualScore / totalPossible : 0.5;
  const normalizedScore = Math.round(ratio * 100);

  // 2. 确定维度配置
  let dimKeys = TOPIC_DIMENSIONS["default"];
  if (topic.includes("MBTI") || topic.includes("性格")) dimKeys = TOPIC_DIMENSIONS["MBTI"];
  if (topic.includes("压力")) dimKeys = TOPIC_DIMENSIONS["压力"];
  if (topic.includes("情商")) dimKeys = TOPIC_DIMENSIONS["情商"];

  // 3. 生成维度数据 (基于总分 + 随机噪音)
  // 这样即使两次总分一样，雷达图形状也会略有不同
  const dimensions = dimKeys.map(name => {
    // 不同的维度有不同的随机偏移方向
    const score = getJitteredScore(normalizedScore, 12);
    let desc = "状态良好";
    if (score > 80) desc = "表现卓越";
    else if (score > 60) desc = "稳健发展";
    else desc = "有提升空间";

    return { name, score, description: desc };
  });

  // 4. 选择总结语 (基于分数段 + 随机抽取)
  const poolKey = "default"; // 目前所有Topic共用一个通用语料库，可以扩展
  const pools = SUMMARY_POOL[poolKey];
  let summaryArr = pools.mid;
  if (normalizedScore >= 75) summaryArr = pools.high;
  if (normalizedScore <= 55) summaryArr = pools.low;
  
  const summary = getRandomItems(summaryArr, 1)[0];

  // 5. 随机抽取详情 (优势/劣势/建议)
  // 优势倾向于从高分池抽，建议倾向于从通用池抽
  // 这里为了简单且多样，直接全池随机，保证每次都不一样
  const strengths = getRandomItems(STRENGTH_POOL, 3);
  const weaknesses = getRandomItems(WEAKNESS_POOL, 2);
  const recommendations = getRandomItems(RECOMMENDATION_POOL, 3);

  return {
    summary,
    dimensions,
    strengths,
    weaknesses,
    recommendations
  };
};