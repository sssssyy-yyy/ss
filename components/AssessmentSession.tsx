import React, { useState, useEffect } from 'react';
import { AssessmentData, UserResponse } from '../types';
import { getRandomQuestions } from '../services/questionBank';
import { CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';

interface AssessmentSessionProps {
  topic: string;
  onComplete: (responses: UserResponse[]) => void;
  onCancel: () => void;
}

const AssessmentSession: React.FC<AssessmentSessionProps> = ({ topic, onComplete, onCancel }) => {
  const [data, setData] = useState<AssessmentData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Initialize with empty array
  const [responses, setResponses] = useState<UserResponse[]>([]);
  
  // Track visual selection state
  const [animatingOptionId, setAnimatingOptionId] = useState<string | null>(null);

  useEffect(() => {
    // Synchronous data loading - Instant!
    const result = getRandomQuestions(topic, 5);
    setData(result);
  }, [topic]);

  // Handle option selection with auto-advance
  const handleOptionSelect = (optionId: string, optionText: string, optionValue: number) => {
    if (!data || !data.questions) return;
    
    // Prevent double clicking during animation
    if (animatingOptionId) return;

    setAnimatingOptionId(optionId);

    const currentQ = data.questions[currentQuestionIndex];
    
    // Create new response object
    const newResponse: UserResponse = {
      questionId: currentQ.id,
      questionText: currentQ.text,
      selectedOptionId: optionId,
      selectedOptionText: optionText,
      score: optionValue // Save the score for analysis
    };

    // Update responses array at the specific index
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = newResponse;
    setResponses(updatedResponses);

    // Delay to show selection effect, then move next
    setTimeout(() => {
        setAnimatingOptionId(null);
        if (currentQuestionIndex < data.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            onComplete(updatedResponses);
        }
    }, 300); // 300ms fast transition
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // No loading state needed anymore!

  if (!data || !data.questions || data.questions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fade-in">
            <AlertCircle className="w-16 h-16 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-800">无法加载题目</h3>
            <button 
                onClick={onCancel}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                返回首页
            </button>
        </div>
    );
  }

  const currentQuestion = data.questions[currentQuestionIndex];
  if (!currentQuestion) return null; 

  const progress = ((currentQuestionIndex) / data.questions.length) * 100;
  
  // Determine which option is currently selected
  const savedResponse = responses[currentQuestionIndex];
  const activeOptionId = animatingOptionId || savedResponse?.selectedOptionId;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header Info */}
      <div className="mb-8">
        <button onClick={onCancel} className="text-sm text-slate-400 hover:text-slate-600 mb-4">
          &larr; 取消测评
        </button>
        <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-bold text-slate-900">{data.title}</h2>
            <span className="text-sm font-medium text-indigo-600">
                {currentQuestionIndex + 1} / {data.questions.length}
            </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10 mb-8 min-h-[400px] flex flex-col">
        <h3 className="text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4 flex-grow">
          {currentQuestion.options?.map((option) => {
             const isSelected = activeOptionId === option.id;
             return (
                <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id, option.text, option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden
                    ${isSelected
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' 
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                <span className="text-lg relative z-10">{option.text}</span>
                {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 animate-scale-in relative z-10" />
                )}
                </button>
             );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center h-12">
        {currentQuestionIndex > 0 ? (
            <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors font-medium"
            >
                <ChevronLeft className="w-5 h-5" /> 上一题
            </button>
        ) : <div></div>}
        
        <div className="text-slate-400 text-sm italic">
            选择选项自动跳转
        </div>
      </div>
    </div>
  );
};

export default AssessmentSession;