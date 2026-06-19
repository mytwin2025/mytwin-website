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
      <div className="relative flex w-full flex-col items-center justify-center bg-[#fb741d] md:py-8 py-16">
        <div className="footer-banner-overlay z-2 absolute inset-0 h-full w-full" />

        <div className="z-10 flex flex-col items-center justify-between pb-8">
          <h2 className="text-center font-[Arima] text-[40px] md:text-[63px] leading-tight text-white">
            Take Control of
          </h2>
          <div className="flex items-center justify-center">
            <h2 className="text-center font-[Arima] text-[40px] md:text-[63px] leading-tight text-white">Your</h2>
            <img
              src={Media.header.mytwinWhite}
              alt="MyTwin Logo"
              className="mx h-12 w-auto translate-y-1"
            />
            <h2 className="text-center font-[Arima] text-[40px] md:text-[63px] leading-tight text-white">
              Health
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-center text-[14px] md:text-lg text-white leading-[28px] font-[Inter]">
            Mytwin extend your health journey
            <br />
            with expert doctors, diagnostics, and <br />
            lifestyle guidance in one dedicated space.
          </p>

          <button className="mt-8 rounded-full bg-white px-6 py-3  md:text-lg font-semibold text-[#2F387F] transition-colors hover:bg-gray-200 border-2 border-[#ffffff40] hover:border-[#ffffffcc] font-[Inter]">
            Book Free Consultation
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
