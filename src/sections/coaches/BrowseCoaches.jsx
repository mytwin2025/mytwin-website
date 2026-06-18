import React from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { Media } from '../../utils/media';
import { useGSAP } from '@gsap/react';
import Search from '../../components/Search';
import Filter from '../../components/Filter';
import CoachAppointmenCard from '../../components/coach/CoachAppointmenCard';
export default function BrowseCoaches() {
  const searchRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const categoryData = [
    {
      name: `Obesity & Weight\nmanagement`,
      icon: Media.icons.weighScale,
    },
    {
      name: `Diabetes & Metabolic\nhealth`,
      icon: Media.icons.bloodBagGray,
    },
    {
      name: `PCOS/PCOD Care`,
      icon: Media.icons.ovary,
    },
    {
      name: `Heart Health &\nHypertension`,
      icon: Media.icons.heart,
    },
    {
      name: `Muscle gain & Strength`,
      icon: Media.icons.muscle,
    },
    {
      name: `High Cholestrol`,
      icon: Media.icons.highCholesterol,
    },
    {
      name: `Fatty Liver`,
      icon: Media.icons.fattyLiver,
    },
  ];
  const onClickCategory = (category) => {
    console.log('Clicked category:', category);
  };

  const coachesData = [
    {
      name: 'Rajat Verma',
      image: Media.coaches.coachImage,
      rating: 4.8,
      peopleCoached: 1235,
      availableSlots: 5,
    },
    {
      name: 'Priya Sharma',
      image: Media.coaches.coachImage,
      rating: 4.6,
      peopleCoached: 980,
      availableSlots: 3,
    },
    {
      name: 'Arjun Mehta',
      image: Media.coaches.coachImage,
      rating: 4.9,
      peopleCoached: 2100,
      availableSlots: 7,
    },
    {
      name: 'Sneha Iyer',
      image: Media.coaches.coachImage,
      rating: 4.5,
      peopleCoached: 540,
      availableSlots: 2,
    },
    {
      name: 'Karan Kapoor',
      image: Media.coaches.coachImage,
      rating: 4.7,
      peopleCoached: 310,
      availableSlots: 6,
    },
    {
      name: 'Meera Nair',
      image: Media.coaches.coachImage,
      rating: 4.3,
      peopleCoached: 760,
      availableSlots: 4,
    },
    {
      name: 'Karan Kapoor',
      image: Media.coaches.coachImage,
      rating: 4.7,
      peopleCoached: 310,
      availableSlots: 6,
    },
    {
      name: 'Meera Nair',
      image: Media.coaches.coachImage,
      rating: 4.3,
      peopleCoached: 760,
      availableSlots: 4,
    },
    {
      name: 'Karan Kapoor',
      image: Media.coaches.coachImage,
      rating: 4.7,
      peopleCoached: 310,
      availableSlots: 6,
    },
    {
      name: 'Meera Nair',
      image: Media.coaches.coachImage,
      rating: 4.3,
      peopleCoached: 760,
      availableSlots: 4,
    },
  ];

  useGSAP(() => {
    if (!searchRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center',
          end: 'top 20%',
          scrub: 1,
          showMarkers: true,
        },
      });
      tl.to(searchRef.current, { y: 80, duration: 1, ease: 'power2.out', showMarkers: true }).to(
        contentRef.current,
        {
          y: 80,
          duration: 1,
          ease: 'power2.out',
          showMarkers: true,
        },
        '<'
      );
    });
    return () => ctx.revert();
  }, [searchRef, contentRef]);

  return (
    <div className="browse-coaches flex h-screen min-h-screen w-[90%] flex-col items-center justify-start overflow-hidden">
      <div
        ref={searchRef}
        className="search-section flex w-full items-center justify-center gap-4 pt-4"
      >
        <Search
          onSearch={(query) => console.log('Search query:', query)}
          style={{ height: '60px' }}
        />
        <Filter
          onFilter={() => console.log('Filter button clicked')}
          style={{ height: '60px', gap: 4 }}
        />
      </div>

      <div
        ref={contentRef}
        className="coaches-list flex min-h-0 w-full flex-1 items-start justify-start gap-6 py-8"
        // style={{ height: 'calc(100vh - 100px)', overflow: 'hidden' }}
      >
        <div
          data-lenis-prevent
          className={`category-card relative grid h-full w-[300px] shrink-0 grid-cols-1 gap-0 rounded-lg bg-white bg-cover bg-center px-2 py-6`}
          style={{ height: 'calc(100vh - 200px)' }}
        >
          {categoryData.map((category, index) => (
            <button
              key={index}
              className="flex h-[74px] w-full items-center rounded-full border-[1px] border-gray-200 bg-white text-left transition-colors duration-300 hover:bg-gray-100"
              onClick={() => onClickCategory(category.name)}
            >
              <img src={category.icon} alt={`${category.name} icon`} className="mx-6 h-5 w-5" />
              <p className="whitespace-pre-line font-[Inter] text-[14px] font-medium leading-snug text-black">
                {category.name}
              </p>
            </button>
          ))}
        </div>
        <div
          data-lenis-prevent
          className="coaches-container grid w-full auto-rows-max grid-cols-3 items-center justify-center justify-items-center gap-6 overflow-y-auto rounded-lg border-[1px] border-gray-200 bg-white p-4"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          {coachesData.map((coach, index) => (
            <CoachAppointmenCard
              key={index}
              name={coach.name}
              image={coach.image}
              rating={coach.rating}
              peopleCoached={coach.peopleCoached}
              availableSlots={coach.availableSlots}
              onClickAppoint={() => console.log('Appoint:', coach.name)}
              onClickMsg={() => console.log('Message:', coach.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
