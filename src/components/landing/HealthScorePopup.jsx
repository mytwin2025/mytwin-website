import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Heart,
  FlaskConical,
  Lock,
  Smartphone,
  PartyPopper,
  CheckCircle2,
  ShieldCheck,
  User,
  ArrowRight,
  Headphones
} from 'lucide-react';
import DomainRiskVisualizer from './DomainRiskVisualizer';
import { QUESTIONS_DATA, calculateHRS } from '../../constants/hrsCalculator';
import BookConsultationModal from '../BookConsultationModal';
import { useHeader } from '../../context/HeaderContext';
import { Media } from '../../utils/media';

// Import all images from afterScreen
import callImg from '../../assets/images/afterScreen/call.png';
import checklistImg from '../../assets/images/afterScreen/checklist.png';
import heartImg from '../../assets/images/afterScreen/heart.png';
import humanBgImg from '../../assets/images/afterScreen/humanBgBig.png';
import thankHumanImg from '../../assets/images/afterScreen/humanBg.png';
import leaveImg from '../../assets/images/afterScreen/leave.png';
import lockImg from '../../assets/images/afterScreen/lock.png';
import lock2Img from '../../assets/images/afterScreen/lock2.png';
import runImg from '../../assets/images/afterScreen/run.png';
import sleepImg from '../../assets/images/afterScreen/sleep.png';
import supportImg from '../../assets/images/afterScreen/support.png';
import whatsappImg from '../../assets/images/afterScreen/whatsapp.png';

