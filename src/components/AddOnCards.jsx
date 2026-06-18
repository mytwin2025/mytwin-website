import React from 'react';
import { CheckCircle2 as Check } from 'lucide-react';
export default function AddOnCards({ name, image, price, description, isActive = false, onClick, gstIncludedText='' }) {
  return (
    <button
      className={`plan-card border-1 relative h-[124px] w-[584px] cursor-pointer rounded-[16px] border-black bg-[#fff] px-4 py-2`}
      style={{ borderColor: isActive ? '#ff6b01' : 'transparent', borderWidth: '1px' }}
      onClick={onClick}
    >
      <div className={`absolute inset-0 rounded-[16px] ${isActive ? 'bg-[#ff6b0105]' : ''} pointer-events-none`}/>
        {isActive && (
          <div className="absolute top-2 right-2">
            <Check className="h-4 w-4 text-[#ff6b01]" />
          </div>
        )}

      <div className={'flex w-full items-start justify-between gap-4 h-full'}>
        {/* <div className="icon h-24 w-24 flex items-start"> */}
          <img src={image} alt={`${name} icon`} className="object-contain" />
        {/* </div> */}
        <div className="details flex flex-col items-start justify-center text-left h-full w-full">
          <span className="font-[Inter] text-[16px] font-bold text-gray-900">{name}</span>
          <span className="font-[Inter] text-[14px] font-medium text-gray-500">{description}</span>
          <div className="price mt-auto flex items-center gap-2">
            <span className="text-md font-[Inter] font-semibold text-gray-900">{price}</span>
            <span className="text-sm font-[Inter] font-normal text-[#6B7280] ">{gstIncludedText}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
