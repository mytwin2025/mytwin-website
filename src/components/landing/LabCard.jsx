import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * LabCard — displays a lab result with a tri-zone range bar.
 *
 * Props:
 *  title       – e.g. "Hba1C (Glycosylated Hemoglobin)"
 *  date        – e.g. "11 Dec, 2025"
 *  value       – numeric reading, e.g. 5.2
 *  unit        – e.g. "%" or "mg/dL"
 *  ranges      – { displayMin, lowMax, normalMax, displayMax }
 *                  displayMin : start of the visual bar
 *                  lowMax     : below this → Low
 *                  normalMax  : below this → Normal; above → High
 *                  displayMax : end of the visual bar
 *  onPress     – optional click handler
 */
export default function LabCard({
  title = 'Hba1C (Glycosylated Hemoglobin)',
  date = '11 Dec, 2025',
  value = 5.2,
  unit = '%',
  ranges = { displayMin: 3.5, lowMax: 4.2, normalMax: 5.7, displayMax: 8.0 },
  onPress,
  style = {},
}) {
  const { displayMin, lowMax, normalMax, displayMax } = ranges;
  const span = displayMax - displayMin;

  // Segment widths as %
  const lowPct = ((lowMax - displayMin) / span) * 100;
  const normalPct = ((normalMax - lowMax) / span) * 100;
  const highPct = ((displayMax - normalMax) / span) * 100;

  // Marker position — clamp within bar
  const markerPct = Math.min(100, Math.max(0, ((value - displayMin) / span) * 100));

  // Status
  const status = value < lowMax ? 'Low' : value <= normalMax ? 'Normal' : 'High';

  return (
    <div
      style={style}
      onClick={onPress}
      className={`w-[280px] rounded-2xl bg-[#f2f1ef] px-4 py-3.5 shadow-md ${onPress ? 'cursor-pointer' : ''} shadow-orange-500/20 shadow-xl`}
    >
      {/* Top row */}
      <div className="mb-2 flex flex-col items-start justify-start">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-[10px] font-medium leading-tight text-gray-500">{title}</p>
          <div className="flex flex-shrink-0 items-center gap-0.5 text-[10px] text-gray-400">
            <span>{date}</span>
            <ChevronRight size={11} strokeWidth={2} />
          </div>
        </div>
        <p className="whitespace-nowrap text-2xl font-bold leading-none text-orange-500">
          {value}
          {unit}
        </p>
      </div>

      {/* Value + bar row */}
      <div className="flex items-center gap-4">
        {/* Big value */}

        {/* Range bar */}
        <div className="flex-1">
          {/* Bar */}
          <div className="relative flex h-2 w-full overflow-visible rounded-full">
            {/* Low segment */}
            <div className="h-full rounded-l-full bg-red-500" style={{ width: `${lowPct}%` }} />
            {/* Normal segment */}
            <div className="h-full bg-green-500" style={{ width: `${normalPct}%` }} />
            {/* High segment */}
            <div className="h-full rounded-r-full bg-red-500" style={{ width: `${highPct}%` }} />

            {/* Blue marker */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${markerPct}%` }}
            >
              <div className="h-4 w-[3px] rounded-full bg-blue-500 shadow" />
            </div>
          </div>

          {/* Labels */}
          <div className="mt-1 flex justify-between text-[9px]">
            <div>
              <p className="text-gray-400">&lt;{lowMax}</p>
              <p className="font-semibold text-red-500">Low</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">
                {lowMax}–{normalMax}
              </p>
              <p className="font-semibold text-green-500">Normal</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">&gt;{normalMax}</p>
              <p className="font-semibold text-red-500">High</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
