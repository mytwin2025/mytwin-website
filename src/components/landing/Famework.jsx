import React from 'react';

export default function Framework({ index = '', heading = '', paragraph = ``, image = null, style = {} }) {
  const procParagraph = paragraph.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
  return (
    <div className="h-auto w-full max-w-[712px] flex flex-col" style={style}>
      {/* Right: Image */}
      {image && (
        <div className="w-[100%]">
          <img
            src={image}
            alt="Framework Illustration"
            className="h-auto w-full rounded-2xl object-cover shadow-md bordered"
          />
        </div>
      )}
      {/* Left: Text content */}
      <div className="flex w-full flex-col gap-1 py-4 items-start justify-start ">
        <span className="text-md font-[Inter] font-medium tracking-widest text-gray-400">
          {index}
        </span>
        <h2 className="font-[Arima] text-3xl font-black leading-tight text-black">{heading}</h2>
        <p className="text-[14px] text-[#484848] text-left">{paragraph}</p>
      </div>
    </div>
  );
}
