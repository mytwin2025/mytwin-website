import React from 'react';
import { Media } from '../utils/media';
import BrowseCoaches from '../sections/coaches/BrowseCoaches';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import RazorpayButton from '../components/PaymentComponent';
export default function Coaches() {
  const coachRef = React.useRef(null);
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  }); 
  useGSAP(() => {
    if (!coachRef.current) return;
    const ctx = gsap.context(() => {
      // gsap
      // .to(coachRef.current, {
      //   y: '15%',
      //   duration: 1,
      //   delay: 4,
      //   ease: 'power2.out',
      //   scrollTrigger: {
      //     trigger: coachRef.current,
      //     start: 'top 80%',
      //     scrub: true,
      //   },
      // })
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: coachRef.current,
      //     start: 'top 80%',
      //     end: 'bottom 20%',
      //     scrub: true,
      //   },
      // });
      // tl.to({}, { duration: 0.5 }) // Initial delay

      //   .to(coachRef.current, { y: '20%', duration: 1, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, [coachRef]);

  return (
    <div className="coaches flex min-h-screen w-full flex-col items-center justify-center bg-[#f0efed]">
      <div className="top-card relative flex h-screen w-full flex-col items-end justify-center bg-[#F1EFEC]">
        <img
          src={Media.plans.coaches.coachBg}
          alt="Coach Background"
          className="absolute bottom-0 top-0 h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="relative z-20 flex h-full w-full flex-col items-center justify-start pt-32 text-center">
            <div className="mb-4 w-full rounded px-3 py-1 text-sm font-semibold text-white">
              <h1 className="font-[Arima] text-6xl font-bold leading-snug text-white/90">
                Personalised coaching built around <br /> your body, goals, and lifestyle.
              </h1>
              <p className="font-[400] text-white/70">
                Whether your goal is fat loss, muscle gain, better metabolic health, or long-term
                fitness—get expert guidance, smarter tracking, and sustainable results that <br />{' '}
                actually last.
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
      <div className="max-h-screen h-screen w-full flex flex-col items-center justify-start bg-[#f0efed]">
        <BrowseCoaches />
      </div>
    </div>
  );
}
