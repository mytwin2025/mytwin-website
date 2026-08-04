import React from 'react';

export default function Avatar({ image, name, designation, style, className, imageClassName }) {
  return (
    <div style={style} className={`inline-flex flex-col items-center ${className}`}>
      <img src={image} alt={name} className={` ${imageClassName}`} />
      <div className="mt-3 flex flex-col items-center leading-none">
        <span className="text-base font-bold text-black">{name}</span>
        <span className="mt-1 text-sm text-gray-400">{designation}</span>
      </div>
    </div>
  );
}
