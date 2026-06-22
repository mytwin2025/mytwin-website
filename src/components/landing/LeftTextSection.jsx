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
    <div className="flex w-full flex-col gap-6 px-4 py-8">
      <span className="text-md font-[Inter] font-medium tracking-widest text-gray-400">
        {index}
      </span>

      <h2 className="font-[Arima] text-[45px] font-black leading-tight text-black">
        {procHeading}
      </h2>

      <button
        onClick={onButtonClick}
        className="cursor-pointer self-start rounded-full bg-orange-500 px-8 py-3 text-[16px] font-bold text-white transition-transform duration-150 hover:bg-orange-600 active:scale-95"
      >
        {buttonText}
      </button>
    </div>
  );
}
