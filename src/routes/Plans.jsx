import React, { useState } from 'react';
import { Media } from '../utils/media';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigation } from 'react-router-dom';
export default function Plans() {
  const [activeTab, setActiveTab] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const navigation = useNavigation();

  const plansTabs = [
    {
      index: '01',
      title: 'Obesity &\nWeight\nManagement',
      icon: Media.plans.icons.obesityWeightIcon,
      slug: 'obesity-weight-management',
    },
    {
      index: '02',
      title: 'Diabetes &\nMetabolic Health',
      icon: Media.plans.icons.diabetesIcon,
      slug: 'diabetes-metabolic-health',
    },
    {
      index: '03',
      title: 'PCOS / PCOD\nCare',
      icon: Media.plans.icons.pcosIcon,
      slug: 'pcos-pcod-care',
    },
    {
      index: '04',
      title: 'Heart Health &\nHypertension',
      icon: Media.plans.icons.heartIcon,
      slug: 'heart-health-hypertension',
    },
    {
      index: '05',
      title: 'Muscle Gain &\nStrength',
      icon: Media.plans.icons.muscleIcon,
      slug: 'muscle-gain-strength',
    },
    {
      index: '06',
      title: 'High\nCholesterol',
      icon: Media.plans.icons.cholesterolIcon,
      slug: 'high-cholesterol',
    },
    {
      index: '07',
      title: 'Fatty Liver',
      icon: Media.plans.icons.fattyLiverIcon,
      slug: 'fatty-liver',
    },
  ];

  // Show first 5 in grid, last slot is "View all"
  const visibleTabs = plansTabs.slice(0, 5);

  return (
    <div className="plans flex h-screen w-full flex-col items-center justify-center">
      <div className="top-card flex h-[80vh] w-full items-end justify-center bg-[#F1EFEC]">
        <div className="content relative mb-8 flex h-[80%] w-[91%] items-center justify-end overflow-hidden rounded-2xl">
          <img
            src={Media.plans.planDoctorBg}
            alt="Doctor Background"
            className="absolute bottom-0 left-0 z-0 h-full w-auto object-contain"
          />
          
          <img
            src={Media.plans.doctorBgTestCards}
            alt="Doctor Background for Test Cards"
            className="absolute bottom-0 left-0 z-0 w-auto translate-x-[-20%] translate-y-[10%] object-contain"
          />

          <div className="tabs z-10 flex h-full w-[55%] flex-col items-start justify-center gap-5 px-10 py-8">
            <h2 className="text-center font-[Arima] text-4xl font-bold leading-snug text-black">
              Better health starts with understanding <br /> your body
            </h2>
            <p className="text-center font-[Inter] text-sm leading-relaxed text-black">
              Get expert-led care plans designed around your body, habits, biomarkers, and health
              goals to help you prevent, manage, and reverse lifestyle <br />
              conditions.
            </p>
            <div className="grid w-full grid-cols-3 gap-3">
              {visibleTabs.map((tab, i) => (
                <PlansCard
                  key={tab.index}
                  {...tab}
                  isActive={i === activeTab}
                  // onClick={() => setActiveTab(i)}
                />
              ))}
              {/* View All tile */}
              <button
                onClick={() => setModalOpen(true)}
                className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-5 transition-colors hover:bg-gray-50"
              >
                <span className="text-sm font-semibold text-gray-800">
                  View all <ChevronRight className="inline-block h-4 w-4" />
                </span>
                {/* <span className="text-xl text-gray-500"></span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-card flex h-[20vh] w-full flex-col items-center justify-center bg-[#fafafb]">
        <div className="content flex w-full items-center justify-around">
          <h2 className="whitespace-pre-line text-2xl font-semibold text-gray-800">
            Learn how to be fit 💪with
            <br />
            Mytwin
          </h2>
          <button className="ml-4 rounded-full bg-black px-8 py-2 font-semibold text-white transition duration-300 hover:bg-gray-800">
            Download App
          </button>
        </div>
        <hr className="mt-4 w-[80%] border-t border-gray-300" />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-[90vw] max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">All Health Plans</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {plansTabs.map((tab, i) => (
                <PlansCard
                  key={tab.index}
                  {...tab}
                  isActive={i === activeTab}
                  onClick={() => {
                    setActiveTab(i);
                    setModalOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const PlansCard = ({ title, icon, isActive, onClick, slug }) => {
  return (
    <Link
      to={`/plan-details/${slug}`}
      onClick={onClick}
      style={{ backgroundColor: isActive ? '#F97316' : '#fff' }}
      className="plan-card flex cursor-pointer flex-col items-start gap-3 rounded-md border border-gray-200 px-4 py-5 text-left"
    >
      <div className="icon h-10 w-10">
        <img
          src={icon}
          alt={`${title} Icon`}
          className={`h-full w-full object-contain ${isActive ? 'brightness-0 invert' : ''}`}
        />
      </div>
      <h2
        className={`title whitespace-pre-line text-sm font-semibold leading-snug ${isActive ? 'text-white' : 'text-gray-800'}`}
      >
        {title.replace(/\\n/g, '\n')}
      </h2>
    </Link>
  );
};
