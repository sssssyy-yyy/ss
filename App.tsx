import React, { useState } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AssessmentSession from './components/AssessmentSession';
import AnalysisResult from './components/AnalysisResult';
import { AppView, AssessmentType, UserResponse } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);

  const handleSelectTopic = (topic: AssessmentType) => {
    setSelectedTopic(topic);
    setCurrentView(AppView.ASSESSMENT);
  };

  const handleAssessmentComplete = (responses: UserResponse[]) => {
    setUserResponses(responses);
    setCurrentView(AppView.RESULTS);
  };

  const handleRestart = () => {
    setUserResponses([]);
    setSelectedTopic('');
    setCurrentView(AppView.LANDING);
  };

  return (
    <Layout onHomeClick={handleRestart}>
      {currentView === AppView.LANDING && (
        <LandingPage onSelectTopic={handleSelectTopic} />
      )}
      
      {currentView === AppView.ASSESSMENT && (
        <AssessmentSession 
            topic={selectedTopic}
            onComplete={handleAssessmentComplete}
            onCancel={handleRestart}
        />
      )}

      {currentView === AppView.RESULTS && (
        <AnalysisResult 
            topic={selectedTopic}
            responses={userResponses}
            onRestart={handleRestart}
        />
      )}
    </Layout>
  );
}

export default App;