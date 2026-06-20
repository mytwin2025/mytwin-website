import React from 'react';
import { Media } from '../../utils/media';
import Search from '../../components/Search';
import Filter from '../../components/Filter';
import CoachAppointmenCard from '../../components/coach/CoachAppointmenCard';
export default function BrowseCoaches() {
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

  return (
    <div className="browse-coaches flex min-h-screen w-full flex-col items-center justify-start px-4 pb-6 lg:h-screen lg:overflow-hidden lg:px-0 lg:pb-0">
      <div className="search-sectin flex w-full flex-col  justify-center gap-3 pt-4 sm:flex-row sm:items-center lg:w-[90%]">
        <Search
          onSearch={(query) => console.log('Search query:', query)}
        />
        <Filter
          onFilter={() => console.log('Filter button clicked')}
        />
      </div>

      <div className="coaches-list flex min-h-0 w-full flex-1 flex-col items-start justify-start gap-4 py-6 lg:w-[90%] lg:flex-row lg:gap-6 lg:py-8">
        <div className="category-card custom-scrollbar relative grid md:h-full w-full shrink-0 grid-cols-1 gap-2 overflow-auto rounded-lg border border-gray-200 bg-[#FAFAFA] px-2 py-4 lg:w-[250px] lg:gap-3 lg:overflow-y-auto lg:border-0 lg:py-6">
          {categoryData.map((category, index) => (
            <button
              key={index}
              className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 text-left transition-colors duration-300 hover:bg-gray-100"
              onClick={() => onClickCategory(category.name)}
            >
              <img src={category.icon} alt={`${category.name} icon`} className="h-5 w-5" />
              <p className="whitespace-pre-line font-[Inter] text-[12px] font-medium leading-snug text-black">
                {category.name}
              </p>
            </button>
          ))}
        </div>
        <div className="custom-scrollbar grid h-full w-full grid-cols-1 md:grid-cols-3 gap-5 overflow-auto pr-2">
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
