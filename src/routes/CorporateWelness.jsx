import React from 'react';
import { Media } from '../utils/media';
import { LucideCheckCircle as CheckIcon, Smile as SmileIcon } from 'lucide-react';
import Footer from '../components/Footer';
export default function CorporateWelness() {
  const [talkToModal, setTalkToModal] = React.useState(false);
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
          src={Media.corporateWellnessVideo}
          autoPlay
          loop
          muted
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
                  setTalkToModal(true);
                }}
              >
                Talk To Our Team
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
              onClick={() => alert('Contact us for more information')}
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
              onClick={() => alert('Contact us for more information')}
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
        <img
          src={Media.corporateWellness.userReviewImage}
          alt="user reviews"
          className="mt-10 h-auto w-full rounded-2xl object-cover shadow-sm"
        />
      </div>
      <Footer />

      {talkToModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-20"
          onClick={() => setTalkToModal(false)}
        >
          <div
            className="w-[calc(100%-2rem)] max-w-md rounded-lg bg-white p-5 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 font-[Arima] text-xl font-bold text-orange-500">Contact Us</h2>
            <form className="flex flex-col gap-4">
              <input
                required
                type="text"
                placeholder="Name"
                className="rounded border border-gray-300 bg-white px-3 py-2 font-[Inter] text-[14px] text-black"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="rounded border border-gray-300 bg-white px-3 py-2 font-[Inter] text-[14px] text-black"
              />
              <input
                required
                type="text"
                placeholder="Company Name"
                className="rounded border border-gray-300 bg-white px-3 py-2 font-[Inter] text-[14px] text-black"
              />
              <textarea
                required
                placeholder="Message"
                className="resize-none rounded border border-gray-300 bg-white px-3 py-2 font-[Inter] text-[14px] text-black"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="rounded bg-[#ff6a00] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#333333]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
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
