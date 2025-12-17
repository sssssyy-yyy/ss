import { AssessmentData, Question, AssessmentType } from "../types";

// 预设题库数据
const QUESTION_DATABASE: Record<string, Question[]> = {
  [AssessmentType.MBTI_LITE]: [
    {
      id: 101,
      text: "在社交聚会上，你通常会？",
      options: [
        { id: "a", text: "主动与很多人交谈，即使是不认识的人", value: 3 },
        { id: "b", text: "只与几个熟悉的朋友交谈", value: 1 },
        { id: "c", text: "视情况而定，有时活跃有时安静", value: 2 }
      ]
    },
    {
      id: 102,
      text: "当你需要做决定时，你更倾向于？",
      options: [
        { id: "a", text: "依据逻辑、事实和数据分析", value: 3 },
        { id: "b", text: "听从内心的感受和价值观", value: 1 },
        { id: "c", text: "咨询他人的意见，折中考虑", value: 2 }
      ]
    },
    {
      id: 103,
      text: "你的工作风格更接近于？",
      options: [
        { id: "a", text: "喜欢按计划行事，不喜欢突发状况", value: 3 },
        { id: "b", text: "喜欢灵活应对，随遇而安", value: 1 },
        { id: "c", text: "先制定大方向，细节随缘", value: 2 }
      ]
    },
    {
      id: 104,
      text: "由于对未来的设想，你经常？",
      options: [
        { id: "a", text: "沉浸在想象中，甚至忽略了当下的细节", value: 3 },
        { id: "b", text: "更关注当下的现实和具体的细节", value: 1 },
        { id: "c", text: "在理想和现实之间努力平衡", value: 2 }
      ]
    },
    {
      id: 105,
      text: "经过一周忙碌的工作后，你更想？",
      options: [
        { id: "a", text: "和朋友出去聚餐、唱K来放松", value: 3 },
        { id: "b", text: "独自在家看书、看电影或休息", value: 1 },
        { id: "c", text: "和家人进行简单的户外活动", value: 2 }
      ]
    },
    {
      id: 106,
      text: "在处理复杂问题时，你通常？",
      options: [
        { id: "a", text: "把它拆解成一个个具体的步骤", value: 3 },
        { id: "b", text: "先寻找核心概念或潜在的模式", value: 1 },
        { id: "c", text: "凭借直觉和过往经验尝试解决", value: 2 }
      ]
    },
    {
      id: 107,
      text: "你认为什么样的人更让你敬佩？",
      options: [
        { id: "a", text: "思维敏捷、逻辑严密的人", value: 3 },
        { id: "b", text: "情感丰富、富有同情心的人", value: 1 },
        { id: "c", text: "脚踏实地、执行力强的人", value: 2 }
      ]
    }
  ],
  [AssessmentType.BIG_FIVE]: [
    {
      id: 201,
      text: "面对新奇的艺术展或前卫的观念，你的态度是？",
      options: [
        { id: "a", text: "非常感兴趣，渴望了解", value: 3 },
        { id: "b", text: "不太感兴趣，更喜欢传统的", value: 1 },
        { id: "c", text: "不排斥，如果有空会去看看", value: 2 }
      ]
    },
    {
      id: 202,
      text: "你的房间或办公桌通常是？",
      options: [
        { id: "a", text: "井井有条，所有东西都在固定位置", value: 3 },
        { id: "b", text: "比较随意，甚至有些凌乱", value: 1 },
        { id: "c", text: "定期整理，平时比较随性", value: 2 }
      ]
    },
    {
      id: 203,
      text: "在团队中，你通常扮演什么角色？",
      options: [
        { id: "a", text: "活跃气氛，带动大家说话", value: 3 },
        { id: "b", text: "安静倾听，必要时才发言", value: 1 },
        { id: "c", text: "协调者，平衡大家的意见", value: 2 }
      ]
    },
    {
      id: 204,
      text: "如果有人向你求助，你会？",
      options: [
        { id: "a", text: "毫不犹豫地放下手头工作去帮忙", value: 3 },
        { id: "b", text: "先评估自己的时间，再决定是否帮忙", value: 1 },
        { id: "c", text: "委婉拒绝，专注于自己的事情", value: 2 }
      ]
    },
    {
      id: 205,
      text: "遇到突发压力或紧急任务时，你会？",
      options: [
        { id: "a", text: "感到焦虑，手心出汗", value: 1 },
        { id: "b", text: "非常冷静，迅速制定应对方案", value: 3 },
        { id: "c", text: "一开始有点慌，但很快能调整过来", value: 2 }
      ]
    }
  ],
  [AssessmentType.STRESS_LEVEL]: [
    {
      id: 301,
      text: "最近一周，你的睡眠质量如何？",
      options: [
        { id: "a", text: "入睡困难，多梦易醒", value: 3 },
        { id: "b", text: "睡眠极佳，一觉到天亮", value: 1 },
        { id: "c", text: "偶尔失眠，总体尚可", value: 2 }
      ]
    },
    {
      id: 302,
      text: "你是否感到容易被小事激怒？",
      options: [
        { id: "a", text: "是的，经常因为琐事发火", value: 3 },
        { id: "b", text: "几乎不会，情绪很平稳", value: 1 },
        { id: "c", text: "偶尔会有情绪波动", value: 2 }
      ]
    },
    {
      id: 303,
      text: "你对未来的工作或生活感到？",
      options: [
        { id: "a", text: "充满不确定性和担忧", value: 3 },
        { id: "b", text: "充满希望和期待", value: 1 },
        { id: "c", text: "按部就班，没什么特别的感觉", value: 2 }
      ]
    },
    {
      id: 304,
      text: "最近是否感到身体疲惫，即使休息也不缓解？",
      options: [
        { id: "a", text: "经常感到精疲力竭", value: 3 },
        { id: "b", text: "精力充沛，身体状况良好", value: 1 },
        { id: "c", text: "工作日比较累，周末能恢复", value: 2 }
      ]
    },
    {
      id: 305,
      text: "你是否有时间进行娱乐或放松活动？",
      options: [
        { id: "a", text: "完全没有时间，被事情塞满了", value: 3 },
        { id: "b", text: "每天都有固定的放松时间", value: 1 },
        { id: "c", text: "偶尔有时间，但不规律", value: 2 }
      ]
    }
  ],
  [AssessmentType.EMOTIONAL_INTELLIGENCE]: [
    {
      id: 401,
      text: "当朋友向你倾诉烦恼时，你通常？",
      options: [
        { id: "a", text: "能敏锐捕捉到对方的情绪并给予安慰", value: 3 },
        { id: "b", text: "急于给对方提供解决问题的建议", value: 1 },
        { id: "c", text: "默默倾听，不知道该说什么", value: 2 }
      ]
    },
    {
      id: 402,
      text: "当你非常愤怒时，你会？",
      options: [
        { id: "a", text: "立刻爆发出来，不吐不快", value: 1 },
        { id: "b", text: "深呼吸，试图冷静分析原因", value: 3 },
        { id: "c", text: "压抑在心里，生闷气", value: 2 }
      ]
    },
    {
      id: 403,
      text: "你能否轻易察觉到他人的言外之意？",
      options: [
        { id: "a", text: "是的，我很擅长察言观色", value: 3 },
        { id: "b", text: "不太行，我比较关注字面意思", value: 1 },
        { id: "c", text: "熟悉的人可以，陌生人不行", value: 2 }
      ]
    },
    {
      id: 404,
      text: "面对失败或挫折，你的心态是？",
      options: [
        { id: "a", text: "非常沮丧，很难走出来", value: 1 },
        { id: "b", text: "视为学习机会，快速调整状态", value: 3 },
        { id: "c", text: "需要一段时间调整，但能恢复", value: 2 }
      ]
    },
    {
      id: 405,
      text: "在与人发生冲突时，你会？",
      options: [
        { id: "a", text: "据理力争，一定要赢", value: 1 },
        { id: "b", text: "试图理解对方的立场，寻找共识", value: 3 },
        { id: "c", text: "为了避免尴尬，选择回避", value: 2 }
      ]
    }
  ]
};

