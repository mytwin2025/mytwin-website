import React from 'react';
import { createPortal } from 'react-dom';
export default function Dialog({ isOpen, onClose, children }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="dialog-overlay fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex dialog-content rounded-lg shadow-lg items-center justify-center bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