export default function HealthScorePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (isOpen) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [isOpen, setIsHeaderVisible]);

  const [viewState, setViewState] = useState('LEAD_CAPTURE'); // QUESTIONS, LEAD_CAPTURE, SCORE_RESULT, THANK_YOU
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState('overall'); // 'overall' or 'domains'
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Lead Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [formError, setFormError] = useState('');

  // BMI Calculator State
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedBMI, setCalculatedBMI] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (h > 0 && w > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        setCalculatedBMI(bmi);
      }
    }
  };

  const handleSelect = (optionIndex, questionId) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const nextStep = () => {
    if (currentStep < QUESTIONS_DATA.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setViewState('LEAD_CAPTURE');
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
      setHeight('');
      setWeight('');
      setCalculatedBMI(null);
      setViewState('QUESTIONS');
      setMobileNumber('');
      setEmailId('');
      setFormError('');
    }, 300); // Reset after close animation
  };

  const handleSubmitLead = () => {
    if (mobileNumber.length < 10) {
      setFormError('Please enter a valid mobile number');
      return;
    }
    if (!emailId.includes('@')) {
      setFormError('Please enter a valid email ID');
      return;
    }
    setFormError('');
    // Placeholder API call
    console.log('Submitting lead:', { mobileNumber, emailId });
    setViewState('SCORE_RESULT');
  };

  const handleStartFree = () => {
    setViewState('THANK_YOU');
  };

  const handleBookLab = () => {
    closeWizard();
    setTimeout(() => {
      setIsBookModalOpen(true);
    }, 350);
  };

  // --- RENDERING HELPERS ---

  const renderQuestions = () => (
    <>
      <div className="flex items-center border-b border-gray-100 px-4 py-2">
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

      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 pb-6">
        <div className="animate-in slide-in-from-right-4 duration-300">
          <h2 className="mb-8 mt-6 text-[22px] font-normal leading-tight text-gray-900">
            {QUESTIONS_DATA[currentStep - 1].question}
          </h2>

          <div className="space-y-3">
            {QUESTIONS_DATA[currentStep - 1].requiresBMICalculator && (
              <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Optional: Calculate your BMI
                </h3>
                <div className="mb-3 flex flex-col gap-3 md:flex-row">
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="flex-1 rounded-lg border bg-white p-2 text-sm text-black"
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 rounded-lg border bg-white p-2 text-sm text-black"
                  />
                </div>
                <button
                  onClick={calculateBMI}
                  className="w-full rounded-lg border border-blue-200 bg-blue-50 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  Calculate BMI
                </button>
                {calculatedBMI && (
                  <div className="mt-3 text-center text-sm font-medium text-gray-800">
                    Your BMI is:{' '}
                    <span className="text-lg font-bold text-blue-600">{calculatedBMI}</span>
                  </div>
                )}
              </div>
            )}
            {(() => {
              const question = QUESTIONS_DATA[currentStep - 1];
              let optionsToRender = [...question.options];
              if (question.hasDontKnow) {
                optionsToRender.push("4 - Don't Know");
              }

              return optionsToRender.map((option, idx) => {
                const questionId = question.id;
                const valueToSet = idx === question.options.length ? 4 : idx;
                const isSelected = answers[questionId] === valueToSet;
                const optionText = option.includes(' - ') ? option.split(' - ')[1] : option;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(valueToSet, questionId)}
                    className={`w-full rounded-xl border px-5 py-3 text-left text-[15px] transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/30 text-orange-600'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    } `}
                  >
                    {optionText}
                  </button>
                );
              });
            })()}
          </div>
        </div>
      </div>

      <div className="z-10 mt-auto bg-white p-6 pt-2">
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
      </div>
    </>
  );

  const renderLeadCapture = () => (
    <div className="animate-in fade-in zoom-in-95 relative flex h-full flex-col overflow-y-auto custom-scrollbar bg-[#f2f3f7] duration-500">
      <button
        onClick={closeWizard}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/70 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Left Column */}
      <div className="z-10 flex flex-1 flex-col bg-[#f2f3f7] px-7 py-8 md:rounded-2xl md:px-10 md:py-10">
        {/* Title + Image hero area — image as bg, text on top */}
        <div className="mb-auto">
          <div className="relative mb-1 overflow-hidden rounded-2xl">
            {/* Background image */}
            <img
              src={humanBgImg}
              alt="Human Body Assessment"
              className="h-52 w-full object-cover object-center"
            />
            {/* Gradient overlay so text stays readable */}
            <div className="absolute inset-0" />
            {/* Text on top */}
            <div className="absolute inset-0 flex flex-col items-start justify-start pb-4">
              <h2 className="text-[2.2rem] font-black leading-[1.8rem] tracking-tight text-gray-900">
                Get your
              </h2>
              <h2 className="text-[2.2rem] font-black leading-[3.8rem] tracking-tight text-[#F36B21]">
                Health
              </h2>
              <h2 className="text-[2.2rem] font-black leading-[1.8rem] tracking-tight text-[#F36B21]">
                Risk Score
              </h2>
              {/* ECG divider */}
              <div className="mt-3 flex w-3/6 items-center justify-start">
                <div className="h-[1.5px] w-1/2 bg-[#F36B21]/50"></div>
                <svg
                  viewBox="0 0 90 28"
                  className="h-6 w-20 text-[#F36B21]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="0,14 18,14 22,5 27,23 32,5 37,23 42,14 90,14" />
                </svg>
                <div className="h-[1.5px] w-2/4 bg-[#F36B21]/50"></div>
              </div>
            </div>
          </div>

          {/* Bullet points */}
          <div className="mb-7 space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 rounded-full bg-[#F36B21] p-2.5 text-white shadow">
                <Heart size={18} fill="white" strokeWidth={0} />
              </div>
              <p className="text-left text-[12px] font-medium leading-snug text-gray-700">
                Continuous health monitoring,
                <br />
                personalised guidance and <br />
                experts clinical protocols <br /> tailored to your profile straight <br /> to your
                inbox.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_6px_32px_rgba(0,0,0,0.10)]">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="mt-6 text-[#F36B21]">
                  <Phone size={26} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-left text-[13px] text-gray-500">
                    Your <span className="font-black text-gray-900">mobile</span> number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit mobile number"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#F36B21] focus:bg-white focus:ring-1 focus:ring-[#F36B21]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="mt-6 text-[#F36B21]">
                  <Mail size={26} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-left text-[13px] font-semibold text-gray-500">
                    Your email ID
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email ID"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#F36B21] focus:bg-white focus:ring-1 focus:ring-[#F36B21]"
                  />
                </div>
              </div>

              {formError && <p className="text-sm font-medium text-red-500">{formError}</p>}

              <button
                onClick={handleSubmitLead}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#F36B21] py-4 text-[14px] font-bold text-white shadow-lg transition-all hover:bg-[#e05e19] active:scale-[0.98]"
              >
                See MyTwin Health Risk Score <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom security strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-gray-300 p-1.5">
              <Lock size={14} className="text-gray-500" />
            </div>
            <span className="leading-tight">
              Bank-level
              <br />
              Security
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-gray-300 p-1.5">
              <ShieldCheck size={14} className="text-gray-500" />
            </div>
            <span className="leading-tight">
              Your Data.
              <br />
              Always Yours.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-gray-300 p-1.5">
              <User size={14} className="text-gray-500" />
            </div>
            <span className="leading-tight">
              We Never Share
              <br />
              Your Information
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScoreResult = () => {
    const result = calculateHRS(answers);
    const score = Math.round(result.overallHealthScore);
    let riskText = 'Moderate Risk';
    let riskColor = '#eab308'; // Yellow/Orange
    let riskDesc =
      'Your current habits and health profile suggest there are early signs of increased metabolic health risk. Improving your sleep, nutrition, physical activity, and other daily habits can significantly reduce your long-term risk and improve your overall health over time.';
    let priorities = [
      'Improve daily routine',
      'Increase daily physical activity',
      'Monitor metabolic markers',
    ];

    if (score >= 80) {
      riskText = 'Low Risk';
      riskColor = '#22c55e'; // Green
      riskDesc =
        'Your current habits indicate a strong metabolic profile. Keep maintaining your healthy lifestyle choices to minimize long-term health risks.';
      priorities = ['Maintain daily routines', 'Track food, activity, sleep & stress daily', 'Optimize healthy habits'];
    } else if (score < 50) {
      riskText = 'High Risk';
      riskColor = '#ef4444'; // Red
      riskDesc =
        'Your current habits indicate a high risk for metabolic health issues. We strongly advise taking proactive measures and consulting with health experts.';
      priorities = [
        'Consult a specialist immediately',
        'Adopt strict action plans',
        'Continue health monitoring',
        'Monitor blood sugar',
      ];
    }

    if (score >= 60 && score < 80) {
      riskText = 'Mild Risk';
      riskColor = '#16a34a'; // Green
      priorities = [
        'Lose 5-7 kg',
        'Improve blood sugar',
        'Adopt daily healthy habits',
        'Improve food, activity, sleep & stress levels',
      ];
    }

    return (
      <div className="animate-in slide-in-from-bottom-4 relative flex h-full flex-col overflow-y-auto bg-white duration-500">
        <button
          onClick={closeWizard}
          className="absolute right-2 top-2 z-10 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="custom-scrollbar flex flex-1 flex-col items-center overflow-y-auto p-6 pt-14 md:p-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Your MyTwin <br /> Health Risk Score</h2>          {/* Semi-circle Gauge */}
          <div 
            className="relative mb-6 flex flex-col items-center justify-end overflow-hidden shrink-0" 
            style={{ height: '192px', width: '320px', minHeight: '192px', minWidth: '320px' }}
          >
            <svg viewBox="0 0 200 110" className="absolute top-0 h-full w-full">
              <defs>
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Faint Concentric Background Lines */}
              <path d="M -10 100 A 110 110 0 0 1 210 100" fill="none" stroke="#f8fafc" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 5 100 A 95 95 0 0 1 195 100" fill="none" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 35 100 A 65 65 0 0 1 165 100" fill="none" stroke="#f8fafc" strokeWidth="1" strokeDasharray="4 4" />

              {/* Full Colored Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#score-gradient)"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Knob */}
              <g style={{ transformOrigin: '100px 100px', transform: `rotate(${(isNaN(score) ? 0 : score / 100) * 180}deg)` }} className="transition-all duration-1000 ease-out">
                {/* Simulated Drop Shadow */}
                <circle cx="20" cy="102" r="10" fill="rgba(0,0,0,0.15)" />
                <circle cx="20" cy="100" r="10" fill="#f59e0b" stroke="white" strokeWidth="5" />
              </g>
            </svg>
            <div className="absolute bottom-2 flex flex-col items-center">
              <div className="font-black leading-none tracking-tight" style={{ color: riskColor, fontSize: '72px' }}>
                {isNaN(score) ? '--' : score}
              </div>
              <div className="text-xl font-semibold text-gray-500">/100</div>
            </div>
          </div>
          <div
            className="mb-2 flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ backgroundColor: `${riskColor}20`, color: riskColor }}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: riskColor }}></div>
            <span className="text-sm font-bold">{riskText}</span>
          </div>
          <button
            onClick={() => setViewState('DOMAIN_RISK')}
            className="mb-8 flex items-center justify-center gap-2 rounded-full px-4 py-1.5 border-2 border-gray-200 "
            style={{ color: '#23c55f' }}
          >
            <span className="text-sm font-bold">Domain Risk</span>
            <ArrowRight size={20} />
          </button>

          <div className="mb-8 w-full rounded-2xl border border-orange-100 bg-orange-50/50 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-bold text-orange-600">
              <CheckCircle2 size={20} />
              <span>Top Priorities:</span>
            </div>
            <ul className="space-y-3">
              {priorities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 border-b border-orange-100/50 pb-1 text-left text-[12px] font-medium text-gray-800 last:border-0 last:pb-0"
                >
                  <div className="rounded-full bg-green-500 p-0.5 text-white">
                    <CheckCircle2 size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="mt-1 flex-shrink-0 text-orange-500">
              <ShieldCheck size={24} />
            </div>
            <p className="text-left text-[13px] font-medium leading-relaxed text-gray-600">
              {riskDesc}
            </p>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={handleStartFree}
              className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
            >
              <div className="flex items-center gap-3">
                <Heart size={22} /> <span>Start MyTwin Free</span>
              </div>
              <ArrowRight size={22} />
            </button>

            <button
              onClick={handleBookLab}
              className="flex w-full items-center justify-between rounded-xl border-2 border-orange-200 bg-white px-6 py-4 font-bold text-orange-600 transition-all hover:bg-orange-50"
            >
              <div className="flex items-center gap-3">
                <FlaskConical size={22} /> <span>Book Lab Tests</span>
              </div>
              <ArrowRight size={22} />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Lock size={14} /> 100% Data Privacy & Security
          </div>
        </div>
      </div>
    );
  };

  const renderDomainRisk = () => {
    const result = calculateHRS(answers);
    const domainRiskPercentages = result.domainRiskPercentages || {};

    return (
      <div className="animate-in slide-in-from-right relative flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white duration-500">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 p-4 backdrop-blur-md">
          <button
            onClick={() => setViewState('SCORE_RESULT')}
            className="flex items-center gap-2 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold">Back</span>
          </button>
          <h2 className="text-lg font-bold text-gray-900">Domain Risk</h2>
          <button
            onClick={closeWizard}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8">
          <p className="mb-6 text-center text-sm text-gray-600">
            A detailed breakdown of your health risks across different domains.
          </p>
          <div className="flex flex-col gap-2">
            {Object.entries(domainRiskPercentages).map(([domain, riskPercentage]) => (
              <DomainRiskVisualizer
                key={domain}
                domainName={domain}
                riskPercentage={riskPercentage}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderThankYou = () => (
    <div className="animate-in zoom-in-95 relative flex h-full flex-col overflow-x-hidden bg-white duration-500">
      <button
        onClick={closeWizard}
        className="absolute right-0 top-0 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="custom-scrollbar flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <PartyPopper size={36} className="text-[#F36B21]" />
          <h2 className="text-[2.1rem] font-black tracking-tight text-[#F36B21]">Thank You!</h2>
        </div>


        {/* Human Body section */}
        <div className="relative mb-0 flex justify-center">
          <img
            src={thankHumanImg}
            alt="Human Assessment"
            className="w-[85%] max-w-[280px] object-contain"
          />
        </div>

        {/* List Section */}
        <div className="mb-4 px-2">
          <h3 className="mb-3 text-[17px] font-bold text-gray-900">Download the MyTwin App to:</h3>
          <ul className="flex flex-col">
            {[
              'View your complete Health Risk Score',
              'Get your personalized action plan',
              'Track your health with daily smart habits',
              'Book lab tests & monitor biomarkers trend',
              'Monitor your progress over time',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-start gap-2 border-b border-orange-50 py-1 text-left text-[11px] font-semibold text-gray-700 last:border-b-0"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F36B21] text-white">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Download Section */}
        <div className="mb-8 flex flex-col items-center">
          <h3 className="mb-4 text-[17px] font-bold text-gray-900">Download MyTwin</h3>
          <div className="flex w-full justify-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.mytwinlab.mytwin&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-black px-3 py-2 text-white"
            >
              <img
                src={Media.header.playstore}
                alt="Google Play"
                className="h-6 w-6 object-contain"
              />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase opacity-90">Get it on</div>
                <div className="text-[12px] font-semibold">Google Play</div>
              </div>
            </a>
            <a
              href="https://apps.apple.com/in/app/mytwin-parents-diabetes-care/id6763519090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl bg-black px-3 py-2 text-white"
            >
              <img src={Media.header.apple} alt="App Store" className="h-6 w-6 object-contain" />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase opacity-90">Download on the</div>
                <div className="text-[12px] font-semibold">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mb-6 flex justify-between rounded-xl p-3 text-[10px] font-bold">
          <div className="flex flex-1 flex-col items-center gap-1.5 text-center text-[#166534]">
            <div className="rounded-full bg-[#dcfce7] p-2">
              <ShieldCheck size={16} />
            </div>
            <div className="leading-tight">
              100%
              <br />
              Privacy & Security
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1.5 border-l border-r border-gray-200 text-center text-[#F36B21]">
            <div className="rounded-full bg-[#ffedd5] p-2">
              <User size={16} />
            </div>
            <div className="leading-tight">
              Your Data Is
              <br />
              Always Yours
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1.5 text-center text-[#6b21a8]">
            <div className="rounded-full bg-[#f3e8ff] p-2">
              <Lock size={16} />
            </div>
            <div className="leading-tight">
              We Never Share
              <br />
              Your Data
            </div>
          </div>
        </div>

        {/* Contact/Support */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-[#fff7ed]">
          <div className="flex items-center gap-3 px-4 py-4 justify-center">
            {/* <img src={supportImg} alt="Support" className="h-10 w-10 object-contain" /> */}
            <Headphones size={20} color='orange'/>
            <div className="text-[14px] font-bold leading-tight text-[#F36B21] text-center">
              Need Help From
              <br />
              Our Experts?
            </div>
          </div>
          <div className="flex gap-1 border-t border-orange-100 bg-white p-1">
            <a href="tel:+918369255417" className="flex flex-1 items-center justify-center gap-2 rounded-md border border-orange-200 py-1 text-[12px] font-bold text-[#F36B21] shadow-sm transition-colors hover:bg-orange-50">
              <Phone size={12} strokeWidth={2.5} /> Call Us
            </a>
            <a href="https://wa.me/918369255417" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1 rounded-md border border-green-200 py-1 text-[12px] font-bold text-[#16a34a] shadow-sm transition-colors hover:bg-green-50">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#16a34a]" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>{' '}
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render Switch
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          document.body.style.overflow = 'hidden';
        }}
        className="mt-4 cursor-pointer rounded-full border border-white bg-transparent px-6 py-3 font-[Inter] font-semibold text-white transition-all hover:bg-white/10"
      >
        Is MyTwin for me?
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm"
          onClick={closeWizard}
        >
          <div
            className={`relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 ${
              viewState === 'QUESTIONS'
                ? 'h-[80vh] max-h-[80vh] w-[95%] max-w-[600px]'
                : viewState === 'SCORE_RESULT' || viewState === 'DOMAIN_RISK'
                  ? 'h-auto max-h-[90vh] w-[95%] max-w-[450px]'
                  : viewState === 'LEAD_CAPTURE' || viewState === 'THANK_YOU'
                    ? 'h-[90vh] max-h-[90vh] w-[95%] max-w-[480px]'
                    : 'h-[90vh] max-h-[90vh] w-[95%] max-w-[1000px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {viewState === 'QUESTIONS' && renderQuestions()}
            {viewState === 'LEAD_CAPTURE' && renderLeadCapture()}
            {viewState === 'SCORE_RESULT' && renderScoreResult()}
            {viewState === 'DOMAIN_RISK' && renderDomainRisk()}
            {viewState === 'THANK_YOU' && renderThankYou()}
          </div>
        </div>
      )}

      <BookConsultationModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </>
  );
}
