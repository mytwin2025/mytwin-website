import React from 'react';
import { Media } from '../utils/media';
import '../sections/landing/landing.css';
import LandingVideo from '../sections/landing/LandingVideo';
import AppSection from '../sections/landing/AppSection';
import AppFrameworkSection from '../sections/landing/AppFrameworkSection';
import DetailSection from '../sections/landing/DetailSection';
import PeopleBehindSection from '../sections/landing/PeopleBehindSection';
import FAQSection from '../sections/landing/FAQSection';
import Footer from '../components/Footer';
import orangeBg from '../assets/images/sectionBg.png';
import Testimonials from '../components/Testimonials';
import { ArrowRightIcon as RightArrow} from 'lucide-react'
import { useState } from 'react';
import BookConsultationModal from '../components/BookConsultationModal';
import SEO from '../components/SEO';

export default function LandingPage() {
  const frameRef = React.useRef(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  return (
    <>
    <SEO title="Home" />
    <div className="relative h-full w-full">
      <LandingVideo />
      {/* <AppSection /> */}
      <AppFrameworkSection frameRef={frameRef} />
      <DetailSection frameRef={frameRef} />
      <div className="bg-white">
        <div className="mx-auto max-w-5xl">
          <Testimonials />
        </div>
      </div>
      <PeopleBehindSection />
      <FAQSection />
      <div
        className="relative flex w-full flex-col items-center justify-center gap-6 bg-white bg-cover bg-center bg-no-repeat px-6 py-16 md:flex-row md:gap-0 md:px-24 md:py-8 md:gap-6"
      >
        <span className="font-[Inter] font-semibold text-[18px] leading-[24px] text-[#2F387F]">Still have a question?</span>
        <button
          className="flex flex-row items-center justify-between gap-4 rounded-full bg-[#f3f3f4] p-2 pr-4 pl-4 transition-transform hover:scale-105 "
          onClick={() => setShowConsultationModal(true)}
        >
          <div className="relative h-10 w-[136px] hidden md:flex">
            {[
              'https://randomuser.me/api/portraits/men/32.jpg',
              'https://randomuser.me/api/portraits/women/44.jpg',
              'https://randomuser.me/api/portraits/men/46.jpg',
              'https://randomuser.me/api/portraits/women/68.jpg',
              'https://randomuser.me/api/portraits/men/85.jpg',
            ].map((src, idx) => (
              <img
                key={idx}
                src={src}
                className="absolute top-0 h-10 w-10 rounded-full border-2 border-[#f3f3f4] object-cover"
                style={{
                  transform: `translateX(${idx * 24}px)`,
                  zIndex: 10 + idx,
                }}
                alt="user"
              />
            ))}
          </div>
          <span className="font-semibold text-gray-800 text-[14px] md:text-[16px]">Book Free Consultation</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <RightArrow size={20} color="#000" />
          </div>
        </button>
      </div>
      <Footer />
      <BookConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
      />
    </div>
    </>
  );
}
