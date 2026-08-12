import React from 'react';
import { CheckCircle2 as Check } from 'lucide-react';
export default function AddOnCards({
  name,
  image,
  price,
  description,
  isActive = false,
  onClick,
  gstIncludedText = '',
  available = true,
}) {
  return (
    <div
      className={`plan-card border-1 relative rounded-[16px] bg-[#fff] p-4 ${available === false ? 'opacity-60' : ''}`}
      style={{ borderColor: isActive ? '#ff6b01' : '#E5E7EB', borderWidth: '1px' }}
    >
      <div
        className={`absolute inset-0 rounded-[16px] ${isActive ? 'bg-[#ff6b0105]' : ''} pointer-events-none`}
      />

      {/* Checkbox button or Coming Soon in the top right */}

      <div className={'flex h-full w-full items-start justify-between gap-4 pr-6'}>
        {/* <div className="icon h-24 w-24 flex items-start"> */}
        <img src={image} alt={`${name} icon`} className="object-contain" />
        {/* </div> */}
        <div className="details flex h-full w-full flex-col items-start justify-center text-left">
          <span className="font-[Inter] text-[16px] font-bold text-gray-900">{name}</span>
          <span className="font-[Inter] text-[14px] font-medium text-gray-500">{description}</span>
          <div className="price mt-auto flex items-center gap-2">
            {available === false ? (
              <span className="text-md font-[Inter] font-semibold text-[#ff6b01]">
                Coming soon
              </span>
            ) : (
              <>
                <span className="text-md font-[Inter] font-semibold text-gray-900">
                  {Number(price).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </span>
                <span className="font-[Inter] text-sm font-normal text-[#6B7280]">
                  {gstIncludedText}
                </span>
              </>
            )}
          </div>
          {/* <button className="mt-2 rounded-md bg-[#ff6b01] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#e65a00]">
            View Details
          </button> */}
        </div>
      </div>
    </div>
  );
}
