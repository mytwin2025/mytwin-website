import React from 'react';
import { Media } from '../../utils/media';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientArcAnim from '../../components/GradientArcAnim';
import DetailsCard from '../../components/landing/DetailsCard';
import { useMediaQuery } from '../../hooks/useMediaQuery';
export default function DetailSection({ frameRef }) {
  const sectionRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const testMonialRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const cardData = [
    {
      index: '01',
      title: `Weight Loss & Healthy \nLiving.`,
      paragraph: `Achieve Sustainable Fat loss with \nPersonalized Programs that Protect muscle & \nSupport Long Term Weight management.`,
      variant: 'horizontal',
      buttonColor: '#E31F5D',
      image: Media.detailSection.womenBg,
      icon: Media.weightScaleIcon,
      bgColor: '#FCF6F8',
      redirectSlug: '/obesity-weight-management',
    },
    {
      index: '02',
      title: `Blood Pressure \nManagement`,
      paragraph: `Manage blood Pressure \nnaturally and Support \nlong-term heart health \nwithout medications.`,
      variant: 'vertical',
      buttonColor: '#166A74',
      image: Media.detailSection.bpMachineBg,
      icon: Media.heartRate2Icon,
      bgColor: '#F0F5F7',
      redirectSlug: '/muscle-gain-strength',
    },
    {
      index: '03',
      title: `Type-2 Diabetes &\nPre-Diabetes Care`,
      paragraph: `Regulate blood sugar levels \nand reduce or eliminate \nmedications, including insulin, \nthrough our diabetes Reversal Programm`,
      variant: 'vertical',
      buttonColor: '#36107D',
      image: Media.detailSection.skinSenseBg,
      icon: Media.dropIcon,
      bgColor: '#E5E7F3',
      redirectSlug: '/diabetes-metabolic-health',
    },
    {
      index: '04',
      title: `Liver Health (Fatty \nLiver)`,
      paragraph: `Reverse fatty liver and improve liver \nFunction with Clinically Proven Lifestyle \n& nutrition Strategies`,
      variant: 'horizontal',
      buttonColor: '#E13D0A',
      image: Media.detailSection.liverBg,
      icon: Media.liverIcon,
      bgColor: '#FEF9F5',
      redirectSlug: '/fatty-liver',
    },
    {
      index: '05',
      title: `Gain Muscle & Strength`,
      paragraph: `Build lean Muscle , improve strength and\nfight muscle loss with strength training `,
      variant: 'horizontal',
      buttonColor: '#166A74',
      image: Media.detailSection.gainMuscle,
      icon: Media.heartRate2Icon,
      bgColor: '#F5F9F8',
      redirectSlug: '/high-cholesterol',
    },
    {
      index: '06',
      title: `PCOS & Hormonal \nDisbalance`,
      paragraph: `Address PCOS , thyroid Concerns \nand other hormonal Disbalances for \nbetter Over all well being .`,
      variant: 'horizontal',
      buttonColor: '#E31F5D',
      image: Media.detailSection.womenBgTwo,
      icon: Media.womenIcon,
      bgColor: '#FCF6F8',
      redirectSlug: '/pcos-pcod-care',
    },

  ];

  // useGSAP(() => {
  //   let mm = gsap.matchMedia();
  //   mm.add('(min-width: 768px)', () => {
  //     const section = sectionRef.current;
  //     const frame = document.querySelector('#framework');
  //     const overlay = overlayRef.current;
  //     const details = document.querySelector('#details');
  //     const content = contentRef.current;
  //     const card = cardRef.current;
  //     const testMonial = testMonialRef.current;
  //     if (!section || !frame || !content || !card) return;
  //     const textContainer = content.querySelector('#text-container');
  //     const imageContainer = content.querySelector('#image-container');
  //     ScrollTrigger.create({
  //       trigger: section,
  //       start: 'top 80%',
  //       end: 'bottom 20%',
  //     });
  //     const timeline = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: 'top 80%',
  //         end: 'bottom 20%',
  //         scrub: true,
  //       },
  //     });
  //     timeline.fromTo(
  //       textContainer,
  //       {
  //         y: '0%',
  //       },
  //       {
  //         y: '60%',
  //       },
  //       0
  //     );
  //     timeline.fromTo(
  //       imageContainer,
  //       {
  //         y: '0%',
  //       },
  //       {
  //         y: '20%',
  //       },
  //       0
  //     );

  //     const finalTl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: 'center 50%',
  //         end: 'bottom top',
  //         scrub: 1,
  //       },
  //     });

  //     finalTl
  //       .fromTo(
  //         testMonial,
  //         {
  //           opacity: 1,
  //           y: '5%',
  //         },
  //         {
  //           opacity: 1,
  //           duration: 0.4,
  //           y: '0%',
  //           ease: 'power2.out',
  //         }
  //       )
  //       .to(content, {
  //         opacity: 0,
  //         duration: 0.1,
  //         ease: 'power2.out',
  //       })
  //       .to(card, {
  //         opacity: 0,
  //         duration: 0.1,
  //         ease: 'power2.out',
  //       });
  //   });

  //   return () => mm.revert();
  // }, [sectionRef, contentRef, cardRef]);

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      id="details"
      className="detail-section relative flex min-h-screen w-full flex-col items-center justify-center bg-[#345875] bg-cover bg-center bg-no-repeat"
      ref={sectionRef}
    >
      <div ref={contentRef} className="flex w-full flex-col items-center justify-center">
        <div
          id={'text-container'}
          className="flex w-full flex-col items-center justify-center gap-4 px-4 py-12"
        >
          <h2 className="text-center font-[Arima] text-[1.6rem] font-bold leading-tight text-white md:text-[45px]">
            We help you reverse these health <br />
            conditions.
          </h2>
          <span className="w-[80%] text-center text-[14px] leading-relaxed text-[#E0E0E0] md:text-[16px]">
            Struggling with weight gain, low energy, mobility issues and chronic conditions ? Let's
            fix it together
          </span>
        </div>
        <div
          id={'image-container'}
          className="relative flex w-full items-start justify-center items-center justify-center"
        >
          <GradientArcAnim
            scale={isMobile ? 2 : 6}
            duration={4}
            color1="#f5f5f5"
            color2="#ffffff"
            strokeWidth={1}
            style={{ backgroundColor: '', transform: 'translateY(-15%)', position: 'absolute', top: '0%' }}
          />
          <img
            src={Media.family}
            alt="Family Illustration"
            className="h-auto w-[50%] object-cover md:w-[30%]"
            // style={{ zIndex: 20 }}
          />
        </div>
      </div>
      {/* <div className="w-full h-full bg-red-300"/> */}
      <div
        ref={cardRef}
        className="relative z-10 hidden min-h-screen w-full items-center justify-end py-20 md:flex md:-mt-[12vw]"
      >
        <div className="flex min-h-full w-[100%] flex-wrap items-center justify-center p-4">
          <div className="flex w-full flex-wrap items-start justify-center">
            <div className="flex flex-col items-center justify-center">
              <DetailsCard
                index={cardData[0].index}
                title={cardData[0].title}
                paragraph={cardData[0].paragraph}
                variant={cardData[0].variant}
                buttonColor={cardData[0].buttonColor}
                image={cardData[0].image}
                icon={cardData[0].icon}
                bgColor={cardData[0].bgColor}
                redirectSlug={cardData[0].redirectSlug}
              />
              <DetailsCard
                index={cardData[3].index}
                title={cardData[3].title}
                paragraph={cardData[3].paragraph}
                variant={cardData[3].variant}
                buttonColor={cardData[3].buttonColor}
                image={cardData[3].image}
                icon={cardData[3].icon}
                bgColor={cardData[3].bgColor}
                redirectSlug={cardData[3].redirectSlug}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center">
              <DetailsCard
                index={cardData[1].index}
                title={cardData[1].title}
                paragraph={cardData[1].paragraph}
                variant={cardData[1].variant}
                buttonColor={cardData[1].buttonColor}
                image={cardData[1].image}
                icon={cardData[1].icon}
                bgColor={cardData[1].bgColor}
                redirectSlug={cardData[1].redirectSlug}
              />
              <DetailsCard
                index={cardData[2].index}
                title={cardData[2].title}
                paragraph={cardData[2].paragraph}
                variant={cardData[2].variant}
                buttonColor={cardData[2].buttonColor}
                image={cardData[2].image}
                icon={cardData[2].icon}
                bgColor={cardData[2].bgColor}
                redirectSlug={cardData[2].redirectSlug}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap items-start justify-center">
            <DetailsCard
              index={cardData[4].index}
              title={cardData[4].title}
              paragraph={cardData[4].paragraph}
              variant={cardData[4].variant}
              buttonColor={cardData[4].buttonColor}
              image={cardData[4].image}
              icon={cardData[4].icon}
              bgColor={cardData[4].bgColor}
              redirectSlug={cardData[4].redirectSlug}
            />
            <DetailsCard
              index={cardData[5].index}
              title={cardData[5].title}
              paragraph={cardData[5].paragraph}
              variant={cardData[5].variant}
              buttonColor={cardData[5].buttonColor}
              image={cardData[5].image}
              icon={cardData[5].icon}
              bgColor={cardData[5].bgColor}
              redirectSlug={cardData[5].redirectSlug}
            />
          </div>
        </div>
      </div>

      {/* <div ref={overlayRef} className="absolute w-full h-full top-0 bottom-0 left-0 right-0 m-auto bg-[#F0EFED] z-2 opacity-0"/> */}

      {/* <div
        ref={testMonialRef}
        className="z-4 pointer-events-none absolute bottom-0 left-0 right-0 m-auto flex h-screen w-full flex-col items-center justify-end gap-0 opacity-0"
      >
        <div className="w-full">
          <h2 className="mt-4 w-full text-center font-[Arima] text-4xl font-bold leading-tight text-white">
            Real People. Real Results.
          </h2>
          <div className="flex w-full items-center justify-center gap-4 py-12">
            <img
              src={Media.testimonials.testmonone}
              alt="Testimonial 1"
              className="h-auto w-[25%] object-cover"
            />
            <img
              src={Media.testimonials.testmontwo}
              alt="Testimonial 2"
              className="h-auto w-[25%] object-cover"
            />
            <img
              src={Media.testimonials.testmonthree}
              alt="Testimonial 3"
              className="h-auto w-[25%] object-cover"
            />
          </div>
        </div>
      </div> */}

      <div
        ref={cardRef}
        className="relative z-10 flex w-full -mt-[25vw] flex-col items-center justify-center md:hidden"
      >
        <div className="flex-items-center flex w-[100%] flex-col items-center justify-center px-8">
          <DetailsCard
            index={cardData[0].index}
            title={cardData[0].title}
            paragraph={cardData[0].paragraph}
            variant={cardData[0].variant}
            buttonColor={cardData[0].buttonColor}
            image={cardData[0].image}
            icon={cardData[0].icon}
            bgColor={cardData[0].bgColor}
            // imageClassName="h-[90%] md:h-full"
            textClassName="text-[10px] md:text-[16px] w-[60%] md:w-full md:whitespace-pre-line leading-tight md:leading-relaxed"
            imageClassName="w-1/2 md:w-auto"
            redirectSlug={cardData[0].redirectSlug}
          />
          <DetailsCard
            index={cardData[3].index}
            title={cardData[3].title}
            paragraph={cardData[3].paragraph}
            variant={cardData[3].variant}
            buttonColor={cardData[3].buttonColor}
            image={cardData[3].image}
            icon={cardData[3].icon}
            bgColor={cardData[3].bgColor}
            // imageClassName="h-[90%] md:h-full"
            textClassName="text-[10px] md:text-[16px] w-[60%] md:w-full md:whitespace-pre-line leading-tight md:leading-relaxed"
            imageClassName="w-[50%] md:w-auto"
            redirectSlug={cardData[3].redirectSlug}
          />
          {/* </div> */}
          <div className="flex w-full flex-col items-center justify-center">
            <DetailsCard
              index={cardData[1].index}
              title={cardData[1].title}
              paragraph={cardData[1].paragraph}
              variant={cardData[1].variant}
              buttonColor={cardData[1].buttonColor}
              image={cardData[1].image}
              icon={cardData[1].icon}
              bgColor={cardData[1].bgColor}
              style={{ height: '75vh', marginLeft: '0px' }}
              textClassName="text-[10px] md:text-[16px] w-[100%] md:whitespace-pre-line leading-tight md:leading-relaxed"
              imageClassName="w-[60%] md:w-auto"
              redirectSlug={cardData[1].redirectSlug}
            />
            <DetailsCard
              index={cardData[2].index}
              title={cardData[2].title}
              paragraph={cardData[2].paragraph}
              variant={cardData[2].variant}
              buttonColor={cardData[2].buttonColor}
              image={cardData[2].image}
              icon={cardData[2].icon}
              bgColor={cardData[2].bgColor}
              style={{ height: '75vh', marginRight: '0px' }}
              textClassName="text-[10px] md:text-[16px] w-[100%] md:w-full whitespace-pre-wrap leading-tight md:leading-relaxed"
              imageClassName="w-[60%] md:w-auto"
              redirectSlug={cardData[2].redirectSlug}
            />
          </div>
          <DetailsCard
            index={cardData[4].index}
            title={cardData[4].title}
            paragraph={cardData[4].paragraph}
            variant={cardData[4].variant}
            buttonColor={cardData[4].buttonColor}
            image={cardData[4].image}
            icon={cardData[4].icon}
            bgColor={cardData[4].bgColor}
            // imageClassName="h-[90%] md:h-full"
            // textClassName="text-[12px] md:text-[16px] text-blue-300"
            textClassName="text-[10px] md:text-[16px] w-[60%] md:w-full md:whitespace-pre-line leading-tight md:leading-relaxed"
            imageClassName="w-[100%] md:w-auto"
            redirectSlug={cardData[4].redirectSlug}
          />
          <DetailsCard
            index={cardData[5].index}
            title={cardData[5].title}
            paragraph={cardData[5].paragraph}
            variant={cardData[5].variant}
            buttonColor={cardData[5].buttonColor}
            image={cardData[5].image}
            icon={cardData[5].icon}
            bgColor={cardData[5].bgColor}
            // imageClassName="h-[90%] md:h-full"
            // textClassName="text-[12px] md:text-[16px] text-blue-300"
            textClassName="text-[10px] md:text-[16px] w-[60%] md:w-full md:whitespace-pre-line leading-tight md:leading-relaxed"
            imageClassName="w-[60%] md:w-auto"
            redirectSlug={cardData[5].redirectSlug}
          />
        </div>
      </div>
      {/* <div className="z-4 pointer-events-none flex w-full translate-y-[-15%] flex-col items-center justify-end md:hidden">
        <div className="w-full">
          <h2 className="mt-4 w-full text-center font-[Arima] text-4xl font-bold leading-tight text-white">
            Real People. Real Results.
          </h2>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-12">
            <img
              src={Media.testimonials.testmonone}
              alt="Testimonial 1"
              className="h-auto w-[90%] object-cover"
            />
            <img
              src={Media.testimonials.testmontwo}
              alt="Testimonial 2"
              className="h-auto w-[90%] object-cover"
            />
            <img
              src={Media.testimonials.testmonthree}
              alt="Testimonial 3"
              className="h-auto w-[90%] object-cover"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
