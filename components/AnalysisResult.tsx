import React, { useEffect, useState } from 'react';
import { AssessmentResult, UserResponse } from '../types';
import { analyzeAssessmentResults } from '../services/geminiService';
import { Loader2, RefreshCcw, Download, Share2 } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';

interface AnalysisResultProps {
  topic: string;
  responses: UserResponse[];
  onRestart: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ topic, responses, onRestart }) => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const generateAnalysis = async () => {
      try {
        const analysis = await analyzeAssessmentResults(topic, responses);
        if (isMounted) {
          setResult(analysis);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setLoading(false);
      }
    };
    generateAnalysis();
    return () => { isMounted = false; };
  }, [topic, responses]);

  if (loading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 blur-xl opacity-20 rounded-full"></div>
          <Loader2 className="w-16 h-16 text-violet-600 animate-spin relative z-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">正在生成深度分析报告...</h2>
          <p className="text-slate-500 mt-2">AI 正在综合您的回答，构建多维心理画像</p>
        </div>
      </div>
    );
  }

  if (!result) return <div className="text-center py-20 text-red-500">分析失败，请重试。</div>;

  // Use empty arrays as defaults if undefined
  const dimensions = result.dimensions || [];
  const strengths = result.strengths || [];
  const weaknesses = result.weaknesses || [];
  const recommendations = result.recommendations || [];

  const chartData = dimensions.map(d => ({
    subject: d.name,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-8 animate-fade-in pb-12">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">测评报告</h1>
                <p className="text-slate-500 mt-1">基于 {topic} 的 AI 深度分析</p>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={onRestart}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                >
                    <RefreshCcw className="w-4 h-4" /> 重新测试
                </button>
            </div>
        </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-4 opacity-90">核心洞察</h2>
        <p className="text-lg leading-relaxed text-indigo-50">
          {result.summary || "暂无分析摘要"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6 px-2">维度分析</h3>
            <div className="h-[350px] w-full flex-grow">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="得分"
                            dataKey="A"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fill="#8b5cf6"
                            fillOpacity={0.2}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        </RadarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        暂无维度数据
                    </div>
                )}
            </div>
            <div className="mt-6 space-y-3 px-2">
                {dimensions.map((dim) => (
                    <div key={dim.name} className="flex items-start gap-3 text-sm">
                        <span className="font-bold text-slate-700 min-w-[4rem]">{dim.name} ({dim.score})</span>
                        <p className="text-slate-500">{dim.description}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Details: Strengths & Weaknesses */}
        <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-fit">
                <h3 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                    <span className="bg-teal-100 p-1 rounded">✨</span> 优势特质
                </h3>
                {strengths.length > 0 ? (
                    <ul className="space-y-3">
                        {strengths.map((s, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-700">
                                <span className="text-teal-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                                {s}
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-slate-400">暂无数据</p>}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-fit">
                <h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <span className="bg-amber-100 p-1 rounded">🛡️</span> 潜在盲点
                </h3>
                 {weaknesses.length > 0 ? (
                    <ul className="space-y-3">
                        {weaknesses.map((w, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-700">
                                <span className="text-amber-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                                {w}
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-slate-400">暂无数据</p>}
            </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
        <h3 className="text-xl font-bold text-indigo-900 mb-6">行动建议</h3>
        {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100/50">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-3">
                            建议 {idx + 1}
                        </span>
                        <p className="text-slate-700 font-medium">{rec}</p>
                    </div>
                ))}
            </div>
        ) : <p className="text-slate-500">暂无建议</p>}
      </div>
    </div>
  );
};

export default AnalysisResult;