import React, { useEffect, useState } from 'react';
import { Media } from '../../utils/media';
import Search from '../../components/Search';
import Filter from '../../components/Filter';
import CoachAppointmenCard from '../../components/coach/CoachAppointmenCard';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';

export default function BrowseCoaches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [coachesData, setCoachesData] = useState([]);

  const categoryData = [
    {
      name: `Obesity & Weight\nmanagement`,
      value: `Obesity & Weight\nmanagement`,
      icon: Media.icons.weighScale,
    },
    {
      name: `Diabetes & Metabolic\nhealth`,
      value: `Diabetes & Metabolic\nhealth`,
      icon: Media.icons.bloodBagGray,
    },
    {
      name: `Heart Health, Blood Pressure & Cholesterol Care`,
      value: `Heart Health, Blood Pressure & Cholesterol Care`,
      icon: Media.icons.heart,
    },

    {
      name: `Muscle, Strength & \nMobility Care`, 
      value: `Muscle, Strength & \nMobility Care`, 
      icon: Media.icons.muscle,
    },
    {
      name: `Fatty Liver`,
      value: `Fatty Liver`,
      icon: Media.icons.fattyLiver,
    },
    {
      name: `PCOS/PCOD Care`,
      value: `PCOS/PCOD Care`,
      icon: Media.icons.ovary,
    },
  ];

 

  const fetchPresignedUrl = async (key) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/misc/signed-url?key=${key}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCoaches = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/healthCoaches`, { params: { limit: 100 } });
      console.log(data.healthCoaches);
      const coaches = await Promise.all(
        data.healthCoaches.map(async (c) => ({
          name: c.name,
          availableSlots: Math.floor(Math.random() * 10) + 1,
          rating: c.rating || 4.1,
          peopleCoached: Math.floor(Math.random() * 1000),
          categories: categoryData[Math.floor(Math.random() * categoryData.length)].name,
          image: await fetchPresignedUrl(c.photo),
        }))
      );
      setCoachesData(coaches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoaches();
  }, []);

  const onClickCategory = (categoryName) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  // Filter & Sort Logic
  const filteredAndSortedCoaches = coachesData
    .filter((coach) => {
      const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || coach.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'slots') return b.availableSlots - a.availableSlots;
      if (sortBy === 'coached') return b.peopleCoached - a.peopleCoached;
      return 0;
    });

  return (
    <div className="browse-coaches flex min-h-screen w-full flex-col items-center justify-start px-4 pb-6 lg:h-screen lg:overflow-hidden lg:px-0 lg:pb-0">
      <div className="search-sectin relative flex w-full flex-col justify-center gap-3 pt-4 sm:flex-row sm:items-center lg:w-[90%]">
        <Search onSearch={(query) => setSearchQuery(query)} />
        <div className="relative shrink-0">
          <Filter onFilter={() => setShowFilterDropdown(!showFilterDropdown)} />
          {showFilterDropdown && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 duration-200">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Sort Coaches By
              </div>
              <button
                onClick={() => {
                  setSortBy('rating');
                  setShowFilterDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  sortBy === 'rating'
                    ? 'bg-orange-50 font-semibold text-orange-600'
                    : 'text-gray-700'
                }`}
              >
                Highest Rated
              </button>
              <button
                onClick={() => {
                  setSortBy('coached');
                  setShowFilterDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  sortBy === 'coached'
                    ? 'bg-orange-50 font-semibold text-orange-600'
                    : 'text-gray-700'
                }`}
              >
                Most Experienced
              </button>
              <button
                onClick={() => {
                  setSortBy('slots');
                  setShowFilterDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  sortBy === 'slots'
                    ? 'bg-orange-50 font-semibold text-orange-600'
                    : 'text-gray-700'
                }`}
              >
                Available Slots
              </button>
              {sortBy && (
                <>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    onClick={() => {
                      setSortBy(null);
                      setShowFilterDropdown(false);
                    }}
                    className="flex w-full items-center justify-center rounded-xl py-2 text-center text-xs font-medium text-red-500 hover:bg-red-50"
                  >
                    Reset Sorting
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="coaches-list flex min-h-0 w-full flex-1 flex-col items-start justify-start gap-4 py-6 lg:w-[90%] lg:flex-row lg:gap-6 lg:py-8">
        {/* Category section */}
        <div className="category-card custom-scrollbar relative flex w-full flex-col items-center gap-2 rounded-lg border border-gray-200 bg-[#FAFAFA] px-2 py-4 md:h-full lg:w-[250px] lg:flex-col lg:items-start lg:gap-3 lg:overflow-y-auto lg:border-0 lg:py-6">
          {categoryData.map((category, index) => {
            const isActive = selectedCategory === category.name;
            return (
              <button
                key={index}
                className={`flex w-full max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 shadow-sm ring-1 ring-orange-400'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => onClickCategory(category.name)}
              >
                <img
                  src={category.icon}
                  alt={`${category.name} icon`}
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                />
                <p
                  className={`whitespace-pre-line font-[Inter] text-[12px] font-semibold leading-snug transition-colors ${
                    isActive ? 'text-orange-950' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Coaches Grid */}
        <div className="custom-scrollbar grid h-full w-full grid-cols-1 gap-5 overflow-auto pr-2 md:grid-cols-3">
          {filteredAndSortedCoaches.length > 0 ? (
            filteredAndSortedCoaches.map((coach, index) => (
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
            ))
          ) : (
            <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
              <span className="text-3xl">🔍</span>
              <h3 className="mt-4 text-base font-bold text-gray-900">No coaches found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms, clearing category filters, or resetting sorting
                options.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSortBy(null);
                }}
                className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
