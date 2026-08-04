import React from 'react';
import Button from './Button';
import { Media } from '../utils/media';
export default function CombinedFeaturePhone({ feature }) {
  return (
    <div className="py flex flex-col items-center justify-start gap-2 rounded-[1.5rem] bg-[]">
      <span className="text-center font-[Satoshi-Bold] text-lg text-[#2F387F]">
        {feature.index}
      </span>
      <h3 className="text-center font-[Arima] text-2xl font-bold text-[#000]">{feature.heading}</h3>
      <Button
        style={{ height: null, padding: null, borderRadius: null }}
        className="rounded-full px-6 py-2 font-[Inter] text-lg font-semibold text-white"
        text={feature.buttonText}
      />
      <div className="relative w-[70%] items-center justify-center rounded-[1.5rem] bg-[#F1EFEC] px-4 py-4">
        <img
          src={Media.landing.iphoneModel}
          alt={feature.heading}
          className="w-full rounded-[1.5rem]"
        />
        <img
          src={feature.phoneBg}
          alt={feature.heading}
          className="absolute left-[10%] top-[4%] w-[80%] rounded-[1.5rem]"
        />
      </div>
      <div className="ml-4 w-full text-sm text-[#2F387F]">
        <span className="font-[Inter]">{feature.paragraph}</span>
        <ul className="ml-4 list-disc">
          {feature.tableData.map((text) => (
            <li key={text} className="font-[Inter]">
              {text}
            </li>
          ))}
        </ul>
      </div>
      <img
        src={feature.image}
        alt={feature.heading}
        className="w-full rounded-[1.5rem]"
      />
    </div>
  );
}
