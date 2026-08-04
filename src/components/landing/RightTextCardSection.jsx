import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RightTextCardSection({
  index = '',
  paragraph = '',
  tableData = [],
  Card = null,
  onButtonClick,
  buttonText,
}) {
  const containerRef = useRef(null);
  const indexRef = useRef(null);
  const paraRef = useRef(null);
  const listRef = useRef(null);
  const cardRef = useRef(null);

  const procParagraph = paragraph.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <div ref={containerRef} className="card flex max-w-xs flex-col px-4 py-8">
      {/* Index */}
      {Card && (
        <div className={`${index == '04' && 'pb-[100px]'} block md:hidden`} ref={cardRef}>
          {Card}
        </div>
      )}
      {/* <button
        onClick={onButtonClick}
        className="block cursor-pointer rounded-full mb-5 bg-orange-500 px-6 py-2 text-[15px] font-bold text-white transition-transform duration-150 hover:bg-orange-600 active:scale-95 md:hidden md:self-start md:px-8 md:py-3 md:text-[16px]"
      >
        {buttonText}
      </button> */}

      {/* Paragraph */}
      <p ref={paraRef} className="mb-3 text-[14px] leading-relaxed text-[#484848]">
        {procParagraph}
      </p>

      {/* Feature list */}
      {tableData.length > 0 && (
        <ul ref={listRef} className="flex list-disc flex-col gap-2 pl-5">
          {tableData.map((item, i) => (
            <li key={i} className="text-[14px] text-[#484848]">
              {item}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onButtonClick}
        className="my-5 block cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-[15px] font-bold text-white transition-transform duration-150 hover:bg-orange-600 active:scale-95 md:hidden md:self-start md:px-8 md:py-3 md:text-[16px]"
      >
        {buttonText}
      </button>

      {/* Card slot */}
      {Card && (
        <div className={`${index == '04' && 'pb-[100px]'} hidden md:block`} ref={cardRef}>
          {Card}
        </div>
      )}
    </div>
  );
}
