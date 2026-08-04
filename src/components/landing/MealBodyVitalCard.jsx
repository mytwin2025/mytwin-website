import React from 'react';
import { CalendarDays } from 'lucide-react';
import CircularChartLG from '../CircularChartLG';

/**
 * MealBodyVitalCard
 *
 * Props:
 *  title        – e.g. "GLUCOSE"
 *  timeAgo      – e.g. "22 hours ago"
 *  mealType     – e.g. "After Meal"
 *  lastChecked  – e.g. "21 Aug 2024 08:44 pm"
 *  value        – numeric reading, e.g. 110
 *  unit         – e.g. "mg/dL"
 *  chartMin     – passed to CircularChartLG
 *  chartMax     – passed to CircularChartLG
 *  ranges       – array of { label, range, unit } for the legend row
 */
export default function MealBodyVitalCard({
  title = 'GLUCOSE',
  timeAgo = '22 hours ago',
  mealType = 'After Meal',
  lastChecked = '21 Aug 2024 08:44 pm',
  value = 110,
  unit = 'mg/dL',
  chartMin = 0,
  chartMax = 220,
  ranges = [
    { label: 'Normal', range: '<160', unit: 'mg/dL' },
    { label: 'Risky', range: '160-180', unit: 'mg/dL' },
    { label: 'Critical', range: '>180', unit: 'mg/dL' },
  ],
  style = {},
}) {
  return (
    <div
      className="flex w-[420px] flex-shrink-0 items-center gap-3 rounded-2xl bg-[#fff] px-4 py-4"
      style={style}
    >
      {/* Left column */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title */}
        <p className="text-[14px] tracking-widest font-bold text-[#ff6b01]">{title}</p>

        {/* Time badge */}
        <div className="flex w-fit items-center gap-1 border border-black px-4 rounded-md">
          <CalendarDays size={14} strokeWidth={1.8} color='black' className="text-black" />
          <span className="text-[10px] text-black">{timeAgo}</span>
        </div>

        {/* Meal type + last checked */}
        <div>
          <p className="text-lg font-black leading-tight text-gray-900">{mealType}</p>
          <p className="mt-0.5 text-[9px] text-black">Last checked {lastChecked}</p>
        </div>

        {/* Divider */}
        <div className="h-[2px] bg-[#00000015]" />

        {/* Range legend */}
        <div className="flex justify-between gap-1">
          {ranges.map((r, i) => (
            <div key={i} className="flex flex-col items-center gap-0">
              <p className="text-[9px] font-semibold text-black">{r.label}</p>
              <p className="text-xs font-black text-gray-900">{r.range}</p>
              <p className="text-[8px] text-[#575757]">{r.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — circular chart */}
      <div className="flex-shrink-0">
        <CircularChartLG value={value} unit={unit} min={chartMin} max={chartMax} size={100} />
      </div>
    </div>
  );
}
