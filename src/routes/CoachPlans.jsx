import React, { useState } from 'react';
import {
  BadgeCheck,
  Diamond,
  CalendarDays,
  ShieldCheck,
  CreditCard,
  Circle,
  Check,
  Loader2,
  Plus,
} from 'lucide-react';
import { useContactForm } from '../context/ContactFormContext';
import { plansData, addOnData } from './PlanDetails';
import { card } from '../components/DiagnosisBookForm';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachCheckoutModal from '../components/CoachCheckoutModal';
import CoachAddOnsModal from '../components/CoachAddOnsModal';
import Dialog from '../components/Dialog';
import axios from 'axios';
import { BASE_URL_APP } from '../constants/constants';
import { showToast } from '../components/Toast';

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
  const location = useLocation();
  const navigate = useNavigate();
  const coachData = location.state;

  const [selectedPlanSlug, setSelectedPlanSlug] = useState(plansData[0]?.slug || '');
  const [selectedDuration, setSelectedDuration] = useState('12 Week');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [isPincodeDialogOpen, setIsPincodeDialogOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pendingAddOn, setPendingAddOn] = useState(null);

  const selectedPlanObj = plansData.find((p) => p.slug === selectedPlanSlug) || plansData[0];

  const fourAddOns = [
    {
      title: card[0].name,
      description: card[0].description,
      price: parseInt(card[0].finalPrice.replace(/\D/g, '')),
      image: addOnData[0].image,
      gstExempt: true,
      pinCodeRequired: true,
      quantifiable: false,
      available: true,
    },
    addOnData[0],
    addOnData[1],
    addOnData[2],
  ];

  const handleToggleAddOn = (addon) => {
    const exists = selectedAddOns.find((item) => item.title === addon.title);
    if (exists) {
      setSelectedAddOns((prev) => prev.filter((item) => item.title !== addon.title));
      return;
    }

    if (addon.pinCodeRequired) {
      setPendingAddOn(addon);
      setPincode('');
      setPincodeError('');
      setIsPincodeDialogOpen(true);
      return;
    }

    setSelectedAddOns((prev) => [...prev, addon]);
  };

  const handlePincodeCheck = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode.');
      return;
    }
    setPincodeLoading(true);
    setPincodeError('');
    try {
      const response = await axios.post(`${BASE_URL_APP}/healtians/pincode-servicable`, {
        pincode: pincode,
      });
      if (response.data?.status === true || response.data?.success === true) {
        showToast('Pincode is serviceable!', 'success');
        setIsPincodeDialogOpen(false);
        setSelectedAddOns((prev) => [...prev, { ...pendingAddOn, pinCode: pincode }]);
        setPendingAddOn(null);
      } else {
        const errorMsg = response.data?.message || 'Pincode is not serviceable for this location.';
        setPincodeError(errorMsg);
      }
    } catch (error) {
      console.error('Error verifying pincode availability:', error);
      setPincodeError('Failed to check pincode. Please try again.');
      showToast('Error checking pincode availability.', 'error');
    } finally {
      setPincodeLoading(false);
    }
  };

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
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  const finalTotalAmount = selectedPlanDetails.total + addOnsTotal;

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
            {plansData.map((planItem, index) => {
              const isSelectedPlan = selectedPlanSlug === planItem.slug;
              const planPriceDetails = getPlanDetails(planItem, selectedDuration);

              return (
                <>
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
                        <h3 className="whitespace-pre-line text-base font-bold leading-tight text-gray-900 sm:text-lg">
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
                                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
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
                </>
              );
            })}

            {/* Add-Ons Section */}
            <div className="mt-4 flex flex-col gap-4">
              {selectedAddOns.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
                    Selected Add-Ons
                  </h4>
                  <div className="flex flex-col gap-3">
                    {selectedAddOns.map((addon, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={addon.image}
                            alt={addon.title}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="text-sm font-bold text-gray-700">{addon.title}</span>
                        </div>
                        <span className="text-sm font-extrabold text-gray-900">
                          ₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => setIsAddOnsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-orange-500 bg-orange-50 px-6 py-2.5 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-100"
                >
                  <Plus size={16} strokeWidth={3} />
                  Add Ons
                </button>
              </div>
            </div>
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
              {selectedPlanObj?.title.replace(/\n/g, ' ')}{' '}
              <span className="font-normal text-gray-300">|</span>{' '}
              <span className="text-[#2F387F]">{selectedDuration}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col text-right">
              <span className="text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
                {formatPrice(finalTotalAmount)}
              </span>
              <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
                ({formatPrice(selectedPlanDetails?.price, true)} incl. 18% GST{' '}
                {selectedAddOns.length > 0 ? '+ Add-Ons' : ''})
              </span>
            </div>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow active:scale-95 sm:px-7 sm:py-2.5 sm:text-sm"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      <CoachAddOnsModal
        isOpen={isAddOnsModalOpen}
        onClose={() => setIsAddOnsModalOpen(false)}
        addOnsData={fourAddOns}
        selectedAddOns={selectedAddOns}
        onToggleAddOn={handleToggleAddOn}
      />

      <Dialog isOpen={isPincodeDialogOpen} onClose={() => setIsPincodeDialogOpen(false)}>
        <div className="flex w-[90vw] max-w-[450px] flex-col items-center justify-center rounded-lg bg-white p-6">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-[Arima] text-xl font-bold text-black">Check Serviceability</h3>
            <button
              onClick={() => setIsPincodeDialogOpen(false)}
              className="text-gray-500 transition-colors hover:text-black"
            >
              ✕
            </button>
          </div>

          <p className="mb-6 text-center font-[Inter] text-sm text-gray-600">
            Enter your pincode to check if{' '}
            <span className="font-semibold text-[#FF6B01]">{pendingAddOn?.title}</span> is available in
            your location.
          </p>

          <div className="flex w-full flex-col gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 6) {
                    setPincode(val);
                    setPincodeError('');
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 font-[Inter] text-black outline-none focus:border-[#FF6B01] focus:ring-1 focus:ring-[#FF6B01]"
                maxLength={6}
              />
            </div>

            {pincodeError && (
              <p className="w-full text-left font-[Inter] text-xs text-red-500">{pincodeError}</p>
            )}

            <button
              onClick={handlePincodeCheck}
              disabled={pincodeLoading || pincode.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B01] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e65a00] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {pincodeLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Checking...
                </>
              ) : (
                'Check'
              )}
            </button>
          </div>
        </div>
      </Dialog>

      <CoachCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedPlanObj={selectedPlanObj}
        selectedDuration={selectedDuration}
        selectedPlanDetails={selectedPlanDetails}
        selectedAddOns={selectedAddOns}
        coachData={coachData}
        formatPrice={formatPrice}
      />
    </section>
  );
}
