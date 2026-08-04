import React from 'react';
import Avatar from '../../components/Avatar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Media } from '../../utils/media';
import { useMediaQuery } from '../../hooks/useMediaQuery';
export const people = [
    {
      name: 'Kishor Chavan',
      designation: 'Founder & CEO',
      image: Media.team.kishor,
    },
    {
      name: 'Ayush Yadav',
      designation: 'Full Stack Developer',
      image: Media.team.ayush,
    },
    {
      name: 'Rashmi J',
      designation: 'Clinical Dietitian',
      image: Media.team.rashmi,
    },
    {
      name: 'Dr. Raj Kamal, MBBS',
      designation: 'Metabolic Experts, Family Care Doctor',
      image: Media.team.rajkamal,
    },
    {
      name: 'Amit Kumar',
      designation: 'Tech Advisor (IIT‑B Alumni)',
      image: Media.team.amitT,
    },
    {
      name: 'Dr. Suneel Movva, MS, MD',
      designation: 'Health Tech Advisor\n(The University of Texas)',
      image: Media.team.suneel,
      
    }
  ];
  
export default function PeopleBehindSection() {
  const content = React.useRef(null);
  const avatar = React.useRef(null);
  const heading = React.useRef(null);
  

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: content.current,
  //       start: 'top 100%',
  //       end: 'bottom 20%',
  //       scrub: true,
  //       toggleActions: 'play none none reverse',
  //     },
  //   });

  //   // gsap.set(avatar.current, { y: '20%' });
  //   tl.to(heading.current, {
  //     y: '200%',
  //     duration: 1,
  //     ease: 'power2.out',
  //   }).to(
  //     avatar.current,
  //     {
  //       y: '60%',
  //       // duration: 1,
  //       ease: 'power2.out',
  //     },
  //     '<'
  //   );
  // }, []);

  const isMobile = useMediaQuery('(max-width: 767px)');
  console.log('isMobile', isMobile);
  return (
    <>
      <div className="relative hidden w-full items-start justify-center bg-[#F0EFED] pt-12 md:block md:min-h-screen" >
        <div ref={content} className="relative z-10 w-full md:h-full">
          <h2 ref={heading} className="text-center font-[Arima] text-4xl font-bold text-gray-800 pt-8">
            The Minds Behind The Mission
          </h2>
          {/* <div
            ref={avatar}
            className="mt-10 flex w-full flex-wrap items-center justify-center gap-8"
          > */}
          <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 items-start justify-center gap-10 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {people.map((person, index) => (
              <div
                key={person.name}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full max-w-[220px] aspect-square overflow-hidden rounded-2xl shadow-sm bg-[#F0EFED]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-5 text-lg font-bold text-gray-900">{person.name}</div>
                <p className="mt-1 text-sm font-medium text-gray-500 whitespace-pre-line leading-relaxed">{person.designation}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          src={Media.landing.bgGrid}
          alt="Background Grid"
          style={{ zIndex: 1 }}
          className="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full scale-[0.8] object-cover"
        />
      </div>

      <div className="relative flex w-full items-start justify-center bg-[#F0EFED] md:hidden">
        <div className="relative z-10 mb-8 mt-6 h-full w-full">
          <h2 className="mt-8 text-center font-[Arima] text-3xl font-bold text-gray-800">
            The Minds Behind The Mission
          </h2>
          <div className="mt-10 grid w-full grid-cols-2 items-start justify-center gap-6 px-4">
            {people.map((person, index) => (
              <div
                key={person.name}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square overflow-hidden rounded-xl shadow-sm bg-[#F0EFED]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mt-4 text-base font-bold text-gray-900">{person.name}</div>
                <p className="mt-1 text-xs font-medium text-gray-500 whitespace-pre-line leading-snug">{person.designation}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          src={Media.landing.bgGrid}
          alt="Background Grid"
          style={{ zIndex: 1 }}
          className="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full scale-[0.8] object-cover"
        />
      </div>
    </>
  );
}
