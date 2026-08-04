import React from 'react';

export default function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  style = {},
  className = '',
  pattern = '',
  required = false,
  maxLength = null,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border border-l-0 border-r-0 border-t-0 border-gray-300 px-3 py-1 placeholder-white focus:outline-none focus:ring-0 ${className}`}
      style={style}
      pattern={pattern}
      required={required}
      maxLength={maxLength}
    />
  );
}
