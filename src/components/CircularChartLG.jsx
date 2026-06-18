import React from 'react';

/**
 * CircularChartLG
 *
 * Props:
 *  value      – current reading (determines arc fill)
 *  unit       – label shown under the number (e.g. "mg/dL")
 *  min        – range minimum (default 0)
 *  max        – range maximum (default 200)
 *  size       – overall diameter in px (default 200)
 *  strokeWidth – arc stroke thickness; auto-scales if omitted
 *  colorStart – gradient start color (arc beginning, bottom-left)
 *  colorMid   – gradient mid color
 *  colorEnd   – gradient end color (arc top)
 */
export default function CircularChartLG({
  value = 110,
  unit = 'mg/dL',
  min = 0,
  max = 200,
  size = 200,
  strokeWidth,
  colorStart = '#a855f7', // purple
  colorMid = '#ef4444', // red
  colorEnd = '#f97316', // orange
}) {
  const sw = strokeWidth ?? Math.round(size * 0.072);
  const radius = size / 2 - sw;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = 2 * Math.PI * radius;

  // 270° active arc — 90° gap sits at the bottom
  const arcDeg = 270;
  const arcLen = (arcDeg / 360) * circumference;
  const gapLen = circumference - arcLen;

  // Clamp value to [min, max] → [0, 1]
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const progressLen = pct * arcLen;

  // Rotate so the 270° arc starts at bottom-left (225° from top, clockwise)
  // SVG circles draw strokes starting at 3-o'clock (0°).
  // Rotating by 135° moves the start to 135° past 3-o'clock = bottom-left.
  const rotation = 135;

  const gradId = `cg-${Math.round(size)}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        borderRadius: '50%',
        // Outer neumorphic shadow for the 3-D floating look
        filter:
          'drop-shadow(6px 6px 14px rgba(0,0,0,0.18)) drop-shadow(-4px -4px 10px rgba(255,255,255,0.75))',
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        <defs>
          {/* Gradient mapped bottom-left → top-right to follow arc direction */}
          <linearGradient id={gradId} x1="15%" y1="100%" x2="85%" y2="0%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="50%" stopColor={colorMid} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>

        {/* Gray background track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#DEE0E7"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${gapLen}`}
          transform={`rotate(${rotation}, ${cx}, ${cy})`}
        />

        {/* Coloured progress arc */}
        {progressLen > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${progressLen} ${circumference - progressLen}`}
            transform={`rotate(${rotation}, ${cx}, ${cy})`}
          />
        )}
      </svg>

      {/* Inner sphere — radial gradient gives the 3-D bubble appearance */}
      <div
        style={{
          position: 'absolute',
          inset: sw + 2,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 32%, #ffffff 0%, #ebebf4 60%, #d8d8e8 100%)',
          boxShadow:
            'inset 3px 3px 10px rgba(255,255,255,0.95), inset -3px -3px 10px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <span
          style={{
            fontSize: size * 0.24,
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.1,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: size * 0.1,
            color: '#6b7280',
            fontFamily: 'system-ui, sans-serif',
            marginTop: size * 0.02,
          }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}
