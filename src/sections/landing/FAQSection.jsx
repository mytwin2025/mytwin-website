import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Media } from '../../utils/media';
import Accordion from '../../components/Accordion';
export default function FAQSection() {
  const faq = [
    {
      question: 'What is My Twin?',
      answer: `MyTwin is an AI-powered health monitoring platform that creates a digital twin of your body using data from connected wearables , sensors and devices, biomarkers, lifestyle habits, and behaviour. It continuously monitors your health and provides personalized insights and clinically guided action plans to help prevent, manage, and achieve remission of lifestyle diseases.`,
      oneLiner:
        'My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.',
    },

    {
      question: 'How is MyTwin different from other health apps?',
      answer: `Most health apps track your continuous health data. MyTwin connects your biomarkers, lifestyle habits, wearable devices, lab reports, and health history to deliver personalized recommendations that adapt as your health changes. Instead of simply showing numbers, MyTwin helps you understand what they mean and what actions to take to fix your out of range biomarkers through early interventions,clinically guided action plans and root cause analysis.`,
      oneLiner:
        'My Twin uses advanced algorithms to analyze your health data and create customized fitness plans.',
    },
    {
      question: 'What health data can MyTwin track?',
      answer: `MyTwin can track biomarkers, lab reports, vital signs, nutrition, physical activity, sleep, stress, body composition measurements, medications, and data from connected  wearable devices - giving you a comprehensive view of your holistic health in one connected platform.`,
      oneLiner:
        'Yes, My Twin is designed to cater to individuals of all fitness levels, from beginners to advanced athletes.',
    },
  ];
  return (
    <div className="relative flex w-full items-start justify-center bg-[#F0EFED] pb-20">
      <div className="relative z-10 w-full">
        <h2 className="text-center font-[Arima] text-4xl font-bold text-gray-800">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center gap-6 px-4">
          {faq.map((item, index) => (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
              // oneLiner={item.oneLiner}
            />
          ))}
        </div>
      </div>
      <img
        src={Media.landing.bgGrid}
        alt="Background Grid"
        style={{ zIndex: 1, pointerEvents: 'none' }}
        className="absolute left-0 right-0 top-0 m-auto h-full w-full translate-y-[-20%] scale-[0.8] object-cover"
      />
    </div>
  );
}
