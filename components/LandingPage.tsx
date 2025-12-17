import React from 'react';
import { AssessmentType } from '../types';
import { Sparkles, Briefcase, Activity, Heart, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onSelectTopic: (topic: AssessmentType) => void;
}

const cards = [
  {
    type: AssessmentType.MBTI_LITE,
    title: "职业性格倾向",
    description: "基于荣格理论，探索你的职业潜能与性格类型。",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    type: AssessmentType.BIG_FIVE,
    title: "大五人格特质",
    description: "心理学界公认的人格模型，全面解析你的五大维度。",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600",
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    type: AssessmentType.STRESS_LEVEL,
    title: "综合压力评估",
    description: "感知当下的焦虑与压力源，获取调节建议。",
    icon: Activity,
    color: "bg-rose-50 text-rose-600",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    type: AssessmentType.EMOTIONAL_INTELLIGENCE,
    title: "情商 (EQ) 探索",
    description: "了解你对自己及他人情绪的感知与管理能力。",
    icon: Heart,
    color: "bg-teal-50 text-teal-600",
    gradient: "from-teal-500 to-emerald-500",
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTopic }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          AI 驱动的<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            深度心理洞察
          </span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          MindSight 结合先进的 Gemini 机器学习模型，为您实时生成动态测评，
          深度剖析性格特质，提供个性化的成长建议。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => onSelectTopic(card.type)}
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 text-left hover:-translate-y-1"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-bl-full transition-opacity group-hover:opacity-10`} />
            
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="bg-slate-50 rounded-full p-2 group-hover:bg-indigo-50 transition-colors">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{card.description}</p>
          </button>
        ))}
      </div>
      
      {/* Decorative Feature Section */}
      <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">为什么选择 AI 测评?</h2>
            <ul className="space-y-3 text-indigo-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/> 
                动态生成问题，避免背题效应
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/> 
                基于语义理解的深度回答分析
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/> 
                即时生成可视化多维报告
              </li>
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-3">
              <div className="h-2 bg-white/20 rounded w-3/4"></div>
              <div className="h-2 bg-white/20 rounded w-full"></div>
              <div className="h-2 bg-white/20 rounded w-5/6"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-8 rounded-full bg-indigo-400/50"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-2 bg-white/30 rounded w-full"></div>
                    <div className="h-2 bg-white/30 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>
    </div>
  );
};

export default LandingPage;