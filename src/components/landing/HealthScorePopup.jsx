import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import DomainRiskVisualizer from './DomainRiskVisualizer';
import { QUESTIONS_DATA, calculateHRS } from '../../constants/hrsCalculator';
import BookConsultationModal from '../BookConsultationModal';

export default function HealthScorePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState('overall'); // 'overall' or 'domains'
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleSelect = (optionIndex, questionId) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const nextStep = () => {
    if (currentStep <= QUESTIONS_DATA.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const closeWizard = () => {
    document.body.style.overflow = 'auto';
    setIsOpen(false);
    setTimeout(() => {
      setCurrentStep(1);
      setAnswers({});
      setActiveTab('overall');
    }, 300); // Reset after close animation
  };

  const handleGetStarted = () => {
    closeWizard();
    setTimeout(() => {
      setIsBookModalOpen(true);
    }, 350); // Wait for the wizard to fully close
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          document.body.style.overflow = 'hidden';
        }}
        className="mt-4 cursor-pointer rounded-full border border-white bg-transparent px-6 py-3 font-[Inter] font-semibold text-white"
      >
        Is MyTwin for me?
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 p-4 pt-20 backdrop-blur-sm"
          onClick={closeWizard}
        >
          <div
            className="relative flex h-[80vh] max-h-[80vh] w-[95%] max-w-[600px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conditional Header: Steps vs Final Score */}
            {currentStep <= QUESTIONS_DATA.length ? (
              <div className="flex items-center px-4 py-2">
                <button
                  onClick={currentStep > 1 ? prevStep : closeWizard}
                  className="-ml-2 rounded-full p-2 text-gray-800 transition-colors hover:bg-gray-100"
                >
                  <ArrowLeft size={24} />
                </button>

                {/* Progress Indicators */}
                <div className="flex flex-1 gap-1.5 px-4">
                  {QUESTIONS_DATA.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < currentStep ? 'bg-orange-500' : 'bg-orange-100'}`}
                    />
                  ))}
                </div>

                <span className="text-sm font-medium text-gray-500">
                  {currentStep}/{QUESTIONS_DATA.length}
                </span>
              </div>
            ) : (
              <div className="flex flex-col border-b border-gray-100 px-4 py-4">
                <div className="flex items-center mb-4">
                  <button
                    onClick={closeWizard}
                    className="-ml-2 rounded-full p-2 text-gray-800 transition-colors hover:bg-gray-100"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="ml-2 text-xl font-medium text-gray-800">Your Wellness Assessment</h2>
                </div>
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('overall')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'overall' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overall Score
                  </button>
                  <button
                    onClick={() => setActiveTab('domains')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'domains' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Domain Risk
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Content Area */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-6 pb-6">
              {currentStep <= QUESTIONS_DATA.length ? (
                // --- QUESTION STEPS ---
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <h2 className="mb-8 mt-6 text-[22px] font-normal leading-tight text-gray-900">
                    {QUESTIONS_DATA[currentStep - 1].question}
                  </h2>

                  <div className="space-y-3">
                    {QUESTIONS_DATA[currentStep - 1].options.map((option, idx) => {
                      const questionId = QUESTIONS_DATA[currentStep - 1].id;
                      const isSelected = answers[questionId] === idx;
                      // Clean up options like "0 - Normal" -> "Normal"
                      const optionText = option.includes(' - ') ? option.split(' - ')[1] : option;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx, questionId)}
                          className={`w-full rounded-xl border px-5 py-3 text-left text-[15px] transition-all duration-200 ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/30 text-orange-600'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          } `}
                        >
                          {optionText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // --- FINAL SCORE STEP ---
                (() => {
                  const result = calculateHRS(answers);
                  const score = Math.round(result.overallHealthScore);
                  let riskText = 'Moderate Health';
                  let riskColor = '#eab308'; // Yellow/Orange
                  let riskDesc =
                    'Moderate risk level detected. Focus on improving lifestyle habits and monitor closely.';

                  if (score >= 80) {
                    riskText = 'Excellent Health';
                    riskColor = '#22c55e'; // Green
                    riskDesc = 'Excellent! Keep maintaining your healthy lifestyle choices.';
                  } else if (score < 50) {
                    riskText = 'High Risk';
                    riskColor = '#ef4444'; // Red
                    riskDesc =
                      'High risk level detected. Focus on improving lifestyle habits and consult a healthcare expert.';
                  }

                  if (activeTab === 'overall') {
                    return (
                      <div className="animate-in fade-in zoom-in-95 mt-6 flex flex-col items-center text-center duration-500">
                        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">
                          Your Health Score
                        </div>

                        {/* SVG Chart Replication */}
                        <div className="relative mb-6 flex h-40 w-40 items-center justify-center">
                          <svg
                            viewBox="0 0 200 200"
                            className="absolute inset-0 h-full w-full transform"
                          >
                            {/* Outer Background Track */}
                            <circle
                              cx="100"
                              cy="100"
                              r="75"
                              fill="none"
                              stroke="#f3f4f6"
                              strokeWidth="18"
                              strokeLinecap="round"
                              strokeDasharray="353 471"
                              transform="rotate(135 100 100)"
                            />

                            {/* Outer Value Track (Dynamic Color & Arc) */}
                            <circle
                              cx="100"
                              cy="100"
                              r="75"
                              fill="none"
                              stroke={riskColor}
                              strokeWidth="18"
                              strokeLinecap="round"
                              strokeDasharray={`${Math.round((score / 100) * 353)} 471`}
                              transform="rotate(135 100 100)"
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>

                          {/* Score Text inside SVG */}
                          <div
                            className="absolute text-4xl font-bold tracking-tight"
                            style={{ color: riskColor }}
                          >
                            {score}%
                          </div>
                        </div>

                        <h3 className="mb-2 text-xl font-bold" style={{ color: riskColor }}>
                          {riskText}
                        </h3>
                        <p className="mb-4 px-4 text-sm leading-relaxed text-gray-600">{riskDesc}</p>
                        <p className="px-8 text-xs leading-tight text-gray-400">
                          This score is an informational wellness estimate and is not a medical
                          diagnosis.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="animate-in fade-in mt-6 duration-500">
                      <h3 className="mb-4 text-lg font-semibold text-gray-800">Domain Risk Assessment</h3>
                      <div className="space-y-1">
                        {Object.entries(result.domainRiskPercentages).map(([domainName, riskPercentage]) => (
                          <DomainRiskVisualizer 
                            key={domainName} 
                            domainName={domainName} 
                            riskPercentage={riskPercentage} 
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Footer Buttons */}
            <div className="z-10 mt-auto bg-white p-6 pt-2">
              {currentStep <= QUESTIONS_DATA.length ? (
                <>
                  <div className="flex gap-4">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`flex-1 rounded-xl border border-orange-500 py-2 font-medium text-orange-500 transition-colors ${currentStep === 1 ? 'cursor-not-allowed border-orange-300 text-orange-300 opacity-50' : 'hover:bg-orange-50'} `}
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={answers[QUESTIONS_DATA[currentStep - 1].id] === undefined}
                      className={`flex-1 rounded-xl bg-orange-500 py-2 font-medium text-white transition-opacity ${answers[QUESTIONS_DATA[currentStep - 1].id] === undefined ? 'cursor-not-allowed opacity-60' : 'hover:bg-orange-600'} `}
                    >
                      {currentStep === QUESTIONS_DATA.length ? 'Finish' : 'Next'}
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-medium text-white shadow-md transition-all hover:bg-orange-600"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <BookConsultationModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />
    </>
  );
}
