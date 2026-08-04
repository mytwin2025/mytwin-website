import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GradientArcAnim({
  scale = 1,
  duration = 3,
  color1 = '#a78bfa',
  color2 = '#38bdf8',
  strokeWidth = 6,
  style = {},
}) {
  const groupRef = useRef(null);

  const BASE_RADIUS = 60;
  const BASE_SIZE = 160;
  const r = BASE_RADIUS * scale;
  const size = BASE_SIZE * scale;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  // 40% arc, 10% gap, 40% arc, 10% gap
  const arc = circumference * 0.4;
  const gap = circumference * 0.1;
  const dashArray = `${arc} ${gap} ${arc} ${gap}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current, {
        rotation: 360,
        svgOrigin: `${cx} ${cy}`,
        repeat: -1,
        ease: 'none',
        duration,
      });
    });
    return () => ctx.revert();
  }, [scale, duration, cx, cy]);

  const gradId1 = 'arcGrad1';
  const gradId2 = 'arcGrad2';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        {/* Gradient for the arc going from transparent → color1 → color2 → transparent */}
        <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color1} stopOpacity="0" />
          <stop offset="40%" stopColor={color1} stopOpacity="1" />
          <stop offset="60%" stopColor={color2} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gradId2} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color1} stopOpacity="0" />
          <stop offset="40%" stopColor={color1} stopOpacity="1" />
          <stop offset="60%" stopColor={color2} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g ref={groupRef}>
        {/* Single circle with dasharray creating two opposite arcs ( ) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={`url(#${gradId1})`}
          strokeWidth={strokeWidth * scale}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          /* Start at the top (−90°) so arcs are left/right symmetrically */
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </g>
    </svg>
  );
}
