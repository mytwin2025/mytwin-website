import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Media } from '../utils/media';

const TESTIMONIALS_DATA = [
  {
    name: 'Amit K.',
    age: 32,
    gender: 'M',
    category: ['Back Pain'],
    image: Media.testimonials.amit,
    metrics: [
      {
        metricLabel: 'Back Pain',
        metricBefore: 'Severe',
        metricAfter: 'Improved',
      },
    ],
    metricLabel: '',
    metricBefore: 'Severe',
    metricAfter: 'Improved',
    subtext:
      'MyTwin helped me build healthier daily habits. Over time, my back pain improved, my mobility increased, I feel more energetic, and I experience less stress. I now feel more active and confident.',
  },
  {
    name: 'Sampat R.',
    age: 53,
    gender: 'M',
    category: ['Diabetes', 'Dyslipidemia', 'Weight Management'],
    image: Media.testimonials.sampat,
    metrics: [
      {
        metricLabel: 'HbA1c',
        metricBefore: '6.8%',
        metricAfter: '6%',
      },
    ],
    metricLabel: 'HbA1c',
    metricBefore: '6.8%',
    metricAfter: '6%',
    subtext:
      'My weight reduced from 85kg to 78kg, my cholesterol levels improved, my digestion and sleep quality improved and I gained better muscle strength.',
  },
  {
    name: 'Seema C',
    age: 34,
    gender: 'F',
    category: ['Weight Management'],
    image: Media.testimonials.seema,
    metrics: [
      {
        metricLabel: 'Weight Loss',
        metricBefore: '59 kg',
        metricAfter: '53 kg',
      },
    ],
    metricLabel: 'Weight Loss',
    metricBefore: '59 kg',
    metricAfter: '53 kg',
    subtext:
      'My weight reduced from 59 kg to 53 kg. I feel more energetic, my stress levels have reduced, and my sleep quality has improved.MyTwin helped me build healthier daily habits.',
  },
  {
    name: 'Rushikesh M.',
    age: 38,
    gender: 'M',
    category: ['Diabetes', 'Dyslipidemia', 'Weight Management'],
    image: Media.testimonials.rushikesh,
    metrics: [
      {
        metricLabel: 'Fasting Blood Sugar',
        metricBefore: '254 mg/dL',
        metricAfter: 'Ongoing',
      },
      {
        metricLabel: 'Total Cholesterol',
        metricBefore: '339 mg/dL',
        metricAfter: 'Ongoing mg/dL',
      },
    ],
    metricLabel: 'Fasting Blood Sugar',
    metricBefore: '254 mg/dL',
    metricAfter: 'Ongoing',
    subtext:
      'My weight reduced from 79 kg to 73 kg, my energy levels and overall strength have improved, and my fasting blood sugar has been improving over the last three weeks. I feel more motivated and confident in managing my health.',
  },
  {
    name: 'Nayana C.',
    age: 31,
    gender: 'F',
    category: ['Hypothyroidism'],
    image: Media.testimonials.nayana,
    metrics: [
      {
        metricLabel: 'TSH',
        metricBefore: '10.86 µIU/mL',
        metricAfter: '3.90 µIU/mL',
      },
    ],
    metricLabel: 'TSH',
    metricBefore: '10.86 µIU/mL',
    metricAfter: '3.90 µIU/mL',
    subtext:
      'MyTwin helped me build healthier daily habits. Over time, my thyroid health has shown positive progress, and I feel more active, energetic, and confident in managing my health.',
  },
  {
    name: 'Manasi M.',
    age: 33,
    gender: 'F',
    category: ['Weight Management', 'Hypothyroidism'],
    image: Media.testimonials.manasi,
    metrics: [
      {
        metricLabel: 'Weight ',
        metricBefore: '88 kg',
        metricAfter: '83 kg',
      },
      {
        metricLabel: 'TSH',
        metricBefore: '8.47 µIU/mL',
        metricAfter: '5.68 µIU/mL',
      },
    ],
    metricLabel: 'TSH',
    metricBefore: '10.86 µIU/mL',
    metricAfter: '3.90 µIU/mL',
    subtext:
      'MyTwin helped me build a healthier daily routine. My weight reduced from 88 kg to 83 kg, my energy levels and overall strength have improved. My thyroid health has also shown positive progress and I feel more active and confident in managing my health.',
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Update visible cards based on responsive width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = TESTIMONIALS_DATA.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2500); // Transitions every 1.5 seconds
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isPaused, visibleCards]);

  return (
    <section className="w-full overflow-hidden px-6 py-16 md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading and Subheading */}
          <div className="flex flex-col items-start text-left lg:col-span-4">
            <span className="mb-3 font-[Inter] text-xs font-semibold uppercase tracking-widest text-orange-500 md:text-sm">
              They Changed Their Stories In A Few Short Months
            </span>
            <h2 className="mb-6 font-[Arima] text-4xl font-bold leading-tight text-[#1e293b] md:text-5xl lg:text-[54px]">
              Meet Our <br />
              <span className="relative mt-2 inline-block font-serif italic text-orange-500">
                Champions
                {/* Elegant curved underline SVG matching image */}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-orange-500"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C40 2 120 2 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Right Column: Carousel */}
          <div className="flex w-full flex-col gap-8 lg:col-span-8">
            <div
              className="w-full overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out md:gap-6"
                style={{
                  transform:
                    visibleCards === 1
                      ? `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`
                      : `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 16}px))`,
                }}
              >
                {TESTIMONIALS_DATA.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-shrink-0 flex-col justify-start rounded-3xl border border-slate-700/50 bg-[#1e293b] p-6 shadow-lg md:w-[calc(50%-12px)]"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="mb-4 flex flex-col items-start gap-2">
                        <h3 className="font-[Inter] text-base font-bold tracking-wide text-white">
                          {item.name}{' '}
                          <span className="font-normal text-white/60">
                            • {item.age} • {item.gender}
                          </span>
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {item.category?.map((cat, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 font-[Inter] text-[10px] font-semibold tracking-wide text-white/90"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Image/Video Overlay Container */}
                      <div className="group relative mb-4 aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-slate-900/60">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

                        {/* Play button indicator in bottom right */}
                        {/* <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-black/80">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-slate-900">
                            <Play size={8} fill="currentColor" className="translate-x-[0.5px]" />
                          </span>
                          Play
                        </div> */}
                      </div>

                      {/* Metrics comparison (Infinite Marquee) */}
                      <div className="relative mb-4 flex w-full overflow-hidden">
                        <div className="animate-marquee flex w-max gap-3 pb-1">
                          {/* Original Items */}
                          {item.metrics?.map((metric, idx) => (
                            <div
                              key={idx}
                              className="flex shrink-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                            >
                              <span className="font-[Inter] text-[10px] font-bold tracking-wider text-white/60 sm:text-xs">
                                {metric.metricLabel}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="rounded bg-[#c2410c] px-2 py-0.5 font-[Inter] text-[10px] font-bold text-orange-100">
                                  {metric.metricBefore}
                                </span>
                                <span className="text-[10px] font-bold text-white/40">→</span>
                                <span className="flex items-center gap-1 rounded bg-[#059669] px-2 py-0.5 font-[Inter] text-[10px] font-bold text-emerald-50">
                                  {metric.metricAfter}
                                  <ChevronDown size={10} className="opacity-80" />
                                </span>
                              </div>
                            </div>
                          ))}
                          {/* Duplicated Items for Seamless Loop */}
                          {item.metrics?.map((metric, idx) => (
                            <div
                              key={`dup-${idx}`}
                              className="flex shrink-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                            >
                              <span className="font-[Inter] text-[10px] font-bold tracking-wider text-white/60 sm:text-xs">
                                {metric.metricLabel}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="rounded bg-[#c2410c] px-2 py-0.5 font-[Inter] text-[10px] font-bold text-orange-100">
                                  {metric.metricBefore}
                                </span>
                                <span className="text-[10px] font-bold text-white/40">→</span>
                                <span className="flex items-center gap-1 rounded bg-[#059669] px-2 py-0.5 font-[Inter] text-[10px] font-bold text-emerald-50">
                                  {metric.metricAfter}
                                  <ChevronDown size={10} className="opacity-80" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Result details text */}
                    <p className="font-[Inter] text-[11px] font-medium leading-relaxed text-white/80 sm:text-xs">
                      {item.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="mt-4 flex items-center justify-center gap-6">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalCards - visibleCards + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-6 bg-[#3b82f6]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
