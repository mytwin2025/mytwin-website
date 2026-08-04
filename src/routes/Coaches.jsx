import React from 'react';
import { Media } from '../utils/media';
import BrowseCoaches from '../sections/coaches/BrowseCoaches';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import RazorpayButton from '../components/PaymentComponent';
import orangeBg from '../assets/images/sectionBg.png';
import { useContactForm } from '../context/ContactFormContext';
import SEO from '../components/SEO';

export default function Coaches() {
  const coachRef = React.useRef(null);
  const { handleOpenModal } = useContactForm();
  // const lenis = new Lenis({
  //   duration: 1.2,
  //   smoothWheel: true,
  // });
  // useGSAP(() => {
  //   if (!coachRef.current) return;
  //   const ctx = gsap.context(() => {
  //     // gsap
  //     // .to(coachRef.current, {
  //     //   y: '15%',
  //     //   duration: 1,
  //     //   delay: 4,
  //     //   ease: 'power2.out',
  //     //   scrollTrigger: {
  //     //     trigger: coachRef.current,
  //     //     start: 'top 80%',
  //     //     scrub: true,
  //     //   },
  //     // })
  //     // const tl = gsap.timeline({
  //     //   scrollTrigger: {
  //     //     trigger: coachRef.current,
  //     //     start: 'top 80%',
  //     //     end: 'bottom 20%',
  //     //     scrub: true,
  //     //   },
  //     // });
  //     // tl.to({}, { duration: 0.5 }) // Initial delay

  //     //   .to(coachRef.current, { y: '20%', duration: 1, ease: 'power2.out' });
  //   });
  //   return () => ctx.revert();
  // }, [coachRef]);

  return (
    <>
    <SEO title="Expert Health Coaches" description="Personalised coaching built around your body, goals, and lifestyle." />
    <div className="coaches flex min-h-screen w-full flex-col items-center justify-center bg-[#f0efed]">
      <div className="top-card relative flex h-screen w-full flex-col items-end justify-center bg-[#F1EFEC]">
        <img
          src={Media.plans.coaches.coachBg}
          alt="Coach Background"
          className="absolute bottom-0 top-0 h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="relative z-20 flex h-full w-full flex-col items-center justify-center text-center md:mt-10">
            <div className="mb-4 w-full space-y-5 rounded px-3 py-1 text-sm font-semibold text-white md:w-[80%]">
              <h1 className="text-center font-[Arima] text-3xl font-bold leading-snug text-white md:text-5xl md:leading-tight">
                Personalised coaching built around <br /> your body, goals, and lifestyle.
              </h1>
              <p className="font-[Inter] text-sm font-[400] leading-relaxed text-white/70">
                Whether your goal is fat loss, muscle gain, better metabolic health, or long-term
                fitness—get expert guidance, smarter tracking, and sustainable results that actually
                last.
              </p>
              <button
                className="mt-4 rounded-full bg-[#fff] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#f0f0f0]"
                onClick={() => {
                  const coachesSection = document.querySelector('.browse-coaches');
                  if (coachesSection) {
                    coachesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Find Your Coach
              </button>
            </div>
          </div>
        </div>
      </div>
      <BrowseCoaches />
      {/* <div className="max-h-screen h-screen w-full flex flex-col items-center justify-start bg-[#f0efed]">
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
            onClick={handleOpenModal}
            className="mt-4 rounded-full border-2 border-[#ffffff40] bg-white px-6 py-2 font-[Inter] font-bold text-[#2F387F] transition-colors hover:border-[#ffffffcc] hover:bg-gray-200 md:text-sm"
          >
            Talk to MyTwin Expert
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
