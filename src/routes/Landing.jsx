import React from 'react';
import { Media } from '../utils/media';
import '../sections/landing/landing.css';
import LandingVideo from '../sections/landing/LandingVideo';
import AppSection from '../sections/landing/AppSection';
import AppFrameworkSection from '../sections/landing/AppFrameworkSection';
import DetailSection from '../sections/landing/DetailSection';
import TestMonialSection from '../sections/landing/TestMonialSection';
import PeopleBehindSection from '../sections/landing/PeopleBehindSection';
import FAQSection from '../sections/landing/FAQSection';
import Footer from '../components/Footer';
import orangeBg from '../assets/images/sectionBg.png';

export default function LandingPage() {
  const frameRef = React.useRef(null);

  return (
    <div className="relative h-full w-full">
      <LandingVideo />
      {/* <AppSection /> */}
      <AppFrameworkSection frameRef={frameRef} />
      <DetailSection frameRef={frameRef} />
      {/* <TestMonialSection /> */}
      <PeopleBehindSection />
      <FAQSection />
      <div
        style={{ backgroundImage: `url(${orangeBg})` }}
        className="relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-16 md:py-8"
      >
        <div className="footer-banner-overlay z-2 absolute inset-0 h-full w-full" />

        <div className="z-10 flex flex-col items-center justify-between pb-8">
          <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[63px]">
            Take Control of
          </h2>
          <div className="flex items-center justify-center">
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
          </div>
          <p className="mt-4 max-w-2xl font-extralight text-center font-[Inter] text-[14px] leading-[28px] text-white md:text-lg">
            Mytwin extend your health journey
            <br />
            with expert doctors, diagnostics, and <br />
            lifestyle guidance in one dedicated space.
          </p>

          <button className="mt-8 rounded-full border-2 border-[#ffffff40] bg-white px-6 py-2 font-[Inter] font-bold text-[#2F387F] transition-colors hover:border-[#ffffffcc] hover:bg-gray-200 md:text-lg">
            Book Free Consultation
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
