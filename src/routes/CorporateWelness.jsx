import React from 'react';
import { Media } from '../utils/media';
import {
  LucideCheckCircle as CheckIcon,
  Smile as SmileIcon,
  User,
  Star,
  Quote,
  ArrowRight,
} from 'lucide-react';
import Footer from '../components/Footer';
import { useContactForm } from '../context/ContactFormContext';
import CorporateWelnessForm from '../components/CorporateWelnesForm';
import { REVIEWS_KISHOR, REVIEWS_RASHMI } from './CoachDetails';
export default function CorporateWelness() {
  const [showModal, setShowModal] = React.useState(false);
  const images = [
    Media.corporateWellness.img1,
    Media.corporateWellness.img2,
    Media.corporateWellness.img3,
  ];
  const packageSubCards = [
    {
      title: `Personalised Health \nGuidance`,
      image: Media.corporateWellness.shield,
      description: `Get expert-led support for \nfitness, nutrition, lifestyle habits, \nand long-term health goals  \ntailored to your body.`,
    },
    {
      title: `Real-Time Tracking & \nInsights`,
      image: Media.corporateWellness.user,
      description: `Monitor food, activity, sleep, \nglucose, vitals, and health \npatterns with continuous  \ndata-driven guidance.`,
    },
    {
      title: `Sustainable Habit \nBuilding`,
      image: Media.corporateWellness.lotusCircle,
      description: `Build healthier routines through \nconsistent tracking, smarter \ninterventions, and  personalised \nlifestyle support.`,
    },
  ];
  const textContent = [
    {
      title: `Why Choose My Twin \n Corporate Wellness?`,
      description: `Smarter employee wellness programs built to improve \nhealth, productivity, and  long-term wellbeing.`,
      showIcon: false,
    },
    {
      title: 'Personalised Health Support',
      description: `Employees get access to fitness, nutrition, lifestyle, and preventive \nhealth guidance tailored  to their individual needs.`,
      showIcon: true,
    },
    {
      title: 'Real-Time Health Tracking',
      description: `Our platform integrates with wearable devices and health apps to provide \nreal-time insights into employee health metrics.`,
      showIcon: true,
    },
    {
      title: `Preventive Health Approach`,
      description: `Identify risks early with diagnostics, biomarker insights, and proactive \nlifestyle  interventions.`,
      showIcon: true,
    },
    {
      title: `Sustainable Employee Wellbeing`,
      description: `Build healthier workplace habits that improve energy, engagement, \nand overall  performance over time`,
      showIcon: true,
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center overflow-x-hidden bg-[#f0efed]">
      <div className="relative flex h-screen w-full flex-col items-start justify-center">
        <video
          ref={(el) => {
            if (el) el.muted = true;
          }}
          src={Media.corporateWellnessVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center px-4 py-16 text-center md:mt-10 md:px-6">
            <div className="mb-4 w-full rounded px-3 py-1 sm:max-w-4xl">
              <h1 className="text-center font-[Arima] text-3xl font-bold leading-snug text-white sm:text-4xl md:text-5xl md:leading-tight">
                Healthier Teams. <br />
                Better Performance.
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-center font-[Inter] text-sm font-light leading-relaxed text-white sm:text-base">
                Help your employees improve energy, manage stress, and build healthier habits with
                personalised wellness programs designed for today’s workplace.
              </p>
              <button
                className="mt-5 rounded-full bg-[#fff] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#f0f0f0]"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Let's Collaborate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content w-full flex-col items-start justify-start gap-6 px-4 sm:px-6 lg:px-0">
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between gap-10 py-10 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col items-start gap-5 sm:gap-7 lg:w-[40%]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`corporate wellness ${index + 1}`}
                className="w-full rounded-[28px] shadow-lg sm:rounded-[36px] lg:rounded-[45px]"
              />
            ))}
          </div>
          <div className="flex flex-1 flex-col items-start justify-center">
            {textContent.map((item, index) => {
              const processedTitle = item.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < item.title.split('\n').length - 1 ? <br /> : null}
                </React.Fragment>
              ));
              const description = item.description
                ? item.description.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < item.description.split('\n').length - 1 ? <br /> : null}
                    </React.Fragment>
                  ))
                : null;

              return (
                <div
                  key={index}
                  style={{
                    marginBottom: index === 0 ? '1rem' : '0',
                  }}
                  className="flex flex-col items-start justify-start"
                >
                  <div className="flex items-start gap-2 sm:items-center">
                    {item.showIcon && <CheckIcon size={18} color="#423939" />}
                    <h2
                      style={{
                        fontSize: index === 0 ? '38px' : '18px',
                        lineHeight: index === 0 ? '1.2' : '1.25',
                        marginBottom: index === 0 ? '0.5rem' : '0',
                      }}
                      className="font-[Inter] font-bold text-black"
                    >
                      {processedTitle}
                    </h2>
                  </div>
                  <p
                    style={{
                      fontSize: index === 0 ? '18px' : '16px',
                      marginBottom: index === 0 ? '0' : '1rem',
                    }}
                    className="max-w-2xl text-[#454545]"
                  >
                    {description}
                  </p>
                </div>
              );
            })}
            <button
              className="rounded-lg bg-[#ff6a00] px-6 py-3 text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-[#333333]"
              onClick={() => setShowModal(true)}
            >
              Free Trial Today
            </button>
          </div>
        </div>
      </div>

      <div className="program-includes relative flex w-full items-start justify-center gap-6 px-4 py-6 sm:px-6 lg:px-0">
        <img
          src={Media.corporateWellness.includedBg}
          alt="program includes background"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="z-4 relative mx-auto flex w-full max-w-5xl flex-col items-start justify-start gap-6 py-4">
          <div className="py-4">
            <h2 className="font-[Arima] text-3xl font-bold text-white sm:text-4xl">
              What's included in your <br className="hidden sm:block" /> membership
            </h2>
            <p className="mt-4 max-w-2xl font-[Inter] text-sm text-white/90 sm:text-base">
              Your health data, expert guidance, and progress tracking - all connected in one
              intelligent health ecosystem.
            </p>
            <button
              className="mt-6 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300"
              onClick={() => setShowModal(true)}
            >
              Explore Membership
            </button>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:flex md:justify-end lg:gap-6">
            {packageSubCards.map((card, index) => (
              <PackageSubCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>

      <div className="our-tests min-screen relative mx-auto flex w-full max-w-5xl flex-col items-start justify-start gap-2 px-4 py-6 pb-16 sm:px-6 lg:px-0">
        <div className="flex h-auto w-full items-center justify-center">
          <div className="mb-4 flex items-center justify-center rounded-full bg-[#25323c] px-6 py-2">
            <SmileIcon size={18} color="#fff" />
            <span className="ml-2 text-sm font-medium text-white">Our Testimonials</span>
          </div>
        </div>

        <h2 className="w-full text-center font-[inter] text-3xl font-bold text-[#25323c] sm:text-4xl">
          User Reviews and Feedback
        </h2>
        <p className="w-full text-center text-sm text-[#454545dd] sm:text-base">
          See how Capable has transformed users' social experiences through their own words.
        </p>
        <div className="relative mt-10 w-full overflow-hidden py-4">
          <style>
            {`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .animate-scroll-reverse {
                animation: scroll 30s linear infinite reverse;
              }
            `}
          </style>
          <div className="group relative flex w-full flex-col gap-4 sm:gap-6">
            <div className="animate-scroll flex w-max hover:[animation-play-state:paused]">
              {[...REVIEWS_KISHOR, ...REVIEWS_KISHOR].map((review, idx) => (
                <div key={`r1-${idx}`} className="mx-2 sm:mx-3">
                  <div className="relative flex h-full min-w-[220px] max-w-[260px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:min-w-[320px] sm:max-w-[350px] sm:p-6">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    ></div>
                    <div className="relative z-10 mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 sm:h-12 sm:w-12">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
                            {review.name}
                          </h4>
                          <div className="mt-1 flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className="fill-yellow-400 text-yellow-400 sm:h-[14px] sm:w-[14px]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <img
                        src={Media.icons.quote}
                        alt="quote"
                        className="h-3 w-3 shrink-0 sm:h-4 sm:w-4"
                      />
                    </div>
                    <hr className="relative z-10 mb-3 border-gray-100 sm:mb-4" />
                    <p className="relative z-10 line-clamp-4 text-xs leading-relaxed text-gray-600 sm:line-clamp-none sm:text-sm">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-scroll-reverse flex w-max hover:[animation-play-state:paused]">
              {[...REVIEWS_RASHMI, ...REVIEWS_RASHMI].map((review, idx) => (
                <div key={`r2-${idx}`} className="mx-2 sm:mx-3">
                  <div className="relative flex h-full min-w-[220px] max-w-[260px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:min-w-[320px] sm:max-w-[350px] sm:p-6">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    ></div>
                    <div className="relative z-10 mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 sm:h-12 sm:w-12">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
                            {review.name}
                          </h4>
                          <div className="mt-1 flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className="fill-yellow-400 text-yellow-400 sm:h-[14px] sm:w-[14px]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <img
                        src={Media.icons.quote}
                        alt="quote"
                        className="h-3 w-3 shrink-0 sm:h-4 sm:w-4"
                      />
                    </div>
                    <hr className="relative z-10 mb-3 border-gray-100 sm:mb-4" />
                    <p className="relative z-10 line-clamp-4 text-xs leading-relaxed text-gray-600 sm:line-clamp-none sm:text-sm">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center gap-6 bg-white bg-cover bg-center bg-no-repeat px-6 py-12 md:flex-row md:gap-0 md:gap-6 md:px-24 md:py-8">
        <span className="font-[Inter] text-[18px] font-semibold leading-[24px] text-[#2F387F]">
          Still have a question?
        </span>
        <button
          className="flex flex-row items-center justify-between gap-4 rounded-full bg-[#f3f3f4] p-2 px-4 transition-transform hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          <div className="relative hidden h-10 w-[136px] md:flex">
            {[
              'https://randomuser.me/api/portraits/men/32.jpg',
              'https://randomuser.me/api/portraits/women/44.jpg',
              'https://randomuser.me/api/portraits/men/46.jpg',
              'https://randomuser.me/api/portraits/women/68.jpg',
              'https://randomuser.me/api/portraits/men/85.jpg',
            ].map((src, idx) => (
              <img
                key={idx}
                src={src}
                className="absolute top-0 h-10 w-10 rounded-full border-2 border-[#f3f3f4] object-cover"
                style={{
                  transform: `translateX(${idx * 24}px)`,
                  zIndex: 10 + idx,
                }}
                alt="user"
              />
            ))}
          </div>
          <span className="font-semibold text-gray-800">Talk To Our Team</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ArrowRight size={20} color="#000" />
          </div>
        </button>
      </div>
      <CorporateWelnessForm showModal={showModal} handleCloseModal={() => setShowModal(false)} />
      <Footer />
    </div>
  );
}

const PackageSubCard = ({ title, image, description }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-3 rounded-lg bg-white p-4 text-center shadow-sm md:w-[210px]">
      <img src={image} alt={title} className="h-14 w-14 sm:h-16 sm:w-16" />
      <h3 className="font-[Inter] text-base font-bold text-black sm:text-[17px]">{title}</h3>
      <p className="text-xs text-[#454545aa] sm:text-sm">{description}</p>
    </div>
  );
};