// 默认备用题目
const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 999,
    text: "你更喜欢哪种工作方式？",
    options: [
      { id: "a", text: "独立完成", value: 1 },
      { id: "b", text: "团队合作", value: 3 },
      { id: "c", text: "混合模式", value: 2 }
    ]
  },
  {
    id: 998,
    text: "遇到困难时，你会？",
    options: [
      { id: "a", text: "寻求帮助", value: 3 },
      { id: "b", text: "自己钻研", value: 1 },
      { id: "c", text: "暂时搁置", value: 2 }
    ]
  },
  {
    id: 997,
    text: "你如何看待新事物？",
    options: [
      { id: "a", text: "积极拥抱", value: 3 },
      { id: "b", text: "谨慎观察", value: 1 },
      { id: "c", text: "看心情", value: 2 }
    ]
  },
  {
    id: 996,
    text: "你的业余时间通常用来？",
    options: [
      { id: "a", text: "学习充电", value: 3 },
      { id: "b", text: "彻底放松", value: 1 },
      { id: "c", text: "陪伴家人", value: 2 }
    ]
  },
  {
    id: 995,
    text: "你认为自己是一个？",
    options: [
      { id: "a", text: "乐观主义者", value: 3 },
      { id: "b", text: "现实主义者", value: 1 },
      { id: "c", text: "悲观主义者", value: 2 }
    ]
  }
];

export const getRandomQuestions = (topic: string, count: number = 5): AssessmentData => {
  const pool = QUESTION_DATABASE[topic] || FALLBACK_QUESTIONS;
  
  // 随机打乱数组
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  
  // 取前 count 个
  const selected = shuffled.slice(0, count);

  return {
    title: topic,
    description: `这是关于 ${topic} 的标准测评问卷。`,
    questions: selected
  };
};
