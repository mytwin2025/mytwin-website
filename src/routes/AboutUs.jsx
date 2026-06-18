import React from 'react';
import { Media } from '../utils/media';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';
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
  const tests = [
    Media.testimonials.testmonone,
    Media.testimonials.testmontwo,
    Media.testimonials.testmonthree,
  ];
  const people = [
    {
      name: 'John Doe',
      designation: 'CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      designation: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Emily Johnson',
      designation: 'Lead Designer',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Michael Brown',
      designation: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Sarah Davis',
      designation: 'Marketing Head',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#f0efed]">
      <div className="content mt-[124px] flex h-full w-full flex-col items-center justify-start gap-6">
        <div className="top flex h-auto w-[90%] items-center justify-between overflow-hidden">
          <h2 className="font-[Arima] text-[64px] font-bold text-black">Our Mission</h2>
          <p className="font-[Inter] text-[20px] text-[#484c48]">
            To help 10 million people achieve optimal metabolic health through
            <br /> institutional partnership by transforming healthcare from sick-care to
            <br /> continuous prevention, personalized intervention, and disease reversal.
          </p>
        </div>
        <div className="my-12 flex min-h-[80%] w-[90%] items-start justify-between gap-6">
          <div className="div flex h-full w-[40%] flex-col items-start justify-start gap-6">
            <h2 className="h-full font-[Arima] text-[62px] font-bold leading-[70px] text-black">
              We’re not building
              <br /> a fitness app.
              <br /> We’re building a <br /> health Intelligent
              <br />
              system.
            </h2>
            <p className="font-[Inter] text-[20px] text-[#2c2d2d]">
              Most people realise their health too late. We’re here to change that. With a
              combination of: Technology , Medical expertise , Behavioural science.
            </p>
            <p className="mt-4 font-[Inter] text-[20px] text-[#2c2d2d]">
              MyTwin predicts health risks early, enables timely coach-led interventions, delivers
              personalized and actionable behavioral and lifestyle insights, tracks progress across
              metabolic health parameters, supports healthier aging and longevity, and empowers you
              and your parents to prevent, manage and reverse lifestyle conditions before
              complications begin.
            </p>
          </div>
          <div className="div flex h-full w-[60%] items-start justify-evenly gap-0">
            <div className="flex h-full w-[50%] flex-col items-end justify-between gap-6">
              <img src={Media.aboutUs.aboutImg1} alt="about us" className="h-[264px] w-auto" />
              <img src={Media.aboutUs.aboutImg2} alt="about us" className="h-[264px] w-auto" />
            </div>
            <div className="flex h-full w-[50%] items-center justify-end">
              <img src={Media.aboutUs.aboutImg3} alt="about us" className="h-[556px] w-auto" />
            </div>
          </div>
        </div>
        <div className="flex h-full w-[90%] flex-col items-center justify-center gap-6">
          <h2 className="font-[Arima] text-[62px] font-bold leading-[70px] text-black">
            We Help People
          </h2>
          <div className="mt-16 flex h-full w-full items-start justify-start gap-12">
            {steps.map((step) => (
              <div
                key={step.index}
                className="flex h-full w-full flex-col items-center justify-center gap-6"
              >
                <div className="flex h-[62px] w-[60px] items-center justify-center rounded-lg bg-[#010100] text-[54px] font-bold text-white">
                  {step.index}
                </div>
                <h3 className="font-[Arima] text-[24px] font-semibold text-black">
                  {step.heading}
                </h3>
                <p className="whitespace-pre-line font-[Inter] text-[18px] text-[#2c2d2d]">
                  {step.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
          <h2 className="font-[Arima] text-[62px] font-bold leading-[70px] text-black">
            Real people. Real results.
          </h2>
          <div className="mt-16 flex h-full w-full items-start justify-start gap-12">
            {tests.map((test, index) => (
              <img
                key={index}
                src={test}
                alt={`testimonial ${index + 1}`}
                className="h-auto w-[33%]"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col h-full min-h-screen w-full items-center justify-start mt-8">
          <h1 className="text-center font-[Arima] text-4xl font-bold text-gray-800">
          The Minds Behind The Mission
        </h1>
        <div
          className="mt-10 flex w-full items-center justify-center gap-8 translate-y-[40%]"
        >
          {people.map((person, index) => (
            <Avatar
              key={index}
              image={person.image}
              name={person.name}
              designation={person.designation}
              style={{
                transform: index % 2 === 0 ? 'translateY(30%)' : 'translateY(-30%)',
              }}
            />
          ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
