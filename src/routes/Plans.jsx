import React, { useState } from 'react';
import { Media } from '../utils/media';
import LeftDocImg from '../assets/svgs/plans/leftDocBg.png';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigation } from 'react-router-dom';
import Footer from '../components/Footer';
import orangeBg from '../assets/images/sectionBg.png';
import BookConsultationModal from '../components/BookConsultationModal';
import SEO from '../components/SEO';

export default function Plans() {
  const [activeTab, setActiveTab] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showBookConForm, setShowBookConForm] = useState(false);

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
      title: 'Diabetes &\nPrediabetes Care',
      icon: Media.plans.icons.diabetesIcon,
      slug: 'diabetes-metabolic-health',
    },
    {
      index: '03',
      title: 'Heart Health, Blood Pressure & Cholesterol Care',
      icon: Media.plans.icons.heartIcon,
      slug: 'heart-health-hypertension',
    },
    // {
    //   index: '04',
    //   title: 'High\nCholesterol',
    //   icon: Media.plans.icons.cholesterolIcon,
    //   slug: 'high-cholesterol',
    // },
    {
      index: '05',
      title: 'Muscle, Strength & \nMobility Care',
      icon: Media.plans.icons.muscleIcon,
      slug: 'muscle-gain-strength',
    },
    {
      index: '06',
      title: 'Fatty Liver',
      icon: Media.plans.icons.fattyLiverIcon,
      slug: 'fatty-liver',
    },
    {
      index: '07',
      title: 'PCOS / PCOD\nCare',
      icon: Media.plans.icons.pcosIcon,
      slug: 'pcos-pcod-care',
    },
  ];

  // Show first 5 in grid, last slot is "View all"
  // const visibleTabs = plansTabs.slice(0, 5);

  return (
    <>
      <SEO title="Care Programs" description="Get expert-led care programs designed around your body, habits, biomarkers, and health goals." />
      <div className="flex h-full flex-1 flex-col justify-between bg-[#F1EFEC]">
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
              Get expert-led care programs designed around your body, habits, biomarkers, and health
              goals to help you prevent, manage, and reverse lifestyle conditions.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-2">
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
              {/* <button
                onClick={() => setModalOpen(true)}
                className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-white px-3 py-3 text-left text-black shadow-md hover:bg-[#F97316] hover:text-white md:py-2"
              >
                <h1 className="text-[15px] font-semibold leading-snug sm:text-[16px] md:text-[1vw]">
                  View all <ChevronRight className="inline-block h-4 w-4" />
                </h1>
              </button> */}
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
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">All Health Programs</h2>
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

        {/* <div className="flex flex-col items-start gap-4 bg-white px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:p-10">
          <h1 className="text-[26px] font-bold leading-tight text-[#18181B] sm:text-[32px] md:text-[2vw] md:leading-snug">
            Learn how to be fit 💪with <br /> MyTwin
          </h1>
          <button className="w-full rounded-full bg-black px-8 py-3 font-semibold text-white transition duration-300 hover:bg-gray-800 sm:w-auto md:ml-4 md:py-2">
            Download App
          </button>
        </div> */}
        <div
          style={{ backgroundImage: `url(${orangeBg})` }}
          className="relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-16 md:py-8"
        >
          <div className="footer-banner-overlay z-2 absolute inset-0 h-full w-full" />

          <div className="z-10 flex flex-col items-center justify-center">
            <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[50px]">
              Need help finding the right coach?
            </h2>
            {/* <div className="flex items-center justify-center">
                    <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[63px]">
                      Your
                    </h2>
                    <img
                      src={Media.header.mytwinWhite}
                      alt="MyTwin Logo"
                      className="mx h-12 w-auto translate-y-1"
                    />
                    <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[63px]">
                      Health
                    </h2>
                  </div> */}
            <p className="max-w-2xl text-center font-[Inter] text-[14px] font-extralight leading-[28px] text-white md:text-lg">
              Request a callback to get your queries answered
            </p>

            <button
              onClick={() => setShowBookConForm(true)}
              className="mt-4 rounded-full border-2 border-[#ffffff40] bg-white px-6 py-2 font-[Inter] font-bold text-[#2F387F] transition-colors hover:border-[#ffffffcc] hover:bg-gray-200 md:text-sm"
            >
              Talk to MyTwin Expert
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <BookConsultationModal isOpen={showBookConForm} onClose={() => setShowBookConForm(false)} />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918369255417"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-[999] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 496l133.9-35.1c32.7 17.8 69.4 27.2 107 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 445.2c-33.2 0-65.7-8.9-94-25.7l-6.7-4-79.8 20.9 21.3-77.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.7-186.6 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-16 origin-right scale-0 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl transition-all duration-300 group-hover:scale-100">
          Chat with us!
        </span>
      </a>
    </>
  );
}

export const PlansCard = ({ title, icon, isActive, onClick, slug }) => {
  return (
    <Link
      to={`/program-details/${slug}`}
      onClick={onClick}
      // style={{ backgroundColor: isActive ? '#F97316' : '#fff' }}
      className="flex min-h-[120px] cursor-pointer flex-col items-start gap-2 rounded-md bg-white px-3 py-3 text-left text-black shadow-md transition hover:bg-[#F97316] hover:text-white md:min-h-[unset] md:gap-1 md:py-2"
    >
      <div className="icon h-10 w-10 shrink-0 sm:h-11 sm:w-11 md:h-10 md:w-10">
        <img src={icon} alt={`${title} Icon`} className={`w-full`} />
      </div>
      <div className={`text-[15px] font-semibold leading-snug sm:text-[16px] md:text-[1vw]`}>
        {title.replace(/\\n/g, '\n')}
      </div>
    </Link>
  );
};
