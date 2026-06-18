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
    <div ref={containerRef} className="card flex max-w-xs flex-col gap-5 px-4 py-8">
      {/* Index */}

      {/* Paragraph */}
      <p ref={paraRef} className="text-[16px] leading-relaxed text-[#484848]">
        {procParagraph}
      </p>

      {/* Feature list */}
      {tableData.length > 0 && (
        <ul ref={listRef} className="flex flex-col gap-2 list-disc pl-5">
          {tableData.map((item, i) => (
            <li key={i} className="text-sm text-[#484848]">
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Card slot */}
      {Card && <div ref={cardRef}>{Card}</div>}
    </div>
  );
}
