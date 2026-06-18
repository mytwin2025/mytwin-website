import React from 'react';
import { ListFilter as FilterIcon } from 'lucide-react';
export default function Filter({ onFilter, style }) {
  return (
    <button
      className="flex h-[40px] w-[127px] items-center justify-around px-6 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 gap-6 border-[1px] border-gray-200"
      style={style}
      onClick={onFilter}
    >
      <FilterIcon color='#000' size={16}/>
      <span className="text-sm font-medium text-gray-700">Filters</span>
    </button>
  );
}
