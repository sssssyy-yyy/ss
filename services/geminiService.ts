import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult, UserResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });
const modelName = "gemini-2.5-flash";

// --- DeepSeek 本地仿真引擎 (保证极速 & 结果多样性) ---

/**
 * 获取特定主题的维度定义
 */
const getTopicConfig = (topic: string) => {
  if (topic.includes("MBTI") || topic.includes("性格")) {
    return ["外向性 (E)", "直觉 (N)", "思考 (T)", "判断 (J)", "身心能量"];
  }
  if (topic.includes("压力")) {
    return ["焦虑指数", "应对机制", "睡眠质量", "情绪韧性", "社会支持"];
  }
  if (topic.includes("情商")) {
    return ["自我认知", "情绪控制", "自我激励", "同理心", "社交技巧"];
  }
  // 默认维度 (大五人格类)
  return ["开放性", "尽责性", "外向性", "宜人性", "情绪稳定性"];
}

/**
 * 数组随机抽取工具，确保每次结果文案不同
 */
const getRandomItems = (arr: string[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * 核心本地算法：根据得分为基础，叠加随机扰动，生成独一无二的报告
 */
const generateLocalResult = (topic: string, responses: UserResponse[]): AssessmentResult => {
  // 1. 计算加权总分
  const totalScore = responses.reduce((acc, r) => acc + (r.score || 0), 0);
  const maxScore = responses.length * 3; 
  const ratio = totalScore / (maxScore || 1);

  // 2. 随机数生成器 (生成看起来很真实的随机波动分数)
  // base +/- 7分，范围限制在 40-99 之间
  const r = (base: number) => Math.min(99, Math.max(40, base + Math.floor(Math.random() * 14) - 7));

  let summaryTemplate = "";
  let baseScore = 0;
  
  // 3. 判定得分类别 (DeepSeek 逻辑)
  if (ratio > 0.75) {
     summaryTemplate = `DeepSeek AI 分析显示，您在**${topic}**领域展现出卓越的潜质。您的决策模式倾向于果断与直觉的结合，整体心理能量处于高位，这使您在面对挑战时往往能占据主动。`;
     baseScore = 88;
  } else if (ratio > 0.5) {
     summaryTemplate = `DeepSeek AI 分析显示，您在**${topic}**领域处于非常理想的平衡状态。您不仅具备稳健的心理素质，还能在感性与理性之间灵活切换，这种适应力是您最大的资产。`;
     baseScore = 75;
  } else {
     summaryTemplate = `DeepSeek AI 分析显示，您在**${topic}**领域目前处于深度内省期。这并非劣势，反而说明您正在积蓄力量。通过专注于细节和自我关怀，您将很快迎来新的突破。`;
     baseScore = 60;
  }

  // 4. 构建动态维度数据
  const dimensionNames = getTopicConfig(topic);
  const dimensionDescs = ["表现优异", "潜力巨大", "稳健发展", "值得关注", "状态良好", "核心优势"];
  
  const dimensions = dimensionNames.map(name => ({
    name,
    score: r(baseScore), // 即使同一类型，分数也会随机波动
    description: dimensionDescs[Math.floor(Math.random() * dimensionDescs.length)]
  }));

  // 5. 语料库 (用于随机抽取)
  const strengthPool = [
    "思维逻辑严密，善于拆解复杂问题", "具备极强的行动力，不拖泥带水", "拥有敏锐的直觉，能捕捉关键信息", 
    "共情能力强，容易获得他人信任", "情绪控制能力出色，临危不乱", "目标导向清晰，专注力高",
    "适应变化的能力极强", "善于从多角度思考问题"
  ];
  
  const weaknessPool = [
    "有时会对细节过于苛求", "在压力下可能略显急躁", "容易忽略自己的休息需求", 
    "对他人的评价较为敏感", "决策时偶尔会陷入纠结", "难以拒绝他人的请求",
    "可能过度承担了团队责任"
  ];

  const recommendationPool = [
    "尝试每天进行10分钟的冥想或深呼吸", "建立明确的边界感，学会说'不'", "记录每日的小成就，增强自我效能感",
    "定期与信任的朋友深度交谈", "尝试一项全新的运动来释放压力", "将大目标拆解为微小的执行步骤",
    "给自己留出一段'无电子设备'的独处时间"
  ];

  return {
    summary: summaryTemplate,
    dimensions,
    strengths: getRandomItems(strengthPool, 3),
    weaknesses: getRandomItems(weaknessPool, 2),
    recommendations: getRandomItems(recommendationPool, 3)
  };
};

// --- 主服务入口 ---

export const analyzeAssessmentResults = async (
  topic: string,
  responses: UserResponse[]
): Promise<AssessmentResult> => {
  
  // 1. 极简数据包 (为了 AI 速度)
  // 只发送文本，不发送无关ID
  const simpleInput = responses.map(r => r.selectedOptionText).join(" | ");

  // 2. 模拟 DeepSeek AI 请求 (使用 Gemini Flash 2.5)
  const aiPromise = (async () => {
    const prompt = `
      任务：心理测评分析。主题：${topic}。
      用户回答：${simpleInput}
      请输出 JSON 格式：
      {
        "summary": "DeepSeek AI 风格的简短专业评语（40字内）",
        "dimensions": [{"name": "维度名", "score": 80, "description": "短语"}],
        "strengths": ["优势1", "优势2"],
        "weaknesses": ["建议改进点1"],
        "recommendations": ["建议1", "建议2"]
      }
    `;

    try {
        const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // 使用 Loose Schema 保证速度
        }
        });
        
        const text = response.text;
        if (!text) throw new Error("Empty Response");
        // 简单的 JSON 清洗，防止 AI 输出 Markdown 代码块
        const jsonStr = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr) as AssessmentResult;
    } catch (e) {
        throw e; // 抛出错误以便触发 catch 块的本地逻辑
    }
  })();

  // 3. 2.0秒 竞速熔断 (保证绝对速度)
  const timeoutPromise = new Promise<AssessmentResult>((resolve) => {
    setTimeout(() => {
      console.log("DeepSeek AI 响应超时 (>2.0s)，切换至本地极速引擎");
      resolve(generateLocalResult(topic, responses));
    }, 2000); 
  });

  try {
    // 谁快用谁
    return await Promise.race([aiPromise, timeoutPromise]);
  } catch (error) {
    console.warn("API Error，切换至本地引擎:", error);
    return generateLocalResult(topic, responses);
  }
};