import React from 'react';
import CircularChartLG from '../../components/CircularChartLG';
import { Media } from '../../utils/media';
import Framework from '../../components/landing/Famework';
export default function AppFrameworkSection({ frameRef }) {
  const frameworkData = [
    {
      index: '01',
      heading: 'Measure',
      paragraph: `We analyse your body’s baseline using blood biomarkers, past clinical history, wearable \ndata, lifestyle habits, and daily behaviour patterns to create your personalized digital twin.
\nThis helps us map & identify hidden unhealthy patterns, glucose spikes, recovery issues, \ninflammation, and early metabolic risks before complications begin.`,
      image: Media.framework.measure,
    },
    {
      index: '02',
      heading: 'Monitor',
      paragraph: `MyTwin continuously connects the missing dots across your health data to uncover root causes, trends, \nand risk patterns. Through real-time monitoring, AI-powered insights, and physician-guided interventions, \nwe deliver personalized daily actions to improve and optimize out-of-range biomarkers \nand lifestyle conditions.`,
      image: Media.framework.monitor,
    },
    {
      index: '03',
      heading: 'Mentor',
      paragraph: `Receive continuous support from physicians, health experts, and clinically guided \nrecommendations tailored to your body, habits, and goals.
\nWe help you stay accountable, adjust your plan over time, and build sustainable habits \nthat drive long-term health transformation.`,
      image: Media.framework.mentor,
    },
    {
      index: '04',
      heading: 'Maximize',
      paragraph: `Track biological age, metabolic health, inflammation, cardiovascular wellness, recovery, \nand cognitive health in real time.
\nMyTwin transforms your body’s responses into actionable insights and outcome-driven \ncare designed to optimize health, improve longevity, and extend healthy lifespan.`,
      image: Media.framework.maximize,
    },
  ];


  return (
    <div
      className="flex bg-[#F1EFEC] h-auto w-full flex-col items-center justify-start py-12 text-center"
      ref={frameRef}
    >
      <h2 className="font-[Arima] text-[45px] leading-tight mb-4 font-bold text-black">
        MyTwin 4M Framework
      </h2>
      <p className="max-w-[90%] text-center font-[Inter] text-sm text-black md:max-w-[70%]">
        Your Body Is Constantly Giving Signals,You are just not tracking them.MyTwin Helps You
        Understand them. <br /> MyTwin combines real-time health monitoring, AI-powered insights,
        and clinically guided care to detect risks early, improve daily habits, and optimize
        long-term health outcomes.
      </p>
      <div
        id="framework"
        className="mt-12 relative z-[100] grid h-auto w-[92%] grid-cols-1 items-start justify-between justify-items-center gap-8 md:w-[88%] md:grid-cols-2 md:gap-4"
        ref={frameRef}
      >
        {frameworkData.map((data, index) => (
          <Framework
            key={index}
            index={data.index}
            heading={data.heading}
            paragraph={data.paragraph}
            image={data.image}
            style={{ zIndex: 30 }}
          />
        ))}
      </div>

      <div className="mt-16 grid w-[92%] grid-cols-2 gap-4 pb-8 md:flex md:w-[88%] md:flex-wrap md:items-center md:justify-around">
        {[
          { value: '120+', label: 'Active Members', image: Media.webMetrics.people },
          { value: '110+', label: 'Lab Biomarkers Tracked', image: Media.webMetrics.chart },
          { value: '300+', label: 'Health Risks Covered ', image: Media.webMetrics.chart },
          { value: '2361+', label: 'Daily Habits Data Tracked', image: Media.webMetrics.chart },
          { value: 'Multi-Source', label: 'Health Data Integration', image: Media.webMetrics.building },
        ].map((metric, index) => (
          <div
            key={index}
            className={`relative flex h-[110px] w-full flex-col justify-start overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 pt-4 text-left shadow-sm md:min-w-[190px] md:max-w-[220px] md:flex-1 ${
              index === 4 ? 'col-span-2 md:col-auto' : 'col-span-1 md:col-auto'
            }`}
          >
            <div className="z-10 flex flex-col leading-tight">
              <span className="font-[Arima] text-[24px] font-bold tracking-wider text-black">
                {metric.value}
              </span>
              <span className="mt-1 font-[Inter] text-[14px] font-medium text-gray-800">
                {metric.label}
              </span>
            </div>
            <img
              src={metric.image}
              alt=""
              className="absolute bottom-0 right-0 h-[45px] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
