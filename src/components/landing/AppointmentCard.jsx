import React, { useEffect, useRef, useState } from 'react';
import { Copy } from 'lucide-react';

export default function AppointmentCard({
  doctorName = 'Dr Sadiq Hussain',
  specialty = 'Cardiology Consultation',
  doctorImage = null,
  date = 'Wednesday , 15 August 2025',
  time = '4:00 PM',
  meetLink = 'uzcreg -vejabn -vnearjb',
  countdownTarget = null, // Date object or ms timestamp; if null uses 12min45sec demo
}) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 12, seconds: 45 });
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const getRemaining = () => {
      if (countdownTarget) {
        const diff = Math.max(0, new Date(countdownTarget) - Date.now());
        return {
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
      return null;
    };

    if (countdownTarget) {
      setTimeLeft(getRemaining());
      intervalRef.current = setInterval(() => {
        const r = getRemaining();
        setTimeLeft(r);
        if (r.minutes === 0 && r.seconds === 0) clearInterval(intervalRef.current);
      }, 1000);
    } else {
      // demo countdown from 12:45
      let total = 12 * 60 + 45;
      intervalRef.current = setInterval(() => {
        total = Math.max(0, total - 1);
        setTimeLeft({ minutes: Math.floor(total / 60), seconds: total % 60 });
        if (total === 0) clearInterval(intervalRef.current);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [countdownTarget]);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="w-[260px] overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-lg shadow-orange-500/20">
      {/* Header */}
      <div className="flex items-center gap-2.5 bg-orange-500 px-3 py-2">
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-white/40 bg-gray-200">
          {doctorImage ? (
            <img src={doctorImage} alt={doctorName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-orange-400 text-xs font-bold text-white">
              {doctorName.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-bold leading-tight text-white">{doctorName}</p>
          <p className="text-[10px] text-white/80">{specialty}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-3.5 py-3.5">
        {/* Date */}
        <div>
          <p className="text-[10px] text-gray-400">Date</p>
          <p className="text-xs font-bold text-gray-900">{date}</p>
        </div>

        {/* Time */}
        <div>
          <p className="text-[10px] text-gray-400">Time</p>
          <p className="text-xs font-bold text-gray-900">{time}</p>
        </div>

        {/* Countdown */}
        <div>
          <p className="text-[10px] text-gray-400">Meet Starts in</p>
          <p className="text-base font-bold leading-tight text-orange-500">
            {pad(timeLeft.minutes)} Min : {pad(timeLeft.seconds)} Sec
          </p>
        </div>

        {/* Meet Link */}
        <div>
          <p className="mb-1 text-[10px] text-gray-400">Meet Link</p>
          <div className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 shadow-sm">
            <span className="truncate font-mono text-[10px] tracking-wide text-gray-700">
              {meetLink}
            </span>
            <button
              onClick={handleCopy}
              title={copied ? 'Copied!' : 'Copy link'}
              className="ml-2 flex-shrink-0 cursor-pointer text-gray-500 transition-all duration-150 hover:text-orange-500 active:scale-90"
            >
              <Copy size={12} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
