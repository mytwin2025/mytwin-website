import React from 'react';
import { Media } from '../../utils/media';
import { ChevronUp } from 'lucide-react';

const vitals = [
  {
    icon: Media.faceScanVital.heart,
    label: 'Blood Pressure',
    value: '130/78',
    unit: 'mmHg',
    valueClass: 'text-orange-500',
    wide: true,
  },
  {
    icon: Media.faceScanVital.heartRate,
    label: 'Heart Rate',
    value: '107',
    unit: 'bpm',
    valueClass: 'text-gray-900',
  },
  {
    icon: Media.faceScanVital.smile,
    label: 'Stress',
    value: 'Low',
    unit: '',
    valueClass: 'text-orange-500',
  },
  {
    icon: Media.faceScanVital.breath,
    label: 'Breathing...',
    value: '18',
    unit: 'bpm',
    valueClass: 'text-gray-900',
  },
  {
    icon: Media.faceScanVital.spotwoo,
    label: 'SpO2',
    value: '92',
    unit: '%',
    valueClass: 'text-gray-900',
  },
];

export default function FaceScanVitalCard({ lastSync = '28 Mar, 03:05pm', onUpdate }) {
  return (
    <div className="w-[240px] overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
            <img src={Media.faceScanVital.faceScan} alt="Face Scan" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Face Scan Vitals</p>
            <p className="text-[9px] text-gray-400">Last sync on : {lastSync}</p>
          </div>
        </div>
        <ChevronUp size={14} className="text-gray-400" />
      </div>

      {/* Vitals grid */}
      <div className="flex flex-col gap-1.5 px-2 py-2">
        {/* Blood Pressure — full width */}
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
          <div className="flex items-center gap-2">
            <img src={vitals[0].icon} alt={vitals[0].label} className="h-6 w-6" />
            <span className="text-xs font-semibold text-gray-800">{vitals[0].label}</span>
          </div>
          <div className="text-right">
            <span className={`text-base font-bold ${vitals[0].valueClass}`}>{vitals[0].value}</span>
            <p className="text-[9px] text-gray-400">{vitals[0].unit}</p>
          </div>
        </div>

        {/* 2-column grid for remaining vitals */}
        <div className="grid grid-cols-2 gap-1.5">
          {vitals.slice(1).map((vital, i) => (
            <div key={i} className="flex flex-col gap-1.5 rounded-xl bg-white px-2.5 py-2.5">
              <div className="flex items-center gap-1.5">
                <img src={vital.icon} alt={vital.label} className="h-5 w-5" />
                <span className="text-[9px] font-semibold text-gray-600">{vital.label}</span>
              </div>
              <p className={`text-sm font-bold ${vital.valueClass}`}>
                {vital.value}
                {vital.unit && (
                  <span className="ml-0.5 text-[9px] font-normal text-gray-400">{vital.unit}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Update button */}
      <div className="px-2 pb-2">
        <button
          onClick={onUpdate}
          className="w-full cursor-pointer rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white transition-transform duration-150 hover:bg-orange-600 active:scale-95"
        >
          Update Now
        </button>
      </div>
    </div>
  );
}
