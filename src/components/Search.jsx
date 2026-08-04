import { Search as SearchIcon } from 'lucide-react';

export default function Search({ onSearch, style }) {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-white py-3 px-6"
      style={style}
    >
      <SearchIcon size={18} className="shrink-0 text-gray-400" />

      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}
