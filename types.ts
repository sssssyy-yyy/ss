export enum AppView {
  LANDING = 'LANDING',
  ASSESSMENT = 'ASSESSMENT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
}

export interface Option {
  id: string;
  text: string;
  value: number; // Internal scoring value
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface AssessmentData {
  title: string;
  description: string;
  questions: Question[];
}

export interface DimensionScore {
  name: string;
  score: number; // 0-100 normalized
  description: string;
}

export interface AssessmentResult {
  summary: string;
  dimensions: DimensionScore[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface UserResponse {
  questionId: number;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  score: number; // Captured from Option.value
}

export enum AssessmentType {
  MBTI_LITE = '职业性格倾向 (MBTI-Lite)',
  BIG_FIVE = '大五人格特质',
  STRESS_LEVEL = '综合压力水平',
  EMOTIONAL_INTELLIGENCE = '情商 (EQ) 评估',
}