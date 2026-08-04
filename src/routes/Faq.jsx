import React, { useState } from 'react';
import Footer from '../components/Footer';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is MyTwin?",
      a: "MyTwin is an AI-powered health monitoring platform that creates a digital twin of your body using data from connected wearables, sensors and devices, biomarkers, lifestyle habits, and behaviour. It continuously monitors your health and provides personalized insights and clinically guided action plans to help prevent, manage, and achieve remission of lifestyle diseases."
    },
    {
      q: "Who is MyTwin for?",
      a: "MyTwin is designed for adults who want to improve their health, prevent future diseases, or manage or achieve remission from conditions such as diabetes, obesity, high blood pressure, high cholesterol, fatty liver, PCOS, thyroid disorders, and other lifestyle-related conditions. It is also ideal for people who want to support the health of their parents and family members."
    },
    {
      q: "How is MyTwin different from other health apps?",
      a: "Most health apps track your continuous health data. MyTwin connects your biomarkers, lifestyle habits, wearable devices, lab reports, and health history to deliver personalized recommendations that adapt as your health changes. Instead of simply showing numbers, MyTwin helps you understand what they mean and what actions to take to fix your out of range biomarkers through early interventions, clinically guided action plans and root cause analysis."
    },
    {
      q: "Does MyTwin replace my doctor?",
      a: "No. MyTwin is designed to complement - not replace - your healthcare provider. It helps you monitor your health between doctor visits, identify potential risks early, and follow personalized, clinically guided recommendations. Always consult your doctor for medical diagnosis, treatment, or emergencies."
    },
    {
      q: "What health data can MyTwin track?",
      a: "MyTwin can track biomarkers, lab reports, vital signs, nutrition, physical activity, sleep, stress, body composition measurements, medications, and data from connected wearable devices - giving you a comprehensive view of your holistic health in one connected platform."
    },
    {
      q: "Can MyTwin help prevent or reverse lifestyle diseases?",
      a: "MyTwin supports lifestyle disease prevention, management and remission through continuous health monitoring, early interventions, personalized insights and guidance, habit coaching, and clinically guided action plans. Many lifestyle diseases can improve significantly with sustained healthy behaviors, but individual outcomes vary and depend on medical condition, adherence, and healthcare supervision."
    },
    {
      q: "What results can I expect with MyTwin? How are they measured?",
      a: "Many users begin noticing improvements in their energy levels, sleep quality, physical activity, biomarkers performance and overall well-being within the first 8-10 weeks. Over time, consistent adherence to your personalized care plan may also lead to improvements in weight, blood sugar, blood pressure, cholesterol, and other key health biomarkers even in some cases, reduce dependency on certain medications (with doctor guidance) may be seen. Individual results vary based on health condition, goals, and consistency.\n\nWe measure changes in strength, out of range biomarkers performance, sleep quality, energy and lifestyle habits through weekly assessment and feedback calls."
    },
    {
      q: "Do I need a smartwatch or wearable device?",
      a: "No. You can start using MyTwin without any wearable device by entering your health information manually too. Connecting compatible devices simply allows MyTwin to monitor your health more continuously and provide richer, more personalized insights and helps to decode your biomarkers to help you and your parents live healthier for longer lives."
    },
    {
      q: "What does a MyTwin Care Plan include?",
      a: "Your personalized care plan is built using your health profile, biomarkers, medical history, lifestyle habits, and connected health data. It may include nutrition recommendations, physical activity goals, sleep optimization, stress management, daily health tracking, and clinically guided action plans that evolve as your health changes."
    },
    {
      q: "Does MyTwin offer diagnostic tests and health checkups?",
      a: "Yes. MyTwin enables you to book diagnostic tests through trusted partner laboratories. Your lab reports are securely stored, analyzed alongside your other health data, and used to generate more personalized insights and recommendations."
    },
    {
      q: "Can I consult doctors or health coaches through MyTwin?",
      a: "Yes. Depending on your subscription plan, you may have access to registered doctors, certified nutritionists, health coaches, and care coordinators for expert guidance, progress reviews, and personalized support throughout your health journey."
    },
    {
      q: "What devices can I connect with MyTwin, and how much does it cost?",
      a: "MyTwin works even without any devices. For deeper health insights, you can choose to connect compatible wearable devices such as blood glucose meters, continuous glucose monitors (CGMs), blood pressure monitors, smart rings, smart scales, smartwatches, and other supported wearables. Lab tests and Devices can be available as optional add-ons, while subscription pricing varies based on the plan you choose."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0efed]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-4 font-[Arima] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            How can we help you?
          </h1>
          <p className="mt-4 mx-auto max-w-2xl font-[Inter] text-sm text-gray-400 sm:text-base">
            Find answers to common questions about MyTwin's digital twin health platform, wearable integration, care plans, and health outcomes.
          </p>
        </div>
      </div>

      {/* FAQ content */}
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <div className="space-y-4 font-[Inter]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 bg-white ${
                  isOpen 
                    ? 'border-orange-500/30 shadow-md shadow-orange-500/5' 
                    : 'border-black/5 hover:border-black/10 hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors duration-200"
                >
                  <span className="font-semibold text-[#1c1d1d] group-hover:text-black sm:text-base text-sm leading-snug">
                    {faq.q}
                  </span>
                  <span className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-orange-50/70 group-hover:text-orange-600 ${
                    isOpen ? 'rotate-180 bg-orange-100 text-orange-600' : 'text-gray-500'
                  }`}>
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-black/5' : 'max-h-0 pointer-events-none'
                  }`}
                >
                  <div className="p-5 text-sm text-gray-700 leading-relaxed bg-[#fafafa]/50 whitespace-pre-line">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 rounded-3xl border border-black/5 bg-[#e8e7e3]/40 p-6 text-center font-[Inter] sm:p-8">
          <h3 className="font-[Arima] text-lg font-bold text-black sm:text-xl">Still have questions?</h3>
          <p className="mt-2 text-xs text-gray-600 sm:text-sm">
            Can't find the answer you're looking for? Reach out to our care team directly.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:support@mytwinlab.com"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-black/80"
            >
              Email Support
            </a>
            <a
              href="tel:+918261922472"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/10 px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-gray-50"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
