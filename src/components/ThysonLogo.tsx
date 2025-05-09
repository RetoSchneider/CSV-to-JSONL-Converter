import React from 'react';
import './ThysonLogo.css';

interface ThysonLogoProps {
  size?: number;
}

const ThysonLogo: React.FC<ThysonLogoProps> = ({ size = 24 }) => {
  return (
    <div className="thyson-logo" style={{ height: size, width: size * 5 }}>
      <svg
        width={size * 5}
        height={size}
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="120" height="24" rx="4" fill="#16162A" />
        <rect
          x="1"
          y="1"
          width="118"
          height="22"
          rx="3"
          stroke="#FFCC00"
          strokeWidth="1"
          fill="none"
        />
        <text
          x="60"
          y="16"
          fontFamily="'VT323', monospace"
          fontSize="14"
          textAnchor="middle"
          fill="#FFCC00"
        >
          T H Y S O N
        </text>
        <path d="M6 12 L12 6 L18 12 L12 18 Z" fill="#9B4DC5" />
        <path d="M106 12 L112 6 L118 12 L112 18 Z" fill="#9B4DC5" />
      </svg>
    </div>
  );
};

export default ThysonLogo;
