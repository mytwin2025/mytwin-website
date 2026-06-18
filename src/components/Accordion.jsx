import React, { useRef, useState } from 'react';
import gsap from 'gsap';

export default function Accordion({ question, answer, oneLiner }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const chevronRef = useRef(null);
  const oneLinerRef = useRef(null);

  const toggle = () => {
    const body = bodyRef.current;
    const chevron = chevronRef.current;
    const hint = oneLinerRef.current;

    if (!open) {
      gsap.to(body, { height: body.scrollHeight, opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(chevron, { rotation: 180, duration: 0.35, ease: 'power2.out' });
      if (hint) gsap.to(hint, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(chevron, { rotation: 0, duration: 0.3, ease: 'power2.in' });
      if (hint)
        gsap.to(hint, {
          height: hint.scrollHeight,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
    }
    setOpen(!open);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm" onClick={toggle}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-[#2D2B6B] font-[Inter]">{question}</span>
        <button
          onClick={toggle}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          aria-expanded={open}
        >
          <svg
            ref={chevronRef}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      {/* {oneLiner && (
        <div ref={oneLinerRef} style={{ overflow: 'hidden' }}>
          <p className="pt-2 text-[14px] text-[#6B6A9A]">{oneLiner}</p>
        </div>
      )} */}
      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <p className="pt-3 text-[15px] leading-relaxed text-[#6B6A9A] font-[Inter]">{answer}</p>
      </div>
    </div>
  );
}
