import React, { useState } from 'react';
import { Media } from '../utils/media';
import LeftDocImg from '../assets/svgs/plans/leftDocBg.png';
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
    // <div className="plans flex h-screen w-full flex-col items-center justify-center">
    //   <div className="top-card flex h-[80vh] w-full items-end justify-center bg-[#F1EFEC]">
    //     <div className="content relative mb-8 flex h-[80%] w-[91%] items-center justify-end overflow-hidden rounded-2xl">
    //       <img
    //         src={Media.plans.planDoctorBg}
    //         alt="Doctor Background"
    //         className="absolute bottom-0 left-0 z-0 h-full w-auto object-contain"
    //       />

    //       <img
    //         src={Media.plans.doctorBgTestCards}
    //         alt="Doctor Background for Test Cards"
    //         className="absolute bottom-0 left-0 z-0 w-auto translate-x-[-20%] translate-y-[10%] object-contain"
    //       />

    //       <div className="tabs z-10 flex h-full w-[55%] flex-col items-start justify-center gap-5 px-10 py-8">
    //         <h2 className="text-center font-[Arima] text-4xl font-bold leading-snug text-black">
    //           Better health starts with understanding <br /> your body
    //         </h2>
    //         <p className="text-center font-[Inter] text-sm leading-relaxed text-black">
    //           Get expert-led care plans designed around your body, habits, biomarkers, and health
    //           goals to help you prevent, manage, and reverse lifestyle <br />
    //           conditions.
    //         </p>
    //         <div className="grid w-full grid-cols-3 gap-3">
    //           {visibleTabs.map((tab, i) => (
    //             <PlansCard
    //               key={tab.index}
    //               {...tab}
    //               isActive={i === activeTab}
    //               // onClick={() => setActiveTab(i)}
    //             />
    //           ))}
    //           <button
    //             onClick={() => setModalOpen(true)}
    //             className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-5 transition-colors hover:bg-gray-50"
    //           >
    //             <span className="text-sm font-semibold text-gray-800">
    //               View all <ChevronRight className="inline-block h-4 w-4" />
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="bottom-card flex h-[20vh] w-full flex-col items-center justify-center bg-[#fafafb]">
    //     <div className="content flex w-full items-center justify-around">
    //       <h2 className="whitespace-pre-line text-2xl font-semibold text-gray-800">
    //         Learn how to be fit 💪with
    //         <br />
    //         Mytwin
    //       </h2>
    //       <button className="ml-4 rounded-full bg-black px-8 py-2 font-semibold text-white transition duration-300 hover:bg-gray-800">
    //         Download App
    //       </button>
    //     </div>
    //     <hr className="mt-4 w-[80%] border-t border-gray-300" />
    //   </div>

    //   {modalOpen && (
    //     <div
    //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    //       onClick={() => setModalOpen(false)}
    //     >
    //       <div
    //         className="relative w-[90vw] max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
    //         onClick={(e) => e.stopPropagation()}
    //       >
    //         <div className="mb-6 flex items-center justify-between">
    //           <h3 className="text-2xl font-bold text-gray-900">All Health Plans</h3>
    //           <button
    //             onClick={() => setModalOpen(false)}
    //             className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
    //           >
    //             ✕
    //           </button>
    //         </div>
    //         <div className="grid grid-cols-3 gap-4">
    //           {plansTabs.map((tab, i) => (
    //             <PlansCard
    //               key={tab.index}
    //               {...tab}
    //               isActive={i === activeTab}
    //               onClick={() => {
    //                 setActiveTab(i);
    //                 setModalOpen(false);
    //               }}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
      <div className="flex h-full flex-1 bg-[#F1EFEC] flex-col justify-between">
        <div className="mx-4 mb-8 mt-[100px] flex flex-col overflow-hidden rounded-2xl bg-gradient-to-r from-[#D8EAFB] via-[#EFF5EA] to-[#FAECFE] pt-4 sm:mx-6 md:mx-10 md:mb-10 md:mt-[120px] md:flex-row md:pt-5">
          <div
            style={{ backgroundImage: `url(${LeftDocImg})` }}
            className="min-h-[220px] flex-1 bg-contain bg-center bg-no-repeat sm:min-h-[280px] md:min-h-[420px] md:flex-[1.5] md:bg-top"
          ></div>
          <div className="flex-1 self-center px-4 pb-6 sm:px-6 md:px-3 md:pb-5">
            <h1 className="text-center font-[Arima] text-[28px] font-bold leading-tight text-black sm:text-[34px] md:text-[1.95vw] md:leading-snug">
              Better health starts with understanding your body
            </h1>
            <p className="my-4 text-center font-[Inter] text-[14px] leading-6 text-black sm:my-5 sm:text-[16px] md:text-[1vw] md:leading-snug">
              Get expert-led care plans designed around your body, habits, biomarkers, and health
              goals to help you prevent, manage, and reverse lifestyle conditions.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-2">
              {visibleTabs.map((tab, i) => (
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
              <button
                onClick={() => setModalOpen(true)}
                className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-white px-3 py-3 text-left text-black shadow-md hover:bg-[#F97316] hover:text-white md:py-2"
              >
                <h1 className="text-[15px] font-semibold leading-snug sm:text-[16px] md:text-[1vw]">
                  View all <ChevronRight className="inline-block h-4 w-4" />
                </h1>
              </button>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 pt-10 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:w-[90vw] sm:p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">All Health Plans</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
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

        <div className="flex flex-col items-start gap-4 bg-white px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:p-10">
          <h1 className="text-[26px] font-bold leading-tight text-[#18181B] sm:text-[32px] md:text-[2vw] md:leading-snug">
            Learn how to be fit 💪with <br /> MyTwin
          </h1>
          <button className="w-full rounded-full bg-black px-8 py-3 font-semibold text-white transition duration-300 hover:bg-gray-800 sm:w-auto md:ml-4 md:py-2">
            Download App
          </button>
        </div>
      </div>
    </>
  );
}

export const PlansCard = ({ title, icon, isActive, onClick, slug }) => {
  return (
    <Link
      to={`/plan-details/${slug}`}
      onClick={onClick}
      // style={{ backgroundColor: isActive ? '#F97316' : '#fff' }}
      className="flex min-h-[120px] cursor-pointer flex-col items-start gap-2 rounded-md bg-white px-3 py-3 text-left text-black shadow-md transition hover:bg-[#F97316] hover:text-white md:min-h-[unset] md:gap-1 md:py-2"
    >
      <div className="icon h-10 w-10 shrink-0 sm:h-11 sm:w-11 md:h-10 md:w-10">
        <img
          src={icon}
          alt={`${title} Icon`}
          className={`w-full`}
        />
      </div>
      <h2 className={`text-[15px] font-semibold leading-snug sm:text-[16px] md:text-[1vw]`}>
        {title.replace(/\\n/g, '\n')}
      </h2>
    </Link>
  );
};
