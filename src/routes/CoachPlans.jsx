import React, { useState } from 'react';
import { BadgeCheck, Diamond, CalendarDays, ShieldCheck, CreditCard, Circle } from 'lucide-react';
import { useContactForm } from '../context/ContactFormContext';
import { plansData } from './PlanDetails';

const durations = [
  { label: '12 Week', save: 'SAVE 38%' },
  { label: '24 Week', save: 'SAVE 47%' },
  { label: '52 Week', save: 'SAVE 53%' },
];

const formatPrice = (amount, isWeekly = false) => {
  if (amount === undefined || amount === null) return '';
  return `₹${amount.toLocaleString('en-IN')}${isWeekly ? '/week' : ''}`;
};

const features = [
  {
    title: 'Personalised Action Programs only for you',
    desc: 'Personalized nutrition,activity,sleep and stress management consultation including balanced diet plans,strength training programs, and weekly guidance.',
  },
  {
    title: 'Accountability,Progress Tracking and Continuous Monitoring',
    desc: 'Your health coach will schedule in-depth weekly video calls at a time that suits your schedule to discuss your weekly health progress',
  },
  {
    title: 'Early Interventions,Continuous Support & Personalised Guidance',
    desc: 'Your health coach is always just a phone call or message away (Sundays closed).',
  },
  {
    title: 'Experts led Clinically Guided Action Programs and Evidence based Outcomes',
    desc: 'Members will begin noticing improvements in their energy levels, sleep quality, physical activity,biomarkers performance and overall well-being within the first 8-10 weeks. Over time, consistent adherence to your personalized care plan may also lead to improvements in weight, blood sugar, blood pressure, cholesterol, and other key health biomarkers.Individual results vary based on health condition, goals, and consistency.',
  },
  {
    title: 'Diagnostics, MyTwin Health Score and Root - Cause Analysis',
    desc: 'Share your latest blood test report from the last 3 months before getting started or add on your lab tests in the chosen plan or book your lab tests from diagnostics.Track and monitor your daily health score that tells you where you are today and where you can continue to get better with root-cause care',
  },
];

const steps = [
  'You enroll in a care plan of your choice',
  'You download the MyTwin App and fill in all required details',
  'Our health coach calls you within 24-48 hours',
  'Our health coach evaluates and understands your goals and expectations',
  'Our health coach prepares your personalized care plan',
  'Our health coach track, assess your health progress and makes action plans adjustments',
  'Our health coach reviews your weekly progress.',
  'You receive real-time insights,guidance and alerts',
  'You get nudges to stay on track with your daily goals.',
  'You get 1 on 1 support and get 24/7 access to Kia our ChatBot',
  'You make decision for long term sustainable well-being',
  'You get results,Congratulations!',
];

