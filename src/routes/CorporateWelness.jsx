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
      title: `Why Choose My Twin \n Corporate Welness?`,
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
    <div className="flex min-h-screen w-full flex-col items-start justify-center bg-[#f0efed]">
      <div className="hero relative flex min-h-screen w-full flex-col items-start justify-center bg-[#f0efed]">
        <video
          src={Media.corporateWellnessVideo}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50" />

        <div className="relative z-10 flex h-full w-full items-start justify-center">
          <div className="relative z-20 flex h-full w-full flex-col items-start justify-start text-center">
            <div className="mb-4 w-full rounded px-3 py-1 text-sm font-semibold text-white">
              <h1 className="font-[Arima] text-6xl font-bold leading-snug text-white/90">
                Healthier Teams. <br />
                Better Performance.
              </h1>
              <p className="font-[400] text-white/70">
                Help your employees improve energy, manage stress, and build healthier habits with
                personalised <br /> wellness programs designed for today’s workplace.
              </p>
              <button
                className="mt-4 rounded-full bg-[#fff] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#f0f0f0]"
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
      <div className="content min-h-[95%] w-full flex-col items-start justify-start gap-6">
        <div className="flex h-full w-full items-start justify-center gap-0 px-16 py-4">
          <div className="flex h-full w-[50%] flex-col items-start justify-center gap-4 px-6 py-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                style={{ objectFit: 'cover' }}
                alt={`corporate wellness ${index + 1}`}
                className="mb-6 h-[22vh] w-[80%] rounded-lg shadow-lg"
              />
            ))}
          </div>
          <div className="flex h-full w-[50%] flex-col items-start justify-center px-6 py-4">
            {textContent.map((item, index) => {
              const processedTitle = item.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ));
              const description = item.description
                ? item.description.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                : null;

              return (
                <div
                  key={index}
                  style={{
                    height: index === 0 ? 'auto' : '12vh',
                    marginBottom: index === 0 ? '1rem' : '0',
                  }}
                  className="flex h-[12vh] flex-col items-start justify-start gap-2"
                >
                  <div className="flex items-center gap-2">
                    {item.showIcon && <CheckIcon size={18} color="#423939" />}
                    <h2
                      style={{
                        fontSize: index === 0 ? '48px' : '20px',
                        lineHeight: index === 0 ? '56px' : '24px',
                      }}
                      className="font-[Inter] text-[20px] font-bold text-black"
                    >
                      {processedTitle}
                    </h2>
                  </div>
                  <p
                    style={{
                      fontSize: index === 0 ? '24px' : '16px',
                      lineHeight: index === 0 ? '32px' : '24px',
                    }}
                    className="whitespace-pre-line text-[16px] text-[#454545]"
                  >
                    {description}
                  </p>
                </div>
              );
            })}
            <button
              className="rounded-lg bg-[#ff6a00] px-6 py-2 text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-[#333333]"
              onClick={() => alert('Contact us for more information')}
            >
              Free Trial Today
            </button>
          </div>
        </div>
      </div>
      <div className="program-includes relative flex h-[80vh] min-h-[80vh] w-full items-start justify-center gap-6 px-6 py-4">
        <img
          src={Media.corporateWellness.includedBg}
          alt="program includes background"
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <div className="z-4 relative flex h-full w-full flex-col items-start justify-start gap-6 px-6 py-4">
          <div className="h-[50%] w-full px-6 py-4">
            <h2 className="font-[Arima] text-6xl font-bold text-white">
              What's included in your <br /> membership
            </h2>
            <p className="mt-4 font-[Inter] text-lg text-white/90">
              Your health data, expert guidance, and progress tracking—all connected <br /> in one
              intelligent health ecosystem.
            </p>
            <button
              className="mt-6 rounded-full bg-[#ff6a00] px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-[#f0f0f0]"
              onClick={() => alert('Contact us for more information')}
            >
              Explore Membership
            </button>
          </div>
          <div className="flex h-[50%] w-full items-start justify-end gap-6 px-6 py-4">
            {packageSubCards.map((card, index) => (
              <PackageSubCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
      <div className="our-tests min-screen relative flex min-h-[90vh] w-full flex-col items-start justify-start gap-2 px-32 py-4 pb-16">
        <div className="flex h-auto w-full items-center justify-center">
          <div className="mb-4 flex h-[4vh] items-center justify-center rounded-full bg-[#25323c] px-6 py-2">
            <SmileIcon size={18} color="#fff" />
            <span className="ml-2 text-sm font-medium text-white">Our Testimonials</span>
          </div>
        </div>

        <h2 className="w-full text-center font-[inter] text-6xl text-[50px] font-bold leading-[60px] text-[#25323c]">
          User Reviews and Feedback
        </h2>
        <p className="w-full text-center text-sm text-[#454545dd]">
          See how Capable has transformed users' social experiences through <br />
          their own words.
        </p>
        <img
          src={Media.corporateWellness.userReviewImage}
          alt="user reviews"
          className="mt-16 h-auto w-full object-cover"
        />
      </div>
      <Footer />

      {talkToModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setTalkToModal(false)}
        >
          <div className="w-[400px] rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 font-[Arima] text-xl font-bold">Contact Us</h2>
            <form className="flex flex-col gap-4">
              <input
                required
                type="text"
                placeholder="Name"
                className="rounded border border-gray-300 px-3 py-2 font-[Inter] text-[14px] text-black placeholder-black"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="rounded border border-gray-300 px-3 py-2 font-[Inter] text-[14px] text-black placeholder-black"
              />
              <input
                required
                type="text"
                placeholder="Company Name"
                className="rounded border border-gray-300 px-3 py-2 font-[Inter] text-[14px] text-black placeholder-black"
              />
              <textarea
                required
                placeholder="Message"
                className="rounded border border-gray-300 px-3 py-2 font-[Inter] text-[14px] text-black placeholder-black"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="rounded bg-[#ff6a00] px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-[#333333]"
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
    <div className="flex h-full w-[210px] flex-col items-center justify-start gap-2 rounded-lg bg-white px-4 py-4 shadow">
      <img src={image} alt={title} className="h-20 w-20" />
      <h3 className="text-center font-[Inter] text-[18px] font-bold text-black">{title}</h3>
      <p className="text-center text-[12px] text-sm leading-[18px] text-[#454545aa]">
        {description}
      </p>
    </div>
  );
};
