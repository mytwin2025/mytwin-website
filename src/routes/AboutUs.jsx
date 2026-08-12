import React from 'react';
import { Media } from '../utils/media';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { people } from '../sections/landing/PeopleBehindSection';

export default function AboutUs() {
  const steps = [
    {
      index: '1',
      heading: 'Detect Early',
      paragraph: `Identify metabolic risks before symptoms \nappear through real-time health monitoring, \nbiomarker tracking, and AI-powered insights.\nMyTwin helps you take action early to prevent \nlong-term complications and lifestyle diseases.`,
    },
    {
      index: '2',
      heading: 'Improve Daily',
      paragraph: `Build healthier habits with personalized \nguidance for nutrition, activity, sleep, stress, and \nrecovery. Small daily improvements compound \ninto better energy, metabolic health, and \nlong-term outcomes.`,
    },
    {
      index: '3',
      heading: 'Reverse Risks',
      paragraph: `Reduce and reverse metabolic health risks \nthrough clinically guided interventions and \ncontinuous progress tracking.\nMyTwin empowers you to regain control of your \nhealth before conditions become chronic.`,
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-start justify-center overflow-x-hidden bg-[#f0efed]">
      <div className="content flex h-full w-full flex-col items-center justify-start gap-6 px-4 pt-20 sm:px-6 sm:pt-24 lg:px-0 lg:pt-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 lg:flex-row lg:gap-10">
          <h2 className="font-[Arima] text-4xl font-bold text-black sm:text-[48px]">Our Mission</h2>
          <p className="font-[Inter] text-sm text-[#484c48] sm:text-base md:w-1/2">
            To help 10 million people achieve optimal health through preventive measures, early
            diagnosis, personalised intervention, continuous monitoring and doctor-led clinical
            protocols.
          </p>
        </div>
        <div className="mx-auto my-8 flex w-full max-w-5xl flex-col items-start justify-between gap-10 lg:my-12 lg:flex-row">
          <div className="div flex flex-1 flex-col items-start justify-start gap-3">
            <h2 className="mb-5 h-full font-[Arima] text-4xl font-bold leading-[1.1] text-black sm:text-[48px]">
              We are not building fitness or weight loss app.
              <br /> We are building a continuous care system <br /> for you and your parents.
            </h2>
            <p className="font-[Inter] text-sm text-[#2c2d2d] sm:text-base">
              Most people realise their health too late. We’re here to change that. With a
              combination of: Technology , Medical expertise, behaviour science and personalized
              clinical protocols based on the patient's individual health history followed by
              Root-cause care.
            </p>
            <p className="font-[Inter] text-sm text-[#2c2d2d] sm:text-base">
              MyTwin predicts health risks early, enables timely coach-led interventions, delivers
              personalized and actionable behavioral and lifestyle insights, tracks progress across
              metabolic health parameters, supports healthier aging and longevity, and empowers you
              and your parents to prevent, manage and reverse lifestyle conditions before
              complications begin.
            </p>
          </div>
          <div className="div flex w-full flex-1">
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <img
                  src={Media.aboutUs.aboutImg1}
                  className="h-auto w-full rounded-3xl object-cover"
                  alt="About MyTwin activity 1"
                />
                <img
                  src={Media.aboutUs.aboutImg2}
                  className="h-auto w-full rounded-3xl object-cover"
                  alt="About MyTwin activity 2"
                />
              </div>

              <img
                src={Media.aboutUs.aboutImg3}
                className="w-full rounded-3xl object-cover"
                alt="About MyTwin activity 3"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto my-8 flex w-full max-w-5xl flex-col items-center justify-center gap-6 lg:my-12">
          <h2 className="font-[Arima] text-3xl font-bold text-black sm:text-4xl">We Help People</h2>
          <div className="mt-5 grid h-full w-full grid-cols-1 items-start justify-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {steps.map((step) => (
              <div key={step.index} className="flex h-full w-full flex-col items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-[#010100] px-5 py-3 text-xl font-bold text-white">
                  {step.index}
                </div>
                <h3 className="font-[Arima] text-lg font-semibold text-black">{step.heading}</h3>
                <p className="text-center font-[Inter] text-sm text-[#2c2d2d]">{step.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="my-8 flex w-full max-w-5xl flex-col items-center justify-center gap-6 lg:my-12">
          <h2 className="text-center font-[Arima] text-3xl font-bold text-black sm:text-4xl">
            Real people. Real results.
          </h2>
          <div className="mt-5 grid h-full w-full grid-cols-1 items-start justify-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {tests.map((test, index) => (
              <img
                key={index}
                src={test}
                alt={`testimonial ${index + 1}`}
                className="w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div> */}
        <div className="mx-auto w-full max-w-5xl">
          <Testimonials />
        </div>
        <div className="mt-8 flex w-full max-w-6xl flex-col items-center justify-start px-4 pb-12">
          <h1 className="text-center font-[Arima] text-3xl font-bold text-gray-800 sm:text-4xl">
            The Minds Behind The Mission
          </h1>
          <div className="mt-10 grid w-full grid-cols-2 items-start justify-center gap-6 pb-20 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
            {people.map((person, index) => (
              <div key={person.name} className="flex flex-col items-center text-center">
                <div className="aspect-square w-full max-w-[220px] overflow-hidden rounded-xl bg-[#F0EFED] shadow-sm md:rounded-2xl">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 md:mt-5 md:text-lg">
                  {person.name}
                </h3>
                <p className="mt-1 whitespace-pre-line text-xs font-medium leading-snug text-gray-500 md:text-sm md:leading-relaxed">
                  {person.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
