import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Media } from '../../utils/media';
import Accordion from '../../components/Accordion';
export default function FAQSection() {
  const faq = [
    {
      question: 'What is My Twin?',
      answer: `My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.
      My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.`,
      oneLiner:
        'My Twin is a health and wellness platform that provides personalized fitness plans, expert coaching, and diagnostic tools to help you achieve your health goals.',
    },

    {
      question: 'How does My Twin work?',
      answer: `My Twin uses advanced algorithms to analyze your health data and create customized fitness plans. You can also connect with expert coaches for guidance and support.`,
      oneLiner:
        'My Twin uses advanced algorithms to analyze your health data and create customized fitness plans.',
    },
    {
      question: 'Is My Twin suitable for all fitness levels?',
      answer: `Yes, My Twin is designed to cater to individuals of all fitness levels, from beginners to advanced athletes. The platform provides personalized plans that can be adjusted based on your progress and goals.`,
      oneLiner:
        'Yes, My Twin is designed to cater to individuals of all fitness levels, from beginners to advanced athletes.',
    },
  ];
  return (
    <div className="relative flex w-full items-start justify-center bg-[#F0EFED]">
      <div className="relative w-full z-10 mb-20">
        <h1 className="text-center font-[Arima] text-4xl font-bold text-gray-800">
          Frequently Asked Questions (FAQ)
        </h1>

        <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center justify-center gap-6 px-4">
          {faq.map((item, index) => (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
              oneLiner={item.oneLiner}
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
