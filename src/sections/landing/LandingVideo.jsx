import React from 'react';
import { Media } from '../../utils/media';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LeftTextSection from '../../components/landing/LeftTextSection';
import RightTextCardSection from '../../components/landing/RightTextCardSection';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HealthScorePopup from '../../components/landing/HealthScorePopup';
import { useContactForm } from '../../context/ContactFormContext';
import BookConsultationModal from '../../components/BookConsultationModal';

export default function LandingVideo({ forwardedRef }) {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
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
  const { handleOpenModal } = useContactForm();

  const leftCardData = [
    {
      index: '01',
      heading: 'Your glucose tells\na story. We help\nyou read it.',
      buttonText: 'Track Your Glucose ▶',
      to: '',
      onButtonClick: () => {
        navigate('/program-details/diabetes-metabolic-health');
      },
    },
    {
      index: '02',
      heading: 'Don’t wait for \nsymptoms. Know early.',
      buttonText: 'Book Lab Test ▶',
      to: '',
      onButtonClick: () => {
        navigate('/diagnostics');
      },
    },
    {
      index: '03',
      heading: 'Your vitals. \nScanned in seconds.',
      buttonText: 'Start Face Scan Vitals ▶',
      to: '',
      onButtonClick: handleOpenModal,
    },
    {
      index: '04',
      heading: 'Personalised \ncoaching That \nAdapts To Your \nBody',
      buttonText: 'Book Free Consultation ▶',
      to: '',
      onButtonClick: () => {
        setShowConsultationModal(true);
      },
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
      card: (
        <img src={Media.landing.glucoseCard} alt="Lab Card" className="w-full rounded-[1.5rem]" />
      ),
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
      card: (
        <img src={Media.landing.labCard} alt="Glucose Card" className="w-full rounded-[1.5rem]" />
      ),
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
      card: (
        <img
          src={Media.landing.faceScanCard}
          alt="Face Scan Card"
          className="mx-auto w-[70%] rounded-[1.5rem] md:mx-0"
        />
      ),
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
      card: (
        <img
          src={Media.landing.consultCoachBg}
          alt="Consult Coach Background"
          className="mx-auto w-[70%] rounded-[1.5rem] md:mx-0"
        />
      ),
    },
  ];

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const vh = window.innerHeight;
        const screenshots = gsap.utils.toArray('.screenshot');
        const leftCards = gsap.utils.toArray('.left-card');
        const rightCards = gsap.utils.toArray('.right-card');
        const behindPhoneElem = behindPhone.current;

        // initial state for elements previously in ScrollTrigger
        gsap.set(bgBlurSlider.current, { translateY: '0%', opacity: 0, zIndex: 4 });
        gsap.set(phoneModelWrap.current, { opacity: 0, scale: 1 });
        gsap.set(bgGrid.current, { y: '0%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 6 });
        gsap.set(textContent.current, { display: 'flex', opacity: 1 });

        // initial state for screenshots
        screenshots.forEach((ss, i) => {
          gsap.set(ss, {
            yPercent: i === 0 ? 0 : 100,
            opacity: i === 0 ? 1 : 0,
            zIndex: i + 1,
          });
        });

        // initial state for left/right cards
        leftCards.forEach((card, i) => {
          gsap.set(card, { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
        });
        rightCards.forEach((card, i) => {
          gsap.set(card, { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
        });
        gsap.set(behindPhoneElem, {
          yPercent: 100,
          opacity: 0,
        });

        const holdTime = 1;
        const introTime = 1; // Time allocated for the initial layout transition
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${(screenshots.length + 1) * 100}%`,
            pin: true,
            scrub: 1,
          },
        });

        // Intro animation attached to scroll (scrubbed)
        tl.addLabel('intro', 0);
        tl.to(bgBlurSlider.current, { duration: introTime, zIndex: 12, opacity: 1, ease: 'none' }, 'intro')
          .to(textContent.current, { duration: introTime, opacity: 0, display: 'none', ease: 'none' }, 'intro')
          .to(phoneModelWrap.current, { duration: introTime, zIndex: 14, opacity: 1, ease: 'none' }, 'intro')
          .to(bgGrid.current, { duration: introTime, y: '-60%', zIndex: 13, backgroundColor: 'rgba(0,0,0,0)', ease: 'none' }, 'intro');

        // Labels for screenshots
        tl.addLabel(`screenshot-0`, introTime);

        screenshots.forEach((ss, i) => {
          if (i === 0) return;
          const startTime = introTime + (i * holdTime);
          tl.addLabel(`screenshot-${i}`, startTime);

          // outgoing screenshot fades out
          tl.to(screenshots[i - 1], { opacity: 0, duration: 1, ease: 'none' }, startTime)
            // incoming screenshot slides up from below
            .to(ss, { yPercent: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);

          // left cards
          if (leftCards[i - 1]) {
            tl.to(
              leftCards[i - 1],
              { yPercent: -100, opacity: 0, duration: 1, ease: 'none' },
              startTime
            );
          }
          if (leftCards[i]) {
            tl.to(leftCards[i], { yPercent: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);
          }

          // right cards
          if (rightCards[i - 1]) {
            tl.to(
              rightCards[i - 1],
              { yPercent: -100, opacity: 0, duration: 1, ease: 'none' },
              startTime
            );
          }
          if (rightCards[i]) {
            tl.to(rightCards[i], { yPercent: 0, opacity: 1, duration: 1, ease: 'none' }, startTime);
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
              { yPercent: -10, opacity: 1, duration: 1, ease: 'none' },
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
  // console.log('combinedFeatures', combinedFeatures);

  return (
    <>
      <section className="hero relative z-[100] h-screen w-full" ref={sectionRef}>
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
          ref={(el) => {
            if (el) el.muted = true;
          }}
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
          className="relative z-[90] flex h-full w-full items-center justify-center"
        >
          <div className="z-[20] w-full px-4 pt-14 text-center text-white">
            <h1 className="font-[Arima] text-[40px] font-bold md:text-6xl">Optimal Helth</h1>
            <h2 className="mt-2 font-[Inter] text-2xl font-extralight md:text-4xl">
              through clinically guided and outcome-driven care.
            </h2>
            <div className="mx-auto mt-6 flex max-w-[600px] flex-col items-center">
              <p className="mx-auto font-[Inter] text-sm font-extralight">
                Continous health Monitoring, expert-led guidance, and personalised action plans to
                help you prevent, manage, and reverse lifestyle diseases.
              </p>
              <button
                className="mt-4 cursor-pointer rounded-full bg-white px-6 py-2 font-[Inter] font-semibold text-black"
                onClick={() => setShowConsultationModal(true)}
              >
                Start MyTwin Free
              </button>

              {/* <button className="mt-4 cursor-pointer rounded-full border border-white bg-transparent px-6 py-3 font-[Inter] font-semibold text-white">
                Is MyTwin for me?
              </button> */}
              <HealthScorePopup />
            </div>
            <div className="mt-10 flex w-full translate-y-[6vh] overflow-hidden">
              <div className="animate-marquee flex min-w-max whitespace-nowrap">
                <div className="flex gap-6 px-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    Heart rate - 120 bpm
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-red-600"></div>
                    HbA1c - 7%
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-teal-400"></div>
                    BP - 120/80 mmHg
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-fuchsia-600"></div>
                    Calcium - 1.7 mmol/L
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    Sleep quality - 80%
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                    Glucose - 140 mg/dL
                  </div>
                </div>

                <div className="flex gap-6 px-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    Heart rate - 120 bpm
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-red-600"></div>
                    HbA1c - 7%
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-teal-400"></div>
                    BP - 120/80 mmHg
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-fuchsia-600"></div>
                    Calcium - 1.7 mmol/L
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    Sleep quality - 80%
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                    Glucose - 140 mg/dL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={bgBlurSlider} id="bgBlurSlider">
          <div className="blur-top" />
        </div>

        {/* Middle mobile layout good in desktop*/}
        <div
          ref={phoneModelWrap}
          className="h-sreen absolute bottom-0 left-0 right-0 top-0 z-[12] hidden w-full items-center justify-center overflow-hidden opacity-0 md:flex"
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
                    onButtonClick={data.onButtonClick}
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
        {/* <div
          ref={myTwinFrameworkHeading}
          className="absolute bottom-0 left-0 right-0 z-[14] m-auto flex h-[100px] w-full items-center justify-center opacity-0"
        >
          <h2 className="font-[Arima] text-[2.5rem] font-bold tracking-wide text-black">
            MyTwin 4M Framework
          </h2>
        </div> */}
      </section>

      {/* Mobile-only stacked flow: left text -> phone -> right content */}
      <div className="flex flex-col gap-8 bg-[#F1EFEC] px-4 py-6 md:hidden">
        {combinedFeatures.map((feature, index) => (
          <div key={feature.index} className="rounded-3xl bg-white p-4 shadow-sm">
            <LeftTextSection
              index={feature.index}
              heading={feature.heading}
              buttonText={feature.buttonText}
              onButtonClick={feature.onButtonClick}
            />

            <div className="relative mx-auto mt-1 w-[78%] max-w-[280px]">
              <img
                src={Media.landing.iphoneModel}
                alt="iPhone Model"
                className="relative z-[2] w-full object-contain"
              />
              <img
                src={feature.phoneBg}
                alt={`${feature.heading} preview`}
                className="absolute left-[5.5%] top-[0] z-[1] w-[90%] rounded-[1.2rem] object-cover"
              />
            </div>

            <div className="mt-2">
              <RightTextCardSection
                onButtonClick={feature.onButtonClick}
                buttonText={feature.buttonText}
                Card={feature.card}
                paragraph={feature.paragraph}
                tableData={feature.tableData}
              />
            </div>
          </div>
        ))}
      </div>

      <BookConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
      />
    </>
  );
}
