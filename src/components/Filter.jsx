import React from 'react';
import { ListFilter as FilterIcon } from 'lucide-react';
export default function Filter({ onFilter, style }) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-3 px-6 transition-colors duration-300 hover:bg-gray-100 sm:w-[127px] sm:justify-around"
      style={style}
      onClick={onFilter}
    >
      <div>
        <FilterIcon color="#000" size={16} />
      </div>
      <span className="text-sm font-medium text-gray-700">Filters</span>
    </button>
  );
}
