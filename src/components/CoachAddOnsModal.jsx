import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AddOnCards from './AddOnCards';
import { useHeader } from '../context/HeaderContext';

export default function CoachAddOnsModal({
  isOpen,
  onClose,
  addOnsData,
  selectedAddOns,
  onToggleAddOn,
}) {
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (isOpen) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [isOpen, setIsHeaderVisible]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all sm:p-6">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#f8f9fa] shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add-Ons</h2>
            <p className="text-sm text-gray-500">Supercharge your care program</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {addOnsData.map((addon, idx) => {
              const isSelected = selectedAddOns.some((item) => item.title === addon.title);
              return (
                <AddOnCards
                  key={idx}
                  name={addon.title}
                  image={addon.image}
                  price={addon.price}
                  description={addon.description}
                  isActive={isSelected}
                  available={addon.available !== false}
                  onClick={() => onToggleAddOn(addon)}
                  gstIncludedText={addon.gstExempt ? '(No GST)' : '(incl. GST)'}
                />
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-orange-500 py-3 text-center text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