export default function CoachPlans() {
  const { handleOpenModal } = useContactForm();
  const [selectedPlanSlug, setSelectedPlanSlug] = useState(plansData[0]?.slug || '');
  const [selectedDuration, setSelectedDuration] = useState('12 Week');

  const selectedPlanObj = plansData.find((p) => p.slug === selectedPlanSlug) || plansData[0];

  const getPlanDetails = (plan, durationLabel) => {
    if (!plan) return { price: 0, total: 0, old: 0 };
    const GST = 0.18;
    const W = Math.round(plan.weeklyPrice * (1 + GST));
    if (durationLabel === '12 Week') {
      const price = W;
      const total = W * 12;
      const old = Math.round(total / 0.62);
      return { price, total, old };
    }
    if (durationLabel === '24 Week') {
      const price = Math.round(W * 0.85);
      const total = price * 24;
      const old = Math.round(total / 0.53);
      return { price, total, old };
    }
    if (durationLabel === '52 Week') {
      const price = Math.round(W * 0.75);
      const total = price * 52;
      const old = Math.round(total / 0.47);
      return { price, total, old };
    }
    return { price: 0, total: 0, old: 0 };
  };

  const selectedPlanDetails = getPlanDetails(selectedPlanObj, selectedDuration);

  return (
    <section className="w-full rounded-2xl border border-gray-200/60 bg-white p-5 pb-24 shadow-md sm:p-8 sm:pb-28">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Choose Your Care Programs
        </h2>

        <p className="mt-1.5 text-sm font-medium text-gray-500 sm:text-base">
          Take a step towards a longer, healthier and happier life!
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-4">
            {plansData.map((planItem) => {
              const isSelectedPlan = selectedPlanSlug === planItem.slug;
              const planPriceDetails = getPlanDetails(planItem, selectedDuration);

              return (
                <div
                  key={planItem.slug}
                  onClick={() => setSelectedPlanSlug(planItem.slug)}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isSelectedPlan
                      ? 'border-orange-500 bg-orange-50/5 shadow-md ring-1 ring-orange-500/30'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg whitespace-pre-line leading-tight">
                        {planItem.title.replace(/\n/g, ' ')}
                      </h3>
                      {isSelectedPlan && (
                        <BadgeCheck className="h-5 w-5 fill-orange-500 text-orange-950" />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {durations.map((item) => {
                        const isSelectedDuration =
                          isSelectedPlan && selectedDuration === item.label;

                        return (
                          <div key={item.label}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlanSlug(planItem.slug);
                                setSelectedDuration(item.label);
                              }}
                              className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm cursor-pointer ${
                                isSelectedDuration
                                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                              }`}
                            >
                              {item.label}
                            </button>

                            <p className="mt-1.5 text-center text-xs font-bold text-emerald-600">
                              {item.save}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {planPriceDetails && (
                      <div className="mt-5">
                        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                          {formatPrice(planPriceDetails.price, true)}
                        </p>

                        <div className="mt-1 flex gap-2 text-xs sm:text-sm">
                          <span className="font-medium text-gray-600">
                            {formatPrice(planPriceDetails.total)}
                          </span>

                          {planPriceDetails.old && (
                            <span className="text-gray-400 line-through">
                              {formatPrice(planPriceDetails.old)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                What you will get in the care plan?
              </h3>

              <div className="mt-6 space-y-5">
                {features.map((item) => (
                  <div className="flex gap-3" key={item.title}>
                    <Diamond className="mt-1 h-4 w-4 shrink-0 text-orange-500" />

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 sm:text-base">{item.title}</h4>

                      <p className="mt-1 text-xs text-gray-600 sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">How it works?</h3>

              <div className="mt-5">
                {steps.map((step, index) => (
                  <div key={step} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <Circle className="h-2.5 w-2.5 fill-[#2F387F] text-[#2F387F]" />

                      {index !== steps.length - 1 && <div className="h-8 w-px bg-gray-200" />}
                    </div>

                    <p className="pb-3 text-xs font-medium text-gray-600 sm:text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6 text-center">
              <div>
                <CalendarDays className="mx-auto mb-2 h-6 w-6 text-[#2F387F]" />
                <p className="text-xs font-medium text-gray-500">
                  30 days money
                  <br />
                  back guarantee
                </p>
              </div>

              <div>
                <CreditCard className="mx-auto mb-2 h-6 w-6 text-[#2F387F]" />
                <p className="text-xs font-medium text-gray-500">
                  EMI option
                  <br />
                  available
                </p>
              </div>

              <div>
                <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-[#2F387F]" />
                <p className="text-xs font-medium text-gray-500">
                  Secure
                  <br />
                  payments
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Fixed bottom strip */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-6 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] backdrop-blur-md sm:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Selected Plan
            </span>
            <span className="text-sm font-bold text-gray-900 sm:text-base">
              {selectedPlanObj?.title.replace(/\n/g, ' ')} <span className="font-normal text-gray-300">|</span>{' '}
              <span className="text-[#2F387F]">{selectedDuration}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col text-right">
              <span className="text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
                {formatPrice(selectedPlanDetails?.total)}
              </span>
              <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
                ({formatPrice(selectedPlanDetails?.price, true)} incl. 18% GST)
              </span>
            </div>

            <button
              onClick={handleOpenModal}
              className="cursor-pointer rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow active:scale-95 sm:px-7 sm:py-2.5 sm:text-sm"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
