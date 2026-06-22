import React, { useRef } from 'react';

export default function LeftTextSection({
  index = '01',
  heading = 'Personalised coaching That Adapts To Your Body',
  buttonText = 'Start your journey',
  onButtonClick,
}) {
  const procHeading = heading.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <div className="flex w-full flex-col items-center md:items-start gap-5 px-2 py-4 md:gap-6 md:px-4 md:py-8">
      <span className="text-md font-[Inter] font-medium tracking-widest text-gray-400">
        {index}
      </span>

      <h2 className="font-[Arima] text-3xl font-black text-center md:text-left leading-tight text-black sm:text-4xl md:text-[45px]">
        {procHeading}
      </h2>

      <button
        onClick={onButtonClick}
        className="cursor-pointer md:self-start rounded-full bg-orange-500 px-6 py-2 text-[15px] font-bold text-white transition-transform duration-150 hover:bg-orange-600 active:scale-95 md:px-8 md:py-3 md:text-[16px]"
      >
        {buttonText}
      </button>
    </div>
  );
}
