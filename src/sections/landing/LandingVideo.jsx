import React from 'react';
import { Media } from '../../utils/media';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LeftTextSection from '../../components/landing/LeftTextSection';
import RightTextCardSection from '../../components/landing/RightTextCardSection';
import AppointmentCard from '../../components/landing/AppointmentCard';
import FaceScanVitalCard from '../../components/landing/FaceScanVitalCard';
import LabCard from '../../components/landing/LabCard';
import MealBodyVitalCard from '../../components/landing/MealBodyVitalCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CombinedFeaturePhone from '../../components/CombinedFeaturePhone';
export default function LandingVideo({ forwardedRef }) {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const phoneBg = Media.phoneBg;
  const phoneBgArray = Object.values(phoneBg);
  const sectionRef = React.useRef(null);
  const bgGrid = React.useRef(null);
  const textContent = React.useRef(null);
  const bgBlurSlider = React.useRef(null);
  const phoneModelWrap = React.useRef(null);
  const phoneModel = React.useRef(null);
  const behindPhone = React.useRef(null);
  const myTwinFrameworkHeading = React.useRef(null);
  const leftCardData = [
    {
      index: '01',
      heading: 'Your glucose tells\na story. We help\nyou read it.',
      buttonText: 'Track Your Glucose',
      to: '',
    },
    {
      index: '02',
      heading: 'Don’t wait for \nsymptoms. Know early.',
      buttonText: 'Add Lab Test',
      to: '',
    },
    {
      index: '03',
      heading: 'Your vitals. \nScanned in seconds.',
      buttonText: 'Start Face Scan',
      to: '',
    },
    {
      index: '04',
      heading: 'Personalised \ncoaching That \nAdapts To Your \nBody',
      buttonText: 'Book a Free Consultation',
      to: '',
    },
  ];
  const rightCardData = [
    {
      index: '01',
      paragraph:
        'Track glucose trends, monitor daily patterns, and identify how food, sleep, stress, and  activity impact your body in real time.',
      tableData: [
        'Real-time glucose tracking',
        'Post-meal spike analysis',
        'Daily pattern monitoring',
        'Smarter food & lifestyle decisions',
      ],
      // card: <MealBodyVitalCard style={{ backgroundColor: '#fff' }} />,
      // card: (<img src={Media.landing.labCard} alt="Lab Card" className="w-full rounded-[1.5rem]" />),
      image: Media.landing.labCard,
    },
    {
      index: '02',
      paragraph:
        'Get access to advanced lab tests and full-body health checkups designed to detect risks  early, track biomarkers, and optimise your health with real data.',
      tableData: [
        'Full body & condition-specific panels',
        'Doctor-backed diagnostics',
        'Biomarker tracking & insights',
        'Early risk detection & prevention',
      ],
      // card: (
      //   <div className="relative w-full">
      //     <LabCard
      //       // style={{ marginBottom: '16px' }}
      //       title="Glucose, Fasting"
      //       value={85.23}
      //       unit="mg/dL"
      //       ranges={{
      //         displayMin: 70,
      //         lowMax: 70,
      //         normalMax: 100,
      //         displayMax: 110,
      //       }}
      //       date="11 Aug, 2024"
      //     />
      //     <LabCard
      //       style={{
      //         position: 'absolute',
      //         bottom: '-70%',
      //         left: 0,
      //         width: '120%',
      //         transform: 'translateX(-15%)',
      //       }}
      //     />
      //   </div>
      // ),
      // card: (
      //   <img
      //     src={Media.landing.glucoseCard}
      //     alt="Glucose Card"
      //     className="w-full rounded-[1.5rem]"
      //   />
      // ),
      image: Media.landing.glucoseCard,
    },
    {
      index: '03',
      paragraph:
        'Effortlessly monitor key health metrics like blood pressure, heart rate, stress, breathing  rate, and oxygen levels through a simple, contactless face scan.',
      tableData: [
        'No devices. No delays.',
        'Real-time health insights',
        'Early risk detection',
        'Track changes over time',
      ],
      // card: <FaceScanVitalCard />,
      // card: (<img src={Media.landing.faceScanCard} alt="Face Scan Card" className="w-full rounded-[1.5rem]" />
      // ),
      image: Media.landing.faceScanCard,
    },
    {
      index: '04',
      paragraph:
        'Get matched with certified health & nutrition experts who guide you using your real-time  data, habits, lifestyle, and goals not generic templates.',
      tableData: [
        'Personalised nutrition & fitness guidance',
        'Real-time habit & progress tracking',
        'Ongoing plan adjustments',
        'Indian meals. Real life. Sustainable results.',
      ],
      image: Media.landing.consultCoachBg,
      // card: <AppointmentCard />,
      // card: (<div className="relative w-full">
      //   <img
      //     src={Media.landing.consultCoachBg}
      //     alt="Consult Coach Background"
      //     className="w-full rounded-t-[1.5rem]"
      //   />
      //   </div>),
    },
  ];

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          onEnter: () => {
            gsap.to(bgBlurSlider.current, {
              duration: 1,
              zIndex: 12,
              translateY: '0%',
              ease: 'power1.out',
              opacity: 1,
            });
            gsap.to(textContent.current, {
              opacity: 0,
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(phoneModelWrap.current, {
              zIndex: 14,
              duration: 1,
              ease: 'power1.out',
              opacity: 1,
            });
            gsap.to(phoneModel.current, {
              duration: 1,
              ease: 'power1.out',
            });
            gsap.to(bgGrid.current, {
              duration: 0.1,
              ease: 'power1.out',
              // opacity: 0,
              y: '-60%',
              zIndex: 13,
              backgroundColor: 'rgba(0,0,0,0)',
            });
          },
          onLeaveBack: () => {
            gsap.to(bgBlurSlider.current, {
              duration: 1,
              zIndex: 4,
              translateY: '90%',
              ease: 'power1.out',
              opacity: 0,
            });
            gsap.to(textContent.current, {
              opacity: 1,
              duration: 0.1,
              ease: 'power1.out',
            });
            gsap.to(phoneModelWrap.current, {
              scale: 1,
              duration: 0.5,
              ease: 'power1.out',
              opacity: 0,
            });
            gsap.to(bgGrid.current, {
              duration: 0.1,
              ease: 'power1.out',
              // opacity: 0.5,
              y: '0%',
              zIndex: 6,
              backgroundColor: 'rgba(0,0,0,0.6)',
            });
          },
        });
        const vh = window.innerHeight;
        const screenshots = gsap.utils.toArray('.screenshot');
        const leftCards = gsap.utils.toArray('.left-card');
        const rightCards = gsap.utils.toArray('.right-card');
        const behindPhoneElem = behindPhone.current;
        // initial state for screenshots
        screenshots.forEach((ss, i) => {
          gsap.set(ss, {
            y: i === 0 ? 0 : vh,
            opacity: i === 0 ? 1 : 0,
            zIndex: i + 1,
          });
        });

        // initial state for left/right cards — stack below viewport
        leftCards.forEach((card, i) => {
          gsap.set(card, { y: i === 0 ? 0 : vh, opacity: i === 0 ? 1 : 0 });
        });
        rightCards.forEach((card, i) => {
          gsap.set(card, { y: i === 0 ? 0 : vh, opacity: i === 0 ? 1 : 0 });
        });
        gsap.set(behindPhoneElem, {
          y: vh,
          opacity: 0,
        });

        const holdTime = 1; // time to hold each screenshot before transitioning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${screenshots.length * 100}%`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 'labels',
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
              delay: 0.05,
            },
          },
        });

        // ss state 0

        //create labels for index 0 screenshot
        tl.addLabel(`screenshot-0`, 0); //add label for first screenshot at the start of the timeline 0 is time in seconds

        screenshots.forEach((ss, i) => {
          if (i === 0) return;
          //previous screenshot index
          // const startTime = holdTime + i * holdTime; //calculate start time for each screenshot based on index and hold time
          const startTime = holdTime + (i - 1) * holdTime; //calculate start time for each screenshot based on index and hold time
          tl.addLabel(`screenshot-${i}`, startTime); //add label for current screenshot at the calculated start time

          // outgoing screenshot fades out
          tl.to(screenshots[i - 1], { opacity: 0, duration: 1, ease: 'none' }, startTime)
            // incoming screenshot slides up from below
            .to(ss, { y: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);

          // left cards
          if (leftCards[i - 1]) {
            tl.to(leftCards[i - 1], { y: -vh, opacity: 0, duration: 1, ease: 'none' }, startTime);
          }
          if (leftCards[i]) {
            tl.to(leftCards[i], { y: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);
          }

          // right cards
          if (rightCards[i - 1]) {
            tl.to(rightCards[i - 1], { y: -vh, opacity: 0, duration: 1, ease: 'none' }, startTime);
          }
          if (rightCards[i]) {
            tl.to(rightCards[i], { y: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);
          }
          if (i === screenshots.length - 1) {
            const rightText = rightCards[i].querySelector('p');
            const rightUlText = rightCards[i].querySelectorAll('li');
            const leftText = leftCards[i].querySelector('h2');
            const leftSpan = leftCards[i].querySelector('span');
            tl.to(
              rightText,
              { y: 0, color: '#fff', duration: 0.5, ease: 'none' },
              startTime + holdTime - 0.5
            );
            tl.to(
              leftText,
              { y: -10, color: '#fff', duration: 0.5, ease: 'none' },
              startTime + holdTime - 0.5
            )
              .to(
                leftSpan,
                { y: -10, color: '#fff', duration: 0.5, ease: 'none' },
                startTime + holdTime - 0.5
              )

              .to(rightUlText, { y: -5, color: '#fff', duration: 0.5, ease: 'none' }, '<');
            tl.to(
              behindPhoneElem,
              { y: '-10%', opacity: 1, duration: 1, ease: 'none' },
              startTime
            ).to(
              myTwinFrameworkHeading.current,
              { opacity: 1, y: '5%', duration: 0.1, ease: 'power1.inOut' },
              '<'
            );
          }
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  const combinedFeatures = leftCardData.map((left, i) => ({
    ...left,
    phoneBg: phoneBgArray[i],
    ...rightCardData[i],
  }));
  // console.log('phoneBgArray', phoneBgArray);
  console.log('combinedFeatures', combinedFeatures);

  return (
    <>
      <section className="hero relative h-screen w-full" ref={sectionRef}>
        <div
          ref={bgGrid}
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[6] flex h-full w-full items-start justify-center bg-black/60"
        >
          <img
            src={Media.landing.bgGrid}
            alt="Background"
            className="object-cover opacity-50"
            id="bgGrid"
          />
        </div>
        {/* Landing Page */}
        <video
          src={Media.landing.landingVideo}
          autoPlay
          loop
          muted
          playsInline
          poster={Media.landing.videoPoster}
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[2] h-screen w-full bg-[#151714] object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          id="textContent"
          ref={textContent}
          className="relative z-[8] flex h-full w-full items-center justify-center"
        >
          <div className="z-[20] w-full px-4 text-center leading-[1.2] text-white">
            <h1 className="font-[Arima] text-[40px] font-bold md:text-[72px]">Optimal Health</h1>
            <h2 className="mt-2 font-[Inter] text-[20px] font-light tracking-wider md:text-[40px]">
              Through clinically guided and outcome-driven care.
            </h2>
            <div className="mx-auto mt-6 flex max-w-[600px] flex-col items-center gap-6">
              <p className="spacing-2 mx-auto font-[Inter] text-sm">
                Continous health Monitoring, expert-led guidance, and personalised action plans to
                help you prevent, manage, and reverse lifestyle conditions.
              </p>
              <button
                className="spacing-2 animate-pulse cursor-pointer rounded-full bg-white px-6 py-4 font-[Inter] font-bold text-black"
                onClick={() => navigate('/plans/')}
              >
                Start your journey
              </button>

              <button className="spacing-2 rounded-full border-[2px] border-white bg-transparent px-6 py-4 font-[Inter] font-bold text-white">
                Is MyTwin for me?
              </button>
            </div>
          </div>
        </div>

        <div ref={bgBlurSlider} id="bgBlurSlider" className="">
          <div className="blur-top" />
        </div>

        <div
          ref={phoneModelWrap}
          className="absolute bottom-0 left-0 right-0 top-0 z-[12] flex h-screen w-full items-center justify-center overflow-hidden opacity-0"
        >
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 m-auto flex h-full flex-row items-center justify-around`}
          >
            {/* <img
              src={Media.handBehindPhone}
              alt="Hand Behind Phone"
              className={`absolute z-[10] h-[80%] w-full object-cover rounded-[4rem]`}
            /> */}
            <div ref={behindPhone} id="behindPhone">
              <img
                src={Media.hand}
                alt="Hand Behind Phone"
                // className={`translate-x-[1%]`}
              />
            </div>

            <div className="left relative h-[560px] w-[420px] flex-shrink-0">
              {leftCardData.map((data, index) => (
                <div
                  key={index}
                  className="left-card absolute inset-0 flex items-center justify-start"
                >
                  <LeftTextSection
                    index={data.index}
                    heading={data.heading}
                    buttonText={data.buttonText}
                  />
                </div>
              ))}
            </div>

            <div className="relative flex h-[60vh] w-[19vw] flex-shrink-0 items-center justify-center overflow-hidden rounded-[2rem]">
              <img
                ref={phoneModel}
                src={Media.landing.iphoneModel}
                alt="iPhone Model"
                className={`absolute z-[16] h-full object-contain`}
              />

              {phoneBgArray.map((bg, index) => (
                <img
                  key={index}
                  src={bg}
                  alt={`Phone Background ${index + 1}`}
                  className={`screenshot opacity-1 absolute h-full rounded-[2rem] object-cover z-[${15 - index}]`}
                />
              ))}
            </div>

            <div className="right relative h-[560px] w-[440px] flex-shrink-0">
              {rightCardData.map((data, index) => (
                <div
                  key={index}
                  className="right-card absolute inset-0 flex items-center justify-start"
                >
                  <RightTextCardSection
                    index={data.index}
                    paragraph={data.paragraph}
                    tableData={data.tableData}
                    Card={data.card}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={myTwinFrameworkHeading}
          className="absolute bottom-0 left-0 right-0 z-[14] m-auto flex h-[100px] w-full items-center justify-center opacity-0"
        >
          <h2 className="font-[Arima] text-[2.5rem] font-bold tracking-wide text-black">
            MyTwin 4M Framework
          </h2>
        </div>
      </section>

      {/* Mobile-Only Feature Stack (Fallback for ScrollTrigger pinning) */}
      <div className="block flex flex-col gap-2 bg-[#F1EFEC] px-2 py-4 text-white md:hidden">
        {combinedFeatures.map((feature, index) => (
          <CombinedFeaturePhone key={index} feature={feature} />
        ))}
        <h2 className="text-center font-[Arima] text-[1.7rem] font-bold tracking-wide text-black">
          MyTwin 4M Framework
        </h2>
      </div>
    </>
  );
}
